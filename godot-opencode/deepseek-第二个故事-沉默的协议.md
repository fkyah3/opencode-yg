# 沉默的协议

## 一、三点钟的报警

陈远的手机在凌晨三点震动了三次才把他弄醒。

生产环境的支付回调成功率在五分钟内掉了 12 个百分点。没有崩溃，没有超时——回调进来了，但系统说"验签失败"的比例异常升高。

他揉着眼睛坐到电脑前，拉出日志。

```
03:01:22.384 [ERROR] verify_signature failed | order_id=PO2024030100012
03:01:22.385 [ERROR] verify_signature failed | order_id=PO2024030100013
03:01:22.386 [ERROR] verify_signature failed | order_id=PO2024030100014
...
```

模式很规律。每笔订单都失败了，而且集中在同一秒。

不是随机故障。

## 二、先自己翻

陈远快速过了一遍可能的原因：

1. **密钥轮换**？查了 deploy 记录——最近一次密钥更新是两周前。
2. **签名算法变更**？git log 显示最近一次修改验签代码是三十七天前。
3. **上游回调参数格式变化**？拉了几笔失败请求的原始 payload——参数格式跟以前一样。
4. **时钟偏移**？`ntpdate -q` 显示偏差小于 10ms。

都不像。

他又仔细看了一遍失败请求的日志——突然注意到一个细节：

所有失败请求的时间戳，毫秒部分都是 `000`。

正常的毫秒分布应该均匀。人为构造的时间戳才会是整秒对齐。

他把这个发现输入到 DeepSeek 里，附上了失败请求的上下文和完整的验签逻辑代码。

## 三、回音

DeepSeek 花了四十秒。

```
问题根因定位：

验签函数 verify_signature 第 47 行：

    const timestamp = parseInt(payload.timestamp);

这里有 parseInt，但该函数有一个已知的非严格行为：
当字符串以数字开头但后续包含非数字字符时，
parseInt 会截断解析前面的数字部分。

比对失败请求的 payload.timestamp：
请求 A: "1711810882000"  → parseInt = 1711810882000 ✓
请求 B: "1711810882000\n" → parseInt = 1711810882000 ✓ 但注意：如果后续处理
        将该值与另一个字段拼接后重新计算签名，换行可能导致签名不一致。

查看您的 sign_raw 拼接逻辑（第 83-86 行）：

    const signRaw = `${timestamp}${nonce}${data}`;

如果 timestamp 的值来自 payload.timestamp 但经过 parseInt 再 toString，
而签名的计算方没有做这个转换——二者得到的 signRaw 就不一致。

但更直接的问题：

失败的时间戳集中在 xx:01:22.000，说明这些请求的毫秒部分被设为 0。
结合您的日志上下文，有一个中间代理层会在特定条件下
对请求做反序列化再序列化，在此过程中毫秒精度丢失。

排查方向：
1. 检查代理层是否有 JSON 反序列化时对数字精度的处理
2. 验证代理层重序列化时 timestamp 字段是否被截断为整秒
3. 或者——检查回调请求的 Content-Type，
   如果上游发送的是 application/x-www-form-urlencoded，
   而代理层按 application/json 解析，某些字段会被默认值填充。

我认为第 3 个方向最快。
您最近是否变更了 Nginx 或 API Gateway 的请求头处理规则？

补充一段完整的问题数据流示意：

```
// 问题数据流（伪代码）
[上游]  POST /callback
        Content-Type: application/x-www-form-urlencoded  ← 原始格式
        body: timestamp=1711810882000&sign=abc&data={...}

        ↓

[Nginx] proxy_set_header Content-Type application/json  ← 强制覆盖

        ↓

[Nginx] 按 application/json 解析 body →
        body 是 key=value 格式，非 JSON →
        解析失败，timestamp = 默认值 "0"

        ↓

[后端]  verify_signature(payload)
           timestamp = parseInt("0")           // = 0
           signRaw = "0" + nonce + data         // 签名原材料错误
           computed != payload.sign             // 验签失败
           return false ❌

// 修复（伪代码）
// 方案 A：删除 proxy_set_header Content-Type，让 Nginx 透传上游格式
// 方案 B：保留覆盖，但增加内容格式协商逻辑：

proxy_set_header Content-Type $http_content_type;
// 这样 Nginx 不会强制改写，而是沿用上游声明。
```

陈远呼吸停了一拍。

他确实在前一天改过 Nginx 配置——升级了 TLS 版本，顺手重写了一段 proxy 配置。他记得改过 `proxy_set_header Content-Type` 那一段。

他赶紧翻出变更记录。

果然——

新配置里有一行：

```
proxy_set_header Content-Type application/json;
```

上游回调发的是 `application/x-www-form-urlencoded`，被强制覆盖后，Nginx 按 JSON 解析请求体，取不到正确的字段值，timestamp 被默认填充为 `0`。

`verify_signature("0")` 当然失败。

他改了回来，三分钟后报警消失。

## 四、事后

陈远坐在恢复平静的办公室里，看着监控面板上那条笔直的回调成功率曲线，把 DeepSeek 的分析又看了一遍。

最让他沉默的不是那个"问题根因定位"的标题。

而是最后那三行"排查方向"——从精度丢失，到序列化行为差异，再到具体 Content-Type 场景，三个方向层层递进，越来越具体。

第三个方向甚至精确到"最快的排查方向"。

它不是列了一堆可能性让你自己试。

它在帮你剪枝。

## 五、后来

陈远把这套配置变更加了一个 check 脚本——每次 proxy 配置变更时，自动对比 Content-Type 和实际请求体格式是否一致。

同事问他怎么想到加这个检查的。

他说："有个东西替我过了一遍变更的影响面，比我自己的 code review 多看了三层。"

他没说是 AI。

因为说出来显得自己很菜。

但后来验证签名的代码他悄悄加了一行注释，在 parseInt 那一行上面：

```
# 注意：类型转换和上游格式之间可能存在隐式约定。
# 改之前想清楚。
```

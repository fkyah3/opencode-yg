# 密码

老妈的电脑密码又忘了。

这已经是今年第四次。

我在电话里教她重置，她那边"嗯嗯嗯"了十分钟，最后说："还是不行。"

我把远程协助打开，看到她建了一个文本文档，里面写满了各种密码和对应的网站。唯独没有电脑密码本身。

"妈，你把密码写哪了？"

"在文档里啊。"

"……那文档有密码吗？"

"没有啊，我又记不住。"

我把这个死循环扔进了 DeepSeek：

```
// 密码管理困境（伪代码）
CONSTRAINT:
    user.memory_capacity("密码") ≈ 0
    user.refuses(password_manager)
    user.refuses(writing_down_encrypted)

REQUIREMENT:
    system_password != any(recorded_passwords)
    // 因为如果一样，她会把两个搞混

SOLUTION:
    system_password = "JUST_ASK_ME"  // 永远不变的提示词
    // 她不需要记密码
    // 她只需要记得"打电话问儿子"
```

DeepSeek 回了一行：

```
方案对了。
但你最好接电话的速度再快一点。
她每次打给你之前，自己已经试了六次了。
```

我把密码改成了 `call_your_son`。

然后备注里写：如果这个不对，打我电话。

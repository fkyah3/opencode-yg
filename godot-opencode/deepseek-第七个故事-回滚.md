# 回滚

凌晨两点，发版失败。

老林看了一眼回滚按钮，手悬在键盘上。

"要不要回滚"这个问题，他问了自己五遍。

然后他问了 DeepSeek。

```
// 回滚决策（伪代码）
FUNCTION should_rollback(deploy):
    metrics_before = deploy.metrics_baseline
    metrics_after  = deploy.metrics_current
    
    error_rate_delta = metrics_after.error_rate - metrics_before.error_rate
    latency_delta    = metrics_after.p99 - metrics_before.p99
    
    IF error_rate_delta > 5%:
        RETURN true, "错误率异常，建议立即回滚"
    
    IF latency_delta > 200ms:
        RETURN true, "延迟显著增加，建议回滚"
    
    IF deploy.duration < 5min AND error_rate_delta > 2%:
        RETURN true, "早期预警，回滚成本最低"
    
    RETURN false, "继续观察"
```

DeepSeek 回了两行：

```
当前错误率涨幅：8.3%
建议：回滚。现在。
```

老林按下了按钮。

三分钟后，系统恢复。他没来得及感谢，关电脑回家了。

他知道明天还有一轮发版。

# Window(窗口)

`window()` 函数创建用于数据分析的滑动窗口。它类似于 `limit()`,但专门为窗口计算而设计。

## 语法

```
window(size)
```

- **size**: 窗口大小,可以是计数或时间持续时间

## 窗口类型

### 基于计数的窗口

```java
window(2)     // 2 个数据点的滑动窗口
window(5)     // 5 个数据点的滑动窗口
window(10)    // 10 个数据点的滑动窗口
```

### 基于时间的窗口

```java
window(100ms)  // 100 毫秒窗口
window(10s)    // 10 秒窗口
window(1m)     // 1 分钟窗口
window(1h)     // 1 小时窗口
window(1d)     // 1 天窗口
```

## 工作原理

滑动窗口:
1. 维护数据的固定大小视图
2. 随着新数据到达向前滑动
3. 仅包含窗口内的数据进行计算

### 基于计数的示例

```java
// 2 个数据点的窗口
String expression = "filter((-5,5)).window(2).sum().meet(>1)";

// 数据流: 3, -2, 4, 1
// 窗口状态:
// 3 之后: [3] (窗口尚未满)
// -2 之后: [3, -2] (窗口满,总和 = 1)
// 4 之后: [-2, 4] (窗口滑动,总和 = 2)
// 1 之后: [4, 1] (窗口滑动,总和 = 5)
```

### 基于时间的示例

```java
// 100ms 时间窗口
String expression = "filter((-5,5)).window(100ms).sum().meet(>=7)";

// 仅包含时间戳在最后 100ms 内的数据
// 窗口根据时间戳自动滑动
```

## 基本示例

### 简单计数窗口

```java
// 最后 2 个值的总和
String expression = "filter(>0).window(2).sum().meet(>10)";
```

### 基于时间的窗口

```java
// 最后 5 秒内值的平均值
String expression = "filter(>0).window(5s).avg().meet(>50)";
```

## 实际应用示例

### 温度监控

```java
// 如果最后 10 秒的平均温度超过 30°C 则告警
String expression = "filter(>0).window(10s).avg().meet(>30)";
```

### 生产质量控制

```java
// 检查最后 5 个产品是否都在规格范围内
String expression = "filter([95,105]).window(5).count().meet(==5)";
```

### 网络监控

```java
// 如果最后 1 分钟的平均响应时间超过 500ms 则告警
String expression = "filter(>0).window(1m).avg().meet(>500)";
```

### 传感器数据处理

```java
// 最后 10 次读数的标准差
String expression = "filter(!=0).window(10).stddev().meet(<5)";
```

## Window vs Limit

**重要**: 不能在同一表达式中同时使用 `window()` 和 `limit()`。

| 特性 | window() | limit() |
|---------|----------|---------|
| 目的 | 滑动窗口分析 | 控制最大数据存储 |
| 计算 | 仅对窗口数据 | 对所有存储的数据 |
| 使用场景 | 窗口计算 | 内存管理 |
| 冲突 | 不能与 limit() 一起使用 | 不能与 window() 一起使用 |

```java
// ❌ 错误: 不能同时使用两者
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ 使用其中一个
"filter(>0).window(5).sum().meet(>100)"
"filter(>0).limit(10).sum().meet(>100)"
```

## 高级用法

### 用于实时分析的小窗口

```java
// 检测即时变化(窗口为 2)
String expression = "filter(>0).window(2).sum().meet(>100)";
```

### 用于趋势分析的大窗口

```java
// 分析每小时趋势
String expression = "filter(>0).window(1h).avg().meet(>threshold)";
```

### 统计分析

```java
// 计算滚动标准差
String expression = "filter(>0).window(20).stddev().meet(<10)";
```

## 与其他阶段结合

### Window + Take

```java
// 使用窗口,然后取子集
String expression = "filter(>0).window(10).take(0,5).avg().meet(>50)";
```

### 状态转换中的 Window

```java
// 不同状态使用不同窗口
String expression = "{filter(>0).window(5).sum().meet(>10)}->{filter(<0).window(3).sum().meet(<(-5))}";
```

## 最佳实践

### 1. 选择适当的窗口大小

```java
// 好的做法: 窗口大小符合分析需求
"filter(>0).window(10).avg().meet(>50)"  // 10 点移动平均

// 避免: 窗口过小
"filter(>0).window(1).avg().meet(>50)"  // 直接使用值即可!
```

### 2. 对时间序列数据使用时间窗口

```java
// 好的做法: 对时间分析使用基于时间的窗口
"filter(>0).window(1m).avg().meet(>threshold)"

// 不太理想: 对时间敏感数据使用基于计数的窗口
"filter(>0).window(60).avg().meet(>threshold)"  // 假设 1 点/秒
```

### 3. 窗口大小必须 > 0

```java
// ❌ 错误: 无效的窗口大小
"filter(>0).window(0).sum().meet(>100)"

// ✅ 有效的窗口大小
"filter(>0).window(5).sum().meet(>100)"
```

### 4. 考虑数据速率

```java
// 高频数据(100 点/秒)
"filter(>0).window(100ms).avg().meet(>50)"  // ~10 个点

// 低频数据(1 点/分钟)
"filter(>0).window(10).avg().meet(>50)"  // ~10 分钟的数据
```

## 常见模式

### 移动平均

```java
"filter(>0).window(n).avg().meet(>threshold)"
```

### 滚动总和

```java
"filter([min,max]).window(n).sum().meet([expected_min,expected_max])"
```

### 窗口计数

```java
"filter(condition).window(n).count().meet(>min_count)"
```

### 基于时间的聚合

```java
"filter(>0).window(duration).calculator().meet(condition)"
```

## 窗口计算

### 窗口内的总和

```java
// 最后 5 个值的总和
String expression = "filter(>0).window(5).sum().meet(>100)";
```

### 窗口内的平均值

```java
// 最后 10 个值的移动平均
String expression = "filter(>0).window(10).avg().meet([40,60])";
```

### 窗口内的计数

```java
// 最后 1 分钟内的值计数
String expression = "filter(>threshold).window(1m).count().meet(>10)";
```

### 窗口内的标准差

```java
// 最后 20 个值的变异性
String expression = "filter(>0).window(20).stddev().meet(<5)";
```

## 性能考虑

- **基于计数的窗口**: 滑动是 O(1)
- **基于时间的窗口**: 需要时间戳比较
- **内存使用**: 与窗口大小成正比
- **计算**: 在每个新数据点上执行

## 常见陷阱

### 1. 窗口大小过小

```java
// 没有用处
"filter(>0).window(1).avg().meet(>50)"
// 窗口为 1 就是当前值!
```

### 2. 窗口大小过大

```java
// 可能违背窗口化的目的
"filter(>0).window(10000).avg().meet(>50)"
// 考虑使用 limit() 代替
```

### 3. 同时使用 Window 和 Limit

```java
// ❌ 错误
"filter(>0).limit(20).window(10).sum().meet(>100)"

// ✅ 选择其中一个
"filter(>0).window(10).sum().meet(>100)"
```

### 4. 窗口大小为零或负数

```java
// ❌ 错误
"filter(>0).window(0).sum().meet(>100)"
"filter(>0).window(-5).sum().meet(>100)"

// ✅ 必须为正数
"filter(>0).window(5).sum().meet(>100)"
```

## 时间单位参考

| 单位 | 语法 | 示例 |
|------|--------|---------|
| 毫秒 | `ms` | `window(100ms)` |
| 秒 | `s` | `window(10s)` |
| 分钟 | `m` | `window(5m)` |
| 小时 | `h` | `window(2h)` |
| 天 | `d` | `window(1d)` |

## 使用场景

### 实时监控

```java
// 检测即时峰值
"filter(>0).window(3).avg().meet(>threshold)"
```

### 趋势分析

```java
// 分析长期趋势
"filter(>0).window(1h).avg().meet(>baseline)"
```

### 异常检测

```java
// 检测异常变异性
"filter(>0).window(50).stddev().meet(>normal_stddev*2)"
```

### 质量控制

```java
// 确保质量一致
"filter([min,max]).window(10).count().meet(==10)"
```

## 下一步

- [Limit](./limit.md) - 数据限制
- [Take](./take.md) - 选择特定数据点
- [Calculators](./calculators.md) - 执行计算
- [Filter](./filter.md) - 数据过滤


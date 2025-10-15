# Limit(限制)

`limit()` 函数控制链式表达式中存储的最大数据量。它通过维护固定大小的缓冲区来防止过度使用内存。

## 语法

```
limit(size)
```

- **size**: 最大数据点数量或时间持续时间

## 大小类型

### 基于计数的限制

```java
limit(10)    // 保留最后 10 个数据点
limit(100)   // 保留最后 100 个数据点
limit(1000)  // 保留最后 1000 个数据点
```

### 基于时间的限制

```java
limit(100ms)  // 保留最后 100 毫秒的数据
limit(10s)    // 保留最后 10 秒的数据
limit(1m)     // 保留最后 1 分钟的数据
limit(1h)     // 保留最后 1 小时的数据
limit(1d)     // 保留最后 1 天的数据
```

## 工作原理

限制函数维护一个缓冲区:
1. 存储传入的数据点
2. 当超过限制时移除最旧的数据
3. 作为**FIFO(先进先出)**队列运行

### 基于计数的示例

```java
// 保留最后 3 个值
String expression = "filter(>0).limit(3).sum().meet(>10)";

// 数据流: 5, 2, 8, 3, 7
// 缓冲区状态:
// 5 之后: [5]
// 2 之后: [5, 2]
// 8 之后: [5, 2, 8]
// 3 之后: [2, 8, 3]  ← 5 被移除(最旧)
// 7 之后: [8, 3, 7]  ← 2 被移除(最旧)
```

### 基于时间的示例

```java
// 保留最后 1 秒的数据
String expression = "filter(>0).limit(1s).avg().meet(>50)";

// 仅保留时间戳在最后 1 秒内的数据
// 较旧的数据会自动移除
```

## 基本示例

### 简单计数限制

```java
// 保留最后 10 个值,计算总和
String expression = "filter(>0).limit(10).sum().meet(>100)";
```

### 基于时间的限制

```java
// 保留最后 100ms 的数据,计算平均值
String expression = "filter(>0).limit(100ms).avg().meet(>50)";
```

### 无过滤

```java
// 限制所有数据(无过滤)
String expression = "limit(5).sum().meet(>20)";
```

## 可选限制

如果不指定限制,数据会无限累积(谨慎使用):

```java
// 无限制 - 保留所有数据
String expression = "filter(>0).sum().meet(>1000)";
// ⚠️ 警告: 随着时间推移可能使用过多内存
```

## Limit vs Window

**重要**: 不能在同一表达式中同时使用 `limit()` 和 `window()`。

| 特性 | limit() | window() |
|---------|---------|----------|
| 目的 | 控制最大数据量 | 滑动窗口分析 |
| 行为 | FIFO 缓冲区 | 滑动窗口 |
| 配合使用 | 任何计算器 | 任何计算器 |
| 冲突 | 不能与 window() 一起使用 | 不能与 limit() 一起使用 |

```java
// ❌ 错误: 不能同时使用两者
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ 使用其中一个
"filter(>0).limit(10).sum().meet(>100)"
"filter(>0).window(5).sum().meet(>100)"
```

## 高级用法

### 大缓冲区

```java
// 保留最后 1000 个值用于统计分析
String expression = "filter(>0).limit(1000).stddev().meet(<10)";
```

### 短时间窗口

```java
// 实时监控: 最后 100ms
String expression = "filter(>0).limit(100ms).avg().meet(>threshold)";
```

### 长时间窗口

```java
// 每日聚合: 最后 24 小时
String expression = "filter(>0).limit(1d).sum().meet(>daily_target)";
```

## 与其他阶段结合

### Limit + Take

```java
// 保留最后 10 个,使用前 5 个进行计算
String expression = "filter(>0).limit(10).take(0,5).avg().meet(>50)";
```

### Limit + 多个计算器(在状态转换中)

```java
// 不同状态使用不同限制
String expression = "{filter(>0).limit(5).sum().meet(>10)}->{filter(<0).limit(3).sum().meet(<(-5))}";
```

```java
// 清晰的时间单位
"filter(>0).limit(5s).avg().meet(>50)"  // 5 秒

// 避免歧义
"filter(>0).limit(5).avg().meet(>50)"  // 5 什么? 点还是秒?
```

## 常见陷阱

### 1. 限制过小

```java
// 可能没有足够的数据
"filter(>0).limit(2).avg().meet(>50)"
// 2 个点的平均值可能不具代表性
```

### 2. 限制过大

```java
// 过度使用内存
"filter(>0).limit(1000000).sum().meet(>target)"
```

### 3. 同时使用 Limit 和 Window

```java
// ❌ 错误
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ 选择其中一个
"filter(>0).limit(10).sum().meet(>100)"
```

### 4. 忘记时间单位

```java
// 模糊
"limit(5)"  // 5 个数据点

// 清晰
"limit(5s)"  // 5 秒
```

## 时间单位参考

| 单位 | 语法 | 示例 |
|------|--------|---------|
| 毫秒 | `ms` | `limit(100ms)` |
| 秒 | `s` | `limit(10s)` |
| 分钟 | `m` | `limit(5m)` |
| 小时 | `h` | `limit(2h)` |
| 天 | `d` | `limit(1d)` |

## 下一步

- [Window](./window) - 滑动窗口分析
- [Take](./take) - 选择特定数据点
- [Filter](./filter) - 数据过滤
- [Calculators](./calculators) - 执行计算


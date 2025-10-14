# 链式表达式概述

链式表达式提供了一种强大的方式来通过管道处理数据集合。它们允许您在单个可读的表达式中过滤、限制、转换和验证数据。

## 什么是链式表达式?

链式表达式由多个操作链接在一起组成,类似于函数式编程管道:

```
filter(condition).limit(n).calculator().meet(condition)
```

每个操作处理数据并将结果传递给链中的下一个操作。

## 基本结构

链式表达式由四个主要阶段组成:

```
[过滤] → [限制] → [计算] → [验证]
```

1. **Filter(过滤)**: 选择要处理的数据
2. **Limit(限制)**: 控制保留多少数据
3. **Calculate(计算)**: 执行计算(sum、avg、count 等)
4. **Meet(验证)**: 验证结果

## 简单示例

```java
// 过滤正值,求和,检查总和是否 > 10
String expression = "filter(>0).sum().meet(>10)";

RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "value", "5", timestamp1),
    new RhythmixEventData("2", "value", "-2", timestamp2),
    new RhythmixEventData("3", "value", "8", timestamp3)
};

boolean result = executor.execute(data); // true (5 + 8 = 13 > 10)
```

## 完整示例

```java
// 复杂链式表达式
String expression = "filter((-5,5)).limit(5).take(0,2).sum().meet(>1)";

// 分解:
// 1. filter((-5,5)) - 仅保留 -5 和 5 之间的值
// 2. limit(5) - 最多存储 5 个值
// 3. take(0,2) - 取前 2 个值
// 4. sum() - 计算总和
// 5. meet(>1) - 检查总和是否 > 1
```

## 链式表达式阶段

### 1. 过滤阶段(可选)

基于条件过滤数据:

```java
filter(>0)          // 保留正值
filter([10,20])     // 保留范围内的值
filter(!=0&&!=(-1)) // 保留有效值
```

[了解更多关于 Filter →](./filter)

### 2. 限制阶段(可选)

控制数据收集:

```java
limit(10)      // 保留最后 10 个值
limit(100ms)   // 保留最后 100ms 的值
limit(1h)      // 保留最后 1 小时的值
window(5)      // 5 个值的滑动窗口
window(10s)    // 10 秒的滑动窗口
```

[了解更多关于 Limit →](./limit)
[了解更多关于 Window →](./window)

### 3. 选取阶段(可选)

选择特定数据进行计算:

```java
take(0,2)    // 取前 2 个值
take(-3)     // 取最后 3 个值
take(1,4)    // 取索引 1,2,3 的值
```

[了解更多关于 Take →](./take)

### 4. 计算阶段(必需)

对数据执行计算:

```java
sum()      // 计算总和
avg()      // 计算平均值
count()    // 计数值
stddev()   // 计算标准差
```

[了解更多关于计算器 →](./calculators)

### 5. 验证阶段(必需)

验证计算结果:

```java
meet(>10)       // 结果必须 > 10
meet([0,100])   // 结果必须在范围内
meet(!=0)       // 结果不能为 0
```

[了解更多关于 Meet →](./meet)

## 实际应用示例

### 温度监控

```java
// 如果最后 5 次读数的平均温度超过 30°C 则告警
String expression = "filter(>0).limit(5).avg().meet(>30)";
```

### 生产质量控制

```java
// 检查最后 10 个产品重量的总和是否在可接受范围内
String expression = "filter([90,110]).limit(10).sum().meet([950,1050])";
```

### 网络性能

```java
// 如果最后 100ms 的平均响应时间超过 500ms 则告警
String expression = "filter(>0).window(100ms).avg().meet(>500)";
```

### 传感器数据处理

```java
// 验证最后 3 个有效读数的总和为正
String expression = "filter(!=0&&!=(-1)).take(-3).sum().meet(>0)";
```

## 最小链式表达式

最小链式表达式只需要一个计算器和一个验证条件:

```java
// 无过滤,无限制,仅计算和验证
String expression = "sum().meet(>0)";
```

## 可选阶段

您可以省略不需要的阶段:

```java
// 无过滤
"limit(10).sum().meet(>100)"

// 无限制
"filter(>0).sum().meet(>50)"

// 无选取
"filter(>0).limit(5).sum().meet(>10)"

// 仅计算器和验证(最小)
"sum().meet(>0)"
```

## 与状态转换结合

链式表达式可以在状态转换中使用:

```java
// 状态 1: 正值的总和 > 10
// 状态 2: 值 < 5
String expression = "{filter(>0).sum().meet(>10)}->{<5}";
```

## 高级模式

### 多阶段处理

```java
// 复杂数据处理管道
String expression = "filter(>0&&<100).limit(20).window(10).take(0,5).avg().meet([20,80])";

// 1. 过滤: 保留 0 和 100 之间的值
// 2. 限制: 最多存储 20 个值
// 3. 窗口: 使用 10 个值的滑动窗口
// 4. 选取: 从窗口中使用前 5 个值
// 5. 计算: 平均值
// 6. 验证: 结果必须在 20 和 80 之间
```

### 基于时间的处理

```java
// 处理最后 1 分钟的数据,计算平均值
String expression = "filter(>0).window(1m).avg().meet(>50)";
```

### 统计分析

```java
// 计算最后 10 个有效读数的标准差
String expression = "filter(!=0).limit(10).stddev().meet(<5)";
```

## 最佳实践

### 1. 尽早过滤

```java
// 好的做法: 首先过滤以减少数据
"filter(>0).limit(100).sum().meet(>1000)"

// 效率较低: 首先处理所有数据
"limit(100).sum().meet(>1000)"  // 包含负值
```

### 2. 使用适当的限制

```java
// 好的做法: 合理的限制
"filter(>0).limit(10).avg().meet(>50)"

// 避免: 过度限制
"filter(>0).limit(10000).avg().meet(>50)"  // 可能使用过多内存
```

### 3. 选择正确的计算器

```java
// 用于总计
"sum().meet(>100)"

// 用于平均值
"avg().meet(>50)"

// 用于变异性
"stddev().meet(<10)"
```

### 4. 清晰的验证条件

```java
// 好的做法: 清晰的阈值
"sum().meet(>100)"

// 避免: 不清晰的条件
"sum().meet(>42.7)"  // 为什么是 42.7?
```

## 常见模式

### 滚动平均

```java
"filter(>0).window(10).avg().meet(>threshold)"
```

### 总和验证

```java
"filter([min,max]).limit(n).sum().meet([expected_min,expected_max])"
```

### 异常值检测

```java
"filter(>0).limit(100).stddev().meet(>threshold)"
```

### 最近数据分析

```java
"filter(>0).window(1m).calculator().meet(condition)"
```

## 性能考虑

- **尽早过滤**: 减少要处理的数据
- **适当限制**: 控制内存使用
- **使用窗口**: 用于基于时间的分析
- **选择高效的计算器**: sum() 和 count() 最快

## 常见陷阱

### 1. 忘记必需阶段

```java
// 错误: 缺少 meet()
"filter(>0).sum()"  // ❌

// 正确
"filter(>0).sum().meet(>10)"  // ✅
```

### 2. 冲突的 Limit 和 Window

```java
// 错误: 不能同时使用两者
"limit(10).window(5).sum().meet(>0)"  // ❌

// 使用其中一个
"limit(10).sum().meet(>0)"  // ✅
"window(5).sum().meet(>0)"  // ✅
```

### 3. 无效的 Take 范围

```java
// 错误: 选取超过可用数量
"limit(5).take(0,10).sum().meet(>0)"  // 可能没有 10 个值

// 正确: 在限制范围内选取
"limit(10).take(0,5).sum().meet(>0)"  // ✅
```

## 下一步

- [Filter](./filter) - 数据过滤
- [Limit](./limit) - 数据限制
- [Window](./window) - 滑动窗口
- [Take](./take) - 数据选择
- [Calculators](./calculators) - 计算
- [Meet](./meet) - 结果验证


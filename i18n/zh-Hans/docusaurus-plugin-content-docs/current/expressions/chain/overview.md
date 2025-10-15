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


## 下一步

- [Filter](./filter) - 数据过滤
- [Limit](./limit) - 数据限制
- [Window](./window) - 滑动窗口
- [Take](./take) - 数据选择
- [Calculators](./calculators) - 计算
- [Meet](./meet) - 结果验证


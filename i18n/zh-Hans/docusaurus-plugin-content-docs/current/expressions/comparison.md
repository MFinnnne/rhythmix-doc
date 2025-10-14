# 比较表达式

比较表达式是 Rhythmix 中最基本的表达式类型。它们使用标准数学运算符比较数据值。

## 运算符

| 运算符 | 描述 | 示例 | 匹配条件 |
|----------|-------------|---------|---------|
| `>` | 大于 | `>30` | 大于 30 的值 |
| `<` | 小于 | `<10` | 小于 10 的值 |
| `>=` | 大于或等于 | `>=20` | 20 或更大的值 |
| `<=` | 小于或等于 | `<=100` | 100 或更小的值 |
| `==` | 等于 | `==5` | 恰好等于 5 的值 |
| `!=` | 不等于 | `!=0` | 不等于 0 的值 |

## 基本示例

### 大于

```java
String expression = ">30";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data1 = new RhythmixEventData("1", "temp", "35", timestamp);
boolean result1 = executor.execute(data1); // true

RhythmixEventData data2 = new RhythmixEventData("2", "temp", "25", timestamp);
boolean result2 = executor.execute(data2); // false
```

### 小于

```java
String expression = "<10";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "5", timestamp);
boolean result = executor.execute(data); // true
```

### 等于

```java
String expression = "==25";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "25", timestamp);
boolean result = executor.execute(data); // true
```

### 不等于

```java
String expression = "!=0";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "5", timestamp);
boolean result = executor.execute(data); // true
```

## 浮点数比较

Rhythmix 支持浮点数比较:

```java
// 带小数的温度监控
String expression = ">36.5";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "temp", "37.2", timestamp);
boolean result = executor.execute(data); // true
```

## 使用比较的状态转换

使用状态转换组合多个比较表达式:

```java
// 温度: 正常 → 高温 → 正常
String expression = "{<=40}->{>80}->{<=40}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "temp", "35", timestamp1),  // <=40 ✓
    new RhythmixEventData("2", "temp", "85", timestamp2),  // >80 ✓
    new RhythmixEventData("3", "temp", "30", timestamp3)   // <=40 ✓
};

boolean result = executor.execute(data); // true
```

## 下一步

- [区间表达式](./interval) - 定义范围
- [逻辑表达式](./logical) - 组合条件
- [函数](./functions/count) - 模式匹配
- [示例](../examples/temperature-monitoring) - 实际应用案例


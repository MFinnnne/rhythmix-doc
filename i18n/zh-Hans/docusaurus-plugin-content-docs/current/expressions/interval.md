# 区间表达式

区间表达式允许您使用数学符号定义范围。它们非常适合检查值是否在特定边界内。

## 语法

区间表达式使用括号定义范围,类似于数学区间表示法:

| 表达式 | 含义 | 示例 |
|------------|---------|---------|
| `(a,b)` | 大于 a 且小于 b | `(10,20)` |
| `[a,b]` | 大于或等于 a 且小于或等于 b | `[10,20]` |
| `(a,b]` | 大于 a 且小于或等于 b | `(10,20]` |
| `[a,b)` | 大于或等于 a 且小于 b | `[10,20)` |

**记住:**
- `(` 或 `)` = **不包含** (大于/小于)
- `[` 或 `]` = **包含** (大于或等于/小于或等于)

## 基本示例

### 不包含边界的范围

```java
// 值必须在 10 和 20 之间(不包含边界)
String expression = "(10,20)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("15")); // true  (10 < 15 < 20)
executor.execute(createData("10")); // false (不满足 > 10)
executor.execute(createData("20")); // false (不满足 < 20)
```

### 包含边界的范围

```java
// 值必须在 10 和 20 之间(包含边界)
String expression = "[10,20]";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("15")); // true  (10 <= 15 <= 20)
executor.execute(createData("10")); // true  (10 <= 10 <= 20)
executor.execute(createData("20")); // true  (10 <= 20 <= 20)
```

### 混合边界

```java
// 大于 10,最多到 20(包含 20)
String expression = "(10,20]";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("10")); // false (不满足 > 10)
executor.execute(createData("15")); // true  (10 < 15 <= 20)
executor.execute(createData("20")); // true  (10 < 20 <= 20)
```

## 浮点数范围

区间表达式可以无缝处理小数:

```java
// 温度范围: 36.5°C 到 37.5°C
String expression = "[36.5,37.5]";

// 电压范围: 大于 3.0V,最多到 3.6V
String expression = "(3.0,3.6]";

// 湿度: 40% 到 60%(不包含边界)
String expression = "(40.0,60.0)";
```

## 使用区间的状态转换

在状态转换中组合区间以实现复杂模式:

```java
// 温度监控: 正常 → 警告 → 危险
String expression = "{[20,30]}->{(30,40]}->{(40,50]}";

RhythmixEventData[] data = {
    new RhythmixEventData("1", "temp", "25", timestamp1),  // [20,30] ✓
    new RhythmixEventData("2", "temp", "35", timestamp2),  // (30,40] ✓
    new RhythmixEventData("3", "temp", "45", timestamp3)   // (40,50] ✓
};

boolean result = executor.execute(data); // true
```


## 与逻辑运算符结合

您可以将区间与逻辑运算符结合使用:

```java
// 值在范围 [10,20] 或 [30,40] 内
String expression = "[10,20]||[30,40]";

// 值在范围 [0,100] 内且不等于 50
String expression = "[0,100]&&!=50";

// 复杂条件
String expression = "([10,30]||[70,90])&&!=50";
```

## 与 count() 函数配合使用

```java
// 计数 5 个连续的正常范围内的值
String expression = "count!([95,105], 5)";

// 计数 3 个警告范围内的值
String expression = "count((80,95), 3)";

// 带计数的状态转换
String expression = "{count!([20,30], 5)}->{(30,50]}";
```

## 下一步

- [逻辑表达式](./logical) - 组合条件
- [比较表达式](./comparison) - 简单比较
- [函数](./functions/count) - 模式匹配
- [示例](../examples/production-quality) - 质量控制示例


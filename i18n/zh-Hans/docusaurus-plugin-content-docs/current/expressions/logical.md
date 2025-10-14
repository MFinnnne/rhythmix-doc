# 逻辑表达式

逻辑表达式允许您使用逻辑运算符组合多个条件: OR (`||`)、AND (`&&`) 和 NOT (`!`)。

## 运算符

| 运算符 | 描述 | 示例 |
|----------|-------------|---------|
| `\|\|` | OR - 至少一个条件必须为真 | `>30\|\|<10` |
| `&&` | AND - 所有条件必须为真 | `!=0&&!=5` |
| `!` | NOT - 否定一个条件 | `!=0` |

## OR 运算符 (`||`)

OR 运算符在**至少一个**条件满足时返回 `true`。

### 基本 OR 示例

```java
// 温度太热或太冷
String expression = ">40||<10";

RhythmixEventData data1 = new RhythmixEventData("1", "temp", "45", timestamp);
executor.execute(data1); // true (45 > 40)

RhythmixEventData data2 = new RhythmixEventData("2", "temp", "5", timestamp);
executor.execute(data2); // true (5 < 10)

RhythmixEventData data3 = new RhythmixEventData("3", "temp", "25", timestamp);
executor.execute(data3); // false (不满足 >40 且不满足 <10)
```

### 多个 OR 条件

```java
// 值为 0、5 或 10
String expression = "==0||==5||==10";

// 值在多个范围内
String expression = "[10,20]||[30,40]||[50,60]";
```

## AND 运算符 (`&&`)

AND 运算符仅在**所有**条件都满足时返回 `true`。

### 基本 AND 示例

```java
// 值不为 0 且不为 5
String expression = "!=0&&!=5";

RhythmixEventData data1 = new RhythmixEventData("1", "value", "3", timestamp);
executor.execute(data1); // true (3 != 0 且 3 != 5)

RhythmixEventData data2 = new RhythmixEventData("2", "value", "0", timestamp);
executor.execute(data2); // false (0 == 0)

RhythmixEventData data3 = new RhythmixEventData("3", "value", "5", timestamp);
executor.execute(data3); // false (5 == 5)
```

### 多个 AND 条件

```java
// 值在范围内且不等于特定值
String expression = "[0,100]&&!=50";

// 多个排除条件
String expression = "!=0&&!=(-1)&&!=999";
```

## NOT 运算符 (`!`)

NOT 运算符主要用于不等于 (`!=`) 表达式。

```java
// 不等于 0
String expression = "!=0";

// 不等于 -1(错误代码)
String expression = "!=(-1)";
```

## 组合运算符

您可以组合多个逻辑运算符来创建复杂条件。

### OR 和 AND 一起使用

```java
// (大于 10 且小于 20) 或等于 0
String expression = "(>10&&<20)||==0";

// 值在范围 [10,30] 或 [70,90] 内,且不等于 50
String expression = "([10,30]||[70,90])&&!=50";
```

### 使用括号控制优先级

括号 `()` 控制求值顺序:

```java
// 没有括号 - 可能有歧义
String expression = ">10&&<20||==0";

// 有括号 - 意图清晰
String expression = "(>10&&<20)||==0";
```

## 常见模式

### 排除模式

```java
// 排除特定值
"!=0&&!=(-1)&&!=999"
```

### 带例外的范围

```java
// 在范围内但不是特定值
"[0,100]&&!=50"
```

### 多个有效范围

```java
// 值在多个范围中的任意一个
"[10,20]||[30,40]||[50,60]"
```

### 复合条件

```java
// 多个标准必须全部满足
"[20,30]&&[40,60]&&>0"
```

## 下一步

- [比较表达式](./comparison) - 基本比较
- [区间表达式](./interval) - 范围定义
- [函数](./functions/count) - 模式匹配
- [示例](../examples/network-monitoring) - 实际应用


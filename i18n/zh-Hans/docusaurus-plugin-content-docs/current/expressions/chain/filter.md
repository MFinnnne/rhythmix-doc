# Filter(过滤)

`filter()` 函数是链式表达式的第一阶段。它选择哪些数据点应该包含在后续处理中。

## 语法

```
filter(condition)
```

- **condition**: 任何有效的 Rhythmix 表达式(比较、区间、逻辑)

## 工作原理

过滤函数:
1. 根据条件评估每个数据点
2. **保留**匹配条件的数据
3. **丢弃**不匹配的数据
4. 将过滤后的数据传递到下一阶段

### 按比较过滤

```java
// 仅保留正值
String expression = "filter(>0).sum().meet(>10)";

// 数据: 5, -2, 8, -1, 3
// 过滤后: 5, 8, 3
// 总和: 16 > 10 → true
```

### 按范围过滤

```java
// 保留 -5 和 5 之间的值
String expression = "filter((-5,5)).sum().meet(>1)";

// 数据: 10, 2, -3, 8, 1
// 过滤后: 2, -3, 1
// 总和: 0 > 1 → false
```

### 按逻辑条件过滤

```java
// 保留非 0 或 -1 的值(错误代码)
String expression = "filter(!=0&&!=(-1)).avg().meet(>50)";

// 数据: 60, 0, 70, -1, 80
// 过滤后: 60, 70, 80
// 平均值: 70 > 50 → true
```

## 可选过滤

如果不需要过滤,可以省略过滤阶段:

```java
// 无过滤 - 处理所有数据
String expression = "sum().meet(>100)";
```

## 高级用法

### 多个条件

```java
// 复杂过滤逻辑
String expression = "filter((>10&&<20)||>50).sum().meet(>100)";

// 保留以下值:
// - 在 10 和 20 之间,或
// - 大于 50
```

### 带排除的范围

```java
// 范围内但不是特定值的值
String expression = "filter([0,100]&&!=50).avg().meet(>40)";
```

### 多个范围

```java
// 多个可接受范围内的值
String expression = "filter([10,20]||[30,40]||[50,60]).count().meet(>5)";
```

## 与其他阶段结合

### Filter + Limit

```java
// 过滤正值,保留最后 10 个
String expression = "filter(>0).limit(10).sum().meet(>100)";
```

### Filter + Window

```java
// 过滤有效值,使用 5 秒窗口
String expression = "filter(!=0).window(5s).avg().meet(>50)";
```

### Filter + Take

```java
// 过滤范围,取前 3 个
String expression = "filter([10,20]).take(0,3).sum().meet(>30)";
```

## 自定义过滤器

Rhythmix 支持用于复杂过滤逻辑的自定义过滤器函数:

```java
// 使用自定义过滤器(如果已实现)
String expression = "customFilter().sum().meet(>100)";
```

[了解更多关于自定义过滤器 →](../../advanced/custom-filters)


## 常见陷阱

### 1. 过滤掉所有数据

```java
// 可能过滤掉所有内容
"filter(>1000).sum().meet(>100)"
// 如果没有值 > 1000,总和将为 0
```

### 2. 矛盾条件

```java
// 不可能的条件
"filter(>10&&<5)"  // 没有值可以满足这个条件
```

### 3. 忘记负值

```java
// 可能无意中包含负值
"filter(!=0).sum().meet(>100)"
// 包含负数!

// 更好: 明确指定
"filter(>0).sum().meet(>100)"
```

## Filter 与其他阶段对比

| 阶段 | 目的 | 何时使用 |
|-------|---------|-------------|
| filter() | 选择数据 | 移除无效/不需要的数据 |
| limit() | 控制数量 | 限制内存使用 |
| window() | 基于时间的选择 | 分析最近数据 |
| take() | 基于索引的选择 | 选择特定位置 |

## 下一步

- [Limit](./limit) - 控制数据数量
- [Window](./window) - 基于时间的窗口
- [Take](./take) - 基于索引的选择
- [自定义过滤器](../../advanced/custom-filters) - 高级过滤


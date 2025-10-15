# 计算器

计算器对链式表达式中收集的数据执行计算。每个链式表达式都需要计算器。

## 内置计算器

Rhythmix 提供四个内置计算器:

| 计算器 | 描述 | 返回值 |
|------------|-------------|---------|
| `sum()` | 所有值的总和 | 数字 |
| `avg()` | 所有值的平均值 | 数字 |
| `count()` | 值的数量 | 整数 |
| `stddev()` | 标准差 | 数字(3 位小数) |

## sum()

计算数据集中所有值的总和。

### 语法

```java
sum()
```

### 示例

```java
// 正值的总和
String expression = "filter(>0).sum().meet(>100)";

// 数据: [10, 20, 30]
// 总和: 60
```
## avg()

计算所有值的平均值(均值)。

### 语法

```java
avg()
```

### 示例

```java
// 平均温度
String expression = "filter(>0).avg().meet([20,30])";

// 数据: [22, 25, 28]
// 平均值: 25
```

## count()

计算数据集中值的数量。

### 语法

```java
count()
```

### 示例

```java
// 计数有效读数
String expression = "filter(!=0&&!=(-1)).count().meet(>10)";

// 数据: [5, 0, 8, -1, 3, 7]
// 过滤后: [5, 8, 3, 7]
// 计数: 4
```

## stddev()

计算值的标准差。至少需要 2 个数据点。

### 语法

```java
stddev()
```

### 示例

```java
String expression = "filter(>0).stddev().meet(<5)";

// 数据: [10, 12, 11, 13]
// 标准差: ~1.29
```

## 组合计算器

您可以在不同状态中使用不同的计算器:

```java
// 状态 1: 总和 > 100
// 状态 2: 平均值 < 50
"{filter(>0).sum().meet(>100)}->{filter(>0).avg().meet(<50)}"
```

## 自定义计算器

您可以创建自定义计算器用于专门的计算。

[了解更多关于自定义计算器 →](../../advanced/custom-calculators)

## 最佳实践

### 1. 选择正确的计算器

```java
// 用于总计
"sum().meet(>1000)"

// 用于平均值
"avg().meet(>50)"

// 用于计数
"count().meet(>10)"

// 用于标准差
"stddev().meet(<5)"
```

### 2. 确保足够的数据

```java
// 好的做法: 足够的数据用于标准差计算
"filter(>0).limit(20).stddev().meet(<5)"

// 有风险: 标准差至少需要 2 个数据点
"filter(>0).limit(1).stddev().meet(<5)"  // 可能失败
```

### 3. 处理边界情况

```java
// 在计算前过滤掉无效值
"filter(!=0&&!=(-1)).avg().meet(>50)"
```

## 下一步

- [Meet](./meet) - 验证结果
- [自定义计算器](../../advanced/custom-calculators) - 创建您自己的计算器
- [Filter](./filter) - 数据过滤
- [示例](../../examples/temperature-monitoring) - 实际应用案例


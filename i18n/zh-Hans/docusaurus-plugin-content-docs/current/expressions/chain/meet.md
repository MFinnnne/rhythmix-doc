# Meet(验证)

`meet()` 函数是链式表达式的最后阶段。它验证计算结果是否满足指定条件。

## 语法

```
meet(condition)
```

- **condition**: 任何有效的 Rhythmix 表达式(比较、区间、逻辑)

## 工作原理

验证函数:
1. 从计算器接收结果
2. 根据条件评估结果
3. 如果满足条件返回 `true`,否则返回 `false`

## 基本示例

### 比较条件

```java
// 结果必须大于 10
String expression = "filter(>0).sum().meet(>10)";

// 结果必须小于 100
String expression = "filter(>0).avg().meet(<100)";

// 结果必须等于 5
String expression = "filter(>0).count().meet(==5)";
```

### 区间条件

```java
// 结果必须在范围 [20,30] 内
String expression = "filter(>0).avg().meet([20,30])";

// 结果必须在 0 和 100 之间(不包含边界)
String expression = "filter(>0).sum().meet((0,100))";
```

### 逻辑条件

```java
// 结果必须大于 10 或小于 5
String expression = "filter(>0).avg().meet(>10||<5)";

// 结果必须在范围内且不等于 50
String expression = "filter(>0).sum().meet([0,100]&&!=50)";
```


[了解更多关于自定义 Meet 函数 →](../../advanced/custom-meet-functions)

## 高级用法

### 复杂条件

```java
// 带括号的多个条件
String expression = "filter(>0).avg().meet((>20&&<30)||>50)";

// 分解:
// - 平均值在 20 和 30 之间,或
// - 平均值大于 50
```

### 与状态转换结合

```java
// 状态 1: 总和 > 100
// 状态 2: 平均值 < 50
String expression = "{filter(>0).sum().meet(>100)}->{filter(>0).avg().meet(<50)}";
```

### 不同状态中的多个 Meet 条件

```java
// 不同阶段的不同验证
String expression = "{filter(>0).sum().meet([100,200])}->{filter(<0).sum().meet(<(-50))}";
```

## 最佳实践

### 1. 使用清晰的阈值

```java
// 好的做法: 清晰、有意义的阈值
"sum().meet(>100)"  // 基于业务需求

// 避免: 任意值
"sum().meet(>42.7)"  // 为什么是 42.7?
```

### 2. 对有界值使用范围

```java
// 好的做法: 有界检查
"avg().meet([20,30])"  // 温度舒适范围

// 不太理想: 两个单独的检查
"avg().meet(>=20&&<=30)"  // 使用区间代替
```

### 3. 记录复杂条件

```java
// 复杂条件 - 添加注释
String expression = "filter(>0).avg().meet((>threshold&&<max)||==special_value)";
// 满足: 正常范围或特殊情况
```

### 4. 处理边界情况

```java
// 从正值检查中排除零
"sum().meet(>0)"  // 严格正值

// 如果需要包含零
"sum().meet(>=0)"  // 非负值
```

## 常见模式

### 阈值验证

```java
"calculator().meet(>threshold)"
"calculator().meet(<max_value)"
```

### 范围验证

```java
"calculator().meet([min,max])"
"calculator().meet((lower,upper))"
```

### 精确匹配

```java
"calculator().meet(==expected_value)"
```

### 排除

```java
"calculator().meet(!=invalid_value)"
"calculator().meet(!=error1&&!=error2)"
```

## Meet 条件类型

### 基于比较

```java
meet(>10)    // 大于
meet(<100)   // 小于
meet(==5)    // 等于
meet(!=0)    // 不等于
meet(>=20)   // 大于或等于
meet(<=80)   // 小于或等于
```

### 基于范围

```java
meet([10,20])   // 包含边界的范围
meet((10,20))   // 不包含边界的范围
meet([10,20))   // 混合边界
meet((10,20])   // 混合边界
```

### 基于逻辑

```java
meet(>10||<5)           // OR 条件
meet(>=20&&<=80)        // AND 条件
meet([0,100]&&!=50)     // 带排除的范围
meet((>30||<10)&&!=20)  // 复杂逻辑
```

## 性能考虑

- Meet 评估是 O(1)
- 简单比较最快
- 复杂逻辑表达式稍慢
- 实践中没有显著的性能差异

## 常见陷阱

### 1. 忘记 meet() 是必需的

```java
// ❌ 错误: 缺少 meet()
"filter(>0).sum()"

// ✅ 正确
"filter(>0).sum().meet(>100)"
```

### 2. 矛盾条件

```java
// ❌ 不可能的条件
"sum().meet(>100&&<50)"

// ✅ 有效条件
"sum().meet(>50&&<100)"
```

### 3. 范围使用错误的运算符

```java
// 不太清晰
"avg().meet(>=20&&<=30)"

// 更好: 使用区间
"avg().meet([20,30])"
```

## 自定义 Meet 函数

您可以创建自定义 meet 函数用于专门的验证:

```java
// 自定义阈值检查
"sum().customThresholdMeet()"

// 自定义范围验证
"avg().customRangeMeet()"
```

[了解更多关于自定义 Meet 函数 →](../../advanced/custom-meet-functions)

## 下一步

- [Calculators](./calculators) - 执行计算
- [自定义 Meet 函数](../../advanced/custom-meet-functions) - 创建自定义验证
- [链式概述](./overview) - 完整的链式表达式指南
- [示例](../../examples/temperature-monitoring) - 实际应用


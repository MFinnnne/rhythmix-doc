<!--
 * @Author: MFine
 * @Date: 2025-10-14 20:01:02
 * @LastEditTime: 2025-10-14 22:40:38
 * @LastEditors: MFine
 * @Description: 
-->
# 基本概念

理解 Rhythmix 的核心概念将帮助您编写强大的规则表达式。

## 什么是 Rhythmix？

Rhythmix 是一个用于**流数据处理**的**规则表达式引擎**。它允许您使用简单、直观的表达式在数据流中定义模式（节奏）。

## 核心组件

### 1. 表达式

表达式定义了您想要在数据流中匹配的模式。表达式可以是：

- **简单的**：`>5`（值大于 5）
- **复杂的**：`{>1}->{count(<1,3)}->{==3}`（状态转换）
- **基于链式的**：`filter(>0).sum().meet(>10)`（数据处理管道）

### 2. 状态单元

状态单元是表达式的构建块，用花括号 `{}` 括起来：

```
{state_unit_A}->{state_unit_B}->{state_unit_C}
```

每个状态单元必须在移动到下一个之前得到满足。

### 3. RhythmixEventData

流经表达式的数据对象：

```java
public class RhythmixEventData {
    private String id;           // 数据唯一标识符
    private String code;         // 数据编码
    private String serialNumber; // 序列号
    private String name;         // 数据名称/事件名称
    private String value;        // 数据值（核心字段）
    private Timestamp ts;        // 时间戳
    private String[] args;       // 扩展字段数组
}
#### 构造方法

**完整构造方法**：

```java
// 手动指定所有字段
RhythmixEventData data = new RhythmixEventData("id001", "event1", "25.5", new Timestamp(System.currentTimeMillis()));
```

**自动生成ID构造方法**：

```java
// 自动生成唯一ID
RhythmixEventData data = new RhythmixEventData("temperature", "25.5", new Timestamp(System.currentTimeMillis()));
```

**Builder模式构造**：

```java
RhythmixEventData data = RhythmixEventData.builder()
    .id("sensor001")
    .name("temperature")
    .value("25.5")
    .ts(new Timestamp(System.currentTimeMillis()))
    .code("TEMP_001")
    .serialNumber("SN123456")
    .build();
```

#### 字段说明

| 字段           | 类型      | 必填 | 说明                                 |
| -------------- | --------- | ---- | ------------------------------------ |
| `id`           | String    | 是   | 数据唯一标识符                       |
| `name`         | String    | 是   | 事件/数据名称，用于标识数据类型      |
| `value`        | String    | 是   | **核心字段**，表达式计算的主要数据值 |
| `ts`           | Timestamp | 是   | 时间戳，用于时间窗口和状态转换       |
| `code`         | String    | 否   | 数据编码，可用于分类或标识           |
| `serialNumber` | String    | 否   | 序列号，可用于设备标识               |
| `args`         | String[]  | 否   | 扩展字段，用于存储额外信息           |
```

### 4. 执行器

处理数据的编译表达式：

```java
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
boolean result = executor.execute(data);
```

## 表达式类型

### 比较表达式

使用标准运算符比较值：

- `>` 大于
- `<` 小于
- `>=` 大于或等于
- `<=` 小于或等于
- `==` 等于
- `!=` 不等于

**示例**：`>30` 匹配大于 30 的值

### 区间表达式

使用数学符号定义范围：

- `(a,b)` - 大于 a 且小于 b
- `[a,b]` - 大于或等于 a 且小于或等于 b
- `(a,b]` - 大于 a 且小于或等于 b
- `[a,b)` - 大于或等于 a 且小于 b

**示例**：`[20,30]` 匹配 20 到 30 之间的值（包含边界）

### 逻辑表达式

使用逻辑运算符组合条件：

- `||` 或运算符
- `&&` 与运算符
- `!` 非运算符

**示例**：`>30||<10` 匹配大于 30 或小于 10 的值

### 函数表达式

使用内置函数处理复杂模式：

- `count(condition, n)` - 计数 n 个非连续匹配
- `count!(condition, n)` - 计数 n 个连续匹配

**示例**：`count(>50, 3)` 当有 3 个值（不一定连续）大于 50 时匹配

### 链式表达式

通过管道处理数据集合：

```
filter(condition).limit(n).calculator().meet(condition)
```

**示例**：`filter(>0).sum().meet(>100)` 过滤正值，求和，然后检查总和是否大于 100

## 状态转换

状态转换允许您定义顺序模式：

```java
{state_A}->{state_B}->{state_C}
```

只有当所有状态按顺序满足时，表达式才返回 `true`。

**示例**：`{<10}->{>50}->{[20,30]}`
- 首先：值必须小于 10
- 然后：值必须大于 50
- 最后：值必须在 20 到 30 之间

## 简写符号

对于简单的状态转换，您可以使用简写：

```
<0,1>  // 等价于 {==0}->{==1}
```

## 下一步

- 详细探索[表达式语法](../expressions/overview.md)
- 学习[链式表达式](../expressions/chain/overview.md)
- 查看[实际示例](../examples/temperature-monitoring.md)


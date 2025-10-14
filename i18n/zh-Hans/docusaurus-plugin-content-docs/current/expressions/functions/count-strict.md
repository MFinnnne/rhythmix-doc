# Count 函数

Rhythmix 提供两种计数函数用于检测数据模式:

- **`count()`** - 计数**非连续**匹配(宽松模式)
- **`count!()`** - 计数**连续**匹配(严格模式)

---

## count() 函数 - 非连续计数

`count()` 函数计数匹配特定条件的**非连续**数据出现次数。

### 语法

```
count(condition, n)
```

- **condition**: 任何有效的 Rhythmix 表达式(比较、区间、逻辑)
- **n**: 所需的匹配次数

### 工作原理

`count()` 函数维护一个计数器:
- 当数据匹配条件时**递增**
- 当数据不匹配时**保持不变**
- 当计数器达到 `n` 时**返回 true**

**关键特性**: 匹配不需要连续!

### 基本示例

#### 简单计数

```java
// 计数 3 个大于 4 的值
String expression = "count(>4, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "event", "5", timestamp1),  // >4 ✓ (count=1)
    new RhythmixEventData("2", "event", "2", timestamp2),  // ≤4 ✗ (count=1)
    new RhythmixEventData("3", "event", "6", timestamp3),  // >4 ✓ (count=2)
    new RhythmixEventData("4", "event", "1", timestamp4),  // ≤4 ✗ (count=2)
    new RhythmixEventData("5", "event", "7", timestamp5)   // >4 ✓ (count=3) → true
};

boolean result = executor.execute(data); // true
```

#### 使用区间计数

```java
// 计数范围 [10,20] 内的 5 个值
String expression = "count([10,20], 5)";

// 数据: 15, 5, 18, 25, 12, 30, 11, 19, 20
// 匹配: 15, 18, 12, 11, 19 → true (5 次匹配)
```

#### 使用逻辑表达式计数

```java
// 计数 3 个 >50 或 <10 的值
String expression = "count(>50||<10, 3)";

// 数据: 60, 25, 5, 30, 55, 40, 8
// 匹配: 60, 5, 55 → true (3 次匹配)
```
---

## count!() 函数 - 连续计数(严格模式)

`count!()` 函数计数匹配特定条件的**连续**数据出现次数。感叹号表示"严格"模式。

### 语法

```
count!(condition, n)
```

- **condition**: 任何有效的 Rhythmix 表达式(比较、区间、逻辑)
- **n**: 所需的连续匹配次数

### 工作原理

`count!()` 函数维护一个计数器:
- 当数据匹配条件时**递增**
- 当数据不匹配时**重置为 0** ⚠️
- 当计数器连续达到 `n` 时**返回 true**

**关键特性**: 匹配必须连续!

### 基本示例

#### 简单连续计数

```java
// 计数 3 个连续的大于 4 的值
String expression = "count!(>4, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "event", "5", timestamp1),  // >4 ✓ (count=1)
    new RhythmixEventData("2", "event", "2", timestamp2),  // ≤4 ✗ (count=0) ← 重置!
    new RhythmixEventData("3", "event", "6", timestamp3),  // >4 ✓ (count=1)
    new RhythmixEventData("4", "event", "7", timestamp4),  // >4 ✓ (count=2)
    new RhythmixEventData("5", "event", "8", timestamp5)   // >4 ✓ (count=3) → true
};

boolean result = executor.execute(data); // true
```

#### 范围内的连续值

```java
// 检测范围 [10,20] 内的 5 个连续值
String expression = "count!([10,20], 5)";

// 数据: 15, 18, 12, 5, 11, 14, 16, 19, 20
// 第一个序列: 15, 18, 12 (在 5 处中断)
// 第二个序列: 11, 14, 16, 19, 20 → true (5 个连续)
```

#### 连续逻辑条件

```java
// 检测 3 个连续的非 0 或 -1 的值
String expression = "count!(!=0&&!=(-1), 3)";

// 用于检测有效的传感器读数
```
---

## 对比: count() vs count!()

| 特性 | count() | count!() |
|---------|---------|----------|
| 匹配方式 | 非连续 | **仅连续** |
| 计数器行为 | 不匹配时保持计数 | **不匹配时重置为 0** |
| 使用场景 | 总出现次数 | 连续模式 |
| 严格性 | 宽松 | 严格 |

### 并排示例对比

```java
// 数据序列: 5, 2, 6, 1, 7, 8, 9

// count(>4, 3) - 宽松(非连续)
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=1) ← 计数保留
// 6: >4 ✓ (count=2)
// 1: ≤4 ✗ (count=2) ← 计数保留
// 7: >4 ✓ (count=3) → true (更早!)

// count!(>4, 3) - 严格(连续)
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=0) ← 重置!
// 6: >4 ✓ (count=1)
// 1: ≤4 ✗ (count=0) ← 重置!
// 7: >4 ✓ (count=1)
// 8: >4 ✓ (count=2)
// 9: >4 ✓ (count=3) → true
```

### 何时使用 count!() vs count()

#### 使用 count!() 当:
- ✅ 需要检测**持续**条件
- ✅ 想要过滤掉**临时峰值**
- ✅ 寻找**连续模式**
- ✅ 需要确认**趋势**

#### 使用 count() 当:
- ✅ 需要计数**总出现次数**
- ✅ 匹配可以**分散**
- ✅ 寻找**累积**模式
- ✅ 时间不重要,只关注**数量**

---

## 状态转换

### 使用 count() 进行状态转换

将 `count()` 与状态转换结合以实现复杂模式:

```java
// 模式: 正常 → 多次高读数 → 恢复正常
String expression = "{<30}->{count(>50, 3)}->{<30}";

// 阶段 1: 值小于 30
// 阶段 2: 收集 3 个大于 50 的值(非连续)
// 阶段 3: 值再次小于 30
```

#### 多阶段监控

```java
// 检测逐步升级的问题
String expression = "{count(>40, 2)}->{count(>60, 2)}->{>80}";

// 阶段 1: 2 个值超过 40
// 阶段 2: 2 个值超过 60
// 阶段 3: 值超过 80
```

### 使用 count!() 进行状态转换

#### 基本模式

```java
// 模式: 正常 → 持续高位 → 恢复
String expression = "{<30}->{count!(>50, 3)}->{<30}";

// 阶段 1: 值小于 30
// 阶段 2: 3 个连续的大于 50 的值
// 阶段 3: 值再次小于 30
```

#### 多阶段升级

```java
// 检测逐步升级的持续问题
String expression = "{count!([40,60], 3)}->{count!(>60, 3)}->{>80}";

// 阶段 1: 3 个连续的 [40,60] 范围内的值
// 阶段 2: 3 个连续的 > 60 的值
// 阶段 3: 值 > 80
```

#### 复杂状态机

```java
// 综合监控模式
String expression = "{==0}->{count!(>4, 3)}->{count!(<2, 2)}->{==0}";

// 开始: 值为 0
// 阶段 1: 3 个连续的 > 4 的值
// 阶段 2: 2 个连续的 < 2 的值
// 结束: 值返回到 0
```
---

## 下一步

- [链式表达式](../chain/overview) - 数据处理管道
- [状态转换](../../advanced/state-transitions) - 复杂模式
- [温度监控示例](../../examples/temperature-monitoring) - 实际应用案例
- [质量控制示例](../../examples/production-quality) - 质量控制示例


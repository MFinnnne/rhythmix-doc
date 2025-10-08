# Expression Syntax Overview

Rhythmix expressions are the heart of the rule engine. They define patterns and conditions that your data must match.

## Expression Structure

An expression consists of **state units** connected by arrows:

```
{state_unit_A}->{state_unit_B}->{state_unit_C}
```

- **Curly braces `{}`** contain the state unit definition
- **Arrow `->`** connects state units in sequence
- **Last state satisfied** triggers the expression to return `true`

## Example

```java
{>1}->{count(<1,3)}->{==3}
```

This expression means:
1. First value must be **greater than 1**
2. Then collect **3 values less than 1** (non-consecutive)
3. Finally, value must **equal 3**

## Expression Types

Rhythmix supports five main types of expressions:

### 1. Comparison Expressions

Compare values using standard operators:

```java
>5      // Greater than 5
<10     // Less than 10
==3     // Equal to 3
!=0     // Not equal to 0
>=20    // Greater than or equal to 20
<=100   // Less than or equal to 100
```

[Learn more about Comparison Expressions →](./comparison.md)

### 2. Interval Expressions

Define ranges using mathematical notation:

```java
(1,10)    // Between 1 and 10 (exclusive)
[0,100]   // Between 0 and 100 (inclusive)
(5,15]    // Greater than 5, up to and including 15
[20,50)   // From 20 (inclusive) to 50 (exclusive)
```

[Learn more about Interval Expressions →](./interval.md)

### 3. Logical Expressions

Combine conditions with logical operators:

```java
>30||<10        // Greater than 30 OR less than 10
!=0&&!=5        // Not 0 AND not 5
(>10&&<20)||==0 // Between 10 and 20, OR equal to 0
```

[Learn more about Logical Expressions →](./logical.md)

### 4. Function Expressions

Use built-in functions for pattern matching:

```java
count(>4, 3)    // Count 3 non-consecutive values > 4
count!(>4, 3)   // Count 3 consecutive values > 4
```

[Learn more about Functions →](./functions/count.md)

### 5. Chain Expressions

Process data collections through a pipeline:

```java
filter(>0).sum().meet(>100)
filter((-5,5)).limit(5).take(0,2).sum().meet(>1)
```

[Learn more about Chain Expressions →](./chain/overview.md)

## Shorthand Notation

For simple sequential values, use shorthand:

```java
<0,1>  // Equivalent to {==0}->{==1}
<1,2,3>  // Equivalent to {==1}->{==2}->{==3}
```

## Combining Expression Types

You can combine different expression types for powerful patterns:

```java
// Comparison + Interval + Logical
{>10&&<20}->{[30,40]||>50}->{!=0}

// Functions + State Transitions
{count(>5, 3)}->{<2}->{==0}

// Chain expressions in state units
{filter(>0).sum().meet(>10)}->{<5}
```

## Expression Evaluation

### Single Data Point

```java
String expression = ">5";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "test", "7", timestamp);
boolean result = executor.execute(data); // true
```

### Multiple Data Points

```java
String expression = "{>1}->{<1}->{==3}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "test", "2", timestamp1),
    new RhythmixEventData("2", "test", "0", timestamp2),
    new RhythmixEventData("3", "test", "3", timestamp3)
};

boolean result = executor.execute(data); // true
```

### Incremental Execution

```java
String expression = "{>1}->{<1}->{==3}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

boolean r1 = executor.execute(data1); // false - waiting for more data
boolean r2 = executor.execute(data2); // false - waiting for more data
boolean r3 = executor.execute(data3); // true - pattern matched!
```

## Best Practices

### 1. Start Simple

Begin with basic expressions and gradually add complexity:

```java
// Start with: >30
// Then add: >30&&<50
// Finally: {>30&&<50}->{<10}->{==0}
```

### 2. Use Appropriate Types

Choose the right expression type for your use case:

- **Comparison**: Single value checks
- **Interval**: Range checks
- **Logical**: Multiple conditions
- **Functions**: Pattern counting
- **Chain**: Data aggregation

### 3. Test Each State

Test state units individually before combining:

```java
// Test each state separately
RhythmixCompiler.compile(">1");
RhythmixCompiler.compile("count(<1,3)");
RhythmixCompiler.compile("==3");

// Then combine
RhythmixCompiler.compile("{>1}->{count(<1,3)}->{==3}");
```

### 4. Use Parentheses for Clarity

Make complex expressions readable:

```java
// Less clear
>10&&<20||==0

// More clear
(>10&&<20)||==0
```

## Common Patterns

### Temperature Monitoring

```java
// Alert if temperature goes from normal to high
{[20,30]}->{>40}
```

### Quality Control

```java
// Check if 5 consecutive products are within spec
count!([95,105], 5)
```

### Network Monitoring

```java
// Detect latency spike: normal → high → recovery
{<100}->{>1000}->{<200}
```

### Anomaly Detection

```java
// Filter positive values, sum them, check if total exceeds threshold
filter(>0).limit(10).sum().meet(>100)
```

## Next Steps

- [Comparison Expressions](./comparison.md) - Detailed comparison operators
- [Interval Expressions](./interval.md) - Range definitions
- [Logical Expressions](./logical.md) - Combining conditions
- [Functions](./functions/count.md) - Pattern matching functions
- [Chain Expressions](./chain/overview.md) - Data processing pipelines


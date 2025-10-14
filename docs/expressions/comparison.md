# Comparison Expressions

Comparison expressions are the most basic type of expression in Rhythmix. They compare data values using standard mathematical operators.

## Operators

| Operator | Description | Example | Matches |
|----------|-------------|---------|---------|
| `>` | Greater than | `>30` | Values greater than 30 |
| `<` | Less than | `<10` | Values less than 10 |
| `>=` | Greater than or equal | `>=20` | Values 20 or higher |
| `<=` | Less than or equal | `<=100` | Values 100 or lower |
| `==` | Equal to | `==5` | Values exactly equal to 5 |
| `!=` | Not equal to | `!=0` | Values not equal to 0 |

## Basic Examples

### Greater Than

```java
String expression = ">30";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data1 = new RhythmixEventData("1", "temp", "35", timestamp);
boolean result1 = executor.execute(data1); // true

RhythmixEventData data2 = new RhythmixEventData("2", "temp", "25", timestamp);
boolean result2 = executor.execute(data2); // false
```

### Less Than

```java
String expression = "<10";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "5", timestamp);
boolean result = executor.execute(data); // true
```

### Equal To

```java
String expression = "==25";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "25", timestamp);
boolean result = executor.execute(data); // true
```

### Not Equal To

```java
String expression = "!=0";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "value", "5", timestamp);
boolean result = executor.execute(data); // true
```

## Floating Point Comparisons

Rhythmix supports floating-point number comparisons:

```java
// Temperature monitoring with decimals
String expression = ">36.5";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "temp", "37.2", timestamp);
boolean result = executor.execute(data); // true
```

## State Transitions with Comparisons

Combine multiple comparison expressions using state transitions:

```java
// Temperature: normal → high → normal
String expression = "{<=40}->{>80}->{<=40}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "temp", "35", timestamp1),  // <=40 ✓
    new RhythmixEventData("2", "temp", "85", timestamp2),  // >80 ✓
    new RhythmixEventData("3", "temp", "30", timestamp3)   // <=40 ✓
};

boolean result = executor.execute(data); // true
```

## Real-World Examples

### Temperature Monitoring

```java
// Alert when temperature exceeds 30°C
String expression = ">30";

// Detect overheating: normal → hot
String expression = "{<=30}->{>40}";

// Detect temperature spike and recovery
String expression = "{<=30}->{>50}->{<=35}";
```

### Production Quality Control

```java
// Product weight must be at least 95g
String expression = ">=95";

// Detect underweight products
String expression = "<95";

// Detect weight fluctuation: normal → low → normal
String expression = "{>=95}->{<90}->{>=95}";
```

### Network Monitoring

```java
// Response time exceeds 1000ms
String expression = ">1000";

// Detect latency spike
String expression = "{<=500}->{>1000}";

// Monitor recovery: normal → slow → fast
String expression = "{<100}->{>1000}->{<200}";
```

### Sensor Data Validation

```java
// Pressure sensor reading is zero (possible fault)
String expression = "==0";

// Humidity sensor reading is invalid
String expression = "!=(-1)";

// Voltage is within operating range
String expression = ">=3.0";
```

## Using with count() Function

Comparison expressions work great with the `count()` function:

```java
// Count 3 values greater than 4
String expression = "count(>4, 3)";

// Count 5 consecutive values less than 10
String expression = "count!(<10, 5)";

// State transition with count
String expression = "{count(>50, 3)}->{<10}";
```

## Best Practices

### 1. Choose the Right Operator

```java
// For exact matches
"==100"

// For thresholds
">100"  // Exceeds threshold
">=100" // Meets or exceeds threshold
```

### 2. Handle Edge Cases

```java
// Exclude error values
"!=0&&!=(-1)"

// Include boundary values
">=0&&<=100"
```

### 3. Use Meaningful Thresholds

```java
// Good: Based on domain knowledge
">36.5"  // Human body temperature threshold

// Avoid: Arbitrary values without context
">42.7"  // Why 42.7?
```

### 4. Combine with State Transitions

```java
// Detect anomaly patterns
"{<=100}->{>500}->{<=100}"  // Spike detection
```

## Common Pitfalls

### Floating Point Precision

```java
// Be careful with exact equality on floats
"==3.14"  // May not match 3.140000001

// Better: Use ranges for floats
"[3.13,3.15]"  // More robust
```

### String to Number Conversion

```java
// Ensure data values are numeric strings
RhythmixEventData data = new RhythmixEventData("1", "value", "abc", timestamp);
// This will cause an error!

// Always use numeric strings
RhythmixEventData data = new RhythmixEventData("1", "value", "123", timestamp);
```

## Next Steps

- [Interval Expressions](./interval) - Define ranges
- [Logical Expressions](./logical) - Combine conditions
- [Functions](./functions/count) - Pattern matching
- [Examples](../examples/temperature-monitoring) - Real-world use cases


# Interval Expressions

Interval expressions allow you to define ranges using mathematical notation. They're perfect for checking if values fall within specific bounds.

## Syntax

Interval expressions use brackets to define ranges, similar to mathematical interval notation:

| Expression | Meaning | Example |
|------------|---------|---------|
| `(a,b)` | Greater than a AND less than b | `(10,20)` |
| `[a,b]` | Greater than or equal to a AND less than or equal to b | `[10,20]` |
| `(a,b]` | Greater than a AND less than or equal to b | `(10,20]` |
| `[a,b)` | Greater than or equal to a AND less than b | `[10,20)` |

**Remember:**
- `(` or `)` = **Exclusive** (greater/less than)
- `[` or `]` = **Inclusive** (greater/less than or equal)

## Basic Examples

### Exclusive Range

```java
// Value must be between 10 and 20 (exclusive)
String expression = "(10,20)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("15")); // true  (10 < 15 < 20)
executor.execute(createData("10")); // false (not > 10)
executor.execute(createData("20")); // false (not < 20)
```

### Inclusive Range

```java
// Value must be between 10 and 20 (inclusive)
String expression = "[10,20]";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("15")); // true  (10 <= 15 <= 20)
executor.execute(createData("10")); // true  (10 <= 10 <= 20)
executor.execute(createData("20")); // true  (10 <= 20 <= 20)
```

### Mixed Boundaries

```java
// Greater than 10, up to and including 20
String expression = "(10,20]";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(createData("10")); // false (not > 10)
executor.execute(createData("15")); // true  (10 < 15 <= 20)
executor.execute(createData("20")); // true  (10 < 20 <= 20)
```

## Floating Point Ranges

Interval expressions work seamlessly with decimal numbers:

```java
// Temperature range: 36.5°C to 37.5°C
String expression = "[36.5,37.5]";

// Voltage range: greater than 3.0V, up to 3.6V
String expression = "(3.0,3.6]";

// Humidity: 40% to 60% (exclusive)
String expression = "(40.0,60.0)";
```

## State Transitions with Intervals

Combine intervals in state transitions for complex patterns:

```java
// Temperature monitoring: normal → warning → critical
String expression = "{[20,30]}->{(30,40]}->{(40,50]}";

RhythmixEventData[] data = {
    new RhythmixEventData("1", "temp", "25", timestamp1),  // [20,30] ✓
    new RhythmixEventData("2", "temp", "35", timestamp2),  // (30,40] ✓
    new RhythmixEventData("3", "temp", "45", timestamp3)   // (40,50] ✓
};

boolean result = executor.execute(data); // true
```

## Real-World Examples

### Temperature Control System

```java
// Normal operating temperature: 20-25°C (inclusive)
String expression = "[20,25]";

// Safe temperature range: 0-100°C (inclusive)
String expression = "[0,100]";

// Warning range: above 80°C but not exceeding 90°C
String expression = "(80,90]";

// State transition: normal → warning → critical
String expression = "{[20,30]}->{(30,50]}->{(50,100]}";
```

### Production Quality Control

```java
// Product weight specification: 95-105g (inclusive)
String expression = "[95,105]";

// Dimension tolerance: 49.5-50.5mm (exclusive)
String expression = "(49.5,50.5)";

// Detect out-of-spec then back in-spec
String expression = "{[95,105]}->{(0,95)||(105,200)}->{[95,105]}";
```

### Network Performance Monitoring

```java
// Normal response time: 0-500ms (inclusive start, exclusive end)
String expression = "[0,500)";

// Acceptable response time: 500-1000ms (exclusive)
String expression = "(500,1000)";

// Timeout range: above 1000ms, up to 5000ms
String expression = "(1000,5000]";

// Performance degradation pattern
String expression = "{[0,500)}->{(500,1000)}->{(1000,5000]}";
```

### Sensor Data Validation

```java
// Humidity sensor valid range: 0-100% (inclusive)
String expression = "[0,100]";

// Pressure sensor normal range: above 0, below 1000 (exclusive)
String expression = "(0,1000)";

// Voltage operating range: 3.0-3.6V (inclusive start, exclusive end)
String expression = "[3.0,3.6)";
```

### Financial Risk Control

```java
// Normal transaction amount: 100-10000 yuan (inclusive)
String expression = "[100,10000]";

// Suspicious transaction: above 10000, up to 50000
String expression = "(10000,50000]";

// High-risk transaction: above 50000
String expression = "(50000,999999)";

// Risk escalation pattern
String expression = "{[100,10000]}->{(10000,50000]}->{(50000,999999)}";
```

### Device Monitoring

```java
// CPU usage normal: 0-80% (inclusive start, exclusive end)
String expression = "[0,80)";

// Memory usage warning: 80-95% (exclusive)
String expression = "(80,95)";

// Disk usage critical: 95-100% (inclusive)
String expression = "[95,100]";

// System health degradation
String expression = "{[0,80)}->{(80,95)}->{[95,100]}";
```

## Combining with Logical Operators

You can combine intervals with logical operators:

```java
// Value in range [10,20] OR [30,40]
String expression = "[10,20]||[30,40]";

// Value in range [0,100] AND not equal to 50
String expression = "[0,100]&&!=50";

// Complex condition
String expression = "([10,30]||[70,90])&&!=50";
```

## Using with count() Function

```java
// Count 5 consecutive values in normal range
String expression = "count!([95,105], 5)";

// Count 3 values in warning range
String expression = "count((80,95), 3)";

// State transition with count
String expression = "{count!([20,30], 5)}->{(30,50]}";
```

## Best Practices

### 1. Choose Appropriate Boundaries

```java
// For specifications with tolerances, use inclusive
"[95,105]"  // Product weight: 100g ± 5g

// For thresholds, use exclusive on the boundary
"(80,100)"  // Above 80, below 100
```

### 2. Use Meaningful Ranges

```java
// Good: Based on domain knowledge
"[36.5,37.5]"  // Normal body temperature range

// Avoid: Arbitrary ranges
"[42.7,89.3]"  // Why these specific values?
```

### 3. Consider Floating Point Precision

```java
// For floating point comparisons, use ranges instead of exact equality
"[3.13,3.15]"  // Better than ==3.14
```

### 4. Document Complex Ranges

```java
// Clear intent
"[0,80)"    // Normal CPU usage: 0% to just under 80%
"(80,95)"   // Warning: above 80%, below 95%
"[95,100]"  // Critical: 95% to 100%
```

## Common Patterns

### Range Validation

```java
// Check if value is within acceptable range
"[min,max]"
```

### Threshold Detection

```java
// Detect when value crosses into warning zone
"{[0,80)}->{[80,95)}"
```

### Multi-Level Monitoring

```java
// Normal → Warning → Critical
"{[0,30]}->{(30,60]}->{(60,100]}"
```

## Next Steps

- [Logical Expressions](./logical.md) - Combine conditions
- [Comparison Expressions](./comparison.md) - Simple comparisons
- [Functions](./functions/count.md) - Pattern matching
- [Examples](../examples/production-quality.md) - Quality control examples


# count() Function

The `count()` function counts **non-consecutive** occurrences of data that match a specific condition.

## Syntax

```
count(condition, n)
```

- **condition**: Any valid Rhythmix expression (comparison, interval, logical)
- **n**: Number of matches required

## How It Works

The `count()` function maintains a counter that:
- **Increments** when data matches the condition
- **Stays the same** when data doesn't match
- **Returns true** when the counter reaches `n`

**Key Feature**: Matches don't need to be consecutive!

## Basic Examples

### Simple Count

```java
// Count 3 values greater than 4
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

### Count with Interval

```java
// Count 5 values in range [10,20]
String expression = "count([10,20], 5)";

// Data: 15, 5, 18, 25, 12, 30, 11, 19, 20
// Matches: 15, 18, 12, 11, 19 → true (5 matches)
```

### Count with Logical Expression

```java
// Count 3 values that are either >50 or <10
String expression = "count(>50||<10, 3)";

// Data: 60, 25, 5, 30, 55, 40, 8
// Matches: 60, 5, 55 → true (3 matches)
```

## Comparison: count() vs count!()

| Feature | count() | count!() |
|---------|---------|----------|
| Matching | Non-consecutive | Consecutive only |
| Counter behavior | Keeps count when no match | Resets to 0 when no match |
| Use case | Total occurrences | Sequential patterns |

### Example Comparison

```java
// Data sequence: 5, 2, 6, 1, 7, 8, 9

// count(>4, 3) - Non-consecutive
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=1) ← count preserved
// 6: >4 ✓ (count=2)
// 1: ≤4 ✗ (count=2) ← count preserved
// 7: >4 ✓ (count=3) → true

// count!(>4, 3) - Consecutive
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=0) ← count reset!
// 6: >4 ✓ (count=1)
// 1: ≤4 ✗ (count=0) ← count reset!
// 7: >4 ✓ (count=1)
// 8: >4 ✓ (count=2)
// 9: >4 ✓ (count=3) → true
```

## Real-World Examples

### Temperature Monitoring

```java
// Alert if temperature exceeds 30°C three times (not necessarily consecutive)
String expression = "count(>30, 3)";

// Data: 32, 28, 25, 31, 29, 33
// Matches: 32, 31, 33 → Alert triggered
```

### Production Quality Control

```java
// Flag batch if 5 products are out of spec (anywhere in the batch)
String expression = "count(<95||>105, 5)";

// Detects quality issues even if they're scattered throughout production
```

### Network Monitoring

```java
// Alert if response time exceeds 1000ms three times in a window
String expression = "count(>1000, 3)";

// Catches intermittent latency issues
```

### Sensor Data Validation

```java
// Detect if sensor gives invalid readings 3 times
String expression = "count(==0||==(-1), 3)";

// Identifies potentially faulty sensors
```

## State Transitions with count()

Combine `count()` with state transitions for complex patterns:

```java
// Pattern: Normal → Multiple high readings → Back to normal
String expression = "{<30}->{count(>50, 3)}->{<30}";

// Stage 1: Value less than 30
// Stage 2: Collect 3 values greater than 50 (non-consecutive)
// Stage 3: Value less than 30 again
```

### Multi-Stage Monitoring

```java
// Detect escalating issues
String expression = "{count(>40, 2)}->{count(>60, 2)}->{>80}";

// Stage 1: 2 values above 40
// Stage 2: 2 values above 60
// Stage 3: Value above 80
```

## Advanced Usage

### Nested in State Transitions

```java
// Complex pattern detection
String expression = "{==0}->{count(>4, 3)}->{count(<2, 2)}";

// Start with 0
// Then count 3 values > 4
// Finally count 2 values < 2
```

### Multiple count() Functions

```java
// Different stages with different counts
String expression = "{count([10,20], 5)}->{count(>50, 3)}->{<10}";
```

### With Logical Operators

```java
// Count values in multiple ranges
String expression = "count([10,20]||[30,40], 5)";

// Count values meeting multiple criteria
String expression = "count(>10&&<100&&!=50, 10)";
```

## Best Practices

### 1. Choose count() for Total Occurrences

```java
// Good use of count()
"count(>threshold, 3)"  // Any 3 occurrences

// Use count!() instead if you need consecutive
"count!(>threshold, 3)"  // 3 in a row
```

### 2. Set Appropriate Thresholds

```java
// Based on domain knowledge
"count(>30, 3)"  // 3 temperature spikes

// Avoid arbitrary values
"count(>42.7, 7)"  // Why these numbers?
```

### 3. Combine with Time Windows

```java
// In chain expressions, use with window()
"filter(>0).window(100).count(>50, 5)"
```

### 4. Document Complex Patterns

```java
// Clear intent
String expression = "count(>95, 10)";
// Alert if 10 or more readings exceed 95% (anywhere in the data)
```

## Common Patterns

### Threshold Violation Detection

```java
// Detect repeated threshold violations
"count(>threshold, n)"
```

### Quality Control

```java
// Count defects in a batch
"count(<min||>max, acceptable_defects)"
```

### Anomaly Detection

```java
// Detect scattered anomalies
"count(>mean+2*stddev, 3)"
```

### Multi-Condition Counting

```java
// Count complex conditions
"count((>high||<low)&&!=error_value, n)"
```

## Performance Considerations

- `count()` maintains state across data points
- Memory usage is minimal (just a counter)
- Efficient for large data streams
- No need to store all matching data points

## Common Pitfalls

### Confusing count() with count!()

```java
// If you need consecutive matches, use count!()
"count!(>50, 3)"  // Not "count(>50, 3)"
```

### Forgetting State Persistence

```java
// count() keeps counting across state transitions
"{count(>10, 3)}->{<5}"
// The count persists until it reaches 3, then moves to next state
```

## Next Steps

- [count!() Function](./count-strict) - Consecutive counting
- [Chain Expressions](../chain/overview) - Data processing pipelines
- [State Transitions](../../advanced/state-transitions) - Complex patterns
- [Examples](../../examples/temperature-monitoring) - Real-world use cases


# count!() Function (Strict Mode)

The `count!()` function counts **consecutive** occurrences of data that match a specific condition. The exclamation mark indicates "strict" mode.

## Syntax

```
count!(condition, n)
```

- **condition**: Any valid Rhythmix expression (comparison, interval, logical)
- **n**: Number of consecutive matches required

## How It Works

The `count!()` function maintains a counter that:
- **Increments** when data matches the condition
- **Resets to 0** when data doesn't match ⚠️
- **Returns true** when the counter reaches `n` consecutively

**Key Feature**: Matches MUST be consecutive!

## Basic Examples

### Simple Consecutive Count

```java
// Count 3 consecutive values greater than 4
String expression = "count!(>4, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "event", "5", timestamp1),  // >4 ✓ (count=1)
    new RhythmixEventData("2", "event", "2", timestamp2),  // ≤4 ✗ (count=0) ← RESET!
    new RhythmixEventData("3", "event", "6", timestamp3),  // >4 ✓ (count=1)
    new RhythmixEventData("4", "event", "7", timestamp4),  // >4 ✓ (count=2)
    new RhythmixEventData("5", "event", "8", timestamp5)   // >4 ✓ (count=3) → true
};

boolean result = executor.execute(data); // true
```

### Consecutive Values in Range

```java
// Detect 5 consecutive values in range [10,20]
String expression = "count!([10,20], 5)";

// Data: 15, 18, 12, 5, 11, 14, 16, 19, 20
// First sequence: 15, 18, 12 (breaks at 5)
// Second sequence: 11, 14, 16, 19, 20 → true (5 consecutive)
```

### Consecutive Logical Conditions

```java
// Detect 3 consecutive values that are NOT 0 or -1
String expression = "count!(!=0&&!=(-1), 3)";

// Useful for detecting valid sensor readings
```

## Comparison: count!() vs count()

| Feature | count!() | count() |
|---------|----------|---------|
| Matching | **Consecutive only** | Non-consecutive |
| Counter on mismatch | **Resets to 0** | Keeps count |
| Use case | Sequential patterns | Total occurrences |
| Strictness | Strict | Lenient |

### Side-by-Side Example

```java
// Data sequence: 5, 2, 6, 1, 7, 8, 9

// count!(>4, 3) - STRICT (consecutive)
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=0) ← RESET!
// 6: >4 ✓ (count=1)
// 1: ≤4 ✗ (count=0) ← RESET!
// 7: >4 ✓ (count=1)
// 8: >4 ✓ (count=2)
// 9: >4 ✓ (count=3) → true

// count(>4, 3) - LENIENT (non-consecutive)
// 5: >4 ✓ (count=1)
// 2: ≤4 ✗ (count=1) ← count preserved
// 6: >4 ✓ (count=2)
// 1: ≤4 ✗ (count=2) ← count preserved
// 7: >4 ✓ (count=3) → true (earlier!)
```

## Real-World Examples

### Temperature Monitoring

```java
// Alert if temperature stays above 80°C for 3 consecutive readings
String expression = "count!(>80, 3)";

// Data: 85, 82, 88 → Alert! (sustained high temperature)
// Data: 85, 75, 88 → No alert (not consecutive)
```

### Production Quality Control

```java
// Detect 5 consecutive products within specification
String expression = "count!([95,105], 5)";

// Ensures consistent quality, not just scattered good products
```

### Network Monitoring

```java
// Alert if 2 consecutive responses exceed timeout
String expression = "count!(>1000, 2)";

// Detects sustained latency issues, not just occasional spikes
```

### Medical Device Monitoring

```java
// Alert if heart rate stays abnormal for 3 consecutive readings
String expression = "count!(<60||>100, 3)";

// Distinguishes sustained abnormality from temporary fluctuations
```

## State Transitions with count!()

### Basic Pattern

```java
// Pattern: Normal → Sustained high → Recovery
String expression = "{<30}->{count!(>50, 3)}->{<30}";

// Stage 1: Value less than 30
// Stage 2: 3 consecutive values greater than 50
// Stage 3: Value less than 30 again
```

### Multi-Stage Escalation

```java
// Detect escalating sustained issues
String expression = "{count!([40,60], 3)}->{count!(>60, 3)}->{>80}";

// Stage 1: 3 consecutive values in [40,60]
// Stage 2: 3 consecutive values > 60
// Stage 3: Value > 80
```

### Complex State Machine

```java
// Comprehensive monitoring pattern
String expression = "{==0}->{count!(>4, 3)}->{count!(<2, 2)}->{==0}";

// Start: Value is 0
// Stage 1: 3 consecutive values > 4
// Stage 2: 2 consecutive values < 2
// End: Value returns to 0
```

## Advanced Usage

### Combining with Intervals

```java
// Detect sustained operation in warning zone
String expression = "count!((80,95), 5)";

// 5 consecutive readings in the warning range
```

### Combining with Logical Operators

```java
// Sustained valid readings (not error codes)
String expression = "count!(!=0&&!=(-1)&&[1,100], 10)";

// 10 consecutive valid sensor readings
```

### Nested in Complex Expressions

```java
// Multi-condition pattern
String expression = "{count!([20,30], 5)}->{count!(>50, 3)||==100}";

// First: 5 consecutive normal readings
// Then: Either 3 consecutive high readings OR a single peak at 100
```

## Best Practices

### 1. Use count!() for Sustained Conditions

```java
// Good: Detecting sustained problems
"count!(>threshold, 3)"  // Temperature stays high

// Not ideal: Use count() for scattered occurrences
"count(>threshold, 3)"  // Temperature spikes (anywhere)
```

### 2. Choose Appropriate Consecutive Count

```java
// Too strict (may miss real issues)
"count!(>80, 10)"  // Requires 10 consecutive readings

// Too lenient (may trigger false alarms)
"count!(>80, 1)"  // Just use >80 instead

// Just right
"count!(>80, 3)"  // 3 consecutive readings confirms trend
```

### 3. Combine with State Transitions

```java
// Detect pattern: normal → sustained abnormal → recovery
"{count!([20,30], 3)}->{count!(>50, 3)}->{count!([20,30], 2)}"
```

### 4. Document Consecutive Requirements

```java
// Clear intent
String expression = "count!(>95, 5)";
// Alert if CPU usage stays above 95% for 5 consecutive readings
```

## Common Patterns

### Sustained Threshold Violation

```java
// Detect sustained high values
"count!(>threshold, n)"
```

### Stability Detection

```java
// Detect stable operation in range
"count!([min,max], n)"
```

### Consecutive Anomalies

```java
// Detect consecutive errors
"count!(==error_code, n)"
```

### Recovery Confirmation

```java
// Confirm sustained recovery
"{count!(>high, 3)}->{count!([normal_min,normal_max], 5)}"
```

## Use Cases

### 1. System Stability Monitoring

```java
// Confirm system is stable (5 consecutive normal readings)
"count!([0,80), 5)"
```

### 2. Trend Detection

```java
// Detect upward trend (3 consecutive increases)
// Note: This requires custom logic, but the concept applies
"count!(>previous_value, 3)"
```

### 3. Quality Assurance

```java
// Ensure consistent quality (10 consecutive products in spec)
"count!([95,105], 10)"
```

### 4. Alarm Confirmation

```java
// Confirm alarm condition (not just a spike)
"count!(>critical_threshold, 3)"
```

## Performance Considerations

- `count!()` maintains minimal state (just a counter)
- Resets are efficient (just setting counter to 0)
- No need to store historical data
- Suitable for real-time streaming data

## Common Pitfalls

### 1. Using count!() When count() Is Better

```java
// Wrong: Looking for total occurrences
"count!(>50, 3)"  // Requires consecutive

// Right: Use count() for total occurrences
"count(>50, 3)"  // Anywhere in the stream
```

### 2. Setting Count Too High

```java
// May never trigger
"count!(>threshold, 100)"  // 100 consecutive readings is a lot!

// More practical
"count!(>threshold, 3)"  // 3 consecutive readings
```

### 3. Forgetting the Reset Behavior

```java
// count!() resets on ANY mismatch
// Data: 5, 6, 7, 4, 8, 9, 10
// count!(>4, 3) resets at value 4, then starts over
```

## When to Use count!() vs count()

### Use count!() when:
- ✅ You need to detect **sustained** conditions
- ✅ You want to filter out **temporary spikes**
- ✅ You're looking for **consecutive patterns**
- ✅ You need to confirm **trends**

### Use count() when:
- ✅ You need to count **total occurrences**
- ✅ Matches can be **scattered**
- ✅ You're looking for **cumulative** patterns
- ✅ Timing doesn't matter, just **quantity**

## Next Steps

- [count() Function](./count.md) - Non-consecutive counting
- [Chain Expressions](../chain/overview.md) - Data processing pipelines
- [State Transitions](../../advanced/state-transitions.md) - Complex patterns
- [Examples](../../examples/production-quality.md) - Quality control examples


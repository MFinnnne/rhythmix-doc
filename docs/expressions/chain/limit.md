# Limit

The `limit()` function controls the maximum amount of data stored in a chain expression. It prevents excessive memory usage by maintaining a fixed-size buffer.

## Syntax

```
limit(size)
```

- **size**: Maximum number of data points OR time duration

## Size Types

### Count-Based Limit

```java
limit(10)    // Keep last 10 data points
limit(100)   // Keep last 100 data points
limit(1000)  // Keep last 1000 data points
```

### Time-Based Limit

```java
limit(100ms)  // Keep data from last 100 milliseconds
limit(10s)    // Keep data from last 10 seconds
limit(1m)     // Keep data from last 1 minute
limit(1h)     // Keep data from last 1 hour
limit(1d)     // Keep data from last 1 day
```

## How It Works

The limit function maintains a buffer that:
1. Stores incoming data points
2. Removes oldest data when limit is exceeded
3. Operates as a **FIFO (First-In-First-Out)** queue

### Count-Based Example

```java
// Keep last 3 values
String expression = "filter(>0).limit(3).sum().meet(>10)";

// Data stream: 5, 2, 8, 3, 7
// Buffer state:
// After 5: [5]
// After 2: [5, 2]
// After 8: [5, 2, 8]
// After 3: [2, 8, 3]  ← 5 removed (oldest)
// After 7: [8, 3, 7]  ← 2 removed (oldest)
```

### Time-Based Example

```java
// Keep data from last 1 second
String expression = "filter(>0).limit(1s).avg().meet(>50)";

// Only data with timestamps within the last 1 second are kept
// Older data is automatically removed
```

## Basic Examples

### Simple Count Limit

```java
// Keep last 10 values, calculate sum
String expression = "filter(>0).limit(10).sum().meet(>100)";
```

### Time-Based Limit

```java
// Keep data from last 100ms, calculate average
String expression = "filter(>0).limit(100ms).avg().meet(>50)";
```

### Without Filter

```java
// Limit all data (no filtering)
String expression = "limit(5).sum().meet(>20)";
```

## Real-World Examples

### Temperature Monitoring

```java
// Average of last 5 temperature readings
String expression = "filter(>0).limit(5).avg().meet([20,30])";
```

### Production Quality Control

```java
// Sum of last 100 product weights
String expression = "filter([90,110]).limit(100).sum().meet([9500,10500])";
```

### Network Monitoring

```java
// Average response time in last 10 seconds
String expression = "filter(>0).limit(10s).avg().meet(<500)";
```

### Sensor Data Processing

```java
// Standard deviation of last 20 readings
String expression = "filter(!=0).limit(20).stddev().meet(<5)";
```

## Optional Limit

If you don't specify a limit, data accumulates indefinitely (use with caution):

```java
// No limit - all data is kept
String expression = "filter(>0).sum().meet(>1000)";
// ⚠️ Warning: May use excessive memory over time
```

## Limit vs Window

**Important**: You cannot use both `limit()` and `window()` in the same expression.

| Feature | limit() | window() |
|---------|---------|----------|
| Purpose | Control max data | Sliding window analysis |
| Behavior | FIFO buffer | Sliding window |
| Use with | Any calculator | Any calculator |
| Conflict | Cannot use with window() | Cannot use with limit() |

```java
// ❌ Error: Cannot use both
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ Use one or the other
"filter(>0).limit(10).sum().meet(>100)"
"filter(>0).window(5).sum().meet(>100)"
```

## Advanced Usage

### Large Buffers

```java
// Keep last 1000 values for statistical analysis
String expression = "filter(>0).limit(1000).stddev().meet(<10)";
```

### Short Time Windows

```java
// Real-time monitoring: last 100ms
String expression = "filter(>0).limit(100ms).avg().meet(>threshold)";
```

### Long Time Windows

```java
// Daily aggregation: last 24 hours
String expression = "filter(>0).limit(1d).sum().meet(>daily_target)";
```

## Combining with Other Stages

### Limit + Take

```java
// Keep last 10, use first 5 for calculation
String expression = "filter(>0).limit(10).take(0,5).avg().meet(>50)";
```

### Limit + Multiple Calculators (in state transitions)

```java
// Different limits for different states
String expression = "{filter(>0).limit(5).sum().meet(>10)}->{filter(<0).limit(3).sum().meet(<(-5))}";
```

## Best Practices

### 1. Set Appropriate Limits

```java
// Good: Reasonable limit
"filter(>0).limit(100).avg().meet(>50)"

// Avoid: Excessive limit
"filter(>0).limit(1000000).avg().meet(>50)"  // May use too much memory
```

### 2. Use Time-Based Limits for Real-Time Data

```java
// Good: Time-based for streaming data
"filter(>0).limit(1m).avg().meet(>threshold)"

// Less ideal: Count-based for time-sensitive analysis
"filter(>0).limit(100).avg().meet(>threshold)"  // How long is 100 data points?
```

### 3. Consider Data Rate

```java
// High-frequency data (1000 points/sec)
"filter(>0).limit(100ms).avg().meet(>50)"  // ~100 points

// Low-frequency data (1 point/sec)
"filter(>0).limit(60).avg().meet(>50)"  // ~1 minute of data
```

### 4. Document Time Units

```java
// Clear time units
"filter(>0).limit(5s).avg().meet(>50)"  // 5 seconds

// Avoid ambiguity
"filter(>0).limit(5).avg().meet(>50)"  // 5 what? Points or seconds?
```

## Common Patterns

### Rolling Average

```java
"filter(>0).limit(n).avg().meet(>threshold)"
```

### Recent Sum

```java
"filter([min,max]).limit(time).sum().meet([expected_min,expected_max])"
```

### Variability Check

```java
"filter(>0).limit(n).stddev().meet(<max_deviation)"
```

### Time-Based Aggregation

```java
"filter(>0).limit(duration).calculator().meet(condition)"
```

## Performance Considerations

- **Count-based limits**: O(1) insertion and removal
- **Time-based limits**: Requires timestamp comparison
- **Memory usage**: Proportional to limit size
- **Recommendation**: Use smallest limit that meets requirements

## Common Pitfalls

### 1. Limit Too Small

```java
// May not have enough data
"filter(>0).limit(2).avg().meet(>50)"
// Average of 2 points may not be representative
```

### 2. Limit Too Large

```java
// Excessive memory usage
"filter(>0).limit(1000000).sum().meet(>target)"
```

### 3. Using Both Limit and Window

```java
// ❌ Error
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ Choose one
"filter(>0).limit(10).sum().meet(>100)"
```

### 4. Forgetting Time Units

```java
// Ambiguous
"limit(5)"  // 5 data points

// Clear
"limit(5s)"  // 5 seconds
```

## Time Unit Reference

| Unit | Syntax | Example |
|------|--------|---------|
| Milliseconds | `ms` | `limit(100ms)` |
| Seconds | `s` | `limit(10s)` |
| Minutes | `m` | `limit(5m)` |
| Hours | `h` | `limit(2h)` |
| Days | `d` | `limit(1d)` |

## Next Steps

- [Window](./window.md) - Sliding window analysis
- [Take](./take.md) - Select specific data points
- [Filter](./filter.md) - Data filtering
- [Calculators](./calculators.md) - Perform calculations


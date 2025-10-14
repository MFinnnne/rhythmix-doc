# Window

The `window()` function creates a sliding window for data analysis. It's similar to `limit()` but specifically designed for windowed computations.

## Syntax

```
window(size)
```

- **size**: Window size as count or time duration

## Window Types

### Count-Based Window

```java
window(2)     // Sliding window of 2 data points
window(5)     // Sliding window of 5 data points
window(10)    // Sliding window of 10 data points
```

### Time-Based Window

```java
window(100ms)  // 100 millisecond window
window(10s)    // 10 second window
window(1m)     // 1 minute window
window(1h)     // 1 hour window
window(1d)     // 1 day window
```

## How It Works

A sliding window:
1. Maintains a fixed-size view of the data
2. Slides forward as new data arrives
3. Only includes data within the window for calculations

### Count-Based Example

```java
// Window of 2 data points
String expression = "filter((-5,5)).window(2).sum().meet(>1)";

// Data stream: 3, -2, 4, 1
// Window states:
// After 3: [3] (window not full yet)
// After -2: [3, -2] (window full, sum = 1)
// After 4: [-2, 4] (window slides, sum = 2)
// After 1: [4, 1] (window slides, sum = 5)
```

### Time-Based Example

```java
// 100ms time window
String expression = "filter((-5,5)).window(100ms).sum().meet(>=7)";

// Only data with timestamps within the last 100ms are included
// Window automatically slides based on timestamps
```

## Basic Examples

### Simple Count Window

```java
// Sum of last 2 values
String expression = "filter(>0).window(2).sum().meet(>10)";
```

### Time-Based Window

```java
// Average of values in last 5 seconds
String expression = "filter(>0).window(5s).avg().meet(>50)";
```

## Real-World Examples

### Temperature Monitoring

```java
// Alert if average temperature in last 10 seconds exceeds 30°C
String expression = "filter(>0).window(10s).avg().meet(>30)";
```

### Production Quality Control

```java
// Check if last 5 products are all within spec
String expression = "filter([95,105]).window(5).count().meet(==5)";
```

### Network Monitoring

```java
// Alert if average response time in last 1 minute exceeds 500ms
String expression = "filter(>0).window(1m).avg().meet(>500)";
```

### Sensor Data Processing

```java
// Standard deviation of last 10 readings
String expression = "filter(!=0).window(10).stddev().meet(<5)";
```

## Window vs Limit

**Important**: You cannot use both `window()` and `limit()` in the same expression.

| Feature | window() | limit() |
|---------|----------|---------|
| Purpose | Sliding window analysis | Control max data storage |
| Calculation | Only on window data | On all stored data |
| Use case | Windowed computations | Memory management |
| Conflict | Cannot use with limit() | Cannot use with window() |

```java
// ❌ Error: Cannot use both
"filter(>0).limit(10).window(5).sum().meet(>100)"

// ✅ Use one or the other
"filter(>0).window(5).sum().meet(>100)"
"filter(>0).limit(10).sum().meet(>100)"
```

## Advanced Usage

### Small Windows for Real-Time Analysis

```java
// Detect immediate changes (window of 2)
String expression = "filter(>0).window(2).sum().meet(>100)";
```

### Large Windows for Trend Analysis

```java
// Analyze hourly trends
String expression = "filter(>0).window(1h).avg().meet(>threshold)";
```

### Statistical Analysis

```java
// Calculate rolling standard deviation
String expression = "filter(>0).window(20).stddev().meet(<10)";
```

## Combining with Other Stages

### Window + Take

```java
// Use window, then take subset
String expression = "filter(>0).window(10).take(0,5).avg().meet(>50)";
```

### Window in State Transitions

```java
// Different windows for different states
String expression = "{filter(>0).window(5).sum().meet(>10)}->{filter(<0).window(3).sum().meet(<(-5))}";
```

## Best Practices

### 1. Choose Appropriate Window Size

```java
// Good: Window size matches analysis needs
"filter(>0).window(10).avg().meet(>50)"  // 10-point moving average

// Avoid: Window too small
"filter(>0).window(1).avg().meet(>50)"  // Just use the value directly!
```

### 2. Use Time Windows for Time-Series Data

```java
// Good: Time-based for temporal analysis
"filter(>0).window(1m).avg().meet(>threshold)"

// Less ideal: Count-based for time-sensitive data
"filter(>0).window(60).avg().meet(>threshold)"  // Assumes 1 point/second
```

### 3. Window Size Must Be > 0

```java
// ❌ Error: Invalid window size
"filter(>0).window(0).sum().meet(>100)"

// ✅ Valid window size
"filter(>0).window(5).sum().meet(>100)"
```

### 4. Consider Data Rate

```java
// High-frequency data (100 points/sec)
"filter(>0).window(100ms).avg().meet(>50)"  // ~10 points

// Low-frequency data (1 point/min)
"filter(>0).window(10).avg().meet(>50)"  // ~10 minutes of data
```

## Common Patterns

### Moving Average

```java
"filter(>0).window(n).avg().meet(>threshold)"
```

### Rolling Sum

```java
"filter([min,max]).window(n).sum().meet([expected_min,expected_max])"
```

### Windowed Count

```java
"filter(condition).window(n).count().meet(>min_count)"
```

### Time-Based Aggregation

```java
"filter(>0).window(duration).calculator().meet(condition)"
```

## Window Calculations

### Sum in Window

```java
// Sum of last 5 values
String expression = "filter(>0).window(5).sum().meet(>100)";
```

### Average in Window

```java
// Moving average of last 10 values
String expression = "filter(>0).window(10).avg().meet([40,60])";
```

### Count in Window

```java
// Count values in last 1 minute
String expression = "filter(>threshold).window(1m).count().meet(>10)";
```

### Standard Deviation in Window

```java
// Variability in last 20 values
String expression = "filter(>0).window(20).stddev().meet(<5)";
```

## Performance Considerations

- **Count-based windows**: O(1) for sliding
- **Time-based windows**: Requires timestamp comparison
- **Memory usage**: Proportional to window size
- **Calculation**: Performed on each new data point

## Common Pitfalls

### 1. Window Size Too Small

```java
// Not useful
"filter(>0).window(1).avg().meet(>50)"
// Window of 1 is just the current value!
```

### 2. Window Size Too Large

```java
// May defeat the purpose of windowing
"filter(>0).window(10000).avg().meet(>50)"
// Consider using limit() instead
```

### 3. Using Both Window and Limit

```java
// ❌ Error
"filter(>0).limit(20).window(10).sum().meet(>100)"

// ✅ Choose one
"filter(>0).window(10).sum().meet(>100)"
```

### 4. Window Size Zero or Negative

```java
// ❌ Error
"filter(>0).window(0).sum().meet(>100)"
"filter(>0).window(-5).sum().meet(>100)"

// ✅ Must be positive
"filter(>0).window(5).sum().meet(>100)"
```

## Time Unit Reference

| Unit | Syntax | Example |
|------|--------|---------|
| Milliseconds | `ms` | `window(100ms)` |
| Seconds | `s` | `window(10s)` |
| Minutes | `m` | `window(5m)` |
| Hours | `h` | `window(2h)` |
| Days | `d` | `window(1d)` |

## Use Cases

### Real-Time Monitoring

```java
// Detect immediate spikes
"filter(>0).window(3).avg().meet(>threshold)"
```

### Trend Analysis

```java
// Analyze longer-term trends
"filter(>0).window(1h).avg().meet(>baseline)"
```

### Anomaly Detection

```java
// Detect unusual variability
"filter(>0).window(50).stddev().meet(>normal_stddev*2)"
```

### Quality Control

```java
// Ensure consistent quality
"filter([min,max]).window(10).count().meet(==10)"
```

## Next Steps

- [Limit](./limit) - Data limiting
- [Take](./take) - Select specific data points
- [Calculators](./calculators) - Perform calculations
- [Filter](./filter) - Data filtering


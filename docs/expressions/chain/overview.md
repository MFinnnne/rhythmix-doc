# Chain Expressions Overview

Chain expressions provide a powerful way to process collections of data through a pipeline. They allow you to filter, limit, transform, and validate data in a single, readable expression.

## What Are Chain Expressions?

Chain expressions are composed of multiple operations chained together, similar to functional programming pipelines:

```
filter(condition).limit(n).calculator().meet(condition)
```

Each operation processes the data and passes the result to the next operation in the chain.

## Basic Structure

A chain expression consists of four main stages:

```
[Filter] → [Limit] → [Calculate] → [Meet]
```

1. **Filter**: Select which data to process
2. **Limit**: Control how much data to keep
3. **Calculate**: Perform computations (sum, avg, count, etc.)
4. **Meet**: Validate the result

## Simple Example

```java
// Filter positive values, sum them, check if total > 10
String expression = "filter(>0).sum().meet(>10)";

RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "value", "5", timestamp1),
    new RhythmixEventData("2", "value", "-2", timestamp2),
    new RhythmixEventData("3", "value", "8", timestamp3)
};

boolean result = executor.execute(data); // true (5 + 8 = 13 > 10)
```

## Complete Example

```java
// Complex chain expression
String expression = "filter((-5,5)).limit(5).take(0,2).sum().meet(>1)";

// Breakdown:
// 1. filter((-5,5)) - Keep only values between -5 and 5
// 2. limit(5) - Store maximum 5 values
// 3. take(0,2) - Take first 2 values
// 4. sum() - Calculate sum
// 5. meet(>1) - Check if sum > 1
```

## Chain Expression Stages

### 1. Filter Stage (Optional)

Filter data based on conditions:

```java
filter(>0)          // Keep positive values
filter([10,20])     // Keep values in range
filter(!=0&&!=(-1)) // Keep valid values
```

[Learn more about Filter →](./filter.md)

### 2. Limit Stage (Optional)

Control data collection:

```java
limit(10)      // Keep last 10 values
limit(100ms)   // Keep values from last 100ms
limit(1h)      // Keep values from last hour
window(5)      // Sliding window of 5 values
window(10s)    // Sliding window of 10 seconds
```

[Learn more about Limit →](./limit.md)  
[Learn more about Window →](./window.md)

### 3. Take Stage (Optional)

Select specific data for calculation:

```java
take(0,2)    // Take first 2 values
take(-3)     // Take last 3 values
take(1,4)    // Take values at index 1,2,3
```

[Learn more about Take →](./take.md)

### 4. Calculate Stage (Required)

Perform calculations on the data:

```java
sum()      // Calculate sum
avg()      // Calculate average
count()    // Count values
stddev()   // Calculate standard deviation
```

[Learn more about Calculators →](./calculators.md)

### 5. Meet Stage (Required)

Validate the calculation result:

```java
meet(>10)       // Result must be > 10
meet([0,100])   // Result must be in range
meet(!=0)       // Result must not be 0
```

[Learn more about Meet →](./meet.md)

## Real-World Examples

### Temperature Monitoring

```java
// Alert if average temperature of last 5 readings exceeds 30°C
String expression = "filter(>0).limit(5).avg().meet(>30)";
```

### Production Quality Control

```java
// Check if sum of last 10 product weights is within acceptable range
String expression = "filter([90,110]).limit(10).sum().meet([950,1050])";
```

### Network Performance

```java
// Alert if average response time in last 100ms exceeds 500ms
String expression = "filter(>0).window(100ms).avg().meet(>500)";
```

### Sensor Data Processing

```java
// Validate that sum of last 3 valid readings is positive
String expression = "filter(!=0&&!=(-1)).take(-3).sum().meet(>0)";
```

## Minimal Chain Expression

The minimal chain expression requires only a calculator and a meet condition:

```java
// No filter, no limit, just calculate and validate
String expression = "sum().meet(>0)";
```

## Optional Stages

You can omit stages you don't need:

```java
// No filter
"limit(10).sum().meet(>100)"

// No limit
"filter(>0).sum().meet(>50)"

// No take
"filter(>0).limit(5).sum().meet(>10)"

// Only calculator and meet (minimal)
"sum().meet(>0)"
```

## Combining with State Transitions

Chain expressions can be used within state transitions:

```java
// State 1: Sum of positive values > 10
// State 2: Value < 5
String expression = "{filter(>0).sum().meet(>10)}->{<5}";
```

## Advanced Patterns

### Multi-Stage Processing

```java
// Complex data processing pipeline
String expression = "filter(>0&&<100).limit(20).window(10).take(0,5).avg().meet([20,80])";

// 1. Filter: Keep values between 0 and 100
// 2. Limit: Store up to 20 values
// 3. Window: Use sliding window of 10 values
// 4. Take: Use first 5 values from window
// 5. Calculate: Average
// 6. Validate: Result must be between 20 and 80
```

### Time-Based Processing

```java
// Process data from last 1 minute, calculate average
String expression = "filter(>0).window(1m).avg().meet(>50)";
```

### Statistical Analysis

```java
// Calculate standard deviation of last 10 valid readings
String expression = "filter(!=0).limit(10).stddev().meet(<5)";
```

## Best Practices

### 1. Filter Early

```java
// Good: Filter first to reduce data
"filter(>0).limit(100).sum().meet(>1000)"

// Less efficient: Process all data first
"limit(100).sum().meet(>1000)"  // Includes negative values
```

### 2. Use Appropriate Limits

```java
// Good: Reasonable limit
"filter(>0).limit(10).avg().meet(>50)"

// Avoid: Excessive limits
"filter(>0).limit(10000).avg().meet(>50)"  // May use too much memory
```

### 3. Choose Right Calculator

```java
// For totals
"sum().meet(>100)"

// For averages
"avg().meet(>50)"

// For variability
"stddev().meet(<10)"
```

### 4. Clear Meet Conditions

```java
// Good: Clear threshold
"sum().meet(>100)"

// Avoid: Unclear conditions
"sum().meet(>42.7)"  // Why 42.7?
```

## Common Patterns

### Rolling Average

```java
"filter(>0).window(10).avg().meet(>threshold)"
```

### Sum Validation

```java
"filter([min,max]).limit(n).sum().meet([expected_min,expected_max])"
```

### Outlier Detection

```java
"filter(>0).limit(100).stddev().meet(>threshold)"
```

### Recent Data Analysis

```java
"filter(>0).window(1m).calculator().meet(condition)"
```

## Performance Considerations

- **Filter early**: Reduces data to process
- **Limit appropriately**: Controls memory usage
- **Use windows**: For time-based analysis
- **Choose efficient calculators**: sum() and count() are fastest

## Common Pitfalls

### 1. Forgetting Required Stages

```java
// Error: Missing meet()
"filter(>0).sum()"  // ❌

// Correct
"filter(>0).sum().meet(>10)"  // ✅
```

### 2. Conflicting Limit and Window

```java
// Error: Can't use both
"limit(10).window(5).sum().meet(>0)"  // ❌

// Use one or the other
"limit(10).sum().meet(>0)"  // ✅
"window(5).sum().meet(>0)"  // ✅
```

### 3. Invalid Take Range

```java
// Error: Take more than available
"limit(5).take(0,10).sum().meet(>0)"  // May not have 10 values

// Correct: Take within limit
"limit(10).take(0,5).sum().meet(>0)"  // ✅
```

## Next Steps

- [Filter](./filter.md) - Data filtering
- [Limit](./limit.md) - Data limiting
- [Window](./window.md) - Sliding windows
- [Take](./take.md) - Data selection
- [Calculators](./calculators.md) - Calculations
- [Meet](./meet.md) - Result validation


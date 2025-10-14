# Filter

The `filter()` function is the first stage in a chain expression. It selects which data points should be included in subsequent processing.

## Syntax

```
filter(condition)
```

- **condition**: Any valid Rhythmix expression (comparison, interval, logical)

## How It Works

The filter function:
1. Evaluates each data point against the condition
2. **Keeps** data that matches the condition
3. **Discards** data that doesn't match
4. Passes filtered data to the next stage

## Basic Examples

### Filter by Comparison

```java
// Keep only positive values
String expression = "filter(>0).sum().meet(>10)";

// Data: 5, -2, 8, -1, 3
// Filtered: 5, 8, 3
// Sum: 16 > 10 → true
```

### Filter by Range

```java
// Keep values between -5 and 5
String expression = "filter((-5,5)).sum().meet(>1)";

// Data: 10, 2, -3, 8, 1
// Filtered: 2, -3, 1
// Sum: 0 > 1 → false
```

### Filter by Logical Condition

```java
// Keep values that are NOT 0 or -1 (error codes)
String expression = "filter(!=0&&!=(-1)).avg().meet(>50)";

// Data: 60, 0, 70, -1, 80
// Filtered: 60, 70, 80
// Average: 70 > 50 → true
```

## Optional Filter

If you don't need filtering, you can omit the filter stage:

```java
// No filter - process all data
String expression = "sum().meet(>100)";
```

## Real-World Examples

### Temperature Monitoring

```java
// Average of valid temperature readings (exclude error code -999)
String expression = "filter(!=(-999)).avg().meet([20,30])";
```

### Production Quality Control

```java
// Sum of products within specification
String expression = "filter([95,105]).sum().meet(>1000)";
```

### Network Monitoring

```java
// Average response time (exclude timeouts marked as -1)
String expression = "filter(>0).avg().meet(<500)";
```

### Sensor Data Processing

```java
// Count valid sensor readings (exclude 0 and -1)
String expression = "filter(!=0&&!=(-1)).count().meet(>10)";
```

## Advanced Usage

### Multiple Conditions

```java
// Complex filtering logic
String expression = "filter((>10&&<20)||>50).sum().meet(>100)";

// Keeps values that are:
// - Between 10 and 20, OR
// - Greater than 50
```

### Range with Exclusions

```java
// Values in range but not specific value
String expression = "filter([0,100]&&!=50).avg().meet(>40)";
```

### Multiple Ranges

```java
// Values in multiple acceptable ranges
String expression = "filter([10,20]||[30,40]||[50,60]).count().meet(>5)";
```

## Combining with Other Stages

### Filter + Limit

```java
// Filter positive values, keep last 10
String expression = "filter(>0).limit(10).sum().meet(>100)";
```

### Filter + Window

```java
// Filter valid values, use 5-second window
String expression = "filter(!=0).window(5s).avg().meet(>50)";
```

### Filter + Take

```java
// Filter range, take first 3
String expression = "filter([10,20]).take(0,3).sum().meet(>30)";
```

## Custom Filters

Rhythmix supports custom filter functions for complex filtering logic:

```java
// Using a custom filter (if implemented)
String expression = "customFilter().sum().meet(>100)";
```

[Learn more about Custom Filters →](../../advanced/custom-filters)

## Best Practices

### 1. Filter Early

```java
// Good: Filter first
"filter(>0).limit(100).sum().meet(>1000)"

// Less efficient: Limit includes invalid data
"limit(100).sum().meet(>1000)"
```

### 2. Use Specific Conditions

```java
// Good: Clear filtering criteria
"filter(>0&&<100)"

// Avoid: Overly complex
"filter((>0&&<10)||(>20&&<30)||(>40&&<50)||(>60&&<70))"
// Consider: Is there a simpler pattern?
```

### 3. Exclude Error Values

```java
// Good: Explicitly exclude error codes
"filter(!=0&&!=(-1)&&!=(-999))"
```

### 4. Document Complex Filters

```java
// Complex filter - add comment
String expression = "filter((>threshold&&<max)||==special_value).sum().meet(>target)";
// Filters: normal range OR special case value
```

## Common Patterns

### Positive Values Only

```java
"filter(>0).calculator().meet(condition)"
```

### Valid Range

```java
"filter([min,max]).calculator().meet(condition)"
```

### Exclude Error Codes

```java
"filter(!=error1&&!=error2).calculator().meet(condition)"
```

### Multiple Valid Ranges

```java
"filter(range1||range2||range3).calculator().meet(condition)"
```

## Performance Considerations

- Filtering reduces data early in the pipeline
- Simple conditions (greater than, less than, equals) are fastest
- Complex logical expressions take slightly longer
- Filter before limit/window for better performance

## Common Pitfalls

### 1. Filtering Out All Data

```java
// May filter out everything
"filter(>1000).sum().meet(>100)"
// If no values > 1000, sum will be 0
```

### 2. Contradictory Conditions

```java
// Impossible condition
"filter(>10&&<5)"  // No value can satisfy this
```

### 3. Forgetting Negative Values

```java
// May include negative values unintentionally
"filter(!=0).sum().meet(>100)"
// Includes negative numbers!

// Better: Be explicit
"filter(>0).sum().meet(>100)"
```

## Filter vs Other Stages

| Stage | Purpose | When to Use |
|-------|---------|-------------|
| filter() | Select data | Remove invalid/unwanted data |
| limit() | Control quantity | Limit memory usage |
| window() | Time-based selection | Analyze recent data |
| take() | Index-based selection | Select specific positions |

## Next Steps

- [Limit](./limit) - Control data quantity
- [Window](./window) - Time-based windows
- [Take](./take) - Index-based selection
- [Custom Filters](../../advanced/custom-filters) - Advanced filtering


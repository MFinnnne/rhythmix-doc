# Calculators

Calculators perform computations on the collected data in chain expressions. They are required in every chain expression.

## Built-in Calculators

Rhythmix provides four built-in calculators:

| Calculator | Description | Returns |
|------------|-------------|---------|
| `sum()` | Sum of all values | Number |
| `avg()` | Average of all values | Number |
| `count()` | Count of values | Integer |
| `stddev()` | Standard deviation | Number (3 decimal places) |

## sum()

Calculates the sum of all values in the data set.

### Syntax

```java
sum()
```

### Examples

```java
// Sum of positive values
String expression = "filter(>0).sum().meet(>100)";

// Data: [10, 20, 30]
// Sum: 60
```

### Use Cases

- Total production output
- Cumulative sensor readings
- Aggregate measurements

## avg()

Calculates the average (mean) of all values.

### Syntax

```java
avg()
```

### Examples

```java
// Average temperature
String expression = "filter(>0).avg().meet([20,30])";

// Data: [22, 25, 28]
// Average: 25
```

### Use Cases

- Average temperature
- Mean response time
- Average product weight

## count()

Counts the number of values in the data set.

### Syntax

```java
count()
```

### Examples

```java
// Count valid readings
String expression = "filter(!=0&&!=(-1)).count().meet(>10)";

// Data: [5, 0, 8, -1, 3, 7]
// Filtered: [5, 8, 3, 7]
// Count: 4
```

### Use Cases

- Count valid readings
- Number of events
- Quantity of items

## stddev()

Calculates the standard deviation of the values. Requires at least 2 data points.

### Syntax

```java
stddev()
```

### Examples

```java
// Check variability
String expression = "filter(>0).stddev().meet(<5)";

// Data: [10, 12, 11, 13]
// Stddev: ~1.29
```

### Use Cases

- Quality control variability
- Consistency checking
- Anomaly detection

## Real-World Examples

### Temperature Monitoring

```java
// Average temperature must be in range
"filter(>0).limit(10).avg().meet([20,30])"

// Temperature variability must be low
"filter(>0).limit(20).stddev().meet(<2)"
```

### Production Quality

```java
// Total weight of batch
"filter([95,105]).sum().meet([950,1050])"

// Count of products in spec
"filter([95,105]).count().meet(>90)"
```

### Network Monitoring

```java
// Average response time
"filter(>0).window(1m).avg().meet(<500)"

// Count of slow responses
"filter(>1000).window(5m).count().meet(<10)"
```

## Combining Calculators

You can use different calculators in different states:

```java
// State 1: Sum > 100
// State 2: Average < 50
"{filter(>0).sum().meet(>100)}->{filter(>0).avg().meet(<50)}"
```

## Custom Calculators

You can create custom calculators for specialized computations.

[Learn more about Custom Calculators →](../../advanced/custom-calculators)

## Best Practices

### 1. Choose the Right Calculator

```java
// For totals
"sum().meet(>1000)"

// For averages
"avg().meet(>50)"

// For counts
"count().meet(>10)"

// For variability
"stddev().meet(<5)"
```

### 2. Ensure Sufficient Data

```java
// Good: Enough data for stddev
"filter(>0).limit(20).stddev().meet(<5)"

// Risky: stddev needs at least 2 points
"filter(>0).limit(1).stddev().meet(<5)"  // May fail
```

### 3. Handle Edge Cases

```java
// Filter out invalid values before calculation
"filter(!=0&&!=(-1)).avg().meet(>50)"
```

## Performance

| Calculator | Performance | Notes |
|------------|-------------|-------|
| sum() | O(n) | Fast |
| avg() | O(n) | Fast |
| count() | O(1) | Fastest |
| stddev() | O(n) | Requires two passes |

## Next Steps

- [Meet](./meet) - Validate results
- [Custom Calculators](../../advanced/custom-calculators) - Create your own
- [Filter](./filter) - Data filtering
- [Examples](../../examples/temperature-monitoring) - Real-world use cases


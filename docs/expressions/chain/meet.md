# Meet

The `meet()` function is the final stage in a chain expression. It validates whether the calculated result satisfies a specified condition.

## Syntax

```
meet(condition)
```

- **condition**: Any valid Rhythmix expression (comparison, interval, logical)

## How It Works

The meet function:
1. Receives the result from the calculator
2. Evaluates the result against the condition
3. Returns `true` if the condition is met, `false` otherwise

## Basic Examples

### Comparison Conditions

```java
// Result must be greater than 10
String expression = "filter(>0).sum().meet(>10)";

// Result must be less than 100
String expression = "filter(>0).avg().meet(<100)";

// Result must equal 5
String expression = "filter(>0).count().meet(==5)";
```

### Interval Conditions

```java
// Result must be in range [20,30]
String expression = "filter(>0).avg().meet([20,30])";

// Result must be between 0 and 100 (exclusive)
String expression = "filter(>0).sum().meet((0,100))";
```

### Logical Conditions

```java
// Result must be greater than 10 OR less than 5
String expression = "filter(>0).avg().meet(>10||<5)";

// Result must be in range AND not equal to 50
String expression = "filter(>0).sum().meet([0,100]&&!=50)";
```

## Real-World Examples

### Temperature Monitoring

```java
// Average temperature must be in comfort range
String expression = "filter(>0).limit(10).avg().meet([20,26])";

// Temperature sum must exceed threshold
String expression = "filter(>30).sum().meet(>100)";
```

### Production Quality Control

```java
// Total batch weight must be within spec
String expression = "filter([95,105]).sum().meet([950,1050])";

// At least 90% of products must be in spec
String expression = "filter([95,105]).count().meet(>90)";
```

### Network Monitoring

```java
// Average response time must be under 500ms
String expression = "filter(>0).window(1m).avg().meet(<500)";

// No more than 10 slow responses in 5 minutes
String expression = "filter(>1000).window(5m).count().meet(<=10)";
```

### Sensor Data Processing

```java
// Standard deviation must be low (consistent readings)
String expression = "filter(!=0).limit(20).stddev().meet(<5)";

// Sum of valid readings must be positive
String expression = "filter(!=0&&!=(-1)).sum().meet(>0)";
```

## Built-in Meet Functions

Rhythmix also provides built-in meet functions for common conditions:

```java
// Threshold check (value >= 10)
"filter(>0).sum().thresholdMeet()"

// Range check (5 <= value <= 50)
"filter(>0).avg().rangeMeet()"

// Positive check (value > 0)
"filter(>0).sum().positiveMeet()"

// Even number check
"filter(>0).count().evenMeet()"
```

[Learn more about Custom Meet Functions →](../../advanced/custom-meet-functions.md)

## Advanced Usage

### Complex Conditions

```java
// Multiple conditions with parentheses
String expression = "filter(>0).avg().meet((>20&&<30)||>50)";

// Breakdown:
// - Average is between 20 and 30, OR
// - Average is greater than 50
```

### Combining with State Transitions

```java
// State 1: Sum > 100
// State 2: Average < 50
String expression = "{filter(>0).sum().meet(>100)}->{filter(>0).avg().meet(<50)}";
```

### Multiple Meet Conditions in Different States

```java
// Different validation for different stages
String expression = "{filter(>0).sum().meet([100,200])}->{filter(<0).sum().meet(<(-50))}";
```

## Best Practices

### 1. Use Clear Thresholds

```java
// Good: Clear, meaningful threshold
"sum().meet(>100)"  // Based on business requirement

// Avoid: Arbitrary values
"sum().meet(>42.7)"  // Why 42.7?
```

### 2. Use Ranges for Bounded Values

```java
// Good: Bounded check
"avg().meet([20,30])"  // Temperature comfort range

// Less ideal: Two separate checks
"avg().meet(>=20&&<=30)"  // Use interval instead
```

### 3. Document Complex Conditions

```java
// Complex condition - add comment
String expression = "filter(>0).avg().meet((>threshold&&<max)||==special_value)";
// Meets: normal range OR special case
```

### 4. Handle Edge Cases

```java
// Exclude zero from positive check
"sum().meet(>0)"  // Strictly positive

// Include zero if needed
"sum().meet(>=0)"  // Non-negative
```

## Common Patterns

### Threshold Validation

```java
"calculator().meet(>threshold)"
"calculator().meet(<max_value)"
```

### Range Validation

```java
"calculator().meet([min,max])"
"calculator().meet((lower,upper))"
```

### Exact Match

```java
"calculator().meet(==expected_value)"
```

### Exclusion

```java
"calculator().meet(!=invalid_value)"
"calculator().meet(!=error1&&!=error2)"
```

## Meet Condition Types

### Comparison-Based

```java
meet(>10)    // Greater than
meet(<100)   // Less than
meet(==5)    // Equal to
meet(!=0)    // Not equal to
meet(>=20)   // Greater than or equal
meet(<=80)   // Less than or equal
```

### Range-Based

```java
meet([10,20])   // Inclusive range
meet((10,20))   // Exclusive range
meet([10,20))   // Mixed boundaries
meet((10,20])   // Mixed boundaries
```

### Logical-Based

```java
meet(>10||<5)           // OR condition
meet(>=20&&<=80)        // AND condition
meet([0,100]&&!=50)     // Range with exclusion
meet((>30||<10)&&!=20)  // Complex logic
```

## Performance Considerations

- Meet evaluation is O(1)
- Simple comparisons are fastest
- Complex logical expressions slightly slower
- No significant performance difference in practice

## Common Pitfalls

### 1. Forgetting meet() is Required

```java
// ❌ Error: Missing meet()
"filter(>0).sum()"

// ✅ Correct
"filter(>0).sum().meet(>100)"
```

### 2. Contradictory Conditions

```java
// ❌ Impossible condition
"sum().meet(>100&&<50)"

// ✅ Valid condition
"sum().meet(>50&&<100)"
```

### 3. Wrong Operator for Range

```java
// Less clear
"avg().meet(>=20&&<=30)"

// Better: Use interval
"avg().meet([20,30])"
```

## Custom Meet Functions

You can create custom meet functions for specialized validation:

```java
// Custom threshold check
"sum().customThresholdMeet()"

// Custom range validation
"avg().customRangeMeet()"
```

[Learn more about Custom Meet Functions →](../../advanced/custom-meet-functions.md)

## Next Steps

- [Calculators](./calculators.md) - Perform calculations
- [Custom Meet Functions](../../advanced/custom-meet-functions.md) - Create custom validation
- [Chain Overview](./overview.md) - Complete chain expression guide
- [Examples](../../examples/temperature-monitoring.md) - Real-world applications


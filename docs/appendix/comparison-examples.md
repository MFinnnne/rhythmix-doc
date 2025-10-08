# Comparison Expression Examples

Comprehensive examples of comparison expressions in real-world scenarios.

## Temperature Monitoring

```java
// Detect overheating
">30"  // Temperature exceeds 30°C

// Detect freezing
"<0"   // Temperature below freezing

// Exact temperature match
"==25" // Temperature is exactly 25°C

// Exclude error readings
"!=(-999)" // Not an error code
```

## Production Quality Control

```java
// Minimum weight requirement
">=95"  // Product weight at least 95g

// Maximum weight limit
"<=105" // Product weight no more than 105g

// Detect underweight
"<95"   // Product below minimum weight

// Detect overweight
">105"  // Product exceeds maximum weight
```

## Network Monitoring

```java
// Slow response detection
">1000" // Response time exceeds 1 second

// Fast response validation
"<100"  // Response time under 100ms

// Timeout detection
">=5000" // Response time at or above timeout threshold
```

## Sensor Data Validation

```java
// Zero reading (possible fault)
"==0"   // Sensor reading is zero

// Invalid reading
"==(-1)" // Error code detected

// Valid reading range
"!=0&&!=(-1)" // Exclude error codes
```

## See Also

- [Comparison Expressions](../expressions/comparison.md)
- [Interval Examples](./interval-examples.md)
- [Logical Examples](./logical-examples.md)


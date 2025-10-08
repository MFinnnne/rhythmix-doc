# Interval Expression Examples

Comprehensive examples of interval expressions in real-world scenarios.

## Temperature Control

```java
// Normal operating range (inclusive)
"[20,25]"  // 20°C to 25°C

// Safe temperature range
"[0,100]"  // 0°C to 100°C (inclusive)

// Warning range (exclusive boundaries)
"(80,90)"  // Above 80°C, below 90°C

// Critical range (mixed boundaries)
"(90,100]" // Above 90°C, up to and including 100°C
```

## Production Quality

```java
// Product weight specification (inclusive)
"[95,105]"  // 95g to 105g

// Dimension tolerance (exclusive)
"(49.5,50.5)" // Between 49.5mm and 50.5mm

// Acceptable range (inclusive start, exclusive end)
"[100,110)"  // 100 to just under 110
```

## Network Performance

```java
// Normal response time
"[0,500)"  // 0ms to just under 500ms

// Acceptable response time
"(500,1000)" // Above 500ms, below 1000ms

// Timeout range
"(1000,5000]" // Above 1s, up to 5s
```

## Sensor Validation

```java
// Humidity valid range
"[0,100]"  // 0% to 100% (inclusive)

// Pressure normal range
"(0,1000)" // Above 0, below 1000 (exclusive)

// Voltage operating range
"[3.0,3.6)" // 3.0V to just under 3.6V
```

## Financial Transactions

```java
// Normal transaction amount
"[100,10000]"  // $100 to $10,000

// Suspicious transaction
"(10000,50000]" // Above $10k, up to $50k

// High-risk transaction
"(50000,999999)" // Above $50k
```

## See Also

- [Interval Expressions](../expressions/interval.md)
- [Comparison Examples](./comparison-examples.md)
- [Logical Examples](./logical-examples.md)


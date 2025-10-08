# Frequently Asked Questions

Common questions and answers about Rhythmix.

## General Questions

### What is Rhythmix?

Rhythmix is a rule expression engine for stream data processing. It allows you to define patterns and conditions in your data streams using simple, intuitive expressions.

### What are the main use cases?

- Production environment monitoring
- Real-time data analysis
- Anomaly detection and alerting
- Sensor data processing
- Quality control
- Network monitoring

### Is Rhythmix thread-safe?

RhythmixExecutor instances are **not thread-safe**. Create separate executor instances for concurrent use.

## Expression Questions

### What's the difference between count() and count!()?

- `count()`: Counts **non-consecutive** matches
- `count!()`: Counts **consecutive** matches only

```java
// count() - non-consecutive
"count(>4, 3)"  // Any 3 values > 4

// count!() - consecutive
"count!(>4, 3)"  // 3 consecutive values > 4
```

### Can I use both limit() and window()?

No, you cannot use both in the same expression. Choose one based on your needs:

```java
// ❌ Error
"limit(10).window(5).sum().meet(>0)"

// ✅ Use limit()
"limit(10).sum().meet(>0)"

// ✅ Or use window()
"window(5).sum().meet(>0)"
```

### What's the difference between (a,b) and [a,b]?

- `(a,b)`: `Exclusive boundaries (> a AND < b)`
- `[a,b]`: `Inclusive boundaries (>= a AND <= b)`
- `(a,b]`: `Mixed (> a AND <= b)`
- `[a,b)`: `Mixed (>= a AND < b)`

### How do I exclude error codes?

Use the not-equal operator with AND:

```java
"!=0&&!=(-1)&&!=(-999)"
```

## Data Questions

### What format should the value field be?

The `value` field must be a **numeric string**:

```java
// ✅ Correct
"25.5"
"100"
"-10"

// ❌ Incorrect
"abc"
"N/A"
null
```

### Do I need to provide timestamps?

Yes, timestamps are required for:
- Time-based windows (`window(1m)`)
- Time-based limits (`limit(1h)`)
- State transitions with timing

### Can I reuse RhythmixEventData objects?

Yes, but create new instances for each unique event. Don't modify existing objects.

## Performance Questions

### How do I optimize performance?

1. **Filter early**: Remove unwanted data first
2. **Use appropriate limits**: Don't store more data than needed
3. **Choose efficient calculators**: `count()` is fastest, `stddev()` is slowest
4. **Compile once**: Reuse compiled executors

### What's the memory usage?

Memory usage depends on:
- `limit()` size: Stores up to N data points
- `window()` size: Stores data within window
- Expression complexity: Minimal overhead

### Can I process millions of events?

Yes, Rhythmix is designed for high-throughput streaming data. Use appropriate limits to control memory usage.

## Chain Expression Questions

### What's the minimum chain expression?

```java
"calculator().meet(condition)"

// Example
"sum().meet(>100)"
```

### Do I need filter()?

No, filter() is optional. If omitted, all data is processed.

### What calculators are available?

Built-in calculators:
- `sum()`: Sum of values
- `avg()`: Average of values
- `count()`: Count of values
- `stddev()`: Standard deviation

### Can I create custom calculators?

Yes! Implement the `ChainCalculatorUDF` interface.

[Learn more →](../advanced/custom-calculators.md)

## State Transition Questions

### How many states can I have?

There's no hard limit, but keep it reasonable (3-5 states) for maintainability.

### Can states be reused?

Each state is evaluated once in sequence. Once satisfied, the expression moves to the next state.

### What happens if a state is never satisfied?

The expression remains in that state and returns `false` until the condition is met.

## Error Handling

### What happens if I provide invalid data?

- Non-numeric values will cause parsing errors
- Null values may cause NullPointerException
- Always validate data before processing

### How do I handle compilation errors?

```java
try {
    RhythmixExecutor executor = RhythmixCompiler.compile(expression);
} catch (Exception e) {
    logger.error("Invalid expression: " + expression, e);
    // Handle error appropriately
}
```

### What if my expression never returns true?

Check:
1. Are your conditions correct?
2. Is the data in the expected format?
3. Are you providing enough data points?
4. Test each state/condition separately

## Integration Questions

### Can I use Rhythmix with Spring Boot?

Yes! Create beans for your executors:

```java
@Configuration
public class RhythmixConfig {
    @Bean
    public RhythmixExecutor temperatureExecutor() {
        return RhythmixCompiler.compile(">30");
    }
}
```

### Can I use Rhythmix with Kafka?

Yes! Process Kafka messages with Rhythmix:

```java
@KafkaListener(topics = "sensor-data")
public void process(SensorData data) {
    RhythmixEventData event = convertToRhythmixData(data);
    if (executor.execute(event)) {
        // Trigger alert
    }
}
```

### Can I persist executor state?

Executors maintain state in memory. For persistence, you'll need to implement custom serialization.

## Troubleshooting

### My expression always returns false

- Check if conditions are reachable
- Verify data format (numeric strings)
- Test each part of the expression separately
- Add logging to see what data is being processed

### I'm getting parsing errors

- Ensure value field contains numeric strings
- Check for null values
- Validate data before creating RhythmixEventData

### Memory usage is too high

- Reduce `limit()` size
- Use smaller `window()` sizes
- Filter data early to reduce storage

## Next Steps

- [Best Practices](./best-practices.md)
- [Examples](../examples/temperature-monitoring.md)
- [Expression Syntax](../expressions/overview.md)


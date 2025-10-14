# Best Practices

Guidelines and recommendations for using Rhythmix effectively.

## Expression Design

### Start Simple

```java
// Good: Start with basic expression
">30"

// Then add complexity
">30&&<50"

// Finally, add state transitions
"{>30&&<50}->{<10}->{==0}"
```

### Use Appropriate Expression Types

```java
// For single value checks: Comparison
">threshold"

// For range checks: Interval
"[min,max]"

// For multiple conditions: Logical
"condition1||condition2"

// For pattern counting: Functions
"count(condition, n)"

// For data aggregation: Chain
"filter(condition).calculator().meet(condition)"
```

### Document Complex Expressions

```java
// Add comments explaining complex logic
String expression = "((>30||<10)&&!=20)||([50,60]&&!=55)";
// Matches: (extreme values except 20) OR (50-60 range except 55)
```

## Performance Optimization

### Filter Early

```java
// Good: Filter first
"filter(>0).limit(100).sum().meet(>1000)"

// Less efficient: Process all data
"limit(100).sum().meet(>1000)"
```

### Use Appropriate Limits

```java
// Good: Reasonable limit
"filter(>0).limit(10).avg().meet(>50)"

// Avoid: Excessive limit
"filter(>0).limit(10000).avg().meet(>50)"
```

### Choose Efficient Calculators

```java
// Fastest: count()
"count().meet(>10)"

// Fast: sum()
"sum().meet(>100)"

// Moderate: avg()
"avg().meet(>50)"

// Slower: stddev() (requires two passes)
"stddev().meet(<5)"
```

## Code Organization

### Compile Once, Use Many Times

```java
// Good: Compile once
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
for (RhythmixEventData data : dataStream) {
    executor.execute(data);
}

// Avoid: Compiling repeatedly
for (RhythmixEventData data : dataStream) {
    RhythmixExecutor executor = RhythmixCompiler.compile(expression); // ❌
    executor.execute(data);
}
```

### Handle Exceptions

```java
// Good: Handle compilation errors
try {
    RhythmixExecutor executor = RhythmixCompiler.compile(expression);
} catch (Exception e) {
    logger.error("Invalid expression: " + expression, e);
}
```

### Use Meaningful Names

```java
// Good: Descriptive names
RhythmixExecutor highTempExecutor = RhythmixCompiler.compile(">40");
RhythmixExecutor sustainedHighExecutor = RhythmixCompiler.compile("count!(>35, 3)");

// Avoid: Generic names
RhythmixExecutor executor1 = RhythmixCompiler.compile(">40");
RhythmixExecutor executor2 = RhythmixCompiler.compile("count!(>35, 3)");
```

## Data Handling

### Validate Input Data

```java
// Good: Validate before processing
if (value != null && !value.isEmpty()) {
    RhythmixEventData data = new RhythmixEventData(id, name, value, timestamp);
    executor.execute(data);
}
```

### Use Appropriate Data Types

```java
// Good: Numeric string
RhythmixEventData data = new RhythmixEventData("1", "temp", "25.5", timestamp);

// Avoid: Non-numeric string
RhythmixEventData data = new RhythmixEventData("1", "temp", "abc", timestamp); // ❌
```

### Provide Accurate Timestamps

```java
// Good: Use actual event time
Timestamp eventTime = new Timestamp(actualEventTimeMillis);
RhythmixEventData data = new RhythmixEventData(id, name, value, eventTime);

// Avoid: Always using current time for historical data
Timestamp now = new Timestamp(System.currentTimeMillis()); // May be incorrect
```

## Testing

### Test Each State Separately

```java
// Test state 1
RhythmixExecutor state1 = RhythmixCompiler.compile(">1");

// Test state 2
RhythmixExecutor state2 = RhythmixCompiler.compile("count(<1,3)");

// Test state 3
RhythmixExecutor state3 = RhythmixCompiler.compile("==3");

// Then test combined
RhythmixExecutor combined = RhythmixCompiler.compile("{>1}->{count(<1,3)}->{==3}");
```

### Test Edge Cases

```java
// Test with empty data
// Test with single data point
// Test with boundary values
// Test with invalid data
// Test with error codes
```

### Use Unit Tests

```java
@Test
public void testTemperatureAlert() {
    RhythmixExecutor executor = RhythmixCompiler.compile(">30");
    
    RhythmixEventData normal = createData("25");
    assertFalse(executor.execute(normal));
    
    RhythmixEventData high = createData("35");
    assertTrue(executor.execute(high));
}
```

## Thread Safety

### Create Separate Executors for Concurrent Use

```java
// Good: Separate executors per thread
ExecutorService threadPool = Executors.newFixedThreadPool(10);
for (int i = 0; i < 10; i++) {
    threadPool.submit(() -> {
        RhythmixExecutor executor = RhythmixCompiler.compile(expression);
        // Use executor in this thread
    });
}

// Avoid: Sharing executor across threads
RhythmixExecutor sharedExecutor = RhythmixCompiler.compile(expression); // ❌
// Multiple threads using sharedExecutor
```

## Common Pitfalls to Avoid

### 1. Forgetting Required Stages

```java
// ❌ Missing meet()
"filter(>0).sum()"

// ✅ Complete chain
"filter(>0).sum().meet(>100)"
```

### 2. Using Both limit() and window()

```java
// ❌ Cannot use both
"limit(10).window(5).sum().meet(>0)"

// ✅ Use one
"limit(10).sum().meet(>0)"
```

### 3. Contradictory Conditions

```java
// ❌ Impossible
">100&&<50"

// ✅ Valid
">50&&<100"
```

### 4. Confusing count() and count!()

```java
// For non-consecutive: count()
"count(>50, 3)"

// For consecutive: count!()
"count!(>50, 3)"
```

## Next Steps

- [FAQ](./faq.md)
- [Expression Syntax](../expressions/overview)
- [Examples](../examples/temperature-monitoring)


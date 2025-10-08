# RhythmixExecutor

The `RhythmixExecutor` class executes compiled expressions against data streams.

## Overview

The executor:
- Processes RhythmixEventData objects
- Maintains state across executions
- Returns boolean results
- Supports both batch and incremental execution

## Basic Usage

```java
RhythmixExecutor executor = RhythmixCompiler.compile(">5");
RhythmixEventData data = new RhythmixEventData("1", "test", "7", timestamp);
boolean result = executor.execute(data);
```

## API

### execute(RhythmixEventData...)

```java
public boolean execute(RhythmixEventData... data)
```

**Parameters:**
- `data`: One or more RhythmixEventData objects

**Returns:**
- `boolean`: true if expression is satisfied, false otherwise

## Execution Modes

### Batch Execution

Process multiple data points at once:

```java
RhythmixEventData[] data = {
    new RhythmixEventData("1", "test", "2", timestamp1),
    new RhythmixEventData("2", "test", "0", timestamp2),
    new RhythmixEventData("3", "test", "3", timestamp3)
};

boolean result = executor.execute(data);
```

### Incremental Execution

Process data points one at a time:

```java
boolean r1 = executor.execute(data1); // false - still processing
boolean r2 = executor.execute(data2); // false - still processing
boolean r3 = executor.execute(data3); // true - expression satisfied!
```

## State Management

The executor maintains state across executions:

```java
RhythmixExecutor executor = RhythmixCompiler.compile("{>1}->{<1}->{==3}");

executor.execute(data1); // State 1
executor.execute(data2); // State 2
executor.execute(data3); // State 3 → returns true
```

## Examples

### Simple Comparison

```java
RhythmixExecutor executor = RhythmixCompiler.compile(">30");
RhythmixEventData data = new RhythmixEventData("1", "temp", "35", timestamp);
boolean result = executor.execute(data); // true
```

### State Transition

```java
RhythmixExecutor executor = RhythmixCompiler.compile("{<10}->{>50}->{[20,30]}");

executor.execute(new RhythmixEventData("1", "value", "5", ts1));   // false
executor.execute(new RhythmixEventData("2", "value", "60", ts2));  // false
boolean result = executor.execute(new RhythmixEventData("3", "value", "25", ts3)); // true
```

### Chain Expression

```java
RhythmixExecutor executor = RhythmixCompiler.compile("filter(>0).sum().meet(>100)");

RhythmixEventData[] data = {
    new RhythmixEventData("1", "value", "50", ts1),
    new RhythmixEventData("2", "value", "60", ts2)
};

boolean result = executor.execute(data); // true (50 + 60 = 110 > 100)
```

## Best Practices

1. **Reuse Executors**: Create once, use many times
2. **Understand State**: Be aware of stateful vs stateless expressions
3. **Handle Results**: Always check return values
4. **Thread Safety**: Create separate executors for concurrent use

## Thread Safety

Executors are **not thread-safe**. For concurrent processing:

```java
// Create separate executor per thread
RhythmixExecutor executor1 = RhythmixCompiler.compile(expression);
RhythmixExecutor executor2 = RhythmixCompiler.compile(expression);
```

## Next Steps

- [RhythmixCompiler](./rhythmix-compiler.md)
- [RhythmixEventData](./rhythmix-event-data.md)
- [Expression Syntax](../expressions/overview.md)


# RhythmixCompiler

The `RhythmixCompiler` class compiles expression strings into executable `RhythmixExecutor` objects.

## Overview

The compiler:
- Parses expression strings
- Validates syntax
- Creates executable objects
- Throws exceptions for invalid expressions

## Basic Usage

```java
String expression = ">5";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## API

### compile()

```java
public static RhythmixExecutor compile(String expression)
```

**Parameters:**
- `expression`: The Rhythmix expression string

**Returns:**
- `RhythmixExecutor`: Executable object

**Throws:**
- Exception if expression syntax is invalid

## Examples

### Simple Expression

```java
String expression = ">30";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

### State Transition

```java
String expression = "{>1}->{count(<1,3)}->{==3}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

### Chain Expression

```java
String expression = "filter(>0).sum().meet(>100)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Error Handling

```java
try {
    RhythmixExecutor executor = RhythmixCompiler.compile("invalid>>expression");
} catch (Exception e) {
    System.err.println("Invalid expression: " + e.getMessage());
}
```

## Best Practices

1. **Compile Once**: Compile expressions once and reuse the executor
2. **Handle Exceptions**: Always handle compilation errors
3. **Validate Input**: Validate expression strings before compilation
4. **Cache Executors**: Cache compiled executors for frequently used expressions

## Next Steps

- [RhythmixExecutor](./rhythmix-executor.md)
- [RhythmixEventData](./rhythmix-event-data.md)
- [Expression Syntax](../expressions/overview.md)


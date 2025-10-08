# Basic Concepts

Understanding the core concepts of Rhythmix will help you write powerful rule expressions.

## What is Rhythmix?

Rhythmix is a **rule expression engine** for **stream data processing**. It allows you to define patterns (rhythms) in your data streams using simple, intuitive expressions.

## Core Components

### 1. Expression

An expression defines the pattern you want to match in your data stream. Expressions can be:

- **Simple**: `>5` (value greater than 5)
- **Complex**: `{>1}->{count(<1,3)}->{==3}` (state transitions)
- **Chain-based**: `filter(>0).sum().meet(>10)` (data processing pipeline)

### 2. State Units

State units are the building blocks of expressions, enclosed in curly braces `{}`:

```
{state_unit_A}->{state_unit_B}->{state_unit_C}
```

Each state unit must be satisfied before moving to the next one.

### 3. RhythmixEventData

The data object that flows through your expressions:

```java
RhythmixEventData data = new RhythmixEventData(
    "id",           // Unique identifier
    "name",         // Event name
    "value",        // The actual value (string)
    timestamp       // When the event occurred
);
```

### 4. Executor

The compiled expression that processes your data:

```java
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
boolean result = executor.execute(data);
```

## Expression Types

### Comparison Expressions

Compare values using standard operators:

- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal
- `==` Equal to
- `!=` Not equal to

**Example**: `>30` matches values greater than 30

### Interval Expressions

Define ranges using mathematical notation:

- `(a,b)` - Greater than a AND less than b
- `[a,b]` - Greater than or equal to a AND less than or equal to b
- `(a,b]` - Greater than a AND less than or equal to b
- `[a,b)` - Greater than or equal to a AND less than b

**Example**: `[20,30]` matches values between 20 and 30 (inclusive)

### Logical Expressions

Combine conditions using logical operators:

- `||` OR operator
- `&&` AND operator
- `!` NOT operator

**Example**: `>30||<10` matches values greater than 30 OR less than 10

### Function Expressions

Use built-in functions for complex patterns:

- `count(condition, n)` - Count n non-consecutive matches
- `count!(condition, n)` - Count n consecutive matches

**Example**: `count(>50, 3)` matches when 3 values (not necessarily consecutive) are greater than 50

### Chain Expressions

Process collections of data through a pipeline:

```
filter(condition).limit(n).calculator().meet(condition)
```

**Example**: `filter(>0).sum().meet(>100)` filters positive values, sums them, and checks if total > 100

## State Transitions

State transitions allow you to define sequential patterns:

```java
{state_A}->{state_B}->{state_C}
```

The expression only returns `true` when all states are satisfied in order.

**Example**: `{<10}->{>50}->{[20,30]}` 
- First: value must be less than 10
- Then: value must be greater than 50
- Finally: value must be between 20 and 30

## Shorthand Notation

For simple state transitions, you can use shorthand:

```
<0,1>  // Equivalent to {==0}->{==1}
```

## Data Flow

```
Input Data → Expression Evaluation → State Management → Result (true/false)
```

1. **Input**: RhythmixEventData objects
2. **Evaluation**: Expression checks current state
3. **State Management**: Tracks progress through state transitions
4. **Result**: Returns true when pattern is matched

## Best Practices

1. **Start Simple**: Begin with basic comparisons before moving to complex expressions
2. **Test Incrementally**: Test each state unit separately
3. **Use Appropriate Types**: Choose the right expression type for your use case
4. **Consider Performance**: Chain expressions with filters can improve performance
5. **Document Complex Expressions**: Add comments explaining complex patterns

## Next Steps

- Explore [Expression Syntax](../expressions/overview.md) in detail
- Learn about [Chain Expressions](../expressions/chain/overview.md)
- See [Real-world Examples](../examples/temperature-monitoring.md)


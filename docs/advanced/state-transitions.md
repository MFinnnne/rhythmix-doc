# State Transitions

State transitions allow you to define sequential patterns in your data streams. They are one of the most powerful features of Rhythmix.

## Overview

State transitions enable you to:
- Detect sequential patterns in data
- Model complex state machines
- Track multi-stage processes
- Implement workflow validation

## Basic Syntax

```
{state_A}->{state_B}->{state_C}
```

Each state must be satisfied in order before moving to the next state.

## Simple Example

```java
// Temperature: normal → high → normal
String expression = "{<=40}->{>80}->{<=40}";

RhythmixEventData[] data = {
    new RhythmixEventData("1", "temp", "35", timestamp1),  // <=40 ✓
    new RhythmixEventData("2", "temp", "85", timestamp2),  // >80 ✓
    new RhythmixEventData("3", "temp", "30", timestamp3)   // <=40 ✓
};

boolean result = executor.execute(data); // true
```

## State Types

### Comparison States

```java
{>30}->{<10}->{==0}
```

### Interval States

```java
{[20,30]}->{(30,50]}->{(50,100]}
```

### Logical States

```java
{>10&&<20}->{[30,40]||>50}->{!=0}
```

### Function States

```java
{count(>5, 3)}->{<2}->{==0}
```

### Chain Expression States

```java
{filter(>0).sum().meet(>10)}->{<5}
```

## Real-World Examples

### Temperature Monitoring

```java
// Detect overheating and recovery
"{[20,30]}->{>50}->{[20,30]}"
```

### Production Quality

```java
// Detect quality degradation
"{count!([95,105], 10)}->{count(<95||>105, 5)}"
```

### Network Monitoring

```java
// Detect latency spike and recovery
"{<100}->{>1000}->{<200}"
```

## Shorthand Notation

For simple sequential values:

```java
<0,1>  // Equivalent to {==0}->{==1}
<1,2,3>  // Equivalent to {==1}->{==2}->{==3}
```

## Best Practices

1. **Start Simple**: Begin with 2-3 states before adding complexity
2. **Test Each State**: Verify each state works independently
3. **Document Patterns**: Clearly document what pattern you're detecting
4. **Consider Timing**: Use timestamps for time-sensitive patterns

## Next Steps

- [Expression Overview](../expressions/overview.md)
- [Chain Expressions](../expressions/chain/overview.md)
- [Examples](../examples/temperature-monitoring.md)


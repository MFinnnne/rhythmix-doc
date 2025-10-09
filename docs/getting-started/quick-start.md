# Quick Start

Get started with Rhythmix in just a few minutes!

## Basic Example

Here's a simple example that demonstrates the power of Rhythmix:

```java
import io.github.mfinnnne.rhythmix.*;
import java.sql.Timestamp;

public class QuickStartExample {
    public static void main(String[] args) {
        // Compile the expression
        String expression = "{>1}->{count(<1,3)}->{==3}";
        RhythmixExecutor executor = RhythmixCompiler.compile(expression);
        
        // Create test data
        RhythmixEventData p1 = new RhythmixEventData("11", "event1", "2", 
            new Timestamp(System.currentTimeMillis()));
        RhythmixEventData p2 = new RhythmixEventData("12", "event2", "0", 
            new Timestamp(System.currentTimeMillis() + 100));
        RhythmixEventData p3 = new RhythmixEventData("13", "event3", "3", 
            new Timestamp(System.currentTimeMillis() + 200));
        
        // Execute the expression
        boolean result = executor.execute(p1, p2, p3);
        System.out.println("Result: " + result);
    }
}
```

## What This Expression Does

The expression `{>1}->{count(<1,3)}->{==3}` means:

1. **First state** - First value must be greater than 1
2. **Second state** - Then we need 3 values less than 1 (non-consecutive)
3. **Third state** - Finally, value must equal 3

## Step-by-Step Execution

You can also execute data one at a time:

```java
RhythmixExecutor executor = RhythmixCompiler.compile("{>1}->{count(<1,3)}->{==3}");

boolean res1 = executor.execute(p1); // false - still processing
boolean res2 = executor.execute(p2); // false - still processing
boolean res3 = executor.execute(p3); // true - expression satisfied!
```

## Simple Comparison Example

```java
// Check if value is greater than 4
String expression = ">4";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "test", "5", 
    new Timestamp(System.currentTimeMillis()));

boolean result = executor.execute(data); // true
```

## Count Function Example

```java
// Count 3 non-consecutive values greater than 4
String expression = "count(>4, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "event", "5", new Timestamp(System.currentTimeMillis())),
    new RhythmixEventData("2", "event", "2", new Timestamp(System.currentTimeMillis() + 100)),
    new RhythmixEventData("3", "event", "6", new Timestamp(System.currentTimeMillis() + 200)),
    new RhythmixEventData("4", "event", "7", new Timestamp(System.currentTimeMillis() + 300))
};

boolean result = executor.execute(data); // true - found 3 values > 4
```

## Next Steps

- Learn about [Expression Syntax](../expressions/overview.md)
- Explore [Chain Expressions](../expressions/chain/overview.md)
- Check out [Examples](../examples/temperature-monitoring.md)


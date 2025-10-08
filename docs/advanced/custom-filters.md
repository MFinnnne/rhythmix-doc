# Custom Filters

Create custom filter functions to implement complex filtering logic beyond the built-in comparison, interval, and logical expressions.

## Overview

Custom filters allow you to:
- Implement domain-specific filtering logic
- Process data based on custom business rules
- Filter using external data sources or configurations
- Create reusable filtering components

## Creating a Custom Filter

Implement the `ChainFilterUDF` interface:

```java
public class TemperatureFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "tempFilter"; // Filter name for use in expressions
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            double temp = Double.parseDouble(event.getValue());
            return temp >= 20.0 && temp <= 80.0; // Keep 20-80°C
        } catch (NumberFormatException e) {
            return false; // Discard invalid data
        }
    }
}
```

## Using Custom Filters

```java
// Use in chain expression
String expression = "tempFilter().sum().meet(>100)";
```

## Built-in Example Filters

### Numeric Filter

```java
public class NumericFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "numericFilter";
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            Double.parseDouble(event.getValue());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
```

### Positive Filter

```java
public class PositiveFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "positiveFilter";
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            double value = Double.parseDouble(event.getValue());
            return value > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
```

## Advanced: Batch Filtering

For processing entire lists:

```java
public class ArrayFilterUDF implements FilterUDF {
    @Override
    public String getName() {
        return "arrayFilter";
    }

    @Override
    public List<RhythmixEventData> filter(List<RhythmixEventData> events) {
        // Keep only last 3 items
        if (events.size() >= 3) {
            return events.subList(events.size() - 3, events.size());
        }
        return events;
    }
}
```

## Best Practices

1. **Handle Exceptions**: Always handle parsing errors gracefully
2. **Return Consistent Types**: Ensure filter logic is deterministic
3. **Document Behavior**: Clearly document what the filter does
4. **Test Thoroughly**: Test with edge cases and invalid data

## Next Steps

- [Custom Calculators](./custom-calculators.md)
- [Custom Meet Functions](./custom-meet-functions.md)
- [Chain Expressions](../expressions/chain/overview.md)


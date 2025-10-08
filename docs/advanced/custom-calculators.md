# Custom Calculators

Create custom calculator functions to perform specialized computations beyond the built-in sum, avg, count, and stddev.

## Overview

Custom calculators allow you to:
- Implement domain-specific calculations
- Create complex statistical functions
- Perform custom aggregations
- Build reusable calculation components

## Creating a Custom Calculator

Implement the `ChainCalculatorUDF` interface:

```java
public class MyMaxCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "myMax"; // Calculator name for use in expressions
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        if (values == null || values.isEmpty()) {
            return 0;
        }

        double max = Double.NEGATIVE_INFINITY;
        boolean hasValidNumber = false;

        for (RhythmixEventData data : values) {
            if (data == null || data.getValue() == null) {
                continue;
            }

            try {
                double num = Double.parseDouble(data.getValue());
                if (!Double.isNaN(num) && num > max) {
                    max = num;
                }
                hasValidNumber = true;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        return hasValidNumber ? max : 0;
    }
}
```

## Using Custom Calculators

```java
// Use in chain expression
String expression = "filter(>0).limit(5).myMax().meet(>10)";
```

## Built-in Example Calculators

### Maximum Calculator

```java
public class MaxCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "maxCalc";
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        return values.stream()
            .map(v -> Double.parseDouble(v.getValue()))
            .max(Double::compare)
            .orElse(0.0);
    }
}
```

### Minimum Calculator

```java
public class MinCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "minCalc";
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        return values.stream()
            .map(v -> Double.parseDouble(v.getValue()))
            .min(Double::compare)
            .orElse(0.0);
    }
}
```

## Best Practices

1. **Handle Empty Lists**: Always check for null or empty input
2. **Handle Invalid Data**: Skip or handle non-numeric values gracefully
3. **Return Appropriate Types**: Return Integer for counts, Double for decimals
4. **Document Behavior**: Clearly document calculation logic
5. **Test Edge Cases**: Test with empty lists, single values, etc.

## Next Steps

- [Custom Filters](./custom-filters.md)
- [Custom Meet Functions](./custom-meet-functions.md)
- [Chain Expressions](../expressions/chain/overview.md)


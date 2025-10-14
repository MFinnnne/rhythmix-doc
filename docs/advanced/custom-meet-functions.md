# Custom Meet Functions

Create custom meet functions to implement specialized validation logic beyond the built-in comparison and range checks.

## Overview

Custom meet functions allow you to:
- Implement domain-specific validation rules
- Create complex conditional logic
- Build reusable validation components
- Integrate with external validation systems

## Creating a Custom Meet Function

Implement the `ChainMeetUDF` interface:

```java
public class CustomThresholdMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "customThresholdMeet"; // Function name for use in expressions
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) {
            return false;
        }

        try {
            double numericValue = calculatedValue.doubleValue();
            return numericValue > 15.0; // Custom threshold
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String getDescription() {
        return "Checks if calculated value is greater than 15";
    }
}
```

## Using Custom Meet Functions

```java
// Use in chain expression
String expression = "filter(>0).sum().customThresholdMeet()";
```

## Built-in Example Meet Functions

### Threshold Meet

```java
public class ThresholdMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "thresholdMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        return calculatedValue != null && calculatedValue.doubleValue() >= 10.0;
    }
}
```

### Range Meet

```java
public class RangeMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "rangeMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;
        double value = calculatedValue.doubleValue();
        return value >= 5.0 && value <= 50.0;
    }
}
```

### Positive Meet

```java
public class PositiveMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "positiveMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        return calculatedValue != null && calculatedValue.doubleValue() > 0.0;
    }
}
```

### Even Meet

```java
public class EvenMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "evenMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;
        return calculatedValue.longValue() % 2 == 0;
    }
}
```

## Complex Meet Logic

```java
public class MultiConditionMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "multiConditionMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;
        
        double value = calculatedValue.doubleValue();
        
        // Complex multi-condition logic
        if (value >= 0 && value <= 10) {
            return value % 2 == 0; // 0-10: must be even
        } else if (value > 10 && value <= 100) {
            return value > 50; // 10-100: must be > 50
        } else {
            return value < 0; // Otherwise: must be negative
        }
    }
}
```

## Best Practices

1. **Handle Null Values**: Always check for null input
2. **Return Boolean**: Always return true or false, never null
3. **Document Logic**: Clearly document validation rules
4. **Provide Description**: Implement getDescription() for clarity
5. **Test Thoroughly**: Test with edge cases and boundary values

## Next Steps

- [Custom Filters](./custom-filters)
- [Custom Calculators](./custom-calculators)
- [Chain Expressions](../expressions/chain/overview)


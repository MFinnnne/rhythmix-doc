# Logical Expressions

Logical expressions allow you to combine multiple conditions using logical operators: OR (`||`), AND (`&&`), and NOT (`!`).

## Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `\|\|` | OR - At least one condition must be true | `>30\|\|<10` |
| `&&` | AND - All conditions must be true | `!=0&&!=5` |
| `!` | NOT - Negates a condition | `!=0` |

## OR Operator (`||`)

The OR operator returns `true` if **at least one** condition is satisfied.

### Basic OR Examples

```java
// Temperature is too hot OR too cold
String expression = ">40||<10";

RhythmixEventData data1 = new RhythmixEventData("1", "temp", "45", timestamp);
executor.execute(data1); // true (45 > 40)

RhythmixEventData data2 = new RhythmixEventData("2", "temp", "5", timestamp);
executor.execute(data2); // true (5 < 10)

RhythmixEventData data3 = new RhythmixEventData("3", "temp", "25", timestamp);
executor.execute(data3); // false (not >40 and not <10)
```

### Multiple OR Conditions

```java
// Value is 0, 5, or 10
String expression = "==0||==5||==10";

// Value is in multiple ranges
String expression = "[10,20]||[30,40]||[50,60]";
```

## AND Operator (`&&`)

The AND operator returns `true` only if **all** conditions are satisfied.

### Basic AND Examples

```java
// Value is not 0 AND not 5
String expression = "!=0&&!=5";

RhythmixEventData data1 = new RhythmixEventData("1", "value", "3", timestamp);
executor.execute(data1); // true (3 != 0 and 3 != 5)

RhythmixEventData data2 = new RhythmixEventData("2", "value", "0", timestamp);
executor.execute(data2); // false (0 == 0)

RhythmixEventData data3 = new RhythmixEventData("3", "value", "5", timestamp);
executor.execute(data3); // false (5 == 5)
```

### Multiple AND Conditions

```java
// Value is in range AND not equal to specific value
String expression = "[0,100]&&!=50";

// Multiple exclusions
String expression = "!=0&&!=(-1)&&!=999";
```

## NOT Operator (`!`)

The NOT operator is primarily used in the not-equal (`!=`) expression.

```java
// Not equal to 0
String expression = "!=0";

// Not equal to -1 (error code)
String expression = "!=(-1)";
```

## Combining Operators

You can combine multiple logical operators to create complex conditions.

### OR and AND Together

```java
// (Greater than 10 AND less than 20) OR equal to 0
String expression = "(>10&&<20)||==0";

// Value in range [10,30] OR [70,90], AND not equal to 50
String expression = "([10,30]||[70,90])&&!=50";
```

### Using Parentheses for Precedence

Parentheses `()` control the order of evaluation:

```java
// Without parentheses - may be ambiguous
String expression = ">10&&<20||==0";

// With parentheses - clear intent
String expression = "(>10&&<20)||==0";
```

**Operator Precedence** (highest to lowest):
1. Parentheses `()`
2. NOT `!`
3. AND `&&`
4. OR `||`

## Real-World Examples

### Smart Home System

```java
// Auto AC control: temperature too high OR humidity too high
String expression = ">26||>70";

// Safety alarm: door open OR smoke detected
String expression = "==1||==1";

// Energy saving: temperature comfortable AND humidity normal AND nobody home
String expression = "[22,26]&&[40,60]&&==0";

// State transition: normal → alarm
String expression = "{[20,30]&&[40,70]}->{<15||>35||<30||>80}";
```

### Industrial Monitoring

```java
// Equipment warning: temperature high OR pressure high OR vibration abnormal
String expression = ">80||>150||>5.0";

// Production line normal: all parameters in range
String expression = "[70,90]&&[100,200]&&[0,2.0]";

// Emergency shutdown: any critical parameter exceeded
String expression = ">100||>300||>10.0";

// State transition: normal → abnormal
String expression = "{[70,90]&&[100,200]}->{>100||>300}";
```

### Financial Risk Control

```java
// Suspicious transaction: amount abnormal OR time abnormal
String expression = ">50000||<1||>23";

// Normal user behavior: amount reasonable AND time normal AND location normal
String expression = "[100,10000]&&[6,22]&&==1";

// High-risk account: multiple risk indicators
String expression = ">100000&&<6&&==0";

// Risk escalation
String expression = "{[100,5000]&&[8,20]}->{>10000||<8||>20}->{>50000&&<6}";
```

### Network Security Monitoring

```java
// Abnormal access: frequency too high OR source suspicious
String expression = ">1000||==0";

// Normal traffic: request count moderate AND response normal AND no errors
String expression = "[10,500]&&<1000&&==0";

// DDoS attack detection: request surge AND distributed sources
String expression = ">5000&&>100";

// Security event escalation
String expression = "{[10,500]&&<1000}->{>2000||>5000}";
```

### Medical Device Monitoring

```java
// Patient vital signs abnormal: heart rate OR blood pressure abnormal
String expression = "<60||>100||<90||>140";

// Device normal operation: all indicators in range
String expression = "[60,100]&&[90,140]&&[36,37.5]";

// Emergency alert: multiple vital signs abnormal
String expression = "<50||>120&&<80||>160";

// Condition change: stable → abnormal
String expression = "{[70,90]&&[100,130]}->{<60||>100||<90||>140}";
```

### Environmental Monitoring

```java
// Air quality alert: PM2.5 high OR ozone concentration high
String expression = ">75||>160";

// Comfortable environment: temperature AND humidity AND air quality good
String expression = "[20,26]&&[40,60]&&<35";

// Pollution event: multiple indicators exceed standards
String expression = ">150&&>200&&>100";

// Environment deterioration
String expression = "{<35&&<100}->{>75||>160}";
```

## Complex Combinations

### Multi-Level Conditions

```java
// Complex business rule
String expression = "((>30||<10)&&!=20)||([50,60]&&!=55)";

// Breakdown:
// - (>30||<10) - Value is extreme (high or low)
// - &&!=20 - AND not equal to 20
// - ||([50,60]&&!=55) - OR value is in [50,60] but not 55
```

### State Transitions with Logical Expressions

```java
// Multi-stage monitoring
String expression = "{>10&&<20}->{[30,40]||>50}->{!=0&&!=100}";

// Stage 1: Value between 10 and 20
// Stage 2: Value in [30,40] OR greater than 50
// Stage 3: Value not 0 and not 100
```

## Best Practices

### 1. Use Parentheses for Clarity

```java
// Less clear
">10&&<20||==0"

// More clear
"(>10&&<20)||==0"
```

### 2. Group Related Conditions

```java
// Good: Logical grouping
"(>30||<10)&&!=20"  // Extreme values, but not 20

// Avoid: Scattered logic
">30&&!=20||<10"  // Harder to understand
```

### 3. Simplify When Possible

```java
// Complex
">=10&&<=20"

// Simpler
"[10,20]"
```

### 4. Document Complex Logic

```java
// Complex expression - add comments in code
String expression = "((>30||<10)&&!=20)||([50,60]&&!=55)";
// Matches: (extreme values except 20) OR (50-60 range except 55)
```

## Common Patterns

### Exclusion Pattern

```java
// Exclude specific values
"!=0&&!=(-1)&&!=999"
```

### Range with Exceptions

```java
// In range but not specific value
"[0,100]&&!=50"
```

### Multiple Valid Ranges

```java
// Value in any of several ranges
"[10,20]||[30,40]||[50,60]"
```

### Compound Conditions

```java
// Multiple criteria must all be met
"[20,30]&&[40,60]&&>0"
```

## Next Steps

- [Comparison Expressions](./comparison.md) - Basic comparisons
- [Interval Expressions](./interval.md) - Range definitions
- [Functions](./functions/count.md) - Pattern matching
- [Examples](../examples/network-monitoring.md) - Real-world applications


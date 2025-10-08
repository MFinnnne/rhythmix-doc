# Temperature Monitoring Example

This example demonstrates how to use Rhythmix for temperature monitoring and alerting.

## Scenario

Monitor temperature sensors and detect:
- Temperature exceeding thresholds
- Sustained high temperatures
- Temperature spikes and recovery patterns

## Basic Temperature Alert

```java
// Alert when temperature exceeds 30°C
String expression = ">30";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData(
    "temp_sensor_01",
    "temperature",
    "32.5",
    new Timestamp(System.currentTimeMillis())
);

boolean alert = executor.execute(data); // true
```

## Sustained High Temperature

```java
// Alert if temperature stays above 80°C for 3 consecutive readings
String expression = "count!(>80, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] readings = {
    new RhythmixEventData("1", "temp", "85", timestamp1),
    new RhythmixEventData("2", "temp", "82", timestamp2),
    new RhythmixEventData("3", "temp", "88", timestamp3)
};

boolean alert = executor.execute(readings); // true - sustained high temp
```

## Temperature Spike Detection

```java
// Detect pattern: normal → spike → recovery
String expression = "{[20,30]}->{>50}->{[20,30]}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

executor.execute(new RhythmixEventData("1", "temp", "25", ts1)); // normal
executor.execute(new RhythmixEventData("2", "temp", "55", ts2)); // spike
boolean detected = executor.execute(new RhythmixEventData("3", "temp", "28", ts3)); // recovery → true
```

## Average Temperature Monitoring

```java
// Alert if average temperature in last 10 readings exceeds 30°C
String expression = "filter(>0).limit(10).avg().meet(>30)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class TemperatureMonitor {
    private final RhythmixExecutor highTempExecutor;
    private final RhythmixExecutor sustainedExecutor;
    private final RhythmixExecutor avgExecutor;
    
    public TemperatureMonitor() {
        this.highTempExecutor = RhythmixCompiler.compile(">40");
        this.sustainedExecutor = RhythmixCompiler.compile("count!(>35, 3)");
        this.avgExecutor = RhythmixCompiler.compile("filter(>0).limit(10).avg().meet(>30)");
    }
    
    public void processReading(double temperature) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        RhythmixEventData data = new RhythmixEventData(
            "sensor_01",
            "temperature",
            String.valueOf(temperature),
            now
        );
        
        if (highTempExecutor.execute(data)) {
            System.out.println("ALERT: High temperature detected: " + temperature);
        }
        
        if (sustainedExecutor.execute(data)) {
            System.out.println("ALERT: Sustained high temperature!");
        }
        
        if (avgExecutor.execute(data)) {
            System.out.println("ALERT: Average temperature too high!");
        }
    }
}
```

## Next Steps

- [Production Quality Control](./production-quality.md)
- [Network Monitoring](./network-monitoring.md)
- [Expression Syntax](../expressions/overview.md)


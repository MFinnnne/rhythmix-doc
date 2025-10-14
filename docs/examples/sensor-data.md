# Sensor Data Processing Example

Process and validate sensor data streams using Rhythmix.

## Scenario

Monitor sensor readings:
- Filter out error codes
- Detect sensor failures
- Validate data consistency

## Filter Error Codes

```java
// Count valid readings (exclude 0 and -1 error codes)
String expression = "filter(!=0&&!=(-1)).count().meet(>10)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Sensor Failure Detection

```java
// Detect 3 consecutive error readings
String expression = "count!(==0||==(-1), 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Data Consistency Check

```java
// Standard deviation of last 20 readings must be low
String expression = "filter(!=0).limit(20).stddev().meet(<5)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class SensorMonitor {
    private final RhythmixExecutor validExecutor;
    private final RhythmixExecutor failureExecutor;
    private final RhythmixExecutor consistencyExecutor;
    
    public SensorMonitor() {
        this.validExecutor = RhythmixCompiler.compile(
            "filter(!=0&&!=(-1)).count().meet(>10)"
        );
        this.failureExecutor = RhythmixCompiler.compile("count!(==0||==(-1), 3)");
        this.consistencyExecutor = RhythmixCompiler.compile(
            "filter(!=0).limit(20).stddev().meet(<5)"
        );
    }
    
    public void processReading(String sensorId, double value) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        RhythmixEventData data = new RhythmixEventData(
            sensorId,
            "reading",
            String.valueOf(value),
            now
        );
        
        if (validExecutor.execute(data)) {
            System.out.println("INFO: Sufficient valid readings collected");
        }
        
        if (failureExecutor.execute(data)) {
            System.out.println("ALERT: Sensor " + sensorId + " may be failing!");
        }
        
        if (!consistencyExecutor.execute(data)) {
            System.out.println("WARNING: High variability in sensor readings");
        }
    }
}
```

## Next Steps

- [Temperature Monitoring](./temperature-monitoring)
- [Custom Filters](../advanced/custom-filters)
- [Chain Expressions](../expressions/chain/overview)


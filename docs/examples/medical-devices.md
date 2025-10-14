# Medical Device Monitoring Example

Monitor patient vital signs using Rhythmix for medical device applications.

## Scenario

Monitor vital signs:
- Heart rate abnormalities
- Blood pressure alerts
- Sustained abnormal conditions

## Heart Rate Monitoring

```java
// Alert if heart rate is abnormal (<60 or >100 bpm)
String expression = "<60||>100";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Sustained Abnormality Detection

```java
// Alert if heart rate stays abnormal for 3 consecutive readings
String expression = "count!(<60||>100, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Vital Signs Pattern

```java
// Detect: stable → abnormal
String expression = "{[70,90]&&[100,130]}->{<60||>100||<90||>140}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class VitalSignsMonitor {
    private final RhythmixExecutor heartRateExecutor;
    private final RhythmixExecutor sustainedExecutor;
    private final RhythmixExecutor patternExecutor;
    
    public VitalSignsMonitor() {
        this.heartRateExecutor = RhythmixCompiler.compile("<60||>100");
        this.sustainedExecutor = RhythmixCompiler.compile("count!(<60||>100, 3)");
        this.patternExecutor = RhythmixCompiler.compile(
            "{[70,90]&&[100,130]}->{<60||>100||<90||>140}"
        );
    }
    
    public void checkVitals(String patientId, int heartRate, int systolic) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        
        RhythmixEventData hrData = new RhythmixEventData(
            patientId + "_hr",
            "heart_rate",
            String.valueOf(heartRate),
            now
        );
        
        if (heartRateExecutor.execute(hrData)) {
            System.out.println("ALERT: Abnormal heart rate for patient " + patientId);
        }
        
        if (sustainedExecutor.execute(hrData)) {
            System.out.println("CRITICAL: Sustained abnormal heart rate!");
        }
        
        if (patternExecutor.execute(hrData)) {
            System.out.println("ALERT: Vital signs deteriorating!");
        }
    }
}
```

## Next Steps

- [Temperature Monitoring](./temperature-monitoring)
- [count!() Function](../expressions/functions/count-strict)
- [State Transitions](../advanced/state-transitions)


# Network Monitoring Example

Monitor network performance and detect latency issues using Rhythmix.

## Scenario

Monitor API response times:
- Detect slow responses
- Identify latency spikes
- Track average response time

## Slow Response Detection

```java
// Alert when response time exceeds 1000ms
String expression = ">1000";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData response = new RhythmixEventData(
    "api_call_001",
    "response_time",
    "1250",
    new Timestamp(System.currentTimeMillis())
);

boolean slow = executor.execute(response); // true
```

## Latency Spike Pattern

```java
// Detect: normal → spike → recovery
String expression = "{<100}->{>1000}->{<200}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Average Response Time

```java
// Alert if average response time in last minute exceeds 500ms
String expression = "filter(>0).window(1m).avg().meet(>500)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class NetworkMonitor {
    private final RhythmixExecutor slowExecutor;
    private final RhythmixExecutor spikeExecutor;
    private final RhythmixExecutor avgExecutor;
    
    public NetworkMonitor() {
        this.slowExecutor = RhythmixCompiler.compile(">1000");
        this.spikeExecutor = RhythmixCompiler.compile("{<100}->{>1000}->{<200}");
        this.avgExecutor = RhythmixCompiler.compile(
            "filter(>0).window(1m).avg().meet(>500)"
        );
    }
    
    public void recordResponse(String endpoint, long responseTime) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        RhythmixEventData data = new RhythmixEventData(
            endpoint,
            "response_time",
            String.valueOf(responseTime),
            now
        );
        
        if (slowExecutor.execute(data)) {
            System.out.println("ALERT: Slow response on " + endpoint);
        }
        
        if (spikeExecutor.execute(data)) {
            System.out.println("ALERT: Latency spike detected and recovered");
        }
        
        if (avgExecutor.execute(data)) {
            System.out.println("ALERT: Average response time too high!");
        }
    }
}
```

## Next Steps

- [Temperature Monitoring](./temperature-monitoring)
- [Production Quality](./production-quality)
- [Window Functions](../expressions/chain/window)


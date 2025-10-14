# Financial Risk Control Example

Monitor financial transactions and detect suspicious patterns using Rhythmix.

## Scenario

Monitor transactions for:
- Large transaction amounts
- Unusual transaction patterns
- Risk escalation

## Large Transaction Alert

```java
// Alert on transactions over $50,000
String expression = ">50000";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Suspicious Pattern Detection

```java
// Detect: normal → suspicious → high-risk
String expression = "{[100,10000]}->{>10000||<6||>22}->{>50000&&<6}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Transaction Frequency Check

```java
// Alert if more than 10 transactions in 1 minute
String expression = "filter(>0).window(1m).count().meet(>10)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class RiskMonitor {
    private final RhythmixExecutor largeAmountExecutor;
    private final RhythmixExecutor patternExecutor;
    private final RhythmixExecutor frequencyExecutor;
    
    public RiskMonitor() {
        this.largeAmountExecutor = RhythmixCompiler.compile(">50000");
        this.patternExecutor = RhythmixCompiler.compile(
            "{[100,10000]}->{>10000||<6||>22}->{>50000&&<6}"
        );
        this.frequencyExecutor = RhythmixCompiler.compile(
            "filter(>0).window(1m).count().meet(>10)"
        );
    }
    
    public void checkTransaction(String userId, double amount, int hour) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        RhythmixEventData data = new RhythmixEventData(
            userId,
            "transaction",
            String.valueOf(amount),
            now
        );
        
        if (largeAmountExecutor.execute(data)) {
            System.out.println("ALERT: Large transaction: $" + amount);
        }
        
        if (patternExecutor.execute(data)) {
            System.out.println("ALERT: Suspicious pattern detected for user " + userId);
        }
        
        if (frequencyExecutor.execute(data)) {
            System.out.println("ALERT: High transaction frequency!");
        }
    }
}
```

## Next Steps

- [Network Monitoring](./network-monitoring)
- [Logical Expressions](../expressions/logical)
- [State Transitions](../advanced/state-transitions)


# Production Quality Control Example

Monitor production line quality using Rhythmix expressions.

## Scenario

Monitor product specifications:
- Weight within tolerance
- Consecutive quality products
- Batch quality validation

## Weight Specification Check

```java
// Product weight must be 100g ± 5g
String expression = "[95,105]";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData product = new RhythmixEventData(
    "product_001",
    "weight",
    "98.5",
    new Timestamp(System.currentTimeMillis())
);

boolean inSpec = executor.execute(product); // true
```

## Consecutive Quality Products

```java
// Ensure 5 consecutive products are within spec
String expression = "count!([95,105], 5)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Batch Weight Validation

```java
// Total batch weight must be 950-1050g (10 products × 100g)
String expression = "filter([90,110]).limit(10).sum().meet([950,1050])";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## Complete Example

```java
public class QualityControl {
    private final RhythmixExecutor specExecutor;
    private final RhythmixExecutor consecutiveExecutor;
    private final RhythmixExecutor batchExecutor;
    
    public QualityControl() {
        this.specExecutor = RhythmixCompiler.compile("[95,105]");
        this.consecutiveExecutor = RhythmixCompiler.compile("count!([95,105], 5)");
        this.batchExecutor = RhythmixCompiler.compile(
            "filter([90,110]).limit(10).sum().meet([950,1050])"
        );
    }
    
    public void checkProduct(String productId, double weight) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        RhythmixEventData data = new RhythmixEventData(
            productId,
            "weight",
            String.valueOf(weight),
            now
        );
        
        if (!specExecutor.execute(data)) {
            System.out.println("REJECT: Product " + productId + " out of spec");
        }
        
        if (consecutiveExecutor.execute(data)) {
            System.out.println("PASS: 5 consecutive quality products!");
        }
        
        if (batchExecutor.execute(data)) {
            System.out.println("PASS: Batch weight validated!");
        }
    }
}
```

## Next Steps

- [Temperature Monitoring](./temperature-monitoring)
- [Network Monitoring](./network-monitoring)
- [Interval Expressions](../expressions/interval)


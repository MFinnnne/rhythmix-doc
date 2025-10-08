# RhythmixEventData

The `RhythmixEventData` class is the core data object that flows through Rhythmix expressions.

## Class Structure

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RhythmixEventData {
    private String id;           // Unique identifier
    private String code;         // Data code
    private String serialNumber; // Serial number
    private String name;         // Event name
    private String value;        // Data value (core field)
    private Timestamp ts;        // Timestamp
    private String[] args;       // Extension fields
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | Yes | Unique identifier for the data |
| name | String | Yes | Event/data name |
| value | String | Yes | The actual value (must be numeric string) |
| ts | Timestamp | Yes | When the event occurred |
| code | String | No | Data code for classification |
| serialNumber | String | No | Serial number for device identification |
| args | String[] | No | Extension fields for additional data |

## Constructors

### Full Constructor

```java
RhythmixEventData data = new RhythmixEventData(
    "id001",
    "event1",
    "25.5",
    new Timestamp(System.currentTimeMillis())
);
```

### Auto-Generated ID

```java
RhythmixEventData data = new RhythmixEventData(
    "temperature",
    "25.5",
    new Timestamp(System.currentTimeMillis())
);
```

### Builder Pattern

```java
RhythmixEventData data = RhythmixEventData.builder()
    .id("sensor001")
    .name("temperature")
    .value("25.5")
    .ts(new Timestamp(System.currentTimeMillis()))
    .code("TEMP_001")
    .serialNumber("SN123456")
    .build();
```

## Usage Examples

### Temperature Sensor

```java
RhythmixEventData tempData = new RhythmixEventData(
    "temp_sensor_01",
    "temperature",
    "28.5",
    new Timestamp(System.currentTimeMillis())
);
```

### Production Line

```java
RhythmixEventData productData = RhythmixEventData.builder()
    .id("product_001")
    .name("weight")
    .value("98.5")
    .ts(new Timestamp(System.currentTimeMillis()))
    .serialNumber("BATCH_2024_001")
    .build();
```

### Network Monitoring

```java
RhythmixEventData responseData = new RhythmixEventData(
    "api_response",
    "150",  // 150ms
    new Timestamp(System.currentTimeMillis())
);
```

## Important Notes

1. **value field**: Must be a numeric string (e.g., "25.5", "100", "-10")
2. **Timestamp**: Used for time-based windows and state transitions
3. **ID**: Auto-generated if not provided
4. **Required fields**: id, name, value, and ts must all be provided

## Next Steps

- [RhythmixCompiler](./rhythmix-compiler.md)
- [RhythmixExecutor](./rhythmix-executor.md)
- [Quick Start](../getting-started/quick-start.md)


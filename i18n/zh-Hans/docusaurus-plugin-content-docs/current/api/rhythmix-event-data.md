<!--
 * @Author: MFine
 * @Date: 2025-10-09 00:12:55
 * @LastEditTime: 2025-10-15 00:15:14
 * @LastEditors: MFine
 * @Description:
-->
# RhythmixEventData

`RhythmixEventData` 类是流经 Rhythmix 表达式的核心数据对象。

## 类结构

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

## 字段

| 字段 | 类型 | 必需 | 描述 |
|-------|------|----|-------------|
| id | String | 否  | 数据的唯一标识符 |
| name | String | 否  | 事件/数据名称 |
| value | String | 是  | 实际值(必须是数字字符串) |
| ts | Timestamp | 是  | 事件发生时间 |
| code | String | 否  | 用于分类的数据代码 |
| serialNumber | String | 否  | 用于设备识别的序列号 |
| args | String[] | 否  | 用于附加数据的扩展字段 |

## 构造函数

### 完整构造函数

```java
RhythmixEventData data = new RhythmixEventData(
    "id001",
    "event1",
    "25.5",
    new Timestamp(System.currentTimeMillis())
);
```

### 构建器模式

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


## 重要说明

1. **value 字段**: 必须是数字字符串(例如 "25.5"、"100"、"-10")
2. **Timestamp**: 用于基于时间的窗口和状态转换
3**必需字段**: id、name、value 和 ts 必须全部提供

## 下一步

- [RhythmixCompiler](./rhythmix-compiler)
- [RhythmixExecutor](./rhythmix-executor)
- [快速开始](../getting-started/quick-start)


# RhythmixExecutor

`RhythmixExecutor` 类对数据流执行已编译的表达式。

## 概述

执行器:
- 处理 RhythmixEventData 对象
- 在执行之间维护状态
- 返回布尔结果
- 支持批量和增量执行

## 基本用法

```java
RhythmixExecutor executor = RhythmixCompiler.compile(">5");
RhythmixEventData data = new RhythmixEventData("1", "test", "7", timestamp);
boolean result = executor.execute(data);
```

## API

### execute(RhythmixEventData...)

```java
public boolean execute(RhythmixEventData... data)
```

**参数:**
- `data`: 一个或多个 RhythmixEventData 对象

**返回:**
- `boolean`: 如果表达式满足则返回 true,否则返回 false

## 执行模式

### 批量执行

一次处理多个数据点:

```java
RhythmixEventData[] data = {
    new RhythmixEventData("1", "test", "2", timestamp1),
    new RhythmixEventData("2", "test", "0", timestamp2),
    new RhythmixEventData("3", "test", "3", timestamp3)
};

boolean result = executor.execute(data);
```

### 增量执行

一次处理一个数据点:

```java
boolean r1 = executor.execute(data1); // false - still processing
boolean r2 = executor.execute(data2); // false - still processing
boolean r3 = executor.execute(data3); // true - expression satisfied!
```

## 下一步

- [RhythmixCompiler](./rhythmix-compiler)
- [RhythmixEventData](./rhythmix-event-data)
- [表达式语法](../expressions/overview)


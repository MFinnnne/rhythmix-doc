# RhythmixCompiler

`RhythmixCompiler` 类将表达式字符串编译为可执行的 `RhythmixExecutor` 对象。

## 概述

编译器:
- 解析表达式字符串
- 验证语法
- 创建可执行对象
- 对无效表达式抛出异常

## 基本用法

```java
String expression = ">5";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## API

### compile()

```java
public static RhythmixExecutor compile(String expression)
```

**参数:**
- `expression`: Rhythmix 表达式字符串

**返回:**
- `RhythmixExecutor`: 可执行对象

**抛出:**
- 如果表达式语法无效则抛出异常

## 示例

### 简单表达式

```java
String expression = ">30";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

### 状态转换

```java
String expression = "{>1}->{count(<1,3)}->{==3}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

### 链式表达式

```java
String expression = "filter(>0).sum().meet(>100)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);
```

## 错误处理

```java
try {
    RhythmixExecutor executor = RhythmixCompiler.compile("invalid>>expression");
} catch (Exception e) {
    System.err.println("Invalid expression: " + e.getMessage());
}
```

## 最佳实践

1. **编译一次**: 编译表达式一次并重用执行器
2. **处理异常**: 始终处理编译错误
3. **验证输入**: 在编译前验证表达式字符串
4. **缓存执行器**: 为常用表达式缓存已编译的执行器

## 下一步

- [RhythmixExecutor](./rhythmix-executor)
- [RhythmixEventData](./rhythmix-event-data)
- [表达式语法](../expressions/overview)


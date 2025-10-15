# 自定义过滤器

创建自定义过滤器函数,实现内置比较、区间和逻辑表达式之外的复杂过滤逻辑。

## 概述

自定义过滤器允许你:
- 实现特定领域的过滤逻辑
- 基于自定义业务规则处理数据
- 使用外部数据源或配置进行过滤
- 创建可重用的过滤组件

## 创建自定义过滤器

实现 `ChainFilterUDF` 接口:

```java
public class TemperatureFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "tempFilter"; // Filter name for use in expressions
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            double temp = Double.parseDouble(event.getValue());
            return temp >= 20.0 && temp <= 80.0; // Keep 20-80°C
        } catch (NumberFormatException e) {
            return false; // Discard invalid data
        }
    }
}
```

## 使用自定义过滤器

```java
// 在链式表达式中使用
String expression = "tempFilter().sum().meet(>100)";
```

## 示例过滤器

### 数字过滤器

```java
public class NumericFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "numericFilter";
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            Double.parseDouble(event.getValue());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
```

### 正数过滤器

```java
public class PositiveFilterUDF implements ChainFilterUDF {
    @Override
    public String getName() {
        return "positiveFilter";
    }

    @Override
    public boolean filter(RhythmixEventData event) {
        try {
            double value = Double.parseDouble(event.getValue());
            return value > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
```

## 高级用法: 批量过滤

处理整个列表:

```java
public class ArrayFilterUDF implements FilterUDF {
    @Override
    public String getName() {
        return "arrayFilter";
    }

    @Override
    public List<RhythmixEventData> filter(List<RhythmixEventData> events) {
        // Keep only last 3 items
        if (events.size() >= 3) {
            return events.subList(events.size() - 3, events.size());
        }
        return events;
    }
}
```

## 最佳实践

1. **处理异常**: 始终优雅地处理解析错误
2. **返回一致的类型**: 确保过滤逻辑是确定性的
3. **记录行为**: 清楚地记录过滤器的功能
4. **充分测试**: 测试边界情况和无效数据

## 下一步

- [自定义计算器](./custom-calculators)
- [自定义 Meet 函数](./custom-meet-functions)
- [链式表达式](../expressions/chain/overview)


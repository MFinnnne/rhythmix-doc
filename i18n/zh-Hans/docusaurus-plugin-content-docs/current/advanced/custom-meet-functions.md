# 自定义 Meet 函数

创建自定义 meet 函数,实现内置比较和范围检查之外的专门验证逻辑。

## 概述

自定义 meet 函数允许你:
- 实现特定领域的验证规则
- 创建复杂的条件逻辑
- 构建可重用的验证组件
- 与外部验证系统集成

## 创建自定义 Meet 函数

实现 `ChainMeetUDF` 接口:

```java
public class CustomThresholdMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "customThresholdMeet"; // Function name for use in expressions
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) {
            return false;
        }

        try {
            double numericValue = calculatedValue.doubleValue();
            return numericValue > 15.0; // Custom threshold
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String getDescription() {
        return "Checks if calculated value is greater than 15";
    }
}
```

## 使用自定义 Meet 函数

```java
// 在链式表达式中使用
String expression = "filter(>0).sum().customThresholdMeet()";
```

## 示例 Meet 函数

### 阈值 Meet

```java
public class ThresholdMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "thresholdMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        return calculatedValue != null && calculatedValue.doubleValue() >= 10.0;
    }
}
```

### 范围 Meet

```java
public class RangeMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "rangeMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;
        double value = calculatedValue.doubleValue();
        return value >= 5.0 && value <= 50.0;
    }
}
```

### 正数 Meet

```java
public class PositiveMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "positiveMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        return calculatedValue != null && calculatedValue.doubleValue() > 0.0;
    }
}
```

### 偶数 Meet

```java
public class EvenMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "evenMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;
        return calculatedValue.longValue() % 2 == 0;
    }
}
```

## 复杂 Meet 逻辑

```java
public class MultiConditionMeetUDF implements ChainMeetUDF {
    @Override
    public String getName() {
        return "multiConditionMeet";
    }

    @Override
    public boolean meet(Number calculatedValue) {
        if (calculatedValue == null) return false;

        double value = calculatedValue.doubleValue();

        // Complex multi-condition logic
        if (value >= 0 && value <= 10) {
            return value % 2 == 0; // 0-10: must be even
        } else if (value > 10 && value <= 100) {
            return value > 50; // 10-100: must be > 50
        } else {
            return value < 0; // Otherwise: must be negative
        }
    }
}
```

## 最佳实践

1. **处理 Null 值**: 始终检查 null 输入
2. **返回布尔值**: 始终返回 true 或 false,永不返回 null
3. **记录逻辑**: 清楚地记录验证规则
4. **提供描述**: 实现 getDescription() 以提高清晰度
5. **充分测试**: 测试边界情况和边界值

## 下一步

- [自定义过滤器](./custom-filters)
- [自定义计算器](./custom-calculators)
- [链式表达式](../expressions/chain/overview)


# 自定义计算器

创建自定义计算器函数,执行内置 sum、avg、count 和 stddev 之外的专门计算。

## 概述

自定义计算器允许你:
- 实现特定领域的计算
- 创建复杂的统计函数
- 执行自定义聚合
- 构建可重用的计算组件

## 创建自定义计算器

实现 `ChainCalculatorUDF` 接口:

```java
public class MyMaxCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "myMax"; // Calculator name for use in expressions
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        if (values == null || values.isEmpty()) {
            return 0;
        }

        double max = Double.NEGATIVE_INFINITY;
        boolean hasValidNumber = false;

        for (RhythmixEventData data : values) {
            if (data == null || data.getValue() == null) {
                continue;
            }

            try {
                double num = Double.parseDouble(data.getValue());
                if (!Double.isNaN(num) && num > max) {
                    max = num;
                }
                hasValidNumber = true;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        return hasValidNumber ? max : 0;
    }
}
```

## 使用自定义计算器

```java
// 在链式表达式中使用
String expression = "filter(>0).limit(5).myMax().meet(>10)";
```

## 示例计算器

### 最大值计算器

```java
public class MaxCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "maxCalc";
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        return values.stream()
            .map(v -> Double.parseDouble(v.getValue()))
            .max(Double::compare)
            .orElse(0.0);
    }
}
```

### 最小值计算器

```java
public class MinCalculator implements ChainCalculatorUDF {
    @Override
    public String getName() {
        return "minCalc";
    }

    @Override
    public Number calculate(List<RhythmixEventData> values) {
        return values.stream()
            .map(v -> Double.parseDouble(v.getValue()))
            .min(Double::compare)
            .orElse(0.0);
    }
}
```

## 最佳实践

1. **处理空列表**: 始终检查 null 或空输入
2. **处理无效数据**: 优雅地跳过或处理非数字值
3. **返回适当的类型**: 计数返回 Integer,小数返回 Double
4. **记录行为**: 清楚地记录计算逻辑
5. **测试边界情况**: 测试空列表、单个值等情况

## 下一步

- [自定义过滤器](./custom-filters)
- [自定义 Meet 函数](./custom-meet-functions)
- [链式表达式](../expressions/chain/overview)


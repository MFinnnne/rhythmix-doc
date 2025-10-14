<!--
 * @Author: MFine
 * @Date: 2025-10-14 20:01:02
 * @LastEditTime: 2025-10-14 21:50:48
 * @LastEditors: MFine
 * @Description: 
-->
# 快速入门

只需几分钟即可开始使用 Rhythmix！

## 基础示例

这是一个展示 Rhythmix 强大功能的简单示例：

```java

public class QuickStartExample {
    public static void main(String[] args) {
        // 编译表达式
        String expression = "{>1}->{count(<1,3)}->{==3}";
        RhythmixExecutor executor = RhythmixCompiler.compile(expression);

        // 创建测试数据
        RhythmixEventData p1 = new RhythmixEventData("11", "event1", "2",
            new Timestamp(System.currentTimeMillis()));
        RhythmixEventData p2 = new RhythmixEventData("12", "event2", "0",
            new Timestamp(System.currentTimeMillis()));
        RhythmixEventData p3 = new RhythmixEventData("13", "event3", "3",
            new Timestamp(System.currentTimeMillis()));

        // 执行表达式
        boolean result = executor.execute(p1, p2, p3);
        System.out.println("Result: " + result);
    }
}
```
下面是工作过程的动画示意:
![](../../../../../static/gif/complex_state_transition.gif)
## 表达式的含义

表达式 `{>1}->{count(<1,3)}->{==3}` 的含义是：

1. **第一个状态** - 第一个值必须大于 1
2. **第二个状态** - 然后需要 3 个小于 1 的值（非连续）
3. **第三个状态** - 最后，值必须等于 3

## 逐步执行

您也可以一次执行一个数据：

```java
RhythmixExecutor executor = RhythmixCompiler.compile("{>1}->{count(<1,3)}->{==3}");

boolean res1 = executor.execute(p1); // false >1
boolean res2 = executor.execute(p2); // false  <1 1/3
res2 = executor.execute(p2); // false <1 2/3
res2 = executor.execute(p2); // false  < 3/3
boolean res3 = executor.execute(p3); // true  等于3  返回true
```

## 简单比较示例

```java
// 检查值是否大于 4
String expression = ">4";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData data = new RhythmixEventData("1", "test", "5",
    new Timestamp(System.currentTimeMillis()));

boolean result = executor.execute(data); // true
```

## 计数函数示例

```java
// 计数 3 个大于 4 的非连续值
String expression = "count(>4, 3)";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

RhythmixEventData[] data = {
    new RhythmixEventData("1", "event", "5", new Timestamp(System.currentTimeMillis())),
    new RhythmixEventData("2", "event", "2", new Timestamp(System.currentTimeMillis())),
    new RhythmixEventData("3", "event", "6", new Timestamp(System.currentTimeMillis())),
    new RhythmixEventData("4", "event", "7", new Timestamp(System.currentTimeMillis()))
};

boolean result = executor.execute(data); // true - 找到 3 个大于 4 的值
```

## 下一步

- 学习[表达式语法](../expressions/overview)
- 探索[链式表达式](../expressions/chain/overview)
- 查看[示例](../examples/temperature-monitoring.md)


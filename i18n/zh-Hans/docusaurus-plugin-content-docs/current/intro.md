---
sidebar_position: 1
---

# Rhythmix 简介

欢迎使用 **Rhythmix** - 一个强大的流数据规则表达式引擎！

## 🎯 什么是 Rhythmix？

Rhythmix 是一个 Java 库，为流数据处理提供了规则表达式引擎。它允许您编写简单的单行表达式来处理流数据，无需编写复杂的代码。

## ✨ 核心特性

- **🚀 简单易用** - 使用直观的表达式语法，无需复杂的编程
- **⚡ 高性能** - 针对流数据处理进行了优化
- **🔧 灵活扩展** - 支持自定义过滤器、计算器和函数
- **📊 状态转换** - 内置对序列模式检测的支持
- **🎨 链式表达式** - 组合多个操作以实现复杂的数据处理

## 🎵 快速示例

这个示例一般用于检测某个开关从开启到关闭最后开启，也可以理解为检测是否重启。


```java
// 检测序列模式：值连续5次等于 1，然后值等于  0，最后值连续5次等于 0
String expression = "{count!(==1,5)}->{==0}->{count!(==1,5)}";
```

> 连续5次的目的为了消抖，某些变量会以一个特定的频率发送过来，某些时候会出现意外的跳变现象，为了消除这种误差我们需要判断多次来保证状态正确

![](../../../../static/gif/count_equal_chain_demo.gif)

### 链式表达式

过滤出-30到30之间的值，10个一组求平均值，当平均值大于28.8时表达式成立

```java
String expression = "filter([-30,30]).limit(10).avg().meet(>28.8)";
```

### 组合使用

连续5次大于28之后 开始对接下来的值进行过滤以及聚合计算操作

```java
String expression = "{count!(>28,5)}->{filter([-30,30]).limit(10).avg().meet(>28.8)}";
```

## 🎯 使用场景

Rhythmix 非常适合以下场景：

- **📈 实时监控** - 温度、压力或其他传感器数据
- **🏭 质量控制** - 生产线数据分析
- **🌐 网络监控** - 流量模式检测
- **🔔 告警系统** - 基于复杂条件的告警触发

## 🚀 快速开始

### Maven

```xml
<dependency>
    <groupId>io.github.mfinnnne</groupId>
    <artifactId>rhythmix</artifactId>
    <version>1.0.3</version>
</dependency>
```

### Gradle

```gradle
implementation 'io.github.mfinnnne:rhythmix:1.0.0'
```

### 基础用法

```java
// 1. 创建编译器
RhythmixCompiler compiler = new RhythmixCompiler();

// 2. 编译表达式
RhythmixExecutor executor = compiler.compile("{count!(==1,5)}->{==0}->{count!(==1,5)}");

// 3. 创建数据
RhythmixEventData data = new RhythmixEventData(
    "c05ba6cf-73fb-4048-81c2-c99151ce1d38",                          // id
    "temperature",               // name
    150.0,                       // value
    System.currentTimeMillis()   // timestamp
);

// 4. 执行
boolean result = executor.execute(data);
System.out.println("结果: " + result); // 输出: 结果: true
```

## 📚 状态单元类型

> `{A}->{B}->{C} 这是一个Rhythmix表达式，状态单元就是花括号的 A，B，C`

Rhythmix   状态单元内支持多种表达式类型：

| 类型 | 示例 | 描述     |
|------|------|--------|
| **比较** | `>100`, `<=50`, `==3` | 基础比较操作 |
| **区间** | `[20,30]`, `(0,100)` | 范围检查   |
| **逻辑** | `>50&&<100`, `==1|        |==2` | 逻辑组合 |
| **函数** | `count(<1,3)`, `count!(<1,3)` | 状态单元函数 |
| **链式** | `filter(>50).limit(10)` | 链式操作   |

## 🎓 下一步

准备好深入了解了吗？查看以下资源：

- **[安装指南](getting-started/installation)** - 详细的设置说明
- **[快速入门](getting-started/quick-start)** - 分步教程
- **[表达式语法](expressions/overview)** - 完整的语法参考
- **[示例](examples/temperature-monitoring)** - 实际应用案例

## 💡 需要帮助？

- 📖 浏览[文档](getting-started/installation)
- 💬 在 [GitHub](https://github.com/MFinnnne/rhythmix) 上提问
- 🐛 [报告问题](https://github.com/MFinnnne/rhythmix/issues)

---

**让我们开始使用 Rhythmix 构建强大的流数据处理应用吧！** 🚀


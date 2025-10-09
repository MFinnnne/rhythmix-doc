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

### 基础比较

```java
// 检查值是否大于 100
String expression = ">100";
RhythmixCompiler compiler = new RhythmixCompiler();
RhythmixExecutor executor = compiler.compile(expression);
RhythmixEventData data = new RhythmixEventData(1L, "temperature", 150.0, System.currentTimeMillis());
boolean result = executor.execute(data); // 返回 true
```

### 区间表达式

```java
// 检查值是否在 20 到 30 之间（包含边界）
String expression = "[20,30]";
```

### 状态转换

```java
// 检测序列模式：值 > 1，然后 3 个值 < 1，最后值 == 3
String expression = "{>1}->{count(<1,3)}->{==3}";
```

### 链式表达式

```java
// 过滤、限制并计算
String expression = "filter(>50).limit(10).calculator(avg)";
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
    <version>1.0.0</version>
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
RhythmixExecutor executor = compiler.compile(">100");

// 3. 创建数据
RhythmixEventData data = new RhythmixEventData(
    1L,                          // id
    "temperature",               // name
    150.0,                       // value
    System.currentTimeMillis()   // timestamp
);

// 4. 执行
boolean result = executor.execute(data);
System.out.println("结果: " + result); // 输出: 结果: true
```

## 📚 表达式类型

Rhythmix 支持多种表达式类型：

| 类型 | 示例 | 描述 |
|------|------|------|
| **比较** | `>100`, `<=50`, `==3` | 基础比较操作 |
| **区间** | `[20,30]`, `(0,100)` | 范围检查 |
| **逻辑** | `>50&&<100`, `==1||==2` | 逻辑组合 |
| **函数** | `count(<1,3)`, `count!(<1,3)` | 计数函数 |
| **链式** | `filter(>50).limit(10)` | 链式操作 |
| **状态** | `{>1}->{<1}->{==3}` | 序列模式 |

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


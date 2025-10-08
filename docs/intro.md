---
sidebar_position: 1
---

# Welcome to Rhythmix

**Rhythmix** is a simple yet powerful rule expression engine for stream data processing. It enables you to find patterns in streaming data using intuitive, one-line expressions.

## 🎯 What is Rhythmix?

Rhythmix (think "rhythm mix") helps you detect specific patterns or "rhythms" in your data streams. Whether you're monitoring temperatures, tracking production quality, or analyzing network performance, Rhythmix makes it easy to express complex rules in a readable format.

## ✨ Key Features

- **Simple Syntax**: Write powerful rules in a single line
- **Stream Processing**: Designed for real-time data streams
- **State Transitions**: Track sequential patterns across multiple data points
- **Chain Expressions**: Build data processing pipelines
- **Extensible**: Create custom filters, calculators, and validators

## 🚀 Quick Example

```java
// Detect temperature spike: normal → high → recovery
String expression = "{[20,30]}->{>50}->{[20,30]}";
RhythmixExecutor executor = RhythmixCompiler.compile(expression);

// Process data
executor.execute(tempData1); // 25°C - normal
executor.execute(tempData2); // 55°C - spike!
boolean matched = executor.execute(tempData3); // 28°C - recovered → true
```

## 📚 Use Cases

Rhythmix excels at:

- **Production Monitoring**: Track equipment status and detect anomalies
- **Quality Control**: Ensure products meet specifications
- **IoT & Sensors**: Process sensor data streams
- **Network Monitoring**: Detect latency spikes and performance issues
- **Financial Systems**: Monitor transactions for suspicious patterns
- **Healthcare**: Track patient vital signs

## 🎓 Getting Started

Ready to dive in? Here's your learning path:

1. **[Installation](./getting-started/installation.md)** - Add Rhythmix to your project
2. **[Quick Start](./getting-started/quick-start.md)** - Your first Rhythmix expression
3. **[Basic Concepts](./getting-started/basic-concepts.md)** - Understand core concepts
4. **[Expression Syntax](./expressions/overview.md)** - Learn the expression language

## 💡 Why Rhythmix?

Traditional stream processing often requires complex code with nested if-statements and state management. Rhythmix simplifies this:

**Before (Traditional Code):**
```java
if (temp > 30) {
    if (consecutiveHighCount >= 3) {
        if (temp < 25) {
            // Pattern matched!
        }
    }
}
```

**After (Rhythmix):**
```java
String expression = "{>30}->{count!(>30,3)}->{<25}";
```

## 🌟 Expression Types

Rhythmix supports multiple expression types:

- **[Comparison](./expressions/comparison.md)**: `>30`, `<10`, `==5`
- **[Interval](./expressions/interval.md)**: `[20,30]`, `(0,100)`
- **[Logical](./expressions/logical.md)**: `>30||<10`, `!=0&&!=(-1)`
- **[Functions](./expressions/functions/count.md)**: `count(>4, 3)`, `count!(>4, 3)`
- **[Chain](./expressions/chain/overview.md)**: `filter(>0).sum().meet(>100)`

## 📖 Documentation Structure

- **Getting Started**: Installation and basic usage
- **Expression Syntax**: Complete expression language reference
- **Advanced Features**: Custom filters, calculators, and validators
- **API Reference**: Core classes and interfaces
- **Examples**: Real-world use cases
- **Appendix**: Best practices, FAQ, and additional examples

## 🔗 Quick Links

- [GitHub Repository](https://github.com/MFinnnne/rhythmix)
- [Maven Central](https://central.sonatype.com/artifact/io.github.mfinnnne/rhythmix)
- [Quick Start Guide](./getting-started/quick-start.md)
- [Examples](./examples/temperature-monitoring.md)

## 📦 Installation

Add to your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.mfinnnne</groupId>
    <artifactId>rhythmix</artifactId>
    <version>1.0.3</version>
</dependency>
```

## 🤝 Contributing

Rhythmix is open source! Contributions are welcome.

## 📄 License

Rhythmix is licensed under the GPL-3.0 license.

---

Ready to get started? Head over to the **[Installation Guide](./getting-started/installation.md)**!

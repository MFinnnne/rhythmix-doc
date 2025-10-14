# 安装

## Maven 依赖

在您的 `pom.xml` 文件中添加以下依赖来将 Rhythmix 添加到项目中：

```xml
<dependency>
    <groupId>io.github.mfinnnne</groupId>
    <artifactId>rhythmix</artifactId>
    <version>1.0.3</version>
</dependency>
```

## Gradle

对于 Gradle 项目，在您的 `build.gradle` 中添加：

```gradle
implementation 'io.github.mfinnnne:rhythmix:1.0.3'
```

## 系统要求

- Java 17 或更高版本
- Maven 或 Gradle 构建工具

## 验证安装

添加依赖后，通过创建一个简单的测试来验证安装：

```java

public class RhythmixTest {
    public static void main(String[] args) {
        String expression = ">5";
        RhythmixExecutor executor = RhythmixCompiler.compile(expression);
        System.out.println("Rhythmix installed successfully!");
    }
}
```

## 下一步

- [快速入门指南](./quick-start.md) - 学习如何使用 Rhythmix
- [基本概念](./basic-concepts.md) - 理解核心概念


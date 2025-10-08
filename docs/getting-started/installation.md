# Installation

## Maven Dependency

Add Rhythmix to your project by including the following dependency in your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.mfinnnne</groupId>
    <artifactId>rhythmix</artifactId>
    <version>1.0.3</version>
</dependency>
```

## Gradle

For Gradle projects, add this to your `build.gradle`:

```gradle
implementation 'io.github.mfinnnne:rhythmix:1.0.3'
```

## Requirements

- Java 8 or higher
- Maven or Gradle build tool

## Verify Installation

After adding the dependency, verify the installation by creating a simple test:

```java
import io.github.mfinnnne.rhythmix.RhythmixCompiler;
import io.github.mfinnnne.rhythmix.RhythmixExecutor;

public class RhythmixTest {
    public static void main(String[] args) {
        String expression = ">5";
        RhythmixExecutor executor = RhythmixCompiler.compile(expression);
        System.out.println("Rhythmix installed successfully!");
    }
}
```

## Next Steps

- [Quick Start Guide](./quick-start.md) - Learn how to use Rhythmix
- [Basic Concepts](./basic-concepts.md) - Understand core concepts


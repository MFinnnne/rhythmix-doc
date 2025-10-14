# Logical Expression Examples

Comprehensive examples of logical expressions in real-world scenarios.

## Smart Home System

```java
// Auto AC: temperature OR humidity high
">26||>70"

// Safety alarm: door OR smoke
"==1||==1"

// Energy saving: all conditions met
"[22,26]&&[40,60]&&==0"

// Complex condition
"([20,30]&&[40,70])||>35"
```

## Industrial Monitoring

```java
// Equipment warning: any parameter abnormal
">80||>150||>5.0"

// Normal operation: all parameters in range
"[70,90]&&[100,200]&&[0,2.0]"

// Emergency shutdown
">100||>300||>10.0"

// Multi-condition check
"(>80&&<100)||(>200&&<300)"
```

## Financial Risk

```java
// Suspicious transaction
">50000||<1||>23"

// Normal user behavior
"[100,10000]&&[6,22]&&==1"

// High-risk account
">100000&&<6&&==0"

// Complex risk pattern
"((>10000||<100)&&!=5000)||>50000"
```

## Network Security

```java
// Abnormal access
">1000||==0"

// Normal traffic
"[10,500]&&<1000&&==0"

// DDoS detection
">5000&&>100"

// Security event
"(>2000||>5000)&&!=(-1)"
```

## Medical Monitoring

```java
// Vital signs abnormal
"<60||>100||<90||>140"

// Device normal operation
"[60,100]&&[90,140]&&[36,37.5]"

// Emergency alert
"<50||>120&&<80||>160"

// Critical condition
"(<60||>100)&&(<90||>140)"
```

## See Also

- [Logical Expressions](../expressions/logical)
- [Comparison Examples](./comparison-examples)
- [Interval Examples](./interval-examples)


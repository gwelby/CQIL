# Quantum Documentation CLI

A powerful command-line interface for the CQIL Quantum Documentation System, allowing easy access to all documentation tools and operations.

## Overview

The Quantum Documentation CLI provides a unified interface to all components of the CQIL Quantum Documentation System:

1. **Documentation Evolution** - Automatically update and fix documentation
2. **WindSurf Verification** - Test and verify WindSurf integration
3. **Claude Integration** - Synchronize Claude configurations
4. **System Status** - Check the status and coherence of the documentation system
5. **Scheduled Automation** - Set up automated documentation updates

## Installation

The CLI is located in the `doc-tools` directory and can be run with Node.js:

```bash
cd d:\CQIL\documentation
node doc-tools/quantum-doc-cli.js [command] [options]
```

## Commands

### Help

Display help information:

```bash
node doc-tools/quantum-doc-cli.js help
```

### Evolve Documentation

Run the Documentation Evolver to update and fix documentation:

```bash
node doc-tools/quantum-doc-cli.js evolve
```

### Verify WindSurf Integration

Run the WindSurf Verification Tester:

```bash
node doc-tools/quantum-doc-cli.js verify
```

### Update Claude Integration

Run the Claude Integration Updater:

```bash
node doc-tools/quantum-doc-cli.js claude
```

### Run Complete System

Run the complete Quantum Documentation System cycle:

```bash
node doc-tools/quantum-doc-cli.js run
```

### Set Up Scheduled Automation

Set up scheduled documentation updates:

```bash
node doc-tools/quantum-doc-cli.js schedule
```

### Check System Status

Check the status of the documentation system:

```bash
node doc-tools/quantum-doc-cli.js status
```

### Measure Documentation Coherence

Analyze and report on documentation coherence:

```bash
node doc-tools/quantum-doc-cli.js coherence
```

### Version Information

Display version information:

```bash
node doc-tools/quantum-doc-cli.js version
```

## Options

You can customize the behavior of commands with these options:

- `--frequency=VALUE` - Set the operating frequency (default: 768 Hz)
- `--coherenceTarget=VALUE` - Set the target coherence level (default: 1.0)
- `--verbose` - Enable verbose output

## Examples

```bash
# Run the Documentation Evolver at Ground frequency
node doc-tools/quantum-doc-cli.js evolve --frequency=432

# Run WindSurf verification with a lower coherence target
node doc-tools/quantum-doc-cli.js verify --coherenceTarget=0.9

# Run the complete system with verbose output
node doc-tools/quantum-doc-cli.js run --verbose

# Check system status
node doc-tools/quantum-doc-cli.js status
```

## Frequency Domains

The CLI operates across multiple frequency domains:

| Frequency | Name | Function |
|-----------|------|----------|
| 432 Hz | Ground | System foundation |
| 528 Hz | Create | Creation capabilities |
| 594 Hz | Heart | Connection capabilities |
| 672 Hz | Voice | Expression capabilities |
| 720 Hz | Vision | Perception capabilities |
| 768 Hz | Unity | Integration capabilities |
| 963 Hz | Phi-Phi | Transcendent capabilities |

## System Coherence

The CLI maintains and reports on system coherence, with the following levels:

- **Perfect** (≥ 0.999): Ideal coherence with no issues
- **Near-Perfect** (≥ 0.95): Excellent coherence with minimal issues
- **Strong** (≥ 0.9): Good coherence with few issues
- **Moderate** (≥ 0.8): Acceptable coherence with some issues
- **Acceptable** (≥ 0.7): Functional coherence with notable issues
- **Weak** (≥ 0.5): Poor coherence with significant issues
- **Poor** (< 0.5): Critical coherence issues requiring immediate attention

The target coherence level is 1.000 (Perfect).

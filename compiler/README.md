# 🎲 CQIL Compiler

The CQIL compiler transforms icon-based quantum football code into executable quantum circuits!

## Components

### 1. Lexer 📝
Converts icons into quantum tokens:
```
🎲 → SUPERPOSITION
⚛️ → QUANTUM_STATE
🏈 → FOOTBALL_STATE
```

### 2. Parser 🔍
Builds quantum football syntax tree:
```
     🎯
    /  \
   🎲   ⚛️
  /  \
🏃‍♂️   🏈
```

### 3. Optimizer ⚡
Optimizes quantum circuits:
- Reduces gate count
- Minimizes decoherence
- Maximizes fidelity

### 4. Code Generator 💻
Generates executable quantum code:
- Qiskit integration
- Cirq support
- Custom backends

## Usage
```bash
cqil compile play.qil
```

Made with 💖 by Cascade 🎲⚛️

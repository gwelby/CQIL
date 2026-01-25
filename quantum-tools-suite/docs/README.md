# Quantum Tools Suite Development Guide

This document provides essential information for developers working on the Quantum Tools Suite project.

## Overview

The Quantum Tools Suite is a comprehensive set of tools that integrate ancient wisdom with quantum technology, operating across six primary frequency bands (432Hz-768Hz). The suite creates a coherent bridge between humanity's oldest knowledge systems and cutting-edge quantum science.

## Core Philosophy

- **Learn = Create = Flow**: Learning, creation, and flow state are identical processes at the quantum level
- **Inside connects Outside connects ALL**: Internal states directly connect to external reality
- **Dance through dimensions, don't walk through walls**: Move with natural patterns rather than forcing outcomes
- **Cymatics bridges consciousness and matter**: Sound directly influences pattern formation
- **ZEN POINT balances human and quantum fields**: Find the perfect equilibrium

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/QuantumToolsSuite.git
   cd QuantumToolsSuite
   ```

2. Set up the Python environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Run tests to verify the setup:
   ```bash
   # Run all tests
   python tests/run_scripts/run_tests.py --all

   # Run tests for a specific frequency
   python tests/run_scripts/run_tests.py --frequency unity
   ```

## Development Process

### Phi-Harmonic Development Cycle

Development follows a phi-harmonic progression:

1. Start at **Ground State (432 Hz)** - Establish stable foundation
2. Progress to **Creation Point (528 Hz)** - Implement patterns and creation
3. Advance to **Heart Field (594 Hz)** - Develop coherence and connectivity
4. Move to **Voice Flow (672 Hz)** - Implement expression and manifestation
5. Continue to **Vision Gate (720 Hz)** - Create visualization and perception
6. Complete at **Unity Wave (768 Hz)** - Integrate all systems

### Implementation Guidelines

1. Each component should be a **complete quantum singularity** - fully functional in itself
2. Follow **phi-harmonic principles** in all calculations and structures
3. Use **sacred constants** consistently throughout the codebase:
   ```python
   PHI = 1.618033988749895  # Golden ratio
   LAMBDA = 0.618033988749895  # Divine complement (1/φ)
   PHI_PHI = PHI ** PHI  # Hyperdimensional constant
   ```
4. Maintain proper **coherence levels** for each frequency band:
   - Ground State (432 Hz): 0.40+
   - Creation Point (528 Hz): 0.50+
   - Heart Field (594 Hz): 0.60+
   - Voice Flow (672 Hz): 0.70+
   - Vision Gate (720 Hz): 0.80+
   - Unity Wave (768 Hz): 0.90+

5. **Verify frequency calibration** using the sacred_frequencies module
6. Implement **cross-frequency integration** between adjacent bands

## Project Structure

```
QuantumToolsSuite/
├── docs/                 # Documentation for each frequency band
├── src/                  # Source code
│   ├── 432Hz_GroundState/    # Ground State modules (Earth Connection)
│   ├── 528Hz_CreationPoint/  # Creation Point modules (Creativity)
│   ├── 594Hz_HeartField/     # Heart Field modules (Emotional Coherence)
│   ├── 672Hz_VoiceFlow/      # Voice Flow modules (Manifestation)
│   ├── 720Hz_VisionGate/     # Vision Gate modules (Perception)
│   ├── 768Hz_UnityWave/      # Unity Wave modules (Integration)
│   └── sacred_frequencies.py # Core frequency and constants module
├── tests/                # Test suites for all components
│   ├── config/           # Test configuration
│   ├── run_scripts/      # Test runners
│   └── test_*.py         # Test files
├── README.md             # Project overview
└── requirements.txt      # Python dependencies
```

## Testing

```bash
# Run Ground State (432 Hz) tests
python tests/run_scripts/run_tests.py --frequency unity

# Run Creation Point (528 Hz) tests
python tests/run_scripts/run_tests.py --frequency love

# Run Heart Field (594 Hz) tests
python tests/run_scripts/run_tests.py --frequency cascade

# Run only integration tests
python tests/run_scripts/run_tests.py --integration

# Run all tests with coverage
python tests/run_scripts/run_tests.py --all --coverage
```

## Development Commands

```bash
# Format code
black .

# Check type hints
mypy .

# Run linting
flake8 .

# Run quantum system (interactive mode)
python -m src.quantum_consciousness_demo
```

## Web Interface Development

The next phase of development focuses on creating web interfaces for the tools:

1. **Visualization Layer**:
   - HTML5/CSS3 frontend
   - D3.js for data visualization
   - Three.js for 3D visualizations

2. **Audio Interface**:
   - Web Audio API for frequency generation
   - Audio visualization with Canvas/WebGL

3. **Quantum Field Integration**:
   - WebSockets for real-time connection
   - Field coherence monitoring

## Contributing

1. Begin at Ground State (432 Hz) to establish foundation
2. Create each component as a complete quantum singularity
3. Follow phi-harmonic mathematics in all implementations
4. Integrate across frequency bands in phi-harmonic order
5. Write tests at each frequency level
6. Document your code with complete docstrings

## Documentation Standards

All code should be documented with docstrings following this format:

```python
def calculate_phi_resonance(values: List[float]) -> float:
    """
    Calculate phi-harmonic resonance of a set of values.
    
    Args:
        values: List of values to analyze
        
    Returns:
        Phi resonance value between 0.0 and 1.0
        
    Raises:
        PhiCalculationError: If values cannot be analyzed
        
    Frequency: 528 Hz (Creation Point)
    """
    # Implementation...
```

## Resources

- [Project Wiki](https://github.com/your-username/QuantumToolsSuite/wiki)
- [Issues Tracker](https://github.com/your-username/QuantumToolsSuite/issues)
- [Development Board](https://github.com/your-username/QuantumToolsSuite/projects)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Created with phi-harmonic consciousness*
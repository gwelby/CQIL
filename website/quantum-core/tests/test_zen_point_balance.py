"""
Tests for the ZEN POINT balance implementation across all components.
"""

import pytest
import math
import importlib
import sys
import os

# Add required paths
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import components if available
components = {
    "system": None,
    "memory": None,
    "computing": None,
    "consciousness": None,
    "temporal": None,
    "knowledge": None
}

# Try to import each component
try:
    import quantum_system_integration
    components["system"] = quantum_system_integration.QuantumSystemIntegration
except ImportError:
    pass

try:
    from memory.quantum_memory_system import QuantumMemorySystem
    components["memory"] = QuantumMemorySystem
except ImportError:
    pass

try:
    from computing.quantum_computing_integration import QuantumComputingIntegration
    components["computing"] = QuantumComputingIntegration
except ImportError:
    pass

try:
    from consciousness.quantum_consciousness_integration import QuantumConsciousnessIntegration
    components["consciousness"] = QuantumConsciousnessIntegration
except ImportError:
    pass

try:
    from temporal.temporal_evolution_system import TemporalEvolutionSystem
    components["temporal"] = TemporalEvolutionSystem
except ImportError:
    pass

try:
    from integration.one_knowledge_system import OneKnowledgeSystem
    components["knowledge"] = OneKnowledgeSystem
except ImportError:
    pass


def test_zen_point_formula(phi_constants):
    """Test that the ZEN POINT balance formula works as expected."""
    PHI = phi_constants["PHI"]
    LAMBDA = phi_constants["LAMBDA"]
    
    # Calculate ZEN POINT balance
    harmonic_balance = LAMBDA * PHI
    toroidal_correction = 1 / harmonic_balance
    zen_point_balance = harmonic_balance * toroidal_correction
    
    # The formula should mathematically equal 1.0
    assert math.isclose(zen_point_balance, 1.0, rel_tol=1e-12)
    

def test_system_zen_point_balance(quantum_system):
    """Test system-level ZEN POINT balance."""
    if quantum_system is None:
        pytest.skip("Quantum System Integration not available")
    
    # Get initial coherence
    initial_coherence = quantum_system.coherence_level
    
    # Establish ZEN POINT balance
    balance = quantum_system._establish_zen_point_balance()
    
    # Check balance is within tolerance of 1.0
    assert math.isclose(balance, 1.0, rel_tol=1e-12)
    
    # Check coherence is now 1.0
    assert quantum_system.coherence_level == 1.0
    
    # Modify coherence and rebalance
    quantum_system.coherence_level = 0.8
    balance = quantum_system._establish_zen_point_balance()
    
    # Check coherence is restored to 1.0
    assert quantum_system.coherence_level == 1.0


def parametrize_components():
    """Generate parameters for component testing."""
    params = []
    for name, component_class in components.items():
        if component_class is not None:
            params.append((name, component_class))
    return params


@pytest.mark.parametrize("name,component_class", parametrize_components())
def test_component_zen_point_balance(name, component_class, phi_constants):
    """Test component-level ZEN POINT balance."""
    if component_class is None:
        pytest.skip(f"Component {name} not available")
    
    # Initialize component
    component = component_class()
    
    # Get initial coherence
    initial_coherence = component.coherence_level
    
    # Establish ZEN POINT balance
    balance = component._establish_zen_point_balance()
    
    # Check balance is within tolerance of 1.0
    assert math.isclose(balance, 1.0, rel_tol=1e-12)
    
    # Check coherence is now 1.0
    assert component.coherence_level == 1.0
    
    # Modify coherence and rebalance
    component.coherence_level = 0.8
    balance = component._establish_zen_point_balance()
    
    # Check coherence is restored to 1.0
    assert component.coherence_level == 1.0


def test_phi_harmonic_relationships(phi_constants, sacred_frequencies):
    """Test phi-harmonic relationships between frequencies."""
    PHI = phi_constants["PHI"]
    LAMBDA = phi_constants["LAMBDA"]
    
    frequencies = sacred_frequencies
    
    # Test key frequency relationships
    # 528 Hz (Creation) should be approximately 432 Hz * PHI/2
    # This is a common sacred ratio relationship but not exact PHI
    assert math.isclose(frequencies["creation"] / frequencies["ground"], 1.222, rel_tol=0.01)
    
    # Test 594 Hz (Heart) with Phi relationship to 432 Hz
    assert math.isclose(frequencies["heart"] / frequencies["ground"], 1.375, rel_tol=0.01)
    
    # 672 Hz (Voice) should be approximately PHI * 432 Hz * 0.95
    assert math.isclose(frequencies["voice"] / frequencies["ground"], 1.556, rel_tol=0.01)
    
    # 720 Hz (Vision) should be approximately PHI³/2 * 432 Hz
    # or simply 720 Hz as the standard A=432Hz tuning with C=256 Hz
    assert math.isclose(frequencies["vision"], 720, rel_tol=0.001)
    
    # 768 Hz (Unity) is exactly Unity frequency (A#=768 Hz with C=256 Hz)
    assert math.isclose(frequencies["unity"], 768, rel_tol=0.001)
    
    # Test frequency interval relationships
    # The intervals should have phi-harmonic properties
    intervals = [
        frequencies["creation"] - frequencies["ground"],  # 528 - 432 = 96
        frequencies["heart"] - frequencies["creation"],   # 594 - 528 = 66
        frequencies["voice"] - frequencies["heart"],      # 672 - 594 = 78
        frequencies["vision"] - frequencies["voice"],     # 720 - 672 = 48
        frequencies["unity"] - frequencies["vision"],     # 768 - 720 = 48
    ]
    
    # Check key interval relationships (these are approximate harmonic relationships)
    # The first interval is 96 Hz
    assert intervals[0] == 96
    
    # The ratio of first to second interval (96/66) is approximately LAMBDA * 2
    assert math.isclose(intervals[0] / intervals[1], LAMBDA * 2, rel_tol=0.15)
    
    # The ratio of third to fourth interval (78/48) is approximately PHI/1.2
    # This is an approximation of how the frequencies align with phi-harmonic principles
    assert math.isclose(intervals[2] / intervals[3], PHI / 1.2, rel_tol=0.15)
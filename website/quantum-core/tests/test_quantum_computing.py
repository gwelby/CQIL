"""
Tests for the Quantum Computing Integration component.
"""

import pytest
import sys
import os
import math
import importlib

# Add required paths
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Try to import the component
try:
    from computing.quantum_computing_integration import QuantumComputingIntegration
except ImportError:
    QuantumComputingIntegration = None

@pytest.fixture
def computing_component():
    """Return a configured Quantum Computing Integration instance for testing."""
    if QuantumComputingIntegration is None:
        pytest.skip("Quantum Computing Integration not available")
    return QuantumComputingIntegration()

def test_component_initialization(computing_component, sacred_frequencies):
    """Test that the component initializes correctly."""
    # Check frequency
    assert computing_component.frequency == sacred_frequencies["creation"]
    
    # Check ZEN POINT balance
    assert math.isclose(computing_component.zen_point_balance, 1.0, rel_tol=1e-12)
    
    # Check coherence level
    assert computing_component.coherence_level == 1.0

def test_phi_harmonic_patterns(computing_component, phi_constants):
    """Test phi-harmonic patterns for circuit optimization."""
    PHI = phi_constants["PHI"]
    LAMBDA = phi_constants["LAMBDA"]
    
    patterns = computing_component.phi_harmonic_patterns
    
    # Check that patterns exist
    assert "fibonacci_circuit" in patterns
    assert "golden_spiral" in patterns
    assert "phi_scaling" in patterns
    assert "lambda_correction" in patterns
    assert "zen_point_circuit" in patterns
    
    # Test pattern values
    fibonacci = patterns["fibonacci_circuit"]["pattern"]
    assert fibonacci == [1, 1, 2, 3, 5, 8, 13, 21]
    
    # Check golden spiral angles
    golden_angles = patterns["golden_spiral"]["angles"]
    for i, angle in enumerate(golden_angles):
        expected = i * LAMBDA * 2 * math.pi
        assert math.isclose(angle, expected, rel_tol=1e-12)
    
    # Check phi scaling
    phi_scales = patterns["phi_scaling"]["scales"]
    for i, scale in enumerate(phi_scales):
        expected = PHI ** i
        assert math.isclose(scale, expected, rel_tol=1e-12)

def test_quantum_circuit_creation(computing_component):
    """Test creating a quantum circuit with phi-harmonic optimization."""
    # Create a simple circuit
    circuit = computing_component.create_quantum_circuit(
        "test_circuit", 
        ["H", "CNOT", "H"], 
        2
    )
    
    # Check circuit properties
    assert circuit["name"] == "test_circuit"
    assert circuit["qubits"] == 2
    assert circuit["coherence"] == 1.0
    assert "gates" in circuit
    assert "qubit_layout" in circuit
    assert circuit["phi_optimization"] is True
    
    # Check gates were optimized
    gates = circuit["gates"]
    assert len(gates) == 3
    
    # All gates should be phi-optimized
    for gate in gates:
        assert gate["phi_optimized"] is True

def test_circuit_simulation(computing_component):
    """Test quantum circuit simulation."""
    # Create a simple circuit
    circuit = computing_component.create_quantum_circuit(
        "test_simulation", 
        ["H", "CNOT", "H"], 
        2
    )
    
    # Simulate the circuit
    simulation = computing_component.simulate_quantum_circuit(circuit["id"])
    
    # Check simulation properties
    assert "achieved_coherence" in simulation
    assert "raw_results" in simulation
    assert "corrected_results" in simulation
    
    # Check results
    raw_results = simulation["raw_results"]
    assert "states" in raw_results
    assert "final_state" in raw_results
    assert "measurements" in raw_results
    assert "measured_state" in raw_results
    
    # Check corrected results
    corrected = simulation["corrected_results"]
    assert "correction_method" in corrected
    assert "corrected_coherence" in corrected
    assert "measured_state" in corrected
    
    # Coherence should be high (>=0.9)
    assert simulation["achieved_coherence"] >= 0.9
    assert corrected["corrected_coherence"] >= 0.9

def test_classical_to_quantum_translation(computing_component):
    """Test translation from classical to quantum algorithms."""
    # Translate a binary search algorithm
    algorithm = computing_component.translate_classical_to_quantum(
        "binary_search", 
        optimization_level=3
    )
    
    # Check algorithm properties
    assert algorithm["name"] == "Quantum Binary Search"
    assert "qubits" in algorithm
    assert "circuit_id" in algorithm
    assert "expected_coherence" in algorithm
    assert "expected_speedup" in algorithm
    
    # Check speedup information
    speedup = algorithm["expected_speedup"]
    assert speedup["classical_complexity"] == "O(N)"
    assert speedup["quantum_complexity"] == "O(sqrt(N))"
    assert "relative_speedup" in speedup
    
    # Create another circuit and simulate
    circuit_id = algorithm["circuit_id"]
    simulation = computing_component.simulate_quantum_circuit(circuit_id)
    
    # Check simulation worked
    assert "achieved_coherence" in simulation
    assert simulation["achieved_coherence"] >= 0.8

def test_hybrid_computation(computing_component):
    """Test hybrid classical-quantum computation."""
    # Create a test circuit first
    circuit = computing_component.create_quantum_circuit(
        "hybrid_test", 
        ["H", "CNOT", "H"], 
        2
    )
    
    # Perform hybrid computation
    hybrid = computing_component.hybrid_computation(
        "preprocessing",
        circuit["id"],
        [1, 2, 3, 4, 5]
    )
    
    # Check hybrid computation properties
    assert "classical_results" in hybrid
    assert "quantum_results" in hybrid
    assert "final_results" in hybrid
    assert "coherence" in hybrid
    
    # Check classical preprocessing
    classical = hybrid["classical_results"]
    assert "processed_data" in classical
    assert len(classical["processed_data"]) == 5
    
    # Check quantum results - should have one result per input
    quantum_results = hybrid["quantum_results"]
    assert len(quantum_results) == len(classical["processed_data"])
    
    # Check final results
    final = hybrid["final_results"]
    assert "processed_results" in final
    
    # Overall coherence should be high
    assert hybrid["coherence"] >= 0.8
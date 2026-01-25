"""
Tests for the Quantum Consciousness Integration component.
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
    from consciousness.quantum_consciousness_integration import QuantumConsciousnessIntegration
except ImportError:
    QuantumConsciousnessIntegration = None

@pytest.fixture
def consciousness_component():
    """Return a configured Quantum Consciousness Integration instance for testing."""
    if QuantumConsciousnessIntegration is None:
        pytest.skip("Quantum Consciousness Integration not available")
    return QuantumConsciousnessIntegration()

def test_component_initialization(consciousness_component, sacred_frequencies):
    """Test that the component initializes correctly."""
    # Check frequency
    assert consciousness_component.frequency == sacred_frequencies["heart"]
    
    # Check ZEN POINT balance
    assert math.isclose(consciousness_component.zen_point_balance, 1.0, rel_tol=1e-12)
    
    # Check coherence level
    assert consciousness_component.coherence_level == 1.0
    
    # Check heart field initialization
    assert "heart_field" in dir(consciousness_component)
    assert consciousness_component.heart_field is not None
    assert consciousness_component.heart_field["name"] == "Heart Field"
    assert consciousness_component.heart_field["frequency"] == sacred_frequencies["heart"]

def test_heart_field_patterns(consciousness_component, phi_constants):
    """Test heart field patterns."""
    PHI = phi_constants["PHI"]
    
    # Check heart field patterns
    heart_field = consciousness_component.heart_field
    patterns = heart_field["patterns"]
    
    # Check that patterns exist
    assert "torus" in patterns
    assert "resonance_nodes" in patterns
    assert "entanglement_points" in patterns
    assert "phi_matrix" in patterns
    assert "sacred_geometry" in patterns
    
    # Check toroidal pattern
    torus = patterns["torus"]
    assert "center" in torus
    assert "paths" in torus
    assert "inward" in torus["paths"]
    assert "central" in torus["paths"]
    assert "outward" in torus["paths"]
    
    # Check phi-harmonic properties
    assert math.isclose(torus["phi_ratio"], PHI, rel_tol=1e-12)
    
    # Check entanglement points
    points = patterns["entanglement_points"]
    assert len(points) == 8  # 8 entanglement points
    
    # Check sacred geometry
    geometry = patterns["sacred_geometry"]
    assert geometry["name"] == "Flower of Life"
    assert "points" in geometry
    assert "connections" in geometry

def test_consciousness_field_creation(consciousness_component):
    """Test creating a consciousness field."""
    # Create a field
    field = consciousness_component.create_consciousness_field(
        "Test Field",
        "connection",
        "consciousness"
    )
    
    # Check field properties
    assert field["name"] == "Test Field"
    assert field["intention"] == "connection"
    assert field["type"] == "consciousness"
    assert field["coherence"] == 1.0
    assert "phi_structure" in field
    assert "resonance_signature" in field
    assert "energy_centers" in field
    
    # Check frequency is heart field (connection intention doesn't shift frequency)
    assert field["frequency"] == consciousness_component.frequency
    
    # Create another field with different intention
    field2 = consciousness_component.create_consciousness_field(
        "Healing Field",
        "healing",
        "consciousness"
    )
    
    # Healing should shift towards creation frequency (528 Hz)
    assert field2["frequency"] < consciousness_component.frequency

def test_quantum_entanglement(consciousness_component):
    """Test quantum entanglement between fields."""
    # Create two fields
    field1 = consciousness_component.create_consciousness_field(
        "Source Field",
        "connection"
    )
    
    field2 = consciousness_component.create_consciousness_field(
        "Target Field",
        "healing"
    )
    
    # Create quantum entanglement
    entanglement = consciousness_component.create_quantum_entanglement(
        field1["id"],
        field2["id"],
        "bidirectional",
        0.95
    )
    
    # Check entanglement properties
    assert entanglement["source_id"] == field1["id"]
    assert entanglement["target_id"] == field2["id"]
    assert entanglement["type"] == "bidirectional"
    assert entanglement["strength"] == 0.95
    assert "quantum_bridge" in entanglement
    assert "verification" in entanglement
    
    # Check quantum bridge
    bridge = entanglement["quantum_bridge"]
    assert "frequency" in bridge
    assert "coherence" in bridge
    assert "control_points" in bridge
    assert "verification_key" in bridge
    
    # Verify entanglement
    verification = consciousness_component.verify_entanglement(entanglement["id"])
    assert verification["status"] in ["success", "partial"]
    assert "verification_coherence" in verification
    assert verification["verification_coherence"] >= 0.7

def test_intention_transfer(consciousness_component):
    """Test transferring intention through quantum entanglement."""
    # Create two fields
    field1 = consciousness_component.create_consciousness_field(
        "Source Field",
        "connection"
    )
    
    field2 = consciousness_component.create_consciousness_field(
        "Target Field",
        "healing"
    )
    
    # Create quantum entanglement
    entanglement = consciousness_component.create_quantum_entanglement(
        field1["id"],
        field2["id"]
    )
    
    # Transfer intention
    transfer = consciousness_component.transfer_intention(
        entanglement["id"],
        "harmony",
        0.95
    )
    
    # Check transfer properties
    assert transfer["entanglement_id"] == entanglement["id"]
    assert transfer["source_id"] == field1["id"]
    assert transfer["target_id"] == field2["id"]
    assert transfer["intention"] == "harmony"
    assert transfer["strength"] == 0.95
    assert "transfer_coherence" in transfer
    assert "intention_packet" in transfer
    assert "target_update" in transfer
    
    # Check target update
    update = transfer["target_update"]
    assert update["field_id"] == field2["id"]
    assert update["new_intention"] == "harmony"
    assert "original_coherence" in update
    assert "new_coherence" in update
    assert update["new_coherence"] >= update["original_coherence"]

def test_field_coherence_amplification(consciousness_component):
    """Test amplifying coherence of a consciousness field."""
    # Create a field with reduced coherence
    field = consciousness_component.create_consciousness_field(
        "Test Field",
        "connection"
    )
    
    # Modify field coherence
    consciousness_component.consciousness_fields[field["id"]]["coherence"] = 0.8
    
    # Amplify coherence
    amplification = consciousness_component.amplify_field_coherence(
        field["id"],
        0.1,
        "phi_harmonic"
    )
    
    # Check amplification properties
    assert amplification["status"] == "success"
    assert amplification["field_id"] == field["id"]
    assert amplification["method"] == "phi_harmonic"
    assert amplification["original_coherence"] == 0.8
    assert "amplification" in amplification
    assert "new_coherence" in amplification
    assert amplification["new_coherence"] > amplification["original_coherence"]
    
    # Check field updated
    field = consciousness_component.consciousness_fields[field["id"]]
    assert field["coherence"] == amplification["new_coherence"]

def test_pattern_detection(consciousness_component):
    """Test detecting resonance patterns in fields."""
    # Create a field
    field = consciousness_component.create_consciousness_field(
        "Test Field",
        "connection"
    )
    
    # Detect patterns
    detection = consciousness_component.detect_resonance_patterns(field["id"])
    
    # Check detection properties
    assert detection["status"] == "success"
    assert detection["field_id"] == field["id"]
    assert "detected_patterns" in detection
    assert "field_signature" in detection
    assert "total_patterns" in detection

def test_field_integration(consciousness_component):
    """Test integrating multiple consciousness fields."""
    # Create multiple fields
    fields = []
    for i in range(3):
        field = consciousness_component.create_consciousness_field(
            f"Field {i}",
            ["connection", "healing", "harmony"][i]
        )
        fields.append(field)
    
    # Integrate fields
    integrated = consciousness_component.integrate_fields(
        [field["id"] for field in fields],
        "phi_harmonic",
        "Integrated Field"
    )
    
    # Check integrated field properties
    assert integrated["name"] == "Integrated Field"
    assert integrated["type"] == "integrated"
    assert integrated["integration_type"] == "phi_harmonic"
    assert integrated["frequency"] == consciousness_component.frequency
    assert "coherence" in integrated
    assert "intention" in integrated
    assert "energy_centers" in integrated
    assert "resonance_signature" in integrated
    assert "source_fields" in integrated
    assert "connections" in integrated
    
    # Check source fields
    assert len(integrated["source_fields"]) == len(fields)
    for field in fields:
        assert field["id"] in integrated["source_fields"]
    
    # Check energy centers
    centers = integrated["energy_centers"]
    assert len(centers) > 0
    assert centers[0]["name"] == "integrated_core"
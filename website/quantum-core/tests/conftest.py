"""
Test configuration for the Quantum Core System.
"""

import sys
import os
import pytest

# Add project root to Python path to allow imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Define fixtures for system testing
@pytest.fixture
def quantum_system():
    """Return a configured Quantum System Integration instance for testing."""
    try:
        # Only import if the file exists
        import quantum_system_integration
        system = quantum_system_integration.QuantumSystemIntegration(
            config={"test_mode": True},
            coherence_level=0.95,
            mode="standalone"
        )
        return system
    except ImportError:
        pytest.skip("Quantum System Integration not available")
        
@pytest.fixture
def phi_constants():
    """Return the phi-harmonic constants for testing."""
    return {
        "PHI": 1.618033988749895,
        "LAMBDA": 0.618033988749895,
        "PHI_PHI": 1.618033988749895 ** 1.618033988749895
    }

@pytest.fixture
def sacred_frequencies():
    """Return the sacred frequencies for testing."""
    return {
        "ground": 432,    # Ground State - Foundation
        "creation": 528,  # Creation Point - Manifestation
        "heart": 594,     # Heart Field - Connection
        "voice": 672,     # Voice Flow - Expression
        "vision": 720,    # Vision Gate - Perception
        "unity": 768,     # Unity Wave - Integration
        "cosmic": 864,    # Cosmic Tone - Universal
        "source": 963     # Source State - Origin
    }
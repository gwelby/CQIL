import pytest
import os
import json

@pytest.fixture(scope="session")
def test_data():
    """Load test data for quantum patterns"""
    data_path = os.path.join(os.path.dirname(__file__), "data", "test_patterns.json")
    with open(data_path, "r") as f:
        return json.load(f)

@pytest.fixture(scope="session")
def nfl_test_data():
    """Load NFL test data"""
    data_path = os.path.join(os.path.dirname(__file__), "data", "nfl_test_data.json")
    with open(data_path, "r") as f:
        return json.load(f)

@pytest.fixture
def mock_quantum_state():
    """Create a mock quantum state for testing"""
    return {
        "energy": 1.0,
        "flow_score": 0.8,
        "stability": 0.9,
        "resonance": 432.0
    }

@pytest.fixture
def mock_nfl_game():
    """Create mock NFL game data"""
    return {
        "home_team": "GB",
        "away_team": "CHI",
        "flow_patterns": [
            {"type": "offense", "energy": 0.8},
            {"type": "defense", "energy": 0.9}
        ]
    }

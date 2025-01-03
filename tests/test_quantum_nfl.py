import unittest
import numpy as np
from examples.quantum_nfl_integration import NFLQuantumSimulator

class TestNFLQuantumSimulator(unittest.TestCase):
    """Test cases for NFL Quantum Simulator"""
    
    def setUp(self):
        """Initialize simulator for each test"""
        self.simulator = NFLQuantumSimulator()
    
    def test_play_superposition(self):
        """Test quantum play superposition creation"""
        offense_icons = ["🏈", "⚡", "💫"]
        defense_icons = ["🛡️", "💪", "✨"]
        
        superposition = self.simulator.create_play_superposition(
            offense_icons, defense_icons
        )
        
        self.assertEqual(len(superposition), 3)
        self.assertTrue(np.all(superposition >= 0))
        self.assertTrue(np.all(superposition <= 1))
    
    def test_rivalry_resonance(self):
        """Test rivalry quantum entanglement"""
        team1_state = np.array([0.8, 0.6, 0.9])
        team2_state = np.array([0.7, 0.8, 0.6])
        
        resonance = self.simulator.apply_rivalry_resonance(
            team1_state, team2_state
        )
        
        self.assertEqual(resonance.shape, (3, 3))
        self.assertTrue(np.all(resonance >= 0))
        self.assertTrue(np.all(resonance <= 1))
    
    def test_playoff_amplification(self):
        """Test playoff state amplification"""
        team_state = np.array([0.8, 0.6, 0.9])
        amplified = self.simulator.playoff_amplification(team_state)
        
        self.assertTrue(np.all(amplified > team_state))
        self.assertTrue(np.allclose(amplified / 1.5, team_state))
    
    def test_quantum_play_simulation(self):
        """Test quantum play execution"""
        power = self.simulator.simulate_quantum_play(
            ["🏈", "⚡", "💫"],  # Offense
            ["🛡️", "💪", "✨"]   # Defense
        )
        
        self.assertIsInstance(power, float)
        self.assertTrue(power > 0)
    
    def test_game_simulation(self):
        """Test full game simulation"""
        results = self.simulator.simulate_game("PACKERS", "BEARS")
        
        required_keys = [
            "rivalry_strength",
            "home_power",
            "away_power",
            "quantum_interference",
            "key_play_power"
        ]
        
        for key in required_keys:
            self.assertIn(key, results)
            self.assertIsInstance(results[key], float)
            self.assertTrue(results[key] > 0)

if __name__ == "__main__":
    unittest.main()

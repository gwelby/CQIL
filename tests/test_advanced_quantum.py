import unittest
import numpy as np
from examples.advanced_quantum_integration import (
    AdvancedNFLQuantumSimulator,
    WeatherCondition,
    QuantumPlay
)

class TestAdvancedNFLQuantumSimulator(unittest.TestCase):
    """Test cases for Advanced NFL Quantum Simulator"""
    
    def setUp(self):
        """Initialize simulator for each test"""
        self.simulator = AdvancedNFLQuantumSimulator()
        self.teams = ["PACKERS", "VIKINGS", "LIONS", "BEARS"]
        
    def test_division_entanglement(self):
        """Test division-wide quantum entanglement"""
        entanglement = self.simulator.create_division_entanglement(self.teams)
        
        self.assertEqual(entanglement.shape, (4, 4))
        self.assertTrue(np.all(entanglement >= 0))
        
        # Test coupling strength
        for i in range(4):
            self.assertTrue(0 < np.sum(entanglement[i]) < 4)
            
    def test_weather_effects(self):
        """Test weather quantum effects"""
        team_state = self.simulator.states["PACKERS"]
        
        # Test each weather condition
        for condition in WeatherCondition:
            affected = self.simulator.apply_weather_effects(
                team_state, condition
            )
            self.assertEqual(len(affected), 4)
            self.assertTrue(np.all(affected >= 0))
            
            # Verify weather impact
            if condition == WeatherCondition.SNOW:
                self.assertTrue(np.sum(affected) > np.sum(team_state))
            elif condition == WeatherCondition.RAIN:
                self.assertTrue(np.sum(affected) < np.sum(team_state))
                
    def test_momentum_superposition(self):
        """Test quantum momentum calculations"""
        plays = [
            QuantumPlay(["🏈", "⚡", "💫"], ["🛡️", "💪", "✨"], 1.2),
            QuantumPlay(["🏃‍♂️", "⚛️", "🏈"], ["🛡️", "💪", "✨"], 0.8)
        ]
        
        momentum = self.simulator.calculate_momentum_superposition(plays)
        self.assertEqual(len(momentum), 4)
        self.assertTrue(np.all(momentum >= 0))
        self.assertTrue(np.all(momentum <= 1))
        
    def test_quantum_formation(self):
        """Test quantum formation superposition"""
        offense_state = self.simulator.states["PACKERS"]
        formation = self.simulator.create_quantum_formation(
            offense_state, 1.0
        )
        
        self.assertEqual(len(formation), 4)
        self.assertTrue(np.all(formation >= 0))
        self.assertTrue(np.all(formation <= 2))  # Max interference
        
    def test_historical_resonance(self):
        """Test historical matchup effects"""
        team1 = self.simulator.states["PACKERS"]
        team2 = self.simulator.states["BEARS"]
        
        resonance = self.simulator.apply_historical_resonance(
            team1, team2
        )
        
        self.assertEqual(resonance.shape, (4, 4))
        self.assertTrue(np.all(resonance >= 0))
        self.assertTrue(np.all(resonance <= 1))
        
    def test_playoff_wave(self):
        """Test playoff probability wave"""
        team_state = self.simulator.states["PACKERS"]
        
        # Test early season
        early_wave = self.simulator.calculate_playoff_wave(team_state, 1)
        self.assertEqual(len(early_wave), 4)
        self.assertTrue(np.sum(early_wave) > 0)
        
        # Test late season
        late_wave = self.simulator.calculate_playoff_wave(team_state, 16)
        self.assertTrue(np.sum(late_wave) < np.sum(early_wave))
        
    def test_advanced_game_simulation(self):
        """Test advanced game simulation"""
        game = self.simulator.simulate_advanced_game(
            "PACKERS", "VIKINGS", WeatherCondition.SNOW
        )
        
        required_keys = [
            "home_power",
            "away_power",
            "weather_impact",
            "rivalry_strength",
            "final_score_projection"
        ]
        
        for key in required_keys:
            self.assertIn(key, game)
            self.assertIsInstance(game[key], float)
            self.assertTrue(game[key] >= 0)
            
    def test_season_path(self):
        """Test quantum season path"""
        path = self.simulator.calculate_season_path("PACKERS")
        
        self.assertEqual(len(path), 17)  # 17-week season
        self.assertTrue(all(isinstance(x, float) for x in path))
        self.assertTrue(all(x >= 0 for x in path))
        
        # Test declining probability trend
        self.assertTrue(path[0] > path[-1])

if __name__ == "__main__":
    unittest.main()

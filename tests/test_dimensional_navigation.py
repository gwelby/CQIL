import unittest
import json
import numpy as np
import sys
import os

# Add the parent directory to sys.path to import the module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import visualization modules
from documentation.doc_tools.quantum_visualizer import CymaticVisualizationEngine
from quantum_navigation.dimensional_navigator import QuantumDimensionalNavigator, ConsciousnessNavigationInterface

class TestQuantumDimensionalNavigator(unittest.TestCase):
    """
    Test cases for the Quantum Dimensional Navigator
    Operating at Vision Gate frequency (720 Hz) with perfect coherence (1.000)
    """
    
    def setUp(self):
        """Initialize navigator for each test"""
        self.navigator = QuantumDimensionalNavigator()
        self.interface = ConsciousnessNavigationInterface(self.navigator)
        self.test_dimensions = [3, 4, 5, 7, 8, 9, 12]
        
    def test_initialization(self):
        """Test proper initialization of the navigation system"""
        # Check identity
        self.assertEqual(self.navigator.identity, "Φ^Φ⦿CASCADE⚡𓂧φ∞⦿MULTIDIMENSIONAL")
        self.assertEqual(self.navigator.version, "φ^φ")
        
        # Check coherence threshold
        self.assertEqual(self.navigator.coherenceThreshold, 1.0)
        
        # Check starting dimension
        self.assertEqual(self.navigator.currentDimension, 3)
        
        # Check gate initialization
        self.assertIn("3-4", self.navigator.gates)
        self.assertEqual(self.navigator.gates["3-4"]["frequency"], 528)
        self.assertEqual(self.navigator.gates["3-4"]["pattern"], "STAR_TETRAHEDRON")
        
    def test_zen_point_creation(self):
        """Test ZEN POINT creation as navigation foundation"""
        zen_point = self.navigator.zenPoint
        
        self.assertEqual(zen_point["frequency"], 432)
        self.assertEqual(zen_point["dimension"], 3)
        self.assertEqual(zen_point["coherence"], 1.0)
        self.assertEqual(zen_point["pattern"], "HEXAGONAL")
        self.assertTrue(zen_point["stabilityField"])
        self.assertTrue(zen_point["returnPoint"])
        
    def test_dimensional_gates(self):
        """Test proper creation of dimensional gates"""
        gates = self.navigator.dimensionalGates
        
        # Check all required gates exist
        required_gates = ["3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-12"]
        for gate_key in required_gates:
            self.assertIn(gate_key, gates)
            
        # Test specific gate properties
        test_gate = gates["3-4"]
        self.assertEqual(test_gate["fromDimension"], 3)
        self.assertEqual(test_gate["toDimension"], 4)
        self.assertEqual(test_gate["frequency"], 528)
        self.assertEqual(test_gate["pattern"], "STAR_TETRAHEDRON")
        self.assertEqual(test_gate["coherence"], 1.0)
        self.assertFalse(test_gate["active"])
        self.assertTrue(test_gate["phiResonance"])
        
    def test_quantum_tunnels(self):
        """Test quantum tunnels between dimensions"""
        tunnels = self.navigator.quantumTunnels
        
        # Check tunnel for each gate
        for gate_key in self.navigator.dimensionalGates:
            self.assertIn(gate_key, tunnels)
            
        # Test specific tunnel properties
        test_tunnel = tunnels["3-4"]
        self.assertEqual(test_tunnel["fromDimension"], 3)
        self.assertEqual(test_tunnel["toDimension"], 4)
        self.assertEqual(test_tunnel["frequency"], 528)
        self.assertEqual(test_tunnel["curvature"], "PHI_HARMONIC")
        self.assertTrue(test_tunnel["stabilityField"]["enabled"])
        
    def test_navigation_to_higher_dimension(self):
        """Test navigation to higher dimension"""
        # Navigate from 3D to 5D
        result = self.navigator.navigateToDimension(5)
        
        # Check navigation success
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 5)
        self.assertEqual(self.navigator.targetDimension, 5)
        self.assertFalse(self.navigator.navigationInProgress)
        
        # Check coherence maintained
        self.assertEqual(self.navigator.measureCoherence(), 1.0)
        
    def test_navigation_to_lower_dimension(self):
        """Test navigation to lower dimension"""
        # First navigate to higher dimension
        self.navigator.navigateToDimension(7)
        
        # Then navigate back to 3D
        result = self.navigator.navigateToDimension(3)
        
        # Check navigation success
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 3)
        self.assertEqual(self.navigator.targetDimension, 3)
        self.assertFalse(self.navigator.navigationInProgress)
        
        # Check coherence maintained
        self.assertEqual(self.navigator.measureCoherence(), 1.0)
        
    def test_navigation_methods(self):
        """Test different navigation methods"""
        # Test QUANTUM_TUNNEL method
        result1 = self.navigator.navigateToDimension(4, {"method": "QUANTUM_TUNNEL"})
        self.assertTrue(result1)
        self.assertEqual(self.navigator.currentDimension, 4)
        
        # Test DIMENSIONAL_SHIFT method
        result2 = self.navigator.navigateToDimension(5, {"method": "DIMENSIONAL_SHIFT"})
        self.assertTrue(result2)
        self.assertEqual(self.navigator.currentDimension, 5)
        
        # Test CONSCIOUSNESS_PROJECTION method
        result3 = self.navigator.navigateToDimension(7, {"method": "CONSCIOUSNESS_PROJECTION"})
        self.assertTrue(result3)
        self.assertEqual(self.navigator.currentDimension, 7)
        
    def test_navigation_path_calculation(self):
        """Test calculation of optimal navigation path"""
        # Test direct path (3D to 4D)
        path1 = self.navigator.calculateNavigationPath(3, 4)
        self.assertEqual(path1, [3, 4])
        
        # Test multi-step path (3D to 7D)
        path2 = self.navigator.calculateNavigationPath(3, 7)
        self.assertEqual(path2, [3, 4, 5, 6, 7])
        
        # Test complex path (5D to 12D)
        path3 = self.navigator.calculateNavigationPath(5, 12)
        self.assertEqual(path3, [5, 6, 7, 8, 9, 12])
        
        # Test reverse path (9D to 4D)
        path4 = self.navigator.calculateNavigationPath(9, 4)
        self.assertEqual(path4, [9, 8, 7, 6, 5, 4])
        
    def test_dimensional_state(self):
        """Test getting dimensional state"""
        # Navigate to 5D
        self.navigator.navigateToDimension(5)
        
        # Get state
        state = self.navigator.getDimensionalState()
        
        # Check state properties
        self.assertEqual(state["currentDimension"], 5)
        self.assertEqual(state["targetDimension"], 5)
        self.assertFalse(state["navigationInProgress"])
        self.assertEqual(state["coherence"], 1.0)
        self.assertEqual(len(state["activeGates"]), 0)
        
    def test_invalid_dimension(self):
        """Test navigation to invalid dimension"""
        # Try to navigate to invalid dimension (2D)
        result = self.navigator.navigateToDimension(2)
        
        # Should fail
        self.assertFalse(result)
        self.assertEqual(self.navigator.currentDimension, 3)  # Should remain at 3D
        
        # Try to navigate to invalid dimension (13D)
        result = self.navigator.navigateToDimension(13)
        
        # Should fail
        self.assertFalse(result)


class TestConsciousnessNavigationInterface(unittest.TestCase):
    """
    Test cases for the ConsciousnessNavigationInterface
    Operating at Heart frequency (594 Hz) with perfect coherence (1.000)
    """
    
    def setUp(self):
        """Initialize interface for each test"""
        self.navigator = QuantumDimensionalNavigator()
        self.interface = ConsciousnessNavigationInterface(self.navigator)
        
    def test_initialization(self):
        """Test proper initialization of the consciousness interface"""
        # Check frequency
        self.assertEqual(self.interface.frequency, 594)
        
        # Check coherence
        self.assertEqual(self.interface.coherence, 1.0)
        
        # Check intention mapping
        self.assertIn("up", self.interface.intentionMapping)
        self.assertIn("down", self.interface.intentionMapping)
        self.assertIn("expand", self.interface.intentionMapping)
        self.assertIn("contract", self.interface.intentionMapping)
        self.assertIn("center", self.interface.intentionMapping)
        
        # Check intention field
        self.assertTrue(self.interface.intentionField["active"])
        self.assertEqual(self.interface.intentionField["frequency"], 594)
        self.assertEqual(self.interface.intentionField["coherence"], 1.0)
        
    def test_process_up_intention(self):
        """Test processing UP intention"""
        # Process "up" intention
        result = self.interface.processIntention({
            "type": "up", 
            "strength": 1.0,
            "quality": "quantum_tunnel"
        })
        
        # Should navigate up one dimension (3D to 4D)
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 4)
        
    def test_process_down_intention(self):
        """Test processing DOWN intention"""
        # First navigate up
        self.navigator.navigateToDimension(5)
        
        # Process "down" intention
        result = self.interface.processIntention({
            "type": "down", 
            "strength": 1.0,
            "quality": "quantum_tunnel"
        })
        
        # Should navigate down one dimension (5D to 4D)
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 4)
        
    def test_process_expand_intention(self):
        """Test processing EXPAND intention"""
        # Process "expand" intention
        result = self.interface.processIntention({
            "type": "expand", 
            "strength": 1.0,
            "quality": "dimensional_shift"
        })
        
        # Should navigate up by phi (approximately 1.618, rounded to 2)
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 5)
        
    def test_process_contract_intention(self):
        """Test processing CONTRACT intention"""
        # First navigate up
        self.navigator.navigateToDimension(7)
        
        # Process "contract" intention
        result = self.interface.processIntention({
            "type": "contract", 
            "strength": 1.0,
            "quality": "dimensional_shift"
        })
        
        # Should navigate down by phi (approximately 1.618, rounded to 2)
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 5)
        
    def test_process_center_intention(self):
        """Test processing CENTER intention"""
        # First navigate up
        self.navigator.navigateToDimension(7)
        
        # Process "center" intention
        result = self.interface.processIntention({
            "type": "center", 
            "strength": 1.0,
            "quality": "consciousness_projection"
        })
        
        # Should return to 3D (ZEN POINT)
        self.assertTrue(result)
        self.assertEqual(self.navigator.currentDimension, 3)
        
    def test_intention_strength_effect(self):
        """Test effect of intention strength on navigation"""
        # Process weak intention
        self.navigator.navigateToDimension(3)  # Reset to 3D
        result1 = self.interface.processIntention({
            "type": "up", 
            "strength": 0.5,  # Weak intention
            "quality": "quantum_tunnel"
        })
        
        # Should still navigate up one dimension due to strength rounding
        self.assertTrue(result1)
        self.assertEqual(self.navigator.currentDimension, 4)
        
        # Process strong expand intention
        self.navigator.navigateToDimension(3)  # Reset to 3D
        result2 = self.interface.processIntention({
            "type": "expand", 
            "strength": 1.0,  # Strong intention
            "quality": "quantum_tunnel"
        })
        
        # Should navigate up by phi (rounded to 2)
        self.assertTrue(result2)
        self.assertEqual(self.navigator.currentDimension, 5)
        
    def test_visualization_state(self):
        """Test visualization of dimensional state"""
        # Navigate to 5D
        self.navigator.navigateToDimension(5)
        
        # Get visualization state
        state = self.interface.visualizeState()
        
        # Check state properties
        self.assertEqual(state["type"], "DIMENSIONAL_STATE")
        self.assertEqual(state["currentDimension"], 5)
        self.assertEqual(state["pattern"], "TOROIDAL_VORTEX")
        self.assertEqual(state["frequency"], 594)
        self.assertEqual(state["coherence"], 1.0)
        
        # Check color for 5D
        self.assertEqual(state["color"]["r"], 255)
        self.assertEqual(state["color"]["g"], 215)
        self.assertEqual(state["color"]["b"], 0)
        
    def test_pattern_mapping(self):
        """Test mapping dimensions to patterns"""
        patterns = {
            3: "HEXAGONAL",
            4: "STAR_TETRAHEDRON",
            5: "TOROIDAL_VORTEX",
            6: "STANDING_WAVE",
            7: "TESSERACT",
            8: "PERFECT_TORUS",
            9: "FLOWER_OF_LIFE",
            12: "METATRONS_CUBE"
        }
        
        # Test pattern for each dimension
        for dim, pattern in patterns.items():
            self.assertEqual(self.interface.getPatternForDimension(dim), pattern)
            
    def test_frequency_mapping(self):
        """Test mapping dimensions to frequencies"""
        frequencies = {
            3: 432,
            4: 528,
            5: 594,
            6: 672,
            7: 720,
            8: 768,
            9: 963,
            12: 1008
        }
        
        # Test frequency for each dimension
        for dim, freq in frequencies.items():
            self.assertEqual(self.interface.getFrequencyForDimension(dim), freq)
            
    def test_intention_quality_effect(self):
        """Test effect of intention quality on navigation method"""
        # Process projection intention
        self.navigator.navigateToDimension(3)  # Reset to 3D
        result1 = self.interface.processIntention({
            "type": "up", 
            "strength": 1.0,
            "quality": "projection"
        })
        
        # Method should be CONSCIOUSNESS_PROJECTION
        self.assertTrue(result1)
        
        # Process shift intention
        self.navigator.navigateToDimension(3)  # Reset to 3D
        result2 = self.interface.processIntention({
            "type": "up", 
            "strength": 1.0,
            "quality": "shift"
        })
        
        # Method should be DIMENSIONAL_SHIFT
        self.assertTrue(result2)


if __name__ == "__main__":
    unittest.main()

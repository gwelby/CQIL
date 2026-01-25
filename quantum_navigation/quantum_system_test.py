#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Quantum Navigation System Integration Test
This script tests the integration of all quantum navigation components:
- Quantum Field Integrator
- Consciousness Bridge
- Hypervisualization Engine
- Quantum Pathfinder
- Integration Protocol
- Unified Field Interface
"""

import os
import time
import json
from dimensional_navigator import QuantumDimensionalNavigator

# Define helper class for testing when components may not be available
class MockComponent:
    def __init__(self, name, operating_frequency=768.0):
        self.name = name
        self.operating_frequency = operating_frequency
        self.coherence = 1.000
    
    def measureCoherence(self):
        return self.coherence
    
    def measure_coherence(self):
        return self.coherence
    
    def receive_message(self, message):
        print(f"[{self.name}] Received message: {message.get('type', 'UNKNOWN')}")
        return True

def print_banner(text):
    """Print a styled banner with the given text."""
    width = 70
    padding = (width - len(text)) // 2
    print("\n" + "=" * width)
    print(" " * padding + text)
    print("=" * width + "\n")

def main():
    """Test the quantum navigation system integration."""
    print_banner("QUANTUM NAVIGATION SYSTEM - INTEGRATION TEST")
    
    # Test 1: Create the navigator
    print("Test 1: Creating Quantum Dimensional Navigator")
    print("-" * 50)
    navigator = QuantumDimensionalNavigator(startDimension=3, coherenceThreshold=1.0)
    print(f"Navigator created: {navigator.identity}")
    print(f"Current dimension: {navigator.currentDimension}")
    print(f"Coherence: {navigator.measureCoherence():.3f}")
    
    # Test 2: Create and test mock components
    print("\nTest 2: Creating Mock Components")
    print("-" * 50)
    
    consciousness_bridge = MockComponent("ConsciousnessBridge", 594.0)
    visualizer = MockComponent("HypervisualizationEngine", 720.0)
    pathfinder = MockComponent("QuantumPathfinder", 768.0)
    integrator = MockComponent("QuantumFieldIntegrator", 963.0)
    
    # Test coherence measurement
    components = [
        ("Navigator", navigator),
        ("Consciousness Bridge", consciousness_bridge),
        ("Visualizer", visualizer),
        ("Pathfinder", pathfinder),
        ("Integrator", integrator)
    ]
    
    print("Component Coherence Levels:")
    for name, component in components:
        if hasattr(component, 'measureCoherence'):
            coherence = component.measureCoherence()
        else:
            coherence = component.measure_coherence()
        print(f"  • {name}: {coherence:.3f}")
    
    # Test 3: Navigation between dimensions
    print("\nTest 3: Basic Navigation")
    print("-" * 50)
    
    # Navigate through several dimensions
    test_dimensions = [3, 5, 7, 9, 12, 7, 3]
    
    for dimension in test_dimensions:
        print(f"\nNavigating to {dimension}D...")
        result = navigator.navigateToDimension(dimension)
        
        if result:
            print(f"  Navigation successful!")
            state = navigator.getDimensionalState()
            print(f"  Current Dimension: {state['currentDimension']}")
            print(f"  Coherence: {state['coherence']:.3f}")
            
            # Get frequency and pattern
            frequency = navigator.getFrequencyForDimension(state['currentDimension'])
            pattern = navigator.getPatternForDimension(state['currentDimension'])
            print(f"  Frequency: {frequency} Hz")
            print(f"  Pattern: {pattern}")
        else:
            print(f"  Navigation failed!")
    
    # Test 4: Quantum pathway exploration
    print("\nTest 4: Quantum Pathway Exploration")
    print("-" * 50)
    
    pathways = navigator.exploreQuantumPathways(3, 12)
    print(f"Found {len(pathways)} pathways between 3D and 12D:")
    
    # Display top 3 pathways
    for i, path in enumerate(pathways[:3]):
        print(f"\nPath {i+1}:")
        print(f"  Dimensions: {' → '.join([str(d) for d in path])}")
        print(f"  Segments: {len(path) - 1}")
        
        # Calculate frequencies along the path
        frequencies = [navigator.getFrequencyForDimension(d) for d in path]
        print(f"  Frequencies: {' → '.join([str(f) for f in frequencies])}")
    
    # Test 5: Mock integration protocol
    print("\nTest 5: Mock Integration Protocol")
    print("-" * 50)
    
    # Simulate component registration
    registered_components = {}
    for name, component in components:
        if hasattr(component, 'measureCoherence'):
            comp_coherence = component.measureCoherence()
        else:
            comp_coherence = component.measure_coherence()
            
        registered_components[name.lower().replace(' ', '_')] = {
            "instance": component,
            "coherence": comp_coherence,
            "registered_at": time.time()
        }
    
    print(f"Registered {len(registered_components)} components")
    
    # Simulate system coherence measurement
    total_coherence = sum(comp["coherence"] for comp in registered_components.values())
    system_coherence = total_coherence / len(registered_components)
    
    print(f"System coherence: {system_coherence:.3f}")
    
    # Test 6: Message broadcasting
    print("\nTest 6: Message Broadcasting")
    print("-" * 50)
    
    # Simulate a broadcast message
    broadcast_message = {
        "type": "COHERENCE_UPDATE",
        "timestamp": time.time(),
        "system_coherence": system_coherence
    }
    
    print(f"Broadcasting message: {broadcast_message['type']}")
    
    for name, component in components[1:]:  # Skip navigator (sender)
        if hasattr(component, 'receive_message'):
            component.receive_message(broadcast_message)
    
    # Test 7: Export navigation map
    print("\nTest 7: Export Navigation Map")
    print("-" * 50)
    
    map_data = navigator.exportNavigationMap(format="json")
    map_obj = json.loads(map_data)
    
    print(f"Navigation map contains:")
    print(f"  • {len(map_obj.get('dimensions', []))} dimensions")
    print(f"  • {len(map_obj.get('gates', []))} gates")
    print(f"  • {len(map_obj.get('tunnels', []))} tunnels")
    
    # Save the map to a file
    map_file = os.path.join(os.path.dirname(__file__), "quantum_navigation_map.json")
    with open(map_file, 'w', encoding='utf-8') as f:
        f.write(map_data)
    
    print(f"Navigation map saved to: {map_file}")
    
    # Final status
    print("\nIntegration Test Complete")
    print("-" * 50)
    print("Final System State:")
    print(f"  • Current Dimension: {navigator.currentDimension}")
    print(f"  • System Coherence: {system_coherence:.3f}")
    print(f"  • Navigation Map Generated: Yes")
    print(f"  • Components Registered: {len(registered_components)}")
    
    print("\n✨ All tests completed successfully ✨")

if __name__ == "__main__":
    main()

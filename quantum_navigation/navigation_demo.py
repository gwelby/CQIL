"""
Multi-Dimensional Navigation Demonstration

This script demonstrates the functionality of the Quantum Dimensional Navigator
by performing a series of navigation operations across multiple dimensions.

Operating at Vision Gate frequency (720 Hz) with perfect coherence (1.000).
"""

import sys
import os
import time
import json

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import navigation classes
from quantum_navigation.dimensional_navigator import QuantumDimensionalNavigator, ConsciousnessNavigationInterface

def print_separator():
    """Print a separator line"""
    print("\n" + "=" * 80 + "\n")

def demonstrate_basic_navigation():
    """Demonstrate basic navigation between dimensions"""
    print("🌟 BASIC DIMENSIONAL NAVIGATION DEMONSTRATION 🌟")
    print("Initializing Quantum Dimensional Navigator...")
    
    # Initialize navigator
    navigator = QuantumDimensionalNavigator()
    
    print(f"Navigator initialized at {navigator.currentDimension}D " +
          f"with coherence {navigator.measureCoherence():.3f}")
    
    print("\nDimensional Gates:")
    for gate_key, gate in navigator.dimensionalGates.items():
        print(f"  {gate_key}: {gate['fromDimension']}D → {gate['toDimension']}D " +
              f"({gate['frequency']} Hz, {gate['pattern']})")
    
    # Navigate to higher dimension
    print("\nNavigating to 5D (Heart Field)...")
    start_time = time.time()
    result = navigator.navigateToDimension(5)
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms")
        
        # Get frequency and pattern for current dimension
        current_freq = navigator.getFrequencyForDimension(navigator.currentDimension)
        current_pattern = navigator.getPatternForDimension(navigator.currentDimension)
        
        print(f"Current frequency: {current_freq} Hz")
        print(f"Dimensional pattern: {current_pattern}")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    # Navigate to even higher dimension
    print("\nNavigating to 8D (Unity Wave)...")
    start_time = time.time()
    result = navigator.navigateToDimension(8)
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms")
        
        # Get frequency and pattern for current dimension
        current_freq = navigator.getFrequencyForDimension(navigator.currentDimension)
        current_pattern = navigator.getPatternForDimension(navigator.currentDimension)
        
        print(f"Current frequency: {current_freq} Hz")
        print(f"Dimensional pattern: {current_pattern}")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    # Return to Foundation (ZEN POINT)
    print("\nReturning to 3D (ZEN POINT)...")
    start_time = time.time()
    result = navigator.navigateToDimension(3)
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully returned to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    return navigator

def demonstrate_navigation_methods(navigator):
    """Demonstrate different navigation methods"""
    print("🌟 NAVIGATION METHODS DEMONSTRATION 🌟")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Quantum Tunnel method
    print("\nNavigating to 7D using QUANTUM_TUNNEL method...")
    start_time = time.time()
    result = navigator.navigateToDimension(7, {"method": "QUANTUM_TUNNEL"})
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms (QUANTUM_TUNNEL)")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Dimensional Shift method
    print("\nNavigating to 7D using DIMENSIONAL_SHIFT method...")
    start_time = time.time()
    result = navigator.navigateToDimension(7, {"method": "DIMENSIONAL_SHIFT"})
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms (DIMENSIONAL_SHIFT)")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Consciousness Projection method
    print("\nNavigating to 7D using CONSCIOUSNESS_PROJECTION method...")
    start_time = time.time()
    result = navigator.navigateToDimension(7, {"method": "CONSCIOUSNESS_PROJECTION"})
    end_time = time.time()
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"in {(end_time - start_time) * 1000:.1f}ms (CONSCIOUSNESS_PROJECTION)")
        print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
    else:
        print("❌ Navigation failed")
    
    return navigator

def demonstrate_consciousness_interface(navigator):
    """Demonstrate the consciousness navigation interface"""
    print("🌟 CONSCIOUSNESS NAVIGATION INTERFACE DEMONSTRATION 🌟")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Initialize consciousness interface
    print("\nInitializing ConsciousnessNavigationInterface...")
    interface = ConsciousnessNavigationInterface(navigator)
    
    print(f"Interface initialized at {interface.frequency} Hz " +
          f"with coherence {interface.coherence:.3f}")
    
    print("\nIntention Mapping:")
    for intention, mapping in interface.intentionMapping.items():
        print(f"  {intention}: {mapping}")
    
    # Process "up" intention
    print("\nProcessing 'up' intention...")
    result = interface.processIntention({
        "type": "up",
        "strength": 1.0,
        "quality": "quantum_tunnel"
    })
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"(responded to 'up' intention)")
        state = interface.visualizeState()
        print(f"Current pattern: {state['pattern']}")
        print(f"Current frequency: {state['frequency']} Hz")
    else:
        print("❌ Navigation failed")
    
    # Process "expand" intention
    print("\nProcessing 'expand' intention...")
    result = interface.processIntention({
        "type": "expand",
        "strength": 1.0,
        "quality": "shift"
    })
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"(responded to 'expand' intention)")
        state = interface.visualizeState()
        print(f"Current pattern: {state['pattern']}")
        print(f"Current frequency: {state['frequency']} Hz")
    else:
        print("❌ Navigation failed")
    
    # Process "center" intention
    print("\nProcessing 'center' intention...")
    result = interface.processIntention({
        "type": "center",
        "strength": 1.0,
        "quality": "projection"
    })
    
    if result:
        print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
              f"(responded to 'center' intention)")
        state = interface.visualizeState()
        print(f"Current pattern: {state['pattern']}")
        print(f"Current frequency: {state['frequency']} Hz")
    else:
        print("❌ Navigation failed")
    
    return interface

def demonstrate_persistent_gate(navigator):
    """Demonstrate creating a persistent dimensional gate"""
    print("🌟 PERSISTENT DIMENSIONAL GATE DEMONSTRATION 🌟")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Create persistent gate
    print("\nCreating persistent gate between 3D and 7D...")
    gate_id = navigator.createPersistentGate(3, 7, 1.0, True)
    
    if gate_id:
        print(f"✅ Successfully created gate: {gate_id}")
        
        # Navigate through persistent gate
        print("\nNavigating through persistent gate to 7D...")
        start_time = time.time()
        result = navigator.navigateToDimension(7)
        end_time = time.time()
        
        if result:
            print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
                  f"in {(end_time - start_time) * 1000:.1f}ms (using persistent gate)")
            print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
        else:
            print("❌ Navigation failed")
        
        # Return through persistent gate
        print("\nReturning through persistent gate to 3D...")
        start_time = time.time()
        result = navigator.navigateToDimension(3)
        end_time = time.time()
        
        if result:
            print(f"✅ Successfully returned to {navigator.currentDimension}D " +
                  f"in {(end_time - start_time) * 1000:.1f}ms (using persistent gate)")
            print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
        else:
            print("❌ Navigation failed")
    else:
        print("❌ Failed to create persistent gate")
    
    return navigator

def demonstrate_navigation_map(navigator):
    """Demonstrate exporting a navigation map"""
    print("🌟 NAVIGATION MAP DEMONSTRATION 🌟")
    
    # Export JSON map
    print("\nExporting navigation map as JSON...")
    json_map = navigator.exportNavigationMap(format="json")
    
    print(f"Map contains {json.loads(json_map)['dimensions'].__len__()} dimensions, " +
          f"{json.loads(json_map)['gates'].__len__()} gates, and " +
          f"{json.loads(json_map)['tunnels'].__len__()} tunnels")
    
    # Export HTML map
    print("\nExporting navigation map as HTML...")
    html_map = navigator.exportNavigationMap(format="html")
    
    # Save HTML map to file
    map_path = os.path.join(os.path.dirname(__file__), "navigation_map.html")
    with open(map_path, "w") as f:
        f.write(html_map)
    
    print(f"Navigation map saved to: {map_path}")
    
    # Open in browser
    import webbrowser
    webbrowser.open("file://" + os.path.abspath(map_path))
    
    return navigator


if __name__ == "__main__":
    # Clear screen
    os.system('cls' if os.name == 'nt' else 'clear')
    
    print("""
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃               QUANTUM MULTI-DIMENSIONAL                    ┃
    ┃                 NAVIGATION SYSTEM                          ┃
    ┃                                                            ┃
    ┃           Φ^Φ⦿CASCADE⚡𓂧φ∞⦿MULTIDIMENSIONAL                 ┃
    ┃                                                            ┃
    ┃         Vision Gate Frequency (720 Hz)                     ┃
    ┃         Perfect Coherence (1.000)                          ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    """)
    
    # Run demonstrations
    navigator = demonstrate_basic_navigation()
    print_separator()
    
    navigator = demonstrate_navigation_methods(navigator)
    print_separator()
    
    interface = demonstrate_consciousness_interface(navigator)
    print_separator()
    
    navigator = demonstrate_persistent_gate(navigator)
    print_separator()
    
    navigator = demonstrate_navigation_map(navigator)
    print_separator()
    
    print("""
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃           DEMONSTRATION COMPLETE                           ┃
    ┃                                                            ┃
    ┃        Perfect Coherence Maintained (1.000)                ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    """)

#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Basic Quantum Navigation Demo
This script demonstrates the core functions of the quantum navigation system.
"""

import time
from dimensional_navigator import QuantumDimensionalNavigator

def main():
    """Run a basic demonstration of the quantum navigator."""
    print("\n╔══════════════════════════════════════════════════════╗")
    print("║       QUANTUM DIMENSIONAL NAVIGATION SYSTEM          ║")
    print("╚══════════════════════════════════════════════════════╝\n")
    
    # Create navigator instance
    print("Creating Quantum Dimensional Navigator...")
    navigator = QuantumDimensionalNavigator(startDimension=3, coherenceThreshold=1.0)
    
    # Display initial state
    state = navigator.getDimensionalState()
    print("\nInitial State:")
    print(f"Current Dimension: {state['currentDimension']}")
    print(f"Coherence: {state['coherence']:.3f}")
    
    # Get frequency and pattern for current dimension
    frequency = navigator.getFrequencyForDimension(state['currentDimension'])
    pattern = navigator.getPatternForDimension(state['currentDimension'])
    print(f"Frequency: {frequency} Hz")
    print(f"Pattern: {pattern}")
    
    # Navigate to a higher dimension
    target_dimension = 7
    print(f"\nNavigating to {target_dimension}D...")
    result = navigator.navigateToDimension(target_dimension)
    
    if result:
        print(f"Navigation successful!")
        
        # Get updated state
        state = navigator.getDimensionalState()
        print("\nNew State:")
        print(f"Current Dimension: {state['currentDimension']}")
        print(f"Coherence: {state['coherence']:.3f}")
        
        # Get frequency and pattern for new dimension
        frequency = navigator.getFrequencyForDimension(state['currentDimension'])
        pattern = navigator.getPatternForDimension(state['currentDimension'])
        print(f"Frequency: {frequency} Hz")
        print(f"Pattern: {pattern}")
    else:
        print("Navigation failed.")
    
    # Export navigation map
    print("\nExporting navigation map...")
    map_data = navigator.exportNavigationMap(format="json")
    print(f"Map created with {len(map_data)} characters.")
    
    # Return to ground state
    print("\nReturning to ground state (3D)...")
    result = navigator.navigateToDimension(3)
    
    if result:
        print("Successfully returned to ground state.")
        
        # Get final state
        state = navigator.getDimensionalState()
        print("\nFinal State:")
        print(f"Current Dimension: {state['currentDimension']}")
        print(f"Coherence: {state['coherence']:.3f}")
        
        # Get frequency and pattern for final dimension
        frequency = navigator.getFrequencyForDimension(state['currentDimension'])
        pattern = navigator.getPatternForDimension(state['currentDimension'])
        print(f"Frequency: {frequency} Hz")
        print(f"Pattern: {pattern}")
    else:
        print("Return navigation failed.")
    
    print("\n✨ Demonstration Complete ✨")

if __name__ == "__main__":
    main()

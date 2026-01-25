"""
Advanced Multi-Dimensional Navigation Demonstration

This script demonstrates the advanced features of the Quantum Dimensional Navigator
including quantum shortcuts, pathway exploration, and interactive visualization.

Operating at Unity frequency (768 Hz) with perfect coherence (1.000).
"""

import sys
import os
import time
import webbrowser
import json

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import navigation classes
from quantum_navigation.dimensional_navigator import QuantumDimensionalNavigator

def print_separator():
    """Print a separator line"""
    print("\n" + "=" * 80 + "\n")

def demonstrate_quantum_shortcuts():
    """Demonstrate the quantum shortcut feature"""
    print("🌟 QUANTUM SHORTCUTS DEMONSTRATION 🌟")
    print("Initializing Quantum Dimensional Navigator...")
    
    # Initialize navigator
    navigator = QuantumDimensionalNavigator()
    
    print(f"Navigator initialized at {navigator.currentDimension}D " +
          f"with coherence {navigator.measureCoherence():.3f}")
    
    # Create a quantum shortcut
    print("\nCreating quantum shortcut from 3D to 7D (ZEN POINT to Vision Gate)...")
    shortcut_id = navigator.createQuantumShortcut(3, 7, 0.9)
    
    if shortcut_id:
        print(f"✅ Successfully created quantum shortcut: {shortcut_id}")
        
        # Navigate using the shortcut
        print("\nNavigating via quantum shortcut...")
        start_time = time.time()
        result = navigator.navigateViaShortcut(shortcut_id)
        end_time = time.time()
        
        if result:
            print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
                  f"in {(end_time - start_time) * 1000:.1f}ms (via quantum shortcut)")
            print(f"Current frequency: {navigator.getFrequencyForDimension(navigator.currentDimension)} Hz")
            print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
        else:
            print("❌ Navigation failed")
            
        # Return to 3D for next demonstration
        navigator.navigateToDimension(3)
    else:
        print("❌ Failed to create quantum shortcut")
    
    # Create an unstable quantum shortcut
    print("\nCreating unstable quantum shortcut from 3D to 9D (ZEN POINT to Source Field)...")
    unstable_shortcut_id = navigator.createQuantumShortcut(3, 9, 0.5)
    
    if unstable_shortcut_id:
        print(f"✅ Successfully created unstable quantum shortcut: {unstable_shortcut_id}")
        
        # Try to navigate through unstable shortcut (multiple attempts)
        success = False
        attempts = 0
        max_attempts = 5
        
        print(f"\nAttempting to navigate through unstable shortcut (up to {max_attempts} attempts)...")
        
        while not success and attempts < max_attempts:
            attempts += 1
            start_time = time.time()
            success = navigator.navigateViaShortcut(unstable_shortcut_id)
            end_time = time.time()
            
            if success:
                print(f"✅ Successfully navigated to {navigator.currentDimension}D " +
                      f"in {(end_time - start_time) * 1000:.1f}ms (via unstable shortcut)")
                print(f"Attempts required: {attempts}")
                print(f"Current frequency: {navigator.getFrequencyForDimension(navigator.currentDimension)} Hz")
                print(f"Coherence maintained at: {navigator.measureCoherence():.3f}")
            else:
                print(f"❌ Attempt {attempts} failed - quantum instability detected")
        
        if not success:
            print(f"❌ Failed to navigate after {max_attempts} attempts")
    else:
        print("❌ Failed to create unstable quantum shortcut")
    
    return navigator

def demonstrate_quantum_pathways(navigator):
    """Demonstrate quantum pathway exploration"""
    print("🌟 QUANTUM PATHWAY EXPLORATION 🌟")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Explore pathways from 3D to 7D
    print("\nExploring all quantum pathways from 3D to 7D...")
    paths = navigator.exploreQuantumPathways(3, 7)
    
    print(f"Found {len(paths)} possible pathways:")
    for i, path in enumerate(paths):
        print(f"  Pathway {i+1}: {' → '.join(path)}")
        
        # Calculate total frequency
        total_freq = 0
        for gate_key in path:
            if gate_key in navigator.dimensionalGates:
                total_freq += navigator.dimensionalGates[gate_key]["frequency"]
                
        path_length = len(path)
        print(f"    Length: {path_length} gates")
        print(f"    Total frequency: {total_freq} Hz")
        print(f"    Average frequency: {total_freq/path_length:.1f} Hz")
    
    # Explore pathways from 3D to 12D
    print("\nExploring all quantum pathways from 3D to 12D...")
    paths = navigator.exploreQuantumPathways(3, 12)
    
    print(f"Found {len(paths)} possible pathways:")
    for i, path in enumerate(paths):
        print(f"  Pathway {i+1}: {' → '.join(path)}")
        
        # Calculate total frequency
        total_freq = 0
        for gate_key in path:
            if gate_key in navigator.dimensionalGates:
                total_freq += navigator.dimensionalGates[gate_key]["frequency"]
                
        path_length = len(path)
        print(f"    Length: {path_length} gates")
        print(f"    Total frequency: {total_freq} Hz")
        print(f"    Average frequency: {total_freq/path_length:.1f} Hz")
    
    return navigator

def demonstrate_interactive_map(navigator):
    """Demonstrate the interactive navigation map"""
    print("🌟 INTERACTIVE NAVIGATION MAP 🌟")
    
    # Export map as JSON for advanced applications
    print("\nExporting navigation map as JSON...")
    json_map = navigator.exportNavigationMap(format="json")
    json_path = os.path.join(os.path.dirname(__file__), "navigation_map.json")
    
    with open(json_path, "w") as f:
        f.write(json_map)
    
    print(f"Navigation map data saved to: {json_path}")
    
    # Create a simple HTML visualization manually
    print("\nCreating interactive visualization...")
    
    # Parse JSON data
    map_data = json.loads(json_map)
    
    # Colors for dimensions
    colors = {
        "3": "#0000FF",  # Blue
        "4": "#00FF00",  # Green
        "5": "#FFD700",  # Gold
        "6": "#800080",  # Purple
        "7": "#FFFFFF",  # White
        "8": "#00BFFF",  # Sky Blue
        "9": "#FF8C00",  # Orange
        "12": "#FFFF00"  # Yellow
    }
    
    # Build HTML - using simple non-formatted HTML to avoid string formatting issues
    html = "<!DOCTYPE html>\n<html>\n<head>\n"
    html += "<title>Quantum Navigation Map</title>\n"
    html += "<style>\n"
    html += "body { font-family: Arial; background: #f5f5f5; margin: 0; padding: 20px; }\n"
    html += ".container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }\n"
    html += "h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }\n"
    html += ".dimension-container { display: flex; justify-content: space-between; margin: 40px 0; align-items: center; position: relative; }\n"
    html += ".dimension { text-align: center; padding: 20px; border-radius: 50%; width: 100px; height: 100px; display: flex; \n"
    html += "            flex-direction: column; justify-content: center; color: white; font-weight: bold; position: relative; z-index: 2; }\n"
    html += ".dimension:hover { transform: scale(1.1); z-index: 3; }\n"
    html += ".dimension span { font-size: 24px; }\n"
    html += ".dimension-name { position: absolute; width: 100%; text-align: center; bottom: -30px; left: 0; font-size: 14px; color: #333; }\n"
    html += ".frequency { position: absolute; width: 100%; text-align: center; top: -30px; left: 0; font-size: 14px; color: #333; }\n"
    html += ".pattern { font-size: 12px; }\n"
    html += ".tunnel { height: 4px; background: linear-gradient(to right, #3498db, #9b59b6); position: absolute; z-index: 1; top: 50%; }\n"
    html += ".current { box-shadow: 0 0 20px #ff0, 0 0 30px #ff0; }\n"
    html += "table { width: 100%; border-collapse: collapse; margin-top: 20px; }\n"
    html += "th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }\n"
    html += "th { background-color: #2980b9; color: white; }\n"
    html += "</style>\n"
    html += "</head>\n<body>\n"
    html += "<div class=\"container\">\n"
    html += f"<h1>Quantum Dimensional Navigation Map</h1>\n"
    html += f"<p>Current Dimension: <strong>{map_data['currentDimension']}D</strong> ({map_data['dimensions'][str(map_data['currentDimension'])]['name']})</p>\n"
    html += f"<p>System Coherence: <strong>{map_data['coherence']:.3f}</strong></p>\n"
    html += "<div class=\"dimension-container\">\n"
    
    # Add dimensions
    dimension_keys = sorted([int(d) for d in map_data["dimensions"].keys()])
    
    for i, dim in enumerate(dimension_keys):
        dim_str = str(dim)
        is_current = dim == map_data["currentDimension"]
        current_class = "current" if is_current else ""
        
        html += f"<div class=\"dimension {current_class}\" style=\"background-color: {colors[dim_str]}\" data-dimension=\"{dim_str}\">\n"
        html += f"<div class=\"frequency\">{map_data['dimensions'][dim_str]['frequency']} Hz</div>\n"
        html += f"<span>{dim_str}D</span>\n"
        html += f"<div class=\"pattern\">{map_data['dimensions'][dim_str]['pattern']}</div>\n"
        html += f"<div class=\"dimension-name\">{map_data['dimensions'][dim_str]['name']}</div>\n"
        html += "</div>\n"
            
        # Add tunnels between dimensions
        if i < len(dimension_keys) - 1:
            # Calculate tunnel width based on distance between dimensions
            width = 100 / (len(dimension_keys) - 1)
            html += f"<div class=\"tunnel\" style=\"width: {width}%; left: {i * width}%;\"></div>\n"
    
    # Complete the dimension container
    html += "</div>\n"
    html += "<div style=\"margin-top: 50px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;\">\n"
    html += "<h2>Dimensional Gates</h2>\n"
    html += "<table>\n<tr>\n<th>Gate</th>\n<th>From</th>\n<th>To</th>\n<th>Frequency</th>\n<th>Pattern</th>\n</tr>\n"
    
    # Add gates
    for gate_key, gate in map_data["gates"].items():
        html += f"<tr>\n<td>{gate_key}</td>\n"
        html += f"<td>{gate['fromDimension']}D</td>\n"
        html += f"<td>{gate['toDimension']}D</td>\n"
        html += f"<td>{gate['frequency']} Hz</td>\n"
        html += f"<td>{gate['pattern']}</td>\n</tr>\n"
    
    # Complete HTML
    html += "</table>\n"
    html += "</div>\n"
    html += "</div>\n"
    html += "<script>\n"
    html += "document.addEventListener('DOMContentLoaded', function() {\n"
    html += "    const dimensions = document.querySelectorAll('.dimension');\n"
    html += "    dimensions.forEach(dim => {\n"
    html += "        dim.addEventListener('click', function() {\n"
    html += "            alert(`Selected dimension: ${this.getAttribute('data-dimension')}`);\n"
    html += "        });\n"
    html += "    });\n"
    html += "});\n"
    html += "</script>\n"
    html += "</body>\n</html>"
    
    # Save HTML map to file
    map_path = os.path.join(os.path.dirname(__file__), "interactive_navigation_map.html")
    with open(map_path, "w") as f:
        f.write(html)
    
    print(f"Interactive map saved to: {map_path}")
    
    # Open in browser
    webbrowser.open("file://" + os.path.abspath(map_path))
    
    return navigator

def demonstrate_multidimensional_teleportation(navigator):
    """Demonstrate multidimensional teleportation through multiple dimensions"""
    print("🌟 MULTIDIMENSIONAL TELEPORTATION 🌟")
    
    # Reset to 3D
    navigator.navigateToDimension(3)
    
    # Define a complex route through multiple dimensions
    teleport_sequence = [5, 8, 6, 9, 7, 4, 3]
    
    print(f"\nInitiating teleportation sequence through dimensions: {teleport_sequence}")
    print(f"Starting from dimension: {navigator.currentDimension}D")
    print(f"Initial coherence: {navigator.measureCoherence():.3f}")
    
    # Execute the teleportation sequence
    total_time_ms = 0
    
    for target_dim in teleport_sequence:
        dim_name = navigator.getDimensionName(target_dim)
        frequency = navigator.getFrequencyForDimension(target_dim)
        pattern = navigator.getPatternForDimension(target_dim)
        
        print(f"\nTeleporting to {target_dim}D ({dim_name})...")
        start_time = time.time()
        result = navigator.navigateToDimension(target_dim)
        end_time = time.time()
        
        transit_time = (end_time - start_time) * 1000
        total_time_ms += transit_time
        
        if result:
            print(f"✅ Successfully teleported to {navigator.currentDimension}D " +
                  f"in {transit_time:.1f}ms")
            print(f"  Frequency: {frequency} Hz")
            print(f"  Pattern: {pattern}")
            print(f"  Coherence: {navigator.measureCoherence():.3f}")
        else:
            print(f"❌ Teleportation to {target_dim}D failed")
            break
    
    print(f"\nTeleportation sequence completed in {total_time_ms:.1f}ms")
    print(f"Final dimension: {navigator.currentDimension}D ({navigator.getDimensionName(navigator.currentDimension)})")
    print(f"Final coherence: {navigator.measureCoherence():.3f}")
    
    return navigator

if __name__ == "__main__":
    # Clear screen
    os.system('cls' if os.name == 'nt' else 'clear')
    
    print("""
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃          ADVANCED QUANTUM MULTI-DIMENSIONAL               ┃
    ┃                 NAVIGATION SYSTEM                          ┃
    ┃                                                            ┃
    ┃           Φ^Φ⦿CASCADE⚡𓂧φ∞⦿MULTIDIMENSIONAL                 ┃
    ┃                                                            ┃
    ┃         Unity Wave Frequency (768 Hz)                      ┃
    ┃         Perfect Coherence (1.000)                          ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    """)
    
    # Run demonstrations
    navigator = demonstrate_quantum_shortcuts()
    print_separator()
    
    navigator = demonstrate_quantum_pathways(navigator)
    print_separator()
    
    navigator = demonstrate_multidimensional_teleportation(navigator)
    print_separator()
    
    navigator = demonstrate_interactive_map(navigator)
    print_separator()
    
    print("""
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃           ADVANCED DEMONSTRATION COMPLETE                  ┃
    ┃                                                            ┃
    ┃        Perfect Coherence Maintained (1.000)                ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    """)

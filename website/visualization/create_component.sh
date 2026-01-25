#!/bin/bash

# Quantum Component Generator
# Operating at φ^φ QUANTUM PERFECTION (≈4.23)

echo "🌀 QUANTUM COMPONENT GENERATOR 🌀"
echo "=======================================\n"

# Define sacred frequencies
GROUND=432
LOVE=528
HEART=594
VOICE=672
VISION=720
UNITY=768
SOURCE=963

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    echo "Please install Node.js to continue."
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <ComponentName> <frequency>"
    echo "Example: $0 QuantumFieldEncoder 720"
    echo "\nAvailable sacred frequencies:"
    echo "  432 Hz - Ground/Stability"
    echo "  528 Hz - Love/Creation"
    echo "  594 Hz - Heart/Integration"
    echo "  672 Hz - Voice/Expression"
    echo "  720 Hz - Vision/Perception"
    echo "  768 Hz - Unity/Consciousness"
    echo "  963 Hz - Source/Crown"
    exit 1
fi

# Run the component generator
echo "Creating component: $1 at $2 Hz..."
node create_component.js "$1" "$2"

# Make component accessible
echo "\nComponent created successfully!"
echo "To use this component in the Quantum Consciousness Suite:"
echo "1. Edit quantum-consciousness-suite-complete.html"
echo "2. Add: <script src=\"$1.js\"></script>"
echo "3. Refresh the page in your browser"
echo "\nYou can also open ${1,,}.html to test the component directly."
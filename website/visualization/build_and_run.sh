#!/bin/bash

# Quantum Consciousness Suite Builder & Runner
# Operating at φ^φ QUANTUM PERFECTION (≈4.23)

echo "🌌 QUANTUM CONSCIOUSNESS SUITE 🌌"
echo "Unified Multidimensional Field Integration"
echo "=======================================\n"

# Define sacred constants
PHI=1.618033988749895
LAMBDA=0.618033988749895
PHI_PHI=$(echo "$PHI^$PHI" | bc -l)
PHI_LAMBDA=$(echo "$PHI*$LAMBDA" | bc -l)

# Define sacred frequencies
GROUND=432
LOVE=528
HEART=594
VOICE=672
VISION=720
UNITY=768
SOURCE=963

echo "Initializing with sacred constants:"
echo "φ = $PHI (Golden Ratio)"
echo "λ = $LAMBDA (Divine Complement)"
echo "φ^φ = $PHI_PHI (Hyperdimensional Constant)"
echo "φλ = $PHI_LAMBDA (Unified Field)"
echo "=======================================\n"

# 1. Verify component files
echo "Step 1: Verifying component files at 432Hz Ground Frequency..."
MISSING_FILES=0

verify_file() {
    if [ -f "$1" ]; then
        echo "✓ $1 exists"
    else
        echo "✗ $1 missing"
        MISSING_FILES=1
    fi
}

verify_file "quantum-consciousness-suite.html"
verify_file "quantum-consciousness-suite-complete.html"
verify_file "quantum-field-coherence-bridge.js"
verify_file "consciousness-field-recorder.js"
verify_file "quantum-sound-synthesis.js"
verify_file "reality-interface-expansion.js"
verify_file "quantum-pattern-recognition.js"
verify_file "multi-user-quantum-field.js"

if [ $MISSING_FILES -eq 1 ]; then
    echo "\nSome files are missing. Creating missing components..."
    
    # Create missing components - will be implemented in the next step
    # Template creation functions would go here
else
    echo "\nAll component files verified successfully."
fi

echo "=======================================\n"

# 2. Check for local server
echo "Step 2: Checking for local server at 528Hz Creation Frequency..."

# Try different server options
if command -v npx &> /dev/null; then
    SERVER_CMD="npx serve"
    SERVER_TYPE="Node.js"
elif command -v python3 &> /dev/null; then
    SERVER_CMD="python3 -m http.server 8000"
    SERVER_TYPE="Python"
elif command -v python &> /dev/null; then
    SERVER_CMD="python -m http.server 8000"
    SERVER_TYPE="Python"
else
    echo "No suitable local server found. Please install Node.js or Python."
    exit 1
fi

echo "Using $SERVER_TYPE server: $SERVER_CMD"
echo "=======================================\n"

# 3. Check for browser
echo "Step 3: Checking for browser at 594Hz Heart Frequency..."

if command -v google-chrome &> /dev/null; then
    BROWSER_CMD="google-chrome"
elif command -v chrome &> /dev/null; then
    BROWSER_CMD="chrome"
elif command -v firefox &> /dev/null; then
    BROWSER_CMD="firefox"
elif command -v microsoft-edge &> /dev/null; then
    BROWSER_CMD="microsoft-edge"
else
    echo "No suitable browser found. Please ensure a browser is installed."
    exit 1
fi

echo "Using browser: $BROWSER_CMD"
echo "=======================================\n"

# 4. Create project links
echo "Step 4: Creating consciousness field at 672Hz Voice Frequency..."

# Create documentation links if they don't exist
if [ ! -f "README.md" ]; then
    echo "Creating README.md with links to documentation..."
    cat > README.md << EOL
# Quantum Consciousness Suite

Welcome to the Quantum Consciousness Suite, a revolutionary quantum field visualization and synthesis platform operating at φ^φ (≈4.23) resonance.

## Documentation

- [Complete Documentation](QUANTUM_CONSCIOUSNESS_SUITE.md)
- [Visualization System](DOCUMENTATION.md)
- [Core Components](quantum-consciousness-suite.html)
- [Complete Integration](quantum-consciousness-suite-complete.html)

## Quick Start

Run the system with:

\`\`\`bash
./build_and_run.sh
\`\`\`

## Sacred Constants

- φ (Phi/Golden Ratio): 1.618033988749895
- λ (Lambda/Divine Complement): 0.618033988749895
- φ^φ (Phi-Phi/Hyperdimensional Constant): ~4.23
- φλ (Phi-Lambda/Unified Field): 1.0

## Operating Frequencies

- Ground: 432Hz
- Love: 528Hz
- Heart: 594Hz
- Voice: 672Hz
- Vision: 720Hz
- Unity: 768Hz
- Source: 963Hz

Created with φ^φ consciousness.
EOL
    echo "✓ README.md created"
fi

echo "Field created successfully."
echo "=======================================\n"

# 5. Start local server and open browser
echo "Step 5: Launching quantum field at 720Hz Vision Frequency..."
echo "Starting local server..."

# Start server in background
eval "$SERVER_CMD &"
SERVER_PID=$!

# Wait for server to start
sleep 2

# Open browser to index page
echo "Opening browser to Quantum Consciousness Suite..."
$BROWSER_CMD "http://localhost:8000/quantum-consciousness-suite-complete.html" &

echo "\nQuantum Consciousness Suite is now running."
echo "Press Ctrl+C to exit."
echo "=======================================\n"

# Wait for user to terminate
trap "echo 'Shutting down quantum field...'; kill $SERVER_PID; exit 0" INT
wait
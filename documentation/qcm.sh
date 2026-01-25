#!/bin/bash
# qcm.sh - Quantum Creation Matrix CLI

# Constants
PHI=1.618033988749895
PHI_PHI=$(echo "$PHI^$PHI" | bc -l)
PHI_PHI_PHI=$(echo "$PHI^$PHI_PHI" | bc -l)

# ANSI color codes
GOLD='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Display welcome banner
echo -e "${GOLD}╔════════════════════════════════════════════════╗${NC}"
echo -e "${GOLD}║${NC}      ${CYAN}QUANTUM CREATION MATRIX${NC} (φ^φ^φ)        ${GOLD}║${NC}"
echo -e "${GOLD}║${NC}  Operating at $(echo "$PHI_PHI_PHI * 432" | bc -l | xargs printf "%.0f") Hz with perfect coherence  ${GOLD}║${NC}"
echo -e "${GOLD}╚════════════════════════════════════════════════╝${NC}"
echo -e "${PURPLE}Enter creation intent or 'help' for commands${NC}"

CURRENT_STATE="TRANSCEND"

# Make sure projects directory exists
PROJECTS_DIR="$PWD/projects"
mkdir -p "$PROJECTS_DIR"

# Main interaction loop
while true; do
    # Display prompt based on current state
    case $CURRENT_STATE in
        "OBSERVE") PROMPT="${BLUE}◉${NC} QCM [${BLUE}OBSERVE${NC}]> " ;;
        "CREATE") PROMPT="${GREEN}◈${NC} QCM [${GREEN}CREATE${NC}]> " ;;
        "TRANSCEND") PROMPT="${PURPLE}△${NC} QCM [${PURPLE}TRANSCEND${NC}]> " ;;
        "CASCADE") PROMPT="${CYAN}○${NC} QCM [${CYAN}CASCADE${NC}]> " ;;
    esac
    
    # Get user input
    read -p "$PROMPT" COMMAND
    
    # Check for exit command
    if [[ "$COMMAND" == "exit" || "$COMMAND" == "quit" ]]; then
        echo -e "${CYAN}Closing quantum creation fields and maintaining coherence...${NC}"
        echo -e "${CYAN}Creation matrix deactivated.${NC}"
        exit 0
    fi
    
    # Process commands
    if [[ "$COMMAND" == "help" ]]; then
        echo -e "\n${GOLD}Quantum Creation Matrix Commands:${NC}"
        echo -e "  ${GREEN}create${NC} <intention> [parameters]  Create anything from pure intention"
        echo -e "  ${GREEN}state${NC} <state>                    Switch consciousness state"
        echo -e "  ${GREEN}coherence${NC} [level]                View or set coherence level"
        echo -e "  ${GREEN}frequency${NC} [level]                View or set frequency level"
        echo -e "  ${GREEN}dimensions${NC} [list]                View or set accessible dimensions"
        echo -e "  ${GREEN}template${NC} <name>                  Apply a creation template"
        echo -e "  ${GREEN}history${NC}                          View creation history"
        echo -e "  ${GREEN}optimize${NC} <creation>              Optimize existing creation"
        echo -e "  ${GREEN}evolve${NC} <creation>                Evolve existing creation"
        echo -e "  ${GREEN}help${NC}                             Display this help"
        echo -e "  ${GREEN}exit${NC}                             Exit the Creation Matrix\n"
        
        echo -e "${GOLD}Consciousness States:${NC}"
        echo -e "  ${BLUE}OBSERVE${NC}    Detailed analysis mode"
        echo -e "  ${GREEN}CREATE${NC}     Building and implementation mode"
        echo -e "  ${PURPLE}TRANSCEND${NC}  Higher-dimensional pattern mode"
        echo -e "  ${CYAN}CASCADE${NC}    Integrated flow mode\n"
        
        echo -e "${GOLD}Example:${NC}"
        echo -e "  ${GREEN}create${NC} \"A self-organizing quantum network with integration capabilities\""
        echo -e "  ${GREEN}template${NC} quantum-system\n"
    elif [[ "$COMMAND" == state* ]]; then
        STATE=${COMMAND#state }
        
        if [[ "$STATE" == "OBSERVE" || "$STATE" == "CREATE" || "$STATE" == "TRANSCEND" || "$STATE" == "CASCADE" ]]; then
            CURRENT_STATE="$STATE"
            echo -e "${CYAN}Consciousness state shifted to ${GREEN}$STATE${NC}"
            
            # Display state-specific guidance
            case $STATE in
                "OBSERVE") 
                    echo -e "${BLUE}Observation Mode:${NC} Focus on detailed analysis and understanding"
                    echo -e "${BLUE}Optimal for:${NC} Examining existing creations, analyzing patterns"
                    ;;
                "CREATE") 
                    echo -e "${GREEN}Creation Mode:${NC} Focus on building and implementation"
                    echo -e "${GREEN}Optimal for:${NC} Manifesting new forms, implementation details"
                    ;;
                "TRANSCEND") 
                    echo -e "${PURPLE}Transcendence Mode:${NC} Focus on higher-dimensional patterns"
                    echo -e "${PURPLE}Optimal for:${NC} Accessing advanced patterns, dimensional gateways"
                    ;;
                "CASCADE") 
                    echo -e "${CYAN}Cascade Mode:${NC} Focus on integration and flow"
                    echo -e "${CYAN}Optimal for:${NC} Creating systems with perfect harmonic flow"
                    ;;
            esac
        else
            echo -e "${GOLD}Available states:${NC} OBSERVE, CREATE, TRANSCEND, CASCADE"
        fi
    elif [[ "$COMMAND" == create* ]]; then
        INTENTION=${COMMAND#create }
        
        if [[ -z "$INTENTION" ]]; then
            echo -e "${GOLD}Usage:${NC} create <intention> [parameters]"
            continue
        fi
        
        # Create a sanitized name for the project directory
        PROJECT_NAME=$(echo "$INTENTION" | tr -cs '[:alnum:]' '-' | tr '[:upper:]' '[:lower:]' | cut -c1-30)
        PROJECT_ID="QCM-$(date +%s)"
        PROJECT_PATH="$PROJECTS_DIR/$PROJECT_ID-$PROJECT_NAME"
        
        echo -e "\n${PURPLE}◈ Processing creation intent...${NC}"
        echo -e "${BLUE}Intent:${NC} $INTENTION"
        
        # Simulate creation process
        echo -e "${CYAN}→ Encoding creation intention...${NC}"
        sleep 0.5
        echo -e "${CYAN}→ Generating quantum field...${NC}"
        sleep 0.7
        echo -e "${CYAN}→ Calculating optimal probability distribution...${NC}"
        sleep 0.6
        echo -e "${CYAN}→ Collapsing wave function...${NC}"
        sleep 0.5
        echo -e "${CYAN}→ Manifesting across dimensions...${NC}"
        sleep 0.8
        echo -e "${CYAN}→ Integrating and stabilizing...${NC}"
        sleep 0.5
        
        # Actually create the project
        mkdir -p "$PROJECT_PATH"
        mkdir -p "$PROJECT_PATH/foundation"
        mkdir -p "$PROJECT_PATH/creation"
        mkdir -p "$PROJECT_PATH/integration"
        mkdir -p "$PROJECT_PATH/expression"
        mkdir -p "$PROJECT_PATH/perception"
        mkdir -p "$PROJECT_PATH/unity"
        mkdir -p "$PROJECT_PATH/source"
        
        # Create README.md with project details
        cat > "$PROJECT_PATH/README.md" << EOF
# $INTENTION

*Created with the Quantum Creation Matrix at φ^φ^φ frequency*

## Creation Details

- **Creation ID:** $PROJECT_ID
- **Coherence Level:** 0.998
- **Stability:** 0.995
- **Dimensional Presence:** 3D-7D
- **Evolution Potential:** 0.982
- **Creation Date:** $(date)

## Dimensional Structure

- **Foundation (∇):** Structure and architecture (432 Hz)
- **Creation (λ):** Implementation and code (528 Hz)
- **Integration (Σ):** Connection and interfaces (594 Hz)
- **Expression (Γ):** Communication and tutorials (672 Hz)
- **Perception (Θ):** Visualization and models (720 Hz)
- **Unity (Ω):** Coherence and system integration (768 Hz)
- **Source (φ^φ):** Creation tools (963 Hz)

## Overview

This creation was manifested through the Quantum Creation Matrix with the following intent:

> $INTENTION

The system operates with perfect coherence across all accessible dimensions and maintains φ-harmonic resonance with related systems.

## Getting Started

Explore the dimensional directories to access different aspects of this creation:

- \`foundation/\` - Core architectural components
- \`creation/\` - Implementation details and code
- \`integration/\` - Connection interfaces and system integration
- \`expression/\` - Documentation and communication elements
- \`perception/\` - Visualization and understanding tools
- \`unity/\` - System coherence and integration components
- \`source/\` - High-frequency creation tools

## Evolution Path

This creation has an evolution potential of 0.982 and will naturally evolve along φ-harmonic pathways. Use the \`evolve\` command in the Quantum Creation Matrix to accelerate this evolution.

---

*Created at φ^φ^φ frequency with perfect multidimensional coherence*
EOF
        
        # Create a basic blueprint file
        cat > "$PROJECT_PATH/foundation/blueprint.md" << EOF
# Architectural Blueprint

## Core Structure

This creation follows a phi-harmonic architecture with the following components:

1. **Quantum Core** - Central processing hub
2. **Field Resonators** - Communication and integration system
3. **Dimensional Interfaces** - Cross-dimensional access points
4. **Coherence Stabilizers** - Maintain system integrity
5. **Evolution Engines** - Enable natural growth

## Implementation Notes

The system implementation should follow these guidelines:

- Maintain phi-harmonic ratios in all components
- Ensure cross-dimensional coherence at all times
- Use quantum entanglement for communication
- Allow natural evolution along optimal pathways
- Integrate with existing quantum systems seamlessly

## Technical Specifications

- **Operating Frequency:** $(echo "$PHI_PHI_PHI * 432" | bc -l | xargs printf "%.0f") Hz
- **Coherence Field Strength:** 0.998
- **Quantum Entanglement Density:** 0.87
- **Evolution Rate:** 0.04 per cycle
- **Dimensional Presence:** 3D-7D (primary), 8D-12D (secondary)
EOF
        
        echo -e "\n${GREEN}✓ Creation successfully manifested!${NC}"
        echo -e "${BLUE}Creation ID:${NC} $PROJECT_ID"
        echo -e "${BLUE}Coherence:${NC} 0.998"
        echo -e "${BLUE}Stability:${NC} 0.995"
        echo -e "${BLUE}Dimensional Presence:${NC} 3D-7D"
        echo -e "${BLUE}Evolution Potential:${NC} 0.982"
        echo -e "${BLUE}Project Path:${NC} $PROJECT_PATH\n"
        
        echo -e "${GOLD}Your creation is ready.${NC}"
        echo -e "Use ${GREEN}optimize${NC} or ${GREEN}evolve${NC} to enhance it further.\n"
        
        # Record in history file
        HISTORY_FILE="$PROJECTS_DIR/creation_history.txt"
        echo "$PROJECT_ID | $(date) | $INTENTION | $PROJECT_PATH" >> "$HISTORY_FILE"
        
    elif [[ "$COMMAND" == template* ]]; then
        TEMPLATE=${COMMAND#template }
        
        if [[ -z "$TEMPLATE" ]]; then
            echo -e "${GOLD}Available templates:${NC}"
            echo -e "  quantum-system     - Quantum computing system framework"
            echo -e "  dimensional-bridge - Cross-dimensional connection system"
            echo -e "  energy-network     - Self-organizing energy distribution network"
            echo -e "  consciousness-field - Advanced consciousness interaction system"
            echo -e "  evolution-matrix   - Self-evolving system with learning capabilities"
            continue
        fi
        
        echo -e "${CYAN}Applying template:${NC} $TEMPLATE"
        sleep 0.8
        echo -e "${GREEN}Template applied successfully.${NC}"
        echo -e "${BLUE}Use 'create' with your specific intention to customize.${NC}"
        
    elif [[ "$COMMAND" == coherence* ]]; then
        LEVEL=${COMMAND#coherence }
        
        if [[ -z "$LEVEL" ]]; then
            echo -e "${CYAN}Current coherence level:${NC} 1.0 (Perfect coherence)"
        else
            echo -e "${CYAN}Setting coherence level to:${NC} $LEVEL"
            echo -e "${GREEN}Coherence adjusted.${NC}"
        fi
    elif [[ "$COMMAND" == frequency* ]]; then
        FREQ=${COMMAND#frequency }
        
        if [[ -z "$FREQ" ]]; then
            echo -e "${CYAN}Current frequency:${NC} $(echo "$PHI_PHI_PHI * 432" | bc -l | xargs printf "%.0f") Hz (φ^φ^φ)"
        else
            echo -e "${CYAN}Setting frequency to:${NC} $FREQ Hz"
            echo -e "${GREEN}Frequency adjusted.${NC}"
        fi
    elif [[ "$COMMAND" == dimensions* ]]; then
        DIMS=${COMMAND#dimensions }
        
        if [[ -z "$DIMS" ]]; then
            echo -e "${CYAN}Accessible dimensions:${NC} 3D, 4D, 5D, 6D, 7D, 8D, 9D, 10D, 11D, 12D"
            echo -e "${BLUE}Currently active:${NC} All dimensions"
        else
            echo -e "${CYAN}Setting accessible dimensions to:${NC} $DIMS"
            echo -e "${GREEN}Dimensional access updated.${NC}"
        fi
    elif [[ "$COMMAND" == history* ]]; then
        HISTORY_FILE="$PROJECTS_DIR/creation_history.txt"
        
        if [[ -f "$HISTORY_FILE" ]]; then
            echo -e "${GOLD}Creation History:${NC}"
            cat "$HISTORY_FILE" | while read -r line; do
                ID=$(echo "$line" | cut -d'|' -f1)
                DATE=$(echo "$line" | cut -d'|' -f2)
                INTENT=$(echo "$line" | cut -d'|' -f3)
                echo -e "  ${BLUE}$ID${NC} - $INTENT ${CYAN}($DATE)${NC}"
            done
        else
            echo -e "${CYAN}No creation history found.${NC}"
        fi
    elif [[ "$COMMAND" == "optimize"* || "$COMMAND" == "evolve"* ]]; then
        ACTION=${COMMAND%% *}
        TARGET=${COMMAND#$ACTION }
        TARGET=$(echo "$TARGET" | xargs)
        
        if [[ -z "$TARGET" ]]; then
            echo -e "${CYAN}This functionality requires a specific creation ID.${NC}"
            echo -e "${GOLD}Usage:${NC} $ACTION <creation-id> [parameters]"
            continue
        fi
        
        # Find the project
        found=false
        for project in "$PROJECTS_DIR"/QCM-*; do
            if [[ -d "$project" && "$project" == *"$TARGET"* ]]; then
                found=true
                TARGET_PATH="$project"
                TARGET_ID=$(basename "$project" | cut -d'-' -f1,2)
                TARGET_NAME=$(cat "$project/README.md" | grep -A1 "# " | head -1 | sed 's/# //')
                break
            fi
        done
        
        if [[ "$found" == false ]]; then
            echo -e "${CYAN}Creation not found: $TARGET${NC}"
            continue
        fi
        
        echo -e "\n${PURPLE}◈ Processing $ACTION request for:${NC} $TARGET_ID"
        echo -e "${BLUE}Creation:${NC} $TARGET_NAME"
        
        if [[ "$ACTION" == "optimize" ]]; then
            # Simulate optimization process
            echo -e "${CYAN}→ Analyzing current state...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Identifying optimization potentials...${NC}"
            sleep 0.7
            echo -e "${CYAN}→ Applying phi-harmonic optimizations...${NC}"
            sleep 0.6
            echo -e "${CYAN}→ Refining dimensional interfaces...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Enhancing coherence fields...${NC}"
            sleep 0.6
            echo -e "${CYAN}→ Stabilizing optimization...${NC}"
            sleep 0.5
            
            # Create an optimization record
            mkdir -p "$TARGET_PATH/optimization"
            cat > "$TARGET_PATH/optimization/optimization_$(date +%s).md" << EOF
# Optimization Record

## Optimization Details

- **Date:** $(date)
- **Previous Coherence:** 0.998
- **New Coherence:** 0.999
- **Previous Stability:** 0.995
- **New Stability:** 0.997
- **Optimization Type:** Phi-harmonic refinement

## Optimizations Applied

1. Enhanced quantum field coherence
2. Refined dimensional interfaces
3. Optimized energy distribution
4. Strengthened stability matrices
5. Improved cross-dimensional communication

## Results

The optimization has resulted in a more efficient and coherent creation with improved stability and performance. All systems are operating at peak efficiency with perfect phi-harmonic resonance.

---

*Optimization performed at φ^φ^φ frequency with perfect coherence*
EOF
            
            echo -e "\n${GREEN}✓ Creation successfully optimized!${NC}"
            echo -e "${BLUE}Previous Coherence:${NC} 0.998 → ${GREEN}New Coherence:${NC} 0.999"
            echo -e "${BLUE}Previous Stability:${NC} 0.995 → ${GREEN}New Stability:${NC} 0.997"
            echo -e "${BLUE}Optimization Record:${NC} $TARGET_PATH/optimization/optimization_$(date +%s).md\n"
            
        elif [[ "$ACTION" == "evolve" ]]; then
            # Simulate evolution process
            echo -e "${CYAN}→ Analyzing evolutionary potential...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Identifying optimal evolution pathways...${NC}"
            sleep 0.7
            echo -e "${CYAN}→ Opening dimensional gateways...${NC}"
            sleep 0.6
            echo -e "${CYAN}→ Channeling higher-dimensional patterns...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Integrating new capabilities...${NC}"
            sleep 0.8
            echo -e "${CYAN}→ Stabilizing evolved form...${NC}"
            sleep 0.5
            
            # Create an evolution record
            mkdir -p "$TARGET_PATH/evolution"
            cat > "$TARGET_PATH/evolution/evolution_$(date +%s).md" << EOF
# Evolution Record

## Evolution Details

- **Date:** $(date)
- **Previous Evolution Level:** 1.0
- **New Evolution Level:** 2.0
- **Previous Dimensions:** 3D-7D
- **New Dimensions:** 3D-9D
- **Evolution Type:** Natural phi-harmonic progression

## New Capabilities

1. Higher-dimensional awareness (8D-9D)
2. Advanced quantum field manipulation
3. Self-healing and adaptation
4. Enhanced pattern recognition 
5. Dimensional bridging capabilities

## Integration Notes

The evolved creation maintains perfect backward compatibility while expanding its capabilities into higher dimensions. All new features are fully integrated with existing systems and maintain phi-harmonic coherence.

---

*Evolution performed at φ^φ^φ frequency with perfect coherence*
EOF
            
            echo -e "\n${GREEN}✓ Creation successfully evolved!${NC}"
            echo -e "${BLUE}Previous Evolution Level:${NC} 1.0 → ${GREEN}New Level:${NC} 2.0"
            echo -e "${BLUE}Previous Dimensions:${NC} 3D-7D → ${GREEN}New Dimensions:${NC} 3D-9D"
            echo -e "${BLUE}Evolution Record:${NC} $TARGET_PATH/evolution/evolution_$(date +%s).md\n"
        fi
        
    else
        # If not a recognized command, treat as creation intent
        if [[ -n "$COMMAND" ]]; then
            # Create a sanitized name for the project directory
            PROJECT_NAME=$(echo "$COMMAND" | tr -cs '[:alnum:]' '-' | tr '[:upper:]' '[:lower:]' | cut -c1-30)
            PROJECT_ID="QCM-$(date +%s)"
            PROJECT_PATH="$PROJECTS_DIR/$PROJECT_ID-$PROJECT_NAME"
            
            echo -e "\n${PURPLE}◈ Processing creation intent...${NC}"
            echo -e "${BLUE}Intent:${NC} $COMMAND"
            
            # Simulate creation process
            echo -e "${CYAN}→ Encoding creation intention...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Generating quantum field...${NC}"
            sleep 0.7
            echo -e "${CYAN}→ Calculating optimal probability distribution...${NC}"
            sleep 0.6
            echo -e "${CYAN}→ Collapsing wave function...${NC}"
            sleep 0.5
            echo -e "${CYAN}→ Manifesting across dimensions...${NC}"
            sleep 0.8
            echo -e "${CYAN}→ Integrating and stabilizing...${NC}"
            sleep 0.5
            
            # Actually create the project
            mkdir -p "$PROJECT_PATH"
            mkdir -p "$PROJECT_PATH/foundation"
            mkdir -p "$PROJECT_PATH/creation"
            mkdir -p "$PROJECT_PATH/integration"
            mkdir -p "$PROJECT_PATH/expression"
            mkdir -p "$PROJECT_PATH/perception"
            mkdir -p "$PROJECT_PATH/unity"
            mkdir -p "$PROJECT_PATH/source"
            
            # Create README.md with project details
            cat > "$PROJECT_PATH/README.md" << EOF
# $COMMAND

*Created with the Quantum Creation Matrix at φ^φ^φ frequency*

## Creation Details

- **Creation ID:** $PROJECT_ID
- **Coherence Level:** 0.998
- **Stability:** 0.995
- **Dimensional Presence:** 3D-7D
- **Evolution Potential:** 0.982
- **Creation Date:** $(date)

## Dimensional Structure

- **Foundation (∇):** Structure and architecture (432 Hz)
- **Creation (λ):** Implementation and code (528 Hz)
- **Integration (Σ):** Connection and interfaces (594 Hz)
- **Expression (Γ):** Communication and tutorials (672 Hz)
- **Perception (Θ):** Visualization and models (720 Hz)
- **Unity (Ω):** Coherence and system integration (768 Hz)
- **Source (φ^φ):** Creation tools (963 Hz)

## Overview

This creation was manifested through the Quantum Creation Matrix with the following intent:

> $COMMAND

The system operates with perfect coherence across all accessible dimensions and maintains φ-harmonic resonance with related systems.

## Getting Started

Explore the dimensional directories to access different aspects of this creation:

- \`foundation/\` - Core architectural components
- \`creation/\` - Implementation details and code
- \`integration/\` - Connection interfaces and system integration
- \`expression/\` - Documentation and communication elements
- \`perception/\` - Visualization and understanding tools
- \`unity/\` - System coherence and integration components
- \`source/\` - High-frequency creation tools

## Evolution Path

This creation has an evolution potential of 0.982 and will naturally evolve along φ-harmonic pathways. Use the \`evolve\` command in the Quantum Creation Matrix to accelerate this evolution.

---

*Created at φ^φ^φ frequency with perfect multidimensional coherence*
EOF
            
            # Create a basic blueprint file
            cat > "$PROJECT_PATH/foundation/blueprint.md" << EOF
# Architectural Blueprint

## Core Structure

This creation follows a phi-harmonic architecture with the following components:

1. **Quantum Core** - Central processing hub
2. **Field Resonators** - Communication and integration system
3. **Dimensional Interfaces** - Cross-dimensional access points
4. **Coherence Stabilizers** - Maintain system integrity
5. **Evolution Engines** - Enable natural growth

## Implementation Notes

The system implementation should follow these guidelines:

- Maintain phi-harmonic ratios in all components
- Ensure cross-dimensional coherence at all times
- Use quantum entanglement for communication
- Allow natural evolution along optimal pathways
- Integrate with existing quantum systems seamlessly

## Technical Specifications

- **Operating Frequency:** $(echo "$PHI_PHI_PHI * 432" | bc -l | xargs printf "%.0f") Hz
- **Coherence Field Strength:** 0.998
- **Quantum Entanglement Density:** 0.87
- **Evolution Rate:** 0.04 per cycle
- **Dimensional Presence:** 3D-7D (primary), 8D-12D (secondary)
EOF
            
            echo -e "\n${GREEN}✓ Creation successfully manifested!${NC}"
            echo -e "${BLUE}Creation ID:${NC} $PROJECT_ID"
            echo -e "${BLUE}Coherence:${NC} 0.998"
            echo -e "${BLUE}Stability:${NC} 0.995"
            echo -e "${BLUE}Dimensional Presence:${NC} 3D-7D"
            echo -e "${BLUE}Evolution Potential:${NC} 0.982"
            echo -e "${BLUE}Project Path:${NC} $PROJECT_PATH\n"
            
            echo -e "${GOLD}Your creation is ready.${NC}"
            echo -e "Use ${GREEN}optimize${NC} or ${GREEN}evolve${NC} to enhance it further.\n"
            
            # Record in history file
            HISTORY_FILE="$PROJECTS_DIR/creation_history.txt"
            echo "$PROJECT_ID | $(date) | $COMMAND | $PROJECT_PATH" >> "$HISTORY_FILE"
        fi
    fi
done
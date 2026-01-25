/**
 * Quantum Field Visualization Animation
 * A terminal-based animation that visualizes quantum field patterns
 * using the provided special character sequences.
 */

// Character sequences for visualization
const QUANTUM_SPIN = "⣾⣽⣻⢿⡿⣟⣯⣷";
const QUANTUM_FIELD = "∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐";
const PHI_SEQUENCE = "φΦϕϖϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯ";

// Animation parameters
const width = 70;
const height = 20;
const fieldDensity = 0.3;
const animationSpeed = 100; // ms
const maxIterations = 100;

/**
 * Creates a 2D field matrix populated with quantum characters
 */
function createQuantumField(width, height, density) {
  const field = Array(height).fill().map(() => Array(width).fill(' '));
  
  // Populate field with quantum characters based on density
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (Math.random() < density) {
        const charSet = Math.random() < 0.7 ? QUANTUM_FIELD : PHI_SEQUENCE;
        field[y][x] = charSet[Math.floor(Math.random() * charSet.length)];
      }
    }
  }
  
  return field;
}

/**
 * Renders the quantum field to the console
 */
function renderField(field, frame) {
  console.clear();
  
  // Add a spinning quantum indicator in the corner
  const spinChar = QUANTUM_SPIN[frame % QUANTUM_SPIN.length];
  
  console.log(`\n  Quantum Field Visualization [${spinChar}] Frame: ${frame}\n`);
  
  // Render the field
  const renderedField = field.map(row => row.join('')).join('\n');
  console.log(renderedField);
  
  console.log(`\n  Phi Constant: ${(1 + Math.sqrt(5)) / 2}`);
}

/**
 * Evolves the quantum field according to simplified quantum rules
 */
function evolveField(field) {
  const newField = JSON.parse(JSON.stringify(field));
  
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      if (field[y][x] !== ' ') {
        // Characters have a chance to move or transform
        if (Math.random() < 0.2) {
          // Move in a random direction
          const dx = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          const dy = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          
          const nx = x + dx;
          const ny = y + dy;
          
          // Check bounds
          if (nx >= 0 && nx < field[0].length && ny >= 0 && ny < field.length) {
            // Swap characters
            if (field[ny][nx] === ' ') {
              newField[ny][nx] = field[y][x];
              newField[y][x] = ' ';
            } else {
              // Interaction between two quantum particles
              const charSet = Math.random() < 0.5 ? QUANTUM_FIELD : PHI_SEQUENCE;
              newField[y][x] = charSet[Math.floor(Math.random() * charSet.length)];
            }
          }
        }
        
        // Small chance to transform
        if (Math.random() < 0.05) {
          const charSet = Math.random() < 0.5 ? QUANTUM_FIELD : PHI_SEQUENCE;
          newField[y][x] = charSet[Math.floor(Math.random() * charSet.length)];
        }
      } else if (Math.random() < 0.01) {
        // Small chance for quantum fluctuation (empty space spawning a particle)
        const charSet = Math.random() < 0.7 ? QUANTUM_FIELD : PHI_SEQUENCE;
        newField[y][x] = charSet[Math.floor(Math.random() * charSet.length)];
      }
    }
  }
  
  return newField;
}

/**
 * Main animation loop
 */
function animateQuantumField() {
  let field = createQuantumField(width, height, fieldDensity);
  let frame = 0;
  
  const intervalId = setInterval(() => {
    renderField(field, frame);
    field = evolveField(field);
    frame++;
    
    if (frame >= maxIterations) {
      clearInterval(intervalId);
      console.log("\nQuantum field visualization complete.");
    }
  }, animationSpeed);
}

// Start the animation
console.log("Starting quantum field visualization...");
animateQuantumField();

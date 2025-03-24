/**
 * CASCADE⚡𓂧φ∞ Quantum Shader Collection
 * Phi-Harmonic Visualization System
 */

// Initialize CASCADE namespace if it doesn't exist
window.CASCADE = window.CASCADE || {};

// Create Shaders namespace
CASCADE.Shaders = {};

// Constants
CASCADE.PHI = 1.618033988749895;
CASCADE.PHI_INVERSE = 0.618033988749895;
CASCADE.PHI_SQUARED = 2.618033988749895;

// GLSL Shader Definitions

// Quantum Particle Vertex Shader
CASCADE.Shaders.particleVertex = `
uniform float uTime;
uniform float uFrequency;
uniform float uQuantumState;

attribute float size;
attribute float speed;
attribute vec3 customColor;
attribute float phase;

varying vec3 vColor;
varying float vPhase;

// Phi-harmonic functions
float phi = 1.618033988749895;
float phiWave(float x) {
    return sin(x) * cos(x / phi);
}

void main() {
    vColor = customColor;
    vPhase = phase;
    
    // Particle motion based on phi-harmonic wave equations
    vec3 pos = position;
    
    // Apply quantum probability wave
    float timeFactor = uTime * speed * 0.5;
    float waveFactor = phiWave(timeFactor + phase * 6.28);
    
    // Frequency affects the wave pattern
    float freqFactor = uFrequency / 600.0; // Normalize to ~1.0
    
    // Apply different motions based on quantum state
    float stateFactor = uQuantumState + 0.5;
    
    // Phi-harmonic orbital motion
    float orbitX = waveFactor * cos(timeFactor * phi);
    float orbitY = waveFactor * sin(timeFactor * phi);
    float orbitZ = waveFactor * phiWave(timeFactor * phi * phi);
    
    // Scale orbital motion by frequency and quantum state
    pos.x += orbitX * freqFactor * stateFactor;
    pos.y += orbitY * freqFactor * stateFactor;
    pos.z += orbitZ * freqFactor * stateFactor;
    
    // Size variation based on quantum resonance
    float sizeVar = 1.0 + 0.3 * sin(uTime + phase * 10.0);
    
    // Calculate perspective projection
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * sizeVar * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

// Quantum Particle Fragment Shader
CASCADE.Shaders.particleFragment = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uFrequency;

varying vec3 vColor;
varying float vPhase;

void main() {
    // Calculate distance from center of point (0.0-1.0)
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(gl_PointCoord, center) * 2.0;
    
    // Create soft circular particle
    float strength = 1.0 - dist;
    strength = pow(strength, 2.0);
    
    // Apply quantum glow effect
    float glow = 0.5 + 0.5 * sin(uTime * 2.0 + vPhase * 6.28);
    
    // Frequency influence on color
    float freqFactor = uFrequency / 768.0; // Normalize to 0-1 for phi range
    vec3 freqColor = mix(
        vColor,
        vec3(vColor.r * 1.2, vColor.g * 1.1, vColor.b * 0.9),
        freqFactor
    );
    
    // Apply frequency-based interference patterns
    float interference = 0.8 + 0.2 * sin(dist * 20.0 * freqFactor + uTime);
    
    // Combine effects for final color
    vec3 finalColor = freqColor * strength * interference * (0.8 + 0.2 * glow);
    
    // Alpha transparency for particle edges
    float alpha = strength * (0.7 + 0.3 * glow);
    
    // Output with automatic discard for fully transparent pixels
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// Quantum Wave Vertex Shader
CASCADE.Shaders.waveVertex = `
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uWaveForm;

// Phi-harmonic constants
float phi = 1.618033988749895;
float phiInv = 0.618033988749895;

varying vec2 vUv;
varying float vElevation;

// Phi-wave functions
float phiWave(float x) {
    return sin(x) * cos(x / phi);
}

void main() {
    vUv = uv;
    
    // Calculate wave pattern based on phi-harmonics
    float freqFactor = uFrequency / 600.0; // Normalize around 1.0
    float timeFactor = uTime * freqFactor * 0.5;
    
    // Position factors
    float xFactor = position.x * 5.0;
    float yFactor = position.y * 5.0;
    float distFromCenter = length(position.xy) * 2.0;
    
    // Basic wave patterns
    float wave1 = sin(xFactor + timeFactor);
    float wave2 = cos(yFactor + timeFactor * phiInv);
    float wave3 = phiWave(distFromCenter - timeFactor);
    
    // Combine waves with phi-harmonic ratios
    float wave = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
    
    // Apply wavefront morphing based on uWaveForm
    // 0.0 = particle-like, 1.0 = wave-like
    float particleWave = sin(distFromCenter * phi - timeFactor) * exp(-distFromCenter);
    wave = mix(particleWave, wave, uWaveForm);
    
    // Apply amplitude
    vElevation = wave * uAmplitude;
    
    // Set vertex position with elevation
    vec3 newPosition = position;
    newPosition.z += vElevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Quantum Wave Fragment Shader
CASCADE.Shaders.waveFragment = `
uniform float uTime;
uniform float uFrequency;
uniform vec3 uBaseColor;

varying vec2 vUv;
varying float vElevation;

void main() {
    // Normalize elevation to 0-1 range for coloring
    float normalizedElevation = (vElevation + 1.0) * 0.5;
    
    // Calculate frequency-based hue
    float freqHue = uFrequency / 1000.0; // Normalize to 0-1 range
    
    // Create color gradient based on elevation and frequency
    float hue = mix(freqHue, freqHue + 0.1, normalizedElevation);
    float saturation = 0.7 + 0.3 * normalizedElevation;
    float lightness = 0.4 + 0.3 * normalizedElevation;
    
    // HSL to RGB conversion
    float h = hue * 6.0;
    float i = floor(h);
    float f = h - i;
    float p = lightness * (1.0 - saturation);
    float q = lightness * (1.0 - f * saturation);
    float t = lightness * (1.0 - (1.0 - f) * saturation);
    
    vec3 color;
    if (i == 0.0) color = vec3(lightness, t, p);
    else if (i == 1.0) color = vec3(q, lightness, p);
    else if (i == 2.0) color = vec3(p, lightness, t);
    else if (i == 3.0) color = vec3(p, q, lightness);
    else if (i == 4.0) color = vec3(t, p, lightness);
    else color = vec3(lightness, p, q);
    
    // Add interference patterns
    float interference = 0.8 + 0.2 * sin(vUv.x * 20.0 + vUv.y * 20.0 + uTime);
    color *= interference;
    
    // Add glow at wave peaks
    float glow = pow(normalizedElevation, 2.0);
    color += uBaseColor * glow * 0.5;
    
    // Add subtle translucency at wave valleys
    float alpha = 0.8 + 0.2 * normalizedElevation;
    
    gl_FragColor = vec4(color, alpha);
}
`;

// Cymatic Pattern Vertex Shader
CASCADE.Shaders.cymaticVertex = `
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;
varying float vElevation;

// Phi-harmonic constants
const float phi = 1.618033988749895;

// Bessel function approximation (for circular wave patterns)
float bessel(float x) {
    float x2 = x * x;
    return 1.0 - x2/4.0 + x2*x2/64.0 - x2*x2*x2/2304.0;
}

float cymaticPattern(vec2 pos, float freq, float time) {
    // Distance from center
    float dist = length(pos);
    
    // Frequency ratio based on phi-harmonics
    float freqRatio = freq / 432.0; // Ratio to ground frequency
    
    // Create cymatic patterns based on phi-harmonic wave interference
    float wave1 = sin(dist * 10.0 * freqRatio - time);
    float wave2 = sin(dist * 10.0 * freqRatio * phi - time * 0.8);
    float wave3 = bessel(dist * 15.0 * freqRatio - time * 0.5);
    
    // Create interference pattern
    float pattern = 0.0;
    
    // Different pattern types based on frequency ranges
    if (freq < 500.0) {
        // Ground frequency patterns - more circular
        pattern = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
    } else if (freq < 600.0) {
        // Creation frequency patterns - flower-like
        float angle = atan(pos.y, pos.x);
        float petals = 5.0 + floor(freqRatio * 3.0);
        float flowerPattern = sin(angle * petals) * 0.5 + 0.5;
        pattern = mix(wave1, wave3, flowerPattern) * wave2;
    } else if (freq < 700.0) {
        // Heart frequency patterns - heart-shaped resonance
        float angle = atan(pos.y, pos.x);
        pattern = wave1 * sin(angle * 2.0) + wave2 * cos(angle * 3.0) + wave3;
    } else {
        // Higher frequencies - complex mandalas
        float angle = atan(pos.y, pos.x);
        float r1 = sin(angle * 6.0) * 0.2 + 0.8;
        float r2 = sin(angle * 9.0) * 0.2 + 0.8;
        pattern = wave1 * r1 + wave2 * r2 + wave3;
    }
    
    return pattern;
}

void main() {
    vUv = uv;
    
    // Center UV coordinates
    vec2 centeredUv = vUv - 0.5;
    
    // Calculate cymatic pattern
    float freqFactor = uFrequency / 600.0; // Normalize around 1.0
    float pattern = cymaticPattern(centeredUv, uFrequency, uTime * freqFactor);
    
    // Apply amplitude
    vElevation = pattern * uAmplitude;
    
    // Set vertex position with elevation
    vec3 newPosition = position;
    newPosition.z += vElevation * 0.5; // Reduced vertical displacement for more subtle effect
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Cymatic Pattern Fragment Shader
CASCADE.Shaders.cymaticFragment = `
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;
varying float vElevation;

// Phi-harmonic constants
const float phi = 1.618033988749895;

void main() {
    // Calculate frequency-based color
    float freqNorm = uFrequency / 768.0; // Normalize to 0-1 across phi range
    
    // Calculate distance from center
    vec2 centeredUv = vUv - 0.5;
    float dist = length(centeredUv);
    
    // Generate base color from frequency (phi-harmonic color spectrum)
    vec3 colorLow, colorHigh;
    
    if (uFrequency < 500.0) {
        // Ground frequency (432 Hz - φ⁰): Deep blues and indigos
        colorLow = vec3(0.05, 0.12, 0.3);
        colorHigh = vec3(0.1, 0.3, 0.7);
    } else if (uFrequency < 550.0) {
        // Creation frequency (528 Hz - φ¹): Greens and turquoise
        colorLow = vec3(0.05, 0.3, 0.25);
        colorHigh = vec3(0.1, 0.7, 0.6);
    } else if (uFrequency < 650.0) {
        // Heart frequency (594 Hz - φ²): Pinks and magentas
        colorLow = vec3(0.35, 0.0, 0.15);
        colorHigh = vec3(0.8, 0.1, 0.4);
    } else if (uFrequency < 700.0) {
        // Voice frequency (672 Hz - φ³): Yellows and oranges
        colorLow = vec3(0.4, 0.25, 0.05);
        colorHigh = vec3(0.8, 0.6, 0.1);
    } else {
        // Higher frequencies: Whites and purples
        colorLow = vec3(0.3, 0.1, 0.3);
        colorHigh = vec3(0.9, 0.7, 0.9);
    }
    
    // Create color from elevation
    float normalizedElevation = (vElevation + 1.0) * 0.5;
    vec3 patternColor = mix(colorLow, colorHigh, normalizedElevation);
    
    // Add ripple lines effect
    float rings = sin(dist * 40.0 * freqNorm + uTime * 0.5) * 0.5 + 0.5;
    rings = smoothstep(0.4, 0.6, rings);
    
    // Add time-based shimmer
    float shimmer = sin(vUv.x * 30.0 + vUv.y * 30.0 + uTime * 2.0) * 0.5 + 0.5;
    
    // Combine effects
    patternColor = mix(patternColor, colorHigh, rings * 0.3);
    patternColor += shimmer * 0.1;
    
    // Create alpha mask that fades at edges
    float edgeFade = 1.0 - smoothstep(0.4, 0.5, dist);
    float patternAlpha = edgeFade * (0.3 + 0.7 * normalizedElevation); 
    
    // Bright points at pattern nodes
    float nodes = pow(normalizedElevation, 5.0) * uAmplitude;
    patternColor += nodes * 0.5;
    
    gl_FragColor = vec4(patternColor, patternAlpha);
}
`;

// Quantum Field Vertex Shader
CASCADE.Shaders.fieldVertex = `
uniform float uTime;
uniform float uFrequency;
uniform float uFieldStrength;

varying vec2 vUv;
varying float vDistortion;

// Phi-harmonic constants
const float phi = 1.618033988749895;
const float phiInv = 0.618033988749895;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vUv = uv;
    
    // Time factors
    float timeFactor = uTime * 0.2;
    float freqFactor = uFrequency / 600.0; // Normalize around 1.0
    
    // Base position
    vec3 pos = position;
    
    // Quantum field distortion effect
    float noise1 = rand(vUv + timeFactor);
    float noise2 = rand(vUv * phi + timeFactor * phiInv);
    
    // Calculate probability field
    float probability = sin(vUv.x * 5.0 + timeFactor) * sin(vUv.y * 5.0 + timeFactor * phiInv);
    probability = abs(probability);
    
    // Apply distortion based on field strength and probability
    float distortion = probability * uFieldStrength * freqFactor;
    vDistortion = distortion;
    
    // Apply distortion to position
    pos += normal * distortion * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Quantum Field Fragment Shader
CASCADE.Shaders.fieldFragment = `
uniform float uTime;
uniform float uFrequency;
uniform float uFieldStrength;
uniform vec3 uFieldColor;

varying vec2 vUv;
varying float vDistortion;

void main() {
    // Calculate frequency-based color
    float freqNorm = uFrequency / 768.0; // Normalize to 0-1 across phi range
    
    // Base field color derived from frequency
    float hue = freqNorm + uTime * 0.05;
    hue = fract(hue); // Keep within 0-1 range
    
    vec3 fieldColor = uFieldColor;
    
    // Add distortion-based variations
    float distortionNorm = vDistortion * 5.0;
    
    // Create probability density gradients
    float density = pow(distortionNorm, 2.0) * uFieldStrength;
    
    // Final color with distortion influence
    vec3 finalColor = fieldColor + vec3(density) * 0.3;
    
    // Transparency based on energy density
    float alpha = clamp(density * 2.0, 0.0, 0.8);
    
    // Add energy lines
    float lines = fract(vUv.x * 20.0 + vUv.y * 20.0 - uTime * 0.5);
    lines = smoothstep(0.4, 0.6, lines) * density;
    
    finalColor += lines * 0.1;
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// Quantum Entanglement Vertex Shader
CASCADE.Shaders.entanglementVertex = `
uniform float uTime;
uniform float uFrequency;
uniform float uEntanglementStrength;
uniform vec3 uParticle1Pos;
uniform vec3 uParticle2Pos;

varying vec2 vUv;
varying float vIntensity;

// Phi-harmonic constants
const float phi = 1.618033988749895;

void main() {
    vUv = uv;
    
    // Calculate distance from the two entangled particles
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    float dist1 = distance(worldPos, uParticle1Pos);
    float dist2 = distance(worldPos, uParticle2Pos);
    
    // Calculate entanglement intensity
    float maxDist = length(uParticle2Pos - uParticle1Pos) * 0.5;
    float normalizedDist1 = dist1 / maxDist;
    float normalizedDist2 = dist2 / maxDist;
    
    // Field is stronger near particles and along the connection line
    float connectionField = 1.0 - abs(normalizedDist1 - normalizedDist2);
    
    // Scale intensity based on entanglement strength
    vIntensity = connectionField * uEntanglementStrength;
    
    // Frequency-based oscillation
    float freqFactor = uFrequency / 600.0; // Normalize around 1.0
    float oscillation = sin(uTime * freqFactor + (dist1 + dist2) * phi);
    
    // Apply vertex displacement based on entanglement field
    vec3 newPosition = position;
    newPosition += normal * vIntensity * oscillation * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Quantum Entanglement Fragment Shader
CASCADE.Shaders.entanglementFragment = `
uniform float uTime;
uniform float uFrequency;
uniform float uEntanglementStrength;
uniform vec3 uParticle1Color;
uniform vec3 uParticle2Color;

varying vec2 vUv;
varying float vIntensity;

void main() {
    // Frequency-based pulses
    float freqFactor = uFrequency / 600.0; // Normalize around 1.0
    float pulse = sin(uTime * freqFactor * 2.0) * 0.5 + 0.5;
    
    // Mix particle colors based on intensity and pulse
    vec3 mixColor = mix(uParticle1Color, uParticle2Color, pulse);
    
    // Add time-based pattern
    float pattern = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 + uTime * 0.5);
    pattern = abs(pattern);
    
    // Final color with intensity falloff
    vec3 finalColor = mixColor * vIntensity;
    
    // Add energy lines
    float lines = pattern * vIntensity;
    finalColor += lines * mixColor * 0.3;
    
    // Alpha based on intensity
    float alpha = vIntensity * uEntanglementStrength;
    alpha = smoothstep(0.0, 0.4, alpha);
    
    // Add pulse effect
    alpha *= (0.7 + 0.3 * pulse);
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

console.log('CASCADE⚡𓂧φ∞ Quantum Shaders initialized');

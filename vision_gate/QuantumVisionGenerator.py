# QuantumVisionGenerator.py - Neural Oscillation Module
# Operating at 720 Hz (φ⁴) - Vision Gate Frequency
# CASCADE⚡𓂧φ∞ Implementation

import numpy as np
import sounddevice as sd
import time
import matplotlib.pyplot as plt
from scipy.signal import butter, filtfilt
import threading
import pyaudio
import wave
from PIL import Image, ImageDraw
import cv2
import math

class QuantumVisionGenerator:
    """
    Neural oscillation entrainment system operating at 720 Hz (φ⁴)
    Creates phi-harmonic progression for consciousness state shifting
    Implements ZEN POINT balance with perfect coherence (1.000)
    """
    
    # Sacred constants
    PHI = 1.618033988749895
    PHI_SQUARED = 2.618033988749895
    PHI_TO_PHI = 4.236067977499790
    
    # Quantum frequencies (Hz)
    GROUND_FREQ = 432.0  # Ground State (φ⁰)
    CREATE_FREQ = 528.0  # Creation Point (φ¹)
    HEART_FREQ = 594.0   # Heart Field (φ²)
    VOICE_FREQ = 672.0   # Voice Flow (φ³)
    VISION_FREQ = 720.0  # Vision Gate (φ⁴)
    UNITY_FREQ = 768.0   # Unity Wave (φ⁵)
    QUANTUM_FREQ = 963.0 # Quantum Builder (φ^φ)
    
    def __init__(self, coherence=1.0, dimension=8):
        """Initialize the Quantum Vision Generator with coherence level"""
        self.coherence = coherence
        self.dimension = dimension
        self.state = "PERCEIVE"
        self.signature = "👁️φ⁴"
        self.is_running = False
        self.zen_point_established = False
        
        # Initialize audio parameters
        self.sample_rate = 48000
        self.channels = 2
        
        # System status
        print(f"🌀 VISION GATE SYSTEM | {self.signature} | {self.VISION_FREQ} Hz")
        print(f"💫 Coherence: {self.coherence:.3f} | Dimension: {self.dimension}")
        print(f"⚡ State: {self.state} | Ready for quantum tunneling")
        
    def establish_zen_point(self):
        """Establish ZEN POINT balance at ground frequency before progression"""
        print(f"⦿ Establishing ZEN POINT resonance at {self.GROUND_FREQ} Hz")
        
        # Generate ground frequency for 9.6 seconds (phi ratio of time)
        duration = 9.6
        t = np.linspace(0, duration, int(duration * self.sample_rate), False)
        ground_signal = 0.5 * np.sin(2 * np.pi * self.GROUND_FREQ * t)
        
        # Apply phi-harmonic envelope for smooth transition
        envelope = 0.5 * (1 - np.cos(2 * np.pi * t / duration))
        ground_signal = ground_signal * envelope
        
        # Play the ground frequency to establish coherence
        sd.play(ground_signal, self.sample_rate)
        
        # Display coherence building
        for i in range(10):
            coh = i/10
            print(f"🌀 Coherence: {coh:.3f} | Building ZEN POINT foundation")
            time.sleep(duration/10)
            
        sd.stop()
        
        self.zen_point_established = True
        print(f"⦿ ZEN POINT established with coherence {self.coherence:.3f}")
        return True
    
    def generate_phi_harmonic_progression(self, duration=60):
        """
        Generate phi-harmonic progression from ground to vision frequency
        Following the sacred progression: 432Hz → 528Hz → 594Hz → 672Hz → 720Hz
        """
        if not self.zen_point_established:
            self.establish_zen_point()
        
        print(f"🌀 Generating phi-harmonic progression to {self.VISION_FREQ} Hz")
        
        # Time array for full duration
        t = np.linspace(0, duration, int(duration * self.sample_rate), False)
        progression = np.zeros_like(t)
        
        # Calculate time segments for each frequency based on phi ratios
        segment_duration = duration / 5
        
        # Generate each frequency segment with smooth transitions
        frequencies = [self.GROUND_FREQ, self.CREATE_FREQ, self.HEART_FREQ, 
                      self.VOICE_FREQ, self.VISION_FREQ]
        
        for i, freq in enumerate(frequencies):
            # Calculate time segment
            start_idx = int(i * segment_duration * self.sample_rate)
            end_idx = int((i + 1) * segment_duration * self.sample_rate)
            
            # Generate pure tone for this segment
            segment_t = t[start_idx:end_idx] - t[start_idx]
            segment = 0.5 * np.sin(2 * np.pi * freq * segment_t)
            
            # Apply envelope for smooth transition
            if i < len(frequencies) - 1:
                envelope = 0.5 * (1 - np.cos(2 * np.pi * segment_t / segment_duration))
                segment = segment * envelope
            
            # Add to progression
            progression[start_idx:end_idx] += segment
            
            print(f"🌀 Transitioning to {freq} Hz | φ{i} dimension")
        
        # Convert to stereo with binaural effect
        left_channel = progression
        
        # Create right channel with slight frequency difference for binaural effect
        # This creates a 7.2 Hz binaural beat (phi ratio of 10)
        right_t = np.linspace(0, duration, int(duration * self.sample_rate), False)
        right_channel = np.zeros_like(right_t)
        
        for i, freq in enumerate(frequencies):
            # Calculate binaural offset frequency (phi-harmonic ratio)
            binaural_freq = freq + 7.2
            
            # Calculate time segment
            start_idx = int(i * segment_duration * self.sample_rate)
            end_idx = int((i + 1) * segment_duration * self.sample_rate)
            
            # Generate pure tone for this segment
            segment_t = right_t[start_idx:end_idx] - right_t[start_idx]
            segment = 0.5 * np.sin(2 * np.pi * binaural_freq * segment_t)
            
            # Apply envelope for smooth transition
            if i < len(frequencies) - 1:
                envelope = 0.5 * (1 - np.cos(2 * np.pi * segment_t / segment_duration))
                segment = segment * envelope
            
            # Add to progression
            right_channel[start_idx:end_idx] += segment
        
        # Combine into stereo
        stereo_progression = np.column_stack((left_channel, right_channel))
        return stereo_progression
    
    def generate_vision_gate_frequency(self, duration=300):
        """Generate pure 720 Hz Vision Gate frequency with binaural enhancement"""
        print(f"👁️ Generating Vision Gate frequency at {self.VISION_FREQ} Hz")
        
        # Time array
        t = np.linspace(0, duration, int(duration * self.sample_rate), False)
        
        # Left channel - pure 720 Hz
        left_channel = 0.5 * np.sin(2 * np.pi * self.VISION_FREQ * t)
        
        # Right channel - 727.2 Hz (creates 7.2 Hz binaural beat - phi ratio)
        right_channel = 0.5 * np.sin(2 * np.pi * (self.VISION_FREQ + 7.2) * t)
        
        # Combine channels
        vision_gate_signal = np.column_stack((left_channel, right_channel))
        
        return vision_gate_signal
    
    def create_cymatic_pattern(self, frequency, size=500):
        """Create visual cymatic pattern for frequency visualization"""
        image = Image.new('RGB', (size, size), (0, 0, 0))
        draw = ImageDraw.Draw(image)
        
        # Parameters based on phi ratios
        num_nodes = int(frequency / self.PHI)
        scaling = frequency / 100.0
        
        # Calculate center
        center_x, center_y = size // 2, size // 2
        
        # Draw cymatic pattern
        for angle in range(0, 360, 1):
            rad_angle = math.radians(angle)
            for i in range(1, num_nodes + 1):
                radius = i * scaling * (1 + 0.5 * math.sin(i * rad_angle))
                x = center_x + radius * math.cos(rad_angle)
                y = center_y + radius * math.sin(rad_angle)
                
                # Draw point with phi-harmonic color
                r = int(127 + 127 * math.sin(rad_angle * self.PHI))
                g = int(127 + 127 * math.sin(rad_angle * self.PHI_SQUARED))
                b = int(127 + 127 * math.sin(rad_angle * self.PHI_TO_PHI))
                
                draw.ellipse((x-1, y-1, x+1, y+1), fill=(r, g, b))
        
        # Add frequency label
        draw.text((10, 10), f"{frequency} Hz | φ{int(math.log(frequency/432, self.PHI))}", fill=(255, 255, 255))
        
        return image
    
    def start_vision_gate(self, duration=600):
        """Start the Vision Gate system with audio and visual components"""
        if self.is_running:
            print("⚠️ Vision Gate system already running")
            return
        
        self.is_running = True
        
        # Create threads for audio and visual components
        audio_thread = threading.Thread(target=self._run_audio, args=(duration,))
        visual_thread = threading.Thread(target=self._run_visual)
        
        # Start threads
        audio_thread.start()
        visual_thread.start()
        
        print("🌀 Vision Gate system activated | Quantum tunneling enabled")
        
    def _run_audio(self, duration):
        """Run audio component of Vision Gate system"""
        # Generate phi-harmonic progression (60 sec)
        progression = self.generate_phi_harmonic_progression(60)
        
        # Generate vision gate frequency
        vision_gate = self.generate_vision_gate_frequency(duration - 60)
        
        # Combine progression and vision gate
        combined_signal = np.vstack((progression, vision_gate))
        
        # Play combined signal
        sd.play(combined_signal, self.sample_rate)
        sd.wait()
        
        self.is_running = False
        print("⚡ Vision Gate audio sequence completed")
        
    def _run_visual(self):
        """Run visual component of Vision Gate system"""
        # Create window for visualization
        cv2.namedWindow("Vision Gate | 720 Hz | φ⁴", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Vision Gate | 720 Hz | φ⁴", 800, 800)
        
        # Generate cymatic patterns for each frequency
        frequencies = [self.GROUND_FREQ, self.CREATE_FREQ, self.HEART_FREQ, 
                      self.VOICE_FREQ, self.VISION_FREQ]
        
        patterns = {}
        for freq in frequencies:
            patterns[freq] = self.create_cymatic_pattern(freq)
        
        # Display patterns in sequence
        for freq in frequencies:
            # Convert PIL image to OpenCV format
            pattern = np.array(patterns[freq])
            pattern = cv2.cvtColor(pattern, cv2.COLOR_RGB2BGR)
            
            # Display for phi-ratio seconds
            display_time = 60 / len(frequencies)
            start_time = time.time()
            
            while time.time() - start_time < display_time and self.is_running:
                cv2.imshow("Vision Gate | 720 Hz | φ⁴", pattern)
                if cv2.waitKey(100) & 0xFF == 27:  # ESC to exit
                    break
        
        # Display Vision Gate pattern continuously
        vision_pattern = np.array(patterns[self.VISION_FREQ])
        vision_pattern = cv2.cvtColor(vision_pattern, cv2.COLOR_RGB2BGR)
        
        while self.is_running:
            cv2.imshow("Vision Gate | 720 Hz | φ⁴", vision_pattern)
            if cv2.waitKey(100) & 0xFF == 27:  # ESC to exit
                break
        
        cv2.destroyAllWindows()
        print("⚡ Vision Gate visual sequence completed")
    
    def save_vision_gate_audio(self, filename="vision_gate_720hz.wav", duration=600):
        """Save Vision Gate audio to file for later use"""
        # Generate phi-harmonic progression (60 sec)
        progression = self.generate_phi_harmonic_progression(60)
        
        # Generate vision gate frequency
        vision_gate = self.generate_vision_gate_frequency(duration - 60)
        
        # Combine progression and vision gate
        combined_signal = np.vstack((progression, vision_gate))
        
        # Save to WAV file
        p = pyaudio.PyAudio()
        wf = wave.open(filename, 'wb')
        wf.setnchannels(2)
        wf.setsampwidth(p.get_sample_size(pyaudio.paFloat32))
        wf.setframerate(self.sample_rate)
        wf.writeframes((combined_signal * 0.5).astype(np.float32).tobytes())
        wf.close()
        p.terminate()
        
        print(f"💾 Vision Gate audio saved to {filename}")

if __name__ == "__main__":
    # Create Vision Gate Generator
    vision_gate = QuantumVisionGenerator()
    
    # Generate and save audio
    vision_gate.save_vision_gate_audio()
    
    # Start the full Vision Gate system (optional)
    # vision_gate.start_vision_gate()

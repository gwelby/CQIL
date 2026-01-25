#!/usr/bin/env python3
"""
Cymatic Pattern Visualizer (Σ^Σ)
Operating at Sigma^Sigma frequency (887 Hz)

This module implements the Cymatic Pattern Visualizer for the Quantum Universal Publisher,
creating real-time frequency visualizations of deployment states.
"""
import os
import sys
import math
import json
import base64
import colorsys
from datetime import datetime
from io import BytesIO
try:
    import numpy as np
    from PIL import Image, ImageDraw
    VISUALIZATION_AVAILABLE = True
except ImportError:
    VISUALIZATION_AVAILABLE = False

# Phi-harmonic constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI  # φ^φ ≈ 11.09

# Frequency constant
VISUALIZATION_FREQUENCY = 887  # Σ^Σ frequency

class CymaticVisualizer:
    """Creates visualizations of deployment frequencies through cymatic patterns"""
    
    def __init__(self, size=(800, 800), frequency=432, quality=95):
        """
        Initialize the cymatic visualizer
        
        Args:
            size: Output image size as (width, height) tuple
            frequency: Base frequency in Hz
            quality: Image quality (1-100)
        """
        if not VISUALIZATION_AVAILABLE:
            raise ImportError("Visualization requires PIL and numpy. Install with: pip install pillow numpy")
            
        self.phi = PHI
        self.size = size
        self.base_frequency = frequency
        self.quality = quality
        self.log_prefix = "◎ CYMATIC"
        
        # Initialize pattern cache
        self.pattern_cache = {}
        
        # Initialize color mappings
        self.frequency_colors = {
            432: (44, 95, 166),   # Ground State - Blue
            528: (50, 168, 82),   # Creation - Green
            594: (217, 72, 72),   # Heart - Red
            672: (212, 97, 166),  # Voice - Purple
            720: (64, 122, 216),  # Vision - Azure
            768: (236, 185, 57),  # Unity - Gold
            887: (180, 70, 215),  # Sigma^Sigma - Violet
            963: (245, 245, 245)  # Phi^Phi - Bright White
        }
        
        self.log(f"Initialized Cymatic Visualizer at {VISUALIZATION_FREQUENCY} Hz")
        self.log(f"Base frequency: {self.base_frequency} Hz")
        self.log(f"Output size: {self.size[0]}x{self.size[1]}")
    
    def log(self, message, level="INFO"):
        """Log visualizer messages"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"{timestamp} - {self.log_prefix} [{level}] {message}")
    
    def visualize_frequency(self, frequency, coherence=1.0, pattern_type="harmonic"):
        """
        Create cymatic visualization for a specific frequency
        
        Args:
            frequency: Frequency in Hz to visualize
            coherence: Coherence level (0.0-1.0)
            pattern_type: Pattern algorithm to use ("harmonic", "wave", "phi", "fibonacci", "flower")
            
        Returns:
            Base64 encoded PNG image
        """
        self.log(f"Generating cymatic pattern for {frequency} Hz (coherence: {coherence:.2f})")
        
        # Check cache first
        cache_key = f"{frequency}_{coherence}_{pattern_type}_{self.size[0]}x{self.size[1]}"
        if cache_key in self.pattern_cache:
            self.log(f"Using cached pattern for {frequency} Hz")
            return self.pattern_cache[cache_key]
        
        # Create appropriate pattern based on type
        if pattern_type == "harmonic":
            image = self._generate_harmonic_pattern(frequency, coherence)
        elif pattern_type == "wave":
            image = self._generate_wave_pattern(frequency, coherence)
        elif pattern_type == "phi":
            image = self._generate_phi_pattern(frequency, coherence)
        elif pattern_type == "fibonacci":
            image = self._generate_fibonacci_pattern(frequency, coherence)
        elif pattern_type == "flower":
            image = self._generate_flower_pattern(frequency, coherence)
        else:
            # Default to harmonic
            image = self._generate_harmonic_pattern(frequency, coherence)
        
        # Convert to base64
        buffer = BytesIO()
        image.save(buffer, format="PNG", quality=self.quality)
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        # Cache the result
        self.pattern_cache[cache_key] = img_str
        
        self.log(f"Generated cymatic pattern for {frequency} Hz (size: {len(img_str)} bytes)")
        return img_str
    
    def visualize_deployment_state(self, deployment_state, output_path=None):
        """
        Create comprehensive visualization of deployment state
        
        Args:
            deployment_state: Dictionary with deployment state information
            output_path: Optional path to save the visualization
            
        Returns:
            Base64 encoded PNG image or saved file path
        """
        self.log(f"Generating deployment state visualization")
        
        # Extract deployment metrics
        frequency = deployment_state.get('frequency', 432)
        coherence = deployment_state.get('coherence', 0.96)
        platforms = deployment_state.get('platforms', [])
        tasks = deployment_state.get('tasks', [])
        
        # Create main visualization
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        
        # Generate primary cymatic pattern
        self._draw_cymatic_background(img, draw, frequency, coherence)
        
        # Draw platform nodes
        if platforms:
            self._draw_platform_nodes(img, draw, platforms, frequency, coherence)
        
        # Draw task progress
        if tasks:
            self._draw_task_progress(img, draw, tasks, frequency, coherence)
        
        # Draw coherence metrics
        self._draw_coherence_metrics(img, draw, coherence, frequency)
        
        # Draw frequency scale
        self._draw_frequency_scale(img, draw, frequency)
        
        # Save if output path is provided
        if output_path:
            img.save(output_path, "PNG", quality=self.quality)
            self.log(f"Saved deployment visualization to {output_path}")
            return output_path
        
        # Convert to base64
        buffer = BytesIO()
        img.save(buffer, format="PNG", quality=self.quality)
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        self.log(f"Generated deployment visualization (size: {len(img_str)} bytes)")
        return img_str
    
    def visualize_coherence_field(self, coherence_data, output_path=None):
        """
        Visualize coherence field across dimensions
        
        Args:
            coherence_data: Dictionary with coherence values for different dimensions
            output_path: Optional path to save the visualization
            
        Returns:
            Base64 encoded PNG image or saved file path
        """
        self.log(f"Generating coherence field visualization")
        
        # Create image
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        
        # Draw phi-harmonic field background
        self._draw_phi_field_background(img, draw)
        
        # Extract coherence values for each dimension
        dimensions = {
            'foundation': coherence_data.get('foundation', 0.96),
            'creation': coherence_data.get('creation', 0.96),
            'integration': coherence_data.get('integration', 0.96),
            'expression': coherence_data.get('expression', 0.96),
            'vision': coherence_data.get('vision', 0.96),
            'unity': coherence_data.get('unity', 0.96),
            'cosmic': coherence_data.get('cosmic', 0.96)
        }
        
        # Map dimensions to frequencies
        frequency_map = {
            'foundation': 432,
            'creation': 528,
            'integration': 594,
            'expression': 672,
            'vision': 720,
            'unity': 768,
            'cosmic': 963
        }
        
        # Draw coherence field
        self._draw_dimensional_coherence(img, draw, dimensions, frequency_map)
        
        # Draw overall coherence metric
        overall_coherence = sum(dimensions.values()) / len(dimensions)
        self._draw_overall_coherence(img, draw, overall_coherence)
        
        # Save if output path is provided
        if output_path:
            img.save(output_path, "PNG", quality=self.quality)
            self.log(f"Saved coherence field visualization to {output_path}")
            return output_path
        
        # Convert to base64
        buffer = BytesIO()
        img.save(buffer, format="PNG", quality=self.quality)
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        self.log(f"Generated coherence field visualization (size: {len(img_str)} bytes)")
        return img_str
    
    def _generate_harmonic_pattern(self, frequency, coherence):
        """Generate harmonic interference pattern"""
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        
        # Normalize frequency to workable range
        norm_freq = frequency / self.base_frequency
        
        # Create pixel array
        pixels = np.zeros((height, width, 4), dtype=np.uint8)
        
        # Calculate center of image
        center_x, center_y = width // 2, height // 2
        
        # Get color for this frequency (or interpolate)
        color = self._get_frequency_color(frequency)
        
        # Scale factor based on frequency
        scale = 0.01 * norm_freq * coherence
        
        # Generate harmonic interference pattern
        for y in range(height):
            for x in range(width):
                # Calculate distance from center
                dx, dy = x - center_x, y - center_y
                distance = math.sqrt(dx*dx + dy*dy)
                
                # Calculate angle
                angle = math.atan2(dy, dx)
                
                # Generate interference pattern
                val = 0
                
                # Add multiple wave sources
                for i in range(1, int(4 * coherence) + 2):
                    # Phi-based amplitude
                    amplitude = 128 * math.pow(self.phi_reciprocal, i-1) * coherence
                    
                    # Create harmonic waves with phi-based frequency ratios
                    freq_factor = 1 + (i-1) * self.phi_reciprocal
                    wave = math.sin(distance * scale * freq_factor + angle * i)
                    val += wave * amplitude
                
                # Normalize value
                val = max(0, min(255, 128 + val))
                
                # Apply color
                alpha = int(val * coherence)
                if alpha < 20:  # Threshold for transparency
                    alpha = 0
                    
                pixels[y, x, 0] = int(color[0] * val / 255)  # R
                pixels[y, x, 1] = int(color[1] * val / 255)  # G
                pixels[y, x, 2] = int(color[2] * val / 255)  # B
                pixels[y, x, 3] = alpha
        
        # Create image from pixel array
        img = Image.fromarray(pixels, 'RGBA')
        return img
    
    def _generate_wave_pattern(self, frequency, coherence):
        """Generate wave interference pattern"""
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        
        # Normalize frequency to workable range
        norm_freq = frequency / self.base_frequency
        
        # Create pixel array
        pixels = np.zeros((height, width, 4), dtype=np.uint8)
        
        # Get color for this frequency
        color = self._get_frequency_color(frequency)
        
        # Define wave sources (phi-harmonic placement)
        sources = []
        num_sources = max(3, int(5 * coherence))
        
        # Place sources in phi-harmonic positions
        for i in range(num_sources):
            angle = 2 * math.pi * self.phi_reciprocal * i
            radius = width * 0.45 * self.phi_reciprocal
            x = int(width/2 + radius * math.cos(angle))
            y = int(height/2 + radius * math.sin(angle))
            sources.append((x, y))
        
        # Generate wave pattern
        for y in range(height):
            for x in range(width):
                val = 0
                for sx, sy in sources:
                    # Calculate distance from source
                    dx, dy = x - sx, y - sy
                    distance = math.sqrt(dx*dx + dy*dy)
                    
                    # Create wave with phi-based wavelength
                    wavelength = width / (10 * norm_freq)
                    wave = math.sin(distance / wavelength * math.pi * 2)
                    
                    # Apply inverse-square falloff
                    intensity = 1.0 / (1.0 + distance / (width * coherence / 3))
                    val += wave * intensity
                
                # Scale and normalize
                val = val / num_sources
                val = 128 + 127 * val * coherence
                val = max(0, min(255, val))
                
                # Apply color
                alpha = int(val * coherence)
                if alpha < 20:  # Threshold for transparency
                    alpha = 0
                    
                pixels[y, x, 0] = int(color[0] * val / 255)  # R
                pixels[y, x, 1] = int(color[1] * val / 255)  # G
                pixels[y, x, 2] = int(color[2] * val / 255)  # B
                pixels[y, x, 3] = alpha
        
        # Create image from pixel array
        img = Image.fromarray(pixels, 'RGBA')
        return img
    
    def _generate_phi_pattern(self, frequency, coherence):
        """Generate phi-based spiral pattern"""
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        
        # Normalize frequency
        norm_freq = frequency / self.base_frequency
        
        # Center of image
        center_x, center_y = width // 2, height // 2
        
        # Get color for this frequency
        color = self._get_frequency_color(frequency)
        
        # Create phi spiral
        max_radius = min(width, height) * 0.45
        theta_increment = 0.1 / norm_freq
        theta = 0
        points = []
        
        while True:
            # Phi-based spiral formula
            radius = 5 * theta ** self.phi_reciprocal
            if radius > max_radius:
                break
                
            x = center_x + radius * math.cos(theta * self.phi)
            y = center_y + radius * math.sin(theta * self.phi)
            points.append((x, y))
            theta += theta_increment
        
        # Apply coherence to intensity
        intensity = int(255 * coherence)
        spiral_color = (color[0], color[1], color[2], intensity)
        
        # Draw phi spiral with varying width
        if len(points) >= 2:
            for i in range(1, len(points)):
                # Varying width based on phi ratio
                width_factor = 1 + 5 * (i / len(points)) * coherence
                draw.line([points[i-1], points[i]], fill=spiral_color, width=int(width_factor))
        
        # Add harmonic nodes at phi intervals
        for i in range(int(len(points) * coherence / 5)):
            idx = int(i * self.phi * 10) % len(points)
            if idx < len(points):
                x, y = points[idx]
                size = int(10 * coherence)
                node_color = (color[0], color[1], color[2], intensity)
                draw.ellipse((x-size, y-size, x+size, y+size), fill=node_color)
        
        return img
    
    def _generate_fibonacci_pattern(self, frequency, coherence):
        """Generate Fibonacci-based pattern"""
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        
        # Get color for this frequency
        color = self._get_frequency_color(frequency)
        
        # Center of image
        center_x, center_y = width // 2, height // 2
        
        # Generate Fibonacci sequence
        fibonacci = [1, 1]
        while fibonacci[-1] < min(width, height) / 2:
            fibonacci.append(fibonacci[-1] + fibonacci[-2])
        
        # Scale factor based on frequency
        scale = min(width, height) / (fibonacci[-1] * 2.5)
        scale *= coherence
        
        # Apply coherence to intensity
        intensity = int(255 * coherence)
        fib_color = (color[0], color[1], color[2], intensity)
        
        # Draw Fibonacci spiral
        theta = 0
        for i in range(len(fibonacci) - 1):
            # Draw square
            size = fibonacci[i] * scale
            if i % 4 == 0:
                x, y = center_x, center_y
                draw.rectangle((x, y, x + size, y + size), outline=fib_color, width=max(1, int(3 * coherence)))
                # Update center for next square
                center_x, center_y = x + size, y
            elif i % 4 == 1:
                x, y = center_x, center_y - size
                draw.rectangle((x, y, x + size, y + size), outline=fib_color, width=max(1, int(3 * coherence)))
                # Update center for next square
                center_x, center_y = x, y
            elif i % 4 == 2:
                x, y = center_x - size, center_y - size
                draw.rectangle((x, y, x + size, y + size), outline=fib_color, width=max(1, int(3 * coherence)))
                # Update center for next square
                center_x, center_y = x, y + size
            else:  # i % 4 == 3
                x, y = center_x - size, center_y
                draw.rectangle((x, y, x + size, y + size), outline=fib_color, width=max(1, int(3 * coherence)))
                # Update center for next square
                center_x, center_y = x + size, y
            
            # Draw quarter circle
            arc_box = None
            start_angle, end_angle = 0, 0
            if i % 4 == 0:
                arc_box = (x, y, x + 2*size, y + 2*size)
                start_angle, end_angle = 180, 270
            elif i % 4 == 1:
                arc_box = (x - size, y, x + size, y + 2*size)
                start_angle, end_angle = 270, 0
            elif i % 4 == 2:
                arc_box = (x - size, y - size, x + size, y + size)
                start_angle, end_angle = 0, 90
            else:  # i % 4 == 3
                arc_box = (x, y - size, x + 2*size, y + size)
                start_angle, end_angle = 90, 180
            
            if arc_box:
                draw.arc(arc_box, start=start_angle, end=end_angle, fill=fib_color, width=max(1, int(3 * coherence)))
        
        return img
    
    def _generate_flower_pattern(self, frequency, coherence):
        """Generate flower of life pattern"""
        width, height = self.size
        img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        
        # Normalize frequency
        norm_freq = frequency / self.base_frequency
        
        # Center of image
        center_x, center_y = width // 2, height // 2
        
        # Get color for this frequency
        color = self._get_frequency_color(frequency)
        
        # Base radius for circles
        base_radius = min(width, height) * 0.05 * norm_freq * coherence
        
        # Apply coherence to intensity
        intensity = int(255 * coherence)
        circle_color = (color[0], color[1], color[2], intensity)
        
        # Draw central circle
        draw.ellipse((center_x - base_radius, center_y - base_radius, 
                      center_x + base_radius, center_y + base_radius), 
                     outline=circle_color, width=max(1, int(2 * coherence)))
        
        # Draw first ring (6 circles)
        for i in range(6):
            angle = 2 * math.pi * i / 6
            x = center_x + 2 * base_radius * math.cos(angle)
            y = center_y + 2 * base_radius * math.sin(angle)
            
            draw.ellipse((x - base_radius, y - base_radius, 
                          x + base_radius, y + base_radius), 
                         outline=circle_color, width=max(1, int(2 * coherence)))
            
            # Store center for second ring
            if i == 0:
                first_x, first_y = x, y
        
        # Draw second ring (additional 6 circles from the first outside circle)
        if coherence > 0.75:  # Only draw if coherence is high enough
            for i in range(6):
                angle = 2 * math.pi * i / 6
                x = first_x + 2 * base_radius * math.cos(angle)
                y = first_y + 2 * base_radius * math.sin(angle)
                
                # Don't draw if too far from center
                dist = math.sqrt((x - center_x)**2 + (y - center_y)**2)
                if dist < min(width, height) * 0.45:
                    draw.ellipse((x - base_radius, y - base_radius, 
                                x + base_radius, y + base_radius), 
                                outline=circle_color, width=max(1, int(2 * coherence)))
        
        # Add frequency marker at the center
        marker_size = base_radius * 0.3
        draw.ellipse((center_x - marker_size, center_y - marker_size,
                      center_x + marker_size, center_y + marker_size),
                     fill=circle_color)
        
        return img
    
    def _get_frequency_color(self, frequency):
        """Get color for a specific frequency (with interpolation)"""
        # Check if exact frequency exists in map
        if frequency in self.frequency_colors:
            return self.frequency_colors[frequency]
        
        # Find nearest frequencies
        frequencies = sorted(self.frequency_colors.keys())
        
        # If frequency is below minimum, use minimum
        if frequency <= frequencies[0]:
            return self.frequency_colors[frequencies[0]]
        
        # If frequency is above maximum, use maximum
        if frequency >= frequencies[-1]:
            return self.frequency_colors[frequencies[-1]]
        
        # Find surrounding frequencies
        for i in range(len(frequencies) - 1):
            if frequencies[i] <= frequency <= frequencies[i+1]:
                # Interpolate color
                low_freq = frequencies[i]
                high_freq = frequencies[i+1]
                ratio = (frequency - low_freq) / (high_freq - low_freq)
                
                low_color = self.frequency_colors[low_freq]
                high_color = self.frequency_colors[high_freq]
                
                # Linear interpolation
                r = int(low_color[0] + ratio * (high_color[0] - low_color[0]))
                g = int(low_color[1] + ratio * (high_color[1] - low_color[1]))
                b = int(low_color[2] + ratio * (high_color[2] - low_color[2]))
                
                return (r, g, b)
        
        # Default to unity frequency color
        return self.frequency_colors[768]
    
    def _draw_cymatic_background(self, img, draw, frequency, coherence):
        """Draw cymatic pattern as background"""
        # Generate appropriate pattern based on frequency
        if frequency < 500:
            pattern = self._generate_harmonic_pattern(frequency, coherence)
        elif frequency < 600:
            pattern = self._generate_wave_pattern(frequency, coherence)
        elif frequency < 700:
            pattern = self._generate_phi_pattern(frequency, coherence)
        elif frequency < 800:
            pattern = self._generate_fibonacci_pattern(frequency, coherence)
        else:
            pattern = self._generate_flower_pattern(frequency, coherence)
        
        # Paste pattern onto image
        img.paste(pattern, (0, 0), pattern)
    
    def _draw_platform_nodes(self, img, draw, platforms, frequency, coherence):
        """Draw platform nodes on visualization"""
        width, height = self.size
        center_x, center_y = width // 2, height // 2
        
        # Calculate base color
        base_color = self._get_frequency_color(frequency)
        
        # Platform node positions (phi-harmonic circle)
        num_platforms = len(platforms)
        radius = min(width, height) * 0.3
        
        for i, platform in enumerate(platforms):
            # Calculate phi-harmonic position
            angle = 2 * math.pi * i / num_platforms
            x = center_x + radius * math.cos(angle)
            y = center_y + radius * math.sin(angle)
            
            # Get platform status and coherence
            platform_name = platform.get('name', f"Platform {i+1}")
            platform_status = platform.get('status', 'unknown')
            platform_coherence = platform.get('coherence', coherence)
            
            # Choose color based on status
            if platform_status == 'success':
                color = (50, 168, 82, int(255 * platform_coherence))  # Green
            elif platform_status == 'pending':
                color = (236, 185, 57, int(255 * platform_coherence))  # Gold
            elif platform_status == 'error':
                color = (217, 72, 72, int(255 * platform_coherence))  # Red
            else:
                color = (128, 128, 128, int(255 * platform_coherence))  # Gray
            
            # Draw platform node
            node_size = int(20 * platform_coherence)
            draw.ellipse((x-node_size, y-node_size, x+node_size, y+node_size), fill=color)
            
            # Connect to center with line
            line_width = max(1, int(3 * platform_coherence))
            draw.line([(center_x, center_y), (x, y)], fill=color, width=line_width)
            
            # Add platform name
            font_size = int(12 * platform_coherence)
            # (Note: In a real implementation, you would use PIL's ImageFont)
            # For now, we'll draw a rectangle to represent text
            text_width = len(platform_name) * font_size * 0.6
            text_height = font_size * 1.2
            text_x = x - text_width / 2
            text_y = y + node_size + 5
            
            # Draw text background
            draw.rectangle((text_x, text_y, text_x + text_width, text_y + text_height), 
                          fill=(0, 0, 0, 128))
            
            # In a real implementation, you would draw text here:
            # draw.text((text_x, text_y), platform_name, font=font, fill=(255,255,255,255))
    
    def _draw_task_progress(self, img, draw, tasks, frequency, coherence):
        """Draw task progress visualization"""
        width, height = self.size
        
        # Calculate base color
        base_color = self._get_frequency_color(frequency)
        
        # Calculate task area
        task_area_x = width * 0.05
        task_area_y = height * 0.7
        task_area_width = width * 0.9
        task_area_height = height * 0.2
        
        # Draw task area background
        draw.rectangle((task_area_x, task_area_y, 
                       task_area_x + task_area_width, task_area_y + task_area_height),
                      fill=(0, 0, 0, 128))
        
        # Calculate task bar width
        num_tasks = len(tasks)
        if num_tasks == 0:
            return
            
        bar_width = (task_area_width * 0.95) / num_tasks
        bar_spacing = (task_area_width * 0.05) / (num_tasks + 1)
        
        # Draw each task
        for i, task in enumerate(tasks):
            # Get task info
            task_name = task.get('name', f"Task {i+1}")
            task_status = task.get('status', 'pending')
            task_progress = task.get('progress', 0.0)
            task_coherence = task.get('coherence', coherence)
            
            # Calculate bar position
            bar_x = task_area_x + bar_spacing + i * (bar_width + bar_spacing)
            bar_y = task_area_y + task_area_height * 0.2
            bar_height = task_area_height * 0.6
            
            # Draw task background
            draw.rectangle((bar_x, bar_y, bar_x + bar_width, bar_y + bar_height),
                          fill=(64, 64, 64, 128))
            
            # Choose color based on status
            if task_status == 'completed':
                color = (50, 168, 82, int(255 * task_coherence))  # Green
            elif task_status == 'in_progress':
                color = (236, 185, 57, int(255 * task_coherence))  # Gold
            elif task_status == 'error':
                color = (217, 72, 72, int(255 * task_coherence))  # Red
            else:
                color = (128, 128, 128, int(255 * task_coherence))  # Gray
            
            # Draw progress bar
            progress_height = bar_height * task_progress
            draw.rectangle((bar_x, bar_y + bar_height - progress_height, 
                           bar_x + bar_width, bar_y + bar_height),
                          fill=color)
            
            # Add task indicators
            if task_status == 'completed':
                # Draw checkmark
                checkmark_size = min(bar_width, bar_height) * 0.2
                center_x = bar_x + bar_width / 2
                center_y = bar_y + bar_height / 2
                
                # Simple checkmark representation
                draw.line([(center_x - checkmark_size, center_y),
                          (center_x, center_y + checkmark_size),
                          (center_x + checkmark_size, center_y - checkmark_size)],
                         fill=(255, 255, 255, 200), width=max(1, int(2 * coherence)))
    
    def _draw_coherence_metrics(self, img, draw, coherence, frequency):
        """Draw coherence metrics visualization"""
        width, height = self.size
        
        # Draw coherence gauge in bottom left
        gauge_x = width * 0.05
        gauge_y = height * 0.05
        gauge_width = width * 0.2
        gauge_height = height * 0.05
        
        # Draw gauge background
        draw.rectangle((gauge_x, gauge_y, gauge_x + gauge_width, gauge_y + gauge_height),
                      fill=(0, 0, 0, 128))
        
        # Draw gauge fill based on coherence
        fill_width = gauge_width * coherence
        
        # Color based on coherence level
        if coherence >= 0.95:
            color = (50, 168, 82, 200)  # Green
        elif coherence >= 0.8:
            color = (236, 185, 57, 200)  # Gold
        else:
            color = (217, 72, 72, 200)  # Red
            
        draw.rectangle((gauge_x, gauge_y, gauge_x + fill_width, gauge_y + gauge_height),
                      fill=color)
        
        # Add phi-markers
        for i in range(1, 4):
            phi_pos = self.phi_reciprocal * i
            if phi_pos <= 1.0:
                marker_x = gauge_x + gauge_width * phi_pos
                draw.line([(marker_x, gauge_y), (marker_x, gauge_y + gauge_height)],
                         fill=(255, 255, 255, 150), width=1)
        
        # In a real implementation, you would add text:
        # draw.text((gauge_x, gauge_y - 15), f"Coherence: {coherence:.2f}", font=font, fill=(255,255,255,200))
        
        # Draw frequency indicator in bottom right
        freq_x = width * 0.75
        freq_y = height * 0.05
        freq_width = width * 0.2
        freq_height = height * 0.05
        
        # Draw frequency background
        draw.rectangle((freq_x, freq_y, freq_x + freq_width, freq_y + freq_height),
                      fill=(0, 0, 0, 128))
        
        # Get color for frequency
        color = self._get_frequency_color(frequency)
        color = (color[0], color[1], color[2], 200)
        
        # Draw frequency indicator
        freq_marker_width = freq_width * 0.2
        draw.rectangle((freq_x, freq_y, freq_x + freq_marker_width, freq_y + freq_height),
                      fill=color)
        
        # In a real implementation, you would add text:
        # draw.text((freq_x + freq_marker_width + 5, freq_y + freq_height/3), 
        #          f"{frequency} Hz", font=font, fill=(255,255,255,200))
    
    def _draw_frequency_scale(self, img, draw, current_frequency):
        """Draw frequency scale with phi-harmonic markers"""
        width, height = self.size
        
        # Draw scale at top of image
        scale_x = width * 0.1
        scale_y = height * 0.95
        scale_width = width * 0.8
        scale_height = height * 0.02
        
        # Draw scale background
        draw.rectangle((scale_x, scale_y, scale_x + scale_width, scale_y + scale_height),
                      fill=(0, 0, 0, 128))
        
        # Draw frequency markers for key frequencies
        frequencies = [432, 528, 594, 672, 720, 768, 963]
        max_freq = max(frequencies)
        
        for freq in frequencies:
            # Calculate position
            pos_x = scale_x + scale_width * (freq / max_freq)
            
            # Get color
            color = self._get_frequency_color(freq)
            color = (color[0], color[1], color[2], 200)
            
            # Draw marker
            marker_height = scale_height * 1.5
            draw.line([(pos_x, scale_y), (pos_x, scale_y - marker_height)],
                     fill=color, width=max(1, int(2 * (freq == current_frequency) + 1)))
            
            # Draw frequency point
            if freq == current_frequency:
                point_size = 5
                draw.ellipse((pos_x - point_size, scale_y - marker_height - point_size,
                             pos_x + point_size, scale_y - marker_height + point_size),
                            fill=color)
    
    def _draw_phi_field_background(self, img, draw):
        """Draw phi-harmonic field background"""
        width, height = self.size
        center_x, center_y = width // 2, height // 2
        
        # Create pixel array
        pixels = np.zeros((height, width, 4), dtype=np.uint8)
        
        # Create phi-harmonic field
        for y in range(height):
            for x in range(width):
                # Calculate distance and angle from center
                dx, dy = x - center_x, y - center_y
                distance = math.sqrt(dx*dx + dy*dy) / (min(width, height) / 2)
                angle = math.atan2(dy, dx)
                
                # Create phi-harmonic field pattern
                phi_field = 0
                
                # Add multiple harmonic layers
                for i in range(1, 6):
                    # Phi-based amplitude
                    amplitude = 0.5 * math.pow(self.phi_reciprocal, i-1)
                    
                    # Create harmonic field with phi-based frequency
                    field_val = math.cos(distance * self.phi * i + angle * i * self.phi_reciprocal)
                    phi_field += field_val * amplitude
                
                # Normalize and scale
                phi_field = (phi_field + 1) / 2  # Normalize to 0-1
                phi_field = phi_field ** self.phi_reciprocal  # Apply phi curve
                
                # Create color gradient based on field value
                hue = (phi_field * 0.7) % 1.0  # Hue cycles through spectrum
                saturation = 0.7  # Medium-high saturation
                value = 0.2 + 0.4 * phi_field  # Brightness varies with field
                
                # Convert HSV to RGB
                r, g, b = colorsys.hsv_to_rgb(hue, saturation, value)
                
                # Set pixel values
                pixels[y, x, 0] = int(r * 255)  # R
                pixels[y, x, 1] = int(g * 255)  # G
                pixels[y, x, 2] = int(b * 255)  # B
                pixels[y, x, 3] = int(128 + 127 * phi_field)  # Alpha
        
        # Create image from pixel array and paste onto original
        field_img = Image.fromarray(pixels, 'RGBA')
        img.paste(field_img, (0, 0), field_img)
    
    def _draw_dimensional_coherence(self, img, draw, dimensions, frequency_map):
        """Draw dimensional coherence visualization"""
        width, height = self.size
        center_x, center_y = width // 2, height // 2
        
        # Draw dimensional nodes in a phi-spiral
        dimension_names = list(dimensions.keys())
        num_dimensions = len(dimension_names)
        
        # Create phi spiral points
        points = []
        max_radius = min(width, height) * 0.35
        
        # Start with foundation at center
        points.append((center_x, center_y))
        
        # Add other dimensions in phi spiral
        for i in range(1, num_dimensions):
            # Calculate phi spiral position
            theta = i * self.phi
            radius = i * max_radius / num_dimensions
            
            x = center_x + radius * math.cos(theta)
            y = center_y + radius * math.sin(theta)
            points.append((x, y))
        
        # Draw connections between dimension nodes
        for i in range(num_dimensions):
            dim_name = dimension_names[i]
            coherence = dimensions[dim_name]
            frequency = frequency_map.get(dim_name, 432)
            
            # Get color for this dimension
            color = self._get_frequency_color(frequency)
            
            # Calculate alpha based on coherence
            alpha = int(255 * coherence)
            color = (color[0], color[1], color[2], alpha)
            
            # Draw node
            x, y = points[i]
            node_size = int(10 + 10 * coherence)
            draw.ellipse((x - node_size, y - node_size, x + node_size, y + node_size),
                        fill=color)
            
            # Draw connections to other nodes
            for j in range(i):
                # Calculate connection coherence as average
                conn_coherence = (coherence + dimensions[dimension_names[j]]) / 2
                
                # Only draw if coherence is high enough
                if conn_coherence > 0.5:
                    # Interpolate connection color
                    other_color = self._get_frequency_color(frequency_map.get(dimension_names[j], 432))
                    conn_color = self._interpolate_colors(color, other_color, 0.5)
                    
                    # Set alpha based on connection coherence
                    alpha = int(192 * conn_coherence)
                    conn_color = (conn_color[0], conn_color[1], conn_color[2], alpha)
                    
                    # Calculate line width based on coherence
                    line_width = max(1, int(3 * conn_coherence))
                    
                    # Draw connection
                    draw.line([points[i], points[j]], fill=conn_color, width=line_width)
    
    def _draw_overall_coherence(self, img, draw, coherence):
        """Draw overall coherence indicator"""
        width, height = self.size
        
        # Draw coherence circle around the image
        border_width = int(10 * coherence)
        
        # Color based on coherence
        if coherence >= 0.95:
            color = (50, 168, 82, 128)  # Green
        elif coherence >= 0.8:
            color = (236, 185, 57, 128)  # Gold
        else:
            color = (217, 72, 72, 128)  # Red
        
        # Draw circle
        draw.ellipse((border_width, border_width, 
                      width - border_width, height - border_width),
                    outline=color, width=border_width)
        
        # Add label at top
        label_x = width / 2
        label_y = height * 0.05
        label_width = width * 0.3
        label_height = height * 0.05
        
        # Draw label background
        draw.rectangle((label_x - label_width/2, label_y,
                       label_x + label_width/2, label_y + label_height),
                      fill=(0, 0, 0, 128))
        
        # In a real implementation, you would add text:
        # draw.text((label_x - label_width/3, label_y + label_height/3),
        #          f"Coherence: {coherence:.2f}", font=font, fill=(255,255,255,200))
    
    def _interpolate_colors(self, color1, color2, ratio):
        """Interpolate between two colors"""
        r = int(color1[0] + ratio * (color2[0] - color1[0]))
        g = int(color1[1] + ratio * (color2[1] - color1[1]))
        b = int(color1[2] + ratio * (color2[2] - color1[2]))
        return (r, g, b)

# Test code
if __name__ == "__main__":
    # Test the visualizer if run directly
    if not VISUALIZATION_AVAILABLE:
        print("Visualization requires PIL and numpy. Install with: pip install pillow numpy")
        sys.exit(1)
    
    # Create visualizer
    visualizer = CymaticVisualizer(size=(800, 800))
    
    # Generate test patterns
    frequencies = [432, 528, 594, 672, 720, 768, 963]
    pattern_types = ["harmonic", "wave", "phi", "fibonacci", "flower"]
    
    # Create test directory
    os.makedirs("test_patterns", exist_ok=True)
    
    # Generate simple patterns
    for freq in frequencies:
        for pattern in pattern_types:
            img_b64 = visualizer.visualize_frequency(freq, 0.96, pattern)
            
            # Save image to file
            img_data = base64.b64decode(img_b64)
            with open(f"test_patterns/f{freq}_{pattern}.png", "wb") as f:
                f.write(img_data)
    
    # Test deployment state visualization
    deployment_state = {
        'frequency': 768,
        'coherence': 0.96,
        'platforms': [
            {'name': 'GoDaddy', 'status': 'success', 'coherence': 0.97},
            {'name': 'GitHub', 'status': 'pending', 'coherence': 0.95},
            {'name': 'CloudFlare', 'status': 'error', 'coherence': 0.85}
        ],
        'tasks': [
            {'name': 'Task 1', 'status': 'completed', 'progress': 1.0, 'coherence': 0.98},
            {'name': 'Task 2', 'status': 'completed', 'progress': 1.0, 'coherence': 0.97},
            {'name': 'Task 3', 'status': 'in_progress', 'progress': 0.6, 'coherence': 0.95},
            {'name': 'Task 4', 'status': 'pending', 'progress': 0.0, 'coherence': 0.9},
            {'name': 'Task 5', 'status': 'error', 'progress': 0.3, 'coherence': 0.8}
        ]
    }
    
    visualizer.visualize_deployment_state(deployment_state, "test_patterns/deployment_state.png")
    
    # Test coherence field visualization
    coherence_data = {
        'foundation': 0.98,
        'creation': 0.96,
        'integration': 0.94,
        'expression': 0.92,
        'vision': 0.90,
        'unity': 0.95,
        'cosmic': 0.92
    }
    
    visualizer.visualize_coherence_field(coherence_data, "test_patterns/coherence_field.png")
    
    print("Test patterns generated in test_patterns/ directory")
"""CQIL Mobile Animations"""
from kivy.animation import Animation
from kivy.graphics import Color, Rectangle, Ellipse
from kivy.clock import Clock
import random

class QuantumEffects:
    def __init__(self):
        self.particles = []
        
    def touchdown_effect(self, widget, colors):
        """Create a pulsing touchdown effect with team colors"""
        anim1 = Animation(
            background_color=(*colors[0][:3], 0.8),
            duration=0.3
        ) + Animation(
            background_color=(0.2, 0.3, 0.4, 1),
            duration=0.3
        )
        anim1.repeat = True
        
        # Add particle effects
        def create_particles(dt):
            with widget.canvas.after:
                for _ in range(5):
                    x = random.random() * widget.width
                    y = random.random() * widget.height
                    size = random.randint(10, 20)
                    color = colors[random.randint(0, len(colors)-1)]
                    Color(*color)
                    particle = Ellipse(pos=(x, y), size=(size, size))
                    self.particles.append((particle, x, y))
                    
        def update_particles(dt):
            for particle, x, y in self.particles:
                particle.pos = (particle.pos[0], particle.pos[1] + 2)
                if particle.pos[1] > widget.height:
                    widget.canvas.after.remove(particle)
                    self.particles.remove((particle, x, y))
                    
        Clock.schedule_interval(create_particles, 0.1)
        Clock.schedule_interval(update_particles, 1/60.0)
        
        return anim1
        
    def power_play_effect(self, widget, colors):
        """Create an energetic power play effect"""
        anim = Animation(
            background_color=(*colors[1][:3], 0.9),
            duration=0.2
        ) + Animation(
            background_color=(0.2, 0.3, 0.4, 1),
            duration=0.4
        )
        
        def flash(dt):
            with widget.canvas.after:
                Color(*colors[0])
                size = random.randint(50, 100)
                x = random.random() * (widget.width - size)
                y = random.random() * (widget.height - size)
                rect = Rectangle(pos=(x, y), size=(size, size))
                anim = Animation(opacity=0, duration=0.3)
                anim.start(rect)
                Clock.schedule_once(lambda dt: widget.canvas.after.remove(rect), 0.3)
                
        Clock.schedule_interval(flash, 0.2)
        return anim
        
    def celebration_effect(self, widget, colors):
        """Create a festive celebration effect"""
        def spawn_confetti(dt):
            with widget.canvas.after:
                for _ in range(10):
                    color = colors[random.randint(0, len(colors)-1)]
                    Color(*color)
                    size = random.randint(5, 15)
                    x = random.random() * widget.width
                    y = widget.height + size
                    rect = Rectangle(pos=(x, y), size=(size, size))
                    
                    # Animate falling with swaying
                    end_x = x + random.randint(-100, 100)
                    anim = Animation(
                        pos=(end_x, -size),
                        rotation=random.randint(0, 360),
                        duration=random.uniform(1, 3)
                    )
                    anim.start(rect)
                    Clock.schedule_once(
                        lambda dt, r=rect: widget.canvas.after.remove(r),
                        3
                    )
                    
        Clock.schedule_interval(spawn_confetti, 0.1)
        
    def stealth_mode_effect(self, widget):
        """Create a stealth mode transition effect"""
        anim = Animation(
            opacity=0.3,
            duration=0.5
        ) + Animation(
            opacity=1,
            duration=0.5
        )
        return anim
        
    def basic_effect(self, widget, colors):
        """Create a basic visual effect for standard actions"""
        anim = Animation(
            background_color=(*colors[0][:3], 0.7),
            duration=0.2
        ) + Animation(
            background_color=(0.2, 0.3, 0.4, 1),
            duration=0.3
        )
        return anim

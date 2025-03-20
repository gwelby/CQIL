"""CQIL Mobile App - Creative Quantum Interface"""
from kivy.app import App
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.spinner import Spinner
from kivy.core.window import Window
from kivy.clock import Clock
from kivy.graphics import Color, Rectangle, Line, Ellipse, RoundedRectangle
from kivy.animation import Animation
from quantum_features import QuantumFeatures
from animations import QuantumEffects
from voice_recognition import VoiceRecognizer
from quantum_teams import QuantumTeamsNetwork

# Set window properties
Window.clearcolor = (0.05, 0.05, 0.1, 1)

class QuantumButton(Button):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.background_normal = ''
        self.background_down = ''
        self.background_color = (0.2, 0.3, 0.4, 0)
        self.font_size = '24sp'
        self.bold = True
        
        with self.canvas.before:
            Color(0.2, 0.4, 0.6, 0.3)
            self.rect = RoundedRectangle(pos=self.pos, size=self.size, radius=[20])
            
        self.bind(pos=self._update_rect, size=self._update_rect)
        Clock.schedule_interval(self._pulse_animation, 2)
        
    def _update_rect(self, instance, value):
        self.rect.pos = instance.pos
        self.rect.size = instance.size
        
    def _pulse_animation(self, dt):
        anim = Animation(
            background_color=(0.3, 0.5, 0.7, 0.4),
            duration=1
        ) + Animation(
            background_color=(0.2, 0.3, 0.4, 0),
            duration=1
        )
        anim.start(self)

class CQILMobileApp(App):
    def __init__(self):
        super().__init__()
        self.title = 'CQIL Mobile'
        self.quantum = QuantumFeatures()
        self.effects = QuantumEffects()
        self.voice = VoiceRecognizer()
        self.network = QuantumTeamsNetwork()
        self.mode = "QUANTUM"
        self.current_core = "NFL"
        self.current_team = "COWBOYS"
        
    def build(self):
        layout = FloatLayout()
        
        # Add quantum background with animated particles
        with layout.canvas.before:
            Color(0.1, 0.15, 0.2, 1)
            self.rect = Rectangle(size=layout.size, pos=layout.pos)
            
        def create_particle(dt):
            with layout.canvas.before:
                Color(0.3, 0.5, 0.7, 0.3)
                size = 10
                x = Window.width * 0.1 + (Window.width * 0.8 * random.random())
                particle = Ellipse(pos=(x, 0), size=(size, size))
                
                anim = Animation(
                    pos=(x + random.randint(-100, 100), Window.height),
                    size=(0, 0),
                    duration=random.uniform(2, 4)
                )
                anim.bind(on_complete=lambda *x: layout.canvas.before.remove(particle))
                anim.start(particle)
                
        Clock.schedule_interval(create_particle, 0.2)
        
        # Mode Switch with glow effect
        self.mode_btn = QuantumButton(
            text="⚛️ QUANTUM MODE",
            size_hint=(0.3, 0.08),
            pos_hint={'x': 0.02, 'top': 0.98}
        )
        self.mode_btn.bind(on_press=self.toggle_mode)
        
        # Title with quantum styling
        self.title_label = Label(
            text="✧ CQIL Quantum Flow ✧",
            font_size='32sp',
            bold=True,
            size_hint=(0.4, 0.1),
            pos_hint={'center_x': 0.5, 'top': 0.98},
            color=(0.9, 0.95, 1, 1)
        )
        
        # Core Selector with style
        self.core_spinner = Spinner(
            text='NFL',
            values=list(self.network.cores.keys()),
            size_hint=(0.3, 0.08),
            pos_hint={'right': 0.98, 'top': 0.98},
            background_normal='',
            background_color=(0.2, 0.4, 0.6, 0.8),
            font_size='24sp',
            bold=True
        )
        self.core_spinner.bind(text=self.on_core_select)
        
        # Quantum Flow Area
        self.flow_area = FloatLayout(
            size_hint=(0.96, 0.75),
            pos_hint={'center_x': 0.5, 'y': 0.12}
        )
        
        # Add all widgets
        layout.add_widget(self.mode_btn)
        layout.add_widget(self.title_label)
        layout.add_widget(self.core_spinner)
        layout.add_widget(self.flow_area)
        
        # Initial quantum flow display
        self.update_quantum_flow()
        
        return layout
        
    def update_quantum_flow(self):
        """Update quantum flow visualization with animations"""
        self.flow_area.clear_widgets()
        
        if self.current_core == "NFL":
            team_data = self.network.cores["NFL"]["TEAMS"][self.current_team]
            states = self.network.cores["NFL"]["STATES"]
            
            # Team quantum flow
            for i, icon in enumerate(team_data):
                btn = QuantumButton(
                    text=icon,
                    font_size='36sp',
                    size_hint=(0.18, 0.18),
                    pos_hint={'center_x': 0.2 + i*0.2, 'center_y': 0.8}
                )
                self.flow_area.add_widget(btn)
                
                # Add connecting lines with glow
                if i < len(team_data) - 1:
                    with self.flow_area.canvas.before:
                        Color(0.3, 0.5, 0.7, 0.4)
                        Line(points=[
                            btn.pos[0] + btn.size[0],
                            btn.pos[1] + btn.size[1]/2,
                            btn.pos[0] + btn.size[0] + Window.width*0.1,
                            btn.pos[1] + btn.size[1]/2
                        ], width=2)
            
            # Quantum states with flow
            for i, (state, icons) in enumerate(states.items()):
                label = Label(
                    text=f"✧ {state}",
                    font_size='28sp',
                    bold=True,
                    size_hint=(0.2, 0.1),
                    pos_hint={'center_x': 0.2, 'center_y': 0.6 - i*0.2},
                    color=(0.9, 0.95, 1, 1)
                )
                self.flow_area.add_widget(label)
                
                for j, icon in enumerate(icons):
                    btn = QuantumButton(
                        text=icon,
                        font_size='32sp',
                        size_hint=(0.15, 0.15),
                        pos_hint={'center_x': 0.45 + j*0.2, 'center_y': 0.6 - i*0.2}
                    )
                    self.flow_area.add_widget(btn)
                    
                    # Add flow lines
                    if j < len(icons) - 1:
                        with self.flow_area.canvas.before:
                            Color(0.3, 0.5, 0.7, 0.3)
                            Line(points=[
                                btn.pos[0] + btn.size[0],
                                btn.pos[1] + btn.size[1]/2,
                                btn.pos[0] + btn.size[0] + Window.width*0.1,
                                btn.pos[1] + btn.size[1]/2
                            ], width=2)
        
    def toggle_mode(self, instance):
        """Toggle between quantum modes with animation"""
        if self.mode == "QUANTUM":
            self.mode = "FLOW"
            self.mode_btn.text = "✨ FLOW MODE"
        else:
            self.mode = "QUANTUM"
            self.mode_btn.text = "⚛️ QUANTUM MODE"
        
        # Animate mode change
        anim = Animation(
            background_color=(0.4, 0.6, 0.8, 0.8),
            duration=0.3
        ) + Animation(
            background_color=(0.2, 0.4, 0.6, 0.8),
            duration=0.3
        )
        anim.start(self.mode_btn)
        self.update_quantum_flow()
        
    def on_core_select(self, spinner, text):
        """Handle quantum core selection with animation"""
        self.current_core = text
        
        # Animate core change
        anim = Animation(opacity=0, duration=0.3)
        anim.bind(on_complete=lambda *x: self.update_quantum_flow())
        anim.start(self.flow_area)
        
        Animation(opacity=1, duration=0.3).start(self.flow_area)

if __name__ == '__main__':
    import random
    CQILMobileApp().run()

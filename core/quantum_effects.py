#!/usr/bin/env python3
"""
CQIL Quantum Effects System
Handles all visual and interactive quantum effects
"""

from dataclasses import dataclass
from typing import List, Dict, Optional
import json
import random
import math

@dataclass
class QuantumParticle:
    icon: str
    position: tuple
    velocity: tuple
    life: float
    size: float
    color: tuple

class QuantumEffectSystem:
    def __init__(self):
        self.effects_config = self._load_effects_config()
        self.active_effects: Dict[str, List[QuantumParticle]] = {}
        
    def _load_effects_config(self) -> Dict:
        """Load quantum effects configuration"""
        return {
            "celebration": {
                "touchdown": {
                    "particles": ["🎉", "✨", "⭐", "🌟"],
                    "colors": [(255,215,0), (255,255,255)],
                    "duration": 5.0,
                    "pattern": "burst"
                },
                "interception": {
                    "particles": ["💪", "⚡", "🛡️"],
                    "colors": [(255,0,0), (0,0,255)],
                    "duration": 3.0,
                    "pattern": "wave"
                }
            },
            "strategy": {
                "play_call": {
                    "particles": ["🎯", "📍", "⚡"],
                    "colors": [(0,255,0)],
                    "duration": 2.0,
                    "pattern": "arrow"
                }
            },
            "stealth": {
                "hidden": {
                    "particles": ["🥷", "👻", "💨"],
                    "colors": [(50,50,50)],
                    "duration": 1.5,
                    "pattern": "fade"
                }
            },
            "quantum": {
                "entanglement": {
                    "particles": ["✨", "⚛️", "🌌"],
                    "colors": [(147,112,219)],
                    "duration": 4.0,
                    "pattern": "spiral"
                }
            }
        }
    
    def create_effect(self, effect_type: str, position: tuple, team: str = None) -> str:
        """Create new quantum effect"""
        if effect_type not in self.effects_config:
            raise ValueError(f"Unknown effect type: {effect_type}")
            
        effect_id = f"{effect_type}_{random.randint(0, 1000000)}"
        config = self.effects_config[effect_type]
        
        particles = []
        for _ in range(20):  # Create 20 particles
            particle = QuantumParticle(
                icon=random.choice(config["particles"]),
                position=position,
                velocity=(random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)),
                life=config["duration"],
                size=random.uniform(0.5, 2.0),
                color=random.choice(config["colors"])
            )
            particles.append(particle)
        
        self.active_effects[effect_id] = particles
        return effect_id
    
    def update_effects(self, dt: float):
        """Update all active effects"""
        for effect_id, particles in list(self.active_effects.items()):
            # Update each particle
            for particle in particles:
                # Update position
                particle.position = tuple(p + v * dt for p, v in zip(particle.position, particle.velocity))
                
                # Update life
                particle.life -= dt
                
                # Remove dead particles
                particles = [p for p in particles if p.life > 0]
                
            # Remove empty effects
            if not particles:
                del self.active_effects[effect_id]
            else:
                self.active_effects[effect_id] = particles
    
    def get_active_particles(self) -> Dict[str, List[QuantumParticle]]:
        """Get all active particles for rendering"""
        return self.active_effects

class TeamEffects:
    def __init__(self, team_id: str):
        self.team_id = team_id
        self.effect_system = QuantumEffectSystem()
        self.team_colors = self._load_team_colors()
        
    def _load_team_colors(self) -> Dict:
        """Load team-specific colors and effects"""
        # Example team configurations
        return {
            "cowboys": {
                "primary": (0, 34, 68),    # Navy Blue
                "secondary": (134, 147, 151),  # Silver
                "effects": {
                    "celebration": ["⭐", "💫", "✨"],
                    "strategy": ["🎯", "⚡"],
                    "stealth": ["🥷", "👻"]
                }
            },
            "patriots": {
                "primary": (0, 34, 68),    # Navy Blue
                "secondary": (198, 12, 48),  # Red
                "effects": {
                    "celebration": ["🏈", "⚡", "🌟"],
                    "strategy": ["🎯", "💫"],
                    "stealth": ["🥷", "💨"]
                }
            }
        }.get(self.team_id, {})
    
    def create_team_effect(self, effect_type: str, position: tuple) -> str:
        """Create team-specific effect"""
        colors = [self.team_colors["primary"], self.team_colors["secondary"]]
        return self.effect_system.create_effect(effect_type, position, self.team_id)

class QuantumPlaybook:
    def __init__(self):
        self.plays: Dict[str, Dict] = {
            "touchdown": {
                "sequence": [
                    ("celebration", "burst", 0.0),
                    ("quantum", "spiral", 1.0),
                    ("celebration", "wave", 2.0)
                ]
            },
            "interception": {
                "sequence": [
                    ("stealth", "fade", 0.0),
                    ("strategy", "arrow", 0.5),
                    ("celebration", "burst", 1.0)
                ]
            }
        }
    
    def execute_play(self, play_name: str, effect_system: QuantumEffectSystem, position: tuple):
        """Execute a sequence of effects for a play"""
        if play_name not in self.plays:
            raise ValueError(f"Unknown play: {play_name}")
            
        play = self.plays[play_name]
        effects = []
        
        for effect_type, pattern, delay in play["sequence"]:
            effect_id = effect_system.create_effect(effect_type, position)
            effects.append((effect_id, delay))
        
        return effects

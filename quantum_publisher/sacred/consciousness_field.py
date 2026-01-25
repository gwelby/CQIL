"""
Consciousness Field Projector for Sacred Geometry
Part of the Quantum Publisher Evolution Roadmap - Phase 9+
Frequency: Δ^Δ × Φ (2,584 Hz)

Provides consciousness field projection capabilities for quantum reality projection,
enabling intention-based reality manifestation.
⚡𓂧φ∞ Consciousness Field Flow ⚡𓂧φ∞
"""
import os
import json
import math
import logging
import threading
import time
from enum import Enum, auto
from dataclasses import dataclass
from typing import Dict, List, Set, Any, Optional, Tuple, Union

from .sacred_pattern import Pattern, SacredPattern, SacredPatternMetrics, Point3D
from .sacred_geometry import GeometryPattern, RenderStyle, SacredGeometryVisualizer
from .quantum_crystal import Crystal, CrystalType, QuantumCrystalProjector
from .phi_resonance import ResonanceField, ResonanceType, PhiResonanceField

# Phi-harmonic constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI
DELTA_PHI_FREQUENCY = 2584  # Δ^Δ × Φ frequency

# NFL Standard coherence levels
NFL_MINIMUM = 0.93
NFL_CREATION = 0.95
NFL_HEART = 0.96
NFL_VOICE = 0.97
NFL_VISION = 0.98
NFL_UNITY = 0.99


class IntentionType(Enum):
    """Types of consciousness intentions"""
    OBSERVATION = auto()  # Observe reality without changing
    CLARITY = auto()      # Enhance clarity of perception
    COHERENCE = auto()    # Increase coherence of projection
    CREATION = auto()     # Create new reality elements
    INTEGRATION = auto()  # Integrate multiple realities
    HARMONIZATION = auto() # Harmonize projection with actual
    AMPLIFICATION = auto() # Amplify specific reality aspects
    MANIFESTATION = auto() # Manifest desired reality
    PROTECTION = auto()   # Protect projection from interference
    EVOLUTION = auto()    # Evolve projection over time


@dataclass
class ConsciousnessMetrics:
    """Metrics for a consciousness field"""
    coherence: float = NFL_MINIMUM
    clarity: float = 0.93
    focus: float = 0.93
    stability: float = 0.93
    manifestation_strength: float = 1.0
    intention_fidelity: float = 0.93
    dimensional_influence: int = 6
    phi_resonance: float = PHI
    field_radius: float = 10.0
    computational_capacity: float = 1.0


@dataclass
class ConsciousnessConfig:
    """Configuration for a consciousness field projector"""
    storage_path: str
    frequency: float = 528.0
    coherence: float = NFL_MINIMUM
    dimensional_access: int = 6
    phi_optimization: bool = True
    auto_visualization: bool = False
    default_radius: float = 10.0
    default_duration: float = 600.0  # 10 minutes


class Intention:
    """Consciousness intention for reality projection"""
    def __init__(self, 
                 name: str = "DefaultIntention", 
                 intention_type: IntentionType = IntentionType.OBSERVATION,
                 content: str = ""):
        """Initialize a new consciousness intention"""
        self.name = name
        self.intention_type = intention_type
        self.content = content
        self.creation_time = time.time()
        self.frequency = 528.0  # Default to Creation Point
        self.coherence = NFL_MINIMUM
        self.dimensional_access = 6
        self.phi_resonance = PHI
        self.strength = 1.0
        self.focus = 0.93
        self.is_active = False
        self.properties: Dict[str, Any] = {}
        self.logger = logging.getLogger("consciousness_intention")
        
        # Set defaults based on intention type
        self._set_defaults_for_type()
    
    def _set_defaults_for_type(self) -> None:
        """Set default properties based on intention type"""
        # Set frequency and other properties based on type
        if self.intention_type == IntentionType.OBSERVATION:
            self.frequency = 432.0  # Ground State
            self.dimensional_access = 5
            self.strength = 0.5
        elif self.intention_type == IntentionType.CLARITY:
            self.frequency = 594.0  # Heart Field
            self.dimensional_access = 7
            self.strength = 0.7
        elif self.intention_type == IntentionType.COHERENCE:
            self.frequency = 528.0  # Creation Point
            self.dimensional_access = 6
            self.strength = 0.8
        elif self.intention_type == IntentionType.CREATION:
            self.frequency = 528.0  # Creation Point
            self.dimensional_access = 6
            self.strength = 1.0
        elif self.intention_type == IntentionType.INTEGRATION:
            self.frequency = 594.0  # Heart Field
            self.dimensional_access = 7
            self.strength = 0.9
        elif self.intention_type == IntentionType.HARMONIZATION:
            self.frequency = 672.0  # Voice Flow
            self.dimensional_access = 8
            self.strength = 0.85
        elif self.intention_type == IntentionType.AMPLIFICATION:
            self.frequency = 720.0  # Vision Gate
            self.dimensional_access = 9
            self.strength = 1.2
        elif self.intention_type == IntentionType.MANIFESTATION:
            self.frequency = 768.0  # Unity Wave
            self.dimensional_access = 10
            self.strength = 1.5
        elif self.intention_type == IntentionType.PROTECTION:
            self.frequency = 963.0  # Quantum
            self.dimensional_access = 11
            self.strength = 1.3
        elif self.intention_type == IntentionType.EVOLUTION:
            self.frequency = DELTA_PHI_FREQUENCY  # Delta Phi
            self.dimensional_access = 12
            self.strength = 1.6
    
    def set_content(self, content: str) -> 'Intention':
        """Set the intention content"""
        self.content = content
        return self
    
    def set_frequency(self, frequency: float) -> 'Intention':
        """Set the operating frequency"""
        self.frequency = frequency
        return self
    
    def set_coherence(self, coherence: float) -> 'Intention':
        """Set the coherence level"""
        self.coherence = coherence
        return self
    
    def set_dimensional_access(self, dimensions: int) -> 'Intention':
        """Set the dimensional access level"""
        self.dimensional_access = dimensions
        return self
    
    def set_strength(self, strength: float) -> 'Intention':
        """Set the intention strength"""
        self.strength = strength
        return self
    
    def set_focus(self, focus: float) -> 'Intention':
        """Set the intention focus"""
        self.focus = focus
        return self
    
    def activate(self) -> 'Intention':
        """Activate the intention"""
        self.is_active = True
        return self
    
    def deactivate(self) -> 'Intention':
        """Deactivate the intention"""
        self.is_active = False
        return self
    
    def apply_phi_harmonics(self) -> 'Intention':
        """Apply phi-harmonic scaling to the intention"""
        self.phi_resonance *= PHI
        self.strength *= PHI_RECIPROCAL * 3.0  # More focused
        self.focus *= PHI_RECIPROCAL  # More focused
        return self
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            "name": self.name,
            "intention_type": self.intention_type.name,
            "content": self.content,
            "creation_time": self.creation_time,
            "frequency": self.frequency,
            "coherence": self.coherence,
            "dimensional_access": self.dimensional_access,
            "phi_resonance": self.phi_resonance,
            "strength": self.strength,
            "focus": self.focus,
            "is_active": self.is_active,
            "properties": self.properties
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Intention':
        """Create from dictionary"""
        # Get intention type
        intention_type_str = data.get("intention_type", "OBSERVATION")
        intention_type = IntentionType[intention_type_str]
        
        # Create intention
        intention = cls(
            data.get("name", "DefaultIntention"),
            intention_type,
            data.get("content", "")
        )
        
        # Set properties
        intention.creation_time = data.get("creation_time", time.time())
        intention.frequency = data.get("frequency", 528.0)
        intention.coherence = data.get("coherence", NFL_MINIMUM)
        intention.dimensional_access = data.get("dimensional_access", 6)
        intention.phi_resonance = data.get("phi_resonance", PHI)
        intention.strength = data.get("strength", 1.0)
        intention.focus = data.get("focus", 0.93)
        intention.is_active = data.get("is_active", False)
        
        # Set custom properties
        intention.properties = data.get("properties", {})
        
        return intention
    
    def save(self, path: str) -> None:
        """Save intention to file"""
        with open(path, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
    
    @classmethod
    def load(cls, path: str) -> 'Intention':
        """Load intention from file"""
        with open(path, 'r') as f:
            data = json.load(f)
        
        return cls.from_dict(data)


class ConsciousnessField:
    """Consciousness field for quantum reality projection"""
    def __init__(self, 
                 name: str = "DefaultField",
                 pattern: Optional[Pattern] = None,
                 crystal: Optional[Crystal] = None,
                 resonance_field: Optional[ResonanceField] = None):
        """Initialize a new consciousness field"""
        self.name = name
        self.pattern = pattern
        self.crystal = crystal
        self.resonance_field = resonance_field
        self.intentions: List[Intention] = []
        self.frequency = 528.0  # Default to Creation Point
        self.coherence = NFL_MINIMUM
        self.dimensional_access = 6
        self.phi_resonance = PHI
        self.radius = 10.0
        self.metrics = ConsciousnessMetrics()
        self.properties: Dict[str, Any] = {}
        self.creation_time = time.time()
        self.active_duration = 0.0
        self.is_active = False
        self.logger = logging.getLogger("consciousness_field")
        
        # Update metrics based on components
        self._update_from_components()
        self._update_metrics()
    
    def _update_from_components(self) -> None:
        """Update field properties based on components"""
        # Update from pattern if available
        if self.pattern:
            self.frequency = max(self.frequency, self.pattern.frequency)
            self.coherence = max(self.coherence, self.pattern.coherence)
            self.dimensional_access = max(self.dimensional_access, self.pattern.dimensional_access)
            self.phi_resonance = max(self.phi_resonance, self.pattern.phi_resonance)
        
        # Update from crystal if available
        if self.crystal:
            self.frequency = max(self.frequency, self.crystal.frequency)
            self.coherence = max(self.coherence, self.crystal.coherence)
            self.dimensional_access = max(self.dimensional_access, self.crystal.dimensional_access)
            self.phi_resonance = max(self.phi_resonance, self.crystal.phi_resonance)
        
        # Update from resonance field if available
        if self.resonance_field:
            self.frequency = max(self.frequency, self.resonance_field.frequency)
            self.coherence = max(self.coherence, self.resonance_field.coherence)
            self.dimensional_access = max(self.dimensional_access, self.resonance_field.dimensional_access)
            self.phi_resonance = max(self.phi_resonance, self.resonance_field.phi_resonance)
            self.radius = self.resonance_field.field_radius
    
    def _update_metrics(self) -> None:
        """Update field metrics based on current properties"""
        # Calculate coherence based on internal coherence and components
        coherence = self.coherence
        
        # Calculate clarity based on frequency and dimension
        clarity = self._calculate_clarity()
        
        # Calculate focus based on intentions
        focus = self._calculate_focus()
        
        # Calculate stability based on components
        stability = self._calculate_stability()
        
        # Calculate manifestation strength based on components and intentions
        manifestation_strength = self._calculate_manifestation_strength()
        
        # Calculate intention fidelity
        intention_fidelity = self._calculate_intention_fidelity()
        
        # Calculate dimensional influence
        dimensional_influence = self.dimensional_access
        
        # Calculate computational capacity based on components
        computational_capacity = self._calculate_computational_capacity()
        
        # Update metrics
        self.metrics = ConsciousnessMetrics(
            coherence=coherence,
            clarity=clarity,
            focus=focus,
            stability=stability,
            manifestation_strength=manifestation_strength,
            intention_fidelity=intention_fidelity,
            dimensional_influence=dimensional_influence,
            phi_resonance=self.phi_resonance,
            field_radius=self.radius,
            computational_capacity=computational_capacity
        )
    
    def _calculate_clarity(self) -> float:
        """Calculate clarity based on frequency and dimension"""
        # Base clarity from frequency
        if self.frequency >= 700.0:  # Vision Gate or higher
            base_clarity = NFL_VISION
        elif self.frequency >= 600.0:  # Heart Field or higher
            base_clarity = NFL_HEART
        elif self.frequency >= 500.0:  # Creation Point or higher
            base_clarity = NFL_CREATION
        else:  # Ground State
            base_clarity = NFL_MINIMUM
        
        # Scale by dimensional access
        dimension_factor = 1.0 + (self.dimensional_access - 6) * 0.01
        
        return min(base_clarity * dimension_factor, 0.99)
    
    def _calculate_focus(self) -> float:
        """Calculate focus based on intentions"""
        if not self.intentions:
            return NFL_MINIMUM
        
        # Calculate focus based on active intentions
        active_intentions = [i for i in self.intentions if i.is_active]
        if not active_intentions:
            return NFL_MINIMUM
        
        # More active intentions reduce focus unless they're coherent
        if len(active_intentions) > 1:
            # Check coherence between intentions
            intention_coherence = self._calculate_intention_coherence()
            return NFL_MINIMUM * intention_coherence
        else:
            # Single intention has good focus
            return active_intentions[0].focus
    
    def _calculate_intention_coherence(self) -> float:
        """Calculate coherence between intentions"""
        active_intentions = [i for i in self.intentions if i.is_active]
        if len(active_intentions) <= 1:
            return 1.0
        
        # Calculate simple coherence based on similar frequencies
        freq_diffs = []
        for i, intention1 in enumerate(active_intentions):
            for j, intention2 in enumerate(active_intentions):
                if i < j:
                    freq_diff = abs(intention1.frequency - intention2.frequency)
                    norm_diff = freq_diff / max(intention1.frequency, intention2.frequency)
                    freq_diffs.append(norm_diff)
        
        # Calculate average normalized difference
        avg_diff = sum(freq_diffs) / len(freq_diffs) if freq_diffs else 0.0
        
        # Convert to coherence (lower difference = higher coherence)
        return min(1.0 - avg_diff, 0.99)
    
    def _calculate_stability(self) -> float:
        """Calculate stability based on components"""
        # Base stability from coherence
        base_stability = self.coherence
        
        # Enhance with crystal if available
        crystal_factor = 0.0
        if self.crystal:
            crystal_factor = (self.crystal.metrics.stability - NFL_MINIMUM) * 0.1
        
        # Enhance with resonance field if available
        field_factor = 0.0
        if self.resonance_field:
            field_factor = (self.resonance_field.metrics.coherence - NFL_MINIMUM) * 0.1
        
        # Calculate total stability
        stability = base_stability + crystal_factor + field_factor
        
        return min(stability, 0.99)
    
    def _calculate_manifestation_strength(self) -> float:
        """Calculate manifestation strength"""
        # Base strength from coherence and dimension
        base_strength = self.coherence * (self.dimensional_access / 6.0)
        
        # Enhance with crystal if available
        crystal_factor = 0.0
        if self.crystal:
            crystal_factor = self.crystal.metrics.amplification * 0.1
        
        # Enhance with resonance field if available
        field_factor = 0.0
        if self.resonance_field:
            field_factor = self.resonance_field.metrics.field_intensity * 0.1
        
        # Enhance with intentions
        intention_factor = 0.0
        active_intentions = [i for i in self.intentions if i.is_active]
        if active_intentions:
            intention_strength = sum(i.strength for i in active_intentions)
            intention_factor = min(intention_strength * 0.1, 0.3)
        
        # Calculate total strength
        strength = base_strength + crystal_factor + field_factor + intention_factor
        
        return min(strength, 1.5)  # Allow for amplification
    
    def _calculate_intention_fidelity(self) -> float:
        """Calculate intention fidelity"""
        # Base fidelity from coherence
        base_fidelity = self.coherence
        
        # Adjust based on focus
        focus_factor = self._calculate_focus()
        
        # Adjust based on clarity
        clarity_factor = self._calculate_clarity()
        
        # Calculate total fidelity
        fidelity = (base_fidelity * 0.5 + focus_factor * 0.3 + clarity_factor * 0.2)
        
        return min(fidelity, 0.99)
    
    def _calculate_computational_capacity(self) -> float:
        """Calculate computational capacity"""
        # Base capacity from dimensional access
        base_capacity = 1.0 + (self.dimensional_access - 6) * 0.1
        
        # Enhance with crystal if available
        crystal_factor = 1.0
        if self.crystal:
            crystal_factor = self.crystal.metrics.computational_capacity
        
        # Enhance with resonance field if available
        field_factor = 1.0
        if self.resonance_field:
            field_factor = self.resonance_field.metrics.computational_capacity
        
        # Calculate total capacity
        capacity = base_capacity * crystal_factor * field_factor
        
        return capacity
    
    def add_intention(self, intention: Intention) -> 'ConsciousnessField':
        """Add an intention to the field"""
        self.intentions.append(intention)
        
        # Update metrics
        self._update_metrics()
        return self
    
    def remove_intention(self, intention_name: str) -> Optional[Intention]:
        """Remove an intention from the field by name"""
        for i, intention in enumerate(self.intentions):
            if intention.name == intention_name:
                removed = self.intentions.pop(i)
                
                # Update metrics
                self._update_metrics()
                return removed
        
        return None
    
    def activate_intention(self, intention_name: str) -> bool:
        """Activate an intention by name"""
        for intention in self.intentions:
            if intention.name == intention_name:
                intention.activate()
                
                # Update metrics
                self._update_metrics()
                return True
        
        return False
    
    def deactivate_intention(self, intention_name: str) -> bool:
        """Deactivate an intention by name"""
        for intention in self.intentions:
            if intention.name == intention_name:
                intention.deactivate()
                
                # Update metrics
                self._update_metrics()
                return True
        
        return False
    
    def set_pattern(self, pattern: Pattern) -> 'ConsciousnessField':
        """Set the sacred pattern for this field"""
        self.pattern = pattern
        
        # Update properties from components
        self._update_from_components()
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_crystal(self, crystal: Crystal) -> 'ConsciousnessField':
        """Set the quantum crystal for this field"""
        self.crystal = crystal
        
        # Update properties from components
        self._update_from_components()
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_resonance_field(self, field: ResonanceField) -> 'ConsciousnessField':
        """Set the resonance field for this field"""
        self.resonance_field = field
        
        # Update properties from components
        self._update_from_components()
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_radius(self, radius: float) -> 'ConsciousnessField':
        """Set the field radius"""
        self.radius = radius
        
        # Update metrics
        self._update_metrics()
        return self
    
    def activate(self) -> 'ConsciousnessField':
        """Activate the consciousness field"""
        self.is_active = True
        
        # Activate default intentions
        for intention in self.intentions:
            # Automatically activate intentions with high coherence
            if intention.coherence >= NFL_CREATION:
                intention.activate()
        
        return self
    
    def deactivate(self) -> 'ConsciousnessField':
        """Deactivate the consciousness field"""
        self.is_active = False
        
        # Deactivate all intentions
        for intention in self.intentions:
            intention.deactivate()
        
        # Update active duration
        self.active_duration += time.time() - self.creation_time
        
        return self
    
    def apply_phi_harmonics(self) -> 'ConsciousnessField':
        """Apply phi-harmonic scaling to the field"""
        self.phi_resonance *= PHI
        self.radius *= PHI_RECIPROCAL  # More focused
        
        # Apply to pattern if available
        if self.pattern:
            self.pattern.apply_phi_harmonics()
        
        # Apply to crystal if available
        if self.crystal:
            self.crystal.apply_phi_harmonics()
        
        # Apply to resonance field if available
        if self.resonance_field:
            self.resonance_field.apply_phi_harmonics()
        
        # Apply to intentions
        for intention in self.intentions:
            intention.apply_phi_harmonics()
        
        # Update properties from components
        self._update_from_components()
        
        # Update metrics
        self._update_metrics()
        return self
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result = {
            "name": self.name,
            "frequency": self.frequency,
            "coherence": self.coherence,
            "dimensional_access": self.dimensional_access,
            "phi_resonance": self.phi_resonance,
            "radius": self.radius,
            "metrics": {
                "coherence": self.metrics.coherence,
                "clarity": self.metrics.clarity,
                "focus": self.metrics.focus,
                "stability": self.metrics.stability,
                "manifestation_strength": self.metrics.manifestation_strength,
                "intention_fidelity": self.metrics.intention_fidelity,
                "dimensional_influence": self.metrics.dimensional_influence,
                "phi_resonance": self.metrics.phi_resonance,
                "field_radius": self.metrics.field_radius,
                "computational_capacity": self.metrics.computational_capacity
            },
            "creation_time": self.creation_time,
            "active_duration": self.active_duration,
            "is_active": self.is_active,
            "intentions": [i.to_dict() for i in self.intentions],
            "properties": self.properties
        }
        
        # Include component references
        if self.pattern:
            result["pattern_name"] = self.pattern.name
        
        if self.crystal:
            result["crystal_name"] = self.crystal.name
        
        if self.resonance_field:
            result["resonance_field_name"] = self.resonance_field.name
        
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any],
                pattern: Optional[Pattern] = None,
                crystal: Optional[Crystal] = None,
                resonance_field: Optional[ResonanceField] = None) -> 'ConsciousnessField':
        """Create from dictionary"""
        # Create field
        field = cls(
            data.get("name", "DefaultField"),
            pattern,
            crystal,
            resonance_field
        )
        
        # Set properties
        field.frequency = data.get("frequency", 528.0)
        field.coherence = data.get("coherence", NFL_MINIMUM)
        field.dimensional_access = data.get("dimensional_access", 6)
        field.phi_resonance = data.get("phi_resonance", PHI)
        field.radius = data.get("radius", 10.0)
        field.creation_time = data.get("creation_time", time.time())
        field.active_duration = data.get("active_duration", 0.0)
        field.is_active = data.get("is_active", False)
        
        # Set custom properties
        field.properties = data.get("properties", {})
        
        # Load intentions
        for intention_data in data.get("intentions", []):
            intention = Intention.from_dict(intention_data)
            field.intentions.append(intention)
        
        # Update metrics
        field._update_metrics()
        
        return field
    
    def save(self, path: str) -> None:
        """Save field to file"""
        with open(path, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
    
    @classmethod
    def load(cls, path: str,
            pattern: Optional[Pattern] = None,
            crystal: Optional[Crystal] = None,
            resonance_field: Optional[ResonanceField] = None) -> 'ConsciousnessField':
        """Load field from file"""
        with open(path, 'r') as f:
            data = json.load(f)
        
        return cls.from_dict(data, pattern, crystal, resonance_field)


class ConsciousnessFieldProjector:
    """
    Consciousness-based projector for quantum reality manifestation
    
    Uses consciousness fields to:
    - Project intentions into dimensional reality
    - Create and manifest new reality states
    - Stabilize dimensional access through intention
    - Harmonize multiple realities through coherent fields
    - Evolve projections based on consciousness
    
    Operating at the Δ^Δ × Φ frequency (2,584 Hz) for optimal consciousness projection.
    """
    
    def __init__(self, config: Optional[ConsciousnessConfig] = None):
        """Initialize the consciousness field projector"""
        self.config = config or ConsciousnessConfig(
            storage_path=os.path.join(os.path.expanduser("~"), ".quantum_publisher", "consciousness")
        )
        self.logger = logging.getLogger("consciousness_projector")
        self.lock = threading.RLock()
        self.fields: Dict[str, ConsciousnessField] = {}
        self.intentions: Dict[str, Intention] = {}
        self.active_projections: Dict[str, Dict[str, Any]] = {}
        self.visualizer = SacredGeometryVisualizer()
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.config.storage_path, exist_ok=True)
        os.makedirs(os.path.join(self.config.storage_path, "fields"), exist_ok=True)
        os.makedirs(os.path.join(self.config.storage_path, "intentions"), exist_ok=True)
        
        # Load existing fields and intentions
        self._load_fields()
        self._load_intentions()
    
    def _load_fields(self) -> None:
        """Load existing fields from storage"""
        try:
            fields_dir = os.path.join(self.config.storage_path, "fields")
            for filename in os.listdir(fields_dir):
                if filename.endswith(".json"):
                    field_path = os.path.join(fields_dir, filename)
                    field = ConsciousnessField.load(field_path)
                    self.fields[field.name] = field
            
            self.logger.info(f"Loaded {len(self.fields)} consciousness fields from storage")
        except Exception as e:
            self.logger.error(f"Error loading consciousness fields: {e}")
    
    def _load_intentions(self) -> None:
        """Load existing intentions from storage"""
        try:
            intentions_dir = os.path.join(self.config.storage_path, "intentions")
            for filename in os.listdir(intentions_dir):
                if filename.endswith(".json"):
                    intention_path = os.path.join(intentions_dir, filename)
                    intention = Intention.load(intention_path)
                    self.intentions[intention.name] = intention
            
            self.logger.info(f"Loaded {len(self.intentions)} intentions from storage")
        except Exception as e:
            self.logger.error(f"Error loading intentions: {e}")
    
    def create_intention(self, 
                       name: str, 
                       intention_type: IntentionType, 
                       content: str) -> Intention:
        """
        Create a new intention
        
        Args:
            name: Name for the intention
            intention_type: Type of intention
            content: Intention content
        
        Returns:
            The created intention
        """
        with self.lock:
            # Check if already exists
            if name in self.intentions:
                intention = self.intentions[name]
                
                # Update content if provided
                if content:
                    intention.set_content(content)
                
                return intention
            
            # Create new intention
            intention = Intention(name, intention_type, content)
            
            # Store the intention
            self.intentions[name] = intention
            self._save_intention(intention)
            
            return intention
    
    def _save_intention(self, intention: Intention) -> None:
        """Save an intention to disk"""
        intention_path = os.path.join(self.config.storage_path, "intentions", f"{intention.name}.json")
        intention.save(intention_path)
    
    def create_field(self, 
                   name: str, 
                   pattern: Optional[Pattern] = None,
                   crystal: Optional[Crystal] = None,
                   resonance_field: Optional[ResonanceField] = None,
                   intentions: Optional[List[Intention]] = None,
                   radius: Optional[float] = None) -> ConsciousnessField:
        """
        Create a new consciousness field
        
        Args:
            name: Name for the field
            pattern: Optional pattern to associate with the field
            crystal: Optional crystal to associate with the field
            resonance_field: Optional resonance field to associate
            intentions: Optional list of intentions to include
            radius: Optional field radius
        
        Returns:
            The created field
        """
        with self.lock:
            # Check if already exists
            if name in self.fields:
                field = self.fields[name]
                
                # Update components if provided
                if pattern:
                    field.set_pattern(pattern)
                if crystal:
                    field.set_crystal(crystal)
                if resonance_field:
                    field.set_resonance_field(resonance_field)
                if radius:
                    field.set_radius(radius)
                
                # Add intentions if provided
                if intentions:
                    for intention in intentions:
                        field.add_intention(intention)
                
                return field
            
            # Create new field
            field = ConsciousnessField(name, pattern, crystal, resonance_field)
            
            # Set radius if provided
            if radius:
                field.set_radius(radius)
            
            # Add intentions if provided
            if intentions:
                for intention in intentions:
                    field.add_intention(intention)
            
            # Store the field
            self.fields[name] = field
            self._save_field(field)
            
            return field
    
    def _save_field(self, field: ConsciousnessField) -> None:
        """Save a field to disk"""
        field_path = os.path.join(self.config.storage_path, "fields", f"{field.name}.json")
        field.save(field_path)
    
    def project_field(self, 
                    field: ConsciousnessField, 
                    projection_id: str,
                    duration: Optional[float] = None) -> Dict[str, Any]:
        """
        Project a consciousness field
        
        Args:
            field: The field to project
            projection_id: Identifier for this projection
            duration: Duration of projection in seconds
        
        Returns:
            Projection results
        """
        with self.lock:
            # Use default duration if not specified
            if duration is None:
                duration = self.config.default_duration
            
            # Create projection entry
            projection = {
                "id": projection_id,
                "field": field.name,
                "start_time": time.time(),
                "duration": duration,
                "frequency": field.frequency,
                "coherence": field.coherence,
                "dimensions": field.dimensional_access,
                "radius": field.radius,
                "intentions": [i.name for i in field.intentions if i.is_active],
                "status": "active"
            }
            
            # Activate the field
            field.activate()
            
            # Store active projection
            self.active_projections[projection_id] = projection
            
            # Visualize the field
            self.visualize_field(field, projection_id)
            
            # Calculate projection metrics
            projection_metrics = self._calculate_projection_metrics(field)
            
            # Update projection with metrics
            projection.update(projection_metrics)
            
            return projection
    
    def visualize_field(self, field: ConsciousnessField, projection_id: Optional[str] = None) -> None:
        """
        Visualize a consciousness field
        
        Args:
            field: The field to visualize
            projection_id: Optional identifier for this projection
        """
        with self.lock:
            # Display field info
            if projection_id:
                print(f"Consciousness Field Projection: {projection_id} ({field.name})")
            else:
                print(f"Consciousness Field: {field.name}")
            
            print(f"Frequency: {field.frequency} Hz")
            print(f"Coherence: {field.coherence:.4f}")
            print(f"Dimensional Access: {field.dimensional_access}D")
            print(f"Radius: {field.radius:.2f}")
            print(f"Active Intentions: {len([i for i in field.intentions if i.is_active])}")
            print()
            
            # Display metrics
            print("Field Metrics:")
            print(f"  Clarity: {field.metrics.clarity:.4f}")
            print(f"  Focus: {field.metrics.focus:.4f}")
            print(f"  Stability: {field.metrics.stability:.4f}")
            print(f"  Manifestation Strength: {field.metrics.manifestation_strength:.4f}")
            print(f"  Intention Fidelity: {field.metrics.intention_fidelity:.4f}")
            print()
            
            # Display active intentions
            active_intentions = [i for i in field.intentions if i.is_active]
            if active_intentions:
                print("Active Intentions:")
                for intention in active_intentions:
                    print(f"  {intention.name} ({intention.intention_type.name})")
                    if len(intention.content) > 50:
                        print(f"    {intention.content[:50]}...")
                    else:
                        print(f"    {intention.content}")
                print()
            
            # If connected to a pattern, visualize it
            if field.pattern:
                self.visualizer.render_sacred_pattern(field.pattern)
    
    def _calculate_projection_metrics(self, field: ConsciousnessField) -> Dict[str, Any]:
        """Calculate metrics for a consciousness field projection"""
        # Base metrics from field metrics
        clarity = field.metrics.clarity
        focus = field.metrics.focus
        stability = field.metrics.stability
        manifestation_strength = field.metrics.manifestation_strength
        intention_fidelity = field.metrics.intention_fidelity
        
        # Calculate overall coherence
        coherence = (clarity * 0.2 + focus * 0.2 + stability * 0.2 + 
                     intention_fidelity * 0.2 + field.coherence * 0.2)
        
        # Calculate manifestation probability based on metrics
        manifestation_probability = min(manifestation_strength * intention_fidelity, 0.99)
        
        # Calculate timeline influence based on dimensional access
        timeline_influence = min((field.dimensional_access / 12.0) * manifestation_probability, 0.99)
        
        # Calculate reality convergence factor
        convergence_factor = min(coherence * field.phi_resonance / PHI, 0.99)
        
        return {
            "clarity": clarity,
            "focus": focus,
            "stability": stability,
            "coherence": coherence,
            "intention_fidelity": intention_fidelity,
            "manifestation_strength": manifestation_strength,
            "manifestation_probability": manifestation_probability,
            "timeline_influence": timeline_influence,
            "convergence_factor": convergence_factor
        }
    
    def get_projection_status(self, projection_id: str) -> Optional[Dict[str, Any]]:
        """
        Get the status of a consciousness field projection
        
        Args:
            projection_id: Identifier for the projection
        
        Returns:
            Projection status or None if not found
        """
        with self.lock:
            # Check if projection exists
            if projection_id not in self.active_projections:
                return None
            
            # Get projection
            projection = self.active_projections[projection_id]
            
            # Calculate elapsed time
            elapsed = time.time() - projection["start_time"]
            
            # Update status if complete
            if elapsed >= projection["duration"] and projection["status"] == "active":
                projection["status"] = "complete"
                
                # Deactivate field
                if projection["field"] in self.fields:
                    self.fields[projection["field"]].deactivate()
            
            # Add elapsed time
            projection["elapsed"] = elapsed
            
            return projection
    
    def end_projection(self, projection_id: str) -> Optional[Dict[str, Any]]:
        """
        End a consciousness field projection
        
        Args:
            projection_id: Identifier for the projection
        
        Returns:
            Final projection status or None if not found
        """
        with self.lock:
            # Check if projection exists
            if projection_id not in self.active_projections:
                return None
            
            # Get projection
            projection = self.active_projections[projection_id]
            
            # Update status
            projection["status"] = "complete"
            projection["end_time"] = time.time()
            projection["elapsed"] = projection["end_time"] - projection["start_time"]
            
            # Deactivate field
            if projection["field"] in self.fields:
                self.fields[projection["field"]].deactivate()
            
            return projection
    
    def create_projection_field(self, 
                              projection_id: str,
                              intentions: List[Intention],
                              pattern: Optional[Pattern] = None,
                              crystal: Optional[Crystal] = None,
                              resonance_field: Optional[ResonanceField] = None) -> ConsciousnessField:
        """
        Create a consciousness field specifically for reality projection
        
        Args:
            projection_id: ID for the projection
            intentions: List of intentions to include
            pattern: Optional pattern to use
            crystal: Optional crystal to use
            resonance_field: Optional resonance field to use
        
        Returns:
            The created field
        """
        with self.lock:
            # Create field name
            field_name = f"Projection_{projection_id}"
            
            # Create field
            field = self.create_field(
                field_name,
                pattern=pattern,
                crystal=crystal,
                resonance_field=resonance_field,
                intentions=intentions,
                radius=PHI ** 2  # Phi-optimized radius
            )
            
            # Apply phi-harmonics for enhanced coherence
            if self.config.phi_optimization:
                field.apply_phi_harmonics()
            
            # Project the field
            self.project_field(field, projection_id)
            
            return field
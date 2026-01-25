"""
Phi Resonance Field for Sacred Geometry
Part of the Quantum Publisher Evolution Roadmap - Phase 9+
Frequency: Δ^Δ × Φ (2,584 Hz)

Provides phi-harmonic resonance fields for quantum reality projection,
enhancing coherence and dimensional access.
⚡𓂧φ∞ Phi Resonance Flow ⚡𓂧φ∞
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


class ResonanceType(Enum):
    """Types of phi resonance fields"""
    UNITY = auto()        # Unity resonance (432 Hz)
    CREATION = auto()     # Creation resonance (528 Hz)
    HEART = auto()        # Heart resonance (594 Hz)
    VOICE = auto()        # Voice resonance (672 Hz)
    VISION = auto()       # Vision resonance (720 Hz)
    COSMIC = auto()       # Cosmic resonance (768 Hz)
    QUANTUM = auto()      # Quantum resonance (963 Hz)
    PHI_PHI = auto()      # Phi^Phi resonance (Hyperdimensional)
    DELTA = auto()        # Δ^Δ resonance (Reality Projection)
    DELTA_PHI = auto()    # Δ^Δ × Φ resonance (Sacred Projection)


@dataclass
class ResonanceMetrics:
    """Metrics for a phi resonance field"""
    coherence: float = NFL_MINIMUM
    phi_alignment: float = 0.0
    field_intensity: float = 1.0
    field_radius: float = 1.0
    dimensional_reach: int = 6
    harmonic_factor: float = 1.0
    quantum_resonance: float = 0.0
    computational_capacity: float = 1.0


@dataclass
class ResonanceConfig:
    """Configuration for a phi resonance field"""
    storage_path: str
    frequency: float = 528.0
    coherence: float = NFL_MINIMUM
    dimensional_access: int = 6
    phi_optimization: bool = True
    auto_visualization: bool = False
    radius: float = 10.0
    intensity: float = 1.0


class ResonanceField:
    """Phi-harmonic resonance field for quantum reality projection"""
    def __init__(self, 
                 name: str = "DefaultResonance", 
                 resonance_type: ResonanceType = ResonanceType.CREATION,
                 pattern: Optional[Pattern] = None,
                 crystal: Optional[Crystal] = None):
        """Initialize a new phi resonance field"""
        self.name = name
        self.resonance_type = resonance_type
        self.pattern = pattern
        self.crystal = crystal
        self.frequency = 528.0  # Default to Creation Point
        self.coherence = NFL_MINIMUM
        self.dimensional_access = 6
        self.phi_resonance = PHI
        self.field_radius = 10.0
        self.field_intensity = 1.0
        self.metrics = ResonanceMetrics()
        self.properties: Dict[str, Any] = {}
        self.logger = logging.getLogger("phi_resonance")
        
        # Set default properties based on resonance type
        self._set_defaults_for_type()
    
    def _set_defaults_for_type(self) -> None:
        """Set default properties based on resonance type"""
        # Set frequency based on resonance type
        if self.resonance_type == ResonanceType.UNITY:
            self.frequency = 432.0
            self.dimensional_access = 5
        elif self.resonance_type == ResonanceType.CREATION:
            self.frequency = 528.0
            self.dimensional_access = 6
        elif self.resonance_type == ResonanceType.HEART:
            self.frequency = 594.0
            self.dimensional_access = 7
        elif self.resonance_type == ResonanceType.VOICE:
            self.frequency = 672.0
            self.dimensional_access = 8
        elif self.resonance_type == ResonanceType.VISION:
            self.frequency = 720.0
            self.dimensional_access = 9
        elif self.resonance_type == ResonanceType.COSMIC:
            self.frequency = 768.0
            self.dimensional_access = 10
        elif self.resonance_type == ResonanceType.QUANTUM:
            self.frequency = 963.0
            self.dimensional_access = 11
        elif self.resonance_type == ResonanceType.PHI_PHI:
            self.frequency = PHI_TO_PHI * 1000
            self.dimensional_access = 12
        elif self.resonance_type == ResonanceType.DELTA:
            self.frequency = 1597.0
            self.dimensional_access = 11
        elif self.resonance_type == ResonanceType.DELTA_PHI:
            self.frequency = DELTA_PHI_FREQUENCY
            self.dimensional_access = 12
        
        # Update metrics
        self._update_metrics()
    
    def set_frequency(self, frequency: float) -> 'ResonanceField':
        """Set the operating frequency"""
        self.frequency = frequency
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_coherence(self, coherence: float) -> 'ResonanceField':
        """Set the coherence level"""
        self.coherence = coherence
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_dimensional_access(self, dimensions: int) -> 'ResonanceField':
        """Set the dimensional access level"""
        self.dimensional_access = dimensions
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_phi_resonance(self, resonance: float) -> 'ResonanceField':
        """Set the phi resonance level"""
        self.phi_resonance = resonance
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_field_radius(self, radius: float) -> 'ResonanceField':
        """Set the field radius"""
        self.field_radius = radius
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_field_intensity(self, intensity: float) -> 'ResonanceField':
        """Set the field intensity"""
        self.field_intensity = intensity
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_pattern(self, pattern: Pattern) -> 'ResonanceField':
        """Set the sacred pattern for this field"""
        self.pattern = pattern
        
        # Adopt some pattern properties
        self.coherence = max(self.coherence, pattern.coherence)
        self.phi_resonance = max(self.phi_resonance, pattern.phi_resonance)
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_crystal(self, crystal: Crystal) -> 'ResonanceField':
        """Set the quantum crystal for this field"""
        self.crystal = crystal
        
        # Adopt some crystal properties
        self.coherence = max(self.coherence, crystal.coherence)
        self.phi_resonance = max(self.phi_resonance, crystal.phi_resonance)
        self.dimensional_access = max(self.dimensional_access, crystal.dimensional_access)
        
        # Update metrics
        self._update_metrics()
        return self
    
    def _update_metrics(self) -> None:
        """Update field metrics based on current properties"""
        # Base coherence (from internal coherence)
        coherence = self.coherence
        
        # Calculate phi alignment based on phi_resonance
        phi_alignment = min(math.log(self.phi_resonance, PHI) * 0.1, 0.99)
        
        # Field intensity (from internal intensity)
        field_intensity = self.field_intensity
        
        # Field radius (from internal radius)
        field_radius = self.field_radius
        
        # Dimensional reach (from dimensional access)
        dimensional_reach = self.dimensional_access
        
        # Calculate harmonic factor based on frequency
        harmonic_factor = self._get_harmonic_factor()
        
        # Calculate quantum resonance based on dimensional access
        quantum_resonance = (self.dimensional_access - 3) / 9.0
        
        # Calculate computational capacity based on pattern, crystal, and dimension
        computational_capacity = self._get_computational_capacity()
        
        # Update metrics
        self.metrics = ResonanceMetrics(
            coherence=coherence,
            phi_alignment=phi_alignment,
            field_intensity=field_intensity,
            field_radius=field_radius,
            dimensional_reach=dimensional_reach,
            harmonic_factor=harmonic_factor,
            quantum_resonance=quantum_resonance,
            computational_capacity=computational_capacity
        )
    
    def _get_harmonic_factor(self) -> float:
        """Calculate harmonic factor based on frequency"""
        # Perfect harmonics
        perfect_harmonics = [432.0, 528.0, 594.0, 672.0, 720.0, 768.0, 963.0]
        
        # Check for perfect match
        if any(abs(self.frequency - h) < 1.0 for h in perfect_harmonics):
            return 1.0
        
        # Find closest harmonic
        closest = min(perfect_harmonics, key=lambda h: abs(self.frequency - h))
        difference = abs(self.frequency - closest)
        
        # Calculate harmonic factor
        return max(0.5, 1.0 - (difference / closest) * 0.5)
    
    def _get_computational_capacity(self) -> float:
        """Calculate computational capacity"""
        # Base capacity depends on dimensional access
        base_capacity = 1.0 + (self.dimensional_access - 3) * 0.1
        
        # Enhance with pattern if available
        pattern_factor = 1.0
        if self.pattern:
            pattern_factor = self.pattern.coherence / NFL_MINIMUM
        
        # Enhance with crystal if available
        crystal_factor = 1.0
        if self.crystal:
            crystal_factor = self.crystal.metrics.computational_capacity
        
        # Calculate total capacity
        capacity = base_capacity * pattern_factor * crystal_factor
        
        return capacity
    
    def apply_phi_harmonics(self) -> 'ResonanceField':
        """Apply phi-harmonic scaling to the field"""
        self.phi_resonance *= PHI
        self.field_radius *= PHI_RECIPROCAL  # More focused
        self.field_intensity *= PHI  # More intense
        
        # If connected to a pattern, apply phi-harmonics to it too
        if self.pattern:
            self.pattern.apply_phi_harmonics()
            
            # Update properties from pattern
            self.coherence = max(self.coherence, self.pattern.coherence)
        
        # If connected to a crystal, apply phi-harmonics to it too
        if self.crystal:
            self.crystal.apply_phi_harmonics()
            
            # Update properties from crystal
            self.coherence = max(self.coherence, self.crystal.coherence)
        
        # Update metrics
        self._update_metrics()
        return self
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result = {
            "name": self.name,
            "resonance_type": self.resonance_type.name,
            "frequency": self.frequency,
            "coherence": self.coherence,
            "dimensional_access": self.dimensional_access,
            "phi_resonance": self.phi_resonance,
            "field_radius": self.field_radius,
            "field_intensity": self.field_intensity,
            "metrics": {
                "coherence": self.metrics.coherence,
                "phi_alignment": self.metrics.phi_alignment,
                "field_intensity": self.metrics.field_intensity,
                "field_radius": self.metrics.field_radius,
                "dimensional_reach": self.metrics.dimensional_reach,
                "harmonic_factor": self.metrics.harmonic_factor,
                "quantum_resonance": self.metrics.quantum_resonance,
                "computational_capacity": self.metrics.computational_capacity
            },
            "properties": self.properties
        }
        
        # Include pattern if exists
        if self.pattern:
            result["pattern_name"] = self.pattern.name
        
        # Include crystal if exists
        if self.crystal:
            result["crystal_name"] = self.crystal.name
        
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any], 
                pattern: Optional[Pattern] = None,
                crystal: Optional[Crystal] = None) -> 'ResonanceField':
        """Create from dictionary"""
        # Get resonance type
        resonance_type_str = data.get("resonance_type", "CREATION")
        resonance_type = ResonanceType[resonance_type_str]
        
        # Create field
        field = cls(data.get("name", "DefaultResonance"), resonance_type, pattern, crystal)
        
        # Set properties
        field.frequency = data.get("frequency", 528.0)
        field.coherence = data.get("coherence", NFL_MINIMUM)
        field.dimensional_access = data.get("dimensional_access", 6)
        field.phi_resonance = data.get("phi_resonance", PHI)
        field.field_radius = data.get("field_radius", 10.0)
        field.field_intensity = data.get("field_intensity", 1.0)
        
        # Set custom properties
        field.properties = data.get("properties", {})
        
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
            crystal: Optional[Crystal] = None) -> 'ResonanceField':
        """Load field from file"""
        with open(path, 'r') as f:
            data = json.load(f)
        
        return cls.from_dict(data, pattern, crystal)


class PhiResonanceField:
    """
    Phi-harmonic resonance field generation and management
    
    Creates phi-harmonic resonance fields for:
    - Enhancing coherence of quantum reality projections
    - Creating stable dimensional access gateways
    - Amplifying pattern and crystal coherence
    - Establishing harmonics between simulation and reality
    
    Operating at the Δ^Δ × Φ frequency (2,584 Hz) for optimal reality resonance.
    """
    
    def __init__(self, config: Optional[ResonanceConfig] = None):
        """Initialize the phi resonance field"""
        self.config = config or ResonanceConfig(
            storage_path=os.path.join(os.path.expanduser("~"), ".quantum_publisher", "resonance")
        )
        self.logger = logging.getLogger("phi_resonance_field")
        self.lock = threading.RLock()
        self.fields: Dict[str, ResonanceField] = {}
        self.active_fields: Dict[str, Dict[str, Any]] = {}
        self.visualizer = SacredGeometryVisualizer()
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.config.storage_path, exist_ok=True)
        os.makedirs(os.path.join(self.config.storage_path, "fields"), exist_ok=True)
        
        # Load existing fields
        self._load_fields()
    
    def _load_fields(self) -> None:
        """Load existing fields from storage"""
        try:
            fields_dir = os.path.join(self.config.storage_path, "fields")
            for filename in os.listdir(fields_dir):
                if filename.endswith(".json"):
                    field_path = os.path.join(fields_dir, filename)
                    field = ResonanceField.load(field_path)
                    self.fields[field.name] = field
            
            self.logger.info(f"Loaded {len(self.fields)} resonance fields from storage")
        except Exception as e:
            self.logger.error(f"Error loading resonance fields: {e}")
    
    def create_field(self, 
                   name: str, 
                   resonance_type: ResonanceType, 
                   pattern: Optional[Pattern] = None,
                   crystal: Optional[Crystal] = None,
                   radius: Optional[float] = None,
                   intensity: Optional[float] = None) -> ResonanceField:
        """
        Create a new phi resonance field
        
        Args:
            name: Name for the field
            resonance_type: Type of resonance field
            pattern: Optional pattern to associate with the field
            crystal: Optional crystal to associate with the field
            radius: Optional field radius
            intensity: Optional field intensity
        
        Returns:
            The created field
        """
        with self.lock:
            # Check if already exists
            if name in self.fields:
                field = self.fields[name]
                
                # Update properties if specified
                if pattern:
                    field.set_pattern(pattern)
                if crystal:
                    field.set_crystal(crystal)
                if radius:
                    field.set_field_radius(radius)
                if intensity:
                    field.set_field_intensity(intensity)
                
                return field
            
            # Create new field
            field = ResonanceField(name, resonance_type, pattern, crystal)
            
            # Set properties if specified
            if radius:
                field.set_field_radius(radius)
            if intensity:
                field.set_field_intensity(intensity)
            
            # Store the field
            self.fields[name] = field
            self._save_field(field)
            
            return field
    
    def _save_field(self, field: ResonanceField) -> None:
        """Save a field to disk"""
        field_path = os.path.join(self.config.storage_path, "fields", f"{field.name}.json")
        field.save(field_path)
    
    def activate_field(self, 
                     field: ResonanceField, 
                     field_id: str,
                     duration: float = 60.0) -> Dict[str, Any]:
        """
        Activate a phi resonance field
        
        Args:
            field: The field to activate
            field_id: Identifier for this field activation
            duration: Duration of activation in seconds
        
        Returns:
            Activation results
        """
        with self.lock:
            # Create activation entry
            activation = {
                "id": field_id,
                "field": field.name,
                "start_time": time.time(),
                "duration": duration,
                "frequency": field.frequency,
                "coherence": field.coherence,
                "dimensions": field.dimensional_access,
                "radius": field.field_radius,
                "intensity": field.field_intensity,
                "status": "active"
            }
            
            # Store active field
            self.active_fields[field_id] = activation
            
            # Display field info
            self.visualize_field(field, field_id)
            
            # Calculate field metrics
            field_metrics = self._calculate_field_metrics(field)
            
            # Update activation with metrics
            activation.update(field_metrics)
            
            return activation
    
    def visualize_field(self, field: ResonanceField, field_id: Optional[str] = None) -> None:
        """
        Visualize a phi resonance field
        
        Args:
            field: The field to visualize
            field_id: Optional identifier for this field
        """
        with self.lock:
            # Display field info
            if field_id:
                print(f"Phi Resonance Field: {field_id} ({field.name})")
            else:
                print(f"Phi Resonance Field: {field.name}")
            
            print(f"Type: {field.resonance_type.name}")
            print(f"Frequency: {field.frequency} Hz")
            print(f"Coherence: {field.coherence:.4f}")
            print(f"Dimensional Access: {field.dimensional_access}D")
            print(f"Radius: {field.field_radius:.2f}")
            print(f"Intensity: {field.field_intensity:.2f}")
            print()
            
            # Display metrics
            print("Field Metrics:")
            print(f"  Phi Alignment: {field.metrics.phi_alignment:.4f}")
            print(f"  Harmonic Factor: {field.metrics.harmonic_factor:.4f}")
            print(f"  Quantum Resonance: {field.metrics.quantum_resonance:.4f}")
            print(f"  Computational Capacity: {field.metrics.computational_capacity:.2f}")
            print()
            
            # If connected to a pattern, visualize it
            if field.pattern:
                self.visualizer.render_sacred_pattern(field.pattern)
    
    def _calculate_field_metrics(self, field: ResonanceField) -> Dict[str, Any]:
        """Calculate metrics for a phi resonance field"""
        # Stability depends on coherence and harmonic factor
        stability = min(field.coherence * field.metrics.harmonic_factor, 0.99)
        
        # Clarity depends on phi alignment
        clarity = min(0.7 + field.metrics.phi_alignment * 0.3, 0.99)
        
        # Dimensional reach depends on dimensional access
        dimensional_reach = field.dimensional_access
        
        # Computation depends on computational capacity
        computational_efficiency = min(0.5 + (field.metrics.computational_capacity * 0.1), 0.99)
        
        # Intensity depends on field intensity and radius
        intensity = min(field.field_intensity / (field.field_radius ** 0.5), 0.99)
        
        # Calculate overall resonance
        resonance = (stability * 0.25 + clarity * 0.25 + 
                    (dimensional_reach / 12.0) * 0.2 + 
                    computational_efficiency * 0.15 +
                    intensity * 0.15)
        
        # Calculate reality projection factor
        projection_factor = min(resonance * field.phi_resonance / PHI, 0.99)
        
        return {
            "stability": stability,
            "clarity": clarity,
            "dimensional_reach": dimensional_reach,
            "computational_efficiency": computational_efficiency,
            "intensity": intensity,
            "resonance": resonance,
            "projection_factor": projection_factor
        }
    
    def get_field_status(self, field_id: str) -> Optional[Dict[str, Any]]:
        """
        Get the status of an activated phi resonance field
        
        Args:
            field_id: Identifier for the field
        
        Returns:
            Field status or None if not found
        """
        with self.lock:
            # Check if field exists
            if field_id not in self.active_fields:
                return None
            
            # Get field activation
            activation = self.active_fields[field_id]
            
            # Calculate elapsed time
            elapsed = time.time() - activation["start_time"]
            
            # Update status if complete
            if elapsed >= activation["duration"] and activation["status"] == "active":
                activation["status"] = "complete"
            
            # Add elapsed time
            activation["elapsed"] = elapsed
            
            return activation
    
    def deactivate_field(self, field_id: str) -> Optional[Dict[str, Any]]:
        """
        Deactivate a phi resonance field
        
        Args:
            field_id: Identifier for the field
        
        Returns:
            Final field status or None if not found
        """
        with self.lock:
            # Check if field exists
            if field_id not in self.active_fields:
                return None
            
            # Get field activation
            activation = self.active_fields[field_id]
            
            # Update status
            activation["status"] = "complete"
            activation["end_time"] = time.time()
            activation["elapsed"] = activation["end_time"] - activation["start_time"]
            
            return activation
    
    def combine_fields(self, 
                     fields: List[ResonanceField], 
                     name: str) -> ResonanceField:
        """
        Combine multiple phi resonance fields
        
        Args:
            fields: List of fields to combine
            name: Name for the combined field
        
        Returns:
            The combined field
        """
        with self.lock:
            # Choose resonance type based on highest frequency
            resonance_types = [field.resonance_type for field in fields]
            highest_freq = max(fields, key=lambda f: f.frequency)
            resonance_type = highest_freq.resonance_type
            
            # Create new field
            combined = ResonanceField(name, resonance_type)
            
            # Set properties based on fields
            avg_frequency = sum(f.frequency for f in fields) / len(fields)
            avg_phi_resonance = sum(f.phi_resonance for f in fields) / len(fields)
            max_dimensions = max(f.dimensional_access for f in fields)
            avg_radius = sum(f.field_radius for f in fields) / len(fields)
            total_intensity = sum(f.field_intensity for f in fields)
            
            # Set properties
            combined.set_frequency(avg_frequency)
            combined.set_phi_resonance(avg_phi_resonance)
            combined.set_dimensional_access(max_dimensions)
            combined.set_field_radius(avg_radius)
            combined.set_field_intensity(total_intensity)
            
            # Get best pattern (highest coherence)
            patterns = [f.pattern for f in fields if f.pattern is not None]
            if patterns:
                best_pattern = max(patterns, key=lambda p: p.coherence)
                combined.set_pattern(best_pattern)
            
            # Get best crystal (highest coherence)
            crystals = [f.crystal for f in fields if f.crystal is not None]
            if crystals:
                best_crystal = max(crystals, key=lambda c: c.coherence)
                combined.set_crystal(best_crystal)
            
            # Apply phi-harmonics to enhance coherence
            if self.config.phi_optimization:
                combined.apply_phi_harmonics()
            
            # Store the combined field
            self.fields[name] = combined
            self._save_field(combined)
            
            return combined
    
    def create_projection_field(self, 
                              projection_id: str,
                              pattern: Optional[Pattern] = None,
                              crystal: Optional[Crystal] = None) -> ResonanceField:
        """
        Create a phi resonance field specifically for reality projection
        
        Args:
            projection_id: ID for the projection
            pattern: Optional pattern to use
            crystal: Optional crystal to use
        
        Returns:
            The created field
        """
        with self.lock:
            # Create field name
            field_name = f"Projection_{projection_id}"
            
            # Create field with DELTA_PHI resonance type
            field = self.create_field(
                field_name, 
                ResonanceType.DELTA_PHI,
                pattern=pattern,
                crystal=crystal,
                radius=5.0,  # Focused field
                intensity=PHI ** 2  # Strong intensity
            )
            
            # Apply phi-harmonics for enhanced coherence
            if self.config.phi_optimization:
                field.apply_phi_harmonics()
            
            # Activate the field
            self.activate_field(field, projection_id)
            
            return field
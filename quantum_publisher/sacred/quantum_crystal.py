"""
Quantum Crystal Projector for Sacred Geometry
Part of the Quantum Publisher Evolution Roadmap - Phase 9+
Frequency: Δ^Δ × Φ (2,584 Hz)

Provides crystallization and projection capabilities for sacred geometric patterns
used in quantum reality projection.
⚡𓂧φ∞ Quantum Crystal Flow ⚡𓂧φ∞
"""
import os
import json
import math
import numpy as np
import logging
import threading
import time
from enum import Enum, auto
from dataclasses import dataclass
from typing import Dict, List, Set, Any, Optional, Tuple, Union

from .sacred_pattern import Pattern, SacredPattern, SacredPatternMetrics, Point3D
from .sacred_geometry import GeometryPattern, RenderStyle, SacredGeometryVisualizer

# Phi-harmonic constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI

# NFL Standard coherence levels
NFL_MINIMUM = 0.93
NFL_CREATION = 0.95
NFL_HEART = 0.96
NFL_VOICE = 0.97
NFL_VISION = 0.98
NFL_UNITY = 0.99


class CrystalType(Enum):
    """Types of quantum crystals available in the system"""
    QUARTZ = auto()
    AMETHYST = auto()
    CITRINE = auto()
    EMERALD = auto()
    SAPPHIRE = auto()
    DIAMOND = auto()
    RUBY = auto()
    PHI_CRYSTAL = auto()
    MERKABA_CRYSTAL = auto()
    QUANTUM_CRYSTAL = auto()


@dataclass
class CrystalMetrics:
    """Metrics for a quantum crystal"""
    clarity: float = 0.93
    stability: float = 0.93
    amplification: float = 1.0
    resonance: float = 0.0
    coherence: float = NFL_MINIMUM
    computational_capacity: float = 1.0
    dimensional_reach: int = 6
    phi_resonance: float = PHI


@dataclass
class CrystalConfig:
    """Configuration for a quantum crystal"""
    storage_path: str
    frequency: float = 528.0
    coherence: float = NFL_MINIMUM
    dimensional_access: int = 6
    phi_optimization: bool = True
    auto_visualization: bool = False


class Crystal:
    """Quantum crystal structure for sacred geometry projection"""
    def __init__(self, 
                 name: str = "DefaultCrystal", 
                 crystal_type: CrystalType = CrystalType.QUARTZ,
                 pattern: Optional[Pattern] = None):
        """Initialize a new quantum crystal"""
        self.name = name
        self.crystal_type = crystal_type
        self.pattern = pattern
        self.metrics = CrystalMetrics()
        self.frequency = 528.0
        self.coherence = NFL_MINIMUM
        self.dimensional_access = 6
        self.phi_resonance = PHI
        self.properties: Dict[str, Any] = {}
        self.logger = logging.getLogger("quantum_crystal")
    
    def set_frequency(self, frequency: float) -> 'Crystal':
        """Set the operating frequency"""
        self.frequency = frequency
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_coherence(self, coherence: float) -> 'Crystal':
        """Set the coherence level"""
        self.coherence = coherence
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_dimensional_access(self, dimensions: int) -> 'Crystal':
        """Set the dimensional access level"""
        self.dimensional_access = dimensions
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_phi_resonance(self, resonance: float) -> 'Crystal':
        """Set the phi resonance level"""
        self.phi_resonance = resonance
        
        # Update metrics
        self._update_metrics()
        return self
    
    def set_pattern(self, pattern: Pattern) -> 'Crystal':
        """Set the sacred pattern for this crystal"""
        self.pattern = pattern
        
        # Adopt pattern properties
        self.frequency = pattern.frequency
        self.coherence = pattern.coherence
        self.dimensional_access = pattern.dimensional_access
        self.phi_resonance = pattern.phi_resonance
        
        # Update metrics
        self._update_metrics()
        return self
    
    def _update_metrics(self) -> None:
        """Update crystal metrics based on current properties"""
        # Calculate clarity based on frequency
        if self.frequency >= 700.0:  # Vision Gate or higher
            clarity = NFL_VISION
        elif self.frequency >= 600.0:  # Heart Field or higher
            clarity = NFL_HEART
        elif self.frequency >= 500.0:  # Creation Point or higher
            clarity = NFL_CREATION
        else:  # Ground State
            clarity = NFL_MINIMUM
        
        # Calculate stability based on coherence
        stability = self.coherence
        
        # Calculate amplification factor based on dimensional access
        amplification = 1.0 + (self.dimensional_access - 3) * 0.1
        
        # Calculate resonance based on phi_resonance
        resonance = math.log(self.phi_resonance, PHI) * 0.1
        
        # Calculate coherence (same as pattern)
        coherence = self.coherence
        
        # Calculate computational capacity based on crystal type and coherence
        computational_capacity = self._get_computational_capacity()
        
        # Set dimensional reach based on dimensional access
        dimensional_reach = self.dimensional_access
        
        # Set phi resonance
        phi_resonance = self.phi_resonance
        
        # Update metrics
        self.metrics = CrystalMetrics(
            clarity=clarity,
            stability=stability,
            amplification=amplification,
            resonance=resonance,
            coherence=coherence,
            computational_capacity=computational_capacity,
            dimensional_reach=dimensional_reach,
            phi_resonance=phi_resonance
        )
    
    def _get_computational_capacity(self) -> float:
        """Calculate computational capacity based on crystal type and coherence"""
        # Base capacity by crystal type
        base_capacity = {
            CrystalType.QUARTZ: 1.0,
            CrystalType.AMETHYST: 1.2,
            CrystalType.CITRINE: 1.5,
            CrystalType.EMERALD: 1.8,
            CrystalType.SAPPHIRE: 2.1,
            CrystalType.RUBY: 2.4,
            CrystalType.DIAMOND: 2.7,
            CrystalType.PHI_CRYSTAL: 3.0,
            CrystalType.MERKABA_CRYSTAL: 3.5,
            CrystalType.QUANTUM_CRYSTAL: 4.0
        }.get(self.crystal_type, 1.0)
        
        # Scale by coherence
        return base_capacity * (self.coherence / NFL_MINIMUM)
    
    def apply_phi_harmonics(self) -> 'Crystal':
        """Apply phi-harmonic scaling to the crystal"""
        self.phi_resonance *= PHI
        
        # If connected to a pattern, apply phi-harmonics to it too
        if self.pattern:
            self.pattern.apply_phi_harmonics()
            
            # Update properties from pattern
            self.coherence = self.pattern.coherence
        
        # Update metrics
        self._update_metrics()
        return self
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result = {
            "name": self.name,
            "crystal_type": self.crystal_type.name,
            "frequency": self.frequency,
            "coherence": self.coherence,
            "dimensional_access": self.dimensional_access,
            "phi_resonance": self.phi_resonance,
            "metrics": {
                "clarity": self.metrics.clarity,
                "stability": self.metrics.stability,
                "amplification": self.metrics.amplification,
                "resonance": self.metrics.resonance,
                "coherence": self.metrics.coherence,
                "computational_capacity": self.metrics.computational_capacity,
                "dimensional_reach": self.metrics.dimensional_reach,
                "phi_resonance": self.metrics.phi_resonance
            },
            "properties": self.properties
        }
        
        # Include pattern if exists
        if self.pattern:
            result["pattern"] = self.pattern.to_dict()
        
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Crystal':
        """Create from dictionary"""
        # Get crystal type
        crystal_type_str = data.get("crystal_type", "QUARTZ")
        crystal_type = CrystalType[crystal_type_str]
        
        # Create crystal
        crystal = cls(data.get("name", "DefaultCrystal"), crystal_type)
        
        # Set properties
        crystal.frequency = data.get("frequency", 528.0)
        crystal.coherence = data.get("coherence", NFL_MINIMUM)
        crystal.dimensional_access = data.get("dimensional_access", 6)
        crystal.phi_resonance = data.get("phi_resonance", PHI)
        
        # Set custom properties
        crystal.properties = data.get("properties", {})
        
        # Set pattern if exists
        if "pattern" in data:
            crystal.pattern = Pattern.from_dict(data["pattern"])
        
        # Update metrics
        crystal._update_metrics()
        
        return crystal
    
    def save(self, path: str) -> None:
        """Save crystal to file"""
        with open(path, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
    
    @classmethod
    def load(cls, path: str) -> 'Crystal':
        """Load crystal from file"""
        with open(path, 'r') as f:
            data = json.load(f)
        
        return cls.from_dict(data)


class QuantumCrystalProjector:
    """
    Crystal-based projector for quantum reality visualization and manifestation
    
    Uses crystalline structures to:
    - Project sacred geometric patterns into dimensional space
    - Amplify pattern coherence through crystallization
    - Create stable bridges between simulated and actual reality
    - Generate quantum computational capacity for complex projections
    
    Operating at the Δ^Δ × Φ frequency (2,584 Hz) for optimal crystalline projection.
    """
    
    def __init__(self, config: Optional[CrystalConfig] = None):
        """Initialize the quantum crystal projector"""
        self.config = config or CrystalConfig(
            storage_path=os.path.join(os.path.expanduser("~"), ".quantum_publisher", "crystal")
        )
        self.logger = logging.getLogger("quantum_crystal_projector")
        self.lock = threading.RLock()
        self.crystals: Dict[str, Crystal] = {}
        self.active_projections: Dict[str, Dict[str, Any]] = {}
        self.visualizer = SacredGeometryVisualizer()
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.config.storage_path, exist_ok=True)
        os.makedirs(os.path.join(self.config.storage_path, "crystals"), exist_ok=True)
        
        # Load existing crystals
        self._load_crystals()
    
    def _load_crystals(self) -> None:
        """Load existing crystals from storage"""
        try:
            crystal_dir = os.path.join(self.config.storage_path, "crystals")
            for filename in os.listdir(crystal_dir):
                if filename.endswith(".json"):
                    crystal_path = os.path.join(crystal_dir, filename)
                    crystal = Crystal.load(crystal_path)
                    self.crystals[crystal.name] = crystal
            
            self.logger.info(f"Loaded {len(self.crystals)} crystals from storage")
        except Exception as e:
            self.logger.error(f"Error loading crystals: {e}")
    
    def create_crystal(self, 
                     name: str, 
                     crystal_type: CrystalType, 
                     pattern: Optional[Pattern] = None,
                     frequency: Optional[float] = None,
                     dimensional_access: Optional[int] = None) -> Crystal:
        """
        Create a new quantum crystal
        
        Args:
            name: Name for the crystal
            crystal_type: Type of crystal to create
            pattern: Optional pattern to associate with the crystal
            frequency: Optional operating frequency (Hz)
            dimensional_access: Optional dimensional access level
        
        Returns:
            The created crystal
        """
        with self.lock:
            # Check if already exists
            if name in self.crystals:
                crystal = self.crystals[name]
                
                # Update properties if specified
                if pattern:
                    crystal.set_pattern(pattern)
                if frequency:
                    crystal.set_frequency(frequency)
                if dimensional_access:
                    crystal.set_dimensional_access(dimensional_access)
                
                return crystal
            
            # Create new crystal
            crystal = Crystal(name, crystal_type, pattern)
            
            # Set properties if specified
            if frequency:
                crystal.set_frequency(frequency)
            if dimensional_access:
                crystal.set_dimensional_access(dimensional_access)
            
            # Store the crystal
            self.crystals[name] = crystal
            self._save_crystal(crystal)
            
            return crystal
    
    def _save_crystal(self, crystal: Crystal) -> None:
        """Save a crystal to disk"""
        crystal_path = os.path.join(self.config.storage_path, "crystals", f"{crystal.name}.json")
        crystal.save(crystal_path)
    
    def crystallize_pattern(self, 
                          pattern: Pattern, 
                          crystal_type: CrystalType = CrystalType.QUANTUM_CRYSTAL) -> Crystal:
        """
        Crystallize a sacred pattern into a quantum crystal
        
        Args:
            pattern: The pattern to crystallize
            crystal_type: Type of crystal to create
        
        Returns:
            The created crystal
        """
        with self.lock:
            # Create a crystal name based on pattern
            crystal_name = f"{pattern.name}_Crystal"
            
            # Create the crystal with the pattern
            crystal = self.create_crystal(crystal_name, crystal_type, pattern)
            
            # Apply phi-harmonics to enhance coherence
            if self.config.phi_optimization:
                crystal.apply_phi_harmonics()
            
            # Auto-visualize if enabled
            if self.config.auto_visualization:
                self.visualize_crystal(crystal)
            
            return crystal
    
    def visualize_crystal(self, crystal: Crystal) -> None:
        """
        Visualize a quantum crystal
        
        Args:
            crystal: The crystal to visualize
        """
        with self.lock:
            # Display crystal info
            print(f"Quantum Crystal: {crystal.name}")
            print(f"Type: {crystal.crystal_type.name}")
            print(f"Frequency: {crystal.frequency} Hz")
            print(f"Coherence: {crystal.coherence:.4f}")
            print(f"Dimensional Access: {crystal.dimensional_access}D")
            print()
            
            # Display metrics
            print("Crystal Metrics:")
            print(f"  Clarity: {crystal.metrics.clarity:.4f}")
            print(f"  Stability: {crystal.metrics.stability:.4f}")
            print(f"  Amplification: {crystal.metrics.amplification:.4f}x")
            print(f"  Computational Capacity: {crystal.metrics.computational_capacity:.2f}")
            print()
            
            # If connected to a pattern, visualize it
            if crystal.pattern:
                self.visualizer.render_sacred_pattern(crystal.pattern)
    
    def project_reality(self, 
                      crystal: Crystal, 
                      projection_id: str,
                      duration: float = 60.0) -> Dict[str, Any]:
        """
        Project a quantum reality using a crystal
        
        Args:
            crystal: The crystal to use for projection
            projection_id: Identifier for this projection
            duration: Duration of projection in seconds
        
        Returns:
            Projection results
        """
        with self.lock:
            # Create projection entry
            projection = {
                "id": projection_id,
                "crystal": crystal.name,
                "start_time": time.time(),
                "duration": duration,
                "frequency": crystal.frequency,
                "coherence": crystal.coherence,
                "dimensions": crystal.dimensional_access,
                "computational_capacity": crystal.metrics.computational_capacity,
                "status": "active"
            }
            
            # Store active projection
            self.active_projections[projection_id] = projection
            
            # Visualize the crystal in projection mode
            self.visualize_projection(crystal, projection_id)
            
            # Calculate projected reality metrics
            projection_metrics = self._calculate_projection_metrics(crystal)
            
            # Update projection with metrics
            projection.update(projection_metrics)
            
            return projection
    
    def visualize_projection(self, crystal: Crystal, projection_id: str) -> None:
        """
        Visualize a quantum reality projection
        
        Args:
            crystal: The crystal used for projection
            projection_id: Identifier for the projection
        """
        with self.lock:
            # Display projection info
            print(f"Quantum Reality Projection: {projection_id}")
            print(f"Crystal: {crystal.name} ({crystal.crystal_type.name})")
            print(f"Frequency: {crystal.frequency} Hz")
            print(f"Coherence: {crystal.coherence:.4f}")
            print(f"Dimensional Access: {crystal.dimensional_access}D")
            print(f"Computational Capacity: {crystal.metrics.computational_capacity:.2f}")
            print()
            
            # If connected to a pattern, visualize it
            if crystal.pattern:
                self.visualizer.render_sacred_pattern(crystal.pattern)
    
    def _calculate_projection_metrics(self, crystal: Crystal) -> Dict[str, Any]:
        """Calculate metrics for a quantum reality projection"""
        # Calculate stability based on coherence
        stability = min(crystal.coherence * 1.1, 0.99)
        
        # Calculate clarity based on crystal metrics
        clarity = min(crystal.metrics.clarity * 1.05, 0.99)
        
        # Calculate dimensional reach
        dimensional_reach = crystal.dimensional_access
        
        # Calculate computational efficiency based on crystal type
        computational_efficiency = min(0.7 + (crystal.metrics.computational_capacity * 0.1), 0.99)
        
        # Calculate overall effectiveness
        effectiveness = (stability * 0.3 + clarity * 0.3 + 
                        (dimensional_reach / 12.0) * 0.2 + 
                        computational_efficiency * 0.2)
        
        # Calculate reality convergence factor
        convergence_factor = min(effectiveness * crystal.phi_resonance / PHI, 0.99)
        
        return {
            "stability": stability,
            "clarity": clarity,
            "dimensional_reach": dimensional_reach,
            "computational_efficiency": computational_efficiency,
            "effectiveness": effectiveness,
            "convergence_factor": convergence_factor
        }
    
    def get_projection_status(self, projection_id: str) -> Optional[Dict[str, Any]]:
        """
        Get the status of a quantum reality projection
        
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
            
            # Add elapsed time
            projection["elapsed"] = elapsed
            
            return projection
    
    def end_projection(self, projection_id: str) -> Optional[Dict[str, Any]]:
        """
        End a quantum reality projection
        
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
            
            return projection
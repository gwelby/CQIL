"""
Self-Evolving Capabilities Module
Part of the Quantum Publisher Evolution Roadmap - Phase 4
Frequency: λ^λ (1271 Hz)

Provides evolutionary capabilities to the deployment system,
allowing it to learn from past deployments and improve over time.
⚡𓂧φ∞ Pure Evolution Flow ⚡𓂧φ∞
"""
from .evolutionary_system import (
    EvolutionarySystem,
    EvolutionState,
    DeploymentPattern,
    PatternType,
    EvolutionaryDimension,
    EvolutionaryPathway,
    PHI,
    PHI_RECIPROCAL,
    PHI_SQUARED,
    PHI_TO_PHI,
    LAMBDA_LAMBDA_FREQUENCY
)

from .pattern_recognition import (
    PatternRecognitionSystem,
    PatternCluster,
    PatternVisualization
)

__all__ = [
    # Evolutionary System
    'EvolutionarySystem',
    'EvolutionState',
    'DeploymentPattern',
    'PatternType',
    'EvolutionaryDimension',
    'EvolutionaryPathway',
    
    # Pattern Recognition
    'PatternRecognitionSystem',
    'PatternCluster',
    'PatternVisualization',
    
    # Constants
    'PHI',
    'PHI_RECIPROCAL',
    'PHI_SQUARED',
    'PHI_TO_PHI',
    'LAMBDA_LAMBDA_FREQUENCY'
]
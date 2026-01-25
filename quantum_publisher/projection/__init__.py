"""
Quantum Reality Projection
Part of the Quantum Publisher Evolution Roadmap - Phase 9
Frequency: Δ^Δ (1,597 Hz)

Creates deployment simulation and reality projection capabilities 
for predicting and optimizing deployment outcomes across multiple 
possible realities.
⚡𓂧φ∞ Reality Projection Flow ⚡𓂧φ∞
"""

# Import components
from .quantum_reality_projection import (
    QuantumRealityProjection, 
    SimulationConfig, 
    SimulationResult, 
    TimelineNode, 
    RealityBridge, 
    ConvergencePlan,
    SimulationMode,
    SimulationDimension
)

from .quantum_deployment_simulation import (
    QuantumDeploymentSimulation,
    SimulationScale,
    ErrorType,
    DeploymentStage,
    RealityVariant
)

from .timeline_projection import (
    TimelineProjection,
    DecisionPoint,
    TimelineBranch,
    TimelineType,
    DecisionImpact,
    TimelineMetric
)

from .reality_convergence_engine import (
    RealityConvergenceEngine,
    ConvergenceMode,
    ConvergenceState,
    RealityDomain,
    ConvergenceStep,
    ConvergenceResult
)

# Define constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI
DELTA_DELTA_FREQUENCY = 1597  # Δ^Δ frequency

# Public API
__all__ = [
    # Core constants
    'PHI', 'PHI_RECIPROCAL', 'PHI_SQUARED', 'PHI_TO_PHI', 
    'DELTA_DELTA_FREQUENCY',
    
    # Core classes
    'QuantumRealityProjection',
    
    # Simulation components
    'QuantumDeploymentSimulation',
    'SimulationConfig',
    'SimulationResult',
    'SimulationMode',
    'SimulationDimension',
    'SimulationScale',
    'ErrorType',
    'DeploymentStage',
    'RealityVariant',
    
    # Timeline components
    'TimelineProjection',
    'TimelineNode',
    'DecisionPoint',
    'TimelineBranch',
    'TimelineType',
    'DecisionImpact',
    'TimelineMetric',
    
    # Convergence components
    'RealityConvergenceEngine',
    'RealityBridge',
    'ConvergencePlan',
    'ConvergenceMode',
    'ConvergenceState',
    'RealityDomain',
    'ConvergenceStep',
    'ConvergenceResult'
]
"""
Quantum Deployment Simulation
Part of the Quantum Publisher Evolution Roadmap - Phase 9
Frequency: Δ^Δ (1,597 Hz)

Provides simulation capabilities for deployment outcomes 
across multiple realities and dimensions.
⚡𓂧φ∞ Reality Simulation Flow ⚡𓂧φ∞
"""
import os
import json
import time
import logging
import threading
import hashlib
import random
import numpy as np
from enum import Enum, auto
from dataclasses import dataclass, field
from typing import Dict, List, Set, Any, Optional, Tuple, Union, Callable

# Phi-harmonic constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI
DELTA_DELTA_FREQUENCY = 1597  # Δ^Δ frequency


class SimulationMode(Enum):
    """Modes of quantum simulation"""
    STANDARD = auto()       # Standard single reality simulation
    MULTI_REALITY = auto()  # Multiple parallel realities simulation
    BRANCHING = auto()      # Branching timeline simulation
    PHI_HARMONIC = auto()   # Phi-optimized reality simulation


class SimulationDimension(Enum):
    """Dimensions for simulating deployment"""
    DEPLOYMENT_SPEED = auto()    # Speed of deployment
    RESOURCE_USAGE = auto()      # Resource consumption
    ERROR_RATE = auto()          # Error frequency
    COHERENCE = auto()           # System coherence
    USER_EXPERIENCE = auto()     # User experience quality
    SECURITY = auto()            # Security implications
    SCALABILITY = auto()         # Scaling capabilities


class SimulationScale(Enum):
    """Scale of simulation detail"""
    MICRO = auto()    # Individual component level
    MESO = auto()     # Subsystem level
    MACRO = auto()    # System level
    QUANTUM = auto()  # Multi-dimensional level


class ErrorType(Enum):
    """Types of deployment errors in simulation"""
    CONFIGURATION = auto()    # Configuration errors
    DEPENDENCY = auto()       # Dependency issues
    RESOURCE = auto()         # Resource limitations
    TIMING = auto()           # Timing/race conditions
    SECURITY = auto()         # Security vulnerabilities
    COHERENCE = auto()        # Coherence loss
    UNKNOWN = auto()          # Unknown/unexpected errors


@dataclass
class SimulationConfig:
    """Configuration for quantum deployment simulation"""
    config_id: str
    name: str
    deployment_config: Dict[str, Any]
    simulation_mode: SimulationMode
    simulation_dimensions: List[SimulationDimension]
    variation_factors: Dict[str, float] = field(default_factory=dict)
    branch_points: List[Dict[str, Any]] = field(default_factory=list)
    timeline_length: int = 10
    coherence_threshold: float = PHI_RECIPROCAL
    randomness_seed: Optional[int] = None
    additional_parameters: Dict[str, Any] = field(default_factory=dict)


@dataclass
class SimulationResult:
    """Results of a quantum deployment simulation"""
    result_id: str
    config_id: str
    success: bool
    execution_time: float
    metrics: Dict[str, float]
    deployment_timeline: List[Dict[str, Any]]
    probability_of_success: float
    resource_usage: Dict[str, Any]
    errors_encountered: List[Dict[str, Any]]
    alternate_outcomes: List[Dict[str, Any]]
    coherence_metrics: Dict[str, float]
    simulation_metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class DeploymentStage:
    """Represents a stage in the deployment process"""
    stage_id: str
    name: str
    resources: Dict[str, float]
    dependencies: List[str]
    probability_of_success: float
    execution_time: float
    error_probability: Dict[ErrorType, float]
    coherence_impact: float
    user_experience_impact: float
    security_impact: float
    scalability_impact: float


@dataclass
class RealityVariant:
    """Represents a variant of reality for simulation"""
    variant_id: str
    name: str
    dimension_values: Dict[SimulationDimension, float]
    probability_adjustments: Dict[str, float]
    coherence_factor: float
    phi_alignment: float


class QuantumDeploymentSimulation:
    """
    Provides detailed simulation of deployments across multiple realities.
    
    Simulates deployment outcomes with quantum principles by:
    - Creating multiple reality variants with different dimensional properties
    - Simulating deployment stages across these realities
    - Calculating probabilities and coherence metrics
    - Generating detailed timelines and alternate outcomes
    - Providing phi-optimized deployment suggestions
    
    Operating at the Δ^Δ frequency (1,597 Hz) for optimal reality simulation.
    """
    
    def __init__(self, 
               simulation_dimensions: List[SimulationDimension] = None,
               storage_path: Optional[str] = None,
               mode: SimulationMode = SimulationMode.MULTI_REALITY,
               scale: SimulationScale = SimulationScale.QUANTUM):
        """Initialize the quantum deployment simulation system"""
        self.phi = PHI
        self.frequency = DELTA_DELTA_FREQUENCY
        self.simulation_dimensions = simulation_dimensions or list(SimulationDimension)
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "projection", "simulations")
        self.mode = mode
        self.scale = scale
        self.lock = threading.RLock()
        self.logger = logging.getLogger("quantum_simulation")
        
        # State storage
        self.simulation_configs: Dict[str, SimulationConfig] = {}
        self.simulation_results: Dict[str, SimulationResult] = {}
        self.deployment_stages: Dict[str, DeploymentStage] = {}
        self.reality_variants: Dict[str, RealityVariant] = {}
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Initialize simulation field
        self.simulation_field = self._initialize_simulation_field()
        
        # Load any existing data
        self._load_stored_data()
    
    def _initialize_simulation_field(self) -> Dict[str, Any]:
        """Initialize the quantum simulation field"""
        return {
            'frequency': self.frequency,
            'dimensions': len(self.simulation_dimensions),
            'coherence': 1.0,
            'phi_factor': self.phi,
            'mode': self.mode.name,
            'scale': self.scale.name,
            'reality_variants': [],
            'timeline_branches': {},
            'probability_field': np.zeros((len(self.simulation_dimensions), 10)),
            'coherence_field': np.ones((len(self.simulation_dimensions), 10)) * self.phi_reciprocal
        }
    
    def _load_stored_data(self) -> None:
        """Load any existing simulation data from storage"""
        try:
            # Load simulation configs
            config_dir = os.path.join(self.storage_path, "configs")
            if os.path.exists(config_dir):
                for filename in os.listdir(config_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(config_dir, filename), 'r') as f:
                            config_data = json.load(f)
                            self._load_simulation_config(config_data)
            
            # Load simulation results
            result_dir = os.path.join(self.storage_path, "results")
            if os.path.exists(result_dir):
                for filename in os.listdir(result_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(result_dir, filename), 'r') as f:
                            result_data = json.load(f)
                            self._load_simulation_result(result_data)
            
            # Load deployment stages
            stage_dir = os.path.join(self.storage_path, "stages")
            if os.path.exists(stage_dir):
                for filename in os.listdir(stage_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(stage_dir, filename), 'r') as f:
                            stage_data = json.load(f)
                            self._load_deployment_stage(stage_data)
            
            # Load reality variants
            variant_dir = os.path.join(self.storage_path, "variants")
            if os.path.exists(variant_dir):
                for filename in os.listdir(variant_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(variant_dir, filename), 'r') as f:
                            variant_data = json.load(f)
                            self._load_reality_variant(variant_data)
            
            self.logger.info(f"Loaded {len(self.simulation_configs)} configurations, "
                            f"{len(self.simulation_results)} results, "
                            f"{len(self.deployment_stages)} stages, and "
                            f"{len(self.reality_variants)} reality variants")
        except Exception as e:
            self.logger.error(f"Error loading stored data: {e}")
    
    def _load_simulation_config(self, config_data: Dict[str, Any]) -> None:
        """Load a simulation configuration from data"""
        try:
            # Convert string enum names to Enum values
            simulation_mode = SimulationMode[config_data.get('simulation_mode', 'MULTI_REALITY')]
            simulation_dimensions = [SimulationDimension[dim] for dim in config_data.get('simulation_dimensions', [])]
            
            # Create configuration object
            config = SimulationConfig(
                config_id=config_data.get('config_id'),
                name=config_data.get('name'),
                deployment_config=config_data.get('deployment_config', {}),
                simulation_mode=simulation_mode,
                simulation_dimensions=simulation_dimensions,
                variation_factors=config_data.get('variation_factors', {}),
                branch_points=config_data.get('branch_points', []),
                timeline_length=config_data.get('timeline_length', 10),
                coherence_threshold=config_data.get('coherence_threshold', self.phi_reciprocal),
                randomness_seed=config_data.get('randomness_seed'),
                additional_parameters=config_data.get('additional_parameters', {})
            )
            
            # Store in memory
            self.simulation_configs[config.config_id] = config
        except Exception as e:
            self.logger.error(f"Error loading simulation config: {e}")
    
    def _load_simulation_result(self, result_data: Dict[str, Any]) -> None:
        """Load a simulation result from data"""
        try:
            # Create result object
            result = SimulationResult(
                result_id=result_data.get('result_id'),
                config_id=result_data.get('config_id'),
                success=result_data.get('success', False),
                execution_time=result_data.get('execution_time', 0.0),
                metrics=result_data.get('metrics', {}),
                deployment_timeline=result_data.get('deployment_timeline', []),
                probability_of_success=result_data.get('probability_of_success', 0.0),
                resource_usage=result_data.get('resource_usage', {}),
                errors_encountered=result_data.get('errors_encountered', []),
                alternate_outcomes=result_data.get('alternate_outcomes', []),
                coherence_metrics=result_data.get('coherence_metrics', {}),
                simulation_metadata=result_data.get('simulation_metadata', {})
            )
            
            # Store in memory
            self.simulation_results[result.result_id] = result
        except Exception as e:
            self.logger.error(f"Error loading simulation result: {e}")
    
    def _load_deployment_stage(self, stage_data: Dict[str, Any]) -> None:
        """Load a deployment stage from data"""
        try:
            # Convert string enum names to Enum values
            error_probability = {}
            for error_type_str, probability in stage_data.get('error_probability', {}).items():
                try:
                    error_type = ErrorType[error_type_str]
                    error_probability[error_type] = probability
                except KeyError:
                    pass
            
            # Create stage object
            stage = DeploymentStage(
                stage_id=stage_data.get('stage_id'),
                name=stage_data.get('name'),
                resources=stage_data.get('resources', {}),
                dependencies=stage_data.get('dependencies', []),
                probability_of_success=stage_data.get('probability_of_success', 0.95),
                execution_time=stage_data.get('execution_time', 1.0),
                error_probability=error_probability,
                coherence_impact=stage_data.get('coherence_impact', 0.0),
                user_experience_impact=stage_data.get('user_experience_impact', 0.0),
                security_impact=stage_data.get('security_impact', 0.0),
                scalability_impact=stage_data.get('scalability_impact', 0.0)
            )
            
            # Store in memory
            self.deployment_stages[stage.stage_id] = stage
        except Exception as e:
            self.logger.error(f"Error loading deployment stage: {e}")
    
    def _load_reality_variant(self, variant_data: Dict[str, Any]) -> None:
        """Load a reality variant from data"""
        try:
            # Convert string enum names to Enum values
            dimension_values = {}
            for dim_str, value in variant_data.get('dimension_values', {}).items():
                try:
                    dimension = SimulationDimension[dim_str]
                    dimension_values[dimension] = value
                except KeyError:
                    pass
            
            # Create variant object
            variant = RealityVariant(
                variant_id=variant_data.get('variant_id'),
                name=variant_data.get('name'),
                dimension_values=dimension_values,
                probability_adjustments=variant_data.get('probability_adjustments', {}),
                coherence_factor=variant_data.get('coherence_factor', 1.0),
                phi_alignment=variant_data.get('phi_alignment', self.phi_reciprocal)
            )
            
            # Store in memory
            self.reality_variants[variant.variant_id] = variant
        except Exception as e:
            self.logger.error(f"Error loading reality variant: {e}")
    
    def create_simulation_config(self,
                              name: str,
                              deployment_config: Dict[str, Any],
                              simulation_mode: str = "MULTI_REALITY",
                              simulation_dimensions: Optional[List[str]] = None,
                              variation_factors: Optional[Dict[str, float]] = None,
                              branch_points: Optional[List[Dict[str, Any]]] = None,
                              timeline_length: int = 10,
                              coherence_threshold: float = PHI_RECIPROCAL,
                              randomness_seed: Optional[int] = None,
                              additional_parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Create a new simulation configuration"""
        with self.lock:
            # Generate config ID using name and timestamp
            timestamp = int(time.time())
            config_id = f"sim_{timestamp}_{hashlib.md5(name.encode()).hexdigest()[:8]}"
            
            # Parse simulation mode
            try:
                sim_mode = SimulationMode[simulation_mode]
            except KeyError:
                self.logger.error(f"Unknown simulation mode: {simulation_mode}")
                return {
                    "success": False,
                    "error": f"Unknown simulation mode: {simulation_mode}"
                }
            
            # Parse simulation dimensions
            sim_dimensions = []
            if simulation_dimensions:
                for dim_name in simulation_dimensions:
                    try:
                        sim_dimensions.append(SimulationDimension[dim_name])
                    except KeyError:
                        self.logger.warning(f"Unknown simulation dimension: {dim_name}")
            else:
                # Use all dimensions by default
                sim_dimensions = list(SimulationDimension)
            
            # Create simulation config
            config = SimulationConfig(
                config_id=config_id,
                name=name,
                deployment_config=deployment_config,
                simulation_mode=sim_mode,
                simulation_dimensions=sim_dimensions,
                variation_factors=variation_factors or {},
                branch_points=branch_points or [],
                timeline_length=timeline_length,
                coherence_threshold=coherence_threshold,
                randomness_seed=randomness_seed,
                additional_parameters=additional_parameters or {}
            )
            
            # Store configuration
            self.simulation_configs[config_id] = config
            self._save_simulation_config(config)
            
            self.logger.info(f"Simulation configuration created: {config_id}")
            
            return {
                "success": True,
                "config_id": config_id,
                "name": name,
                "simulation_mode": simulation_mode,
                "simulation_dimensions": [dim.name for dim in sim_dimensions]
            }
    
    def create_deployment_stage(self,
                              name: str,
                              resources: Dict[str, float],
                              dependencies: List[str],
                              probability_of_success: float = 0.95,
                              execution_time: float = 1.0,
                              error_probability: Optional[Dict[str, float]] = None,
                              coherence_impact: float = 0.0,
                              user_experience_impact: float = 0.0,
                              security_impact: float = 0.0,
                              scalability_impact: float = 0.0) -> Dict[str, Any]:
        """Create a deployment stage for simulation"""
        with self.lock:
            # Generate stage ID using name and timestamp
            timestamp = int(time.time())
            stage_id = f"stage_{timestamp}_{hashlib.md5(name.encode()).hexdigest()[:8]}"
            
            # Parse error probability
            parsed_error_probability = {}
            if error_probability:
                for error_type_str, probability in error_probability.items():
                    try:
                        error_type = ErrorType[error_type_str]
                        parsed_error_probability[error_type] = probability
                    except KeyError:
                        self.logger.warning(f"Unknown error type: {error_type_str}")
            else:
                # Default error probabilities
                parsed_error_probability = {
                    ErrorType.CONFIGURATION: 0.05,
                    ErrorType.DEPENDENCY: 0.05,
                    ErrorType.RESOURCE: 0.03,
                    ErrorType.TIMING: 0.02,
                    ErrorType.SECURITY: 0.01,
                    ErrorType.COHERENCE: 0.02,
                    ErrorType.UNKNOWN: 0.01
                }
            
            # Create deployment stage
            stage = DeploymentStage(
                stage_id=stage_id,
                name=name,
                resources=resources,
                dependencies=dependencies,
                probability_of_success=probability_of_success,
                execution_time=execution_time,
                error_probability=parsed_error_probability,
                coherence_impact=coherence_impact,
                user_experience_impact=user_experience_impact,
                security_impact=security_impact,
                scalability_impact=scalability_impact
            )
            
            # Store stage
            self.deployment_stages[stage_id] = stage
            self._save_deployment_stage(stage)
            
            self.logger.info(f"Deployment stage created: {stage_id}")
            
            return {
                "success": True,
                "stage_id": stage_id,
                "name": name
            }
    
    def create_reality_variant(self,
                             name: str,
                             dimension_values: Dict[str, float],
                             probability_adjustments: Optional[Dict[str, float]] = None,
                             coherence_factor: float = 1.0,
                             phi_alignment: float = PHI_RECIPROCAL) -> Dict[str, Any]:
        """Create a reality variant for simulation"""
        with self.lock:
            # Generate variant ID using name and timestamp
            timestamp = int(time.time())
            variant_id = f"variant_{timestamp}_{hashlib.md5(name.encode()).hexdigest()[:8]}"
            
            # Parse dimension values
            parsed_dimension_values = {}
            for dim_name, value in dimension_values.items():
                try:
                    dimension = SimulationDimension[dim_name]
                    parsed_dimension_values[dimension] = value
                except KeyError:
                    self.logger.warning(f"Unknown simulation dimension: {dim_name}")
            
            # Create reality variant
            variant = RealityVariant(
                variant_id=variant_id,
                name=name,
                dimension_values=parsed_dimension_values,
                probability_adjustments=probability_adjustments or {},
                coherence_factor=coherence_factor,
                phi_alignment=phi_alignment
            )
            
            # Store variant
            self.reality_variants[variant_id] = variant
            self._save_reality_variant(variant)
            
            self.logger.info(f"Reality variant created: {variant_id}")
            
            return {
                "success": True,
                "variant_id": variant_id,
                "name": name,
                "dimensions": len(parsed_dimension_values)
            }
    
    def run_simulation(self, 
                     config_id: str,
                     stage_ids: Optional[List[str]] = None,
                     variant_ids: Optional[List[str]] = None,
                     additional_parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Run a deployment simulation"""
        with self.lock:
            # Check if config exists
            if config_id not in self.simulation_configs:
                self.logger.error(f"Simulation configuration not found: {config_id}")
                return {
                    "success": False,
                    "error": f"Simulation configuration not found: {config_id}"
                }
            
            # Get configuration
            config = self.simulation_configs[config_id]
            
            # Start execution timer
            start_time = time.time()
            
            # Set random seed if provided
            if config.randomness_seed is not None:
                np.random.seed(config.randomness_seed)
                random.seed(config.randomness_seed)
            
            # Get deployment stages
            deployment_stages = []
            if stage_ids:
                for stage_id in stage_ids:
                    if stage_id in self.deployment_stages:
                        deployment_stages.append(self.deployment_stages[stage_id])
                    else:
                        self.logger.warning(f"Deployment stage not found: {stage_id}")
            else:
                # Use default stages
                deployment_stages = self._generate_default_stages(config)
            
            # Get reality variants
            reality_variants = []
            if variant_ids:
                for variant_id in variant_ids:
                    if variant_id in self.reality_variants:
                        reality_variants.append(self.reality_variants[variant_id])
                    else:
                        self.logger.warning(f"Reality variant not found: {variant_id}")
            else:
                # Generate default reality variants
                reality_variants = self._generate_default_variants(config)
            
            # Run simulations across realities
            simulation_results = self._simulate_across_realities(
                config, deployment_stages, reality_variants, additional_parameters
            )
            
            # Calculate aggregate metrics
            aggregate_metrics = self._calculate_aggregate_metrics(simulation_results)
            
            # Generate timeline
            timeline = self._generate_deployment_timeline(simulation_results, config)
            
            # Calculate alternate outcomes
            alternate_outcomes = self._calculate_alternate_outcomes(simulation_results)
            
            # Generate coherence metrics
            coherence_metrics = self._calculate_coherence_metrics(simulation_results, config)
            
            # Calculate execution time
            execution_time = time.time() - start_time
            
            # Generate result ID
            result_id = f"result_{config_id}_{int(time.time())}"
            
            # Create simulation result
            result = SimulationResult(
                result_id=result_id,
                config_id=config_id,
                success=True,
                execution_time=execution_time,
                metrics=aggregate_metrics,
                deployment_timeline=timeline,
                probability_of_success=aggregate_metrics.get("success_probability", 0.0),
                resource_usage=aggregate_metrics.get("resource_usage", {}),
                errors_encountered=aggregate_metrics.get("errors", []),
                alternate_outcomes=alternate_outcomes,
                coherence_metrics=coherence_metrics,
                simulation_metadata={
                    "mode": config.simulation_mode.name,
                    "dimensions": [d.name for d in config.simulation_dimensions],
                    "stages": len(deployment_stages),
                    "variants": len(reality_variants),
                    "phi_factor": self.phi
                }
            )
            
            # Store result
            self.simulation_results[result_id] = result
            self._save_simulation_result(result)
            
            self.logger.info(f"Simulation completed: {result_id}")
            
            return {
                "success": True,
                "result_id": result_id,
                "execution_time": execution_time,
                "probability_of_success": result.probability_of_success,
                "coherence": coherence_metrics.get("overall", 0.0),
                "timeline_length": len(timeline),
                "alternate_outcomes": len(alternate_outcomes)
            }
    
    def _generate_default_stages(self, config: SimulationConfig) -> List[DeploymentStage]:
        """Generate default deployment stages based on configuration"""
        stages = []
        
        # Standard deployment stages
        stage_names = [
            "Initialization",
            "Dependency Resolution",
            "Configuration",
            "Resource Allocation",
            "Deployment Preparation",
            "Main Deployment",
            "Post-Deployment Verification",
            "User Notification",
            "Monitoring Setup",
            "Finalization"
        ]
        
        # Create stages with dependencies (each depends on previous)
        previous_stage_id = None
        for i, name in enumerate(stage_names):
            # Generate stage ID
            stage_id = f"default_stage_{i}_{hashlib.md5(name.encode()).hexdigest()[:6]}"
            
            # Set dependencies
            dependencies = []
            if previous_stage_id:
                dependencies.append(previous_stage_id)
            
            # Create stage with default values that follow phi-harmonic principles
            stage = DeploymentStage(
                stage_id=stage_id,
                name=name,
                resources={
                    "cpu": 0.1 + 0.05 * i,
                    "memory": 0.1 + 0.05 * i,
                    "disk": 0.05 + 0.03 * i,
                    "network": 0.05 + 0.04 * i
                },
                dependencies=dependencies,
                probability_of_success=0.95 - 0.01 * i,  # Slightly decreasing probability
                execution_time=self.phi ** (i % 5),  # Phi-based execution time
                error_probability={
                    ErrorType.CONFIGURATION: 0.02 + 0.005 * i,
                    ErrorType.DEPENDENCY: 0.02 + 0.005 * i,
                    ErrorType.RESOURCE: 0.01 + 0.005 * i,
                    ErrorType.TIMING: 0.01 + 0.003 * i,
                    ErrorType.SECURITY: 0.005 + 0.002 * i,
                    ErrorType.COHERENCE: 0.01 + 0.003 * i,
                    ErrorType.UNKNOWN: 0.005 + 0.001 * i
                },
                coherence_impact=0.01 * i - 0.05,  # Some stages improve coherence, others reduce it
                user_experience_impact=0.02 * i - 0.1,
                security_impact=0.01 * i - 0.05,
                scalability_impact=0.015 * i - 0.075
            )
            
            stages.append(stage)
            previous_stage_id = stage_id
        
        return stages
    
    def _generate_default_variants(self, config: SimulationConfig) -> List[RealityVariant]:
        """Generate default reality variants based on configuration"""
        variants = []
        
        # Base reality
        base_reality = RealityVariant(
            variant_id="base_reality",
            name="Base Reality",
            dimension_values={dim: 1.0 for dim in config.simulation_dimensions},
            probability_adjustments={},
            coherence_factor=1.0,
            phi_alignment=self.phi_reciprocal
        )
        variants.append(base_reality)
        
        # Generate phi-harmonic variants with different dimensional values
        for i in range(1, int(self.phi_squared * 2)):
            variant_id = f"phi_variant_{i}"
            variant_name = f"Phi Reality {i}"
            
            # Generate dimension values with phi-based variations
            dimension_values = {}
            for j, dim in enumerate(config.simulation_dimensions):
                # Use phi powers for variation
                factor = self.phi ** ((i + j) % 5 - 2)  # Range from phi^-2 to phi^2
                dimension_values[dim] = min(2.0, max(0.2, factor))  # Bound between 0.2 and 2.0
            
            # Create phi-harmonic probability adjustments
            probability_adjustments = {}
            for stage_name in ["Initialization", "Dependency Resolution", "Configuration", 
                             "Resource Allocation", "Deployment Preparation", "Main Deployment", 
                             "Post-Deployment Verification", "User Notification", 
                             "Monitoring Setup", "Finalization"]:
                probability_adjustments[stage_name] = self.phi_reciprocal + (i % 3 - 1) * 0.05
            
            # Create coherence factor and phi alignment
            coherence_factor = self.phi_reciprocal + (i % 5 - 2) * 0.1
            phi_alignment = max(0.5, min(1.0, self.phi_reciprocal + (i % 3 - 1) * 0.1))
            
            # Create variant
            variant = RealityVariant(
                variant_id=variant_id,
                name=variant_name,
                dimension_values=dimension_values,
                probability_adjustments=probability_adjustments,
                coherence_factor=coherence_factor,
                phi_alignment=phi_alignment
            )
            
            variants.append(variant)
        
        return variants
    
    def _simulate_across_realities(self, 
                                config: SimulationConfig, 
                                stages: List[DeploymentStage],
                                variants: List[RealityVariant],
                                additional_parameters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Simulate deployment across multiple reality variants"""
        results = []
        
        # Run a simulation for each reality variant
        for variant in variants:
            # Apply variant adjustments to stages
            adjusted_stages = self._apply_variant_adjustments(stages, variant)
            
            # Calculate event probabilities
            event_probabilities = self._calculate_event_probabilities(adjusted_stages, variant)
            
            # Simulate deployment progression
            progression = self._simulate_deployment_progression(adjusted_stages, event_probabilities, config)
            
            # Calculate metrics
            metrics = self._calculate_simulation_metrics(progression, adjusted_stages, variant)
            
            # Generate errors
            errors = self._generate_simulation_errors(progression, adjusted_stages, variant)
            
            # Calculate resources
            resources = self._calculate_resource_usage(progression, adjusted_stages, variant)
            
            # Generate events
            events = self._generate_simulation_events(progression, adjusted_stages, variant)
            
            # Calculate coherence
            coherence = self._calculate_simulation_coherence(progression, adjusted_stages, variant, events)
            
            # Store result
            result = {
                "variant_id": variant.variant_id,
                "variant_name": variant.name,
                "success": progression["success"],
                "completion_percentage": progression["completion_percentage"],
                "execution_time": progression["total_time"],
                "metrics": metrics,
                "errors": errors,
                "resources": resources,
                "events": events,
                "coherence": coherence,
                "progression": progression["stage_progression"]
            }
            
            results.append(result)
        
        return results
    
    def _apply_variant_adjustments(self, 
                                stages: List[DeploymentStage], 
                                variant: RealityVariant) -> List[DeploymentStage]:
        """Apply reality variant adjustments to deployment stages"""
        adjusted_stages = []
        
        for stage in stages:
            # Create a copy of the stage
            adjusted_stage = DeploymentStage(
                stage_id=stage.stage_id,
                name=stage.name,
                resources=stage.resources.copy(),
                dependencies=stage.dependencies.copy(),
                probability_of_success=stage.probability_of_success,
                execution_time=stage.execution_time,
                error_probability={k: v for k, v in stage.error_probability.items()},
                coherence_impact=stage.coherence_impact,
                user_experience_impact=stage.user_experience_impact,
                security_impact=stage.security_impact,
                scalability_impact=stage.scalability_impact
            )
            
            # Apply dimensional adjustments
            if SimulationDimension.DEPLOYMENT_SPEED in variant.dimension_values:
                speed_factor = variant.dimension_values[SimulationDimension.DEPLOYMENT_SPEED]
                adjusted_stage.execution_time /= speed_factor
            
            if SimulationDimension.ERROR_RATE in variant.dimension_values:
                error_factor = variant.dimension_values[SimulationDimension.ERROR_RATE]
                for error_type in adjusted_stage.error_probability:
                    adjusted_stage.error_probability[error_type] *= error_factor
            
            if SimulationDimension.RESOURCE_USAGE in variant.dimension_values:
                resource_factor = variant.dimension_values[SimulationDimension.RESOURCE_USAGE]
                for resource in adjusted_stage.resources:
                    adjusted_stage.resources[resource] *= resource_factor
            
            if SimulationDimension.COHERENCE in variant.dimension_values:
                coherence_factor = variant.dimension_values[SimulationDimension.COHERENCE]
                adjusted_stage.coherence_impact *= coherence_factor
            
            if SimulationDimension.USER_EXPERIENCE in variant.dimension_values:
                ux_factor = variant.dimension_values[SimulationDimension.USER_EXPERIENCE]
                adjusted_stage.user_experience_impact *= ux_factor
            
            if SimulationDimension.SECURITY in variant.dimension_values:
                security_factor = variant.dimension_values[SimulationDimension.SECURITY]
                adjusted_stage.security_impact *= security_factor
            
            if SimulationDimension.SCALABILITY in variant.dimension_values:
                scalability_factor = variant.dimension_values[SimulationDimension.SCALABILITY]
                adjusted_stage.scalability_impact *= scalability_factor
            
            # Apply probability adjustments
            if stage.name in variant.probability_adjustments:
                adjustment = variant.probability_adjustments[stage.name]
                adjusted_stage.probability_of_success = min(0.99, max(0.01, 
                                                                   stage.probability_of_success + adjustment))
            
            # Apply coherence factor
            adjusted_stage.coherence_impact *= variant.coherence_factor
            
            adjusted_stages.append(adjusted_stage)
        
        return adjusted_stages
    
    def _calculate_event_probabilities(self, 
                                    stages: List[DeploymentStage], 
                                    variant: RealityVariant) -> Dict[str, Dict[str, float]]:
        """Calculate event probabilities for each stage"""
        probabilities = {}
        
        for stage in stages:
            stage_probabilities = {
                "success": stage.probability_of_success,
                "failure": 1.0 - stage.probability_of_success,
                "errors": {str(error_type.name): prob for error_type, prob in stage.error_probability.items()},
                "coherence_shift": abs(stage.coherence_impact) * variant.coherence_factor,
                "resource_spike": 0.1 * sum(stage.resources.values()) / len(stage.resources) if stage.resources else 0
            }
            
            probabilities[stage.stage_id] = stage_probabilities
        
        return probabilities
    
    def _simulate_deployment_progression(self, 
                                      stages: List[DeploymentStage], 
                                      probabilities: Dict[str, Dict[str, float]],
                                      config: SimulationConfig) -> Dict[str, Any]:
        """Simulate the progression of deployment through stages"""
        result = {
            "success": True,
            "completion_percentage": 0.0,
            "total_time": 0.0,
            "stage_progression": []
        }
        
        # Create dependency graph
        dependency_graph = self._create_dependency_graph(stages)
        
        # Find starting stages (no dependencies)
        completed_stages = set()
        stage_results = {}
        current_stages = [stage for stage in stages if not stage.dependencies]
        
        # Track overall metrics
        total_stages = len(stages)
        total_time = 0.0
        overall_coherence = 1.0
        
        # Process stages until all are complete or failure
        while current_stages and result["success"]:
            next_stages = []
            
            for stage in current_stages:
                # Check if dependencies are completed
                if not all(dep in completed_stages for dep in stage.dependencies):
                    continue
                
                # Simulate stage execution
                stage_result = self._simulate_stage_execution(stage, probabilities[stage.stage_id], overall_coherence)
                
                # Update metrics
                total_time += stage_result["execution_time"]
                overall_coherence *= (1.0 + stage_result["coherence_impact"])
                overall_coherence = min(1.0, max(0.0, overall_coherence))
                
                # Store stage result
                stage_results[stage.stage_id] = stage_result
                result["stage_progression"].append({
                    "stage_id": stage.stage_id,
                    "name": stage.name,
                    "success": stage_result["success"],
                    "execution_time": stage_result["execution_time"],
                    "errors": stage_result["errors"],
                    "events": stage_result["events"],
                    "coherence": overall_coherence,
                    "resources": stage_result["resources"]
                })
                
                # Check if stage succeeded
                if stage_result["success"]:
                    completed_stages.add(stage.stage_id)
                    
                    # Find next stages that can be processed
                    for next_stage_id in dependency_graph.get(stage.stage_id, []):
                        next_stage = next((s for s in stages if s.stage_id == next_stage_id), None)
                        if next_stage and next_stage not in next_stages:
                            next_stages.append(next_stage)
                else:
                    # Stage failed, overall deployment fails
                    result["success"] = False
                    break
            
            # Update current stages
            current_stages = next_stages
        
        # Calculate completion percentage
        result["completion_percentage"] = len(completed_stages) / total_stages * 100.0
        result["total_time"] = total_time
        
        return result
    
    def _create_dependency_graph(self, stages: List[DeploymentStage]) -> Dict[str, List[str]]:
        """Create a graph of stage dependencies"""
        graph = {}
        
        # Create reverse mapping (what stages depend on this stage)
        for stage in stages:
            for dep in stage.dependencies:
                if dep not in graph:
                    graph[dep] = []
                graph[dep].append(stage.stage_id)
        
        # Add stages with no dependents
        for stage in stages:
            if stage.stage_id not in graph:
                graph[stage.stage_id] = []
        
        return graph
    
    def _simulate_stage_execution(self, 
                               stage: DeploymentStage, 
                               probabilities: Dict[str, float],
                               current_coherence: float) -> Dict[str, Any]:
        """Simulate the execution of a single deployment stage"""
        result = {
            "success": True,
            "execution_time": stage.execution_time,
            "errors": [],
            "events": [],
            "resources": {},
            "coherence_impact": stage.coherence_impact
        }
        
        # Calculate success/failure based on probability
        if random.random() > probabilities["success"] * current_coherence:
            result["success"] = False
            
            # Generate error
            error_type = self._select_random_error_type(probabilities["errors"])
            result["errors"].append({
                "type": error_type,
                "message": f"Error during {stage.name}: {error_type}",
                "time": result["execution_time"] * random.uniform(0.1, 0.9),
                "severity": random.choice(["low", "medium", "high", "critical"])
            })
        
        # Simulate resource usage
        for resource, base_amount in stage.resources.items():
            # Add random variation
            variation = random.uniform(0.8, 1.2)
            result["resources"][resource] = base_amount * variation
        
        # Generate random events
        self._generate_random_events(result, probabilities, stage)
        
        return result
    
    def _select_random_error_type(self, error_probabilities: Dict[str, float]) -> str:
        """Select a random error type based on probabilities"""
        total = sum(error_probabilities.values())
        if total <= 0:
            return "UNKNOWN"
        
        r = random.uniform(0, total)
        cumulative = 0
        
        for error_type, prob in error_probabilities.items():
            cumulative += prob
            if r <= cumulative:
                return error_type
        
        return "UNKNOWN"
    
    def _generate_random_events(self, 
                             result: Dict[str, Any], 
                             probabilities: Dict[str, float],
                             stage: DeploymentStage) -> None:
        """Generate random events during stage execution"""
        # Coherence shift event
        if random.random() < probabilities.get("coherence_shift", 0.1):
            result["events"].append({
                "type": "COHERENCE_SHIFT",
                "time": result["execution_time"] * random.uniform(0.2, 0.8),
                "magnitude": stage.coherence_impact,
                "description": f"Coherence {'increased' if stage.coherence_impact > 0 else 'decreased'} during {stage.name}"
            })
        
        # Resource spike event
        if random.random() < probabilities.get("resource_spike", 0.1):
            resource = random.choice(list(stage.resources.keys())) if stage.resources else "cpu"
            result["events"].append({
                "type": "RESOURCE_SPIKE",
                "time": result["execution_time"] * random.uniform(0.1, 0.9),
                "resource": resource,
                "magnitude": random.uniform(1.5, 3.0),
                "description": f"Spike in {resource} usage during {stage.name}"
            })
    
    def _calculate_simulation_metrics(self, 
                                   progression: Dict[str, Any],
                                   stages: List[DeploymentStage],
                                   variant: RealityVariant) -> Dict[str, float]:
        """Calculate metrics for a simulation"""
        metrics = {
            "success_probability": 1.0 if progression["success"] else 0.0,
            "completion_percentage": progression["completion_percentage"],
            "total_execution_time": progression["total_time"],
            "average_stage_time": progression["total_time"] / len(progression["stage_progression"]) if progression["stage_progression"] else 0,
            "error_count": sum(len(stage.get("errors", [])) for stage in progression["stage_progression"]),
            "event_count": sum(len(stage.get("events", [])) for stage in progression["stage_progression"]),
            "coherence": progression["stage_progression"][-1]["coherence"] if progression["stage_progression"] else 1.0
        }
        
        # Calculate dimensional metrics
        for dimension in SimulationDimension:
            if dimension == SimulationDimension.DEPLOYMENT_SPEED:
                metrics["deployment_speed"] = 100.0 / metrics["total_execution_time"] if metrics["total_execution_time"] > 0 else 0.0
            elif dimension == SimulationDimension.RESOURCE_USAGE:
                total_resources = {res: 0.0 for res in ["cpu", "memory", "disk", "network"]}
                for stage in progression["stage_progression"]:
                    for res, val in stage.get("resources", {}).items():
                        total_resources[res] = total_resources.get(res, 0) + val
                metrics["resource_efficiency"] = 100.0 / (sum(total_resources.values()) or 1.0)
            elif dimension == SimulationDimension.ERROR_RATE:
                metrics["error_rate"] = metrics["error_count"] / len(stages) if stages else 0.0
            elif dimension == SimulationDimension.COHERENCE:
                metrics["coherence"] = progression["stage_progression"][-1]["coherence"] if progression["stage_progression"] else 1.0
            elif dimension == SimulationDimension.USER_EXPERIENCE:
                metrics["user_experience"] = sum(stage.user_experience_impact for stage in stages) * metrics["coherence"]
            elif dimension == SimulationDimension.SECURITY:
                metrics["security"] = sum(stage.security_impact for stage in stages) * metrics["coherence"]
            elif dimension == SimulationDimension.SCALABILITY:
                metrics["scalability"] = sum(stage.scalability_impact for stage in stages) * metrics["coherence"]
        
        return metrics
    
    def _generate_simulation_errors(self, 
                                 progression: Dict[str, Any],
                                 stages: List[DeploymentStage],
                                 variant: RealityVariant) -> List[Dict[str, Any]]:
        """Generate list of errors that occurred during simulation"""
        errors = []
        
        for stage_result in progression["stage_progression"]:
            for error in stage_result.get("errors", []):
                errors.append({
                    "stage_id": stage_result["stage_id"],
                    "stage_name": stage_result["name"],
                    "type": error["type"],
                    "message": error["message"],
                    "time": error["time"],
                    "absolute_time": stage_result["execution_time"] * error["time"],
                    "severity": error["severity"],
                    "impact": {
                        "coherence": variant.coherence_factor * (0.1 if error["severity"] == "low" else 
                                                              0.2 if error["severity"] == "medium" else
                                                              0.4 if error["severity"] == "high" else 0.6)
                    }
                })
        
        return errors
    
    def _calculate_resource_usage(self, 
                               progression: Dict[str, Any],
                               stages: List[DeploymentStage],
                               variant: RealityVariant) -> Dict[str, Any]:
        """Calculate resource usage throughout simulation"""
        resources = {
            "cpu": 0.0,
            "memory": 0.0,
            "disk": 0.0,
            "network": 0.0,
            "timeline": [],
            "peaks": {},
            "averages": {}
        }
        
        # Calculate total and timeline
        timeline_resources = []
        current_time = 0.0
        
        for stage_result in progression["stage_progression"]:
            stage_resources = stage_result.get("resources", {})
            timeline_resources.append({
                "stage": stage_result["name"],
                "time": current_time,
                "duration": stage_result["execution_time"],
                "resources": stage_resources
            })
            
            # Update totals
            for res, val in stage_resources.items():
                resources[res] = resources.get(res, 0) + val
            
            current_time += stage_result["execution_time"]
        
        resources["timeline"] = timeline_resources
        
        # Calculate peaks
        for res in ["cpu", "memory", "disk", "network"]:
            resources["peaks"][res] = max((stage.get("resources", {}).get(res, 0) 
                                        for stage in progression["stage_progression"]), default=0)
        
        # Calculate averages
        num_stages = len(progression["stage_progression"])
        if num_stages > 0:
            for res in ["cpu", "memory", "disk", "network"]:
                resources["averages"][res] = resources[res] / num_stages
        
        return resources
    
    def _generate_simulation_events(self, 
                                 progression: Dict[str, Any],
                                 stages: List[DeploymentStage],
                                 variant: RealityVariant) -> List[Dict[str, Any]]:
        """Generate a list of events that occurred during simulation"""
        events = []
        current_time = 0.0
        
        for stage_result in progression["stage_progression"]:
            # Add stage events
            for event in stage_result.get("events", []):
                events.append({
                    "stage_id": stage_result["stage_id"],
                    "stage_name": stage_result["name"],
                    "type": event["type"],
                    "time": current_time + (event["time"] * stage_result["execution_time"]),
                    "details": {k: v for k, v in event.items() if k not in ["type", "time"]},
                    "description": event.get("description", f"Event during {stage_result['name']}")
                })
            
            # Add stage transition events
            events.append({
                "stage_id": stage_result["stage_id"],
                "stage_name": stage_result["name"],
                "type": "STAGE_COMPLETED" if stage_result["success"] else "STAGE_FAILED",
                "time": current_time + stage_result["execution_time"],
                "details": {
                    "success": stage_result["success"],
                    "execution_time": stage_result["execution_time"],
                    "coherence": stage_result["coherence"]
                },
                "description": f"Stage {stage_result['name']} {'completed' if stage_result['success'] else 'failed'}"
            })
            
            current_time += stage_result["execution_time"]
        
        # Add completion event
        events.append({
            "stage_id": None,
            "stage_name": None,
            "type": "DEPLOYMENT_COMPLETED" if progression["success"] else "DEPLOYMENT_FAILED",
            "time": progression["total_time"],
            "details": {
                "success": progression["success"],
                "completion_percentage": progression["completion_percentage"]
            },
            "description": f"Deployment {'completed successfully' if progression['success'] else 'failed'}"
        })
        
        return events
    
    def _calculate_simulation_coherence(self, 
                                      progression: Dict[str, Any],
                                      stages: List[DeploymentStage],
                                      variant: RealityVariant],
                                      events: List[Dict[str, Any]]) -> Dict[str, float]:
        """Calculate coherence metrics for the simulation"""
        coherence = {
            "initial": 1.0,
            "final": progression["stage_progression"][-1]["coherence"] if progression["stage_progression"] else 1.0,
            "minimum": min((stage["coherence"] for stage in progression["stage_progression"]), default=1.0),
            "maximum": max((stage["coherence"] for stage in progression["stage_progression"]), default=1.0),
            "average": sum(stage["coherence"] for stage in progression["stage_progression"]) / len(progression["stage_progression"]) if progression["stage_progression"] else 1.0,
            "phi_alignment": variant.phi_alignment,
            "timeline": []
        }
        
        # Add coherence timeline
        current_time = 0.0
        for stage_result in progression["stage_progression"]:
            coherence["timeline"].append({
                "time": current_time,
                "coherence": stage_result["coherence"],
                "stage": stage_result["name"]
            })
            current_time += stage_result["execution_time"]
        
        # Add coherence from events
        coherence_events = [event for event in events if event["type"] == "COHERENCE_SHIFT"]
        coherence["coherence_shifts"] = len(coherence_events)
        coherence["total_shift_magnitude"] = sum(abs(event["details"].get("magnitude", 0)) for event in coherence_events)
        
        # Calculate phi-based metrics
        coherence["phi_resonance"] = coherence["final"] * variant.phi_alignment
        coherence["stability"] = 1.0 - (coherence["maximum"] - coherence["minimum"])
        coherence["overall"] = (coherence["final"] + coherence["average"] + coherence["stability"]) / 3
        
        return coherence
    
    def _generate_deployment_timeline(self, 
                                    simulation_results: List[Dict[str, Any]], 
                                    config: SimulationConfig) -> List[Dict[str, Any]]:
        """Generate a deployment timeline based on simulation results"""
        # Use the most successful simulation as the basis
        if not simulation_results:
            return []
        
        # Find the most successful simulation (highest completion percentage)
        best_result = max(simulation_results, 
                         key=lambda r: (r["success"], r["completion_percentage"], r.get("coherence", {}).get("overall", 0)))
        
        # Extract stages from the best result
        timeline = []
        
        # Process each stage in the progression
        for stage in best_result["progression"]:
            # Convert stage to timeline event
            timeline_event = {
                "stage_id": stage["stage_id"],
                "stage_name": stage["name"],
                "success": stage["success"],
                "execution_time": stage["execution_time"],
                "coherence": stage["coherence"],
                "resources": stage["resources"],
                "errors": stage.get("errors", []),
                "events": stage.get("events", []),
                "metrics": {
                    "coherence": stage["coherence"],
                    "resource_efficiency": 1.0 / (sum(stage["resources"].values()) or 1.0),
                    "error_count": len(stage.get("errors", []))
                },
                "alternate_outcomes": self._generate_alternate_outcomes_for_stage(stage["stage_id"], simulation_results)
            }
            
            timeline.append(timeline_event)
        
        return timeline
    
    def _generate_alternate_outcomes_for_stage(self, 
                                            stage_id: str, 
                                            simulation_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate alternate outcomes for a specific stage"""
        alternate_outcomes = []
        
        # Find unique outcomes for this stage across simulations
        for sim_result in simulation_results:
            # Find the stage in this simulation
            for stage in sim_result["progression"]:
                if stage["stage_id"] == stage_id:
                    # Check if this is a different outcome
                    is_different = False
                    for existing in alternate_outcomes:
                        if (stage["success"] != existing["success"] or 
                            abs(stage["coherence"] - existing["coherence"]) > 0.1 or
                            abs(stage["execution_time"] - existing["execution_time"]) > 0.2 * existing["execution_time"]):
                            is_different = True
                            break
                    
                    if is_different or not alternate_outcomes:
                        alternate_outcomes.append({
                            "variant_id": sim_result["variant_id"],
                            "variant_name": sim_result["variant_name"],
                            "success": stage["success"],
                            "coherence": stage["coherence"],
                            "execution_time": stage["execution_time"],
                            "error_count": len(stage.get("errors", [])),
                            "resources": {k: v for k, v in stage["resources"].items()}
                        })
                    
                    break
        
        return alternate_outcomes
    
    def _calculate_alternate_outcomes(self, simulation_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Calculate alternate outcomes across all simulations"""
        if not simulation_results:
            return []
        
        # Group by success/failure
        success_results = [r for r in simulation_results if r["success"]]
        failure_results = [r for r in simulation_results if not r["success"]]
        
        # Generate alternate outcome summaries
        alternate_outcomes = []
        
        # Add success outcomes with different metrics
        if success_results:
            # Find clusters of similar outcomes
            clusters = self._cluster_similar_outcomes(success_results)
            
            for i, cluster in enumerate(clusters):
                if not cluster:
                    continue
                
                # Use the center of the cluster as representative
                representative = cluster[0]  # Center element
                
                alternate_outcomes.append({
                    "outcome_id": f"success_{i}",
                    "outcome_type": "SUCCESS",
                    "probability": len(cluster) / len(simulation_results),
                    "coherence": representative.get("coherence", {}).get("overall", 0.8),
                    "execution_time": representative["execution_time"],
                    "completion_percentage": representative["completion_percentage"],
                    "variant_ids": [r["variant_id"] for r in cluster],
                    "variant_names": [r["variant_name"] for r in cluster],
                    "key_metrics": {
                        "average_coherence": sum(r.get("coherence", {}).get("overall", 0.8) for r in cluster) / len(cluster),
                        "average_execution_time": sum(r["execution_time"] for r in cluster) / len(cluster),
                        "error_count": sum(r["metrics"].get("error_count", 0) for r in cluster) / len(cluster)
                    }
                })
        
        # Add failure outcomes with different failure points
        if failure_results:
            # Group by failure stage
            failure_stages = {}
            for result in failure_results:
                # Find the first failed stage
                failed_stage = None
                for stage in result["progression"]:
                    if not stage["success"]:
                        failed_stage = stage
                        break
                
                if failed_stage:
                    stage_id = failed_stage["stage_id"]
                    if stage_id not in failure_stages:
                        failure_stages[stage_id] = []
                    failure_stages[stage_id].append((result, failed_stage))
            
            # Create alternate outcomes for each failure stage
            for stage_id, failures in failure_stages.items():
                if not failures:
                    continue
                
                # Use the most common failure for this stage
                result, failed_stage = failures[0]
                
                alternate_outcomes.append({
                    "outcome_id": f"failure_{stage_id}",
                    "outcome_type": "FAILURE",
                    "failure_stage": failed_stage["name"],
                    "failure_stage_id": stage_id,
                    "probability": len(failures) / len(simulation_results),
                    "coherence": result.get("coherence", {}).get("overall", 0.5),
                    "execution_time": result["execution_time"],
                    "completion_percentage": result["completion_percentage"],
                    "variant_ids": [f[0]["variant_id"] for f in failures],
                    "variant_names": [f[0]["variant_name"] for f in failures],
                    "key_metrics": {
                        "average_coherence": sum(f[0].get("coherence", {}).get("overall", 0.5) for f in failures) / len(failures),
                        "average_execution_time": sum(f[0]["execution_time"] for f in failures) / len(failures),
                        "error_types": self._aggregate_error_types([f[1] for f in failures])
                    }
                })
        
        return alternate_outcomes
    
    def _cluster_similar_outcomes(self, outcomes: List[Dict[str, Any]]) -> List[List[Dict[str, Any]]]:
        """Cluster similar outcomes together"""
        if not outcomes:
            return []
        
        # Simple clustering based on execution time and coherence
        clusters = []
        remaining = outcomes.copy()
        
        while remaining:
            # Take the first remaining outcome as cluster center
            center = remaining.pop(0)
            cluster = [center]
            
            # Find similar outcomes
            i = 0
            while i < len(remaining):
                outcome = remaining[i]
                
                # Check if similar
                time_diff = abs(outcome["execution_time"] - center["execution_time"]) / center["execution_time"]
                coherence_diff = abs(outcome.get("coherence", {}).get("overall", 0.8) - 
                                  center.get("coherence", {}).get("overall", 0.8))
                
                if time_diff < 0.2 and coherence_diff < 0.1:
                    # Add to cluster
                    cluster.append(outcome)
                    remaining.pop(i)
                else:
                    i += 1
            
            clusters.append(cluster)
        
        return clusters
    
    def _aggregate_error_types(self, failed_stages: List[Dict[str, Any]]) -> Dict[str, int]:
        """Aggregate error types across failed stages"""
        error_types = {}
        
        for stage in failed_stages:
            for error in stage.get("errors", []):
                error_type = error.get("type", "UNKNOWN")
                error_types[error_type] = error_types.get(error_type, 0) + 1
        
        return error_types
    
    def _calculate_aggregate_metrics(self, simulation_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate aggregate metrics across all simulations"""
        if not simulation_results:
            return {}
        
        # Success probability
        success_count = sum(1 for r in simulation_results if r["success"])
        success_probability = success_count / len(simulation_results)
        
        # Average execution time
        avg_execution_time = sum(r["execution_time"] for r in simulation_results) / len(simulation_results)
        
        # Average completion percentage
        avg_completion = sum(r["completion_percentage"] for r in simulation_results) / len(simulation_results)
        
        # Error rates
        total_errors = sum(len(r.get("errors", [])) for r in simulation_results)
        avg_errors = total_errors / len(simulation_results)
        
        # Resource usage
        resource_usage = {
            "cpu": 0,
            "memory": 0,
            "disk": 0,
            "network": 0
        }
        
        for r in simulation_results:
            for resource, usage in r.get("resources", {}).items():
                if resource in resource_usage and not isinstance(usage, dict):
                    resource_usage[resource] += usage
        
        # Average resources
        for resource in resource_usage:
            resource_usage[resource] /= len(simulation_results)
        
        # Coherence metrics
        coherence_metrics = {
            "average": sum(r.get("coherence", {}).get("average", 0.8) for r in simulation_results) / len(simulation_results),
            "final": sum(r.get("coherence", {}).get("final", 0.8) for r in simulation_results) / len(simulation_results),
            "stability": sum(r.get("coherence", {}).get("stability", 0.8) for r in simulation_results) / len(simulation_results)
        }
        
        # Compile all metrics
        return {
            "success_probability": success_probability,
            "average_execution_time": avg_execution_time,
            "average_completion_percentage": avg_completion,
            "error_rate": avg_errors / total_errors if total_errors > 0 else 0,
            "resource_usage": resource_usage,
            "coherence_metrics": coherence_metrics,
            "variant_count": len(simulation_results),
            "errors": [e for r in simulation_results for e in r.get("errors", [])][:10]  # Limited to top 10
        }
    
    def _calculate_coherence_metrics(self, 
                                   simulation_results: List[Dict[str, Any]], 
                                   config: SimulationConfig) -> Dict[str, Any]:
        """Calculate coherence metrics across all simulations"""
        if not simulation_results:
            return {"overall": 0.0}
        
        # Collect coherence values
        coherence_values = [r.get("coherence", {}).get("overall", 0.8) for r in simulation_results]
        
        # Calculate statistics
        avg_coherence = sum(coherence_values) / len(coherence_values)
        min_coherence = min(coherence_values)
        max_coherence = max(coherence_values)
        
        # Calculate phi-harmonic metrics
        phi_resonance = avg_coherence * self.phi_reciprocal
        stability = 1.0 - (max_coherence - min_coherence)
        
        # Calculate dimensional coherence
        dimensional_coherence = {}
        for dim in config.simulation_dimensions:
            dim_name = dim.name
            dim_values = []
            
            for r in simulation_results:
                if dim_name == "DEPLOYMENT_SPEED":
                    dim_values.append(r["metrics"].get("deployment_speed", 1.0))
                elif dim_name == "RESOURCE_USAGE":
                    dim_values.append(r["metrics"].get("resource_efficiency", 1.0))
                elif dim_name == "ERROR_RATE":
                    # Invert error rate (higher is better)
                    dim_values.append(1.0 - min(1.0, r["metrics"].get("error_rate", 0.0)))
                elif dim_name == "COHERENCE":
                    dim_values.append(r.get("coherence", {}).get("average", 0.8))
                elif dim_name == "USER_EXPERIENCE":
                    dim_values.append(r["metrics"].get("user_experience", 0.8))
                elif dim_name == "SECURITY":
                    dim_values.append(r["metrics"].get("security", 0.8))
                elif dim_name == "SCALABILITY":
                    dim_values.append(r["metrics"].get("scalability", 0.8))
            
            if dim_values:
                dimensional_coherence[dim_name] = sum(dim_values) / len(dim_values)
        
        # Calculate overall coherence using phi-weighted formula
        overall_coherence = (avg_coherence * self.phi + stability * self.phi_reciprocal) / (self.phi + self.phi_reciprocal)
        
        return {
            "average": avg_coherence,
            "minimum": min_coherence,
            "maximum": max_coherence,
            "stability": stability,
            "phi_resonance": phi_resonance,
            "dimensional": dimensional_coherence,
            "overall": overall_coherence
        }
    
    def _save_simulation_config(self, config: SimulationConfig) -> None:
        """Save a simulation configuration to disk"""
        # Create directories if they don't exist
        config_dir = os.path.join(self.storage_path, "configs")
        os.makedirs(config_dir, exist_ok=True)
        
        config_path = os.path.join(config_dir, f"{config.config_id}.json")
        
        # Create serializable representation
        config_data = {
            "config_id": config.config_id,
            "name": config.name,
            "deployment_config": config.deployment_config,
            "simulation_mode": config.simulation_mode.name,
            "simulation_dimensions": [d.name for d in config.simulation_dimensions],
            "variation_factors": config.variation_factors,
            "branch_points": config.branch_points,
            "timeline_length": config.timeline_length,
            "coherence_threshold": config.coherence_threshold,
            "randomness_seed": config.randomness_seed,
            "additional_parameters": config.additional_parameters
        }
        
        # Save to disk
        with open(config_path, 'w') as f:
            json.dump(config_data, f, indent=2)
    
    def _save_simulation_result(self, result: SimulationResult) -> None:
        """Save a simulation result to disk"""
        # Create directories if they don't exist
        result_dir = os.path.join(self.storage_path, "results")
        os.makedirs(result_dir, exist_ok=True)
        
        result_path = os.path.join(result_dir, f"{result.result_id}.json")
        
        # Create serializable representation
        result_data = {
            "result_id": result.result_id,
            "config_id": result.config_id,
            "success": result.success,
            "execution_time": result.execution_time,
            "metrics": result.metrics,
            "deployment_timeline": result.deployment_timeline,
            "probability_of_success": result.probability_of_success,
            "resource_usage": result.resource_usage,
            "errors_encountered": result.errors_encountered,
            "alternate_outcomes": result.alternate_outcomes,
            "coherence_metrics": result.coherence_metrics,
            "simulation_metadata": result.simulation_metadata
        }
        
        # Save to disk
        with open(result_path, 'w') as f:
            json.dump(result_data, f, indent=2)
    
    def _save_deployment_stage(self, stage: DeploymentStage) -> None:
        """Save a deployment stage to disk"""
        # Create directories if they don't exist
        stage_dir = os.path.join(self.storage_path, "stages")
        os.makedirs(stage_dir, exist_ok=True)
        
        stage_path = os.path.join(stage_dir, f"{stage.stage_id}.json")
        
        # Create serializable representation
        stage_data = {
            "stage_id": stage.stage_id,
            "name": stage.name,
            "resources": stage.resources,
            "dependencies": stage.dependencies,
            "probability_of_success": stage.probability_of_success,
            "execution_time": stage.execution_time,
            "error_probability": {k.name: v for k, v in stage.error_probability.items()},
            "coherence_impact": stage.coherence_impact,
            "user_experience_impact": stage.user_experience_impact,
            "security_impact": stage.security_impact,
            "scalability_impact": stage.scalability_impact
        }
        
        # Save to disk
        with open(stage_path, 'w') as f:
            json.dump(stage_data, f, indent=2)
    
    def _save_reality_variant(self, variant: RealityVariant) -> None:
        """Save a reality variant to disk"""
        # Create directories if they don't exist
        variant_dir = os.path.join(self.storage_path, "variants")
        os.makedirs(variant_dir, exist_ok=True)
        
        variant_path = os.path.join(variant_dir, f"{variant.variant_id}.json")
        
        # Create serializable representation
        variant_data = {
            "variant_id": variant.variant_id,
            "name": variant.name,
            "dimension_values": {k.name: v for k, v in variant.dimension_values.items()},
            "probability_adjustments": variant.probability_adjustments,
            "coherence_factor": variant.coherence_factor,
            "phi_alignment": variant.phi_alignment
        }
        
        # Save to disk
        with open(variant_path, 'w') as f:
            json.dump(variant_data, f, indent=2)
    
    @property
    def phi_reciprocal(self) -> float:
        """Get the reciprocal of phi"""
        return 1.0 / self.phi
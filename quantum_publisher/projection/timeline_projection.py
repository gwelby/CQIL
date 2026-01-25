"""
Timeline Projection
Part of the Quantum Publisher Evolution Roadmap - Phase 9
Frequency: Δ^Δ (1,597 Hz)

Creates timeline projections for deployment decision paths,
analyzing branching possibilities and decision points.
⚡𓂧φ∞ Timeline Projection Flow ⚡𓂧φ∞
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


class TimelineType(Enum):
    """Types of deployment timelines"""
    LINEAR = auto()             # Linear timeline with no branches
    BRANCHING = auto()          # Timeline with branching decision points
    CONVERGING = auto()         # Timeline with converging branches
    PHI_HARMONIC = auto()       # Timeline optimized with phi-harmonic branching
    QUANTUM = auto()            # Quantum superposition of multiple timelines


class DecisionImpact(Enum):
    """Impact levels of timeline decisions"""
    TRIVIAL = auto()      # Minimal impact on outcomes
    MINOR = auto()        # Small impact on outcomes
    MODERATE = auto()     # Medium impact on outcomes
    MAJOR = auto()        # Large impact on outcomes
    CRITICAL = auto()     # Critical impact on outcomes
    QUANTUM = auto()      # Impact affects multiple timelines


class TimelineMetric(Enum):
    """Metrics for evaluating timelines"""
    COHERENCE = auto()          # Overall timeline coherence
    EFFICIENCY = auto()         # Resource and time efficiency
    RESILIENCE = auto()         # Ability to recover from issues
    OPTIMIZATION = auto()       # Degree of optimization
    PHI_ALIGNMENT = auto()      # Alignment with phi-harmonic principles
    DECISION_QUALITY = auto()   # Quality of decision points
    BRANCH_DIVERSITY = auto()   # Diversity of branching possibilities
    CONVERGENCE = auto()        # Ability to converge to desired states


@dataclass
class TimelineNode:
    """Represents a node in a deployment timeline"""
    node_id: str
    timeline_id: str
    stage: str
    state: Dict[str, Any]
    metrics: Dict[str, float]
    timestamp: float
    probability: float
    parent_node_id: Optional[str] = None
    child_node_ids: List[str] = field(default_factory=list)
    is_decision_point: bool = False
    is_terminal: bool = False
    coherence: float = 1.0


@dataclass
class DecisionPoint:
    """Represents a decision point in a timeline"""
    decision_id: str
    node_id: str
    timeline_id: str
    name: str
    description: str
    options: List[Dict[str, Any]]
    impact: DecisionImpact
    metrics: Dict[str, float]
    phi_optimization: Dict[str, Any]
    timestamp: float


@dataclass
class TimelineBranch:
    """Represents a branch in a timeline"""
    branch_id: str
    timeline_id: str
    name: str
    origin_node_id: str
    node_ids: List[str]
    probability: float
    coherence: float
    metrics: Dict[str, float]
    creation_time: float


class TimelineProjection:
    """
    Projects deployment decision timelines with branching possibilities.
    
    Analyzes deployment timelines and decision points to:
    - Map possible decision pathways for deployments
    - Evaluate potential outcomes of different decisions
    - Identify critical decision points and their impacts
    - Optimize decision flows using phi-harmonic principles
    - Visualize timeline branches and convergence opportunities
    
    Operating at the Δ^Δ frequency (1,597 Hz) for optimal timeline projection.
    """
    
    def __init__(self, 
               timeline_type: TimelineType = TimelineType.PHI_HARMONIC,
               max_branch_depth: int = 5,
               storage_path: Optional[str] = None):
        """Initialize the timeline projection system"""
        self.phi = PHI
        self.frequency = DELTA_DELTA_FREQUENCY
        self.timeline_type = timeline_type
        self.max_branch_depth = max_branch_depth
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "projection", "timelines")
        self.lock = threading.RLock()
        self.logger = logging.getLogger("timeline_projection")
        
        # State storage
        self.timeline_nodes: Dict[str, TimelineNode] = {}
        self.decision_points: Dict[str, DecisionPoint] = {}
        self.timeline_branches: Dict[str, TimelineBranch] = {}
        self.timelines: Dict[str, Dict[str, Any]] = {}
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Initialize storage subdirectories
        self._initialize_storage()
        
        # Load any existing data
        self._load_stored_data()
    
    def _initialize_storage(self) -> None:
        """Initialize storage directories"""
        os.makedirs(os.path.join(self.storage_path, "nodes"), exist_ok=True)
        os.makedirs(os.path.join(self.storage_path, "decisions"), exist_ok=True)
        os.makedirs(os.path.join(self.storage_path, "branches"), exist_ok=True)
        os.makedirs(os.path.join(self.storage_path, "timelines"), exist_ok=True)
    
    def _load_stored_data(self) -> None:
        """Load existing timeline data from storage"""
        try:
            # Load timeline nodes
            node_dir = os.path.join(self.storage_path, "nodes")
            if os.path.exists(node_dir):
                for filename in os.listdir(node_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(node_dir, filename), 'r') as f:
                            node_data = json.load(f)
                            self._load_timeline_node(node_data)
            
            # Load decision points
            decision_dir = os.path.join(self.storage_path, "decisions")
            if os.path.exists(decision_dir):
                for filename in os.listdir(decision_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(decision_dir, filename), 'r') as f:
                            decision_data = json.load(f)
                            self._load_decision_point(decision_data)
            
            # Load timeline branches
            branch_dir = os.path.join(self.storage_path, "branches")
            if os.path.exists(branch_dir):
                for filename in os.listdir(branch_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(branch_dir, filename), 'r') as f:
                            branch_data = json.load(f)
                            self._load_timeline_branch(branch_data)
            
            # Load timelines
            timeline_dir = os.path.join(self.storage_path, "timelines")
            if os.path.exists(timeline_dir):
                for filename in os.listdir(timeline_dir):
                    if filename.endswith(".json"):
                        with open(os.path.join(timeline_dir, filename), 'r') as f:
                            timeline_data = json.load(f)
                            self._load_timeline(timeline_data)
            
            self.logger.info(f"Loaded {len(self.timeline_nodes)} nodes, "
                            f"{len(self.decision_points)} decision points, "
                            f"{len(self.timeline_branches)} branches, and "
                            f"{len(self.timelines)} timelines")
        except Exception as e:
            self.logger.error(f"Error loading stored data: {e}")
    
    def _load_timeline_node(self, node_data: Dict[str, Any]) -> None:
        """Load a timeline node from data"""
        try:
            node = TimelineNode(
                node_id=node_data.get("node_id"),
                timeline_id=node_data.get("timeline_id"),
                stage=node_data.get("stage"),
                state=node_data.get("state", {}),
                metrics=node_data.get("metrics", {}),
                timestamp=node_data.get("timestamp", 0.0),
                probability=node_data.get("probability", 1.0),
                parent_node_id=node_data.get("parent_node_id"),
                child_node_ids=node_data.get("child_node_ids", []),
                is_decision_point=node_data.get("is_decision_point", False),
                is_terminal=node_data.get("is_terminal", False),
                coherence=node_data.get("coherence", 1.0)
            )
            
            self.timeline_nodes[node.node_id] = node
        except Exception as e:
            self.logger.error(f"Error loading timeline node: {e}")
    
    def _load_decision_point(self, decision_data: Dict[str, Any]) -> None:
        """Load a decision point from data"""
        try:
            # Parse decision impact
            impact = DecisionImpact[decision_data.get("impact", "MODERATE")]
            
            decision = DecisionPoint(
                decision_id=decision_data.get("decision_id"),
                node_id=decision_data.get("node_id"),
                timeline_id=decision_data.get("timeline_id"),
                name=decision_data.get("name"),
                description=decision_data.get("description", ""),
                options=decision_data.get("options", []),
                impact=impact,
                metrics=decision_data.get("metrics", {}),
                phi_optimization=decision_data.get("phi_optimization", {}),
                timestamp=decision_data.get("timestamp", 0.0)
            )
            
            self.decision_points[decision.decision_id] = decision
        except Exception as e:
            self.logger.error(f"Error loading decision point: {e}")
    
    def _load_timeline_branch(self, branch_data: Dict[str, Any]) -> None:
        """Load a timeline branch from data"""
        try:
            branch = TimelineBranch(
                branch_id=branch_data.get("branch_id"),
                timeline_id=branch_data.get("timeline_id"),
                name=branch_data.get("name"),
                origin_node_id=branch_data.get("origin_node_id"),
                node_ids=branch_data.get("node_ids", []),
                probability=branch_data.get("probability", 0.0),
                coherence=branch_data.get("coherence", 1.0),
                metrics=branch_data.get("metrics", {}),
                creation_time=branch_data.get("creation_time", 0.0)
            )
            
            self.timeline_branches[branch.branch_id] = branch
        except Exception as e:
            self.logger.error(f"Error loading timeline branch: {e}")
    
    def _load_timeline(self, timeline_data: Dict[str, Any]) -> None:
        """Load a timeline from data"""
        try:
            timeline_id = timeline_data.get("timeline_id")
            if timeline_id:
                self.timelines[timeline_id] = timeline_data
        except Exception as e:
            self.logger.error(f"Error loading timeline: {e}")
    
    def create_timeline(self, 
                      name: str, 
                      simulation_result_id: str,
                      timeline_type: str = "PHI_HARMONIC",
                      max_branch_depth: int = 5) -> Dict[str, Any]:
        """Create a new timeline from a simulation result"""
        with self.lock:
            # Generate timeline ID
            timestamp = int(time.time())
            timeline_id = f"timeline_{timestamp}_{hashlib.md5(name.encode()).hexdigest()[:8]}"
            
            # Parse timeline type
            try:
                parsed_type = TimelineType[timeline_type]
            except KeyError:
                self.logger.error(f"Unknown timeline type: {timeline_type}")
                return {
                    "success": False,
                    "error": f"Unknown timeline type: {timeline_type}"
                }
            
            # Create timeline
            timeline = {
                "timeline_id": timeline_id,
                "name": name,
                "simulation_result_id": simulation_result_id,
                "timeline_type": parsed_type.name,
                "max_branch_depth": max_branch_depth,
                "creation_time": timestamp,
                "root_node_id": None,
                "terminal_node_ids": [],
                "decision_point_ids": [],
                "branch_ids": [],
                "metrics": {},
                "coherence": 1.0,
                "status": "INITIALIZED"
            }
            
            # Store timeline
            self.timelines[timeline_id] = timeline
            self._save_timeline(timeline)
            
            self.logger.info(f"Timeline created: {timeline_id}")
            
            return {
                "success": True,
                "timeline_id": timeline_id,
                "name": name,
                "timeline_type": timeline_type
            }
    
    def generate_timeline_nodes(self, 
                              timeline_id: str,
                              simulation_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate timeline nodes from simulation data"""
        with self.lock:
            # Check if timeline exists
            if timeline_id not in self.timelines:
                self.logger.error(f"Timeline not found: {timeline_id}")
                return {
                    "success": False,
                    "error": f"Timeline not found: {timeline_id}"
                }
            
            # Get timeline
            timeline = self.timelines[timeline_id]
            
            # Check if simulation data is valid
            if not simulation_data.get("deployment_timeline"):
                self.logger.error("Invalid simulation data: missing deployment timeline")
                return {
                    "success": False,
                    "error": "Invalid simulation data: missing deployment timeline"
                }
            
            # Generate timeline nodes
            try:
                node_count, root_node_id, terminal_node_ids = self._generate_nodes_from_simulation(
                    timeline_id, simulation_data
                )
                
                # Update timeline
                timeline["root_node_id"] = root_node_id
                timeline["terminal_node_ids"] = terminal_node_ids
                timeline["status"] = "NODES_GENERATED"
                
                # Save timeline
                self._save_timeline(timeline)
                
                self.logger.info(f"Generated {node_count} nodes for timeline {timeline_id}")
                
                return {
                    "success": True,
                    "timeline_id": timeline_id,
                    "node_count": node_count,
                    "root_node_id": root_node_id,
                    "terminal_node_count": len(terminal_node_ids)
                }
            except Exception as e:
                self.logger.error(f"Error generating timeline nodes: {e}")
                return {
                    "success": False,
                    "error": f"Error generating timeline nodes: {str(e)}"
                }
    
    def _generate_nodes_from_simulation(self, 
                                      timeline_id: str, 
                                      simulation_data: Dict[str, Any]) -> Tuple[int, str, List[str]]:
        """Generate timeline nodes from simulation data"""
        deployment_timeline = simulation_data.get("deployment_timeline", [])
        
        # Create nodes
        previous_node_id = None
        root_node_id = None
        terminal_node_ids = []
        
        for i, stage in enumerate(deployment_timeline):
            # Generate node ID
            node_id = f"node_{timeline_id}_{i}_{hashlib.md5(stage.get('stage_name', f'stage_{i}').encode()).hexdigest()[:6]}"
            
            # Create timeline node
            node = TimelineNode(
                node_id=node_id,
                timeline_id=timeline_id,
                stage=stage.get("stage_name", f"Stage {i}"),
                state=self._extract_stage_state(stage),
                metrics=stage.get("metrics", {}),
                timestamp=i * 100.0,  # Simplified timestamp
                probability=1.0,  # Main timeline has 100% probability
                parent_node_id=previous_node_id,
                child_node_ids=[],
                is_decision_point=False,  # Will be updated later
                is_terminal=(i == len(deployment_timeline) - 1),
                coherence=stage.get("coherence", 1.0)
            )
            
            # Set root node
            if i == 0:
                root_node_id = node_id
            
            # Update parent's child reference
            if previous_node_id and previous_node_id in self.timeline_nodes:
                parent_node = self.timeline_nodes[previous_node_id]
                parent_node.child_node_ids.append(node_id)
                self._save_timeline_node(parent_node)
            
            # Check if terminal
            if node.is_terminal:
                terminal_node_ids.append(node_id)
            
            # Store node
            self.timeline_nodes[node_id] = node
            self._save_timeline_node(node)
            
            # Update previous node
            previous_node_id = node_id
        
        # Mark decision points based on alternate outcomes
        for i, stage in enumerate(deployment_timeline):
            if stage.get("alternate_outcomes") and i < len(deployment_timeline) - 1:
                # This stage has alternate outcomes, mark as decision point
                node_id = f"node_{timeline_id}_{i}_{hashlib.md5(stage.get('stage_name', f'stage_{i}').encode()).hexdigest()[:6]}"
                
                if node_id in self.timeline_nodes:
                    node = self.timeline_nodes[node_id]
                    node.is_decision_point = True
                    self._save_timeline_node(node)
                    
                    # Create decision point
                    self._create_decision_point_from_stage(node, stage, timeline_id)
        
        return len(deployment_timeline), root_node_id, terminal_node_ids
    
    def _extract_stage_state(self, stage: Dict[str, Any]) -> Dict[str, Any]:
        """Extract state information from a stage"""
        state = {
            "success": stage.get("success", True),
            "resources": stage.get("resources", {}),
            "errors": [e.get("message", "Unknown error") for e in stage.get("errors", [])],
            "coherence": stage.get("coherence", 1.0)
        }
        
        # Add metrics if available
        if "metrics" in stage:
            state["metrics"] = stage["metrics"]
        
        return state
    
    def _create_decision_point_from_stage(self, 
                                        node: TimelineNode, 
                                        stage: Dict[str, Any],
                                        timeline_id: str) -> str:
        """Create a decision point from a stage with alternate outcomes"""
        # Generate decision ID
        decision_id = f"decision_{timeline_id}_{hashlib.md5(node.stage.encode()).hexdigest()[:8]}"
        
        # Extract options from alternate outcomes
        options = []
        for i, outcome in enumerate(stage.get("alternate_outcomes", [])):
            option = {
                "option_id": f"option_{i}",
                "name": f"Option {i+1}: {outcome.get('variant_name', 'Alternate Variant')}",
                "description": f"Alternative outcome with {'success' if outcome.get('success', True) else 'failure'}",
                "success": outcome.get("success", True),
                "probability": outcome.get("probability", 0.5),
                "coherence": outcome.get("coherence", 0.8),
                "variant_id": outcome.get("variant_id"),
                "metrics": {
                    "execution_time": outcome.get("execution_time", 1.0),
                    "coherence": outcome.get("coherence", 0.8),
                    "resource_efficiency": 1.0 / (sum(outcome.get("resources", {}).values()) or 1.0)
                }
            }
            options.append(option)
        
        # Calculate impact based on variation between options
        coherence_variation = max(abs(opt.get("coherence", 0.8) - node.coherence) for opt in options) if options else 0
        success_variation = any(opt.get("success", True) != node.state.get("success", True) for opt in options)
        
        if success_variation:
            impact = DecisionImpact.CRITICAL
        elif coherence_variation > 0.3:
            impact = DecisionImpact.MAJOR
        elif coherence_variation > 0.1:
            impact = DecisionImpact.MODERATE
        elif coherence_variation > 0.05:
            impact = DecisionImpact.MINOR
        else:
            impact = DecisionImpact.TRIVIAL
        
        # Create phi-optimization guidance
        phi_optimization = self._generate_phi_optimization_guidance(node, options)
        
        # Create metrics
        metrics = {
            "coherence_variation": coherence_variation,
            "option_count": len(options),
            "phi_optimization_potential": phi_optimization.get("potential", 0.0),
            "decision_impact": len(impact.name)
        }
        
        # Create decision point
        decision = DecisionPoint(
            decision_id=decision_id,
            node_id=node.node_id,
            timeline_id=timeline_id,
            name=f"Decision: {node.stage}",
            description=f"Decision point at stage '{node.stage}' with {len(options)} alternative outcomes",
            options=options,
            impact=impact,
            metrics=metrics,
            phi_optimization=phi_optimization,
            timestamp=node.timestamp
        )
        
        # Store decision point
        self.decision_points[decision_id] = decision
        self._save_decision_point(decision)
        
        # Update timeline
        timeline = self.timelines[timeline_id]
        timeline["decision_point_ids"] = timeline.get("decision_point_ids", [])
        if decision_id not in timeline["decision_point_ids"]:
            timeline["decision_point_ids"].append(decision_id)
        self._save_timeline(timeline)
        
        self.logger.info(f"Created decision point {decision_id} for node {node.node_id}")
        
        return decision_id
    
    def _generate_phi_optimization_guidance(self, 
                                         node: TimelineNode, 
                                         options: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate phi-harmonic optimization guidance for decision point"""
        # Calculate baseline coherence
        baseline_coherence = node.coherence
        
        # Find phi-harmonic option (closest to baseline * phi or baseline / phi)
        phi_up_target = baseline_coherence * self.phi
        phi_down_target = baseline_coherence / self.phi
        
        best_option = None
        best_option_id = None
        best_distance = float('inf')
        
        for option in options:
            option_coherence = option.get("coherence", 0.8)
            
            # Calculate distance to phi-harmonic targets
            distance_up = abs(option_coherence - phi_up_target)
            distance_down = abs(option_coherence - phi_down_target)
            min_distance = min(distance_up, distance_down)
            
            if min_distance < best_distance:
                best_distance = min_distance
                best_option = option
                best_option_id = option.get("option_id")
        
        # Calculate optimization potential (1.0 = perfect phi alignment)
        optimization_potential = 1.0 - min(1.0, best_distance / baseline_coherence)
        
        # Generate guidance
        return {
            "baseline_coherence": baseline_coherence,
            "phi_up_target": phi_up_target,
            "phi_down_target": phi_down_target,
            "best_option_id": best_option_id,
            "best_option_coherence": best_option.get("coherence", 0.8) if best_option else None,
            "phi_harmonic_distance": best_distance,
            "potential": optimization_potential,
            "recommendation": "phi_up" if (best_option and abs(best_option.get("coherence", 0.8) - phi_up_target) < 
                                       abs(best_option.get("coherence", 0.8) - phi_down_target)) else "phi_down",
            "phi_factor": self.phi
        }
    
    def generate_timeline_branches(self, 
                                timeline_id: str,
                                branch_depth: Optional[int] = None) -> Dict[str, Any]:
        """Generate branches for a timeline based on decision points"""
        with self.lock:
            # Check if timeline exists
            if timeline_id not in self.timelines:
                self.logger.error(f"Timeline not found: {timeline_id}")
                return {
                    "success": False,
                    "error": f"Timeline not found: {timeline_id}"
                }
            
            # Get timeline
            timeline = self.timelines[timeline_id]
            
            # Check if nodes have been generated
            if timeline.get("status") != "NODES_GENERATED":
                self.logger.error(f"Timeline {timeline_id} not ready for branch generation. Status: {timeline.get('status')}")
                return {
                    "success": False,
                    "error": f"Timeline not ready for branch generation. Status: {timeline.get('status')}"
                }
            
            # Use provided branch depth or default to timeline's max_branch_depth
            depth = branch_depth if branch_depth is not None else timeline.get("max_branch_depth", 5)
            
            # Generate branches
            try:
                branch_count, branch_ids = self._generate_branches_from_decision_points(
                    timeline_id, depth
                )
                
                # Update timeline
                timeline["branch_ids"] = branch_ids
                timeline["status"] = "BRANCHES_GENERATED"
                
                # Save timeline
                self._save_timeline(timeline)
                
                self.logger.info(f"Generated {branch_count} branches for timeline {timeline_id}")
                
                return {
                    "success": True,
                    "timeline_id": timeline_id,
                    "branch_count": branch_count,
                    "branch_ids": branch_ids
                }
            except Exception as e:
                self.logger.error(f"Error generating timeline branches: {e}")
                return {
                    "success": False,
                    "error": f"Error generating timeline branches: {str(e)}"
                }
    
    def _generate_branches_from_decision_points(self, 
                                             timeline_id: str, 
                                             max_depth: int) -> Tuple[int, List[str]]:
        """Generate branches from decision points"""
        timeline = self.timelines[timeline_id]
        decision_point_ids = timeline.get("decision_point_ids", [])
        
        if not decision_point_ids:
            self.logger.warning(f"No decision points found for timeline {timeline_id}")
            return 0, []
        
        branch_ids = []
        
        # Create branches for each decision point
        for decision_id in decision_point_ids:
            if decision_id not in self.decision_points:
                continue
                
            decision = self.decision_points[decision_id]
            
            # Generate branches for each option
            for option in decision.options:
                option_id = option.get("option_id")
                
                # Create branch for this option
                branch_id = self._create_branch_from_option(
                    timeline_id, decision, option, max_depth
                )
                
                if branch_id:
                    branch_ids.append(branch_id)
        
        return len(branch_ids), branch_ids
    
    def _create_branch_from_option(self, 
                                timeline_id: str, 
                                decision: DecisionPoint, 
                                option: Dict[str, Any],
                                max_depth: int) -> Optional[str]:
        """Create a branch from a decision option"""
        # Generate branch ID
        branch_id = f"branch_{timeline_id}_{decision.decision_id}_{option.get('option_id')}"
        
        # Create branch with original node at start
        if decision.node_id not in self.timeline_nodes:
            self.logger.error(f"Decision node {decision.node_id} not found")
            return None
        
        origin_node = self.timeline_nodes[decision.node_id]
        
        # Clone nodes along the branch (up to max_depth)
        new_nodes, terminal_node_ids = self._clone_nodes_for_branch(
            origin_node, timeline_id, branch_id, option, max_depth
        )
        
        if not new_nodes:
            self.logger.error(f"Failed to create nodes for branch {branch_id}")
            return None
        
        # Create branch metrics based on option and cloned nodes
        metrics = {
            "coherence": option.get("coherence", 0.8),
            "execution_time": option.get("metrics", {}).get("execution_time", 1.0),
            "resource_efficiency": option.get("metrics", {}).get("resource_efficiency", 1.0),
            "node_count": len(new_nodes),
            "terminal_count": len(terminal_node_ids),
            "phi_alignment": abs(option.get("coherence", 0.8) - decision.phi_optimization.get("phi_up_target", 0.0)) < 0.1 or
                           abs(option.get("coherence", 0.8) - decision.phi_optimization.get("phi_down_target", 0.0)) < 0.1
        }
        
        # Create branch
        branch = TimelineBranch(
            branch_id=branch_id,
            timeline_id=timeline_id,
            name=f"Branch from {decision.name}: {option.get('name', 'Option')}",
            origin_node_id=decision.node_id,
            node_ids=[node.node_id for node in new_nodes],
            probability=option.get("probability", 0.5),
            coherence=option.get("coherence", 0.8),
            metrics=metrics,
            creation_time=time.time()
        )
        
        # Store branch
        self.timeline_branches[branch_id] = branch
        self._save_timeline_branch(branch)
        
        self.logger.info(f"Created branch {branch_id} with {len(new_nodes)} nodes")
        
        return branch_id
    
    def _clone_nodes_for_branch(self, 
                             origin_node: TimelineNode, 
                             timeline_id: str,
                             branch_id: str,
                             option: Dict[str, Any],
                             max_depth: int) -> Tuple[List[TimelineNode], List[str]]:
        """Clone nodes for a new branch, applying option changes"""
        new_nodes = []
        terminal_node_ids = []
        node_map = {}  # Maps original node IDs to new node IDs
        
        # First, find all nodes to clone (original node + descendants up to max_depth)
        nodes_to_clone = self._find_descendants(origin_node, max_depth)
        
        # Create modified origin node as the branch root
        new_origin_node = self._clone_node_with_modifications(
            origin_node, timeline_id, branch_id, option, None
        )
        
        new_nodes.append(new_origin_node)
        node_map[origin_node.node_id] = new_origin_node.node_id
        
        # Clone all descendants, updating parent/child references
        for node in nodes_to_clone[1:]:  # Skip the origin node (already cloned)
            if node.parent_node_id not in node_map:
                # Parent not cloned, skip this node
                continue
                
            new_parent_id = node_map[node.parent_node_id]
            
            # Clone the node with the new parent
            new_node = self._clone_node_with_modifications(
                node, timeline_id, branch_id, option, new_parent_id
            )
            
            new_nodes.append(new_node)
            node_map[node.node_id] = new_node.node_id
            
            # Update parent's children
            if new_parent_id in self.timeline_nodes:
                parent_node = self.timeline_nodes[new_parent_id]
                parent_node.child_node_ids.append(new_node.node_id)
                self._save_timeline_node(parent_node)
            
            # Check if terminal
            if new_node.is_terminal:
                terminal_node_ids.append(new_node.node_id)
        
        # Update child references for all new nodes
        for original_id, new_id in node_map.items():
            if original_id in self.timeline_nodes and new_id in self.timeline_nodes:
                original_node = self.timeline_nodes[original_id]
                new_node = self.timeline_nodes[new_id]
                
                # Map original children to new children
                new_child_ids = []
                for child_id in original_node.child_node_ids:
                    if child_id in node_map:
                        new_child_ids.append(node_map[child_id])
                
                new_node.child_node_ids = new_child_ids
                self._save_timeline_node(new_node)
        
        return new_nodes, terminal_node_ids
    
    def _find_descendants(self, node: TimelineNode, max_depth: int) -> List[TimelineNode]:
        """Find all descendants of a node up to max_depth"""
        result = [node]
        visited = {node.node_id}
        queue = [(node, 0)]  # (node, depth)
        
        while queue:
            current, depth = queue.pop(0)
            
            # Check depth limit
            if depth >= max_depth:
                continue
            
            # Add children to queue
            for child_id in current.child_node_ids:
                if child_id in self.timeline_nodes and child_id not in visited:
                    child_node = self.timeline_nodes[child_id]
                    result.append(child_node)
                    visited.add(child_id)
                    queue.append((child_node, depth + 1))
        
        return result
    
    def _clone_node_with_modifications(self, 
                                    original: TimelineNode, 
                                    timeline_id: str,
                                    branch_id: str,
                                    option: Dict[str, Any],
                                    parent_id: Optional[str]) -> TimelineNode:
        """Clone a node with modifications based on the branch option"""
        # Generate new node ID
        new_node_id = f"node_{branch_id}_{hashlib.md5(original.stage.encode()).hexdigest()[:6]}"
        
        # Calculate modified metrics
        modified_metrics = self._modify_metrics_for_branch(original.metrics, option)
        
        # Calculate modified state
        modified_state = self._modify_state_for_branch(original.state, option)
        
        # Calculate modified coherence
        # Use option coherence for the origin node, then gradually blend with original
        depth = 0
        current = original
        while current.parent_node_id:
            if current.parent_node_id in self.timeline_nodes:
                current = self.timeline_nodes[current.parent_node_id]
                depth += 1
            else:
                break
        
        # Blend coherence: option_coherence at depth 0, original at depth max_depth
        coherence_blend_factor = min(1.0, depth / 5.0)  # 5 steps to full original
        modified_coherence = (option.get("coherence", 0.8) * (1.0 - coherence_blend_factor) + 
                            original.coherence * coherence_blend_factor)
        
        # Create new node
        new_node = TimelineNode(
            node_id=new_node_id,
            timeline_id=timeline_id,
            stage=original.stage,
            state=modified_state,
            metrics=modified_metrics,
            timestamp=original.timestamp,
            probability=original.probability * option.get("probability", 0.5),
            parent_node_id=parent_id,
            child_node_ids=[],  # Will be populated later
            is_decision_point=original.is_decision_point,
            is_terminal=original.is_terminal,
            coherence=modified_coherence
        )
        
        # Store new node
        self.timeline_nodes[new_node_id] = new_node
        self._save_timeline_node(new_node)
        
        return new_node
    
    def _modify_metrics_for_branch(self, 
                                original_metrics: Dict[str, float], 
                                option: Dict[str, Any]) -> Dict[str, float]:
        """Modify metrics based on branch option"""
        if not original_metrics:
            return option.get("metrics", {})
        
        # Create a copy of original metrics
        modified = dict(original_metrics)
        
        # Apply option metrics as modifiers
        option_metrics = option.get("metrics", {})
        for key, value in option_metrics.items():
            if key in modified:
                # Blend old and new (70% original, 30% option)
                modified[key] = 0.7 * modified[key] + 0.3 * value
            else:
                modified[key] = value
        
        # Adjust coherence if present
        if "coherence" in modified and "coherence" in option_metrics:
            modified["coherence"] = option_metrics["coherence"]
        
        return modified
    
    def _modify_state_for_branch(self, 
                              original_state: Dict[str, Any], 
                              option: Dict[str, Any]) -> Dict[str, Any]:
        """Modify state based on branch option"""
        # Create a copy of the original state
        modified = dict(original_state)
        
        # Override success state if different
        if "success" in option:
            modified["success"] = option["success"]
        
        # Modify coherence
        if "coherence" in option:
            modified["coherence"] = option["coherence"]
        
        # Modify resources if present
        if "resources" in option and "resources" in modified:
            # Blend resources (70% original, 30% option)
            option_resources = option["resources"]
            for resource, value in modified["resources"].items():
                if resource in option_resources:
                    modified["resources"][resource] = 0.7 * value + 0.3 * option_resources[resource]
        
        return modified
    
    def analyze_timeline(self, timeline_id: str) -> Dict[str, Any]:
        """Analyze a timeline and calculate metrics"""
        with self.lock:
            # Check if timeline exists
            if timeline_id not in self.timelines:
                self.logger.error(f"Timeline not found: {timeline_id}")
                return {
                    "success": False,
                    "error": f"Timeline not found: {timeline_id}"
                }
            
            # Get timeline
            timeline = self.timelines[timeline_id]
            
            # Check if branches have been generated
            if timeline.get("status") != "BRANCHES_GENERATED":
                self.logger.error(f"Timeline {timeline_id} not ready for analysis. Status: {timeline.get('status')}")
                return {
                    "success": False,
                    "error": f"Timeline not ready for analysis. Status: {timeline.get('status')}"
                }
            
            # Perform analysis
            try:
                analysis_result = self._analyze_timeline_metrics(timeline_id)
                
                # Update timeline with metrics
                timeline["metrics"] = analysis_result["metrics"]
                timeline["coherence"] = analysis_result["metrics"].get("overall_coherence", 1.0)
                timeline["status"] = "ANALYZED"
                
                # Save timeline
                self._save_timeline(timeline)
                
                self.logger.info(f"Analyzed timeline {timeline_id}")
                
                return {
                    "success": True,
                    "timeline_id": timeline_id,
                    "metrics": analysis_result["metrics"],
                    "critical_paths": analysis_result["critical_paths"],
                    "optimal_decisions": analysis_result["optimal_decisions"]
                }
            except Exception as e:
                self.logger.error(f"Error analyzing timeline: {e}")
                return {
                    "success": False,
                    "error": f"Error analyzing timeline: {str(e)}"
                }
    
    def _analyze_timeline_metrics(self, timeline_id: str) -> Dict[str, Any]:
        """Analyze timeline metrics and identify critical paths"""
        timeline = self.timelines[timeline_id]
        
        # Collect all nodes in the timeline
        all_nodes = []
        for node_id, node in self.timeline_nodes.items():
            if node.timeline_id == timeline_id:
                all_nodes.append(node)
        
        # Collect all branches
        branches = []
        for branch_id in timeline.get("branch_ids", []):
            if branch_id in self.timeline_branches:
                branches.append(self.timeline_branches[branch_id])
        
        # Calculate timeline metrics
        metrics = self._calculate_timeline_metrics(all_nodes, branches, timeline)
        
        # Identify critical paths
        critical_paths = self._identify_critical_paths(all_nodes, branches, timeline)
        
        # Find optimal decisions
        optimal_decisions = self._identify_optimal_decisions(timeline)
        
        return {
            "metrics": metrics,
            "critical_paths": critical_paths,
            "optimal_decisions": optimal_decisions
        }
    
    def _calculate_timeline_metrics(self, 
                                 nodes: List[TimelineNode], 
                                 branches: List[TimelineBranch],
                                 timeline: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate metrics for a timeline"""
        # Basic metrics
        node_count = len(nodes)
        branch_count = len(branches)
        decision_count = len(timeline.get("decision_point_ids", []))
        terminal_count = len(timeline.get("terminal_node_ids", []))
        
        # Calculate average coherence
        avg_coherence = sum(node.coherence for node in nodes) / node_count if node_count else 0
        
        # Calculate branch diversity (how different branches are from each other)
        branch_diversity = 0
        if branch_count > 1:
            coherence_values = [branch.coherence for branch in branches]
            branch_diversity = np.std(coherence_values) if coherence_values else 0
        
        # Calculate success rate across branches
        success_branches = 0
        for branch in branches:
            # Check if the last node in the branch is successful
            terminal_nodes = [node for node in nodes 
                             if node.node_id in branch.node_ids and node.is_terminal]
            
            if terminal_nodes and any(node.state.get("success", False) for node in terminal_nodes):
                success_branches += 1
        
        success_rate = success_branches / branch_count if branch_count else 0
        
        # Calculate phi-harmonic alignment
        phi_aligned_branches = sum(1 for branch in branches 
                                if branch.metrics.get("phi_alignment", False))
        phi_alignment = phi_aligned_branches / branch_count if branch_count else 0
        
        # Calculate decision quality (how impactful decisions are)
        decision_quality = 0
        if decision_count > 0:
            impact_scores = []
            for decision_id in timeline.get("decision_point_ids", []):
                if decision_id in self.decision_points:
                    decision = self.decision_points[decision_id]
                    impact_value = len(decision.impact.name) / len(DecisionImpact.CRITICAL.name)  # Normalize by max
                    impact_scores.append(impact_value)
            
            decision_quality = sum(impact_scores) / len(impact_scores) if impact_scores else 0
        
        # Calculate overall coherence using phi-weighted formula
        overall_coherence = (avg_coherence * self.phi + success_rate * self.phi_reciprocal) / (self.phi + self.phi_reciprocal)
        
        # Calculate timeline metrics for each dimension
        dimensional_metrics = {}
        for metric in TimelineMetric:
            if metric == TimelineMetric.COHERENCE:
                dimensional_metrics[metric.name] = avg_coherence
            elif metric == TimelineMetric.EFFICIENCY:
                # Average execution time across branches
                efficiency_values = [branch.metrics.get("execution_time", 1.0) for branch in branches]
                dimensional_metrics[metric.name] = 1.0 / (sum(efficiency_values) / len(efficiency_values)) if efficiency_values else 1.0
            elif metric == TimelineMetric.RESILIENCE:
                dimensional_metrics[metric.name] = success_rate
            elif metric == TimelineMetric.OPTIMIZATION:
                dimensional_metrics[metric.name] = phi_alignment
            elif metric == TimelineMetric.PHI_ALIGNMENT:
                dimensional_metrics[metric.name] = phi_alignment
            elif metric == TimelineMetric.DECISION_QUALITY:
                dimensional_metrics[metric.name] = decision_quality
            elif metric == TimelineMetric.BRANCH_DIVERSITY:
                dimensional_metrics[metric.name] = branch_diversity
            elif metric == TimelineMetric.CONVERGENCE:
                # Measure how many branches lead to similar outcomes
                dimensional_metrics[metric.name] = 1.0 - branch_diversity
        
        return {
            "node_count": node_count,
            "branch_count": branch_count,
            "decision_count": decision_count,
            "terminal_count": terminal_count,
            "average_coherence": avg_coherence,
            "branch_diversity": branch_diversity,
            "success_rate": success_rate,
            "phi_alignment": phi_alignment,
            "decision_quality": decision_quality,
            "overall_coherence": overall_coherence,
            "dimensional_metrics": dimensional_metrics
        }
    
    def _identify_critical_paths(self, 
                              nodes: List[TimelineNode], 
                              branches: List[TimelineBranch],
                              timeline: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Identify critical paths in the timeline"""
        critical_paths = []
        
        # Find main path
        main_path = self._trace_main_path(timeline)
        if main_path:
            critical_paths.append({
                "path_id": "main_path",
                "name": "Main Timeline Path",
                "node_ids": main_path,
                "type": "MAIN",
                "coherence": timeline.get("coherence", 1.0),
                "importance": 1.0
            })
        
        # Find most successful branch
        best_success_branch = None
        best_success_coherence = 0
        
        for branch in branches:
            # Find terminal nodes in this branch
            terminal_nodes = [node for node in nodes 
                             if node.node_id in branch.node_ids and node.is_terminal]
            
            for terminal in terminal_nodes:
                if terminal.state.get("success", False) and terminal.coherence > best_success_coherence:
                    best_success_coherence = terminal.coherence
                    best_success_branch = branch
        
        if best_success_branch:
            # Trace path to the successful terminal node
            success_path = self._trace_branch_path(best_success_branch, nodes)
            if success_path:
                critical_paths.append({
                    "path_id": f"success_path_{best_success_branch.branch_id}",
                    "name": "Most Successful Path",
                    "node_ids": success_path,
                    "type": "SUCCESS",
                    "coherence": best_success_coherence,
                    "importance": 0.9
                })
        
        # Find most phi-aligned branch
        best_phi_branch = None
        best_phi_alignment = 0
        
        for branch in branches:
            if branch.metrics.get("phi_alignment", False):
                phi_alignment = branch.coherence
                if phi_alignment > best_phi_alignment:
                    best_phi_alignment = phi_alignment
                    best_phi_branch = branch
        
        if best_phi_branch:
            # Trace phi-aligned path
            phi_path = self._trace_branch_path(best_phi_branch, nodes)
            if phi_path:
                critical_paths.append({
                    "path_id": f"phi_path_{best_phi_branch.branch_id}",
                    "name": "Most Phi-Aligned Path",
                    "node_ids": phi_path,
                    "type": "PHI_HARMONIC",
                    "coherence": best_phi_branch.coherence,
                    "importance": 0.8
                })
        
        # Find most critical decision branch (one with highest impact)
        best_critical_branch = None
        best_critical_impact = 0
        
        for decision_id in timeline.get("decision_point_ids", []):
            if decision_id not in self.decision_points:
                continue
                
            decision = self.decision_points[decision_id]
            if decision.impact == DecisionImpact.CRITICAL or decision.impact == DecisionImpact.MAJOR:
                # Find branch associated with this decision
                for branch in branches:
                    if branch.origin_node_id == decision.node_id:
                        impact_value = len(decision.impact.name) / len(DecisionImpact.CRITICAL.name)
                        if impact_value > best_critical_impact:
                            best_critical_impact = impact_value
                            best_critical_branch = branch
        
        if best_critical_branch:
            # Trace critical decision path
            critical_decision_path = self._trace_branch_path(best_critical_branch, nodes)
            if critical_decision_path:
                critical_paths.append({
                    "path_id": f"critical_path_{best_critical_branch.branch_id}",
                    "name": "Most Critical Decision Path",
                    "node_ids": critical_decision_path,
                    "type": "CRITICAL_DECISION",
                    "coherence": best_critical_branch.coherence,
                    "importance": 0.7
                })
        
        return critical_paths
    
    def _trace_main_path(self, timeline: Dict[str, Any]) -> List[str]:
        """Trace the main path through the timeline"""
        path = []
        
        # Start with root node
        current_node_id = timeline.get("root_node_id")
        
        # Follow the primary path (first child at each step)
        while current_node_id and current_node_id in self.timeline_nodes:
            node = self.timeline_nodes[current_node_id]
            path.append(current_node_id)
            
            # If this is a terminal node, we're done
            if node.is_terminal:
                break
                
            # Otherwise, follow first child
            if node.child_node_ids:
                current_node_id = node.child_node_ids[0]
            else:
                break
        
        return path
    
    def _trace_branch_path(self, branch: TimelineBranch, nodes: List[TimelineNode]) -> List[str]:
        """Trace a path through a branch"""
        # Find nodes in this branch
        branch_nodes = [node for node in nodes if node.node_id in branch.node_ids]
        
        # Start with the origin node
        path = [branch.origin_node_id]
        current_node_id = branch.origin_node_id
        
        # Find all terminal nodes in this branch
        terminal_nodes = [node for node in branch_nodes if node.is_terminal]
        
        # If we have terminals, trace back from the one with highest coherence
        if terminal_nodes:
            best_terminal = max(terminal_nodes, key=lambda n: n.coherence)
            
            # Trace back to origin
            path = [best_terminal.node_id]
            current = best_terminal
            
            while current.parent_node_id and current.parent_node_id in branch.node_ids:
                path.insert(0, current.parent_node_id)
                if current.parent_node_id in self.timeline_nodes:
                    current = self.timeline_nodes[current.parent_node_id]
                else:
                    break
        else:
            # No terminals, just follow first child at each step
            while current_node_id and current_node_id in self.timeline_nodes:
                node = self.timeline_nodes[current_node_id]
                
                # Find child nodes in this branch
                branch_children = [child_id for child_id in node.child_node_ids if child_id in branch.node_ids]
                
                if branch_children:
                    current_node_id = branch_children[0]
                    path.append(current_node_id)
                else:
                    break
        
        return path
    
    def _identify_optimal_decisions(self, timeline: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Identify optimal decisions based on phi-harmonic principles"""
        optimal_decisions = []
        
        for decision_id in timeline.get("decision_point_ids", []):
            if decision_id not in self.decision_points:
                continue
                
            decision = self.decision_points[decision_id]
            
            # Get phi optimization guidance
            phi_opt = decision.phi_optimization
            best_option_id = phi_opt.get("best_option_id")
            recommendation = phi_opt.get("recommendation", "phi_up")
            
            # Find the best option
            best_option = None
            for option in decision.options:
                if option.get("option_id") == best_option_id:
                    best_option = option
                    break
            
            if best_option:
                # Find branch associated with this option
                branch_id = None
                for branch_id_candidate in timeline.get("branch_ids", []):
                    if branch_id_candidate.endswith(best_option_id):
                        branch_id = branch_id_candidate
                        break
                
                optimal_decisions.append({
                    "decision_id": decision_id,
                    "node_id": decision.node_id,
                    "name": decision.name,
                    "optimal_option_id": best_option_id,
                    "optimal_option_name": best_option.get("name", "Option"),
                    "phi_recommendation": recommendation,
                    "coherence": best_option.get("coherence", 0.8),
                    "branch_id": branch_id,
                    "impact": decision.impact.name,
                    "confidence": phi_opt.get("potential", 0.0)
                })
        
        return optimal_decisions
    
    def get_timeline(self, timeline_id: str, detailed: bool = False) -> Dict[str, Any]:
        """Get timeline information"""
        with self.lock:
            # Check if timeline exists
            if timeline_id not in self.timelines:
                self.logger.error(f"Timeline not found: {timeline_id}")
                return {
                    "success": False,
                    "error": f"Timeline not found: {timeline_id}"
                }
            
            # Get timeline
            timeline = self.timelines[timeline_id]
            
            result = {
                "success": True,
                "timeline_id": timeline_id,
                "name": timeline.get("name"),
                "timeline_type": timeline.get("timeline_type"),
                "creation_time": timeline.get("creation_time"),
                "status": timeline.get("status"),
                "simulation_result_id": timeline.get("simulation_result_id"),
                "node_count": len([node for node in self.timeline_nodes.values() 
                                if node.timeline_id == timeline_id]),
                "decision_point_count": len(timeline.get("decision_point_ids", [])),
                "branch_count": len(timeline.get("branch_ids", [])),
                "metrics": timeline.get("metrics", {}),
                "coherence": timeline.get("coherence", 1.0)
            }
            
            # Add detailed information if requested
            if detailed:
                # Get root node
                root_id = timeline.get("root_node_id")
                root_node = self.timeline_nodes.get(root_id)
                
                # Get main path
                main_path = self._trace_main_path(timeline)
                
                # Get critical paths
                critical_paths = []
                if timeline.get("status") == "ANALYZED":
                    critical_paths = self._identify_critical_paths(
                        [node for node in self.timeline_nodes.values() if node.timeline_id == timeline_id],
                        [self.timeline_branches[branch_id] for branch_id in timeline.get("branch_ids", []) 
                         if branch_id in self.timeline_branches],
                        timeline
                    )
                
                # Get optimal decisions
                optimal_decisions = []
                if timeline.get("status") == "ANALYZED":
                    optimal_decisions = self._identify_optimal_decisions(timeline)
                
                result.update({
                    "root_node": self._node_to_dict(root_node) if root_node else None,
                    "main_path": [self._node_to_dict(self.timeline_nodes[node_id]) 
                                 for node_id in main_path if node_id in self.timeline_nodes],
                    "critical_paths": critical_paths,
                    "optimal_decisions": optimal_decisions,
                    "decision_points": [self._decision_to_dict(self.decision_points[decision_id]) 
                                      for decision_id in timeline.get("decision_point_ids", []) 
                                      if decision_id in self.decision_points],
                    "branches": [self._branch_to_dict(self.timeline_branches[branch_id]) 
                               for branch_id in timeline.get("branch_ids", []) 
                               if branch_id in self.timeline_branches]
                })
            
            return result
    
    def _node_to_dict(self, node: TimelineNode) -> Dict[str, Any]:
        """Convert a node to a dictionary representation"""
        if not node:
            return None
            
        return {
            "node_id": node.node_id,
            "timeline_id": node.timeline_id,
            "stage": node.stage,
            "metrics": node.metrics,
            "timestamp": node.timestamp,
            "probability": node.probability,
            "parent_node_id": node.parent_node_id,
            "child_node_ids": node.child_node_ids,
            "is_decision_point": node.is_decision_point,
            "is_terminal": node.is_terminal,
            "coherence": node.coherence,
            "success": node.state.get("success", True)
        }
    
    def _decision_to_dict(self, decision: DecisionPoint) -> Dict[str, Any]:
        """Convert a decision point to a dictionary representation"""
        if not decision:
            return None
            
        return {
            "decision_id": decision.decision_id,
            "node_id": decision.node_id,
            "timeline_id": decision.timeline_id,
            "name": decision.name,
            "description": decision.description,
            "option_count": len(decision.options),
            "impact": decision.impact.name,
            "metrics": decision.metrics,
            "phi_optimization": decision.phi_optimization,
            "timestamp": decision.timestamp
        }
    
    def _branch_to_dict(self, branch: TimelineBranch) -> Dict[str, Any]:
        """Convert a branch to a dictionary representation"""
        if not branch:
            return None
            
        return {
            "branch_id": branch.branch_id,
            "timeline_id": branch.timeline_id,
            "name": branch.name,
            "origin_node_id": branch.origin_node_id,
            "node_count": len(branch.node_ids),
            "probability": branch.probability,
            "coherence": branch.coherence,
            "metrics": branch.metrics,
            "creation_time": branch.creation_time
        }
    
    def _save_timeline_node(self, node: TimelineNode) -> None:
        """Save a timeline node to disk"""
        node_dir = os.path.join(self.storage_path, "nodes")
        os.makedirs(node_dir, exist_ok=True)
        
        node_path = os.path.join(node_dir, f"{node.node_id}.json")
        
        # Create serializable representation
        node_data = {
            "node_id": node.node_id,
            "timeline_id": node.timeline_id,
            "stage": node.stage,
            "state": node.state,
            "metrics": node.metrics,
            "timestamp": node.timestamp,
            "probability": node.probability,
            "parent_node_id": node.parent_node_id,
            "child_node_ids": node.child_node_ids,
            "is_decision_point": node.is_decision_point,
            "is_terminal": node.is_terminal,
            "coherence": node.coherence
        }
        
        # Save to disk
        with open(node_path, 'w') as f:
            json.dump(node_data, f, indent=2)
    
    def _save_decision_point(self, decision: DecisionPoint) -> None:
        """Save a decision point to disk"""
        decision_dir = os.path.join(self.storage_path, "decisions")
        os.makedirs(decision_dir, exist_ok=True)
        
        decision_path = os.path.join(decision_dir, f"{decision.decision_id}.json")
        
        # Create serializable representation
        decision_data = {
            "decision_id": decision.decision_id,
            "node_id": decision.node_id,
            "timeline_id": decision.timeline_id,
            "name": decision.name,
            "description": decision.description,
            "options": decision.options,
            "impact": decision.impact.name,
            "metrics": decision.metrics,
            "phi_optimization": decision.phi_optimization,
            "timestamp": decision.timestamp
        }
        
        # Save to disk
        with open(decision_path, 'w') as f:
            json.dump(decision_data, f, indent=2)
    
    def _save_timeline_branch(self, branch: TimelineBranch) -> None:
        """Save a timeline branch to disk"""
        branch_dir = os.path.join(self.storage_path, "branches")
        os.makedirs(branch_dir, exist_ok=True)
        
        branch_path = os.path.join(branch_dir, f"{branch.branch_id}.json")
        
        # Create serializable representation
        branch_data = {
            "branch_id": branch.branch_id,
            "timeline_id": branch.timeline_id,
            "name": branch.name,
            "origin_node_id": branch.origin_node_id,
            "node_ids": branch.node_ids,
            "probability": branch.probability,
            "coherence": branch.coherence,
            "metrics": branch.metrics,
            "creation_time": branch.creation_time
        }
        
        # Save to disk
        with open(branch_path, 'w') as f:
            json.dump(branch_data, f, indent=2)
    
    def _save_timeline(self, timeline: Dict[str, Any]) -> None:
        """Save a timeline to disk"""
        timeline_dir = os.path.join(self.storage_path, "timelines")
        os.makedirs(timeline_dir, exist_ok=True)
        
        timeline_path = os.path.join(timeline_dir, f"{timeline['timeline_id']}.json")
        
        # Save to disk
        with open(timeline_path, 'w') as f:
            json.dump(timeline, f, indent=2)
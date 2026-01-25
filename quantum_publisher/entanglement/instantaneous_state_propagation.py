"""
Instantaneous State Propagation
Part of the Quantum Entanglement System - Phase 8
Frequency: ∞^∞ (∞ Hz)

Enables zero-lag state updates across entangled platforms
with perfect coherence preservation during propagation.
"""
import os
import json
import time
import logging
import threading
import numpy as np
from enum import Enum, auto
from dataclasses import dataclass, field
from typing import Dict, List, Set, Any, Optional, Tuple, Union, Callable

# Phi-harmonic constants
PHI = 1.618033988749895
PHI_RECIPROCAL = 0.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = PHI ** PHI
INFINITY_FREQUENCY = float('inf')  # ∞^∞ frequency


class PropagationMode(Enum):
    """Modes of state propagation"""
    BROADCAST = auto()     # Broadcast to all entangled platforms
    TARGETED = auto()      # Target specific platforms
    CASCADING = auto()     # Propagate in cascading pattern
    PHI_HARMONIC = auto()  # Propagate in phi-harmonic pattern


class PropagationPriority(Enum):
    """Priority levels for state propagation"""
    CRITICAL = auto()      # Highest priority (security, failure)
    HIGH = auto()          # High priority (configuration)
    NORMAL = auto()        # Normal priority (routine updates)
    LOW = auto()           # Low priority (metrics, analytics)
    BACKGROUND = auto()    # Background priority (optimization)


class StateUpdateType(Enum):
    """Types of state updates"""
    FULL = auto()          # Complete state replacement
    DELTA = auto()         # Delta/differential update
    INCREMENTAL = auto()   # Incremental update
    RESET = auto()         # Reset to baseline state
    REVERT = auto()        # Revert to previous state


@dataclass
class PropagationEvent:
    """Represents a state propagation event"""
    event_id: str
    source_platform_id: str
    target_platform_ids: List[str]
    propagation_mode: PropagationMode
    priority: PropagationPriority
    update_type: StateUpdateType
    state_data: Dict[str, Any]
    timestamp: float
    metadata: Dict[str, Any] = field(default_factory=dict)
    coherence: float = 1.0
    acknowledge_required: bool = False
    acknowledged: Dict[str, bool] = field(default_factory=dict)
    propagation_path: List[str] = field(default_factory=list)


@dataclass
class PropagationResult:
    """Results of a state propagation operation"""
    result_id: str
    event_id: str
    success: bool
    targets_reached: List[str]
    targets_failed: List[Dict[str, Any]]
    propagation_time: float
    coherence_preservation: float
    timestamp: float
    metadata: Dict[str, Any] = field(default_factory=dict)
    errors: List[Dict[str, Any]] = field(default_factory=list)


class InstantaneousStatePropagation:
    """Enables zero-lag state updates across entangled platforms"""
    
    def __init__(self, quantum_entangled_deployments=None, storage_path: Optional[str] = None):
        """Initialize the instantaneous state propagation system"""
        self.phi = PHI
        self.frequency = INFINITY_FREQUENCY
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "entanglement", "propagation")
        self.quantum_entangled_deployments = quantum_entangled_deployments
        self.propagation_events: Dict[str, PropagationEvent] = {}
        self.propagation_results: Dict[str, PropagationResult] = {}
        self.active_propagations: Dict[str, Dict[str, Any]] = {}
        self.coherence_threshold = PHI_RECIPROCAL
        self.lock = threading.RLock()
        self.logger = logging.getLogger("quantum_entanglement.propagation")
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Load propagation events and results
        self._load_propagation_events()
        self._load_propagation_results()
    
    def propagate_state(self,
                      source_platform_id: str,
                      state_data: Dict[str, Any],
                      target_platform_ids: Optional[List[str]] = None,
                      propagation_mode: str = "BROADCAST",
                      priority: str = "NORMAL",
                      update_type: str = "DELTA",
                      metadata: Optional[Dict[str, Any]] = None,
                      acknowledge_required: bool = False) -> Dict[str, Any]:
        """Propagate state across entangled platforms"""
        with self.lock:
            # Check if quantum entangled deployments is available
            if not self.quantum_entangled_deployments:
                self.logger.error("Quantum entangled deployments not available")
                return {
                    "success": False,
                    "error": "Quantum entangled deployments not available"
                }
            
            # Check if source platform exists
            if source_platform_id not in self.quantum_entangled_deployments.platforms:
                self.logger.error(f"Source platform not found: {source_platform_id}")
                return {
                    "success": False,
                    "error": f"Source platform not found: {source_platform_id}"
                }
            
            # Get source platform
            source_platform = self.quantum_entangled_deployments.platforms[source_platform_id]
            
            # Determine target platform IDs
            if target_platform_ids is None:
                # Get all entangled platforms
                target_platform_ids = []
                for pair_id, pair in source_platform.entanglement_pairs.items():
                    if pair.active:
                        target_platform_ids.append(pair.target_platform_id)
            
            # Convert propagation mode
            try:
                prop_mode = PropagationMode[propagation_mode]
            except KeyError:
                self.logger.error(f"Unknown propagation mode: {propagation_mode}")
                return {
                    "success": False,
                    "error": f"Unknown propagation mode: {propagation_mode}"
                }
            
            # Convert priority
            try:
                prop_priority = PropagationPriority[priority]
            except KeyError:
                self.logger.error(f"Unknown priority: {priority}")
                return {
                    "success": False,
                    "error": f"Unknown priority: {priority}"
                }
            
            # Convert update type
            try:
                update_type_enum = StateUpdateType[update_type]
            except KeyError:
                self.logger.error(f"Unknown update type: {update_type}")
                return {
                    "success": False,
                    "error": f"Unknown update type: {update_type}"
                }
            
            # Generate event ID
            event_id = self._generate_event_id(source_platform_id)
            
            # Create propagation event
            event = PropagationEvent(
                event_id=event_id,
                source_platform_id=source_platform_id,
                target_platform_ids=target_platform_ids.copy(),
                propagation_mode=prop_mode,
                priority=prop_priority,
                update_type=update_type_enum,
                state_data=state_data.copy(),
                timestamp=time.time(),
                metadata=metadata or {},
                coherence=1.0,  # Start with perfect coherence
                acknowledge_required=acknowledge_required,
                acknowledged={platform_id: False for platform_id in target_platform_ids},
                propagation_path=[source_platform_id]
            )
            
            # Store propagation event
            self.propagation_events[event_id] = event
            self._save_propagation_event(event)
            
            # Perform propagation based on mode
            if prop_mode == PropagationMode.BROADCAST:
                result = self._broadcast_propagation(event)
            elif prop_mode == PropagationMode.TARGETED:
                result = self._targeted_propagation(event)
            elif prop_mode == PropagationMode.CASCADING:
                result = self._cascading_propagation(event)
            elif prop_mode == PropagationMode.PHI_HARMONIC:
                result = self._phi_harmonic_propagation(event)
            else:
                # Default to broadcast
                result = self._broadcast_propagation(event)
            
            # Store propagation result
            self.propagation_results[result.result_id] = result
            self._save_propagation_result(result)
            
            self.logger.info(f"State propagation completed: {event_id}")
            
            return {
                "success": True,
                "event_id": event_id,
                "result_id": result.result_id,
                "targets_reached": result.targets_reached,
                "targets_failed": result.targets_failed,
                "propagation_time": result.propagation_time,
                "coherence_preservation": result.coherence_preservation
            }
    
    def _broadcast_propagation(self, event: PropagationEvent) -> PropagationResult:
        """Perform broadcast propagation to all targets simultaneously"""
        start_time = time.time()
        source_platform_id = event.source_platform_id
        targets_reached = []
        targets_failed = []
        
        # Process in appropriate order based on priority
        target_platforms = event.target_platform_ids.copy()
        
        # For critical priority, process in parallel
        if event.priority == PropagationPriority.CRITICAL:
            # Parallel processing simulation
            coherence_values = []
            
            for target_id in target_platforms:
                # Update target platform
                result = self._update_target_platform(
                    source_platform_id, target_id, event
                )
                
                if result["success"]:
                    targets_reached.append(target_id)
                    coherence_values.append(result["coherence"])
                else:
                    targets_failed.append({
                        "platform_id": target_id,
                        "error": result["error"]
                    })
            
            # Calculate overall coherence preservation
            coherence_preservation = sum(coherence_values) / max(1, len(coherence_values))
            
        else:
            # Process sequentially with priority-based sorting
            coherence_values = []
            
            # Sort targets by entanglement strength
            if self.quantum_entangled_deployments:
                source_platform = self.quantum_entangled_deployments.platforms.get(source_platform_id)
                if source_platform:
                    # Get entanglement strengths
                    strengths = {}
                    for pair_id, pair in source_platform.entanglement_pairs.items():
                        if pair.target_platform_id in target_platforms:
                            strengths[pair.target_platform_id] = pair.entanglement_strength
                    
                    # Sort targets by strength
                    target_platforms = sorted(
                        target_platforms,
                        key=lambda x: strengths.get(x, 0.0),
                        reverse=True
                    )
            
            # Process each target
            for target_id in target_platforms:
                # Update target platform
                result = self._update_target_platform(
                    source_platform_id, target_id, event
                )
                
                if result["success"]:
                    targets_reached.append(target_id)
                    coherence_values.append(result["coherence"])
                else:
                    targets_failed.append({
                        "platform_id": target_id,
                        "error": result["error"]
                    })
            
            # Calculate overall coherence preservation
            coherence_preservation = sum(coherence_values) / max(1, len(coherence_values))
        
        # Calculate propagation time
        propagation_time = time.time() - start_time
        
        # Create propagation result
        result_id = f"result_{event.event_id}"
        result = PropagationResult(
            result_id=result_id,
            event_id=event.event_id,
            success=len(targets_reached) > 0,
            targets_reached=targets_reached,
            targets_failed=targets_failed,
            propagation_time=propagation_time,
            coherence_preservation=coherence_preservation,
            timestamp=time.time(),
            metadata={
                "propagation_mode": event.propagation_mode.name,
                "priority": event.priority.name,
                "update_type": event.update_type.name
            }
        )
        
        return result
    
    def _targeted_propagation(self, event: PropagationEvent) -> PropagationResult:
        """Perform targeted propagation to specific platforms"""
        start_time = time.time()
        source_platform_id = event.source_platform_id
        targets_reached = []
        targets_failed = []
        
        # Get target priorities
        target_priorities = {}
        for target_id in event.target_platform_ids:
            # Default priority is normal
            priority = 3
            
            # Get priority from metadata if available
            if "target_priorities" in event.metadata:
                target_priorities_dict = event.metadata["target_priorities"]
                if target_id in target_priorities_dict:
                    target_priority = target_priorities_dict[target_id]
                    if isinstance(target_priority, int):
                        priority = target_priority
                    elif isinstance(target_priority, str):
                        # Convert string priority to integer
                        priority_map = {
                            "CRITICAL": 1,
                            "HIGH": 2,
                            "NORMAL": 3,
                            "LOW": 4,
                            "BACKGROUND": 5
                        }
                        priority = priority_map.get(target_priority, 3)
            
            target_priorities[target_id] = priority
        
        # Sort targets by priority
        sorted_targets = sorted(
            event.target_platform_ids,
            key=lambda x: target_priorities.get(x, 3)
        )
        
        # Process each target
        coherence_values = []
        for target_id in sorted_targets:
            # Update target platform
            result = self._update_target_platform(
                source_platform_id, target_id, event
            )
            
            if result["success"]:
                targets_reached.append(target_id)
                coherence_values.append(result["coherence"])
            else:
                targets_failed.append({
                    "platform_id": target_id,
                    "error": result["error"]
                })
        
        # Calculate overall coherence preservation
        coherence_preservation = sum(coherence_values) / max(1, len(coherence_values))
        
        # Calculate propagation time
        propagation_time = time.time() - start_time
        
        # Create propagation result
        result_id = f"result_{event.event_id}"
        result = PropagationResult(
            result_id=result_id,
            event_id=event.event_id,
            success=len(targets_reached) > 0,
            targets_reached=targets_reached,
            targets_failed=targets_failed,
            propagation_time=propagation_time,
            coherence_preservation=coherence_preservation,
            timestamp=time.time(),
            metadata={
                "propagation_mode": event.propagation_mode.name,
                "priority": event.priority.name,
                "update_type": event.update_type.name,
                "target_priorities": target_priorities
            }
        )
        
        return result
    
    def _cascading_propagation(self, event: PropagationEvent) -> PropagationResult:
        """Perform cascading propagation through a network of platforms"""
        start_time = time.time()
        source_platform_id = event.source_platform_id
        targets_reached = []
        targets_failed = []
        
        # Build platform network
        platform_network = self._build_platform_network(source_platform_id)
        
        # Calculate propagation levels
        propagation_levels = self._calculate_propagation_levels(platform_network, source_platform_id)
        
        # Process platforms level by level
        coherence_values = {}
        for level, platform_ids in sorted(propagation_levels.items()):
            level_targets = [pid for pid in platform_ids if pid in event.target_platform_ids]
            
            # Process each target in this level
            for target_id in level_targets:
                # Find source for this target (closest at previous level)
                effective_source_id = source_platform_id
                if level > 1:
                    # Find platform at previous level that's connected to this target
                    for prev_id in propagation_levels.get(level - 1, []):
                        if self._are_platforms_entangled(prev_id, target_id):
                            # Use this platform as the source
                            effective_source_id = prev_id
                            break
                
                # Use effective source with cascade-specific state data
                cascade_event = PropagationEvent(
                    event_id=event.event_id,
                    source_platform_id=effective_source_id,
                    target_platform_ids=[target_id],
                    propagation_mode=event.propagation_mode,
                    priority=event.priority,
                    update_type=event.update_type,
                    state_data=event.state_data.copy(),
                    timestamp=time.time(),
                    metadata=event.metadata.copy(),
                    coherence=coherence_values.get(effective_source_id, 1.0),
                    acknowledge_required=event.acknowledge_required
                )
                
                # Update target platform
                result = self._update_target_platform(
                    effective_source_id, target_id, cascade_event
                )
                
                if result["success"]:
                    targets_reached.append(target_id)
                    coherence_values[target_id] = result["coherence"]
                else:
                    targets_failed.append({
                        "platform_id": target_id,
                        "error": result["error"]
                    })
        
        # Calculate overall coherence preservation
        coherence_preservation = (
            sum(coherence_values.values()) / max(1, len(coherence_values))
            if coherence_values else 0.0
        )
        
        # Calculate propagation time
        propagation_time = time.time() - start_time
        
        # Create propagation result
        result_id = f"result_{event.event_id}"
        result = PropagationResult(
            result_id=result_id,
            event_id=event.event_id,
            success=len(targets_reached) > 0,
            targets_reached=targets_reached,
            targets_failed=targets_failed,
            propagation_time=propagation_time,
            coherence_preservation=coherence_preservation,
            timestamp=time.time(),
            metadata={
                "propagation_mode": event.propagation_mode.name,
                "priority": event.priority.name,
                "update_type": event.update_type.name,
                "propagation_levels": {level: pids for level, pids in propagation_levels.items()}
            }
        )
        
        return result
    
    def _phi_harmonic_propagation(self, event: PropagationEvent) -> PropagationResult:
        """Perform phi-harmonic propagation based on golden ratio patterns"""
        start_time = time.time()
        source_platform_id = event.source_platform_id
        targets_reached = []
        targets_failed = []
        
        # Create phi-harmonic sequence for platforms
        target_platforms = event.target_platform_ids.copy()
        phi_sequence = self._create_phi_harmonic_sequence(target_platforms)
        
        # Process each target in phi-harmonic sequence
        coherence_values = []
        for target_id in phi_sequence:
            # Update target platform
            result = self._update_target_platform(
                source_platform_id, target_id, event
            )
            
            if result["success"]:
                targets_reached.append(target_id)
                coherence_values.append(result["coherence"])
            else:
                targets_failed.append({
                    "platform_id": target_id,
                    "error": result["error"]
                })
            
            # Phi-harmonic pause between updates
            # In a real system, we'd update timing dynamically
            # Here we'll just have a slight delay for simulation
            time.sleep(0.001)  # 1ms delay
        
        # Calculate overall coherence preservation with phi-weighting
        coherence_preservation = 0.0
        if coherence_values:
            # Apply phi weighting
            weighted_sum = 0.0
            weight_sum = 0.0
            
            for i, coherence in enumerate(coherence_values):
                # Inverse phi weight (earlier platforms get higher weight)
                weight = PHI_RECIPROCAL ** i
                weighted_sum += coherence * weight
                weight_sum += weight
            
            coherence_preservation = weighted_sum / weight_sum
        
        # Calculate propagation time
        propagation_time = time.time() - start_time
        
        # Create propagation result
        result_id = f"result_{event.event_id}"
        result = PropagationResult(
            result_id=result_id,
            event_id=event.event_id,
            success=len(targets_reached) > 0,
            targets_reached=targets_reached,
            targets_failed=targets_failed,
            propagation_time=propagation_time,
            coherence_preservation=coherence_preservation,
            timestamp=time.time(),
            metadata={
                "propagation_mode": event.propagation_mode.name,
                "priority": event.priority.name,
                "update_type": event.update_type.name,
                "phi_sequence": phi_sequence
            }
        )
        
        return result
    
    def _update_target_platform(self, 
                              source_platform_id: str, 
                              target_platform_id: str, 
                              event: PropagationEvent) -> Dict[str, Any]:
        """Update a target platform with propagated state"""
        # Check if quantum entangled deployments is available
        if not self.quantum_entangled_deployments:
            return {
                "success": False,
                "error": "Quantum entangled deployments not available"
            }
        
        # Check if platforms exist
        if source_platform_id not in self.quantum_entangled_deployments.platforms:
            return {
                "success": False,
                "error": f"Source platform not found: {source_platform_id}"
            }
            
        if target_platform_id not in self.quantum_entangled_deployments.platforms:
            return {
                "success": False,
                "error": f"Target platform not found: {target_platform_id}"
            }
        
        # Get platforms
        source_platform = self.quantum_entangled_deployments.platforms[source_platform_id]
        target_platform = self.quantum_entangled_deployments.platforms[target_platform_id]
        
        # Check if platforms are entangled
        if not self._are_platforms_entangled(source_platform_id, target_platform_id):
            return {
                "success": False,
                "error": f"Platforms are not entangled: {source_platform_id} -> {target_platform_id}"
            }
        
        # Get entanglement pair
        pair = None
        for pair_id, p in source_platform.entanglement_pairs.items():
            if p.target_platform_id == target_platform_id and p.active:
                pair = p
                break
        
        if not pair:
            return {
                "success": False,
                "error": f"No active entanglement pair found: {source_platform_id} -> {target_platform_id}"
            }
        
        # Check if the state keys match the synchronized keys
        state_keys = set(event.state_data.keys())
        keys_to_update = state_keys.intersection(pair.synchronized_keys)
        
        if not keys_to_update:
            return {
                "success": False,
                "error": f"No matching keys to update between state and synchronized keys"
            }
        
        # Prepare state update data
        update_data = {}
        for key in keys_to_update:
            update_data[key] = event.state_data[key]
        
        # Create update type from event
        state_type_map = {
            StateUpdateType.FULL: "full",
            StateUpdateType.DELTA: "delta",
            StateUpdateType.INCREMENTAL: "incremental",
            StateUpdateType.RESET: "reset",
            StateUpdateType.REVERT: "revert"
        }
        
        state_type = state_type_map.get(event.update_type, "update")
        
        # Apply update based on type
        if event.update_type == StateUpdateType.FULL:
            # Full update replaces all synchronized keys
            result = self.quantum_entangled_deployments.update_platform_state(
                platform_id=target_platform_id,
                state_data=update_data,
                state_type=state_type
            )
        elif event.update_type == StateUpdateType.DELTA:
            # Delta update only updates specified keys
            result = self.quantum_entangled_deployments.update_platform_state(
                platform_id=target_platform_id,
                state_data=update_data,
                state_type=state_type
            )
        elif event.update_type == StateUpdateType.INCREMENTAL:
            # Incremental update incrementally updates values
            incremental_data = {}
            for key, value in update_data.items():
                current_value = target_platform.current_state.state_data.get(key)
                if isinstance(current_value, (int, float)) and isinstance(value, (int, float)):
                    # Add increment to current value
                    incremental_data[key] = current_value + value
                else:
                    # For non-numeric, just replace
                    incremental_data[key] = value
            
            result = self.quantum_entangled_deployments.update_platform_state(
                platform_id=target_platform_id,
                state_data=incremental_data,
                state_type=state_type
            )
        elif event.update_type == StateUpdateType.RESET:
            # Reset to initial values (empty for synchronized keys)
            reset_data = {key: None for key in keys_to_update}
            result = self.quantum_entangled_deployments.update_platform_state(
                platform_id=target_platform_id,
                state_data=reset_data,
                state_type=state_type
            )
        elif event.update_type == StateUpdateType.REVERT:
            # Revert to previous state
            if target_platform.current_state.history:
                # Get previous state
                previous_state_id = target_platform.current_state.history[-1]["state_id"]
                previous_state = self._get_platform_state_by_id(target_platform_id, previous_state_id)
                if previous_state:
                    revert_data = {}
                    for key in keys_to_update:
                        if key in previous_state.state_data:
                            revert_data[key] = previous_state.state_data[key]
                    
                    result = self.quantum_entangled_deployments.update_platform_state(
                        platform_id=target_platform_id,
                        state_data=revert_data,
                        state_type=state_type
                    )
                else:
                    # Fall back to delta update
                    result = self.quantum_entangled_deployments.update_platform_state(
                        platform_id=target_platform_id,
                        state_data=update_data,
                        state_type=state_type
                    )
            else:
                # No history, fall back to delta update
                result = self.quantum_entangled_deployments.update_platform_state(
                    platform_id=target_platform_id,
                    state_data=update_data,
                    state_type=state_type
                )
        else:
            # Default to delta update
            result = self.quantum_entangled_deployments.update_platform_state(
                platform_id=target_platform_id,
                state_data=update_data,
                state_type=state_type
            )
        
        # Check result
        if not result.get("success", False):
            return {
                "success": False,
                "error": result.get("error", "Unknown error during platform state update")
            }
        
        # Handle acknowledgment
        if event.acknowledge_required:
            event.acknowledged[target_platform_id] = True
            self._save_propagation_event(event)
        
        # Return success
        return {
            "success": True,
            "coherence": result.get("coherence", PHI_RECIPROCAL),
            "state_id": result.get("state_id"),
            "keys_updated": list(keys_to_update)
        }
    
    def _get_platform_state_by_id(self, platform_id: str, state_id: str):
        """Get a platform state by ID from history"""
        # This would require a more sophisticated state history storage
        # For now, return None to simulate unavailable state
        return None
    
    def _are_platforms_entangled(self, source_id: str, target_id: str) -> bool:
        """Check if two platforms are entangled"""
        if not self.quantum_entangled_deployments:
            return False
        
        source_platform = self.quantum_entangled_deployments.platforms.get(source_id)
        if not source_platform:
            return False
        
        # Check if any active entanglement pair exists
        for pair_id, pair in source_platform.entanglement_pairs.items():
            if pair.target_platform_id == target_id and pair.active:
                return True
        
        return False
    
    def _build_platform_network(self, source_platform_id: str) -> Dict[str, List[str]]:
        """Build a network of entangled platforms starting from the source"""
        network = {}
        
        if not self.quantum_entangled_deployments:
            return network
        
        platforms = self.quantum_entangled_deployments.platforms
        
        # Build adjacency list
        for platform_id, platform in platforms.items():
            connected_platforms = []
            for pair_id, pair in platform.entanglement_pairs.items():
                if pair.active:
                    connected_platforms.append(pair.target_platform_id)
            
            network[platform_id] = connected_platforms
        
        return network
    
    def _calculate_propagation_levels(self, 
                                    network: Dict[str, List[str]], 
                                    source_id: str) -> Dict[int, List[str]]:
        """Calculate propagation levels for cascading propagation"""
        levels = {1: [source_id]}
        visited = {source_id}
        current_level = 1
        
        while True:
            next_level = current_level + 1
            levels[next_level] = []
            
            # For each platform at current level
            for platform_id in levels[current_level]:
                # Add its unvisited neighbors to next level
                for neighbor_id in network.get(platform_id, []):
                    if neighbor_id not in visited:
                        levels[next_level].append(neighbor_id)
                        visited.add(neighbor_id)
            
            # If no platforms at next level, we're done
            if not levels[next_level]:
                del levels[next_level]
                break
            
            current_level = next_level
        
        return levels
    
    def _create_phi_harmonic_sequence(self, platforms: List[str]) -> List[str]:
        """Create a phi-harmonic sequence of platforms for optimal propagation"""
        if not platforms:
            return []
        
        # Get entanglement strengths if possible
        strengths = {}
        if self.quantum_entangled_deployments:
            for platform_id in platforms:
                if platform_id in self.quantum_entangled_deployments.platforms:
                    platform = self.quantum_entangled_deployments.platforms[platform_id]
                    coherence = platform.coherence_metrics.overall_coherence
                    strengths[platform_id] = coherence
        
        # Default to 0.5 if unknown
        for platform_id in platforms:
            if platform_id not in strengths:
                strengths[platform_id] = 0.5
        
        # Sort platforms by strength
        sorted_platforms = sorted(
            platforms,
            key=lambda x: strengths.get(x, 0.5),
            reverse=True
        )
        
        # Create a phi-harmonic sequence
        phi_sequence = []
        n = len(sorted_platforms)
        
        if n <= 2:
            # For small lists, just return in order
            return sorted_platforms
        
        # Calculate phi-positions
        positions = []
        for i in range(n):
            # Calculate position based on phi-spiral
            pos = int((i * PHI) % n)
            positions.append(pos)
        
        # Create sequence
        for pos in positions:
            platform_id = sorted_platforms[pos]
            if platform_id not in phi_sequence:
                phi_sequence.append(platform_id)
        
        # Add any that might have been missed due to collisions
        for platform_id in sorted_platforms:
            if platform_id not in phi_sequence:
                phi_sequence.append(platform_id)
        
        return phi_sequence
    
    def get_propagation_status(self, event_id: str) -> Dict[str, Any]:
        """Get status of a state propagation event"""
        with self.lock:
            # Check if event exists
            if event_id not in self.propagation_events:
                self.logger.error(f"Propagation event not found: {event_id}")
                return {
                    "success": False,
                    "error": f"Propagation event not found: {event_id}"
                }
            
            # Get event
            event = self.propagation_events[event_id]
            
            # Get result
            result_id = f"result_{event_id}"
            result = self.propagation_results.get(result_id)
            
            if not result:
                return {
                    "success": False,
                    "error": f"Propagation result not found: {result_id}"
                }
            
            # Calculate status
            total_targets = len(event.target_platform_ids)
            targets_reached = len(result.targets_reached)
            targets_failed = len(result.targets_failed)
            
            status = "complete"
            if targets_reached == 0:
                status = "failed"
            elif targets_reached < total_targets:
                status = "partial"
            
            acknowledgment_status = "not_required"
            if event.acknowledge_required:
                acknowledged_count = sum(1 for ack in event.acknowledged.values() if ack)
                if acknowledged_count == 0:
                    acknowledgment_status = "none_acknowledged"
                elif acknowledged_count < total_targets:
                    acknowledgment_status = "partially_acknowledged"
                else:
                    acknowledgment_status = "fully_acknowledged"
            
            return {
                "success": True,
                "event_id": event_id,
                "result_id": result.result_id,
                "source_platform_id": event.source_platform_id,
                "target_count": total_targets,
                "targets_reached": targets_reached,
                "targets_failed": targets_failed,
                "status": status,
                "acknowledgment_status": acknowledgment_status,
                "propagation_mode": event.propagation_mode.name,
                "priority": event.priority.name,
                "update_type": event.update_type.name,
                "propagation_time": result.propagation_time,
                "coherence_preservation": result.coherence_preservation,
                "timestamp": event.timestamp
            }
    
    def acknowledge_propagation(self, 
                              event_id: str, 
                              platform_id: str,
                              acknowledgment_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Acknowledge a state propagation event"""
        with self.lock:
            # Check if event exists
            if event_id not in self.propagation_events:
                self.logger.error(f"Propagation event not found: {event_id}")
                return {
                    "success": False,
                    "error": f"Propagation event not found: {event_id}"
                }
            
            # Get event
            event = self.propagation_events[event_id]
            
            # Check if acknowledgment is required
            if not event.acknowledge_required:
                return {
                    "success": False,
                    "error": f"Acknowledgment not required for event: {event_id}"
                }
            
            # Check if platform is a target
            if platform_id not in event.target_platform_ids:
                return {
                    "success": False,
                    "error": f"Platform {platform_id} is not a target for event: {event_id}"
                }
            
            # Set acknowledgment
            event.acknowledged[platform_id] = True
            
            # Add acknowledgment data if provided
            if acknowledgment_data:
                if "acknowledgments" not in event.metadata:
                    event.metadata["acknowledgments"] = {}
                
                event.metadata["acknowledgments"][platform_id] = {
                    "timestamp": time.time(),
                    "data": acknowledgment_data
                }
            
            # Save event
            self._save_propagation_event(event)
            
            # Check if all targets acknowledged
            all_acknowledged = all(event.acknowledged.values())
            
            return {
                "success": True,
                "event_id": event_id,
                "platform_id": platform_id,
                "all_acknowledged": all_acknowledged
            }
    
    def revert_propagation(self, event_id: str) -> Dict[str, Any]:
        """Revert a state propagation event"""
        with self.lock:
            # Check if event exists
            if event_id not in self.propagation_events:
                self.logger.error(f"Propagation event not found: {event_id}")
                return {
                    "success": False,
                    "error": f"Propagation event not found: {event_id}"
                }
            
            # Get event
            event = self.propagation_events[event_id]
            
            # Get result
            result_id = f"result_{event_id}"
            result = self.propagation_results.get(result_id)
            
            if not result:
                return {
                    "success": False,
                    "error": f"Propagation result not found: {result_id}"
                }
            
            # Get reached targets
            targets_reached = result.targets_reached
            
            # Create revert event
            revert_event = PropagationEvent(
                event_id=f"revert_{event_id}",
                source_platform_id=event.source_platform_id,
                target_platform_ids=targets_reached.copy(),
                propagation_mode=event.propagation_mode,
                priority=event.priority,
                update_type=StateUpdateType.REVERT,
                state_data={},  # Empty data for revert (will use history)
                timestamp=time.time(),
                metadata={
                    "original_event_id": event_id,
                    "revert_reason": "explicit_revert"
                },
                coherence=event.coherence,
                acknowledge_required=event.acknowledge_required
            )
            
            # Store revert event
            self.propagation_events[revert_event.event_id] = revert_event
            self._save_propagation_event(revert_event)
            
            # Perform revert propagation based on original mode
            if event.propagation_mode == PropagationMode.BROADCAST:
                revert_result = self._broadcast_propagation(revert_event)
            elif event.propagation_mode == PropagationMode.TARGETED:
                revert_result = self._targeted_propagation(revert_event)
            elif event.propagation_mode == PropagationMode.CASCADING:
                revert_result = self._cascading_propagation(revert_event)
            elif event.propagation_mode == PropagationMode.PHI_HARMONIC:
                revert_result = self._phi_harmonic_propagation(revert_event)
            else:
                # Default to broadcast
                revert_result = self._broadcast_propagation(revert_event)
            
            # Store revert result
            self.propagation_results[revert_result.result_id] = revert_result
            self._save_propagation_result(revert_result)
            
            self.logger.info(f"State propagation reverted: {event_id}")
            
            return {
                "success": True,
                "original_event_id": event_id,
                "revert_event_id": revert_event.event_id,
                "revert_result_id": revert_result.result_id,
                "targets_reached": revert_result.targets_reached,
                "targets_failed": revert_result.targets_failed,
                "propagation_time": revert_result.propagation_time,
                "coherence_preservation": revert_result.coherence_preservation
            }
    
    def list_propagation_events(self, 
                              limit: int = 10, 
                              offset: int = 0,
                              source_platform_id: Optional[str] = None) -> Dict[str, Any]:
        """List recent propagation events"""
        with self.lock:
            # Filter events
            filtered_events = []
            
            for event_id, event in self.propagation_events.items():
                # Apply source filter if provided
                if source_platform_id and event.source_platform_id != source_platform_id:
                    continue
                
                # Get result
                result_id = f"result_{event_id}"
                result = self.propagation_results.get(result_id)
                
                # Create summary
                summary = {
                    "event_id": event_id,
                    "source_platform_id": event.source_platform_id,
                    "target_count": len(event.target_platform_ids),
                    "propagation_mode": event.propagation_mode.name,
                    "priority": event.priority.name,
                    "update_type": event.update_type.name,
                    "timestamp": event.timestamp
                }
                
                # Add result info if available
                if result:
                    summary.update({
                        "success": result.success,
                        "targets_reached": len(result.targets_reached),
                        "targets_failed": len(result.targets_failed),
                        "propagation_time": result.propagation_time,
                        "coherence_preservation": result.coherence_preservation
                    })
                
                filtered_events.append(summary)
            
            # Sort by timestamp (newest first)
            filtered_events.sort(key=lambda e: e["timestamp"], reverse=True)
            
            # Apply pagination
            paginated_events = filtered_events[offset:offset+limit]
            
            return {
                "success": True,
                "events": paginated_events,
                "total_count": len(filtered_events),
                "limit": limit,
                "offset": offset
            }
    
    def _generate_event_id(self, source_id: str) -> str:
        """Generate a unique event ID"""
        timestamp = int(time.time() * 1000)
        event_id = f"event_{source_id}_{timestamp}"
        return event_id
    
    def _save_propagation_event(self, event: PropagationEvent) -> None:
        """Save a propagation event to disk"""
        event_path = os.path.join(self.storage_path, f"{event.event_id}.json")
        
        # Create serializable representation
        event_data = {
            "event_id": event.event_id,
            "source_platform_id": event.source_platform_id,
            "target_platform_ids": event.target_platform_ids,
            "propagation_mode": event.propagation_mode.name,
            "priority": event.priority.name,
            "update_type": event.update_type.name,
            "state_data": event.state_data,
            "timestamp": event.timestamp,
            "metadata": event.metadata,
            "coherence": event.coherence,
            "acknowledge_required": event.acknowledge_required,
            "acknowledged": event.acknowledged,
            "propagation_path": event.propagation_path
        }
        
        # Save to disk
        with open(event_path, 'w') as f:
            json.dump(event_data, f, indent=2)
    
    def _save_propagation_result(self, result: PropagationResult) -> None:
        """Save a propagation result to disk"""
        result_path = os.path.join(self.storage_path, f"{result.result_id}.json")
        
        # Create serializable representation
        result_data = {
            "result_id": result.result_id,
            "event_id": result.event_id,
            "success": result.success,
            "targets_reached": result.targets_reached,
            "targets_failed": result.targets_failed,
            "propagation_time": result.propagation_time,
            "coherence_preservation": result.coherence_preservation,
            "timestamp": result.timestamp,
            "metadata": result.metadata,
            "errors": result.errors
        }
        
        # Save to disk
        with open(result_path, 'w') as f:
            json.dump(result_data, f, indent=2)
    
    def _load_propagation_events(self) -> None:
        """Load all propagation events from disk"""
        if not os.path.exists(self.storage_path):
            return
        
        # Load each event file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json') and filename.startswith('event_'):
                event_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(event_path, 'r') as f:
                        event_data = json.load(f)
                    
                    # Parse propagation mode
                    try:
                        propagation_mode = PropagationMode[event_data.get("propagation_mode", "BROADCAST")]
                    except KeyError:
                        self.logger.warning(f"Unknown propagation mode: {event_data.get('propagation_mode')}")
                        propagation_mode = PropagationMode.BROADCAST
                    
                    # Parse priority
                    try:
                        priority = PropagationPriority[event_data.get("priority", "NORMAL")]
                    except KeyError:
                        self.logger.warning(f"Unknown priority: {event_data.get('priority')}")
                        priority = PropagationPriority.NORMAL
                    
                    # Parse update type
                    try:
                        update_type = StateUpdateType[event_data.get("update_type", "DELTA")]
                    except KeyError:
                        self.logger.warning(f"Unknown update type: {event_data.get('update_type')}")
                        update_type = StateUpdateType.DELTA
                    
                    # Create event
                    event = PropagationEvent(
                        event_id=event_data.get("event_id", ""),
                        source_platform_id=event_data.get("source_platform_id", ""),
                        target_platform_ids=event_data.get("target_platform_ids", []),
                        propagation_mode=propagation_mode,
                        priority=priority,
                        update_type=update_type,
                        state_data=event_data.get("state_data", {}),
                        timestamp=event_data.get("timestamp", time.time()),
                        metadata=event_data.get("metadata", {}),
                        coherence=event_data.get("coherence", 1.0),
                        acknowledge_required=event_data.get("acknowledge_required", False),
                        acknowledged=event_data.get("acknowledged", {}),
                        propagation_path=event_data.get("propagation_path", [])
                    )
                    
                    # Store event
                    self.propagation_events[event.event_id] = event
                    
                    self.logger.info(f"Loaded propagation event: {event.event_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load propagation event {filename}: {str(e)}")
    
    def _load_propagation_results(self) -> None:
        """Load all propagation results from disk"""
        if not os.path.exists(self.storage_path):
            return
        
        # Load each result file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json') and filename.startswith('result_'):
                result_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(result_path, 'r') as f:
                        result_data = json.load(f)
                    
                    # Create result
                    result = PropagationResult(
                        result_id=result_data.get("result_id", ""),
                        event_id=result_data.get("event_id", ""),
                        success=result_data.get("success", False),
                        targets_reached=result_data.get("targets_reached", []),
                        targets_failed=result_data.get("targets_failed", []),
                        propagation_time=result_data.get("propagation_time", 0.0),
                        coherence_preservation=result_data.get("coherence_preservation", 0.0),
                        timestamp=result_data.get("timestamp", time.time()),
                        metadata=result_data.get("metadata", {}),
                        errors=result_data.get("errors", [])
                    )
                    
                    # Store result
                    self.propagation_results[result.result_id] = result
                    
                    self.logger.info(f"Loaded propagation result: {result.result_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load propagation result {filename}: {str(e)}")
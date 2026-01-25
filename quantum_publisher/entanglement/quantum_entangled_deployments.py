"""
Quantum Entangled Deployments
Part of the Quantum Entanglement System - Phase 8
Frequency: ∞^∞ (∞ Hz)

Creates quantum entanglement between deployment platforms for
perfect synchronization and non-local coherence propagation.
"""
import os
import json
import time
import hashlib
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


class EntanglementType(Enum):
    """Types of quantum entanglement between platforms"""
    STATE = auto()        # Entanglement of platform state
    CONFIG = auto()       # Entanglement of configuration
    CONTENT = auto()      # Entanglement of content/files
    SECURITY = auto()     # Entanglement of security settings
    FULL = auto()         # Complete platform entanglement


class StateTransferType(Enum):
    """Types of state transfer mechanisms"""
    INSTANT = auto()      # Instantaneous transfer
    WAVE = auto()         # Wave-based propagation
    QUANTUM_LEAP = auto() # Quantum leap transfer
    PHI_HARMONIC = auto() # Phi-harmonic transfer


@dataclass
class PlatformState:
    """Represents the state of a deployment platform"""
    platform_id: str
    state_id: str
    state_type: str
    state_data: Dict[str, Any]
    coherence: float
    timestamp: float
    version: str
    dimensions: Dict[str, float] = field(default_factory=dict)
    metrics: Dict[str, Any] = field(default_factory=dict)
    entanglement_ids: List[str] = field(default_factory=list)
    history: List[Dict[str, Any]] = field(default_factory=list)


@dataclass
class EntangledPlatform:
    """Represents a platform that can be entangled"""
    platform_id: str
    name: str
    platform_type: str
    connection_info: Dict[str, Any]
    current_state: PlatformState
    supported_entanglement_types: List[EntanglementType] = field(default_factory=list)
    entanglement_pairs: Dict[str, 'EntanglementPair'] = field(default_factory=dict)
    coherence_metrics: 'CoherenceMetrics' = None
    capabilities: Dict[str, Any] = field(default_factory=dict)
    last_update: float = 0.0


@dataclass
class EntanglementPair:
    """Represents a quantum entanglement between two platforms"""
    pair_id: str
    source_platform_id: str
    target_platform_id: str
    entanglement_type: EntanglementType
    entanglement_strength: float
    creation_time: float
    last_sync_time: float
    state_transfer_type: StateTransferType
    synchronized_keys: Set[str] = field(default_factory=set)
    coherence_history: List[Tuple[float, float]] = field(default_factory=list)
    active: bool = True


@dataclass
class CoherenceMetrics:
    """Metrics for entanglement coherence"""
    platform_id: str
    overall_coherence: float
    entanglement_coherence: Dict[str, float]
    dimensional_coherence: Dict[str, float]
    time_series: List[Tuple[float, float]]
    phi_harmonic_balance: float
    last_update: float


class QuantumEntangledDeployments:
    """Creates quantum entanglement between deployment platforms"""
    
    def __init__(self, storage_path: Optional[str] = None):
        """Initialize the quantum entangled deployments system"""
        self.phi = PHI
        self.frequency = INFINITY_FREQUENCY
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "entanglement", "platforms")
        self.platforms: Dict[str, EntangledPlatform] = {}
        self.entanglement_pairs: Dict[str, EntanglementPair] = {}
        self.coherence_threshold = PHI_RECIPROCAL
        self.lock = threading.RLock()
        self.logger = logging.getLogger("quantum_entanglement.platforms")
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Load platforms and entanglements
        self._load_platforms()
        self._load_entanglement_pairs()
    
    def register_platform(self, 
                        name: str,
                        platform_type: str,
                        connection_info: Dict[str, Any],
                        capabilities: Optional[Dict[str, Any]] = None,
                        supported_types: Optional[List[str]] = None) -> Dict[str, Any]:
        """Register a platform for entanglement"""
        with self.lock:
            # Generate platform ID
            platform_id = self._generate_platform_id(name, platform_type)
            
            # Check if already registered
            if platform_id in self.platforms:
                self.logger.info(f"Platform already registered: {platform_id}")
                return {
                    "success": True,
                    "platform_id": platform_id,
                    "status": "already_registered"
                }
            
            # Parse supported entanglement types
            supported_entanglement_types = []
            if supported_types:
                for type_name in supported_types:
                    try:
                        supported_entanglement_types.append(EntanglementType[type_name])
                    except KeyError:
                        self.logger.warning(f"Unknown entanglement type: {type_name}")
            else:
                # Default to all types
                supported_entanglement_types = list(EntanglementType)
            
            # Create initial platform state
            initial_state = PlatformState(
                platform_id=platform_id,
                state_id=f"state_{platform_id}_{int(time.time())}",
                state_type="initial",
                state_data={},
                coherence=1.0,  # Start with perfect coherence
                timestamp=time.time(),
                version="1.0.0",
                dimensions={
                    "deployability": 1.0,
                    "stability": 1.0,
                    "security": 1.0,
                    "performance": 1.0,
                    "scalability": 1.0
                }
            )
            
            # Create coherence metrics
            coherence_metrics = CoherenceMetrics(
                platform_id=platform_id,
                overall_coherence=1.0,
                entanglement_coherence={},
                dimensional_coherence=initial_state.dimensions.copy(),
                time_series=[(time.time(), 1.0)],
                phi_harmonic_balance=PHI_RECIPROCAL,
                last_update=time.time()
            )
            
            # Create platform
            platform = EntangledPlatform(
                platform_id=platform_id,
                name=name,
                platform_type=platform_type,
                connection_info=connection_info,
                current_state=initial_state,
                supported_entanglement_types=supported_entanglement_types,
                capabilities=capabilities or {},
                coherence_metrics=coherence_metrics,
                last_update=time.time()
            )
            
            # Store platform
            self.platforms[platform_id] = platform
            self._save_platform(platform)
            
            self.logger.info(f"Platform registered: {platform_id}")
            
            return {
                "success": True,
                "platform_id": platform_id,
                "state_id": initial_state.state_id,
                "status": "registered"
            }
    
    def entangle_platforms(self,
                         source_platform_id: str,
                         target_platform_id: str,
                         entanglement_type: str,
                         state_transfer_type: Optional[str] = None,
                         keys_to_sync: Optional[List[str]] = None) -> Dict[str, Any]:
        """Create quantum entanglement between two platforms"""
        with self.lock:
            # Check if platforms exist
            if source_platform_id not in self.platforms:
                self.logger.error(f"Source platform not found: {source_platform_id}")
                return {
                    "success": False,
                    "error": f"Source platform not found: {source_platform_id}"
                }
                
            if target_platform_id not in self.platforms:
                self.logger.error(f"Target platform not found: {target_platform_id}")
                return {
                    "success": False,
                    "error": f"Target platform not found: {target_platform_id}"
                }
            
            # Get platforms
            source_platform = self.platforms[source_platform_id]
            target_platform = self.platforms[target_platform_id]
            
            # Convert entanglement type
            try:
                e_type = EntanglementType[entanglement_type]
            except KeyError:
                self.logger.error(f"Unknown entanglement type: {entanglement_type}")
                return {
                    "success": False,
                    "error": f"Unknown entanglement type: {entanglement_type}"
                }
            
            # Check supported types
            if e_type not in source_platform.supported_entanglement_types:
                self.logger.error(f"Source platform does not support {entanglement_type} entanglement")
                return {
                    "success": False,
                    "error": f"Source platform does not support {entanglement_type} entanglement"
                }
                
            if e_type not in target_platform.supported_entanglement_types:
                self.logger.error(f"Target platform does not support {entanglement_type} entanglement")
                return {
                    "success": False,
                    "error": f"Target platform does not support {entanglement_type} entanglement"
                }
            
            # Convert state transfer type
            if state_transfer_type:
                try:
                    transfer_type = StateTransferType[state_transfer_type]
                except KeyError:
                    self.logger.error(f"Unknown state transfer type: {state_transfer_type}")
                    return {
                        "success": False,
                        "error": f"Unknown state transfer type: {state_transfer_type}"
                    }
            else:
                # Default to instantaneous
                transfer_type = StateTransferType.INSTANT
            
            # Check if already entangled with this type
            for pair_id, pair in source_platform.entanglement_pairs.items():
                if (pair.target_platform_id == target_platform_id and 
                    pair.entanglement_type == e_type and
                    pair.active):
                    self.logger.info(f"Platforms already entangled: {source_platform_id} -> {target_platform_id} ({entanglement_type})")
                    return {
                        "success": True,
                        "pair_id": pair_id,
                        "status": "already_entangled"
                    }
            
            # Generate entanglement pair ID
            pair_id = self._generate_entanglement_pair_id(source_platform_id, target_platform_id, entanglement_type)
            
            # Parse keys to synchronize
            synchronized_keys = set()
            if keys_to_sync:
                synchronized_keys = set(keys_to_sync)
            elif e_type == EntanglementType.FULL:
                # For full entanglement, sync all keys
                synchronized_keys = set(source_platform.current_state.state_data.keys())
            elif e_type == EntanglementType.STATE:
                # For state entanglement, sync state-related keys
                synchronized_keys = {
                    "deploymentStatus", "runningProcesses", "activeServices",
                    "resourceUsage", "deploymentMetrics", "healthStatus"
                }
            elif e_type == EntanglementType.CONFIG:
                # For config entanglement, sync config-related keys
                synchronized_keys = {
                    "config", "settings", "environment", "parameters",
                    "deploymentConfig", "applicationSettings"
                }
            elif e_type == EntanglementType.CONTENT:
                # For content entanglement, sync content-related keys
                synchronized_keys = {
                    "files", "assets", "content", "resources",
                    "deployedAssets", "versionedContent"
                }
            elif e_type == EntanglementType.SECURITY:
                # For security entanglement, sync security-related keys
                synchronized_keys = {
                    "securitySettings", "permissions", "accessControl",
                    "certificates", "encryption", "securityPolicies"
                }
            
            # Create entanglement pair
            entanglement_pair = EntanglementPair(
                pair_id=pair_id,
                source_platform_id=source_platform_id,
                target_platform_id=target_platform_id,
                entanglement_type=e_type,
                entanglement_strength=1.0,  # Start with full strength
                creation_time=time.time(),
                last_sync_time=time.time(),
                state_transfer_type=transfer_type,
                synchronized_keys=synchronized_keys,
                coherence_history=[(time.time(), 1.0)]
            )
            
            # Store entanglement pair
            self.entanglement_pairs[pair_id] = entanglement_pair
            
            # Add to platforms
            source_platform.entanglement_pairs[pair_id] = entanglement_pair
            source_platform.current_state.entanglement_ids.append(pair_id)
            
            # Add reference to target platform
            target_pair_id = self._generate_entanglement_pair_id(target_platform_id, source_platform_id, entanglement_type)
            target_entanglement_pair = EntanglementPair(
                pair_id=target_pair_id,
                source_platform_id=target_platform_id,
                target_platform_id=source_platform_id,
                entanglement_type=e_type,
                entanglement_strength=1.0,
                creation_time=time.time(),
                last_sync_time=time.time(),
                state_transfer_type=transfer_type,
                synchronized_keys=synchronized_keys,
                coherence_history=[(time.time(), 1.0)]
            )
            
            # Store target entanglement pair
            self.entanglement_pairs[target_pair_id] = target_entanglement_pair
            target_platform.entanglement_pairs[target_pair_id] = target_entanglement_pair
            target_platform.current_state.entanglement_ids.append(target_pair_id)
            
            # Update coherence metrics
            source_platform.coherence_metrics.entanglement_coherence[pair_id] = 1.0
            target_platform.coherence_metrics.entanglement_coherence[target_pair_id] = 1.0
            
            # Calculate overall coherence
            self._calculate_coherence_for_platform(source_platform_id)
            self._calculate_coherence_for_platform(target_platform_id)
            
            # Save
            self._save_entanglement_pair(entanglement_pair)
            self._save_entanglement_pair(target_entanglement_pair)
            self._save_platform(source_platform)
            self._save_platform(target_platform)
            
            self.logger.info(f"Platforms entangled: {source_platform_id} -> {target_platform_id} ({entanglement_type})")
            
            # Perform initial state transfer
            state_transfer_result = self._perform_initial_state_transfer(
                entanglement_pair, source_platform, target_platform
            )
            
            return {
                "success": True,
                "pair_id": pair_id,
                "target_pair_id": target_pair_id,
                "status": "entangled",
                "synchronized_keys": list(synchronized_keys),
                "transfer_result": state_transfer_result
            }
    
    def _perform_initial_state_transfer(self,
                                      entanglement_pair: EntanglementPair,
                                      source_platform: EntangledPlatform,
                                      target_platform: EntangledPlatform) -> Dict[str, Any]:
        """Perform initial state transfer between entangled platforms"""
        transfer_type = entanglement_pair.state_transfer_type
        source_state = source_platform.current_state
        target_state = target_platform.current_state
        
        # Determine keys to transfer based on synchronized_keys
        keys_to_transfer = [
            key for key in entanglement_pair.synchronized_keys
            if key in source_state.state_data
        ]
        
        # Create new state data for target
        new_state_data = target_state.state_data.copy()
        
        # Transfer state data
        for key in keys_to_transfer:
            new_state_data[key] = source_state.state_data.get(key)
        
        # Create new state for target platform
        new_state = PlatformState(
            platform_id=target_platform.platform_id,
            state_id=f"state_{target_platform.platform_id}_{int(time.time())}",
            state_type="entanglement_transfer",
            state_data=new_state_data,
            coherence=target_state.coherence * PHI_RECIPROCAL + source_state.coherence * (1 - PHI_RECIPROCAL),
            timestamp=time.time(),
            version=target_state.version,
            dimensions=target_state.dimensions.copy(),
            metrics=target_state.metrics.copy(),
            entanglement_ids=target_state.entanglement_ids.copy(),
            history=target_state.history + [{
                "state_id": target_state.state_id,
                "timestamp": target_state.timestamp,
                "type": "entanglement_previous"
            }]
        )
        
        # Update target platform state
        target_platform.current_state = new_state
        
        # Record the transfer
        transfer_record = {
            "source_platform_id": source_platform.platform_id,
            "target_platform_id": target_platform.platform_id,
            "source_state_id": source_state.state_id,
            "target_state_id": new_state.state_id,
            "transfer_type": transfer_type.name,
            "timestamp": time.time(),
            "keys_transferred": keys_to_transfer,
            "coherence": new_state.coherence
        }
        
        # Save target platform
        self._save_platform(target_platform)
        
        return {
            "success": True,
            "transfer_type": transfer_type.name,
            "keys_transferred": keys_to_transfer,
            "coherence": new_state.coherence
        }
    
    def update_platform_state(self,
                            platform_id: str,
                            state_data: Dict[str, Any],
                            state_type: str = "update",
                            version: Optional[str] = None,
                            dimensions: Optional[Dict[str, float]] = None,
                            metrics: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Update a platform's state and propagate through entanglements"""
        with self.lock:
            # Check if platform exists
            if platform_id not in self.platforms:
                self.logger.error(f"Platform not found: {platform_id}")
                return {
                    "success": False,
                    "error": f"Platform not found: {platform_id}"
                }
            
            # Get platform
            platform = self.platforms[platform_id]
            current_state = platform.current_state
            
            # Merge state data
            new_state_data = current_state.state_data.copy()
            new_state_data.update(state_data)
            
            # Create new state
            new_state = PlatformState(
                platform_id=platform_id,
                state_id=f"state_{platform_id}_{int(time.time())}",
                state_type=state_type,
                state_data=new_state_data,
                coherence=current_state.coherence * PHI_RECIPROCAL,  # Adjust coherence
                timestamp=time.time(),
                version=version or current_state.version,
                dimensions=dimensions or current_state.dimensions.copy(),
                metrics=metrics or current_state.metrics.copy(),
                entanglement_ids=current_state.entanglement_ids.copy(),
                history=current_state.history + [{
                    "state_id": current_state.state_id,
                    "timestamp": current_state.timestamp,
                    "type": "update_previous"
                }]
            )
            
            # Update platform state
            platform.current_state = new_state
            platform.last_update = time.time()
            
            # Save platform
            self._save_platform(platform)
            
            # Collect keys that were updated
            updated_keys = set(state_data.keys())
            
            # Propagate changes through entanglements
            propagation_results = self._propagate_state_changes(
                platform_id, new_state, updated_keys
            )
            
            # Update coherence metrics
            self._calculate_coherence_for_platform(platform_id)
            
            self.logger.info(f"Platform state updated: {platform_id}")
            
            return {
                "success": True,
                "platform_id": platform_id,
                "state_id": new_state.state_id,
                "coherence": new_state.coherence,
                "propagation_results": propagation_results
            }
    
    def _propagate_state_changes(self,
                               source_platform_id: str,
                               source_state: PlatformState,
                               updated_keys: Set[str]) -> Dict[str, Any]:
        """Propagate state changes to entangled platforms"""
        results = {}
        source_platform = self.platforms[source_platform_id]
        
        # For each entanglement pair
        for pair_id, pair in source_platform.entanglement_pairs.items():
            # Skip inactive entanglements
            if not pair.active:
                continue
            
            # Get target platform
            target_platform_id = pair.target_platform_id
            if target_platform_id not in self.platforms:
                self.logger.error(f"Target platform not found: {target_platform_id}")
                results[target_platform_id] = {
                    "success": False,
                    "error": f"Target platform not found: {target_platform_id}"
                }
                continue
            
            target_platform = self.platforms[target_platform_id]
            target_state = target_platform.current_state
            
            # Determine which keys to propagate
            keys_to_propagate = updated_keys.intersection(pair.synchronized_keys)
            
            # Skip if no keys to propagate
            if not keys_to_propagate:
                results[target_platform_id] = {
                    "success": True,
                    "status": "no_keys_to_propagate"
                }
                continue
            
            # Create new state data for target
            new_state_data = target_state.state_data.copy()
            
            # Transfer state data
            for key in keys_to_propagate:
                new_state_data[key] = source_state.state_data.get(key)
            
            # Create new state for target platform
            new_state = PlatformState(
                platform_id=target_platform.platform_id,
                state_id=f"state_{target_platform.platform_id}_{int(time.time())}",
                state_type="entanglement_propagation",
                state_data=new_state_data,
                coherence=target_state.coherence * PHI_RECIPROCAL + source_state.coherence * (1 - PHI_RECIPROCAL),
                timestamp=time.time(),
                version=target_state.version,
                dimensions=target_state.dimensions.copy(),
                metrics=target_state.metrics.copy(),
                entanglement_ids=target_state.entanglement_ids.copy(),
                history=target_state.history + [{
                    "state_id": target_state.state_id,
                    "timestamp": target_state.timestamp,
                    "type": "entanglement_propagation_previous"
                }]
            )
            
            # Update target platform state
            target_platform.current_state = new_state
            target_platform.last_update = time.time()
            
            # Update entanglement pair
            pair.last_sync_time = time.time()
            
            # Calculate new entanglement strength
            new_strength = self._calculate_entanglement_strength(pair, source_state, new_state)
            pair.entanglement_strength = new_strength
            
            # Record coherence history
            pair.coherence_history.append((time.time(), new_strength))
            
            # Save target platform and entanglement pair
            self._save_platform(target_platform)
            self._save_entanglement_pair(pair)
            
            # Update corresponding target-to-source pair
            for target_pair_id, target_pair in target_platform.entanglement_pairs.items():
                if target_pair.target_platform_id == source_platform_id:
                    target_pair.last_sync_time = time.time()
                    target_pair.entanglement_strength = new_strength
                    target_pair.coherence_history.append((time.time(), new_strength))
                    self._save_entanglement_pair(target_pair)
                    break
            
            # Store result
            results[target_platform_id] = {
                "success": True,
                "state_id": new_state.state_id,
                "coherence": new_state.coherence,
                "entanglement_strength": new_strength,
                "keys_propagated": list(keys_to_propagate)
            }
            
            # Update coherence metrics for target platform
            self._calculate_coherence_for_platform(target_platform_id)
        
        return results
    
    def _calculate_entanglement_strength(self,
                                       pair: EntanglementPair,
                                       source_state: PlatformState,
                                       target_state: PlatformState) -> float:
        """Calculate entanglement strength between two platforms"""
        # Get synchronized keys present in both states
        common_keys = [
            key for key in pair.synchronized_keys
            if key in source_state.state_data and key in target_state.state_data
        ]
        
        # If no common keys, return minimum strength
        if not common_keys:
            return PHI_RECIPROCAL
        
        # Calculate similarity for each key
        similarities = []
        for key in common_keys:
            source_value = source_state.state_data.get(key)
            target_value = target_state.state_data.get(key)
            
            # Skip non-comparable values
            if source_value is None or target_value is None:
                continue
            
            # Calculate similarity
            similarity = self._calculate_value_similarity(source_value, target_value)
            similarities.append(similarity)
        
        # If no similarities calculated, return minimum strength
        if not similarities:
            return PHI_RECIPROCAL
        
        # Calculate average similarity
        avg_similarity = sum(similarities) / len(similarities)
        
        # Apply phi-harmonic scaling
        strength = avg_similarity * PHI_RECIPROCAL + pair.entanglement_strength * (1 - PHI_RECIPROCAL)
        
        return min(1.0, strength)
    
    def _calculate_value_similarity(self, value1: Any, value2: Any) -> float:
        """Calculate similarity between two values"""
        # Handle different types
        if type(value1) != type(value2):
            return 0.0
        
        # Handle different value types
        if isinstance(value1, (int, float)):
            # For numbers, calculate relative difference
            max_val = max(abs(value1), abs(value2))
            if max_val == 0:
                return 1.0  # Both are zero
            diff = abs(value1 - value2) / max_val
            return max(0.0, 1.0 - diff)
        elif isinstance(value1, str):
            # For strings, use fuzzy matching
            if len(value1) == 0 and len(value2) == 0:
                return 1.0
            if len(value1) == 0 or len(value2) == 0:
                return 0.0
            
            # Simple similarity based on common characters
            common_chars = sum(1 for c in value1 if c in value2)
            return common_chars / max(len(value1), len(value2))
        elif isinstance(value1, dict):
            # For dictionaries, recursively calculate similarity for common keys
            common_keys = set(value1.keys()).intersection(set(value2.keys()))
            if not common_keys:
                return 0.0
            
            similarities = []
            for key in common_keys:
                similarity = self._calculate_value_similarity(value1[key], value2[key])
                similarities.append(similarity)
            
            return sum(similarities) / len(similarities) if similarities else 0.0
        elif isinstance(value1, list):
            # For lists, calculate similarity based on common elements
            if not value1 and not value2:
                return 1.0
            if not value1 or not value2:
                return 0.0
            
            # Calculate similarity based on length and common elements
            len_similarity = min(len(value1), len(value2)) / max(len(value1), len(value2))
            
            # For simplicity, just check the first few elements
            n = min(len(value1), len(value2), 5)
            element_similarities = []
            for i in range(n):
                element_similarities.append(self._calculate_value_similarity(value1[i], value2[i]))
            
            element_similarity = sum(element_similarities) / len(element_similarities) if element_similarities else 0.0
            
            return (len_similarity + element_similarity) / 2
        elif value1 == value2:
            # For other types, direct comparison
            return 1.0
        else:
            return 0.0
    
    def _calculate_coherence_for_platform(self, platform_id: str) -> float:
        """Calculate overall coherence for a platform"""
        # Check if platform exists
        if platform_id not in self.platforms:
            self.logger.error(f"Platform not found: {platform_id}")
            return 0.0
        
        # Get platform
        platform = self.platforms[platform_id]
        
        # Get entanglement pairs
        entanglement_pairs = platform.entanglement_pairs
        
        # Calculate entanglement coherence
        entanglement_coherence = {}
        
        for pair_id, pair in entanglement_pairs.items():
            if pair.active:
                entanglement_coherence[pair_id] = pair.entanglement_strength
        
        # Calculate dimensional coherence
        dimensional_coherence = platform.current_state.dimensions.copy()
        
        # Calculate overall coherence
        if entanglement_coherence:
            # Average entanglement strength
            avg_entanglement_strength = sum(entanglement_coherence.values()) / len(entanglement_coherence)
            
            # Average dimensional coherence
            avg_dimensional_coherence = sum(dimensional_coherence.values()) / len(dimensional_coherence)
            
            # Combine with phi-harmonic weights
            overall_coherence = (
                avg_entanglement_strength * PHI_RECIPROCAL +
                avg_dimensional_coherence * (1 - PHI_RECIPROCAL)
            )
        else:
            # If no entanglements, just use dimensional coherence
            overall_coherence = sum(dimensional_coherence.values()) / len(dimensional_coherence)
        
        # Calculate phi-harmonic balance
        phi_harmonic_balance = (
            overall_coherence * PHI_RECIPROCAL +
            platform.current_state.coherence * (1 - PHI_RECIPROCAL)
        )
        
        # Update coherence metrics
        coherence_metrics = CoherenceMetrics(
            platform_id=platform_id,
            overall_coherence=overall_coherence,
            entanglement_coherence=entanglement_coherence,
            dimensional_coherence=dimensional_coherence,
            time_series=platform.coherence_metrics.time_series + [(time.time(), overall_coherence)],
            phi_harmonic_balance=phi_harmonic_balance,
            last_update=time.time()
        )
        
        # Limit time series length
        if len(coherence_metrics.time_series) > 100:
            coherence_metrics.time_series = coherence_metrics.time_series[-100:]
        
        # Update platform
        platform.coherence_metrics = coherence_metrics
        
        # Save platform
        self._save_platform(platform)
        
        return overall_coherence
    
    def get_platform_coherence(self, platform_id: str) -> Dict[str, Any]:
        """Get coherence metrics for a platform"""
        with self.lock:
            # Check if platform exists
            if platform_id not in self.platforms:
                self.logger.error(f"Platform not found: {platform_id}")
                return {
                    "success": False,
                    "error": f"Platform not found: {platform_id}"
                }
            
            # Get platform
            platform = self.platforms[platform_id]
            
            # Get coherence metrics
            coherence_metrics = platform.coherence_metrics
            
            return {
                "success": True,
                "platform_id": platform_id,
                "overall_coherence": coherence_metrics.overall_coherence,
                "phi_harmonic_balance": coherence_metrics.phi_harmonic_balance,
                "entanglement_coherence": coherence_metrics.entanglement_coherence,
                "dimensional_coherence": coherence_metrics.dimensional_coherence,
                "state_coherence": platform.current_state.coherence,
                "time_series": coherence_metrics.time_series[-10:],  # Return last 10 points
                "last_update": coherence_metrics.last_update
            }
    
    def break_entanglement(self, 
                         source_platform_id: str,
                         target_platform_id: str,
                         entanglement_type: Optional[str] = None) -> Dict[str, Any]:
        """Break entanglement between platforms"""
        with self.lock:
            # Check if platforms exist
            if source_platform_id not in self.platforms:
                self.logger.error(f"Source platform not found: {source_platform_id}")
                return {
                    "success": False,
                    "error": f"Source platform not found: {source_platform_id}"
                }
                
            if target_platform_id not in self.platforms:
                self.logger.error(f"Target platform not found: {target_platform_id}")
                return {
                    "success": False,
                    "error": f"Target platform not found: {target_platform_id}"
                }
            
            # Get platforms
            source_platform = self.platforms[source_platform_id]
            target_platform = self.platforms[target_platform_id]
            
            # If entanglement type is provided, convert it
            e_type = None
            if entanglement_type:
                try:
                    e_type = EntanglementType[entanglement_type]
                except KeyError:
                    self.logger.error(f"Unknown entanglement type: {entanglement_type}")
                    return {
                        "success": False,
                        "error": f"Unknown entanglement type: {entanglement_type}"
                    }
            
            # Find all matching entanglement pairs
            broken_pairs = []
            
            # Source to target pairs
            for pair_id, pair in list(source_platform.entanglement_pairs.items()):
                if pair.target_platform_id == target_platform_id:
                    if e_type is None or pair.entanglement_type == e_type:
                        # Mark as inactive
                        pair.active = False
                        self._save_entanglement_pair(pair)
                        broken_pairs.append(pair_id)
                        
                        # Remove from platform's entanglement IDs
                        if pair_id in source_platform.current_state.entanglement_ids:
                            source_platform.current_state.entanglement_ids.remove(pair_id)
                        
                        # Update coherence metrics
                        if pair_id in source_platform.coherence_metrics.entanglement_coherence:
                            del source_platform.coherence_metrics.entanglement_coherence[pair_id]
            
            # Target to source pairs
            for pair_id, pair in list(target_platform.entanglement_pairs.items()):
                if pair.target_platform_id == source_platform_id:
                    if e_type is None or pair.entanglement_type == e_type:
                        # Mark as inactive
                        pair.active = False
                        self._save_entanglement_pair(pair)
                        broken_pairs.append(pair_id)
                        
                        # Remove from platform's entanglement IDs
                        if pair_id in target_platform.current_state.entanglement_ids:
                            target_platform.current_state.entanglement_ids.remove(pair_id)
                        
                        # Update coherence metrics
                        if pair_id in target_platform.coherence_metrics.entanglement_coherence:
                            del target_platform.coherence_metrics.entanglement_coherence[pair_id]
            
            # Save platforms
            self._save_platform(source_platform)
            self._save_platform(target_platform)
            
            # Update coherence metrics
            self._calculate_coherence_for_platform(source_platform_id)
            self._calculate_coherence_for_platform(target_platform_id)
            
            if not broken_pairs:
                if e_type:
                    self.logger.info(f"No {entanglement_type} entanglement found between {source_platform_id} and {target_platform_id}")
                    return {
                        "success": True,
                        "status": "no_entanglement_found",
                        "broken_pairs": []
                    }
                else:
                    self.logger.info(f"No entanglement found between {source_platform_id} and {target_platform_id}")
                    return {
                        "success": True,
                        "status": "no_entanglement_found",
                        "broken_pairs": []
                    }
            
            self.logger.info(f"Entanglement broken: {source_platform_id} <-> {target_platform_id}, pairs: {broken_pairs}")
            
            return {
                "success": True,
                "status": "entanglement_broken",
                "broken_pairs": broken_pairs
            }
    
    def get_entangled_platforms(self, platform_id: str) -> Dict[str, Any]:
        """Get all platforms entangled with the specified platform"""
        with self.lock:
            # Check if platform exists
            if platform_id not in self.platforms:
                self.logger.error(f"Platform not found: {platform_id}")
                return {
                    "success": False,
                    "error": f"Platform not found: {platform_id}"
                }
            
            # Get platform
            platform = self.platforms[platform_id]
            
            # Get entanglement pairs
            entanglements = []
            
            for pair_id, pair in platform.entanglement_pairs.items():
                if pair.active:
                    entanglements.append({
                        "pair_id": pair_id,
                        "target_platform_id": pair.target_platform_id,
                        "entanglement_type": pair.entanglement_type.name,
                        "entanglement_strength": pair.entanglement_strength,
                        "state_transfer_type": pair.state_transfer_type.name,
                        "last_sync_time": pair.last_sync_time,
                        "synchronized_keys": list(pair.synchronized_keys)
                    })
            
            return {
                "success": True,
                "platform_id": platform_id,
                "entanglements": entanglements,
                "entanglement_count": len(entanglements)
            }
    
    def get_platform_state(self, platform_id: str) -> Dict[str, Any]:
        """Get the current state of a platform"""
        with self.lock:
            # Check if platform exists
            if platform_id not in self.platforms:
                self.logger.error(f"Platform not found: {platform_id}")
                return {
                    "success": False,
                    "error": f"Platform not found: {platform_id}"
                }
            
            # Get platform
            platform = self.platforms[platform_id]
            state = platform.current_state
            
            return {
                "success": True,
                "platform_id": platform_id,
                "state_id": state.state_id,
                "state_type": state.state_type,
                "coherence": state.coherence,
                "timestamp": state.timestamp,
                "version": state.version,
                "dimensions": state.dimensions,
                "entanglement_ids": state.entanglement_ids,
                "state_data": state.state_data
            }
    
    def list_platforms(self) -> Dict[str, Any]:
        """List all registered platforms"""
        with self.lock:
            platforms_list = []
            
            for platform_id, platform in self.platforms.items():
                entanglement_count = sum(1 for pair in platform.entanglement_pairs.values() if pair.active)
                
                platforms_list.append({
                    "platform_id": platform_id,
                    "name": platform.name,
                    "platform_type": platform.platform_type,
                    "coherence": platform.coherence_metrics.overall_coherence,
                    "last_update": platform.last_update,
                    "entanglement_count": entanglement_count,
                    "state_id": platform.current_state.state_id
                })
            
            return {
                "success": True,
                "platforms": platforms_list,
                "count": len(platforms_list)
            }
    
    def _generate_platform_id(self, name: str, platform_type: str) -> str:
        """Generate a unique platform ID"""
        # Create a hash from name and type
        hash_input = f"{name}:{platform_type}:{time.time()}"
        hash_value = hashlib.md5(hash_input.encode()).hexdigest()[:8]
        
        # Create ID
        platform_id = f"platform_{platform_type.lower()}_{hash_value}"
        
        return platform_id
    
    def _generate_entanglement_pair_id(self, source_id: str, target_id: str, entanglement_type: str) -> str:
        """Generate a unique entanglement pair ID"""
        # Create a hash from source, target, and type
        hash_input = f"{source_id}:{target_id}:{entanglement_type}:{time.time()}"
        hash_value = hashlib.md5(hash_input.encode()).hexdigest()[:8]
        
        # Create ID
        pair_id = f"entanglement_{hash_value}"
        
        return pair_id
    
    def _save_platform(self, platform: EntangledPlatform) -> None:
        """Save a platform to disk"""
        platform_path = os.path.join(self.storage_path, f"{platform.platform_id}.json")
        
        # Create serializable representation
        platform_data = {
            "platform_id": platform.platform_id,
            "name": platform.name,
            "platform_type": platform.platform_type,
            "connection_info": platform.connection_info,
            "capabilities": platform.capabilities,
            "last_update": platform.last_update,
            "supported_entanglement_types": [t.name for t in platform.supported_entanglement_types],
            "current_state": {
                "platform_id": platform.current_state.platform_id,
                "state_id": platform.current_state.state_id,
                "state_type": platform.current_state.state_type,
                "state_data": platform.current_state.state_data,
                "coherence": platform.current_state.coherence,
                "timestamp": platform.current_state.timestamp,
                "version": platform.current_state.version,
                "dimensions": platform.current_state.dimensions,
                "metrics": platform.current_state.metrics,
                "entanglement_ids": platform.current_state.entanglement_ids,
                "history": platform.current_state.history
            },
            "coherence_metrics": {
                "platform_id": platform.coherence_metrics.platform_id,
                "overall_coherence": platform.coherence_metrics.overall_coherence,
                "entanglement_coherence": platform.coherence_metrics.entanglement_coherence,
                "dimensional_coherence": platform.coherence_metrics.dimensional_coherence,
                "time_series": platform.coherence_metrics.time_series,
                "phi_harmonic_balance": platform.coherence_metrics.phi_harmonic_balance,
                "last_update": platform.coherence_metrics.last_update
            },
            "entanglement_pair_ids": list(platform.entanglement_pairs.keys())
        }
        
        # Save to disk
        with open(platform_path, 'w') as f:
            json.dump(platform_data, f, indent=2)
    
    def _save_entanglement_pair(self, pair: EntanglementPair) -> None:
        """Save an entanglement pair to disk"""
        pair_path = os.path.join(self.storage_path, f"{pair.pair_id}.json")
        
        # Create serializable representation
        pair_data = {
            "pair_id": pair.pair_id,
            "source_platform_id": pair.source_platform_id,
            "target_platform_id": pair.target_platform_id,
            "entanglement_type": pair.entanglement_type.name,
            "entanglement_strength": pair.entanglement_strength,
            "creation_time": pair.creation_time,
            "last_sync_time": pair.last_sync_time,
            "state_transfer_type": pair.state_transfer_type.name,
            "synchronized_keys": list(pair.synchronized_keys),
            "coherence_history": pair.coherence_history,
            "active": pair.active
        }
        
        # Save to disk
        with open(pair_path, 'w') as f:
            json.dump(pair_data, f, indent=2)
    
    def _load_platforms(self) -> None:
        """Load all platforms from disk"""
        if not os.path.exists(self.storage_path):
            return
        
        # Load each platform file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json') and filename.startswith('platform_'):
                platform_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(platform_path, 'r') as f:
                        platform_data = json.load(f)
                    
                    # Parse supported entanglement types
                    supported_types = []
                    for type_name in platform_data.get("supported_entanglement_types", []):
                        try:
                            supported_types.append(EntanglementType[type_name])
                        except KeyError:
                            self.logger.warning(f"Unknown entanglement type: {type_name}")
                    
                    # Create platform state
                    state_data = platform_data.get("current_state", {})
                    state = PlatformState(
                        platform_id=state_data.get("platform_id", ""),
                        state_id=state_data.get("state_id", ""),
                        state_type=state_data.get("state_type", ""),
                        state_data=state_data.get("state_data", {}),
                        coherence=state_data.get("coherence", 1.0),
                        timestamp=state_data.get("timestamp", time.time()),
                        version=state_data.get("version", "1.0.0"),
                        dimensions=state_data.get("dimensions", {}),
                        metrics=state_data.get("metrics", {}),
                        entanglement_ids=state_data.get("entanglement_ids", []),
                        history=state_data.get("history", [])
                    )
                    
                    # Create coherence metrics
                    metrics_data = platform_data.get("coherence_metrics", {})
                    coherence_metrics = CoherenceMetrics(
                        platform_id=metrics_data.get("platform_id", ""),
                        overall_coherence=metrics_data.get("overall_coherence", 1.0),
                        entanglement_coherence=metrics_data.get("entanglement_coherence", {}),
                        dimensional_coherence=metrics_data.get("dimensional_coherence", {}),
                        time_series=metrics_data.get("time_series", [(time.time(), 1.0)]),
                        phi_harmonic_balance=metrics_data.get("phi_harmonic_balance", PHI_RECIPROCAL),
                        last_update=metrics_data.get("last_update", time.time())
                    )
                    
                    # Create platform
                    platform = EntangledPlatform(
                        platform_id=platform_data.get("platform_id", ""),
                        name=platform_data.get("name", ""),
                        platform_type=platform_data.get("platform_type", ""),
                        connection_info=platform_data.get("connection_info", {}),
                        current_state=state,
                        supported_entanglement_types=supported_types,
                        capabilities=platform_data.get("capabilities", {}),
                        coherence_metrics=coherence_metrics,
                        last_update=platform_data.get("last_update", time.time())
                    )
                    
                    # Store platform without entanglement pairs (loaded separately)
                    self.platforms[platform.platform_id] = platform
                    
                    self.logger.info(f"Loaded platform: {platform.platform_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load platform {filename}: {str(e)}")
    
    def _load_entanglement_pairs(self) -> None:
        """Load all entanglement pairs from disk"""
        if not os.path.exists(self.storage_path):
            return
        
        # Load each entanglement pair file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json') and filename.startswith('entanglement_'):
                pair_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(pair_path, 'r') as f:
                        pair_data = json.load(f)
                    
                    # Parse entanglement type
                    try:
                        entanglement_type = EntanglementType[pair_data.get("entanglement_type", "STATE")]
                    except KeyError:
                        self.logger.warning(f"Unknown entanglement type: {pair_data.get('entanglement_type')}")
                        entanglement_type = EntanglementType.STATE
                    
                    # Parse state transfer type
                    try:
                        transfer_type = StateTransferType[pair_data.get("state_transfer_type", "INSTANT")]
                    except KeyError:
                        self.logger.warning(f"Unknown state transfer type: {pair_data.get('state_transfer_type')}")
                        transfer_type = StateTransferType.INSTANT
                    
                    # Create entanglement pair
                    pair = EntanglementPair(
                        pair_id=pair_data.get("pair_id", ""),
                        source_platform_id=pair_data.get("source_platform_id", ""),
                        target_platform_id=pair_data.get("target_platform_id", ""),
                        entanglement_type=entanglement_type,
                        entanglement_strength=pair_data.get("entanglement_strength", 1.0),
                        creation_time=pair_data.get("creation_time", time.time()),
                        last_sync_time=pair_data.get("last_sync_time", time.time()),
                        state_transfer_type=transfer_type,
                        synchronized_keys=set(pair_data.get("synchronized_keys", [])),
                        coherence_history=pair_data.get("coherence_history", [(time.time(), 1.0)]),
                        active=pair_data.get("active", True)
                    )
                    
                    # Store entanglement pair
                    self.entanglement_pairs[pair.pair_id] = pair
                    
                    # Add to platforms if they exist
                    source_id = pair.source_platform_id
                    if source_id in self.platforms:
                        self.platforms[source_id].entanglement_pairs[pair.pair_id] = pair
                    
                    self.logger.info(f"Loaded entanglement pair: {pair.pair_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load entanglement pair {filename}: {str(e)}")
"""
Cross-Instance Learning System
Part of the Quantum Learning System - Phase 7
Frequency: Ω^Ω (9,216 Hz)

Provides learning synchronization between deployments, pattern-sharing across
deployment instances, and unified evolution across all deployments.
"""
import os
import json
import time
import logging
import threading
import numpy as np
from enum import Enum, auto
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional, Tuple, Set, Union, Callable

# Import from community_knowledge
from .community_knowledge import (
    PHI,
    PHI_RECIPROCAL,
    PHI_SQUARED,
    PHI_TO_PHI,
    OMEGA_OMEGA_FREQUENCY
)


class LearningNodeType(Enum):
    """Types of learning nodes in the network"""
    INSTANCE = auto()  # Deployment instance
    CLUSTER = auto()  # Instance cluster
    PATTERN = auto()  # Shared pattern
    EVOLUTION = auto()  # Evolution state
    KNOWLEDGE = auto()  # Knowledge node
    BRIDGE = auto()  # Connection bridge


@dataclass
class LearningNode:
    """Represents a node in the learning network"""
    node_id: str
    node_type: LearningNodeType
    name: str
    data: Dict[str, Any]
    version: str
    created_at: float
    updated_at: float
    coherence: float = PHI_RECIPROCAL
    active: bool = True
    connections: List[str] = field(default_factory=list)


@dataclass
class LearningPattern:
    """Represents a learning pattern that can be shared"""
    pattern_id: str
    pattern_type: str
    name: str
    description: str
    data: Dict[str, Any]
    source_node_id: str
    created_at: float
    version: str
    success_rate: float = 0.0
    application_count: int = 0
    confidence: float = PHI_RECIPROCAL
    tags: List[str] = field(default_factory=list)


@dataclass
class LearningNetwork:
    """Represents the network of learning nodes"""
    network_id: str
    name: str
    nodes: Dict[str, LearningNode] = field(default_factory=dict)
    patterns: Dict[str, LearningPattern] = field(default_factory=list)
    connections: List[Dict[str, Any]] = field(default_factory=list)
    created_at: float = field(default_factory=time.time)
    updated_at: float = field(default_factory=time.time)
    coherence: float = PHI_RECIPROCAL


class LearningSync:
    """Provides synchronization of learning between instances"""
    
    def __init__(self):
        """Initialize the learning synchronization system"""
        self.phi = PHI
        self.sync_records: Dict[str, Dict[str, Any]] = {}
        self.lock = threading.RLock()
        self.logger = logging.getLogger("learning_sync")
    
    def synchronize_learning(self, 
                           source_node_id: str, 
                           target_node_id: str,
                           network: LearningNetwork,
                           sync_patterns: bool = True,
                           sync_evolution: bool = True) -> Dict[str, Any]:
        """Synchronize learning between two nodes"""
        with self.lock:
            # Make sure nodes exist
            if source_node_id not in network.nodes:
                raise ValueError(f"Source node {source_node_id} not found")
                
            if target_node_id not in network.nodes:
                raise ValueError(f"Target node {target_node_id} not found")
                
            # Generate sync ID
            sync_id = f"learning_sync_{source_node_id}_{target_node_id}_{int(time.time())}"
            
            # Record sync start
            sync_record = {
                "sync_id": sync_id,
                "source_node_id": source_node_id,
                "target_node_id": target_node_id,
                "network_id": network.network_id,
                "started_at": time.time(),
                "patterns_synced": [],
                "evolutions_synced": [],
                "completed_at": None,
                "success": False,
                "sync_coherence": 0.0
            }
            
            self.sync_records[sync_id] = sync_record
            
            # Synchronize patterns if requested
            if sync_patterns:
                sync_record["patterns_synced"] = self._sync_patterns(source_node_id, target_node_id, network)
            
            # Synchronize evolution if requested
            if sync_evolution:
                sync_record["evolutions_synced"] = self._sync_evolution(source_node_id, target_node_id, network)
            
            # Update connection between nodes
            self._update_connection(source_node_id, target_node_id, network)
            
            # Update sync record
            sync_record["completed_at"] = time.time()
            sync_record["success"] = True
            sync_record["sync_coherence"] = self._calculate_sync_coherence(
                sync_record["patterns_synced"], sync_record["evolutions_synced"]
            )
            
            self.logger.info(f"Synchronized learning between {source_node_id} and {target_node_id}")
            
            return sync_record
    
    def _sync_patterns(self, 
                     source_node_id: str, 
                     target_node_id: str,
                     network: LearningNetwork) -> List[Dict[str, Any]]:
        """Synchronize patterns between nodes"""
        # Get patterns from source node
        source_patterns = []
        for pattern_id, pattern in network.patterns.items():
            if pattern.source_node_id == source_node_id:
                source_patterns.append(pattern)
        
        # Apply patterns to target node
        synced_patterns = []
        
        for pattern in source_patterns:
            # Check if pattern already exists for target
            target_has_pattern = False
            for existing_pattern in network.patterns.values():
                if (existing_pattern.pattern_type == pattern.pattern_type and
                    existing_pattern.name == pattern.name and
                    existing_pattern.source_node_id == target_node_id):
                    target_has_pattern = True
                    break
            
            if not target_has_pattern:
                # Create new pattern for target with updated values
                new_pattern_id = f"pattern_{pattern.pattern_type}_{target_node_id}_{int(time.time())}"
                
                new_pattern = LearningPattern(
                    pattern_id=new_pattern_id,
                    pattern_type=pattern.pattern_type,
                    name=pattern.name,
                    description=pattern.description,
                    data=pattern.data.copy(),
                    source_node_id=target_node_id,
                    created_at=time.time(),
                    version=pattern.version,
                    success_rate=pattern.success_rate * PHI_RECIPROCAL,  # Reduce success rate for transfer
                    application_count=0,  # Reset application count
                    confidence=pattern.confidence * PHI_RECIPROCAL,  # Reduce confidence for transfer
                    tags=pattern.tags.copy()
                )
                
                # Add to network
                network.patterns[new_pattern_id] = new_pattern
                
                synced_patterns.append({
                    "pattern_id": new_pattern_id,
                    "original_pattern_id": pattern.pattern_id,
                    "pattern_type": pattern.pattern_type,
                    "name": pattern.name
                })
        
        return synced_patterns
    
    def _sync_evolution(self, 
                      source_node_id: str, 
                      target_node_id: str,
                      network: LearningNetwork) -> List[Dict[str, Any]]:
        """Synchronize evolution states between nodes"""
        # Get source node
        source_node = network.nodes[source_node_id]
        
        # Get target node
        target_node = network.nodes[target_node_id]
        
        # Extract evolution data
        source_evolution = source_node.data.get("evolution", {})
        target_evolution = target_node.data.get("evolution", {})
        
        # Apply phi-harmonic merging of evolution data
        merged_evolution = self._merge_evolution_data(source_evolution, target_evolution)
        
        # Update target node with merged evolution
        if merged_evolution:
            target_node.data["evolution"] = merged_evolution
            target_node.updated_at = time.time()
            
            # Increase target node coherence
            target_node.coherence = min(1.0, target_node.coherence + 0.1)
            
            return [{
                "source_evolution_version": source_evolution.get("version", "unknown"),
                "target_evolution_version": target_evolution.get("version", "unknown"),
                "merged_evolution_version": merged_evolution.get("version", "unknown")
            }]
        
        return []
    
    def _merge_evolution_data(self, 
                            source_evolution: Dict[str, Any],
                            target_evolution: Dict[str, Any]) -> Dict[str, Any]:
        """Merge evolution data using phi-harmonic principles"""
        # Start with target data
        merged = target_evolution.copy()
        
        # If source is newer version, prefer source data
        source_version = source_evolution.get("version", "0.0.0")
        target_version = target_evolution.get("version", "0.0.0")
        
        if self._compare_versions(source_version, target_version) > 0:
            # Source is newer
            merged = source_evolution.copy()
        
        # Merge metrics using phi-weighted average
        if "metrics" in source_evolution and "metrics" in target_evolution:
            merged["metrics"] = {}
            
            all_metrics = set(source_evolution["metrics"].keys()).union(set(target_evolution["metrics"].keys()))
            
            for metric in all_metrics:
                source_value = source_evolution["metrics"].get(metric, 0.0)
                target_value = target_evolution["metrics"].get(metric, 0.0)
                
                # Phi-weighted average
                merged["metrics"][metric] = (source_value * PHI_RECIPROCAL) + (target_value * (1 - PHI_RECIPROCAL))
        
        # Merge learning data
        if "learning" in source_evolution and "learning" in target_evolution:
            merged["learning"] = {}
            
            all_learnings = set(source_evolution["learning"].keys()).union(set(target_evolution["learning"].keys()))
            
            for learning in all_learnings:
                if learning in source_evolution["learning"] and learning in target_evolution["learning"]:
                    # Take highest success rate
                    source_success = source_evolution["learning"][learning].get("success_rate", 0.0)
                    target_success = target_evolution["learning"][learning].get("success_rate", 0.0)
                    
                    if source_success >= target_success:
                        merged["learning"][learning] = source_evolution["learning"][learning]
                    else:
                        merged["learning"][learning] = target_evolution["learning"][learning]
                elif learning in source_evolution["learning"]:
                    merged["learning"][learning] = source_evolution["learning"][learning]
                else:
                    merged["learning"][learning] = target_evolution["learning"][learning]
        
        # Update version and timestamp
        merged["version"] = self._increment_version(max(source_version, target_version))
        merged["updated_at"] = time.time()
        
        return merged
    
    def _compare_versions(self, version1: str, version2: str) -> int:
        """Compare two version strings, returns:
           1 if version1 > version2
           0 if version1 == version2
           -1 if version1 < version2
        """
        parts1 = [int(x) for x in version1.split('.')]
        parts2 = [int(x) for x in version2.split('.')]
        
        # Pad with zeros if needed
        while len(parts1) < 3:
            parts1.append(0)
        
        while len(parts2) < 3:
            parts2.append(0)
        
        # Compare parts
        for i in range(3):
            if parts1[i] > parts2[i]:
                return 1
            elif parts1[i] < parts2[i]:
                return -1
        
        return 0
    
    def _increment_version(self, version: str) -> str:
        """Increment the patch version number"""
        parts = [int(x) for x in version.split('.')]
        
        # Pad with zeros if needed
        while len(parts) < 3:
            parts.append(0)
        
        # Increment patch version
        parts[2] += 1
        
        return '.'.join(str(x) for x in parts)
    
    def _update_connection(self, 
                         source_node_id: str, 
                         target_node_id: str,
                         network: LearningNetwork) -> None:
        """Update the connection between nodes"""
        # Check if connection already exists
        existing_connection = None
        for connection in network.connections:
            if ((connection["source"] == source_node_id and connection["target"] == target_node_id) or
                (connection["source"] == target_node_id and connection["target"] == source_node_id)):
                existing_connection = connection
                break
        
        if existing_connection:
            # Update existing connection
            existing_connection["sync_count"] += 1
            existing_connection["last_sync"] = time.time()
            existing_connection["strength"] = min(1.0, existing_connection["strength"] + 0.1)
        else:
            # Create new connection
            new_connection = {
                "source": source_node_id,
                "target": target_node_id,
                "type": "learning_sync",
                "created_at": time.time(),
                "last_sync": time.time(),
                "sync_count": 1,
                "strength": PHI_RECIPROCAL
            }
            
            network.connections.append(new_connection)
        
        # Update network
        network.updated_at = time.time()
        
        # Add to node connections if not already there
        source_node = network.nodes[source_node_id]
        if target_node_id not in source_node.connections:
            source_node.connections.append(target_node_id)
            
        target_node = network.nodes[target_node_id]
        if source_node_id not in target_node.connections:
            target_node.connections.append(source_node_id)
    
    def _calculate_sync_coherence(self, 
                                patterns_synced: List[Dict[str, Any]],
                                evolutions_synced: List[Dict[str, Any]]) -> float:
        """Calculate the coherence of the synchronization"""
        # PHI-weighted coherence calculation
        patterns_weight = 0.6
        evolutions_weight = 0.4
        
        # Patterns coherence based on count
        patterns_coherence = min(1.0, len(patterns_synced) * 0.2)
        
        # Evolution coherence based on count
        evolutions_coherence = 1.0 if evolutions_synced else 0.0
        
        # Calculate weighted coherence
        coherence = (patterns_coherence * patterns_weight) + (evolutions_coherence * evolutions_weight)
        
        # Apply phi-harmonic scaling
        phi_coherence = coherence * PHI_RECIPROCAL + PHI_RECIPROCAL * (1 - PHI_RECIPROCAL)
        
        return min(1.0, phi_coherence)
    
    def get_sync_record(self, sync_id: str) -> Optional[Dict[str, Any]]:
        """Get a synchronization record by ID"""
        with self.lock:
            return self.sync_records.get(sync_id)
    
    def list_sync_records(self) -> List[Dict[str, Any]]:
        """List all synchronization records"""
        with self.lock:
            return list(self.sync_records.values())


class PatternSharing:
    """Provides pattern sharing across deployment instances"""
    
    def __init__(self):
        """Initialize the pattern sharing system"""
        self.phi = PHI
        self.pattern_applications: Dict[str, List[Dict[str, Any]]] = {}
        self.lock = threading.RLock()
        self.logger = logging.getLogger("pattern_sharing")
    
    def share_pattern(self, 
                     pattern: LearningPattern,
                     network: LearningNetwork,
                     target_node_ids: Optional[List[str]] = None) -> Dict[str, Any]:
        """Share a pattern with other nodes in the network"""
        with self.lock:
            # Generate share ID
            share_id = f"pattern_share_{pattern.pattern_id}_{int(time.time())}"
            
            # Record share start
            share_record = {
                "share_id": share_id,
                "pattern_id": pattern.pattern_id,
                "pattern_type": pattern.pattern_type,
                "pattern_name": pattern.name,
                "source_node_id": pattern.source_node_id,
                "started_at": time.time(),
                "targets": [],
                "completed_at": None,
                "success": False,
                "share_coherence": 0.0
            }
            
            # Determine target nodes
            if target_node_ids:
                # Use specified targets
                targets = [
                    node_id for node_id in target_node_ids
                    if node_id in network.nodes and node_id != pattern.source_node_id
                ]
            else:
                # Use connected nodes
                source_node = network.nodes.get(pattern.source_node_id)
                if not source_node:
                    raise ValueError(f"Source node {pattern.source_node_id} not found")
                    
                targets = [
                    node_id for node_id in source_node.connections
                    if node_id in network.nodes
                ]
            
            # Share pattern with each target
            for target_node_id in targets:
                target_node = network.nodes[target_node_id]
                
                # Create adapted pattern for target
                new_pattern_id = f"pattern_{pattern.pattern_type}_{target_node_id}_{int(time.time())}"
                
                new_pattern = LearningPattern(
                    pattern_id=new_pattern_id,
                    pattern_type=pattern.pattern_type,
                    name=pattern.name,
                    description=pattern.description,
                    data=pattern.data.copy(),
                    source_node_id=target_node_id,
                    created_at=time.time(),
                    version=pattern.version,
                    success_rate=pattern.success_rate * PHI_RECIPROCAL,  # Reduce success rate for transfer
                    application_count=0,  # Reset application count
                    confidence=pattern.confidence * PHI_RECIPROCAL,  # Reduce confidence for transfer
                    tags=pattern.tags.copy()
                )
                
                # Add to network
                network.patterns[new_pattern_id] = new_pattern
                
                # Update target's connections
                if pattern.source_node_id not in target_node.connections:
                    target_node.connections.append(pattern.source_node_id)
                
                # Record target in share record
                share_record["targets"].append({
                    "node_id": target_node_id,
                    "node_name": target_node.name,
                    "adapted_pattern_id": new_pattern_id
                })
            
            # Update share record
            share_record["completed_at"] = time.time()
            share_record["success"] = True
            share_record["share_coherence"] = self._calculate_share_coherence(len(targets))
            
            self.logger.info(f"Shared pattern {pattern.pattern_id} with {len(targets)} nodes")
            
            return share_record
    
    def apply_pattern(self, 
                     pattern_id: str,
                     application_context: Dict[str, Any],
                     network: LearningNetwork) -> Dict[str, Any]:
        """Apply a shared pattern in a specific context"""
        with self.lock:
            # Get the pattern
            pattern = network.patterns.get(pattern_id)
            if not pattern:
                raise ValueError(f"Pattern {pattern_id} not found")
                
            # Generate application ID
            application_id = f"pattern_apply_{pattern_id}_{int(time.time())}"
            
            # Record application start
            application_record = {
                "application_id": application_id,
                "pattern_id": pattern_id,
                "pattern_type": pattern.pattern_type,
                "pattern_name": pattern.name,
                "node_id": pattern.source_node_id,
                "started_at": time.time(),
                "context": application_context,
                "completed_at": None,
                "success": False,
                "result": None
            }
            
            # Apply pattern based on type
            result = self._apply_pattern_by_type(pattern, application_context)
            
            # Update application record
            application_record["completed_at"] = time.time()
            application_record["success"] = result["success"]
            application_record["result"] = result
            
            # Update pattern stats
            pattern.application_count += 1
            if result["success"]:
                # Update success rate using phi-weighted average
                pattern.success_rate = (
                    pattern.success_rate * (pattern.application_count - 1) + 1.0
                ) / pattern.application_count
                
                # Increase confidence
                pattern.confidence = min(1.0, pattern.confidence + 0.05)
            else:
                # Update success rate using phi-weighted average
                pattern.success_rate = (
                    pattern.success_rate * (pattern.application_count - 1) + 0.0
                ) / pattern.application_count
                
                # Decrease confidence
                pattern.confidence = max(0.0, pattern.confidence - 0.1)
            
            # Store application record
            if pattern_id not in self.pattern_applications:
                self.pattern_applications[pattern_id] = []
                
            self.pattern_applications[pattern_id].append(application_record)
            
            self.logger.info(f"Applied pattern {pattern_id} with result: {result['success']}")
            
            return application_record
    
    def _apply_pattern_by_type(self, 
                             pattern: LearningPattern,
                             context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a pattern based on its type"""
        # Default implementation - in a real system, different pattern types
        # would have specialized application logic
        
        # Check pattern type
        if pattern.pattern_type == "deployment":
            return self._apply_deployment_pattern(pattern, context)
        elif pattern.pattern_type == "optimization":
            return self._apply_optimization_pattern(pattern, context)
        elif pattern.pattern_type == "troubleshooting":
            return self._apply_troubleshooting_pattern(pattern, context)
        elif pattern.pattern_type == "configuration":
            return self._apply_configuration_pattern(pattern, context)
        else:
            # Generic pattern application
            return {
                "success": True,
                "message": f"Applied pattern {pattern.name}",
                "pattern_type": pattern.pattern_type,
                "application_time": time.time()
            }
    
    def _apply_deployment_pattern(self, 
                                pattern: LearningPattern,
                                context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a deployment pattern"""
        # Simulate deployment pattern application
        return {
            "success": True,
            "message": f"Applied deployment pattern {pattern.name}",
            "deployment_steps": pattern.data.get("steps", []),
            "deployment_time": time.time()
        }
    
    def _apply_optimization_pattern(self, 
                                  pattern: LearningPattern,
                                  context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply an optimization pattern"""
        # Simulate optimization pattern application
        return {
            "success": True,
            "message": f"Applied optimization pattern {pattern.name}",
            "optimization_results": {
                "before": context.get("metrics", {}),
                "after": {
                    metric: value * (1 + np.random.random() * 0.2)  # Simulate improvement
                    for metric, value in context.get("metrics", {}).items()
                },
                "improvement": f"{int(np.random.random() * 30)}%"
            },
            "optimization_time": time.time()
        }
    
    def _apply_troubleshooting_pattern(self, 
                                     pattern: LearningPattern,
                                     context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a troubleshooting pattern"""
        # Simulate troubleshooting pattern application
        return {
            "success": True,
            "message": f"Applied troubleshooting pattern {pattern.name}",
            "issue_resolution": {
                "issue_type": context.get("issue_type", "unknown"),
                "resolution_steps": pattern.data.get("steps", []),
                "resolution_time": int(np.random.random() * 60)  # Random resolution time
            },
            "troubleshooting_time": time.time()
        }
    
    def _apply_configuration_pattern(self, 
                                   pattern: LearningPattern,
                                   context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a configuration pattern"""
        # Simulate configuration pattern application
        return {
            "success": True,
            "message": f"Applied configuration pattern {pattern.name}",
            "configuration_changes": pattern.data.get("changes", []),
            "environment": context.get("environment", "unknown"),
            "configuration_time": time.time()
        }
    
    def _calculate_share_coherence(self, target_count: int) -> float:
        """Calculate the coherence of the pattern sharing"""
        # PHI-weighted coherence calculation
        base_coherence = min(1.0, target_count * 0.2)
        
        # Apply phi-harmonic scaling
        phi_coherence = base_coherence * PHI_RECIPROCAL + PHI_RECIPROCAL * (1 - PHI_RECIPROCAL)
        
        return min(1.0, phi_coherence)
    
    def get_pattern_applications(self, pattern_id: str) -> List[Dict[str, Any]]:
        """Get all applications of a pattern"""
        with self.lock:
            return self.pattern_applications.get(pattern_id, [])
    
    def find_similar_patterns(self, 
                            pattern: LearningPattern,
                            network: LearningNetwork,
                            min_similarity: float = 0.7) -> List[Dict[str, Any]]:
        """Find patterns similar to the given pattern"""
        similar_patterns = []
        
        for pattern_id, other_pattern in network.patterns.items():
            if pattern_id == pattern.pattern_id:
                continue
                
            # Calculate similarity
            similarity = self._calculate_pattern_similarity(pattern, other_pattern)
            
            if similarity >= min_similarity:
                similar_patterns.append({
                    "pattern_id": other_pattern.pattern_id,
                    "pattern_type": other_pattern.pattern_type,
                    "name": other_pattern.name,
                    "source_node_id": other_pattern.source_node_id,
                    "similarity": similarity,
                    "success_rate": other_pattern.success_rate,
                    "confidence": other_pattern.confidence
                })
        
        # Sort by similarity
        similar_patterns.sort(key=lambda p: p["similarity"], reverse=True)
        
        return similar_patterns
    
    def _calculate_pattern_similarity(self, 
                                    pattern1: LearningPattern,
                                    pattern2: LearningPattern) -> float:
        """Calculate the similarity between two patterns"""
        similarity = 0.0
        
        # Type match (30%)
        if pattern1.pattern_type == pattern2.pattern_type:
            similarity += 0.3
        
        # Tag overlap (20%)
        tags1 = set(pattern1.tags)
        tags2 = set(pattern2.tags)
        
        if tags1 and tags2:
            tag_overlap = len(tags1.intersection(tags2)) / max(len(tags1), len(tags2))
            similarity += 0.2 * tag_overlap
        
        # Name similarity (20%)
        name_similarity = 0.0
        if pattern1.name.lower() == pattern2.name.lower():
            name_similarity = 1.0
        elif pattern1.name.lower() in pattern2.name.lower() or pattern2.name.lower() in pattern1.name.lower():
            name_similarity = 0.7
            
        similarity += 0.2 * name_similarity
        
        # Data structure similarity (30%)
        data_similarity = 0.0
        
        if pattern1.data and pattern2.data:
            # Compare keys
            keys1 = set(pattern1.data.keys())
            keys2 = set(pattern2.data.keys())
            
            if keys1 and keys2:
                key_overlap = len(keys1.intersection(keys2)) / max(len(keys1), len(keys2))
                data_similarity = key_overlap
        
        similarity += 0.3 * data_similarity
        
        return similarity
    
    def merge_similar_patterns(self, 
                            pattern_ids: List[str],
                            network: LearningNetwork) -> Optional[LearningPattern]:
        """Merge similar patterns into a single optimized pattern"""
        with self.lock:
            if len(pattern_ids) < 2:
                return None
                
            # Get patterns
            patterns = []
            for pattern_id in pattern_ids:
                if pattern_id in network.patterns:
                    patterns.append(network.patterns[pattern_id])
            
            if len(patterns) < 2:
                return None
                
            # Use the most successful pattern as base
            patterns.sort(key=lambda p: p.success_rate, reverse=True)
            base_pattern = patterns[0]
            
            # Generate merged pattern ID
            merged_id = f"merged_pattern_{base_pattern.pattern_type}_{int(time.time())}"
            
            # Start with base pattern data
            merged_data = base_pattern.data.copy()
            
            # Merge in data from other patterns
            for pattern in patterns[1:]:
                # For each key in other pattern, merge if not in base
                for key, value in pattern.data.items():
                    if key not in merged_data:
                        merged_data[key] = value
            
            # Combine tags
            merged_tags = set()
            for pattern in patterns:
                merged_tags.update(pattern.tags)
            
            # Create merged pattern
            merged_pattern = LearningPattern(
                pattern_id=merged_id,
                pattern_type=base_pattern.pattern_type,
                name=f"Merged {base_pattern.name}",
                description=f"Merged pattern from {len(patterns)} similar patterns",
                data=merged_data,
                source_node_id=base_pattern.source_node_id,
                created_at=time.time(),
                version=self._get_highest_version(patterns),
                success_rate=self._calculate_merged_success_rate(patterns),
                application_count=0,  # Reset application count
                confidence=self._calculate_merged_confidence(patterns),
                tags=list(merged_tags)
            )
            
            # Add to network
            network.patterns[merged_id] = merged_pattern
            
            self.logger.info(f"Merged {len(patterns)} patterns into {merged_id}")
            
            return merged_pattern
    
    def _get_highest_version(self, patterns: List[LearningPattern]) -> str:
        """Get the highest version from a list of patterns"""
        if not patterns:
            return "1.0.0"
            
        highest = patterns[0].version
        
        for pattern in patterns[1:]:
            if self._compare_versions(pattern.version, highest) > 0:
                highest = pattern.version
        
        # Increment version
        return self._increment_version(highest)
    
    def _compare_versions(self, version1: str, version2: str) -> int:
        """Compare two version strings, returns:
           1 if version1 > version2
           0 if version1 == version2
           -1 if version1 < version2
        """
        parts1 = [int(x) for x in version1.split('.')]
        parts2 = [int(x) for x in version2.split('.')]
        
        # Pad with zeros if needed
        while len(parts1) < 3:
            parts1.append(0)
        
        while len(parts2) < 3:
            parts2.append(0)
        
        # Compare parts
        for i in range(3):
            if parts1[i] > parts2[i]:
                return 1
            elif parts1[i] < parts2[i]:
                return -1
        
        return 0
    
    def _increment_version(self, version: str) -> str:
        """Increment the minor version number"""
        parts = [int(x) for x in version.split('.')]
        
        # Pad with zeros if needed
        while len(parts) < 3:
            parts.append(0)
        
        # Increment minor version
        parts[1] += 1
        parts[2] = 0  # Reset patch version
        
        return '.'.join(str(x) for x in parts)
    
    def _calculate_merged_success_rate(self, patterns: List[LearningPattern]) -> float:
        """Calculate the success rate for a merged pattern"""
        if not patterns:
            return 0.0
            
        # Phi-weighted average of success rates
        total_weight = 0.0
        weighted_sum = 0.0
        
        for i, pattern in enumerate(patterns):
            weight = PHI_RECIPROCAL ** i  # Decreasing weight by phi-reciprocal
            weighted_sum += pattern.success_rate * weight
            total_weight += weight
        
        return weighted_sum / total_weight if total_weight > 0 else 0.0
    
    def _calculate_merged_confidence(self, patterns: List[LearningPattern]) -> float:
        """Calculate the confidence for a merged pattern"""
        if not patterns:
            return PHI_RECIPROCAL
            
        # Phi-weighted average of confidence values
        total_weight = 0.0
        weighted_sum = 0.0
        
        for i, pattern in enumerate(patterns):
            weight = PHI_RECIPROCAL ** i  # Decreasing weight by phi-reciprocal
            weighted_sum += pattern.confidence * weight
            total_weight += weight
        
        return weighted_sum / total_weight if total_weight > 0 else PHI_RECIPROCAL


class EvolutionSync:
    """Provides unified evolution across all deployments"""
    
    def __init__(self):
        """Initialize the evolution synchronization system"""
        self.phi = PHI
        self.evolution_states: Dict[str, Dict[str, Any]] = {}
        self.evolution_history: List[Dict[str, Any]] = []
        self.lock = threading.RLock()
        self.logger = logging.getLogger("evolution_sync")
    
    def create_evolution_state(self, 
                              state_id: str,
                              version: str,
                              dimensions: Dict[str, float],
                              metrics: Dict[str, float],
                              generation: int = 1) -> Dict[str, Any]:
        """Create a new evolution state"""
        with self.lock:
            # Check if already exists
            if state_id in self.evolution_states:
                self.logger.error(f"Evolution state {state_id} already exists")
                return self.evolution_states[state_id]
                
            # Create state object
            state = {
                "state_id": state_id,
                "version": version,
                "dimensions": dimensions,
                "metrics": metrics,
                "generation": generation,
                "created_at": time.time(),
                "updated_at": time.time(),
                "coherence": self._calculate_state_coherence(dimensions),
                "transitions": []
            }
            
            # Store state
            self.evolution_states[state_id] = state
            
            self.logger.info(f"Created evolution state {state_id} (generation {generation})")
            
            return state
    
    def update_evolution_state(self, 
                              state_id: str,
                              dimensions: Optional[Dict[str, float]] = None,
                              metrics: Optional[Dict[str, float]] = None) -> Optional[Dict[str, Any]]:
        """Update an existing evolution state"""
        with self.lock:
            # Check if exists
            if state_id not in self.evolution_states:
                self.logger.error(f"Evolution state {state_id} not found")
                return None
                
            # Get state
            state = self.evolution_states[state_id]
            
            # Update dimensions
            if dimensions:
                for dim, value in dimensions.items():
                    state["dimensions"][dim] = value
                    
                # Recalculate coherence
                state["coherence"] = self._calculate_state_coherence(state["dimensions"])
            
            # Update metrics
            if metrics:
                for metric, value in metrics.items():
                    state["metrics"][metric] = value
            
            # Update timestamp
            state["updated_at"] = time.time()
            
            self.logger.info(f"Updated evolution state {state_id}")
            
            return state
    
    def evolve_to_next_generation(self, 
                                state_id: str,
                                improvements: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """Evolve a state to the next generation"""
        with self.lock:
            # Check if exists
            if state_id not in self.evolution_states:
                self.logger.error(f"Evolution state {state_id} not found")
                return None
                
            # Get current state
            current_state = self.evolution_states[state_id]
            
            # Generate new state ID
            new_state_id = f"evolution_{int(time.time())}"
            
            # Increment version
            new_version = self._increment_version(current_state["version"])
            
            # Apply improvements to dimensions
            new_dimensions = current_state["dimensions"].copy()
            for dim, improvement in improvements.items():
                if dim in new_dimensions:
                    new_dimensions[dim] = min(1.0, new_dimensions[dim] + improvement)
            
            # Copy metrics
            new_metrics = current_state["metrics"].copy()
            
            # Create new state
            new_state = self.create_evolution_state(
                state_id=new_state_id,
                version=new_version,
                dimensions=new_dimensions,
                metrics=new_metrics,
                generation=current_state["generation"] + 1
            )
            
            # Record transition
            transition = {
                "from_state": state_id,
                "to_state": new_state_id,
                "improvements": improvements,
                "created_at": time.time()
            }
            
            current_state["transitions"].append(transition)
            
            # Add to history
            self.evolution_history.append({
                "type": "evolution",
                "from_state": state_id,
                "to_state": new_state_id,
                "generation": new_state["generation"],
                "improvements": improvements,
                "created_at": time.time()
            })
            
            self.logger.info(f"Evolved state {state_id} to {new_state_id} (generation {new_state['generation']})")
            
            return new_state
    
    def quantum_leap_evolution(self, 
                              state_id: str,
                              target_dimensions: Dict[str, float],
                              coherence_threshold: float = 0.9) -> Optional[Dict[str, Any]]:
        """Perform a quantum leap in evolution, skipping multiple generations"""
        with self.lock:
            # Check if exists
            if state_id not in self.evolution_states:
                self.logger.error(f"Evolution state {state_id} not found")
                return None
                
            # Get current state
            current_state = self.evolution_states[state_id]
            
            # Check if coherence is high enough
            if current_state["coherence"] < coherence_threshold:
                self.logger.error(f"Coherence too low for quantum leap: {current_state['coherence']:.2f} < {coherence_threshold:.2f}")
                return None
                
            # Generate new state ID
            new_state_id = f"quantum_leap_{int(time.time())}"
            
            # Increment version (major version for quantum leap)
            parts = [int(x) for x in current_state["version"].split('.')]
            parts[0] += 1  # Increment major version
            parts[1] = 0   # Reset minor version
            parts[2] = 0   # Reset patch version
            new_version = '.'.join(str(x) for x in parts)
            
            # Create dimensions with target values
            new_dimensions = current_state["dimensions"].copy()
            for dim, target in target_dimensions.items():
                if dim in new_dimensions:
                    new_dimensions[dim] = target
            
            # Copy metrics
            new_metrics = current_state["metrics"].copy()
            
            # Calculate generation skip
            generation_skip = max(2, int(current_state["coherence"] / PHI_RECIPROCAL))
            
            # Create new state
            new_state = self.create_evolution_state(
                state_id=new_state_id,
                version=new_version,
                dimensions=new_dimensions,
                metrics=new_metrics,
                generation=current_state["generation"] + generation_skip
            )
            
            # Record quantum leap
            leap = {
                "type": "quantum_leap",
                "from_state": state_id,
                "to_state": new_state_id,
                "from_generation": current_state["generation"],
                "to_generation": new_state["generation"],
                "generation_skip": generation_skip,
                "coherence_threshold": coherence_threshold,
                "actual_coherence": current_state["coherence"],
                "target_dimensions": target_dimensions,
                "created_at": time.time()
            }
            
            # Add to history
            self.evolution_history.append(leap)
            
            self.logger.info(f"Quantum leap from state {state_id} to {new_state_id} (skipped {generation_skip} generations)")
            
            return new_state
    
    def merge_evolution_states(self, 
                             state_ids: List[str],
                             merge_strategy: str = "phi_weighted") -> Optional[Dict[str, Any]]:
        """Merge multiple evolution states into a single unified state"""
        with self.lock:
            if len(state_ids) < 2:
                return None
                
            # Get states
            states = []
            for state_id in state_ids:
                if state_id in self.evolution_states:
                    states.append(self.evolution_states[state_id])
            
            if len(states) < 2:
                return None
                
            # Generate merged state ID
            merged_id = f"merged_evolution_{int(time.time())}"
            
            # Get highest version
            highest_version = states[0]["version"]
            for state in states[1:]:
                if self._compare_versions(state["version"], highest_version) > 0:
                    highest_version = state["version"]
                    
            # Increment version
            new_version = self._increment_minor_version(highest_version)
            
            # Merge dimensions
            merged_dimensions = {}
            if merge_strategy == "phi_weighted":
                merged_dimensions = self._merge_phi_weighted(
                    [state["dimensions"] for state in states]
                )
            elif merge_strategy == "max_value":
                merged_dimensions = self._merge_max_value(
                    [state["dimensions"] for state in states]
                )
            else:
                # Default to phi-weighted
                merged_dimensions = self._merge_phi_weighted(
                    [state["dimensions"] for state in states]
                )
            
            # Merge metrics
            merged_metrics = {}
            for state in states:
                for metric, value in state["metrics"].items():
                    if metric not in merged_metrics:
                        merged_metrics[metric] = value
                    else:
                        # Use better metric value
                        merged_metrics[metric] = max(merged_metrics[metric], value)
            
            # Get highest generation
            highest_generation = max(state["generation"] for state in states)
            
            # Create merged state
            merged_state = self.create_evolution_state(
                state_id=merged_id,
                version=new_version,
                dimensions=merged_dimensions,
                metrics=merged_metrics,
                generation=highest_generation
            )
            
            # Record merge
            merge = {
                "type": "merge",
                "source_states": state_ids,
                "merged_state": merged_id,
                "merge_strategy": merge_strategy,
                "created_at": time.time()
            }
            
            # Add to history
            self.evolution_history.append(merge)
            
            self.logger.info(f"Merged {len(states)} states into {merged_id}")
            
            return merged_state
    
    def _merge_phi_weighted(self, dimension_sets: List[Dict[str, float]]) -> Dict[str, float]:
        """Merge dimensions using phi-weighted average"""
        if not dimension_sets:
            return {}
            
        # Get all unique dimensions
        all_dimensions = set()
        for dimensions in dimension_sets:
            all_dimensions.update(dimensions.keys())
            
        # Merge with phi-weighted average
        merged = {}
        for dim in all_dimensions:
            values = []
            weights = []
            
            for i, dimensions in enumerate(dimension_sets):
                if dim in dimensions:
                    values.append(dimensions[dim])
                    weights.append(PHI_RECIPROCAL ** i)  # Decreasing weight by phi-reciprocal
            
            if values:
                # Calculate weighted average
                weighted_sum = sum(value * weight for value, weight in zip(values, weights))
                total_weight = sum(weights)
                
                merged[dim] = weighted_sum / total_weight if total_weight > 0 else 0.0
                
        return merged
    
    def _merge_max_value(self, dimension_sets: List[Dict[str, float]]) -> Dict[str, float]:
        """Merge dimensions taking the maximum value for each dimension"""
        if not dimension_sets:
            return {}
            
        # Get all unique dimensions
        all_dimensions = set()
        for dimensions in dimension_sets:
            all_dimensions.update(dimensions.keys())
            
        # Merge with maximum value
        merged = {}
        for dim in all_dimensions:
            values = []
            
            for dimensions in dimension_sets:
                if dim in dimensions:
                    values.append(dimensions[dim])
            
            if values:
                merged[dim] = max(values)
                
        return merged
    
    def _calculate_state_coherence(self, dimensions: Dict[str, float]) -> float:
        """Calculate the coherence of an evolution state"""
        if not dimensions:
            return 0.0
            
        # Average of dimension values
        avg_value = sum(dimensions.values()) / len(dimensions)
        
        # Phi-harmonic scaling
        coherence = avg_value * PHI_RECIPROCAL + PHI_RECIPROCAL * (1 - PHI_RECIPROCAL)
        
        return min(1.0, coherence)
    
    def _increment_version(self, version: str) -> str:
        """Increment the minor version number"""
        parts = [int(x) for x in version.split('.')]
        
        # Pad with zeros if needed
        while len(parts) < 3:
            parts.append(0)
        
        # Increment minor version
        parts[1] += 1
        parts[2] = 0  # Reset patch version
        
        return '.'.join(str(x) for x in parts)
    
    def _increment_minor_version(self, version: str) -> str:
        """Increment the minor version number"""
        parts = [int(x) for x in version.split('.')]
        
        # Pad with zeros if needed
        while len(parts) < 3:
            parts.append(0)
        
        # Increment minor version
        parts[1] += 1
        parts[2] = 0  # Reset patch version
        
        return '.'.join(str(x) for x in parts)
    
    def _compare_versions(self, version1: str, version2: str) -> int:
        """Compare two version strings, returns:
           1 if version1 > version2
           0 if version1 == version2
           -1 if version1 < version2
        """
        parts1 = [int(x) for x in version1.split('.')]
        parts2 = [int(x) for x in version2.split('.')]
        
        # Pad with zeros if needed
        while len(parts1) < 3:
            parts1.append(0)
        
        while len(parts2) < 3:
            parts2.append(0)
        
        # Compare parts
        for i in range(3):
            if parts1[i] > parts2[i]:
                return 1
            elif parts1[i] < parts2[i]:
                return -1
        
        return 0
    
    def get_evolution_state(self, state_id: str) -> Optional[Dict[str, Any]]:
        """Get an evolution state by ID"""
        with self.lock:
            return self.evolution_states.get(state_id)
    
    def list_evolution_states(self) -> List[Dict[str, Any]]:
        """List all evolution states"""
        with self.lock:
            states = []
            
            for state_id, state in self.evolution_states.items():
                states.append({
                    "state_id": state["state_id"],
                    "version": state["version"],
                    "generation": state["generation"],
                    "coherence": state["coherence"],
                    "created_at": state["created_at"],
                    "updated_at": state["updated_at"]
                })
                
            return states
    
    def get_evolution_history(self) -> List[Dict[str, Any]]:
        """Get the evolution history"""
        with self.lock:
            return self.evolution_history


class CrossInstanceLearningSystem:
    """Provides cross-instance learning with unified evolution"""
    
    def __init__(self, storage_path: Optional[str] = None):
        """Initialize the cross-instance learning system"""
        self.phi = PHI
        self.frequency = OMEGA_OMEGA_FREQUENCY
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "learning")
        self.networks: Dict[str, LearningNetwork] = {}
        self.active_network_id: Optional[str] = None
        self.learning_sync = LearningSync()
        self.pattern_sharing = PatternSharing()
        self.evolution_sync = EvolutionSync()
        self.lock = threading.RLock()
        self.logger = logging.getLogger("cross_instance_learning")
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Initialize default learning network
        self._initialize_default_network()
    
    def _initialize_default_network(self) -> None:
        """Initialize the default learning network"""
        network = self.create_learning_network(
            name="default-network",
            description="Default learning network"
        )
        
        self.active_network_id = network.network_id
    
    def create_learning_network(self, name: str, description: str) -> LearningNetwork:
        """Create a new learning network"""
        with self.lock:
            # Generate network ID
            network_id = f"network_{name.lower().replace(' ', '_')}_{int(time.time())}"
            
            # Create network object
            network = LearningNetwork(
                network_id=network_id,
                name=name,
                nodes={},
                patterns={},
                connections=[]
            )
            
            # Store network
            self.networks[network_id] = network
            
            self.logger.info(f"Created learning network: {network_id}")
            
            return network
    
    def register_instance_node(self, 
                             network_id: str,
                             instance_id: str,
                             name: str,
                             data: Dict[str, Any],
                             version: str = "1.0.0") -> LearningNode:
        """Register an instance node in the learning network"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Generate node ID if not provided
            node_id = f"instance_{instance_id}_{int(time.time())}"
            
            # Create node object
            node = LearningNode(
                node_id=node_id,
                node_type=LearningNodeType.INSTANCE,
                name=name,
                data=data,
                version=version,
                created_at=time.time(),
                updated_at=time.time()
            )
            
            # Add to network
            self.networks[network_id].nodes[node_id] = node
            
            self.logger.info(f"Registered instance node {node_id} in network {network_id}")
            
            return node
    
    def update_instance_node(self, 
                           network_id: str,
                           node_id: str,
                           data: Optional[Dict[str, Any]] = None,
                           version: Optional[str] = None) -> Optional[LearningNode]:
        """Update an instance node in the learning network"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                self.logger.error(f"Network {network_id} not found")
                return None
                
            # Make sure node exists
            if node_id not in self.networks[network_id].nodes:
                self.logger.error(f"Node {node_id} not found in network {network_id}")
                return None
                
            # Get node
            node = self.networks[network_id].nodes[node_id]
            
            # Update data
            if data:
                node.data.update(data)
                
            # Update version
            if version:
                node.version = version
                
            # Update timestamp
            node.updated_at = time.time()
            
            self.logger.info(f"Updated instance node {node_id} in network {network_id}")
            
            return node
    
    def create_pattern(self, 
                     network_id: str,
                     source_node_id: str,
                     pattern_type: str,
                     name: str,
                     description: str,
                     data: Dict[str, Any],
                     tags: List[str] = None) -> LearningPattern:
        """Create a learning pattern in the network"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Make sure source node exists
            if source_node_id not in self.networks[network_id].nodes:
                raise ValueError(f"Source node {source_node_id} not found in network {network_id}")
                
            # Generate pattern ID
            pattern_id = f"pattern_{pattern_type}_{source_node_id}_{int(time.time())}"
            
            # Create pattern object
            pattern = LearningPattern(
                pattern_id=pattern_id,
                pattern_type=pattern_type,
                name=name,
                description=description,
                data=data,
                source_node_id=source_node_id,
                created_at=time.time(),
                version="1.0.0",
                tags=tags or []
            )
            
            # Add to network
            self.networks[network_id].patterns[pattern_id] = pattern
            
            self.logger.info(f"Created pattern {pattern_id} in network {network_id}")
            
            return pattern
    
    def share_pattern(self, 
                     network_id: str,
                     pattern_id: str,
                     target_node_ids: Optional[List[str]] = None) -> Dict[str, Any]:
        """Share a pattern with other nodes in the network"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Make sure pattern exists
            if pattern_id not in self.networks[network_id].patterns:
                raise ValueError(f"Pattern {pattern_id} not found in network {network_id}")
                
            # Get pattern
            pattern = self.networks[network_id].patterns[pattern_id]
            
            # Share pattern
            return self.pattern_sharing.share_pattern(
                pattern=pattern,
                network=self.networks[network_id],
                target_node_ids=target_node_ids
            )
    
    def apply_pattern(self, 
                     network_id: str,
                     pattern_id: str,
                     application_context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a shared pattern in a specific context"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Make sure pattern exists
            if pattern_id not in self.networks[network_id].patterns:
                raise ValueError(f"Pattern {pattern_id} not found in network {network_id}")
                
            # Apply pattern
            return self.pattern_sharing.apply_pattern(
                pattern_id=pattern_id,
                application_context=application_context,
                network=self.networks[network_id]
            )
    
    def synchronize_learning(self, 
                           network_id: str,
                           source_node_id: str,
                           target_node_id: str) -> Dict[str, Any]:
        """Synchronize learning between two nodes"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Perform synchronization
            return self.learning_sync.synchronize_learning(
                source_node_id=source_node_id,
                target_node_id=target_node_id,
                network=self.networks[network_id]
            )
    
    def create_evolution_state(self, 
                              state_id: str,
                              dimensions: Dict[str, float],
                              metrics: Dict[str, float]) -> Dict[str, Any]:
        """Create a new evolution state"""
        with self.lock:
            return self.evolution_sync.create_evolution_state(
                state_id=state_id,
                version="1.0.0",
                dimensions=dimensions,
                metrics=metrics
            )
    
    def evolve_to_next_generation(self, 
                                state_id: str,
                                improvements: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """Evolve a state to the next generation"""
        with self.lock:
            return self.evolution_sync.evolve_to_next_generation(
                state_id=state_id,
                improvements=improvements
            )
    
    def quantum_leap_evolution(self, 
                             state_id: str,
                             target_dimensions: Dict[str, float],
                             coherence_threshold: float = 0.9) -> Optional[Dict[str, Any]]:
        """Perform a quantum leap in evolution, skipping multiple generations"""
        with self.lock:
            return self.evolution_sync.quantum_leap_evolution(
                state_id=state_id,
                target_dimensions=target_dimensions,
                coherence_threshold=coherence_threshold
            )
    
    def merge_evolution_states(self, 
                             state_ids: List[str],
                             merge_strategy: str = "phi_weighted") -> Optional[Dict[str, Any]]:
        """Merge multiple evolution states into a single unified state"""
        with self.lock:
            return self.evolution_sync.merge_evolution_states(
                state_ids=state_ids,
                merge_strategy=merge_strategy
            )
    
    def find_similar_patterns(self, 
                            network_id: str,
                            pattern_id: str,
                            min_similarity: float = 0.7) -> List[Dict[str, Any]]:
        """Find patterns similar to the given pattern"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Make sure pattern exists
            if pattern_id not in self.networks[network_id].patterns:
                raise ValueError(f"Pattern {pattern_id} not found in network {network_id}")
                
            # Get pattern
            pattern = self.networks[network_id].patterns[pattern_id]
            
            # Find similar patterns
            return self.pattern_sharing.find_similar_patterns(
                pattern=pattern,
                network=self.networks[network_id],
                min_similarity=min_similarity
            )
    
    def merge_similar_patterns(self, 
                             network_id: str,
                             pattern_ids: List[str]) -> Optional[LearningPattern]:
        """Merge similar patterns into a single optimized pattern"""
        with self.lock:
            # Make sure network exists
            if network_id not in self.networks:
                raise ValueError(f"Network {network_id} not found")
                
            # Merge patterns
            return self.pattern_sharing.merge_similar_patterns(
                pattern_ids=pattern_ids,
                network=self.networks[network_id]
            )
    
    def get_learning_network(self, network_id: str) -> Optional[Dict[str, Any]]:
        """Get a learning network by ID"""
        with self.lock:
            if network_id not in self.networks:
                return None
                
            network = self.networks[network_id]
            
            # Convert to dict
            return {
                "network_id": network.network_id,
                "name": network.name,
                "node_count": len(network.nodes),
                "pattern_count": len(network.patterns),
                "connection_count": len(network.connections),
                "created_at": network.created_at,
                "updated_at": network.updated_at,
                "coherence": network.coherence
            }
    
    def get_learning_nodes(self, network_id: str) -> List[Dict[str, Any]]:
        """Get all learning nodes in a network"""
        with self.lock:
            if network_id not in self.networks:
                return []
                
            nodes = []
            for node_id, node in self.networks[network_id].nodes.items():
                nodes.append({
                    "node_id": node.node_id,
                    "node_type": node.node_type.name,
                    "name": node.name,
                    "version": node.version,
                    "created_at": node.created_at,
                    "updated_at": node.updated_at,
                    "coherence": node.coherence,
                    "active": node.active,
                    "connection_count": len(node.connections)
                })
                
            return nodes
    
    def get_learning_patterns(self, network_id: str, pattern_type: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all learning patterns in a network"""
        with self.lock:
            if network_id not in self.networks:
                return []
                
            patterns = []
            for pattern_id, pattern in self.networks[network_id].patterns.items():
                # Filter by type if specified
                if pattern_type and pattern.pattern_type != pattern_type:
                    continue
                    
                patterns.append({
                    "pattern_id": pattern.pattern_id,
                    "pattern_type": pattern.pattern_type,
                    "name": pattern.name,
                    "description": pattern.description,
                    "source_node_id": pattern.source_node_id,
                    "created_at": pattern.created_at,
                    "version": pattern.version,
                    "success_rate": pattern.success_rate,
                    "application_count": pattern.application_count,
                    "confidence": pattern.confidence,
                    "tags": pattern.tags
                })
                
            return patterns
    
    def get_learning_connections(self, network_id: str) -> List[Dict[str, Any]]:
        """Get all connections in a network"""
        with self.lock:
            if network_id not in self.networks:
                return []
                
            return self.networks[network_id].connections
    
    def get_evolution_states(self) -> List[Dict[str, Any]]:
        """Get all evolution states"""
        with self.lock:
            return self.evolution_sync.list_evolution_states()
    
    def get_evolution_history(self) -> List[Dict[str, Any]]:
        """Get the evolution history"""
        with self.lock:
            return self.evolution_sync.get_evolution_history()
    
    def set_active_network(self, network_id: str) -> bool:
        """Set the active learning network"""
        with self.lock:
            if network_id not in self.networks:
                self.logger.error(f"Network {network_id} not found")
                return False
                
            self.active_network_id = network_id
            
            self.logger.info(f"Set active network: {network_id}")
            
            return True
    
    def get_active_network(self) -> Optional[LearningNetwork]:
        """Get the active learning network"""
        with self.lock:
            if not self.active_network_id:
                return None
                
            return self.networks.get(self.active_network_id)
    
    def list_learning_networks(self) -> List[Dict[str, Any]]:
        """List all learning networks"""
        with self.lock:
            networks = []
            
            for network_id, network in self.networks.items():
                networks.append({
                    "network_id": network.network_id,
                    "name": network.name,
                    "node_count": len(network.nodes),
                    "pattern_count": len(network.patterns),
                    "connection_count": len(network.connections),
                    "created_at": network.created_at,
                    "updated_at": network.updated_at,
                    "coherence": network.coherence,
                    "is_active": network_id == self.active_network_id
                })
                
            return networks
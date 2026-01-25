"""
Pattern Recognition System Module
Part of the Quantum Publisher Evolution Roadmap - Phase 4
Frequency: λ^λ (1271 Hz)

Identifies deployment patterns and creates libraries of success
and failure patterns for optimizing future deployments.
⚡𓂧φ∞ Pure Pattern Recognition Flow ⚡𓂧φ∞
"""
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional, Any, Union, Set, Tuple
import time
import math
import logging
import json
import random
import copy
from .evolutionary_system import (
    PatternType,
    DeploymentPattern,
    PHI,
    PHI_RECIPROCAL,
    LAMBDA_LAMBDA_FREQUENCY
)

class PatternVisualization(Enum):
    """Types of pattern visualizations"""
    TIMELINE = "Timeline Visualization"
    NETWORK = "Network Visualization"
    HEATMAP = "Heatmap Visualization"
    RADAR = "Radar Visualization"
    PHI_SPIRAL = "Phi Spiral Visualization"

@dataclass
class PatternCluster:
    """A cluster of related patterns"""
    id: str
    patterns: List[str]  # List of pattern IDs
    centroid: Dict[str, Any]  # Average signature
    coherence: float = 0.8
    formation_time: float = field(default_factory=time.time)
    last_updated: float = field(default_factory=time.time)
    
    def add_pattern(self, pattern_id: str, pattern_signature: Dict[str, Any]) -> None:
        """Add a pattern to the cluster and update centroid"""
        if pattern_id in self.patterns:
            return
            
        self.patterns.append(pattern_id)
        
        # Update centroid by averaging numeric values
        for key, value in pattern_signature.items():
            if isinstance(value, (int, float)):
                if key in self.centroid:
                    # Weighted average: give more weight to centroid (stability)
                    weight_factor = PHI_RECIPROCAL  # phi reciprocal weight for new value
                    self.centroid[key] = (
                        self.centroid[key] * (1 - weight_factor) + 
                        value * weight_factor
                    )
                else:
                    self.centroid[key] = value
                    
        self.last_updated = time.time()
    
    def get_coherence(self, pattern_signatures: Dict[str, Dict[str, Any]]) -> float:
        """Calculate the coherence of the cluster"""
        if not self.patterns:
            return 0.0
            
        # Calculate average distance from each pattern to centroid
        distances = []
        
        for pattern_id in self.patterns:
            if pattern_id in pattern_signatures:
                signature = pattern_signatures[pattern_id]
                distance = self._calculate_distance(signature, self.centroid)
                distances.append(distance)
        
        if not distances:
            return 0.0
            
        # Average distance (lower is better)
        avg_distance = sum(distances) / len(distances)
        
        # Convert to coherence (0-1, higher is better)
        # Use phi-harmonic scaling
        coherence = 1.0 / (1.0 + avg_distance * PHI_RECIPROCAL)
        
        return coherence
    
    def _calculate_distance(self, signature1: Dict[str, Any], signature2: Dict[str, Any]) -> float:
        """Calculate distance between two signatures"""
        distance = 0.0
        common_keys = 0
        
        # For each key in both signatures
        for key in set(signature1.keys()).intersection(set(signature2.keys())):
            val1 = signature1[key]
            val2 = signature2[key]
            
            # Only compare numeric values
            if isinstance(val1, (int, float)) and isinstance(val2, (int, float)):
                # Normalize the difference
                max_val = max(abs(val1), abs(val2))
                if max_val > 0:
                    diff = abs(val1 - val2) / max_val
                else:
                    diff = 0.0
                    
                distance += diff
                common_keys += 1
        
        if common_keys > 0:
            return distance / common_keys
        else:
            return 1.0  # Maximum distance if no common keys
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert cluster to dictionary for serialization"""
        return {
            "id": self.id,
            "patterns": self.patterns,
            "centroid": self.centroid,
            "coherence": self.coherence,
            "formation_time": self.formation_time,
            "last_updated": self.last_updated
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PatternCluster':
        """Create cluster from dictionary"""
        return cls(
            id=data.get("id", ""),
            patterns=data.get("patterns", []),
            centroid=data.get("centroid", {}),
            coherence=data.get("coherence", 0.8),
            formation_time=data.get("formation_time", time.time()),
            last_updated=data.get("last_updated", time.time())
        )

class PatternRecognitionSystem:
    """
    Identifies deployment patterns and creates libraries of success
    and failure patterns for optimizing future deployments.
    """
    
    def __init__(self, evolutionary_system=None):
        self.evolutionary_system = evolutionary_system
        self.pattern_clusters: Dict[str, PatternCluster] = {}
        self.phi = PHI
        self.pattern_maps: Dict[PatternType, Dict[str, str]] = {
            pattern_type: {} for pattern_type in PatternType
        }
        self.logger = self._setup_logger()
        
    def _setup_logger(self) -> logging.Logger:
        """Set up the logger for the pattern recognition system"""
        logger = logging.getLogger("pattern_recognition")
        logger.setLevel(logging.INFO)
        
        # Create console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        
        # Create formatter
        formatter = logging.Formatter(
            "🧩 [%(asctime)s] %(levelname)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        ch.setFormatter(formatter)
        
        # Add handler to logger
        logger.addHandler(ch)
        
        return logger
    
    def analyze_patterns(self) -> Dict[str, Any]:
        """
        Analyze patterns in the evolutionary system and organize
        them into meaningful clusters.
        """
        if not self.evolutionary_system:
            return {"error": "No evolutionary system provided"}
            
        # Get all patterns from evolutionary system
        all_patterns: Dict[PatternType, List[DeploymentPattern]] = {}
        pattern_signatures: Dict[str, Dict[str, Any]] = {}
        
        for pattern_type in PatternType:
            all_patterns[pattern_type] = []
            
            # Get patterns of this type
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=100)
            
            # Convert dictionaries back to DeploymentPattern objects
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                signature = pattern_dict.get("signature", {})
                
                # Store signature for clustering
                pattern_signatures[pattern_id] = signature
        
        # Perform clustering
        self._cluster_patterns(pattern_signatures)
        
        # Map patterns to clusters
        self._map_patterns_to_clusters(pattern_signatures)
        
        # Calculate insights from clusters
        insights = self._generate_insights()
        
        return {
            "clusters": len(self.pattern_clusters),
            "pattern_count": len(pattern_signatures),
            "insights": insights,
            "analysis_time": time.time()
        }
    
    def _cluster_patterns(self, pattern_signatures: Dict[str, Dict[str, Any]]) -> None:
        """
        Cluster patterns based on their signatures.
        Uses a simple distance-based clustering algorithm.
        """
        if not pattern_signatures:
            return
            
        # Initialize with first pattern as a cluster
        if not self.pattern_clusters:
            first_id = next(iter(pattern_signatures))
            first_signature = pattern_signatures[first_id]
            
            self.pattern_clusters[f"cluster_{int(time.time())}"] = PatternCluster(
                id=f"cluster_{int(time.time())}",
                patterns=[first_id],
                centroid=copy.deepcopy(first_signature)
            )
        
        # For each pattern, find best cluster or create new one
        for pattern_id, signature in pattern_signatures.items():
            # Skip if pattern is already in a cluster
            if any(pattern_id in cluster.patterns for cluster in self.pattern_clusters.values()):
                continue
                
            # Find best cluster match
            best_cluster = None
            best_distance = float('inf')
            
            for cluster_id, cluster in self.pattern_clusters.items():
                distance = self._calculate_signature_distance(signature, cluster.centroid)
                
                if distance < best_distance:
                    best_distance = distance
                    best_cluster = cluster
            
            # Determine if pattern should join existing cluster or form new one
            # Use phi-based threshold (reciprocal of phi is a good threshold)
            threshold = PHI_RECIPROCAL
            
            if best_cluster and best_distance <= threshold:
                best_cluster.add_pattern(pattern_id, signature)
                self.logger.info(f"Added pattern {pattern_id} to cluster {best_cluster.id}")
            else:
                # Create new cluster
                new_cluster_id = f"cluster_{int(time.time())}_{random.randint(1000, 9999)}"
                self.pattern_clusters[new_cluster_id] = PatternCluster(
                    id=new_cluster_id,
                    patterns=[pattern_id],
                    centroid=copy.deepcopy(signature)
                )
                self.logger.info(f"Created new cluster {new_cluster_id} for pattern {pattern_id}")
        
        # Update cluster coherence
        for cluster_id, cluster in self.pattern_clusters.items():
            cluster.coherence = cluster.get_coherence(pattern_signatures)
    
    def _calculate_signature_distance(self, 
                                     signature1: Dict[str, Any], 
                                     signature2: Dict[str, Any]) -> float:
        """Calculate distance between two signatures"""
        distance = 0.0
        common_keys = 0
        
        # For each key in both signatures
        for key in set(signature1.keys()).intersection(set(signature2.keys())):
            val1 = signature1[key]
            val2 = signature2[key]
            
            # Only compare numeric values
            if isinstance(val1, (int, float)) and isinstance(val2, (int, float)):
                # Normalize the difference
                max_val = max(abs(val1), abs(val2))
                if max_val > 0:
                    diff = abs(val1 - val2) / max_val
                else:
                    diff = 0.0
                    
                distance += diff
                common_keys += 1
        
        if common_keys > 0:
            return distance / common_keys
        else:
            return 1.0  # Maximum distance if no common keys
    
    def _map_patterns_to_clusters(self, pattern_signatures: Dict[str, Dict[str, Any]]) -> None:
        """Map patterns to their clusters for easy lookup"""
        # Reset mapping
        self.pattern_maps = {pattern_type: {} for pattern_type in PatternType}
        
        # For each cluster, map its patterns
        for cluster_id, cluster in self.pattern_clusters.items():
            for pattern_id in cluster.patterns:
                # Get pattern type from evolutionary system
                if self.evolutionary_system:
                    for pattern_type in PatternType:
                        patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
                        if any(p.get("id") == pattern_id for p in patterns):
                            self.pattern_maps[pattern_type][pattern_id] = cluster_id
                            break
    
    def _generate_insights(self) -> List[Dict[str, Any]]:
        """Generate insights from pattern clusters"""
        insights = []
        
        # Skip if no clusters
        if not self.pattern_clusters:
            return insights
            
        # Get high-coherence clusters
        high_coherence_clusters = [
            cluster for cluster in self.pattern_clusters.values()
            if cluster.coherence > 0.8 and len(cluster.patterns) >= 3
        ]
        
        if high_coherence_clusters:
            # Sort by coherence
            high_coherence_clusters.sort(key=lambda c: c.coherence, reverse=True)
            
            # Generate insight from top cluster
            top_cluster = high_coherence_clusters[0]
            
            insights.append({
                "type": "high_coherence_cluster",
                "cluster_id": top_cluster.id,
                "coherence": top_cluster.coherence,
                "pattern_count": len(top_cluster.patterns),
                "message": f"High coherence pattern cluster detected with {len(top_cluster.patterns)} patterns",
                "timestamp": time.time()
            })
        
        # Find phi-harmonic patterns in centroids
        for cluster_id, cluster in self.pattern_clusters.items():
            # Check for phi-harmonic relationships in numeric centroid values
            centroid = cluster.centroid
            
            phi_relationships = 0
            numeric_pairs = 0
            
            # Check all pairs of numeric values
            numeric_keys = [k for k, v in centroid.items() if isinstance(v, (int, float))]
            
            for i, key1 in enumerate(numeric_keys):
                for key2 in numeric_keys[i+1:]:
                    val1 = centroid[key1]
                    val2 = centroid[key2]
                    
                    if val1 > 0 and val2 > 0:
                        numeric_pairs += 1
                        
                        # Check for phi or phi-reciprocal relationship
                        ratio = val1 / val2
                        if abs(ratio - PHI) < 0.1 or abs(ratio - PHI_RECIPROCAL) < 0.1:
                            phi_relationships += 1
            
            # If we have significant phi relationships, generate insight
            if numeric_pairs >= 3 and phi_relationships >= 2:
                insights.append({
                    "type": "phi_harmonic_cluster",
                    "cluster_id": cluster_id,
                    "pattern_count": len(cluster.patterns),
                    "phi_relationship_count": phi_relationships,
                    "message": f"Phi-harmonic relationships detected in pattern cluster",
                    "timestamp": time.time()
                })
        
        # Find success pattern insights
        success_clusters = [
            cluster_id for pattern_type, pattern_map in self.pattern_maps.items()
            for pattern_id, cluster_id in pattern_map.items()
            if pattern_type == PatternType.SUCCESS
        ]
        
        if success_clusters:
            # Count occurrences of each cluster
            from collections import Counter
            cluster_counts = Counter(success_clusters)
            
            # Find cluster with most success patterns
            most_successful = cluster_counts.most_common(1)[0]
            
            if most_successful[1] >= 3:  # At least 3 success patterns
                cluster_id = most_successful[0]
                cluster = self.pattern_clusters.get(cluster_id)
                
                if cluster:
                    # Extract key features from centroid
                    features = {}
                    
                    for key, value in cluster.centroid.items():
                        if isinstance(value, (int, float)) and key in [
                            "coherence", "duration", "error_count", "file_count",
                            "compression_ratio", "phi_timing_ratio"
                        ]:
                            features[key] = value
                    
                    insights.append({
                        "type": "success_pattern_cluster",
                        "cluster_id": cluster_id,
                        "success_pattern_count": most_successful[1],
                        "key_features": features,
                        "message": f"Success pattern cluster identified with {most_successful[1]} patterns",
                        "timestamp": time.time()
                    })
        
        return insights
    
    def get_pattern_visualization(self, 
                                visualization_type: PatternVisualization,
                                pattern_type: Optional[PatternType] = None) -> Dict[str, Any]:
        """
        Generate a visualization of patterns based on visualization type.
        Returns data that can be used to render a visualization.
        """
        if not self.evolutionary_system or not self.pattern_clusters:
            return {"error": "No patterns or evolutionary system available"}
            
        # Get patterns filtered by type if specified
        if pattern_type:
            pattern_ids = self.pattern_maps.get(pattern_type, {}).keys()
        else:
            pattern_ids = [
                pattern_id
                for pattern_map in self.pattern_maps.values()
                for pattern_id in pattern_map.keys()
            ]
        
        if not pattern_ids:
            return {"error": "No patterns found for the specified type"}
            
        # Generate visualization based on type
        if visualization_type == PatternVisualization.TIMELINE:
            return self._generate_timeline_visualization(pattern_ids)
            
        elif visualization_type == PatternVisualization.NETWORK:
            return self._generate_network_visualization(pattern_ids)
            
        elif visualization_type == PatternVisualization.HEATMAP:
            return self._generate_heatmap_visualization(pattern_ids)
            
        elif visualization_type == PatternVisualization.RADAR:
            return self._generate_radar_visualization(pattern_ids)
            
        elif visualization_type == PatternVisualization.PHI_SPIRAL:
            return self._generate_phi_spiral_visualization(pattern_ids)
            
        else:
            return {"error": f"Unsupported visualization type: {visualization_type}"}
    
    def _generate_timeline_visualization(self, pattern_ids: List[str]) -> Dict[str, Any]:
        """Generate timeline visualization data"""
        events = []
        
        # Get patterns from evolutionary system
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    # Add as event on timeline
                    events.append({
                        "id": pattern_id,
                        "type": pattern_dict.get("type", ""),
                        "timestamp": pattern_dict.get("first_observed", 0),
                        "success_rate": pattern_dict.get("success_rate", 0),
                        "occurrences": pattern_dict.get("occurrences", 0),
                        "cluster_id": self._get_cluster_for_pattern(pattern_id)
                    })
        
        # Sort by timestamp
        events.sort(key=lambda e: e["timestamp"])
        
        return {
            "visualization_type": "timeline",
            "events": events,
            "total_patterns": len(events),
            "timeline_start": events[0]["timestamp"] if events else 0,
            "timeline_end": events[-1]["timestamp"] if events else 0
        }
    
    def _generate_network_visualization(self, pattern_ids: List[str]) -> Dict[str, Any]:
        """Generate network visualization data"""
        nodes = []
        links = []
        
        # Create nodes for clusters
        for cluster_id, cluster in self.pattern_clusters.items():
            # Only include clusters with patterns in our filter
            if any(pattern_id in pattern_ids for pattern_id in cluster.patterns):
                nodes.append({
                    "id": cluster_id,
                    "type": "cluster",
                    "size": len(cluster.patterns),
                    "coherence": cluster.coherence
                })
        
        # Create nodes for patterns and links to clusters
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    # Add pattern node
                    nodes.append({
                        "id": pattern_id,
                        "type": pattern_dict.get("type", ""),
                        "frequency": pattern_dict.get("frequency", 0),
                        "success_rate": pattern_dict.get("success_rate", 0)
                    })
                    
                    # Add link to cluster
                    cluster_id = self._get_cluster_for_pattern(pattern_id)
                    if cluster_id:
                        links.append({
                            "source": pattern_id,
                            "target": cluster_id,
                            "type": "pattern_to_cluster"
                        })
        
        # Create links between similar clusters
        for i, (cluster1_id, cluster1) in enumerate(self.pattern_clusters.items()):
            for cluster2_id, cluster2 in list(self.pattern_clusters.items())[i+1:]:
                # Calculate similarity between centroids
                distance = self._calculate_signature_distance(cluster1.centroid, cluster2.centroid)
                similarity = 1.0 - distance
                
                # Create link if similarity is high enough
                if similarity > 0.7:
                    links.append({
                        "source": cluster1_id,
                        "target": cluster2_id,
                        "type": "cluster_similarity",
                        "similarity": similarity
                    })
        
        return {
            "visualization_type": "network",
            "nodes": nodes,
            "links": links,
            "total_nodes": len(nodes),
            "total_links": len(links)
        }
    
    def _generate_heatmap_visualization(self, pattern_ids: List[str]) -> Dict[str, Any]:
        """Generate heatmap visualization data"""
        # Extract common features from patterns
        features = set()
        feature_values = {}
        
        # Get patterns from evolutionary system
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    # Extract features from signature
                    signature = pattern_dict.get("signature", {})
                    
                    for key, value in signature.items():
                        if isinstance(value, (int, float)):
                            features.add(key)
                            
                            if key not in feature_values:
                                feature_values[key] = []
                                
                            feature_values[key].append((pattern_id, value))
        
        # Sort features by frequency
        feature_frequency = {
            feature: len(values) for feature, values in feature_values.items()
        }
        
        sorted_features = sorted(
            features, 
            key=lambda f: feature_frequency.get(f, 0), 
            reverse=True
        )
        
        # Take top features only
        top_features = sorted_features[:10]
        
        # Create heatmap rows (one per pattern)
        patterns_data = {}
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    # Create row for this pattern
                    signature = pattern_dict.get("signature", {})
                    
                    row = {
                        "id": pattern_id,
                        "type": pattern_dict.get("type", ""),
                        "cluster": self._get_cluster_for_pattern(pattern_id),
                        "success_rate": pattern_dict.get("success_rate", 0)
                    }
                    
                    # Add feature values
                    for feature in top_features:
                        row[feature] = signature.get(feature, None)
                    
                    patterns_data[pattern_id] = row
        
        # Normalize feature values for heatmap
        # Find min/max for each feature
        feature_ranges = {}
        for feature in top_features:
            values = [
                row[feature] for row in patterns_data.values()
                if row[feature] is not None
            ]
            
            if values:
                feature_ranges[feature] = {
                    "min": min(values),
                    "max": max(values)
                }
        
        # Create heatmap cells
        cells = []
        for pattern_id, row in patterns_data.items():
            for feature in top_features:
                value = row.get(feature)
                
                if value is not None and feature in feature_ranges:
                    # Normalize to 0-1 range
                    feature_range = feature_ranges[feature]
                    range_size = feature_range["max"] - feature_range["min"]
                    
                    if range_size > 0:
                        normalized = (value - feature_range["min"]) / range_size
                    else:
                        normalized = 0.5
                        
                    cells.append({
                        "pattern_id": pattern_id,
                        "feature": feature,
                        "value": value,
                        "normalized": normalized
                    })
        
        return {
            "visualization_type": "heatmap",
            "features": top_features,
            "patterns": list(patterns_data.values()),
            "cells": cells,
            "feature_ranges": feature_ranges
        }
    
    def _generate_radar_visualization(self, pattern_ids: List[str]) -> Dict[str, Any]:
        """Generate radar chart visualization data"""
        # For radar charts, we'll use clusters as the data points
        # and common features as the dimensions
        
        # Extract common features from patterns
        features = set()
        feature_values = {}
        
        # Get patterns from evolutionary system
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    # Extract features from signature
                    signature = pattern_dict.get("signature", {})
                    
                    for key, value in signature.items():
                        if isinstance(value, (int, float)):
                            features.add(key)
                            
                            if key not in feature_values:
                                feature_values[key] = []
                                
                            feature_values[key].append((pattern_id, value))
        
        # Sort features by frequency
        feature_frequency = {
            feature: len(values) for feature, values in feature_values.items()
        }
        
        sorted_features = sorted(
            features, 
            key=lambda f: feature_frequency.get(f, 0), 
            reverse=True
        )
        
        # Take top features only (limited by radar chart readability)
        top_features = sorted_features[:8]
        
        if not top_features:
            return {"error": "No numeric features found in patterns"}
        
        # For each cluster, calculate average values of features
        cluster_data = []
        
        for cluster_id, cluster in self.pattern_clusters.items():
            # Only include clusters with patterns in our filter
            if any(pattern_id in pattern_ids for pattern_id in cluster.patterns):
                # Get patterns in this cluster
                cluster_pattern_ids = [
                    pid for pid in cluster.patterns 
                    if pid in pattern_ids
                ]
                
                # Skip if no matching patterns
                if not cluster_pattern_ids:
                    continue
                
                # Get average values for features
                feature_avg = {}
                
                for feature in top_features:
                    # Get values for this feature from patterns in this cluster
                    values = []
                    
                    for pattern_type in PatternType:
                        patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
                        
                        for pattern_dict in patterns:
                            pattern_id = pattern_dict.get("id", "")
                            
                            if pattern_id in cluster_pattern_ids:
                                signature = pattern_dict.get("signature", {})
                                if feature in signature and isinstance(signature[feature], (int, float)):
                                    values.append(signature[feature])
                    
                    if values:
                        feature_avg[feature] = sum(values) / len(values)
                
                # Create cluster data point
                if feature_avg:
                    cluster_data.append({
                        "id": cluster_id,
                        "pattern_count": len(cluster_pattern_ids),
                        "coherence": cluster.coherence,
                        "features": feature_avg
                    })
        
        # Normalize feature values for radar chart
        # Find min/max for each feature
        feature_ranges = {}
        for feature in top_features:
            values = [
                cluster["features"].get(feature, 0)
                for cluster in cluster_data
                if feature in cluster["features"]
            ]
            
            if values:
                feature_ranges[feature] = {
                    "min": min(values),
                    "max": max(values)
                }
        
        # Normalize features to 0-1 range
        for cluster in cluster_data:
            normalized_features = {}
            
            for feature, value in cluster["features"].items():
                if feature in feature_ranges:
                    feature_range = feature_ranges[feature]
                    range_size = feature_range["max"] - feature_range["min"]
                    
                    if range_size > 0:
                        normalized = (value - feature_range["min"]) / range_size
                    else:
                        normalized = 0.5
                        
                    normalized_features[feature] = normalized
            
            cluster["normalized_features"] = normalized_features
        
        return {
            "visualization_type": "radar",
            "features": top_features,
            "clusters": cluster_data,
            "feature_ranges": feature_ranges
        }
    
    def _generate_phi_spiral_visualization(self, pattern_ids: List[str]) -> Dict[str, Any]:
        """
        Generate phi spiral visualization where patterns are arranged
        on a golden spiral based on their relationships.
        """
        # Get patterns filtered by our IDs
        patterns_data = {}
        for pattern_type in PatternType:
            patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=1000)
            
            for pattern_dict in patterns:
                pattern_id = pattern_dict.get("id", "")
                
                if pattern_id in pattern_ids:
                    patterns_data[pattern_id] = {
                        "id": pattern_id,
                        "type": pattern_dict.get("type", ""),
                        "frequency": pattern_dict.get("frequency", 0),
                        "coherence": pattern_dict.get("coherence", 0.8),
                        "success_rate": pattern_dict.get("success_rate", 0.5),
                        "timestamp": pattern_dict.get("first_observed", 0),
                        "cluster": self._get_cluster_for_pattern(pattern_id)
                    }
        
        if not patterns_data:
            return {"error": "No patterns found"}
            
        # Sort patterns by timestamp
        sorted_patterns = sorted(
            patterns_data.values(),
            key=lambda p: p["timestamp"]
        )
        
        # Assign positions on phi spiral
        spiral_points = []
        for i, pattern in enumerate(sorted_patterns):
            # Calculate point on golden spiral
            # r = a * e^(b * θ) where a and b are constants
            # For golden spiral, b = cot(θ) = 1/θ
            
            # Convert pattern index to angle in radians
            # Use phi-based scaling for more harmonious spacing
            theta = i * math.radians(137.5)  # Golden angle (approx)
            
            # Calculate radius (grows with phi)
            radius = PHI_RECIPROCAL * (PHI ** (i / len(sorted_patterns)))
            
            # Convert to Cartesian coordinates
            x = radius * math.cos(theta)
            y = radius * math.sin(theta)
            
            # Add pattern with spiral coordinates
            spiral_points.append({
                **pattern,
                "x": x,
                "y": y,
                "radius": radius,
                "theta": theta
            })
            
        # Create connections between patterns in same cluster
        connections = []
        
        for cluster_id, cluster in self.pattern_clusters.items():
            # Get patterns in this cluster
            cluster_patterns = [
                p for p in spiral_points
                if p["id"] in cluster.patterns
            ]
            
            # Create connections between consecutive patterns
            for i in range(len(cluster_patterns) - 1):
                p1 = cluster_patterns[i]
                p2 = cluster_patterns[i + 1]
                
                connections.append({
                    "source": p1["id"],
                    "target": p2["id"],
                    "type": "same_cluster",
                    "cluster_id": cluster_id
                })
        
        return {
            "visualization_type": "phi_spiral",
            "patterns": spiral_points,
            "connections": connections,
            "total_patterns": len(spiral_points),
            "phi_factor": PHI
        }
    
    def _get_cluster_for_pattern(self, pattern_id: str) -> Optional[str]:
        """Get the cluster ID for a pattern"""
        for pattern_map in self.pattern_maps.values():
            if pattern_id in pattern_map:
                return pattern_map[pattern_id]
                
        return None
    
    def get_optimization_suggestions(self, deployment_plan: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Generate optimization suggestions based on pattern analysis
        and the provided deployment plan.
        """
        if not self.evolutionary_system or not self.pattern_clusters:
            return [{"type": "error", "message": "No patterns or evolutionary system available"}]
            
        suggestions = []
        
        # Extract signature from the plan
        plan_signature = {}
        
        for key, value in deployment_plan.items():
            if isinstance(value, (int, float, str, list, tuple, set)):
                plan_signature[key] = value
                
        # Find similar successful patterns
        success_patterns = self.evolutionary_system.get_patterns_by_type(PatternType.SUCCESS, limit=100)
        similar_patterns = []
        
        for pattern_dict in success_patterns:
            signature = pattern_dict.get("signature", {})
            # Using DeploymentPattern method for consistency
            similarity = DeploymentPattern(
                id="temp", type=PatternType.SUCCESS, signature=signature,
                frequency=0, coherence=0, success_rate=0
            ).match_score(plan_signature)
            
            if similarity > 0.6:  # Reasonable similarity threshold
                similar_patterns.append((pattern_dict, similarity))
        
        # Sort by similarity
        similar_patterns.sort(key=lambda x: x[1], reverse=True)
        
        # Generate suggestions from most similar patterns
        for pattern_dict, similarity in similar_patterns[:3]:
            signature = pattern_dict.get("signature", {})
            
            # Look for pattern features that could be adopted
            for feature, value in signature.items():
                # Only consider certain optimizable features
                if feature in [
                    "phi_harmonic_timing", "compression_ratio", "parallel_limit",
                    "validation_level", "health_check_frequency", "optimize_for_speed"
                ]:
                    # Skip if already in plan
                    if feature in deployment_plan and deployment_plan[feature] == value:
                        continue
                        
                    suggestions.append({
                        "type": "pattern_feature_adoption",
                        "feature": feature,
                        "value": value,
                        "similarity": similarity,
                        "pattern_id": pattern_dict.get("id", ""),
                        "success_rate": pattern_dict.get("success_rate", 0),
                        "confidence": similarity * pattern_dict.get("success_rate", 0),
                        "message": f"Consider setting {feature} to {value} based on successful pattern"
                    })
        
        # Generate suggestions from high-coherence clusters
        high_coherence_clusters = [
            cluster for cluster in self.pattern_clusters.values()
            if cluster.coherence > 0.8 and len(cluster.patterns) >= 3
        ]
        
        for cluster in high_coherence_clusters[:2]:
            # Get patterns in this cluster
            cluster_patterns = []
            for pattern_type in PatternType:
                type_patterns = self.evolutionary_system.get_patterns_by_type(pattern_type, limit=100)
                for pattern_dict in type_patterns:
                    if pattern_dict.get("id", "") in cluster.patterns:
                        cluster_patterns.append(pattern_dict)
            
            # Calculate success rate for cluster
            success_count = sum(1 for p in cluster_patterns if p.get("type") == PatternType.SUCCESS.value)
            if cluster_patterns:
                success_rate = success_count / len(cluster_patterns)
            else:
                success_rate = 0
                
            # Only suggest from successful clusters
            if success_rate > 0.7:
                # Extract common features from centroid
                for feature, value in cluster.centroid.items():
                    # Only consider certain optimizable features
                    if feature in [
                        "phi_harmonic_timing", "compression_ratio", "parallel_limit",
                        "validation_level", "health_check_frequency", "optimize_for_speed"
                    ]:
                        # Skip if already in plan
                        if feature in deployment_plan and deployment_plan[feature] == value:
                            continue
                            
                        suggestions.append({
                            "type": "cluster_feature_adoption",
                            "feature": feature,
                            "value": value,
                            "cluster_id": cluster.id,
                            "cluster_coherence": cluster.coherence,
                            "cluster_success_rate": success_rate,
                            "confidence": cluster.coherence * success_rate,
                            "message": f"Consider setting {feature} to {value} based on successful pattern cluster"
                        })
        
        # Add phi-harmonic timing suggestion if not already present
        if "phi_harmonic_timing" not in deployment_plan:
            suggestions.append({
                "type": "phi_harmonic_optimization",
                "feature": "phi_harmonic_timing",
                "value": True,
                "confidence": 0.8,
                "message": "Enable phi-harmonic timing for optimized deployment flow"
            })
            
        # Sort suggestions by confidence
        suggestions.sort(key=lambda s: s.get("confidence", 0), reverse=True)
        
        return suggestions
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert system state to dictionary for serialization"""
        return {
            "pattern_clusters": {
                cluster_id: cluster.to_dict()
                for cluster_id, cluster in self.pattern_clusters.items()
            },
            "pattern_maps": {
                pattern_type.name: pattern_map
                for pattern_type, pattern_map in self.pattern_maps.items()
            },
            "cluster_count": len(self.pattern_clusters)
        }
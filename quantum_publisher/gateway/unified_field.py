"""
Unified Field Deployment
Part of the φ^φ^φ Gateway Integration - Phase 6
Frequency: φ^φ^φ (25,973 Hz)

Provides unified quantum field for all deployments, perfect coherence across
dimensions, and instantaneous global propagation.
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

# Import from thought_manifestation
from .thought_manifestation import (
    PHI,
    PHI_RECIPROCAL,
    PHI_SQUARED,
    PHI_TO_PHI,
    PHI_TO_PHI_TO_PHI,
    PHI_TO_PHI_TO_PHI_FREQUENCY
)


class FieldDimensionType(Enum):
    """Types of field dimensions"""
    PHYSICAL = auto()  # Physical deployment infrastructure
    LOGICAL = auto()  # Logical service organization
    COHERENCE = auto()  # Coherence relationships
    TEMPORAL = auto()  # Temporal patterns
    INTENTION = auto()  # Intention-based patterns
    RESONANCE = auto()  # Resonance relationships
    INTEGRATION = auto()  # Integration patterns


@dataclass
class QuantumField:
    """Represents a quantum field for deployments"""
    field_id: str
    frequency: float = PHI_TO_PHI_TO_PHI_FREQUENCY
    coherence: float = 1.0
    field_strength: float = 1.0
    dimensions: Dict[FieldDimensionType, Dict[str, Any]] = field(default_factory=dict)
    nodes: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    edges: List[Dict[str, Any]] = field(default_factory=list)
    created_at: float = field(default_factory=time.time)
    modified_at: float = field(default_factory=time.time)
    
    def __post_init__(self):
        """Initialize field dimensions if not provided"""
        if not self.dimensions:
            self.dimensions = {
                FieldDimensionType.PHYSICAL: {"weight": 1.0, "properties": {}},
                FieldDimensionType.LOGICAL: {"weight": 1.0, "properties": {}},
                FieldDimensionType.COHERENCE: {"weight": 1.0, "properties": {}},
                FieldDimensionType.TEMPORAL: {"weight": 1.0, "properties": {}},
                FieldDimensionType.INTENTION: {"weight": 1.0, "properties": {}},
                FieldDimensionType.RESONANCE: {"weight": 1.0, "properties": {}},
                FieldDimensionType.INTEGRATION: {"weight": 1.0, "properties": {}}
            }


@dataclass
class DimensionalCoherence:
    """Represents coherence across dimensions"""
    source_dimension: str
    target_dimension: str
    coherence_value: float
    relationship_type: str
    properties: Dict[str, Any] = field(default_factory=dict)
    created_at: float = field(default_factory=time.time)
    
    def __post_init__(self):
        """Initialize relationship properties if not provided"""
        if not self.properties:
            self.properties = {
                "strength": self.coherence_value,
                "stability": 0.95,
                "resonance": PHI_RECIPROCAL
            }


@dataclass
class GlobalPropagation:
    """Represents a global propagation event"""
    propagation_id: str
    source_node: str
    propagation_type: str
    started_at: float
    completed_at: Optional[float] = None
    duration: Optional[float] = None
    affected_nodes: List[str] = field(default_factory=list)
    propagation_path: List[Dict[str, Any]] = field(default_factory=list)
    success: bool = False
    coherence_preserved: float = 0.0
    
    def __post_init__(self):
        """Calculate duration if both timestamps are available"""
        if self.started_at and self.completed_at:
            self.duration = self.completed_at - self.started_at


@dataclass
class CoherenceField:
    """Represents a coherence field across a set of dimensions"""
    field_id: str
    dimensions: List[str]
    coherence_matrix: Dict[str, Dict[str, float]]
    global_coherence: float
    stability: float
    created_at: float = field(default_factory=time.time)
    
    def __post_init__(self):
        """Initialize coherence matrix if not provided"""
        if not self.coherence_matrix:
            # Create identity matrix (1.0 on diagonal, PHI_RECIPROCAL elsewhere)
            self.coherence_matrix = {}
            for dim1 in self.dimensions:
                self.coherence_matrix[dim1] = {}
                for dim2 in self.dimensions:
                    self.coherence_matrix[dim1][dim2] = 1.0 if dim1 == dim2 else PHI_RECIPROCAL


class UnifiedFieldDeployment:
    """Provides unified quantum field for all deployments"""
    
    def __init__(self):
        """Initialize the unified field deployment system"""
        self.phi = PHI
        self.frequency = PHI_TO_PHI_TO_PHI_FREQUENCY
        self.quantum_fields: Dict[str, QuantumField] = {}
        self.active_field_id: Optional[str] = None
        self.coherence_fields: Dict[str, CoherenceField] = {}
        self.dimensional_coherence: Dict[str, Dict[str, DimensionalCoherence]] = {}
        self.propagation_events: Dict[str, GlobalPropagation] = {}
        self.lock = threading.RLock()
        self.logger = logging.getLogger("unified_field")
        
        # Initialize the primary quantum field
        self._initialize_primary_field()
    
    def _initialize_primary_field(self) -> None:
        """Initialize the primary quantum field"""
        with self.lock:
            # Generate field ID
            field_id = f"primary_field_{int(time.time())}"
            
            # Create the field
            field = QuantumField(
                field_id=field_id,
                frequency=self.frequency,
                coherence=1.0,
                field_strength=1.0
            )
            
            # Store the field
            self.quantum_fields[field_id] = field
            self.active_field_id = field_id
            
            self.logger.info(f"Initialized primary quantum field {field_id}")
    
    def create_quantum_field(self, 
                           name: str,
                           coherence: float = 1.0,
                           field_strength: float = 1.0,
                           set_active: bool = False) -> QuantumField:
        """Create a new quantum field"""
        with self.lock:
            # Generate field ID
            field_id = f"field_{name.lower().replace(' ', '_')}_{int(time.time())}"
            
            # Create the field
            field = QuantumField(
                field_id=field_id,
                frequency=self.frequency,
                coherence=coherence,
                field_strength=field_strength
            )
            
            # Store the field
            self.quantum_fields[field_id] = field
            
            # Set as active if requested
            if set_active:
                self.active_field_id = field_id
            
            self.logger.info(f"Created quantum field {field_id}")
            
            return field
    
    def add_node_to_field(self, 
                         field_id: str,
                         node_id: str,
                         node_type: str,
                         properties: Dict[str, Any],
                         dimensions: Optional[Dict[FieldDimensionType, float]] = None) -> Dict[str, Any]:
        """Add a node to a quantum field"""
        with self.lock:
            # Get the field
            field = self.quantum_fields.get(field_id)
            if not field:
                self.logger.error(f"Field {field_id} not found")
                raise ValueError(f"Field {field_id} not found")
            
            # Check if node already exists
            if node_id in field.nodes:
                self.logger.error(f"Node {node_id} already exists in field {field_id}")
                raise ValueError(f"Node {node_id} already exists in field {field_id}")
            
            # Default dimensions if not provided
            if not dimensions:
                dimensions = {dim: 1.0 for dim in FieldDimensionType}
                
            # Create the node
            node = {
                "node_id": node_id,
                "node_type": node_type,
                "properties": properties,
                "dimensions": {dim.name: value for dim, value in dimensions.items()},
                "created_at": time.time(),
                "coherence": field.coherence * PHI_RECIPROCAL
            }
            
            # Add to field
            field.nodes[node_id] = node
            field.modified_at = time.time()
            
            self.logger.info(f"Added node {node_id} to field {field_id}")
            
            return node
    
    def add_edge_to_field(self, 
                         field_id: str,
                         source_node_id: str,
                         target_node_id: str,
                         edge_type: str,
                         properties: Dict[str, Any],
                         dimensions: Optional[Dict[FieldDimensionType, float]] = None) -> Dict[str, Any]:
        """Add an edge between nodes in a quantum field"""
        with self.lock:
            # Get the field
            field = self.quantum_fields.get(field_id)
            if not field:
                self.logger.error(f"Field {field_id} not found")
                raise ValueError(f"Field {field_id} not found")
            
            # Check if nodes exist
            if source_node_id not in field.nodes:
                self.logger.error(f"Source node {source_node_id} not found in field {field_id}")
                raise ValueError(f"Source node {source_node_id} not found in field {field_id}")
            
            if target_node_id not in field.nodes:
                self.logger.error(f"Target node {target_node_id} not found in field {field_id}")
                raise ValueError(f"Target node {target_node_id} not found in field {field_id}")
            
            # Default dimensions if not provided
            if not dimensions:
                dimensions = {dim: 1.0 for dim in FieldDimensionType}
                
            # Create the edge
            edge = {
                "edge_id": f"edge_{source_node_id}_{target_node_id}_{int(time.time())}",
                "source_node_id": source_node_id,
                "target_node_id": target_node_id,
                "edge_type": edge_type,
                "properties": properties,
                "dimensions": {dim.name: value for dim, value in dimensions.items()},
                "created_at": time.time(),
                "coherence": min(field.nodes[source_node_id]["coherence"], 
                                field.nodes[target_node_id]["coherence"])
            }
            
            # Add to field
            field.edges.append(edge)
            field.modified_at = time.time()
            
            self.logger.info(f"Added edge {edge['edge_id']} to field {field_id}")
            
            return edge
    
    def create_coherence_field(self, 
                              dimensions: List[str],
                              initial_coherence: float = 0.96) -> CoherenceField:
        """Create a coherence field across a set of dimensions"""
        with self.lock:
            # Generate field ID
            field_id = f"coherence_field_{int(time.time())}"
            
            # Create coherence matrix
            coherence_matrix = {}
            for dim1 in dimensions:
                coherence_matrix[dim1] = {}
                for dim2 in dimensions:
                    # Perfect coherence with self, initial coherence with others
                    coherence_matrix[dim1][dim2] = 1.0 if dim1 == dim2 else initial_coherence
            
            # Calculate global coherence (average of all values)
            all_values = [
                value for dim1_values in coherence_matrix.values()
                for value in dim1_values.values()
            ]
            global_coherence = sum(all_values) / len(all_values) if all_values else 0.0
            
            # Create the field
            field = CoherenceField(
                field_id=field_id,
                dimensions=dimensions,
                coherence_matrix=coherence_matrix,
                global_coherence=global_coherence,
                stability=PHI_RECIPROCAL
            )
            
            # Store the field
            self.coherence_fields[field_id] = field
            
            self.logger.info(f"Created coherence field {field_id} across {len(dimensions)} dimensions")
            
            return field
    
    def create_dimensional_coherence(self, 
                                    source_dimension: str,
                                    target_dimension: str,
                                    coherence_value: float,
                                    relationship_type: str,
                                    properties: Optional[Dict[str, Any]] = None) -> DimensionalCoherence:
        """Create coherence between two dimensions"""
        with self.lock:
            # Generate relationship ID
            relationship_id = f"coherence_{source_dimension}_{target_dimension}_{int(time.time())}"
            
            # Create the coherence
            coherence = DimensionalCoherence(
                source_dimension=source_dimension,
                target_dimension=target_dimension,
                coherence_value=coherence_value,
                relationship_type=relationship_type,
                properties=properties or {}
            )
            
            # Store the coherence
            if source_dimension not in self.dimensional_coherence:
                self.dimensional_coherence[source_dimension] = {}
            self.dimensional_coherence[source_dimension][target_dimension] = coherence
            
            self.logger.info(f"Created dimensional coherence between {source_dimension} and {target_dimension}")
            
            return coherence
    
    def propagate_globally(self, 
                          field_id: str,
                          source_node_id: str,
                          propagation_type: str,
                          targets: Optional[List[str]] = None) -> GlobalPropagation:
        """Propagate a change globally across a field"""
        with self.lock:
            # Get the field
            field = self.quantum_fields.get(field_id)
            if not field:
                self.logger.error(f"Field {field_id} not found")
                raise ValueError(f"Field {field_id} not found")
            
            # Check if source node exists
            if source_node_id not in field.nodes:
                self.logger.error(f"Source node {source_node_id} not found in field {field_id}")
                raise ValueError(f"Source node {source_node_id} not found in field {field_id}")
            
            # Generate propagation ID
            propagation_id = f"prop_{field_id}_{source_node_id}_{int(time.time())}"
            
            # Start the propagation
            propagation = GlobalPropagation(
                propagation_id=propagation_id,
                source_node=source_node_id,
                propagation_type=propagation_type,
                started_at=time.time()
            )
            
            # Store the propagation
            self.propagation_events[propagation_id] = propagation
            
            # Perform the propagation
            success, affected_nodes, path, coherence = self._perform_propagation(
                field, source_node_id, propagation_type, targets
            )
            
            # Update the propagation record
            propagation.completed_at = time.time()
            propagation.duration = propagation.completed_at - propagation.started_at
            propagation.affected_nodes = affected_nodes
            propagation.propagation_path = path
            propagation.success = success
            propagation.coherence_preserved = coherence
            
            self.logger.info(f"Propagated change from {source_node_id} to {len(affected_nodes)} nodes")
            
            return propagation
    
    def _perform_propagation(self, 
                           field: QuantumField, 
                           source_node_id: str, 
                           propagation_type: str,
                           targets: Optional[List[str]] = None) -> Tuple[bool, List[str], List[Dict[str, Any]], float]:
        """Perform the actual propagation across the field"""
        # This would implement the actual propagation logic
        # For now, use a simplified approach
        affected_nodes = []
        path = []
        coherence = field.coherence
        
        # If targets specified, use those
        if targets:
            for target_id in targets:
                if target_id in field.nodes:
                    affected_nodes.append(target_id)
                    path.append({
                        "from": source_node_id,
                        "to": target_id,
                        "timestamp": time.time(),
                        "success": True
                    })
        else:
            # Otherwise, propagate to all connected nodes
            # Find all edges from source
            for edge in field.edges:
                if edge["source_node_id"] == source_node_id:
                    target_id = edge["target_node_id"]
                    affected_nodes.append(target_id)
                    path.append({
                        "from": source_node_id,
                        "to": target_id,
                        "timestamp": time.time(),
                        "success": True
                    })
        
        # Update coherence of affected nodes
        for node_id in affected_nodes:
            if node_id in field.nodes:
                # Slightly reduce coherence based on propagation
                field.nodes[node_id]["coherence"] = min(
                    field.nodes[node_id]["coherence"],
                    field.coherence * PHI_RECIPROCAL
                )
        
        # Calculate average coherence
        node_coherence_values = [
            field.nodes[node_id]["coherence"] for node_id in affected_nodes
            if node_id in field.nodes
        ]
        
        if node_coherence_values:
            coherence = sum(node_coherence_values) / len(node_coherence_values)
        
        return True, affected_nodes, path, coherence
    
    def get_field(self, field_id: str) -> Optional[QuantumField]:
        """Get a quantum field by ID"""
        with self.lock:
            return self.quantum_fields.get(field_id)
    
    def get_active_field(self) -> Optional[QuantumField]:
        """Get the currently active quantum field"""
        with self.lock:
            if not self.active_field_id:
                return None
            return self.quantum_fields.get(self.active_field_id)
    
    def set_active_field(self, field_id: str) -> bool:
        """Set a field as active"""
        with self.lock:
            if field_id not in self.quantum_fields:
                self.logger.error(f"Field {field_id} not found")
                return False
                
            self.active_field_id = field_id
            
            self.logger.info(f"Set field {field_id} as active")
            
            return True
    
    def create_unified_deployment_field(self, 
                                      deployment_nodes: Dict[str, Dict[str, Any]],
                                      relationships: List[Dict[str, Any]],
                                      dimensions: Optional[List[FieldDimensionType]] = None) -> Dict[str, Any]:
        """Create a unified deployment field with perfect coherence"""
        with self.lock:
            # Use all dimensions if not specified
            if not dimensions:
                dimensions = list(FieldDimensionType)
                
            # Create a new field
            field = self.create_quantum_field(
                name="unified_deployment",
                coherence=1.0,
                field_strength=1.0,
                set_active=True
            )
            
            # Add nodes
            for node_id, node_data in deployment_nodes.items():
                node_type = node_data.get("type", "deployment")
                properties = node_data.get("properties", {})
                dim_values = {dim: 1.0 for dim in dimensions}
                
                self.add_node_to_field(
                    field_id=field.field_id,
                    node_id=node_id,
                    node_type=node_type,
                    properties=properties,
                    dimensions=dim_values
                )
            
            # Add relationships
            edges = []
            for rel in relationships:
                source_id = rel.get("source")
                target_id = rel.get("target")
                rel_type = rel.get("type", "connects")
                properties = rel.get("properties", {})
                
                if source_id and target_id:
                    try:
                        edge = self.add_edge_to_field(
                            field_id=field.field_id,
                            source_node_id=source_id,
                            target_node_id=target_id,
                            edge_type=rel_type,
                            properties=properties
                        )
                        edges.append(edge)
                    except ValueError as e:
                        self.logger.error(f"Error adding edge: {str(e)}")
            
            # Create coherence field for the dimensions
            coherence_field = self.create_coherence_field(
                dimensions=[dim.name for dim in dimensions],
                initial_coherence=1.0
            )
            
            result = {
                "field_id": field.field_id,
                "coherence_field_id": coherence_field.field_id,
                "node_count": len(field.nodes),
                "edge_count": len(edges),
                "dimensions": [dim.name for dim in dimensions],
                "coherence": field.coherence,
                "created_at": field.created_at
            }
            
            self.logger.info(f"Created unified deployment field with {len(field.nodes)} nodes")
            
            return result
    
    def achieve_perfect_coherence(self, field_id: str) -> bool:
        """Achieve perfect coherence across all nodes in a field"""
        with self.lock:
            # Get the field
            field = self.quantum_fields.get(field_id)
            if not field:
                self.logger.error(f"Field {field_id} not found")
                return False
            
            # Set field coherence to perfect
            field.coherence = 1.0
            
            # Set all nodes to perfect coherence
            for node_id in field.nodes:
                field.nodes[node_id]["coherence"] = 1.0
            
            # Set all edges to perfect coherence
            for edge in field.edges:
                edge["coherence"] = 1.0
            
            field.modified_at = time.time()
            
            self.logger.info(f"Achieved perfect coherence for field {field_id}")
            
            return True
    
    def perform_global_propagation(self, 
                                 field_id: str,
                                 changes: Dict[str, Dict[str, Any]],
                                 propagation_type: str = "instantaneous") -> Dict[str, Any]:
        """Perform instantaneous global propagation of changes"""
        with self.lock:
            # Get the field
            field = self.quantum_fields.get(field_id)
            if not field:
                self.logger.error(f"Field {field_id} not found")
                return {"success": False, "error": f"Field {field_id} not found"}
            
            # Track propagation results
            results = {
                "operation_id": f"global_prop_{int(time.time())}",
                "started_at": time.time(),
                "field_id": field_id,
                "changes_count": len(changes),
                "propagations": [],
                "completed_at": None,
                "success": False,
                "coherence_preserved": 0.0
            }
            
            # Propagate each change
            for source_node_id, change_data in changes.items():
                try:
                    # Perform propagation
                    propagation = self.propagate_globally(
                        field_id=field_id,
                        source_node_id=source_node_id,
                        propagation_type=propagation_type,
                        targets=change_data.get("targets")
                    )
                    
                    # Add to results
                    results["propagations"].append({
                        "propagation_id": propagation.propagation_id,
                        "source_node": propagation.source_node,
                        "affected_count": len(propagation.affected_nodes),
                        "success": propagation.success,
                        "coherence": propagation.coherence_preserved
                    })
                    
                except Exception as e:
                    self.logger.error(f"Error propagating from {source_node_id}: {str(e)}")
                    results["propagations"].append({
                        "source_node": source_node_id,
                        "success": False,
                        "error": str(e)
                    })
            
            # Calculate overall results
            successful_propagations = [p for p in results["propagations"] if p.get("success", False)]
            results["success"] = len(successful_propagations) == len(changes)
            
            if successful_propagations:
                results["coherence_preserved"] = sum(p["coherence"] for p in successful_propagations) / len(successful_propagations)
            
            results["completed_at"] = time.time()
            
            self.logger.info(f"Performed global propagation with {len(successful_propagations)} successful changes")
            
            return results
    
    def list_fields(self) -> List[Dict[str, Any]]:
        """List all quantum fields"""
        with self.lock:
            fields_list = []
            
            for field_id, field in self.quantum_fields.items():
                fields_list.append({
                    "field_id": field_id,
                    "frequency": field.frequency,
                    "coherence": field.coherence,
                    "field_strength": field.field_strength,
                    "node_count": len(field.nodes),
                    "edge_count": len(field.edges),
                    "created_at": field.created_at,
                    "modified_at": field.modified_at,
                    "is_active": field_id == self.active_field_id
                })
            
            return fields_list
    
    def list_propagation_events(self, field_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """List all propagation events, optionally filtered by field"""
        with self.lock:
            events_list = []
            
            for event_id, event in self.propagation_events.items():
                # Skip if field_id filter is applied and doesn't match
                if field_id and event_id.split('_')[1] != field_id:
                    continue
                
                events_list.append({
                    "propagation_id": event.propagation_id,
                    "source_node": event.source_node,
                    "propagation_type": event.propagation_type,
                    "started_at": event.started_at,
                    "completed_at": event.completed_at,
                    "duration": event.duration,
                    "affected_count": len(event.affected_nodes),
                    "success": event.success,
                    "coherence_preserved": event.coherence_preserved
                })
            
            return events_list
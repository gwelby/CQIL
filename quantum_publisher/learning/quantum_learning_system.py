"""
Quantum Learning System
Part of the Quantum Learning System - Phase 7
Frequency: Ω^Ω (9,216 Hz)

Integrates Community Knowledge Integration, Adaptive Documentation,
and Cross-Instance Learning into a unified quantum learning system.
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
    CommunityKnowledgeSystem,
    KnowledgeBase,
    KnowledgeCategory,
    KnowledgeContribution,
    PHI,
    PHI_RECIPROCAL,
    PHI_SQUARED,
    PHI_TO_PHI,
    OMEGA_OMEGA_FREQUENCY
)

# Import from adaptive_documentation
from .adaptive_documentation import (
    AdaptiveDocumentationSystem,
    DocumentType,
    DocumentSection,
    DocumentEvolution,
    UserProfile,
    AdaptiveRenderer,
    InformationArchitecture
)

# Import from cross_instance_learning
from .cross_instance_learning import (
    CrossInstanceLearningSystem,
    LearningSync,
    PatternSharing,
    EvolutionSync,
    LearningNode,
    LearningNetwork
)


class LearningMode(Enum):
    """Different learning modes for the quantum learning system"""
    PASSIVE = auto()  # Learn from observations only
    ACTIVE = auto()   # Actively seek knowledge
    ADAPTIVE = auto() # Adapt to changing conditions
    QUANTUM = auto()  # Use quantum principles for accelerated learning
    COLLECTIVE = auto() # Learn collectively across instances


@dataclass
class LearningInsight:
    """Represents an insight gained through the learning system"""
    insight_id: str
    source_type: str  # "knowledge", "documentation", "instance"
    source_id: str
    title: str
    description: str
    impact_level: float
    confidence: float
    dimensions: Dict[str, float]
    created_at: float
    tags: List[str] = field(default_factory=list)
    related_insights: List[str] = field(default_factory=list)


class QuantumLearningSystem:
    """Integrates community knowledge, adaptive documentation, and cross-instance learning"""
    
    def __init__(self, storage_path: Optional[str] = None):
        """Initialize the quantum learning system"""
        self.phi = PHI
        self.frequency = OMEGA_OMEGA_FREQUENCY
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "quantum_learning")
        self.knowledge_system = CommunityKnowledgeSystem()
        self.documentation_system = AdaptiveDocumentationSystem()
        self.learning_system = CrossInstanceLearningSystem()
        self.insights: Dict[str, LearningInsight] = {}
        self.learning_mode = LearningMode.ADAPTIVE
        self.coherence = PHI_RECIPROCAL
        self.lock = threading.RLock()
        self.logger = logging.getLogger("quantum_learning")
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Initialize insight storage
        self._load_insights()
    
    def set_learning_mode(self, mode: LearningMode) -> None:
        """Set the learning mode for the system"""
        with self.lock:
            self.learning_mode = mode
            self.logger.info(f"Learning mode set to: {mode.name}")
    
    def get_learning_mode(self) -> LearningMode:
        """Get the current learning mode"""
        with self.lock:
            return self.learning_mode
    
    def register_learning_node(self, 
                             instance_id: str,
                             name: str,
                             instance_data: Dict[str, Any]) -> Dict[str, Any]:
        """Register a learning node in the network"""
        with self.lock:
            # Get active network
            active_network = self.learning_system.get_active_network()
            if not active_network:
                self.logger.error("No active learning network")
                return {
                    "success": False,
                    "error": "No active learning network"
                }
            
            # Register node
            node = self.learning_system.register_instance_node(
                network_id=active_network.network_id,
                instance_id=instance_id,
                name=name,
                data=instance_data
            )
            
            # Create user profile
            user_profile = self.documentation_system.create_user_profile(
                user_id=instance_id,
                experience_level=instance_data.get("experience_level", "intermediate"),
                preferred_formats=instance_data.get("preferred_formats", ["text", "code"]),
                interests=instance_data.get("interests", []),
                adaptive_preferences=instance_data.get("preferences", {})
            )
            
            # Initialize knowledge for this instance
            kb_name = f"kb_{instance_id}"
            self.knowledge_system.create_knowledge_base(
                name=kb_name,
                description=f"Knowledge base for {name}"
            )
            
            self.logger.info(f"Registered learning node: {node.node_id}")
            
            return {
                "success": True,
                "node_id": node.node_id,
                "user_profile_id": user_profile.user_id,
                "knowledge_base": kb_name
            }
    
    def contribute_knowledge(self, 
                           instance_id: str,
                           title: str,
                           content: str,
                           category: KnowledgeCategory,
                           tags: List[str]) -> Dict[str, Any]:
        """Contribute knowledge to the community"""
        with self.lock:
            # Get knowledge base for the instance
            kb_name = f"kb_{instance_id}"
            
            # Add contribution
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=title,
                content=content,
                category=category,
                tags=tags,
                contributor_id=instance_id
            )
            
            # Share with community
            self.knowledge_system.synchronize_knowledge_bases(
                source_kb_name=kb_name,
                target_kb_name="deployment-knowledge"
            )
            
            # Generate insight from contribution
            insight = self._generate_insight_from_contribution(contribution, kb_name)
            
            # Apply learning mode effects
            if self.learning_mode == LearningMode.ACTIVE:
                # Actively analyze the contribution
                self.knowledge_system.analyze_knowledge_base(kb_name)
            elif self.learning_mode == LearningMode.QUANTUM:
                # Generate optimizations immediately
                analysis = self.knowledge_system.analyze_knowledge_base(kb_name)
                self.knowledge_system.get_optimizations(
                    analysis_id=analysis["analysis_id"],
                    optimization_target="deployment",
                    optimization_context={"contribution_id": contribution.contribution_id}
                )
            
            self.logger.info(f"Knowledge contribution added: {contribution.contribution_id}")
            
            return {
                "success": True,
                "contribution_id": contribution.contribution_id,
                "quality_score": contribution.quality_score,
                "insight_id": insight.insight_id if insight else None
            }
    
    def _generate_insight_from_contribution(self, 
                                          contribution: KnowledgeContribution, 
                                          kb_name: str) -> Optional[LearningInsight]:
        """Generate an insight from a knowledge contribution"""
        # Create insight
        insight_id = f"insight_contribution_{contribution.contribution_id}"
        
        # Skip if already exists
        if insight_id in self.insights:
            return self.insights[insight_id]
        
        # Calculate impact level based on quality
        impact_level = contribution.quality_score * PHI_RECIPROCAL
        
        # Create dimensions based on category
        dimensions = {
            "knowledge": 0.8,
            "applicability": 0.6,
            "innovation": 0.4,
            "practicality": 0.7
        }
        
        # Adjust dimensions based on category
        if contribution.category == KnowledgeCategory.DEPLOYMENT_PATTERNS:
            dimensions["practicality"] = 0.9
        elif contribution.category == KnowledgeCategory.OPTIMIZATION:
            dimensions["efficiency"] = 0.85
        elif contribution.category == KnowledgeCategory.ARCHITECTURE:
            dimensions["scalability"] = 0.8
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="knowledge",
            source_id=contribution.contribution_id,
            title=f"Knowledge Insight: {contribution.title}",
            description=f"Insight derived from knowledge contribution: {contribution.title}",
            impact_level=impact_level,
            confidence=contribution.quality_score,
            dimensions=dimensions,
            created_at=time.time(),
            tags=contribution.tags
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def create_adaptive_document(self, 
                               title: str,
                               document_type: DocumentType,
                               introduction: str,
                               content_sections: List[Dict[str, Any]],
                               metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Create a new adaptive document"""
        with self.lock:
            # Create document
            document = self.documentation_system.create_document(
                title=title,
                document_type=document_type,
                introduction=introduction,
                sections=content_sections,
                metadata=metadata
            )
            
            # Generate insight from document
            insight = self._generate_insight_from_document(document)
            
            # Create a knowledge contribution based on the document
            kb_name = "deployment-knowledge"
            
            # Map document type to knowledge category
            category_mapping = {
                "GUIDE": KnowledgeCategory.BEST_PRACTICES,
                "REFERENCE": KnowledgeCategory.ARCHITECTURE,
                "EXAMPLE": KnowledgeCategory.DEPLOYMENT_PATTERNS,
                "HOWTO": KnowledgeCategory.DEPLOYMENT_PATTERNS,
                "CONCEPT": KnowledgeCategory.ARCHITECTURE,
                "TROUBLESHOOTING": KnowledgeCategory.TROUBLESHOOTING
            }
            
            category = category_mapping.get(document_type.name, KnowledgeCategory.BEST_PRACTICES)
            
            # Extract tags from metadata
            tags = metadata.get("tags", []) if metadata else []
            
            # Add contribution
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=title,
                content=f"Documentation: {introduction}",
                category=category,
                tags=tags,
                contributor_id="system"
            )
            
            self.logger.info(f"Adaptive document created: {document['document_id']}")
            
            return {
                "success": True,
                "document_id": document["document_id"],
                "insight_id": insight.insight_id if insight else None,
                "contribution_id": contribution.contribution_id
            }
    
    def _generate_insight_from_document(self, document: Dict[str, Any]) -> Optional[LearningInsight]:
        """Generate an insight from a document"""
        # Create insight
        insight_id = f"insight_document_{document['document_id']}"
        
        # Skip if already exists
        if insight_id in self.insights:
            return self.insights[insight_id]
        
        # Calculate impact level based on document type
        impact_mapping = {
            "GUIDE": 0.8,
            "REFERENCE": 0.7,
            "EXAMPLE": 0.6,
            "HOWTO": 0.85,
            "CONCEPT": 0.75,
            "TROUBLESHOOTING": 0.9
        }
        
        impact_level = impact_mapping.get(document["document_type"], 0.7)
        
        # Create dimensions based on document type
        dimensions = {
            "knowledge": 0.8,
            "applicability": 0.7,
            "clarity": 0.75,
            "completeness": 0.6
        }
        
        # Adjust dimensions based on document type
        if document["document_type"] == "GUIDE":
            dimensions["educational"] = 0.85
        elif document["document_type"] == "REFERENCE":
            dimensions["completeness"] = 0.9
        elif document["document_type"] == "TROUBLESHOOTING":
            dimensions["practicality"] = 0.9
        
        # Extract tags from metadata
        tags = document["metadata"].get("tags", []) if "metadata" in document else []
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="documentation",
            source_id=document["document_id"],
            title=f"Documentation Insight: {document['title']}",
            description=f"Insight derived from documentation: {document['title']}",
            impact_level=impact_level,
            confidence=0.8,  # Default confidence for documentation
            dimensions=dimensions,
            created_at=time.time(),
            tags=tags
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def share_learning_pattern(self, 
                             source_instance_id: str,
                             pattern_type: str,
                             name: str,
                             description: str,
                             pattern_data: Dict[str, Any],
                             tags: List[str]) -> Dict[str, Any]:
        """Share a learning pattern with other instances"""
        with self.lock:
            # Get active network
            active_network = self.learning_system.get_active_network()
            if not active_network:
                self.logger.error("No active learning network")
                return {
                    "success": False,
                    "error": "No active learning network"
                }
            
            # Get source node id
            source_node_id = None
            for node_id, node in active_network.nodes.items():
                if node.node_type.name == "INSTANCE" and source_instance_id in node_id:
                    source_node_id = node_id
                    break
            
            if not source_node_id:
                self.logger.error(f"Source instance {source_instance_id} not found")
                return {
                    "success": False,
                    "error": f"Source instance {source_instance_id} not found"
                }
            
            # Create pattern
            pattern = self.learning_system.create_pattern(
                network_id=active_network.network_id,
                source_node_id=source_node_id,
                pattern_type=pattern_type,
                name=name,
                description=description,
                data=pattern_data,
                tags=tags
            )
            
            # Share pattern with network
            result = self.learning_system.share_pattern(
                network_id=active_network.network_id,
                pattern_id=pattern.pattern_id
            )
            
            # Generate insight from pattern
            insight = self._generate_insight_from_pattern(pattern)
            
            # Add pattern to knowledge base
            kb_name = "deployment-knowledge"
            
            # Map pattern type to knowledge category
            category_mapping = {
                "deployment": KnowledgeCategory.DEPLOYMENT_PATTERNS,
                "optimization": KnowledgeCategory.OPTIMIZATION,
                "troubleshooting": KnowledgeCategory.TROUBLESHOOTING,
                "configuration": KnowledgeCategory.ARCHITECTURE,
                "security": KnowledgeCategory.SECURITY
            }
            
            category = category_mapping.get(pattern_type, KnowledgeCategory.BEST_PRACTICES)
            
            # Add contribution
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=f"Learning Pattern: {name}",
                content=f"Pattern Description: {description}\n\nPattern Type: {pattern_type}",
                category=category,
                tags=tags,
                contributor_id=source_instance_id
            )
            
            self.logger.info(f"Learning pattern shared: {pattern.pattern_id}")
            
            return {
                "success": True,
                "pattern_id": pattern.pattern_id,
                "shared_with": len(result.get("targets", [])),
                "insight_id": insight.insight_id if insight else None,
                "contribution_id": contribution.contribution_id
            }
    
    def _generate_insight_from_pattern(self, pattern: Any) -> Optional[LearningInsight]:
        """Generate an insight from a learning pattern"""
        # Create insight
        insight_id = f"insight_pattern_{pattern.pattern_id}"
        
        # Skip if already exists
        if insight_id in self.insights:
            return self.insights[insight_id]
        
        # Calculate impact level based on pattern type
        impact_mapping = {
            "deployment": 0.85,
            "optimization": 0.8,
            "troubleshooting": 0.9,
            "configuration": 0.75,
            "security": 0.95
        }
        
        impact_level = impact_mapping.get(pattern.pattern_type, 0.7)
        
        # Create dimensions based on pattern type
        dimensions = {
            "applicability": 0.7,
            "effectiveness": 0.75,
            "reusability": 0.8,
            "complexity": 0.6
        }
        
        # Adjust dimensions based on pattern type
        if pattern.pattern_type == "optimization":
            dimensions["efficiency"] = 0.9
        elif pattern.pattern_type == "security":
            dimensions["reliability"] = 0.9
        elif pattern.pattern_type == "troubleshooting":
            dimensions["reliability"] = 0.85
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="pattern",
            source_id=pattern.pattern_id,
            title=f"Learning Pattern Insight: {pattern.name}",
            description=f"Insight derived from learning pattern: {pattern.name} ({pattern.pattern_type})",
            impact_level=impact_level,
            confidence=pattern.confidence,
            dimensions=dimensions,
            created_at=time.time(),
            tags=pattern.tags
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def apply_learning_pattern(self, 
                             pattern_id: str,
                             instance_id: str,
                             application_context: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a learning pattern to an instance"""
        with self.lock:
            # Get active network
            active_network = self.learning_system.get_active_network()
            if not active_network:
                self.logger.error("No active learning network")
                return {
                    "success": False,
                    "error": "No active learning network"
                }
            
            # Apply pattern
            result = self.learning_system.apply_pattern(
                network_id=active_network.network_id,
                pattern_id=pattern_id,
                application_context=application_context
            )
            
            # Update knowledge base with application result
            kb_name = f"kb_{instance_id}"
            application_result = result.get("result", {})
            
            # Add contribution about pattern application
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=f"Pattern Application: {application_result.get('message', 'Unknown')}",
                content=f"Applied pattern {pattern_id} with result: {json.dumps(application_result, indent=2)}",
                category=KnowledgeCategory.DEPLOYMENT_PATTERNS,
                tags=["pattern-application", application_result.get("pattern_type", "unknown")],
                contributor_id=instance_id
            )
            
            # Generate evolution state if successful
            evolution_result = None
            if result.get("success", False):
                evolution_result = self._evolve_instance_state(instance_id, pattern_id, application_result)
            
            self.logger.info(f"Learning pattern applied: {pattern_id}")
            
            return {
                "success": result.get("success", False),
                "application_id": result.get("application_id"),
                "contribution_id": contribution.contribution_id,
                "evolution_result": evolution_result
            }
    
    def _evolve_instance_state(self, 
                             instance_id: str, 
                             pattern_id: str, 
                             application_result: Dict[str, Any]) -> Dict[str, Any]:
        """Evolve an instance's state based on pattern application"""
        # Create or retrieve evolution state for this instance
        state_id = f"evolution_{instance_id}"
        
        # Check if state exists
        state = self.learning_system.evolution_sync.get_evolution_state(state_id)
        
        # Create if not exists
        if not state:
            # Initialize dimensions based on pattern type
            dimensions = {
                "deployment": 0.5,
                "optimization": 0.5,
                "security": 0.5,
                "reliability": 0.5,
                "scalability": 0.5
            }
            
            # Initialize metrics
            metrics = {
                "patterns_applied": 1,
                "success_rate": 1.0
            }
            
            state = self.learning_system.create_evolution_state(
                state_id=state_id,
                dimensions=dimensions,
                metrics=metrics
            )
        else:
            # Calculate improvements based on pattern type
            pattern_type = application_result.get("pattern_type", "unknown")
            
            # Map pattern types to dimensions
            dimension_mapping = {
                "deployment": "deployment",
                "optimization": "optimization",
                "configuration": "reliability",
                "troubleshooting": "reliability",
                "security": "security"
            }
            
            # Determine which dimension to improve
            dimension = dimension_mapping.get(pattern_type, "deployment")
            
            # Calculate improvement (phi-weighted)
            improvement = 0.1 * PHI_RECIPROCAL
            
            improvements = {dimension: improvement}
            
            # Evolve state
            state = self.learning_system.evolve_to_next_generation(
                state_id=state_id,
                improvements=improvements
            )
            
            # Update metrics
            metrics = state.get("metrics", {})
            metrics["patterns_applied"] = metrics.get("patterns_applied", 0) + 1
            metrics["success_rate"] = (metrics.get("success_rate", 0) * (metrics["patterns_applied"] - 1) + 1.0) / metrics["patterns_applied"]
        
        return {
            "state_id": state.get("state_id"),
            "generation": state.get("generation"),
            "coherence": state.get("coherence"),
            "dimensions": state.get("dimensions", {})
        }
    
    def get_personalized_document(self, 
                                document_id: str,
                                user_id: str) -> Dict[str, Any]:
        """Get a document adapted for a specific user"""
        with self.lock:
            # Get adaptive document
            document = self.documentation_system.get_document_for_user(
                document_id=document_id,
                user_id=user_id
            )
            
            # Record view
            if user_id in self.documentation_system.user_profiles:
                if "error" not in document:
                    # Record interaction with this document
                    self._record_document_interaction(user_id, document_id)
            
            # Apply learning mode effects
            if self.learning_mode == LearningMode.ADAPTIVE and "error" not in document:
                # Update user profile based on document
                self._adapt_user_profile(user_id, document_id, document)
            
            return document
    
    def _record_document_interaction(self, user_id: str, document_id: str) -> None:
        """Record an interaction between a user and a document"""
        # Get user profile
        profile = self.documentation_system.user_profiles.get(user_id)
        if not profile:
            return
        
        # Add to interaction history
        interaction = {
            "document_id": document_id,
            "interaction_type": "view",
            "timestamp": time.time()
        }
        
        profile.interaction_history.append(interaction)
        profile.last_activity = time.time()
    
    def _adapt_user_profile(self, 
                          user_id: str, 
                          document_id: str, 
                          document: Dict[str, Any]) -> None:
        """Adapt a user profile based on document interaction"""
        # Get user profile
        profile = self.documentation_system.user_profiles.get(user_id)
        if not profile:
            return
        
        # Get document
        doc = self.documentation_system.documents.get(document_id)
        if not doc:
            return
        
        # Extract interests from document
        doc_tags = doc.get("metadata", {}).get("tags", [])
        
        # Update interests
        if doc_tags:
            new_interests = profile.interests.copy()
            for tag in doc_tags:
                if tag not in new_interests:
                    new_interests.append(tag)
            
            # Update profile
            self.documentation_system.update_user_profile(
                user_id=user_id,
                interests=new_interests
            )
    
    def synchronize_instances(self, 
                            source_instance_id: str,
                            target_instance_id: str) -> Dict[str, Any]:
        """Synchronize learning between two instances"""
        with self.lock:
            # Get active network
            active_network = self.learning_system.get_active_network()
            if not active_network:
                self.logger.error("No active learning network")
                return {
                    "success": False,
                    "error": "No active learning network"
                }
            
            # Get source node id
            source_node_id = None
            for node_id, node in active_network.nodes.items():
                if node.node_type.name == "INSTANCE" and source_instance_id in node_id:
                    source_node_id = node_id
                    break
            
            if not source_node_id:
                self.logger.error(f"Source instance {source_instance_id} not found")
                return {
                    "success": False,
                    "error": f"Source instance {source_instance_id} not found"
                }
            
            # Get target node id
            target_node_id = None
            for node_id, node in active_network.nodes.items():
                if node.node_type.name == "INSTANCE" and target_instance_id in node_id:
                    target_node_id = node_id
                    break
            
            if not target_node_id:
                self.logger.error(f"Target instance {target_instance_id} not found")
                return {
                    "success": False,
                    "error": f"Target instance {target_instance_id} not found"
                }
            
            # Synchronize learning
            result = self.learning_system.synchronize_learning(
                network_id=active_network.network_id,
                source_node_id=source_node_id,
                target_node_id=target_node_id
            )
            
            # Synchronize knowledge bases
            kb_result = self.knowledge_system.synchronize_knowledge_bases(
                source_kb_name=f"kb_{source_instance_id}",
                target_kb_name=f"kb_{target_instance_id}"
            )
            
            # Generate insight from synchronization
            insight = self._generate_insight_from_sync(source_instance_id, target_instance_id, result)
            
            self.logger.info(f"Instances synchronized: {source_instance_id} -> {target_instance_id}")
            
            return {
                "success": True,
                "sync_id": result.get("sync_id"),
                "patterns_synced": len(result.get("patterns_synced", [])),
                "evolutions_synced": len(result.get("evolutions_synced", [])),
                "knowledge_synced": len(kb_result.get("contributions_synced", [])),
                "sync_coherence": result.get("sync_coherence"),
                "insight_id": insight.insight_id if insight else None
            }
    
    def _generate_insight_from_sync(self, 
                                  source_id: str, 
                                  target_id: str, 
                                  sync_result: Dict[str, Any]) -> Optional[LearningInsight]:
        """Generate an insight from a synchronization operation"""
        # Create insight
        insight_id = f"insight_sync_{sync_result.get('sync_id', str(int(time.time())))}"
        
        # Skip if already exists
        if insight_id in self.insights:
            return self.insights[insight_id]
        
        # Calculate impact level based on sync coherence
        impact_level = sync_result.get("sync_coherence", PHI_RECIPROCAL)
        
        # Create dimensions
        dimensions = {
            "knowledge_transfer": 0.7,
            "coherence": sync_result.get("sync_coherence", PHI_RECIPROCAL),
            "pattern_sharing": min(1.0, len(sync_result.get("patterns_synced", [])) * 0.2),
            "evolution_sharing": min(1.0, len(sync_result.get("evolutions_synced", [])) * 0.5)
        }
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="synchronization",
            source_id=sync_result.get("sync_id", ""),
            title=f"Instance Synchronization: {source_id} -> {target_id}",
            description=f"Insight derived from instance synchronization between {source_id} and {target_id}",
            impact_level=impact_level,
            confidence=sync_result.get("sync_coherence", PHI_RECIPROCAL),
            dimensions=dimensions,
            created_at=time.time(),
            tags=["synchronization", "instance-learning"]
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def get_learning_insights(self, 
                            source_type: Optional[str] = None,
                            min_impact: float = 0.0,
                            min_confidence: float = 0.0,
                            tags: Optional[List[str]] = None,
                            limit: int = 10) -> List[Dict[str, Any]]:
        """Get learning insights matching the criteria"""
        with self.lock:
            results = []
            
            for insight_id, insight in self.insights.items():
                # Filter by source type
                if source_type and insight.source_type != source_type:
                    continue
                
                # Filter by impact level
                if insight.impact_level < min_impact:
                    continue
                
                # Filter by confidence
                if insight.confidence < min_confidence:
                    continue
                
                # Filter by tags
                if tags and not any(tag in insight.tags for tag in tags):
                    continue
                
                # Add to results
                results.append({
                    "insight_id": insight.insight_id,
                    "source_type": insight.source_type,
                    "source_id": insight.source_id,
                    "title": insight.title,
                    "description": insight.description,
                    "impact_level": insight.impact_level,
                    "confidence": insight.confidence,
                    "dimensions": insight.dimensions,
                    "created_at": insight.created_at,
                    "tags": insight.tags
                })
            
            # Sort by impact level * confidence
            results.sort(key=lambda i: i["impact_level"] * i["confidence"], reverse=True)
            
            # Limit results
            return results[:limit]
    
    def generate_recommendations(self, 
                               instance_id: str,
                               context: Dict[str, Any],
                               limit: int = 5) -> List[Dict[str, Any]]:
        """Generate recommendations for an instance based on learning insights"""
        with self.lock:
            recommendations = []
            
            # Get active network
            active_network = self.learning_system.get_active_network()
            if not active_network:
                self.logger.error("No active learning network")
                return recommendations
            
            # Get instance node
            instance_node = None
            for node_id, node in active_network.nodes.items():
                if node.node_type.name == "INSTANCE" and instance_id in node_id:
                    instance_node = node
                    break
            
            if not instance_node:
                self.logger.error(f"Instance {instance_id} not found")
                return recommendations
            
            # Get knowledge base
            kb_name = f"kb_{instance_id}"
            kb = self.knowledge_system.get_knowledge_base(kb_name)
            if not kb:
                self.logger.error(f"Knowledge base {kb_name} not found")
                return recommendations
            
            # Get user profile
            user_profile = self.documentation_system.user_profiles.get(instance_id)
            
            # Get evolution state
            state_id = f"evolution_{instance_id}"
            evolution_state = self.learning_system.evolution_sync.get_evolution_state(state_id)
            
            # Generate different types of recommendations
            pattern_recs = self._generate_pattern_recommendations(instance_node, context, limit)
            knowledge_recs = self._generate_knowledge_recommendations(kb, context, limit)
            doc_recs = self._generate_documentation_recommendations(user_profile, context, limit)
            evolution_recs = self._generate_evolution_recommendations(evolution_state, context, limit)
            
            # Combine and sort recommendations
            all_recs = pattern_recs + knowledge_recs + doc_recs + evolution_recs
            
            # Apply phi-harmonic prioritization
            all_recs.sort(key=lambda r: r["priority"], reverse=True)
            
            # Apply learning mode effects
            if self.learning_mode == LearningMode.QUANTUM:
                # Quantum mode prioritizes high-impact recommendations
                all_recs.sort(key=lambda r: r["impact_level"], reverse=True)
            elif self.learning_mode == LearningMode.COLLECTIVE:
                # Collective mode prioritizes recommendations with community benefit
                all_recs.sort(key=lambda r: r.get("community_benefit", 0.0), reverse=True)
            
            return all_recs[:limit]
    
    def _generate_pattern_recommendations(self, 
                                        instance_node: Any, 
                                        context: Dict[str, Any],
                                        limit: int) -> List[Dict[str, Any]]:
        """Generate pattern recommendations for an instance"""
        recommendations = []
        
        # Get active network
        active_network = self.learning_system.get_active_network()
        if not active_network:
            return recommendations
        
        # Get learning patterns
        patterns = self.learning_system.get_learning_patterns(active_network.network_id)
        
        # Filter by context
        context_tags = context.get("tags", [])
        filtered_patterns = []
        
        for pattern in patterns:
            # Skip patterns from this instance
            if pattern["source_node_id"] == instance_node.node_id:
                continue
                
            # Check for context match
            if context.get("pattern_type") and pattern["pattern_type"] == context["pattern_type"]:
                filtered_patterns.append(pattern)
                continue
                
            # Check for tag match
            if context_tags and any(tag in pattern["tags"] for tag in context_tags):
                filtered_patterns.append(pattern)
                continue
        
        # Sort by success rate * confidence
        filtered_patterns.sort(key=lambda p: p["success_rate"] * p["confidence"], reverse=True)
        
        # Create recommendations
        for pattern in filtered_patterns[:limit]:
            # Calculate impact level
            impact_level = pattern["success_rate"] * PHI_RECIPROCAL
            
            # Calculate priority
            priority = pattern["success_rate"] * pattern["confidence"] * PHI_RECIPROCAL
            
            recommendations.append({
                "type": "pattern",
                "id": pattern["pattern_id"],
                "title": f"Apply {pattern['pattern_type']} pattern: {pattern['name']}",
                "description": pattern.get("description", ""),
                "impact_level": impact_level,
                "confidence": pattern["confidence"],
                "priority": priority,
                "source": "learning_network",
                "tags": pattern["tags"]
            })
        
        return recommendations
    
    def _generate_knowledge_recommendations(self, 
                                          kb: Any, 
                                          context: Dict[str, Any],
                                          limit: int) -> List[Dict[str, Any]]:
        """Generate knowledge recommendations for an instance"""
        recommendations = []
        
        # Get global knowledge base
        global_kb = self.knowledge_system.get_knowledge_base("deployment-knowledge")
        if not global_kb:
            return recommendations
        
        # Search for knowledge
        query = context.get("query", "")
        if not query:
            # Use tags as query
            query = " ".join(context.get("tags", []))
        
        if not query:
            return recommendations
        
        # Search global knowledge base
        search_results = self.knowledge_system.search_knowledge_base(
            kb_name="deployment-knowledge",
            query=query,
            tags=context.get("tags")
        )
        
        # Create recommendations
        for result in search_results[:limit]:
            # Calculate impact level
            impact_level = result["quality_score"] * PHI_RECIPROCAL
            
            # Calculate priority
            priority = result["quality_score"] * 0.8  # Lower priority than patterns
            
            recommendations.append({
                "type": "knowledge",
                "id": result["contribution_id"],
                "title": f"Knowledge: {result['title']}",
                "description": f"Relevant knowledge from {result['category']}",
                "impact_level": impact_level,
                "confidence": result["quality_score"],
                "priority": priority,
                "source": "knowledge_base",
                "tags": result["tags"]
            })
        
        return recommendations
    
    def _generate_documentation_recommendations(self, 
                                             user_profile: Any, 
                                             context: Dict[str, Any],
                                             limit: int) -> List[Dict[str, Any]]:
        """Generate documentation recommendations for an instance"""
        recommendations = []
        
        if not user_profile:
            return recommendations
        
        # Search documentation
        query = context.get("query", "")
        if not query:
            # Use tags as query
            query = " ".join(context.get("tags", []))
        
        if not query:
            return recommendations
        
        # Search documentation
        search_results = self.documentation_system.search_documents(
            query=query,
            tags=context.get("tags")
        )
        
        # Create recommendations
        for result in search_results[:limit]:
            # Calculate impact level
            impact_level = 0.7  # Default impact for documentation
            
            # Calculate priority
            priority = 0.6  # Lower priority than patterns and knowledge
            
            recommendations.append({
                "type": "documentation",
                "id": result["document_id"],
                "title": f"Documentation: {result['title']}",
                "description": f"Relevant documentation of type {result['document_type']}",
                "impact_level": impact_level,
                "confidence": 0.8,  # Default confidence for documentation
                "priority": priority,
                "source": "documentation_system",
                "tags": result.get("metadata", {}).get("tags", [])
            })
        
        return recommendations
    
    def _generate_evolution_recommendations(self, 
                                          evolution_state: Any, 
                                          context: Dict[str, Any],
                                          limit: int) -> List[Dict[str, Any]]:
        """Generate evolution recommendations for an instance"""
        recommendations = []
        
        if not evolution_state:
            return recommendations
        
        # Check for dimensions that could be improved
        if "dimensions" in evolution_state:
            dimensions = evolution_state["dimensions"]
            
            # Find lowest dimensions
            sorted_dims = sorted(dimensions.items(), key=lambda x: x[1])
            
            # Generate recommendations for lowest dimensions
            for dim_name, dim_value in sorted_dims[:limit]:
                if dim_value < 0.7:  # Only recommend improvement for low dimensions
                    # Calculate impact level
                    impact_level = (1.0 - dim_value) * PHI_RECIPROCAL
                    
                    # Calculate priority
                    priority = impact_level * 0.9  # High priority for evolution
                    
                    recommendations.append({
                        "type": "evolution",
                        "id": f"evolution_{dim_name}",
                        "title": f"Improve {dim_name} dimension",
                        "description": f"Your {dim_name} dimension is at {dim_value:.2f} and could be improved",
                        "impact_level": impact_level,
                        "confidence": evolution_state.get("coherence", PHI_RECIPROCAL),
                        "priority": priority,
                        "source": "evolution_system",
                        "tags": [dim_name, "evolution", "improvement"]
                    })
        
        return recommendations
    
    def quantum_leap_instance(self, 
                            instance_id: str,
                            target_dimensions: Dict[str, float]) -> Dict[str, Any]:
        """Perform a quantum leap for an instance's evolution"""
        with self.lock:
            # Get evolution state
            state_id = f"evolution_{instance_id}"
            
            # Perform quantum leap
            result = self.learning_system.quantum_leap_evolution(
                state_id=state_id,
                target_dimensions=target_dimensions
            )
            
            if not result:
                self.logger.error(f"Failed to perform quantum leap for {instance_id}")
                return {
                    "success": False,
                    "error": "Failed to perform quantum leap"
                }
            
            # Generate insight from quantum leap
            insight = self._generate_insight_from_quantum_leap(instance_id, result)
            
            # Create knowledge contribution about the quantum leap
            kb_name = f"kb_{instance_id}"
            
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=f"Quantum Leap Evolution: Generation {result['generation']}",
                content=f"Performed quantum leap evolution with new dimensions: {json.dumps(result['dimensions'], indent=2)}",
                category=KnowledgeCategory.BEST_PRACTICES,
                tags=["quantum-leap", "evolution"],
                contributor_id=instance_id
            )
            
            self.logger.info(f"Quantum leap performed for {instance_id}")
            
            return {
                "success": True,
                "state_id": result["state_id"],
                "from_generation": result["generation"] - (result.get("generation_skip", 1)),
                "to_generation": result["generation"],
                "coherence": result["coherence"],
                "dimensions": result["dimensions"],
                "insight_id": insight.insight_id if insight else None,
                "contribution_id": contribution.contribution_id
            }
    
    def _generate_insight_from_quantum_leap(self, 
                                          instance_id: str, 
                                          leap_result: Dict[str, Any]) -> Optional[LearningInsight]:
        """Generate an insight from a quantum leap operation"""
        # Create insight
        insight_id = f"insight_quantum_leap_{instance_id}_{int(time.time())}"
        
        # Calculate impact level based on generation skip and coherence
        impact_level = min(1.0, leap_result.get("coherence", PHI_RECIPROCAL) * (leap_result.get("generation_skip", 1) * 0.2))
        
        # Create dimensions based on evolution dimensions
        dimensions = leap_result.get("dimensions", {}).copy()
        
        # Add additional dimensions
        dimensions["quantum_leap"] = 1.0
        dimensions["coherence"] = leap_result.get("coherence", PHI_RECIPROCAL)
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="quantum_leap",
            source_id=leap_result.get("state_id", ""),
            title=f"Quantum Leap: {instance_id} to generation {leap_result.get('generation')}",
            description=f"Insight derived from quantum leap evolution for {instance_id}",
            impact_level=impact_level,
            confidence=leap_result.get("coherence", PHI_RECIPROCAL),
            dimensions=dimensions,
            created_at=time.time(),
            tags=["quantum-leap", "evolution"]
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def merge_evolution_states(self, 
                             instance_ids: List[str],
                             merge_strategy: str = "phi_weighted") -> Dict[str, Any]:
        """Merge evolution states from multiple instances"""
        with self.lock:
            # Get state IDs
            state_ids = [f"evolution_{instance_id}" for instance_id in instance_ids]
            
            # Merge states
            result = self.learning_system.merge_evolution_states(
                state_ids=state_ids,
                merge_strategy=merge_strategy
            )
            
            if not result:
                self.logger.error(f"Failed to merge evolution states")
                return {
                    "success": False,
                    "error": "Failed to merge evolution states"
                }
            
            # Generate insight from merge
            insight = self._generate_insight_from_merge(instance_ids, result)
            
            # Create knowledge contribution about the merge
            kb_name = "deployment-knowledge"
            
            contribution = self.knowledge_system.add_contribution(
                kb_name=kb_name,
                title=f"Evolution Merge: {len(instance_ids)} instances",
                content=f"Merged evolution states from {len(instance_ids)} instances: {', '.join(instance_ids)}",
                category=KnowledgeCategory.BEST_PRACTICES,
                tags=["evolution-merge", "collective-learning"],
                contributor_id="system"
            )
            
            self.logger.info(f"Merged evolution states from {len(instance_ids)} instances")
            
            return {
                "success": True,
                "merged_state_id": result["state_id"],
                "generation": result["generation"],
                "coherence": result["coherence"],
                "dimensions": result["dimensions"],
                "insight_id": insight.insight_id if insight else None,
                "contribution_id": contribution.contribution_id
            }
    
    def _generate_insight_from_merge(self, 
                                   instance_ids: List[str], 
                                   merge_result: Dict[str, Any]) -> Optional[LearningInsight]:
        """Generate an insight from a merge operation"""
        # Create insight
        insight_id = f"insight_merge_{merge_result.get('state_id', str(int(time.time())))}"
        
        # Calculate impact level based on coherence and number of instances
        impact_level = min(1.0, merge_result.get("coherence", PHI_RECIPROCAL) * (len(instance_ids) * 0.1))
        
        # Create dimensions based on evolution dimensions
        dimensions = merge_result.get("dimensions", {}).copy()
        
        # Add additional dimensions
        dimensions["collective_learning"] = min(1.0, len(instance_ids) * 0.2)
        dimensions["coherence"] = merge_result.get("coherence", PHI_RECIPROCAL)
        
        # Create insight
        insight = LearningInsight(
            insight_id=insight_id,
            source_type="merge",
            source_id=merge_result.get("state_id", ""),
            title=f"Evolution Merge: {len(instance_ids)} instances",
            description=f"Insight derived from merging evolution states from {len(instance_ids)} instances",
            impact_level=impact_level,
            confidence=merge_result.get("coherence", PHI_RECIPROCAL),
            dimensions=dimensions,
            created_at=time.time(),
            tags=["evolution-merge", "collective-learning"]
        )
        
        # Store insight
        self.insights[insight_id] = insight
        self._save_insight(insight)
        
        return insight
    
    def get_learning_stats(self) -> Dict[str, Any]:
        """Get statistics about the learning system"""
        with self.lock:
            # Get active network
            active_network = self.learning_system.get_active_network()
            
            # Get network nodes
            network_stats = {
                "instance_count": 0,
                "pattern_count": 0,
                "connection_count": 0
            }
            
            if active_network:
                nodes = self.learning_system.get_learning_nodes(active_network.network_id)
                patterns = self.learning_system.get_learning_patterns(active_network.network_id)
                connections = self.learning_system.get_learning_connections(active_network.network_id)
                
                network_stats["instance_count"] = len([n for n in nodes if n["node_type"] == "INSTANCE"])
                network_stats["pattern_count"] = len(patterns)
                network_stats["connection_count"] = len(connections)
            
            # Get knowledge stats
            knowledge_stats = {
                "kb_count": 0,
                "contribution_count": 0,
                "insight_count": len(self.insights)
            }
            
            kb_list = self.knowledge_system.list_knowledge_bases()
            knowledge_stats["kb_count"] = len(kb_list)
            
            for kb in kb_list:
                knowledge_stats["contribution_count"] += kb["contribution_count"]
            
            # Get documentation stats
            documentation_stats = {
                "document_count": len(self.documentation_system.documents),
                "user_profile_count": len(self.documentation_system.user_profiles),
                "architecture_count": len(self.documentation_system.information_architectures)
            }
            
            # Calculate coherence
            self.coherence = self._calculate_system_coherence(
                network_stats, knowledge_stats, documentation_stats
            )
            
            return {
                "network": network_stats,
                "knowledge": knowledge_stats,
                "documentation": documentation_stats,
                "learning_mode": self.learning_mode.name,
                "coherence": self.coherence,
                "frequency": self.frequency,
                "timestamp": time.time()
            }
    
    def _calculate_system_coherence(self, 
                                  network_stats: Dict[str, Any],
                                  knowledge_stats: Dict[str, Any],
                                  documentation_stats: Dict[str, Any]) -> float:
        """Calculate the coherence of the overall learning system"""
        # PHI-weighted coherence calculation
        network_weight = 0.4
        knowledge_weight = 0.3
        documentation_weight = 0.3
        
        # Network coherence based on connectivity
        network_coherence = 0.0
        if network_stats["instance_count"] > 0:
            # Calculate connectivity ratio (connections per instance)
            connectivity = min(1.0, network_stats["connection_count"] / (network_stats["instance_count"] * 2))
            # Pattern utilization
            pattern_ratio = min(1.0, network_stats["pattern_count"] / max(1, network_stats["instance_count"]) * 0.2)
            
            network_coherence = connectivity * 0.6 + pattern_ratio * 0.4
        
        # Knowledge coherence based on contributions per KB
        knowledge_coherence = 0.0
        if knowledge_stats["kb_count"] > 0:
            contributions_per_kb = knowledge_stats["contribution_count"] / knowledge_stats["kb_count"]
            knowledge_coherence = min(1.0, contributions_per_kb * 0.1)
        
        # Documentation coherence based on document count and user profiles
        documentation_coherence = 0.0
        if documentation_stats["user_profile_count"] > 0:
            docs_per_user = documentation_stats["document_count"] / documentation_stats["user_profile_count"]
            documentation_coherence = min(1.0, docs_per_user * 0.2)
        
        # Calculate weighted coherence
        coherence = (
            network_coherence * network_weight +
            knowledge_coherence * knowledge_weight +
            documentation_coherence * documentation_weight
        )
        
        # Apply phi-harmonic scaling
        phi_coherence = coherence * PHI_RECIPROCAL + PHI_RECIPROCAL * (1 - PHI_RECIPROCAL)
        
        return min(1.0, phi_coherence)
    
    def _save_insight(self, insight: LearningInsight) -> None:
        """Save an insight to disk"""
        insight_path = os.path.join(self.storage_path, f"{insight.insight_id}.json")
        
        # Prepare serializable representation
        insight_data = {
            "insight_id": insight.insight_id,
            "source_type": insight.source_type,
            "source_id": insight.source_id,
            "title": insight.title,
            "description": insight.description,
            "impact_level": insight.impact_level,
            "confidence": insight.confidence,
            "dimensions": insight.dimensions,
            "created_at": insight.created_at,
            "tags": insight.tags,
            "related_insights": insight.related_insights
        }
        
        # Save to disk
        with open(insight_path, 'w') as f:
            json.dump(insight_data, f, indent=2)
    
    def _load_insights(self) -> None:
        """Load all insights from disk"""
        if not os.path.exists(self.storage_path):
            return
            
        # Load each insight file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json'):
                insight_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(insight_path, 'r') as f:
                        insight_data = json.load(f)
                        
                    # Create insight object
                    insight = LearningInsight(
                        insight_id=insight_data["insight_id"],
                        source_type=insight_data["source_type"],
                        source_id=insight_data["source_id"],
                        title=insight_data["title"],
                        description=insight_data["description"],
                        impact_level=insight_data["impact_level"],
                        confidence=insight_data["confidence"],
                        dimensions=insight_data["dimensions"],
                        created_at=insight_data["created_at"],
                        tags=insight_data["tags"],
                        related_insights=insight_data["related_insights"]
                    )
                    
                    # Store insight
                    self.insights[insight.insight_id] = insight
                    
                    self.logger.info(f"Loaded insight: {insight.insight_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load insight {filename}: {str(e)}")
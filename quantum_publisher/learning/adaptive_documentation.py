"""
Adaptive Documentation System
Part of the Quantum Learning System - Phase 7
Frequency: Ω^Ω (9,216 Hz)

Provides self-evolving documentation system, user-responsive knowledge presentation,
and phi-harmonic information architecture.
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


class DocumentType(Enum):
    """Types of documents in the system"""
    GUIDE = auto()  # Guides and tutorials
    REFERENCE = auto()  # API and concept references
    EXAMPLE = auto()  # Code examples
    HOWTO = auto()  # Step-by-step instructions
    CONCEPT = auto()  # Concept explanations
    TROUBLESHOOTING = auto()  # Troubleshooting guides
    BEST_PRACTICE = auto()  # Best practices


@dataclass
class DocumentSection:
    """Represents a section in a document"""
    section_id: str
    title: str
    content: str
    section_type: str
    parent_id: Optional[str] = None
    order: int = 0
    variants: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)
    is_visible: bool = True
    created_at: float = field(default_factory=time.time)
    modified_at: float = field(default_factory=time.time)


@dataclass
class DocumentEvolution:
    """Represents an evolution of a document"""
    evolution_id: str
    document_id: str
    version: str
    changes: List[Dict[str, Any]]
    created_by: str
    created_at: float
    applied: bool = False
    applied_at: Optional[float] = None
    coherence_impact: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class UserProfile:
    """Represents a user profile for adaptive documentation"""
    user_id: str
    experience_level: str  # "beginner", "intermediate", "advanced", "expert"
    preferred_formats: List[str]  # "text", "code", "diagram", "video", etc.
    interests: List[str]
    interaction_history: List[Dict[str, Any]] = field(default_factory=list)
    last_activity: float = field(default_factory=time.time)
    adaptive_preferences: Dict[str, Any] = field(default_factory=dict)
    coherence_threshold: float = PHI_RECIPROCAL  # Default to phi-reciprocal (0.618)


@dataclass
class InformationArchitecture:
    """Represents a phi-harmonic information architecture"""
    architecture_id: str
    structure_type: str  # "hierarchy", "network", "spiral", etc.
    nodes: Dict[str, Dict[str, Any]]
    edges: List[Dict[str, Any]]
    phi_ratio: float = PHI
    coherence: float = PHI_RECIPROCAL
    created_at: float = field(default_factory=time.time)
    modified_at: float = field(default_factory=time.time)
    
    def get_node_level(self, node_id: str) -> int:
        """Get the level of a node in the hierarchy"""
        if node_id not in self.nodes:
            return -1
            
        return self.nodes[node_id].get("level", 0)
    
    def get_children(self, node_id: str) -> List[str]:
        """Get the children of a node"""
        children = []
        
        for edge in self.edges:
            if edge["source"] == node_id:
                children.append(edge["target"])
                
        return children
    
    def get_parent(self, node_id: str) -> Optional[str]:
        """Get the parent of a node"""
        for edge in self.edges:
            if edge["target"] == node_id and edge.get("type") == "parent-child":
                return edge["source"]
                
        return None
    
    def get_related(self, node_id: str) -> List[Dict[str, Any]]:
        """Get related nodes with relationship types"""
        related = []
        
        for edge in self.edges:
            if edge["source"] == node_id and edge.get("type") != "parent-child":
                related.append({
                    "node_id": edge["target"],
                    "relationship": edge.get("type", "related")
                })
            elif edge["target"] == node_id and edge.get("type") != "parent-child":
                related.append({
                    "node_id": edge["source"],
                    "relationship": edge.get("type", "related")
                })
                
        return related
    
    def get_phi_path(self, from_node: str, to_node: str) -> List[str]:
        """Get the phi-harmonic path between two nodes"""
        if from_node not in self.nodes or to_node not in self.nodes:
            return []
            
        # Breadth-first search
        visited = {from_node}
        queue = [(from_node, [from_node])]
        
        while queue:
            node, path = queue.pop(0)
            
            if node == to_node:
                return path
                
            for edge in self.edges:
                if edge["source"] == node and edge["target"] not in visited:
                    visited.add(edge["target"])
                    queue.append((edge["target"], path + [edge["target"]]))
                elif edge["target"] == node and edge["source"] not in visited:
                    visited.add(edge["source"])
                    queue.append((edge["source"], path + [edge["source"]]))
                    
        return []  # No path found


class AdaptiveRenderer:
    """Provides adaptive rendering of documentation for users"""
    
    def __init__(self):
        """Initialize the adaptive renderer"""
        self.phi = PHI
        self.renderers: Dict[str, Callable] = {}
        self.format_handlers: Dict[str, Callable] = {}
        self.logger = logging.getLogger("adaptive_renderer")
        
        # Register default renderers
        self._register_default_renderers()
        
        # Register default format handlers
        self._register_default_format_handlers()
    
    def _register_default_renderers(self) -> None:
        """Register default renderers"""
        # Register document renderers
        self.renderers["document"] = self._render_document
        self.renderers["section"] = self._render_section
        self.renderers["examples"] = self._render_examples
        self.renderers["guide"] = self._render_guide
        self.renderers["reference"] = self._render_reference
        self.renderers["concept"] = self._render_concept
        self.renderers["howto"] = self._render_howto
    
    def _register_default_format_handlers(self) -> None:
        """Register default format handlers"""
        # Register format handlers
        self.format_handlers["text"] = self._format_text
        self.format_handlers["code"] = self._format_code
        self.format_handlers["diagram"] = self._format_diagram
        self.format_handlers["table"] = self._format_table
        self.format_handlers["list"] = self._format_list
    
    def register_renderer(self, renderer_type: str, renderer_func: Callable) -> None:
        """Register a custom renderer"""
        self.renderers[renderer_type] = renderer_func
    
    def register_format_handler(self, format_type: str, handler_func: Callable) -> None:
        """Register a custom format handler"""
        self.format_handlers[format_type] = handler_func
    
    def render_for_user(self, 
                       document_data: Dict[str, Any],
                       user_profile: UserProfile,
                       render_type: str = "document",
                       render_options: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Render documentation adapted for a specific user"""
        # Get the appropriate renderer
        renderer = self.renderers.get(render_type)
        if not renderer:
            self.logger.error(f"No renderer found for type: {render_type}")
            return {
                "error": f"No renderer found for type: {render_type}",
                "document_id": document_data.get("document_id", "unknown")
            }
        
        # Apply the renderer with user profile
        try:
            result = renderer(document_data, user_profile, render_options or {})
            
            # Record interaction
            self._record_interaction(user_profile, document_data, render_type)
            
            return result
        except Exception as e:
            self.logger.error(f"Error rendering document: {str(e)}")
            return {
                "error": f"Error rendering document: {str(e)}",
                "document_id": document_data.get("document_id", "unknown")
            }
    
    def _record_interaction(self, 
                          user_profile: UserProfile, 
                          document_data: Dict[str, Any],
                          render_type: str) -> None:
        """Record user interaction with documentation"""
        # Add to interaction history
        interaction = {
            "document_id": document_data.get("document_id", "unknown"),
            "document_type": document_data.get("document_type", "unknown"),
            "render_type": render_type,
            "timestamp": time.time()
        }
        
        user_profile.interaction_history.append(interaction)
        user_profile.last_activity = time.time()
    
    def _render_document(self, 
                        document_data: Dict[str, Any],
                        user_profile: UserProfile,
                        options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a complete document adapted for the user"""
        # Adapt content based on user profile
        adapted_document = self._adapt_document(document_data, user_profile)
        
        # Format specific sections
        formatted_sections = []
        for section in adapted_document.get("sections", []):
            formatted_section = self._render_section(section, user_profile, options)
            formatted_sections.append(formatted_section)
        
        # Organize sections based on phi-harmonic structure
        organized_sections = self._organize_phi_harmonic(formatted_sections, user_profile)
        
        # Create output document
        output = {
            "document_id": adapted_document.get("document_id"),
            "title": adapted_document.get("title"),
            "document_type": adapted_document.get("document_type"),
            "introduction": self._format_text(adapted_document.get("introduction", ""), user_profile),
            "sections": organized_sections,
            "metadata": adapted_document.get("metadata", {}),
            "adapted_for": {
                "user_id": user_profile.user_id,
                "experience_level": user_profile.experience_level,
                "preferred_formats": user_profile.preferred_formats,
                "adaptation_timestamp": time.time()
            }
        }
        
        return output
    
    def _adapt_document(self, 
                       document_data: Dict[str, Any],
                       user_profile: UserProfile) -> Dict[str, Any]:
        """Adapt document content based on user profile"""
        # Create a deep copy to avoid modifying original
        adapted = json.loads(json.dumps(document_data))
        
        # Adapt introduction based on experience level
        if "introduction_variants" in adapted:
            if user_profile.experience_level in adapted["introduction_variants"]:
                adapted["introduction"] = adapted["introduction_variants"][user_profile.experience_level]
        
        # Adapt sections visibility based on experience level
        visible_sections = []
        for section in adapted.get("sections", []):
            # Skip sections too advanced for user
            if section.get("min_experience") and self._experience_level_value(user_profile.experience_level) < self._experience_level_value(section["min_experience"]):
                continue
                
            # Skip sections too basic for user if they prefer to skip them
            if section.get("max_experience") and self._experience_level_value(user_profile.experience_level) > self._experience_level_value(section["max_experience"]):
                if user_profile.adaptive_preferences.get("skip_basic_content", False):
                    continue
            
            # Apply variants based on experience level
            if "variants" in section:
                if user_profile.experience_level in section["variants"]:
                    section_variant = section["variants"][user_profile.experience_level]
                    # Apply variant fields
                    for key, value in section_variant.items():
                        section[key] = value
            
            visible_sections.append(section)
        
        adapted["sections"] = visible_sections
        
        # Adapt examples based on interests
        if "examples" in adapted:
            interests = set(user_profile.interests)
            
            prioritized_examples = []
            other_examples = []
            
            for example in adapted["examples"]:
                # Check if example matches user interests
                example_tags = set(example.get("tags", []))
                if example_tags.intersection(interests):
                    prioritized_examples.append(example)
                else:
                    other_examples.append(example)
            
            # Limit number of examples based on preferences
            max_examples = user_profile.adaptive_preferences.get("max_examples", 5)
            
            # Prioritize examples matching interests
            adapted["examples"] = prioritized_examples[:max_examples]
            
            # Add other examples if there's room
            if len(adapted["examples"]) < max_examples:
                adapted["examples"].extend(other_examples[:max_examples - len(adapted["examples"])])
        
        return adapted
    
    def _experience_level_value(self, level: str) -> int:
        """Convert experience level to numeric value"""
        levels = {
            "beginner": 1,
            "intermediate": 2,
            "advanced": 3,
            "expert": 4
        }
        
        return levels.get(level.lower(), 0)
    
    def _render_section(self, 
                       section_data: Dict[str, Any],
                       user_profile: UserProfile,
                       options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a document section adapted for the user"""
        # Format content based on preferred formats
        formatted_content = self._format_content(
            section_data.get("content", ""),
            section_data.get("format", "text"),
            user_profile
        )
        
        # Format subsections recursively
        formatted_subsections = []
        for subsection in section_data.get("subsections", []):
            formatted_subsection = self._render_section(subsection, user_profile, options)
            formatted_subsections.append(formatted_subsection)
        
        # Create output section
        output = {
            "section_id": section_data.get("section_id"),
            "title": section_data.get("title"),
            "content": formatted_content,
            "format": section_data.get("format", "text"),
            "subsections": formatted_subsections,
            "metadata": section_data.get("metadata", {})
        }
        
        return output
    
    def _format_content(self, content: str, format_type: str, user_profile: UserProfile) -> str:
        """Format content based on format type and user preferences"""
        # Get the appropriate format handler
        format_handler = self.format_handlers.get(format_type)
        if not format_handler:
            self.logger.warning(f"No format handler for type: {format_type}, using default text handler")
            format_handler = self._format_text
        
        # Apply the format handler
        return format_handler(content, user_profile)
    
    def _format_text(self, content: str, user_profile: UserProfile) -> str:
        """Format text content for the user"""
        # For text, we might adapt based on experience level
        if user_profile.experience_level == "beginner":
            # Simpler language for beginners
            return content  # In a real implementation, we would simplify language
        elif user_profile.experience_level == "expert":
            # More technical language for experts
            return content  # In a real implementation, we would use more technical terms
        
        return content
    
    def _format_code(self, content: str, user_profile: UserProfile) -> str:
        """Format code content for the user"""
        # For code, we might add more or less comments based on experience
        if user_profile.experience_level == "beginner":
            # More comments for beginners
            return content  # In a real implementation, we would add more comments
        elif user_profile.experience_level == "expert":
            # Fewer comments for experts
            return content  # In a real implementation, we would remove excessive comments
        
        return content
    
    def _format_diagram(self, content: str, user_profile: UserProfile) -> str:
        """Format diagram content for the user"""
        # Diagrams might be simplified or more detailed based on experience
        return content  # In a real implementation, we would adapt diagram complexity
    
    def _format_table(self, content: str, user_profile: UserProfile) -> str:
        """Format table content for the user"""
        # Tables might have more or less columns based on experience
        return content  # In a real implementation, we would adapt table complexity
    
    def _format_list(self, content: str, user_profile: UserProfile) -> str:
        """Format list content for the user"""
        # Lists might be nested or flat based on experience
        return content  # In a real implementation, we would adapt list complexity
    
    def _organize_phi_harmonic(self, 
                              sections: List[Dict[str, Any]],
                              user_profile: UserProfile) -> List[Dict[str, Any]]:
        """Organize sections based on phi-harmonic structure"""
        # In a real implementation, we might order sections based on phi-harmonic principles
        # For now, just sort by section_id
        organized = sorted(sections, key=lambda s: s.get("section_id", ""))
        
        return organized
    
    def _render_examples(self, 
                        examples_data: Dict[str, Any],
                        user_profile: UserProfile,
                        options: Dict[str, Any]) -> Dict[str, Any]:
        """Render examples adapted for the user"""
        # Format examples based on preferred formats
        formatted_examples = []
        for example in examples_data.get("examples", []):
            formatted_example = {
                "title": example.get("title"),
                "description": self._format_text(example.get("description", ""), user_profile),
                "code": self._format_code(example.get("code", ""), user_profile),
                "tags": example.get("tags", []),
                "metadata": example.get("metadata", {})
            }
            formatted_examples.append(formatted_example)
        
        # Create output examples
        output = {
            "section_id": examples_data.get("section_id"),
            "title": examples_data.get("title"),
            "introduction": self._format_text(examples_data.get("introduction", ""), user_profile),
            "examples": formatted_examples,
            "metadata": examples_data.get("metadata", {})
        }
        
        return output
    
    def _render_guide(self, 
                     guide_data: Dict[str, Any],
                     user_profile: UserProfile,
                     options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a guide adapted for the user"""
        # For guides, we might adapt the step detail based on experience
        adapted_steps = []
        for step in guide_data.get("steps", []):
            adapted_step = {
                "step_id": step.get("step_id"),
                "title": step.get("title"),
                "content": self._format_text(step.get("content", ""), user_profile),
                "code": self._format_code(step.get("code", ""), user_profile) if "code" in step else None,
                "notes": self._format_text(step.get("notes", ""), user_profile) if "notes" in step else None
            }
            
            # Add more or fewer details based on experience
            if user_profile.experience_level == "beginner" and "beginner_tips" in step:
                adapted_step["tips"] = self._format_text(step["beginner_tips"], user_profile)
            elif user_profile.experience_level == "expert" and "advanced_details" in step:
                adapted_step["details"] = self._format_text(step["advanced_details"], user_profile)
            
            adapted_steps.append(adapted_step)
        
        # Create output guide
        output = {
            "document_id": guide_data.get("document_id"),
            "title": guide_data.get("title"),
            "introduction": self._format_text(guide_data.get("introduction", ""), user_profile),
            "prerequisites": guide_data.get("prerequisites", []),
            "steps": adapted_steps,
            "conclusion": self._format_text(guide_data.get("conclusion", ""), user_profile),
            "metadata": guide_data.get("metadata", {})
        }
        
        return output
    
    def _render_reference(self, 
                         reference_data: Dict[str, Any],
                         user_profile: UserProfile,
                         options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a reference adapted for the user"""
        # For references, we might show more or fewer details based on experience
        adapted_items = []
        for item in reference_data.get("items", []):
            adapted_item = {
                "item_id": item.get("item_id"),
                "name": item.get("name"),
                "description": self._format_text(item.get("description", ""), user_profile),
                "type": item.get("type"),
                "syntax": item.get("syntax") if "syntax" in item else None
            }
            
            # Add more or fewer examples based on experience
            if "examples" in item:
                if user_profile.experience_level == "beginner":
                    # Limit examples for beginners
                    adapted_item["examples"] = item["examples"][:1] if item["examples"] else []
                elif user_profile.experience_level == "expert":
                    # Show all examples for experts
                    adapted_item["examples"] = item["examples"]
                else:
                    # Default number of examples
                    adapted_item["examples"] = item["examples"][:2] if item["examples"] else []
            
            adapted_items.append(adapted_item)
        
        # Create output reference
        output = {
            "document_id": reference_data.get("document_id"),
            "title": reference_data.get("title"),
            "introduction": self._format_text(reference_data.get("introduction", ""), user_profile),
            "items": adapted_items,
            "metadata": reference_data.get("metadata", {})
        }
        
        return output
    
    def _render_concept(self, 
                       concept_data: Dict[str, Any],
                       user_profile: UserProfile,
                       options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a concept adapted for the user"""
        # For concepts, we might adapt the explanation depth based on experience
        if user_profile.experience_level == "beginner" and "beginner_explanation" in concept_data:
            explanation = concept_data["beginner_explanation"]
        elif user_profile.experience_level == "intermediate" and "intermediate_explanation" in concept_data:
            explanation = concept_data["intermediate_explanation"]
        elif user_profile.experience_level == "advanced" and "advanced_explanation" in concept_data:
            explanation = concept_data["advanced_explanation"]
        elif user_profile.experience_level == "expert" and "expert_explanation" in concept_data:
            explanation = concept_data["expert_explanation"]
        else:
            explanation = concept_data.get("explanation", "")
        
        # Format explanation
        formatted_explanation = self._format_text(explanation, user_profile)
        
        # Create output concept
        output = {
            "document_id": concept_data.get("document_id"),
            "title": concept_data.get("title"),
            "explanation": formatted_explanation,
            "diagram": concept_data.get("diagram") if "diagram" in concept_data else None,
            "examples": concept_data.get("examples", [])[:2],  # Limit examples
            "related_concepts": concept_data.get("related_concepts", []),
            "metadata": concept_data.get("metadata", {})
        }
        
        return output
    
    def _render_howto(self, 
                     howto_data: Dict[str, Any],
                     user_profile: UserProfile,
                     options: Dict[str, Any]) -> Dict[str, Any]:
        """Render a how-to guide adapted for the user"""
        # For how-to guides, we might adapt the detail level based on experience
        adapted_steps = []
        for step in howto_data.get("steps", []):
            # Base step data
            adapted_step = {
                "step_id": step.get("step_id"),
                "title": step.get("title"),
                "content": self._format_text(step.get("content", ""), user_profile)
            }
            
            # Add code if available
            if "code" in step:
                adapted_step["code"] = self._format_code(step["code"], user_profile)
            
            # Add screenshots if available and user prefers visuals
            if "screenshot" in step and "visual" in user_profile.preferred_formats:
                adapted_step["screenshot"] = step["screenshot"]
            
            # Add details based on experience level
            if user_profile.experience_level == "beginner" and "beginner_notes" in step:
                adapted_step["notes"] = self._format_text(step["beginner_notes"], user_profile)
            elif user_profile.experience_level == "expert" and "expert_notes" in step:
                adapted_step["notes"] = self._format_text(step["expert_notes"], user_profile)
            
            adapted_steps.append(adapted_step)
        
        # Create output how-to
        output = {
            "document_id": howto_data.get("document_id"),
            "title": howto_data.get("title"),
            "problem": self._format_text(howto_data.get("problem", ""), user_profile),
            "solution_summary": self._format_text(howto_data.get("solution_summary", ""), user_profile),
            "steps": adapted_steps,
            "troubleshooting": howto_data.get("troubleshooting", []),
            "metadata": howto_data.get("metadata", {})
        }
        
        return output


class AdaptiveDocumentationSystem:
    """Provides self-evolving documentation with user-responsive knowledge presentation"""
    
    def __init__(self, storage_path: Optional[str] = None):
        """Initialize the adaptive documentation system"""
        self.phi = PHI
        self.frequency = OMEGA_OMEGA_FREQUENCY
        self.storage_path = storage_path or os.path.join(os.path.expanduser("~"), ".quantum_publisher", "documentation")
        self.documents: Dict[str, Dict[str, Any]] = {}
        self.document_sections: Dict[str, Dict[str, DocumentSection]] = {}
        self.user_profiles: Dict[str, UserProfile] = {}
        self.evolutions: Dict[str, DocumentEvolution] = {}
        self.information_architectures: Dict[str, InformationArchitecture] = {}
        self.renderer = AdaptiveRenderer()
        self.lock = threading.RLock()
        self.logger = logging.getLogger("adaptive_documentation")
        
        # Create storage directory if it doesn't exist
        os.makedirs(self.storage_path, exist_ok=True)
        
        # Initialize default information architecture
        self._initialize_default_architecture()
    
    def _initialize_default_architecture(self) -> None:
        """Initialize the default information architecture"""
        architecture = self.create_information_architecture(
            structure_type="hierarchy",
            name="default-architecture"
        )
        
        # Add root node
        self.add_architecture_node(
            architecture_id=architecture.architecture_id,
            node_id="root",
            node_type="root",
            name="Documentation Root",
            level=0
        )
    
    def create_document(self, 
                       title: str,
                       document_type: DocumentType,
                       introduction: str,
                       sections: Optional[List[Dict[str, Any]]] = None,
                       metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Create a new document"""
        with self.lock:
            # Generate document ID
            document_id = f"doc_{document_type.name.lower()}_{int(time.time())}"
            
            # Create document object
            document = {
                "document_id": document_id,
                "title": title,
                "document_type": document_type.name,
                "introduction": introduction,
                "sections": [],
                "metadata": metadata or {},
                "created_at": time.time(),
                "modified_at": time.time(),
                "version": "1.0.0",
                "view_count": 0,
                "feedback_rating": 0.0,
                "active_architecture": "default-architecture"
            }
            
            # Initialize section storage
            self.document_sections[document_id] = {}
            
            # Add sections if provided
            if sections:
                for section_data in sections:
                    section = self.add_section(
                        document_id=document_id,
                        title=section_data["title"],
                        content=section_data["content"],
                        section_type=section_data.get("section_type", "standard"),
                        parent_id=section_data.get("parent_id"),
                        order=section_data.get("order", 0),
                        variants=section_data.get("variants", {}),
                        metadata=section_data.get("metadata", {})
                    )
                    
                    document["sections"].append(section.section_id)
            
            # Store document
            self.documents[document_id] = document
            
            # Add to default architecture
            self._add_document_to_architecture(document, "default-architecture")
            
            # Save document
            self._save_document(document)
            
            self.logger.info(f"Created document: {document_id}")
            
            return document
    
    def _add_document_to_architecture(self, document: Dict[str, Any], architecture_id: str) -> None:
        """Add a document to an information architecture"""
        # Get the architecture
        architecture = self.information_architectures.get(architecture_id)
        if not architecture:
            self.logger.error(f"Architecture {architecture_id} not found")
            return
        
        # Add document node
        self.add_architecture_node(
            architecture_id=architecture_id,
            node_id=document["document_id"],
            node_type="document",
            name=document["title"],
            level=1,
            metadata={
                "document_type": document["document_type"],
                "creation_date": document["created_at"]
            }
        )
        
        # Connect to root
        self.add_architecture_edge(
            architecture_id=architecture_id,
            source_id="root",
            target_id=document["document_id"],
            edge_type="parent-child"
        )
    
    def add_section(self, 
                   document_id: str,
                   title: str,
                   content: str,
                   section_type: str,
                   parent_id: Optional[str] = None,
                   order: int = 0,
                   variants: Optional[Dict[str, Dict[str, Any]]] = None,
                   metadata: Optional[Dict[str, Any]] = None) -> DocumentSection:
        """Add a section to a document"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                raise ValueError(f"Document {document_id} not found")
                
            # Generate section ID
            section_id = f"section_{document_id}_{int(time.time())}"
            
            # Create section object
            section = DocumentSection(
                section_id=section_id,
                title=title,
                content=content,
                section_type=section_type,
                parent_id=parent_id,
                order=order,
                variants=variants or {},
                metadata=metadata or {},
                created_at=time.time(),
                modified_at=time.time()
            )
            
            # Store section
            if document_id not in self.document_sections:
                self.document_sections[document_id] = {}
                
            self.document_sections[document_id][section_id] = section
            
            # Update document
            document = self.documents[document_id]
            if section_id not in document["sections"]:
                document["sections"].append(section_id)
                document["modified_at"] = time.time()
                
                # Save document
                self._save_document(document)
            
            # Add to document architecture
            architecture_id = document["active_architecture"]
            self._add_section_to_architecture(section, document_id, architecture_id)
            
            self.logger.info(f"Added section {section_id} to document {document_id}")
            
            return section
    
    def _add_section_to_architecture(self, 
                                   section: DocumentSection, 
                                   document_id: str,
                                   architecture_id: str) -> None:
        """Add a section to an information architecture"""
        # Get the architecture
        architecture = self.information_architectures.get(architecture_id)
        if not architecture:
            self.logger.error(f"Architecture {architecture_id} not found")
            return
        
        # Determine level
        level = 2  # Default for top-level sections
        if section.parent_id:
            # Get parent node
            parent_node = architecture.nodes.get(section.parent_id)
            if parent_node:
                level = parent_node.get("level", 1) + 1
        
        # Add section node
        self.add_architecture_node(
            architecture_id=architecture_id,
            node_id=section.section_id,
            node_type="section",
            name=section.title,
            level=level,
            metadata={
                "section_type": section.section_type,
                "document_id": document_id,
                "creation_date": section.created_at
            }
        )
        
        # Connect to parent
        parent_id = section.parent_id if section.parent_id else document_id
        self.add_architecture_edge(
            architecture_id=architecture_id,
            source_id=parent_id,
            target_id=section.section_id,
            edge_type="parent-child"
        )
    
    def update_section(self, 
                      document_id: str,
                      section_id: str,
                      title: Optional[str] = None,
                      content: Optional[str] = None,
                      section_type: Optional[str] = None,
                      order: Optional[int] = None,
                      variants: Optional[Dict[str, Dict[str, Any]]] = None,
                      metadata: Optional[Dict[str, Any]] = None) -> Optional[DocumentSection]:
        """Update a section in a document"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                self.logger.error(f"Document {document_id} not found")
                return None
                
            # Make sure section exists
            if document_id not in self.document_sections or section_id not in self.document_sections[document_id]:
                self.logger.error(f"Section {section_id} not found in document {document_id}")
                return None
                
            # Get section
            section = self.document_sections[document_id][section_id]
            
            # Update fields
            if title is not None:
                section.title = title
            if content is not None:
                section.content = content
            if section_type is not None:
                section.section_type = section_type
            if order is not None:
                section.order = order
            if variants is not None:
                section.variants = variants
            if metadata is not None:
                section.metadata = metadata
                
            # Update modified timestamp
            section.modified_at = time.time()
            
            # Update document modified timestamp
            document = self.documents[document_id]
            document["modified_at"] = time.time()
            
            # Save document
            self._save_document(document)
            
            self.logger.info(f"Updated section {section_id} in document {document_id}")
            
            return section
    
    def create_evolution(self, 
                        document_id: str,
                        version: str,
                        changes: List[Dict[str, Any]],
                        created_by: str,
                        metadata: Optional[Dict[str, Any]] = None) -> DocumentEvolution:
        """Create a document evolution"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                raise ValueError(f"Document {document_id} not found")
                
            # Generate evolution ID
            evolution_id = f"evolution_{document_id}_{int(time.time())}"
            
            # Create evolution object
            evolution = DocumentEvolution(
                evolution_id=evolution_id,
                document_id=document_id,
                version=version,
                changes=changes,
                created_by=created_by,
                created_at=time.time(),
                metadata=metadata or {}
            )
            
            # Calculate coherence impact
            evolution.coherence_impact = self._calculate_evolution_coherence(changes)
            
            # Store evolution
            self.evolutions[evolution_id] = evolution
            
            self.logger.info(f"Created evolution {evolution_id} for document {document_id}")
            
            return evolution
    
    def _calculate_evolution_coherence(self, changes: List[Dict[str, Any]]) -> float:
        """Calculate the coherence impact of document changes"""
        # PHI-weighted coherence calculation
        if not changes:
            return 0.0
            
        # Define impact values for different change types
        impact_values = {
            "add_section": 0.4,
            "update_section": 0.2,
            "remove_section": 0.3,
            "reorder_section": 0.1,
            "update_metadata": 0.05
        }
        
        # Calculate total impact
        total_impact = 0.0
        for change in changes:
            change_type = change.get("type")
            if change_type in impact_values:
                total_impact += impact_values[change_type]
        
        # Normalize to 0.0-1.0 range
        normalized_impact = min(1.0, total_impact / len(changes))
        
        # Apply phi-harmonic scaling
        coherence_impact = normalized_impact * PHI_RECIPROCAL + 0.5 * (1 - PHI_RECIPROCAL)
        
        return coherence_impact
    
    def apply_evolution(self, evolution_id: str) -> bool:
        """Apply a document evolution"""
        with self.lock:
            # Get the evolution
            evolution = self.evolutions.get(evolution_id)
            if not evolution:
                self.logger.error(f"Evolution {evolution_id} not found")
                return False
                
            # Check if already applied
            if evolution.applied:
                self.logger.error(f"Evolution {evolution_id} already applied")
                return False
                
            # Get the document
            document_id = evolution.document_id
            document = self.documents.get(document_id)
            if not document:
                self.logger.error(f"Document {document_id} not found")
                return False
                
            # Apply each change
            for change in evolution.changes:
                change_type = change.get("type")
                
                if change_type == "add_section":
                    # Add a new section
                    self.add_section(
                        document_id=document_id,
                        title=change["title"],
                        content=change["content"],
                        section_type=change["section_type"],
                        parent_id=change.get("parent_id"),
                        order=change.get("order", 0),
                        variants=change.get("variants"),
                        metadata=change.get("metadata")
                    )
                    
                elif change_type == "update_section":
                    # Update an existing section
                    self.update_section(
                        document_id=document_id,
                        section_id=change["section_id"],
                        title=change.get("title"),
                        content=change.get("content"),
                        section_type=change.get("section_type"),
                        order=change.get("order"),
                        variants=change.get("variants"),
                        metadata=change.get("metadata")
                    )
                    
                elif change_type == "remove_section":
                    # Remove a section
                    self.remove_section(
                        document_id=document_id,
                        section_id=change["section_id"]
                    )
                    
                elif change_type == "reorder_section":
                    # Update section order
                    self.update_section(
                        document_id=document_id,
                        section_id=change["section_id"],
                        order=change["new_order"]
                    )
                    
                elif change_type == "update_metadata":
                    # Update document metadata
                    self.update_document_metadata(
                        document_id=document_id,
                        metadata=change["metadata"]
                    )
            
            # Update document version
            document["version"] = evolution.version
            document["modified_at"] = time.time()
            
            # Mark evolution as applied
            evolution.applied = True
            evolution.applied_at = time.time()
            
            # Save document
            self._save_document(document)
            
            self.logger.info(f"Applied evolution {evolution_id} to document {document_id}")
            
            return True
    
    def remove_section(self, document_id: str, section_id: str) -> bool:
        """Remove a section from a document"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                self.logger.error(f"Document {document_id} not found")
                return False
                
            # Make sure section exists
            if document_id not in self.document_sections or section_id not in self.document_sections[document_id]:
                self.logger.error(f"Section {section_id} not found in document {document_id}")
                return False
                
            # Remove section from document
            document = self.documents[document_id]
            if section_id in document["sections"]:
                document["sections"].remove(section_id)
                document["modified_at"] = time.time()
            
            # Remove section from storage
            del self.document_sections[document_id][section_id]
            
            # Remove from architecture
            architecture_id = document["active_architecture"]
            self._remove_section_from_architecture(section_id, architecture_id)
            
            # Save document
            self._save_document(document)
            
            self.logger.info(f"Removed section {section_id} from document {document_id}")
            
            return True
    
    def _remove_section_from_architecture(self, section_id: str, architecture_id: str) -> None:
        """Remove a section from an information architecture"""
        # Get the architecture
        architecture = self.information_architectures.get(architecture_id)
        if not architecture:
            self.logger.error(f"Architecture {architecture_id} not found")
            return
        
        # Remove node
        if section_id in architecture.nodes:
            del architecture.nodes[section_id]
        
        # Remove edges
        architecture.edges = [
            edge for edge in architecture.edges
            if edge["source"] != section_id and edge["target"] != section_id
        ]
    
    def update_document_metadata(self, document_id: str, metadata: Dict[str, Any]) -> bool:
        """Update document metadata"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                self.logger.error(f"Document {document_id} not found")
                return False
                
            # Update metadata
            document = self.documents[document_id]
            document["metadata"].update(metadata)
            document["modified_at"] = time.time()
            
            # Save document
            self._save_document(document)
            
            self.logger.info(f"Updated metadata for document {document_id}")
            
            return True
    
    def create_information_architecture(self, 
                                      structure_type: str,
                                      name: str,
                                      phi_ratio: float = PHI,
                                      coherence: float = PHI_RECIPROCAL) -> InformationArchitecture:
        """Create a new information architecture"""
        with self.lock:
            # Generate architecture ID
            architecture_id = f"arch_{name.lower().replace(' ', '_')}_{int(time.time())}"
            
            # Create architecture object
            architecture = InformationArchitecture(
                architecture_id=architecture_id,
                structure_type=structure_type,
                nodes={},
                edges=[],
                phi_ratio=phi_ratio,
                coherence=coherence
            )
            
            # Store architecture
            self.information_architectures[architecture_id] = architecture
            
            self.logger.info(f"Created information architecture: {architecture_id}")
            
            return architecture
    
    def add_architecture_node(self, 
                             architecture_id: str,
                             node_id: str,
                             node_type: str,
                             name: str,
                             level: int = 0,
                             metadata: Optional[Dict[str, Any]] = None) -> bool:
        """Add a node to an information architecture"""
        with self.lock:
            # Make sure architecture exists
            if architecture_id not in self.information_architectures:
                self.logger.error(f"Architecture {architecture_id} not found")
                return False
                
            # Get architecture
            architecture = self.information_architectures[architecture_id]
            
            # Create node
            node = {
                "node_id": node_id,
                "type": node_type,
                "name": name,
                "level": level,
                "metadata": metadata or {},
                "created_at": time.time()
            }
            
            # Add to architecture
            architecture.nodes[node_id] = node
            architecture.modified_at = time.time()
            
            return True
    
    def add_architecture_edge(self, 
                             architecture_id: str,
                             source_id: str,
                             target_id: str,
                             edge_type: str,
                             weight: float = 1.0,
                             metadata: Optional[Dict[str, Any]] = None) -> bool:
        """Add an edge to an information architecture"""
        with self.lock:
            # Make sure architecture exists
            if architecture_id not in self.information_architectures:
                self.logger.error(f"Architecture {architecture_id} not found")
                return False
                
            # Get architecture
            architecture = self.information_architectures[architecture_id]
            
            # Make sure nodes exist
            if source_id not in architecture.nodes:
                self.logger.error(f"Source node {source_id} not found in architecture {architecture_id}")
                return False
                
            if target_id not in architecture.nodes:
                self.logger.error(f"Target node {target_id} not found in architecture {architecture_id}")
                return False
                
            # Create edge
            edge = {
                "source": source_id,
                "target": target_id,
                "type": edge_type,
                "weight": weight,
                "metadata": metadata or {},
                "created_at": time.time()
            }
            
            # Add to architecture
            architecture.edges.append(edge)
            architecture.modified_at = time.time()
            
            return True
    
    def create_user_profile(self, 
                          user_id: str,
                          experience_level: str,
                          preferred_formats: List[str],
                          interests: List[str],
                          adaptive_preferences: Optional[Dict[str, Any]] = None) -> UserProfile:
        """Create a user profile"""
        with self.lock:
            # Create profile object
            profile = UserProfile(
                user_id=user_id,
                experience_level=experience_level,
                preferred_formats=preferred_formats,
                interests=interests,
                adaptive_preferences=adaptive_preferences or {}
            )
            
            # Store profile
            self.user_profiles[user_id] = profile
            
            self.logger.info(f"Created user profile: {user_id}")
            
            return profile
    
    def update_user_profile(self, 
                          user_id: str,
                          experience_level: Optional[str] = None,
                          preferred_formats: Optional[List[str]] = None,
                          interests: Optional[List[str]] = None,
                          adaptive_preferences: Optional[Dict[str, Any]] = None) -> Optional[UserProfile]:
        """Update a user profile"""
        with self.lock:
            # Make sure profile exists
            if user_id not in self.user_profiles:
                self.logger.error(f"User profile {user_id} not found")
                return None
                
            # Get profile
            profile = self.user_profiles[user_id]
            
            # Update fields
            if experience_level is not None:
                profile.experience_level = experience_level
            if preferred_formats is not None:
                profile.preferred_formats = preferred_formats
            if interests is not None:
                profile.interests = interests
            if adaptive_preferences is not None:
                profile.adaptive_preferences = adaptive_preferences
                
            # Update last activity
            profile.last_activity = time.time()
            
            self.logger.info(f"Updated user profile: {user_id}")
            
            return profile
    
    def get_document(self, document_id: str) -> Optional[Dict[str, Any]]:
        """Get a document with its sections"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                return None
                
            # Get document
            document = self.documents[document_id]
            
            # Get sections
            sections = []
            if document_id in self.document_sections:
                for section_id in document["sections"]:
                    if section_id in self.document_sections[document_id]:
                        section = self.document_sections[document_id][section_id]
                        sections.append({
                            "section_id": section.section_id,
                            "title": section.title,
                            "content": section.content,
                            "section_type": section.section_type,
                            "parent_id": section.parent_id,
                            "order": section.order,
                            "variants": section.variants,
                            "metadata": section.metadata,
                            "created_at": section.created_at,
                            "modified_at": section.modified_at
                        })
            
            # Sort sections by order
            sections.sort(key=lambda s: s["order"])
            
            # Create full document
            full_document = {
                "document_id": document["document_id"],
                "title": document["title"],
                "document_type": document["document_type"],
                "introduction": document["introduction"],
                "sections": sections,
                "metadata": document["metadata"],
                "created_at": document["created_at"],
                "modified_at": document["modified_at"],
                "version": document["version"],
                "view_count": document["view_count"]
            }
            
            # Update view count
            document["view_count"] += 1
            self._save_document(document)
            
            return full_document
    
    def get_document_for_user(self, 
                             document_id: str,
                             user_id: str,
                             render_type: str = "document") -> Dict[str, Any]:
        """Get a document adapted for a specific user"""
        with self.lock:
            # Get the document
            document = self.get_document(document_id)
            if not document:
                return {
                    "error": f"Document {document_id} not found"
                }
                
            # Get the user profile
            profile = self.user_profiles.get(user_id)
            if not profile:
                self.logger.warning(f"User profile {user_id} not found, using default adaptation")
                # Create a default profile
                profile = UserProfile(
                    user_id=user_id,
                    experience_level="intermediate",
                    preferred_formats=["text", "code"],
                    interests=[]
                )
                
            # Render for user
            adapted_document = self.renderer.render_for_user(
                document_data=document,
                user_profile=profile,
                render_type=render_type
            )
            
            return adapted_document
    
    def search_documents(self, 
                        query: str,
                        document_type: Optional[DocumentType] = None,
                        tags: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """Search for documents"""
        with self.lock:
            results = []
            
            for document_id, document in self.documents.items():
                # Filter by document type if specified
                if document_type and document["document_type"] != document_type.name:
                    continue
                    
                # Filter by tags if specified
                if tags:
                    doc_tags = document["metadata"].get("tags", [])
                    if not any(tag in doc_tags for tag in tags):
                        continue
                
                # Check title and introduction for query
                query_lower = query.lower()
                if query_lower in document["title"].lower() or query_lower in document["introduction"].lower():
                    results.append({
                        "document_id": document["document_id"],
                        "title": document["title"],
                        "document_type": document["document_type"],
                        "created_at": document["created_at"],
                        "modified_at": document["modified_at"],
                        "version": document["version"],
                        "view_count": document["view_count"]
                    })
                    continue
                
                # Check sections for query
                if document_id in self.document_sections:
                    for section_id, section in self.document_sections[document_id].items():
                        if query_lower in section.title.lower() or query_lower in section.content.lower():
                            results.append({
                                "document_id": document["document_id"],
                                "title": document["title"],
                                "document_type": document["document_type"],
                                "created_at": document["created_at"],
                                "modified_at": document["modified_at"],
                                "version": document["version"],
                                "view_count": document["view_count"],
                                "matching_section": {
                                    "section_id": section.section_id,
                                    "title": section.title
                                }
                            })
                            break
            
            return results
    
    def get_information_architecture(self, architecture_id: str) -> Optional[Dict[str, Any]]:
        """Get an information architecture"""
        with self.lock:
            # Make sure architecture exists
            if architecture_id not in self.information_architectures:
                return None
                
            # Get architecture
            architecture = self.information_architectures[architecture_id]
            
            # Convert to dict
            return {
                "architecture_id": architecture.architecture_id,
                "structure_type": architecture.structure_type,
                "nodes": architecture.nodes,
                "edges": architecture.edges,
                "phi_ratio": architecture.phi_ratio,
                "coherence": architecture.coherence,
                "created_at": architecture.created_at,
                "modified_at": architecture.modified_at
            }
    
    def generate_documentation_map(self, architecture_id: str) -> Dict[str, Any]:
        """Generate a map of the documentation structure"""
        with self.lock:
            # Make sure architecture exists
            if architecture_id not in self.information_architectures:
                return {
                    "error": f"Architecture {architecture_id} not found"
                }
                
            # Get architecture
            architecture = self.information_architectures[architecture_id]
            
            # Get root node
            root_node = None
            for node_id, node in architecture.nodes.items():
                if node["type"] == "root":
                    root_node = node
                    break
                    
            if not root_node:
                return {
                    "error": "Root node not found in architecture"
                }
            
            # Generate map
            doc_map = self._generate_node_map(architecture, root_node["node_id"])
            
            return {
                "architecture_id": architecture.architecture_id,
                "structure_type": architecture.structure_type,
                "map": doc_map,
                "coherence": architecture.coherence
            }
    
    def _generate_node_map(self, architecture: InformationArchitecture, node_id: str) -> Dict[str, Any]:
        """Generate a map for a specific node and its children"""
        # Get node
        node = architecture.nodes.get(node_id)
        if not node:
            return {}
            
        # Create node map
        node_map = {
            "node_id": node["node_id"],
            "type": node["type"],
            "name": node["name"],
            "level": node["level"],
            "children": []
        }
        
        # Add metadata if it's a document or section
        if node["type"] == "document":
            document_id = node["node_id"]
            if document_id in self.documents:
                document = self.documents[document_id]
                node_map["document_type"] = document["document_type"]
                node_map["created_at"] = document["created_at"]
                node_map["version"] = document["version"]
        elif node["type"] == "section":
            if "metadata" in node and "document_id" in node["metadata"]:
                document_id = node["metadata"]["document_id"]
                if document_id in self.document_sections and node["node_id"] in self.document_sections[document_id]:
                    section = self.document_sections[document_id][node["node_id"]]
                    node_map["section_type"] = section.section_type
                    node_map["created_at"] = section.created_at
        
        # Add children
        children = []
        for edge in architecture.edges:
            if edge["source"] == node_id and edge["type"] == "parent-child":
                child_map = self._generate_node_map(architecture, edge["target"])
                if child_map:
                    children.append(child_map)
                    
        # Sort children by name
        children.sort(key=lambda c: c["name"])
        
        node_map["children"] = children
        
        return node_map
    
    def get_related_documents(self, 
                             document_id: str,
                             max_results: int = 5) -> List[Dict[str, Any]]:
        """Get related documents based on the information architecture"""
        with self.lock:
            # Make sure document exists
            if document_id not in self.documents:
                return []
                
            # Get document
            document = self.documents[document_id]
            
            # Get architecture
            architecture_id = document["active_architecture"]
            architecture = self.information_architectures.get(architecture_id)
            if not architecture:
                return []
                
            # Get related nodes
            related_nodes = architecture.get_related(document_id)
            
            # Get document information for related nodes
            related_documents = []
            for related in related_nodes:
                related_id = related["node_id"]
                if related_id in self.documents:
                    related_doc = self.documents[related_id]
                    related_documents.append({
                        "document_id": related_doc["document_id"],
                        "title": related_doc["title"],
                        "document_type": related_doc["document_type"],
                        "relationship": related["relationship"],
                        "created_at": related_doc["created_at"]
                    })
            
            # Get documents with similar metadata
            if len(related_documents) < max_results:
                doc_tags = document["metadata"].get("tags", [])
                if doc_tags:
                    for other_id, other_doc in self.documents.items():
                        if other_id == document_id:
                            continue
                            
                        # Skip if already in related documents
                        if any(rd["document_id"] == other_id for rd in related_documents):
                            continue
                            
                        # Check for shared tags
                        other_tags = other_doc["metadata"].get("tags", [])
                        shared_tags = set(doc_tags).intersection(set(other_tags))
                        
                        if shared_tags:
                            related_documents.append({
                                "document_id": other_doc["document_id"],
                                "title": other_doc["title"],
                                "document_type": other_doc["document_type"],
                                "relationship": "shared-tags",
                                "shared_tags": list(shared_tags),
                                "created_at": other_doc["created_at"]
                            })
                            
                            if len(related_documents) >= max_results:
                                break
            
            # Sort by relationship type
            relationship_priority = {
                "parent-child": 1,
                "shared-tags": 2,
                "related": 3
            }
            
            related_documents.sort(key=lambda d: relationship_priority.get(d["relationship"], 999))
            
            return related_documents[:max_results]
    
    def _save_document(self, document: Dict[str, Any]) -> None:
        """Save a document to disk"""
        document_path = os.path.join(self.storage_path, f"{document['document_id']}.json")
        
        # Prepare serializable representation
        doc_data = document.copy()
        
        # Add sections
        if document["document_id"] in self.document_sections:
            sections_data = {}
            for section_id, section in self.document_sections[document["document_id"]].items():
                sections_data[section_id] = {
                    "section_id": section.section_id,
                    "title": section.title,
                    "content": section.content,
                    "section_type": section.section_type,
                    "parent_id": section.parent_id,
                    "order": section.order,
                    "variants": section.variants,
                    "metadata": section.metadata,
                    "is_visible": section.is_visible,
                    "created_at": section.created_at,
                    "modified_at": section.modified_at
                }
            
            doc_data["sections_data"] = sections_data
        
        # Save to disk
        with open(document_path, 'w') as f:
            json.dump(doc_data, f, indent=2)
    
    def _load_documents(self) -> None:
        """Load all documents from disk"""
        if not os.path.exists(self.storage_path):
            return
            
        # Load each document file
        for filename in os.listdir(self.storage_path):
            if filename.endswith('.json'):
                document_path = os.path.join(self.storage_path, filename)
                
                try:
                    with open(document_path, 'r') as f:
                        doc_data = json.load(f)
                        
                    # Extract sections data if present
                    sections_data = doc_data.pop("sections_data", {})
                    
                    # Create document object
                    document_id = doc_data["document_id"]
                    self.documents[document_id] = doc_data
                    
                    # Create sections
                    if sections_data:
                        self.document_sections[document_id] = {}
                        
                        for section_id, section_data in sections_data.items():
                            section = DocumentSection(
                                section_id=section_data["section_id"],
                                title=section_data["title"],
                                content=section_data["content"],
                                section_type=section_data["section_type"],
                                parent_id=section_data["parent_id"],
                                order=section_data["order"],
                                variants=section_data["variants"],
                                metadata=section_data["metadata"],
                                is_visible=section_data["is_visible"],
                                created_at=section_data["created_at"],
                                modified_at=section_data["modified_at"]
                            )
                            
                            self.document_sections[document_id][section_id] = section
                    
                    self.logger.info(f"Loaded document: {document_id}")
                    
                except Exception as e:
                    self.logger.error(f"Failed to load document {filename}: {str(e)}")
    
    def register_custom_renderer(self, renderer_type: str, renderer_func: Callable) -> None:
        """Register a custom renderer with the adaptive renderer"""
        self.renderer.register_renderer(renderer_type, renderer_func)
    
    def register_custom_format_handler(self, format_type: str, handler_func: Callable) -> None:
        """Register a custom format handler with the adaptive renderer"""
        self.renderer.register_format_handler(format_type, handler_func)
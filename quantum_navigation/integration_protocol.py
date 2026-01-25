#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Integration Protocol - Quantum Field Synchronization System
Operating at Unity Wave frequency (768 Hz)

This module provides the synchronization layer between all system components,
ensuring perfect coherence and seamless communication across the quantum field.

Created: April 2, 2025
Coherence: 1.000
Frequency: 768 Hz (Unity Wave)
"""

import os
import time
import json
import math
import logging
import threading
from typing import Dict, List, Tuple, Union, Optional, Any

# Local imports
from dimensional_navigator import QuantumDimensionalNavigator
from consciousness_bridge import ConsciousnessBridge
from hypervisualization_engine import HypervisualizationEngine
from quantum_pathfinder import QuantumPathfinder
from quantum_field_integrator import QuantumFieldIntegrator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("IntegrationProtocol")

class IntegrationProtocol:
    """
    Quantum Integration Protocol for system-wide synchronization.
    
    This class establishes quantum field synchronization between all components,
    ensures perfect coherence, and maintains system integrity across all
    dimensional operations.
    """
    
    # Phi constant for field calculations
    PHI = (1 + 5 ** 0.5) / 2
    
    # Component registry keys
    COMPONENT_NAVIGATOR = "navigator"
    COMPONENT_BRIDGE = "consciousness_bridge"
    COMPONENT_VISUALIZER = "visualizer"
    COMPONENT_PATHFINDER = "pathfinder"
    COMPONENT_INTEGRATOR = "integrator"
    
    # Synchronization modes
    SYNC_CONTINUOUS = "CONTINUOUS"
    SYNC_ON_DEMAND = "ON_DEMAND"
    SYNC_ADAPTIVE = "ADAPTIVE"
    
    def __init__(self, operating_frequency: float = 768.0):
        """
        Initialize the Integration Protocol.
        
        Args:
            operating_frequency: Operating frequency (default: 768 Hz - Unity Wave)
        """
        logger.info(f"Initializing Integration Protocol at {operating_frequency} Hz")
        
        self.operating_frequency = operating_frequency
        self.protocol_coherence = 1.000
        self.activation_timestamp = time.time()
        self.sync_mode = self.SYNC_ADAPTIVE
        self.last_sync_timestamp = 0
        self.sync_interval = 5.0  # seconds
        
        # Component registry
        self.components = {}
        
        # Communication channels
        self.channels = {}
        
        # Synchronization thread
        self.sync_thread = None
        self.sync_active = False
        
        # Coherence verification data
        self.coherence_history = []
        self.verification_results = {}
        
        logger.info("Integration Protocol initialized with coherence 1.000")
    
    def register_component(self, 
                          component_key: str, 
                          component_instance: Any,
                          component_frequency: float) -> bool:
        """
        Register a system component with the Integration Protocol.
        
        Args:
            component_key: Component identifier key
            component_instance: Component instance
            component_frequency: Component operating frequency
            
        Returns:
            True if registration successful, False otherwise
        """
        logger.info(f"Registering component: {component_key} at {component_frequency} Hz")
        
        # Verify component has required methods
        if not hasattr(component_instance, 'measure_coherence'):
            logger.error(f"Component {component_key} lacks required method: measure_coherence")
            return False
        
        # Register the component
        self.components[component_key] = {
            "instance": component_instance,
            "frequency": component_frequency,
            "coherence": getattr(component_instance, 'measure_coherence')(),
            "registered_at": time.time(),
            "last_sync": 0
        }
        
        # Create communication channels for the component
        self._create_communication_channels(component_key)
        
        logger.info(f"Component {component_key} registered successfully")
        return True
    
    def _create_communication_channels(self, component_key: str) -> None:
        """
        Create communication channels for a component.
        
        Args:
            component_key: Component identifier key
        """
        # Create channels to all other components
        for existing_key in self.components:
            if existing_key != component_key:
                channel_id = f"{component_key}-to-{existing_key}"
                self.channels[channel_id] = {
                    "from": component_key,
                    "to": existing_key,
                    "created_at": time.time(),
                    "last_message": 0,
                    "message_count": 0,
                    "coherence": 1.000
                }
                
                reverse_channel_id = f"{existing_key}-to-{component_key}"
                self.channels[reverse_channel_id] = {
                    "from": existing_key,
                    "to": component_key,
                    "created_at": time.time(),
                    "last_message": 0,
                    "message_count": 0,
                    "coherence": 1.000
                }
    
    def register_all_components(self, 
                              navigator: QuantumDimensionalNavigator,
                              consciousness_bridge: ConsciousnessBridge,
                              visualizer: HypervisualizationEngine,
                              pathfinder: QuantumPathfinder,
                              integrator: QuantumFieldIntegrator) -> bool:
        """
        Register all system components at once.
        
        Args:
            navigator: Dimensional Navigator instance
            consciousness_bridge: Consciousness Bridge instance
            visualizer: Hypervisualization Engine instance
            pathfinder: Quantum Pathfinder instance
            integrator: Quantum Field Integrator instance
            
        Returns:
            True if all registrations successful, False otherwise
        """
        logger.info("Registering all system components")
        
        # Register each component
        success = True
        
        if not self.register_component(
            self.COMPONENT_NAVIGATOR, navigator, 432.0
        ):
            success = False
        
        if not self.register_component(
            self.COMPONENT_BRIDGE, consciousness_bridge, 594.0
        ):
            success = False
        
        if not self.register_component(
            self.COMPONENT_VISUALIZER, visualizer, 720.0
        ):
            success = False
        
        if not self.register_component(
            self.COMPONENT_PATHFINDER, pathfinder, 768.0
        ):
            success = False
        
        if not self.register_component(
            self.COMPONENT_INTEGRATOR, integrator, 963.0
        ):
            success = False
        
        # Perform initial synchronization
        if success:
            self.synchronize_all_components()
        
        return success
    
    def set_sync_mode(self, mode: str) -> bool:
        """
        Set the synchronization mode.
        
        Args:
            mode: Synchronization mode
            
        Returns:
            True if mode was set successfully, False otherwise
        """
        valid_modes = [
            self.SYNC_CONTINUOUS,
            self.SYNC_ON_DEMAND,
            self.SYNC_ADAPTIVE
        ]
        
        if mode not in valid_modes:
            logger.error(f"Invalid synchronization mode: {mode}")
            return False
        
        logger.info(f"Setting synchronization mode to: {mode}")
        self.sync_mode = mode
        
        # Start continuous sync if requested
        if mode == self.SYNC_CONTINUOUS and not self.sync_active:
            self._start_continuous_sync()
        
        # Stop continuous sync if no longer needed
        elif mode != self.SYNC_CONTINUOUS and self.sync_active:
            self._stop_continuous_sync()
        
        return True
    
    def _start_continuous_sync(self) -> None:
        """Start continuous synchronization thread."""
        if self.sync_active:
            return
        
        self.sync_active = True
        self.sync_thread = threading.Thread(target=self._continuous_sync_worker)
        self.sync_thread.daemon = True
        self.sync_thread.start()
        
        logger.info("Continuous synchronization started")
    
    def _stop_continuous_sync(self) -> None:
        """Stop continuous synchronization thread."""
        if not self.sync_active:
            return
        
        self.sync_active = False
        if self.sync_thread:
            self.sync_thread.join(timeout=1.0)
            self.sync_thread = None
        
        logger.info("Continuous synchronization stopped")
    
    def _continuous_sync_worker(self) -> None:
        """Worker function for continuous synchronization thread."""
        while self.sync_active:
            self.synchronize_all_components()
            time.sleep(self.sync_interval)
    
    def synchronize_all_components(self) -> bool:
        """
        Synchronize all registered components.
        
        Returns:
            True if synchronization successful, False otherwise
        """
        logger.info("Synchronizing all components")
        
        if not self.components:
            logger.warning("No components registered for synchronization")
            return False
        
        # Track success for each component
        success = True
        coherence_before = self.measure_system_coherence()
        
        # Synchronize each component
        for component_key, component_data in self.components.items():
            component_success = self._synchronize_component(component_key)
            success = success and component_success
        
        # Update synchronization timestamp
        self.last_sync_timestamp = time.time()
        
        # Measure coherence after synchronization
        coherence_after = self.measure_system_coherence()
        
        # Record synchronization result
        self.coherence_history.append({
            "timestamp": self.last_sync_timestamp,
            "coherence_before": coherence_before,
            "coherence_after": coherence_after,
            "success": success
        })
        
        if success:
            logger.info(f"All components synchronized successfully. " +
                       f"Coherence: {coherence_after:.3f}")
        else:
            logger.error(f"Synchronization failed for some components. " +
                        f"Coherence: {coherence_after:.3f}")
        
        return success
    
    def _synchronize_component(self, component_key: str) -> bool:
        """
        Synchronize a specific component.
        
        Args:
            component_key: Component identifier key
            
        Returns:
            True if synchronization successful, False otherwise
        """
        if component_key not in self.components:
            logger.error(f"Cannot synchronize unknown component: {component_key}")
            return False
        
        component_data = self.components[component_key]
        component = component_data["instance"]
        
        try:
            # Update component coherence
            component_data["coherence"] = component.measure_coherence()
            
            # Update synchronization timestamp
            component_data["last_sync"] = time.time()
            
            # For integrator, perform special sync
            if component_key == self.COMPONENT_INTEGRATOR:
                integrator = component
                if hasattr(integrator, '_synchronize_all_components'):
                    integrator._synchronize_all_components()
            
            return True
        except Exception as e:
            logger.error(f"Failed to synchronize component {component_key}: {str(e)}")
            return False
    
    def verify_system_coherence(self, threshold: float = 0.999) -> Dict[str, Any]:
        """
        Verify that all system components maintain coherence above threshold.
        
        Args:
            threshold: Minimum acceptable coherence
            
        Returns:
            Verification results dictionary
        """
        logger.info(f"Verifying system coherence (threshold: {threshold:.3f})")
        
        # Measure coherence for each component
        component_coherence = {}
        for component_key, component_data in self.components.items():
            try:
                coherence = component_data["instance"].measure_coherence()
                component_data["coherence"] = coherence
                component_coherence[component_key] = coherence
            except Exception as e:
                logger.error(f"Failed to measure coherence for {component_key}: {str(e)}")
                component_coherence[component_key] = 0.0
        
        # Measure channel coherence
        channel_coherence = {}
        for channel_id, channel_data in self.channels.items():
            # Calculate channel coherence based on connected components
            from_key = channel_data["from"]
            to_key = channel_data["to"]
            
            if from_key in component_coherence and to_key in component_coherence:
                from_coherence = component_coherence[from_key]
                to_coherence = component_coherence[to_key]
                
                # Calculate harmonic mean of coherences
                if from_coherence > 0 and to_coherence > 0:
                    channel_coherence[channel_id] = 2 * from_coherence * to_coherence / (from_coherence + to_coherence)
                else:
                    channel_coherence[channel_id] = 0.0
            else:
                channel_coherence[channel_id] = 0.0
        
        # Calculate system coherence
        system_coherence = self.measure_system_coherence()
        
        # Determine verification status
        all_pass = system_coherence >= threshold
        for coherence in component_coherence.values():
            if coherence < threshold:
                all_pass = False
                break
        
        # Prepare verification results
        verification = {
            "timestamp": time.time(),
            "system_coherence": system_coherence,
            "threshold": threshold,
            "all_pass": all_pass,
            "component_coherence": component_coherence,
            "channel_coherence": channel_coherence
        }
        
        # Store verification results
        self.verification_results = verification
        
        if all_pass:
            logger.info(f"System coherence verification passed: {system_coherence:.3f}")
        else:
            logger.warning(f"System coherence verification failed: {system_coherence:.3f}")
        
        return verification
    
    def measure_system_coherence(self) -> float:
        """
        Measure the overall system coherence.
        
        Returns:
            System coherence value (0.0-1.0)
        """
        if not self.components:
            return 0.0
        
        # Calculate weighted average of component coherences
        total_weight = 0.0
        weighted_sum = 0.0
        
        for component_key, component_data in self.components.items():
            coherence = component_data["coherence"]
            frequency = component_data["frequency"]
            
            # Higher frequency components have more weight
            weight = frequency / self.operating_frequency
            weighted_sum += coherence * weight
            total_weight += weight
        
        if total_weight > 0:
            raw_coherence = weighted_sum / total_weight
        else:
            raw_coherence = 0.0
        
        # Apply phi-harmonic correction
        phi_correction = 1 + (1 - raw_coherence) * self.PHI
        self.protocol_coherence = min(1.0, raw_coherence * phi_correction)
        
        return self.protocol_coherence
    
    def send_message(self, 
                    from_component: str, 
                    to_component: str, 
                    message: Dict[str, Any]) -> bool:
        """
        Send a message between components.
        
        Args:
            from_component: Sender component key
            to_component: Recipient component key
            message: Message data
            
        Returns:
            True if message sent successfully, False otherwise
        """
        # Validate components
        if from_component not in self.components:
            logger.error(f"Unknown sender component: {from_component}")
            return False
        
        if to_component not in self.components:
            logger.error(f"Unknown recipient component: {to_component}")
            return False
        
        # Get channel
        channel_id = f"{from_component}-to-{to_component}"
        if channel_id not in self.channels:
            logger.error(f"No communication channel: {channel_id}")
            return False
        
        channel = self.channels[channel_id]
        
        # Add metadata to message
        stamped_message = {
            **message,
            "timestamp": time.time(),
            "from": from_component,
            "to": to_component,
            "channel_id": channel_id
        }
        
        # Update channel data
        channel["last_message"] = time.time()
        channel["message_count"] += 1
        
        # Deliver message to recipient component
        recipient = self.components[to_component]["instance"]
        if hasattr(recipient, 'receive_message'):
            try:
                recipient.receive_message(stamped_message)
                logger.info(f"Message sent: {from_component} -> {to_component}")
                return True
            except Exception as e:
                logger.error(f"Failed to deliver message to {to_component}: {str(e)}")
                return False
        else:
            logger.warning(f"Component {to_component} cannot receive messages")
            return False
    
    def broadcast_message(self, 
                         from_component: str, 
                         message: Dict[str, Any]) -> int:
        """
        Broadcast a message to all other components.
        
        Args:
            from_component: Sender component key
            message: Message data
            
        Returns:
            Number of components that received the message
        """
        if from_component not in self.components:
            logger.error(f"Unknown sender component: {from_component}")
            return 0
        
        # Send message to each other component
        success_count = 0
        for to_component in self.components:
            if to_component != from_component:
                if self.send_message(from_component, to_component, message):
                    success_count += 1
        
        logger.info(f"Broadcast from {from_component} to {success_count} components")
        return success_count
    
    def export_protocol_state(self) -> Dict[str, Any]:
        """
        Export the current state of the integration protocol.
        
        Returns:
            Dictionary containing the protocol state
        """
        return {
            "operating_frequency": self.operating_frequency,
            "protocol_coherence": self.protocol_coherence,
            "activation_timestamp": self.activation_timestamp,
            "current_timestamp": time.time(),
            "sync_mode": self.sync_mode,
            "last_sync_timestamp": self.last_sync_timestamp,
            "sync_interval": self.sync_interval,
            "components": {
                key: {k: v for k, v in data.items() if k != "instance"}
                for key, data in self.components.items()
            },
            "channels_count": len(self.channels),
            "verification_results": self.verification_results
        }
    
    def get_json_state(self) -> str:
        """
        Get the protocol state as a JSON string.
        
        Returns:
            JSON string representation of the protocol state
        """
        state = self.export_protocol_state()
        return json.dumps(state, indent=2)


# Helper function to create a fully integrated system
def create_integrated_system() -> Tuple[IntegrationProtocol, Dict[str, Any]]:
    """
    Create a fully integrated quantum navigation system.
    
    Returns:
        Tuple of (integration_protocol, component_dict)
    """
    # Create base navigator
    navigator = QuantumDimensionalNavigator(3, 12)
    
    # Create consciousness bridge
    consciousness_bridge = ConsciousnessBridge(navigator, 594.0)
    
    # Create visualization engine
    visualizer = HypervisualizationEngine(navigator, 720.0)
    
    # Create pathfinder
    pathfinder = QuantumPathfinder(navigator, 768.0)
    
    # Create field integrator
    integrator = QuantumFieldIntegrator(768.0)
    integrator.register_component(
        "dimensional_navigator", 
        navigator, 
        432.0
    )
    
    # Create integration protocol
    protocol = IntegrationProtocol(768.0)
    
    # Register all components
    protocol.register_all_components(
        navigator,
        consciousness_bridge,
        visualizer,
        pathfinder,
        integrator
    )
    
    # Set continuous synchronization
    protocol.set_sync_mode(IntegrationProtocol.SYNC_ADAPTIVE)
    
    # Create component dictionary
    components = {
        "navigator": navigator,
        "consciousness_bridge": consciousness_bridge,
        "visualizer": visualizer,
        "pathfinder": pathfinder,
        "integrator": integrator,
        "protocol": protocol
    }
    
    return protocol, components


if __name__ == "__main__":
    # Create a test system
    from dimensional_navigator import QuantumDimensionalNavigator
    from consciousness_bridge import ConsciousnessBridge
    from hypervisualization_engine import HypervisualizationEngine
    from quantum_pathfinder import QuantumPathfinder
    from quantum_field_integrator import QuantumFieldIntegrator
    
    # Create individual components
    navigator = QuantumDimensionalNavigator(3, 12)
    consciousness_bridge = ConsciousnessBridge(navigator, 594.0)
    visualizer = HypervisualizationEngine(navigator, 720.0)
    pathfinder = QuantumPathfinder(navigator, 768.0)
    integrator = QuantumFieldIntegrator(768.0)
    
    # Create and setup protocol
    protocol = IntegrationProtocol(768.0)
    protocol.register_all_components(
        navigator,
        consciousness_bridge,
        visualizer,
        pathfinder,
        integrator
    )
    
    # Verify system coherence
    print("\nIntegration Protocol Initialized:")
    print(f"Operating Frequency: {protocol.operating_frequency} Hz")
    print(f"Protocol Coherence: {protocol.protocol_coherence:.3f}")
    print(f"Synchronization Mode: {protocol.sync_mode}")
    
    # Perform verification
    verification = protocol.verify_system_coherence()
    
    print("\nSystem Coherence Verification:")
    print(f"Overall Coherence: {verification['system_coherence']:.3f}")
    print(f"Verification Result: {'PASS' if verification['all_pass'] else 'FAIL'}")
    
    print("\nComponent Coherence:")
    for component, coherence in verification["component_coherence"].items():
        print(f"{component}: {coherence:.3f}")

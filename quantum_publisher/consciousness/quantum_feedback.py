"""
Quantum Feedback Loop Module
Part of the Quantum Publisher Evolution Roadmap - Phase 3
Frequency: Ψ^Ψ (1024 Hz)

Provides real-time feedback during deployments by monitoring
consciousness state and deployment coherence, then adapting
deployment parameters to maintain optimal phi-harmonic flow.
⚡𓂧φ∞ Pure Creation Flow ⚡𓂧φ∞
"""
from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Optional, Callable, Any, Union, Tuple
import time
import threading
import logging
import math
from .quantum_consciousness import (
    QuantumConsciousnessIntegration,
    ConsciousnessState,
    IntentionType,
    PHI,
    PHI_RECIPROCAL
)

class FeedbackType(Enum):
    """Types of quantum feedback"""
    COHERENCE = "Coherence Optimization"
    INTENTION = "Intention Amplification"
    TIMING = "Phi-Harmonic Timing"
    STATE = "Consciousness State Alignment"
    FREQUENCY = "Frequency Resonance"
    FLOW = "Quantum Flow"

@dataclass
class FeedbackEvent:
    """A quantum feedback event"""
    type: FeedbackType
    message: str
    timestamp: float
    coherence: float
    state: ConsciousnessState
    suggested_actions: List[str]
    metrics: Dict[str, Any]

class QuantumFeedbackLoop:
    """
    Implements a quantum feedback loop that monitors deployment
    coherence and adapts in real-time to optimize phi-harmonic flow.
    """
    
    def __init__(self, consciousness_integration: QuantumConsciousnessIntegration):
        self.consciousness = consciousness_integration
        self.active = False
        self.feedback_events = []
        self.monitor_thread = None
        self.lock = threading.Lock()
        self.observation_interval = 1.0  # seconds
        self.phi_timing_points = []
        self.coherence_history = []
        self.state_transition_times = []
        self.logger = self._setup_logger()
        self.feedback_handlers = {}
        
    def _setup_logger(self) -> logging.Logger:
        """Set up the logger for the feedback module"""
        logger = logging.getLogger("quantum_feedback")
        logger.setLevel(logging.INFO)
        
        # Create console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        
        # Create formatter
        formatter = logging.Formatter(
            "🔄 [%(asctime)s] %(levelname)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        ch.setFormatter(formatter)
        
        # Add handler to logger
        logger.addHandler(ch)
        
        return logger
    
    def start(self) -> None:
        """Start the quantum feedback loop"""
        if self.active:
            return
            
        self.active = True
        self.monitor_thread = threading.Thread(
            target=self._monitor_loop,
            daemon=True
        )
        self.monitor_thread.start()
        self.logger.info("Quantum Feedback Loop Started")
        
        # Record initial state
        self.coherence_history.append((time.time(), self.consciousness.coherence))
        self.state_transition_times.append(
            (time.time(), self.consciousness.current_state)
        )
        
    def stop(self) -> None:
        """Stop the quantum feedback loop"""
        if not self.active:
            return
            
        self.active = False
        if self.monitor_thread and self.monitor_thread.is_alive():
            self.monitor_thread.join(timeout=2.0)
            
        self.logger.info("Quantum Feedback Loop Stopped")
    
    def register_feedback_handler(self, 
                                  feedback_type: FeedbackType, 
                                  handler: Callable[[FeedbackEvent], None]) -> None:
        """Register a handler for a specific feedback type"""
        if feedback_type not in self.feedback_handlers:
            self.feedback_handlers[feedback_type] = []
            
        self.feedback_handlers[feedback_type].append(handler)
        self.logger.info(f"Registered handler for {feedback_type.value}")
    
    def _monitor_loop(self) -> None:
        """Main monitoring loop for the feedback system"""
        last_check = time.time()
        
        while self.active:
            now = time.time()
            
            # Respect the phi-harmonic timing for observations
            if now - last_check >= self.observation_interval:
                try:
                    self._check_coherence()
                    self._check_state_alignment()
                    self._check_intention_resonance()
                    self._adjust_phi_timing()
                    
                    # Update timing points for phi-harmonic timing
                    self.phi_timing_points.append(now)
                    if len(self.phi_timing_points) > 10:
                        self.phi_timing_points.pop(0)
                        
                    # Record coherence
                    with self.lock:
                        self.coherence_history.append(
                            (now, self.consciousness.coherence)
                        )
                        if len(self.coherence_history) > 100:
                            self.coherence_history.pop(0)
                            
                    last_check = now
                    
                except Exception as e:
                    self.logger.error(f"Error in feedback loop: {str(e)}")
                    
            # Sleep for a short time to avoid CPU overload
            time.sleep(0.1)
    
    def _check_coherence(self) -> None:
        """Check coherence levels and generate feedback if needed"""
        # Get current coherence
        current_coherence = self.consciousness.coherence
        
        # Get coherence history
        with self.lock:
            history = list(self.coherence_history)
        
        # Need at least 3 points for trend analysis
        if len(history) < 3:
            return
            
        # Calculate trend
        recent_coherence = [c for _, c in history[-3:]]
        trend = sum(recent_coherence) / len(recent_coherence) - recent_coherence[0]
        
        # Generate feedback if coherence is dropping or too low
        if trend < -0.1 or current_coherence < 0.5:
            suggestions = []
            
            if current_coherence < 0.3:
                suggestions.append("Switch to a higher consciousness state")
                suggestions.append("Create a new intention field with higher frequency")
            elif trend < -0.1:
                suggestions.append("Amplify current intention field")
                suggestions.append("Pause deployment until coherence stabilizes")
            
            # Create feedback event
            event = FeedbackEvent(
                type=FeedbackType.COHERENCE,
                message=f"Coherence dropping or low ({current_coherence:.2f})",
                timestamp=time.time(),
                coherence=current_coherence,
                state=self.consciousness.current_state,
                suggested_actions=suggestions,
                metrics={
                    "trend": trend,
                    "recent_history": recent_coherence
                }
            )
            
            # Add to events and notify handlers
            self._add_feedback_event(event)
        
        # Check for optimal phi-harmonic coherence
        if abs(current_coherence - PHI_RECIPROCAL) < 0.05:
            event = FeedbackEvent(
                type=FeedbackType.COHERENCE,
                message=f"Achieved phi-harmonic coherence",
                timestamp=time.time(),
                coherence=current_coherence,
                state=self.consciousness.current_state,
                suggested_actions=["Maintain current state"],
                metrics={
                    "phi_alignment": abs(current_coherence - PHI_RECIPROCAL)
                }
            )
            
            # Add to events without considering it a problem
            self._add_feedback_event(event)
    
    def _check_state_alignment(self) -> None:
        """Check if the current state aligns with deployment needs"""
        current_state = self.consciousness.current_state
        
        # Ideal states for different operations
        ideal_states = {
            "validation": ConsciousnessState.OBSERVE,
            "creation": ConsciousnessState.CREATE,
            "optimization": ConsciousnessState.TRANSCEND,
            "full_deployment": ConsciousnessState.CASCADE
        }
        
        # Determine current operation based on time of day or other factors
        # For this example, we'll use a simple time-based approach
        hour = time.localtime().tm_hour
        
        if 5 <= hour < 10:  # Morning
            current_operation = "creation"
        elif 10 <= hour < 14:  # Mid-day
            current_operation = "validation"
        elif 14 <= hour < 18:  # Afternoon
            current_operation = "optimization"
        else:  # Evening/night
            current_operation = "full_deployment"
        
        # Check if current state matches ideal state for operation
        ideal_state = ideal_states.get(current_operation)
        if ideal_state != current_state:
            event = FeedbackEvent(
                type=FeedbackType.STATE,
                message=f"State not optimal for {current_operation}",
                timestamp=time.time(),
                coherence=self.consciousness.coherence,
                state=current_state,
                suggested_actions=[f"Switch to {ideal_state.value} for optimal {current_operation}"],
                metrics={
                    "current_operation": current_operation,
                    "ideal_state": ideal_state.value,
                    "alignment_factor": 0.5  # Could be calculated based on state similarity
                }
            )
            
            self._add_feedback_event(event)
    
    def _check_intention_resonance(self) -> None:
        """Check if the intention field is resonating properly"""
        # Skip if no intention field
        if not self.consciousness.intention_field:
            return
            
        intention = self.consciousness.intention_field
        
        # Check for intention-state alignment
        state_intention_map = {
            ConsciousnessState.OBSERVE: [IntentionType.STABILITY],
            ConsciousnessState.CREATE: [IntentionType.CREATION, IntentionType.EXPRESSION],
            ConsciousnessState.TRANSCEND: [IntentionType.VISION, IntentionType.COSMIC],
            ConsciousnessState.CASCADE: [IntentionType.UNITY, IntentionType.COSMIC]
        }
        
        aligned_intentions = state_intention_map.get(self.consciousness.current_state, [])
        if intention.type not in aligned_intentions and aligned_intentions:
            event = FeedbackEvent(
                type=FeedbackType.INTENTION,
                message=f"Intention not aligned with consciousness state",
                timestamp=time.time(),
                coherence=self.consciousness.coherence,
                state=self.consciousness.current_state,
                suggested_actions=[f"Create new intention of type {i.value}" for i in aligned_intentions[:1]],
                metrics={
                    "current_intention": intention.type.value,
                    "intention_strength": intention.strength,
                    "aligned_intentions": [i.value for i in aligned_intentions]
                }
            )
            
            self._add_feedback_event(event)
        
        # Check for intention strength decay
        if intention.strength < 0.5:
            event = FeedbackEvent(
                type=FeedbackType.INTENTION,
                message=f"Intention field weakening",
                timestamp=time.time(),
                coherence=self.consciousness.coherence,
                state=self.consciousness.current_state,
                suggested_actions=["Amplify intention field", "Create new intention field"],
                metrics={
                    "intention_strength": intention.strength,
                    "intention_coherence": intention.coherence
                }
            )
            
            self._add_feedback_event(event)
    
    def _adjust_phi_timing(self) -> None:
        """Adjust timing to maintain phi-harmonic relationship"""
        if len(self.phi_timing_points) < 3:
            return
            
        # Calculate time differences
        diffs = [self.phi_timing_points[i+1] - self.phi_timing_points[i] 
                 for i in range(len(self.phi_timing_points)-1)]
        
        # Calculate average time difference
        avg_diff = sum(diffs) / len(diffs)
        
        # Calculate optimal phi-harmonic interval
        optimal_interval = avg_diff * PHI
        
        # Adjust observation interval to maintain phi-harmonic timing
        self.observation_interval = optimal_interval
        
        # Calculate phi-harmonic alignment factor (1.0 = perfect)
        if len(diffs) > 1:
            # Check if differences follow golden ratio
            ratios = [diffs[i+1] / diffs[i] if diffs[i] > 0 else 0 
                     for i in range(len(diffs)-1)]
            
            phi_alignment = [abs(ratio - PHI) < 0.1 for ratio in ratios]
            alignment_factor = sum(1 for aligned in phi_alignment if aligned) / len(phi_alignment)
            
            # Generate feedback if alignment is off
            if alignment_factor < 0.5:
                event = FeedbackEvent(
                    type=FeedbackType.TIMING,
                    message=f"Deployment timing not phi-harmonic",
                    timestamp=time.time(),
                    coherence=self.consciousness.coherence,
                    state=self.consciousness.current_state,
                    suggested_actions=["Adjust deployment timing to follow phi ratio"],
                    metrics={
                        "phi_alignment": alignment_factor,
                        "optimal_interval": optimal_interval,
                        "current_intervals": diffs
                    }
                )
                
                self._add_feedback_event(event)
    
    def _add_feedback_event(self, event: FeedbackEvent) -> None:
        """Add a feedback event and notify handlers"""
        with self.lock:
            self.feedback_events.append(event)
            if len(self.feedback_events) > 100:
                self.feedback_events.pop(0)
        
        # Log the event
        self.logger.info(f"Feedback: {event.message}")
        
        # Notify handlers
        handlers = self.feedback_handlers.get(event.type, [])
        for handler in handlers:
            try:
                handler(event)
            except Exception as e:
                self.logger.error(f"Error in feedback handler: {str(e)}")
    
    def get_recent_feedback(self, count: int = 10) -> List[Dict[str, Any]]:
        """Get recent feedback events as dictionaries"""
        with self.lock:
            recent = self.feedback_events[-count:]
            
        return [{
            "type": event.type.value,
            "message": event.message,
            "timestamp": event.timestamp,
            "coherence": event.coherence,
            "state": event.state.value,
            "suggested_actions": event.suggested_actions,
            "metrics": event.metrics
        } for event in recent]
    
    def get_coherence_metrics(self) -> Dict[str, Any]:
        """Get coherence metrics from the feedback system"""
        with self.lock:
            history = list(self.coherence_history)
        
        if not history:
            return {
                "current": 0.0,
                "average": 0.0,
                "trend": 0.0,
                "phi_harmonic_factor": 0.0
            }
        
        current = history[-1][1]
        average = sum(c for _, c in history) / len(history)
        
        # Calculate trend (positive = improving)
        if len(history) > 5:
            recent_avg = sum(c for _, c in history[-5:]) / 5
            older_avg = sum(c for _, c in history[:-5]) / (len(history) - 5)
            trend = recent_avg - older_avg
        else:
            trend = 0.0
        
        # Calculate phi-harmonic factor
        # How close are the coherence oscillations to phi-harmonic pattern?
        phi_harmonic_factor = 0.5  # Default middle value
        
        if len(history) > 10:
            diffs = [history[i+1][1] - history[i][1] for i in range(len(history)-1)]
            if len(diffs) > 1:
                # Look for oscillations with phi ratio
                ratios = [abs(diffs[i]) / abs(diffs[i-1]) if abs(diffs[i-1]) > 0.01 else 0 
                         for i in range(1, len(diffs))]
                phi_matches = [abs(ratio - PHI) < 0.2 or abs(ratio - PHI_RECIPROCAL) < 0.2 
                              for ratio in ratios]
                if phi_matches:
                    phi_harmonic_factor = sum(1 for m in phi_matches if m) / len(phi_matches)
        
        return {
            "current": current,
            "average": average,
            "trend": trend,
            "phi_harmonic_factor": phi_harmonic_factor
        }
    
    def get_state_transition_metrics(self) -> Dict[str, Any]:
        """Get metrics about state transitions"""
        with self.lock:
            transitions = list(self.state_transition_times)
        
        if len(transitions) < 2:
            return {
                "total_transitions": 0,
                "average_duration": 0.0,
                "current_state_duration": 0.0
            }
        
        # Calculate transitions
        state_durations = {}
        for i in range(len(transitions) - 1):
            state = transitions[i][1]
            duration = transitions[i+1][0] - transitions[i][0]
            
            if state not in state_durations:
                state_durations[state] = []
            state_durations[state].append(duration)
        
        # Current state duration
        current_state = transitions[-1][1]
        current_duration = time.time() - transitions[-1][0]
        
        # Average durations by state
        avg_durations = {
            state.value: sum(durations) / len(durations) 
            for state, durations in state_durations.items()
        }
        
        # Total transitions
        total_transitions = len(transitions) - 1
        
        # Average durations across all states
        all_durations = [d for durations in state_durations.values() for d in durations]
        avg_duration = sum(all_durations) / len(all_durations) if all_durations else 0.0
        
        return {
            "total_transitions": total_transitions,
            "average_duration": avg_duration,
            "current_state": current_state.value,
            "current_state_duration": current_duration,
            "state_avg_durations": avg_durations
        }
    
    def suggest_next_state(self) -> Tuple[ConsciousnessState, str]:
        """Suggest the next optimal consciousness state based on analysis"""
        current = self.consciousness.current_state
        coherence = self.consciousness.coherence
        
        # Get time of day factor
        hour = time.localtime().tm_hour
        
        # Flow States:
        # 1. OBSERVE->CREATE->TRANSCEND->CASCADE (day cycle)
        # 2. If coherence is low, move back to OBSERVE 
        # 3. If coherence is high, consider jumping ahead
        
        if coherence < 0.3:
            # Low coherence - reset to OBSERVE
            return ConsciousnessState.OBSERVE, "Low coherence detected, reset to Observer state"
        
        if current == ConsciousnessState.OBSERVE:
            if coherence > 0.7 and 5 <= hour < 14:
                return ConsciousnessState.CREATE, "Observer state complete, move to Creator state"
            else:
                return current, "Maintain Observer state for stability"
                
        elif current == ConsciousnessState.CREATE:
            if coherence > 0.8 and 10 <= hour < 18:
                return ConsciousnessState.TRANSCEND, "Creation complete, ready to Transcend"
            elif coherence < 0.4:
                return ConsciousnessState.OBSERVE, "Creation coherence low, return to Observer state"
            else:
                return current, "Maintain Creator state for continued creation"
                
        elif current == ConsciousnessState.TRANSCEND:
            if coherence > 0.9 and (hour >= 18 or hour < 5):
                return ConsciousnessState.CASCADE, "Transcendence complete, ready for Cascade state"
            elif coherence < 0.5:
                return ConsciousnessState.CREATE, "Transcendence coherence dropping, return to Creator state"
            else:
                return current, "Maintain Transcendent state for continued expansion"
                
        elif current == ConsciousnessState.CASCADE:
            if 5 <= hour < 10:
                return ConsciousnessState.OBSERVE, "Cascade complete, begin new cycle with Observer state"
            else:
                return current, "Maintain Cascade state for continued integration"
        
        # Default
        return current, "Maintain current state"
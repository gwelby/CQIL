"""
Tests for the Temporal Evolution System component.
"""

import pytest
import sys
import os
import math
import random
import time
import importlib

# Add required paths
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Try to import the component
try:
    from temporal.temporal_evolution_system import TemporalEvolutionSystem, EvolutionMode, TimelineType, EventType
except ImportError:
    TemporalEvolutionSystem = None
    EvolutionMode = None
    TimelineType = None
    EventType = None

@pytest.fixture
def temporal_component():
    """Return a configured Temporal Evolution System instance for testing."""
    if TemporalEvolutionSystem is None:
        pytest.skip("Temporal Evolution System not available")
    # Set random seed for reproducible tests
    random.seed(42)
    return TemporalEvolutionSystem()

def test_component_initialization(temporal_component, sacred_frequencies):
    """Test that the component initializes correctly."""
    # Check frequency
    assert temporal_component.frequency == sacred_frequencies["voice"]
    
    # Check ZEN POINT balance
    assert math.isclose(temporal_component.zen_point_balance, 1.0, rel_tol=1e-12)
    
    # Check coherence level
    assert temporal_component.coherence_level == 1.0
    
    # Check primary timeline is created
    assert temporal_component.active_timeline_id is not None
    assert len(temporal_component.timelines) == 1
    
    # Check active timeline
    active_timeline = temporal_component.timelines[temporal_component.active_timeline_id]
    assert active_timeline["type"] == TimelineType.PRIMARY.value
    assert active_timeline["phi_harmonic"] is True
    assert len(active_timeline["snapshots"]) > 0

def test_evolution_modes(temporal_component):
    """Test that all evolution modes are properly initialized."""
    # Check evolution models exist
    assert len(temporal_component.evolution_models) == 5
    
    # Check specific models
    assert EvolutionMode.DIFFUSION.value in temporal_component.evolution_models
    assert EvolutionMode.WAVE.value in temporal_component.evolution_models
    assert EvolutionMode.REACTION_DIFFUSION.value in temporal_component.evolution_models
    assert EvolutionMode.QUANTUM.value in temporal_component.evolution_models
    assert EvolutionMode.PHI_HARMONIC.value in temporal_component.evolution_models
    
    # Check model properties
    phi_harmonic = temporal_component.evolution_models[EvolutionMode.PHI_HARMONIC.value]
    assert "phi_factor" in phi_harmonic
    assert "lambda_factor" in phi_harmonic
    assert "phi_phi_factor" in phi_harmonic
    assert "coherence_preservation" in phi_harmonic
    assert phi_harmonic["coherence_preservation"] >= 0.9

def test_event_detectors(temporal_component):
    """Test that all event detectors are properly initialized."""
    # Check event detectors exist
    assert len(temporal_component.event_detectors) == 6
    
    # Check specific detectors
    assert EventType.PHI_ALIGNMENT.value in temporal_component.event_detectors
    assert EventType.COHERENCE_SHIFT.value in temporal_component.event_detectors
    assert EventType.FIELD_MUTATION.value in temporal_component.event_detectors
    assert EventType.TIMELINE_BRANCH.value in temporal_component.event_detectors
    assert EventType.TIMELINE_MERGE.value in temporal_component.event_detectors
    assert EventType.DIMENSIONAL_SHIFT.value in temporal_component.event_detectors
    
    # Check detector properties
    phi_alignment = temporal_component.event_detectors[EventType.PHI_ALIGNMENT.value]
    assert "threshold" in phi_alignment
    assert "comparison_method" in phi_alignment
    assert "significant_ratios" in phi_alignment
    assert phi_alignment["threshold"] >= 0.9

def test_timeline_branching(temporal_component, phi_constants):
    """Test timeline branching."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch
    branch = temporal_component.create_timeline_branch(
        parent_id=primary_id,
        name="Test Branch",
        branch_factor=phi_constants["PHI"]
    )
    
    # Check branch creation
    assert branch["id"] is not None
    assert branch["name"] == "Test Branch"
    assert branch["type"] == TimelineType.BRANCH.value
    assert branch["parent_id"] == primary_id
    assert "branching_point_id" in branch
    
    # Verify branch in component
    assert branch["id"] in temporal_component.timelines
    
    # Verify parent was updated
    primary = temporal_component.timelines[primary_id]
    assert branch["id"] in primary["children_ids"]
    
    # Verify branching point was created
    branching_point_id = branch["branching_point_id"]
    assert branching_point_id in temporal_component.branching_points
    
    # Verify event was created
    branch_timeline = temporal_component.timelines[branch["id"]]
    assert len(branch_timeline["events"]) > 0
    
    # First event should be timeline branch event
    event_id = branch_timeline["events"][0]
    event = temporal_component.events[event_id]
    assert event["type"] == EventType.TIMELINE_BRANCH.value

def test_timeline_merging(temporal_component):
    """Test timeline merging."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch
    branch = temporal_component.create_timeline_branch(primary_id, "Merge Test Branch")
    branch_id = branch["id"]
    
    # Schedule a merge
    merge_point = temporal_component.schedule_timeline_merge(
        source_id=branch_id,
        target_id=primary_id
    )
    
    # Check merge point creation
    assert merge_point["id"] is not None
    assert merge_point["source_id"] == branch_id
    assert merge_point["target_id"] == primary_id
    assert merge_point["status"] == "scheduled"
    assert "scheduled_time" in merge_point
    assert "coherence" in merge_point
    
    # Verify merge point in component
    assert merge_point["id"] in temporal_component.merge_points
    
    # Verify source timeline was updated
    branch_timeline = temporal_component.timelines[branch_id]
    assert any(target["merge_point_id"] == merge_point["id"] for target in branch_timeline["merge_targets"])
    
    # Perform the merge
    merge_result = temporal_component.perform_timeline_merge(merge_point["id"])
    
    # Check merge result
    assert merge_result["status"] == "success"
    assert merge_result["source_id"] == branch_id
    assert merge_result["target_id"] == primary_id
    assert "merged_timeline_id" in merge_result
    
    # Verify merged timeline was created
    merged_id = merge_result["merged_timeline_id"]
    assert merged_id in temporal_component.timelines
    
    # Check merged timeline properties
    merged = temporal_component.timelines[merged_id]
    assert merged["type"] == TimelineType.MERGE.value
    assert primary_id in merged["parent_ids"]
    assert branch_id in merged["parent_ids"]
    assert "merge_point_id" in merged
    assert merged["merge_point_id"] == merge_point["id"]
    
    # Verify merge point was updated
    updated_merge_point = temporal_component.merge_points[merge_point["id"]]
    assert updated_merge_point["status"] == "completed"
    assert updated_merge_point["merged_timeline_id"] == merged_id

def test_timeline_evolution(temporal_component):
    """Test timeline evolution."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch with a specific evolution mode
    branch = temporal_component.create_timeline_branch(
        primary_id, 
        "Evolution Test Branch",
        evolution_mode=EvolutionMode.PHI_HARMONIC
    )
    branch_id = branch["id"]
    
    # Evolve the timeline
    evolution_result = temporal_component.evolve_timeline(
        timeline_id=branch_id,
        iterations=5,
        evolution_factor=1.2
    )
    
    # Check evolution result
    assert evolution_result["status"] == "success"
    assert evolution_result["timeline_id"] == branch_id
    assert evolution_result["evolution_mode"] == EvolutionMode.PHI_HARMONIC.value
    assert "initial_coherence" in evolution_result
    assert "final_coherence" in evolution_result
    assert "iterations" in evolution_result
    assert "evolutions" in evolution_result
    
    # Check coherence is in valid range
    assert 0.0 <= evolution_result["final_coherence"] <= 1.0
    
    # Check evolutions were recorded
    evolutions = evolution_result["evolutions"]
    assert len(evolutions) > 0
    
    # Check evolution details
    first_evolution = evolutions[0]
    assert "iteration" in first_evolution
    assert "coherence" in first_evolution
    
    # Verify timeline was updated
    updated_branch = temporal_component.timelines[branch_id]
    assert updated_branch["coherence"] == evolution_result["final_coherence"]
    
    # Verify snapshots were created
    assert len(updated_branch["snapshots"]) >= 2  # Initial + post-evolution
    
    # Verify event was created
    assert len(updated_branch["events"]) >= 1

def test_evolution_models(temporal_component):
    """Test all evolution models."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    evolution_modes = [
        EvolutionMode.DIFFUSION,
        EvolutionMode.WAVE,
        EvolutionMode.REACTION_DIFFUSION,
        EvolutionMode.QUANTUM,
        EvolutionMode.PHI_HARMONIC
    ]
    
    for mode in evolution_modes:
        # Create a branch with this evolution mode
        branch = temporal_component.create_timeline_branch(
            primary_id,
            f"{mode.value} Test",
            evolution_mode=mode
        )
        branch_id = branch["id"]
        
        # Evolve using this mode
        evolution_result = temporal_component.evolve_timeline(
            timeline_id=branch_id,
            iterations=3,
            evolution_factor=1.0
        )
        
        # Check evolution mode
        assert evolution_result["evolution_mode"] == mode.value
        
        # Coherence should be in valid range
        assert 0.0 <= evolution_result["final_coherence"] <= 1.0
        
        # Check mode-specific details in evolution
        evolutions = evolution_result["evolutions"]
        assert len(evolutions) > 0
        
        # Different models have different keys
        if mode == EvolutionMode.DIFFUSION:
            assert "delta" in evolutions[0]
        elif mode == EvolutionMode.WAVE:
            assert "wave_effect" in evolutions[0]
        elif mode == EvolutionMode.REACTION_DIFFUSION:
            assert "complexity" in evolutions[0]
        elif mode == EvolutionMode.QUANTUM:
            assert "effect" in evolutions[0]
        elif mode == EvolutionMode.PHI_HARMONIC:
            assert "harmonic_factor" in evolutions[0]

def test_time_acceleration_deceleration(temporal_component, phi_constants):
    """Test time acceleration and deceleration."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch
    branch = temporal_component.create_timeline_branch(primary_id, "Time Test Branch")
    branch_id = branch["id"]
    
    # Test acceleration
    acceleration_result = temporal_component.accelerate_time(
        timeline_id=branch_id,
        acceleration_factor=phi_constants["PHI"],
        duration=1.0
    )
    
    # Check acceleration result
    assert acceleration_result["status"] == "success"
    assert acceleration_result["timeline_id"] == branch_id
    assert acceleration_result["acceleration_factor"] == phi_constants["PHI"]
    assert "effective_time" in acceleration_result
    assert acceleration_result["effective_time"] > 1.0  # Should be accelerated
    
    # Test deceleration
    deceleration_result = temporal_component.decelerate_time(
        timeline_id=branch_id,
        deceleration_factor=phi_constants["LAMBDA"],
        duration=1.0
    )
    
    # Check deceleration result
    assert deceleration_result["status"] == "success"
    assert deceleration_result["timeline_id"] == branch_id
    assert deceleration_result["deceleration_factor"] == phi_constants["LAMBDA"]
    assert "effective_time" in deceleration_result
    assert deceleration_result["effective_time"] < 1.0  # Should be decelerated

def test_event_detection(temporal_component):
    """Test event detection."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch
    branch = temporal_component.create_timeline_branch(primary_id, "Event Test Branch")
    branch_id = branch["id"]
    
    # Evolve significantly to create events
    temporal_component.evolve_timeline(
        timeline_id=branch_id,
        iterations=10,
        evolution_factor=1.5
    )
    
    # Detect events
    detection_result = temporal_component.detect_timeline_events(
        timeline_id=branch_id,
        threshold=0.85
    )
    
    # Check detection result
    assert detection_result["status"] == "success"
    assert detection_result["timeline_id"] == branch_id
    assert "detected_count" in detection_result
    assert "detected_events" in detection_result
    assert "threshold" in detection_result
    assert "event_types" in detection_result
    
    # Check detected events
    detected_events = detection_result["detected_events"]
    if len(detected_events) > 0:
        # Check first event
        first_event = detected_events[0]
        assert "event_type" in first_event
        assert "event_id" in first_event
        assert "description" in first_event
        assert "detection_details" in first_event
        
        # Verify event was added to timeline
        branch_timeline = temporal_component.timelines[branch_id]
        assert first_event["event_id"] in branch_timeline["events"]

def test_timeline_history(temporal_component):
    """Test getting timeline history."""
    # Get the primary timeline
    primary_id = temporal_component.active_timeline_id
    
    # Create a branch and evolve it
    branch = temporal_component.create_timeline_branch(primary_id, "History Test Branch")
    branch_id = branch["id"]
    
    temporal_component.evolve_timeline(
        timeline_id=branch_id,
        iterations=3
    )
    
    # Get history
    history_result = temporal_component.get_timeline_history(
        timeline_id=branch_id,
        include_snapshots=True,
        include_events=True
    )
    
    # Check history result
    assert history_result["status"] == "success"
    assert history_result["timeline_id"] == branch_id
    assert "history" in history_result
    
    # Check history content
    history = history_result["history"]
    assert history["id"] == branch_id
    assert history["name"] == "History Test Branch"
    assert history["type"] == TimelineType.BRANCH.value
    assert "current_coherence" in history
    assert "current_state" in history
    assert "evolution_mode" in history
    assert "parent_id" in history
    assert history["parent_id"] == primary_id
    
    # Check snapshots and events
    assert "snapshots" in history
    assert len(history["snapshots"]) >= 2  # Initial + after evolution
    assert "events" in history
    assert len(history["events"]) >= 1  # Branch creation event
    
    # Check snapshot structure
    first_snapshot = history["snapshots"][0]
    assert "timeline_id" in first_snapshot
    assert "coherence" in first_snapshot
    assert "phi_signature" in first_snapshot
    assert "dimensional_signature" in first_snapshot
    
    # Check event structure
    first_event = history["events"][0]
    assert "type" in first_event
    assert "timeline_id" in first_event
    assert "description" in first_event
    assert "data" in first_event
    assert "phi_signature" in first_event

def test_phi_harmonic_integration(temporal_component, phi_constants):
    """Test phi-harmonic integration throughout the system."""
    # Check phi-harmonic constants
    PHI = phi_constants["PHI"]
    LAMBDA = phi_constants["LAMBDA"]
    
    # Test branching with phi factor
    branch = temporal_component.create_timeline_branch(
        branch_factor=PHI
    )
    branch_id = branch["id"]
    
    # Test evolution with phi factor
    evolution_result = temporal_component.evolve_timeline(
        timeline_id=branch_id,
        evolution_mode=EvolutionMode.PHI_HARMONIC,
        evolution_factor=PHI
    )
    
    # Check phi-harmonic evolution
    evolutions = evolution_result["evolutions"]
    assert len(evolutions) > 0
    
    # Check phi signature in snapshots
    branch_timeline = temporal_component.timelines[branch_id]
    last_snapshot = branch_timeline["snapshots"][-1]
    assert "phi_signature" in last_snapshot
    
    # Phi signature should be an array of 8 values
    phi_signature = last_snapshot["phi_signature"]
    assert len(phi_signature) == 8
    
    # Check dimensional signature
    assert "dimensional_signature" in last_snapshot
    dim_signature = last_snapshot["dimensional_signature"]
    
    # Should have entries for dimensions 3-12
    assert len(dim_signature) == 10
    for dim in range(3, 13):
        assert dim in dim_signature
        assert 0.0 <= dim_signature[dim] <= 1.0
    
    # Test merging with lambda factor
    target_branch = temporal_component.create_timeline_branch()
    
    merge_point = temporal_component.schedule_timeline_merge(
        source_id=branch_id,
        target_id=target_branch["id"],
        merge_factor=LAMBDA
    )
    
    # Check merge uses lambda
    assert merge_point["merge_factor"] == LAMBDA

def test_sacred_frequencies(temporal_component, sacred_frequencies):
    """Test access to sacred frequencies."""
    # Get frequencies from component
    frequencies = temporal_component.get_sacred_frequencies()
    
    # Check all frequencies match
    for key, value in sacred_frequencies.items():
        assert key in frequencies
        assert frequencies[key] == value
    
    # Check Voice Flow frequency
    assert frequencies["voice"] == 672
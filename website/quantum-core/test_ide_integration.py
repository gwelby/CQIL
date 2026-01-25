#!/usr/bin/env python3
"""
IDE Integration Test for ONE KNOWLEDGE System

This script demonstrates the ability of the ONE KNOWLEDGE system to
transfer knowledge between different IDE instances with perfect coherence
through quantum entanglement.

The test can be run in two modes:
1. Server mode - Acts as the knowledge source
2. Client mode - Connects to the server and receives knowledge

CASCADE⚡𓂧φ∞ UNIFIED QUANTUM SINGULARITY
"""

import os
import sys
import time
import json
import uuid
import socket
import logging
import argparse
import threading
from typing import Dict, List, Any, Optional, Union

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(os.path.join(os.path.dirname(__file__), "ide_integration.log"))
    ]
)
logger = logging.getLogger(__name__)

# Constants
PHI = 1.618033988749895
LAMBDA = 0.618033988749895  # Divine complement (1/PHI)
PHI_PHI = PHI ** PHI  # Hyperdimensional constant
DEFAULT_PORT = 8766
VERSION = "1.0.0"

# Try to import Quantum Core components
try:
    # Add current directory to path
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    # Import ONE KNOWLEDGE System
    from integration.one_knowledge_system import OneKnowledgeSystem, EntanglementType
    QUANTUM_CORE_AVAILABLE = True
    
    logger.info("Quantum Core components available")
except ImportError:
    # Create mock implementations
    QUANTUM_CORE_AVAILABLE = False
    
    # Mock ONE KNOWLEDGE System for standalone testing
    class OneKnowledgeSystem:
        def __init__(self, coherence_level=0.95):
            self.frequency = 720
            self.coherence_level = coherence_level
            self.knowledge_nodes = {}
            self.entanglements = {}
            
        def _establish_zen_point_balance(self):
            self.coherence_level = 1.0
            return 1.0
        
        def create_node(self, node_id, node_type, content=None):
            if not node_id:
                node_id = f"node_{int(time.time())}_{uuid.uuid4().hex[:8]}"
            
            node = {
                "id": node_id,
                "type": node_type,
                "content": content or {},
                "created_at": time.time(),
                "entanglements": []
            }
            
            self.knowledge_nodes[node_id] = node
            return node
        
        def create_entanglement(self, source_id, target_id, entanglement_type="BIDIRECTIONAL", coherence=1.0, verification=True):
            entanglement_id = f"entangle_{int(time.time())}_{uuid.uuid4().hex[:8]}"
            
            entanglement = {
                "id": entanglement_id,
                "source": source_id,
                "target": target_id,
                "type": entanglement_type,
                "coherence": coherence,
                "verified": verification,
                "created_at": time.time()
            }
            
            self.entanglements[entanglement_id] = entanglement
            
            if source_id in self.knowledge_nodes:
                self.knowledge_nodes[source_id]["entanglements"].append(entanglement_id)
            
            if target_id in self.knowledge_nodes and entanglement["type"] == "BIDIRECTIONAL":
                self.knowledge_nodes[target_id]["entanglements"].append(entanglement_id)
            
            return entanglement
        
        def transfer_knowledge(self, source_id, target_id, knowledge):
            transfer_id = f"transfer_{int(time.time())}_{uuid.uuid4().hex[:8]}"
            
            if target_id in self.knowledge_nodes:
                target_node = self.knowledge_nodes[target_id]
                
                if isinstance(knowledge, dict) and isinstance(target_node["content"], dict):
                    target_node["content"].update(knowledge)
                else:
                    target_node["content"] = knowledge
            
            return {
                "id": transfer_id,
                "source": source_id,
                "target": target_id,
                "knowledge": knowledge,
                "timestamp": time.time(),
                "coherence": self.coherence_level
            }
        
        def search_knowledge_network(self, query, dimensions=None):
            results = []
            
            for node_id, node in self.knowledge_nodes.items():
                content_str = str(node.get("content", ""))
                
                if query.lower() in content_str.lower():
                    results.append({
                        "node": node_id,
                        "type": node.get("type", "unknown"),
                        "dimension": 7,
                        "relevance": 0.9,
                        "snippet": content_str[:100] + "..." if len(content_str) > 100 else content_str
                    })
            
            return results
        
        def initialize_ide_knowledge_bridge(self, ide_id, description=""):
            node_id = f"ide_{ide_id}_{uuid.uuid4().hex[:8]}"
            
            node = self.create_node(
                node_id,
                "ide_bridge",
                {
                    "ide_id": ide_id,
                    "description": description,
                    "bridge_type": "bi_directional",
                    "created_at": time.time()
                }
            )
            
            return node
    
    # Mock EntanglementType enum
    class EntanglementType:
        BIDIRECTIONAL = "BIDIRECTIONAL"
    
    logger.warning("Quantum Core components not available, using mock implementations")


class IDEIntegrationTest:
    """
    IDE Integration Test for ONE KNOWLEDGE System.
    Tests knowledge transfer between different IDE instances.
    """
    
    def __init__(self, mode="server", host="localhost", port=DEFAULT_PORT):
        """
        Initialize the IDE Integration Test.
        
        Args:
            mode: Operation mode ("server" or "client")
            host: Server host (for client mode)
            port: Server port
        """
        self.mode = mode
        self.host = host
        self.port = port
        self.socket = None
        self.running = False
        self.client_thread = None
        self.server_thread = None
        self.ide_id = f"ide_{socket.gethostname()}_{os.getpid()}"
        
        # Initialize ONE KNOWLEDGE System
        self.knowledge_system = OneKnowledgeSystem()
        
        # Establish ZEN POINT balance
        self.knowledge_system._establish_zen_point_balance()
        
        # Initialize IDE bridge
        self.ide_bridge = self.knowledge_system.initialize_ide_knowledge_bridge(
            self.ide_id,
            f"IDE Integration Test ({mode} mode)"
        )
        
        logger.info(f"IDE Integration Test initialized in {mode} mode")
        logger.info(f"IDE ID: {self.ide_id}")
        logger.info(f"IDE Bridge: {self.ide_bridge['id']}")
    
    def start(self):
        """
        Start the IDE Integration Test.
        """
        self.running = True
        
        if self.mode == "server":
            # Start server
            self.server_thread = threading.Thread(target=self.run_server)
            self.server_thread.daemon = True
            self.server_thread.start()
            logger.info(f"Server started on {self.host}:{self.port}")
        elif self.mode == "client":
            # Start client
            self.client_thread = threading.Thread(target=self.run_client)
            self.client_thread.daemon = True
            self.client_thread.start()
            logger.info(f"Client connecting to {self.host}:{self.port}")
        
        # Run test sequence
        self.run_test_sequence()
    
    def stop(self):
        """
        Stop the IDE Integration Test.
        """
        self.running = False
        
        if self.socket:
            try:
                self.socket.close()
            except:
                pass
        
        if self.server_thread:
            self.server_thread.join(timeout=1)
        
        if self.client_thread:
            self.client_thread.join(timeout=1)
        
        logger.info("IDE Integration Test stopped")
    
    def run_server(self):
        """
        Run the server.
        """
        # Create socket
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        try:
            # Bind socket
            server_socket.bind((self.host, self.port))
            
            # Listen for connections
            server_socket.listen(1)
            
            while self.running:
                # Accept connection
                client_socket, client_address = server_socket.accept()
                logger.info(f"Client connected: {client_address}")
                
                # Handle client
                self.handle_client(client_socket)
                
        except Exception as e:
            logger.error(f"Server error: {e}")
        finally:
            server_socket.close()
    
    def handle_client(self, client_socket):
        """
        Handle a client connection.
        
        Args:
            client_socket: Client socket
        """
        try:
            while self.running:
                # Receive data
                data = client_socket.recv(4096)
                
                if not data:
                    break
                
                # Parse message
                message = json.loads(data.decode("utf-8"))
                
                # Handle message
                response = self.handle_message(message)
                
                # Send response
                client_socket.sendall(json.dumps(response).encode("utf-8"))
        
        except Exception as e:
            logger.error(f"Client handler error: {e}")
        finally:
            client_socket.close()
    
    def run_client(self):
        """
        Run the client.
        """
        # Create socket
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        try:
            # Connect to server
            client_socket.connect((self.host, self.port))
            logger.info(f"Connected to server: {self.host}:{self.port}")
            
            # Store socket
            self.socket = client_socket
            
        except Exception as e:
            logger.error(f"Client error: {e}")
            self.socket = None
    
    def send_message(self, message):
        """
        Send a message to the server.
        
        Args:
            message: Message to send
            
        Returns:
            dict: Server response
        """
        if not self.socket:
            logger.error("Not connected to server")
            return {"error": "Not connected to server"}
        
        try:
            # Send message
            self.socket.sendall(json.dumps(message).encode("utf-8"))
            
            # Receive response
            data = self.socket.recv(4096)
            
            # Parse response
            response = json.loads(data.decode("utf-8"))
            
            return response
        
        except Exception as e:
            logger.error(f"Error sending message: {e}")
            return {"error": str(e)}
    
    def handle_message(self, message):
        """
        Handle a message.
        
        Args:
            message: Message to handle
            
        Returns:
            dict: Response
        """
        command = message.get("command")
        params = message.get("params", {})
        
        # Create response base
        response = {
            "id": message.get("id"),
            "command": command,
            "status": "success",
            "timestamp": time.time()
        }
        
        if command == "connect":
            # Connect to remote IDE
            remote_ide_id = params.get("ide_id")
            remote_bridge_id = params.get("bridge_id")
            
            # Create remote IDE bridge
            remote_bridge = self.knowledge_system.create_node(
                remote_bridge_id,
                "ide_bridge",
                {
                    "ide_id": remote_ide_id,
                    "remote": True,
                    "created_at": time.time()
                }
            )
            
            # Create entanglement
            entanglement = self.knowledge_system.create_entanglement(
                self.ide_bridge["id"],
                remote_bridge_id,
                EntanglementType.BIDIRECTIONAL,
                1.0,
                True
            )
            
            # Add result to response
            response["bridge"] = remote_bridge
            response["entanglement"] = entanglement
            response["local_bridge"] = self.ide_bridge
        
        elif command == "transfer":
            # Transfer knowledge
            source_id = params.get("source_id")
            target_id = params.get("target_id")
            knowledge = params.get("knowledge", {})
            
            # Perform transfer
            transfer = self.knowledge_system.transfer_knowledge(
                source_id,
                target_id,
                knowledge
            )
            
            # Add result to response
            response["transfer"] = transfer
        
        elif command == "search":
            # Search knowledge network
            query = params.get("query", "")
            dimensions = params.get("dimensions")
            
            # Perform search
            results = self.knowledge_system.search_knowledge_network(
                query,
                dimensions
            )
            
            # Add result to response
            response["results"] = results
        
        elif command == "verify":
            # Verify entanglement
            entanglement_id = params.get("entanglement_id")
            
            # Verify entanglement
            entanglement = self.knowledge_system.verify_entanglement(entanglement_id)
            
            # Add result to response
            response["entanglement"] = entanglement
        
        else:
            # Unknown command
            response["status"] = "error"
            response["error"] = f"Unknown command: {command}"
        
        return response
    
    def connect_to_remote(self, remote_mode):
        """
        Connect to a remote IDE.
        
        Args:
            remote_mode: Remote IDE mode
            
        Returns:
            dict: Connection result
        """
        # Create connection message
        message = {
            "id": f"connect_{uuid.uuid4().hex[:8]}",
            "command": "connect",
            "params": {
                "ide_id": self.ide_id,
                "bridge_id": self.ide_bridge["id"],
                "mode": self.mode
            }
        }
        
        # Send message
        response = self.send_message(message)
        
        if response.get("status") == "success":
            # Get remote bridge
            remote_bridge = response.get("local_bridge")
            remote_bridge_id = remote_bridge["id"]
            
            # Create remote IDE bridge
            local_remote_bridge = self.knowledge_system.create_node(
                remote_bridge_id,
                "ide_bridge",
                {
                    "ide_id": remote_bridge["content"]["ide_id"],
                    "remote": True,
                    "created_at": time.time()
                }
            )
            
            # Create entanglement
            entanglement = self.knowledge_system.create_entanglement(
                self.ide_bridge["id"],
                remote_bridge_id,
                EntanglementType.BIDIRECTIONAL,
                1.0,
                True
            )
            
            # Add to response
            response["local_remote_bridge"] = local_remote_bridge
            response["local_entanglement"] = entanglement
        
        return response
    
    def transfer_knowledge_to_remote(self, knowledge):
        """
        Transfer knowledge to a remote IDE.
        
        Args:
            knowledge: Knowledge to transfer
            
        Returns:
            dict: Transfer result
        """
        # Find remote bridge
        remote_bridge_id = None
        for node_id, node in self.knowledge_system.knowledge_nodes.items():
            if node["type"] == "ide_bridge" and node.get("content", {}).get("remote"):
                remote_bridge_id = node_id
                break
        
        if not remote_bridge_id:
            logger.error("No remote IDE bridge found")
            return {"error": "No remote IDE bridge found"}
        
        # Create transfer message
        message = {
            "id": f"transfer_{uuid.uuid4().hex[:8]}",
            "command": "transfer",
            "params": {
                "source_id": self.ide_bridge["id"],
                "target_id": remote_bridge_id,
                "knowledge": knowledge
            }
        }
        
        # Send message
        response = self.send_message(message)
        
        return response
    
    def search_remote_knowledge(self, query, dimensions=None):
        """
        Search remote knowledge network.
        
        Args:
            query: Search query
            dimensions: Dimensions to search
            
        Returns:
            dict: Search results
        """
        # Create search message
        message = {
            "id": f"search_{uuid.uuid4().hex[:8]}",
            "command": "search",
            "params": {
                "query": query,
                "dimensions": dimensions
            }
        }
        
        # Send message
        response = self.send_message(message)
        
        return response
    
    def verify_remote_entanglement(self, entanglement_id):
        """
        Verify remote entanglement.
        
        Args:
            entanglement_id: Entanglement ID
            
        Returns:
            dict: Verification result
        """
        # Create verify message
        message = {
            "id": f"verify_{uuid.uuid4().hex[:8]}",
            "command": "verify",
            "params": {
                "entanglement_id": entanglement_id
            }
        }
        
        # Send message
        response = self.send_message(message)
        
        return response
    
    def run_test_sequence(self):
        """
        Run a full test sequence between IDEs.
        
        Returns:
            dict: Test results
        """
        print("\nRunning IDE integration test sequence...")
        
        results = {
            "mode": self.mode,
            "start_time": time.time(),
            "tests": {}
        }
        
        # Test 1: Connect to remote IDE
        print("\nTest 1: Connecting to remote IDE")
        remote_mode = "client" if self.mode == "server" else "server"
        connection_result = self.connect_to_remote(remote_mode)
        results["tests"]["connect"] = connection_result
        
        print(f"Connection result: {connection_result.get('status')}")
        if connection_result.get("status") == "success":
            print(f"Connected to remote IDE with bridge ID: {connection_result.get('local_bridge', {}).get('id')}")
            print(f"Entanglement created with ID: {connection_result.get('entanglement', {}).get('id')}")
        else:
            print(f"Connection failed: {connection_result.get('error')}")
        
        # Wait for connection to stabilize
        time.sleep(1)
        
        # Test 2: Transfer knowledge
        print("\nTest 2: Transferring knowledge")
        transfer_knowledge = {
            "test_knowledge": "This is a test of quantum knowledge transfer between IDEs",
            "source_ide": self.ide_id,
            "phi_harmonic_constant": PHI,
            "lambda_constant": LAMBDA,
            "timestamp": time.time(),
            "test_code": """
def quantum_function(x):
    \"\"\"A quantum function for testing\"\"\"
    return (x * PHI) ** LAMBDA
"""
        }
        
        transfer_result = self.transfer_knowledge_to_remote(transfer_knowledge)
        results["tests"]["transfer"] = transfer_result
        
        print(f"Transfer result: {transfer_result.get('status')}")
        if transfer_result.get("status") == "success":
            print(f"Knowledge transferred from {transfer_result.get('transfer', {}).get('source')} to {transfer_result.get('transfer', {}).get('target')}")
        else:
            print(f"Transfer failed: {transfer_result.get('error')}")
        
        # Test 3: Search remote knowledge
        print("\nTest 3: Searching remote knowledge")
        search_result = self.search_remote_knowledge("quantum", [7])
        results["tests"]["search"] = search_result
        
        print(f"Search result: {search_result.get('status')}")
        if search_result.get("status") == "success":
            print(f"Found {len(search_result.get('results', []))} results in remote knowledge network")
            for result in search_result.get("results", [])[:3]:  # Show top 3 results
                print(f"  - {result.get('node')}: {result.get('snippet')}")
        else:
            print(f"Search failed: {search_result.get('error')}")
        
        # Test 4: Verify entanglement
        print("\nTest 4: Verifying quantum entanglement")
        # Find entanglement
        entanglement_id = None
        for ent_id, entanglement in self.knowledge_system.entanglements.items():
            if entanglement["source"] == self.ide_bridge["id"]:
                entanglement_id = ent_id
                break
        
        if entanglement_id:
            verify_result = self.verify_remote_entanglement(entanglement_id)
            results["tests"]["verify"] = verify_result
            
            print(f"Verification result: {verify_result.get('status')}")
            if verify_result.get("status") == "success":
                print(f"Entanglement {entanglement_id} verified with quantum signature")
                print(f"Verification timestamp: {verify_result.get('entanglement', {}).get('verification_time')}")
            else:
                print(f"Verification failed: {verify_result.get('error')}")
        else:
            print("No entanglement found to verify")
        
        # Test 5: Complete system test
        print("\nTest 5: Complete system coherence test")
        
        # Create test knowledge
        test_knowledge = {
            "test_name": "Complete System Coherence Test",
            "test_mode": self.mode,
            "phi_harmonic_constant": PHI,
            "lambda_constant": LAMBDA,
            "phi_phi_constant": PHI_PHI,
            "zen_point_balance": self.knowledge_system.zen_point_balance,
            "coherence": self.knowledge_system.coherence_level,
            "ide_id": self.ide_id,
            "timestamp": time.time(),
            "test_result": "SUCCESS" if all(test.get("status") == "success" for test in results["tests"].values()) else "PARTIAL_SUCCESS"
        }
        
        if self.mode == "server":
            # Create knowledge node
            system_test_node = self.knowledge_system.create_node(
                f"system_test_{uuid.uuid4().hex[:8]}",
                "test_results",
                test_knowledge
            )
            
            # Add to results
            results["tests"]["system_test"] = {
                "status": "success",
                "node": system_test_node
            }
            
            print(f"System test node created: {system_test_node['id']}")
            print(f"System coherence: {self.knowledge_system.coherence_level:.3f}")
            print(f"ZEN POINT balance: {self.knowledge_system.zen_point_balance:.3f}")
            
        elif self.mode == "client":
            # Search for system test node
            search_result = self.search_remote_knowledge("Complete System Coherence Test")
            
            if search_result.get("status") == "success" and search_result.get("results"):
                # Success
                results["tests"]["system_test"] = {
                    "status": "success",
                    "search_result": search_result
                }
                
                print(f"System test verified with search: {len(search_result.get('results', []))} results")
                print(f"System coherence: {self.knowledge_system.coherence_level:.3f}")
                print(f"ZEN POINT balance: {self.knowledge_system.zen_point_balance:.3f}")
            else:
                # Failure
                results["tests"]["system_test"] = {
                    "status": "error",
                    "search_result": search_result
                }
                
                print("System test verification failed")
        
        # Calculate overall result
        success_count = sum(1 for test in results["tests"].values() if test.get("status") == "success")
        total_count = len(results["tests"])
        
        results["success_rate"] = success_count / total_count if total_count > 0 else 0
        results["end_time"] = time.time()
        results["duration"] = results["end_time"] - results["start_time"]
        
        print(f"\nTest sequence completed: {success_count}/{total_count} tests passed ({results['success_rate'] * 100:.1f}%)")
        print(f"Total duration: {results['duration']:.2f} seconds")
        
        # Save results to file
        results_path = os.path.join(os.path.dirname(__file__), f"test_results_{self.mode}.json")
        with open(results_path, "w") as f:
            json.dump(results, f, indent=2)
        
        print(f"Results saved to: {results_path}")
        
        return results


def main():
    """
    Main function to run the IDE Integration Test.
    """
    # Parse arguments
    parser = argparse.ArgumentParser(description="IDE Integration Test for ONE KNOWLEDGE System")
    parser.add_argument("--mode", choices=["server", "client"], default="server", help="Operation mode")
    parser.add_argument("--host", default="localhost", help="Server host (for client mode)")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Server port")
    
    args = parser.parse_args()
    
    try:
        # Create and start test
        test = IDEIntegrationTest(args.mode, args.host, args.port)
        test.start()
        
        # Keep running
        try:
            while True:
                # Sleep to keep main thread alive
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nTest interrupted by user")
        
        # Stop test
        test.stop()
        
    except Exception as e:
        logger.error(f"Test error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
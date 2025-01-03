#!/usr/bin/env python3
"""
CQIL Quantum Security System
Handles all quantum-secured communication and verification
"""

import hashlib
import datetime
from typing import Dict, List, Optional
from enum import Enum
import json

class SecurityLevel(Enum):
    QUANTUM = "✨"       # Quantum-secured
    ENCRYPTED = "🔒"    # Standard encryption
    PRIVATE = "👁️"      # Team-only
    PUBLIC = "📢"       # Public broadcast

class QuantumSignature:
    def __init__(self, content: str, author: str, timestamp: datetime.datetime):
        self.content = content
        self.author = author
        self.timestamp = timestamp
        self.quantum_state = self._generate_quantum_state()
        
    def _generate_quantum_state(self) -> str:
        """Generate quantum state for signature"""
        data = f"{self.content}:{self.author}:{self.timestamp.isoformat()}"
        return hashlib.sha256(data.encode()).hexdigest()
    
    def verify(self) -> bool:
        """Verify quantum signature"""
        current_state = self._generate_quantum_state()
        return current_state == self.quantum_state

class QuantumSecuritySystem:
    def __init__(self):
        self.signatures: Dict[str, QuantumSignature] = {}
        self.trusted_nodes: Dict[str, str] = {}  # node_id: quantum_key
        
    def sign_message(self, content: str, author: str) -> str:
        """Create quantum signature for message"""
        timestamp = datetime.datetime.now()
        signature = QuantumSignature(content, author, timestamp)
        sig_id = signature.quantum_state[:8]
        self.signatures[sig_id] = signature
        return sig_id
    
    def verify_message(self, content: str, author: str, sig_id: str) -> bool:
        """Verify message with quantum signature"""
        if sig_id not in self.signatures:
            return False
            
        signature = self.signatures[sig_id]
        return (signature.author == author and 
                signature.content == content and 
                signature.verify())
    
    def register_node(self, node_id: str) -> str:
        """Register trusted node with quantum key"""
        quantum_key = hashlib.sha256(f"{node_id}:{datetime.datetime.now().isoformat()}".encode()).hexdigest()
        self.trusted_nodes[node_id] = quantum_key
        return quantum_key
    
    def verify_node(self, node_id: str, quantum_key: str) -> bool:
        """Verify node's quantum key"""
        return self.trusted_nodes.get(node_id) == quantum_key

class QuantumMessage:
    def __init__(self, content: str, author: str, security: SecurityLevel):
        self.content = content
        self.author = author
        self.security = security
        self.timestamp = datetime.datetime.now()
        self.signature = None
        
    def sign(self, security_system: QuantumSecuritySystem):
        """Sign message with quantum signature"""
        self.signature = security_system.sign_message(self.content, self.author)
    
    def verify(self, security_system: QuantumSecuritySystem) -> bool:
        """Verify message authenticity"""
        if not self.signature:
            return False
        return security_system.verify_message(self.content, self.author, self.signature)

class SecureQuantumChannel:
    def __init__(self, channel_id: str):
        self.channel_id = channel_id
        self.security_system = QuantumSecuritySystem()
        self.messages: List[QuantumMessage] = []
        
    def send_message(self, content: str, author: str, 
                    security: SecurityLevel = SecurityLevel.QUANTUM) -> str:
        """Send quantum-secured message"""
        message = QuantumMessage(content, author, security)
        message.sign(self.security_system)
        self.messages.append(message)
        return message.signature
    
    def get_messages(self, viewer_id: str = None) -> List[QuantumMessage]:
        """Get viewable messages based on security level"""
        if not viewer_id:
            return [m for m in self.messages if m.security == SecurityLevel.PUBLIC]
            
        if viewer_id in self.security_system.trusted_nodes:
            return self.messages
            
        return [m for m in self.messages if m.security in 
                [SecurityLevel.PUBLIC, SecurityLevel.PRIVATE]]

def create_secure_channel(channel_id: str) -> SecureQuantumChannel:
    """Create new secure quantum channel"""
    return SecureQuantumChannel(channel_id)

if __name__ == "__main__":
    # Example usage
    channel = create_secure_channel("quantum_secure_1")
    
    # Send quantum-secured message
    sig = channel.send_message(
        "🎯 Quantum Play Call",
        "Coach",
        SecurityLevel.QUANTUM
    )
    
    # Verify message
    messages = channel.get_messages("team_member")
    for msg in messages:
        if msg.verify(channel.security_system):
            print(f"✅ Verified: {msg.content} from {msg.author}")

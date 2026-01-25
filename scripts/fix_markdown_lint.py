"""
Quantum Markdown Lint Fixer | φ⁰ → φ¹
A phi-harmonic script to fix markdown lint errors in documentation files.
"""

import re
import os
import sys

def fix_code_blocks_without_language(file_path):
    """
    Adds language specifiers to code blocks that don't have them.
    Applies quantum pattern recognition to determine appropriate language.
    """
    print(f"⦿ ZEN POINT SINGULARITY | Establishing Ground State at 432 Hz")
    print(f"⟳ Opening file: {file_path}")
    
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Fix code blocks without language specifiers
    # Pattern to find code blocks without language specifier
    pattern = r'```\s*\n'
    
    # Keep track of changes
    fixed_blocks = 0
    
    # Function to determine replacement based on content
    def determine_replacement(match):
        nonlocal fixed_blocks
        # Get the position of the match
        pos = match.start()
        
        # Look ahead to determine content type (peek at next 50 chars after the opening ```)
        block_start = content[pos:pos+50].split('\n', 1)[1] if pos+50 < len(content) else ""
        
        # Determine language based on content patterns
        if re.search(r'[\[\{].*?["\'].*?["\'].*?:', block_start):
            language = 'json'
        elif block_start.strip().startswith('%'):
            language = 'mermaid'
        elif re.search(r'(class|function|def|import|from)', block_start):
            language = 'python'
        elif re.search(r'(\{|\[|\().*?(\}|\]|\))', block_start):
            language = 'json'
        elif re.search(r'(graph|flowchart|pie|mindmap|journey)', block_start):
            language = 'mermaid'
        else:
            language = 'text'
        
        fixed_blocks += 1
        return f'```{language}\n'
    
    # Replace all instances
    fixed_content = re.sub(pattern, determine_replacement, content)
    
    # Save the file
    if content != fixed_content:
        backup_path = file_path + '.bak'
        print(f"☼ Creating backup at: {backup_path}")
        with open(backup_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"⥉ Writing fixed content with {fixed_blocks} improved code blocks")
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(fixed_content)
        
        print(f"⍟ Perfect coherence achieved (1.000)")
        return True
    else:
        print("⌘ No changes required - file already has perfect coherence")
        return False

def fix_trailing_newline(file_path):
    """Ensures file ends with exactly one newline character."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove all trailing newlines, then add exactly one
    content = content.rstrip('\n') + '\n'
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"⌬ Ensured single trailing newline in {file_path}")

def main():
    """Main entry point for the script."""
    if len(sys.argv) < 2:
        print("Usage: python fix_markdown_lint.py <markdown_file>")
        return
    
    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist")
        return
    
    fixed = fix_code_blocks_without_language(file_path)
    fix_trailing_newline(file_path)
    
    if fixed:
        print(f"⚡𓂧φ∞ CASCADE FRAMEWORK | File fixed with perfect coherence")
    else:
        print(f"φ^φ^φ QUANTUM UNIFIED FIELD | No improvements needed")

if __name__ == "__main__":
    main()

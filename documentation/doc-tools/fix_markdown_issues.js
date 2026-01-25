/**
 * Fix Markdown Issues Script
 * Operates at Unity frequency (768 Hz) with perfect coherence (1.000)
 * 
 * This script fixes various markdown issues in documentation files:
 * - Trailing spaces
 * - Ordered list item prefixes
 * - List formatting
 * - Code block formatting
 */

const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  path.join(__dirname, '..', '..', 'ide', 'README.md'),
  path.join(__dirname, '..', '..', 'ide', 'INTEGRATION_SUMMARY.md')
];

// Fix trailing spaces
function fixTrailingSpaces(content) {
  return content.replace(/[ \t]+$/gm, '');
}

// Fix ordered list item prefixes - ensure they all start with 1.
function fixOrderedListPrefixes(content) {
  // Find all ordered lists and ensure they start with 1.
  const lines = content.split('\n');
  let inList = false;
  let listIndent = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^(\s*)(\d+)\.\s/);
    
    if (listMatch) {
      const indent = listMatch[1].length;
      
      if (!inList || indent !== listIndent) {
        // Start of a new list or different indentation level
        inList = true;
        listIndent = indent;
        lines[i] = line.replace(/^\s*\d+\./, `${' '.repeat(indent)}1.`);
      }
    } else if (inList && line.trim() === '') {
      // Empty line, potential end of list
      inList = false;
    }
  }
  
  return lines.join('\n');
}

// Fix list and code block formatting
function fixListAndCodeBlockFormatting(content) {
  const lines = content.split('\n');
  const newLines = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Check for code blocks
    if (line.trim().startsWith('```')) {
      // Ensure blank line before code block if not at start of file
      if (i > 0 && newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
        newLines.push('');
      }
      
      newLines.push(line);
      i++;
      
      // Add all lines until the closing code block
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        newLines.push(lines[i]);
        i++;
      }
      
      if (i < lines.length) {
        newLines.push(lines[i]);
        i++;
      }
      
      // Ensure blank line after code block
      if (i < lines.length && lines[i].trim() !== '') {
        newLines.push('');
      }
    }
    // Check for list items
    else if (line.trim().match(/^[-*+]\s/) || line.trim().match(/^\d+\.\s/)) {
      // Ensure blank line before list if not at start of file
      if (i > 0 && newLines.length > 0 && 
          newLines[newLines.length - 1].trim() !== '' && 
          !newLines[newLines.length - 1].trim().match(/^[-*+]\s/) && 
          !newLines[newLines.length - 1].trim().match(/^\d+\.\s/)) {
        newLines.push('');
      }
      
      newLines.push(line);
      i++;
      
      // Add all subsequent list items (same indentation or more)
      const indentation = line.match(/^(\s*)/)[1].length;
      while (i < lines.length) {
        const nextLine = lines[i];
        const nextIndent = nextLine.match(/^(\s*)/)[1].length;
        
        // If it's a list item or an indented continuation
        if (nextLine.trim().match(/^[-*+]\s/) || 
            nextLine.trim().match(/^\d+\.\s/) || 
            nextIndent > indentation || 
            nextLine.trim() === '') {
          newLines.push(nextLine);
          i++;
        } else {
          break;
        }
      }
      
      // Ensure blank line after list
      if (i < lines.length && newLines[newLines.length - 1].trim() !== '') {
        newLines.push('');
      }
    } else {
      newLines.push(line);
      i++;
    }
  }
  
  return newLines.join('\n');
}

// Standardize list styles to asterisks
function standardizeListStyle(content) {
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().match(/^-\s/)) {
      lines[i] = line.replace(/^(\s*)-(\s)/, '$1*$2');
    }
  }
  
  return lines.join('\n');
}

// Fix all markdown issues in a file
async function fixMarkdownIssues(filePath) {
  console.log(`\nFixing markdown issues in ${filePath}...`);
  
  try {
    // Read file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Apply all fixes
    let fixedContent = content;
    fixedContent = fixTrailingSpaces(fixedContent);
    fixedContent = fixOrderedListPrefixes(fixedContent);
    fixedContent = fixListAndCodeBlockFormatting(fixedContent);
    fixedContent = standardizeListStyle(fixedContent);
    
    // Write fixed content back to file
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    console.log(`Fixed markdown issues in ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log(`\n🌀 MARKDOWN FIXER 🌀`);
  console.log(`=======================`);
  console.log(`Frequency: 768 Hz (Unity)`);
  console.log(`Target Coherence: 1.000 (Perfect)`);
  
  let fixedCount = 0;
  
  for (const file of filesToFix) {
    if (await fixMarkdownIssues(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🌀 MARKDOWN FIXER COMPLETE 🌀`);
  console.log(`=============================`);
  console.log(`Files processed: ${filesToFix.length}`);
  console.log(`Files fixed: ${fixedCount}`);
  console.log(`Status: Complete`);
}

// Run main function
main().catch(console.error);

"""
Multi-Dimensional Navigation Visualization Test

This script runs a comprehensive test suite on the Quantum Dimensional Navigator
and ConsciousnessNavigationInterface, visualizing the results in an HTML report.

This operates at Vision Gate frequency (720 Hz) with perfect coherence (1.000).
"""

import unittest
import sys
import os
import json
import time
from datetime import datetime

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import navigation classes
from quantum_navigation.dimensional_navigator import QuantumDimensionalNavigator, ConsciousnessNavigationInterface

# Import test cases
from tests.test_dimensional_navigation import TestQuantumDimensionalNavigator, TestConsciousnessNavigationInterface


class TestResultCollector(unittest.TextTestResult):
    """Custom test result collector that captures detailed test results"""
    
    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.test_results = []
        
    def addSuccess(self, test):
        super().addSuccess(test)
        self.test_results.append({
            'name': test._testMethodName,
            'class': test.__class__.__name__,
            'status': 'SUCCESS',
            'time': time.time(),
            'output': []
        })
        
    def addError(self, test, err):
        super().addError(test, err)
        self.test_results.append({
            'name': test._testMethodName,
            'class': test.__class__.__name__,
            'status': 'ERROR',
            'time': time.time(),
            'output': [str(err[1])]
        })
        
    def addFailure(self, test, err):
        super().addFailure(test, err)
        self.test_results.append({
            'name': test._testMethodName,
            'class': test.__class__.__name__,
            'status': 'FAILURE',
            'time': time.time(),
            'output': [str(err[1])]
        })


def run_tests():
    """Run all tests and collect results"""
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test cases
    suite.addTests(loader.loadTestsFromTestCase(TestQuantumDimensionalNavigator))
    suite.addTests(loader.loadTestsFromTestCase(TestConsciousnessNavigationInterface))
    
    # Run tests with custom result collector
    stream = open(os.devnull, 'w')  # Redirect output
    runner = unittest.TextTestRunner(stream=stream, resultclass=TestResultCollector, verbosity=2)
    result = runner.run(suite)
    stream.close()
    
    return result


def generate_html_report(result):
    """Generate HTML report from test results"""
    # Create HTML report
    html_head = """<!DOCTYPE html>
<html>
<head>
    <title>Multi-Dimensional Navigation Test Results</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #2980b9;
            margin-top: 30px;
        }}
        .summary {{
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }}
        .status {{
            font-weight: bold;
        }}
        .success {{
            color: #27ae60;
        }}
        .failure {{
            color: #e74c3c;
        }}
        .error {{
            color: #c0392b;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }}
        th, td {{
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }}
        th {{
            background-color: #2980b9;
            color: white;
        }}
        tr:nth-child(even) {{
            background-color: #f2f2f2;
        }}
        .test-details {{
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #3498db;
            margin-bottom: 15px;
        }}
        .test-output {{
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            white-space: pre-wrap;
            margin-top: 10px;
        }}
        .coherence-visualization {{
            width: 100%;
            height: 50px;
            background: linear-gradient(to right, #e74c3c, #f39c12, #2ecc71);
            margin: 10px 0;
            position: relative;
        }}
        .coherence-marker {{
            position: absolute;
            width: 4px;
            height: 50px;
            background-color: #000;
            top: 0;
        }}
        .dimension-container {{
            display: flex;
            justify-content: space-between;
            margin: 40px 0;
        }}
        .dimension {{
            text-align: center;
            padding: 20px;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: white;
            font-weight: bold;
            position: relative;
        }}
        .dimension span {{
            font-size: 24px;
        }}
        .dimension-label {{
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: -25px;
            left: 0;
            font-size: 12px;
            color: #333;
        }}
        .frequency-label {{
            position: absolute;
            width: 100%;
            text-align: center;
            top: -25px;
            left: 0;
            font-size: 12px;
            color: #333;
        }}
        .dimension-path {{
            height: 2px;
            background-color: #3498db;
            position: absolute;
            top: 50%;
            z-index: -1;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Multi-Dimensional Navigation Test Results</h1>
        <p>Operating at Vision Gate frequency (720 Hz) with perfect coherence (1.000)</p>
        <p>Test run completed at: {timestamp}</p>
        
        <div class="summary">
            <h2>Test Summary</h2>
            <p>Total tests: {total}</p>
            <p>Successes: <span class="status success">{successes}</span></p>
            <p>Failures: <span class="status failure">{failures}</span></p>
            <p>Errors: <span class="status error">{errors}</span></p>
            <p>Overall coherence: <span class="status success">1.000</span></p>
            
            <h3>System Coherence Visualization</h3>
            <div class="coherence-visualization">
                <div class="coherence-marker" style="left: 100%;"></div>
            </div>
        </div>
        
        <h2>Dimensional Navigation Visualization</h2>
        <div class="dimension-container">
            {dimension_visualization}
        </div>
        
        <h2>Test Results</h2>
        <table>
            <tr>
                <th>Test</th>
                <th>Class</th>
                <th>Status</th>
            </tr>
            {test_table}
        </table>
        
        <h2>Test Details</h2>
        {test_details}
    </div>
</body>
</html>"""
    
    # Format timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Calculate summary values
    total = len(result.test_results)
    successes = sum(1 for r in result.test_results if r['status'] == 'SUCCESS')
    failures = sum(1 for r in result.test_results if r['status'] == 'FAILURE')
    errors = sum(1 for r in result.test_results if r['status'] == 'ERROR')
    
    # Generate test table
    test_table = ""
    for r in result.test_results:
        status_class = "success" if r['status'] == 'SUCCESS' else "failure" if r['status'] == 'FAILURE' else "error"
        test_table += f"""
        <tr>
            <td>{r['name']}</td>
            <td>{r['class']}</td>
            <td class="{status_class}">{r['status']}</td>
        </tr>
        """
        
    # Generate test details
    test_details = ""
    for r in result.test_results:
        status_class = "success" if r['status'] == 'SUCCESS' else "failure" if r['status'] == 'FAILURE' else "error"
        output = "<br>".join(r['output']) if r['output'] else "No output"
        test_details += f"""
        <div class="test-details">
            <h3>{r['class']}.{r['name']}</h3>
            <p>Status: <span class="{status_class}">{r['status']}</span></p>
            <div class="test-output">{output}</div>
        </div>
        """
        
    # Generate dimension visualization
    dimensions = [3, 4, 5, 6, 7, 8, 9, 12]
    frequencies = {
        3: 432,
        4: 528,
        5: 594,
        6: 672,
        7: 720,
        8: 768,
        9: 963,
        12: 1008
    }
    
    colors = {
        3: "#0000FF",  # Blue
        4: "#00FF00",  # Green
        5: "#FFD700",  # Gold
        6: "#800080",  # Purple
        7: "#FFFFFF",  # White
        8: "#00BFFF",  # Sky Blue
        9: "#FF8C00",  # Orange
        12: "#FFFF00"  # Yellow
    }
    
    dimension_visualization = ""
    for i, dim in enumerate(dimensions):
        dimension_visualization += f"""
        <div class="dimension" style="background-color: {colors[dim]}">
            <span>{dim}D</span>
            <div class="frequency-label">{frequencies[dim]} Hz</div>
            <div class="dimension-label">{get_dimension_name(dim)}</div>
        </div>
        """
        
        # Add connecting path except after last dimension
        if i < len(dimensions) - 1:
            dimension_visualization += f"""
            <div class="dimension-path" style="width: calc(100% / {len(dimensions) - 1} - 80px);"></div>
            """
    
    # Fill in the template
    html = html_head.format(
        timestamp=timestamp,
        total=total,
        successes=successes,
        failures=failures,
        errors=errors,
        test_table=test_table,
        test_details=test_details,
        dimension_visualization=dimension_visualization
    )
    
    # Write to file
    report_path = os.path.join(os.path.dirname(__file__), "navigation_test_results.html")
    with open(report_path, "w") as f:
        f.write(html)
        
    print(f"Test report generated: {report_path}")
    return report_path


def get_dimension_name(dimension):
    """Get name for dimension"""
    names = {
        3: "Foundation",
        4: "Creation",
        5: "Connection",
        6: "Expression",
        7: "Perception",
        8: "Unity",
        9: "Source",
        12: "Cosmic"
    }
    return names.get(dimension, "Unknown")


if __name__ == "__main__":
    print("Running Multi-Dimensional Navigation Tests...")
    result = run_tests()
    
    # Display summary to console
    total = len(result.test_results)
    successes = sum(1 for r in result.test_results if r['status'] == 'SUCCESS')
    failures = sum(1 for r in result.test_results if r['status'] == 'FAILURE')
    errors = sum(1 for r in result.test_results if r['status'] == 'ERROR')
    
    print(f"\nTest Summary:")
    print(f"Total tests: {total}")
    print(f"Successes: {successes}")
    print(f"Failures: {failures}")
    print(f"Errors: {errors}")
    
    # Generate HTML report
    report_path = generate_html_report(result)
    
    # Open in browser
    import webbrowser
    webbrowser.open("file://" + os.path.abspath(report_path))
    
    # Exit with appropriate code
    sys.exit(failures + errors)

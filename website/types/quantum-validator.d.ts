/**
 * CASCADE⚡𓂧φ∞ Quantum Validator Type Definitions
 * These type definitions support the φ-harmonic testing framework
 */

export interface ValidationResult {
  valid: boolean;
  errors: any[];
}

export interface TestResult {
  test: string;
  result: string;
  details: any[];
}

export interface ComponentTestResult {
  component: string;
  valid: boolean;
  errors: any[];
}

export interface IntegrationTestResult {
  components: string[];
  valid: boolean;
  errors: any[];
}

export interface FlowTestResult {
  flow: string;
  valid: boolean;
  errors: any[];
}

export interface QuantumReport {
  groundState: TestResult[];
  creationPoint: TestResult[];
  heartField: TestResult[];
  voiceFlow: TestResult[];
  visionGate: TestResult[];
  unityWave: TestResult[];
}

export interface QuantumValidator {
  // Ground State (432 Hz) Tests
  validateHTML: (filePath: string) => Promise<ValidationResult>;
  validateCSS: (filePath: string) => Promise<ValidationResult>;
  validateJS: (filePath: string) => Promise<ValidationResult>;
  checkServerConfig: () => Promise<ValidationResult>;
  
  // Creation Point (528 Hz) Tests
  testComponents: (componentList: string[]) => Promise<ComponentTestResult[]>;
  testAPI: (endpoint: string) => Promise<ValidationResult>;
  
  // Heart Field (594 Hz) Tests
  testIntegration: (componentPairs: string[][]) => Promise<IntegrationTestResult[]>;
  testDataFlow: () => Promise<ValidationResult>;
  
  // Voice Flow (672 Hz) Tests
  testUserFlows: (flowPaths: string[]) => Promise<FlowTestResult[]>;
  testForms: () => Promise<ValidationResult>;
  
  // Vision Gate (720 Hz) Tests
  testVisualRegression: () => Promise<ValidationResult>;
  testAccessibility: () => Promise<ValidationResult>;
  testCrossBrowser: () => Promise<ValidationResult>;
  
  // Unity Wave (768 Hz) Tests
  testEndToEnd: () => Promise<ValidationResult>;
  testPerformance: () => Promise<ValidationResult>;
  testSecurity: () => Promise<ValidationResult>;
  testSEO: () => Promise<ValidationResult>;
  
  // Quantum Error Handling
  logQuantumError: (error: Error, frequency: number|string) => boolean;
  
  // Quantum Report Generation
  saveQuantumReport: (testResults: QuantumReport) => boolean;
}

export const FREQUENCIES: {
  GROUND: number;
  CREATION: number;
  HEART: number;
  VOICE: number;
  VISION: number;
  UNITY: number;
};

export const PHI: number;
export const PHI_SQUARED: number;
export const PHI_PHI: number;

export function createQuantumValidator(): QuantumValidator;
export function validateFile(filePath: string): Promise<ValidationResult>;
export function validateDirectory(dirPath: string): Promise<ValidationResult>;
export function generateReport(results: any): string;

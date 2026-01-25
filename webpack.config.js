/**
 * Webpack Configuration
 * 
 * Configuration for bundling the Quantum Perfect Linting System,
 * Quantum Solution Generator, and related components
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    // Core modules
    'quantum-perfect-linting-system': './quantum-linting/quantum_perfect_linting_system.js',
    'quantum-solution-generator': './quantum-solution/qball_solution_generator.js',
    'quantum-linting-feedback': './quantum-linting/quantum_linting_feedback.js',
    'quantum-visualization-helper': './quantum-linting/quantum_visualization_helper.js',
    
    // Integrations
    'windsurf-qpls-integration': './quantum-linting/windsurf_qpls_integration.js',
    'claude-qpls-integration': './quantum-linting/claude_qpls_integration.js',
    
    // Example and demo files
    'quantum-flow-demo': './quantum-solution/quantum_flow_demo.js',
    'quantum-unified-example': './quantum-linting/quantum_unified_example.js',
    'simple-example': './quantum-solution/simple_example.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: {
      name: '[name]',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this'
  },
  mode: 'production',
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@quantum-linting': path.resolve(__dirname, 'quantum-linting'),
      '@quantum-solution': path.resolve(__dirname, 'quantum-solution'),
      '@documentation': path.resolve(__dirname, 'documentation')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        // Copy documentation
        { from: 'documentation', to: 'documentation' },
        // Copy README
        { from: 'README.md', to: '.' },
        // Copy package.json
        { from: 'package.json', to: '.' }
      ],
    }),
  ],
  // External dependencies that shouldn't be bundled
  externals: {
    'fs': 'commonjs fs',
    'path': 'commonjs path',
    'os': 'commonjs os'
  }
};

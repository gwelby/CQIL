# Self-Healing System Test Plan

This document outlines the test plan for the CQIL website's self-healing system, which provides automatic detection and recovery from common failure scenarios.

## Test Environment Setup

Before beginning the tests, set up a proper staging environment:

1. Clone the production environment to a staging server
2. Configure the self-healing system with staging parameters:
   ```yaml
   platforms:
     cloudflare:
       url: "https://staging.cqil.pages.dev"
       health_path: "/health-check.html"
     github:
       url: "https://gwelby.github.io/cqil-website-staging"
       health_path: "/health-check.html"
     traditional:
       url: "https://staging.cqil.ca"
       health_path: "/health-check.html"
   ```
3. Deploy the CloudFlare worker to a staging worker
4. Set up monitoring with lower thresholds for easier testing

## Test Cases

### 1. Basic Health Monitoring

**Test ID:** SH-TEST-001  
**Description:** Verify basic health monitoring functionality  
**Steps:**
1. Run `python3 self_healing_system.py --check`
2. Verify all platforms report as healthy
3. Check logs for proper recording

**Expected Result:** All platforms should report as healthy, and the check should be logged correctly.

### 2. CDN Cache Failure Recovery

**Test ID:** SH-TEST-002  
**Description:** Simulate and recover from CDN cache failure  
**Steps:**
1. Simulate a CDN cache failure by modifying the CloudFlare cache settings to deliberately introduce high latency
2. Run `python3 self_healing_system.py --check`
3. Verify the system detects a cdn_cache_failure
4. Run `python3 self_healing_system.py --recover cdn_cache`
5. Verify the system recovers by purging the cache

**Expected Result:** The system should detect a cache issue, purge the cache, and re-verify health successfully.

### 3. Origin Failure Recovery

**Test ID:** SH-TEST-003  
**Description:** Simulate and recover from origin failure  
**Steps:**
1. Simulate an origin failure by temporarily disabling one platform (e.g., GitHub Pages)
2. Run `python3 self_healing_system.py --check`
3. Verify the system detects an origin_failure
4. Run `python3 self_healing_system.py --recover origin`
5. Verify the system attempts redeployment or routing traffic to healthy origins

**Expected Result:** The system should detect an origin issue, attempt appropriate recovery, and route traffic to healthy origins.

### 4. DNS Failure Recovery

**Test ID:** SH-TEST-004  
**Description:** Simulate and recover from DNS failure  
**Steps:**
1. Simulate a DNS failure by temporarily modifying CloudFlare DNS settings
2. Run `python3 self_healing_system.py --check`
3. Verify the system detects a dns_failure
4. Run `python3 self_healing_system.py --recover dns`
5. Verify the system attempts DNS verification and recovery

**Expected Result:** The system should detect a DNS issue, verify settings, and attempt recovery procedures.

### 5. SSL Failure Recovery

**Test ID:** SH-TEST-005  
**Description:** Simulate and recover from SSL failure  
**Steps:**
1. Simulate an SSL failure by temporarily modifying CloudFlare SSL settings
2. Run `python3 self_healing_system.py --check`
3. Verify the system detects an ssl_failure
4. Run `python3 self_healing_system.py --recover ssl`
5. Verify the system attempts SSL verification and recovery

**Expected Result:** The system should detect an SSL issue, verify certificate status, and attempt recovery procedures.

### 6. Automatic Monitoring

**Test ID:** SH-TEST-006  
**Description:** Verify continuous monitoring thread  
**Steps:**
1. Run `python3 self_healing_system.py --start`
2. Verify the monitoring thread starts correctly
3. Simulate a failure condition
4. Wait for the next check interval
5. Verify the system automatically detects and attempts recovery

**Expected Result:** The monitoring thread should start, detect failures, and initiate recovery without manual intervention.

### 7. CloudFlare Worker Routing

**Test ID:** SH-TEST-007  
**Description:** Verify CloudFlare Worker routing capabilities  
**Steps:**
1. Deploy the worker to a test route
2. Simulate a failure of one origin
3. Make requests to the worker endpoint
4. Verify traffic is routed to healthy origins

**Expected Result:** The worker should detect the failed origin and automatically route traffic to healthy alternatives.

### 8. CloudFlare Worker API

**Test ID:** SH-TEST-008  
**Description:** Verify CloudFlare Worker API endpoints  
**Steps:**
1. Make a request to `/api/health`
2. Verify the response includes correct health data
3. Make a request to `/api/self-healing`
4. Verify the response includes self-healing status
5. Make an authenticated request to `/api/self-healing/admin`
6. Verify admin commands function correctly

**Expected Result:** All API endpoints should return correct data and accept commands as designed.

### 9. Recovery History Tracking

**Test ID:** SH-TEST-009  
**Description:** Verify healing history tracking  
**Steps:**
1. Trigger several recovery procedures
2. Run `python3 self_healing_system.py --history`
3. Verify all recovery attempts are properly recorded

**Expected Result:** The history should show accurate records of all recovery attempts, including timestamps, failure types, and results.

### 10. Cooldown Period Enforcement

**Test ID:** SH-TEST-010  
**Description:** Verify cooldown periods prevent excessive recovery attempts  
**Steps:**
1. Run a recovery procedure
2. Immediately attempt the same recovery procedure
3. Verify the system prevents the second attempt due to cooldown

**Expected Result:** The system should prevent excessive recovery attempts within the cooldown period.

### 11. Threshold-Based Detection

**Test ID:** SH-TEST-011  
**Description:** Verify threshold-based failure detection  
**Steps:**
1. Modify platform response times to exceed thresholds but not fail completely
2. Run health checks
3. Verify the system correctly identifies threshold-based failures

**Expected Result:** The system should detect failures based on performance thresholds, not just complete outages.

### 12. Notification System

**Test ID:** SH-TEST-012  
**Description:** Verify alert and recovery notifications  
**Steps:**
1. Configure test notification channels
2. Trigger a recovery procedure that fails
3. Verify alert notification is sent
4. Trigger a successful recovery procedure
5. Verify recovery notification is sent

**Expected Result:** The system should send appropriate notifications for both failed and successful recovery attempts.

## Integration Tests

### 1. Self-Healing with Canary Deployment

**Test ID:** SH-INT-001  
**Description:** Verify self-healing system works with canary deployments  
**Steps:**
1. Create a canary deployment
2. Simulate a failure in the canary deployment
3. Verify the self-healing system detects the issue
4. Verify the canary system rolls back

**Expected Result:** The self-healing system should detect issues in canary deployments and integrate with the rollback mechanism.

### 2. Self-Healing with Blue-Green Deployment

**Test ID:** SH-INT-002  
**Description:** Verify self-healing system works with blue-green deployments  
**Steps:**
1. Set up blue-green deployment
2. Simulate a failure in the green environment
3. Verify the self-healing system detects the issue
4. Verify traffic remains on the blue environment

**Expected Result:** The self-healing system should detect issues in new environments before traffic is shifted.

## Performance Tests

### 1. Recovery Time Objective (RTO)

**Test ID:** SH-PERF-001  
**Description:** Measure time to recover from different failure types  
**Steps:**
1. Measure time from failure detection to successful recovery for each failure type
2. Calculate average recovery times

**Expected Result:** Recovery times should be within acceptable limits (1-5 minutes depending on failure type).

### 2. Load Testing During Recovery

**Test ID:** SH-PERF-002  
**Description:** Verify system performance during recovery procedures  
**Steps:**
1. Generate simulated traffic load
2. Trigger recovery procedures
3. Measure request success rate, latency, and error rates during recovery

**Expected Result:** The system should maintain acceptable performance metrics during recovery procedures.

## Security Tests

### 1. API Authorization

**Test ID:** SH-SEC-001  
**Description:** Verify CloudFlare Worker API security  
**Steps:**
1. Attempt to access `/api/self-healing/admin` without authentication
2. Attempt to access `/api/self-healing/admin` with invalid token
3. Attempt to access `/api/self-healing/admin` with valid token

**Expected Result:** Access should be denied without proper authentication and authorized with valid token.

### 2. Configuration Security

**Test ID:** SH-SEC-002  
**Description:** Verify configuration file security  
**Steps:**
1. Check file permissions on configuration files
2. Verify sensitive values are appropriately protected
3. Verify logs don't contain sensitive information

**Expected Result:** Configuration should be secure, with proper permissions and protection for sensitive values.

## Reporting and Analysis

After completing the tests:

1. Compile results into a comprehensive test report
2. Analyze any failures and determine root causes
3. Make necessary adjustments to the self-healing system
4. Document lessons learned and improvements made

## Sign-off Criteria

The self-healing system will be considered ready for production when:

1. All test cases pass successfully
2. Recovery procedures meet performance targets (RTO < 5 minutes)
3. No security vulnerabilities are identified
4. Integration with other system components is verified
5. Documentation is complete and accurate
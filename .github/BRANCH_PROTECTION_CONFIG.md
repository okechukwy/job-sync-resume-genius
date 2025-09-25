# Branch Protection Configuration

## Setup Instructions

### 1. Main Branch Protection (Production)

Go to **Settings > Branches** in your GitHub repository and create a new rule for `main`:

**Branch name pattern:** `main`

**Protection settings:**
- ✅ Restrict pushes that create files larger than 100MB
- ✅ Require a pull request before merging
  - ✅ Require approvals: **2 reviewers minimum**
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require review from code owners (if CODEOWNERS file exists)
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Required status checks:**
    - `test`
    - `security-scan`
    - `code-quality`
    - `security-check`
- ✅ Require conversation resolution before merging
- ✅ Require signed commits
- ✅ Require linear history
- ✅ Include administrators (apply rules to repository admins)

### 2. Develop Branch Protection (Integration)

**Branch name pattern:** `develop`

**Protection settings:**
- ✅ Require a pull request before merging
  - ✅ Require approvals: **1 reviewer minimum**
  - ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Required status checks:**
    - `test`
    - `security-scan`
    - `validate-feature` (for feature branches)
- ✅ Require conversation resolution before merging

### 3. Feature Branch Rules

**Branch name pattern:** `feature/*`

**Protection settings:**
- ✅ Require status checks to pass before merging
  - **Required status checks:**
    - `validate-feature`
    - `integration-test`

### 4. Hotfix Branch Rules

**Branch name pattern:** `hotfix/*`

**Protection settings:**
- ✅ Require a pull request before merging
  - ✅ Require approvals: **2 reviewers minimum** (critical fixes)
- ✅ Require status checks to pass before merging
  - **Required status checks:**
    - `urgent-validation`
    - `security-priority` (for security hotfixes)

## Workflow Strategy

### Feature Development
```
feature/branch → develop → main
```
1. Create feature branch from `develop`
2. Implement feature with tests
3. PR to `develop` (1 reviewer required)
4. After testing in staging, PR from `develop` to `main` (2 reviewers required)

### Hotfixes
```
hotfix/branch → main (+ cherry-pick to develop)
```
1. Create hotfix branch from `main`
2. Implement critical fix
3. PR to `main` (2 reviewers, expedited process)
4. Cherry-pick changes to `develop`

### Environment Mapping
- **main** → Production deployment (Lovable production)
- **develop** → Staging environment (optional)
- **feature/** → Development/preview environments

## Security Considerations

1. **Signed Commits**: Require GPG signatures on main branch
2. **Status Checks**: All security scans must pass
3. **Review Requirements**: Critical branches require multiple approvers
4. **Linear History**: Prevent merge commits on main branch
5. **Administrator Inclusion**: Rules apply to all users including admins

## Emergency Procedures

### Critical Security Hotfixes
1. Create `hotfix/security-[issue]` branch from main
2. Implement fix with security validation
3. Request emergency review from security team
4. Deploy immediately after approval
5. Post-incident review and documentation

### Emergency Bypass
- Only repository owners can temporarily disable protection
- Requires documented justification
- Must re-enable protection immediately after emergency deployment
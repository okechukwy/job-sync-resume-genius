# ResumeAI - Branch-Based Development & Feature Flags

This project implements a comprehensive security strategy with branch-based workflows and environment-controlled feature flags.

## Branch-Based Workflows

### Development Process
1. **Feature Branches**: All development happens on feature branches
2. **Code Review**: All changes require approval via pull requests
3. **Branch Protection**: Main branch is protected from direct pushes
4. **Automated Testing**: CI/CD runs tests on all pull requests

### Setup Branch Protection (GitHub)
1. Go to Settings > Branches in your GitHub repository
2. Add a branch protection rule for `main`:
   - Require pull request reviews before merging
   - Dismiss stale reviews when new commits are pushed
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Restrict pushes that create files larger than 100MB

## Feature Flag System

### Environment-Based Feature Flags
Features can be enabled/disabled based on environment variables:

- **Development** (`.env`): All features enabled for testing
- **Production** (`.env.production`): Selective feature enabling

### Current Feature Flags
```env
VITE_ENABLE_WHITE_LABEL=false          # White-label exports (disabled in production)
VITE_ENABLE_ADVANCED_ANALYTICS=true    # Advanced analytics features  
VITE_ENABLE_BETA_FEATURES=false        # Beta/experimental features
```

### White-Label Exports Exclusion
The White-Label Exports functionality is currently **disabled in production** via feature flags:

- ✅ **Sidebar Navigation**: Conditionally hidden based on feature flag
- ✅ **Route Protection**: Redirects to dashboard if feature disabled
- ✅ **Service Layer**: Blocks API calls when feature disabled
- ✅ **Marketing Content**: Pricing and features sections updated
- ✅ **UI Components**: Feature mentions conditionally rendered

### Usage in Code
```typescript
import { isFeatureEnabled } from '@/utils/featureFlags';

// Check if feature is enabled
if (isFeatureEnabled('enableWhiteLabel')) {
  // Render white-label functionality
}

// Or use the FeatureGate component
import { FeatureGate } from '@/utils/featureFlags';

<FeatureGate feature="enableWhiteLabel">
  <WhiteLabelComponent />
</FeatureGate>
```

## Security Features
- Row Level Security (RLS) enabled on all user data tables
- Brute force protection on login attempts
- Progressive blocking for suspicious activity
- Secure authentication with Supabase Auth
- Environment variable management for secrets

## Deployment Strategy
1. **Development**: Feature flags enabled for testing
2. **Staging**: Production-like environment for final testing
3. **Production**: Selective feature enabling via environment variables

## Enabling White-Label Exports Later
To enable white-label exports in production:
1. Update `.env.production`: Set `VITE_ENABLE_WHITE_LABEL=true`
2. Deploy the updated environment configuration
3. No code changes required - feature will be immediately available

---

## Original Project Setup

**URL**: https://lovable.dev/projects/33214ea3-d4c7-489d-b213-d220fdce79ef

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/33214ea3-d4c7-489d-b213-d220fdce79ef) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/33214ea3-d4c7-489d-b213-d220fdce79ef) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

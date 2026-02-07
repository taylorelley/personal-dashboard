# Deployment Guide - Personal Dashboard

## Prerequisites

1. **Home Assistant Token** (REQUIRED)
   - Navigate to Home Assistant: http://192.168.100.5:8123
   - Go to Profile → Security → Long-Lived Access Tokens
   - Create new token named "Personal Dashboard"
   - Copy the token (you'll need it for Coolify)

2. **GitHub Repository**
   - ✅ Already created: https://github.com/taylorelley/personal-dashboard
   - ✅ Dev branch pushed with working code

## Coolify Deployment

### Step 1: Create Dev Application (Auto-Deploy)

1. **Access Coolify**: https://coolify.taylorelley.com
2. **Navigate to**: Project "My first project"
3. **Click**: "Add Resource" → "Application"
4. **Choose**: "Public Repository (GitHub/GitLab/etc.)"
5. **Configure**:
   - **Name**: `personal-dashboard-dev`
   - **Git Repository**: `https://github.com/taylorelley/personal-dashboard`
   - **Branch**: `dev`
   - **Build Pack**: Nixpacks (auto-detected for Node.js)
   - **Server**: localhost
   
6. **Advanced Settings**:
   - **Base Directory**: `/` (root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Port**: `3000`
   - **Auto Deploy**: ✅ **ENABLED** (deploy on push to dev)
   
7. **Environment Variables** (click "Add Variable" for each):
   ```
   TODOIST_TOKEN=<paste token from ~/.clawdbot/secrets/todoist_token>
   TODOIST_PROJECT_ID=6fvX3jHgGGWcw48X
   GCAL_REFRESH_SCRIPT=/root/.clawdbot/secrets/gcal_refresh.sh
   HOMEASSISTANT_URL=http://192.168.100.5:8123
   HOMEASSISTANT_TOKEN=<paste Home Assistant token from step 1>
   NEXT_PUBLIC_BASE_URL=https://dev-dashboard.taylorelley.com
   NODE_ENV=production
   ```

8. **Domain Settings**:
   - **Domain**: `dev-dashboard.taylorelley.com` (or choose your own)
   - **Enable SSL**: ✅ (automatic Let's Encrypt)

9. **Save** and **Deploy**

### Step 2: Create Production Application (Manual Deploy)

1. **Click**: "Add Resource" → "Application"
2. **Choose**: "Public Repository (GitHub/GitLab/etc.)"
3. **Configure**:
   - **Name**: `personal-dashboard`
   - **Git Repository**: `https://github.com/taylorelley/personal-dashboard`
   - **Branch**: `main`
   - **Build Pack**: Nixpacks
   - **Server**: localhost
   
4. **Advanced Settings**:
   - **Base Directory**: `/` (root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Port**: `3000`
   - **Auto Deploy**: ❌ **DISABLED** (manual deploy only)
   
5. **Environment Variables** (same as dev, but different URL):
   ```
   TODOIST_TOKEN=<same as dev>
   TODOIST_PROJECT_ID=6fvX3jHgGGWcw48X
   GCAL_REFRESH_SCRIPT=/root/.clawdbot/secrets/gcal_refresh.sh
   HOMEASSISTANT_URL=http://192.168.100.5:8123
   HOMEASSISTANT_TOKEN=<same as dev>
   NEXT_PUBLIC_BASE_URL=https://dashboard.taylorelley.com
   NODE_ENV=production
   ```

6. **Domain Settings**:
   - **Domain**: `dashboard.taylorelley.com`
   - **Enable SSL**: ✅ (automatic Let's Encrypt)

7. **Save** (don't deploy yet - main branch is empty)

## Workflow

### Development Flow
1. Make changes locally
2. Commit to `dev` branch
3. Push to GitHub
4. Coolify auto-deploys to dev environment
5. Test at https://dev-dashboard.taylorelley.com

### Production Release
1. Merge `dev` → `main` when ready
2. Manually trigger deploy in Coolify for production app
3. Production available at https://dashboard.taylorelley.com

## Getting the Required Tokens

### Todoist Token
```bash
cat ~/.clawdbot/secrets/todoist_token
```

### Home Assistant Token
**Must be generated manually via Home Assistant UI** (see Prerequisites above)

### Google Calendar
Already configured via refresh script at `~/.clawdbot/secrets/gcal_refresh.sh`

## Troubleshooting

### Build Fails
- Check build logs in Coolify
- Verify all environment variables are set
- Ensure Node.js version is compatible (should use v20+)

### API Errors
- **Todoist**: Check token validity
- **Google Calendar**: Verify refresh script works: `bash ~/.clawdbot/secrets/gcal_refresh.sh`
- **Home Assistant**: Verify token and URL are correct
- **Weather**: Should work without credentials (wttr.in is public)

### Home Assistant Widget Shows "Unknown"
- Generate and add `HOMEASSISTANT_TOKEN` environment variable
- Restart the application in Coolify

## Monitoring

- **Dev logs**: Coolify → personal-dashboard-dev → Logs
- **Prod logs**: Coolify → personal-dashboard → Logs
- **Health check**: Visit the dashboard URL - all widgets should load

## Security Notes

- All API keys are server-side only (not exposed to client)
- Home Assistant is on local network (192.168.100.5)
- GCAL refresh script needs to be accessible from Coolify container
  - May need to mount as volume or include in Docker image
  - **Alternative**: Implement OAuth refresh directly in Next.js code

## Next Steps After Deployment

1. ✅ Verify all 4 widgets load correctly
2. ✅ Test task completion functionality
3. ✅ Verify auto-refresh works (wait 60 seconds)
4. ✅ Test on mobile device
5. ✅ Test dark mode
6. Merge to main when satisfied
7. Deploy to production

---

**Estimated Setup Time**: 15-20 minutes  
**Support**: Check Notion page for updates and troubleshooting

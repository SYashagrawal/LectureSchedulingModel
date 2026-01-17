# Deployment Guide for Render

## Prerequisites
- GitHub account (repository already created)
- Render account (free at https://render.com)
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)

## Step 1: Set up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Wait for cluster to be ready
5. Create a database user with username and password
6. Whitelist your IP (or allow all: 0.0.0.0/0)
7. Click "Connect" → "Connect your application"
8. Copy the connection string (it will look like):
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/lecture-scheduling?retryWrites=true&w=majority
   ```

## Step 2: Deploy Backend on Render

1. Go to https://render.com and sign up with GitHub
2. Click "New +" button → "Web Service"
3. Select your GitHub repository
4. Configure:
   - **Service Name**: lecture-scheduling-api
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Runtime**: Node
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Click "Advanced" and add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random string (e.g., `your-super-secret-jwt-key-12345`)
   - `NODE_ENV`: production
   - `PORT`: 5001

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy the deployed URL (e.g., `https://lecture-scheduling-api.onrender.com`)

## Step 3: Update Frontend Configuration

1. Edit [client/src/services/api.js](client/src/services/api.js)
2. Change the `API_BASE_URL`:
   ```javascript
   const API_BASE_URL = 'https://lecture-scheduling-api.onrender.com/api'
   ```
3. Commit and push to GitHub:
   ```bash
   git add client/src/services/api.js
   git commit -m "Update API URL for Render deployment"
   git push origin main
   ```

## Step 4: Deploy Frontend on Render

1. Go to https://render.com
2. Click "New +" button → "Static Site"
3. Select your GitHub repository
4. Configure:
   - **Service Name**: lecture-scheduling-frontend
   - **Region**: Same as backend (for better performance)
   - **Branch**: main
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`

5. Click "Create Static Site"
6. Wait for deployment to complete
7. Your frontend URL will be displayed (e.g., `https://lecture-scheduling-frontend.onrender.com`)

## Step 5: Test the Deployment

1. Go to your frontend URL
2. Try logging in with:
   - **Admin**: admin@example.com / admin123
   - **Instructor**: rahul@example.com / instructor123

## Troubleshooting

### Backend not connecting to MongoDB
- Verify connection string is correct in Render environment variables
- Check MongoDB Atlas whitelist includes Render's IPs (use 0.0.0.0/0 for testing)
- Check JWT_SECRET is set

### Frontend API calls failing
- Ensure `API_BASE_URL` in client/src/services/api.js is correct
- Check browser console (F12) for errors
- Verify CORS is enabled in backend (should be configured already)

### Cold starts are slow
- Render's free tier puts services to sleep after 15 minutes of inactivity
- This causes slower initial load times (cold start)
- Upgrade to paid plan to keep services always running

## Updating the Application

1. Make changes locally
2. Test with `npm run dev` in both server and client directories
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
4. Render automatically redeploys on GitHub push

## Production Environment Variables

For production, use strong values:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lecture-scheduling
JWT_SECRET=use-a-long-random-string-minimum-32-characters
NODE_ENV=production
PORT=5001
```

Generate JWT_SECRET with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

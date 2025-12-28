# Troubleshooting Guide - Network Errors

## NetworkError: Failed to fetch

This error occurs when the frontend cannot connect to the backend server.

### Quick Fixes

1. **Check if Backend Server is Running**
   ```bash
   # In backend directory
   cd swm/backend
   npm run dev
   ```
   You should see: `🚀 Luxora Environmental API Server running on http://localhost:4000`

2. **Check Frontend Environment Variable**
   Create `swm/frontend/.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   Then restart the frontend:
   ```bash
   cd swm/frontend
   npm run dev
   ```

3. **Verify Ports**
   - Backend should be on port **4000**
   - Frontend should be on port **3000**
   - Check if ports are already in use

### Common Issues

#### Issue 1: Backend Not Running
**Symptoms:**
- NetworkError in browser console
- "Cannot connect to server" message

**Solution:**
```bash
# Start backend
cd swm/backend
npm run dev
```

#### Issue 2: Wrong API URL
**Symptoms:**
- NetworkError with specific URL
- 404 errors

**Solution:**
1. Check `swm/frontend/.env.local` exists
2. Verify `NEXT_PUBLIC_API_URL=http://localhost:4000`
3. Restart frontend server

#### Issue 3: CORS Error
**Symptoms:**
- CORS policy error in console
- "Access-Control-Allow-Origin" error

**Solution:**
1. Check backend `.env` file has:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```
2. Restart backend server

#### Issue 4: Port Already in Use
**Symptoms:**
- "Port 4000 already in use" error
- Server won't start

**Solution:**
```bash
# Windows - Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=4001
```

#### Issue 5: Firewall Blocking
**Symptoms:**
- Connection timeout
- No response from server

**Solution:**
- Allow Node.js through Windows Firewall
- Or temporarily disable firewall for testing

### Testing Connection

1. **Test Backend Directly:**
   Open browser: http://localhost:4000
   Should see API information JSON

2. **Test Health Endpoint:**
   Open: http://localhost:4000/health
   Should see: `{"ok": true, ...}`

3. **Test from Frontend:**
   Open browser console (F12)
   Run:
   ```javascript
   fetch('http://localhost:4000/health')
     .then(r => r.json())
     .then(console.log)
     .catch(console.error)
   ```

### Step-by-Step Debugging

1. **Check Backend:**
   ```bash
   cd swm/backend
   npm run dev
   # Should see server starting message
   ```

2. **Check Frontend:**
   ```bash
   cd swm/frontend
   npm run dev
   # Should see Next.js dev server starting
   ```

3. **Check Environment:**
   - Backend: `swm/backend/.env` exists
   - Frontend: `swm/frontend/.env.local` exists
   - Both have correct URLs

4. **Check Browser Console:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

5. **Verify URLs:**
   - Backend: http://localhost:4000
   - Frontend: http://localhost:3000
   - API calls should go to port 4000

### Still Not Working?

1. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Check Node.js Version:**
   ```bash
   node --version
   # Should be 18 or higher
   ```

3. **Reinstall Dependencies:**
   ```bash
   # Backend
   cd swm/backend
   rm -rf node_modules package-lock.json
   npm install

   # Frontend
   cd swm/frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Check Logs:**
   - Backend console for errors
   - Frontend console for errors
   - Browser console for network errors

### Getting Help

If you're still having issues:
1. Check backend console for error messages
2. Check frontend console for error messages
3. Check browser Network tab for failed requests
4. Verify all environment variables are set correctly
5. Make sure both servers are running


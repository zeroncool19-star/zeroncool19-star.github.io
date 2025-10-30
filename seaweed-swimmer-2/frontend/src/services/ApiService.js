import axios from 'axios';

// For SW2, use port 8002 if in development, or append port to production URL
const getBackendURL = () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8002';
  
  // If we're in development/local, use the base URL as-is
  if (baseURL.includes('localhost')) {
    return baseURL;
  }
  
  // For production, we need to route to port 8002
  // This might need proxy configuration on the server side
  return baseURL; // Assuming server-side routing handles port 8002
};

const API_BASE_URL = getBackendURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const leaderboardAPI = {
  // Submit score to leaderboard
  submitScore: async (username, score, achievement) => {
    const response = await api.post('/api/leaderboard/submit', {
      username,
      score,
      achievement,
    });
    return response.data;
  },

  // Get global leaderboard
  getGlobalLeaderboard: async (limit = 100) => {
    const response = await api.get(`/api/leaderboard/global?limit=${limit}`);
    return response.data;
  },

  // Check username availability
  checkUsername: async (username) => {
    const response = await api.get(`/api/leaderboard/check-username?username=${encodeURIComponent(username)}`);
    return response.data;
  },

  // Get user rank
  getUserRank: async (username) => {
    const response = await api.get(`/api/leaderboard/rank/${encodeURIComponent(username)}`);
    return response.data;
  },
};

export default api;

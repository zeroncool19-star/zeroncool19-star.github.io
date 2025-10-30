import axios from 'axios';

// For SW2, always use localhost:8002 in this environment
// In production deployment, this would be configured differently
const API_BASE_URL = 'http://localhost:8002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('SW2 API Service - Backend URL:', API_BASE_URL);

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

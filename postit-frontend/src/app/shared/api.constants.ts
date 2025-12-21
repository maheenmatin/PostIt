// Centralized API base URL to avoid scattered hard-coded strings.
export const API_BASE_URL = 'http://localhost:8080';

// Service endpoints grouped by functional area.
export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/auth`,
  comments: `${API_BASE_URL}/api/comments`,
  community: `${API_BASE_URL}/api/community`,
  posts: `${API_BASE_URL}/api/posts`,
  votes: `${API_BASE_URL}/api/votes`,
};

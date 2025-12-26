import { environment } from '../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/auth`,
  comments: `${API_BASE_URL}/api/comments`,
  community: `${API_BASE_URL}/api/community`,
  posts: `${API_BASE_URL}/api/posts`,
  votes: `${API_BASE_URL}/api/votes`,
};

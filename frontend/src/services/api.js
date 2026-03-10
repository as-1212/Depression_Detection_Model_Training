import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function predictDepression(text) {
  const payload = { text };
  const response = await axios.post(`${API_BASE_URL}/predict`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });

  return response.data;
}


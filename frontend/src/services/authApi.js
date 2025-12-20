// src/services/authApi.js
const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (payload) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, data: { message: "Network error" } };
  }
};


export const loginUser = async (payload) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // credentials: "include",  // हे असेल तर comment / काढून टाक
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, data: { message: "Network error" } };
  }
};

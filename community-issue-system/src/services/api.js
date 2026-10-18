const API_BASE_URL = "http://localhost:8080";

export async function apiFetch(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    if (response.status === 401 || response.status === 403) {
        console.log("Authentication or authorization failed");
    }

    return response;
}
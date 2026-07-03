const BASE_URL = 'https://vaidyo-backend.onrender.com';

function getHeaders(customToken) {
    const token = customToken || localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
}

async function parseResponse(res) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

// auth=true uses patient/doctor token, pass a token string directly for admin
async function apiPost(url, data, auth = true) {
    const headers = (auth === false)
        ? { 'Content-Type': 'application/json' }
        : getHeaders(typeof auth === 'string' ? auth : null);
    const res = await fetch(BASE_URL + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
    return parseResponse(res);
}

async function apiGet(url, auth = true) {
    const headers = (auth === false)
        ? { 'Content-Type': 'application/json' }
        : getHeaders(typeof auth === 'string' ? auth : null);
    const res = await fetch(BASE_URL + url, {
        method: 'GET',
        headers
    });
    return parseResponse(res);
}

async function apiPut(url, data = {}, auth = true) {
    const headers = (auth === false)
        ? { 'Content-Type': 'application/json' }
        : getHeaders(typeof auth === 'string' ? auth : null);
    const res = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    });
    return parseResponse(res);
}

async function apiDelete(url, auth = true) {
    const headers = (auth === false)
        ? { 'Content-Type': 'application/json' }
        : getHeaders(typeof auth === 'string' ? auth : null);
    const res = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers
    });
    return parseResponse(res);
}
const BASE_URL = 'https://vaidyo-backend.onrender.com';

function getHeaders() {
    const token = localStorage.getItem('token');
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

async function apiPost(url, data, auth = true) {
    const headers = auth ? getHeaders() :
        {'Content-Type': 'application/json'};
    const res = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    return parseResponse(res);
}

async function apiGet(url, auth = true) {
    const headers = auth ? getHeaders() :
        {'Content-Type': 'application/json'};
    const res = await fetch(BASE_URL + url, {
        method: 'GET',
        headers: headers
    });
    return parseResponse(res);
}

async function apiPut(url, data = {}, auth = true) {
    const headers = auth ? getHeaders() :
        {'Content-Type': 'application/json'};
    const res = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    });
    return parseResponse(res);
}

async function apiDelete(url, auth = true) {
    const headers = auth ? getHeaders() :
        {'Content-Type': 'application/json'};
    const res = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: headers
    });
    return parseResponse(res);
}
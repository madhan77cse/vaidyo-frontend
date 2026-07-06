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

// ============================================
// NEW API ENDPOINTS — Steps 11–15
// ============================================

// --- Doctor dashboard ---
async function getDoctorStats() {
    return await apiGet('/api/doctor/dashboard/stats');
}

async function toggleOnlineVisit(appointmentId, isOnline) {
    return await apiPut(`/api/doctor/appointments/${appointmentId}/online-toggle`, { isOnline });
}

// --- Doctors listing (patient) ---
async function getApprovedDoctors(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiGet(`/api/patient/doctors${params ? '?' + params : ''}`);
}

async function getDoctorById(id) {
    return await apiGet(`/api/patient/doctors/${id}`);
}

async function getDoctorRatings(id) {
    return await apiGet(`/api/patient/doctors/${id}/ratings`);
}

// --- Ratings ---
async function submitRating(data) {
    return await apiPost('/api/ratings', data);
}

async function checkCompletedAppointment(doctorId) {
    return await apiGet(`/api/appointments/check-completed?doctorId=${doctorId}`);
}

// --- Medicine ---
async function uploadMedicinePhoto(medicineId, formData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/api/medicines/${medicineId}/photo`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });
    return parseResponse(res);
}

async function checkMedicineInteraction(medicineName) {
    return await apiGet(`/api/medicines/check-interaction?name=${encodeURIComponent(medicineName)}`);
}

async function getMedicineTelegramStatus(medicineId) {
    return await apiGet(`/api/medicines/${medicineId}/telegram-status`);
}

// --- Admin ---
async function getAdminStats() {
    return await apiGet('/api/admin/stats');
}

async function getPendingDoctors() {
    return await apiGet('/api/admin/doctors/pending');
}

async function approveDoctor(id) {
    return await apiPut(`/api/admin/doctors/${id}/approve`);
}

async function rejectDoctor(id, reason) {
    return await apiPut(`/api/admin/doctors/${id}/reject`, { reason });
}

async function getPendingNurses() {
    return await apiGet('/api/admin/nurses/pending');
}

async function approveNurse(id) {
    return await apiPut(`/api/admin/nurses/${id}/approve`);
}

async function rejectNurse(id, reason) {
    return await apiPut(`/api/admin/nurses/${id}/reject`, { reason });
}

// --- Emergency ---
async function triggerSOS() {
    return await apiPost('/api/emergency/sos');
}

async function getEmergencyContacts() {
    return await apiGet('/api/emergency/contacts');
}

async function addEmergencyContact(data) {
    return await apiPost('/api/emergency/contacts', data);
}

async function deleteEmergencyContact(id) {
    return await apiDelete(`/api/emergency/contacts/${id}`);
}

// --- Blood donation ---
async function registerDonor(data) {
    return await apiPost('/api/blood/register', data);
}

async function searchDonors(bloodGroup, location) {
    return await apiGet(`/api/blood/search?bloodGroup=${bloodGroup}&location=${encodeURIComponent(location)}`);
}

// --- Ambulance ---
async function requestAmbulance(data) {
    return await apiPost('/api/ambulance/request', data);
}

async function getAmbulanceStatus(id) {
    return await apiGet(`/api/ambulance/status/${id}`);
}

// --- AI Features ---
async function checkSymptoms(symptoms) {
    return await apiPost('/api/symptom-checker', { symptoms });
}

async function readReport(formData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/api/report-reader`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });
    return parseResponse(res);
}

async function getFoodRecommendations(data) {
    return await apiPost('/api/food-recommendation', data);
}
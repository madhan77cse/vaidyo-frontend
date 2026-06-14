function saveAuth(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('mobileNumber', data.mobileNumber);
    if (data.patientId) {
        localStorage.setItem('patientId', data.patientId);
    }
}

function getAuth() {
    return {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        role: localStorage.getItem('role'),
        fullName: localStorage.getItem('fullName'),
        mobileNumber: localStorage.getItem('mobileNumber'),
        patientId: localStorage.getItem('patientId')
    };
}

function logout() {
    localStorage.clear();
    window.location.href = '../login.html';
}

function checkAuth(requiredRole) {
    const auth = getAuth();
    if (!auth.token) {
        window.location.href = '../login.html';
        return false;
    }
    if (requiredRole && auth.role !== requiredRole) {
        window.location.href = '../login.html';
        return false;
    }
    return true;
}

function redirectByRole(role) {
    if (role === 'PATIENT')
        window.location.href = 'patient/dashboard.html';
    else if (role === 'DOCTOR')
        window.location.href = 'doctor/dashboard.html';
    else if (role === 'CARETAKER')
        window.location.href = 'caretaker/dashboard.html';
}
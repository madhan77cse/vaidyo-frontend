function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 2000,
        showConfirmButton: false
    });
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
}

function showLoading() {
    Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });
}

function hideLoading() {
    Swal.close();
}

function formatDate(dateString) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusBadge(status) {
    const badges = {
        'PENDING':   'warning',
        'REPLIED':   'info',
        'CONFIRMED': 'success',
        'REJECTED':  'danger',
        'COMPLETED': 'secondary',
        'ACTIVE':    'success',
        'INACTIVE':  'secondary',
        'NORMAL':    'success',
        'WARNING':   'warning',
        'CRITICAL':  'danger'
    };
    const color = badges[status] || 'secondary';
    return '<span class="badge bg-' + color + '">' + status + '</span>';
}
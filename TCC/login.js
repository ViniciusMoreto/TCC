function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeSlashIcon = document.getElementById('eyeSlashIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none'; // Esconde o ícone de olho aberto
        eyeSlashIcon.style.display = 'block'; // Mostra o ícone de olho fechado
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block'; // Mostra o ícone de olho aberto
        eyeSlashIcon.style.display = 'none'; // Esconde o ícone de olho fechado
    }
}
const helpButton = document.getElementById('helpButton');
const helpModal = document.getElementById('helpModal');
const closeModal = document.querySelector('.close');

// Mostrar el modal al hacer clic en el botón
helpButton.addEventListener('click', () => {
    helpModal.style.display = 'flex';
});

// Ocultar el modal al hacer clic en el botón de cerrar
closeModal.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === helpModal) {
        helpModal.style.display = 'none';
    }
});
let consultorioActual = null;
let consultorioEditando = null;
let horarioEditando = null;
let consultorioCerrando = null;

function mostrarFormulario() {
    const form = document.getElementById('formularioConsultorio');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

function actualizarMensajeVacio() {
    const contenedor = document.getElementById('consultoriosContainer');
    const mensaje = document.getElementById('mensajeVacio');
    if (contenedor.children.length <= 1) {
        mensaje.style.display = 'block';
    } else {
        mensaje.style.display = 'none';
    }
};

function agregarConsultorio(event) {
    event.preventDefault();
    
    const ubicacion = document.getElementById('ubicacion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const alias = document.getElementById('alias').value;
    const encargado = document.getElementById('encargado').value;
    
    const consultorio = document.createElement('div');
    consultorio.className = 'consultorio';
    consultorio.innerHTML = `
        <div class="consultorio-header">
            <h3 class="consultorio-ubicacion">${ubicacion}</h3>
            <div class="botones-consultorio">
                <button class="boton boton-verde" onclick="mostrarModalEditar(this)">
                    Editar
                </button>
                <button class="boton boton-amarillo" onclick="mostrarModalCierreTemporal(this)">
                    Gestionar Cierre
                </button>
                <button class="boton boton-rojo" onclick="eliminarConsultorio(this)">
                    Eliminar Consultorio
                </button>
            </div>
        </div>  
        <p class="consultorio-telefono">📍 ${telefono}</p>
        <p class="consultorio-email">📍 ${email}</p>
        <p class="consultorio-alias">📍 ${alias}</p>
        <p class="consultorio-encargado">📍 ${encargado}</p>
        <button class="boton boton-azul" onclick="mostrarModal(this)">
            + Agregar Horario de Atención
        </button>
        <div class="horarios-titulo">Horarios Registrados:</div>
        <div class="horarios-lista"></div>
    `;

    document.getElementById('consultoriosContainer').appendChild(consultorio);
    document.getElementById('ubicacion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('alias').value = '';
    document.getElementById('encargado').value = '';
    mostrarFormulario();
    actualizarMensajeVacio();
};

function mostrarModalEditar(btn) {
    consultorioEditando = btn.closest('.consultorio');
    const modal = document.getElementById('modalEditarConsultorio');
    const modalContent = modal.querySelector('.modal-content');
    
    // Obtener los valores actuales del consultorio
    const ubicacion = consultorioEditando.querySelector('.consultorio-ubicacion').textContent;
    const telefono = consultorioEditando.querySelector('.consultorio-telefono').textContent.replace('📍 ', '');
    const email = consultorioEditando.querySelector('.consultorio-email').textContent.replace('📍 ', '');
    const alias = consultorioEditando.querySelector('.consultorio-alias').textContent.replace('📍 ', '');
    const encargado = consultorioEditando.querySelector('.consultorio-encargado').textContent.replace('📍 ', '');

    // Rellenar el formulario con los valores actuales
    document.getElementById('ubicacionEditar').value = ubicacion;
    document.getElementById('telefonoEditar').value = telefono;
    document.getElementById('emailEditar').value = email;
    document.getElementById('aliasEditar').value = alias;
    document.getElementById('encargadoEditar').value = encargado;

    // Mostrar el modal
    modal.style.display = 'block';

    // Centrar el modal-content
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
}

function cerrarModalEditar() {
    const modal = document.getElementById('modalEditarConsultorio');
    modal.style.display = 'none';
    consultorioEditando = null;
}

function actualizarConsultorio(event) {
    event.preventDefault();
    
    if (!consultorioEditando) return;

    // Obtener los nuevos valores del formulario
    const ubicacion = document.getElementById('ubicacionEditar').value;
    const telefono = document.getElementById('telefonoEditar').value;
    const email = document.getElementById('emailEditar').value;
    const alias = document.getElementById('aliasEditar').value;
    const encargado = document.getElementById('encargadoEditar').value;

    // Actualizar el contenido del consultorio
    consultorioEditando.querySelector('.consultorio-ubicacion').textContent = ubicacion;
    consultorioEditando.querySelector('.consultorio-telefono').textContent = `📍 ${telefono}`;
    consultorioEditando.querySelector('.consultorio-email').textContent = `📍 ${email}`;
    consultorioEditando.querySelector('.consultorio-alias').textContent = `📍 ${alias}`;
    consultorioEditando.querySelector('.consultorio-encargado').textContent = `📍 ${encargado}`;

    // Modificar la función agregarConsultorio para incluir el botón de editar
    const consultorioHTML = `
        <div class="consultorio-header">
            <h3 class="consultorio-ubicacion">${ubicacion}</h3>
            <div class="botones-consultorio">
                <button class="boton boton-verde" onclick="mostrarModalEditar(this)">
                    Editar
                </button>
                <button class="boton boton-amarillo" onclick="mostrarModalCierreTemporal(this)">
                    Gestionar Cierre
                </button>
                <button class="boton boton-rojo" onclick="eliminarConsultorio(this)">
                    Eliminar Consultorio
                </button>
            </div>
        </div>
        <p class="consultorio-telefono">📍 ${telefono}</p>
        <p class="consultorio-email">📍 ${email}</p>
        <p class="consultorio-alias">📍 ${alias}</p>
        <p class="consultorio-encargado">📍 ${encargado}</p>
        <button class="boton boton-azul" onclick="mostrarModal(this)">
            + Agregar Horario de Atención
        </button>
        <div class="horarios-titulo">Horarios Registrados:</div>
        <div class="horarios-lista"></div>
    `;

    consultorioEditando.innerHTML = consultorioHTML;

    // Cerrar el modal
    cerrarModalEditar();
}

function mostrarModal(btn) {
    consultorioActual = btn.closest('.consultorio');
    document.getElementById('modalHorarios').style.display = 'block';
    document.getElementById('formHorarios').reset();
};

function cerrarModal() {
    document.getElementById('modalHorarios').style.display = 'none';
    consultorioActual = null;
};

function guardarHorario(event) {
    event.preventDefault();
    
    const diasSeleccionados = [];
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    dias.forEach(dia => {
        if (document.getElementById(dia).checked) {
            diasSeleccionados.push(dia.charAt(0).toUpperCase() + dia.slice(1));
        }
    });

    if (diasSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un día');
        return;
    }

    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    if (!horaInicio || !horaFin) {
        alert('Por favor, selecciona las horas de inicio y fin');
        return;
    }

    const horario = document.createElement('div');
    horario.className = 'horario';
    horario.innerHTML = `
        <div class="horario-header" style="display: flex; justify-content: space-between;">
            <strong>🕒 ${horaInicio} - ${horaFin}</strong>
            <button class="boton boton-rojo" onclick="eliminarHorario(this)">Eliminar</button>
        </div>
        <div class="dias-horario">
            📅 ${diasSeleccionados.join(', ')}
        </div>
    `;

    consultorioActual.querySelector('.horarios-lista').appendChild(horario);
    cerrarModal();
};

function mostrarModalEditarHorario(btn) {
    horarioEditando = btn.closest('.horario');
    const modal = document.getElementById('modalEditarHorario');
    
    // Obtener los valores actuales del horario
    const horasTexto = horarioEditando.querySelector('strong').textContent.replace('🕒 ', '');
    const [horaInicio, horaFin] = horasTexto.split(' - ');
    
    const diasTexto = horarioEditando.querySelector('.dias-horario').textContent
        .replace('📅 ', '')
        .split(', ');
    
    // Establecer las horas en el formulario
    document.getElementById('horaInicioEditar').value = horaInicio;
    document.getElementById('horaFinEditar').value = horaFin;
    
    // Desmarcar todos los checkboxes primero
    const checkboxes = document.querySelectorAll('#formEditarHorario .dia-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Marcar los días correspondientes
    diasTexto.forEach(dia => {
        const checkbox = document.getElementById(dia.toLowerCase() + 'Editar');
        if (checkbox) checkbox.checked = true;
    });
    
    modal.style.display = 'block';
};

function cerrarModalEditarHorario() {
    const modal = document.getElementById('modalEditarHorario');
    modal.style.display = 'none';
    horarioEditando = null;
};

function actualizarHorario(event) {
    event.preventDefault();
    
    if (!horarioEditando) return;
    
    const diasSeleccionados = [];
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    
    dias.forEach(dia => {
        const checkbox = document.getElementById(dia + 'Editar');
        if (checkbox && checkbox.checked) {
            diasSeleccionados.push(dia.charAt(0).toUpperCase() + dia.slice(1));
        }
    });
    
    if (diasSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un día');
        return;
    }
    
    const horaInicio = document.getElementById('horaInicioEditar').value;
    const horaFin = document.getElementById('horaFinEditar').value;
    
    if (!horaInicio || !horaFin) {
        alert('Por favor, selecciona las horas de inicio y fin');
        return;
    }
    
    // Actualizar el contenido del horario
    horarioEditando.innerHTML = `
        <div class="horario-header" style="display: flex; justify-content: space-between;">
            <strong>🕒 ${horaInicio} - ${horaFin}</strong>
            <div class="botones-horario">
                <button class="boton boton-verde" onclick="mostrarModalEditarHorario(this)">Editar</button>
                <button class="boton boton-rojo" onclick="eliminarHorario(this)">Eliminar</button>
            </div>
        </div>
        <div class="dias-horario">
            📅 ${diasSeleccionados.join(', ')}
        </div>
    `;
    
    cerrarModalEditarHorario();
};

// Modificar la función guardarHorario existente para incluir el botón de editar
function guardarHorario(event) {
    event.preventDefault();
    
    const diasSeleccionados = [];
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    dias.forEach(dia => {
        if (document.getElementById(dia).checked) {
            diasSeleccionados.push(dia.charAt(0).toUpperCase() + dia.slice(1));
        }
    });

    if (diasSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un día');
        return;
    }

    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    if (!horaInicio || !horaFin) {
        alert('Por favor, selecciona las horas de inicio y fin');
        return;
    }

    const horario = document.createElement('div');
    horario.className = 'horario';
    horario.innerHTML = `
        <div class="horario-header" style="display: flex; justify-content: space-between;">
            <strong>🕒 ${horaInicio} - ${horaFin}</strong>
            <div class="botones-horario">
                <button class="boton boton-verde" onclick="mostrarModalEditarHorario(this)">Editar</button>
                <button class="boton boton-rojo" onclick="eliminarHorario(this)">Eliminar</button>
            </div>
        </div>
        <div class="dias-horario">
            📅 ${diasSeleccionados.join(', ')}
        </div>
    `;

    consultorioActual.querySelector('.horarios-lista').appendChild(horario);
    cerrarModal();
};


function mostrarModalCierreTemporal(btn) {
    consultorioCerrando = btn.closest('.consultorio');
    document.getElementById('modalCierreTemporal').style.display = 'block';
    
    // Obtener el estado actual del consultorio
    const estaInactivo = consultorioCerrando.classList.contains('consultorio-inactivo');
    
    // Mostrar u ocultar los campos según si está activo o inactivo
    document.getElementById('formCierre').style.display = estaInactivo ? 'none' : 'block';
    document.getElementById('mensajeCierreActual').style.display = estaInactivo ? 'block' : 'none';
    document.getElementById('btnReactivar').style.display = estaInactivo ? 'block' : 'none';
    
    if (estaInactivo) {
        // Mostrar la información del cierre actual
        const fechaInicio = consultorioCerrando.dataset.fechaCierre;
        const fechaFin = consultorioCerrando.dataset.fechaReapertura;
        const motivo = consultorioCerrando.dataset.motivoCierre;
        
        document.getElementById('infoCierreActual').innerHTML = `
            <p><strong>Fecha de cierre:</strong> ${formatearFecha(fechaInicio)}</p>
            <p><strong>Fecha de reapertura:</strong> ${formatearFecha(fechaFin)}</p>
            <p><strong>Motivo:</strong> ${motivo}</p>
        `;
    }
};

function cerrarModalCierreTemporal() {
    document.getElementById('modalCierreTemporal').style.display = 'none';
    consultorioCerrando = null;
};

function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

function registrarCierreTemporal(event) {
    event.preventDefault();
    
    if (!consultorioCerrando) return;
    
    const fechaInicio = document.getElementById('fechaInicioCierre').value;
    const fechaFin = document.getElementById('fechaFinCierre').value;
    const motivo = document.getElementById('motivoCierre').value;
    
    // Validar que la fecha de fin sea posterior a la de inicio
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
        alert('La fecha de reapertura debe ser posterior a la fecha de cierre');
        return;
    }
    
    // Guardar la información del cierre en el elemento
    consultorioCerrando.dataset.fechaCierre = fechaInicio;
    consultorioCerrando.dataset.fechaReapertura = fechaFin;
    consultorioCerrando.dataset.motivoCierre = motivo;
    
    // Agregar clase para estilos de inactivo
    consultorioCerrando.classList.add('consultorio-inactivo');
    
    // Agregar banner de consultorio cerrado
    const bannerCierre = document.createElement('div');
    bannerCierre.className = 'banner-cierre';
    bannerCierre.innerHTML = `
        <div class="banner-cierre-contenido">
            <span class="icono-cierre">🚫</span>
            <div class="info-cierre">
                <p class="titulo-cierre">Consultorio Temporalmente Cerrado</p>
                <p class="periodo-cierre">Del ${formatearFecha(fechaInicio)} al ${formatearFecha(fechaFin)}</p>
                <p class="motivo-cierre">${motivo}</p>
            </div>
        </div>
    `;
    
    // Insertar el banner después del header del consultorio
    const header = consultorioCerrando.querySelector('.consultorio-header');
    header.parentNode.insertBefore(bannerCierre, header.nextSibling);
    
    cerrarModalCierreTemporal();
};

function reactivarConsultorio() {
    if (!consultorioCerrando) return;
    
    // Eliminar la clase de inactivo
    consultorioCerrando.classList.remove('consultorio-inactivo');
    
    // Eliminar el banner de cierre
    const banner = consultorioCerrando.querySelector('.banner-cierre');
    if (banner) banner.remove();
    
    // Limpiar los datos del cierre
    delete consultorioCerrando.dataset.fechaCierre;
    delete consultorioCerrando.dataset.fechaReapertura;
    delete consultorioCerrando.dataset.motivoCierre;
    
    cerrarModalCierreTemporal();
};

function eliminarConsultorio(btn) {
    if (confirm('¿Estás seguro de que quieres eliminar este consultorio?')) {
        btn.closest('.consultorio').remove();
        actualizarMensajeVacio();
    }
};

function eliminarHorario(btn) {
    if (confirm('¿Estás seguro de que quieres eliminar este horario?')) {
        btn.closest('.horario').remove();
    }
};

// Botón para regresar a las opciones de agenda
function regresar() {
    window.location.href = 'configuracion.html';
};

// Botón para regresar al inicio
function inicio() {
    window.location.href = 'inicioMedicos.html';
}
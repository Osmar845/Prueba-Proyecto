<?php
// Iniciar sesión
session_start();

require 'conexion.php';

// Verificar si la sesión está activa y contiene el identificador del usuario
if (!isset($_SESSION['email'])) {
    die("Error: No tienes permiso para realizar esta acción. Por favor, inicia sesión.");
}


// Cerrar la conexión
$conn->close();
?>
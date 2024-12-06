<?php
$servername = "localhost:8080";
$username = "root";
$password = "";
$dbname = "citas_medicas";

// Conexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'encuesta'
});

// Ruta para agregar una respuesta
app.post('/add', (req, res) => {
    const { respuesta, pregunta, encuesta, encuestado } = req.body;

    const sql = 'INSERT INTO respuestas (respuesta, pregunta, encuesta, encuestado) VALUES (?, ?, ?, ?)';

    db.query(sql, [respuesta, pregunta, encuesta, encuestado], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al insertar datos' });
        }

        res.json({ success: true, message: 'Datos insertados correctamente' });
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
}); 
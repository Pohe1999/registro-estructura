require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error de conexión a MongoDB:", error));

// Definir el modelo de usuario
const UsuarioSchema = new mongoose.Schema({
  seccion: { type: String, required: true },
  curp: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// Configurar el servidor
const app = express();
app.use(express.json()); 
app.use(cors({ origin: "https://registro-interno.netlify.app" })); 

// Ruta para registrar usuarios
app.post("/registro", async (req, res) => {
  try {
    const { seccion, curp, telefono } = req.body;

    if (!seccion || !curp || !telefono) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevoUsuario = new Usuario({ seccion, curp, telefono });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Registro exitoso", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error en el registro:", error);
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: "El CURP ya está registrado" });
    }
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Configurar el puerto
const PORT = process.env.PORT || 5007;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

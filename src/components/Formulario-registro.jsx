import React from "react";
import { useForm } from "react-hook-form";

const FormularioRegistro = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const datosNormalizados = {
      seccion: data.seccion.trim(),
      curp: data.curp.toUpperCase().trim(),
      telefono: data.telefono.trim(),
    };

    try {
      const response = await fetch("https://registro-afiliados.onrender.com/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosNormalizados),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert("✅ Registro exitoso");
        reset();
      } else {
        alert("❌ Error: " + resultado.mensaje);
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("❌ Hubo un error al conectar con el servidor");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-zinc-100 text-zinc-900 shadow-xl rounded-2xl border border-zinc-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#800020] tracking-wide">
        Registro de Afiliación
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Sección */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1">Sección</label>
          <input
            type="text"
            maxLength={4}
            {...register("seccion", {
              required: "La sección es obligatoria",
              pattern: {
                value: /^[1-9][0-9]{0,3}$/,
                message: "Debe ser un número entre 1 y 9999 sin ceros al inicio",
              },
            })}
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-800 placeholder-zinc-400 focus:ring-2 focus:ring-[#800020] focus:outline-none transition"
            placeholder="Ej. 1234"
          />
          {errors.seccion && <p className="text-red-500 text-sm mt-1">{errors.seccion.message}</p>}
        </div>

        {/* CURP */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1">CURP</label>
          <input
            type="text"
            maxLength={18}
            {...register("curp", {
              required: "El CURP es obligatorio",
              pattern: {
                value: /^[A-Z0-9]{18}$/,
                message: "El CURP debe tener 18 caracteres alfanuméricos",
              },
              onChange: (e) => setValue("curp", e.target.value.toUpperCase()),
            })}
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-800 placeholder-zinc-400 focus:ring-2 focus:ring-[#800020] focus:outline-none transition"
            placeholder="CURP"
          />
          {errors.curp && <p className="text-red-500 text-sm mt-1">{errors.curp.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1">Teléfono</label>
          <input
            type="tel"
            maxLength={10}
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe contener 10 dígitos",
              },
            })}
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-800 placeholder-zinc-400 focus:ring-2 focus:ring-[#800020] focus:outline-none transition"
            placeholder="10 dígitos"
          />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-[#800020] hover:bg-[#a0002a] text-white font-bold py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
        >
          Enviar Registro
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;

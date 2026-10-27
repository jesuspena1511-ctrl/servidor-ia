const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/preguntar', async (req, res) => {
    const { mensaje } = req.body;
    const apiKey = process.env.GEMINI_KEY; // Aquí se ocultará tu API Key

    try {
        const response = await fetch(`https://googleapis.com{apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: mensaje }] }]
            })
        });

        const data = await response.json();
        const textoIA = data.candidates[0].content.parts[0].text;
        res.json({ respuesta: textoIA });
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la IA' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

// Vercel Serverless Function in Node.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS-Header setzen, damit dein Frontend darauf zugreifen darf
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode nicht erlaubt. Bitte nutze POST.' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server-Konfigurationsfehler: API-Key fehlt.' });
  }

  try {
    let message = req.body?.message;

    if (!message && typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        message = parsed.message;
      } catch (parseError) {
        // Ignoriere, wir behandeln das weiter unten
      }
    }

    if (!message) {
      return res.status(400).json({ error: 'Keine Nachricht übergeben.' });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction:
        "Du bist Nexus AI, der Support-Bot für die Gaming- und Coding-Community 'Nexus Code Play'. " +
        "Du antwortest immer auf Deutsch, bist freundlich, nutzt gerne Entwickler-Slang und Emojis. " +
        "Formatiere Code-Antworten immer in <pre class='nexus-code-window'><code>...</code></pre> Blöcken."
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    let text = await response.text();

    if (typeof text === 'string' && text.includes('```')) {
      text = text.replace(/```(?:[a-zA-Z0-9]+)?\n([\s\S]*?)```/g, "<pre class='nexus-code-window'><code>$1</code></pre>");
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Support-Chat Fehler:', error);
    return res.status(500).json({ error: 'Fehler beim Erstellen der Antwort. Bitte versuche es später erneut.' });
  }
}

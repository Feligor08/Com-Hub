const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Erlaubt das Lesen von JSON-Bodys

// Datenbank initialisieren (Erstellt eine Datei 'nexus_db.sqlite')
const db = new sqlite3.Database('./nexus_db.sqlite', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Erfolgreich mit SQLite-Datenbank verbunden.');
        // Users-Tabelle erstellen, falls sie nicht existiert
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// --- API ENDPUNKTE ---

// 1. REGISTRIERUNG
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Bitte alle Felder ausfüllen.' });
    }

    try {
        // Passwort hashen (Sicherheit geht vor!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // In Datenbank einfügen
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [username, email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Username oder E-Mail existiert bereits.' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Registrierung erfolgreich!', userId: this.lastID });
        });

    } catch (error) {
        res.status(500).json({ error: 'Serverfehler bei der Registrierung.' });
    }
});

// 2. LOGIN
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Bitte E-Mail und Passwort angeben.' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Ungültige Zugangsdaten.' });
        }

        // Passwort abgleichen
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Ungültige Zugangsdaten.' });
        }

        // JWT Token erstellen (Gültig für 1 Tag)
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login erfolgreich!',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Backend-Server läuft auf http://localhost:${PORT}`);
});
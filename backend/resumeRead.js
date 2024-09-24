const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 5000; // Порт для вашего backend
const cors = require('cors');

// Подключаем CORS и парсер JSON
app.use(cors());
app.use(express.json());  // Для работы с JSON

// Настройка подключения к базе данных
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'resumeList',
    password: 'root',
    port: 5432,
});

client.connect();

// SQL-запрос для получения данных разработчиков с навыками
const query1 = `
    SELECT 
        developers.id,
        developers.first_name, 
        developers.last_name, 
        developers.email, 
        developers.phone, 
        developers.position, 
        developers.location, 
        COALESCE(string_agg(skills.skill_name, ', '), 'No skills') AS skills
    FROM developers
    LEFT JOIN developer_skill 
        ON developer_skill.iddeveloper = developers.id 
    LEFT JOIN skills 
        ON developer_skill.idskill = skills.id
    GROUP BY 
        developers.id, 
        developers.first_name, 
        developers.last_name, 
        developers.email, 
        developers.phone, 
        developers.position, 
        developers.location;
`;

// Маршрут для получения данных
app.get('/api/developers', (req, res) => {
    client.query(query1, (err, dbRes) => {
        if (err) {
            console.error('Ошибка выполнения запроса', err.stack);
            res.status(500).json({ error: 'Ошибка выполнения запроса' });
        } else {
            console.log(dbRes.rows); // Логируем результаты
            res.json(dbRes.rows);  // Отправляем данные в ответе
        }
    });
});

// Маршрут для добавления нового разработчика
app.post('/api/developers', (req, res) => {
    const { first_name, last_name, email, phone, position, location } = req.body;

    const query = `
        INSERT INTO developers (first_name, last_name, email, phone, position, location)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [first_name, last_name, email, phone, position, location];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err.message);
            res.status(500).json({ error: 'Ошибка выполнения запроса' });
        } else {
            console.log('Запись добавлена:', result.rows[0]);
            res.json(result.rows[0]);
        }
    });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Backend сервер запущен на порту ${port}`);
});

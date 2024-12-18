const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Обработчик для POST /execute
server.post('/execute', (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({
            status: 'error',
            error: 'Invalid request: missing language or code',
        });
    }

    // Найти подходящий ответ в db.json
    const db = router.db.get('execute').value();
    const result = db.find(
        (entry) => entry.language === language && entry.code === code
    );

    if (result) {
        return res.json(result.response);
    } else {
        return res.status(404).json({
            status: 'error',
            error: 'Code not found in database',
        });
    }
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on http://localhost:3001');
});

<?php
// Указываем файл базы данных
$dbFile = __DIR__ . '/bid.sqlite';

try {
    // Создаём подключение к SQLite (если файл не существует — создастся)
    $db = new PDO("sqlite:$dbFile");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Создаём таблицу bid, если ещё нет
    $db->exec("CREATE TABLE IF NOT EXISTS bid (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT
    )");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Получаем текст из POST
        $msg = isset($_POST['message']) ? trim($_POST['message']) : '';

        if ($msg !== '') {
            // Вставляем в базу
            $stmt = $db->prepare("INSERT INTO bid (message) VALUES (:msg)");
            $stmt->execute([':msg' => $msg]);
        }

        // Можно вернуть простой ответ
        echo "OK";
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Получаем все записи
        $result = $db->query("SELECT * FROM bid ORDER BY id ASC");

        // HTML-шаблон
?>
        <!DOCTYPE html>
        <html lang="uk">

        <head>
            <meta charset="UTF-8">
            <title>Заявки</title>

            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            <style>
                body {
                    font-family: 'Ubuntu', sans-serif;
                    background: #f4f6f8;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }

                h2 {
                    text-align: left;
                    margin-bottom: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                }

                th,
                td {
                    padding: 10px 14px;
                    text-align: left;
                    border-bottom: 1px solid #e0e0e0;
                }

                th {
                    background: #11beb083;
                    color: #fff;
                    font-weight: 500;
                }

                tr:hover td {
                    background: #f8f8f8ff;
                }

                .close-btn {
                    display: block;
                    margin: 20px 0 0 0;
                    background-color: #11beb0ff;
                    border: 1px solid #11d1c1;
                    color: #fff;
                    border: none;
                    padding: 10px 26px 8px 18px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .close-btn .material-symbols-outlined {
                    font-size: 20px;
                    /* размер иконки */
                    vertical-align: middle;
                    margin-right: 6px;
                    color: #ffffff;
                }

                .close-btn:hover {
                    background: #0b9488ff;
                }
            </style>
        </head>

        <body>
            <h2>Список заявок</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Текст</th>
                </tr>
                <?php foreach ($result as $row): ?>
                    <tr>
                        <td><?= htmlspecialchars($row['id']) ?></td>
                        <td><?= htmlspecialchars($row['message']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>

            <button class="close-btn" onclick="window.close()">
                <span class="material-symbols-outlined">close</span>
                Закрити
            </button>
        </body>

        </html>
<?php
    }
} catch (PDOException $e) {
    echo "Ошибка базы данных: " . $e->getMessage();
}

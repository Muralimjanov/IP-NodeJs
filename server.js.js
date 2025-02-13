const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5010;

// Настройки Telegram
const TOKEN = "7090232738:AAHrW7SVVN0THmm55g-F-tz2MXBgMh-qB5Q"; // Замени на токен бота
const CHAT_ID = "1343951445"; // Замени на свой Chat ID
const TG_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

app.set("trust proxy", true); // Разрешаем Express доверять proxy (ngrok, Cloudflare и т.д.)

app.get("/", (req, res) => {
    // Получаем реальный IP-адрес
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Если IP в IPv6-формате, убираем `::ffff:`
    if (ip.includes(",")) {
        ip = ip.split(",")[0]; // Берём первый IP из списка (если через прокси)
    }
    ip = ip.replace("::ffff:", ""); // Убираем IPv6-префикс

    // Формируем сообщение
    const message = `🚀 Новый IP-адрес зашёл на сайт: ${ip}`;

    // Отправляем в Telegram
    axios.post(TG_API_URL, {
        chat_id: CHAT_ID,
        text: message
    }).catch(err => console.error("Ошибка отправки в Telegram:", err));

    res.send("Ваш IP записан и отправлен в Telegram.");
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

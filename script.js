const dotsCanvas = document.getElementById('dotsCanvas');
const dotsCtx = dotsCanvas.getContext('2d');
const textContainer = document.getElementById('text-container');

// Устанавливаем размеры Canvas
dotsCanvas.width = window.innerWidth;
dotsCanvas.height = window.innerHeight;

// Массив для хранения точек
const dots = [];

// Класс для создания точек
class Dot {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = 0; // Начальная прозрачность
        this.fadeInDuration = 5000; // Длительность появления (5 секунд)
        this.startTime = Date.now(); // Время создания точки
    }

    // Метод для отрисовки точки
    draw() {
        dotsCtx.beginPath();
        dotsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        dotsCtx.fillStyle = this.color;

        // Добавляем свечение
        dotsCtx.shadowBlur = 50; // Увеличиваем размытие тени для большего свечения
        dotsCtx.shadowColor = this.color; // Цвет свечения (такой же, как у точки)

        // Устанавливаем прозрачность
        dotsCtx.globalAlpha = this.opacity;

        dotsCtx.fill();
    }

    // Метод для обновления позиции и прозрачности точки
    update() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.startTime;

        // Плавное появление точки
        if (elapsedTime < this.fadeInDuration) {
            this.opacity = elapsedTime / this.fadeInDuration; // Плавное увеличение прозрачности
        } else {
            this.opacity = 1; // Полная непрозрачность
        }

        // Движение точки
        this.x += this.speedX;
        this.y += this.speedY;

        // Если точка вышла за пределы экрана, возвращаем ее в начало
        if (this.y > dotsCanvas.height || this.x > dotsCanvas.width || this.x < 0) {
            this.x = Math.random() * dotsCanvas.width;
            this.y = -this.size;
            this.opacity = 0; // Сбрасываем прозрачность
            this.startTime = Date.now(); // Сбрасываем время создания
        }

        this.draw();
    }
}

// Создаем точки
function createDots() {
    const colors = ['#FCB4D5', '#FBA0E3', '#F19CBB']; // Яркие цвета для точек
    for (let i = 0; i < 40; i++) { // Уменьшено количество точек до 50
        const x = Math.random() * dotsCanvas.width;
        const y = Math.random() * dotsCanvas.height;
        const size = Math.random() * 2 + 1; // Размер точки (1-3 пикселя)
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = 75 * (Math.PI / 180); // Угол 75 градусов (фиксированный)
        const speed = Math.random() * 0.3 + 0.2; // Замедленная скорость (0.2-0.5)
        const speedX = Math.cos(angle) * speed; // Скорость по X
        const speedY = Math.sin(angle) * speed; // Скорость по Y
        dots.push(new Dot(x, y, size, color, speedX, speedY));
    }
}

// Анимация падающих точек
function animateDots() {
    dotsCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height); // Очищаем Canvas
    dots.forEach(dot => dot.update()); // Обновляем и рисуем каждую точку
    requestAnimationFrame(animateDots); // Запускаем анимацию
}

// Функция для отображения текста и картинки
function showTextAndImage() {
    // Создаем контейнер для текста и картинки
    const container = document.createElement('div');
    container.classList.add('text-image-container');

    // Создаем текст
    const text = document.createElement('div');
    text.textContent = 'С днем щавеля!';
    text.classList.add('text-overlay');

    // Создаем картинку
    const image = document.createElement('img');
    image.src = 'shav.png'; // Укажите путь к вашей картинке
    image.classList.add('image-overlay');

    // Добавляем текст и картинку в контейнер
    container.appendChild(text);
    container.appendChild(image);

    // Добавляем контейнер в основной контейнер
    textContainer.appendChild(container);

    // Плавное появление текста и картинки
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.02;
        container.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeInInterval);
    }, 50);
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    dotsCanvas.width = window.innerWidth;
    dotsCanvas.height = window.innerHeight;
});

// Задержка перед созданием точек и их анимацией
setTimeout(() => {
    createDots();
    animateDots();
}, 5000); // 5000 миллисекунд (5 секунд) - время, через которое начнется анимация точек

// Показываем текст и картинку через 5 секунд после появления точек
setTimeout(showTextAndImage, 5000);

// Обработчик загрузки страницы
window.onload = () => {
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);
};
const wordsContainer = document.getElementById('words-container');
const dotsCanvas = document.getElementById('dotsCanvas');
const dotsCtx = dotsCanvas.getContext('2d');

// Устанавливаем размеры Canvas
dotsCanvas.width = window.innerWidth;
dotsCanvas.height = window.innerHeight;

// Список приятных слов
const words = [
    "Счастья", "Любви", "Улыбок", "Радости", "Вдохновения", 
    "Тепла", "Добра", "Уюта", "Мечты", "Успеха", 
    "Красоты", "Гармонии", "Света", "Надежды", "Чудес",
    "Нежности", "Солнца", "Удачи", "Смеха", "Света"
];

// Массив для хранения активных слов
let activeWords = [];

// Функция для получения случайного слова
function getRandomWord() {
    let word;
    do {
        word = words[Math.floor(Math.random() * words.length)];
    } while (activeWords.includes(word)); // Проверяем, чтобы слово не дублировалось
    activeWords.push(word); // Добавляем слово в активные
    return word;
}

// Функция для получения случайной позиции
function getRandomPosition() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y };
}

// Функция для получения случайного направления
function getRandomDirection() {
    const angle = Math.random() * Math.PI * 2; // Случайный угол (0-360 градусов)
    const distance = Math.random() * 200 + 100; // Случайное расстояние (100-300 пикселей)
    const moveX = Math.cos(angle) * distance; // Смещение по X
    const moveY = Math.sin(angle) * distance; // Смещение по Y
    return { moveX, moveY };
}

// Функция для создания и анимации слова
function createWord() {
    const word = getRandomWord();
    const span = document.createElement('span');
    span.textContent = word;
    span.classList.add('word');

    // Уменьшаем размер слова на мобильных устройствах
    const isMobile = window.innerWidth <= 768;
    span.style.fontSize = isMobile ? '1.5em' : '2em';

    // Устанавливаем начальную позицию в случайном месте
    const { x, y } = getRandomPosition();
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    // Устанавливаем направление движения
    const { moveX, moveY } = getRandomDirection();
    span.style.setProperty('--move-x', `${moveX}px`);
    span.style.setProperty('--move-y', `${moveY}px`);

    // Добавляем слово в контейнер
    wordsContainer.appendChild(span);

    // Удаляем слово после завершения анимации
    setTimeout(() => {
        span.remove();
        activeWords = activeWords.filter(activeWord => activeWord !== word); // Убираем слово из активных
    }, 5000); // 5 секунд (длительность анимации)
}

// Запускаем создание нового слова каждые 2 секунды
setInterval(createWord, 2000);

// Создаем первое слово сразу
createWord();

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
    }

    // Метод для отрисовки точки
    draw() {
        dotsCtx.beginPath();
        dotsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        dotsCtx.fillStyle = this.color;
        dotsCtx.fill();
    }

    // Метод для обновления позиции точки
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Если точка вышла за пределы экрана, возвращаем ее в начало
        if (this.y > dotsCanvas.height || this.x > dotsCanvas.width || this.x < 0) {
            this.x = Math.random() * dotsCanvas.width;
            this.y = -this.size;
        }

        this.draw();
    }
}

// Создаем точки
function createDots() {
    const colors = ['#FCB4D5', '#FBA0E3', '#F19CBB']; // Цвета точек
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * dotsCanvas.width;
      const y = Math.random() * dotsCanvas.height;
      const size = Math.random() * 1 + 1; // Размер точки (1-2 пикселя)
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = 75 * (Math.PI / 180); // Угол 75 градусов (фиксированный)
      const speed = Math.random() * 1; // Скорость (1-2)
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

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    dotsCanvas.width = window.innerWidth;
    dotsCanvas.height = window.innerHeight;
});

// Запуск
createDots();
animateDots();

createWord();
  onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
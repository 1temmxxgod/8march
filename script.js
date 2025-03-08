const wordsContainer = document.getElementById('words-container');

// Список приятных слов
const words = [
    "Счастья", "Любви", "Улыбок", "Радости", "Вдохновения", 
    "Тепла", "Добра", "Уюта", "Мечты", "Успеха", 
    "Красоты", "Гармонии", "Света", "Надежды", "Чудес",
    "Нежности", "Солнца", "Удачи", "Смеха"
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

    // Устанавливаем начальную позицию
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
  onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
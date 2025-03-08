
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

  const canvas = document.getElementById('heartsCanvas');
  const ctx = canvas.getContext('2d');
  const wordsContainer = document.getElementById('words-container');
  
  // Устанавливаем размеры Canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Массив для хранения сердечек
  const hearts = [];
  
  // Класс для создания сердечек
  class Heart {
      constructor(x, y, size, color, speed) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.color = color;
          this.speed = speed;
      }
  
      // Метод для отрисовки сердечка
      draw() {
          ctx.font = `${this.size}px Arial`;
          ctx.fillStyle = this.color;
          ctx.fillText('❤️', this.x, this.y);
      }
  
      // Метод для обновления позиции сердечка
      update() {
          this.y += this.speed; // Движение вниз
          if (this.y > canvas.height) {
              this.y = -this.size; // Возвращаем сердечко в начало
              this.x = Math.random() * canvas.width; // Новое случайное положение по X
          }
          this.draw();
      }
  }
  
  // Создаем сердечки
  function createHearts() {
      const colors = [
          '#FF1493', // Розовый
          '#FF69B4', // Ярко-розовый
          '#FF4500', // Оранжевый
          '#FF6347', // Коралловый
          '#FFD700', // Золотой
          '#FF0000', // Красный
          '#FF7F50', // Кораллово-оранжевый
          '#FF00FF', // Фуксия
          '#FFA07A', // Светло-коралловый
          '#FFC0CB'  // Розовый (светлый)
      ]; // Больше цветов для сердечек
  
      const isMobile = window.innerWidth <= 768; // Проверяем, мобильное ли устройство
      const heartCount = isMobile ? 30 : 50; // Меньше сердечек на мобильных устройствах
  
      for (let i = 0; i < heartCount; i++) {
          const x = Math.random() * canvas.width; // Случайное положение по X
          const y = Math.random() * canvas.height; // Случайное положение по Y
          const size = isMobile ? Math.random() * 20 + 10 : Math.random() * 30 + 20; // Меньше размер на мобильных
          const color = colors[Math.floor(Math.random() * colors.length)]; // Случайный цвет
          const speed = Math.random() * 0.5 + 0.3; // Уменьшенная скорость (от 0.3 до 0.8)
          hearts.push(new Heart(x, y, size, color, speed));
      }
  }
  
  // Анимация падающих сердечек
  function animateHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем Canvas
      hearts.forEach(heart => heart.update()); // Обновляем и рисуем каждое сердечко
      requestAnimationFrame(animateHearts); // Запускаем анимацию
  }
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
  
  // Список приятных слов
  const words = [
      "Счастья", "Любви", "Улыбок", "Радости", "Вдохновения", 
      "Тепла", "Добра", "Уюта", "Мечты", "Успеха", 
      "Красоты", "Гармонии", "Света", "Надежды", "Чудес",
      "Нежности", "Солнца", "Удачи", "Смеха", "Света"
  ];
  
  // Массив для хранения использованных слов
  let usedWords = [];
  
  // Функция для получения случайного слова
  function getRandomWord() {
      if (usedWords.length === words.length) {
          usedWords = []; // Сбрасываем массив, если все слова использованы
      }
      let word;
      do {
          word = words[Math.floor(Math.random() * words.length)];
      } while (usedWords.includes(word));
      usedWords.push(word);
      return word;
  }
  
  // Функция для получения случайной позиции
  function getRandomPosition() {
      const x = Math.random() * (window.innerWidth - 100); // Учитываем ширину слова
      const y = Math.random() * (window.innerHeight - 50); // Учитываем высоту слова
      return { x, y };
  }
  
  // Функция для проверки пересечения слов
  function isPositionOccupied(x, y) {
      const wordElements = document.querySelectorAll('.word');
      for (const element of wordElements) {
          const rect = element.getBoundingClientRect();
          if (
              x < rect.right + 50 && // Отступ 50px
              x + 100 > rect.left && // Ширина слова примерно 100px
              y < rect.bottom + 50 && // Отступ 50px
              y + 50 > rect.top // Высота слова примерно 50px
          ) {
              return true; // Позиция занята
          }
      }
      return false; // Позиция свободна
  }
  
  // Функция для показа слова
  function showWord() {
      const word = getRandomWord();
      const span = document.createElement('span');
      span.textContent = word;
      span.classList.add('word');
  
      // Уменьшаем размер слова на мобильных устройствах
      const isMobile = window.innerWidth <= 768;
      span.style.fontSize = isMobile ? '1.2em' : '2em';
  
      let x, y;
      do {
          const position = getRandomPosition();
          x = position.x;
          y = position.y;
      } while (isPositionOccupied(x, y));
  
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      wordsContainer.appendChild(span);
  
      // Удаляем слово через 3 секунды
      setTimeout(() => {
          span.remove();
      }, 3000);
  }
  
  // Запуск
  createHearts();
  animateHearts();
  
  // Показываем новое слово каждые 3 секунды
  setInterval(showWord, 2000);
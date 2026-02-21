const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const eventInput = document.getElementById('event-input');
const addEventBtn = document.getElementById('add-event');
const eventDetails = document.getElementById('event-details');
const confirmEventBtn = document.getElementById('confirm-event');
const categorySelect = document.getElementById('category-select');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedDay = null;

const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0); 
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    calendarBody.innerHTML = '';

    for (let i = 1; i <= 42; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        if (i < startDay + 1 || i > daysInMonth + startDay) {
            dayElement.textContent = '';
            dayElement.style.display = 'none';
        } else {
            const day = i - startDay;

            // Число дня
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            // Контейнер для событий
            const eventsContainer = document.createElement('div');
            eventsContainer.classList.add('events');
            dayElement.appendChild(eventsContainer);

            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => {
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }
                selectedDay = dayElement;
                selectedDay.classList.add('selected');
            });
        }

        calendarBody.appendChild(dayElement);
    }

    // ИСПРАВЛЕНО: теперь название месяца и год отображаются корректно!
    monthYear.textContent = `${monthNames[month]} ${year}`;
}

renderCalendar(currentYear, currentMonth);

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

addEventBtn.addEventListener('click', () => {
    if (selectedDay) {
        eventDetails.style.display = 'block';
    } else {
        alert('Пожалуйста, выберите день!');
    }
});

confirmEventBtn.addEventListener('click', () => {
    const eventText = eventInput.value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const category = categorySelect.value;

    if (eventText && startTime && endTime && category) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.classList.add(category); // Добавляем класс категории

        // ИСПРАВЛЕНО: теперь событие отображается корректно!
        eventElement.textContent = `${eventText} (${startTime} - ${endTime})`;

        // Добавляем событие в контейнер событий выбранного дня
        const eventsContainer = selectedDay.querySelector('.events');
        eventsContainer.appendChild(eventElement);

        eventInput.value = '';
        document.getElementById('event-start-time').value = '';
        document.getElementById('event-end-time').value = '';
        eventDetails.style.display = 'none';
        selectedDay.classList.remove('selected');
        selectedDay = null;
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

// Добавим возможность удаления событий
calendarBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('event')) {
        event.target.remove();
    }
});

// Добавим возможность редактирования событий
calendarBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('event')) {
        const eventText = prompt('Введите новое название события:', event.target.textContent);
        if (eventText !== null) {
            event.target.textContent = eventText;
        }
    }
});

// Массив с изображениями для фона
const backgroundImages = [
    'https://masterpiecer-images.s3.yandex.net/c88fc4b64f2a11ee90cc96e999421984:upscaled',
    'https://avatars.mds.yandex.net/get-mpic/5236733/img_id2954729847857933536.jpeg/orig',
    'https://avatars.mds.yandex.net/i?id=5f1b2f87a68b71722a529896de2e08260ee5dff0-4335694-images-thumbs&n=13'
];

// Текущий индекс изображения
let currentImageIndex = 0;

// Ссылка на интервал для переключения фона
let backgroundInterval;

// Функция для переключения фона
function switchBackground() {
    document.body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Запускаем переключение фона каждые 30 секунд
backgroundInterval = setInterval(switchBackground, 30000);

// Обработчик клика на кнопку отключения переключения фона
document.getElementById('toggle-background').addEventListener('click', () => {
    clearInterval(backgroundInterval);
});



confirmEventBtn.addEventListener('click', () => {
    const eventText = eventInput.value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const category = categorySelect.value;

    if (eventText && startTime && endTime && category) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.classList.add(category); // Добавляем класс категории

        // ИСПРАВЛЕНО: теперь событие отображается корректно!
        eventElement.textContent = `${eventText} (${startTime} - ${endTime})`;

        // Добавляем событие в контейнер событий выбранного дня
        const eventsContainer = selectedDay.querySelector('.events');
        eventsContainer.appendChild(eventElement);

        eventInput.value = '';
        document.getElementById('event-start-time').value = '';
        document.getElementById('event-end-time').value = '';
        eventDetails.style.display = 'none';
        selectedDay.classList.remove('selected');
        selectedDay = null;
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

confirmEventBtn.addEventListener('click', () => {
    const eventText = eventInput.value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const category = categorySelect.value;

    if (eventText && startTime && endTime && category) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.classList.add(category); // Добавляем класс категории

        // ИСПРАВЛЕНО: теперь событие отображается корректно!
        eventElement.textContent = `${eventText} (${startTime} - ${endTime})`;

        // Добавляем событие в контейнер событий выбранного дня
        const eventsContainer = selectedDay.querySelector('.events');
        eventsContainer.appendChild(eventElement);

        // Окрашиваем выбранный день в цвет категории
        selectedDay.classList.add(category);

        eventInput.value = '';
        document.getElementById('event-start-time').value = '';
        document.getElementById('event-end-time').value = '';
        eventDetails.style.display = 'none';
        selectedDay.classList.remove('selected');
        selectedDay = null;
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});










confirmEventBtn.addEventListener('click', () => {
    const eventText = eventInput.value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const category = categorySelect.value;

    if (eventText && startTime && endTime && category) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.classList.add(category); // Добавляем класс категории

        // ИСПРАВЛЕНО: теперь событие отображается корректно!
        eventElement.textContent = `${eventText} (${startTime} - ${endTime})`;

        // Добавляем событие в контейнер событий выбранного дня
        const eventsContainer = selectedDay.querySelector('.events');
        eventsContainer.appendChild(eventElement);

        eventInput.value = '';
        document.getElementById('event-start-time').value = '';
        document.getElementById('event-end-time').value = '';
        eventDetails.style.display = 'none';
        selectedDay.classList.remove('selected');
        selectedDay = null;
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

const currentTime = new Date();
let currentHour = currentTime.getHours();
let currentMinute = currentTime.getMinutes();
const nearestBus = document.querySelector(".nearestBus");
const bus = document.querySelector(".bus");


// Переменная, которая будет запоминать имя текущей остановки после клика
let activeStopName = ""; 
// Переменная для выбранного направления (по умолчанию первое)
let activeDirection = ""; 

function updateData() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });
    } else {
        const mockPosition = { coords: { latitude: userLocation.lat, longitude: userLocation.lng } };
        successCallback(mockPosition);
    }
}

function successCallback(position) {
    const newTime = new Date();
    currentHour = newTime.getHours();
    currentMinute = newTime.getMinutes();

    // 1. Берем реальную широту и долготу, которую выдал телефон модератора или папы
    let realLat = position.coords.latitude;
    let realLng = position.coords.longitude;

    // 2. УМНАЯ ПРОВЕРКА: Находятся ли координаты в районе Постав?
    // Центр Постав имеет широту ~55.115. Если реальный латитюд сильно отличается (например, Москва — 55.75), 
    // значит приложение запустил модератор или мы тестируем на ПК в браузере!
    if (Math.abs(realLat - 55.115) > 0.5 || Math.abs(realLng - 26.837) > 0.5) {
        // Автоматически включаем "Режим модератора" и подставляем папу к ПТУ/Льнозаводу для теста!
        userLocation.lat = 55.1165; 
        userLocation.lng = 26.8260;
        console.log("Включен режим модерации: координаты подменены на Поставы");
    } else {
        // Если это реальный телефон папы в Поставах — берем его честный GPS с датчика!
        userLocation.lat = realLat;
        userLocation.lng = realLng;
    }

    // --- ДАЛЬШЕ ИДЕТ ВАШ СТАНДАРТНЫЙ КОД БЕЗ ИЗМЕНЕНИЙ ---
    const stopsArray = Object.keys(stopsDatabase).map(name => ({
        name: name,
        latitudeBus: stopsDatabase[name][Object.keys(stopsDatabase[name])[0]].lat,
        longitudeBus: stopsDatabase[name][Object.keys(stopsDatabase[name])[0]].lng
    }));

    const foundObject = findObject(stopsArray, 'latitudeBus', userLocation.lat, 'longitudeBus', userLocation.lng);
    if (!foundObject) return;

    if (!activeStopName) {
        activeStopName = foundObject.name;
        activeDirection = Object.keys(stopsDatabase[activeStopName])[0];
    }

    const timesArray = stopsDatabase[activeStopName][activeDirection].routes;
    const routeData = {
        name: stopsDatabase[activeStopName][activeDirection].displayName + ` (${activeDirection})`,
        routes: timesArray
    };

    const tA = timeArrivalBus(routeData, currentHour, currentMinute);
    objToDiv(tA);
}



function errorCallback(error) {
    console.warn("Ошибка геолокации при автообновлении: " + error.message);
    // При ошибке GPS все равно делаем расчет по базовым координатам, чтобы приложение не висло
    const mockPosition = { coords: { latitude: userLocation.lat, longitude: userLocation.lng } };
    successCallback(mockPosition);
}

function handleClick(event) {
      // 0. ТОЧЕЧНО ДОБАВЛЯЕМ: Автобус начинает прикольно трястись на месте!
    if (bus) {
        bus.classList.add("vibrate");
    }

    // 2. ТОЧЕЧНО ДОБАВЛЯЕМ: Телефон начинает тарахтеть рокотом дизеля в руках
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 25, 45, 25, 45, 25, 45, 25, 45, 25, 45, 25, 45]);
    }
    // 1. Находим имя ближайшей остановки по вашей GPS-формуле
    const stopsArray = Object.keys(stopsDatabase).map(name => ({
        name: name,
        latitudeBus: stopsDatabase[name][Object.keys(stopsDatabase[name])[0]].lat,
        longitudeBus: stopsDatabase[name][Object.keys(stopsDatabase[name])[0]].lng
    }));
    
    const foundObject = findObject(stopsArray, 'latitudeBus', userLocation.lat, 'longitudeBus', userLocation.lng);
    if (!foundObject) return;

    activeStopName = foundObject.name;

    // 2. Командуем карте из map-data.js показать общий план (человек + направления)
    // Функция возвращает массив сторон, например: ["в Центр", "из Центра"]
    let directions = showAllOptionsOnMap(activeStopName);

    // 3. Находим элементы шторки в HTML
    const sheet = document.getElementById("bottom-sheet");
    const container = document.getElementById("directions-container");
    if (!sheet || !container) return;

    // Очищаем контейнер перед добавлением новых кнопок
    container.innerHTML = "";

directions.forEach(dir => {
    const btn = document.createElement("button");
    btn.classList.add("direction-btn");
    
    // ДОСТАЕМ КРАСИВОЕ ИМЯ: лезем в базу за displayName конкретного направления
    // activeStopName у нас равен "ПТУ / Льнозавод", а dir равен "в сторону Площади"
    const prettyName = stopsDatabase[activeStopName][dir].displayName;
    
    // ТЕПЕРЬ ТЕКСТ БУДЕТ: «🚏 ПТУ (в сторону Площади)»
    btn.innerHTML = `<span class="direction-btn-icon">🚏</span> ${prettyName} (${dir})`;
    
    btn.addEventListener("click", () => {
        const busBox = document.getElementById("bus-box");
        if (busBox) busBox.classList.add("drive-away");
        
        if (navigator.vibrate) navigator.vibrate(500);
        
        setTimeout(() => {
            const sheet = document.getElementById("bottom-sheet");
            if (sheet) sheet.classList.remove("open");
            confirmDirectionAndDrive(dir);
        }, 500);
    });
    container.appendChild(btn);
});


    // 5. ВЫДВИГАЕМ ШТОРКУ: она плавно доедет ровно до колес автобуса!
    sheet.classList.add("open");
}

// Новая функция: срабатывает, когда направление ВЫБРАНО в шторке
function confirmDirectionAndDrive(selectedDir) {
    activeDirection = selectedDir;

    if (nearestBus && nearestBus.parentNode) nearestBus.parentNode.removeChild(nearestBus);

    // Строим финальный маршрут на офлайн-карте
    // Функция из map-data.js теперь будет возвращать чистый массив ваших routes
    const routesArray = selectDirectionAndBuildRoute(activeStopName, activeDirection);

    // Формируем объект расписания ТОЧЬ-В-ТОЧЬ в том виде, который требует ваш старый код!
    const routeData = {
        name: stopsDatabase[activeStopName][activeDirection].displayName + ` (${activeDirection})`,
        routes: routesArray // Передаем все 4 автобуса с их часами и минутами [{numberBus: '1', timeHourMinute: [...]}, ...]
    };

    // Запускаем ваш оригинальный счетчик прилета минут
    const tA = timeArrivalBus(routeData, currentHour, currentMinute);
    
    // Рисуем ваши компактные плашки на экране
    objToDiv(tA);

    // Запускаем ежеминутное автообновление расписания
    updateData();
    if (!window.dataTimer) {
        window.dataTimer = setInterval(updateData, 60000);
    }
}


function timeArrivalBus(array, hour, minute) {
const arrivalTimeBus = [{name : array.name}];
if (!array.routes) return arrivalTimeBus;
for (let i = 0 ; i < array.routes.length; i++) {
for (let j = 0 ; j < array.routes[i].timeHourMinute.length; j++) {
if ( hour == array.routes[i].timeHourMinute[j].hour && (minute < array.routes[i].timeHourMinute[j].minute) ) {
arrivalTimeBus.push({bus : array.routes[i].numberBus, minute : (array.routes[i].timeHourMinute[j].minute - minute)});
break;
} else if (hour < array.routes[i].timeHourMinute[j].hour) {
arrivalTimeBus.push({bus : array.routes[i].numberBus, minute : ((60 - minute) + array.routes[i].timeHourMinute[j].minute)});
break;
}
}
}
return arrivalTimeBus;
}

function findObject(array, key1, value1, key2, value2) {
let closestObject = null;
let minDifference = Infinity;
array.forEach(obj => {
const diff1 = Math.abs(obj[key1] - value1);
const diff2 = Math.abs(obj[key2] - value2);
const totalDifference = diff1 + diff2;
if (totalDifference < minDifference) {
minDifference = totalDifference;
closestObject = obj;
}
});
return closestObject;
}

function objToDiv(array) {
const interactiveBlock = document.querySelector(".interactive-block");
if (!interactiveBlock) return;
// Очищаем блок перед отрисовкой новых минут или новой остановки
interactiveBlock.innerHTML = "";
interactiveBlock.style.backgroundColor = "white";
const stopBusName = document.createElement('div');
stopBusName.classList.add('stop-bus-name');
stopBusName.textContent = array[0].name; // Исправлено: имя берем из первого элемента
interactiveBlock.appendChild(stopBusName);
const blockSceduleBuses = document.createElement('div');
blockSceduleBuses.classList.add('block-scedule-buses');
interactiveBlock.appendChild(blockSceduleBuses);
// Если рейсов больше нет
if (array.length === 1) {
const noBuses = document.createElement('div');
noBuses.style.textAlign = 'center';
noBuses.style.padding = '20px 15px';
noBuses.style.color = '#888';
noBuses.style.fontSize = '16px';
noBuses.textContent = 'Рейсов на сегодня больше нет';
blockSceduleBuses.appendChild(noBuses);
return;
}
for (var i = 1; i < array.length; i++) {
const blockSceduleBus = document.createElement('div');
blockSceduleBus.classList.add('block-scedule-bus');
blockSceduleBuses.appendChild(blockSceduleBus);
if (i % 2 === 0) {
const numBusBlock = document.createElement('div');
numBusBlock.classList.add('num-bus-block-red');
blockSceduleBus.appendChild(numBusBlock);
if ((i + 1) < array.length) {
const line = document.createElement('div');
line.classList.add('line');
blockSceduleBuses.appendChild(line);
}
const numBusImg = document.createElement('div');
numBusImg.classList.add('num-bus-img');
numBusBlock.appendChild(numBusImg);
const numBus = document.createElement('div');
numBus.classList.add('num-bus');
numBus.textContent = array[i].bus;
numBusBlock.appendChild(numBus);
const timeBus = document.createElement('div');
timeBus.classList.add('time-bus');
timeBus.textContent = 'через: ' + array[i].minute + ' мин.';
blockSceduleBus.appendChild(timeBus);
continue;
}
const numBusBlock = document.createElement('div');
numBusBlock.classList.add('num-bus-block-green');
blockSceduleBus.appendChild(numBusBlock);
if ((i + 1) < array.length) {
const line = document.createElement('div');
line.classList.add('line');
blockSceduleBuses.appendChild(line);
}
const numBusImg = document.createElement('div');
numBusImg.classList.add('num-bus-img');
numBusBlock.appendChild(numBusImg);
const numBus = document.createElement('div');
numBus.classList.add('num-bus');
numBus.textContent = array[i].bus;
numBusBlock.appendChild(numBus);
const timeBus = document.createElement('div');
timeBus.classList.add('time-bus');
timeBus.textContent = 'через: ' + array[i].minute + ' мин.';
blockSceduleBus.appendChild(timeBus);
}
}

if (nearestBus) {
nearestBus.addEventListener('click', handleClick);
}
function switchPage(pageName) {
    // 1. Находим все страницы на сайте
    const pages = document.querySelectorAll('.app-page');
    
    // 2. Стираем класс активности у абсолютно всех страниц
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    // 3. Включаем нужную страницу по её классу
    if (pageName === 'main') {
        document.querySelector('.js-page-main').classList.add('active-page');
    } else if (pageName === 'route') {
        document.querySelector('.js-page-route').classList.add('active-page');
    } else if (pageName === 'schedule') {
        document.querySelector('.js-page-schedule').classList.add('active-page');
    } else if (pageName === 'info') {
        document.querySelector('.js-page-info').classList.add('active-page');
    }
}

// === ЛОГИКА СМАХИВАНИЯ ШТОРКИ ПАЛЬЦЕМ ВНИЗ (SWIPE DOWN) ===
let touchStartY = 0;

const sheetElement = document.getElementById("bottom-sheet");

if (sheetElement) {
    // Фиксируем точку, где папа прикоснулся пальцем к шторке
    sheetElement.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Проверяем, куда сдвинулся палец при отпускании
    sheetElement.addEventListener('touchend', (e) => {
        let touchEndY = e.changedTouches[0].clientY;
        
        // Если палец уверенно проскользил сверху вниз больше чем на 60 пикселей
        if (touchEndY - touchStartY > 60) {
            // Закрываем шторку
            sheetElement.classList.remove("open");
            
            // ВОЗВРАЩАЕМ КНОПКУ: возвращаем на место кнопку поиска, если папа передумал
            const mainPage = document.querySelector('.js-page-main');
            if (mainPage && !document.querySelector('.nearestBus') && !document.querySelector('.block-scedule-buses')) {
                // Если расписание еще не выведено, просто возвращаем кнопку (можно перезагрузить страницу или вернуть элемент)
                location.reload(); // Самый простой и надежный способ сбросить анимацию, если папа смахнул шторку назад
            }
        }
    }, { passive: true });
}

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
    // Если папа еще не нажал кнопку и остановка неизвестна — берем координаты заглушки
    if (!activeStopName) {
        // Запускаем ваш расчет ближайшего объекта по координатам из map-data.js
        const found = findObject(stopsDatabase, 'latitudeBus', userLocation.lat, 'longitudeBus', userLocation.lng);
        if (found) {
            // Ищем имя в нашей новой базе данных, где ключи — это названия остановок
            for (let stopName in stopsDatabase) {
                // Временный подбор имени для совместимости с вашей функцией findObject
                activeStopName = stopName; 
                activeDirection = Object.keys(stopsDatabase[stopName])[0];
                break;
            }
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });
    } else {
        // Если реального GPS нет (например в браузере), делаем мгновенный расчет по заглушке
        const mockPosition = {
            coords: {
                latitude: userLocation.lat,
                longitude: userLocation.lng
            }
        };
        successCallback(mockPosition);
    }
}

function successCallback(position) {
    const newTime = new Date();
    currentHour = newTime.getHours();
    currentMinute = newTime.getMinutes();

    // Обновляем глобальные координаты человека реальными данными с датчика телефона
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;

    // 1. Находим имя ближайшей остановки по вашей математической формуле
    // Передаем массив остановок, который мы сейчас соберем из базы данных для совместимости
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

    // 2. Достаем расписание для выбранного направления из map-data.js
    const stopTimes = stopsDatabase[activeStopName][activeDirection].times;

    // 3. Формируем объект маршрута в том виде, который ОЖИДАЕТ ваша функция timeArrivalBus
    const routeData = {
        name: activeStopName + ` (${activeDirection})`,
        routes: [{
            numberBus: "Автобус", // Заглушка номера
            timeHourMinute: stopTimes.map(t => {
                const parts = t.split(":");
                return { hour: parseInt(parts[0]), minute: parseInt(parts[1]) };
            })
        }]
    };

    // 4. Запускаем ваш стандартный счетчик прилета минут и рисуем плашки
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

    // 4. Генерируем кнопки НАПРЯМУЮ из вашего массива данных остановок Постав
    directions.forEach(dir => {
        // Создаем пухлую белую кнопку под палец
        const btn = document.createElement("button");
        btn.classList.add("direction-btn");
        
        // Вставляем иконку павильона и текст из массива
        btn.innerHTML = `<span class="direction-btn-icon">🚏</span> ${activeStopName} (${dir})`;
        
        // Вешаем на кнопку клик: папа тапает — шторка закрывается, автобус уезжает!
        btn.addEventListener("click", () => {
    // 1. Находим нашу внешнюю коробку-контейнер по ID
    const busBox = document.getElementById("bus-box");
    if (busBox) {
        // Командуем коробке плавно улетать влево (автобус внутри неё продолжит круто трястись на ходу!)
        busBox.classList.add("drive-away");
    }

    // 2. Включаем тактильный вибро-толчок нарастания скорости на полсекунды
    if (navigator.vibrate) {
        navigator.vibrate(500);
    }

    // 3. Даем пазику полсекунды скрыться за краем экрана, и выводим расписание
    setTimeout(() => {
        sheet.classList.remove("open");
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

    // Стираем кнопку "Где автобус?", она больше не нужна
    if (nearestBus && nearestBus.parentNode) {
        nearestBus.parentNode.removeChild(nearestBus);
    }

    // ВОТ ЗДЕСЬ автобус красиво уедет влево! 
    // Пока просто стираем его для работоспособности, а в следующем шаге добавим анимацию уезда
    if (bus && bus.parentNode) {
        bus.parentNode.removeChild(bus);
    }

    // Строим на карте финальный КРАСНЫЙ ПУНКТИРНЫЙ МАРШРУТ до выбранной стороны дороги
    const timesArray = selectDirectionAndBuildRoute(activeStopName, activeDirection);

    // Формируем объект расписания для вашей стандартной функции timeArrivalBus
    const routeData = {
        name: activeStopName + ` (${activeDirection})`,
        routes: [{
            numberBus: "Автобус",
            timeHourMinute: timesArray.map(t => {
                const parts = t.split(":");
                return { hour: parseInt(parts[0]), minute: parseInt(parts[1]) };
            })
        }]
    };

    // Запускаем ваш счетчик прилета минут и выводим те самые 4 плашки расписания!
    const tA = timeArrivalBus(routeData, currentHour, currentMinute);
    objToDiv(tA);

    // Включаем ежеминутный таймер автообновления расписания
    updateData();
    setInterval(updateData, 60000);
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

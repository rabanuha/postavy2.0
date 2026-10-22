const currentTime = new Date();
let currentHour = currentTime.getHours();
let currentMinute = currentTime.getMinutes();
let bus = document.querySelector(".bus");
let nearestBus = document.querySelector(".nearestBus");
// Глобальный объект для хранения ЧИСТЫХ, НАСТОЯЩИХ координат с датчика телефона
let liveUserGPS = { lat: 0, lng: 0 };

// Переменная, которая будет запоминать имя текущей остановки после клика
let activeStopName = ""; 
// Переменная для выбранного направления (по умолчанию первое)
let activeDirection = ""; 

// Оптимизация: Собираем плоский массив остановок ОДИН РАЗ при запуске приложения
const stopsArray = Object.keys(stopsDatabase).map(name => ({
    name: name,
    latitudeBus: stopsDatabase[name].lat,
    longitudeBus: stopsDatabase[name].lng
}));

function updateData() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });
    } else {
        const mockPosition = { coords: { latitude: userLocation.lat, longitude: userLocation.lng } };
        successCallback(mockPosition);
    }
}

function successCallback(position) {
    // Просто сохраняем чистый, честный GPS с датчика браузера БЕЗ всяких подмен!
    liveUserGPS.lat = position.coords.latitude;
    liveUserGPS.lng = position.coords.longitude;

    const newTime = new Date();
    currentHour = newTime.getHours();
    currentMinute = newTime.getMinutes();


    const foundObject = findObject(stopsArray, 'latitudeBus', liveUserGPS.lat, 'longitudeBus', liveUserGPS.lng);
    if (!foundObject) return;

    if (!activeStopName) {
        activeStopName = foundObject.name;
    }

    // 2. Определяем текущий день недели по часам телефона
    const allRoutes = stopsDatabase[activeStopName].routes;

    const currentDayIndex = newTime.getDay();
    let currentDayType = "Пн-Пт";
    if (currentDayIndex === 6) currentDayType = "Сб";
    if (currentDayIndex === 0) currentDayType = "Вс";

    const filteredRoutes = allRoutes.filter(route => route.dayType === currentDayType);

    // ИСПРАВЛЕНО: Убрали split, читаем ваши готовые числа напрямую
    const adaptedRoutes = filteredRoutes.map(route => {
        return {
            numberBus: route.numberBus,
            timeHourMinute: route.timeHourMinute
        };
    });

    const routeData = {
        name: stopsDatabase[activeStopName].displayName,
        routes: adaptedRoutes
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

    // 2. ТАКТИЛЬНЫЙ РОКОТ: Телефон начинает тарахтеть в руках
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 25, 45, 25, 45, 25, 45, 25, 45, 25, 45, 25, 45]);
    }

        // === ВЕКТОРНЫЙ ОТСТУП НА 100 МЕТРОВ (В Поставах — настоящее, за Поставами — 100м по вектору пунктира) ===
    
    // 1. Считываем чистый, живой GPS с датчика устройства
    const reallat = liveUserGPS.lat;
    const reallng = liveUserGPS.lng;

    // Координаты центра Постав (Площадь Ленина) для проверки гео-зоны
    const postavyCenterLat = 55.1111;
    const postavyCenterLng = 26.8412;

    // Считаем грубое расстояние от живого датчика до центра города (0.15 градусов ~ 15 км)
    const distanceToCenter = Math.sqrt(Math.pow(reallat - postavyCenterLat, 2) + Math.pow(reallng - postavyCenterLng, 2));

    // Объявляем переменные для итоговых координат расчета
    let myCurrentLat = reallat;
    let myCurrentLng = reallng;

    // Находим по всей базе самую близкую физически остановку к реальному GPS пользователя
    const foundObject = findObject(stopsArray, 'latitudeBus', reallat, 'longitudeBus', reallng);
    if (!foundObject) return;
    
    activeStopName = foundObject.name; // Запомнили ближайший точный ключ остановки
    const targetStopData = stopsDatabase[activeStopName];

    // 2. ЕСЛИ КЛИЕНТ ЗА ГОРОДОМ (дальше 15 км от центра) — включаем векторную тригонометрию на 100 метров
    if (distanceToCenter > 0.15 && targetStopData) {
        
        // Вычисляем вектор (разницу координат) от остановки в сторону ТЕКУЩИХ ЖИВЫХ координат человека
        const dLat = reallat - targetStopData.lat;
        const dLng = reallng - targetStopData.lng;
        
        // Считаем полную длину этой ниточки в радианах
        const totalDist = Math.sqrt(dLat * dLat + dLng * dLng);
        
        if (totalDist > 0) {
            // Магическая константа: 0.0009 градусов по широте — это строго 100 метров на поверхности Земли
            const stepInDegrees = 0.0009;
            
            // Находим пропорцию сдвига и прибавляем к координатам остановки ровно 100 метров по вектору к человеку
            myCurrentLat = targetStopData.lat + (dLat / totalDist) * stepInDegrees;
            myCurrentLng = targetStopData.lng + (dLng / totalDist) * stepInDegrees;
            
            // Обновляем глобальный живой GPS, чтобы смежный файл map-data.js прочертил пунктир именно от этой новой точки
            liveUserGPS.lat = myCurrentLat;
            liveUserGPS.lng = myCurrentLng;
            
            console.log(`Тест за городом. Векторный отступ на 100м от остановки ${activeStopName} в сторону вашего живого GPS.`);
        }
    } else {
        console.log(`Клиент в Поставах. Расчет идет по 100% настоящему GPS.`);
    }

    // 3. ЗАМЕРЯЕМ МЕТРЫ: Считаем честную дистанцию от посчитанной точки до павильона (всегда выйдет ровно ~100м)
    const distanceToStop = getDistanceInMeters(
        myCurrentLat, myCurrentLng,
        targetStopData.lat, targetStopData.lng
    );
    
    activeStopName = foundObject.name; // Запомнили ближайший точный ключ остановки


    // 3. Ищем эту остановку в вашей константе STOP_PAIRS, чтобы узнать, есть ли у неё пара через дорогу
    const stopPairObj = STOP_PAIRS.find(pair => pair.forward === activeStopName || pair.backward === activeStopName) || null;

    // Проверяем, одиночная ли это точка (нет в базе пар или отмечена как конечная)
    const isSingleStop = !stopPairObj || stopPairObj.isTerminal;

    // === СЦЕНАРИЙ А: ПАПА УЖЕ ВНУТРИ ПАВИЛЬОНА (<= 5 метров) ИЛИ ЭТО КОНЕЧНАЯ ОСТАНОВКА ===
    if (distanceToStop <= 5 || isSingleStop) {
        console.log(`Мгновенный вывод! Папа на остановке: ${activeStopName}`);
        
        // МАГИЯ КАРТЫ: Одиночная или близкая остановка МГНОВЕННО включается на карте,
        // чертит микро-пунктир и плавно центрирует камеру прямо под колёса!
        selectDirectionAndBuildRoute(activeStopName);

        // Автобус сразу улетает влево, шторку полностью игнорируем!
        const busBox = document.getElementById("bus-box");
        if (busBox) busBox.classList.add("drive-away");
        if (navigator.vibrate) navigator.vibrate(500);

        setTimeout(() => {
            confirmDirectionAndDrive(activeStopName);
        }, 500);


    // === СЦЕНАРИЙ Б: ПАПА ИДЕТ ИЗДАЛЕКА И ОСТАНОВКА ПАРНАЯ (ВЫВОДИМ ШТОРКУ ДЛЯ ВЫБОРА СТОРОНЫ) ===
    } else {
        console.log(`Выводим выбор стороны. Дистанция: ${distanceToStop.toFixed(1)} м.`);

        // Командуем карте из map-data.js красиво показать ОБЕ точки через дорогу
        showAllOptionsOnMap(stopPairObj.forward, stopPairObj.backward);

        const sheet = document.getElementById("bottom-sheet");
        const container = document.getElementById("directions-container");
        if (!sheet || !container) return;

        container.innerHTML = ""; // Очищаем старые кнопки

        // Массив из двух ключей направлений этой пары
        const pairKeys = [stopPairObj.forward, stopPairObj.backward];

        pairKeys.forEach(dirKey => {
            if (!stopsDatabase[dirKey]) return; // Защита, если какая-то сторона еще не распарсена

            const btn = document.createElement("button");
            btn.classList.add("direction-btn");
            
            // Вытаскиваем красивое индивидуальное имя (например, "Полевая (на Пл. Ленина)")
            // Вы можете добавить в STOP_PAIRS ключи подписей направлений, либо читать из displayName
            const prettyName = stopsDatabase[dirKey].displayName;
            const dirLabel = (dirKey === stopPairObj.forward) ? "на Пл. Ленина" : "на Конечную"; // Или берите из базы
            
            btn.innerHTML = `<span class="direction-btn-icon">🚏</span> ${prettyName}`;
            
            btn.addEventListener("click", () => {
                const busBox = document.getElementById("bus-box");
                if (busBox) busBox.classList.add("drive-away");
                if (navigator.vibrate) navigator.vibrate(500);
                
                setTimeout(() => {
                    sheet.classList.remove("open");
                    confirmDirectionAndDrive(dirKey); // Передаем точную выбранную сторону
                }, 500);
            });
            container.appendChild(btn);
        });

        // Плавно выдвигаем шторку
        sheet.classList.add("open");
    }
}

// Новая функция: срабатывает, когда направление ВЫБРАНО в шторке
function confirmDirectionAndDrive(finalStopKey) {
    // 1. Фиксируем текущий ключ остановки для автообновления
    activeStopName = finalStopKey;

    if (nearestBus && nearestBus.parentNode) nearestBus.parentNode.removeChild(nearestBus);

    // 2. Рисуем финальный маркер и красный пунктир на карте
    selectDirectionAndBuildRoute(finalStopKey);

    // 3. Получаем полный плоский список маршрутов для этой точки
    const allRoutes = stopsDatabase[finalStopKey].routes;
    if (!allRoutes) return;

    // 4. Определяем сегодняшний день недели по системным часам
    const currentDayIndex = new Date().getDay(); // 0 - Вс, 6 - Сб, 1-5 - Будни
    let currentDayType = "Пн-Пт";
    if (currentDayIndex === 6) currentDayType = "Сб";
    if (currentDayIndex === 0) currentDayType = "Вс";

    // 5. Фильтруем массив: оставляем только рейсы на СЕГОДНЯШНИЙ день
    const filteredRoutes = allRoutes.filter(route => route.dayType === currentDayType);

    // 6. Формируем объект расписания для вашей функции (берем готовые числа из базы напрямую)
    const routeData = {
        name: stopsDatabase[finalStopKey].displayName,
        routes: filteredRoutes.map(route => ({
            numberBus: route.numberBus,
            timeHourMinute: route.timeHourMinute // Без всяких split, напрямую объекты!
        }))
    };

    // 7. Запускаем ваш стандартный счетчик прилета минут
    const tA = timeArrivalBus(routeData, currentHour, currentMinute);

    const interactiveBlock = document.querySelector('.interactive-block');
    if (interactiveBlock) {
        interactiveBlock.innerHTML = ''; 
        interactiveBlock.style.height = '0px';
        interactiveBlock.style.border = 'none';
    }
    
    // 8. Отрисовываем плашки на экране
    objToDiv(tA);

    // 9. Включаем ежеминутное автообновление минут
    updateData();
    if (!window.dataTimer) {
        window.dataTimer = setInterval(updateData, 60000);
    }
}



function timeArrivalBus(array, hour, minute) {
    const arrivalTimeBus = [{name : array.name}];
    if (!array.routes) return arrivalTimeBus;
    for (let i = 0; i < array.routes.length; i++) {
        for (let j = 0; j < array.routes[i].timeHourMinute.length; j++) {
            
            // 1. НАХОДИМ ТЕКУЩИЙ РЕЙС: смотрим, есть ли у него флаги
            const currentTrip = array.routes[i].timeHourMinute[j];
            let tripNote = "";
            if (currentTrip.isShort) tripNote = "(до Площади)";
            if (currentTrip.viaGymnasium) tripNote = "(через Гимназию)";

            // 2. МАТЕМАТИКА: Переводим всё в абсолютные минуты текущего календарного дня
            let nowInMinutes = (hour * 60) + minute;
            let tripInMinutes = (currentTrip.hour * 60) + currentTrip.minute;

            // Если время рейса еще не ушло (автобус приедет сегодня или стоит прямо сейчас)
            if (tripInMinutes >= nowInMinutes) {
                let diffMinutes = tripInMinutes - nowInMinutes;

                arrivalTimeBus.push({
                    bus: array.routes[i].numberBus,
                    minute: diffMinutes,
                    note: tripNote
                });
                
                break; // Нашли ближайший рейс для этого номера автобуса, переходим к следующему номеру
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
    let mainPage = document.querySelector('.js-page-main');
    if (!mainPage) return;
    
    let blockSceduleBuses = document.querySelector('.block-scedule-buses');
    if (!blockSceduleBuses) {
        blockSceduleBuses = document.createElement('div');
        blockSceduleBuses.classList.add('block-scedule-buses');
        mainPage.appendChild(blockSceduleBuses);
    }
    
    blockSceduleBuses.innerHTML = ''; // Очищаем старые строчки

    // 1. Название остановки Постав в самый верх
    let stopHeader = document.createElement('div');
    stopHeader.classList.add('scedule-stop-name');
    let stopTitle = "Автобусная остановка";
        if (stopsDatabase[activeStopName]) {
            stopTitle = stopsDatabase[activeStopName].displayName;
        }
    stopHeader.innerHTML = `🚏
    <span>${stopTitle}</span>
    <img src="search-icon.png" class="scedule-search-icon" alt="search">`;
    blockSceduleBuses.appendChild(stopHeader);

    // === СЦЕНАРИЙ А: Если рейсов на сегодня больше нет ===
    if (!array || array.length <= 1) {
        let noBusesBlock = document.createElement('div');
        noBusesBlock.classList.add('block-scedule-bus');
        
        let textMessage = document.createElement('div');
        textMessage.classList.add('timeArrival');
        textMessage.style.width = '100%';       
        textMessage.style.textAlign = 'center'; 
        textMessage.style.color = '#7f8c8d';
        textMessage.style.fontSize = '1.1rem';
        textMessage.innerText = "Рейсов на сегодня больше нет";
        
        noBusesBlock.appendChild(textMessage);
        blockSceduleBuses.appendChild(noBusesBlock);
        return;
    }

    // === СЦЕНАРИЙ Б: ВОЗВРАЩАЕМ ВАШУ ФИРМЕННУЮ ОТРИСОВКУ ===
    for (let i = 1; i < array.length; i++) {
        let blockSceduleBus = document.createElement('div');
        blockSceduleBus.classList.add('block-scedule-bus');

        // Создаем контейнер для цветной плашки номера
        let numBusBlock = document.createElement('div');

        // Возвращаем переменную номера автобуса для фикса коммерции ниже
        let busNumber = array[i].bus;

        // Чередование цветов для контрастности по индексу цикла
        if (i % 2 !== 0) {
            numBusBlock.classList.add('num-bus-block-red');
        } else {
            numBusBlock.classList.add('num-bus-block-green');
        }

        // ДИНАМИЧЕСКИЙ ФИКС ДЛЯ КОММЕРЦИИ: Чтобы длинные номера '3тк' и '1тк' не сжимались в 50px,
        // мы автоматически расширяем плашку для длинного текста, сохраняя пропорции!
        if (busNumber.length > 2) {
            numBusBlock.style.width = '65px';
        }

        // ВОССТАНОВЛЕНО: Создаем пустой div для иконки (CSS сам подставит картинку через url) 
        // и вешаем ваш родной класс .num-bus для текста номера!
        numBusBlock.innerHTML = `
            <div class="num-bus-img"></div>
            <span class="num-bus">${busNumber}</span>
        `;
        blockSceduleBus.appendChild(numBusBlock);

        // ВСТАВИТЬ СЮДА: Если у автобуса есть примечание, создаем для него красный текст
        if (array[i].note) {
            let noteBlock = document.createElement('span');
            noteBlock.classList.add('bus-route-note'); // Наш новый класс стилей
            noteBlock.innerText = array[i].note;
            blockSceduleBus.appendChild(noteBlock);
        }

        // Блок для вывода времени прибытия
        let timeArrival = document.createElement('div');
        timeArrival.classList.add('timeArrival');

        let totalMinutes = array[i].minute;

        if (totalMinutes > 60) {
            let arrivalHour = currentHour;
            let arrivalMin = currentMinute + totalMinutes;

            while (arrivalMin >= 60) {
                arrivalMin -= 60;
                arrivalHour += 1;
            }
            if (arrivalHour >= 24) arrivalHour -= 24;

            let strHour = arrivalHour < 10 ? '0' + arrivalHour : arrivalHour;
            let strMin = arrivalMin < 10 ? '0' + arrivalMin : arrivalMin;
            
            // ИСПРАВЛЕНО: Убрали лишнее "через:", теперь текст будет четким: "в 23:43"
            timeArrival.innerText = `в ${strHour}:${strMin}`;
            
        } else {
            // Для близких рейсов ваш родной формат "через: 43 мин." остается без изменений!
            timeArrival.innerText = `через: ${totalMinutes} мин.`;
        }

        blockSceduleBus.appendChild(timeArrival);

        // Навешиваем клик на всю полоску автобуса для вызова большой плашки
        blockSceduleBus.addEventListener('click', () => {
            const overlay = document.getElementById('bus-modal-overlay');
            const modalNum = document.getElementById('bus-modal-num-block');
            const modalTime = document.getElementById('bus-modal-time-block');
            
            // 1. Передаем номер автобуса
            modalNum.innerText = busNumber;
            
            // 2. Передаем цвет фона (красный или зеленый) в зависимости от того, какой класс у плашки
            if (numBusBlock.classList.contains('num-bus-block-red')) {
                modalNum.style.backgroundColor = '#ed815c'; // Ваш красный цвет
            } else {
                modalNum.style.backgroundColor = '#18c20c'; // Ваш зеленый цвет
            }
            
            // 3. Забираем уже готовый и отформатированный текст времени прямо из строки расписания
            modalTime.innerText = timeArrival.innerText;
            
            // 4. Показываем плашку папе
            overlay.classList.add('active');
        });

        blockSceduleBuses.appendChild(blockSceduleBus);

        // Рисуем серые разделительные линии .line строго на своих местах
        if (i < array.length - 1) {
            let line = document.createElement('div');
            line.classList.add('line');
            blockSceduleBuses.appendChild(line);
        }
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
        if (typeof resetMainPageToDefault === 'function') {
            resetMainPageToDefault();
        }
        document.querySelector('.js-page-main').classList.add('active-page');
    } else if (pageName === 'route') {
        // Принудительно зачищаем первый экран от прошлых состояний
        if (typeof resetMainPageToDefault === 'function') {
            resetMainPageToDefault();
        }
        
        document.querySelector('.js-page-route').classList.add('active-page');
        
        // Даём элементам отрендериться и запускаем Вторую карту
        setTimeout(() => {
            if (secondMap) secondMap.invalidateSize();
            // Вызываем отрисовку текущего выбранного маршрута (по дефолту 1)
            drawSelectedRouteOnMap(activeRouteNumber);
        }, 50);

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

// Функция, которая ищет объект связи в вашем массиве STOP_PAIRS
function findStopPairObject(stopName) {
    // Проверяем, совпадает ли имя с forward или backward направлением
    return STOP_PAIRS.find(pair => pair.forward === stopName || pair.backward === stopName) || null;
}

// Умная функция: проверяет, нужно ли выводить расписание сразу (для конечных или одиночных)
function getStopOptions(stopName) {
    const pairObj = findStopPairObject(stopName);
    
    // Если остановка не найдена в парах или она отмечена как конечная
    if (!pairObj || pairObj.isTerminal) {
        return { isSingle: true, activeKey: stopName };
    }
    
    // Если это полноценная парная остановка
    return {
        isSingle: false,
        forwardKey: pairObj.forward,
        backwardKey: pairObj.backward
    };
}

// Функция считает точное расстояние между двумя координатами в метрах
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Радиус Земли в метрах
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Возвращает метры
}

// Логика закрытия большой плашки при тапе на подложку
document.getElementById('bus-modal-overlay').addEventListener('click', function() {
    this.classList.remove('active');
});









// === ЛОГИКА ТРЕТЬЕГО ЭКРАНА: АЛФАВИТНЫЙ ПОИСК ОСТАНОВОК И РАСПИСАНИЕ ===

// Функция генерации и отрисовки списка остановок Постав
function renderStopsList(filterText = '') {
    const listContainer = document.getElementById('all-stops-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = ''; // Очищаем старый список

    // 1. Получаем ключи базы данных и сортируем их строго по алфавиту от А до Я
    const sortedStopKeys = Object.keys(stopsDatabase).sort((a, b) => a.localeCompare(b, 'ru'));

    // 2. Перебираем остановки и строим элементы списка
    sortedStopKeys.forEach(stopKey => {
        const stopData = stopsDatabase[stopKey];
        const displayName = stopData.displayName || stopKey;

        // Фильтр поиска: если текст в поле ввода не совпадает с названием — пропускаем
        if (filterText && !displayName.toLowerCase().includes(filterText.toLowerCase())) {
            return;
        }

        // Создаем плашку строки остановки
        const listItem = document.createElement('div');
        listItem.classList.add('stop-list-item');

        listItem.innerHTML = `
            <div class="stop-item-name">🚏 ${displayName}</div>
            <div class="stop-item-actions">
                <button class="btn-action-schedule" title="Полное расписание">🕒</button>
                <button class="btn-action-map" title="Показать на карте">📍</button>
            </div>
        `;

        // Обработка тапа на саму полоску для раскрытия/скрытия кнопок
        listItem.addEventListener('click', (e) => {
            // Если папа нажал целенаправленно на кнопку внутри плашки — не закрываем её обратно
            if (e.target.closest('button')) return;

            const isAlreadyActive = listItem.classList.contains('active');

            // Сначала принудительно закрываем все остальные раскрытые строки в списке
            document.querySelectorAll('.stop-list-item').forEach(item => item.classList.remove('active'));

            // Если строка не была активной — раскрываем её
            if (!isAlreadyActive) {
                listItem.classList.add('active');
            }
        });

        // НАЖАТИЕ НА КНОПКУ 🕒 (ВАРИАНТ А: Полное расписание плиткой)
        listItem.querySelector('.btn-action-schedule').addEventListener('click', () => {
            openFullSchedulePage(stopKey, displayName);
        });

        // НАЖАТИЕ НА КНОПКУ 📍 (ВАРИАНТ В: Исправленное переключение с расчетом данных)
        listItem.querySelector('.btn-action-map').addEventListener('click', () => {
            
            // 1. Запускаем переключение на Главный экран (автоматически сработает генеральная уборка)
            if (typeof switchPage === 'function') switchPage('main');
            
            // 2. Имитируем стопроцентное нахождение папы прямо на остановке
            userLocation.lat = stopData.lat;
            userLocation.lng = stopData.lng;

            // 3. Записываем имя остановки в глобальную память
            activeStopName = stopKey;

            // 4. Запускаем штатную отрисовку маркеров на карте Leaflet
            if (typeof showAllOptionsOnMap === 'function') {
                showAllOptionsOnMap(stopKey);
            }

            // 5. МАТЕМАТИКА: Собираем правильный массив автобусов для objToDiv
            if (typeof timeArrivalBus === 'function') {
                // Определяем тип дня (Пн-Пт, Сб или Вс) через вашу глобальную переменную дня недели
                // Замените currentDayType на имя вашей переменной дня, если она называется иначе
                const filteredRoutes = timeArrivalBus(stopsDatabase[stopKey], currentDayType);
                
                // 6. Передаем в objToDiv ПРАВИЛЬНЫЙ посчитанный массив вместо текстовой строки
                if (typeof objToDiv === 'function') {
                    objToDiv(filteredRoutes);
                }
            }
        });

        listContainer.appendChild(listItem);
    });
}


// ВАРИАНТ А: Функция рендера и открытия страницы полного расписания на весь день
function openFullSchedulePage(stopKey, displayName) {
    const container = document.getElementById('full-schedule-container');
    const stopData = stopsDatabase[stopKey];
    if (!container || !stopData) return;

    container.innerHTML = ''; // Очищаем контейнер расписания
    container.style.display = 'block'; // Показываем экран расписания поверх списка

    // Создаем кнопку "Назад к списку" и заголовок остановки
    const backBtn = document.createElement('button');
    backBtn.classList.add('btn-schedule-back');
    backBtn.innerText = '↩️ Назад к списку';
    backBtn.addEventListener('click', () => {
        container.style.display = 'none'; // Скрываем расписание, возвращая поиск
    });
    container.appendChild(backBtn);

    const header = document.createElement('h2');
    header.style.color = 'white';
    header.style.marginBottom = '20px';
    header.style.fontSize = '1.3rem';
    header.innerText = `🚏 Расписание: ${displayName}`;
    container.appendChild(header);

    // Генерируем карточки для каждого автобуса, который ходит через эту остановку
    stopData.routes.forEach(route => {
        const card = document.createElement('div');
        card.classList.add('schedule-route-card');

        // Определяем цвет номера автобуса для преемственности интерфейса
        const isCommercial = route.numberBus.includes('тк');
        const badgeClass = isCommercial ? 'num-bus-block-red' : 'num-bus-block-green';

        // Собираем все рейсы этого автобуса через запятую
        const timesArray = route.timeHourMinute.map(t => {
            const m = t.minute < 10 ? '0' + t.minute : t.minute;
            let note = t.isShort ? ' (до Пл.)' : (t.viaGymnasium ? ' (гимн.)' : '');
            return `${t.hour}:${m}${note}`;
        });

        const timesText = timesArray.length > 0 ? timesArray.join(', ') : 'Рейсов на данный тип дня нет';

        card.innerHTML = `
            <div class="schedule-route-header">
                <span class="${badgeClass}" style="display:inline-flex; padding:5px 10px; border-radius:12px; color:white; font-size:0.9rem;">
                    Автобус ${route.numberBus}
                </span>
                <span style="font-size:0.9rem; color:#666;">(${route.dayType})</span>
            </div>
            <div class="schedule-time-grid">
                ${timesText}
            </div>
        `;
        container.appendChild(card);
    });
}

// Навешиваем событие живого поиска при вводе букв в инпут
document.getElementById('stop-search-input').addEventListener('input', (e) => {
    renderStopsList(e.target.value);
});

// Клик по кнопке лупы рядом с инпутом тоже сработает как принудительный поиск
document.getElementById('stop-search-btn').addEventListener('click', () => {
    const text = document.getElementById('stop-search-input').value;
    renderStopsList(text);
});

// Первичный запуск отрисовки всего списка остановок при старте приложения
document.addEventListener('DOMContentLoaded', () => {
    renderStopsList();
});


// ФУНКЦИЯ ГЕНЕРАЛЬНОЙ УБОРКИ: Возвращает Первый экран и Карту в первозданный вид
function resetMainPageToDefault() {
    // 1. Очищаем фоновый минутный таймер автообновления
    if (window.dataTimer) {
        clearInterval(window.dataTimer);
        window.dataTimer = null;
    }

    // 2. Находим выкатную шторку направлений и принудительно прячем её вниз
    const bottomSheet = document.querySelector('.bottom-sheet-menu');
    if (bottomSheet) {
        bottomSheet.classList.remove('open');
    }

    // 3. ЖЕЛЕЗОБЕТОННОЕ УДАЛЕНИЕ: Вместо скрытия высот полностью стираем старый блок из DOM
    const oldSchedule = document.querySelector('.block-scedule-buses') || document.querySelector('.block-schedule-buses');
    if (oldSchedule) {
        oldSchedule.remove(); // Уничтожаем блок расписания начисто, чтобы он не фонил в HTML!
    }

    // 4. ИСПРАВЛЕНИЕ: Возвращаем ваши ТОЧНЫЕ дефолтные демо-координаты Постав!
    if (window.userLocation) {
        userLocation.lat = 55.1145;
        userLocation.lng = 26.8412;
    }

        // 5. МАГИЯ КАРТЫ: Очищаем изолированные слои из map-data.js и сбрасываем центр Постав
    if (typeof map !== 'undefined' && map) {
        
        // 1. НАМЕРТВО ОСТАНАВЛИВАЕМ любые текущие фоновые движения и анимации карты
        map.stop(); 
        
        map.closePopup(); // Закрываем открытые балуны остановок

        // Очищаем контейнеры слоев, удаляя старый пунктир и точки
        if (typeof routeLayer !== 'undefined') routeLayer.clearLayers();
        if (typeof stopsLayer !== 'undefined') stopsLayer.clearLayers();
        if (typeof userLayer !== 'undefined') userLayer.clearLayers();
        
        // 2. ЖЕСТКИЙ СБРОС: Добавляем { animate: false }, чтобы карта прыгала в точку мгновенно и без погрешностей
        map.setView([55.1115, 26.837], 14, { animate: false });
        
        // Встряхиваем движок, чтобы на 100% закрепить результат
        map.invalidateSize();
    }

    // 6. Восстанавливаем первоначальное содержимое синего интерактивного блока
    const interactiveBlock = document.querySelector('.interactive-block');
    if (interactiveBlock) {
        interactiveBlock.style.height = '330px'; // Возвращаем высоту
        interactiveBlock.innerHTML = `
            <div class="bus-container" id="bus-box">
                <img src="lunch-removebg-preview.png" class="bus" alt="автобус">
            </div>
            <button class="nearestBus">Когда автобус?</button>
        `;
        
        const busBox = interactiveBlock.querySelector('#bus-box');
        if (busBox) {
            busBox.classList.remove('drive-away');
        }

        bus = interactiveBlock.querySelector('.bus');
        nearestBus = interactiveBlock.querySelector('.nearestBus');
        
        if (nearestBus) {
            nearestBus.addEventListener('click', handleClick);
        }
    }
    
    activeStopName = "";
}


// экран 2

// === ИНТЕРАКТИВНАЯ ГЕОМЕТРИЯ ВТОРОГО ЭКРАНА ===
let secondMap = null;
let routePolyline = null;
let routeMarkers = [];
let activeRouteNumber = 1; // По умолчанию при первом заходе горит Маршрут 1

// Последовательности остановок Постав для каждого маршрута из вашей базы
const routesSequences = {
    1: ["ПМЦ", "Полевая на Пл.Ленина", "СШ №3 на Пл.", "ЛЬНОЗАВОД на Пл.", "РЫНОК на Пл.", 
    "пл. Ленина на 5", "РДК на 5", "Белит на 5", "Школьник на 5", 
    "Детский Сад на 5", "ДЭУ на 6", "Лимончик на 5", "СТАНКЕВИЧА на Пл.Ленина"],
    2: ["МСО", ,"ДРСУ на Пл.", "ПЕРЕЕЗД на Пл.", "ЛЕНИНСКАЯ 2 на Пл.", "ЛЕНИНСКАЯ 1 на Пл.", "Пл. Ленина на 5", "ГОСТИНИЦА на Б",
        "АТП №16 на Б", "БОЛЬНИЦА на 5", "Строителей", "СЕЛЬХОЗТЕХНИКА с Б", "КЛЯРО 1 с Б", "Средняя школа №2 с Б",
        "ПЕСОЧНАЯ с Б", "Мелиоративная с Б", "СШ №1 с Б", "Школьник на Пл.", "Белит на 6", "БЕЛИТ на Ж.Д.", "АВТОВОКЗАЛ на ЖД", "ЖД на Пл.Ленина"], // Скорректируйте под ваши точные ключи базы
    3: ["Автовокзал", "ЖД Вокзал", "пл. Ленина", "Белит", "Школьник", "Больница"]         // Скорректируйте под ваши точные ключи базы
};

// Фирменные цвета маршрутов
const routeColors = {
    1: '#18c20c', // Фирменный зеленый
    2: '#3ba0ed', // Фирменный синий
    3: '#ed815c'  // Фирменный красный
};

// Главная функция инициализации карты и отрисовки линий
function drawSelectedRouteOnMap(routeNum) {
    const mapElement = document.getElementById('route-map');
    if (!mapElement) return;

    // 1. Инициализация карты без флага Leaflet и кнопок масштаба
    if (!secondMap) {
        secondMap = L.map('route-map', {
            attributionControl: false,
            zoomControl: false
        }).setView([55.1111, 26.8111], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(secondMap);

        // Навешиваем клики на плашки подвала ОДИН раз при создании карты
        initRouteListClicks();
    }

    // 2. ГЕНЕРАЛЬНАЯ ОЧИСТКА: Начисто стираем прошлый маршрут с карты
    if (routePolyline) {
        secondMap.removeLayer(routePolyline);
        routePolyline = null;
    }
    routeMarkers.forEach(m => secondMap.removeLayer(m));
    routeMarkers = [];

    const polylineCoordinates = [];
    const stopKeysArray = routesSequences[routeNum] || [];
    const currentColor = routeColors[routeNum] || '#3ba0ed';

    // 3. Сбор координат и отрисовка кружков под цвет выбранного маршрута
    stopKeysArray.forEach(stopKey => {
        const stopData = stopsDatabase[stopKey];
        if (stopData) {
            const pos = [stopData.lat, stopData.lng];
            polylineCoordinates.push(pos);

            // Рисуем кружок, цвет которого идеально совпадает с веткой маршрута!
            const circleMarker = L.circleMarker(pos, {
                radius: 6,
                fillColor: currentColor, // Принимает зеленый, синий или красный на лету
                color: '#ffffff',        // Белая контрастная обводка
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(secondMap);

            circleMarker.bindPopup(`<b>${stopData.displayName || stopKey}</b><br>Маршрут №${routeNum}`);
            routeMarkers.push(circleMarker);
        }
    });

    // 4. Чертим новую цветную полилинию
    if (polylineCoordinates.length > 0) {
        routePolyline = L.polyline(polylineCoordinates, {
            color: currentColor, // На лету красит линию в зеленый, синий или красный
            weight: 5,
            opacity: 0.8,
            lineJoin: 'round'
        }).addTo(secondMap);

        // 5. Автомасштаб под выбранную ветку
        secondMap.fitBounds(routePolyline.getBounds(), { padding: [20, 20] });
    }
}

// Функция обработки кликов по плашкам подвала
function initRouteListClicks() {
    const items = document.querySelectorAll('.route-list-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const routeNum = parseInt(item.getAttribute('data-route'));
            if (!routeNum) return;

            // Сохраняем выбранный номер в глобальную память
            activeRouteNumber = routeNum;

            // Переключаем классы активности в CSS (выбранный горит, остальные тухнут в серый)
            items.forEach(i => i.classList.remove('active-page', 'active-route'));
            item.classList.add('active-route');

            // Перерисовываем карту под новый маршрут
            drawSelectedRouteOnMap(routeNum);
        });
    });
}




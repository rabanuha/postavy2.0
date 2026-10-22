// ==========================================
// 2. ИНИЦИАЛИЗАЦИЯ ОФЛАЙН-КАРТЫ LEAFLET
// ==========================================
const map = L.map(document.querySelector('.js-offline-map'), {
    zoomControl: false,
    attributionControl: false
}).setView([55.115, 26.837], 14); // Центр Постав, масштаб 14

window.map = map; // Принудительно делимся картой с главным файлом script.js

// Подключаем вашу скачанную папку с GitHub в режиме TMS
L.tileLayer('postavy-map/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 12,
    tms: true
}).addTo(map);

// Создаем изолированные слои для маркеров и линии маршрута (чтобы легко их стирать)
const userLayer = L.layerGroup().addTo(map);
const stopsLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);

// ==========================================
// 3. ЛОГИКА НАВИГАЦИИ И ОТРИСОВКИ
// ==========================================

// Функция Шага 1: Показываем человека и ОБЕ остановки (Общий план при клике «Где автобус?»)
function showAllOptionsOnMap(forwardKey, backwardKey) {
    // Стираем старые кружки и линии перед новым поиском
    routeLayer.clearLayers();
    stopsLayer.clearLayers();

    // Создаем массив для автоматической подгонки зума карты
    const points = [[userLocation.lat, userLocation.lng]];

    // Собираем ключи в массив, чтобы перебрать их в цикле
    const pairKeys = [forwardKey, backwardKey];

    pairKeys.forEach(stopKey => {
        // Берем плоский объект остановки напрямую из вашей новой базы данных
        const stopData = stopsDatabase[stopKey];
        if (!stopData) return; // Защита, если какая-то сторона еще не забита

        // Добавляем координаты остановки в массив для зума карты
        points.push([stopData.lat, stopData.lng]);

        // Рисуем красивый векторный оранжевый кружок павильона
        L.circleMarker([stopData.lat, stopData.lng], {
            radius: 10,             // Размер кружка
            color: '#ffffff',       // Белая аккуратная обводка
            weight: 2,
            fillColor: '#f39c12',   // Сочный оранжевый цвет остановки
            fillOpacity: 1
        })
        .addTo(stopsLayer)
        .bindPopup(`<b>${stopData.displayName}</b>`);
    });

    // 1. Рисуем синий кружок — где стоит сам папа
    L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 8,
        color: '#ffffff',
        weight: 2,
        fillColor: '#3ba0ed',
        fillOpacity: 1
    }).addTo(userLayer).bindPopup("<b>Вы здесь</b>");

    // Автоматически настраиваем камеру карты, чтобы и человек, и ОБЕ остановки влезли в экран!
    map.fitBounds(points, { padding: [50, 50] });
}


// Функция Шага 2 и 3: Оставляем одну остановку и строим красивый КРАСНЫЙ ПУНКТИРНЫЙ МАРШРУТ
function selectDirectionAndBuildRoute(finalStopKey) {
    stopsLayer.clearLayers(); // Стираем лишние оранжевые кружки
    routeLayer.clearLayers(); // Стираем старый пунктир

    const currentStop = stopsDatabase[finalStopKey];
    if (!currentStop) return;

    // 1. Ставим финальный КРАСНЫЙ векторный кружок выбранной остановки
    L.circleMarker([currentStop.lat, currentStop.lng], {
        radius: 10,
        color: '#ffffff',
        weight: 2,
        fillColor: '#ff4747', // Красный цвет цели
        fillOpacity: 1
    })
    .addTo(stopsLayer)
    .bindPopup(`<b>${currentStop.displayName}</b>`)
    .openPopup();

    const startPoint = [liveUserGPS.lat, liveUserGPS.lng];
    const endPoint = [currentStop.lat, currentStop.lng];

    // 2. Строим КРАСНУЮ ПУНКТИРНУЮ ЛИНИЮ маршрута от человека до остановки
    L.polyline([startPoint, endPoint], {
        color: '#ff4747',      // Сочный красный цвет
        weight: 4,             // Толщина линии
        dashArray: '8, 8',     // Магия пунктира
        lineCap: 'round'
    }).addTo(routeLayer);

    // Поэтому мы делаем проверку: если точки почти совпадают — просто плавно центрируем камеру на остановке (setView)
     // 3. АНИМАЦИЯ КАРТЫ: Плавно центрируем камеру
    // ИСПРАВЛЕНО: Четко вычитаем широту [0] от широты, и долготу [1] от долготы
    if (Math.abs(startPoint[0] - endPoint[0]) < 0.0005 && Math.abs(startPoint[1] - endPoint[1]) < 0.0005) {
        // Если папа стоит прямо внутри павильона — плавно и крупно центрируем камеру на остановке
        map.setView(endPoint, 17, { animate: true, duration: 0.8 }); 
    } else {
        // Если он идёт издалека — красиво подгоняем масштаб под обе точки
        map.fitBounds([startPoint, endPoint], { padding: [50, 50] });
    }

    // === ВОЗВРАЩАЕМ СИНЮЮ ТОЧКУ ЧЕЛОВЕКА ПРИ МГНОВЕННОМ ВЫВОДЕ ===
    // Стираем старую точку, чтобы они не дублировались
    userLayer.clearLayers(); 

    // Рисуем синий кружок на текущих координатах папы
    L.circleMarker([liveUserGPS.lat, liveUserGPS.lng], {
        radius: 8,
        color: '#ffffff',
        weight: 2,
        fillColor: '#3ba0ed',
        fillOpacity: 1
    }).addTo(userLayer).bindPopup("<b>Вы здесь</b>");
}

// Текущие координаты человека по умолчанию (как будто папа стоит недалеко от Лесхоза)
// let userLocation = {
//     lat: 55.1145,
//     lng: 26.8412
// };
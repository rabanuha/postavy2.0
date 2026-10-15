// ==========================================
// 2. ИНИЦИАЛИЗАЦИЯ ОФЛАЙН-КАРТЫ LEAFLET
// ==========================================
const map = L.map(document.querySelector('.js-offline-map'), {
    zoomControl: false,
    attributionControl: false
}).setView([55.115, 26.837], 14); // Центр Постав, масштаб 14

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
function showAllOptionsOnMap(stopName) {
    // Стираем всё старое
    userLayer.clearLayers();
    stopsLayer.clearLayers();
    routeLayer.clearLayers();

    const stopData = stopsDatabase[stopName];
    if (!stopData) return null;

    // 1. Рисуем синий кружок — где стоит человек
    L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 8,
        color: '#ffffff',
        weight: 2,
        fillColor: '#3ba0ed',
        fillOpacity: 1
    }).addTo(userLayer).bindPopup("<b>Вы здесь</b>");

    // Массив для сбора координат всех точек, чтобы автоматически подогнать масштаб
    const points = [[userLocation.lat, userLocation.lng]];

    // 2. Ставим маркеры для всех доступных направлений этой остановки
Object.keys(stopData).forEach(direction => {
    const dirInfo = stopData[direction];
    points.push([dirInfo.lat, dirInfo.lng]);

    // ИСПРАВЛЕНО: Рисуем красивый векторный оранжевый кружок вместо картинки!
    L.circleMarker([dirInfo.lat, dirInfo.lng], {
        radius: 10,             // Размер кружка
        color: '#ffffff',       // Белая аккуратная обводка
        weight: 2,
        fillColor: '#f39c12',   // Сочный оранжевый цвет остановки
        fillOpacity: 1
    })
    .addTo(stopsLayer)
    .bindPopup(`<b>${dirInfo.displayName}</b><br>Направление: ${direction}`);
});



    // Автоматически настраиваем камеру карты, чтобы ВСЕ точки красиво влезли в экран
    map.fitBounds(points, { padding: [40, 40] });
    
    // Возвращаем данные остановок, чтобы script.js знал, сколько направлений найдено
    return Object.keys(stopData);
}

// Функция Шага 2 и 3: Оставляем одну остановку и строим красивый КРАСНЫЙ ПУНКТИРНЫЙ МАРШРУТ
function selectDirectionAndBuildRoute(stopName, direction) {
    stopsLayer.clearLayers(); // Стираем лишние маркеры
    routeLayer.clearLayers(); // Стираем старый пунктир

    const currentStop = stopsDatabase[stopName][direction];
    if (!currentStop) return;

    // 1. Ставим финальный маркер выбранной остановки (векторный красный кружок)
L.circleMarker([currentStop.lat, currentStop.lng], {
    radius: 10,
    color: '#ffffff',
    weight: 2,
    fillColor: '#ff4747',   // Красный цвет выбранной точки
    fillOpacity: 1
})
.addTo(stopsLayer)
    .bindPopup(`<b>${currentStop.displayName}</b><br>(${direction})`)
    .openPopup();


    // 2. Строим КРАСНУЮ ПУНКТИРНУЮ ЛИНИЮ маршрута от человека до остановки
    const startPoint = [userLocation.lat, userLocation.lng];
    const endPoint = [currentStop.lat, currentStop.lng];

    const polyline = L.polyline([startPoint, endPoint], {
        color: '#ff4747',      // Сочный красный цвет
        weight: 4,             // Толщина линии
        dashArray: '8, 8',     // Магия пунктира (8px линия, 8px пропуск)
        lineCap: 'round'
    }).addTo(routeLayer);

    // 3. Плавно перемещаем камеру карты так, чтобы видеть и человека, и выбранный павильон
    map.fitBounds([startPoint, endPoint], { padding: [50, 50] });

    // Возвращаем массив времён для этой конкретной стороны, чтобы вывести его в расписание
    return stopsDatabase[stopName][direction].routes;
}


// ==========================================
// 1. БАЗА ДАННЫХ ОСТАНОВОК ПОСТАВ (ЗАГЛУШКА)
// ==========================================
// Сюда вы потом по аналогии добавите все остальные точки города.
// =================================================================
// ОБЪЕДИНЕННАЯ БАЗА ОСТАНОВОК ПОСТАВ С МАРШРУТАМИ И НАПРАВЛЕНИЯМИ
// =================================================================
const stopsDatabase = {
    // Объединяем две противоположные остановки под одним общим ключом
    "ПТУ / Льнозавод": {
        "в сторону Площади": {
            // Координаты павильона ПТУ
            lat: 55.1175, 
            lng: 26.8250,
            // Имя для вывода на плашку расписания
            displayName: "ПТУ", 
            // Полный массив ваших родных автобусов со второго скриншота:
            routes: [
                { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]}, 
                { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
                { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
                { numberBus : '1тк', timeHourMinute : [{ hour: 9, minute: 3 }]}
            ]
        },
        "в сторону Конечной": {
            // Координаты павильона Льнозавод напротив
            lat: 55.1181, 
            lng: 26.8240,
            displayName: "Льнозавод",
            // Полный массив автобусов для противоположной стороны:
            routes: [
                { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]}, 
                { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
                { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
                { numberBus : '1тк', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]}
            ]
        }
    }
    // Следующие парные остановки города вы будете дописывать сюда по такому же шаблону
};


// Текущие координаты человека по умолчанию (как будто папа стоит недалеко от Лесхоза)
let userLocation = {
    lat: 55.1125,
    lng: 26.8310
};


// const busStop = [
//   {
//     name: 'ПТУ', 
//     latitudeBus: 55.1175, 
//     longitudeBus: 26.8250, 
//     routes : [
//       { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]}, 
//       { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
//       { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
//       { numberBus : '1тк', timeHourMinute : [{ hour: 9, minute: 3 }]}
//     ]
//   }, 
//   {
//     name: 'Льнозавод', 
//     latitudeBus: 55.1181, 
//     longitudeBus: 26.8240, 
//     routes : [
//       { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]}, 
//       { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
//       { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
//       { numberBus : '1тк', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]}
//     ]
//   },
//   { name: 'Кирмаш-напротив', latitudeBus: 55.1156, longitudeBus: 26.8295, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Кирмаш-Хит-Копеечка', latitudeBus: 55.1159, longitudeBus: 26.8293, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Купалинка', latitudeBus: 55.1141, longitudeBus: 26.8337, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Худ. школа', latitudeBus: 55.1137, longitudeBus: 26.8340, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Краевед. музей', latitudeBus: 55.1139, longitudeBus: 26.8387, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Дет. библиотека', latitudeBus: 55.1135, longitudeBus: 26.8402, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'РДК', latitudeBus: 55.1132, longitudeBus: 26.8454, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Мясная лавка', latitudeBus: 55.1131, longitudeBus: 26.8460, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Белит', latitudeBus: 55.1131, longitudeBus: 26.8543, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'маг. Вемс', latitudeBus: 55.1129, longitudeBus: 26.8566, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { 
//     name: 'Поставымебель', 
//     latitudeBus: 55.1129, 
//     longitudeBus: 26.8622, 
//     routes: [
//       { numberBus: '1', timeHourMinute: [{ hour: 6, minute: 36 }, { hour: 7, minute: 21 }, { hour: 7, minute: 36 }, { hour: 8, minute: 16 }, { hour: 8, minute: 36 }, { hour: 11, minute: 36 }, { hour: 12, minute: 6 }, { hour: 12, minute: 31 }, { hour: 12, minute: 56 }, { hour: 13, minute: 26 }, { hour: 13, minute: 51 }, { hour: 14, minute: 16 }, { hour: 14, minute: 46 }, { hour: 16, minute: 11 }, { hour: 16, minute: 41 }, { hour: 17, minute: 1 }, { hour: 17, minute: 31 }, { hour: 17, minute: 51 }, { hour: 18, minute: 21 }, { hour: 18, minute: 46 }, { hour: 19, minute: 11 }, { hour: 19, minute: 41 }, { hour: 20, minute: 6 }] },
//       { numberBus: '3', timeHourMinute: [{ hour: 7, minute: 3 }] }
//     ] 
//   },
//   { name: 'Суши WOK', latitudeBus: 55.1127, longitudeBus: 26.8623, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Детский сад', latitudeBus: 55.1125, longitudeBus: 26.8700, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'ДЭУ', latitudeBus: 55.1126, longitudeBus: 26.8723, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { 
//     name: 'Поставский лесхоз', 
//     latitudeBus: 55.1124, 
//     longitudeBus: 26.8735, 
//     routes: [
//       { numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }] },
//       { numberBus: '3', timeHourMinute: [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }] }
//     ] 
//   },
//   { name: 'Лимончик', latitudeBus: 55.1139, longitudeBus: 26.8736, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { name: 'Теремок', latitudeBus: 55.1143, longitudeBus: 26.8738, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
//   { 
//     // name: 'Полевая', 
//     name: 'Поставский лесхоз',
    
//     latitudeBus: 55.1222, 
//     longitudeBus: 26.8087, 
//     routes : [
//       { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]}, 
//       { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
//       { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
//       { numberBus : '1тк', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]}
//     ]
//   },
//   {
//     name: 'Станкевича', latitudeBus: 55.1169, 

// longitudeBus: 26.8776,
// routes : [
// { numberBus : '1', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 33 }, { hour: 8, minute: 38 }, { hour: 8, minute: 58 }, { hour: 11, minute: 8 }, { hour: 11, minute: 33 }, { hour: 11, minute: 58 }, { hour: 12, minute: 28 }, { hour: 12, minute: 53 }, { hour: 13, minute: 48 }, { hour: 14, minute: 18 }, { hour: 15, minute: 13 }, { hour: 15, minute: 43 }, { hour: 16, minute: 33 }, { hour: 17, minute: 3 }, { hour: 17, minute: 23 }, { hour: 17, minute: 53 }, { hour: 18, minute: 13 }, { hour: 18, minute: 43 }]},
// { numberBus : '3', timeHourMinute : [{ hour: 6, minute: 33 }, { hour: 7, minute: 23 }, { hour: 8, minute: 13 }, { hour: 8, minute: 48 }, { hour: 9, minute: 13 }, { hour: 9, minute: 43 }, { hour: 10, minute: 8 }, { hour: 10, minute: 28 }, { hour: 11, minute: 48 }, { hour: 12, minute: 43 }, { hour: 13, minute: 3 }, { hour: 13, minute: 30 }, { hour: 13, minute: 58 }, { hour: 14, minute: 28 }, { hour: 14, minute: 48 }, { hour: 15, minute: 22 }, { hour: 16, minute: 43 }, { hour: 17, minute: 13 }, { hour: 17, minute: 33 }, { hour: 18, minute: 3 }, { hour: 18, minute: 23 }]},
// { numberBus : '3тк', timeHourMinute : [{ hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]},
// { numberBus : '1тк', timeHourMinute : [{ hour: 7, minute: 3 }, { hour: 7, minute: 5 }, { hour: 8, minute: 5 }, { hour: 9, minute: 6 }, { hour: 10, minute: 14 }, { hour: 11, minute: 0 }, { hour: 12, minute: 55 }, { hour: 13, minute: 45 }, { hour: 15, minute: 31 }, { hour: 16, minute: 30 }, { hour: 17, minute: 30 }, { hour: 18, minute: 18 }, { hour: 19, minute: 11 }]}
// ]
// },
// { name: 'Школа №3', latitudeBus: 55.1208, longitudeBus: 26.8145, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Fix Price', latitudeBus: 55.1204, longitudeBus: 26.8152, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Суд', latitudeBus: 55.1076, longitudeBus: 26.8389, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Гостиница', latitudeBus: 55.1074, longitudeBus: 26.8386, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'АТП №16 (на площадь)', latitudeBus: 55.1052, longitudeBus: 26.8386, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'АТП №16', latitudeBus: 55.1050, longitudeBus: 26.8383, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Больница', latitudeBus: 55.1035, longitudeBus: 26.8384, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Больница (на площадь)', latitudeBus: 55.1028, longitudeBus: 26.8387, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Сельхозтехника', latitudeBus: 55.1029, longitudeBus: 26.8452, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Мягкая жизнь (Гагарина)', latitudeBus: 55.1036, longitudeBus: 26.8455, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Кляро', latitudeBus: 55.1069, longitudeBus: 26.8458, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Стройтеплоком (Кларо)', latitudeBus: 55.1068, longitudeBus: 26.8458, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Средняя школа №2', latitudeBus: 55.1069, longitudeBus: 26.8502, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Средняя школа №2 (на Станкевича)', latitudeBus: 55.1068, longitudeBus: 26.8302, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Песочная', latitudeBus: 55.1068, longitudeBus: 26.8538, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Песочная(на Станкевича)', latitudeBus: 55.1066, longitudeBus: 26.8561, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Мелиоративная', latitudeBus: 55.1068, longitudeBus: 26.8624, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// { name: 'Мелиоративная(на Станкевича)', latitudeBus: 55.1070, longitudeBus: 26.8627, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] },
// {
// name: 'Средняя школа №1',
// latitudeBus: 55.1099,
// longitudeBus: 26.8628,
// routes: [
// { numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] },
// { numberBus: '3', timeHourMinute: [{ hour: 7, minute: 1 }, { hour: 7, minute: 26 }, { hour: 7, minute: 51 }, { hour: 8, minute: 26 }, { hour: 8, minute: 46 }, { hour: 9, minute: 21 }, { hour: 9, minute: 46 }, { hour: 10, minute: 10 }, { hour: 11, minute: 1 }, { hour: 12, minute: 21 }, { hour: 12, minute: 36 }, { hour: 13, minute: 11 }, { hour: 13, minute: 36 }, { hour: 14, minute: 1 }, { hour: 14, minute: 26 }, { hour: 15, minute: 1 }, { hour: 15, minute: 21 }, { hour: 16, minute: 51 }, { hour: 17, minute: 11 }, { hour: 17, minute: 41 }, { hour: 18, minute: 1 }] }
// ]
// },
// { name: 'Нотариальная контора', latitudeBus: 55.1102, longitudeBus: 26.8631, routes: [{ numberBus: '1', timeHourMinute: [{ hour: 7, minute: 3 }] }] }
// ];
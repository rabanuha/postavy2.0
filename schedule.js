const STOP_PAIRS = [
  {
    forward: 'Пл. Ленина на 5',
    backward: 'Пл. Ленина на 6 или МСО',
    isTerminal: false
  },
  {
    forward: 'СШ №3 на Пл.', 
    backward: 'СШ №3 с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ЛЬНОЗАВОД на Пл.', 
    backward: 'ЛЬНОЗАВОД с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'РЫНОК на Пл.', 
    backward: 'РЫНОК с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Пл. КОМСОМОЛЬСКАЯ на Пл.', 
    backward: 'Пл. КОМСОМОЛЬСКАЯ с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'РДК на 5', 
    backward: 'РДК на 6', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Белит на 5', 
    backward: 'Белит на 6', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Школьник на 5', 
    backward: 'Школьник на Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Детский Сад на 5', 
    backward: 'ДЭУ на 6', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
   {
    forward: 'Лимончик на 5', 
    backward: 'Теремок на 6', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'АВТОВОКЗАЛ на ЖД', 
    backward: 'АВТОВОКЗАЛ с ЖД', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'СШ №1 на Б', 
    backward: 'СШ №1 с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Мелиоративная на Б', 
    backward: 'Мелиоративная с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ПЕСОЧНАЯ на Б', 
    backward: 'ПЕСОЧНАЯ с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'КЛЯРО 1 на Б', 
    backward: 'КЛЯРО 1 с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'СЕЛЬХОЗТЕХНИКА на Б', 
    backward: 'СЕЛЬХОЗТЕХНИКА с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'БОЛЬНИЦА на 5', 
    backward: 'БОЛЬНИЦА на Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'АТП №16 на Б', 
    backward: 'АТП №16 на Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ГОСТИНИЦА на Б', 
    backward: 'СУД на Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ЛЕНИНСКАЯ 1 на Пл.', 
    backward: 'ЛЕНИНСКАЯ 1 с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ЛЕНИНСКАЯ 2 на Пл.', 
    backward: 'ЛЕНИНСКАЯ 2 с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ДРСУ на Пл.', 
    backward: 'ДРСУ с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ПЕРЕЕЗД 2 на Пл.', 
    backward: 'ПЕРЕЕЗД 2 с Пл.', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'Средняя школа №2 на Б', 
    backward: 'Средняя школа №2 с Б', // Если название одинаковое с обеих сторон
    isTerminal: false
  },
  {
    forward: 'ПОЛЕВАЯ на Пл.Ленина',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'БЕЛИТ НА Ж.Д.',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'ПМЦ',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'Строителей',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'ул. Зеленая',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'СТАНКЕВИЧА',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'ЖД',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
  {
    forward: 'МСО',
    backward: null, // У конечной нет пары напротив
    isTerminal: true
  },
];




const stopsDatabase = {
  "ПОЛЕВАЯ на Пл.Ленина": {
    "lat": 55.1222,
    "lng": 26.8087, 
    "displayName": "ПОЛЕВАЯ на Пл.Ленина",
    "routes": [
      {
        "numberBus": "1",
        "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 0}, {"hour": 7, "minute": 35},{"hour": 8, "minute": 0}, {"hour": 8, "minute": 35}, {"hour": 8, "minute": 55, "isShort": true},{"hour": 11, "minute": 5}, {"hour": 11, "minute": 30}, {"hour": 11, "minute": 55},{"hour": 12, "minute": 25}, {"hour": 12, "minute": 50},{"hour": 13, "minute": 15}, {"hour": 13, "minute": 45},
          {"hour": 14, "minute": 15},{"hour": 15, "minute": 10}, {"hour": 15, "minute": 40},{"hour": 16, "minute": 30},{"hour": 17, "minute": 0}, {"hour": 17, "minute": 20}, {"hour": 17, "minute": 50},{"hour": 18, "minute": 10}, {"hour": 18, "minute": 40}
        ]
      },
      {
        "numberBus": "1",
        "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 0}, {"hour": 7, "minute": 35},{"hour": 8, "minute": 0}, {"hour": 8, "minute": 35}, {"hour": 8, "minute": 55},{"hour": 9, "minute": 25},{"hour": 10, "minute": 15},{"hour": 11, "minute": 5}, {"hour": 11, "minute": 30}, {"hour": 11, "minute": 55},
          {"hour": 12, "minute": 25}, {"hour": 12, "minute": 50},{"hour": 13, "minute": 15}, {"hour": 13, "minute": 45},{"hour": 14, "minute": 15, "isShort": true}
        ]
      },
      {
        "numberBus": "1",
        "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 35},{"hour": 8, "minute": 0}, {"hour": 8, "minute": 25}, {"hour": 8, "minute": 55},{"hour": 9, "minute": 20}, {"hour": 9, "minute": 45},{"hour": 10, "minute": 15}, {"hour": 10, "minute": 40},{"hour": 11, "minute": 5}, {"hour": 11, "minute": 20}, {"hour": 11, "minute": 55},
          {"hour": 12, "minute": 15}, {"hour": 12, "minute": 40},{"hour": 13, "minute": 15}, {"hour": 13, "minute": 40},{"hour": 14, "minute": 5, "isShort": true}
        ]
      },
      {
        "numberBus": "3",
        "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 30},{"hour": 7, "minute": 20}, {"hour": 7, "minute": 50, "viaGymnasium": true},{"hour": 8, "minute": 10}, {"hour": 8, "minute": 45},{"hour": 9, "minute": 10}, {"hour": 9, "minute": 40},{"hour": 10, "minute": 5}, {"hour": 10, "minute": 25},
          {"hour": 11, "minute": 45},{"hour": 12, "minute": 40},{"hour": 13, "minute": 0}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 55},{"hour": 14, "minute": 25}, {"hour": 14, "minute": 45},
          {"hour": 15, "minute": 20, "isShort": true},{"hour": 16, "minute": 40},{"hour": 17, "minute": 10}, {"hour": 17, "minute": 30},{"hour": 18, "minute": 0}, {"hour": 18, "minute": 20, "isShort": true}
        ]
      },
      {
        "numberBus": "3",
        "dayType": "Вс",
        "timeHourMinute": [] // Данные в исходной таблице отсутствуют
      }
    ]
  },

    "СТАНКЕВИЧА на Пл.Ленина": {
    "lat": 55.1169, 
    "lng": 26.8776, 
    "displayName": "СТАНКЕВИЧА на Пл.Ленина",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 30}, {"hour": 7, "minute": 15}, {"hour": 7, "minute": 30}, {"hour": 8, "minute": 10}, {"hour": 8, "minute": 30}, {"hour": 9, "minute": 0, "isShort": true}, {"hour": 11, "minute": 30}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 25}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 20}, {"hour": 13, "minute": 45}, {"hour": 14, "minute": 10}, {"hour": 14, "minute": 40}, {"hour": 15, "minute": 35, "isShort": true}, {"hour": 16, "minute": 5}, {"hour": 16, "minute": 55}, {"hour": 17, "minute": 25}, {"hour": 17, "minute": 45}, {"hour": 18, "minute": 15}, {"hour": 18, "minute": 40, "isShort": true}, {"hour": 19, "minute": 5, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 30}, {"hour": 7, "minute": 30}, {"hour": 8, "minute": 10}, {"hour": 8, "minute": 30}, {"hour": 9, "minute": 0}, {"hour": 9, "minute": 50, "isShort": true}, {"hour": 10, "minute": 40}, {"hour": 11, "minute": 30}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 25}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 20}, {"hour": 13, "minute": 45}, {"hour": 14, "minute": 10, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 30}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 30}, {"hour": 8, "minute": 50}, {"hour": 9, "minute": 20}, {"hour": 9, "minute": 50}, {"hour": 10, "minute": 15}, {"hour": 10, "minute": 40}, {"hour": 11, "minute": 0}, {"hour": 11, "minute": 30}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 20}, {"hour": 12, "minute": 40}, {"hour": 13, "minute": 15}, {"hour": 13, "minute": 40}, {"hour": 14, "minute": 5, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 55}, {"hour": 7, "minute": 20, "viaGymnasium": true}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 20}, {"hour": 8, "minute": 40}, {"hour": 9, "minute": 15}, {"hour": 9, "minute": 40}, {"hour": 10, "minute": 5}, {"hour": 10, "minute": 55, "isShort": true}, {"hour": 12, "minute": 15}, {"hour": 12, "minute": 30}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 30}, {"hour": 13, "minute": 55}, {"hour": 14, "minute": 20}, {"hour": 14, "minute": 55}, {"hour": 15, "minute": 15, "isShort": true}, {"hour": 16, "minute": 45}, {"hour": 17, "minute": 5}, {"hour": 17, "minute": 35}, {"hour": 17, "minute": 55}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

  "ЖД на Пл.Ленина": {
    "lat": 55.122706, "lng": 26.857149, "displayName": "ЖД на Пл.Ленина",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 30}, {"hour": 7, "minute": 5}, {"hour": 7, "minute": 30}, {"hour": 8, "minute": 5}, {"hour": 8, "minute": 25}, {"hour": 9, "minute": 0}, {"hour": 9, "minute": 25}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 45}, {"hour": 13, "minute": 10}, {"hour": 13, "minute": 45, "viaStroiteley": true}, {"hour": 14, "minute": 5}, {"hour": 14, "minute": 45, "viaStroiteley": true}, {"hour": 15, "minute": 45, "viaStroiteley": true}, {"hour": 16, "minute": 5}, {"hour": 17, "minute": 5}, {"hour": 17, "minute": 35}, {"hour": 18, "minute": 5, "isShort": true}, {"hour": 18, "minute": 35, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 35}, {"hour": 8, "minute": 35}, {"hour": 9, "minute": 35, "isShort": true}, {"hour": 11, "minute": 35}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 35}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 35}, {"hour": 8, "minute": 35}, {"hour": 9, "minute": 35, "isShort": true}, {"hour": 11, "minute": 35}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 35}
        ]
      }
    ]
  },

    "МСО": {
    "lat": 55.132861, "lng": 26.826735, "displayName": "МСО",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 35}, {"hour": 7, "minute": 0, "viaStroiteley": true}, {"hour": 7, "minute": 35, "viaStroiteley": true}, {"hour": 7, "minute": 52, "viaStroiteley": true}, {"hour": 8, "minute": 27}, {"hour": 8, "minute": 55}, {"hour": 9, "minute": 5, "isShort": true}, {"hour": 11, "minute": 35}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 15}, {"hour": 13, "minute": 35}, {"hour": 14, "minute": 15}, {"hour": 14, "minute": 35, "isShort": true}, {"hour": 15, "minute": 15}, {"hour": 15, "minute": 35}, {"hour": 16, "minute": 15}, {"hour": 16, "minute": 35}, {"hour": 17, "minute": 5}, {"hour": 17, "minute": 35}, {"hour": 18, "minute": 5}, {"hour": 18, "minute": 35, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 5}, {"hour": 8, "minute": 5}, {"hour": 9, "minute": 5}, {"hour": 11, "minute": 5}, {"hour": 12, "minute": 5}, {"hour": 13, "minute": 5}, {"hour": 14, "minute": 5}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 5}, {"hour": 8, "minute": 5}, {"hour": 9, "minute": 5}, {"hour": 11, "minute": 5}, {"hour": 12, "minute": 5}, {"hour": 13, "minute": 5}, {"hour": 14, "minute": 5, "isShort": true}
        ]
      }
    ]
  },
  "Пл. Ленина на 5": {
    "lat": 55.1139, "lng": 26.8387, "displayName": "Пл. Ленина на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 20}, {"hour": 7, "minute": 0}, {"hour": 7, "minute": 15}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 45}, {"hour": 11, "minute": 15}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 25}, {"hour": 13, "minute": 55}, {"hour": 14, "minute": 25}, {"hour": 15, "minute": 20}, {"hour": 15, "minute": 50}, {"hour": 16, "minute": 40}, {"hour": 17, "minute": 10}, {"hour": 17, "minute": 30}, {"hour": 18, "minute": 0}, {"hour": 18, "minute": 20}, {"hour": 18, "minute": 50}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 20}, {"hour": 7, "minute": 15}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 45}, {"hour": 9, "minute": 35}, {"hour": 10, "minute": 25}, {"hour": 11, "minute": 15}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 25}, {"hour": 13, "minute": 55}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 15}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 35}, {"hour": 9, "minute": 5}, {"hour": 9, "minute": 30}, {"hour": 9, "minute": 55}, {"hour": 10, "minute": 25}, {"hour": 10, "minute": 48}, {"hour": 11, "minute": 15}, {"hour": 11, "minute": 30}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 25}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 25}, {"hour": 13, "minute": 50}
        ]
      },
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 45}, {"hour": 7, "minute": 10, "viaStroiteley": true}, {"hour": 7, "minute": 45, "viaStroiteley": true}, {"hour": 8, "minute": 2, "viaStroiteley": true}, {"hour": 8, "minute": 35}, {"hour": 9, "minute": 5}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 25}, {"hour": 12, "minute": 45}, {"hour": 13, "minute": 25}, {"hour": 13, "minute": 45}, {"hour": 14, "minute": 25}, {"hour": 15, "minute": 25}, {"hour": 15, "minute": 45}, {"hour": 16, "minute": 45}, {"hour": 17, "minute": 15}, {"hour": 17, "minute": 45}, {"hour": 18, "minute": 15}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 15}, {"hour": 8, "minute": 15}, {"hour": 9, "minute": 15}, {"hour": 11, "minute": 15}, {"hour": 12, "minute": 15}, {"hour": 13, "minute": 15}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 15}, {"hour": 8, "minute": 15}, {"hour": 9, "minute": 15}, {"hour": 11, "minute": 15}, {"hour": 12, "minute": 15}, {"hour": 13, "minute": 15}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 40}, {"hour": 7, "minute": 5}, {"hour": 7, "minute": 30}, {"hour": 8, "minute": 5}, {"hour": 8, "minute": 20}, {"hour": 8, "minute": 55}, {"hour": 9, "minute": 25}, {"hour": 9, "minute": 50}, {"hour": 10, "minute": 35}, {"hour": 11, "minute": 55}, {"hour": 12, "minute": 10}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 10}, {"hour": 13, "minute": 35}, {"hour": 14, "minute": 5}, {"hour": 14, "minute": 35}, {"hour": 14, "minute": 55}, {"hour": 16, "minute": 25}, {"hour": 16, "minute": 50}, {"hour": 17, "minute": 20}, {"hour": 17, "minute": 40}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "Пл. Ленина на 6 или МСО": {
    "lat": 55.1135, "lng": 26.8402, "displayName": "Пл. Ленина на 6 или МСО",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 40}, {"hour": 7, "minute": 23}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 25}, {"hour": 8, "minute": 45}, {"hour": 10, "minute": 55}, {"hour": 11, "minute": 20}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 15}, {"hour": 12, "minute": 40}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 35}, {"hour": 14, "minute": 0}, {"hour": 14, "minute": 55}, {"hour": 15, "minute": 25}, {"hour": 16, "minute": 20}, {"hour": 16, "minute": 50}, {"hour": 17, "minute": 10}, {"hour": 17, "minute": 40}, {"hour": 18, "minute": 0}, {"hour": 18, "minute": 30}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 40}, {"hour": 7, "minute": 25}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 25}, {"hour": 8, "minute": 45}, {"hour": 9, "minute": 15}, {"hour": 10, "minute": 5}, {"hour": 10, "minute": 55}, {"hour": 11, "minute": 20}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 15}, {"hour": 12, "minute": 40}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 35}, {"hour": 14, "minute": 0}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 25}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 10}, {"hour": 8, "minute": 45}, {"hour": 9, "minute": 5}, {"hour": 9, "minute": 35}, {"hour": 10, "minute": 5}, {"hour": 10, "minute": 30}, {"hour": 10, "minute": 55}, {"hour": 11, "minute": 12}, {"hour": 11, "minute": 45}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 30}, {"hour": 12, "minute": 55}, {"hour": 13, "minute": 30}, {"hour": 13, "minute": 55}
        ]
      },
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 25}, {"hour": 6, "minute": 50}, {"hour": 7, "minute": 23}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 20}, {"hour": 8, "minute": 45}, {"hour": 9, "minute": 45}, {"hour": 11, "minute": 25}, {"hour": 12, "minute": 25}, {"hour": 13, "minute": 5}, {"hour": 13, "minute": 25}, {"hour": 14, "minute": 7}, {"hour": 14, "minute": 25}, {"hour": 15, "minute": 5}, {"hour": 15, "minute": 30}, {"hour": 16, "minute": 5}, {"hour": 16, "minute": 25}, {"hour": 17, "minute": 0}, {"hour": 17, "minute": 25}, {"hour": 17, "minute": 55}, {"hour": 18, "minute": 25}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 55}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 55}, {"hour": 10, "minute": 55}, {"hour": 11, "minute": 55}, {"hour": 12, "minute": 55}, {"hour": 13, "minute": 55}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 6, "minute": 55}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 55}, {"hour": 10, "minute": 55}, {"hour": 11, "minute": 55}, {"hour": 12, "minute": 55}, {"hour": 13, "minute": 55}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 20}, {"hour": 7, "minute": 10}, {"hour": 7, "minute": 35, "viaGymnasium": true}, {"hour": 8, "minute": 0}, {"hour": 8, "minute": 37}, {"hour": 9, "minute": 0}, {"hour": 9, "minute": 30}, {"hour": 9, "minute": 55}, {"hour": 10, "minute": 18}, {"hour": 11, "minute": 35}, {"hour": 12, "minute": 30}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 20}, {"hour": 13, "minute": 45}, {"hour": 14, "minute": 10}, {"hour": 14, "minute": 35}, {"hour": 15, "minute": 10}, {"hour": 16, "minute": 30}, {"hour": 17, "minute": 0}, {"hour": 17, "minute": 20}, {"hour": 17, "minute": 50}, {"hour": 18, "minute": 10}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "СШ №3 на Пл.": {
    "lat": 55.1204, "lng": 26.8152, "displayName": "СШ №3 на Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 1}, {"hour": 8, "minute": 36}, {"hour": 8, "minute": 56, "isShort": true}, {"hour": 11, "minute": 6}, {"hour": 11, "minute": 31}, {"hour": 11, "minute": 56}, {"hour": 12, "minute": 26}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 46}, {"hour": 14, "minute": 16}, {"hour": 15, "minute": 11}, {"hour": 15, "minute": 41}, {"hour": 16, "minute": 31}, {"hour": 17, "minute": 1}, {"hour": 17, "minute": 21}, {"hour": 17, "minute": 51}, {"hour": 18, "minute": 11}, {"hour": 18, "minute": 41}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 1}, {"hour": 8, "minute": 36}, {"hour": 8, "minute": 56}, {"hour": 9, "minute": 26}, {"hour": 10, "minute": 16}, {"hour": 11, "minute": 6}, {"hour": 11, "minute": 31}, {"hour": 11, "minute": 56}, {"hour": 12, "minute": 26}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 46}, {"hour": 14, "minute": 16, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 36}, {"hour": 8, "minute": 1}, {"hour": 8, "minute": 26}, {"hour": 8, "minute": 56}, {"hour": 9, "minute": 21}, {"hour": 9, "minute": 46}, {"hour": 10, "minute": 16}, {"hour": 10, "minute": 41}, {"hour": 11, "minute": 6}, {"hour": 11, "minute": 21}, {"hour": 11, "minute": 56}, {"hour": 12, "minute": 16}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 41}, {"hour": 14, "minute": 6, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 31}, {"hour": 7, "minute": 21}, {"hour": 7, "minute": 51, "viaGymnasium": true}, {"hour": 8, "minute": 11}, {"hour": 8, "minute": 46}, {"hour": 9, "minute": 11}, {"hour": 9, "minute": 41}, {"hour": 10, "minute": 6, "isShort": true}, {"hour": 10, "minute": 26}, {"hour": 11, "minute": 46}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 1}, {"hour": 13, "minute": 28}, {"hour": 13, "minute": 56}, {"hour": 14, "minute": 26}, {"hour": 14, "minute": 46}, {"hour": 15, "minute": 21, "isShort": true}, {"hour": 16, "minute": 41}, {"hour": 17, "minute": 11}, {"hour": 17, "minute": 31}, {"hour": 18, "minute": 1, "isShort": true}, {"hour": 18, "minute": 21, "isShort": true}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "СШ №3 с Пл.": {
    "lat": 55.1208, "lng": 26.8145, "displayName": "СШ №3 с Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 46}, {"hour": 7, "minute": 29}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 31}, {"hour": 8, "minute": 51}, {"hour": 11, "minute": 1}, {"hour": 11, "minute": 26}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 21}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 41}, {"hour": 14, "minute": 6}, {"hour": 15, "minute": 1}, {"hour": 15, "minute": 31}, {"hour": 16, "minute": 26}, {"hour": 16, "minute": 56}, {"hour": 17, "minute": 16}, {"hour": 17, "minute": 46}, {"hour": 18, "minute": 6}, {"hour": 18, "minute": 36}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 46}, {"hour": 7, "minute": 31}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 31}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 21}, {"hour": 10, "minute": 11}, {"hour": 11, "minute": 1}, {"hour": 11, "minute": 26}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 21}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 41}, {"hour": 14, "minute": 6}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 31}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 13}, {"hour": 9, "minute": 42}, {"hour": 10, "minute": 12}, {"hour": 10, "minute": 37}, {"hour": 11, "minute": 2}, {"hour": 11, "minute": 19}, {"hour": 11, "minute": 52}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 37}, {"hour": 13, "minute": 2}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 2}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 26}, {"hour": 7, "minute": 16}, {"hour": 7, "minute": 46}, {"hour": 8, "minute": 6}, {"hour": 8, "minute": 41}, {"hour": 9, "minute": 6}, {"hour": 9, "minute": 36}, {"hour": 10, "minute": 1}, {"hour": 10, "minute": 22}, {"hour": 11, "minute": 41}, {"hour": 12, "minute": 36}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 26}, {"hour": 13, "minute": 51}, {"hour": 14, "minute": 16}, {"hour": 14, "minute": 41}, {"hour": 15, "minute": 16}, {"hour": 16, "minute": 36}, {"hour": 17, "minute": 6}, {"hour": 17, "minute": 26}, {"hour": 17, "minute": 56}, {"hour": 18, "minute": 16}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "ЛЬНОЗАВОД на Пл.": {
    "lat": 55.1175, "lng": 26.8250, "displayName": "ЛЬНОЗАВОД на Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 3}, {"hour": 7, "minute": 38}, {"hour": 8, "minute": 3}, {"hour": 8, "minute": 38}, {"hour": 8, "minute": 58, "isShort": true}, {"hour": 11, "minute": 8}, {"hour": 11, "minute": 33}, {"hour": 11, "minute": 58}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 18}, {"hour": 15, "minute": 13}, {"hour": 15, "minute": 43}, {"hour": 16, "minute": 33}, {"hour": 17, "minute": 3}, {"hour": 17, "minute": 23}, {"hour": 17, "minute": 53}, {"hour": 18, "minute": 13}, {"hour": 18, "minute": 43}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 3}, {"hour": 7, "minute": 38}, {"hour": 8, "minute": 3}, {"hour": 8, "minute": 38}, {"hour": 8, "minute": 58}, {"hour": 9, "minute": 28}, {"hour": 10, "minute": 18}, {"hour": 11, "minute": 8}, {"hour": 11, "minute": 33}, {"hour": 11, "minute": 58}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 18, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 38}, {"hour": 8, "minute": 3}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 58}, {"hour": 9, "minute": 23}, {"hour": 9, "minute": 48}, {"hour": 10, "minute": 18}, {"hour": 10, "minute": 43}, {"hour": 11, "minute": 8}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 58}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 8, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 33}, {"hour": 7, "minute": 23}, {"hour": 8, "minute": 13}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 13}, {"hour": 9, "minute": 43}, {"hour": 10, "minute": 8, "isShort": true}, {"hour": 10, "minute": 28}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 3}, {"hour": 13, "minute": 30}, {"hour": 13, "minute": 58}, {"hour": 14, "minute": 28}, {"hour": 14, "minute": 48}, {"hour": 15, "minute": 22}, {"hour": 16, "minute": 43}, {"hour": 17, "minute": 13}, {"hour": 17, "minute": 33}, {"hour": 18, "minute": 3, "isShort": true}, {"hour": 18, "minute": 23, "isShort": true}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "ЛЬНОЗАВОД с Пл.": {
    "lat": 55.1181, "lng": 26.8240, "displayName": "ЛЬНОЗАВОД с Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 44}, {"hour": 7, "minute": 28}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 29}, {"hour": 8, "minute": 49}, {"hour": 10, "minute": 59}, {"hour": 11, "minute": 24}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 19}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 9}, {"hour": 13, "minute": 39}, {"hour": 14, "minute": 4}, {"hour": 14, "minute": 59}, {"hour": 15, "minute": 29}, {"hour": 16, "minute": 24}, {"hour": 16, "minute": 54}, {"hour": 17, "minute": 14}, {"hour": 17, "minute": 44}, {"hour": 18, "minute": 4}, {"hour": 18, "minute": 34}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 44}, {"hour": 7, "minute": 29}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 29}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 19}, {"hour": 10, "minute": 9}, {"hour": 10, "minute": 59}, {"hour": 11, "minute": 24}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 19}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 9}, {"hour": 13, "minute": 39}, {"hour": 14, "minute": 4}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 29}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 16}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 12}, {"hour": 9, "minute": 40}, {"hour": 10, "minute": 10}, {"hour": 10, "minute": 35}, {"hour": 11, "minute": 0}, {"hour": 11, "minute": 17}, {"hour": 11, "minute": 50}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 35}, {"hour": 13, "minute": 0}, {"hour": 13, "minute": 35}, {"hour": 14, "minute": 0}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 24}, {"hour": 7, "minute": 14}, {"hour": 7, "minute": 45}, {"hour": 8, "minute": 4}, {"hour": 8, "minute": 40}, {"hour": 9, "minute": 4}, {"hour": 9, "minute": 35}, {"hour": 9, "minute": 59}, {"hour": 10, "minute": 21}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 34}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 24}, {"hour": 13, "minute": 49}, {"hour": 14, "minute": 14}, {"hour": 14, "minute": 39}, {"hour": 15, "minute": 14}, {"hour": 16, "minute": 34}, {"hour": 17, "minute": 4}, {"hour": 17, "minute": 24}, {"hour": 17, "minute": 54}, {"hour": 18, "minute": 14}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "РЫНОК на Пл.": {
    "lat": 55.1156, "lng": 26.8295, "displayName": "РЫНОК на Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 4}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 4}, {"hour": 8, "minute": 39}, {"hour": 8, "minute": 59, "isShort": true}, {"hour": 11, "minute": 9}, {"hour": 11, "minute": 34}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 29}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 49}, {"hour": 14, "minute": 19}, {"hour": 15, "minute": 14}, {"hour": 15, "minute": 44}, {"hour": 16, "minute": 34}, {"hour": 17, "minute": 4}, {"hour": 17, "minute": 24}, {"hour": 17, "minute": 54}, {"hour": 18, "minute": 14}, {"hour": 18, "minute": 44}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 4}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 4}, {"hour": 8, "minute": 39}, {"hour": 8, "minute": 59}, {"hour": 9, "minute": 29}, {"hour": 10, "minute": 19}, {"hour": 11, "minute": 9}, {"hour": 11, "minute": 34}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 29}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 49}, {"hour": 14, "minute": 19, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 39}, {"hour": 8, "minute": 4}, {"hour": 8, "minute": 29}, {"hour": 8, "minute": 59}, {"hour": 9, "minute": 24}, {"hour": 9, "minute": 49}, {"hour": 10, "minute": 19}, {"hour": 10, "minute": 44}, {"hour": 11, "minute": 9}, {"hour": 11, "minute": 24}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 19}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 44}, {"hour": 14, "minute": 9, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 34}, {"hour": 7, "minute": 24}, {"hour": 8, "minute": 14}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 14}, {"hour": 9, "minute": 44}, {"hour": 10, "minute": 9, "isShort": true}, {"hour": 10, "minute": 29}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 4}, {"hour": 13, "minute": 31}, {"hour": 13, "minute": 59}, {"hour": 14, "minute": 29}, {"hour": 14, "minute": 49}, {"hour": 15, "minute": 23, "isShort": true}, {"hour": 16, "minute": 44}, {"hour": 17, "minute": 14}, {"hour": 17, "minute": 34}, {"hour": 18, "minute": 4, "isShort": true}, {"hour": 18, "minute": 24, "isShort": true}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "РЫНОК с Пл.": {
    "lat": 55.1159, "lng": 26.8293, "displayName": "РЫНОК с Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 43}, {"hour": 7, "minute": 27}, {"hour": 7, "minute": 48}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 48}, {"hour": 10, "minute": 58}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 8}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 3}, {"hour": 14, "minute": 58}, {"hour": 20, "minute": 28}, {"hour": 16, "minute": 23}, {"hour": 16, "minute": 53}, {"hour": 17, "minute": 13}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 3}, {"hour": 18, "minute": 33}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 43}, {"hour": 7, "minute": 28}, {"hour": 7, "minute": 48}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 18}, {"hour": 10, "minute": 8}, {"hour": 10, "minute": 58}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 8}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 3}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 28}, {"hour": 7, "minute": 48}, {"hour": 8, "minute": 14}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 9}, {"hour": 9, "minute": 39}, {"hour": 10, "minute": 9}, {"hour": 10, "minute": 34}, {"hour": 10, "minute": 59}, {"hour": 11, "minute": 16}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 4}, {"hour": 12, "minute": 34}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 34}, {"hour": 13, "minute": 59}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 23}, {"hour": 7, "minute": 13}, {"hour": 8, "minute": 3}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 3}, {"hour": 9, "minute": 33}, {"hour": 9, "minute": 58}, {"hour": 10, "minute": 20}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 33}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 23}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 13}, {"hour": 14, "minute": 38}, {"hour": 15, "minute": 13}, {"hour": 16, "minute": 33}, {"hour": 17, "minute": 3}, {"hour": 17, "minute": 23}, {"hour": 17, "minute": 53}, {"hour": 18, "minute": 13}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "Пл. КОМСОМОЛЬСКАЯ на Пл.": {
    "lat": 55.1137, "lng": 26.8340, "displayName": "Пл. КОМСОМОЛЬСКАЯ на Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 7}, {"hour": 7, "minute": 42}, {"hour": 8, "minute": 7}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 2, "isShort": true}, {"hour": 11, "minute": 12}, {"hour": 11, "minute": 37}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 32}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 22}, {"hour": 13, "minute": 52}, {"hour": 14, "minute": 22}, {"hour": 15, "minute": 17}, {"hour": 15, "minute": 47}, {"hour": 16, "minute": 37}, {"hour": 17, "minute": 7}, {"hour": 17, "minute": 27}, {"hour": 17, "minute": 57}, {"hour": 18, "minute": 17}, {"hour": 18, "minute": 47}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 7}, {"hour": 7, "minute": 42}, {"hour": 8, "minute": 7}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 2, "isShort": true}, {"hour": 9, "minute": 32}, {"hour": 10, "minute": 22}, {"hour": 11, "minute": 12}, {"hour": 11, "minute": 37}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 32}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 22}, {"hour": 13, "minute": 52}, {"hour": 14, "minute": 22, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 42}, {"hour": 8, "minute": 7}, {"hour": 8, "minute": 32}, {"hour": 9, "minute": 2, "isShort": true}, {"hour": 9, "minute": 27}, {"hour": 9, "minute": 52}, {"hour": 10, "minute": 22}, {"hour": 10, "minute": 47}, {"hour": 11, "minute": 12}, {"hour": 11, "minute": 27}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 22}, {"hour": 12, "minute": 47}, {"hour": 13, "minute": 22}, {"hour": 13, "minute": 47}, {"hour": 14, "minute": 12, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 37}, {"hour": 7, "minute": 27}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 17}, {"hour": 9, "minute": 47}, {"hour": 10, "minute": 12, "isShort": true}, {"hour": 10, "minute": 32}, {"hour": 11, "minute": 52}, {"hour": 12, "minute": 47}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 34}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 32}, {"hour": 14, "minute": 52, "isShort": true}, {"hour": 15, "minute": 24, "isShort": true}, {"hour": 16, "minute": 47}, {"hour": 17, "minute": 17}, {"hour": 17, "minute": 37}, {"hour": 18, "minute": 7, "isShort": true}, {"hour": 18, "minute": 27, "isShort": true}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "Пл. КОМСОМОЛЬСКАЯ с Пл.": {
    "lat": 55.1143, "lng": 26.8337, "displayName": "Пл. КОМСОМОЛЬСКАЯ с Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 42}, {"hour": 7, "minute": 25}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 27}, {"hour": 8, "minute": 47}, {"hour": 10, "minute": 57}, {"hour": 11, "minute": 22}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 17}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 57}, {"hour": 15, "minute": 27}, {"hour": 16, "minute": 22}, {"hour": 16, "minute": 52}, {"hour": 17, "minute": 12}, {"hour": 17, "minute": 42}, {"hour": 18, "minute": 2}, {"hour": 18, "minute": 32}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 42}, {"hour": 7, "minute": 27}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 27}, {"hour": 8, "minute": 47}, {"hour": 9, "minute": 17}, {"hour": 10, "minute": 7}, {"hour": 10, "minute": 57}, {"hour": 11, "minute": 22}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 17}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 2}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 27}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 12}, {"hour": 8, "minute": 47}, {"hour": 9, "minute": 7}, {"hour": 9, "minute": 37}, {"hour": 10, "minute": 7}, {"hour": 10, "minute": 32}, {"hour": 10, "minute": 57}, {"hour": 11, "minute": 14}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 32}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 32}, {"hour": 13, "minute": 57}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 22}, {"hour": 7, "minute": 12}, {"hour": 7, "minute": 37, "viaGymnasium": true}, {"hour": 8, "minute": 2}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 2}, {"hour": 9, "minute": 32}, {"hour": 9, "minute": 57}, {"hour": 10, "minute": 19}, {"hour": 11, "minute": 37}, {"hour": 12, "minute": 32}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 22}, {"hour": 13, "minute": 47}, {"hour": 14, "minute": 12}, {"hour": 14, "minute": 37}, {"hour": 15, "minute": 12}, {"hour": 16, "minute": 32}, {"hour": 17, "minute": 2}, {"hour": 17, "minute": 22}, {"hour": 17, "minute": 52}, {"hour": 18, "minute": 12}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "РДК на 5": {
    "lat": 55.1131, "lng": 26.8460, "displayName": "РДК на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 21}, {"hour": 7, "minute": 2}, {"hour": 7, "minute": 17}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 47}, {"hour": 11, "minute": 17}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 37}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 57}, {"hour": 14, "minute": 27}, {"hour": 15, "minute": 22}, {"hour": 15, "minute": 52}, {"hour": 16, "minute": 42}, {"hour": 17, "minute": 12}, {"hour": 17, "minute": 32}, {"hour": 18, "minute": 2}, {"hour": 18, "minute": 22}, {"hour": 18, "minute": 52}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 21}, {"hour": 7, "minute": 17}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 47}, {"hour": 9, "minute": 37}, {"hour": 10, "minute": 27}, {"hour": 11, "minute": 17}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 37}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 57}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 17}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 37}, {"hour": 9, "minute": 7}, {"hour": 9, "minute": 32}, {"hour": 9, "minute": 57}, {"hour": 10, "minute": 27}, {"hour": 10, "minute": 50}, {"hour": 11, "minute": 17}, {"hour": 11, "minute": 32}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 27}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 52}
        ]
      }
    ]
  },

    "РДК на 6": {
    "lat": 55.1134, "lng": 26.8454, "displayName": "РДК на 6",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 39}, {"hour": 7, "minute": 24}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 9, "isShort": true}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 34}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 29}, {"hour": 13, "minute": 54}, {"hour": 14, "minute": 19, "isShort": true}, {"hour": 14, "minute": 49}, {"hour": 15, "minute": 49, "isShort": true}, {"hour": 16, "minute": 14}, {"hour": 17, "minute": 4}, {"hour": 17, "minute": 34}, {"hour": 17, "minute": 54}, {"hour": 18, "minute": 24}, {"hour": 18, "minute": 49, "isShort": true}, {"hour": 19, "minute": 14, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 39}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 9}, {"hour": 9, "minute": 59, "isShort": true}, {"hour": 10, "minute": 49}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 34}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 29}, {"hour": 13, "minute": 54}, {"hour": 14, "minute": 19, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 39}, {"hour": 8, "minute": 4}, {"hour": 8, "minute": 39}, {"hour": 8, "minute": 59}, {"hour": 9, "minute": 29}, {"hour": 9, "minute": 59}, {"hour": 10, "minute": 24}, {"hour": 10, "minute": 49}, {"hour": 11, "minute": 9}, {"hour": 11, "minute": 39}, {"hour": 11, "minute": 54}, {"hour": 12, "minute": 29}, {"hour": 12, "minute": 49}, {"hour": 13, "minute": 24}, {"hour": 13, "minute": 49}, {"hour": 14, "minute": 14}
        ]
      }
    ]
  },
  "Белит на 5": {
    "lat": 55.1129, "lng": 26.8566, "displayName": "Белит на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 23}, {"hour": 7, "minute": 4}, {"hour": 7, "minute": 19}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 49}, {"hour": 11, "minute": 19}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 9}, {"hour": 13, "minute": 29}, {"hour": 13, "minute": 59}, {"hour": 14, "minute": 29}, {"hour": 15, "minute": 24}, {"hour": 15, "minute": 54}, {"hour": 16, "minute": 44}, {"hour": 17, "minute": 14}, {"hour": 17, "minute": 34}, {"hour": 18, "minute": 4}, {"hour": 18, "minute": 24}, {"hour": 18, "minute": 54}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 23}, {"hour": 7, "minute": 19}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 39}, {"hour": 10, "minute": 29}, {"hour": 11, "minute": 19}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 9}, {"hour": 13, "minute": 29}, {"hour": 13, "minute": 59}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 19}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 9}, {"hour": 9, "minute": 34}, {"hour": 9, "minute": 59}, {"hour": 10, "minute": 29}, {"hour": 10, "minute": 52}, {"hour": 11, "minute": 19}, {"hour": 11, "minute": 34}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 29}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 29}, {"hour": 13, "minute": 54}
        ]
      },
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 33}, {"hour": 7, "minute": 8}, {"hour": 7, "minute": 33}, {"hour": 8, "minute": 8}, {"hour": 8, "minute": 28}, {"hour": 9, "minute": 3}, {"hour": 9, "minute": 28}, {"hour": 12, "minute": 8}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 13}, {"hour": 13, "minute": 48, "viaStroiteley": true}, {"hour": 14, "minute": 8}, {"hour": 14, "minute": 48, "viaStroiteley": true}, {"hour": 15, "minute": 48, "viaStroiteley": true}, {"hour": 16, "minute": 8}, {"hour": 17, "minute": 8}, {"hour": 17, "minute": 38}, {"hour": 18, "minute": 8, "isShort": true}, {"hour": 18, "minute": 38, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 38}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 38, "isShort": true}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 38}, {"hour": 13, "minute": 38}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 38}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 38, "isShort": true}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 38}, {"hour": 13, "minute": 38}
        ]
      }
    ]
  },

    "Белит на 6": {
    "lat": 55.1131, "lng": 26.8543, "displayName": "Белит на 6",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 38}, {"hour": 7, "minute": 23}, {"hour": 7, "minute": 38}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 8, "isShort": true}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 8}, {"hour": 12, "minute": 33}, {"hour": 12, "minute": 58}, {"hour": 13, "minute": 28}, {"hour": 13, "minute": 53}, {"hour": 14, "minute": 18}, {"hour": 14, "minute": 48}, {"hour": 15, "minute": 43, "isShort": true}, {"hour": 16, "minute": 13}, {"hour": 17, "minute": 3}, {"hour": 17, "minute": 33}, {"hour": 17, "minute": 53}, {"hour": 18, "minute": 23}, {"hour": 18, "minute": 48, "isShort": true}, {"hour": 19, "minute": 13, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 38}, {"hour": 7, "minute": 38}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 8}, {"hour": 9, "minute": 58, "isShort": true}, {"hour": 10, "minute": 48}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 33}, {"hour": 12, "minute": 58}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 53}, {"hour": 14, "minute": 18, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 38}, {"hour": 8, "minute": 3}, {"hour": 8, "minute": 38}, {"hour": 8, "minute": 58}, {"hour": 9, "minute": 28}, {"hour": 9, "minute": 58}, {"hour": 10, "minute": 23}, {"hour": 10, "minute": 48}, {"hour": 11, "minute": 8}, {"hour": 11, "minute": 38}, {"hour": 11, "minute": 53}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 23}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 13, "isShort": true}
        ]
      }
    ]
  },
  "Школьник на 5": {
    "lat": 55.1127, "lng": 26.8623, "displayName": "Школьник на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 24}, {"hour": 7, "minute": 6}, {"hour": 7, "minute": 21}, {"hour": 7, "minute": 53}, {"hour": 8, "minute": 21}, {"hour": 8, "minute": 51}, {"hour": 11, "minute": 21}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 11}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 31}, {"hour": 13, "minute": 51}, {"hour": 14, "minute": 1}, {"hour": 14, "minute": 31}, {"hour": 15, "minute": 26}, {"hour": 15, "minute": 56}, {"hour": 16, "minute": 46}, {"hour": 17, "minute": 16}, {"hour": 17, "minute": 36}, {"hour": 18, "minute": 6}, {"hour": 18, "minute": 26}, {"hour": 18, "minute": 56}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 24}, {"hour": 7, "minute": 21}, {"hour": 7, "minute": 53}, {"hour": 8, "minute": 21}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 41}, {"hour": 10, "minute": 31}, {"hour": 11, "minute": 21}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 11}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 31}, {"hour": 14, "minute": 1}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 21}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 21}, {"hour": 8, "minute": 41}, {"hour": 9, "minute": 11}, {"hour": 9, "minute": 36}, {"hour": 10, "minute": 1}, {"hour": 10, "minute": 31}, {"hour": 10, "minute": 54}, {"hour": 11, "minute": 21}, {"hour": 11, "minute": 36}, {"hour": 12, "minute": 11}, {"hour": 12, "minute": 31}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 31}, {"hour": 13, "minute": 56}
        ]
      },
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 34}, {"hour": 7, "minute": 9}, {"hour": 7, "minute": 34}, {"hour": 8, "minute": 9}, {"hour": 8, "minute": 29}, {"hour": 9, "minute": 4}, {"hour": 9, "minute": 29}, {"hour": 12, "minute": 9}, {"hour": 12, "minute": 49}, {"hour": 13, "minute": 14}, {"hour": 13, "minute": 49, "viaStroiteley": true}, {"hour": 14, "minute": 9}, {"hour": 14, "minute": 49, "viaStroiteley": true}, {"hour": 15, "minute": 49, "viaStroiteley": true}, {"hour": 16, "minute": 9}, {"hour": 17, "minute": 9}, {"hour": 17, "minute": 39}, {"hour": 18, "minute": 9, "isShort": true}, {"hour": 18, "minute": 39, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 39}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 39, "isShort": true}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 39}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 39}, {"hour": 8, "minute": 39}, {"hour": 9, "minute": 39, "isShort": true}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 39}
        ]
      }
    ]
  },

    "Школьник на Пл.": {
    "lat": 55.1129, "lng": 26.8622, "displayName": "Школьник на Пл.",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 36}, {"hour": 7, "minute": 21}, {"hour": 7, "minute": 33}, {"hour": 8, "minute": 16}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 6, "isShort": true}, {"hour": 11, "minute": 36}, {"hour": 12, "minute": 6}, {"hour": 12, "minute": 31}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 26}, {"hour": 13, "minute": 51}, {"hour": 14, "minute": 16}, {"hour": 14, "minute": 46}, {"hour": 15, "minute": 41}, {"hour": 16, "minute": 11}, {"hour": 17, "minute": 1}, {"hour": 17, "minute": 31}, {"hour": 17, "minute": 51}, {"hour": 18, "minute": 21}, {"hour": 18, "minute": 46, "isShort": true}, {"hour": 19, "minute": 11}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 36}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 16}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 6}, {"hour": 9, "minute": 56, "isShort": true}, {"hour": 10, "minute": 46}, {"hour": 11, "minute": 36}, {"hour": 12, "minute": 6}, {"hour": 12, "minute": 31}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 25}, {"hour": 13, "minute": 51}, {"hour": 14, "minute": 16, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 36}, {"hour": 8, "minute": 1}, {"hour": 8, "minute": 36}, {"hour": 8, "minute": 56}, {"hour": 9, "minute": 26}, {"hour": 9, "minute": 56}, {"hour": 10, "minute": 21}, {"hour": 10, "minute": 46}, {"hour": 11, "minute": 6}, {"hour": 11, "minute": 36}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 26}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 21}, {"hour": 13, "minute": 46}, {"hour": 14, "minute": 11, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 59}, {"hour": 7, "minute": 24}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 18}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 39}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 39}, {"hour": 13, "minute": 59}, {"hour": 14, "minute": 39}, {"hour": 15, "minute": 39}, {"hour": 15, "minute": 59}, {"hour": 16, "minute": 59}, {"hour": 17, "minute": 29}, {"hour": 17, "minute": 59}, {"hour": 18, "minute": 29}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 29}, {"hour": 8, "minute": 29}, {"hour": 9, "minute": 29}, {"hour": 11, "minute": 29}, {"hour": 12, "minute": 29}, {"hour": 13, "minute": 29}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 29}, {"hour": 8, "minute": 29}, {"hour": 9, "minute": 29}, {"hour": 11, "minute": 29}, {"hour": 12, "minute": 29}, {"hour": 13, "minute": 29}
        ]
      }
    ]
  },
  "Детский Сад на 5": {
    "lat": 55.1125, "lng": 26.8700, "displayName": "Детский Сад на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 26}, {"hour": 7, "minute": 8}, {"hour": 7, "minute": 23}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 23}, {"hour": 8, "minute": 53}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 53}, {"hour": 12, "minute": 13}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 13}, {"hour": 13, "minute": 33}, {"hour": 13, "minute": 53}, {"hour": 14, "minute": 3}, {"hour": 14, "minute": 33}, {"hour": 15, "minute": 28}, {"hour": 15, "minute": 58}, {"hour": 16, "minute": 48}, {"hour": 17, "minute": 18}, {"hour": 17, "minute": 38}, {"hour": 18, "minute": 8}, {"hour": 18, "minute": 28}, {"hour": 18, "minute": 58}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 26}, {"hour": 7, "minute": 23}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 23}, {"hour": 8, "minute": 53}, {"hour": 9, "minute": 43}, {"hour": 10, "minute": 33}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 53}, {"hour": 12, "minute": 13}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 13}, {"hour": 13, "minute": 33}, {"hour": 14, "minute": 3}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 23}, {"hour": 7, "minute": 53}, {"hour": 8, "minute": 23}, {"hour": 8, "minute": 43}, {"hour": 9, "minute": 13}, {"hour": 9, "minute": 38}, {"hour": 10, "minute": 3}, {"hour": 10, "minute": 33}, {"hour": 10, "minute": 56}, {"hour": 11, "minute": 23}, {"hour": 11, "minute": 38}, {"hour": 12, "minute": 13}, {"hour": 12, "minute": 33}, {"hour": 12, "minute": 58}, {"hour": 13, "minute": 33}, {"hour": 13, "minute": 58}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 52}, {"hour": 7, "minute": 17}, {"hour": 7, "minute": 42}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 7}, {"hour": 9, "minute": 37}, {"hour": 10, "minute": 2}, {"hour": 10, "minute": 48}, {"hour": 12, "minute": 7}, {"hour": 12, "minute": 22}, {"hour": 13, "minute": 2}, {"hour": 13, "minute": 22}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 17}, {"hour": 14, "minute": 48}, {"hour": 15, "minute": 7}, {"hour": 16, "minute": 38}, {"hour": 17, "minute": 2}, {"hour": 17, "minute": 32}, {"hour": 17, "minute": 52}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "ДЭУ на 6": {
    "lat": 55.1126, "lng": 26.8723, "displayName": "ДЭУ на 6",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 33}, {"hour": 7, "minute": 18}, {"hour": 7, "minute": 33}, {"hour": 8, "minute": 13}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 3, "isShort": true}, {"hour": 11, "minute": 33}, {"hour": 12, "minute": 3}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 23}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 13}, {"hour": 14, "minute": 43, "isShort": true}, {"hour": 15, "minute": 38, "isShort": true}, {"hour": 16, "minute": 8}, {"hour": 16, "minute": 58}, {"hour": 17, "minute": 28}, {"hour": 17, "minute": 48}, {"hour": 18, "minute": 18}, {"hour": 18, "minute": 43, "isShort": true}, {"hour": 19, "minute": 8, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 33}, {"hour": 7, "minute": 33}, {"hour": 8, "minute": 13}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 3}, {"hour": 9, "minute": 53, "isShort": true}, {"hour": 10, "minute": 43}, {"hour": 11, "minute": 33}, {"hour": 12, "minute": 3}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 23}, {"hour": 13, "minute": 48}, {"hour": 14, "minute": 13, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 33}, {"hour": 7, "minute": 58}, {"hour": 8, "minute": 33}, {"hour": 8, "minute": 53}, {"hour": 9, "minute": 23}, {"hour": 9, "minute": 53}, {"hour": 10, "minute": 18}, {"hour": 10, "minute": 43}, {"hour": 11, "minute": 3}, {"hour": 11, "minute": 33}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 23}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 8, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 58}, {"hour": 7, "minute": 23, "viaGymnasium": true}, {"hour": 7, "minute": 48}, {"hour": 8, "minute": 23}, {"hour": 8, "minute": 43}, {"hour": 9, "minute": 18}, {"hour": 9, "minute": 43}, {"hour": 10, "minute": 8}, {"hour": 10, "minute": 58, "isShort": true}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 33}, {"hour": 13, "minute": 8}, {"hour": 13, "minute": 33}, {"hour": 13, "minute": 58}, {"hour": 14, "minute": 23}, {"hour": 14, "minute": 58}, {"hour": 15, "minute": 18, "isShort": true}, {"hour": 16, "minute": 48}, {"hour": 17, "minute": 8}, {"hour": 17, "minute": 38}, {"hour": 17, "minute": 58}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

  "Лимончик на 5": {
    "lat": 55.1140, "lng": 26.8736, "displayName": "Лимончик на 5",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 31}, {"hour": 7, "minute": 13}, {"hour": 7, "minute": 28}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 58}, {"hour": 11, "minute": 28}, {"hour": 11, "minute": 58}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 38}, {"hour": 13, "minute": 58}, {"hour": 14, "minute": 8}, {"hour": 14, "minute": 38}, {"hour": 15, "minute": 33}, {"hour": 16, "minute": 3}, {"hour": 16, "minute": 53}, {"hour": 17, "minute":23}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 13}, {"hour": 18, "minute": 33}, {"hour": 19, "minute": 3}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 31}, {"hour": 7, "minute": 28}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 58}, {"hour": 9, "minute": 48}, {"hour": 10, "minute": 38}, {"hour": 11, "minute": 28}, {"hour": 11, "minute": 58}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 8}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 28}, {"hour": 7, "minute": 58}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 18}, {"hour": 9, "minute": 43}, {"hour": 10, "minute": 8}, {"hour": 10, "minute": 38}, {"hour": 11, "minute": 1}, {"hour": 11, "minute": 28}, {"hour": 11, "minute": 43}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 38}, {"hour": 13, "minute": 3}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 3}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 57}, {"hour": 7, "minute": 22}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 22}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 12}, {"hour": 9, "minute": 42}, {"hour": 10, "minute": 7}, {"hour": 10, "minute": 53}, {"hour": 12, "minute": 12}, {"hour": 12, "minute": 27}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 53}, {"hour": 14, "minute": 22}, {"hour": 14, "minute": 53}, {"hour": 15, "minute": 12}, {"hour": 16, "minute": 43}, {"hour": 17, "minute": 7}, {"hour": 17, "minute": 37}, {"hour": 17, "minute": 57}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "Теремок на 6": {
    "lat": 55.1143, "lng": 26.8736, "displayName": "Теремок на 6",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 28}, {"hour": 7, "minute": 13}, {"hour": 7, "minute": 28}, {"hour": 8, "minute": 8}, {"hour": 8, "minute": 28}, {"hour": 9, "minute": 0, "isShort": true}, {"hour": 11, "minute": 28}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 23}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 8}, {"hour": 14, "minute": 38, "isShort": true}, {"hour": 15, "minute": 33, "isShort": true}, {"hour": 16, "minute": 3}, {"hour": 16, "minute": 53}, {"hour": 17, "minute": 23}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 13}, {"hour": 18, "minute": 38, "isShort": true}, {"hour": 19, "minute": 3, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 28}, {"hour": 7, "minute": 28}, {"hour": 8, "minute": 8}, {"hour": 8, "minute": 28}, {"hour": 9, "minute": 0}, {"hour": 9, "minute": 48, "isShort": true}, {"hour": 10, "minute": 38}, {"hour": 11, "minute": 28}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 23}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 8, "isShort": true}
        ]
      },
      {
        "numberBus": "1", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 28}, {"hour": 7, "minute": 53}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 18}, {"hour": 9, "minute": 48}, {"hour": 10, "minute": 13}, {"hour": 10, "minute": 38}, {"hour": 11, "minute": 0}, {"hour": 11, "minute": 28}, {"hour": 11, "minute": 43}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 38}, {"hour": 13, "minute": 13}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 3, "isShort": true}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 53}, {"hour": 7, "minute": 18, "viaGymnasium": true}, {"hour": 7, "minute": 43}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 13}, {"hour": 9, "minute": 38}, {"hour": 10, "minute": 3}, {"hour": 10, "minute": 53, "isShort": true}, {"hour": 12, "minute": 13}, {"hour": 12, "minute": 28}, {"hour": 13, "minute": 3}, {"hour": 13, "minute": 28}, {"hour": 13, "minute": 53}, {"hour": 14, "minute": 18}, {"hour": 14, "minute": 53}, {"hour": 15, "minute": 13, "isShort": true}, {"hour": 16, "minute": 43}, {"hour": 17, "minute": 3}, {"hour": 17, "minute": 33}, {"hour": 17, "minute": 53}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "БЕЛИТ НА Ж.Д.": {
    "lat": 55.1135, "lng": 26.8557, "displayName": "БЕЛИТ НА Ж.Д.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 7, "minute": 26}, {"hour": 8, "minute": 1}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 20}, {"hour": 12, "minute": 1}, {"hour": 12, "minute": 40}, {"hour": 13, "minute": 1}, {"hour": 13, "minute": 40}, {"hour": 14, "minute": 1}, {"hour": 14, "minute": 40}, {"hour": 15, "minute": 40}, {"hour": 16, "minute": 1}, {"hour": 17, "minute": 1}, {"hour": 17, "minute": 31}, {"hour": 18, "minute": 1}, {"hour": 18, "minute": 31}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 31}, {"hour": 8, "minute": 31}, {"hour": 9, "minute": 31}, {"hour": 11, "minute": 31}, {"hour": 12, "minute": 31}, {"hour": 13, "minute": 31}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 31}, {"hour": 8, "minute": 31}, {"hour": 9, "minute": 31}, {"hour": 11, "minute": 31}, {"hour": 12, "minute": 31}, {"hour": 13, "minute": 31}
        ]
      }
    ]
  },

    "АВТОВОКЗАЛ на ЖД": {
    "lat": 55.1188, "lng": 26.8564, "displayName": "АВТОВОКЗАЛ на ЖД",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 2}, {"hour": 7, "minute": 27}, {"hour": 8, "minute": 2}, {"hour": 8, "minute": 20}, {"hour": 8, "minute": 54}, {"hour": 9, "minute": 22}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 2}, {"hour": 13, "minute": 42}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 42}, {"hour": 15, "minute": 42}, {"hour": 16, "minute": 2}, {"hour": 17, "minute": 2}, {"hour": 17, "minute": 32}, {"hour": 18, "minute": 2}, {"hour": 18, "minute": 32}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 32}, {"hour": 8, "minute": 32}, {"hour": 9, "minute": 32}, {"hour": 11, "minute": 32}, {"hour": 12, "minute": 32}, {"hour": 13, "minute": 32}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 32}, {"hour": 8, "minute": 32}, {"hour": 9, "minute": 32}, {"hour": 11, "minute": 32}, {"hour": 12, "minute": 32}, {"hour": 13, "minute": 32}
        ]
      }
    ]
  },
  "АВТОВОКЗАЛ с ЖД": {
    "lat": 55.1189, "lng": 26.8561, "displayName": "АВТОВОКЗАЛ с ЖД",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 31}, {"hour": 7, "minute": 6}, {"hour": 7, "minute": 31}, {"hour": 8, "minute": 6}, {"hour": 8, "minute": 26}, {"hour": 9, "minute": 1, "isShort": true}, {"hour": 9, "minute": 26}, {"hour": 12, "minute": 6}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 46, "viaStroiteley": true}, {"hour": 14, "minute": 6}, {"hour": 14, "minute": 46, "viaStroiteley": true}, {"hour": 15, "minute": 46, "viaStroiteley": true}, {"hour": 16, "minute": 6}, {"hour": 17, "minute": 6}, {"hour": 17, "minute": 36}, {"hour": 18, "minute": 6, "isShort": true}, {"hour": 18, "minute": 36, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 36}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 36, "isShort": true}, {"hour": 11, "minute": 36}, {"hour": 12, "minute": 36}, {"hour": 13, "minute": 36}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 36}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 36, "isShort": true}, {"hour": 11, "minute": 36}, {"hour": 12, "minute": 36}, {"hour": 13, "minute": 36}
        ]
      }
    ]
  },

    "СШ №1 на Б": {
    "lat": 55.1099, "lng": 26.8628, "displayName": "СШ №1 на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 36}, {"hour": 7, "minute": 11}, {"hour": 7, "minute": 34}, {"hour": 8, "minute": 11}, {"hour": 8, "minute": 31}, {"hour": 9, "minute": 6, "isShort": true}, {"hour": 9, "minute": 31}, {"hour": 12, "minute": 11}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 51, "viaStroiteley": true}, {"hour": 14, "minute": 11}, {"hour": 14, "minute": 51, "viaStroiteley": true}, {"hour": 15, "minute": 51, "viaStroiteley": true}, {"hour": 16, "minute": 11}, {"hour": 17, "minute": 11}, {"hour": 17, "minute": 41}, {"hour": 18, "minute": 11}, {"hour": 18, "minute": 41, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 41}, {"hour": 8, "minute": 41}, {"hour": 9, "minute": 41, "isShort": true}, {"hour": 11, "minute": 41}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 41}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 41}, {"hour": 8, "minute": 41}, {"hour": 9, "minute": 41, "isShort": true}, {"hour": 11, "minute": 41}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 41}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 7, "minute": 26, "viaGymnasium": true}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 26}, {"hour": 8, "minute": 46}, {"hour": 9, "minute": 21}, {"hour": 9, "minute": 46}, {"hour": 10, "minute": 10}, {"hour": 11, "minute": 1, "isShort": true}, {"hour": 12, "minute": 21}, {"hour": 12, "minute": 36}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 36}, {"hour": 14, "minute": 1}, {"hour": 14, "minute": 26}, {"hour": 15, "minute": 1}, {"hour": 15, "minute": 21, "isShort": true}, {"hour": 16, "minute": 51}, {"hour": 17, "minute": 11}, {"hour": 17, "minute": 41}, {"hour": 18, "minute": 1}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "СШ №1 с Б": {
    "lat": 55.1102, "lng": 26.8631, "displayName": "СШ №1 с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 57}, {"hour": 7, "minute": 27}, {"hour": 7, "minute": 57}, {"hour": 8, "minute": 16}, {"hour": 8, "minute": 47}, {"hour": 9, "minute": 16}, {"hour": 11, "minute": 57}, {"hour": 12, "minute": 37}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 37}, {"hour": 13, "minute": 57}, {"hour": 14, "minute": 37}, {"hour": 15, "minute": 37}, {"hour": 15, "minute": 57}, {"hour": 16, "minute": 57}, {"hour": 17, "minute": 27}, {"hour": 17, "minute": 57}, {"hour": 18, "minute": 27}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 27}, {"hour": 8, "minute": 27}, {"hour": 9, "minute": 27}, {"hour": 11, "minute": 27}, {"hour": 12, "minute": 27}, {"hour": 13, "minute": 27}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 27}, {"hour": 8, "minute": 27}, {"hour": 9, "minute": 27}, {"hour": 11, "minute": 27}, {"hour": 12, "minute": 27}, {"hour": 13, "minute": 27}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 49}, {"hour": 7, "minute": 14}, {"hour": 7, "minute": 40}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 31}, {"hour": 9, "minute": 5}, {"hour": 9, "minute": 35}, {"hour": 10, "minute": 0}, {"hour": 10, "minute": 45}, {"hour": 12, "minute": 5}, {"hour": 12, "minute": 20}, {"hour": 13, "minute": 0}, {"hour": 13, "minute": 20}, {"hour": 13, "minute": 45}, {"hour": 14, "minute": 15}, {"hour": 14, "minute": 45}, {"hour": 15, "minute": 5}, {"hour": 16, "minute": 36}, {"hour": 17, "minute": 0}, {"hour": 17, "minute": 29}, {"hour": 17, "minute": 49}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "Мелиоративная на Б": {
    "lat": 55.1068, "lng": 26.8624, "displayName": "Мелиоративная на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 37}, {"hour": 7, "minute": 12}, {"hour": 7, "minute": 35}, {"hour": 8, "minute": 12}, {"hour": 8, "minute": 32}, {"hour": 9, "minute": 7, "isShort": true}, {"hour": 9, "minute": 32}, {"hour": 12, "minute": 12}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 17}, {"hour": 13, "minute": 52, "viaStroiteley": true}, {"hour": 14, "minute": 12}, {"hour": 14, "minute": 52, "viaStroiteley": true}, {"hour": 15, "minute": 52, "viaStroiteley": true}, {"hour": 16, "minute": 12}, {"hour": 17, "minute": 12}, {"hour": 17, "minute": 42}, {"hour": 18, "minute": 12}, {"hour": 18, "minute": 42, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 42}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 42, "isShort": true}, {"hour": 11, "minute": 42}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 42}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 42}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 42, "isShort": true}, {"hour": 11, "minute": 42}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 42}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 2}, {"hour": 7, "minute": 27, "viaGymnasium": true}, {"hour": 7, "minute": 52}, {"hour": 8, "minute": 27}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 22}, {"hour": 9, "minute": 47}, {"hour": 10, "minute": 11}, {"hour": 11, "minute": 2, "isShort": true}, {"hour": 12, "minute": 22}, {"hour": 12, "minute": 38}, {"hour": 13, "minute": 12}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 27}, {"hour": 15, "minute": 2}, {"hour": 15, "minute": 22, "isShort": true}, {"hour": 16, "minute": 52}, {"hour": 17, "minute": 12}, {"hour": 17, "minute": 42}, {"hour": 18, "minute": 2}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "Мелиоративная с Б": {
    "lat": 55.1070, "lng": 26.8629, "displayName": "Мелиоративная с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 56}, {"hour": 7, "minute": 26}, {"hour": 7, "minute": 56}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 46}, {"hour": 9, "minute": 15}, {"hour": 11, "minute": 56}, {"hour": 12, "minute": 36}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 36}, {"hour": 13, "minute": 56}, {"hour": 14, "minute": 36}, {"hour": 15, "minute": 36}, {"hour": 15, "minute": 56}, {"hour": 16, "minute": 56}, {"hour": 17, "minute": 26}, {"hour": 17, "minute": 56}, {"hour": 18, "minute": 26}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 26}, {"hour": 8, "minute": 26}, {"hour": 9, "minute": 26}, {"hour": 11, "minute": 26}, {"hour": 12, "minute": 26}, {"hour": 13, "minute": 26}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 26}, {"hour": 8, "minute": 26}, {"hour": 9, "minute": 26}, {"hour": 11, "minute": 26}, {"hour": 12, "minute": 26}, {"hour": 13, "minute": 26}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 48}, {"hour": 7, "minute": 13}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 13}, {"hour": 8, "minute": 29}, {"hour": 9, "minute": 3}, {"hour": 9, "minute": 33}, {"hour": 9, "minute": 58}, {"hour": 10, "minute": 43}, {"hour": 12, "minute": 3}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 13}, {"hour": 14, "minute": 43}, {"hour": 15, "minute": 3}, {"hour": 16, "minute": 34}, {"hour": 16, "minute": 59}, {"hour": 17, "minute": 28}, {"hour": 17, "minute": 48}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "ПЕСОЧНАЯ на Б": {
    "lat": 55.1068, "lng": 26.8538, "displayName": "ПЕСОЧНАЯ на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 39}, {"hour": 7, "minute": 14}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 14}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 9, "isShort": true}, {"hour": 9, "minute": 33}, {"hour": 12, "minute": 14}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 54, "viaStroiteley": true}, {"hour": 14, "minute": 14}, {"hour": 14, "minute": 54, "viaStroiteley": true}, {"hour": 15, "minute": 54, "viaStroiteley": true}, {"hour": 16, "minute": 14}, {"hour": 17, "minute": 14}, {"hour": 17, "minute": 44}, {"hour": 18, "minute": 14}, {"hour": 18, "minute": 44, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 44}, {"hour": 8, "minute": 44}, {"hour": 9, "minute": 44, "isShort": true}, {"hour": 11, "minute": 44}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 44}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 44}, {"hour": 8, "minute": 44}, {"hour": 9, "minute": 44, "isShort": true}, {"hour": 11, "minute": 44}, {"hour": 12, "minute": 44}, {"hour": 13, "minute": 44}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 3}, {"hour": 7, "minute": 28, "viaGymnasium": true}, {"hour": 7, "minute": 53}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 23}, {"hour": 9, "minute": 48}, {"hour": 10, "minute": 12}, {"hour": 11, "minute": 3, "isShort": true}, {"hour": 12, "minute": 23}, {"hour": 12, "minute": 40}, {"hour": 13, "minute": 13}, {"hour": 13, "minute": 38}, {"hour": 14, "minute": 3}, {"hour": 14, "minute": 28}, {"hour": 15, "minute": 3}, {"hour": 15, "minute": 23, "isShort": true}, {"hour": 16, "minute": 53}, {"hour": 17, "minute": 13}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 3}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "ПЕСОЧНАЯ с Б": {
    "lat": 55.1066, "lng": 26.8561, "displayName": "ПЕСОЧНАЯ с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 54}, {"hour": 7, "minute": 24}, {"hour": 7, "minute": 54}, {"hour": 8, "minute": 13}, {"hour": 8, "minute": 44}, {"hour": 9, "minute": 13}, {"hour": 11, "minute": 54}, {"hour": 12, "minute": 34}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 34}, {"hour": 13, "minute": 54}, {"hour": 14, "minute": 34}, {"hour": 15, "minute": 34}, {"hour": 15, "minute": 54}, {"hour": 16, "minute": 54}, {"hour": 17, "minute": 24}, {"hour": 17, "minute": 54}, {"hour": 18, "minute": 24}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 24}, {"hour": 8, "minute": 24}, {"hour": 9, "minute": 24}, {"hour": 11, "minute": 24}, {"hour": 12, "minute": 24}, {"hour": 13, "minute": 24}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 24}, {"hour": 8, "minute": 24}, {"hour": 9, "minute": 24}, {"hour": 11, "minute": 24}, {"hour": 12, "minute": 24}, {"hour": 13, "minute": 24}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 47}, {"hour": 7, "minute": 12}, {"hour": 7, "minute": 38}, {"hour": 8, "minute": 12}, {"hour": 8, "minute": 27}, {"hour": 9, "minute": 2}, {"hour": 9, "minute": 32}, {"hour": 9, "minute": 57}, {"hour": 10, "minute": 42}, {"hour": 12, "minute": 2}, {"hour": 12, "minute": 17}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 17}, {"hour": 13, "minute": 42}, {"hour": 14, "minute": 12}, {"hour": 14, "minute": 42}, {"hour": 15, "minute": 2}, {"hour": 16, "minute": 32}, {"hour": 16, "minute": 57}, {"hour": 17, "minute": 27}, {"hour": 17, "minute": 47}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "КЛЯРО 1 на Б": {
    "lat": 55.1070, "lng": 26.8458, "displayName": "КЛЯРО 1 на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 41}, {"hour": 7, "minute": 16}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 11, "isShort": true}, {"hour": 9, "minute": 36}, {"hour": 12, "minute": 16}, {"hour": 12, "minute": 56}, {"hour": 13, "minute": 20}, {"hour": 13, "minute": 56, "viaStroiteley": true}, {"hour": 14, "minute": 16}, {"hour": 14, "minute": 56, "viaStroiteley": true}, {"hour": 15, "minute": 56, "viaStroiteley": true}, {"hour": 16, "minute": 16}, {"hour": 17, "minute": 16}, {"hour": 17, "minute": 46}, {"hour": 18, "minute": 16}, {"hour": 18, "minute": 46, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 46}, {"hour": 8, "minute": 46}, {"hour": 9, "minute": 46, "isShort": true}, {"hour": 11, "minute": 46}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 46}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 46}, {"hour": 8, "minute": 46}, {"hour": 9, "minute": 46, "isShort": true}, {"hour": 11, "minute": 46}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 46}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 5}, {"hour": 7, "minute": 30, "viaGymnasium": true}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 30}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 25}, {"hour": 9, "minute": 50}, {"hour": 10, "minute": 13}, {"hour": 11, "minute": 5, "isShort": true}, {"hour": 12, "minute": 25}, {"hour": 12, "minute": 42}, {"hour": 13, "minute": 15}, {"hour": 13, "minute": 40}, {"hour": 14, "minute": 5}, {"hour": 14, "minute": 30}, {"hour": 15, "minute": 5}, {"hour": 15, "minute": 25, "isShort": true}, {"hour": 16, "minute": 55}, {"hour": 17, "minute": 15}, {"hour": 17, "minute": 45}, {"hour": 18, "minute": 5}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "КЛЯРО 1 с Б": {
    "lat": 55.1068, "lng": 26.8458, "displayName": "КЛЯРО 1 с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 52}, {"hour": 7, "minute": 22}, {"hour": 7, "minute": 52}, {"hour": 8, "minute": 12}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 12}, {"hour": 11, "minute": 52}, {"hour": 12, "minute": 32}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 32}, {"hour": 13, "minute": 52}, {"hour": 14, "minute": 32}, {"hour": 15, "minute": 32}, {"hour": 15, "minute": 52}, {"hour": 16, "minute": 52}, {"hour": 17, "minute": 22}, {"hour": 17, "minute": 52}, {"hour": 18, "minute": 22}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 22}, {"hour": 8, "minute": 22}, {"hour": 9, "minute": 22}, {"hour": 11, "minute": 22}, {"hour": 12, "minute": 22}, {"hour": 13, "minute": 22}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 22}, {"hour": 8, "minute": 22}, {"hour": 9, "minute": 22}, {"hour": 11, "minute": 22}, {"hour": 12, "minute": 22}, {"hour": 13, "minute": 22}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 46}, {"hour": 7, "minute": 11}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 11}, {"hour": 8, "minute": 26}, {"hour": 9, "minute": 1}, {"hour": 9, "minute": 31}, {"hour": 9, "minute": 56, "isShort": true}, {"hour": 10, "minute": 41}, {"hour": 12, "minute": 1}, {"hour": 12, "minute": 16}, {"hour": 12, "minute": 56, "isShort": true}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 41}, {"hour": 14, "minute": 11}, {"hour": 14, "minute": 41}, {"hour": 15, "minute": 1}, {"hour": 16, "minute": 31}, {"hour": 16, "minute": 56}, {"hour": 17, "minute": 26}, {"hour": 17, "minute": 46}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

   "Средняя школа №2 на Б": {
    "lat": 55.1070, "lng": 26.8501, "displayName": "Средняя школа №2 на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 38}, {"hour": 7, "minute": 13}, {"hour": 7, "minute": 36}, {"hour": 8, "minute": 12}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 8, "isShort": true}, {"hour": 9, "minute": 33}, {"hour": 12, "minute": 13}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 17}, {"hour": 13, "minute": 53, "viaStroiteley": true}, {"hour": 14, "minute": 13}, {"hour": 14, "minute": 53, "viaStroiteley": true}, {"hour": 15, "minute": 53, "viaStroiteley": true}, {"hour": 16, "minute": 13}, {"hour": 17, "minute": 13}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 13}, {"hour": 18, "minute": 43, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 43}, {"hour": 8, "minute": 43}, {"hour": 9, "minute": 43, "isShort": true}, {"hour": 11, "minute": 43}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 43}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 43}, {"hour": 8, "minute": 43}, {"hour": 9, "minute": 43, "isShort": true}, {"hour": 11, "minute": 43}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 43}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 2}, {"hour": 7, "minute": 27, "viaGymnasium": true}, {"hour": 7, "minute": 52}, {"hour": 8, "minute": 27}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 22}, {"hour": 9, "minute": 47}, {"hour": 10, "minute": 10}, {"hour": 11, "minute": 2, "isShort": true}, {"hour": 12, "minute": 22}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 12}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 27}, {"hour": 15, "minute": 2}, {"hour": 15, "minute": 22, "isShort": true}, {"hour": 16, "minute": 52}, {"hour": 17, "minute": 12}, {"hour": 17, "minute": 42}, {"hour": 18, "minute": 2}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "Средняя школа №2 с Б": {
    "lat": 55.1067, "lng": 26.8500, "displayName": "Средняя школа №2 с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 55}, {"hour": 7, "minute": 25}, {"hour": 7, "minute": 55}, {"hour": 8, "minute": 15}, {"hour": 8, "minute": 45}, {"hour": 9, "minute": 15}, {"hour": 11, "minute": 55}, {"hour": 12, "minute": 35}, {"hour": 12, "minute": 55}, {"hour": 13, "minute": 35}, {"hour": 13, "minute": 55}, {"hour": 14, "minute": 35}, {"hour": 15, "minute": 35}, {"hour": 15, "minute": 55}, {"hour": 16, "minute": 55}, {"hour": 17, "minute": 25}, {"hour": 17, "minute": 55}, {"hour": 18, "minute": 25}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 25}, {"hour": 8, "minute": 25}, {"hour": 9, "minute": 25}, {"hour": 11, "minute": 25}, {"hour": 12, "minute": 25}, {"hour": 13, "minute": 25}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 25}, {"hour": 8, "minute": 25}, {"hour": 9, "minute": 25}, {"hour": 11, "minute": 25}, {"hour": 12, "minute": 25}, {"hour": 13, "minute": 25}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 49}, {"hour": 7, "minute": 14}, {"hour": 7, "minute": 39}, {"hour": 8, "minute": 14}, {"hour": 8, "minute": 29}, {"hour": 9, "minute": 4}, {"hour": 9, "minute": 34}, {"hour": 9, "minute": 59, "isShort": true}, {"hour": 10, "minute": 44}, {"hour": 12, "minute": 4}, {"hour": 12, "minute": 19}, {"hour": 12, "minute": 59, "isShort": true}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 44}, {"hour": 14, "minute": 14}, {"hour": 14, "minute": 44}, {"hour": 15, "minute": 4}, {"hour": 16, "minute": 34}, {"hour": 16, "minute": 59}, {"hour": 17, "minute": 29}, {"hour": 17, "minute": 49}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "СЕЛЬХОЗТЕХНИКА на Б": {
    "lat": 55.1036, "lng": 26.8455, "displayName": "СЕЛЬХОЗТЕХНИКА на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 43}, {"hour": 7, "minute": 18}, {"hour": 7, "minute": 40}, {"hour": 8, "minute": 16}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 13}, {"hour": 9, "minute": 38, "isShort": true}, {"hour": 12, "minute": 18}, {"hour": 12, "minute": 58}, {"hour": 13, "minute": 21}, {"hour": 13, "minute": 58, "viaStroiteley": true}, {"hour": 14, "minute": 18}, {"hour": 14, "minute": 58, "viaStroiteley": true}, {"hour": 15, "minute": 58, "viaStroiteley": true}, {"hour": 16, "minute": 18}, {"hour": 17, "minute": 18}, {"hour": 17, "minute": 48}, {"hour": 18, "minute": 18}, {"hour": 18, "minute": 48, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 48}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 48, "isShort": true}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 48}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 48}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 48, "isShort": true}, {"hour": 11, "minute": 48}, {"hour": 12, "minute": 48}, {"hour": 13, "minute": 48}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 6}, {"hour": 7, "minute": 31, "viaGymnasium": true}, {"hour": 7, "minute": 56}, {"hour": 8, "minute": 31}, {"hour": 8, "minute": 53}, {"hour": 9, "minute": 26}, {"hour": 9, "minute": 51}, {"hour": 10, "minute": 14}, {"hour": 11, "minute": 6, "isShort": true}, {"hour": 12, "minute": 26}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 16}, {"hour": 13, "minute": 41}, {"hour": 14, "minute": 6}, {"hour": 14, "minute": 31}, {"hour": 15, "minute": 6}, {"hour": 15, "minute": 26, "isShort": true}, {"hour": 16, "minute": 56}, {"hour": 17, "minute": 16}, {"hour": 17, "minute": 46}, {"hour": 18, "minute": 6}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "СЕЛЬХОЗТЕХНИКА с Б": {
    "lat": 55.1029, "lng": 26.8452, "displayName": "СЕЛЬХОЗТЕХНИКА с Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 50}, {"hour": 7, "minute": 16}, {"hour": 7, "minute": 50}, {"hour": 8, "minute": 8}, {"hour": 8, "minute": 40}, {"hour": 9, "minute": 9}, {"hour": 11, "minute": 50}, {"hour": 12, "minute": 30}, {"hour": 12, "minute": 50}, {"hour": 13, "minute": 30}, {"hour": 13, "minute": 50}, {"hour": 14, "minute": 30}, {"hour": 15, "minute": 30}, {"hour": 15, "minute": 50}, {"hour": 16, "minute": 50}, {"hour": 17, "minute": 20}, {"hour": 17, "minute": 50}, {"hour": 18, "minute": 20}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 20}, {"hour": 8, "minute": 20}, {"hour": 9, "minute": 20}, {"hour": 11, "minute": 20}, {"hour": 12, "minute": 20}, {"hour": 13, "minute": 20}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 20}, {"hour": 8, "minute": 20}, {"hour": 9, "minute": 20}, {"hour": 11, "minute": 20}, {"hour": 12, "minute": 20}, {"hour": 13, "minute": 20}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 45}, {"hour": 7, "minute": 10}, {"hour": 7, "minute": 35}, {"hour": 8, "minute": 10}, {"hour": 8, "minute": 25}, {"hour": 9, "minute": 0}, {"hour": 9, "minute": 30}, {"hour": 9, "minute": 55}, {"hour": 10, "minute": 40}, {"hour": 12, "minute": 0}, {"hour": 12, "minute": 15}, {"hour": 12, "minute": 55}, {"hour": 13, "minute": 15}, {"hour": 13, "minute": 40}, {"hour": 14, "minute": 10}, {"hour": 14, "minute": 40}, {"hour": 15, "minute": 0}, {"hour": 16, "minute": 30}, {"hour": 16, "minute": 55}, {"hour": 17, "minute": 25}, {"hour": 17, "minute": 45}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "БОЛЬНИЦА на 5": {
    "lat": 55.1035, "lng": 26.8384, "displayName": "БОЛЬНИЦА на 5",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 48}, {"hour": 7, "minute": 13, "viaStroiteley": true}, {"hour": 7, "minute": 48, "viaStroiteley": true}, {"hour": 8, "minute": 5, "viaStroiteley": true}, {"hour": 8, "minute": 38}, {"hour": 9, "minute": 8}, {"hour": 11, "minute": 49}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 49}, {"hour": 13, "minute": 28}, {"hour": 13, "minute": 49}, {"hour": 14, "minute": 28}, {"hour": 15, "minute": 28}, {"hour": 15, "minute": 49}, {"hour": 16, "minute": 49}, {"hour": 17, "minute": 19}, {"hour": 17, "minute": 49}, {"hour": 18, "minute": 19}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 19}, {"hour": 8, "minute": 19}, {"hour": 9, "minute": 19}, {"hour": 11, "minute": 19}, {"hour": 12, "minute": 19}, {"hour": 13, "minute": 19}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 19}, {"hour": 8, "minute": 19}, {"hour": 9, "minute": 19}, {"hour": 11, "minute": 19}, {"hour": 12, "minute": 19}, {"hour": 13, "minute": 19}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 44}, {"hour": 7, "minute": 9}, {"hour": 7, "minute": 34}, {"hour": 8, "minute": 9}, {"hour": 8, "minute": 24}, {"hour": 8, "minute": 59}, {"hour": 9, "minute": 29}, {"hour": 9, "minute": 54}, {"hour": 10, "minute": 39}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 14}, {"hour": 12, "minute": 54}, {"hour": 13, "minute": 14}, {"hour": 13, "minute": 39}, {"hour": 14, "minute": 9}, {"hour": 14, "minute": 39}, {"hour": 14, "minute": 59}, {"hour": 16, "minute": 29}, {"hour": 16, "minute": 54}, {"hour": 17, "minute": 24}, {"hour": 17, "minute": 44}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "БОЛЬНИЦА на Пл.": {
    "lat": 55.1028, "lng": 26.8387, "displayName": "БОЛЬНИЦА на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 46}, {"hour": 7, "minute": 19}, {"hour": 7, "minute": 41}, {"hour": 8, "minute": 17}, {"hour": 8, "minute": 41}, {"hour": 9, "minute": 15}, {"hour": 9, "minute": 41}, {"hour": 12, "minute": 21}, {"hour": 13, "minute": 1}, {"hour": 13, "minute": 22}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 21}, {"hour": 15, "minute": 2}, {"hour": 16, "minute": 2}, {"hour": 16, "minute": 21}, {"hour": 17, "minute": 21}, {"hour": 17, "minute": 51}, {"hour": 18, "minute": 21}, {"hour": 18, "minute": 51}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 51}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 51, "isShort": true}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 51}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 51}, {"hour": 8, "minute": 51}, {"hour": 9, "minute": 51, "isShort": true}, {"hour": 11, "minute": 51}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 51}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 7}, {"hour": 7, "minute": 32, "viaGymnasium": true}, {"hour": 7, "minute": 57}, {"hour": 8, "minute": 32}, {"hour": 8, "minute": 55}, {"hour": 9, "minute": 27}, {"hour": 9, "minute": 52}, {"hour": 10, "minute": 15}, {"hour": 11, "minute": 7, "isShort": true}, {"hour": 12, "minute": 27}, {"hour": 12, "minute": 45}, {"hour": 13, "minute": 17}, {"hour": 13, "minute": 42}, {"hour": 14, "minute": 7}, {"hour": 14, "minute": 32}, {"hour": 15, "minute": 7}, {"hour": 15, "minute": 27, "isShort": true}, {"hour": 16, "minute": 57}, {"hour": 17, "minute": 17}, {"hour": 17, "minute": 47}, {"hour": 18, "minute": 7}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "АТП №16 на Б": {
    "lat": 55.1050, "lng": 26.8383, "displayName": "АТП №16 на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 52}, {"hour": 7, "minute": 12, "viaStroiteley": true}, {"hour": 7, "minute": 47, "viaStroiteley": true}, {"hour": 8, "minute": 4, "viaStroiteley": true}, {"hour": 8, "minute": 37}, {"hour": 9, "minute": 7}, {"hour": 11, "minute": 47}, {"hour": 12, "minute": 27}, {"hour": 12, "minute": 47}, {"hour": 13, "minute": 27}, {"hour": 13, "minute": 47}, {"hour": 14, "minute": 27}, {"hour": 15, "minute": 27}, {"hour": 15, "minute": 47}, {"hour": 16, "minute": 47}, {"hour": 17, "minute": 17}, {"hour": 17, "minute": 47}, {"hour": 18, "minute": 17}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 17}, {"hour": 8, "minute": 17}, {"hour": 9, "minute": 17}, {"hour": 11, "minute": 17}, {"hour": 12, "minute": 17}, {"hour": 13, "minute": 17}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 17}, {"hour": 8, "minute": 17}, {"hour": 9, "minute": 17}, {"hour": 11, "minute": 17}, {"hour": 12, "minute": 17}, {"hour": 13, "minute": 17}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 42}, {"hour": 7, "minute": 7}, {"hour": 7, "minute": 32}, {"hour": 8, "minute": 7}, {"hour": 8, "minute": 57}, {"hour": 9, "minute": 27}, {"hour": 9, "minute": 52}, {"hour": 10, "minute": 37}, {"hour": 11, "minute": 57}, {"hour": 12, "minute": 12}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 12}, {"hour": 13, "minute": 37}, {"hour": 14, "minute": 7}, {"hour": 14, "minute": 37}, {"hour": 14, "minute": 57}, {"hour": 16, "minute": 27}, {"hour": 16, "minute": 52}, {"hour": 17, "minute": 22}, {"hour": 17, "minute": 42}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "АТП №16 на Пл.": {
    "lat": 55.1052, "lng": 26.8386, "displayName": "АТП №16 на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 47}, {"hour": 7, "minute": 20}, {"hour": 7, "minute": 42}, {"hour": 8, "minute": 18}, {"hour": 8, "minute": 42}, {"hour": 9, "minute": 16}, {"hour": 9, "minute": 42}, {"hour": 12, "minute": 22}, {"hour": 13, "minute": 2}, {"hour": 13, "minute": 24}, {"hour": 14, "minute": 2}, {"hour": 14, "minute": 22}, {"hour": 15, "minute": 2}, {"hour": 16, "minute": 22}, {"hour": 17, "minute": 22}, {"hour": 17, "minute": 52}, {"hour": 18, "minute": 22}, {"hour": 18, "minute": 52}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 52}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 52, "isShort": true}, {"hour": 11, "minute": 52}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 52}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 52}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 52, "isShort": true}, {"hour": 11, "minute": 52}, {"hour": 12, "minute": 52}, {"hour": 13, "minute": 52}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 8}, {"hour": 7, "minute": 33, "viaGymnasium": true}, {"hour": 7, "minute": 58}, {"hour": 8, "minute": 33}, {"hour": 8, "minute": 56}, {"hour": 9, "minute": 28}, {"hour": 9, "minute": 53}, {"hour": 10, "minute": 16}, {"hour": 11, "minute": 8, "isShort": true}, {"hour": 12, "minute": 28}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 18}, {"hour": 13, "minute": 43}, {"hour": 14, "minute": 8}, {"hour": 14, "minute": 33}, {"hour": 15, "minute": 8}, {"hour": 15, "minute": 28, "isShort": true}, {"hour": 16, "minute": 58}, {"hour": 17, "minute": 18}, {"hour": 17, "minute": 48}, {"hour": 18, "minute": 8}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "ГОСТИНИЦА на Б": {
    "lat": 55.1074, "lng": 26.8386, "displayName": "ГОСТИНИЦА на Б",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 46}, {"hour": 7, "minute": 11, "viaStroiteley": true}, {"hour": 7, "minute": 46, "viaGymnasium": true}, {"hour": 8, "minute": 3, "viaGymnasium": true}, {"hour": 8, "minute": 36}, {"hour": 9, "minute": 6}, {"hour": 11, "minute": 46}, {"hour": 12, "minute": 26}, {"hour": 12, "minute": 46}, {"hour": 13, "minute": 26}, {"hour": 13, "minute": 46}, {"hour": 14, "minute": 26}, {"hour": 15, "minute": 26}, {"hour": 15, "minute": 46}, {"hour": 16, "minute": 46}, {"hour": 17, "minute": 16}, {"hour": 17, "minute": 46}, {"hour": 18, "minute": 16}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 16}, {"hour": 8, "minute": 16}, {"hour": 9, "minute": 16}, {"hour": 11, "minute": 16}, {"hour": 12, "minute": 16}, {"hour": 13, "minute": 16}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 16}, {"hour": 8, "minute": 16}, {"hour": 9, "minute": 16}, {"hour": 11, "minute": 16}, {"hour": 12, "minute": 16}, {"hour": 13, "minute": 16}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 41}, {"hour": 7, "minute": 6}, {"hour": 7, "minute": 31}, {"hour": 8, "minute": 6}, {"hour": 8, "minute": 21}, {"hour": 8, "minute": 56}, {"hour": 9, "minute": 26}, {"hour": 9, "minute": 51}, {"hour": 10, "minute": 36}, {"hour": 11, "minute": 56}, {"hour": 12, "minute": 11}, {"hour": 12, "minute": 51}, {"hour": 13, "minute": 11}, {"hour": 13, "minute": 36}, {"hour": 14, "minute": 6}, {"hour": 14, "minute": 36}, {"hour": 14, "minute": 56}, {"hour": 16, "minute": 26}, {"hour": 16, "minute": 51}, {"hour": 17, "minute": 21}, {"hour": 17, "minute": 41}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },
  "СУД на Пл.": {
    "lat": 55.1076, "lng": 26.8389, "displayName": "СУД на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 48}, {"hour": 7, "minute": 21}, {"hour": 7, "minute": 43}, {"hour": 8, "minute": 19}, {"hour": 8, "minute": 43}, {"hour": 9, "minute": 18}, {"hour": 9, "minute": 43}, {"hour": 12, "minute": 23}, {"hour": 13, "minute": 4}, {"hour": 13, "minute": 23}, {"hour": 14, "minute": 4}, {"hour": 14, "minute": 23}, {"hour": 15, "minute": 4}, {"hour": 16, "minute": 4}, {"hour": 16, "minute": 23}, {"hour": 17, "minute": 23}, {"hour": 17, "minute": 53}, {"hour": 18, "minute": 23}, {"hour": 18, "minute": 53}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 53}, {"hour": 8, "minute": 53}, {"hour": 9, "minute": 53, "isShort": true}, {"hour": 11, "minute": 53}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 53}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 53}, {"hour": 8, "minute": 53}, {"hour": 9, "minute": 53, "isShort": true}, {"hour": 11, "minute": 53}, {"hour": 12, "minute": 53}, {"hour": 13, "minute": 53}
        ]
      },
      {
        "numberBus": "3", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 9}, {"hour": 7, "minute": 34, "viaGymnasium": true}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 34}, {"hour": 8, "minute": 57}, {"hour": 9, "minute": 29}, {"hour": 9, "minute": 54}, {"hour": 10, "minute": 17}, {"hour": 11, "minute": 9, "isShort": true}, {"hour": 12, "minute": 29}, {"hour": 12, "minute": 47}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 44}, {"hour": 14, "minute": 9}, {"hour": 14, "minute": 34}, {"hour": 15, "minute": 9}, {"hour": 15, "minute": 29, "isShort": true}, {"hour": 16, "minute": 59}, {"hour": 17, "minute": 19}, {"hour": 17, "minute": 49}, {"hour": 18, "minute": 9}
        ]
      },
      { "numberBus": "3", "dayType": "Вс", "timeHourMinute": [] }
    ]
  },

    "ЛЕНИНСКАЯ 1 с Пл.": {
    "lat": 55.1186, "lng": 26.8385, "displayName": "ЛЕНИНСКАЯ 1 с Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 27}, {"hour": 6, "minute": 52}, {"hour": 7, "minute": 25}, {"hour": 7, "minute": 47}, {"hour": 8, "minute": 22}, {"hour": 8, "minute": 47}, {"hour": 9, "minute": 47}, {"hour": 11, "minute": 27}, {"hour": 12, "minute": 27}, {"hour": 13, "minute": 7}, {"hour": 13, "minute": 27}, {"hour": 14, "minute": 9}, {"hour": 14, "minute": 27}, {"hour": 15, "minute": 7}, {"hour": 15, "minute": 31}, {"hour": 16, "minute": 7}, {"hour": 16, "minute": 27}, {"hour": 17, "minute": 7}, {"hour": 17, "minute": 27}, {"hour": 17, "minute": 57}, {"hour": 18, "minute": 27}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 57}, {"hour": 7, "minute": 57}, {"hour": 8, "minute": 57}, {"hour": 10, "minute": 57}, {"hour": 11, "minute": 57}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 57}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 6, "minute": 57}, {"hour": 7, "minute": 57}, {"hour": 8, "minute": 57}, {"hour": 10, "minute": 57}, {"hour": 11, "minute": 57}, {"hour": 12, "minute": 57}, {"hour": 13, "minute": 57}
        ]
      }
    ]
  },
  "ЛЕНИНСКАЯ 1 на Пл.": {
    "lat": 55.1193, "lng": 26.8375, "displayName": "ЛЕНИНСКАЯ 1 на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 43}, {"hour": 7, "minute": 8, "viaStroiteley": true}, {"hour": 7, "minute": 43, "viaStroiteley": true}, {"hour": 8, "minute": 0, "viaStroiteley": true}, {"hour": 8, "minute": 35}, {"hour": 9, "minute": 3}, {"hour": 9, "minute": 59, "isShort": true}, {"hour": 11, "minute": 43}, {"hour": 12, "minute": 43}, {"hour": 13, "minute": 23}, {"hour": 13, "minute": 43, "isShort": true}, {"hour": 14, "minute": 23}, {"hour": 14, "minute": 43, "isShort": true}, {"hour": 15, "minute": 23}, {"hour": 15, "minute": 43, "isShort": true}, {"hour": 16, "minute": 19, "isShort": true}, {"hour": 16, "minute": 43}, {"hour": 17, "minute": 13}, {"hour": 17, "minute": 43}, {"hour": 18, "minute": 13}, {"hour": 18, "minute": 39, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 13}, {"hour": 8, "minute": 13}, {"hour": 9, "minute": 13}, {"hour": 11, "minute": 13}, {"hour": 12, "minute": 13}, {"hour": 13, "minute": 13}, {"hour": 14, "minute": 13, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 13}, {"hour": 8, "minute": 13}, {"hour": 9, "minute": 13, "isShort": true}, {"hour": 11, "minute": 13}, {"hour": 12, "minute": 13}, {"hour": 13, "minute": 13}, {"hour": 14, "minute": 13, "isShort": true}
        ]
      }
    ]
  },

    "ЛЕНИНСКАЯ 2 на Пл.": {
    "lat": 55.1228, "lng": 26.8334, "displayName": "ЛЕНИНСКАЯ 2 на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 41}, {"hour": 7, "minute": 6, "viaStroiteley": true}, {"hour": 7, "minute": 41, "viaStroiteley": true}, {"hour": 7, "minute": 58, "viaStroiteley": true}, {"hour": 8, "minute": 33}, {"hour": 9, "minute": 1}, {"hour": 9, "minute": 58, "isShort": true}, {"hour": 11, "minute": 41}, {"hour": 12, "minute": 41}, {"hour": 13, "minute": 21}, {"hour": 13, "minute": 41, "isShort": true}, {"hour": 14, "minute": 21}, {"hour": 14, "minute": 41, "isShort": true}, {"hour": 15, "minute": 21}, {"hour": 15, "minute": 41, "isShort": true}, {"hour": 16, "minute": 18, "isShort": true}, {"hour": 16, "minute": 41}, {"hour": 17, "minute": 11}, {"hour": 17, "minute": 41}, {"hour": 18, "minute": 11}, {"hour": 18, "minute": 38, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 11}, {"hour": 8, "minute": 11}, {"hour": 9, "minute": 11}, {"hour": 11, "minute": 11}, {"hour": 12, "minute": 11}, {"hour": 13, "minute": 11}, {"hour": 14, "minute": 11, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 11}, {"hour": 8, "minute": 11}, {"hour": 9, "minute": 11, "isShort": true}, {"hour": 11, "minute": 11}, {"hour": 12, "minute": 11}, {"hour": 13, "minute": 11}, {"hour": 14, "minute": 11, "isShort": true}
        ]
      }
    ]
  },
  "ЛЕНИНСКАЯ 2 с Пл.": {
    "lat": 55.1217, "lng": 26.8352, "displayName": "ЛЕНИНСКАЯ 2 с Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 28}, {"hour": 6, "minute": 53}, {"hour": 7, "minute": 26}, {"hour": 7, "minute": 48}, {"hour": 8, "minute": 23}, {"hour": 8, "minute": 48}, {"hour": 9, "minute": 48}, {"hour": 11, "minute": 28}, {"hour": 12, "minute": 28}, {"hour": 13, "minute": 8}, {"hour": 13, "minute": 28}, {"hour": 14, "minute": 10}, {"hour": 14, "minute": 28}, {"hour": 15, "minute": 8}, {"hour": 15, "minute": 32}, {"hour": 16, "minute": 8}, {"hour": 16, "minute": 28}, {"hour": 17, "minute": 2}, {"hour": 17, "minute": 28}, {"hour": 17, "minute": 58}, {"hour": 18, "minute": 28}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 6, "minute": 59}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 59}, {"hour": 10, "minute": 59}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 59}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 6, "minute": 59}, {"hour": 7, "minute": 59}, {"hour": 8, "minute": 59}, {"hour": 10, "minute": 59}, {"hour": 11, "minute": 59}, {"hour": 12, "minute": 59}, {"hour": 13, "minute": 59}
        ]
      }
    ]
  },

    "ПЕРЕЕЗД с Пл.": {
    "lat": 55.1252, "lng": 26.8301, "displayName": "ПЕРЕЕЗД с Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 30}, {"hour": 6, "minute": 54}, {"hour": 7, "minute": 27}, {"hour": 7, "minute": 49}, {"hour": 8, "minute": 24}, {"hour": 8, "minute": 49}, {"hour": 9, "minute": 49}, {"hour": 11, "minute": 30}, {"hour": 12, "minute": 30}, {"hour": 13, "minute": 9}, {"hour": 13, "minute": 30}, {"hour": 14, "minute": 11}, {"hour": 14, "minute": 30}, {"hour": 15, "minute": 9}, {"hour": 15, "minute": 33}, {"hour": 16, "minute": 9}, {"hour": 16, "minute": 30}, {"hour": 17, "minute": 4}, {"hour": 17, "minute": 30}, {"hour": 17, "minute": 59}, {"hour": 18, "minute": 29}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 8, "minute": 1}, {"hour": 9, "minute": 1}, {"hour": 11, "minute": 1}, {"hour": 12, "minute": 1}, {"hour": 13, "minute": 1}, {"hour": 14, "minute": 1}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 1}, {"hour": 8, "minute": 1}, {"hour": 9, "minute": 1}, {"hour": 11, "minute": 1}, {"hour": 12, "minute": 1}, {"hour": 13, "minute": 1}, {"hour": 14, "minute": 1}
        ]
      }
    ]
  },
  "ПЕРЕЕЗД на Пл.": {
    "lat": 55.1256, "lng": 26.8296, "displayName": "ПЕРЕЕЗД на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 39}, {"hour": 7, "minute": 4, "viaStroiteley": true}, {"hour": 7, "minute": 39, "viaStroiteley": true}, {"hour": 7, "minute": 56, "viaStroiteley": true}, {"hour": 8, "minute": 28}, {"hour": 8, "minute": 59}, {"hour": 9, "minute": 57, "isShort": true}, {"hour": 11, "minute": 39}, {"hour": 12, "minute": 39}, {"hour": 13, "minute": 19}, {"hour": 13, "minute": 39, "isShort": true}, {"hour": 14, "minute": 19}, {"hour": 14, "minute": 39, "isShort": true}, {"hour": 15, "minute": 19}, {"hour": 15, "minute": 39, "isShort": true}, {"hour": 16, "minute": 17, "isShort": true}, {"hour": 16, "minute": 39}, {"hour": 17, "minute": 9}, {"hour": 17, "minute": 39}, {"hour": 18, "minute": 9}, {"hour": 18, "minute": 37, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 9}, {"hour": 8, "minute": 9}, {"hour": 9, "minute": 9}, {"hour": 11, "minute": 9}, {"hour": 12, "minute": 9}, {"hour": 13, "minute": 9}, {"hour": 14, "minute": 9, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 9}, {"hour": 8, "minute": 9}, {"hour": 9, "minute": 9, "isShort": true}, {"hour": 11, "minute": 9}, {"hour": 12, "minute": 9}, {"hour": 13, "minute": 9}, {"hour": 14, "minute": 9, "isShort": true}
        ]
      }
    ]
  },

    "ДРСУ с Пл.": {
    "lat": 55.1295, "lng": 26.8271, "displayName": "ДРСУ с Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 32}, {"hour": 6, "minute": 56}, {"hour": 7, "minute": 29}, {"hour": 7, "minute": 51}, {"hour": 8, "minute": 26}, {"hour": 8, "minute": 52}, {"hour": 9, "minute": 52}, {"hour": 11, "minute": 33}, {"hour": 12, "minute": 33}, {"hour": 13, "minute": 12}, {"hour": 13, "minute": 33}, {"hour": 14, "minute": 12}, {"hour": 15, "minute": 12}, {"hour": 15, "minute": 34}, {"hour": 16, "minute": 12}, {"hour": 16, "minute": 33}, {"hour": 17, "minute": 3}, {"hour": 17, "minute": 33}, {"hour": 17, "minute": 59}, {"hour": 18, "minute": 2}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 3}, {"hour": 8, "minute": 3}, {"hour": 9, "minute": 3}, {"hour": 11, "minute": 3}, {"hour": 12, "minute": 3}, {"hour": 13, "minute": 3}, {"hour": 14, "minute": 3}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 3}, {"hour": 8, "minute": 3}, {"hour": 9, "minute": 3}, {"hour": 11, "minute": 3}, {"hour": 12, "minute": 3}, {"hour": 13, "minute": 3}, {"hour": 14, "minute": 3}
        ]
      }
    ]
  },
  "ДРСУ на Пл.": {
    "lat": 55.1289, "lng": 26.8272, "displayName": "ДРСУ на Пл.",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 37}, {"hour": 7, "minute": 2, "viaStroiteley": true}, {"hour": 7, "minute": 37, "viaStroiteley": true}, {"hour": 7, "minute": 54, "viaStroiteley": true}, {"hour": 8, "minute": 29}, {"hour": 8, "minute": 57}, {"hour": 9, "minute": 56, "isShort": true}, {"hour": 11, "minute": 37}, {"hour": 12, "minute": 37}, {"hour": 13, "minute": 17}, {"hour": 13, "minute": 37, "isShort": true}, {"hour": 14, "minute": 17}, {"hour": 14, "minute": 37, "isShort": true}, {"hour": 15, "minute": 17}, {"hour": 15, "minute": 37, "isShort": true}, {"hour": 16, "minute": 16, "isShort": true}, {"hour": 16, "minute": 37}, {"hour": 17, "minute": 7}, {"hour": 17, "minute": 37}, {"hour": 18, "minute": 7}, {"hour": 18, "minute": 36, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Сб",
        "timeHourMinute": [
          {"hour": 7, "minute": 7}, {"hour": 8, "minute": 7}, {"hour": 9, "minute": 7}, {"hour": 11, "minute": 7}, {"hour": 12, "minute": 7}, {"hour": 13, "minute": 7}, {"hour": 14, "minute": 7, "isShort": true}
        ]
      },
      {
        "numberBus": "2", "dayType": "Вс",
        "timeHourMinute": [
          {"hour": 7, "minute": 7}, {"hour": 8, "minute": 7}, {"hour": 9, "minute": 7, "isShort": true}, {"hour": 11, "minute": 7}, {"hour": 12, "minute": 7}, {"hour": 13, "minute": 7}, {"hour": 14, "minute": 7, "isShort": true}
        ]
      }
    ]
  },

    "ПМЦ": {
    "lat": 55.1216, "lng": 26.7928, "displayName": "ПМЦ",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 6, "minute": 50}, {"hour": 7, "minute": 55}, {"hour": 15, "minute": 5}, {"hour": 15, "minute": 35}
        ]
      },
      {
        "numberBus": "1", "dayType": "Сб-Вс",
        "timeHourMinute": [
          {"hour": 6, "minute": 50, "onDemand": true}
        ]
      }
    ]
  },
  "Строителей": {
    "lat": 55.0961, "lng": 26.8387, "displayName": "Строителей",
    "routes": [
      {
        "numberBus": "2", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 15}, {"hour": 7, "minute": 50}, {"hour": 8, "minute": 7}, {"hour": 14, "minute": 0}, {"hour": 15, "minute": 0}, {"hour": 16, "minute": 0}
        ]
      }
    ]
  },

    "ул. Зеленая": {
    "lat": 55.1167, "lng": 26.8080, "displayName": "ул. Зеленая",
    "routes": [
      {
        "numberBus": "1", "dayType": "Пн-Пт",
        "timeHourMinute": [
          {"hour": 7, "minute": 32}
        ]
      }
    ]
  }

};

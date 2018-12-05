'use strict';

(function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var IMAGE_COUNT = 8;
  var ROOMS_COUNT_MIN = 1;
  var ROOMS_COUNT_MAX = 5;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  var GUESTS_COUNT_MIN = 0;
  var GUESTS_COUNT_MAX = 3;
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['bungalo', 'house', 'palace', 'flat'];

  var ADDRESS_Y_MIN = 130;
  var ADDRESS_Y_MAX = 630;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  var getRandomBoolean = function () {
    return Math.random() >= 0.5;
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  window.mockData = {
    getCards: function (count) {
      var cards = [];
      for (var i = 0; i < count; i++) {
        var mapElement = document.querySelector('.map');
        var mapWidth = mapElement.offsetWidth;
        var locationX = getRandomInt(0, mapWidth);
        var locationY = getRandomInt(ADDRESS_Y_MIN, ADDRESS_Y_MAX);

        cards.push({
          author: {
            avatar: 'img/avatars/user0' + (i % IMAGE_COUNT + 1) + '.png'
          },
          offer: {
            title: TITLES[i % TITLES.length],
            address: locationX + ', ' + locationY,
            price: getRandomInt(PRICE_MIN, PRICE_MAX),
            type: TYPES[getRandomInt(0, TYPES.length - 1)],
            rooms: getRandomInt(ROOMS_COUNT_MIN, ROOMS_COUNT_MAX),
            guests: getRandomInt(GUESTS_COUNT_MIN, GUESTS_COUNT_MAX),
            checkin: CHECKIN_TIMES[getRandomInt(0, CHECKIN_TIMES.length - 1)],
            checkout: CHECKOUT_TIMES[getRandomInt(0, CHECKOUT_TIMES.length - 1)],
            features: FEATURES.filter(getRandomBoolean),
            description: '',
            photos: PHOTOS.slice().sort(compareRandom)
          },
          location: {
            x: locationX,
            y: locationY
          }
        });
      }
      return cards;
    }
  };

})();

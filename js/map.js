'use strict';

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var GUESTS_COUNT_MIN = 0;
var GUESTS_COUNT_MAX = 3;

var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

var CARD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var CardType = {
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  flat: 'Квартира'
};

var mapElement = document.querySelector('.map');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomBoolean = function () {
  return Math.random() - 0.5;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var generateMockCards = function (count) {
  var MOCK_CARD_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var MOCK_CARD_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MOCK_IMAGE_COUNT = 8;

  var MOCK_ROOMS_COUNT_MIN = 1;
  var MOCK_ROOMS_COUNT_MAX = 5;

  var MOCK_PRICE_MIN = 1000;
  var MOCK_PRICE_MAX = 1000000;

  var cards = [];
  for (var i = 0; i < count; i++) {
    var mapWidth = mapElement.offsetWidth;
    var locationX = getRandomInt(0, mapWidth);
    var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var cardTypes = Object.keys(CardType);

    cards.push({
      author: {
        avatar: 'img/avatars/user0' + (i % MOCK_IMAGE_COUNT + 1) + '.png'
      },
      offer: {
        title: MOCK_CARD_TITLES[i % MOCK_CARD_TITLES.length],
        address: locationX + ', ' + locationY,
        price: getRandomInt(MOCK_PRICE_MIN, MOCK_PRICE_MAX),
        type: cardTypes[getRandomInt(0, cardTypes.length - 1)],
        rooms: getRandomInt(MOCK_ROOMS_COUNT_MIN, MOCK_ROOMS_COUNT_MAX),
        guests: getRandomInt(GUESTS_COUNT_MIN, GUESTS_COUNT_MAX),
        checkin: CHECKIN_TIMES[getRandomInt(0, CHECKIN_TIMES.length - 1)],
        checkout: CHECKOUT_TIMES[getRandomInt(0, CHECKOUT_TIMES.length - 1)],
        features: CARD_FEATURES.filter(getRandomBoolean),
        description: '',
        photos: MOCK_CARD_PHOTOS.slice().sort(compareRandom)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return cards;
};

var createMapPin = function (card) {
  var pinTemplateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinElement = pinTemplateElement.cloneNode(true);
  pinElement.style = 'left: ' + card.location.x + 'px; top: ' + card.location.y + 'px;';
  var pinImageElement = pinElement.querySelector('img');
  pinImageElement.src = card.author.avatar;
  pinImageElement.alt = card.title;
  return pinElement;
};

var renderMapPins = function (cards) {
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createMapPin(cards[i]));
  }
  mapPinsElement.appendChild(fragment);
};

var renderMapCard = function (card) {
  var i;
  var fragment;

  var mapCardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapCardElement = mapCardTemplateElement.cloneNode(true);

  var titleElement = mapCardElement.querySelector('.popup__title');
  titleElement.textContent = card.offer.title;

  var addressElement = mapCardElement.querySelector('.popup__text--address');
  addressElement.textContent = card.offer.address;

  var priceElement = mapCardElement.querySelector('.popup__text--price');
  priceElement.textContent = card.offer.price + '₽/ночь';

  var typeElement = mapCardElement.querySelector('.popup__type');
  typeElement.textContent = CardType[card.offer.type];

  var capacityElement = mapCardElement.querySelector('.popup__text--capacity');
  capacityElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

  var timeElement = mapCardElement.querySelector('.popup__text--time');
  timeElement.ElementtextContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var featuresElement = mapCardElement.querySelector('.popup__features');
  while (featuresElement.firstChild) {
    featuresElement.removeChild(featuresElement.firstChild);
  }
  fragment = document.createDocumentFragment();
  for (i = 0; i < card.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + card.offer.features[i]);
    fragment.appendChild(featureElement);
  }
  featuresElement.appendChild(fragment);

  var descriptionElement = mapCardElement.querySelector('.popup__description');
  descriptionElement.textContent = card.offer.description;

  var photosElement = mapCardElement.querySelector('.popup__photos');
  var photosImgElement = photosElement.querySelector('img');
  while (photosElement.firstChild) {
    photosElement.removeChild(photosElement.firstChild);
  }
  fragment = document.createDocumentFragment();
  for (i = 0; i < card.offer.photos.length; i++) {
    var photoImgElement = photosImgElement.cloneNode();
    photoImgElement.src = card.offer.photos[i];
    fragment.appendChild(photoImgElement);
  }
  photosElement.appendChild(fragment);

  var avatarElement = mapCardElement.querySelector('.popup__avatar');
  avatarElement.src = card.author.avatar;

  var filtersContainerElement = document.querySelector('.map__filters-container');
  mapElement.insertBefore(mapCardElement, filtersContainerElement);
};

var showMockCards = function () {
  var cards = generateMockCards(8);
  mapElement.classList.remove('map--faded');
  renderMapPins(cards);
  renderMapCard(cards[0]);
};

showMockCards();

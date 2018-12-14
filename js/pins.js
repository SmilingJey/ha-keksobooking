'use strict';

(function () {
  var MAX_PIN_ON_MAP = 5;

  var loadedCards;
  var activePin;
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin')
                                   .content
                                   .querySelector('.map__pin');

  var createPin = function (card) {
    var pinElement = pinTemplateElement.cloneNode(true);
    pinElement.style = 'left: ' + card.location.x + 'px; top: ' + card.location.y + 'px;';
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = card.author.avatar;
    pinImageElement.alt = card.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.show(card);
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      activePin = pinElement;
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var removePins = function () {
    var pins = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      mapPinsElement.removeChild(pins[i]);
    }
    window.card.close();
  };

  var renderPins = function (cards) {
    removePins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(createPin(cards[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var onLoadPins = function (data) {
    loadedCards = data;
    window.pins.show();
    window.filter.setState(true);
  };

  var onLoadPinsError = function () {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    var errorTextElement = errorMessageElement.querySelector('.error__message');
    errorTextElement.textContent = 'Ошибка загрузки списка объявлений';
    var errorButton = errorMessageElement.querySelector('.error__button');
    errorButton.addEventListener('click', window.pins.loadPins);
    window.util.showMessage(errorMessageElement);
  };

  var loadPins = function () {
    window.backend.loadCards(onLoadPins, onLoadPinsError);
  };

  window.pins = {
    setState: function (active) {
      if (active) {
        window.pins.show();
        mapElement.classList.remove('map--faded');
      } else {
        mapElement.classList.add('map--faded');
        removePins();
        window.filter.setState(false);
        loadedCards = null;
      }
    },

    show: function () {
      if (!loadedCards) {
        loadPins();
      } else {
        renderPins(window.filter.filterCards(loadedCards, MAX_PIN_ON_MAP));
      }
    }
  };

})();

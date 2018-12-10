'use strict';

(function () {
  var loadedCards;
  var mapPinsElement = document.querySelector('.map__pins');

  var pinActive;

  var createPin = function (template, card) {
    var pinElement = template.cloneNode(true);
    pinElement.style = 'left: ' + card.location.x + 'px; top: ' + card.location.y + 'px;';
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = card.author.avatar;
    pinImageElement.alt = card.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.showCard(card);
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
      pinElement.classList.add('map__pin--active');
      pinActive = pinElement;
    });

    return pinElement;
  };

  var showPins = function (cards) {
    var pinTemplateElement = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].offer) {
        fragment.appendChild(createPin(pinTemplateElement, cards[i]));
      }
    }
    mapPinsElement.appendChild(fragment);
  };

  var onLoadPins = function (data) {
    loadedCards = data;
    showPins(loadedCards);
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

  window.pins = {

    loadPins: function () {
      if (!loadedCards) {
        window.backend.loadCards(onLoadPins, onLoadPinsError);
      }
    },

    removePins: function () {
      var pins = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        mapPinsElement.removeChild(pins[i]);
      }

      loadedCards = null;
    }
  };

})();

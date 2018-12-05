'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var createPin = function (template, card) {
    var pinElement = template.cloneNode(true);
    pinElement.style = 'left: ' + card.location.x + 'px; top: ' + card.location.y + 'px;';
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = card.author.avatar;
    pinImageElement.alt = card.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.showCard(card);
    });

    return pinElement;
  };

  window.pins = {
    showPins: function (cards) {
      var pinTemplateElement = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < cards.length; i++) {
        fragment.appendChild(createPin(pinTemplateElement, cards[i]));
      }
      mapPinsElement.appendChild(fragment);
    },

    removePins: function () {
      var pins = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        mapPinsElement.removeChild(pins[i]);
      }
    }
  };

})();



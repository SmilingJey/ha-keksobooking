'use strict';

(function () {
  var TypeName = {
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    flat: 'Квартира'
  };

  var mapElement = document.querySelector('.map');

  var onMapCardEsc = function (evt) {
    window.util.isEscEvent(evt, window.card.closeCard);
  };

  window.card = {
    showCard: function (card) {
      var i;

      window.card.closeCard();

      var mapCardTemplateElement = document.querySelector('#card')
        .content
        .querySelector('.map__card');

      var mapCardElement = mapCardTemplateElement.cloneNode(true);

      var titleElement = mapCardElement.querySelector('.popup__title');
      delete card.offer.title;
      if (card.offer.title) {
        titleElement.textContent = card.offer.title;
      } else {
        mapCardElement.removeChild(titleElement);
      }

      var addressElement = mapCardElement.querySelector('.popup__text--address');
      delete card.offer.address;
      if (card.offer.address) {
        addressElement.textContent = card.offer.address;
      } else {
        mapCardElement.removeChild(addressElement);
      }

      var priceElement = mapCardElement.querySelector('.popup__text--price');
      if (card.offer.price !== undefined) {
        priceElement.textContent = card.offer.price + '₽/ночь';
      } else {
        mapCardElement.removeChild(priceElement);
      }

      var typeElement = mapCardElement.querySelector('.popup__type');
      if (card.offer.type && TypeName[card.offer.type]) {
        typeElement.textContent = TypeName[card.offer.type];
      } else {
        mapCardElement.removeChild(typeElement);
      }

      var capacityElement = mapCardElement.querySelector('.popup__text--capacity');
      if (card.offer.rooms !== undefined || card.offer.guests !== undefined) {
        var capacity = '';
        if (card.offer.rooms !== undefined) {

          if (card.offer.rooms.toString() === '0') {
            capacity = card.offer.rooms + ' комнат';
          } else if (card.offer.rooms.toString() === '1') {
            capacity = card.offer.rooms + ' комната';
          } else {
            capacity = card.offer.rooms + ' комнаты';
          }
        }

        if (card.offer.guests !== undefined) {
          if (card.offer.guests.toString() === '0') {
            capacity += ' не для гостей';
          } else if (card.offer.guests.toString() === '1') {
            capacity += ' для ' + card.offer.guests + ' гостя';
          } else {
            capacity += ' для ' + card.offer.guests + ' гостей';
          }
        }

        capacityElement.textContent = capacity;
      } else {
        mapCardElement.removeChild(capacityElement);
      }

      var timeElement = mapCardElement.querySelector('.popup__text--time');
      if (card.offer.checkin || card.offer.checkout) {
        var checkTime = '';
        if (card.offer.checkin && card.offer.checkout) {
          checkTime = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
        } else if (card.offer.checkin && !card.offer.checkout) {
          checkTime = 'Заезд после ' + card.offer.checkin;
        } else {
          checkTime = 'Выезд до ' + card.offer.checkout;
        }
        timeElement.textContent = checkTime;
      } else {
        mapCardElement.removeChild(timeElement);
      }

      var featuresElement = mapCardElement.querySelector('.popup__features');
      if (Array.isArray(card.offer.features) && card.offer.features.length > 0) {
        while (featuresElement.firstChild) {
          featuresElement.removeChild(featuresElement.firstChild);
        }

        var fragmentFeatures = document.createDocumentFragment();
        for (i = 0; i < card.offer.features.length; i++) {
          var featureElement = document.createElement('li');
          featureElement.classList.add('popup__feature');
          featureElement.classList.add('popup__feature--' + card.offer.features[i]);
          fragmentFeatures.appendChild(featureElement);
        }
        featuresElement.appendChild(fragmentFeatures);
      } else {
        mapCardElement.removeChild(featuresElement);
      }

      var descriptionElement = mapCardElement.querySelector('.popup__description');
      if (card.offer.description) {
        descriptionElement.textContent = card.offer.description;
      } else {
        mapCardElement.removeChild(descriptionElement);
      }

      var photosElement = mapCardElement.querySelector('.popup__photos');
      if (Array.isArray(card.offer.photos) && card.offer.photos.length > 0) {
        var photosImgElement = photosElement.querySelector('img');
        while (photosElement.firstChild) {
          photosElement.removeChild(photosElement.firstChild);
        }

        var fragmentPhotos = document.createDocumentFragment();
        for (i = 0; i < card.offer.photos.length; i++) {
          var photoImgElement = photosImgElement.cloneNode();
          photoImgElement.src = card.offer.photos[i];
          fragmentPhotos.appendChild(photoImgElement);
        }
        photosElement.appendChild(fragmentPhotos);
      } else {
        mapCardElement.removeChild(photosElement);
      }

      var avatarElement = mapCardElement.querySelector('.popup__avatar');
      if (card.author.avatar) {
        avatarElement.src = card.author.avatar;
      } else {
        mapCardElement.removeChild(avatarElement);
      }

      var filtersContainerElement = document.querySelector('.map__filters-container');
      mapElement.insertBefore(mapCardElement, filtersContainerElement);

      var closeButton = mapCardElement.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        window.card.closeCard();
      });
      document.addEventListener('keydown', onMapCardEsc);
    },

    closeCard: function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapElement.removeChild(mapCardElement);
        document.removeEventListener('keydown', onMapCardEsc);
      }
    }
  };
})();

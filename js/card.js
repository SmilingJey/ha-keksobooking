'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mapElement = document.querySelector('.map');

  var mapCardEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closeCard();
    }
  };

  var TypeName = {
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    flat: 'Квартира'
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
      titleElement.textContent = card.offer.title;

      var addressElement = mapCardElement.querySelector('.popup__text--address');
      addressElement.textContent = card.offer.address;

      var priceElement = mapCardElement.querySelector('.popup__text--price');
      priceElement.textContent = card.offer.price + '₽/ночь';

      var typeElement = mapCardElement.querySelector('.popup__type');
      typeElement.textContent = TypeName[card.offer.type];

      var capacityElement = mapCardElement.querySelector('.popup__text--capacity');
      capacityElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

      var timeElement = mapCardElement.querySelector('.popup__text--time');
      timeElement.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

      var featuresElement = mapCardElement.querySelector('.popup__features');
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

      var descriptionElement = mapCardElement.querySelector('.popup__description');
      descriptionElement.textContent = card.offer.description;

      var photosElement = mapCardElement.querySelector('.popup__photos');
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

      var avatarElement = mapCardElement.querySelector('.popup__avatar');
      avatarElement.src = card.author.avatar;

      var filtersContainerElement = document.querySelector('.map__filters-container');
      mapElement.insertBefore(mapCardElement, filtersContainerElement);

      var closeButton = mapCardElement.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        window.card.closeCard();
      });
      document.addEventListener('keydown', mapCardEscHandler);
    },

    closeCard: function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapElement.removeChild(mapCardElement);
        document.removeEventListener('keydown', mapCardEscHandler);
      }
    }
  };
})();

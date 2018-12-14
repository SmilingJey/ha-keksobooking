'use strict';

(function () {
  var TypeName = {
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    flat: 'Квартира'
  };

  var mapElement = document.querySelector('.map');
  var cardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var onMapCardEsc = function (evt) {
    window.util.isEscEvent(evt, window.card.close);
  };

  var setCardTitle = function (mapCardElement, card) {
    var titleElement = mapCardElement.querySelector('.popup__title');
    if (card.offer.title) {
      titleElement.textContent = card.offer.title;
    } else {
      mapCardElement.removeChild(titleElement);
    }
  };

  var setCardAddress = function (mapCardElement, card) {
    var addressElement = mapCardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      addressElement.textContent = card.offer.address;
    } else {
      mapCardElement.removeChild(addressElement);
    }
  };

  var setCardPrice = function (mapCardElement, card) {
    var priceElement = mapCardElement.querySelector('.popup__text--price');
    if (card.offer.price !== undefined) {
      priceElement.textContent = card.offer.price + '₽/ночь';
    } else {
      mapCardElement.removeChild(priceElement);
    }
  };

  var setCardType = function (mapCardElement, card) {
    var typeElement = mapCardElement.querySelector('.popup__type');
    if (card.offer.type && TypeName[card.offer.type]) {
      typeElement.textContent = TypeName[card.offer.type];
    } else {
      mapCardElement.removeChild(typeElement);
    }
  };

  var setCardCapacity = function (mapCardElement, card) {
    var capacityElement = mapCardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms !== undefined || card.offer.guests !== undefined) {
      var capacity = '';
      if (card.offer.rooms !== undefined) {

        if (card.offer.rooms === 0) {
          capacity = card.offer.rooms + ' комнат';
        } else if (card.offer.rooms === 1) {
          capacity = card.offer.rooms + ' комната';
        } else {
          capacity = card.offer.rooms + ' комнаты';
        }
      }

      if (card.offer.guests !== undefined) {
        if (card.offer.guests === 0) {
          capacity += ' не для гостей';
        } else if (card.offer.guests === 1) {
          capacity += ' для ' + card.offer.guests + ' гостя';
        } else {
          capacity += ' для ' + card.offer.guests + ' гостей';
        }
      }
      capacityElement.textContent = capacity;
    } else {
      mapCardElement.removeChild(capacityElement);
    }
  };

  var setCardTime = function (mapCardElement, card) {
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
  };

  var setCardFeatures = function (mapCardElement, card) {
    var featuresElement = mapCardElement.querySelector('.popup__features');
    if (Array.isArray(card.offer.features) && card.offer.features.length > 0) {
      while (featuresElement.firstChild) {
        featuresElement.removeChild(featuresElement.firstChild);
      }

      var fragmentFeatures = document.createDocumentFragment();

      card.offer.features.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + feature);
        fragmentFeatures.appendChild(featureElement);
      });
      featuresElement.appendChild(fragmentFeatures);
    } else {
      mapCardElement.removeChild(featuresElement);
    }
  };

  var setCardDescription = function (mapCardElement, card) {
    var descriptionElement = mapCardElement.querySelector('.popup__description');
    if (card.offer.description) {
      descriptionElement.textContent = card.offer.description;
    } else {
      mapCardElement.removeChild(descriptionElement);
    }
  };

  var setCardPhotos = function (mapCardElement, card) {
    var photosElement = mapCardElement.querySelector('.popup__photos');

    if (Array.isArray(card.offer.photos) && card.offer.photos.length > 0) {
      var photosImgElement = photosElement.querySelector('img');
      while (photosElement.firstChild) {
        photosElement.removeChild(photosElement.firstChild);
      }

      var fragmentPhotos = document.createDocumentFragment();
      card.offer.photos.forEach(function (photo) {
        var photoImgElement = photosImgElement.cloneNode();
        photoImgElement.src = photo;
        fragmentPhotos.appendChild(photoImgElement);
      });

      photosElement.appendChild(fragmentPhotos);
    } else {
      mapCardElement.removeChild(photosElement);
    }
  };

  var setCardAvatar = function (mapCardElement, card) {
    var avatarElement = mapCardElement.querySelector('.popup__avatar');
    if (card.author.avatar) {
      avatarElement.src = card.author.avatar;
    } else {
      mapCardElement.removeChild(avatarElement);
    }
  };

  var createCard = function (card) {
    var mapCardElement = cardTemplateElement.cloneNode(true);
    setCardTitle(mapCardElement, card);
    setCardAddress(mapCardElement, card);
    setCardPrice(mapCardElement, card);
    setCardType(mapCardElement, card);
    setCardCapacity(mapCardElement, card);
    setCardTime(mapCardElement, card);
    setCardFeatures(mapCardElement, card);
    setCardDescription(mapCardElement, card);
    setCardPhotos(mapCardElement, card);
    setCardAvatar(mapCardElement, card);
    return mapCardElement;
  };

  window.card = {
    show: function (card) {
      window.card.close();

      var mapCardElement = createCard(card);

      var filtersContainerElement = document.querySelector('.map__filters-container');
      mapElement.insertBefore(mapCardElement, filtersContainerElement);

      var closeButton = mapCardElement.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        window.card.closeCard();
      });
      document.addEventListener('keydown', onMapCardEsc);
    },

    close: function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapElement.removeChild(mapCardElement);
        document.removeEventListener('keydown', onMapCardEsc);
      }
    }
  };
})();

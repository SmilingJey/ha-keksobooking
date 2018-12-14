'use strict';

(function () {
  var PriceBound = {
    low: {
      min: 0,
      max: 10000
    },

    middle: {
      min: 10000,
      max: 50000
    },

    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterFormElement = document.querySelector('.map__filters');
  var selectElements = filterFormElement.querySelectorAll('select');
  var fieldsetElements = filterFormElement.querySelectorAll('fieldset');
  var typeElement = filterFormElement.querySelector('#housing-type');
  var priceElement = filterFormElement.querySelector('#housing-price');
  var roomsElement = filterFormElement.querySelector('#housing-rooms');
  var guestsElement = filterFormElement.querySelector('#housing-guests');
  var featuresElement = filterFormElement.querySelector('#housing-features');
  var featureCheckboxElements = featuresElement.querySelectorAll('input');

  var onFilterChange = window.debounce(function () {
    window.pins.show();
  });

  var addFilterChangeListeners = function () {
    typeElement.addEventListener('change', onFilterChange);
    priceElement.addEventListener('change', onFilterChange);
    roomsElement.addEventListener('change', onFilterChange);
    guestsElement.addEventListener('change', onFilterChange);

    for (var i = 0; i < featureCheckboxElements.length; i++) {
      featureCheckboxElements[i].addEventListener('change', onFilterChange);
    }
  };

  addFilterChangeListeners();

  var checkCard = function (card) {
    if (card.offer === undefined) {
      return false;
    }

    if (typeElement.value !== 'any' && (card.offer.type === undefined ||
      card.offer.type !== typeElement.value)) {
      return false;
    }

    if (priceElement.value !== 'any' && (card.offer.price === undefined ||
      card.offer.price < PriceBound[priceElement.value].min ||
      card.offer.price >= PriceBound[priceElement.value].max)) {
      return false;
    }

    if (roomsElement.value !== 'any' && (card.offer.rooms === undefined ||
      card.offer.rooms.toString() !== roomsElement.value)) {
      return false;
    }

    if (guestsElement.value !== 'any' && (card.offer.guests === undefined ||
       card.offer.guests.toString() !== guestsElement.value)) {
      return false;
    }

    if (!Array.isArray(card.offer.features)) {
      return false;
    }
    for (var i = 0; i < featureCheckboxElements.length; i++) {
      if (featureCheckboxElements[i].checked &&
        card.offer.features.indexOf(featureCheckboxElements[i].value) === -1) {
        return false;
      }
    }

    return true;
  };

  window.filter = {
    setState: function (active) {
      filterFormElement.reset();

      var i;
      for (i = 0; i < selectElements.length; i++) {
        selectElements[i].disabled = !active;
      }

      for (i = 0; i < fieldsetElements.length; i++) {
        fieldsetElements[i].disabled = !active;
      }
    },

    filterCards: function (data, maxCount) {
      if (!data) {
        return [];
      }

      var filderedData = data.filter(checkCard);
      if (filderedData.length > maxCount) {
        filderedData.length = maxCount;
      }
      return filderedData;
    }
  };
})();


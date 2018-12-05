'use strict';

(function () {
  var MinPriceForType = {
    bungalo: '0',
    house: '5000',
    palace: '10000',
    flat: '1000'
  };

  var adFormElement = document.querySelector('.ad-form');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  var selectTypeElement = adFormElement.querySelector('#type');
  var inputPriceElement = adFormElement.querySelector('#price');
  var selectRoomNumberElement = adFormElement.querySelector('#room_number');
  var selectCapacityElement = adFormElement.querySelector('#capacity');
  var capacityOptionElements = selectCapacityElement.querySelectorAll('option');
  var checkinElement = adFormElement.querySelector('#timein');
  var checkoutElement = adFormElement.querySelector('#timeout');
  var resetButtonElement = adFormElement.querySelector('.ad-form__reset');

  checkinElement.addEventListener('change', function () {
    checkoutElement.value = checkinElement.value;
  });

  checkoutElement.addEventListener('change', function () {
    checkinElement.value = checkoutElement.value;
  });

  var setMinPrice = function () {
    var minPrice = MinPriceForType[selectTypeElement.value];
    inputPriceElement.min = minPrice;
    inputPriceElement.placeholder = minPrice;
  };

  selectTypeElement.addEventListener('change', function () {
    setMinPrice();
  });

  var checkCapacityForRoomNumber = function (roomNumber, capacity) {
    if (roomNumber === '100') {
      if (capacity === '0') {
        return true;
      }
      return false;
    }

    if (capacity > roomNumber || capacity === '0') {
      return false;
    }
    return true;
  };

  var setAvailableCapacity = function () {
    var roomNumber = selectRoomNumberElement.value;
    for (var i = 0; i < capacityOptionElements.length; i++) {
      capacityOptionElements[i].disabled = !checkCapacityForRoomNumber(roomNumber, capacityOptionElements[i].value);
    }
    validateCapacity();
  };

  selectRoomNumberElement.addEventListener('change', function () {
    setAvailableCapacity();
  });

  var validateCapacity = function () {
    if (!checkCapacityForRoomNumber(selectRoomNumberElement.value, selectCapacityElement.value)) {
      selectCapacityElement.setCustomValidity('Данное значение не доступно для заданного количества комнат');
      return false;
    }
    selectCapacityElement.setCustomValidity('');
    return true;
  };

  selectCapacityElement.addEventListener('change', function () {
    validateCapacity();
  });

  resetButtonElement.addEventListener('click', function () {
    window.pageState.setState(false);
  });

  window.form = {
    setState: function (active) {
      if (active) {
        adFormElement.classList.remove('ad-form--disabled');
      } else {
        adFormElement.classList.add('ad-form--disabled');
      }

      for (var i = 0; i < fieldsetElements.length; i++) {
        fieldsetElements[i].disabled = !active;
      }

      setAvailableCapacity();
      validateCapacity();
      setMinPrice();
    }
  };

})();

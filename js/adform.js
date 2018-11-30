'use strict';

var MinPriceForType = {
  bungalo: '0',
  house: '5000',
  palace: '10000',
  flat: '1000'
};

var adFormElement = document.querySelector('.ad-form');
var selectTypeElement = adFormElement.querySelector('#type');
var inputPriceElement = adFormElement.querySelector('#price');
var selectRoomNumberElement = adFormElement.querySelector('#room_number');
var selectCapacityElement = adFormElement.querySelector('#capacity');
var capacityOptionElements = selectCapacityElement.querySelectorAll('option');
var checkinElement = document.querySelector('#timein');
var checkoutElement = document.querySelector('#timeout');

var setMinPrice = function () {
  var minPrice = MinPriceForType[selectTypeElement.value];
  inputPriceElement.min = minPrice;
  inputPriceElement.placeholder = minPrice;
};

selectTypeElement.addEventListener('change', function () {
  setMinPrice();
});

checkinElement.addEventListener('change', function () {
  checkoutElement.value = checkinElement.value;
});

checkoutElement.addEventListener('change', function () {
  checkinElement.value = checkoutElement.value;
});

var checkCapacityForRoom = function (roomNumber, capacity) {
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
    capacityOptionElements[i].disabled = !checkCapacityForRoom(roomNumber, capacityOptionElements[i].value);
  }
  validateCapacity();
};

selectRoomNumberElement.addEventListener('change', function () {
  setAvailableCapacity();
});

var validateCapacity = function () {
  if (!checkCapacityForRoom(selectRoomNumberElement.value, selectCapacityElement.value)) {
    selectCapacityElement.setCustomValidity('Данное значение не доступно для заданного количества комнат');
    return false;
  }

  selectCapacityElement.setCustomValidity('');
  return true;
};

selectCapacityElement.addEventListener('change', function () {
  validateCapacity();
});

setAvailableCapacity();
validateCapacity();
setMinPrice();


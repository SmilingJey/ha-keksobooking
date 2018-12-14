'use strict';

(function () {
  var PREVIEW_PHOTO_WIDTH = 70;
  var PREVIEW_PHOTO_HEIGHT = 70;

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
  var addressInputElement = document.querySelector('#address');
  var inputAvatarElement = adFormElement.querySelector('#avatar');
  var avatarImageElement = adFormElement.querySelector('.ad-form-header__preview img');
  var inputPhotoElement = adFormElement.querySelector('#images');
  var photoContainerElement = adFormElement.querySelector('.ad-form__photo-container');

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

  adFormElement.addEventListener('reset', function () {
    var inactivatePage = function () {
      window.pageState.setState(false);
    };

    setTimeout(inactivatePage, 50);
  });

  var onSubmitError = function () {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessageElement.querySelector('.error__button');
    errorButton.addEventListener('click', sendFormData);
    window.util.showMessage(errorMessageElement);
  };

  var onSubmitSuccess = function () {
    var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);
    window.util.showMessage(successMessageElement);
    adFormElement.reset();
    window.pageState.setState(false);
  };

  var sendFormData = function () {
    var data = new FormData(adFormElement);
    window.backend.saveForm(data, onSubmitSuccess, onSubmitError);
  };

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    sendFormData();
  });

  var resetAvatarImages = function () {
    avatarImageElement.src = 'img/muffin-grey.svg';
  };

  inputAvatarElement.addEventListener('change', function () {
    if (inputAvatarElement.files && inputAvatarElement.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        avatarImageElement.src = e.target.result;
      };
      reader.readAsDataURL(inputAvatarElement.files[0]);
    }
  });

  var removePhotosPreview = function () {
    var photoElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < photoElements.length; i++) {
      photoElements[i].parentNode.removeChild(photoElements[i]);
    }
  };

  var createBlankPhotoElement = function () {
    var blankPhoto = document.createElement('div');
    blankPhoto.classList.add('ad-form__photo');
    return blankPhoto;
  };

  inputPhotoElement.addEventListener('change', function () {
    removePhotosPreview();
    if (inputPhotoElement.files) {
      for (var i = 0; i < inputPhotoElement.files.length; i++) {
        if (inputPhotoElement.files[i]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var photoElement = createBlankPhotoElement();
            var imageElement = document.createElement('img');
            imageElement.src = e.target.result;
            imageElement.alt = 'выбранное фото';
            imageElement.width = PREVIEW_PHOTO_WIDTH;
            imageElement.height = PREVIEW_PHOTO_HEIGHT;
            photoElement.appendChild(imageElement);
            photoContainerElement.appendChild(photoElement);
          };
          reader.readAsDataURL(inputPhotoElement.files[i]);
        }
      }
    }
  });

  window.form = {
    setState: function (active) {
      if (active) {
        adFormElement.classList.remove('ad-form--disabled');
      } else {
        adFormElement.classList.add('ad-form--disabled');
        resetAvatarImages();
        removePhotosPreview();
        photoContainerElement.appendChild(createBlankPhotoElement());
      }

      for (var i = 0; i < fieldsetElements.length; i++) {
        fieldsetElements[i].disabled = !active;
      }

      setAvailableCapacity();
      validateCapacity();
      setMinPrice();
    },

    setAddress: function (x, y) {
      addressInputElement.value = x + ', ' + y;
    }
  };

})();

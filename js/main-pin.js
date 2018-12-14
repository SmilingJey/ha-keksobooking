'use strict';

(function () {
  var ADDRESS_Y_MIN = 130;
  var ADDRESS_Y_MAX = 630;
  var MAIN_PIN_OFFSET_Y = 22;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressInputElement = document.querySelector('#address');

  var setAddress = function () {
    var x = mapPinMainElement.offsetLeft + Math.round(mapPinMainElement.offsetWidth / 2);
    var y = mapPinMainElement.offsetTop + mapPinMainElement.offsetHeight + MAIN_PIN_OFFSET_Y;
    addressInputElement.value = x + ', ' + y;
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    if (!window.pageState.getState()) {
      window.pageState.setState(true);
    }

    var dragged = false;

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mapPinMainElement.offsetLeft - shift.x,
        y: mapPinMainElement.offsetTop - shift.y
      };

      var mapWidth = mapElement.offsetWidth - mapPinMainElement.offsetWidth;
      if (newCoords.x > mapWidth) {
        newCoords.x = mapWidth;
      } else if (newCoords.x < 0) {
        newCoords.x = 0;
      }

      var mainPinHeight = mapPinMainElement.offsetHeight;
      var maxPosition = ADDRESS_Y_MAX - mainPinHeight - MAIN_PIN_OFFSET_Y;
      var minPosition = ADDRESS_Y_MIN - mainPinHeight - MAIN_PIN_OFFSET_Y;

      if (newCoords.y > maxPosition) {
        newCoords.y = maxPosition;
      } else if (newCoords.y < minPosition) {
        newCoords.y = minPosition;
      }

      mapPinMainElement.style.top = newCoords.y + 'px';
      mapPinMainElement.style.left = newCoords.x + 'px';

      setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddress();
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMainElement.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMainElement.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    setState: function (active) {
      if (!active) {
        mapPinMainElement.style.top = '375px';
        mapPinMainElement.style.left = '570px';
        setAddress();
      }
    }
  };
})();

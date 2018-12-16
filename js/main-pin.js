'use strict';

(function () {
  var ADDRESS_Y_MIN = 130;
  var ADDRESS_Y_MAX = 630;
  var MAIN_PIN_OFFSET_Y = 22;
  var INIT_POSITION_TOP = '375px';
  var INIT_POSITION_LEFT = '570px';

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var setAddress = function () {
    var x = mapPinMainElement.offsetLeft + Math.round(mapPinMainElement.offsetWidth / 2);
    var y = mapPinMainElement.offsetTop + mapPinMainElement.offsetHeight + MAIN_PIN_OFFSET_Y;
    window.form.setAddress(x, y);
  };

  var checkActiveState = function () {
    if (!window.pageState.getState()) {
      window.pageState.setState(true);
    }
  };

  var onMove = function (coords) {
    mapPinMainElement.style.top = coords.y + 'px';
    mapPinMainElement.style.left = coords.x + 'px';
    checkActiveState();
    setAddress();
  };

  var onMoveEnd = function () {
    checkActiveState();
    setAddress();
  };

  var getMoveConstraints = function () {
    return {
      left: 0,
      right: mapElement.offsetWidth - mapPinMainElement.offsetWidth,
      top: ADDRESS_Y_MIN - mapPinMainElement.offsetHeight - MAIN_PIN_OFFSET_Y,
      bottom: ADDRESS_Y_MAX - mapPinMainElement.offsetHeight - MAIN_PIN_OFFSET_Y,
    };
  };

  window.draggable.setup(mapPinMainElement, getMoveConstraints, null, onMove, onMoveEnd);

  window.mainPin = {
    setState: function (active) {
      if (!active) {
        mapPinMainElement.style.top = INIT_POSITION_TOP;
        mapPinMainElement.style.left = INIT_POSITION_LEFT;
        setAddress();
      }
    }
  };
})();

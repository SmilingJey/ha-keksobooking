'use strict';

(function () {
  var state;
  var mapElement = document.querySelector('.map');

  window.pageState = {
    setState: function (pageState) {

      window.form.setState(pageState);
      if (pageState) {
        mapElement.classList.remove('map--faded');
        window.pins.loadPins();
      } else {
        mapElement.classList.add('map--faded');
        window.mainPin.resetPosition();
        window.pins.removePins();
        window.card.closeCard();
      }

      state = pageState;
    },

    getState: function () {
      return state;
    }
  };

  window.pageState.setState(false);
})();

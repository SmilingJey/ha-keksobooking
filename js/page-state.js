'use strict';

(function () {
  var state;
  var mapElement = document.querySelector('.map');

  window.pageState = {
    setState: function (pageState) {
      if (pageState && !state) {
        window.data.loadCards();
      }

      window.form.setState(pageState);

      if (pageState) {
        mapElement.classList.remove('map--faded');
      } else {
        mapElement.classList.add('map--faded');
        window.card.closeCard();
        window.mainPin.resetPosition();
        window.pins.removePins();
      }

      state = pageState;
    },

    getState: function () {
      return state;
    }
  };

  window.pageState.setState(false);
})();

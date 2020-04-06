'use strict';

(function () {
  var state;

  window.pageState = {
    setState: function (pageState) {
      if (state !== pageState) {
        window.form.setState(pageState);
        window.pins.setState(pageState);
        window.mainPin.setState(pageState);
        state = pageState;
      }
    },

    getState: function () {
      return state;
    }
  };

  window.pageState.setState(false);
})();

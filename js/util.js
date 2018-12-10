'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mainElement = document.querySelector('main');

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    showMessage: function (messageElement) {
      var onMessageEsc = function (evt) {
        window.util.isEscEvent(evt, closeMessage);
      };

      var closeMessage = function () {
        if (messageElement) {
          mainElement.removeChild(messageElement);
          document.removeEventListener('keydown', onMessageEsc);
        }
      };

      messageElement.addEventListener('click', closeMessage);
      document.addEventListener('keydown', onMessageEsc);
      mainElement.appendChild(messageElement);
    }
  };
})();

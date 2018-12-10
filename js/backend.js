'use strict';

(function () {
  var LOAD_CARDS_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_CARDS_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var HTTP_OK = 200;

  var sendXMLHttpRequest = function (type, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(type, url);
    xhr.send(data);
  };


  window.backend = {
    loadCards: function (onLoad, onError) {
      sendXMLHttpRequest('GET', LOAD_CARDS_URL, null, onLoad, onError);
    },

    saveForm: function (data, onLoad, onError) {
      sendXMLHttpRequest('POST', SAVE_CARDS_URL, data, onLoad, onError);
    }
  };

})();

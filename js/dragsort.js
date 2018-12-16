'use strict';

(function () {
  window.dragsort = {
    enable: function (containerElement, dragElementSelector) {
      var draggableElements = containerElement.querySelectorAll(dragElementSelector);
      for (var i = 0; i < draggableElements.length; i++) {
        draggableElements.draggable = true;
      }

      var dragElement;

      var onDragOver = function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var element = target.closest(dragElementSelector);
        if (element && element !== dragElement) {
          containerElement.insertBefore(dragElement, element.nextSibling || element);
        }
      };

      var onDragEnd = function (evt) {
        evt.preventDefault();
        containerElement.removeEventListener('dragover', onDragOver, false);
        containerElement.removeEventListener('dragend', onDragEnd, false);
      };

      var onDragStart = function (evt) {
        var target = evt.target;
        var element = target.closest(dragElementSelector);
        if (element) {
          dragElement = element;
          evt.dataTransfer.effectAllowed = 'move';
          evt.dataTransfer.setData('text/html', dragElement.textContent);
          containerElement.addEventListener('dragover', onDragOver, false);
          containerElement.addEventListener('dragend', onDragEnd, false);
        }
      };

      containerElement.addEventListener('dragstart', onDragStart);
    }
  };
})();



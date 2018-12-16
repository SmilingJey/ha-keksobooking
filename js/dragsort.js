'use strict';

(function () {
  window.dragsort = {
    enable: function (containerElement, dragElementClassName, onUpdate) {
      var draggableElements = containerElement.querySelectorAll(dragElementClassName);
      for (var i = 0; i < draggableElements.length; i++) {
        draggableElements.draggable = true;
      }

      var dragElement;

      var onDragOver = function (evt) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        var target = evt.target;
        if (target && target !== dragElement &&
          target.classList.contains(dragElementClassName)) {
          containerElement.insertBefore(dragElement, target.nextSibling || target);
        }
      };

      var onDragEnd = function (evt) {
        evt.preventDefault();
        containerElement.removeEventListener('dragover', onDragOver, false);
        containerElement.removeEventListener('dragend', onDragEnd, false);
        if (onUpdate) {
          onUpdate(dragElement);
        }
      };

      containerElement.addEventListener('dragstart', function (evt) {
        dragElement = evt.target;
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragElement.textContent);
        containerElement.addEventListener('dragover', onDragOver, false);
        containerElement.addEventListener('dragend', onDragEnd, false);
      }, false);
    }
  };
})();



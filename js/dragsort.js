'use strict';

(function () {
  window.dragsort = {
    enable: function (containerElement, dragElementSelector) {
      var draggableElements = containerElement.querySelectorAll(dragElementSelector);
      draggableElements.forEach(function (element) {
        element.draggable = true;
      });

      var dragElement;

      var insertAfter = function (elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
          return parent.insertBefore(elem, next);
        } else {
          return parent.appendChild(elem);
        }
      };

      var onDragOver = function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var element = target.closest(dragElementSelector);
        if (element && element !== dragElement) {
          if (element.offsetLeft > dragElement.offsetLeft) {
            insertAfter(dragElement, element);
          } else {
            containerElement.insertBefore(dragElement, element);
          }

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



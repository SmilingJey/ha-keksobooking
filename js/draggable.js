'use strict';

(function () {

  window.draggable = {
    setup: function (element, getConstraints, onMoveStart, onMove, onMoveEnd) {
      var onMouseDown = function (downEvt) {
        downEvt.preventDefault();
        var dragged = false;

        var startCoords = {
          x: downEvt.clientX,
          y: downEvt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          if (!dragged && onMoveStart) {
            onMoveStart();
          }

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
            x: element.offsetLeft - shift.x,
            y: element.offsetTop - shift.y
          };

          var constraint = getConstraints();

          if (newCoords.x > constraint.right) {
            newCoords.x = constraint.right;
          } else if (newCoords.x < constraint.left) {
            newCoords.x = constraint.left;
          }

          if (newCoords.y > constraint.bottom) {
            newCoords.y = constraint.bottom;
          } else if (newCoords.y < constraint.top) {
            newCoords.y = constraint.top;
          }

          if (onMove) {
            onMove(newCoords);
          }
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (onMoveEnd) {
            onMoveEnd();
          }

          if (dragged) {
            var onClickPreventDefault = function (clickEvt) {
              clickEvt.preventDefault();
              element.removeEventListener('click', onClickPreventDefault);
            };
            element.addEventListener('click', onClickPreventDefault);
          }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

      };

      element.addEventListener('mousedown', onMouseDown);
    }
  };
})();

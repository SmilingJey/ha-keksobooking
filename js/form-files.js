'use strict';

(function () {
  var PREVIEW_PHOTO_WIDTH = 70;
  var PREVIEW_PHOTO_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormElement = document.querySelector('.ad-form');
  var inputAvatarElement = adFormElement.querySelector('#avatar');
  var avatarImageElement = adFormElement.querySelector('.ad-form-header__preview img');
  var inputPhotoElement = adFormElement.querySelector('#images');
  var photoContainerElement = adFormElement.querySelector('.ad-form__photo-container');
  var avatarDragZoneElement = adFormElement.querySelector('.ad-form-header__drop-zone');
  var photoDragZoneElement = adFormElement.querySelector('.ad-form__drop-zone');

  var checkFileType = function (file, fileTypes) {
    var fileName = file.name.toLowerCase();
    return fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var setupDragZone = function (dropbox, handleFiles) {
    var dragenter = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    };

    var dragover = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    };

    var drop = function drop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var dt = evt.dataTransfer;
      var files = dt.files;
      if (window.pageState.getState()) {
        handleFiles(files);
      }
    };

    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', drop, false);
  };

  var resetAvatarImage = function () {
    avatarImageElement.src = 'img/muffin-grey.svg';
  };

  var loadFiles = function (files, onLoad, fileTypes) {
    for (var i = 0; i < files.length; i++) {
      if (files[i] && checkFileType(files[i], fileTypes)) {
        var reader = new FileReader();
        reader.addEventListener('load', onLoad);
        reader.readAsDataURL(files[i]);
      }
    }
  };

  var onLoadAvatarFile = function (e) {
    avatarImageElement.src = e.target.result;
  };

  var loadAvatarFile = function (files) {
    loadFiles(files, onLoadAvatarFile, FILE_TYPES);
  };

  var onChangeAvatarFile = function () {
    loadAvatarFile(inputAvatarElement.files);
  };

  var removePhotosPreview = function () {
    var photoElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < photoElements.length; i++) {
      photoElements[i].parentNode.removeChild(photoElements[i]);
    }
  };

  var createBlankPhotoElement = function () {
    var blankPhoto = document.createElement('div');
    blankPhoto.classList.add('ad-form__photo');
    return blankPhoto;
  };

  var onLoadPhotoFile = function (e) {
    var imageElement = document.createElement('img');
    imageElement.src = e.target.result;
    imageElement.alt = 'выбранное фото';
    imageElement.width = PREVIEW_PHOTO_WIDTH;
    imageElement.height = PREVIEW_PHOTO_HEIGHT;
    imageElement.classList.add('ad-form__photo');
    photoContainerElement.appendChild(imageElement);
  };

  var loadPhotoFiles = function (files) {
    removePhotosPreview();
    loadFiles(files, onLoadPhotoFile, FILE_TYPES);
  };

  var onChangePhotoFiles = function () {
    loadPhotoFiles(inputPhotoElement.files);
  };

  inputAvatarElement.addEventListener('change', onChangeAvatarFile);
  inputPhotoElement.addEventListener('change', onChangePhotoFiles);
  setupDragZone(avatarDragZoneElement, loadAvatarFile);
  setupDragZone(photoDragZoneElement, loadPhotoFiles);
  window.dragsort.enable(photoContainerElement, 'ad-form__photo');

  window.formFiles = {
    resetFileSelection: function () {
      resetAvatarImage();
      removePhotosPreview();
      photoContainerElement.appendChild(createBlankPhotoElement());
    }
  };
})();

// Content script - Photo Viewer
// Use PhotoViewer library to view images

(function () {
  'use strict';

  // Collect all images on the page
  function getImages() {
    const images = document.querySelectorAll('img');
    const items = [];
    images.forEach((img) => {
      if (img.src) {
        items.push({
          src: img.src,
          title: img.alt || ''
        });
      }
    });
    return items;
  }

  // Check if element is inside PhotoViewer modal
  function isInPhotoViewer(el) {
    return el.closest('.photoviewer-modal') !== null;
  }

  // Bind dblclick event on images
  document.addEventListener('dblclick', function (e) {
    if (e.target.tagName === 'IMG' && e.target.src && !isInPhotoViewer(e.target)) {
      e.preventDefault();
      e.stopPropagation();

      const items = getImages();
      const currentIndex = items.findIndex(item => item.src === e.target.src);

      new PhotoViewer(items, {
        index: currentIndex >= 0 ? currentIndex : 0
      });
    }
  }, true);

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'showImage' && message.src) {
      const items = getImages();
      const currentIndex = items.findIndex(item => item.src === message.src);

      new PhotoViewer(items, {
        index: currentIndex >= 0 ? currentIndex : 0
      });
    }
  });
})();

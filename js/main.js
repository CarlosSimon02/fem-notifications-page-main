(function () {
  "use strict";
  const unreadNotifItemClassName = "js-unread-notif-item";
  const notifItemClassName = "js-notif-item";

  const unreadNotifCount = document.querySelector(".js-unread-notif-count");
  const links = document.querySelectorAll(".js-link");
  const markAllAsReadLink = document.querySelector(".js-mark-all-as-read");
  const attrBtn = document.querySelector(".js-attribution-btn");
  const attr = document.querySelector(".js-attribution");

  const getUnreadNotifItems = function () {
    return document.querySelectorAll(`.${unreadNotifItemClassName}`);
  };

  const displayunreadNotifCount = function () {
    const unreadNotifItems = getUnreadNotifItems();
    unreadNotifCount.innerHTML = unreadNotifItems.length;
  };

  const removeNotifItemFromUnread = function () {
    //navigate up the DOM, when notification item found
    var ancestorItem = this.parentNode;
    while (ancestorItem !== null) {
      if (ancestorItem.classList.contains(notifItemClassName)) {
        ancestorItem.classList.remove(unreadNotifItemClassName);
        displayunreadNotifCount();
        break;
      }
      ancestorItem = ancestorItem.parentNode;
      if (ancestorItem === null) return;
    }
  };

  const markAllAsRead = function () {
    const unreadNotifItems = getUnreadNotifItems();
    unreadNotifItems.forEach((item) => {
      item.classList.remove(unreadNotifItemClassName);
    });
    displayunreadNotifCount();
  };

  const hideAttribution = function () {
    attr.style.bottom = "-5rem";
    attrBtn.disabled = false;
    setTimeout(()=>{attr.style.visibility = "hidden"},800);
  };

  const showAttribution = function () {
    attr.style.visibility = "visible";
    attr.style.bottom = 0;
    attrBtn.disabled = true;
    setTimeout(hideAttribution, 3000);
  };

  document.addEventListener("DOMContentLoaded", displayunreadNotifCount);
  markAllAsReadLink.addEventListener("click", markAllAsRead);
  attrBtn.addEventListener("click", showAttribution);

  links.forEach((link) => {
    link.addEventListener("click", removeNotifItemFromUnread);
  });
})();

function showNotification(id, msgObj = null) {
  const el = document.getElementById(id);
  if (msgObj) {
    el.style.visibility = "visible";
    el.innerHTML = msgObj.message;
  }
  setTimeout(() => (el.style.visibility = "hidden"), 1000);
}

export { showNotification };

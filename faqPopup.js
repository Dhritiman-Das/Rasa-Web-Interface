function faqActivated(x) {
  //open actions popup and close all other popups
  document.getElementsByClassName("faqPopup")[0].style.display = "block";
  document.getElementsByClassName("actionsPopup")[0].style.display = "none";
  document.getElementsByClassName("endpointsPopup")[0].style.display = "none";
  document.getElementsByClassName("intentPopup")[0].style.display = "none";
  document.getElementsByClassName("slotsPopup")[0].style.display = "none";
  //set the classname of actions topNav to 'active'
  document.getElementsByClassName("faqTopNav")[0].classList.add("active");
  document
    .getElementsByClassName("actionsTopNav")[0]
    .classList.remove("active");
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
  document.getElementsByClassName("intentTopNav")[0].classList.remove("active");
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
}

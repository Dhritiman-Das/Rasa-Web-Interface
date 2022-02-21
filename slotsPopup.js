var slots = intentsDB.slots;

//activate slots popup
function slotsActivated(x) {
  //open slots popup and close all other popups
  document.getElementsByClassName("slotsPopup")[0].style.display = "block";
  document.getElementsByClassName("intentPopup")[0].style.display = "none";
  document.getElementsByClassName("actionsPopup")[0].style.display = "none";
  document.getElementsByClassName("faqPopup")[0].style.display = "none";
  document.getElementsByClassName("endpointsPopup")[0].style.display = "none";

  //set the classname of slots topNav to 'active'
  document.getElementsByClassName("slotsTopNav")[0].classList.add("active");
  document.getElementsByClassName("intentTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("actionsTopNav")[0]
    .classList.remove("active");
  document.getElementsByClassName("faqTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
}
//close slots popup
function closeSlotsPopup(x) {
  document.getElementsByClassName("slotsPopup")[0].style.display = "none";
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
}

function addNewSlot(x) {
  // console.log(x.parentElement.parentElement);
  if (x.classList.contains("fa-plus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "newSlotForm"
    )[0].style.display = "block";
    x.classList.remove("fa-plus");
    x.classList.add("fa-minus");
  } else if (x.classList.contains("fa-minus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "newSlotForm"
    )[0].style.display = "none";
    x.classList.remove("fa-minus");
    x.classList.add("fa-plus");
  }
}

function deleteSlot(x) {
  x.parentElement.parentElement.remove();
}
//creating all the slots div from DB
for (const singleSlots in slots) {
  createSlotDiv(singleSlots);
}

function submitSlotForm(x) {
  var slotName =
    x.parentElement.parentElement.getElementsByClassName("fillSlotName")[0]
      .children[1].value;
  if (slotName.length > 0) {
    x.parentElement.parentElement.getElementsByClassName(
      "fillSlotName"
    )[0].children[1].value = "";
    createSlotDiv(slotName);
    //write to the DB also
    slots[slotName] = "";
    console.log(slots);
  }
}

//create the HTML for the slot Div
function createSlotDiv(singleSlots) {
  var singleSlot = document.createElement("div");
  singleSlot.className = "singleSlot";
  var slotInnerHTML = `
  <div class="slotName">${singleSlots}</div>
  <div class="removeSlot">
      <i class="fa fa-trash" onclick="deleteSlot(this)"></i>
  </div>
  `;
  singleSlot.innerHTML = slotInnerHTML;
  document.getElementsByClassName("slotsList")[0].append(singleSlot);
}

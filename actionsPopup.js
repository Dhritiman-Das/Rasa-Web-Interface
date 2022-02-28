var utteranceClicked = false;
var slotFillingClicked = false;
var customActionsClicked = false;
var entitiesList = intentsDB.entities.duckling;
var utteranceList = intentsDB.actions.utterenaces;
var slotFillingList = intentsDB.actions.fillSlots;
function actionsActivated(x) {
  //open actions popup and close all other popups
  document.getElementsByClassName("actionsPopup")[0].style.display = "block";
  document.getElementsByClassName("endpointsPopup")[0].style.display = "none";
  document.getElementsByClassName("intentPopup")[0].style.display = "none";
  document.getElementsByClassName("slotsPopup")[0].style.display = "none";
  document.getElementsByClassName("faqPopup")[0].style.display = "none";
  //set the classname of actions topNav to 'active'
  document.getElementsByClassName("actionsTopNav")[0].classList.add("active");
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
  document.getElementsByClassName("intentTopNav")[0].classList.remove("active");
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
  document.getElementsByClassName("faqTopNav")[0].classList.remove("active");
}

function addNewActions(x) {
  if (x.classList.contains("fa-plus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "actionOptions"
    )[0].style.display = "block";
    x.classList.remove("fa-plus");
    x.classList.add("fa-minus");
  } else if (x.classList.contains("fa-minus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "actionOptions"
    )[0].style.display = "none";
    x.classList.remove("fa-minus");
    x.classList.add("fa-plus");
  }
}

function selectedOption(x) {
  if (x.value == "utterance" && utteranceClicked == false) {
    utteranceClicked = true;
    slotFillingClicked = false;
    customActionsClicked = false;
    x.parentElement.getElementsByClassName("utteranceDiv")[0].style.display =
      "block";
    x.parentElement.getElementsByClassName("addNewSlots")[0].style.display =
      "none";
    x.parentElement.getElementsByClassName(
      "addNewCustomActions"
    )[0].style.display = "none";
  } else if (x.value == "slotFilling" && slotFillingClicked == false) {
    slotFillingClicked = true;
    utteranceClicked = false;
    customActionsClicked = false;
    x.parentElement.getElementsByClassName("addNewSlots")[0].style.display =
      "block";
    x.parentElement.getElementsByClassName("utteranceDiv")[0].style.display =
      "none";
    x.parentElement.getElementsByClassName(
      "addNewCustomActions"
    )[0].style.display = "none";
  } else if (x.value == "customAction" && customActionsClicked == false) {
    customActionsClicked = true;
    slotFillingClicked = false;
    utteranceClicked = false;
    x.parentElement.getElementsByClassName(
      "addNewCustomActions"
    )[0].style.display = "block";
    x.parentElement.getElementsByClassName("addNewSlots")[0].style.display =
      "none";
    x.parentElement.getElementsByClassName("utteranceDiv")[0].style.display =
      "none";
  }
}

function entityExtractionMethod(x) {
  if (x.value == "lastIntent") {
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "selectEntityName"
    )[0].style.display = "block";
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "fillSlotValue"
    )[0].style.display = "none";
  } else if (x.value == "customValue") {
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "fillSlotValue"
    )[0].style.display = "block";
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "selectEntityName"
    )[0].style.display = "none ";
  }
}
// fetch all slot names and entity types
function fetchAllSlotEntries() {
  // 1st: 'Select slot:'
  var selectSlotName = document.createElement("div");
  selectSlotName.className = "selectSlotName";
  var slotsInnerHTML = `
  <div>
  Select Slot: 
  </div>
  <div class="slotOptions">
  <select class = "selectSlotOption" id="selectSlotOption">
  <option value="Select" style="display:none;" selected>Select</option>
  `;
  for (var slot in slots) {
    slotsInnerHTML += `
      <option value="${slot}">${slot}</option>
      `;
  }
  slotsInnerHTML += `
    </select>
    </div>
    `;
  selectSlotName.innerHTML = slotsInnerHTML;
  document.getElementsByClassName("newSlotsDiv")[0].append(selectSlotName);
  // 2nd: 'Entity Extraction:'
  var selectEntityExtraction = document.createElement("div");
  selectEntityExtraction.className = "selectEntityExtraction";
  var entityExtractionInnerHTML = `
    <div>
        Entity Extraction: 
    </div>
    <div class="entityExtractionOption">
        <select class="selectEntityExtractionMethod" id="selectEntityExtractionMethod" onclick="entityExtractionMethod(this)">
            <option value="Select" style="display:none;" selected>Select</option>
            <option value="lastIntent">Extract from last intent</option>
            <option value="customValue">Set a custom value</option>
        </select>
    </div>
    `;
  selectEntityExtraction.innerHTML = entityExtractionInnerHTML;
  document
    .getElementsByClassName("newSlotsDiv")[0]
    .append(selectEntityExtraction);
  // 3rd: 'Entity:'
  var selectEntityName = document.createElement("div");
  selectEntityName.className = "selectEntityName";
  selectEntityName.style.display = "none";
  selectEntityNameInnerHTML = `
  <div>
      Entity: 
  </div>
  <div class="entityOptions">
      <select class="selectEntityOption" id="selectEntityOption">
          <option value="Select" style="display:none;" selected>Select</option>`;
  for (var entity of entitiesList) {
    selectEntityNameInnerHTML += `
    <option value="${entity}">${entity}</option>
    `;
  }
  selectEntityNameInnerHTML += `
  </select>
  </div>
  `;
  selectEntityName.innerHTML = selectEntityNameInnerHTML;
  document.getElementsByClassName("newSlotsDiv")[0].append(selectEntityName);
  // 4th: 'Slot Value :'
  var fillSlotValue = document.createElement("div");
  fillSlotValue.className = "fillSlotValue";
  fillSlotValue.style.display = "none";
  var fillSlotValueInnerHTML = `
    <div>
    Slot Value : 
    </div>
    <div class="slotValue">
    <input type="text">
    </div>
    `;
  fillSlotValue.innerHTML = fillSlotValueInnerHTML;
  document.getElementsByClassName("newSlotsDiv")[0].append(fillSlotValue);
  // 5th: 'Save As:'
  var saveAsSlot = document.createElement("div");
  saveAsSlot.className = "saveAsSlot";
  var saveAsSlotInnerHTML = `
    <div>
    Save As: 
    </div>
    <div class="saveAsSlotInput">
    <input type="text">
    </div>
    `;
  saveAsSlot.innerHTML = saveAsSlotInnerHTML;
  document.getElementsByClassName("newSlotsDiv")[0].append(saveAsSlot);
}

function createSingleUtteranceBlock(utterance) {
  var singleUtteranceBlock = document.createElement("div");
  singleUtteranceBlock.className = "singleUtteranceBlock";
  singleUtteranceBlock.innerHTML = `
    <div class="singleUtterance ${utterance}">
    ${utteranceList[utterance]}
    </div>
    <div class="deleteUtterance iconDiv">
        <i class="fa fa-trash" onclick="deleteUtterance(this)"></i>
    </div>
    `;
  document
    .getElementsByClassName("allUtteranceBlock")[0]
    .append(singleUtteranceBlock);
}

function displayActionUtterances() {
  for (var utterance in utteranceList) {
    createSingleUtteranceBlock(utterance);
  }
}
function createSingleSlotFillingBlock(slotFillingID) {
  var valueEntryMethod = slotFillingList[slotFillingID]["valueEntryMethod"];
  var slotName = slotFillingList[slotFillingID]["slotName"];
  var entityType = slotFillingList[slotFillingID]["entityType"];
  var customValue = slotFillingList[slotFillingID]["slotValue"];
  var saveAs = slotFillingList[slotFillingID]["saveAs"];

  var singleSlotFillingAction = document.createElement("div");
  singleSlotFillingAction.className = "singleSlotFillingAction";
  singleSlotFillingActionInnerHTML = `
  <div class="singleSlotFillingHeader">
  <div class="singleSlotName ${slotFillingID}">
      ${saveAs}
  </div>
  <div class="showMore iconDiv">
      <i class="fa fa-eye" onclick="viewSlotInfo(this)"></i>
  </div>
  <div class="deleteSingleSLotFilling iconDiv">
      <i class="fa fa-trash" onclick="deleteSingleSlotFilling(this)"></i>
  </div>
</div>
<div class="singleSlotFillingInfo" style="display: none;">
  <div class="infoSlotName">
      <div class="infoKey">Slot Name: </div>
      <div class="infoValue">${slotName}</div>
  </div>
  `;
  if (valueEntryMethod == "lastIntent") {
    singleSlotFillingActionInnerHTML += `
    <div class="infoExtractionType">
      <div class="infoKey">Extraction Type: </div>
      <div class="infoValue">Extract from last intent</div>
  </div>
    <div class="entityType">
      <div class="infoKey">Entity Type: </div>
      <div class="infoValue">${entityType}</div>
  </div>
</div>
    `;
  } else if (valueEntryMethod == "customValue") {
    singleSlotFillingActionInnerHTML += `
    <div class="infoExtractionType">
      <div class="infoKey">Extraction Type: </div>
      <div class="infoValue">Set a custom value</div>
  </div>
    <div class="infoCustomValue">
      <div class="infoKey">Custom Value: </div>
      <div class="infoValue">${customValue}</div>
  </div>
</div>
    `;
  }
  singleSlotFillingAction.innerHTML = singleSlotFillingActionInnerHTML;
  document
    .getElementsByClassName("allSlotFilledActions")[0]
    .append(singleSlotFillingAction);
  console.log(singleSlotFillingActionInnerHTML);
}

function displayActionSlotFilling() {
  for (var slotFillingID in slotFillingList) {
    createSingleSlotFillingBlock(slotFillingID);
  }
}

function maximizeMinimizeUtterance(x) {
  if (x.classList.contains("fa-angle-down")) {
    x.classList.remove("fa-angle-down");
    x.classList.add("fa-angle-up");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "allUtteranceBlock"
    )[0].style.display = "block";
  } else if (x.classList.contains("fa-angle-up")) {
    x.classList.remove("fa-angle-up");
    x.classList.add("fa-angle-down");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "allUtteranceBlock"
    )[0].style.display = "none";
  }
}

function deleteUtterance(x) {
  //delete the utterance from the DB
  var utteranceString =
    x.parentElement.parentElement.getElementsByClassName("singleUtterance")[0]
      .classList[1];
  delete utteranceList[utteranceString];
  x.parentElement.parentElement.remove();
}

function submitUtterance(x) {
  var randomId = `utter_${generateID()}`;
  var utteranceString =
    x.parentElement.parentElement.getElementsByClassName("utteranceInput")[0]
      .children[0].value;
  if (utteranceString.length > 0) {
    utteranceList[randomId] = utteranceString;
    //clear the input box
    x.parentElement.parentElement.getElementsByClassName(
      "utteranceInput"
    )[0].children[0].value = "";
  }
  //add the new utterance to the page
  createSingleUtteranceBlock(randomId);
}
function submitSlots(x) {
  var randomId = `action_fillslot_${generateID()}`;
  var valueEntryMethod = x.parentElement.parentElement.getElementsByClassName(
    "selectEntityExtractionMethod"
  )[0].value;
  var slotName =
    x.parentElement.parentElement.getElementsByClassName("selectSlotOption")[0]
      .value;
  var entityType =
    x.parentElement.parentElement.getElementsByClassName(
      "selectEntityOption"
    )[0].value;
  var customValue =
    x.parentElement.parentElement.getElementsByClassName("slotValue")[0]
      .children[0].value;
  var saveAs =
    x.parentElement.parentElement.getElementsByClassName("saveAsSlotInput")[0]
      .children[0].value;
  //save to DB
  if (valueEntryMethod == "lastIntent") {
    //ommit customValue
    slotFillingList[randomId] = {
      ["slotName"]: slotName,
      ["valueEntryMethod"]: valueEntryMethod,
      ["entityType"]: entityType,
      ["slotValue"]: "",
      ["saveAs"]: saveAs,
    };
  } else if (valueEntryMethod == "customValue") {
    //ommit entityType
    slotFillingList[randomId] = {
      ["slotName"]: slotName,
      ["valueEntryMethod"]: valueEntryMethod,
      ["entityType"]: "",
      ["slotValue"]: customValue,
      ["saveAs"]: saveAs,
    };
  }
  //create HTML blocks
  createSingleSlotFillingBlock(randomId);
  //clear inputs
  x.parentElement.parentElement.getElementsByClassName(
    "selectSlotOption"
  )[0].value = "Select";
  x.parentElement.parentElement.getElementsByClassName(
    "selectEntityExtractionMethod"
  )[0].value = "Select";
  x.parentElement.parentElement.getElementsByClassName(
    "selectEntityOption"
  )[0].value = "Select";
  x.parentElement.parentElement.getElementsByClassName(
    "slotValue"
  )[0].children[0].value = "";
  x.parentElement.parentElement.getElementsByClassName(
    "saveAsSlotInput"
  )[0].children[0].value = "";
}

function deleteSingleSlotFilling(x) {
  x.parentElement.parentElement.remove();
  //remove from DB
  slotFillingID =
    x.parentElement.parentElement.getElementsByClassName("singleSlotName")[0]
      .classList[1];
  delete slotFillingList[slotFillingID];
}

function maximizeMinimizeSlotFilling(x) {
  if (x.classList.contains("fa-angle-down")) {
    x.classList.remove("fa-angle-down");
    x.classList.add("fa-angle-up");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "allSlotFilledActions"
    )[0].style.display = "block";
  } else if (x.classList.contains("fa-angle-up")) {
    x.classList.remove("fa-angle-up");
    x.classList.add("fa-angle-down");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "allSlotFilledActions"
    )[0].style.display = "none";
  }
}
function viewSlotInfo(x) {
  if (x.classList.contains("fa-eye")) {
    x.classList.remove("fa-eye");
    x.classList.add("fa-eye-slash");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "singleSlotFillingInfo"
    )[0].style.display = "block";
  } else if (x.classList.contains("fa-eye-slash")) {
    x.classList.remove("fa-eye-slash");
    x.classList.add("fa-eye");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "singleSlotFillingInfo"
    )[0].style.display = "none";
  }
}

fetchAllSlotEntries();
displayActionUtterances();
displayActionSlotFilling();

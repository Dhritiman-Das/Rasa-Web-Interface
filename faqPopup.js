storyIntents = intentsDB.intents.storyIntents;
faqIntents = intentsDB.intents.faqIntents;
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
function addNewFaq(x) {
  if (x.classList.contains("fa-plus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "addFaqForm"
    )[0].style.display = "block";
    x.classList.remove("fa-plus");
    x.classList.add("fa-minus");
  } else if (x.classList.contains("fa-minus")) {
    x.parentElement.parentElement.getElementsByClassName(
      "addFaqForm"
    )[0].style.display = "none";
    x.classList.remove("fa-minus");
    x.classList.add("fa-plus");
  }
}
function addMoreFaqIntent(x) {
  var singleFaqIntent = document.createElement("div");
  singleFaqIntent.className = "singleFaqIntent";
  singleFaqIntentInnerHTML = `
  <div>Intent: </div>`;
  singleFaqIntentInnerHTML += `
  <div class="faqIntentOptions">
      <select class="selectFaqIntentOption" id="selectFaqIntentOption">
          <option value="Select" style="display:none;" selected>Select</option>`;
  for (var intent in faqIntents) {
    singleFaqIntentInnerHTML += createSingleFaqIntent(intent);
  }

  singleFaqIntentInnerHTML += `</select>
  </div>
  <div class="deleteFaqIntent">
      <i class="fa fa-trash" onclick="deleteFaqIntent(this)"></i>
  </div>
  `;
  singleFaqIntent.innerHTML = singleFaqIntentInnerHTML;
  console.log(singleFaqIntentInnerHTML);
  document.getElementsByClassName("chooseFaqIntent")[0].append(singleFaqIntent);
}
function createIntentListOption() {
  var selectFaqIntentOption = document.createElement("select");
  selectFaqIntentOption.className = "selectFaqIntentOption";
  selectFaqIntentOption.innerHTML = `<option value="Select" style="display:none;" selected>Select</option>`;
  for (var intent in faqIntents) {
    // selectFaqIntentOption.innerHTML += `<option value="${intent}">${intent}</option>`;
    selectFaqIntentOption.innerHTML += createSingleFaqIntent(intent);
  }
  document
    .getElementsByClassName("faqIntentOptions")[0]
    .append(selectFaqIntentOption);
}
function createSingleFaqIntent(intent) {
  return `<option value="${intent}">${intent}</option>`;
}
function deleteFaqIntent(x) {
  x.parentElement.parentElement.remove();
}
function createActionsListOption() {
  var singleFaqAction = document.createElement("div");
  singleFaqAction.className = "singleFaqAction";
  var deleteBtn = document.createElement("div");
  deleteBtn.className = "deleteFaqAction";
  deleteBtn.innerHTML = `
  <i class="fa fa-trash" onclick="deleteFaqAction(this)">
  `;
  var selectFaqActionsOption = document.createElement("select");
  selectFaqActionsOption.className = "selectFaqActionsOption";
  var innerHTML = `
  <option value="Select" style="display:none;" selected>Select</option>
  <optgroup class="utteranceOptgroup" label="Utterances">`;
  for (var utteranceID in utteranceList) {
    innerHTML += `<option value="${utteranceID}">${utteranceList[utteranceID]}</option>`;
  }
  innerHTML += `
  <optgroup class="slotFillingOptgroup" label="Slot Filling">`;
  for (var slotFillingID in slotFillingList) {
    innerHTML += `<option value="${slotFillingID}">${slotFillingList[slotFillingID]["saveAs"]}</option>`;
  }
  selectFaqActionsOption.innerHTML = innerHTML;
  singleFaqAction.append(selectFaqActionsOption);
  singleFaqAction.append(deleteBtn);
  document
    .getElementsByClassName("selectFaqActions")[0]
    .append(singleFaqAction);
}
function deleteFaqAction(x) {
  x.parentElement.parentElement.remove();
}
function addMoreFaqAction(x) {
  createActionsListOption();
}
function submitFaqForm(x) {
  var faqIntentList = createFaqIntentList();
  var faqActionsList = createFaqActionsList();
  console.log(faqIntentList);
}
function createFaqIntentList() {
  var intentArr = [];
  for (var intentOption of document.getElementsByClassName(
    "selectFaqIntentOption"
  )) {
    intentArr.push(intentOption.value);
  }
  return intentArr;
}
function createFaqActionsList() {
  var actionsArr = [];
  for (var actionOption of document.getElementsByClassName(
    "selectFaqActionsOption"
  )) {
    var actionID = actionOption.value;
    if (utteranceList[actionID]) {
      var actionName = utteranceList[actionID];
    } else if (slotFillingList[actionID]) {
      // console.log(slotFillingList[actionID]);
      var actionName = slotFillingList[actionID]["saveAs"];
    }
    actionsArr.push([actionID, actionName]);
  }
  console.log(actionsArr);
  return actionsArr;
}
createIntentListOption();
createActionsListOption();

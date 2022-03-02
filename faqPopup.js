storyIntents = intentsDB.intents.storyIntents;
faqIntents = intentsDB.intents.faqIntents;
faqList = intentsDB.faq;
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
  var randomId = `faq_${generateID()}`;
  var faqIntentList = createFaqIntentList();
  var faqActionsList = createFaqActionsList();
  //update the faq DB
  faqList[randomId] = {};
  faqList[randomId]["intents"] = [];
  faqList[randomId]["actions"] = [];
  faqList[randomId]["intents"] = faqIntentList;
  faqList[randomId]["actions"] = faqActionsList;
  //create a new table row
  createfaqRow(randomId);
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
    // actionsArr.push([actionID, actionName]);
    actionsArr.push(actionID);
  }
  console.log(actionsArr);
  return actionsArr;
}
function createfaqRow(faqID) {
  var faqRow = document.createElement("tr");
  faqRow.className = faqID;
  //create the intent data in the table
  var intentData = document.createElement("td");
  intentData.className = "intentFaqData";
  intentDataInnerHTML = "";
  for (var intents of faqList[faqID]["intents"]) {
    intentDataInnerHTML += `
    <div>${intents}</div>
    `;
  }
  intentData.innerHTML = intentDataInnerHTML;
  //create the actions data in the table
  var actionData = document.createElement("td");
  actionData.className = "actionFaqData";
  actionDataInnerHTML = "";
  for (var action of faqList[faqID]["actions"]) {
    if (action.includes("utter_")) {
      //fetch utterance text
      var toDisplay = utteranceList[action];
      actionDataInnerHTML += `
      <div><em>${toDisplay}</em></div>
      `;
    } else if (action.includes("action_")) {
      //fetch action saveAs
      var toDisplay = slotFillingList[action]["saveAs"];
      actionDataInnerHTML += `
      <div>${toDisplay}</div>
      `;
    }
  }
  actionData.innerHTML = actionDataInnerHTML;
  //add the delete button
  var deleteBtnData = document.createElement("td");
  deleteBtnData.className = "deleteBtnData";
  deleteBtnData.innerHTML = `
  <div>
    <i class="fa fa-trash" onclick="deleteFaqRow(this)"></i>
  </div>
  `;
  //append all 3 datas to the table row
  faqRow.append(intentData);
  faqRow.append(actionData);
  faqRow.append(deleteBtnData);
  document
    .getElementsByClassName("intentActionTableFaq")[0]
    .children[0].append(faqRow);
}
function displayFaqSection() {
  for (var faqID in faqList) {
    createfaqRow(faqID);
  }
}
function deleteFaqRow(x) {
  var faqId = x.parentElement.parentElement.parentElement.className;
  x.parentElement.parentElement.parentElement.remove();
  //delete from DB
  delete faqList[faqId];
}
createIntentListOption();
createActionsListOption();
displayFaqSection();

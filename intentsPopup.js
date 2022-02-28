//Database replica
const intentsDB = {
  intents: {
    storyIntents: {
      Positive: ["Yes", "Yup", "Sure"],
      Negative: ["No", "Never"],
    },
    faqIntents: {
      cost: ["Cost?", "What's the time?"],
      availableTime: ["What time are you available?", "available time?"],
    },
  },
  slots: {
    appt_time: "22-02-2022",
    creditScore: "700",
  },
  actions: {
    utterenaces: {
      utter_utterID1: "Great, which day works?",
      utter_utterID2: "What is your credit Score?",
    },
    fillSlots: {
      action_actionName1: {
        slotName: "appt_time",
        valueEntryMethod: "lastIntent",
        entityType: "time",
        slotValue: "",
        saveAs: "id1",
      },
      action_actionName2: {
        slotName: "creditScore",
        valueEntryMethod: "customValue",
        entityType: "",
        slotValue: "700",
        saveAs: "id2",
      },
    },
  },
  entities: {
    duckling: ["time", "number", "money"],
  },
  faq: {
    faq_id1: {
      intents: ["Positive", "Negative"],
      actions: ["utter_utterID1", "action_actionName1", "action_actionName2"],
    },
    faq_id2: {
      intents: ["Positive"],
      actions: ["utter_utterID2", "action_actionName2"],
    },
  },
};
//activate Intent popup
function intentActivated(x) {
  //open intents popup and close all other popups
  document.getElementsByClassName("intentPopup")[0].style.display = "block";
  document.getElementsByClassName("slotsPopup")[0].style.display = "none";
  document.getElementsByClassName("actionsPopup")[0].style.display = "none";
  document.getElementsByClassName("faqPopup")[0].style.display = "none";
  document.getElementsByClassName("endpointsPopup")[0].style.display = "none";
  ////set the classname of active topNav to 'active'
  document.getElementsByClassName("intentTopNav")[0].classList.add("active");
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("actionsTopNav")[0]
    .classList.remove("active");
  document.getElementsByClassName("faqTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
}
//close intent popup
function closeIntentPopup(x) {
  document.getElementsByClassName("intentPopup")[0].style.display = "none";
  document.getElementsByClassName("intentTopNav")[0].classList.remove("active");
}

for (var intent in intentsDB.intents.storyIntents) {
  makeTheIntentBlock(intent, "storyIntent");
}
for (var intent in intentsDB.intents.faqIntents) {
  console.log("Intent is", intent);
  makeTheIntentBlock(intent, "faqIntent");
}

function newExampleBlockShow(x) {
  x.parentElement.parentElement.parentElement.getElementsByClassName(
    "inputNewExample"
  )[0].style.display = "flex";
  console.log(x.parentElement.parentElement.parentElement);
}

function newExampleBlockDone(x, intentKind) {
  x.parentElement.parentElement.parentElement.getElementsByClassName(
    "inputNewExample"
  )[0].style.display = "none";
  var newExampleValue =
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "inputBox"
    )[0].children[0].value;
  //create the new example block
  if (newExampleValue.length > 0) {
    var newSingleExample = `
    <div class="singleExample">
         <div class="exampleName">${newExampleValue}</div>
         <div class="iconDiv"><i class="fa fa-trash deleteExample" onclick="deleteIntentExample(this)"></i></div>
    </div>
    `;
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "examples"
    )[0].innerHTML += newSingleExample;
    //before ending the function reset the value of input box to empty
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "inputBox"
    )[0].children[0].value = "";
    var intentName =
      x.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "intentName"
      )[0].innerText;
    // console.log(
    //   x.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
    //     "intentName"
    //   )[0].innerText
    // );
    if (intentKind == "storyIntent") {
      intentsDB.intents.storyIntents[intentName].push(newExampleValue);
    } else if (intentKind == "faqIntent") {
      intentsDB.intents.faqIntents[intentName].push(newExampleValue);
    }
  }
}

function newExampleBlockHide(x) {
  x.parentElement.parentElement.parentElement.getElementsByClassName(
    "inputNewExample"
  )[0].style.display = "none";
}

function maximizeMinimizeIntent(x) {
  if (x.classList.contains("fa-angle-down")) {
    x.classList.remove("fa-angle-down");
    x.classList.add("fa-angle-up");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "intentExamples"
    )[0].style.display = "block";
  } else if (x.classList.contains("fa-angle-up")) {
    x.classList.remove("fa-angle-up");
    x.classList.add("fa-angle-down");
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "intentExamples"
    )[0].style.display = "none";
  }
}

function deleteIntentWhole(x) {
  var intentName =
    x.parentElement.parentElement.parentElement.getElementsByClassName(
      "intentName"
    )[0].innerText;
  delete intentsDB.intents.storyIntents[intentName];
  x.parentElement.parentElement.parentElement.remove();
}
function deleteIntentExample(x, intentKind) {
  var intentName =
    x.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "intentName"
    )[0].innerText;
  var intentExampleName =
    x.parentElement.parentElement.getElementsByClassName("exampleName")[0]
      .innerText;
  if (intentKind == "storyIntent") {
    var index =
      intentsDB.intents.storyIntents[intentName].indexOf(intentExampleName);
    if (index > -1) {
      intentsDB.intents.storyIntents[intentName].splice(index, 1);
    }
  }
  if (intentKind == "faqIntent") {
    var index =
      intentsDB.intents.faqIntents[intentName].indexOf(intentExampleName);
    if (index > -1) {
      intentsDB.intents.faqIntents[intentName].splice(index, 1);
    }
    console.log("removed");
  }
  console.log(intentName, intentExampleName, index);
  console.log(intentsDB);
  x.parentElement.parentElement.remove();
}

function minMaxIntentForm(x) {
  if (x.classList.contains("fa-plus")) {
    x.classList.remove("fa-plus");
    x.classList.add("fa-minus");
    x.parentElement.parentElement.getElementsByClassName(
      "newIntentForm"
    )[0].style.display = "block";
  } else if (x.classList.contains("fa-minus")) {
    x.classList.remove("fa-minus");
    x.classList.add("fa-plus");
    x.parentElement.parentElement.getElementsByClassName(
      "newIntentForm"
    )[0].style.display = "none";
  }
}

function submitIntentForm(x) {
  var intentKind =
    x.parentElement.parentElement.getElementsByClassName("intentKind")[0].value;
  var intentName =
    x.parentElement.parentElement.getElementsByClassName("fillIntentName")[0]
      .children[1].value;
  var intentExampleText =
    x.parentElement.parentElement.getElementsByClassName(
      "fillIntentExamples"
    )[0].children[0].value;
  var intentArr = convertTextToList(intentExampleText);
  if (intentKind == "storyIntent") {
    intentsDB.intents.storyIntents[intentName] = [];
    for (var intentEx of intentArr) {
      intentsDB.intents.storyIntents[intentName].push(intentEx);
    }
    //To display the intent, create the HTML block. Another option is to reload the page, but that would take some time
    makeTheIntentBlock(intentName, intentKind);
  } else if (intentKind == "faqIntent") {
    intentsDB.intents.faqIntents[intentName] = [];
    for (var intentEx of intentArr) {
      intentsDB.intents.faqIntents[intentName].push(intentEx);
    }
    //To display the intent, create the HTML block. Another option is to reload the page, but that would take some time
    makeTheIntentBlock(intentName, intentKind);
  }
  //clear the input and textarea
  x.parentElement.parentElement.getElementsByClassName(
    "fillIntentName"
  )[0].children[1].value = "";
  x.parentElement.parentElement.getElementsByClassName(
    "fillIntentExamples"
  )[0].children[0].value = "";
  x.parentElement.parentElement.getElementsByClassName("intentKind")[0].value =
    "Select";
}

//basic functions
function convertTextToList(text) {
  var arr = text.split("\n");
  return arr;
}

//This function takes in the intent name and creates the .intentMain div from the intentsDB
//intentKind can be either 'storyIntent' or 'faqIntent'
function makeTheIntentBlock(intent, intentKind) {
  var intentHeader = document.createElement("div");
  intentHeader.className = "intentHeader";
  var intentName = intent;
  intentHeader.innerHTML = `
  <div class="intentName">${intentName}</div>
  <div class="iconDiv"><i class="fa fa-angle-down showMore" onclick="maximizeMinimizeIntent(this)"></i></div>
  <div class="iconDiv"><i class="fa fa-trash deleteIntent" onclick="deleteIntentWhole(this)"></i></div>
  `;

  var intentExamples = document.createElement("div");
  intentExamples.className = "intentExamples";
  intentExamples.style.display = "none";
  var examplesHTML = `
  <div class="examples">
  `;
  if (intentKind == "storyIntent") {
    for (var eg = 0; eg < intentsDB.intents.storyIntents[intent].length; eg++) {
      var intentEg = intentsDB.intents.storyIntents[intent][eg];
      console.log(intentEg);
      examplesHTML += `
    <div class="singleExample">
    <div class="exampleName">${intentEg}</div>
    <div class="iconDiv"><i class="fa fa-trash deleteExample" onclick="deleteIntentExample(this, '${intentKind}')"></i></div>
    </div>
    `;
    }
  } else if (intentKind == "faqIntent") {
    for (var eg = 0; eg < intentsDB.intents.faqIntents[intent].length; eg++) {
      var intentEg = intentsDB.intents.faqIntents[intent][eg];
      console.log(intentEg);
      examplesHTML += `
    <div class="singleExample">
    <div class="exampleName">${intentEg}</div>
    <div class="iconDiv"><i class="fa fa-trash deleteExample" onclick="deleteIntentExample(this, '${intentKind}')"></i></div>
    </div>
    `;
    }
  }
  examplesHTML += `
  </div>
  <div class="inputNewExample" style="display: none;">
      <div class="inputBox">
          <input type="text">
      </div>
      <div class="iconDiv">
          <i class="fa fa-check addExample" onclick="newExampleBlockDone(this,'${intentKind}')"></i>
      </div>
      <div class="iconDiv">
          <i class="fa fa-minus minimizeExample" onclick="newExampleBlockHide(this)"></i>
      </div>
  </div>
  <div class="addIntentExamples">
  <div class="AddMore"><button onclick="newExampleBlockShow(this)">ADD MORE</button></div>
  </div>
  `;
  //   console.log(examplesHTML);
  intentExamples.innerHTML = examplesHTML;
  console.log(intentHeader);
  var intentMain = document.createElement("div");
  intentMain.className = "intentMain";
  intentMain.append(intentHeader);
  intentMain.append(intentExamples);

  if (intentKind == "storyIntent") {
    document.getElementsByClassName("storyIntentsDiv")[0].append(intentMain);
  } else if (intentKind == "faqIntent") {
    document.getElementsByClassName("faqIntentsDiv")[0].append(intentMain);
  }
  // document.getElementsByClassName("intentPopup")[0].append(intentExamples);
}

//Database replica
const intentsDB = {
  intents: {
    Positive: ["Yes", "Yup", "Sure"],
    Negative: ["No", "Never"],
  },
};
//activate Intent popup
function intentActivated(x) {
  document.getElementsByClassName("intentPopup")[0].style.display = "block";
  document.getElementsByClassName("intentTopNav")[0].className = "active";
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
}

for (var intent in intentsDB.intents) {
  makeTheIntentBlock(intent);
}

function newExampleBlockShow(x) {
  x.parentElement.parentElement.parentElement.getElementsByClassName(
    "inputNewExample"
  )[0].style.display = "flex";
  console.log(x.parentElement.parentElement.parentElement);
}

function newExampleBlockDone(x) {
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
    intentsDB.intents[intentName].push(newExampleValue);
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
  delete intentsDB.intents[intentName];
  x.parentElement.parentElement.parentElement.remove();
}
function deleteIntentExample(x) {
  var intentName =
    x.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "intentName"
    )[0].innerText;
  var intentExampleName =
    x.parentElement.parentElement.getElementsByClassName("exampleName")[0]
      .innerText;
  var index = intentsDB.intents[intentName].indexOf(intentExampleName);
  if (index > -1) {
    intentsDB.intents[intentName].splice(index, 1);
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
  var intentName =
    x.parentElement.parentElement.getElementsByClassName("fillIntentName")[0]
      .children[1].value;
  var intentExampleText =
    x.parentElement.parentElement.getElementsByClassName(
      "fillIntentExamples"
    )[0].children[0].value;
  var intentArr = convertTextToList(intentExampleText);
  intentsDB.intents[intentName] = [];
  for (var intentEx of intentArr) {
    intentsDB.intents[intentName].push(intentEx);
  }
  //To display the intent, create the HTML block. Another option is to reload the page, but that would take some time
  makeTheIntentBlock(intentName);
  //clear the input and textarea
  x.parentElement.parentElement.getElementsByClassName(
    "fillIntentName"
  )[0].children[1].value = "";
  x.parentElement.parentElement.getElementsByClassName(
    "fillIntentExamples"
  )[0].children[0].value = "";
}

//basic functions
function convertTextToList(text) {
  var arr = text.split("\n");
  return arr;
}

//This function takes in the intent name and creates the .intentMain div from the intentsDB
function makeTheIntentBlock(intent) {
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
  for (var eg = 0; eg < intentsDB.intents[intent].length; eg++) {
    var intentEg = intentsDB.intents[intent][eg];
    console.log(intentEg);
    examplesHTML += `
    <div class="singleExample">
    <div class="exampleName">${intentEg}</div>
    <div class="iconDiv"><i class="fa fa-trash deleteExample" onclick="deleteIntentExample(this)"></i></div>
    </div>
    `;
  }
  examplesHTML += `
  </div>
  <div class="inputNewExample" style="display: none;">
      <div class="inputBox">
          <input type="text">
      </div>
      <div class="iconDiv">
          <i class="fa fa-check addExample" onclick="newExampleBlockDone(this)"></i>
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

  document.getElementsByClassName("intentPopup")[0].append(intentMain);
  // document.getElementsByClassName("intentPopup")[0].append(intentExamples);
}

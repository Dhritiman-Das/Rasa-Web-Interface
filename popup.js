const intentsDB = {
  intents: {
    Positive: ["Yes", "Yup", "Sure"],
    Negative: ["No", "Never"],
  },
};

for (var intent in intentsDB.intents) {
  var intentHeader = document.createElement("div");
  intentHeader.className = "intentHeader";
  var intentName = intent;
  intentHeader.innerHTML = `
  <div class="intentName">${intent}</div>
  <div class="iconDiv"><i class="fa fa-solid fa-angle-down showMore"></i></div>
  <div class="iconDiv"><i class="fa fa-trash deleteIntent"></i></div>
  `;

  var intentExamples = document.createElement("div");
  intentExamples.className = "intentExamples";
  var examplesHTML = `
  <div class="examples">
  `;
  for (var eg = 0; eg < intentsDB.intents[intent].length; eg++) {
    var intentEg = intentsDB.intents[intent][eg];
    console.log(intentEg);
    examplesHTML += `
    <div class="singleExample">
    <div class="exampleName">${intentEg}</div>
    <div class="iconDiv"><i class="fa fa-trash deleteExample"></i></div>
    </div>
    `;
  }
  examplesHTML += `
  </div>
  <div class="addIntentExamples">
  <div class="AddMore"><button>ADD MORE</button></div>
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

// intentHeader and intentExample should be inside intentMain and intentMain should be appended to intentPopup

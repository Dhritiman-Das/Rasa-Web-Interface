intents = ["Positive", "Negative", "Estimate", "NotIntrested"];

var intentClickCount = 0;
function selectedIntent(x) {
  select = x;
  while (intentClickCount < 1) {
    for (const val of intents) {
      option = document.createElement("option");
      option.value = val;
      option.text = val;
      select.appendChild(option);
    }
    intentClickCount = intentClickCount + 1;
  }
  if (x.value == "Create new Intent") {
    x.parentElement.parentElement.parentElement.childNodes[3].style.display =
      "block"; //WARNING. (childNode should have been 1, idk why it became 3)
  } else {
    x.parentElement.parentElement.parentElement.childNodes[3].style.display =
      "none";
  }
}

function createNewIntent(x) {
  document;
}

function addIntentBlock(x) {
  var intentBlock = x.parentElement.parentElement;
  // x.parentElement.parentElement.parentElement.appendChild(intentBlock);
  console.log(intentBlock.parentElement);
}

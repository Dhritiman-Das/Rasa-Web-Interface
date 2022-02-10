function selectedIntent(x) {
  if (x.children.length == 1) {
    select = x;
    for (const val of intents) {
      option = document.createElement("option");
      option.value = val;
      option.text = val;
      select.appendChild(option);
    }
  }
  if (x.value == "Create new Intent") {
    x.parentElement.parentElement.children[1].style.display = "block";
  } else {
    x.parentElement.parentElement.parentElement.children[1].style.display =
      "none";
  }
}

function createNewIntent(x) {
  x.parentElement.parentElement.children[1].children[0].value = "Select";
  x.parentElement.parentElement.parentElement.children[1].style.display =
    "block";
}

function addIntentBlock(x) {
  const intentDiv = x.parentElement.parentElement.children[0];
  const singleIntent = document.createElement("div");
  singleIntent.className = "singleIntentDiv";
  singleIntent.innerHTML = `<div class="div3 chooseIntentDiv">
  <div class="div4">Intent: </div>
  <div class="div4">
      <select name="Choose or Add Intent" id="chooseIntent" class="div5 intentList" onclick="selectedIntent(this);">
          <option value="Select" style="display:none;" selected>Select</option>
      </select>
  </div>
  <div class="div4 addDiv">
      <button onclick="createNewIntent(this)">FRESH INTENT</button>
  </div>
  <div class="div4 deleteDiv">
    <button onclick="removeDiv(this)">DELETE INTENT</button>
  </div>
</div>
<div class="newIntentDiv" style="display: none;">
  <div class="div3 intentNameDiv">
      <div class="div4">Intent Name: </div>
      <div class="div4"><input type="text"></div>
  </div>
  <div class="div3 examplesDiv">
      <div class="div4">Examples: </div>
      <div class="div4">
          <div class="div5"><textarea name="intentExamples" id="" cols="30" rows="10"></textarea></div>
      </div>                
  </div>
  <div class="div3 removeIntentExamples">
    <button onclick="removeIntentExamples(this)">Remove</button>
   </div>
</div>`;
  intentDiv.appendChild(singleIntent);
}

function removeIntentExamples(x) {
  x.parentElement.parentElement.style.display = "none";
}

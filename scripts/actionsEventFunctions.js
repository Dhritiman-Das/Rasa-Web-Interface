function selectedAction(x) {
  if (x.value == "chooseAction") {
  } else if (x.value == "utter") {
    var newDiv = document.createElement("div");
    newDiv.className = "div3 utteranceBlock";
    newDiv.innerHTML = `
                  <div class="div4 utterance">Utterance : </div>
                  <div class="div4 utteranceText"><input type="text"></div>
                  <div class="div4 deleteDiv"><button onclick="removeDiv(this)">Delete</button></div>
      `;
    x.parentElement.parentElement.parentElement.appendChild(newDiv);
  } else if (x.value == "slotFilling") {
    var parentDiv = document.createElement("div");
    parentDiv.className = "slotDiv";
    var deleteDiv = document.createElement("div");
    deleteDiv.className = "deleteDiv";
    deleteDiv.innerHTML = `<button onclick="removeDiv(this)">Delete2</button>`;
    // var deleteBtn = document.createElement("button");
    // deleteBtn.onclick = "removeDiv(this)";
    // deleteBtn.innerHTML = `Delete1`;
    // deleteDiv.appendChild(deleteBtn);
    var newDiv = document.createElement("div");
    newDiv.className = "div3 slotsBlock slot";
    slotsToOptions = listToOptions(slots, "slots", "slots");
    newDiv.innerHTML = `
    <div class="div4 selectSlotBlock">
    <div class="div5 selectSlot">Select Slot : </div>
    </div>
    <div class="div4 slotOptions"> `;
    newDiv.append(slotsToOptions);
    newDiv.innerHTML += `
    </div>
    `;
    parentDiv.append(newDiv);
    parentDiv.append(deleteDiv);
    x.parentElement.parentElement.parentElement.appendChild(parentDiv);
    slotSelected(parentDiv);
  } else if (x.value == "writeCustomAction") {
  }
  x.value = "Select";
}

function slotSelected(parentDiv) {
  // console.log(parentDiv);
  var newDiv = document.createElement("div");
  newDiv.className = "div3 entitiesBlock slot";
  entitiesToOptions = listToOptions(entities, "entities", "entities");
  entitiesToOptions.className = "entityName";
  newDiv.innerHTML = `
                  <div class="div4 type">Entity type : </div>
                  <div class="div4">
                  <select name="Choose or Add Slot" id="chooseSlot" class="div5 chooseSlot" onclick="checkIfLastEntity(this);">
                    <option value="Select" style="display:none;" selected>Select</option>
                    <option value="lastIntent">Extract from last intent</option>
                    <option value="customValue">Set a custom value</option>
                  </select>
                  </div>
      `;
  var newDiv2 = document.createElement("div");
  newDiv2.className = "div3 selectEntityType slot";
  newDiv2.innerHTML = `
                    <div class="div4 entityType">Entity : </div>
                    <div class="div4 entityTypeText">`;
  newDiv2.append(entitiesToOptions);
  newDiv2.innerHTML += `</div>
        `;
  newDiv2.style.display = "none";
  var newDiv3 = document.createElement("div");
  newDiv3.className = "div3 fillSlotValue slot";
  newDiv3.innerHTML = `
                    <div class="div4">Slot Value : </div>
                    <div class="div4 slotValue"><input type="text"></div>
        `;
  newDiv3.style.display = "none";
  parentDiv.appendChild(newDiv);
  parentDiv.appendChild(newDiv2);
  parentDiv.appendChild(newDiv3);
}

function checkIfLastEntity(x) {
  if (x.value == "lastIntent") {
    x.parentElement.parentElement.parentElement.childNodes[3].style.display =
      "block";
    x.parentElement.parentElement.parentElement.childNodes[4].style.display =
      "none";
  } else if (x.value == "customValue") {
    x.parentElement.parentElement.parentElement.childNodes[3].style.display =
      "none";
    x.parentElement.parentElement.parentElement.childNodes[4].style.display =
      "block";
  }
}

function removeDiv(x) {
  console.log(x.parentElement.parentElement);
  x.parentElement.parentElement.remove();
}

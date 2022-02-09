function listToOptions(list, name, id, func = null) {
  var select = document.createElement("select");
  select.name = name;
  select.id = id;
  select.onclick = func;
  var option = document.createElement("option");
  option.value = "Select";
  option.text = "Select";
  option.selected = true;
  option.style.display = "none";
  select.appendChild(option);
  for (const val of list) {
    option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  return select;
}

function generateID() {
  return Math.random().toString(36).slice(2);
}

function getEntitiesString() {
  emptyString = "";
  for (const entitiy of entities) {
    emptyString = emptyString.concat(`  - ${entitiy} \n`);
  }
  return emptyString;
}
function getSlotsString() {
  emptyString = "";
  for (const slot of slots) {
    emptyString = emptyString.concat(`  ${slot} \n`);
    emptyString = emptyString.concat(`    type: text \n`);
    emptyString = emptyString.concat(`    influence_conversation: false\n`);
  }
  return emptyString;
}
function getUnique(arr) {
  var uniqueArray = Array.from(new Set(arr));
  return uniqueArray;
}

var slots = ["appt_date", "appt_time", "creditScore", "Shading"];
var entities = ["time", "money", "number"];

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

console.log(listToOptions(slots, "slots", "slots"));

function generateID() {
  return Math.random().toString(36).slice(2);
}

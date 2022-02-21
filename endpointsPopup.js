var mongoClicked = false;
var sqlClicked = false;
var redisClicked = false;
var dynamoClicked = false;

function endpointActivated(x) {
  //open endpoints popup and close all other popups
  document.getElementsByClassName("endpointsPopup")[0].style.display = "block";
  document.getElementsByClassName("intentPopup")[0].style.display = "none";
  document.getElementsByClassName("slotsPopup")[0].style.display = "none";
  document.getElementsByClassName("actionsPopup")[0].style.display = "none";
  document.getElementsByClassName("faqPopup")[0].style.display = "none";
  //set the classname of endpoints topNav to 'active'
  document.getElementsByClassName("endpointTopNav")[0].classList.add("active");
  document.getElementsByClassName("intentTopNav")[0].classList.remove("active");
  document.getElementsByClassName("slotsTopNav")[0].classList.remove("active");
  document
    .getElementsByClassName("actionsTopNav")[0]
    .classList.remove("active");
  document.getElementsByClassName("faqTopNav")[0].classList.remove("active");
}
function selectedDB(x) {
  var databaseConfigValues = document.createElement("div");
  databaseConfigValues.className = "databaseConfigValues";
  if (x.value == "mongoDB" && mongoClicked == false) {
    mongoClicked = true;
    sqlClicked = false;
    redisClicked = false;
    dynamoClicked = false;

    //empty the databaseConfig div first
    document.getElementsByClassName("databaseConfig")[0].innerHTML = "";
    databaseConfigValues.innerHTML = `
        <div class="url">
            <div>URL: </div>
            <div class="urlValue">
                <input type="text">
            </div>
        </div>
        <div class="databaseName">
            <div>Database Name: </div>
            <div class="databaseNameInput">
                <input type="text">
            </div>
        </div>
        <div class="databaseUsername">
            <div>Username: </div>
            <div class="databaseUsernameInput">
                <input type="text">
            </div>
        </div>
        <div class="databasePassword">
            <div>Password: </div>
            <div class="databasePasswordInput">
                <input type="password">
            </div>
        </div>
        <div class="databaseAuthSrc">
            <div>Auth Src: </div>
            <div class="databaseAuthSrcInput">
                <input type="text">
            </div>
        </div>
        <div class="submitEndpointsForm">
            <button onclick="closeEndpointsForm(this)">Done</button>
        </div>
        `;
  } else if (x.value == "sql" && sqlClicked == false) {
    sqlClicked = true;
    mongoClicked = false;
    redisClicked = false;
    dynamoClicked = false;
    //empty the databaseConfig div first
    document.getElementsByClassName("databaseConfig")[0].innerHTML = "";
    //create the innerHTML
    databaseConfigValues.innerHTML = ``;
  } else if (x.value == "redis" && redisClicked == false) {
    redisClicked = true;
    mongoClicked = false;
    sqlClicked = false;
    dynamoClicked = false;
    //empty the databaseConfig div first
    document.getElementsByClassName("databaseConfig")[0].innerHTML = "";
    //create the innerHTML
    databaseConfigValues.innerHTML = ``;
  } else if (x.value == "dynamo" && dynamoClicked == false) {
    dynamoClicked = true;
    mongoClicked = false;
    sqlClicked = false;
    redisClicked = false;
    //empty the databaseConfig div first
    document.getElementsByClassName("databaseConfig")[0].innerHTML = "";
    //create the innerHTML
    databaseConfigValues.innerHTML = ``;
  }
  document
    .getElementsByClassName("databaseConfig")[0]
    .append(databaseConfigValues);
}

function closeEndpointsForm(x) {
  document.getElementsByClassName("endpointsPopup")[0].style.display = "none";
  document
    .getElementsByClassName("endpointTopNav")[0]
    .classList.remove("active");
}

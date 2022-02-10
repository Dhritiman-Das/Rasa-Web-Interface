function generateStories() {
  var storiesString = "";
  var domainString = {
    intentString: "intents: \n",
    entitiesString: "entities: \n",
    slotsString: "slots: \n",
    responsesString: "responses: \n",
    actionsString: "actions: \n",
  };
  intentList = [];
  actionList = [];
  //domain.yml: entities
  domainString.entitiesString = domainString.entitiesString.concat(
    getEntitiesString()
  );
  //domain.yml: slots
  domainString.slotsString = domainString.slotsString.concat(getSlotsString());
  countStories = 0;
  storiesString = storiesString.concat();
  countStories = 0;
  for (const dummyDiv of document.getElementsByClassName("divCheckpoint")) {
    //storyName
    storyName = `story_${countStories}`;
    countStories += 1;
    storiesString = storiesString.concat(`-story: ${storyName} \n`);
    //checkpointTOP
    checkpointTop = dummyDiv.children[0].id;
    if (checkpointTop != "null" && checkpointTop) {
      storiesString = storiesString.concat(`-checkpoint: ${checkpointTop} \n`);
    }
    //intent
    //stories.yml
    var newStoryBlockDisplay =
      dummyDiv.children[1].children[0].children[0].children[0].children[1].style
        .display;
    if (newStoryBlockDisplay == "none") {
      intentName =
        dummyDiv.children[1].children[0].children[0].children[0].children[0]
          .children[1].children[0].value;
    } else if (newStoryBlockDisplay == "block") {
      intentName =
        dummyDiv.children[1].children[0].children[0].children[0].children[1]
          .children[0].children[1].children[0].value;
      intentExamples =
        dummyDiv.children[1].children[0].children[0].children[0].children[1]
          .children[1].children[1].children[0].children[0].value;
    }
    storiesString = storiesString.concat(`- intent: ${intentName} \n`);
    for (const slotDiv of dummyDiv.getElementsByClassName("slotDiv")) {
      if (
        slotDiv.getElementsByClassName("chooseSlot")[0].value == "lastIntent"
      ) {
        entityName = slotDiv.getElementsByClassName("entityName")[0].value;
        storiesString = storiesString.concat(`  entities: \n`);
        storiesString = storiesString.concat(
          `    - ${entityName} : ${entityExamples[entityName]} \n`
        );
      }
    }
    intentList.push(intentName);
    //actions
    for (const actionsDiv of dummyDiv.children[1].children[1].children) {
      //utterance
      if (actionsDiv.classList.contains("utteranceBlock")) {
        utter_id = "utter_" + generateID();
        actionsDiv.id = utter_id; //naming the utter_id
        actionList.push(utter_id);
        //stories.yml
        storiesString = storiesString.concat(`- action: ${utter_id} \n`);
        //domain.yml: responses
        utteranceText = actionsDiv.children[1].children[0].value;
        domainString.responsesString = domainString.responsesString.concat(
          `  ${utter_id} \n`
        );
        domainString.responsesString = domainString.responsesString.concat(
          `    - text: ${utteranceText} \n`
        );
      }
      //slot
      else if (actionsDiv.classList.contains("slotDiv")) {
        var slotName = actionsDiv.children[0].children[2].value;
        var entityType = actionsDiv.children[2].children[1].children[0].value;
        var entityName =
          actionsDiv.getElementsByClassName("entityName")[0].value;
        if (entityType == "customValue") {
          entityValue = actionsDiv.children[4].children[1].children[0].value;
        } else if (entityType == "lastIntent") {
          entityValue = entityExamples[entityName];
          //AND ALSO ADD entities: - time: "2021-10-11T00:00:00.000-07:00" AFTER intent
        }
        slotFillActionName = `action_fill_${slotName}_slot`;
        //stories.yml
        storiesString = storiesString.concat(
          `- action: ${slotFillActionName} \n`
        );
        storiesString = storiesString.concat(`- slot_was_set: \n`);
        storiesString = storiesString.concat(
          `  - ${slotName}: ${entityValue} \n`
        );
        //domain.yml
        actionList.push(slotFillActionName);
      }
    }
    //checkpointBOTTOM
    checkpointBottom = dummyDiv.children[2].id;
    if (checkpointBottom) {
      storiesString = storiesString.concat(
        `-checkpoint: ${checkpointBottom} \n`
      );
    }
  }
  //domain.yml: intents
  intentListUnique = getUnique(intentList);
  for (const intent of intentListUnique) {
    domainString.intentString = domainString.intentString.concat(
      `  - ${intent} \n`
    );
  }
  //domain.yml: actions
  actionListUnique = getUnique(actionList);
  for (const action of actionListUnique) {
    domainString.actionsString = domainString.actionsString.concat(
      `  - ${action} \n`
    );
  }
  //domain.yml: complete file
  domainFile = `version: "2.0"
  session_config:
    session_expiration_time: 0
    carry_over_slots_to_new_session: true \n`;
  domainFile = domainFile
    .concat(domainString.intentString)
    .concat(domainString.entitiesString)
    .concat(domainString.slotsString)
    .concat(domainString.actionsString)
    .concat(domainString.responsesString);
  document.getElementsByClassName("storiesYML")[0] = domainFile;
}

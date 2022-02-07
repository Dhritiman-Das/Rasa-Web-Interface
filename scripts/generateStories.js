function generateStories() {
  var actionString = "";
  countStories = 0;
  actionString = actionString.concat();
  countStories = 0;
  for (const dummyDiv of document.getElementsByClassName("divCheckpoint")) {
    //storyName
    storyName = `story_${countStories}`;
    countStories += 1;
    actionString = actionString.concat(`-story: ${storyName} \n`);
    //checkpointTOP
    checkpointTop = dummyDiv.children[0].id;
    if (checkpointTop != "null" && checkpointTop) {
      actionString = actionString.concat(`-checkpoint: ${checkpointTop} \n`);
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
    actionString = actionString.concat(`- intent: ${intentName} \n`);
    for (const slotDiv of dummyDiv.getElementsByClassName("slotDiv")) {
      if (
        slotDiv.getElementsByClassName("chooseSlot")[0].value == "lastIntent"
      ) {
        entityName = slotDiv.getElementsByClassName("entityName")[0].value;
        actionString = actionString.concat(`  entities: \n`);
        actionString = actionString.concat(
          `    - ${entityName} : ${entityExamples[entityName]} \n`
        );
      }
    }
    //actions
    for (const actionsDiv of dummyDiv.children[1].children[1].children) {
      //utterance
      if (actionsDiv.classList.contains("utteranceBlock")) {
        utter_id = "utter_" + generateID();
        actionsDiv.id = utter_id; //naming the utter_id
        //stories.yml
        actionString = actionString.concat(`- action: ${utter_id} \n`);
        //domain.yml
        utteranceText = actionsDiv.children[1].children[0].value;
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
        //stories.yml
        actionString = actionString.concat(
          `- action: action_fill_${slotName}_slot \n`
        );
        actionString = actionString.concat(`- slot_was_set: \n`);
        actionString = actionString.concat(
          `  - ${slotName}: ${entityValue} \n`
        );
        //domain.yml
      }
    }
    //checkpointBOTTOM
    checkpointBottom = dummyDiv.children[2].id;
    if (checkpointBottom) {
      actionString = actionString.concat(`-checkpoint: ${checkpointBottom} \n`);
    }
  }
  console.log(actionString);
}

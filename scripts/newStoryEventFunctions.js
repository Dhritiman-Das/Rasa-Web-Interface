function createNewStoryBlock(x) {
  const newStoryBlock = document.createElement("div");
  newStoryBlock.className = "alphaDiv";
  newStoryBlock.innerHTML = `
  <div class="divCheckpoint">
            <div class="div1 checkPointTop">
                <button></button>
            </div>
            <div class="div1 storyBlock">
                <div class="div2 intent">
                    <div class="intentDiv">
                        <div class="singleIntentDiv">
                            <div class="div3 chooseIntentDiv">
                                <div class="div4">Intent: </div>
                                <div class="div4">
                                    <select name="Choose or Add Intent" id="chooseIntent" class="div5 intentList" onclick="selectedIntent(this);">
                                        <option value="Select" style="display:none;" selected>Select</option>
                                        <!-- <option value="Create new Intent" onclick="createNewIntent(this)">Create new Intent</option> -->
                                    </select>
                                </div>
                                <div class="div4 addDiv">
                                    <button onclick="createNewIntent(this)">FRESH INTENT</button>
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
                            </div>
                        </div>
                    </div>
                    <div class="orButton">
                        <button  onclick="addIntentBlock(this)">OR</button>
                    </div>
                </div>
                <div class="div2 actions">
                    <div class="div3 actionBlock">
                        <div class="div4 action">Action : </div>
                        <div class="div4 chooseAdd"> 
                            <select name="Choose or Add actions" id="chooseActions" class="div5 chooseActions" onclick="selectedAction(this);">
                                <option value="Select" style="display:none;" selected>Select</option>
                                <option value="chooseAction">Choose an action</option>
                                <option value="utter">Utter Something</option>
                                <option value="slotFilling">Fill a Slot</option>
                                <option value="writeCustomAction">Write a custom action</option>
                            </select>
                            <!-- <div class="div4 clear"><button onclick="removeDiv(this)">Delete</button></div> -->
                        </div>
                    </div>
                </div>
                <div class="div2">
                    <div class="tick">
                        <button onclick="">Tick</button>
                    </div>
                </div>
            </div>
            <div class="div1 checkPointBottom">
                <button onclick="createNewStoryBlock(this)">Checkpoint</button>
            </div>
        </div>
  `;
  x.parentElement.parentElement.parentElement.append(newStoryBlock);
  console.log(x.parentElement.parentElement.parentElement);
}

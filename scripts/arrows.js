function makeArrows(parent, child) {
  parentX = parent.getBoundingClientRect().x;
  parentY = parent.getBoundingClientRect().y;
  childX = child.getBoundingClientRect().x;
  childY = child.getBoundingClientRect().y;
  newSVG = document.createElement("svg");
  return [parentX, parentY, childX, childY];
}

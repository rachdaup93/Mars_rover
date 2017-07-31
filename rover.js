var roverA = {
  id: "A",
  position: [0,0], // x and y coordinates
  direction: "f",
  rotation: 0,
  char: "N"
};

var roverB = {
  id: "B",
  position: [1,0], // x and y coordinates
  direction: "f",
  rotation: 1,
  char: "E"
};

var Obstacles = {
  obsA: [3,4],
  obsB: [5,-1],
  obsC: [4,0]
};

map = new Array(2);
map[0] = new Array(10); // x axis
map[1] = new Array(10); // y axis

function goXdirection(rover, direction){
  var movement = 0;
  var new_position = rover.position[0];
  switch (direction) {
    case 'f':
          movement = 1;
          break;
    default:
          movement = -1;
  };

    if(rover.rotation == 1)
      new_position += movement;
    else
      new_position -= movement;

    if(new_position < -5)
      new_position = 5;
    else if(new_position  > 5)
      new_position  = -5;

    if(checkObstacle(new_position,rover.position[1], rover)){
      rover.position[0] = new_position;
    }
};

function goYdirection(rover, direction){
  var movement = 0;
  var new_position = rover.position[1];
  switch (direction) {
    case 'f':
          movement = 1;
          break;
    default:
          movement = -1;
  };

    if(rover.rotation == 0)
      new_position += movement;

    else
      new_position -= movement;

    if(new_position < -5){
        new_position = 5;
      }
    else if(new_position > 5){
        new_position = -5;
      }

    if(checkObstacle(rover.position[0],new_position, rover)){
        rover.position[1] = new_position;
      }
};

function rotateRover(rover, rotation){
  if(rotation == "r"){
    if(rover.rotation == 3)
      rover.rotation = 0;
    else
      rover.rotation++;
  }
  else{
    if(rover.rotation == 0)
      rover.rotation = 3;
    else
      rover.rotation--;
  }
  switch(rover.rotation){
    case 1:
      rover.char = "E";
      break;
    case 2:
      rover.char = "S";
    break;
    case 3:
      rover.char = "W";
    break;
    default:
      rover.char = "N";
  };
};

function directRover(rover, direction){
  rotation = rover.rotation;
  if(direction == 'f' || direction == 'b'){
    if(rotation == 0 || rotation == 2){
      goYdirection(rover, direction);
    }
    else {
      goXdirection(rover, direction);
    }
  }
  else if(direction == 'r' || direction == 'l'){
    rotateRover(rover, direction);
  }

  else{
    console.log("Invalid Input: Rover did not change.");
  }

  console.log("Rover " + rover.id + "'s location and direction: Facing: " + rover.char + " Coordinates: [" + rover.position[0] + ", " + rover.position[1] + "]");
};

function checkObstacle(x,y, rover){
  var new_position = x + "," + y;
  if(rover.id == "A"){
    if(new_position != roverB.position)
      return true;
    else{
      console.log("Rover detected Rover B in its path. Rover " + rover.id + " cannot move.");
      return false;
    }
  }
  else{
    if(new_position != roverA.position)
      return true;
      else{
        console.log("Rover detected Rover A in its path. Rover " + rover.id + " cannot move.");
        return false;
      }
  }
  if(new_position != Obstacles.ob && new_position != Obstacles.obsB && new_position != Obstacles.obsC)
    return true;
  else{
    console.log("Rover detected obstacle in its path. Rover " + rover.id + " cannot move.");
    return false;
  }
};

function controltheRover(rover, user_commands){
  rover.direction = user_commands;
  for(var i=0; i < rover.direction.length; i++){
    directRover(rover, rover.direction[i]);
  }
};

controltheRover(roverA, "rfflffffrsbbbblrffrbb");
controltheRover(roverB, "ffffrsbbbblrffrbb");
controltheRover(roverB, "fffflllrbsfffbrlr");

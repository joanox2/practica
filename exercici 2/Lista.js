printWelcomeMessage();
interactiveConsole();

function input(question, callback) {
  var stdin = process.stdin, stdout = process.stdout;
  stdin.resume();
  stdout.write(question);
  stdin.once('data', function (data) {
    data = data.toString().trim();
    callback(data);
  });
}

function interactiveConsole() {


  input(">> ", function (data) {

    var addModule = require("./addCharacter");
    var SaveAndLoadModule = require("fs");
    var parts = data.trim().split(' ');
    if(parts[0]) parts[0] = parts[0].toUpperCase();

    switch (true) {
      case parts[0] == "LIST":
        array = addModule.array;

        if (array.length == 0) {
          console.log("no hi ha personatges per mostrar");
          interactiveConsole();
        } else if (array.length != 0) {
          for (var value in array) {
            console.log("el nom del personatge es: " + array[value].name);
            console.log("el poder del personatge es: " + array[value].power);
            console.log("el tipus del personatge es: " + array[value].type);
          }
          interactiveConsole();
        }
        break;
      case parts[0] == "ADD":
        if ((parts[1], parts[2], parts[3])) {
          var name = parts[1];
          var power = parts[2];
          var type = parts[3];
          var checkName = false;
          var array = addModule.array;

          for(var value in array){
            if(name == array[value].name){
              checkName = true;
              console.log("ja existeix un personatge amb aquest nom");
            }
          }

          if(checkName == false){
          addModule.array.push(addModule.object(name, power, type));

          console.log("personatge introduit correctament");
          }

          interactiveConsole();
        } else {
          console.log("introdueix tots els parametres per afegir un personatge");
          interactiveConsole();
        }
        break;
      case parts[0] == "DEL":
        if(parts[1]){

          var name = parts[1];
          var checkName = false;
          var array = addModule.array;

          for (var value in array) {
            if (name == array[value].name) {
              checkName = true;
              array.splice(value,1);
            }
          } 

          if(checkName == false){
            console.log("Aquest personatge no ha sigut introduit previament");
            interactiveConsole();
          }else{
            console.log("Personatge suprimit correctament");
            interactiveConsole();
          }
        }
        break;
      case parts[0] == "SAVE":
        if(parts[1]){

          var filename = parts[1];
          var array = addModule.array;

          SaveAndLoadModule.writeFile(filename,JSON.stringify(array),function(error)
            {
              if (error){
                 console.log(error);
              }else {
                console.log("archiu creat correctament");
                interactiveConsole();
              }
            }
          );
        }
        break;
      case parts[0] == "LOAD":
        if(parts[1]){

          var filename = parts[1];
          var array = addModule.array;
          var arrayData = [];
          var Character;
          
          SaveAndLoadModule.readFile(filename, function (error,data) {
             if (error) {
                console.log(error);
              } else {
               arrayData = JSON.parse(data);

               for(var value in arrayData){
                 Character = new addModule.object(arrayData[value].name,arrayData[value].power,arrayData[value].type);
                 array.push(Character)
               }
               console.log("archiu correctament carregat");
               interactiveConsole();
              }
            }
          );
        }
        break;
      case parts[0] == "EXIT":
        process.exit(0);
        break;
      default:
        console.log("Incorrect command");
        interactiveConsole();
        break;
    }

  });
}

function printWelcomeMessage() {
  console.log(`Avaialble commands:
  LIST - shows all Caracters introduced
  ADD name power type - adds a new Character with one name, one power and one type
  DEL name - Removes the name introduced previously
  SAVE filename - saves all caracters added in a json format
  LOAD filename - Loads a file preaviously saved
  EXIT - Exits the program`);
}




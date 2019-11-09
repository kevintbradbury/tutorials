var toDoList = ["Make Chore List"];

var input = prompt("What would you like to do?");

while (input !== "quit") {
    if (input === "list") {
        listToDos()
    } else if (input === "new") {
        addNewItem()
    }else if (input === "delete") {
      deleteToDo()
    }
    input = prompt("What else would you like to do?");
}
alert("ok, you'll quit");

function listToDos() {
    toDoList.forEach(function(todo, i){
        console.log(i + " : " + todo)
    })
}
function addNewItem() {
        var newToDo = prompt("Enter new todo");
        toDoList.push(newToDo);
}
function deleteToDo() {
    var itemToRemove = prompt("Which item to remove?");
    var indexToRemove = toDoList.indexOf(itemToRemove);

    if (toDoList[indexToRemove] == itemToRemove) {
        toDoList.splice(indexToRemove, 1);            
    } else {
        alert("sorry, couldn't find that. Try entering that again")            
    }
}
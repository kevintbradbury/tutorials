var toDos = ["Buy new turtle"];

var input = prompt("What would you like to do?");

while (input !== "quit") {
    if (input === "list") {
        console.log(toDos);
    } else if (input === "new") {
        var newToDo = prompt("Enter new todo");
        toDos.push(newToDo);
    }
    input = prompt("What else would you like to do?");
}
alert("ok, you'll quit");
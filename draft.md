- todo

  - data: description, id, done
  - methods:
    - getId
    - changeStatus

- todoList

  - data: todos
  - methods:
    - addtodo
    - markAsDone(todoId)

- todoController

  - data: todoList, inputController, todotodoViewer, todoId
  - methods
    - start
      // add onNewtodo listener
      // add ontodoDone listener
  - private methods
    // onNewtodo will create a todo and todoList.addtodo with an id and description
    // ontodoDone will get an id and mark todo as done

- inputController

  - data: input button element, done button element
  - methods
    - onNewtodo
    - ontodoDone

- todotodoViewer
  - data: todosContainer
    Method:
  - render

main
todoController.start

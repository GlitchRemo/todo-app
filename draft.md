- todo

  - data: description, id, done
  - methods:
    - getId
    - changeStatus

- todoList

  - data: todos
  - methods:
    - addTask
    - markAsDone(taskId)

- todoController

  - data: todoList, inputController, todoView, todoId
  - methods
    - start
      // add onNewTask listener
      // add onTaskDone listener
  - private methods
    // onNewTask will create a task and todoList.addTask with an id and description
    // onTaskDone will get an id and mark task as done

- inputController

  - data: input button element, done button element
  - methods
    - onNewTask
    - onTaskDone

- todoView
  - data: todosContainer
    Method:
  - render

main
todoController.start

const sendTodos = (request, response) => {
	const { todoLists } = request.app;
	response.json(todoLists.getDetails());
};

const addTodoList = (request, response) => {
	const { todoLists, todosStorage } = request.app;
	const { title } = request.body;

	todoLists.add(title);

	todosStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 201;
		response.end();
	});
};

const addTodo = (request, response) => {
	const { todoLists, todosStorage } = request.app;
	const { description } = request.body;
	const { listId } = request.params;

	todoLists.addTodo({ listId, description });

	todosStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 201;
		response.end();
	});
};

const toggleDoneStatus = (request, response) => {
	const { todoLists, todosStorage } = request.app;
	const { isDone } = request.body;
	const { listId, todoId } = request.params;

	todoLists.toggleDoneStatus({ listId, todoId, isDone });

	todosStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.end();
	});
};

const deleteTodo = (request, response) => {
	const { todoLists, todosStorage } = request.app;

	const { listId, todoId } = request.params;

	todoLists.deleteTodo(listId, todoId);
	todosStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.end();
	});
};

const sortTodoList = (request, response) => {
	const { todoLists, todosStorage } = request.app;

	const { type } = request.body;
	const { listId } = request.params;

	todoLists.sortListBy(listId, type);
	todosStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.end();
	});
};

module.exports = {
	deleteTodo,
	toggleDoneStatus,
	addTodo,
	addTodoList,
	sendTodos,
	sortTodoList,
};

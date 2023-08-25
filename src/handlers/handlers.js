const sendTodos = (request, response) => {
	const { todoLists } = request.app;
	response.json(todoLists.getDetails());
};

const addTodoList = (request, response) => {
	const { todoLists, todoStorage } = request.app;
	const { title } = request.body;

	todoLists.add(title);

	todoStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 201;
		response.send();
	});
};

const addTodo = (request, response) => {
	const { todoLists, todoStorage } = request.app;
	const { description } = request.body;
	const { listId } = request.params;

	todoLists.addTodo({ listId, description });

	todoStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 201;
		response.send();
	});
};

const toggleDoneStatus = (request, response) => {
	const { todoLists, todoStorage } = request.app;
	const { isDone } = request.body;
	const { listId, todoId } = request.params;

	todoLists.toggleDoneStatus({ listId, todoId, isDone });

	todoStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.send();
	});
};

const deleteTodo = (request, response) => {
	const { todoLists, todoStorage } = request.app;
	const { listId, todoId } = request.params;

	todoLists.deleteTodo(listId, todoId);

	todoStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.send();
	});
};

const sortTodoList = (request, response) => {
	const { todoLists, todoStorage } = request.app;
	const { type } = request.body;
	const { listId } = request.params;

	todoLists.sortListBy(listId, type);

	todoStorage.update(todoLists.getDetails(), () => {
		response.statusCode = 204;
		response.send();
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

const TRASH_BIN_PATH = "../images/bin-icon.png";

class View {
	#todosContainer;
	#listeners;
	#addButtonElement;
	#inputboxElement;

	constructor(addButtonElement, inputboxElement, todosContainer) {
		this.#addButtonElement = addButtonElement;
		this.#inputboxElement = inputboxElement;
		this.#todosContainer = todosContainer;
		this.#listeners = {};
	}

	on(eventName, listener) {
		this.#listeners[eventName] = listener;
	}

	#resetInputBox() {
		this.#inputboxElement.value = "";
	}

	onNewList(listener) {
		this.#addButtonElement.onclick = () => {
			const title = this.#inputboxElement.value;
			if (!title.trim()) return;

			this.#resetInputBox();
			listener(title);
		};
	}

	#createAlphabeticSortButton(todoId) {
		const alphabeticButton = document.createElement("input");
		alphabeticButton.classList.add("sort-button");

		alphabeticButton.type = "button";
		alphabeticButton.value = "A-Z";

		alphabeticButton.onclick = () => {
			this.#listeners.sort(todoId, { alphabetic: true });
		};

		return alphabeticButton;
	}

	#createStatusSortButton(todoId) {
		const statusButton = document.createElement("input");
		statusButton.classList.add("sort-button");

		statusButton.type = "button";
		statusButton.value = "Status";

		statusButton.onclick = () => {
			this.#listeners.sort(todoId, { status: true });
		};

		return statusButton;
	}

	#createDateSortButton(todoId) {
		const dateButton = document.createElement("input");
		dateButton.classList.add("sort-button");

		dateButton.type = "button";
		dateButton.value = "Date";

		dateButton.onclick = () => {
			this.#listeners.sort(todoId, { date: true });
		};

		return dateButton;
	}

	#createRemoveButton({ todoId }, listId) {
		const deleteButton = document.createElement("img");

		deleteButton.setAttribute("src", TRASH_BIN_PATH);
		deleteButton.classList.add("delete-button");

		deleteButton.onclick = () => {
			this.#listeners.removeTodo(listId, todoId);
		};

		return deleteButton;
	}

	#createTodoDescription({ todoId, description, isDone }, listId) {
		const descriptionElement = document.createElement("section");
		descriptionElement.classList.add("checkbox");

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";

		const textElement = document.createElement("label");
		textElement.innerText = description;
		descriptionElement.append(checkbox, textElement);

		if (isDone) {
			checkbox.checked = true;
			textElement.classList.add("strike");
		}

		checkbox.onchange = () => {
			this.#listeners.toggleDoneStatus(listId, todoId, !isDone);
		};

		return descriptionElement;
	}

	#createTodoElement(todo, listId) {
		const todoElement = document.createElement("section");

		const descriptionElement = this.#createTodoDescription(todo, listId);
		const removeButton = this.#createRemoveButton(todo, listId);

		todoElement.append(descriptionElement, removeButton);
		todoElement.classList.add("todo");

		return todoElement;
	}

	#createAddTodoButton() {
		const addTodoButton = document.createElement("input");

		addTodoButton.type = "button";
		addTodoButton.value = "+";
		addTodoButton.classList.add("add-button");

		return addTodoButton;
	}

	#createInputBox() {
		const inputBox = document.createElement("input");
		inputBox.classList.add("input-box");
		inputBox.type = "text";
		inputBox.placeholder = "Enter a todo...";
		return inputBox;
	}

	#createInputSection(listId) {
		const inputSection = document.createElement("section");
		inputSection.classList.add("input-box-container");

		const inputBox = this.#createInputBox();
		const addTodoButton = this.#createAddTodoButton();
		inputSection.append(inputBox, addTodoButton);

		addTodoButton.onclick = () => {
			const description = inputBox.value;
			if (!description.trim()) return;

			this.#listeners.addTodo(listId, description);
		};

		return inputSection;
	}

	#createTitleElement(title, todoId) {
		const titleElement = document.createElement("section");
		const sortButtons = document.createElement("section");
		const heading = document.createElement("h2");

		heading.innerText = title;
		titleElement.classList.add("flex");
		sortButtons.classList.add("flex");

		const statusSortButton = this.#createStatusSortButton(todoId);
		const alphabeticSortButton = this.#createAlphabeticSortButton(todoId);
		const dateSortButton = this.#createDateSortButton(todoId);

		sortButtons.append(statusSortButton, alphabeticSortButton, dateSortButton);
		titleElement.append(heading, sortButtons);

		return titleElement;
	}

	#createListSection({ title, listId, todos }) {
		const listSection = document.createElement("article");

		const titleElement = this.#createTitleElement(title, listId);
		const inputSection = this.#createInputSection(listId);
		listSection.append(titleElement, inputSection);
		listSection.classList.add("flex-column", "list");

		const todosSection = document.createElement("section");
		todosSection.classList.add("flex-column", "todos");

		todos.forEach((todo) => {
			const todoElement = this.#createTodoElement(todo, listId);
			todosSection.append(todoElement);
		});

		listSection.appendChild(todosSection);
		return listSection;
	}

	#removeLists() {
		[...this.#todosContainer.children].forEach((child) =>
			this.#todosContainer.removeChild(child)
		);
	}

	render(todosData) {
		this.#removeLists();

		todosData.forEach((todoList) => {
			const listElement = this.#createListSection(todoList);
			this.#todosContainer.prepend(listElement);
		});
	}
}

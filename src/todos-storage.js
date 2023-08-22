class TodosStorage {
  #storagePath;
  #fs;

  constructor(fs, storagePath) {
    this.#storagePath = storagePath;
    this.#fs = fs;
  }

  readTodos() {
    if (!this.#fs.existsSync(this.#storagePath)) {
      this.#fs.writeFileSync(this.#storagePath, "[]");
    }

    return JSON.parse(this.#fs.readFileSync(this.#storagePath, "utf-8"));
  }

  saveTodos(todos, onSave) {
    this.#fs.writeFile(this.#storagePath, JSON.stringify(todos), onSave);
  }
}

module.exports = { TodosStorage };

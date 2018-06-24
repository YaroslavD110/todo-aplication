export default (todos) => {
    let newTodos = todos.map( todo => {
        let newTodo = {...todo, id: todo._id, isActive: false};
        delete newTodo._id;
        return newTodo;
    });

    newTodos[0].isActive = true;

    return newTodos;
};
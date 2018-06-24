export default todo => {
    let newTodo = {...todo, _id: todo.id};
    delete newTodo.id;
    return newTodo;
}
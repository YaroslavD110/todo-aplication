export default (todos, todoId) => {
    return todos.find( todo => todo.id === todoId );
};
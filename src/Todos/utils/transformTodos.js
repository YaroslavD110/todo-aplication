export default (todos) => {
    let newTodos = todos.map( todo => {
        return {...todo, isActive: false};
    });

    newTodos[0].isActive = true;

    return newTodos;
};
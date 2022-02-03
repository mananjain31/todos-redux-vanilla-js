const reducer = Redux.combineReducers({
    todos : (state = [], action)=>{
        const newState = Object.assign([], state);
        if(action.type === "add"){
            newState.push(action.payload);
        }
        else if(action.type === "remove"){
            newState.splice(action.payload, 1);
        }
        return newState;
    }
});

const store = Redux.createStore(reducer);

const render=()=>{
    const state = store.getState();
    const todos = document.getElementById('todos');
    todos.innerHTML='';
    state.todos.forEach((todo, idx) => {
        const li = document.createElement('div');
        li.innerText=todo;
        todos.appendChild(li);
        li.onclick=ev=>{
            store.dispatch({
                type : 'remove',
                payload : idx,
            });
            
            render();
           
        }
    });
}

document.getElementById('add').onclick = ev=>{
    const inp = document.getElementById('inp');
    store.dispatch({
        type : 'add',
        payload : inp.value,
    });
    render();
};

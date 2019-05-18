function todos(state = [],action){
    if(action === 'ADD_TODO'){
        state.concat([action.todo])
    }
    return state
}


function createStore(reducer){


    let state
    let listeners = []
    
    const getState = () => state

    const subscribe = (listener) =>{        
        listeners.push(listener)

        return () => {
            listeners = listeners.filter((l) => l !== listeners)
        }

    }

    const dispatch = (action) =>{
        state = reducer(state,action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos)

store.subscribe(() => {
    console.log('The new state is : ',store.getState())
})

store.dispatch({
    type:'ADD_TODO',
    todo: {
        id:0,
        name:'Learning Redux',
        complete:false
    }
})
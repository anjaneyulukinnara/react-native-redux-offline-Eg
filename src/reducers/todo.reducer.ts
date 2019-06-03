

export function TodoReducer(state:any = [], action) {
    switch (action.type) {
        case "SET_TODOS":
            return action.todos || state;
        case "ADD_TODO":
            return [
                ...state, {
                    id: action.payload.tempId,
                    content: action.payload.content,
                    isTemp: true,
                }
            ]
        case "ADD_TODO_COMMIT":
            return state.map((item) => {
                if (item.id == action.meta.tempId) {
                    return {
                        ...item,
                        id: action.payload.id,
                        isTemp: false,
                    }
                }
                return item;
            })
        case "ADD_TODO_ROLLBACK":
            return state.filter(item => item.id !== action.payload.tempId)
        default:
            return state;
    }
}
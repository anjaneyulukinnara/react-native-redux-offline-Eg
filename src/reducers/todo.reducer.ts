
import { TODODACTIONS } from './todo.actiontypes';

export function TodoReducer(state: any = [], action) {
    switch (action.type) {
        case "SET_TODOS":
            return action.todos || state;
        case TODODACTIONS.ADD_TODO:
            return [
                {
                    id: action.payload.tempId,
                    content: action.payload.content,
                    isTemp: true,
                },
                ...state
            ]
        case TODODACTIONS.ADD_TODO_COMMIT:
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
        case TODODACTIONS.ADD_TODO_ROLLBACK:
            return state.filter(item => item.id != action.meta.tempId)
        case TODODACTIONS.REMOVE_TODO:
            return state.map((item) => {
                if (item.id == action.payload.id) {
                    return {
                        ...item,
                        isDeleted: true,
                    }
                }
                return item;
            })
        case TODODACTIONS.REMOVE_TODO_COMMIT:
            console.log('REMOVE_TODO_COMMIT', action, state)
            var newstaate = state.filter(item => item.id != action.payload.id);
            console.log('newwsate', newstaate)
            return newstaate;
        case TODODACTIONS.REMOVE_TODO_ROLLBACK:
            return state.map((item) => {
                if (item.id == action.meta.id) {
                    return {
                        ...item,
                        isDeleted: false,
                    }
                }
                return item;
            })
        default:
            return state;
    }
}
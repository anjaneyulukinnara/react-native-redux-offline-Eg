import { TODODACTIONS } from './todo.actiontypes';

export function addTodo(content) {
    const tempId = Math.random();
    return {
        type: TODODACTIONS.ADD_TODO,
        payload: {
            tempId,
            content
        },
        meta: {
            offline: {
                effect: { url: 'http://10.10.12.139:3600/todo', method: 'post',  data: { content } },
                commit: { type: TODODACTIONS.ADD_TODO_COMMIT, meta: { content, tempId } },
                rollback: { type: TODODACTIONS.ADD_TODO_ROLLBACK, meta: { content, tempId } }
            }
        }
    }
}

export function removeTodo(id) {
    return {
        type: TODODACTIONS.REMOVE_TODO,
        payload: {
            id
        },
        meta: {
            offline: {
                effect: { url: 'http://10.10.12.139:3600/todo', method: 'delete', data: { id } },
                commit: { type: TODODACTIONS.REMOVE_TODO_COMMIT, meta: { id } },
                rollback: { type: TODODACTIONS.REMOVE_TODO_ROLLBACK, meta: { id } }
            }
        }
    }
}
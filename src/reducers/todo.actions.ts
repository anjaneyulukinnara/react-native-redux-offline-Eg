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
                effect: { url: 'http://localhost:3600/todo', method: 'POST', body: JSON.stringify({ content }) },
                commit: { type: TODODACTIONS.ADD_TODO_COMMIT, meta: { content, tempId } },
                rollback: { type: TODODACTIONS.ADD_TODO_ROLLBACK, meta: { content, tempId } }
            }
        }
    }
}
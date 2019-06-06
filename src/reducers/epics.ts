
import axios from 'axios';
import { from } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { fetchTodos } from './api';
import { combineEpics } from "redux-observable";

export const fetchTodosEpic = (action$, store) =>
    action$.pipe(
        filter(isOfType('FETCH_TODOS')),
        switchMap(action =>
            from(fetchTodos()).pipe(
                map(res => { return { type: 'SET_TODOS', todos: res } })
            )
        )
    );



const epics = combineEpics(
    fetchTodosEpic,
);

export default epics;
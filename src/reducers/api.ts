const url = 'http://10.10.12.139:3600/';

export function fetchTodos() {
    return fetch(url + 'todos').then(res => {
        console.log('runnign through epic');
        return res.json();
    });
}
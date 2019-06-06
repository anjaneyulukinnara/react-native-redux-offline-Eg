import { NotifService } from "../push-notifications/pushnotifications";

declare var WebSocket: any;
export default function openSocket() {
    var ws = new WebSocket('ws://10.10.12.139:3600/a');

    ws.onopen = () => {
        // connection opened
        ws.send('something'); // send a message
    };

    ws.onmessage = (e) => {
        // a message was received
        console.log('onmessage', e.data);
        NotifService.localNotif(e.data)
    };

    ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };
}
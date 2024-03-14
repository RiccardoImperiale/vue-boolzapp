import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts,
            currentContact: [],
            newMessage: '',
            currentTime: ''
        }
    },
    methods: {
        openChat(index) {
            this.currentContact = { name: this.contacts[index].name, avatar: this.contacts[index].avatar, messages: [...this.contacts[index].messages] };
        },
        send(name) {
            // find current chat by name in contacts array
            const currentChatByName = contacts.find(contact => contact.name === name);
            // get current time
            this.currentTime = luxon.DateTime.now();
            // format time and date
            const date = this.currentTime.toFormat('dd/MM/yyyy');
            const time = this.currentTime.toFormat('HH:mm');
            // create new message
            let newMsg = { date: date, time: time, message: this.newMessage, status: 'sent' }
            // update current and main contacts array
            currentChatByName.messages.push(newMsg);
            this.currentContact.messages.push(newMsg);

            this.automaticAnswer(currentChatByName)
        },
        automaticAnswer(currentChatByName) {
            setTimeout(() => {
                this.currentTime = luxon.DateTime.now();
                // format time and date
                const date = this.currentTime.toFormat('dd/MM/yyyy');
                const time = this.currentTime.toFormat('HH:mm');
                let newMsg = { date: date, time: time, message: 'ok', status: 'received' };
                // update current and main contacts array
                currentChatByName.messages.push(newMsg);
                this.currentContact.messages.push(newMsg);
            }, 1000);
        }
    },
    created() {
        console.log(contacts);
    }
}).mount('#app')
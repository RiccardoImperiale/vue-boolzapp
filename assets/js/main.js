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
        getDateAndTime() {
            this.currentTime = luxon.DateTime.now();
            return { date: this.currentTime.toFormat('dd/MM/yyyy'), time: this.currentTime.toFormat('HH:mm') };
        },
        send(name) {
            // find current chat by name in contacts array
            const currentChatByName = contacts.find(contact => contact.name === name);
            // get current time and date
            const dateAndTime = this.getDateAndTime();
            // create new message
            let newMsg = { date: dateAndTime.date, time: dateAndTime.time, message: this.newMessage, status: 'sent' };
            // update current and main contacts array
            currentChatByName.messages.push(newMsg);
            this.currentContact.messages.push(newMsg);
            // trigger automatic answer
            this.automaticAnswer(currentChatByName);
        },
        automaticAnswer(currentChatByName) {
            setTimeout(() => {
                const dateAndTime = this.getDateAndTime();
                let newMsg = { date: dateAndTime.date, time: dateAndTime.time, message: 'ok', status: 'received' };
                currentChatByName.messages.push(newMsg);
                this.currentContact.messages.push(newMsg);
            }, 1000);
        }
    },
    created() {
        console.log(contacts);
    }
}).mount('#app')
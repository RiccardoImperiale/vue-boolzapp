import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts,
            currentContact: [],
            newMessage: '',
            currentTime: '',
            search: '',
            filteredContacts: contacts
        }
    },
    methods: {
        openChat(index) {
            this.currentContact = {
                name: this.filteredContacts[index].name,
                avatar: this.filteredContacts[index].avatar,
                messages: this.filteredContacts[index].messages.map(message => {
                    return { ...message, isOpen: false }
                })
            };

            console.log(this.currentContact);
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
        },
        searchFilter() {
            this.filteredContacts = this.contacts.filter(contact => {
                return contact.name.toLowerCase().startsWith(this.search.toLowerCase());
            });
        },
        toggleOptions(index) {
            this.currentContact.messages[index].isOpen = !this.currentContact.messages[index].isOpen;
        },
        deleteMessage(index) {
            this.currentContact.messages.splice(index, 1);
        }
    },
    mounted() {
        console.log(contacts);
    }
}).mount('#app')

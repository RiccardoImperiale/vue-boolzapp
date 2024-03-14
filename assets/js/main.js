import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts,
            currentContact: [],
        }
    },
    methods: {
        openChat(index){
            this.currentContact = {name: this.contacts[index].name, messages: [...this.contacts[index].messages]}
            console.log(this.currentContact);
            // const contact = this.contacts[index];
            // this.currentContact = contact ? { name: contact.name, messages: [...contact.messages] } : null;
        }
    },
    created() {
        console.log(contacts);
    }
}).mount('#app')
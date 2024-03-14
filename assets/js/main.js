import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts,
            currentChat: null
        }
    },
    methods: {
        openChat(index){
            this.currentChat = {name: this.contacts[index].name, messages: [...this.contacts[index].messages]}
            console.log(this.currentChat.name);
        }
    },
    created() {
        console.log(contacts);
    }
}).mount('#app')
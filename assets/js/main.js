import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts
        }
    },
    methods: {

    },
    created() {
        console.log(contacts);
    }
}).mount('#app')
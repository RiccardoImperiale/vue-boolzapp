import { contacts, randomResponses } from './data.js'
import { emojisList } from './emojisList.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contacts,
            currentContact: [],
            newMessage: '',
            currentTime: '',
            search: '',
            filteredContacts: contacts,
            lastSeen: '',
            randomResponses: randomResponses,
            isEmojis: false,
            searchEmoji: '',
            emojis: emojisList,
            filteredEmojis: emojisList,
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
            }; // isOpen keeps track of the msg popup
            this.getLastSeenTime();
        },
        getLastSeenTime() {
            const receivedMessages = this.currentContact.messages.filter(message => message.status === 'received');
            this.lastSeen = receivedMessages[receivedMessages.length - 1].time;
        },
        getDateAndTime() {
            this.currentTime = luxon.DateTime.now();
            return { date: this.currentTime.toFormat('dd/MM/yyyy'), time: this.currentTime.toFormat('HH:mm') };
        },
        send(name) {
            if (this.newMessage !== '') {
                // find current chat by name in contacts array
                const currentChatByName = contacts.find(contact => contact.name === name);
                const dateAndTime = this.getDateAndTime();
                // create new message
                let newMsg = { date: dateAndTime.date, time: dateAndTime.time, message: this.newMessage, status: 'sent' };
                // update current and main contacts array
                currentChatByName.messages.push(newMsg);
                this.currentContact.messages.push(newMsg);
                this.$nextTick(this.scrollToBottom); // $nextTick performs an action after the next DOM update cycle
                this.automaticAnswer(currentChatByName); // trigger automatic answer
                this.newMessage = ''; // clean input
            }
        },
        genRandResponse() {
            const randNum = Math.floor(Math.random() * this.randomResponses.length);
            return this.randomResponses[randNum];
        },
        automaticAnswer(currentChatByName) {
            let randomAnswer = this.genRandResponse();
            setTimeout(() => {
                const dateAndTime = this.getDateAndTime();
                let newMsg = { date: dateAndTime.date, time: dateAndTime.time, message: randomAnswer, status: 'received' };
                currentChatByName.messages.push(newMsg);
                this.currentContact.messages.push(newMsg);
                this.$nextTick(this.scrollToBottom);
                this.getLastSeenTime();
            }, 1000);
        },
        searchFilter() {
            this.filteredContacts = this.contacts.filter(contact => {
                return contact.name.toLowerCase().startsWith(this.search.toLowerCase());
            });
        },
        emojisFilter() {
            this.filteredEmojis = this.emojis.filter(emoji => {
                return emoji.aliases.some(alias => alias.startsWith(this.searchEmoji.toLowerCase()));
            })
        },
        toggleOptions(index) {
            this.currentContact.messages[index].isOpen = !this.currentContact.messages[index].isOpen;
        },
        deleteMessage(index) {
            console.log(this.currentContact.messages);
            // if (this.currentContact.messages.length > 0){
            // }
            this.currentContact.messages.splice(index, 1);
            // search the same contact in the filtered contacts array
            const currentContactByName = this.filteredContacts.find(contact => contact.name === this.currentContact.name);
            // get its index
            const contactIndex = this.filteredContacts.map(contact => contact.name).indexOf(currentContactByName.name);
            // delete the message from the filtered array also 
            this.filteredContacts[contactIndex].messages.splice(index, 1);
       

        },
        toggleEmojis() {
            this.isEmojis = !this.isEmojis;
        },
        addEmoji(index) {
            this.newMessage += this.filteredEmojis[index].emoji; // add emoji to message
        },
        scrollToBottom() {
            const chatContainer = this.$refs.chatContainer; // $refs reference a specific elements in the dom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    },
    created() {
        this.openChat(0);
    }
}).mount('#app')

Vue.config.devtools = true

const boolzApp = new Vue({
  el: '#appWindow',
  data: {
    chatSelector: 0, //selettore della chat
    inputSearchContact: "", //ricerca contatto
    message: { //oggetto messaggio con testo e mittente
      text: "",
      mittente: 1
    },
    userAccount: {
      userAvatar: "img/avatar_io.jpg",
      userName: "Matteo Ponchietti"
    }, // variabile nel file data.js
    contacts : [...dati],
  },
  methods: { //funzione cambia chat al click del contatto
    changeChat: function(index){
      this.chatSelector = index
    }, //funzione invio messaggio in chat con risposta automatica
    sendMessage: function(index){
      let newMessage = {...this.message}
      this.contacts[index].chat.push(newMessage);
      this.clearInputMessage();
      setTimeout(this.autoscroll,10)
      setTimeout(this.contactReply, 3000, index)
    }, // azzero il textbox del messaggio dopo averlo inviato.
    clearInputMessage: function(){
      this.message.text = "";
    }, // funzione per la risposta automatica con selezione random tra più risposte possibili
    contactReply: function(index){
      const randomNum = Math.floor(Math.random() * (this.contacts[index].risposteSolite.length))
      const messageReply = {
        text: this.contacts[index].risposteSolite[randomNum],
        mittente: 0
      }
      this.contacts[index].chat.push(messageReply);
    },
    autoscroll: function() {
      let windowChat = document.getElementsByClassName('chatWindow')[0];
      windowChat.scrollTop = windowChat.scrollHeight;
      }

  },
  computed:{ //creo un array dei contatti filtrati con la ricerca
    contactsFiltered: function(){
      return this.contacts.filter(el =>{
        return el.nome.toLowerCase().includes(this.inputSearchContact.toLowerCase())
      })
    }

  }
});

Vue.config.devtools = true

const boolzApp = new Vue({
  el: '#appWindow',
  data: {
    contactActive: null, //selettore della chat
    inputSearchContact: "", //ricerca contatto
    message: { //oggetto messaggio con testo e mittente
      text: "",
      mittente: 1,
      data: ""
    },
    userAccount: {
      userAvatar: "img/avatar_io.jpg",
      userName: "Matteo Ponchietti"
    }, // variabile nel file data.js
    contacts : [...dati],
  },
  created: function(){
    this.contactActive = this.contacts[0]},
  methods: { //funzione cambia chat al click del contatto
    changeChat: function(contact){
      this.contactActive = contact
    }, //funzione invio messaggio in chat con risposta automatica
    sendMessage: function(contactActive){
      this.dataOra()
      let newMessage = {...this.message}
      this.contactActive.chat.push(newMessage);
      this.clearInputMessage();
      this.autoscroll()
      this.upContact(contactActive.id)
      setTimeout(this.contactReply, 3000, contactActive.id)


    }, // azzero il textbox del messaggio dopo averlo inviato.
    clearInputMessage: function(){
      this.message.text = "";
    }, // funzione per la risposta automatica con selezione random tra più risposte possibili
    contactReply: function(idActive){
      const randomNum = Math.floor(Math.random() * (this.contactActive.risposteSolite.length))
      let today = new Date()
      let indexReply = this.contacts.findIndex(el => el.id == idActive)
      const messageReply = { //reply automatico
        text: this.contacts[indexReply].risposteSolite[randomNum],
        mittente: 0,
        data: today.toLocaleTimeString()
      }
      this.contacts[indexReply].chat.push(messageReply);
      this.upContact(idActive)
    },
    autoscroll: function() { //autoscroll
      Vue.nextTick(function(){
        let windowChat = document.getElementsByClassName('chatWindow')[0];
        windowChat.scrollTop = windowChat.scrollHeight;
      })
    },
    upContact: function(id){
      let indexUp = this.contacts.findIndex(el => el.id == id)
      let contactSaved = this.contacts[indexUp]
      this.contacts.splice(indexUp, 1)
      this.contacts.unshift(contactSaved)
    },
    dataOra: function(){ //funzione per l'orario
      let today = new Date()
      this.message.data = today.toLocaleTimeString()
    },
    deleteMsg: function(indexMsg){
      this.contactActive.chat.splice(indexMsg,1)
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

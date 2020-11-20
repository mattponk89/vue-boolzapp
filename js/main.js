Vue.config.devtools = true
const appQuiz = new Vue({
  el: '#root',
  data: {
    contatoreScheda:0,
    rispostaAttuale: 0,
    risultatoUtente: 0,
    nonfinito: true,
    scheda: [{
      rispostaGiusta: "10",
      domanda: "2*5",
      risposte: ["2","5","10","15","20"],
      rispostaUtente: 0
      }
    ]
  },
  methods: {
    next(){
      if(this.contatoreScheda < this.scheda.length){
        this.scheda[this.contatoreScheda].rispostaUtente = this.rispostaAttuale;
        this.contatoreScheda++;
      }
      if(this.contatoreScheda == (this.scheda.length-1)){
        this.nonfinito = false;
      }
    }
  }
});

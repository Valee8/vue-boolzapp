// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5 - opzionale
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti 

var DateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
    data() {
        return {
            welcomePopup: true,
            showChat: false,
            choise: '',
            // Scritta ultimo accesso
            lastAccess: true,
            // Scritta online
            online: false,
            // Per mostrare il popup che mi fa aggiungere una nuova conversazione
            showPopup: false, 
            // Per mostrare il menu dropdown tramite i 3 punti in alto a sinistra   
            showMenuMyInfo: false,
            // Contiene il nuovo contatto aggiunto dall'utente
            newContact: '',
            // Prende come valore true o false a secondo che il nuovo messaggio abbia spazi vuoti
            noSpace: '',
            // Per mostrare la scritta sta scrivendo
            isWriting: false,
            // Per far comparire un messaggio d'errore se si invia contenuto vuoto o con uno spazio
            error: false,
            // Contiene i numeri random che genero
            randomNumber: '',
            // Risposte random dell'utente
            randomAnswer: ["Ciao!", "No!", "Sei bello", "Oggi sono stanco", "Ci vediamo domani", "A dopo"],
            randomAvatar: ["img/avatar_1.jpg", "img/avatar_2.jpg", "img/avatar_3.jpg", "img/avatar_4.jpg"],
            // Data e ora
            dt: DateTime.now(),
            // Scritta "oggi"
            today: DateTime.now().plus({ days: 0 }).toRelativeCalendar(),
            // Per mostrare il menu dropdown tramite i 3 punti in alto a destra
            showMenuUser: false,
            // Contiene il testo che inserisco nella ricerca
            search: '',
            // Contiene il nuovo messaggio che inserisco nell'input
            newMessage: '',
            // Il contatto attivo
            activeContact: 0,
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/avatar_io.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        myChoise(indice) {

            this.activeContact = indice;

            this.choise = this.activeContact;

            this.showChat = true;

            this.welcomePopup = false;
        },
        // Faccio scomparire i menu dropdown cliccando fuori
        closeMenu() {

            if (this.showMenuUser) {
                this.showMenuUser = false;
            }

            if (this.showMenuMyInfo) {
                this.showMenuMyInfo = false;
            }
            
        },
        // Funzione per cambiare contatto attivo
        changeContact(indice) {
            this.activeContact = indice;
        },
        // Funzione per aggiungere un nuovo messaggio
        addMessage() {

            // Assegno a randomNumber un numero compreso tra primo e ultimo elemento di randomAnswer
            this.randomNumber = this.numCasuale(0, this.randomAnswer.length - 1);

            // Controllo che il nuovo messaggio non abbia spazi
            this.noSpace = this.onlySpaces(this.newMessage);

            // Se il nuovo messaggio non ha spazi vuoti o non ha contenuto vuoto 
            if (!this.noSpace && this.newMessage.length != 0) {

                // Faccio sparire il messaggio d'errore se presente
                this.error = false;

                // Aggiungo il nuovo messaggio
                this.contacts[this.activeContact].messages.push({date: `${this.dt.day}/${this.dt.month}/${this.dt.year} ${this.dt.hour}:${this.dt.minute}:${this.dt.second}`, message: this.newMessage, status: 'sent'});

                // Faccio apparire la scritta sta scrivendo
                this.isWriting = true;
                     
                // Richiamo funzione che aggiunge la risposta
                setTimeout(this.newAnswer, 1000);

            }
            // Se ha spazi vuoti o contenuto vuoto faccio comparire il messaggio d'errore
            else {
                this.error = true;
            }

            // Svuoto contenuto del nuovo messaggio
            this.newMessage = "";
            
        },
        // Bottone annulla nel popup
        cancelButton() {
            if (this.showPopup) {
                this.showPopup = false;
            }
            else {
                this.showPopup = true;
            }

            // Svuoto contenuto newContact
            this.newContact = "";
        },
        // Funzione per far scomparire la scritta Online e far apparire ultimo accesso
        hiddenStatus() {

            this.online = false;

            this.lastAccess = true;

        },
        // Funzione per eliminare singolo messaggio
        deleteMessage(indice) {
            this.contacts[this.activeContact].messages.splice(indice, 1);
        },
        // Funzione che ritorna numero casuale tra min e max
        numCasuale(min, max) {
            return (Math.floor(Math.random() * ((max + 1) - min) + min));
        },
        // Funzione per la risposta
        newAnswer() {
            // Aggiungo risposta dell'utente
            this.contacts[this.activeContact].messages.push({
                date: `${this.dt.day}/${this.dt.month}/${this.dt.year} ${this.dt.hour}:${this.dt.minute}:${this.dt.second}`, 
                message: this.randomAnswer[this.randomNumber], 
                status: 'received'
            });

            // Faccio sparire la scritta sta scrivendo
            this.isWriting = false;

            // Faccio apparire la scritta Online
            this.online = true;

            // Faccio scomparire scritta ultimo accesso
            this.lastAccess = false;

            // Richiamo funzione per far scomparire scritta online
            setTimeout(this.hiddenStatus, 2000);

        },
        // Funzione per eliminare tutti i messaggi di una chat
        deleteAllMessages() {
            this.contacts[this.activeContact].messages.splice(0);

            // Faccio scomparire il menu dropdown se non ci sono messaggi 
            if(this.contacts[this.activeContact].messages.length === 0) {
                this.showMenuUser = false;
            }
        },
        // Funzione per eliminare una chat
        deleteChat() {
            this.contacts.splice(this.activeContact, 1);

            // Faccio scomparire il menu dropdown dopo che ho eliminato una chat
            this.showMenuUser = false;
        },
        // Funzione che ritorna true o false a seconda che il contenuto di str abbia spazi vuoti o no
        onlySpaces(str) {
            return str.trim().length === 0;
        },
        // Funzione per aggiungere una nuova conversazione
        addConversation() {

            // Assegno a randomNumber un numero compreso tra primo e ultimo elemento di randomAvatar
            this.randomNumber = this.numCasuale(0, this.randomAvatar.length - 1);

            // Faccio apparire il popupS
            this.showPopup = true;

            // Controllo che non ci siano spazi
            this.noSpace = this.onlySpaces(this.newContact);

            // Se il nuovo messaggio non ha spazi vuoti o non ha contenuto vuoto 
            if (!this.noSpace && this.newContact.length != 0) {

                // Aggiungo nuova chat
                this.contacts.unshift({name: this.newContact, avatar: this.randomAvatar[this.randomNumber], visible: true, messages: []});

                // Faccio scomparire il popup
                this.showPopup = false;
            }
            else {
                this.error2 = true;
            }

            // Svuoto il contenuto di newContact
            this.newContact = "";
        }
    },
    computed: {
        // Funzione per cercare i contatti
        searchContact(){
            if (this.search) {
            return this.contacts.filter((item) => {
              return this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
            });
            }
            else {
              return this.contacts;
            }
          }
    }
}).mount('#app')
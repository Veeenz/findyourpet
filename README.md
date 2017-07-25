# FINDYOURBUDDY

SIMONE DI MAURO.

X81/000067

VINCENZO FILETTI

METTI LA TUA MATRICOLA VINZ.

***INTRUDUZIONE***

L’applicazione ha lo scopo di permettere al proprietario di un animale disperso, di avere segnalazioni da persone esterne ai suoi conoscenti , di dove si trova l’animale.
Il proprietario segnala dove ha perso l’animale, inserire delle foto, descrizione e la data della scomparsa. Gli altri utenti possono segnalare l’avvistamento dell animale e l'invio delle proprie informazioni personali al proprietario.

***LIBRERIE UTILIZZATE:***

Come grafica dei componenti abbiamo usato la libreria ‘NATIVE BASE’, per le mappe, i marker delle mappe, il caricamento dei font, la geolocalizzazione e le  notifiche abbiamo utilizzato  la libreria messa a disposizione da expo.
Come banca dati abbiamo utilizzato firebase, vista la sua facilità di utilizzo, Strutturando il tutti in 3 tabelle:

* **DataList:** che contiene tutte le ricerche,
* **ReportList:** Lista di tutti i report, con riferimento all id Di DataList
* **TokenUser:** Token necessari per la notifica

***DIAGRAMMA UML DATABASE:***

![IMAGE UML](http://i64.tinypic.com/2cdbfnr.png)

***STRUTTURA STORE REDUCER:***

![STORE](http://i66.tinypic.com/2cd95pv.png)

**REDUCER**
* **AuthReducer** Si occupa di gestire il login e logout effettuato dall'utente e viene richiamato dal Dispacher utilizzando le seguenti azioni:
  * **loginUser**, Richiamando l'evento: **LOGIN_USER_LOGOUT**
  * **loginUserSuccess** Richiamando l'evento: **LOGIN_USER_SUCCESS**
  * **loginUserFailed** Richiamando l'evento: **LOGIN_USER_FAIL**
  * **signupUserSuccess** Richiamando l'evento: **SIGNUP_USER_SUCCESS**
  * **SignUpUser** Richiamando l'evento: **SIGNUP_USER_START**

* **PetReducer** Ha il compito di gestire lo stato di caricamento quando un nuovo Pet viene aggiungo,eliminato o nel caricamento dei dati per la proiezione. Viene richiamando dal Dispacher con le seguenti azioni:
  * **findListFetch** Richiamando l'evento: **FINDLIST_FETCH_START**
  * **findCreate** Richiamando l'evento: **FIND_ADD_START**
  * **findRemove** Richiamando l'evento: **FIND_REMOVE**

* **UserReducer** Si occupa di salvare tutte le informazioni personale dell'utente, come la posizione, email ecc. Viene richiamato tramite le seguenti azioni:
  * **setUserLocation** Richiamando l'evento: **USER_SET_LOCATION**
  * **setUserMarker** Richiamando l'evento: **USER_SET_MARKER**
  * **userProfileInformation** Richiamando l'evento: **USER_PROFILE_INFORMATION**

* **reportReducer** Si occupare di tenere tutti i report per ogni singola ricerca ancora attiva. Viene chiamato con le seguenti azioni:
  * **fetchReport** Richiamando l'evento: **REPORT_FETCH_START**
  * **fetchReportSuccess** Richiamando l'evento: **REPORT_FETCH_SUCCESS**


***NAVIGATOR:***

Per la navigazione dei Tab abbiamo utilizzato ‘react-navigator’. Abbiamo strutturato la navigazione nel seguente modo:
Abbiamo 1 **TabNavigator** che contiene 3 **StackNavigator**, dal primo Stack è possibile raggiungere gli screen: **Login**, **Create**, **Pet**, **Signup**, **Report**, **ImageScreen**, **ReportList**,

Dal Secondo StackNabigator è possibile raggiungere:  **MainScreen**, **Pet**, e dal terzo Stack navigator si può raggiungere: **List**, **Pet**, **ImageScreen**, **Report**, **ReportList**.

Qui elenco tutte le funzionalità di ogni screen:
* **Login:**  Permette il login da parte dell'utente, se l’utente non è iscritto può registrarsi.

* **Create:** Permette di creare una nuova ricerca, inserendo dettagli, titolo, foto e il posizionamento del marker.

* **Pet:** Pagina che elenca tutti i dettagli inseriti dall’utente che ha creato la ricerca.

* **SignUp:** Permette la registrazione all app.

* **Report:** Crea la segnalazione che sarà poi notificata al proprietario.

* **ImageScreeen:** Nella schermata Pet al click su un'immagine caricata dall'utente viene mostrata la foto in maniera più ampia.

* **ReportList:** La lista di tutti i Report per la ricerca selezionata.

* **MainScreen:** La mappa principale con il marker di tutte le ricerche create.

* **List:** La lista di tutte le ricerche, in maniera meno completa è implementata pure su Profile, infatti li viene mostrata solo le ricerche che ha creato l’utente.

***PROBLEMI PROGETTAZIONE:***

Durante lo sviluppo abbiamo riscontrato il problema di non poter caricare le foto della libreria del proprio smartphone utilizzando expo.

Per risolvere il problema abbiamo programmato un servizio in Flask (python), caricato in un nostro server, che riceve le foto caricate dall'utente nel momento della creazione della ricerca, e automaticamente il servizio carica i dati su firebase storage.

***SCREEN:***

**HomeScreen**

![HOME SCREEN](http://i66.tinypic.com/10rv8ua.jpg)

**LOGIN**, **SIGNUP**

![LOGIN](http://i63.tinypic.com/21n1q3c.jpg)
![SIGNUP](http://i66.tinypic.com/6qk805.jpg)

**PETSCREEN**

![PET SCREEN](http://i67.tinypic.com/e82u5j.jpg)



***PIATTAFORME UTILIZZATE:***

* **Github**
* **Trello**
* **Expo**
* **Firebase**
* **Gliffy**

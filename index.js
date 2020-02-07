
const user = "Sebastian";

// HTML-elementer
const messageForm = document.querySelector("#messageForm");
const messageText = document.querySelector("#messageText");
const messageDiv = document.querySelector("#messageDiv");

//Lager databasen 
const db = firebase.firestore();
const chatten = db.collection("chatten");


//ON submit sender vi mld
messageForm.onsubmit = (evt) => {
    evt.preventDefault();

    chatten.add({
        from: user,
        text: messageText.value,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });

}



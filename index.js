const user = "Sebastian";

// HTML-elementer
const messageForm = document.querySelector("#messageForm");
const messageText = document.querySelector("#messageText");
const messageDiv = document.querySelector("#messageDiv");

//Lager databasen
const db = firebase.firestore();
const chatten = db.collection("chatten");

chatten.onSnapshot(snap => {
    for (const message of snap.docChanges()) {

        if (message.type === "added") {

            const melding = message.doc.data();

            messageDiv.innerHTML += `
            <div id="${message.doc.id}">
                <span>${melding.from}:</span>
                <span>${melding.text}</span>
            </div>
        `
        }
    }
})

//ON submit sender vi mld
messageForm.onsubmit = (evt) => {
    evt.preventDefault();

    chatten.add({
        from: user,
        text: messageText.value,
        time: firebase
            .firestore
            .FieldValue
            .serverTimestamp()
    });

}


//const user = prompt("Hva heter du?");
const user = "Sebastian"
// HTML-elementer
const messageForm = document.querySelector("#messageForm");
const messageText = document.querySelector("#messageText");
const messageDiv = document.querySelector("#messageDiv");
const inpFarge = document.querySelector("#inpFarge");
const main = document.querySelector("main");




//Lager databasen
const db = firebase.firestore();
const chatten = db.collection("chatten");

const prikker = db.collection("prikker");



document.onclick = (evt) => {
    prikker.add({
        x: evt.clientX,
        y: evt.clientY,
        farge: inpFarge.value
    });
}

prikker.onSnapshot(snap => {
    for( const prikk of snap.docChanges() ) {
        if(prikk.type === "added") {
            const p = prikk.doc.data();
            main.innerHTML += `
                <div 
                    class="prikk"
                    style="left: ${p.x}px; top: ${p.y}px; background-color: ${p.farge}"
                >
                </div>
            `;
        }
    }
})




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
        time: firebase.firestore.FieldValue.serverTimestamp()
    });

    messageForm.reset();
}

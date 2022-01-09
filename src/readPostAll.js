import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcObansUTMHQbyu_Dti9Hr-UzSlNTNwmg",
    authDomain: "hci-travelblog.firebaseapp.com",
    projectId: "hci-travelblog",
    storageBucket: "hci-travelblog.appspot.com",
    messagingSenderId: "172441244326",
    appId: "1:172441244326:web:862b7732a2747e94091a67",
    measurementId: "G-Z066N4FFX5",
    databaseURL: "https://hci-travelblog-default-rtdb.firebaseio.com/"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


window.onload = function readAll(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const content = document.getElementById("all-posts");

            for(const title in snapshot.val()){
                const block = document.createElement("div")
                const post = document.createElement("a");
                post.href = "../post.html?title=" + title;
                post.innerHTML = title;
                post.className = "link";

                block.appendChild(post);
                content.appendChild(block);
            }
            // console.log(snapshot.val().Testing.content.content);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
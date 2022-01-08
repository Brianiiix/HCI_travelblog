document.getElementById("toggle").addEventListener("click", toggleStreetView);
document.getElementById("place").addEventListener("click", placeImage);

function toggleStreetView() {
    const toggle = panorama.getVisible();
    if (toggle == false) {
      panorama.setPosition({
        lat: coordinate.lat(),
        lng: coordinate.lng()
      });
      panorama.setVisible(true);
    } else {
      panorama.setVisible(false);
    }
}

function placeImage() {
  var dist = 0.0003;
  var angle = panorama.getPov().heading;
  const lat = panorama.getPosition().lat() + Math.cos(angle/180*Math.PI) * dist;
  const lng = panorama.getPosition().lng() + Math.sin(angle/180*Math.PI) * dist;

  const contentString = '<img src="https://images.unsplash.com/photo-1468136020796-0eec5226a897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0JTIwdmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" style="width:128px;"></img>';
  img = "<img width=\"200px\" src=\"" + img + "\"/>"
  let infowindow = new google.maps.InfoWindow({
    position: {
      lat: lat,
      lng: lng
    },
    content: img,
  });

  //put inside database
  var title = document.getElementById("title-input").value;
  var id = document.getElementById("img-id").value;
  
  if(title == ""){
    alert("Please fill in the title!");
  }
  else if(id == ""){
    alert("Please fill in the image id!");
  }
  else if(img == ""){
    alert("Please upload the image file!");
  }
  else{
    infowindow.open({
      map: panorama,
      shouldFocus: false,
    });
    set(ref(database, '/' + title + '/img/' + id), {
      lat: lat,
      lng: lng,
      angle: angle,
      img: img,
    });
  }
}



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.getElementById("write").addEventListener("click", write);
document.getElementById("read").addEventListener("click", read);

function write() {
    var myContent = tinyMCE.activeEditor.getContent();
    var title = document.getElementById("title-input").value;
    if(title == ""){
      alert("Please fill in the title!");
    }
    else{
      set(ref(database, '/' + title + '/content'), {
          content: myContent
      });
    }
}

function read() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("content").innerHTML = snapshot.val().content;
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

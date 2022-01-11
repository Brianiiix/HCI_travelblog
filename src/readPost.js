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

function wrapBindStreetview(){
  if (!bindStreetview.isBusy) {
    bindStreetview.isBusy = true;
    window.requestAnimationFrame(() => {bindStreetview.isBusy = false; bindStreetview()});
  }
}

function bindStreetview(){
  const img_all = post_body.getElementsByTagName("img")
  for (let i=0 ; i < img_all.length ; i++){
    if ( Math.abs(img_all[i].getBoundingClientRect().top - 71) < 5){
      if (post_content.img[i+1] !== undefined){
        setStreetview(post_content.img[i+1].angle, post_content.img[i+1].streetview_lat, post_content.img[i+1].streetview_lng)
      }
    }
  }
}

function setStreetview(angle, streetview_lat, streetview_lng) {
  window.panorama.setPosition({
    lat: streetview_lat,
    lng: streetview_lng
  });
  
  window.panorama.setPov({
    heading: angle, 
    pitch: 0
  });
}

let infowindow={};
function initStreetviewAll(){
  let count = 0;
  post_content.img.forEach(element => {
    infowindow[count] = new google.maps.InfoWindow({
      position: {
        lat: element.lat,
        lng: element.lng
      },
      content: element.img ,
      shouldFocus: false
    })

    infowindow[count].open({
      map: panorama
    })

    count++;
  })
}

document.getElementById("button").addEventListener("click", getPost);
function getPost() {
  const content = document.getElementById("content");

  const url = new URL(window.location.href);
  const title = url.searchParams.get("title");

  const dbRef = ref(getDatabase());
  get(child(dbRef, `/`)).then((snapshot) => {
      if (snapshot.exists()) {
          const post = document.getElementById("read");

          const post_title = document.createElement("h1");
          const post_title_text = document.createTextNode(title);
          post_title.appendChild(post_title_text);

          post.appendChild(post_title);
          post.insertAdjacentHTML('beforeend',snapshot.val()[title].content.content);

          window.post_content = snapshot.val()[title];
          window.post_body = post;

          const img_all = post_body.getElementsByTagName("img")
          initStreetviewAll();

          console.log(post_content)
          for (let i=0 ; i<img_all.length ; i++){
            if (post_content.img[i+1] !== undefined){
              img_all[i].addEventListener("click", event => {
                const angle = post_content.img[i+1].angle;
                const lat = post_content.img[i+1].streetview_lat;
                const lng = post_content.img[i+1].streetview_lng;
                setStreetview(angle, lat, lng);
              });
            }
          }
          
          setStreetview(post_content.img[1].angle, post_content.img[1].streetview_lat, post_content.img[1].streetview_lng);

          content.addEventListener('scroll', wrapBindStreetview);
          content.addEventListener('resize', wrapBindStreetview);
          content.addEventListener('load'  , wrapBindStreetview);
      } else {
          console.log("No data available");
      }
  }).catch((error) => {
      console.error(error);
  });
}

window.onload = getPost();
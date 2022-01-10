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
      findStreetviewAll(post_content.img[i].angle, post_content.img[i].lat, post_content.img[i].lng, post_content.img[i].img )
    }
  }
}

function findStreetviewAll(angle, lat, lng, img){
  let otherImg = post_content.img.filter(element => (element.lat === lat) && (element.lng === lng) && (element.img !== img))
  switchStreetview(angle, lat, lng, img, otherImg);
}

let infowindow={};
function switchStreetview(angle, lat, lng, img, otherImg) {
  if (infowindow != null){
    for(let i=0 ; i<infowindow.length ; i++){
      infowindow[i].close();
    }
  };

  window.panorama.setPosition({
    lat: lat , 
    lng: lng
  });
  
  window.panorama.setPov({
    heading: angle, 
    pitch: 0
  });

  angle = (90 - angle) * (Math.PI / 180);
  let lat_y = 0.0003 * Math.sin(angle);
  let lng_x = 0.0003 * Math.cos(angle);

  infowindow[0] = new google.maps.InfoWindow({
    position: {
      lat: lat + lat_y,
      lng: lng + lng_x
    },
    content: img ,
    shouldFocus: false
  })

  infowindow[0].open({
    map: panorama
  })

  let count = 1;
  otherImg.forEach( element => {
    let other_angle = element.angle;
    const other_lat = element.lat;
    const other_lng = element.lng;
    const other_img = element.img;

    other_angle = (90 - other_angle) * (Math.PI / 180);
    let other_lat_y = 0.0003 * Math.sin(other_angle);
    let other_lng_x = 0.0003 * Math.cos(other_angle);

    infowindow[count] = new google.maps.InfoWindow({
      position: {
        lat: other_lat + other_lat_y,
        lng: other_lng + other_lng_x
      },
      content: other_img ,
      shouldFocus: false
    })

    infowindow[count].open({
      map: panorama
    })
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
          console.log(snapshot.val())

          const img_all = post_body.getElementsByTagName("img")

          console.log(img_all)
          for (let i=0 ; i<img_all.length ; i++){
            img_all[i].addEventListener("click", event => {
              const angle = post_content.img[i].angle;
              const lat = post_content.img[i].lat;
              const lng = post_content.img[i].lng;
              const img = post_content.img[i].img;
              findStreetviewAll(angle, lat, lng, img);
            });
          }

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
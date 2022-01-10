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
      // findStreetviewAll(post_content.img[i+1].angle, post_content.img[i+1].lat, post_content.img[i+1].lng, post_content.img[i+1].img, post_content.img[i+1].streetview_lat, post_content.img[i+1].streetview_lng )
      setStreetview(post_content.img[i+1].angle, post_content.img[i+1].streetview_lat, post_content.img[i+1].streetview_lng)
    }
  }
}

// function findStreetviewAll(angle, lat, lng, img, streetview_lat, streetview_lng){
//   let otherImg = post_content.img.filter(element => {(Math.abs(element.streetview_lat - streetview_lat) < 0.0001) && (Math.abs(element.streetview_lng - streetview_lng) < 0.0001) && (element.img !== img)})
//   const infowindowLength = otherImg.length;
//   switchStreetview(angle, lat, lng, img, otherImg, streetview_lat, streetview_lng);
// }

function setStreetview(angle, streetview_lat, streetview_lng) {
  // if (infowindow != null){
  //   console.log(infowindow)
  //   for(let i=0 ; i<infowindowLength ; i++){
  //     console.log(i)
  //     infowindow[i].close();
  //   }
  // };

  console.log(streetview_lat, streetview_lng)
  window.panorama.setPosition({
    lat: streetview_lat,
    lng: streetview_lng
  });
  
  window.panorama.setPov({
    heading: angle, 
    pitch: 0
  });

  // angle = (90 - angle) * (Math.PI / 180);
  // let lat_y = 0.0003 * Math.sin(angle);
  // let lng_x = 0.0003 * Math.cos(angle);

  // infowindow[0] = new google.maps.InfoWindow({
  //   position: {
  //     lat: lat,
  //     lng: lng
  //   },
  //   content: img ,
  //   shouldFocus: false
  // })

  // infowindow[0].open({
  //   map: panorama
  // })

  // let count = 1;
  // otherImg.forEach( element => {
  //   infowindow[count] = new google.maps.InfoWindow({
  //     position: {
  //       lat: element.lat,
  //       lng: element.lng
  //     },
  //     content: element.img ,
  //     shouldFocus: false
  //   })

  //   infowindow[count].open({
  //     map: panorama
  //   })
  // })
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

          for (let i=0 ; i<img_all.length ; i++){
            img_all[i].addEventListener("click", event => {
              const angle = post_content.img[i+1].angle;
              const lat = post_content.img[i+1].streetview_lat;
              const lng = post_content.img[i+1].streetview_lng;
              const img = post_content.img[i+1].img;
              setStreetview(angle, lat, lng, img);
            });
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
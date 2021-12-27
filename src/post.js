let panorama;
let infowindow;
let infowindowmap;
let infowindow2;
let map;


window.init = function initMap() {
  const astorPlace = {
    lat: 40.729884,
    lng: -73.990988
  };
  // Set up the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: astorPlace,
    zoom: 18,
    streetViewControl: false,
  });

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('map'), {
      position: {
        lat: 40.729681,
        lng: -73.991138
      },
      pov: {
        heading: 165,
        pitch: 0
      },
      motionTracking: false,
      motionTrackingControl: false,
      panControl: false,
    });


  document.getElementById("toggle").addEventListener("click", toggleStreetView);
  document.getElementById("place").addEventListener("click", placeImage);
  document.getElementById("content").addEventListener("scroll", checkStreetview_Img1)


  // Set up the markers on the map
  const cafeMarker = new google.maps.Marker({
    position: {
      lat: 40.730031,
      lng: -73.991428
    },
    map,
    icon: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00",
    title: "Cafe",
  });
  const bankMarker = new google.maps.Marker({
    position: {
      lat: 40.729884,
      lng: -73.990988
    },
    map,
    icon: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFF00",
    title: "Bank",
  });
  const busMarker = new google.maps.Marker({
    position: {
      lat: 40.729559,
      lng: -73.990741
    },
    map,
    icon: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00",
    title: "Bus Stop",
  });

  const contentString = '<img src="https://images.unsplash.com/photo-1468136020796-0eec5226a897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0JTIwdmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" style="width:128px;"></img>';
  const contentString2 = '<img src="https://images.unsplash.com/photo-1532555312469-50ad17bdd141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0JTIwdmlldyUyMGF0JTIwbmlnaHR8ZW58MHx8MHx8&w=1000&q=80" style="width:128px;"></img>';
  
  infowindow = new google.maps.InfoWindow({
    position: {
      lat: 40.729681,
      lng: -73.991138
    },
    content: contentString,
    shouldFocus: false,
  });

  //infowindow.outerHTML = infowindow.outerHTML;
  infowindow2 = new google.maps.InfoWindow({
    position: {
      lat: 40.729559,
      lng: -73.990741
    },
    content: contentString2,
    shouldFocus: false,
  });

  //infowindow2 = infowindow2.cloneNode(true)
  infowindow2.addListener('closeclick', () => {
    infowindow2.open({
      position: {
        lat: 40.729559,
        lng: -73.990741
      },
      map: panorama,
      shouldFocus: false,
    });
  });


  // We get the map's default panorama and set up some defaults.
  // Note that we don't yet set it visible.
  // panorama = map.getStreetView(); // TODO fix type
  panorama.setPosition(astorPlace);
  panorama.setVisible(false);
  panorama.setPov(
    /** @type {google.maps.StreetViewPov} */
    {
      heading: 100,
      pitch: 50,
    }
  );
}

function toggleStreetView() {
  const toggle = panorama.getVisible();

  infowindow.open({
    position: {
      lat: 40.729681,
      lng: -73.991138
    },
    map: panorama,
    shouldFocus: false,
  });

  infowindow2.open({
    position: {
      lat: 40.729559,
      lng: -73.990741
    },
    map: panorama,
    shouldFocus: false,
  });

  console.log(infowindow.position.lat())


  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}

function placeImage() {

  var dist = 0.0003;
  var angle = panorama.getPov().heading;
  const lat = 40.729884 + Math.cos(angle/180*Math.PI) * dist;
  const lng = -73.990988 + Math.sin(angle/180*Math.PI) * dist;
  console.log(angle);
  infowindow.close();
  if(infowindowmap)
  {
  	infowindowmap.close();
  }
  const contentString = '<img src="https://images.unsplash.com/photo-1468136020796-0eec5226a897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0JTIwdmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" style="width:128px;"></img>';
  infowindow = new google.maps.InfoWindow({
    position: {
      lat: lat,
      lng: lng
    },
    content: contentString,
  });
  infowindow.open({
/*     position: {
      lat: lat,
      lng: lng
    }, */
    map: panorama,
    shouldFocus: false,
  });
  infowindowmap = new google.maps.InfoWindow({
    position: {
      lat: lat,
      lng: lng
    },
    content: contentString,
  });
  infowindowmap.open({
    position: {
      lat: lat,
      lng: lng
    },
    map: map,
  });
  
}

let fuck = true;
function checkStreetview_Img1(){
    const img1 = document.getElementById("img1");
    const dist = 0.0003;
    const lat = infowindow.position.lat();
    const heading = Math.acos((lat - 40.729884) / dist ) / Math.PI * 180;

    if (fuck){
        if (img1.getBoundingClientRect().top <= 0){
            fuck = false;
            panorama.setPov({
                heading : heading,
                pitch : 0
            })
        } 
    }else{
        if (img1.getBoundingClientRect().top >= 0){
            fuck = true;
            panorama.setPov({
                heading : heading,
                pitch : 0
            })
        } 
    }

}

let infowindow;
let infowindowmap;
let infowindow2;
let map;

window.init = function initMap() {
  window.panorama = new google.maps.StreetViewPanorama(
    document.getElementById('map'), {
      position: {
        lat: 24.784765583240425,
        lng: 120.99754017862084
      },
      pov: {
        heading: 165,
        pitch: 0
      },
      motionTracking: false,
      motionTrackingControl: false,
      panControl: false,
    });



  // const contentString2 = '<img src="https://images.unsplash.com/photo-1532555312469-50ad17bdd141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0JTIwdmlldyUyMGF0JTIwbmlnaHR8ZW58MHx8MHx8&w=1000&q=80" style="width:128px;"></img>';
  // infowindow = new google.maps.InfoWindow({
  //   position: {
  //     lat: 24.784765583240425 - 0.00005 ,
  //     lng: 120.99754017862084 - 0.0002
  //   },
  //   content: contentString2,
  //   shouldFocus: false
  // })

  // infowindow.open({
  //   map: panorama
  // })

  panorama.setVisible(true);
}

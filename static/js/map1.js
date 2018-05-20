//*************************************************************************************************
// Map Function   
function initMap() {
    var map = new google.maps.Map(document.getElementById("services_map1"), {
        zoom: 10,
        center: {
            lat: 53.275688,
            lng: -6.548086
        }
    })
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var locations = [
        { lat: 53.374805, lng: -6.363206 },
        { lat: 53.292195, lng: -6.267867 },
        { lat: 53.344039, lng: -6.2651859 },
        { lat: 53.2894759, lng: -6.70087 },
        { lat: 53.3406686, lng: -6.2637945 },
        { lat: 53.3504362, lng: -6.256053 },
        { lat: 53.3352058, lng: -6.2503739 },
        { lat: 53.3494447, lng: -6.2446355 },
        { lat: 53.349634, lng: -6.278271 },
        { lat: 53.3263112, lng: -6.2648058 },
        { lat: 53.3378396, lng: -6.2661283 },
        { lat: 53.3354127, lng: -6.2944968 }
    ]
         
   

    var markers = locations.map(function(locations, i) {
        return new google.maps.Marker({
            position: locations,
            label: labels[i % labels.length]
        });
    });
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })
}      


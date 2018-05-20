//*************************************************************************************************
// Map Function  
$.get('data/clinics.csv', function(data){
    function initMap() {
                var map = new google.maps.Map(document.getElementById("services_map2"), {
                    zoom: 10,
                    center: {
                        lat: 53.275688,
                        lng: -6.548086
                    }
                })
                var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                var markers = [];
                var infowindowContent = [];
                data = csvToArray(data);
                data.forEach(function(item){
                    markers.push([item.name,parseFloat(item.lat), parseFloat(item.long)]);
                    infowindowContent.push([item.Name]);
                });
                var infowindow = new google.maps.Infowindow(),
                marker, i;

                for (i = 0; i < marker.length-1; i++){
                    var position = new google.map.Latlang(markers[i][1], markers[i][2]);

                    bounds.extend(position);
                    marker = new google.maps.marker({
                        position: position,
                        map: map,
                        title: markers[i][0]
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker, i){
                        return function() {
                            infowindow.setcontent(inforwindowContent[i][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                        map.fitBounds(bounds);
                    }
                    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(evemt){
                        this.setZoom(14);
                        google.map.event.removeListener(boundsListener);
                    });
                }
             initMap()
        });
        
        function csvToArray(csvString){
            var locations = [];
            var csvRows = csvString.split(/\n/);
            var csvHeaders = csvRows.shift().split(',');

            for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
                    var rowArray = csvRows[rowIndex].split(',');
                    var rowObject = locations[rowIndex] = {};

                    for (var propIndex = 0; propIndex < rowArray.length; ++propIndex){
                            var propValue = rowArray[propIndex];
                            var propLabel = csvHeaders[propIndex];
                            rowObject[propLabel.trim()] = propValue;
                    }
            }
            return locations;
        } 
console.log(csvToArray);
//*************************************************************************************************
// Map Function  This code snipet was adapted from stack overflow, "Loading latitude longitude
// data using Google maps API using CSV data"
function initMap() {} // now it IS a function and it is in global

$.get('data/clinics.csv', function(clinicData){
    initMap = function() {
                
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                
                var mapOptions = {
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    streetViewControl: false,
                    panControl: false
                  };
                map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var markers = [];               
                
                
                var infoWindowContent = [];

                clinicData = csvToArray(clinicData);
                clinicData.forEach(function(item){
                    markers.push([item.name, parseFloat(item.lat), parseFloat(item.long)]);
                    infoWindowContent.push([item.type]);
                
                });
                console.log(infoWindowContent);
                
                var infoWindow = new google.maps.InfoWindow(),
                marker, i;

                
                for (i = 0; i < markers.length -1; i++){
                    console.log(markers[i][1]);
                    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

                    bounds.extend(position);
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: markers[i][0]
                    });
                    
                    
                    google.maps.event.addListener(marker, 'click', (function(marker, i){
                        return function() {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                        
                    
                    map.fitBounds(bounds);
                    }
                    
                    
                    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event){
                        this.setZoom(14);
                        google.maps.event.removeListener(boundsListener);
                    });
                
                }
                initMap();
        });
        
        function csvToArray(csvString){
            
            
            var csvArray = [];
            
            var csvRows = csvString.split(/\n/);
            
            
            var csvHeaders = csvRows.shift().split(',');

            
            for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
                    var rowArray = csvRows[rowIndex].split(',');
            
            
                    var rowObject = csvArray[rowIndex] = {};

            
                    for (var propIndex = 0; propIndex < rowArray.length; ++propIndex){
                            
                        var propValue = rowArray[propIndex];
                        var propLabel = csvHeaders[propIndex];
                        
                        
                        rowObject[propLabel.trim()] = propValue;
                    }
            }
            return csvArray;
        } 

//*************************************************************************************************
// Map Function  This code snipet was adapted from stack overflow, "Loading latitude longitude
// data using Google maps API using CSV data"
$.get('data/clinics.csv', function(data){
    function initialize() {
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                map.setTilt(45);                  
                
                
                var markers = [];
                
                
                var infoWindowContent = [];

                data = csvToArray(data);
                data.forEach(function(item){
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
                initialize();
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

//*************************************************************************************************
// Map Function  This code snipet was adapted from stack overflow, "Loading latitude longitude
// data using Google maps API using CSV data" See https://goo.gl/G6GvHn for more details"
// The original notes have been kept to demonstrate the work and how it was done.

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
                    mapTypeControl: true,
                    streetViewControl: true,
                    panControl: true,
                    /*  Center map over my required location area, that way if anye one else, somewhere out
                        of this location area views this map, it will show them this location and not theirs.
                    */
                    center: {
                        lat: 53.144567,
                        lng: -7.6920536
                    }
                  };
                // Display a map on the page
                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                
                // Multiple Markers
                var markers = [];         
                var infoWindowContent = [];

                clinicData = csvToArray(clinicData);
                clinicData.forEach(function(item){
                    markers.push([item.name, parseFloat(item.lat), parseFloat(item.long)]);
                    infoWindowContent.push([item.type]);    // this will also allow injection of an html elements. Maps will render it.
                                                            // useful for multiple lines info to the marker popup.
                                 
                });
                //console.log(infoWindowContent);
                
                // Display multiple markers on a map
                var infoWindow = new google.maps.InfoWindow(),
                
                // Info Window Content
                marker, i;

                // Loop through our array of markers & place each one on the map
                for (i = 0; i < markers.length -1; i++){
                    //console.log(markers[i][1]);
                    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

                    bounds.extend(position);
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: markers[i][0]
                    });
                    
                    // Allow each marker to have an info window
                    google.maps.event.addListener(marker, 'click', (function(marker, i){
                        return function() {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                        
                    // Automatically center the map fitting all markers on the screen
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
            
             // The array we're going to build
            var csvArray = [];
             // Break it into rows to start
            var csvRows = csvString.split(/\n/);
            
             // Take off the first line to get the headers, then split that into an array
            var csvHeaders = csvRows.shift().split(',');

            // Loop through remaining rows
            for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
                    var rowArray = csvRows[rowIndex].split(',');
            
                    // Create a new row object to store our data.
                    var rowObject = csvArray[rowIndex] = {};

                    // Then iterate through the remaining properties and use the headers as keys
                    for (var propIndex = 0; propIndex < rowArray.length; ++propIndex){
                        // Grab the value from the row array we're looping through...    
                        var propValue = rowArray[propIndex];
                        var propLabel = csvHeaders[propIndex];
                        
                        // ...also grab the relevant header (the RegExp in both of these removes quotes)
                        rowObject[propLabel.trim()] = propValue;
                    }
            }
            return csvArray;
        } 

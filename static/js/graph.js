queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.json, "data/clinics.json")
        .await(makeGraphs);
        
//*************************************************************************************************
// Map Function   
        function initMap() {
                var map = new google.maps.Map(document.getElementById("services_map"), {
                    zoom: 4,
                    center: {
                        lat: 53.275688,
                        lng: -6.548086
                    }
                })
                var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                //var locations = [
                //    { lat: 53.374805, lng: -6.363206 },
                //    { lat: 53.292195, lng: -6.267867 },
                //    { lat: 53.344039, lng: -6.2651859 },
                //    { lat: 53.2894759, lng: -6.70087 },
                //    { lat: 53.3406686, lng: -6.2637945 },
                //    { lat: 53.3504362, lng: -6.256053 },
                //    { lat: 53.3352058, lng: -6.2503739 },
                //    { lat: 53.3494447, lng: -6.2446355 },
                //    { lat: 53.349634, lng: -6.278271 },
                //    { lat: 53.3263112, lng: -6.2648058 },
                //    { lat: 53.3378396, lng: -6.2661283 },
                //    { lat: 53.3354127, lng: -6.2944968 }
                //]
               function csvToArray(csvString){
                       var locations = [];
                       var csvRows = csvString.split(/\n/);
                       var csvHeaders = csvRows.shift().split(',');

                       for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
                               var rowArray = csvRows[rowIndex].split(',');
                               var rowObject = locations[rowIndex].split(',');

                               for (var peopIndex = 0; propIndex < rowArray.length; ++propIndex){
                                       var propValue = rowArray[propIndex];
                                       var propLabel = csvHeaders[propIndex];
                                       rowObject[proplabel.trim()] = propValue;
                               }
                       }
                       return locations;
                       
               

                var markers = locations.map(function(locations, i) {
                    return new google.maps.Marker({
                        position: locations,
                        label: labels[i % labels.length]
                    });
                });
                var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })
            } }           


//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData){
        var ndx = crossfilter(clinicData);
       // var parseDate =d3.time.format("a% %d/%m/%Y").parse; 
       // clinicData.forEach(function(d){
       //         d.doctors = parseInt(d.doctors);
       //         d.date = parseDate(d.date);
       // });

       show_facility_type_selector(ndx);
       show_facility_type(ndx);
       show_facility_name(ndx);
       show_number_staff(ndx);
       //show_patient_numbers(ndx)       
             
       
       dc.renderAll();
}

//*************************************************************************************************
// Medical facility selector switch (shows number of facilities in the dropdown)

        function show_facility_type_selector(ndx){
        dim = ndx.dimension(dc.pluck('type'));
        group = dim.group()
        dc.selectMenu("#service_type_selector")
                .dimension(dim)
                .group(group);
        }

//*************************************************************************************************
// Medical facility name selector switch (shows specific facility in the dropdown)

function show_facility_name(ndx){
        dim = ndx.dimension(dc.pluck('name'));
        group = dim.group()
        dc.selectMenu("#facility_name_selector")
                .dimension(dim)
                .group(group);
        }


//*************************************************************************************************
// Count of all the medical facilities in a bar chart 
    
function show_facility_type(ndx) {
        var dim = ndx.dimension(dc.pluck('type'));
        var group = dim.group();
        
        dc.barChart("#facility_type")
                .width(350)
                .height(250)
                .margins({top: 10, right: 50, bottom: 30, left: 50})
                .dimension(dim)
                .group(group)
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Facility Type")
                .yAxisLabel("Different Facilities")
                .yAxis().ticks(10);

}
//*************************************************************************************************
// Number of doctors 
function show_number_staff(ndx){
        
        var doctors_dim = ndx.dimension(dc.pluck('name'));
        var nurses_dim = ndx.dimension(dc.pluck('name'));
        var counsellors_dim = ndx.dimension(dc.pluck('name'));
        var number_of_doctors = doctors_dim.group().reduceSum(dc.pluck('staff/doctors'));
        var number_of_nurses = nurses_dim.group().reduceSum(dc.pluck('staff/nurses'));
        var number_of_counsellors = counsellors_dim.group().reduceSum(dc.pluck('staff/counsellor'));

        var stackedChart = dc.barChart("#staff_numbers");
        stackedChart
               .width(1600)
               .height(250)
               .margins({top: 10, right: 50, bottom: 30, left: 50})
               .dimension(doctors_dim)
               .group(number_of_doctors)
               .stack(number_of_nurses)
               .stack(number_of_counsellors)
               .transitionDuration(500)
               .x(d3.scale.ordinal())
               .xUnits(dc.units.ordinal)
               .xAxisLabel("Facilities")
               .yAxisLabel("Doctors")
               .yAxis().ticks(10);
               
}
//*************************************************************************************************
// Number of patients visited

//function show_patient_numbers(ndx) {
//
//var date_dim = ndx.dimension(dc.pluck('date'));
//var patients_per_day = date_dim.group().reduceSum(dc.pluck('name'));
//
//var minDate = date_dim.bottom(1)[0].date;
//var maxDate = date_dim.top(1)[0].date;
//
//dc.lineChart("#number_patients")
//.width(1000)
//.height(300)
//.margins({top: 10, right: 50, bottom: 30, left: 50})
//.dimension(date_dim)
//.group(patients_per_day)
//.transitionDuration(500)
//.x(d3.time.scale().domain([minDate, maxDate]))
//.xAxisLabel("month")
//.yAxis().tics(4);
//}
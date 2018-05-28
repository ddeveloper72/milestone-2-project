queue()
        .defer(d3.csv, "data/clinics.csv")
        .await(makeGraphs);
// load our data from csv file.


//data = clinicData;
$.get('data/clinics.csv', function (clinicData) {
        var map;
        var markers = [];

        var filter;
        var nameDimension;
        var nameGrouping;
        var typeDimension;
        var typeGrouping;
        var charts;
        var domCharts;

        var latDimension;
        var lngDimension;
        var idDimesion;
        var idGrouping;



        function init() {
                initMap();
                initCrossfilter();
                // now it IS a function and it is in global

                // bind map bounds to lat/lng filter dimensions
                latDimension = filter.dimension(function (p) {
                        return p.lat;
                });
                lngDimension = filter.dimension(function (p) {
                        return p.lng;
                });
                google.maps.event.addListener(map, 'bounds_changed', function () {
                        var bounds = this.getBounds();
                        var northEast = bounds.getNorthEast();
                        var southWest = bounds.getSouthWest();

                        lngDimension.filterRange([southWest.lng(), northEast.lng()]);
                        latDimension.filterRange([southWest.lat(), northEast.lat()]);

                        updateCharts();
                });
                // dimension and group for looking up currently selected markers
                idDimension = filter.dimension(function (p, i) {
                        return i;
                });
                idGrouping = idDimension.group(function (id) {
                        return id;
                });
                renderAll();
        }

        function initMap() {
                google.maps.visualRefresh = true;
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

                


                var infoWindowContent = [];

                clinicData = csvToArray(clinicData);
                clinicData.forEach(function (item) {
                        markers.push([item.name, parseFloat(item.lat), parseFloat(item.long)]);
                        infoWindowContent.push([item.type]);

                });
                //console.log(infoWindowContent);

                var infoWindow = new google.maps.InfoWindow(),
                        marker, i;


                for (i = 0; i < markers.length - 1; i++) {
                        //console.log(markers[i][1]);
                        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

                        bounds.extend(position);
                        marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: markers[i][0]
                        });


                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                return function () {
                                        infoWindow.setContent(infoWindowContent[i][0]);
                                        infoWindow.open(map, marker);
                                }
                        })(marker, i));


                        map.fitBounds(bounds);
                }


                var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                        this.setZoom(14);
                        google.maps.event.removeListener(boundsListener);
                });

        }
        initMap();
});

function csvToArray(csvString) {


        var csvArray = [];

        var csvRows = csvString.split(/\n/);


        var csvHeaders = csvRows.shift().split(',');


        for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
                var rowArray = csvRows[rowIndex].split(',');


                var rowObject = csvArray[rowIndex] = {};


                for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {

                        var propValue = rowArray[propIndex];
                        var propLabel = csvHeaders[propIndex];


                        rowObject[propLabel.trim()] = propValue;
                }
        }
        return csvArray;
}

function initCrossfilter(ndx) {
        filter = crossfilter(markers);
}


// Renders the specified chart
function render(method) {
        d3.select(this).call(method);
}


// Renders all of the charts
function updateCharts() {
        domCharts.each(render);
}

// set visibility of markers based on crossfilter
function updateMarkers() {
        var pointIds = idGrouping.all();
        for (var i = 0; i < pointIds.length; i++) {
                var pointId = pointIds[i];
                markers[pointId.key].setVisible(pointId.value > 0);
        }
}
// Whenever the brush moves, re-render charts and map markers
function renderAll() {
        updateMarkers();
        updateCharts();
}

// Reset a particular histogram
window.reset = function (i) {
        charts[i].filter(null);
        renderAll();
};

//*************************************************************************************************
// Crossfilter Function   
function makeGraphs(error, clinicData) {
        // create our crossfilter dimensions
        var ndx = crossfilter(clinicData);



        clinicData.forEach(function (d) {
                d.day = Date.parse(d['date']);
                d.time = parseInt(d['aveWaitingTime']);

        });






        // show our chart objects
        show_facility_type_selector(ndx);
        show_facility_type(ndx);
        show_facility_name(ndx);
        show_number_staff(ndx);
        show_average_waiting_time(ndx);
        //show_patients_per_day(ndx);
        //show_percent_appointments(ndx, "Urgent", "#urgent_appointments");
        //show_percent_appointments(ndx, "Routine", "#routine_appointments");

        console.log(clinicData);
        dc.renderAll();

}
//*************************************************************************************************
// Medical facility selector switch (shows number of facilities in the dropdown)
function show_facility_type_selector(ndx) {


        dim = ndx.dimension(dc.pluck('type'));
        group = dim.group()
        dc.selectMenu("#service_type_selector")
                .dimension(dim)
                .group(group)
        //.multiple(true);
}
//*************************************************************************************************
// Medical facility name selector switch (shows specific facility in the dropdown)

function show_facility_name(ndx) {
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

        dc.pieChart("#facility_type")
                .height(250)
                .radius(90)
                .dimension(dim)
                .group(group)
                .transitionDuration(1500)


}
//*************************************************************************************************
// Number of staff per facility 
function show_number_staff(ndx) {

        var doctors_dim = ndx.dimension(dc.pluck('type'));
        var nurses_dim = ndx.dimension(dc.pluck('type'));
        var counsellors_dim = ndx.dimension(dc.pluck('type'));
        var consultants_dim = ndx.dimension(dc.pluck('type'));


        var number_of_doctors = doctors_dim.group().reduceSum(dc.pluck('staff/doctors'));
        var number_of_nurses = nurses_dim.group().reduceSum(dc.pluck('staff/nurses'));
        var number_of_counsellors = counsellors_dim.group().reduceSum(dc.pluck('staff/counsellor'));
        var number_of_consultants = consultants_dim.group().reduceSum(dc.pluck('staff/consultants'));

        var stackedChart = dc.barChart("#staff_numbers");
        stackedChart
                .width(630)
                .height(250)
                .margins({
                        top: 10,
                        right: 50,
                        bottom: 30,
                        left: 50
                })
                .dimension(dim)
                .group(number_of_doctors, "Doctors")
                .stack(number_of_nurses, "Nurses")
                .stack(number_of_counsellors, "Counselors/Therapists")
                .stack(number_of_consultants, "Consultants")
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .legend(dc.legend().x(500).y(20).itemHeight(15).gap(5))
                .margins({
                        top: 10,
                        right: 100,
                        bottom: 30,
                        left: 30
                })
                .elasticY(true)
                .elasticX(true)
                .xAxisLabel("Facilities")
                .yAxisLabel("Staff")
                .yAxis().ticks(10);


        console.log(show_number_staff);

}
//*************************************************************************************************
// Patient waiting time
function show_average_waiting_time(ndx) {


        var dim = ndx.dimension(dc.pluck('type'));

        function add_item(p, v) {
                p.count++;
                p.total += v.time;
                p.average = p.total / p.count;
                return p;
        }

        function remove_item(p, v) {
                p.count--;
                if (p.count == 0) {
                        p.total = 0;
                        p.average = 0;
                } else {
                        p.total -= v.time;
                        p.average = p.total / p.count;
                }
                return p;
        }

        function initialise() {
                return {
                        count: 0,
                        total: 0,
                        average: 0
                };
        }
        var averageWaitingTimeByClinic = dim.group().reduce(add_item, remove_item, initialise);

        dc.barChart("#ave_waiting_times")
                .width(600)
                .height(250)
                .margins({
                        top: 10,
                        right: 50,
                        bottom: 30,
                        left: 50
                })
                .dimension(dim)
                .group(averageWaitingTimeByClinic, 'Ave Waiting Time')
                .valueAccessor(function (d) {
                        return d.value.average;
                })
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .elasticY(true)
                .elasticX(true)
                .xAxisLabel("Facility")
                .yAxisLabel("Minutes")
                .yAxis().ticks();
}
//*************************************************************************************************
// Patients visits per day
/* function show_patients_per_day(ndx) {

        var dayOfWeek = ndx.dimension(function (d) {
                var day = d.date.getDay();
                var name = ['Sun', 'Mon', 'The', 'Wed', 'Thu', 'Fri', 'Sat'];
                return day + '.' + name[day];
        });
        dayOfWeekChart("#visits_per_day")
                .width(180)
                .height(180)
                .margins({
                        top: 20,
                        left: 10,
                        right: 10,
                        bottom: 20
                })
                .group(dayOfWeekGroup)
                .dimension(dayOfWeek)
                // Assign colors to each value in the x scale domain
                .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
                .label(function (d) {
                        return d.key.split('.')[1];
                })
                // Title sets the row text
                .title(function (d) {
                        return d.value;
                })
                .elasticX(true)
                .xAxis().ticks(4);
} */
//*************************************************************************************************
// Percentage routine vs urgent appointments
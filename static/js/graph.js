queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.csv, "data/dates.csv")
        .await(makeGraphs);
// load our data from csv file.


//data = clinicData;


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
        dc.selectMenu("#facility_name_selector")
                .dimension(dim)
                .group(group)
                .numberVisible();
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
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .legend(dc.legend().x(1540).y(20).itemHeight(15).gap(5))
                .margins({
                        top: 10,
                        right: 100,
                        bottom: 30,
                        left: 30
                })
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
                .xAxisLabel("Facility")
                .yAxisLabel("Minutes")
                .yAxis().ticks(10);
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
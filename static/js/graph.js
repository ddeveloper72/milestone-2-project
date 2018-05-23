queue()
        .defer(d3.csv, "data/clinics.csv")
        //.defer(d3.json, "data/clinics.json")
        .await(makeGraphs);

//data = clinicData;


//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData) {

        var ndx = crossfilter(clinicData);

        clinicData.forEach(function (d) {
                d.time = parseInt(d['aveWaitingTime']);
        })

        show_facility_type_selector(ndx);
        show_facility_type(ndx);
        show_facility_name(ndx);
        show_number_staff(ndx);
        show_average_waiting_time(ndx);


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
                .group(group);
}
//*************************************************************************************************
// Medical facility name selector switch (shows specific facility in the dropdown)

function show_facility_name(ndx) {
        dim = ndx.dimension(dc.pluck('name'));
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
                .margins({
                        top: 10,
                        right: 50,
                        bottom: 30,
                        left: 50
                })
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
                .dimension(doctors_dim)
                .group(number_of_doctors)
                .stack(number_of_nurses)
                .stack(number_of_counsellors)
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .legend(dc.legend().x(1540).y(20).itemHeight(15).gap(5))
                .margins({top: 10, right: 100, bottom: 30, left:30})
                .xAxisLabel("Facilities")
                .yAxisLabel("Staff")
                .yAxis().ticks(10);

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
                .width(350)
                .height(250)
                .margins({
                        top: 10,
                        right: 50,
                        bottom: 30,
                        left: 50
                })
                .dimension(dim)
                .group(averageWaitingTimeByClinic)
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
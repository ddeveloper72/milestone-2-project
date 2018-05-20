queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.json, "data/clinics.json")
        .await(makeGraphs);
        

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
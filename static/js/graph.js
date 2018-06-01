queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.csv, "data/patients_day.csv")
        .await(makeGraphs);



//*************************************************************************************************
// Crossfilter Function   
function makeGraphs(error, clinicData, attendenceData) {
        // create our crossfilter dimensions
        var ndx = crossfilter(clinicData);
        var visits = crossfilter(attendenceData);
        
        


        clinicData.forEach(function (d) {
                
                d.time = +d.aveWaitingTime;
                d.routine = +d.routineAppointments;
                d.urgent = +d.urgentAppointments;
                d.doctors = parseInt(+d['staff/doctors']);
                d.nurses = parseInt(+d['staff/nurses']);
                d.councillors = parseInt(+d['staff/councillors']);
                d.consultants = parseInt(+d['staff/consultants']);
                d.departments = parseInt(+d['departments']);               
                
        });
        



// show our chart objects
        show_facility_type_selector(ndx);
        show_facility_name_selector(ndx);
        show_urgent_pie_type(ndx);
        show_routine_pie_type(ndx);        
        show_number_staff(ndx);
        show_average_waiting_time(ndx);
        show_urgentAppointments_number(ndx);
        show_routineAppointments_number(ndx);
        show_services_number(ndx);
        show_departments(ndx);
        
        

        console.log(clinicData);
        dc.renderAll();


}
//*************************************************************************************************
// Medical facility selector switch (shows number of facilities in the dropdown)
function show_facility_type_selector(ndx) {


        serviceSelectorDim = ndx.dimension(dc.pluck('type'));
        serviceSelectorGroup = serviceSelectorDim.group()
        dc.selectMenu("#service_type_selector")
                .dimension(serviceSelectorDim)
                .group(serviceSelectorGroup)
                .promptText('All Sites');
                
}
//*************************************************************************************************
// Medical facility name selector switch (shows specific facility in the dropdown)

function show_facility_name_selector(ndx) {
        facilitySelectorDim = ndx.dimension(dc.pluck('name'));
        facilitySelectorGroup = facilitySelectorDim.group()
        dc.selectMenu("#facility_name_selector")
                .dimension(facilitySelectorDim)
                .group(facilitySelectorGroup)
                .promptText('Site Names');
}
//*************************************************************************************************
//Total routine appointments
function show_routineAppointments_number(ndx){
        var routineDim = ndx.dimension(dc.pluck('select_all'));

        var totalRoutineAppointmentsGroup = routineDim.group().reduceSum(dc.pluck('routine'));      
       
        dc.numberDisplay("#routine_appointments")
                .formatNumber(d3.format(",f"))
                .group(totalRoutineAppointmentsGroup);
                
}
//*************************************************************************************************
//Total urgent appointments
function show_urgentAppointments_number(ndx){
        var urgentDim = ndx.dimension(dc.pluck('select_all'));

        var totalUrgentAppointments = urgentDim.group().reduceSum(dc.pluck('urgent'));      
       
        dc.numberDisplay("#urgent_appointments")
                .formatNumber(d3.format(",f"))
                .group(totalUrgentAppointments);
                

}

//*************************************************************************************************
// Count of all the urgent appointments at facilities in a pie-chart 

function show_urgent_pie_type(ndx) {
        var urgentDim = ndx.dimension(dc.pluck('type'));

        var totalUrgentAppointments = urgentDim.group().reduceSum(dc.pluck('urgent'));
        dc.pieChart("#urgent_type_pie")
                .height(180)
                .radius(100)
                .dimension(urgentDim)
                .group(totalUrgentAppointments)
                .transitionDuration(1500)
                .innerRadius(20);                            
                

}
//*************************************************************************************************
// Count of all the routine appointments at facilities in a pie-chart 

function show_routine_pie_type(ndx) {
        var routineDim = ndx.dimension(dc.pluck('type'));

        var totalRoutineAppointmentsGroup = routineDim.group().reduceSum(dc.pluck('routine')); 
        dc.pieChart("#routine_type_pie")
                .height(180)
                .radius(100)
                .dimension(routineDim)
                .group(totalRoutineAppointmentsGroup)
                .transitionDuration(1500)
                .innerRadius(20);                
                

}
//*************************************************************************************************
// Number of staff per facility 
function show_number_staff(ndx) {

        var doctorsDim = ndx.dimension(dc.pluck('type'));
        var nursesDim = ndx.dimension(dc.pluck('type'));
        var counsellorsDim = ndx.dimension(dc.pluck('type'));
        var consultantsDim = ndx.dimension(dc.pluck('type'));


        var numberOfDoctorsGroup = doctorsDim.group().reduceSum(dc.pluck('doctors'));
        var numberOfNursesGroup = nursesDim.group().reduceSum(dc.pluck('nurses'));
        var numberOfCounsellorsGroup = counsellorsDim.group().reduceSum(dc.pluck('councillors'));
        var numberOfConsultantsGroup = consultantsDim.group().reduceSum(dc.pluck('consultants'));

        var stackedChart = dc.barChart("#staff_numbers");
        stackedChart
                .width(540)
                .height(250)
                .margins({
                        top: 30,
                        right: 50,
                        bottom: 30,
                        left: 30
                })
                .dimension(doctorsDim)
                .group(numberOfDoctorsGroup, "Doctors")
                .stack(numberOfNursesGroup, "Nurses")
                .stack(numberOfCounsellorsGroup, "Councillors")
                .stack(numberOfConsultantsGroup, "Consultants")
                .transitionDuration(500)
                .renderLabel(true)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .legend(dc.legend().x(75).y(0).horizontal(1).gap(5))
                .elasticY(true)
                .elasticX(true)
                .xAxisLabel("Facility")
                .yAxisLabel("Staff")
                .yAxis().ticks(10);

}
//*************************************************************************************************
// Patient waiting time
function show_average_waiting_time(ndx) {


        var waitingTimeDim = ndx.dimension(dc.pluck('type'));
        var averageWaitingTimeByClinicGroup = waitingTimeDim.group().reduce(add_item, remove_item, initialise);

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
        

        dc.barChart("#ave_waiting_times")
                .width(480)
                .height(250)
                .margins({
                        top: 30,
                        right: 50,
                        bottom: 30,
                        left: 30
                })
                .dimension(waitingTimeDim, 'Ave Waiting Time')
                .group(averageWaitingTimeByClinicGroup)
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
//Available departments
function show_services_number(ndx){
        var servicesDim = ndx.dimension(dc.pluck('type'));
               
        var numberOfServicesGroup = servicesDim.group().reduce(add_item, remove_item, initialise);

        function add_item(p, v) {
                p.count++;
                p.total += v.departments;
                p.average = p.total / p.count;
                return p;
        }

        function remove_item(p, v) {
                p.count--;
                if (p.count == 0) {
                        p.total = 0;
                        p.average = 0;
                } else {
                        p.total -= v.departments;
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

        dc.rowChart("#departments")
        .width(480)
        .height(250)
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .valueAccessor(function (d) {
                return d.value.average;
        })
        .x(d3.scale.ordinal())
        .elasticX(true)
        .dimension(servicesDim)
        .group(numberOfServicesGroup);   

}
//*************************************************************************************************
//Data table
function show_departments(ndx){
        var departmentsDim = ndx.dimension(dc.pluck('name'));

        dc.dataTable("#data-table")
        
        .group(function (d) {return d.fields})
        .size(60)
        .dimension(departmentsDim)
        
        .columns([
                function (d) { return d.name; },
                function (d) { return d.Service1; },
                function (d) { return d.Service2; },
                function (d) { return d.Service3; },
                function (d) { return d.Service4; },
                function (d) { return d.Service5; },
                function (d) { return d.Service6; },
                function (d) { return d.Service7; },
                function (d) { return d.Service8; },
                function (d) { return d.Service9; },
                function (d) { return d.Service10; },
                function (d) { return d.Service11; },
                function (d) { return d.Service12; }
                ])
                .order(d3.descending)
                .on('renderlet', function (table) {
                        table.selectAll('tr.dc-table-group').remove()
                    });
            
}
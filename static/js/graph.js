queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.csv, "data/patients_day.csv")
        .await(makeGraphs)

        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Crossfilter Function                                                                                     //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function makeGraphs(error, clinicData, attendenceData) {

// create our crossfilter dimensions

        var ndx = crossfilter(clinicData); 
        var visits = crossfilter(attendenceData);
        var parseDate = d3.time.format("%d/%m/%Y").parse;
        attendenceData.forEach(function (d){
                d.date = parseDate(d.date);
        });



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
        
        attendenceData.forEach(function (d) {
                d.medClinic = +d.medicalClinic;
                d.medCenter	= +d.medicalCenter;
                d.medHospital	= +d.hospital;
                d.medWalkInClinic = +d.walkInClinic;
                d.medGp = +d.generalPractice;
                d.count = +d.spend;
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
        show_number_visits(visits);
        show_departments(ndx)
        
        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//       
// Console logs used in development                     //
//                                                      //
//      console.log(clinicData);                        //
//      console.log(attendenceData);                    //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 

        dc.renderAll();


}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Medical facility selector switch (shows number of facilities in the dropdown)                            //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_facility_type_selector(ndx) {


        serviceSelectorDim = ndx.dimension(dc.pluck('type'));
        serviceSelectorGroup = serviceSelectorDim.group()
        dc.selectMenu("#service_type_selector")
                .dimension(serviceSelectorDim)
                .group(serviceSelectorGroup)
                .promptText('All Sites');
                
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Medical facility name selector switch (shows specific facility in the dropdown)                          //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_facility_name_selector(ndx) {
        facilitySelectorDim = ndx.dimension(dc.pluck('name'));
        facilitySelectorGroup = facilitySelectorDim.group()
        dc.selectMenu("#facility_name_selector")
                .dimension(facilitySelectorDim)
                .group(facilitySelectorGroup)
                .promptText('Site Names');
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Total routine appointments                                                                               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_routineAppointments_number(ndx){
        var routineDim = ndx.dimension(dc.pluck('select_all'));

        var totalRoutineAppointmentsGroup = routineDim.group().reduceSum(dc.pluck('routine'));      
       
        dc.numberDisplay("#routine_appointments")
                .formatNumber(d3.format(",f"))
                .group(totalRoutineAppointmentsGroup);
                
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Total urgent appointments                                                                                //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_urgentAppointments_number(ndx){
        var urgentDim = ndx.dimension(dc.pluck('select_all'));

        var totalUrgentAppointments = urgentDim.group().reduceSum(dc.pluck('urgent'));      
       
        dc.numberDisplay("#urgent_appointments")
                .formatNumber(d3.format(",f"))
                .group(totalUrgentAppointments);
                

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Count of all the urgent appointments at facilities in a pie-chart                                        //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_urgent_pie_type(ndx) {
        var urgentDim = ndx.dimension(dc.pluck('type'));
        

        var totalUrgentAppointments = urgentDim.group().reduceSum(dc.pluck('urgent'));
        dc.pieChart("#urgent_type_pie")
                             
                .dimension(urgentDim)
                .group(totalUrgentAppointments)
                .transitionDuration(1500)
                .innerRadius(20);                            
                

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Count of all the routine appointments at facilities in a pie-chart                                       //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_routine_pie_type(ndx) {
        var routineDim = ndx.dimension(dc.pluck('type'));

        var totalRoutineAppointmentsGroup = routineDim.group().reduceSum(dc.pluck('routine')); 
        dc.pieChart("#routine_type_pie")
                
                .dimension(routineDim)
                .group(totalRoutineAppointmentsGroup)
                .transitionDuration(1500)
                .innerRadius(20);                
                

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Number of staff per facility                                                                             //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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
                
                .margins({
                        top: 30,
                        right: 50,
                        bottom: 40,
                        left: 35
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Patient waiting time                                                                                     //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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
                
                .margins({
                        top: 30,
                        right: 50,
                        bottom: 40,
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Available departments                                                                                    //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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
        
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .valueAccessor(function (d) {
                return d.value.average;
        })
        .x(d3.scale.ordinal())
        .elasticX(true)
        .dimension(servicesDim)
        .group(numberOfServicesGroup);   

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Patient Numbers per Year Line Chart                                                                      //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_number_visits(visits){

var date_dim = visits.dimension(dc.pluck('date'));
            
var minDate = date_dim.bottom(1)[0].date;
var maxDate = date_dim.top(1)[0].date;

var medClinicDim = date_dim.group().reduceSum(function (d){
        if (d.name === [].medClinic) {
            return +d.medClinic;
        } else {
            return 0;
        }
    });

    var medCenterDim = date_dim.group().reduceSum(function (d){
        if (d.name === [].medCenter) {
            return +d.medCenter;
        } else {
            return 0;
        }
    });

    var medHospitalDim = date_dim.group().reduceSum(function (d){
        if (d.name === [].medHospital) {
            return +d.medHospital;
        } else {
            return 0;
        }
    });

    var medWalkInClinicDim = date_dim.group().reduceSum(function (d){
        if (d.name === [].medWalkInClinic) {
            return +d.medWalkInClinic;
        } else {
            return 0;
        }
    });

    var medGpDim = date_dim.group().reduceSum(function (d){
        if (d.name === [].medGp) {
            return +d.medGp;
        } else {
            return 0;
        }
    });

var compositeChart = dc.compositeChart("#composite-chart"); 
            compositeChart
                
                .dimension(date_dim)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .yAxisLabel("Patients per day")
                .margins({
                        top: 30,
                        right: 50,
                        bottom: 30,
                        left: 45
                })
                .legend(dc.legend().x(75).y(0).horizontal(1).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                dc.lineChart(compositeChart)
                        .colors('pink')
                        .group(medGpDim, 'GP'),
                dc.lineChart(compositeChart)
                        .colors('blue')
                        .group(medHospitalDim, 'Hospital'),
                dc.lineChart(compositeChart)
                        .colors('red')
                        .group(medCenterDim, 'Med Centre'),
                        dc.lineChart(compositeChart)
                        .colors('green')
                        .group(medClinicDim, 'Med Clinic'),
                dc.lineChart(compositeChart)
                        .colors('yellow')
                        .group(medWalkInClinicDim, 'Walk-In')
                    ])
                    .brushOn(false);


}  

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data table                                                                                               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function show_departments(ndx){
        var departmentsDim = ndx.dimension(dc.pluck('name'));
        var chart = dc.dataTable('#table_data')
        
        .group(function (d) {return d.fields})
        .size(Infinity)
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
        .order(d3.ascending)

        // modification to include pagination
        .on('preRender', update_offset)
        .on('preRedraw', update_offset)
        .on('pretransition', display)
        
        .on('renderlet', function (table) {
                table.selectAll('tr.dc-table-group').remove();
        })
        update();
        
        chart.render();
        dc.renderAll;       
        
        

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data table pagination.  Adapted from reference material from https://dc-js.github.io/dc.js/              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


        var chart;
        var ndx;              
        var ofs = 0, pag = 10;

        // modification to modification to make function accessible from user interface
        document.getElementById("last").onclick = last; 
        document.getElementById("next").onclick = next;

        function update_offset() {
                var totFilteredRecs = ndx.groupAll().value();
                var end = ofs + pag > totFilteredRecs ? totFilteredRecs : ofs + pag;
                ofs = ofs >= totFilteredRecs ? Math.floor((totFilteredRecs - 1) / pag) * pag : ofs;
                ofs = ofs < 0 ? 0 : ofs;
                chart.beginSlice(ofs);
                chart.endSlice(ofs+pag);
        }
        function display() {

                d3.select("#begin")
                .text(ofs);
                d3.select("#end")
                .text(ofs+pag-1);
                d3.select("#last")
                .attr('disabled', ofs-pag<0 ? 'true' : null);

                // modification to access clinicData
                d3.select("#next")
                .attr('disabled', ofs+pag>=ndx.size() ? 'true' : null);
                d3.select("#size").text(ndx.size());
        }
        function update() {
                    chart.beginSlice(ofs);
                    chart.endSlice(ofs+pag);
                display();
        }
        function next() {
                ofs += pag;
                update();
                chart.redraw();
        }
        function last() {
                ofs -= pag;
                update();
                chart.redraw();
        }

}           
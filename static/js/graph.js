queue()
        .defer(d3.csv, "data/clinics.csv")
        .defer(d3.csv, "data/patients_day.csv")
        .await(makeGraphs)

        $(document).ready(function() {
                $('data_table').DataTable();
                
            } );

//*************************************************************************************************
// Crossfilter Function   
function makeGraphs(error, clinicData, attendenceData) {
        // create our crossfilter dimensions
        var ndx = crossfilter(clinicData);
        var visits = crossfilter(attendenceData);
        var parseDate = d3.time.format("%d/%m/%Y").parse;
        attendenceData.forEach(function (d){
                d.date = parseDate(d.date);
        });

        
//set-up the crossfilter for clinicData
        d3.csv("data/clinics.csv").then(function(clinicData) {
                ndx              = crossfilter(clinicData);

                //setup the names and id's for all the charts
        var serviceSelector = dc.selectMenu("#service_type_selector");
        var facilitySelector = dc.selectMenu("#facility_name_selector");
        var routineNumber = dc.numberDisplay("#routine_appointments");
        var urgentNumber = dc.numberDisplay("#urgent_appointments");
        var urgentPie = dc.pieChart("#urgent_type_pie");
        var routinePie = dc.pieChart("#routine_type_pie");
        var stackedStaff = dc.barChart("#staff_numbers");
        var waitTimesBar = dc.barChart("#ave_waiting_times");
        var departmentRow = dc.rowChart("#departments");
        // define chart as a GLOBAL VARIABLE, so that it can be used to paginate the chart which 
        // has to be available to index.html.
        chart = dc.dataTable("#data-table");
        
        
        

       

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

        

        console.log(clinicData);
        
        

//set-up the chart dimensions
// Medical facility selector switch (shows number of facilities in the dropdown)        
        var serviceSelectorDim = ndx.dimension(dc.pluck('type'));
        var serviceSelectorGroup = serviceSelectorDim.group()

        var facilitySelectorDim = ndx.dimension(dc.pluck('name'));
        var facilitySelectorGroup = facilitySelectorDim.group()

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
        
        
        

        var urgentDim = ndx.dimension(dc.pluck('select_all'));
        var totalUrgentAppointmentsGroup = urgentDim.group().reduceSum(dc.pluck('urgent')); 

        var urgentPieDim = ndx.dimension(dc.pluck('type'));
        var UrgentAppointments = urgentPieDim.group().reduceSum(dc.pluck('urgent'));

        var routinePieDim = ndx.dimension(dc.pluck('type'));
        var RoutineAppointments = routinePieDim.group().reduceSum(dc.pluck('routine'));

        var doctorsDim = ndx.dimension(dc.pluck('type'));
        var nursesDim = ndx.dimension(dc.pluck('type'));
        var counsellorsDim = ndx.dimension(dc.pluck('type'));
        var consultantsDim = ndx.dimension(dc.pluck('type'));
        var numberOfDoctorsGroup = doctorsDim.group().reduceSum(dc.pluck('doctors'));
        var numberOfNursesGroup = nursesDim.group().reduceSum(dc.pluck('nurses'));
        var numberOfCounsellorsGroup = counsellorsDim.group().reduceSum(dc.pluck('councillors'));
        var numberOfConsultantsGroup = consultantsDim.group().reduceSum(dc.pluck('consultants'));

        var servicesDim = ndx.dimension(dc.pluck('type'));        
        var departmentsDim = ndx.dimension(dc.pluck('name'));

        



 //*************************************************************************************************
// Medical facility selector switch (shows number of facilities in the dropdown)       
        serviceSelector
                .dimension(serviceSelectorDim)
                .group(serviceSelectorGroup)
                .promptText('All Sites');
                serviceSelector.render();

//*************************************************************************************************
// Medical facility name selector switch (shows specific facility in the dropdown)

        facilitySelector
                .dimension(facilitySelectorDim)
                .group(facilitySelectorGroup)
                .promptText('Site Names');
                facilitySelector.render();

//*************************************************************************************************
//Total routine appointments     

        routineNumber
                .formatNumber(d3.format(",.2r"))
                .group(totalRoutineAppointmentsGroup);
                routineNumber.render();


//*************************************************************************************************
//Total urgent appointments       

        urgentNumber
                .formatNumber(d3.format(",.2r"))
                .group(totalUrgentAppointmentsGroup);
                urgentNumber.render();

//*************************************************************************************************
// Count of all the urgent appointments at facilities in a pie-chart 

        urgentPie
                .height(180)
                .radius(120)
                .dimension(urgentPieDim)
                .group(UrgentAppointments)
                .transitionDuration(1500)
                .innerRadius(20);
                urgentPie.render();

 //*************************************************************************************************
// Count of all the routine appointments at facilities in a pie-chart 

        routinePie
                .height(180)
                .radius(120)
                .dimension(routinePieDim)
                .group(RoutineAppointments)
                .transitionDuration(1500)
                .innerRadius(20);
                routinePie.render();

//*************************************************************************************************
// Number of staff per facility 

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
                /* .width(540)
                .height(250) */
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
                .x(d3.scaleBand())
                .xUnits(dc.units.ordinal)
                .legend(dc.legend().x(75).y(0).horizontal(1).gap(5))
                .elasticY(true)
                .elasticX(true)
                .xAxisLabel("Facility")
                .yAxisLabel("Staff")
                .yAxis().ticks(10);
                stackedStaff.render();

//*************************************************************************************************
// Patient waiting time             
        
        var waitingTimeDim = ndx.dimension(dc.pluck('type'));
        
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
        
                var averageWaitingTimeByClinicGroup = waitingTimeDim.group().reduce(add_item, remove_item, initialise);

                waitTimesBar
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
                        .x(d3.scaleBand())
                        .xUnits(dc.units.ordinal)
                        .elasticY(true)
                        .elasticX(true)
                        .xAxisLabel("Facility")
                        .yAxisLabel("Minutes")
                        .yAxis().ticks();
                        waitTimesBar.render();

        dc.barChart("#ave_waiting_times")
                /* .width(480)
                .height(250) */
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
                                p.averageDepts = p.total / p.count;
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
                
                var numberOfServicesGroup = servicesDim.group().reduce(add_item, remove_item, initialise);

                departmentRow
                        .width(480)
                        .height(250)
                        .margins({
                                top: 10,
                                left: 10,
                                right: 10,
                                bottom: 20
                        })
                        .valueAccessor(function (d) {
                                return d.value.average;
                        })
                        .x(d3.scaleBand())
                        .elasticX(true)
                        .dimension(servicesDim)
                        .group(numberOfServicesGroup);
                        departmentRow.render();
                
//*************************************************************************************************
//Data table             



                var departmentsDim = ndx.dimension(dc.pluck('name'));
                chart     
                          
                        .dimension(departmentsDim)
                        .size(Infinity)
                        .group(function (d) {
                                return d.fields
                        })
                        .columns([
                                function (d) {
                                        return d.name;
                                },
                                function (d) {
                                        return d.Service1;
                                },
                                function (d) {
                                        return d.Service2;
                                },
                                function (d) {
                                        return d.Service3;
                                },
                                function (d) {
                                        return d.Service4;
                                },
                                function (d) {
                                        return d.Service5;
                                },
                                function (d) {
                                        return d.Service6;
                                },
                                function (d) {
                                        return d.Service7;
                                },
                                function (d) {
                                        return d.Service8;
                                },
                                function (d) {
                                        return d.Service9;
                                },
                                function (d) {
                                        return d.Service10;
                                },
                                function (d) {
                                        return d.Service11;
                                },
                                function (d) {
                                        return d.Service12;
                                }
                        ])
                        .order(d3.descending)
                        .on('renderlet', function (table) {
                                table.selectAll('tr.dc-table-group').remove()

                        });
                        update();
                        chart.render();

});   


//set-up the pagination for Data table.  The button controls come from the index.html   

        var chart;
        var ndx;
        
        var ofs = 0, pag = 11;
        function display() {
              d3.select("#begin")
                  .text(ofs);
              d3.select("#end")
                  .text(ofs+pag-1);
              d3.select("#last")
              .attr('disabled', ofs-pag<0 ? 'true' : null);
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
        
        
          
  

//set-up the crossfilter for attendenceData

        dc.rowChart("#departments")
        /* .width(480)
        .height(250) */
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .valueAccessor(function (d) {
                return d.value.average;
        })
        .x(d3.scale.ordinal())
        .elasticX(true)
        .dimension(servicesDim)
        .group(numberOfServicesGroup);   

//*************************************************************************************************
//Patient Numbers per Year Line Chart        

var medGpDim = date_dim.group().reduceSum(function (d) {
        if (d.name === [].medGp) {
                return +d.medGp;
        } else {
                return 0;
        }

        
});

var medHospitalDim = date_dim.group().reduceSum(function (d) {
        if (d.name === [].medHospital) {
                return +d.medHospital;
        } else {
                return 0;
        }
});

var medCenterDim = date_dim.group().reduceSum(function (d) {
        if (d.name === [].medCenter) {
                return +d.medCenter;
        } else {
                return 0;
        }
});

var medClinicDim = date_dim.group().reduceSum(function (d) {
        if (d.name === [].medClinic) {
                return +d.medClinic;
        } else {
                return 0;
        }
});

var medWalkInClinicDim = date_dim.group().reduceSum(function (d) {
        if (d.name === [].medWalkInClinic) {
                return +d.medWalkInClinic;
        } else {
                return 0;
        }
});


var compositeChart = dc.compositeChart("#composite-chart"); 
            compositeChart
                /* .width(540)
                .height(250) */
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
                        .colors('yellow')
                        .group(medWalkInClinicDim, 'Walk-In')
                    ])
                    .brushOn(false);


}  
//*************************************************************************************************
//Data table
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
        .on('preRender', update_offset)
        .on('preRedraw', update_offset)
        .on('pretransition', display)
        .on('renderlet', function (table) {
                table.selectAll('tr.dc-table-group').remove();
        })
        update();
        /* chart.beginSlice(ofs);
        chart.endSlice(ofs+pag); */
        chart.render();
        dc.renderAll;       
        
        

//*************************************************************************************************
//Data table pagination


        var chart;
        var ndx;              
        var ofs = 0, pag = 10;
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

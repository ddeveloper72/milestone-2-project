queue()
        .defer(d3.csv, "data/clinics.csv")
        .await(makeGraphs);


//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData){
       var ndx = crossfilter(clinicData);
       
       show_facility_type_selector(ndx);
       show_facility_type(ndx);       
       
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

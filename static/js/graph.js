queue()
        .defer(d3.json, "data/clinics.json")
        .await(makeGraphs);

//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData){
        var ndx = crossfilter(clinicData);

        show_staff_balance(ndx);

        dc.renderAll();

}

function show_staff_balance(ndx){
        var dim = ndx.dimension(dc.pluck('staff'));
        var group = dim.group();

        dc.barChart("#staff-profile")
                .width(350)
                .height(250)
                .margins({top: 10, right: 50, bottom: 30, left: 50})
                .dimension(dim)
                .group(group)
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Staff")
                .yAxisLabel("Number of Staff")
                .yAxis().ticks(20);

}
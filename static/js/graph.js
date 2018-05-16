queue()
        .defer(d3.csv, "data/clinics.csv")
        .await(makeGraphs);


//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData){
        var data = clinicData; // Puts my data into console, so I can drill-down through it and find stuff.
        var ndx = crossfilter(clinicData);
        console.log(data);
        
        data = 
        show_staff_balance_1(ndx);
        

        dc.renderAll();

}

//*************************************************************************************************
// Balance of staff member types to each clinic (doctors, nurses & consultants) 

function show_staff_balance_1(ndx){
        
        var dim = ndx.dimension(dc.pluck([].doctors)
      
        
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
                .yAxis().ticks(10);

}


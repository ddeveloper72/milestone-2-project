queue()
        .defer(d3.json, "data/patient_visits.json")
        .await(makeGraphs);

//*************************************************************************************************
// Cross filter Function   
function makeGraphs(error, clinicData){

}

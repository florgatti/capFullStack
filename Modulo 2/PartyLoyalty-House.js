
fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
method: 'get',
headers: {
  "X-API-Key": "txzGVrWVprhOc2dga7WSWsdN4f8j4bEd36TnQjjN"
  }
})
.then(res =>  res.json())
.then (data =>{
    var house = data;
    var h = house.results[0].members
    
      applyData(h);
    


})

function applyData (h) {
 
  h.sort(function (a, b) {
    
    let am = a.votes_with_party_pct || 0;
    let bm = b.votes_with_party_pct || 0;
  
    if (am > bm) {
      return 1;
    } 
    if (am < bm) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  
 
  grdData(h);

  leastEngData(h);
  
  topEngData(h);
}






function grdData(members){
  var table_content = "<tr><th>Party</th><th>No. of Reps.</th><th>% Voted w/ Party</th></tr>";

  var data = membersData(members);

  table_content += 
                "<tr><td> Democrats </td> <td> " + data.repsDemocrats + "</td><td>" + data.porcDemocrats + "%</td></tr>" + 
                "<tr><td> Republicans </td> <td>" + data.repsRepublican + "</td><td>" + data.porcRepublican + "%</td></tr>" +
                "<tr><td> Independents </td> <td>" + data.repsIndependent + "</td><td>" + data.porcIndependent + "%</td></tr>" + 
                "<tr><td> Total </td> <td>" + data.repsTotal + "</td> <td> </td> </tr>" ;

  document.getElementById("senate-data").innerHTML = table_content;
  
}

function membersData(members){

  var p;
  var repsDemocrats = 0;
  var repsRepublican = 0; 
  var repsIndependent = 0;
  var porcDemocrats = 0;
  var porcRepublican = 0; 
  var porcIndependent = 0;
  var total;

  for(var i = 0; i < members.length; i++) {
    p = members[i].party;
  
    if (p==="D"){
      repsDemocrats++;
      porcDemocrats += members[i].votes_with_party_pct || 0;
    } else if (p==="I"){
      repsIndependent++;
      porcIndependent += members[i].votes_with_party_pct || 0;
    } else if (p==="R") {
      repsRepublican++;
      porcRepublican += members[i].votes_with_party_pct || 0;
    }
    
  }       

  total = porcDemocrats + porcRepublican + porcIndependent;
  porcDemocrats = Math.round(porcDemocrats/repsDemocrats) ;
  porcRepublican = Math.round(porcRepublican/repsRepublican); 
  porcIndependent = Math.round(porcIndependent/repsIndependent) || 0;


  return {
          'repsDemocrats': repsDemocrats,
          'repsRepublican': repsRepublican, 
          'repsIndependent': repsIndependent,
          'repsTotal': repsDemocrats + repsIndependent + repsRepublican,
          'porcDemocrats': porcDemocrats,
          'porcRepublican': porcRepublican, 
          'porcIndependent': porcIndependent,
          'porcTotal': total
      };

}







  function leastEngData(members){
  var table_content = "<tr><th>Name</th><th class='text-center'>No. Party Votes</th><th class='text-center'>% Party Votes</th>";
  var h;
  var name;
  

  
  for(var i = 0; i < members.length/10; i++) {
      
    h = members[i];
    if (h.total_votes == null){
        h.total_votes = 0;
    }
    if (h.votes_with_party_pct == undefined){
        h.votes_with_party_pct = 0;
    }
    name =  h.first_name + " " + (h.middle_name || "") + " " + h.last_name;
    table_content += "<tr>" + 
                "<td> <a href=" + h.url + ">" + name + "</a></td>" + 
                "<td class='text-center'>" + h.total_votes + "</td>" + 
                "<td class='text-center'>" + h.votes_with_party_pct + "%</td>" + 
            "<tr>";
  }

  document.getElementById("leastEngaged-data").innerHTML = table_content;
}



function topEngData(members){
  var table_content = "<tr><th>Name</th><th class='text-center'>No. Party Votes</th><th class='text-center'>% Party Votes</th>";
  var h;
  var name;

  
  for(var i = members.length-1 ; i >= members.length*90/100 ; i--) {
    h = members[i];
    if (h.total_votes == null){
        h.total_votes = 0;
    }
    if (h.votes_with_party_pct == undefined){
        h.votes_with_party_pct = 0;
    }
    name =  h.first_name + " " + (h.middle_name || "") + " " + h.last_name;
    table_content += "<tr>" + 
                "<td> <a href=" + h.url + ">" + name + "</a></td>" + 
                "<td class='text-center'>" + h.total_votes + "</td>" + 
                "<td class='text-center'>" + h.votes_with_party_pct + "%</td>" + 
            "<tr>";
  }

    document.getElementById("topEngaged-data").innerHTML = table_content;
  }



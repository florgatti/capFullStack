var h = house.results[0].members

h.sort(function (a, b) {

    let am = a.missed_votes_pct || 0;
    let bm = b.missed_votes_pct || 0;

    if (am > bm) {
      return 1;
    } 
    if (am < bm) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

grdData(house.results[0].members);

leastEngData(house.results[0].members);

topEngData(h);

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

  var h;
  var repsDemocrats = 0;
  var repsRepublican = 0; 
  var repsIndependent = 0;
  var porcDemocrats = 0;
  var porcRepublican = 0; 
  var porcIndependent = 0;
  var total;

  for(var i = 0; i < members.length; i++) {
    h = members[i].party;
  
    if (h==="D"){
      repsDemocrats++;
      porcDemocrats += members[i].votes_with_party_pct || 0;
    } else if (h==="I"){
      repsIndependent++;
      porcIndependent += members[i].votes_with_party_pct || 0;
    } else if (h==="R") {
      repsRepublican++;
      porcRepublican += members[i].votes_with_party_pct || 0;
    }
    
  }       

  porcDemocrats = Math.round(porcDemocrats / repsDemocrats) ;
  porcRepublican = Math.round(porcRepublican / repsRepublican); 
  porcIndependent = Math.round(porcIndependent / repsIndependent || 0);

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
var table_content = "<tr><th>Name</th><th class='text-center'>No. Missed Votes</th><th class='text-center'>% Missed Votes</th>";
var h;
var name;

for(var i = 0; i < members.length/10; i++) {
  h = members[i];
  if (h.missed_votes == null){
      h.missed_votes = 0;
  }
  if (h.missed_votes_pct == undefined){
      h.missed_votes_pct = 0;
  }
  
  name =  h.first_name + " " + (h.middle_name || "") + " " + h.last_name;
  table_content += "<tr>" + 
              "<td> <a href=" + h.url + ">" + name + "</a></td>" + 
              "<td class='text-center'>" + h.missed_votes + "</td>" + 
              "<td class='text-center'>" + h.missed_votes_pct + "%</td>" + 
          "<tr>";
}

document.getElementById("leastEngaged-data").innerHTML = table_content;
}



function topEngData(members){
var table_content = "<tr><th>Name</th><th class='text-center'>No. Missed Votes</th><th class='text-center'>% Missed Votes</th>";
var h;
var name;


for(var i = members.length-1 ; i >= members.length*90/100-1 ; i--) {
  h = members[i];
  if (h.missed_votes == null){
      h.missed_votes = 0;
  }
  if (h.missed_votes_pct == undefined){
      h.missed_votes_pct = 0;
  }
  name =  h.first_name + " " + (h.middle_name || "") + " " + h.last_name;
  table_content += "<tr>" + 
              "<td> <a href=" + h.url + ">" + name + "</a></td>" + 
              "<td class='text-center'>" + h.missed_votes + "</td>" + 
              "<td class='text-center'>" + h.missed_votes_pct + "%</td>" + 
          "<tr>";
}

document.getElementById("topEngaged-data").innerHTML = table_content;
}


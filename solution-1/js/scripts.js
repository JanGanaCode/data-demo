fetch('https://gist.githubusercontent.com/paulccarey/cc04492efb89fe1400e814fa2377d773/raw/0d07fc4535b8e8aedbc4b2c51ef2b1a0a6140f52/matched_jobs.json')
.then(function(response) {
    return response.json();
  })
  .then(function(myJson) {

  for(let job in myJson.jobs) {
    let statusString = myJson.jobs[job].status;

    let newJobDiv = document.createElement('div');
    newJobDiv.setAttribute('class', 'jobBox col-lg-4 col-md-6 col-sm-6 col-12');

    let jobDescription =  '<h2>' + myJson.jobs[job].title + '</h2>'  + '<br>' +
                          '<span>' + '<em>Location: </em>' + myJson.jobs[job].location + '</span>' + '<br>' +
                          '<span>' + '<em>Status: </em>' + statusString.replace('position_', '').toUpperCase() + '</span>' + '<br>' +
                          
                          '<span>' + '<em>Placed By: </em>' + myJson.recruiters[myJson.jobs[job].placed_by].name + '</span>' + '<br>' +
                          '<span>' + '<em>Filled Jobs: </em>' + myJson.recruiters[myJson.jobs[job].placed_by].filled_job_count + '</span>' + '<br>' +
                          '<span>' + '<em>Live Jobs: </em>' + myJson.recruiters[myJson.jobs[job].placed_by].live_job_count + '</span>' + '<br>' +
                          '<span>' + '<em>Recruiter Rating: </em>' + myJson.recruiters[myJson.jobs[job].placed_by].rating + '</span>'

    newJobDiv.insertAdjacentHTML("beforeend", `${jobDescription} <br>`)

    document.getElementById('row').appendChild(newJobDiv);
            
    }
  }
);
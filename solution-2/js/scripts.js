fetch('https://gist.githubusercontent.com/paulccarey/cc04492efb89fe1400e814fa2377d773/raw/0d07fc4535b8e8aedbc4b2c51ef2b1a0a6140f52/matched_jobs.json')
.then(function(response) {
    return response.json();
  })
  .then(function(myJson) {

    for(let job in myJson.jobs) {
        let statusString = myJson.jobs[job].status;

        document.write( 
            '<div style="margin: 30px 0;">' +
                '<strong>Job Title:</strong> ' + myJson.jobs[job].title + '<br>',
                '<strong>Location:</strong> ' + myJson.jobs[job].location + '<br>',
                '<strong>Salary:</strong> ' + myJson.jobs[job].salary + '£' + '<br>',
                '<strong>Status:</strong> ' + statusString.replace('position_', '').toUpperCase() + '<br>',

                '<strong>Recruiter:</strong> ' + myJson.recruiters[myJson.jobs[job].placed_by].name + '<br>',
                '<strong>Live jobs:</strong> ' + myJson.recruiters[myJson.jobs[job].placed_by].live_job_count + '<br>',
                '<strong>Filled jobs:</strong> ' + myJson.recruiters[myJson.jobs[job].placed_by].filled_job_count + '<br>',
                '<strong>Rating:</strong> ' + myJson.recruiters[myJson.jobs[job].placed_by].rating + '<br>' 
            + '</div>' + '<hr>'
        )
    }

    document.close();
    
  }
);

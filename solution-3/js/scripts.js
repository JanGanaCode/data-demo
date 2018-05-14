// get the data
fetch("https://gist.githubusercontent.com/paulccarey/cc04492efb89fe1400e814fa2377d773/raw/0d07fc4535b8e8aedbc4b2c51ef2b1a0a6140f52/matched_jobs.json")

  // parse JSON
  .then(function(response) {
    return response.json();
  })

  // callback function
  .then(function(myJson) {
  
    for(let job in myJson.jobs) {
      // replace position from string
      let statusString = myJson.jobs[job].status;

      // create a job div
      let newJobDiv = document.createElement("div");

      // job div content
      let jobDescription =  `
                              <div class="job">
                                <h2>${myJson.jobs[job].title}</h2>
                                <div class="location">
                                  <i class="fas fa-map-marker"></i> 
                                  ${myJson.jobs[job].location}
                                </div>
                                
                                <div class="recruiter">
                                  <em>by</em> 
                                  ${myJson.recruiters[myJson.jobs[job].placed_by].name}
                                </div>
                                <span>${statusString.replace("position_", " ").toUpperCase()}</span>

                              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${myJson.jobs[job].placed_by}">
                                More info
                              </button>
                              </div>

                              <div class="modal fade" id="${myJson.jobs[job].placed_by}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel"><em>Job title:</em> ${myJson.jobs[job].title}</h5>
                                    </div>
                                    <div class="modal-body">
                                      <div><em>Location:</em> ${myJson.jobs[job].location}</div>
                                      <div><em>Salary:</em> ${myJson.jobs[job].salary}£</div>
                                      <div><em>Status:</em> ${myJson.jobs[job].status.replace("position_", "").toUpperCase()}</div>
                                      <div><em>Filled By:</em> ${myJson.recruiters[myJson.jobs[job].placed_by].name}</div>
                                      <div><em>Recruiter's Live Jobs:</em> ${myJson.recruiters[myJson.jobs[job].placed_by].live_job_count}</div>
                                      <div><em>Recruiter's Filled Jobs:</em> ${myJson.recruiters[myJson.jobs[job].placed_by].filled_job_count}</div>
                                      <div><em>Recruiter Rating:</em> ${myJson.recruiters[myJson.jobs[job].placed_by].rating}</div>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>
                            `;

      // add job status classes
      if(myJson.jobs[job].status === "closed"){
        newJobDiv.setAttribute("class", "all closed col-lg-4");
      } else if (myJson.jobs[job].status === "position_filled"){
        newJobDiv.setAttribute("class", "all filled col-lg-4");
      } else {
        newJobDiv.setAttribute("class", "all expired col-lg-4");
      }

      // add content to the job div
      newJobDiv.innerHTML = jobDescription;

      // add job div to the website
      document.getElementById("jobList").appendChild(newJobDiv);
    }
  }
);

// selection
$(function() {
  $('#choice').change(function(){
    $('.all').hide();
    $('.' + $(this).val()).show();
  });
});


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
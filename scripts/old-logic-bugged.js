// TODO: Fix the button disappearing bug for this logic.

// Querying all the required HTML elements
const searchEle = document.querySelector('#search');
const appNameELe = document.getElementById('app-name');
const appForEle = document.getElementById('app-for');
const imgELe = document.querySelector('.icon');
const phoneEle = document.getElementById('phone-no');
const emailEle = document.getElementById('email');
const socialEle = document.getElementById('social-link');
const skillEle = document.getElementById('skill');
const hobbyEle = document.getElementById('hobby');
const companyNameEle = document.getElementById('company-name');
const companyPositionEle = document.getElementById('position');
const companyStartDateEle = document.getElementById('start-date');
const companyEndDateEle = document.getElementById('end-date');
const companySummaryEle = document.getElementById('summary');
const projectEle = document.getElementById('project');
const ugEle = document.getElementById('ug');
const puEle = document.getElementById('pu');
const highSchoolEle = document.getElementById('high-school');
const internNameEle = document.getElementById('intern-name');
const internPositionEle = document.getElementById('intern-position');
const internStartEle = document.getElementById('intern-start');
const internEndEle = document.getElementById('intern-end');
const internSummaryEle = document.getElementById('intern-summary');
const achievementEle = document.getElementById('achievement');
const pipeEle = document.querySelector('.search-area span');
const previousBtnEle = document.getElementById('previous');
const nextBtnEle = document.getElementById('next');
const currentPageEle = document.getElementById('current-page');
const totalPagesEle = document.getElementById('total-pages');
const resumeheadingEle = document.querySelector('.resume-heading');
const containerEle = document.querySelector('.container');
const noResultEle = document.querySelector('.no-result');

fetchResumes();

// Fetching the resumes from the JSON file
function fetchResumes() {
    fetch("./data/Data.json")
        .then((response) => response.json())
        .then((resumesList) => filterResumes(resumesList));
}

// Filtering resumes based on job role comparing with user input
function filterResumes(resumesList) {
    let tempArraywithDup = resumesList.resume.map(element => element.basics.AppliedFor);
    let jobsArray = [...new Set(tempArraywithDup)];
    const isEmpty = str => !str.trim().length;
    
    if(isEmpty(searchEle.value)) selectResume(resumesList.resume);

    searchEle.addEventListener("input", function() {
        let filteredArray = [];
        let arrToSend = [];
        let userInp = this.value.toLowerCase();

        for(let i = 0; i < jobsArray.length; i++) {
            let isInputPresent = jobsArray[i].toLowerCase().includes(userInp);

            if(isInputPresent) {
                filteredArray = resumesList.resume.filter( element => {
                    return element.basics.AppliedFor == jobsArray[i];
                });

                arrToSend = arrToSend.concat(filteredArray);
            }
        }

        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';

        // selectResume(arrToSend);
        
        if (arrToSend.length != 0) selectResume(arrToSend);
        else {
            noResultEle.style.display = "flex";
            resumeheadingEle.style.visibility = "hidden";
            containerEle.style.visibility = "hidden";
            pipeEle.style.visibility = "hidden";
            previousBtnEle.style.visibility = "hidden";
            nextBtnEle.style.visibility = "hidden";

            currentPageEle.innerHTML = 0;
            totalPagesEle.innerHTML = 0;
        }
    });
}

// Selecting a particular resume from the filtered resumes
function selectResume(resumeArray) {
    let firstResume = 0;
    let lastResume = resumeArray.length - 1;
    let currentResume = 0;

    noResultEle.style.display = "none";
    resumeheadingEle.style.visibility = "visible";
    containerEle.style.visibility = "visible";
    pipeEle.style.visibility = "visible";
    previousBtnEle.style.visibility = "hidden";

    if(currentResume == lastResume) nextBtnEle.style.visibility = "hidden";
    else nextBtnEle.style.visibility = "visible";
    
    currentPageEle.innerHTML = currentResume + 1;
    totalPagesEle.innerHTML = lastResume + 1;

    updateDetails(resumeArray, currentResume);

    nextBtnEle.addEventListener("click", () => {
        currentResume++;

        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';

        if(currentResume == lastResume) nextBtnEle.style.visibility = "hidden";
        previousBtnEle.style.visibility = "visible";

        currentPageEle.innerHTML = currentResume + 1;
        
        updateDetails(resumeArray, currentResume);
    });

    previousBtnEle.addEventListener("click", () => {
        currentResume--;

        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';
        
        if(currentResume == firstResume) previousBtnEle.style.visibility = "hidden";
        nextBtnEle.style.visibility = "visible";

        currentPageEle.innerHTML = currentResume + 1;
        
        updateDetails(resumeArray, currentResume);
    });
}

// Displaying the details of a particular resume on the page
function updateDetails(resumesArray, resumeNo) {
    appNameELe.innerHTML = resumesArray[resumeNo].basics.name;

    appForEle.innerHTML = `Applied For: ${resumesArray[resumeNo].basics.AppliedFor}`;

    // Replace default image if present in the JSON file
    // imgELe.innerHTML = `<img src="${resumesArray[resumeNo].basics.image}" alt="Loading...">`

    phoneEle.innerHTML = resumesArray[resumeNo].basics.phone;

    emailEle.innerHTML = resumesArray[resumeNo].basics.email;

    socialEle.href = resumesArray[resumeNo].basics.profiles.url;

    socialEle.innerHTML = resumesArray[resumeNo].basics.profiles.network;

    resumesArray[resumeNo].skills.keywords.forEach(element => {
        skillEle.innerHTML += `<li class="content">${element}</li>`;
    });

    resumesArray[resumeNo].interests.hobbies.forEach(element => {
        hobbyEle.innerHTML += `<li class="content">${element}</li>`;
    });

    companyNameEle.innerHTML = `<strong>Company Name:</strong> ${resumesArray[resumeNo].work['Company Name']}`;

    companyPositionEle.innerHTML = `<strong>Position:</strong> ${resumesArray[resumeNo].work['Position']}`;

    companyStartDateEle.innerHTML = `<strong>Start Date:</strong> ${resumesArray[resumeNo].work['Start Date']}`;

    companyEndDateEle.innerHTML = `<strong>End Date:</strong> ${resumesArray[resumeNo].work['End Date']}`;

    companySummaryEle.innerHTML = `<strong>Summary:</strong> ${resumesArray[resumeNo].work['Summary']}`;

    projectEle.innerHTML = `<strong>${resumesArray[resumeNo].projects.name}:</strong> ${resumesArray[resumeNo].projects.description}`;

    ugEle.innerHTML = `<strong>UG:</strong> ${resumesArray[resumeNo].education.UG.institute}, ${resumesArray[resumeNo].education.UG.course}, ${resumesArray[resumeNo].education.UG['Start Date']}, ${resumesArray[resumeNo].education.UG['End Date']}, ${resumesArray[resumeNo].education.UG.cgpa}`;

    puEle.innerHTML = `<strong>PU:</strong> ${resumesArray[resumeNo].education['Senior Secondary'].institute}, ${resumesArray[resumeNo].education['Senior Secondary'].cgpa}`;

    highSchoolEle.innerHTML = `<strong>PU:</strong> ${resumesArray[resumeNo].education['High School'].institute}, ${resumesArray[resumeNo].education['High School'].cgpa}`;

    internNameEle.innerHTML = `<strong>Company Name:</strong> ${resumesArray[resumeNo].Internship['Company Name']}`;

    internPositionEle.innerHTML = `<strong>Position:</strong> ${resumesArray[resumeNo].Internship['Position']}`;

    internStartEle.innerHTML = `<strong>Start Date:</strong> ${resumesArray[resumeNo].Internship['Start Date']}`;

    internEndEle.innerHTML = `<strong>End Date:</strong> ${resumesArray[resumeNo].Internship['End Date']}`;

    internSummaryEle.innerHTML = `<strong>Summary:</strong> ${resumesArray[resumeNo].Internship['Summary']}`;

    resumesArray[resumeNo].achievements.Summary.forEach(element => {
        achievementEle.innerHTML += `<li>${element}</li>`;
    });
}

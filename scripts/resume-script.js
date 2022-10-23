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
const previousBtnEle = document.getElementById('previous');
const nextBtnEle = document.getElementById('next');
const currentPageEle = document.getElementById('current-page');
const totalPagesEle = document.getElementById('total-pages');

function fetchResumes() {
    fetch("./data/Data.json")
        .then((response) => response.json())
        .then((resumesList) => filterResumes(resumesList));
}

fetchResumes();

function filterResumes(resumesList) {
    let tempArraywithDup = resumesList.resume.map(element => element.basics.AppliedFor);
    let jobsArray = [...new Set(tempArraywithDup)];
    let filteredArray = [];
    
    showResume(resumesList);

    searchEle.addEventListener("input", function() {
        let value = this.value.toLowerCase();
        
        for(let i = 0; i < jobsArray.length; i++) {
            if(jobsArray[i].toLowerCase().includes(value)) {
                filteredArray.resume = resumesList.resume.filter( element => {
                    return element.basics.AppliedFor == jobsArray[i];
                });
            }
        }
        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';
        showResume(filteredArray);
    });
}

function showResume(resumeArray) {  
    let firstResume = 0;
    let lastResume = resumeArray.resume.length - 1;
    let currentResume = 0;
    
    previousBtnEle.style.visibility = "hidden";
    if(firstResume == lastResume) nextBtnEle.style.visibility = "hidden";
    
    currentPageEle.innerHTML = currentResume + 1;
    totalPagesEle.innerHTML = lastResume + 1;

    updatePage(resumeArray, currentResume);

    nextBtnEle.addEventListener("click", function() {
        currentResume++;
        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';
        if(currentResume > lastResume) currentResume = lastResume; 
        if(currentResume == lastResume) nextBtnEle.style.visibility = "hidden";
        if(currentResume > firstResume) previousBtnEle.style.visibility = "visible";
        currentPageEle.innerHTML = currentResume + 1;
        updatePage(resumeArray, currentResume);
    });

    previousBtnEle.addEventListener("click", function() {
        currentResume--;
        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';
        if(currentResume < firstResume) currentResume = firstResume;
        if(currentResume == firstResume) previousBtnEle.style.visibility = "hidden";
        if(currentResume < lastResume) nextBtnEle.style.visibility = "visible";
        currentPageEle.innerHTML = currentResume + 1;
        updatePage(resumeArray, currentResume);
    });
}

function updatePage(resumesArray, resumeNo) {
    appNameELe.innerHTML = resumesArray.resume[resumeNo].basics.name;

    appForEle.innerHTML = `Applied For: ${resumesArray.resume[resumeNo].basics.AppliedFor}`;

    // imgELe.innerHTML = `<img src="${resumesArray.resume[resumeNo].basics.image}" alt="Loading...">`

    phoneEle.innerHTML = resumesArray.resume[resumeNo].basics.phone;

    emailEle.innerHTML = resumesArray.resume[resumeNo].basics.email;

    socialEle.href = resumesArray.resume[resumeNo].basics.profiles.url;

    socialEle.innerHTML = resumesArray.resume[resumeNo].basics.profiles.network;

    resumesArray.resume[resumeNo].skills.keywords.forEach(element => {
        skillEle.innerHTML += `<li class="content">${element}</li>`;
    });

    resumesArray.resume[resumeNo].interests.hobbies.forEach(element => {
        hobbyEle.innerHTML += `<li class="content">${element}</li>`;
    });

    companyNameEle.innerHTML = `<strong>Company Name:</strong> ${resumesArray.resume[resumeNo].work['Company Name']}`;

    companyPositionEle.innerHTML = `<strong>Position:</strong> ${resumesArray.resume[resumeNo].work['Position']}`;

    companyStartDateEle.innerHTML = `<strong>Start Date:</strong> ${resumesArray.resume[resumeNo].work['Start Date']}`;

    companyEndDateEle.innerHTML = `<strong>End Date:</strong> ${resumesArray.resume[resumeNo].work['End Date']}`;

    companySummaryEle.innerHTML = `<strong>Summary:</strong> ${resumesArray.resume[resumeNo].work['Summary']}`;

    projectEle.innerHTML = `<strong>${resumesArray.resume[resumeNo].projects.name}:</strong> ${resumesArray.resume[resumeNo].projects.description}`;

    ugEle.innerHTML = `<strong>UG:</strong> ${resumesArray.resume[resumeNo].education.UG.institute}, ${resumesArray.resume[resumeNo].education.UG.course}, ${resumesArray.resume[resumeNo].education.UG['Start Date']}, ${resumesArray.resume[resumeNo].education.UG['End Date']}, ${resumesArray.resume[resumeNo].education.UG.cgpa}`;

    puEle.innerHTML = `<strong>PU:</strong> ${resumesArray.resume[resumeNo].education['Senior Secondary'].institute}, ${resumesArray.resume[resumeNo].education['Senior Secondary'].cgpa}`;

    highSchoolEle.innerHTML = `<strong>PU:</strong> ${resumesArray.resume[resumeNo].education['High School'].institute}, ${resumesArray.resume[resumeNo].education['High School'].cgpa}`;

    internNameEle.innerHTML = `<strong>Company Name:</strong> ${resumesArray.resume[resumeNo].Internship['Company Name']}`;

    internPositionEle.innerHTML = `<strong>Position:</strong> ${resumesArray.resume[resumeNo].Internship['Position']}`;

    internStartEle.innerHTML = `<strong>Start Date:</strong> ${resumesArray.resume[resumeNo].Internship['Start Date']}`;

    internEndEle.innerHTML = `<strong>End Date:</strong> ${resumesArray.resume[resumeNo].Internship['End Date']}`;

    internSummaryEle.innerHTML = `<strong>Summary:</strong> ${resumesArray.resume[resumeNo].Internship['Summary']}`;

    resumesArray.resume[resumeNo].achievements.Summary.forEach(element => {
        achievementEle.innerHTML += `<li>${element}</li>`;
    });
}

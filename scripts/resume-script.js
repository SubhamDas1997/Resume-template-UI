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
const resumeheadingEle = document.querySelector('.resume-heading');
const containerEle = document.querySelector('.container');
const noResultEle = document.querySelector('.no-result');

fetchResumes();

function fetchResumes() {
    fetch("./data/Data.json")
        .then((response) => response.json())
        .then((resumesList) => filterResumes(resumesList));
}

function filterResumes(resumesList) {
    let tempArraywithDup = resumesList.resume.map(element => element.basics.AppliedFor);
    let jobsArray = [...new Set(tempArraywithDup)];
    const isEmpty = str => !str.trim().length;
    
    // console.log(isEmpty(searchEle.value))
    if(isEmpty(searchEle.value)) showResume(resumesList.resume);

    searchEle.addEventListener("input", function() {
        let filteredArray = [];
        let arrToSend = []; 
        let userInp = this.value.toLowerCase();

        for(let i = 0; i < jobsArray.length; i++) {
            let isInputPresent = jobsArray[i].toLowerCase().includes(userInp);
            // console.log(isInputPresent)

            if(isInputPresent) {
                // console.log(jobsArray[i])
                filteredArray = resumesList.resume.filter( element => {
                    return element.basics.AppliedFor == jobsArray[i];
                });
                // console.log(filteredArray)
                arrToSend = arrToSend.concat(filteredArray);
            }
        }
        // console.log('Final array =')
        // console.log(arrToSend)

        skillEle.innerHTML = '';
        hobbyEle.innerHTML = '';
        achievementEle.innerHTML = '';

        // showResume(arrToSend);
        
        if(arrToSend.length != 0) {
            showResume(arrToSend);
        } else {
            noResultEle.style.display = "flex";
            resumeheadingEle.style.visibility = "hidden";
            containerEle.style.visibility = "hidden";
            
            currentPageEle.innerHTML = 0;
            totalPagesEle.innerHTML = 0;
        }
    });
}

function showResume(resumeArray) {
    // console.log(resumeArray)
    let firstResume = 0;
    // console.log(`first = ${firstResume}`)

    let lastResume = resumeArray.length - 1;
    // console.log(`total = ${lastResume}`)
    
    let currentResume = 0;
    // console.log(`current = ${currentResume}`)

    noResultEle.style.display = "none";
    resumeheadingEle.style.visibility = "visible";
    containerEle.style.visibility = "visible";

    previousBtnEle.style.visibility = "hidden";
    if(firstResume == lastResume) {
        nextBtnEle.style.visibility = "hidden";
    }
    
    currentPageEle.innerHTML = currentResume + 1;
    totalPagesEle.innerHTML = lastResume + 1;

    updatePage(resumeArray, currentResume);

    nextBtnEle.addEventListener("click", function() {
        currentResume++;
        // console.log(`current = ${currentResume}`)

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
        // console.log(`current = ${currentResume}`)

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
    appNameELe.innerHTML = resumesArray[resumeNo].basics.name;

    appForEle.innerHTML = `Applied For: ${resumesArray[resumeNo].basics.AppliedFor}`;

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

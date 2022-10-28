// Querying all the required HTML elements
const searchEle = document.querySelector("#search");
const appNameELe = document.getElementById("app-name");
const appForEle = document.getElementById("app-for");
const imgELe = document.querySelector(".icon");
const phoneEle = document.getElementById("phone-no");
const emailEle = document.getElementById("email");
const socialEle = document.getElementById("social-link");
const skillEle = document.getElementById("skill");
const hobbyEle = document.getElementById("hobby");
const companyNameEle = document.getElementById("company-name");
const companyPositionEle = document.getElementById("position");
const companyStartDateEle = document.getElementById("start-date");
const companyEndDateEle = document.getElementById("end-date");
const companySummaryEle = document.getElementById("summary");
const projectEle = document.getElementById("project");
const ugEle = document.getElementById("ug");
const puEle = document.getElementById("pu");
const highSchoolEle = document.getElementById("high-school");
const internNameEle = document.getElementById("intern-name");
const internPositionEle = document.getElementById("intern-position");
const internStartEle = document.getElementById("intern-start");
const internEndEle = document.getElementById("intern-end");
const internSummaryEle = document.getElementById("intern-summary");
const achievementEle = document.getElementById("achievement");
const pipeEle = document.querySelector(".search-area span");
const previousBtnEle = document.getElementById("previous");
const nextBtnEle = document.getElementById("next");
const currentPageEle = document.getElementById("current-page");
const totalPagesEle = document.getElementById("total-pages");
const resumeheadingEle = document.querySelector(".resume-heading");
const containerEle = document.querySelector(".container");
const noResultEle = document.querySelector(".no-result");

fetchResumes();

// Fetching the resumes array from the JSON file
function fetchResumes() {
  fetch("http://localhost:3000/resume")
    .then((response) => response.json())
    .then((resumesList) => loadPage(resumesList));
}

// Passing the promise result and loading the page with resume
function loadPage(resumeArray) {
  searchEle.addEventListener("input", filter);
  previousBtnEle.addEventListener("click", previousPage);
  nextBtnEle.addEventListener("click", nextPage);

  let currentPage = 1;
  let totalPages = resumeArray.length;
  let filteredResumes = resumeArray;

  if (currentPage == 1) previousBtnEle.style.visibility = "hidden";

  if (currentPage == totalPages) nextBtnEle.style.visibility = "hidden";

  currentPageEle.innerHTML = currentPage;
  totalPagesEle.innerHTML = totalPages;

  renderResume(filteredResumes, currentPage);

  // Filtering resumes based on job role comparing with user input
  function filter() {
    keyword = searchEle.value;

    filteredResumes = resumeArray.filter((element) =>
      element.basics.AppliedFor.toLowerCase().includes(keyword.toLowerCase())
    );

    currentPage = 1;
    totalPages = filteredResumes.length;

    if (currentPage == 1) {
      previousBtnEle.style.visibility = "hidden";
      nextBtnEle.style.visibility = "visible";
    }

    if (currentPage == totalPages) nextBtnEle.style.visibility = "hidden";

    skillEle.innerHTML = "";
    hobbyEle.innerHTML = "";
    achievementEle.innerHTML = "";

    currentPageEle.innerHTML = currentPage;
    totalPagesEle.innerHTML = totalPages;

    renderResume(filteredResumes, currentPage);
  }

  // Loading next resume on click of 'NEXT' button.
  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      previousBtnEle.style.visibility = "visible";
    }

    if (currentPage == totalPages) nextBtnEle.style.visibility = "hidden";

    skillEle.innerHTML = "";
    hobbyEle.innerHTML = "";
    achievementEle.innerHTML = "";

    currentPageEle.innerHTML = currentPage;

    renderResume(filteredResumes, currentPage);
  }

  // Loading previous resume on click of 'PREVIOUS' button.
  function previousPage() {
    if (currentPage <= totalPages) {
      currentPage--;
      nextBtnEle.style.visibility = "visible";
    }

    if (currentPage == 1) previousBtnEle.style.visibility = "hidden";

    skillEle.innerHTML = "";
    hobbyEle.innerHTML = "";
    achievementEle.innerHTML = "";

    currentPageEle.innerHTML = currentPage;

    renderResume(filteredResumes, currentPage);
  }

  // Displaying the details of the current resume on the page
  function renderResume(filteredResumes, currentPage) {
    if (totalPages == 0) {
      noResultEle.style.display = "flex";

      resumeheadingEle.style.visibility = "hidden";
      containerEle.style.visibility = "hidden";
      pipeEle.style.visibility = "hidden";
      previousBtnEle.style.visibility = "hidden";
      nextBtnEle.style.visibility = "hidden";

      currentPageEle.innerHTML = 0;
      totalPagesEle.innerHTML = 0;
    } else {
      noResultEle.style.display = "none";

      resumeheadingEle.style.visibility = "visible";
      containerEle.style.visibility = "visible";
      pipeEle.style.visibility = "visible";

      appNameELe.innerHTML = filteredResumes[currentPage - 1].basics.name;

      appForEle.innerHTML = `Applied For: ${
        filteredResumes[currentPage - 1].basics.AppliedFor
      }`;

      // Replace default image if present in the JSON file
      // imgELe.innerHTML = `<img src="${filteredResumes[currentPage - 1].basics.image}" alt="Loading...">`

      phoneEle.innerHTML = filteredResumes[currentPage - 1].basics.phone;

      emailEle.innerHTML = filteredResumes[currentPage - 1].basics.email;

      socialEle.href = filteredResumes[currentPage - 1].basics.profiles.url;

      socialEle.innerHTML =
        filteredResumes[currentPage - 1].basics.profiles.network;

      filteredResumes[currentPage - 1].skills.keywords.forEach((element) => {
        skillEle.innerHTML += `<li class="content">${element}</li>`;
      });

      filteredResumes[currentPage - 1].interests.hobbies.forEach((element) => {
        hobbyEle.innerHTML += `<li class="content">${element}</li>`;
      });

      companyNameEle.innerHTML = `<strong>Company Name:</strong> ${
        filteredResumes[currentPage - 1].work["Company Name"]
      }`;

      companyPositionEle.innerHTML = `<strong>Position:</strong> ${
        filteredResumes[currentPage - 1].work["Position"]
      }`;

      companyStartDateEle.innerHTML = `<strong>Start Date:</strong> ${
        filteredResumes[currentPage - 1].work["Start Date"]
      }`;

      companyEndDateEle.innerHTML = `<strong>End Date:</strong> ${
        filteredResumes[currentPage - 1].work["End Date"]
      }`;

      companySummaryEle.innerHTML = `<strong>Summary:</strong> ${
        filteredResumes[currentPage - 1].work["Summary"]
      }`;

      projectEle.innerHTML = `<strong>${
        filteredResumes[currentPage - 1].projects.name
      }:</strong> ${filteredResumes[currentPage - 1].projects.description}`;

      ugEle.innerHTML = `<strong>UG:</strong> ${
        filteredResumes[currentPage - 1].education.UG.institute
      }, ${filteredResumes[currentPage - 1].education.UG.course}, ${
        filteredResumes[currentPage - 1].education.UG["Start Date"]
      }, ${filteredResumes[currentPage - 1].education.UG["End Date"]}, ${
        filteredResumes[currentPage - 1].education.UG.cgpa
      }`;

      puEle.innerHTML = `<strong>PU:</strong> ${
        filteredResumes[currentPage - 1].education["Senior Secondary"].institute
      }, ${
        filteredResumes[currentPage - 1].education["Senior Secondary"].cgpa
      }`;

      highSchoolEle.innerHTML = `<strong>PU:</strong> ${
        filteredResumes[currentPage - 1].education["High School"].institute
      }, ${filteredResumes[currentPage - 1].education["High School"].cgpa}`;

      internNameEle.innerHTML = `<strong>Company Name:</strong> ${
        filteredResumes[currentPage - 1].Internship["Company Name"]
      }`;

      internPositionEle.innerHTML = `<strong>Position:</strong> ${
        filteredResumes[currentPage - 1].Internship["Position"]
      }`;

      internStartEle.innerHTML = `<strong>Start Date:</strong> ${
        filteredResumes[currentPage - 1].Internship["Start Date"]
      }`;

      internEndEle.innerHTML = `<strong>End Date:</strong> ${
        filteredResumes[currentPage - 1].Internship["End Date"]
      }`;

      internSummaryEle.innerHTML = `<strong>Summary:</strong> ${
        filteredResumes[currentPage - 1].Internship["Summary"]
      }`;

      filteredResumes[currentPage - 1].achievements.Summary.forEach(
        (element) => {
          achievementEle.innerHTML += `<li>${element}</li>`;
        }
      );
    }
  }
}

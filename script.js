```javascript
/* =====================================================
   SKILLBRIDGE AI
   STUDENT LOGIN + ASSESSMENT + DASHBOARD + PLACEMENTS
   ===================================================== */


/* ================== LOGIN ================== */

function openLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


function loginStudent() {

    const name =
        document.getElementById("loginName").value.trim();

    const email =
        document.getElementById("loginEmail").value.trim();

    const studentID =
        document.getElementById("loginID").value.trim();

    const branch =
        document.getElementById("loginBranch").value;


    if (!name || !email || !studentID || !branch) {

        alert("Please fill all details.");

        return;
    }


    const student = {

        name: name,
        email: email,
        studentID: studentID,
        branch: branch

    };


    localStorage.setItem(
        "studentData",
        JSON.stringify(student)
    );


    closeModal();

    loadDashboard();

}


/* ================== DASHBOARD ================== */

function loadDashboard() {

    const data =
        localStorage.getItem("studentData");


    if (!data) {

        return;

    }


    const student =
        JSON.parse(data);


    document.getElementById("studentName")
        .textContent = student.name;

    document.getElementById("profileName")
        .textContent = student.name;

    document.getElementById("profileEmail")
        .textContent = student.email;

    document.getElementById("profileID")
        .textContent = student.studentID;

    document.getElementById("profileAvatar")
        .textContent =
        student.name.charAt(0).toUpperCase();


    document.getElementById("dashboard")
        .classList.remove("hidden");


    document.getElementById("dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });


    loadSavedAssessment();

}


/* ================== ASSESSMENT ================== */

function openAssessment() {

    const student =
        localStorage.getItem("studentData");


    if (!student) {

        alert("Please login first.");

        openLogin();

        return;

    }


    document.getElementById("assessmentModal")
        .style.display = "flex";

}


function calculateAssessment() {


    const scores = {

        Programming:
            Number(document.getElementById("programming").value),

        "Problem Solving":
            Number(document.getElementById("problemSolving").value),

        "SQL / Database":
            Number(document.getElementById("database").value),

        Communication:
            Number(document.getElementById("communication").value),

        "Project Experience":
            Number(document.getElementById("projects").value),

        "Git / GitHub":
            Number(document.getElementById("github").value)

    };


    let total = 0;


    Object.values(scores).forEach(score => {

        total += score;

    });


    const average =
        total / Object.keys(scores).length;


    const percentage =
        Math.round(average * 10);


    let level;


    if (percentage >= 85) {

        level = "Excellent";

    }

    else if (percentage >= 70) {

        level = "Industry Ready";

    }

    else if (percentage >= 50) {

        level = "Developing";

    }

    else {

        level = "Beginner";

    }


    const gaps = [];


    Object.entries(scores).forEach(
        ([skill, score]) => {

            if (score < 7) {

                gaps.push(skill);

            }

        }
    );


    const assessment = {

        scores: scores,

        percentage: percentage,

        level: level,

        gaps: gaps

    };


    localStorage.setItem(
        "skillAssessment",
        JSON.stringify(assessment)
    );


    document.getElementById("assessmentModal")
        .style.display = "none";


    showAssessmentResult(assessment);

}


/* ================== RESULT ================== */

function showAssessmentResult(assessment) {


    document.getElementById("resultScore")
        .textContent =
        assessment.percentage + "%";


    document.getElementById("resultLevel")
        .textContent =
        assessment.level;


    let message;


    if (assessment.percentage >= 85) {

        message =
            "Excellent! You have strong industry-ready skills.";

    }

    else if (assessment.percentage >= 70) {

        message =
            "Good progress! You are close to being industry ready.";

    }

    else if (assessment.percentage >= 50) {

        message =
            "You are developing. Focus on your identified skill gaps.";

    }

    else {

        message =
            "Start with the recommended learning path and build your skills.";

    }


    document.getElementById("resultMessage")
        .textContent = message;


    const gapContainer =
        document.getElementById("gapList");


    gapContainer.innerHTML = "";


    if (assessment.gaps.length === 0) {

        gapContainer.innerHTML =
            "<span style='background:#dcfce7;color:#15803d'>No Major Skill Gaps 🎉</span>";

    }

    else {

        assessment.gaps.forEach(skill => {

            const span =
                document.createElement("span");

            span.textContent = skill;

            gapContainer.appendChild(span);

        });

    }


    document.getElementById("resultModal")
        .style.display = "flex";


    updateDashboard(assessment);

}


/* ================== DASHBOARD UPDATE ================== */

function updateDashboard(assessment) {


    document.getElementById("readinessScore")
        .textContent =
        assessment.percentage + "%";


    document.getElementById("readinessText")
        .textContent =
        assessment.level;


    const container =
        document.getElementById("skillSummary");


    container.innerHTML = "";


    Object.entries(assessment.scores)
        .forEach(([skill, score]) => {


            const percentage =
                score * 10;


            container.innerHTML += `

                <div class="skill-row">

                    <div class="skill-row-top">

                        <span>${skill}</span>

                        <span>${percentage}%</span>

                    </div>

                    <div class="progress">

                        <div
                            class="progress-bar"
                            style="width:${percentage}%"
                        ></div>

                    </div>

                </div>

            `;

        });

}


/* ================== LOAD SAVED ASSESSMENT ================== */

function loadSavedAssessment() {


    const data =
        localStorage.getItem("skillAssessment");


    if (!data) {

        return;

    }


    const assessment =
        JSON.parse(data);


    updateDashboard(assessment);

}


/* ================== PLACEMENTS ================== */

function showPlacements() {


    const studentData =
        localStorage.getItem("studentData");


    if (!studentData) {

        alert("Please login first.");

        openLogin();

        return;

    }


    const assessmentData =
        localStorage.getItem("skillAssessment");


    let score = 50;


    if (assessmentData) {

        const assessment =
            JSON.parse(assessmentData);

        score =
            assessment.percentage;

    }


    const placements = [

        {
            company: "TechNova Solutions",
            role: "Software Developer Intern",
            skills: "C, Python, Problem Solving",
            location: "Hyderabad",
            baseMatch: 88
        },

        {
            company: "DataSphere Technologies",
            role: "Data Analyst Intern",
            skills: "Python, SQL, Data Analysis",
            location: "Bangalore",
            baseMatch: 84
        },

        {
            company: "CloudMatrix",
            role: "Cloud Engineering Intern",
            skills: "Linux, Networking, Git",
            location: "Hyderabad",
            baseMatch: 79
        },

        {
            company: "InnovateX Labs",
            role: "AI/ML Project Intern",
            skills: "Python, Machine Learning",
            location: "Chennai",
            baseMatch: 76
        }

    ];


    const container =
        document.getElementById("placementList");


    container.innerHTML = "";


    placements.forEach(job => {


        let match =
            Math.min(
                98,
                Math.round(
                    job.baseMatch * 0.7 +
                    score * 0.3
                )
            );


        container.innerHTML += `

            <div class="placement-card">

                <div>

                    <span class="company">
                        ${job.company}
                    </span>

                    <h3>
                        ${job.role}
                    </h3>

                    <div class="placement-info">
                        📍 ${job.location}
                    </div>

                    <div class="placement-info">
                        🛠 ${job.skills}
                    </div>

                    <button
                        class="apply-btn"
                        onclick="applyJob('${job.role}', '${job.company}')"
                    >
                        Apply Now
                    </button>

                </div>


                <div class="match-score">

                    <strong>
                        ${match}%
                    </strong>

                    Match

                </div>

            </div>

        `;

    });


    document.getElementById("placementSection")
        .classList.remove("hidden");


    document.getElementById("placementSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================== APPLY ================== */

function applyJob(role, company) {

    alert(
        "Application submitted successfully!\n\n" +
        "Company: " + company +
        "\nRole: " + role
    );

}


/* ================== LEARNING PATH ================== */

function showLearningPath() {


    const data =
        localStorage.getItem("skillAssessment");


    const container =
        document.getElementById("learningList");


    container.innerHTML = "";


    if (!data) {

        container.innerHTML = `

            <div class="learning-item">

                <strong>
                    Complete Skill Assessment
                </strong>

                <p>
                    Take the assessment first to receive
                    a personalized learning path.
                </p>

            </div>

        `;

    }

    else {

        const assessment =
            JSON.parse(data);


        if (assessment.gaps.length === 0) {

            container.innerHTML = `

                <div class="learning-item">

                    <strong>
                        🎉 You have no major skill gaps.
                    </strong>

                    <p>
                        Focus on advanced projects,
                        certifications and real-world internships.
                    </p>

                </div>

            `;

        }


        assessment.gaps.forEach(skill => {


            let recommendation;


            if (skill === "Programming") {

                recommendation =
                    "Practice C/Python programming, algorithms and data structures.";

            }

            else if (skill === "Problem Solving") {

                recommendation =
                    "Practice coding challenges and logical reasoning problems.";

            }

            else if (skill === "SQL / Database") {

                recommendation =
                    "Learn SQL queries, database design and CRUD operations.";

            }

            else if (skill === "Communication") {

                recommendation =
                    "Practice presentations, interviews and technical communication.";

            }

            else if (skill === "Project Experience") {

                recommendation =
                    "Build 2–3 real-world projects and upload them to GitHub.";

            }

            else if (skill === "Git / GitHub") {

                recommendation =
                    "Learn Git commands, GitHub repositories, branches and pull requests.";

            }


            container.innerHTML += `

                <div class="learning-item">

                    <strong>
                        📚 Improve ${skill}
                    </strong>

                    <p>
                        ${recommendation}
                    </p>

                </div>

            `;

        });

    }


    document.getElementById("learningSection")
        .classList.remove("hidden");


    document.getElementById("learningSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================== LOGOUT ================== */

function logout() {


    localStorage.removeItem("studentData");


    document.getElementById("dashboard")
        .classList.add("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    alert("You have been logged out.");

}


/* ================== MODAL ================== */

function closeModal() {

    document.querySelectorAll(".modal")
        .forEach(modal => {

            modal.style.display = "none";

        });

}


/* ================== SCROLL ================== */

function scrollToFeatures() {

    document.getElementById("features")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================== AUTO LOGIN ================== */

window.addEventListener(
    "load",
    function() {

        loadDashboard();

    }
);
```

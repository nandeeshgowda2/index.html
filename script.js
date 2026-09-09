/* =========================================
   TRACK4CAREER VERSION 2
   Student Registration + Dashboard
========================================= */


/* =========================================
   CAREER SKILLS
========================================= */

const careerSkills = {

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "SQL",
        "Git"
    ],

    "Data Analyst": [
        "Python",
        "SQL",
        "Git"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Machine Learning"
    ],

    "AI/ML Engineer": [
        "Python",
        "Machine Learning",
        "Git"
    ],

    "Cyber Security": [
        "Python",
        "Git",
        "SQL"
    ],

    "Cloud Engineer": [
        "Python",
        "AWS",
        "Git"
    ]

};



/* =========================================
   GO TO REGISTRATION
========================================= */

function goToRegistration() {

    document
        .getElementById("register")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   REGISTRATION FORM
========================================= */

const studentForm =
    document.getElementById("studentForm");


studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* GET STUDENT INFORMATION */

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const college =
            document.getElementById("college").value;

        const branch =
            document.getElementById("branch").value;

        const year =
            document.getElementById("year").value;

        const career =
            document.getElementById("career").value;



        /* GET SELECTED SKILLS */

        const selectedSkills = [];


        const skillCheckboxes =
            document.querySelectorAll(
                'input[name="skills"]:checked'
            );


        skillCheckboxes.forEach(
            function(checkbox) {

                selectedSkills.push(
                    checkbox.value
                );

            }
        );



        /* REQUIRE AT LEAST ONE SKILL */

        if (selectedSkills.length === 0) {

            alert(
                "Please select at least one skill."
            );

            return;

        }



        /* CREATE STUDENT OBJECT */

        const student = {

            name: name,

            email: email,

            college: college,

            branch: branch,

            year: year,

            career: career,

            skills: selectedSkills

        };



        /* SAVE TO BROWSER */

        localStorage.setItem(
            "track4careerStudent",
            JSON.stringify(student)
        );



        /* SHOW DASHBOARD */

        displayDashboard(student);



        /* SHOW SUCCESS MESSAGE */

        alert(
            "Registration successful! 🎉\n\n" +
            "Welcome to Track4Career, " +
            name + "!"
        );



        /* MOVE TO DASHBOARD */

        document
            .getElementById("dashboard")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



/* =========================================
   DISPLAY DASHBOARD
========================================= */

function displayDashboard(student) {


    /* SHOW DASHBOARD */

    document
        .getElementById("dashboardContent")
        .classList.remove("hidden");


    document
        .getElementById("welcomeMessage")
        .innerHTML =
        "<p>Welcome back, <strong>" +
        student.name +
        "</strong>! 🚀</p>";



    /* PROFILE */

    document
        .getElementById("displayName")
        .textContent =
        student.name;


    document
        .getElementById("displayCollege")
        .textContent =
        student.college;


    document
        .getElementById("displayBranch")
        .textContent =
        student.branch;


    document
        .getElementById("displayCareer")
        .textContent =
        student.career;



    /* DISPLAY SKILLS */

    const displaySkills =
        document.getElementById(
            "displaySkills"
        );


    displaySkills.innerHTML = "";


    student.skills.forEach(
        function(skill) {

            const span =
                document.createElement("span");


            span.className =
                "skill-tag";


            span.textContent =
                skill;


            displaySkills.appendChild(
                span
            );

        }
    );



    /* CALCULATE SCORE */

    calculateSkillMatch(
        student
    );

}



/* =========================================
   SKILL MATCHING
========================================= */

function calculateSkillMatch(student) {


    const requiredSkills =
        careerSkills[
            student.career
        ];


    const studentSkills =
        student.skills;



    /* COUNT MATCHING SKILLS */

    let matchingSkills = 0;


    requiredSkills.forEach(
        function(skill) {

            if (
                studentSkills.includes(skill)
            ) {

                matchingSkills++;

            }

        }
    );



    /* CALCULATE PERCENTAGE */

    const score =
        Math.round(
            (
                matchingSkills /
                requiredSkills.length
            ) * 100
        );



    /* DISPLAY SCORE */

    document
        .getElementById("skillScore")
        .textContent =
        score + "%";


    document
        .getElementById("progressBar")
        .style.width =
        score + "%";



    /* SCORE MESSAGE */

    let message = "";


    if (score >= 80) {

        message =
            "Excellent! You are highly prepared for this career.";

    }

    else if (score >= 60) {

        message =
            "Good progress! Learn a few more skills.";

    }

    else if (score >= 40) {

        message =
            "You are getting started. Focus on the recommended skills.";

    }

    else {

        message =
            "Start learning the recommended skills to become industry ready.";

    }


    document
        .getElementById("scoreMessage")
        .textContent =
        message;



    /* DISPLAY SKILL GAPS */

    const skillGap =
        document.getElementById(
            "skillGap"
        );


    skillGap.innerHTML = "";


    requiredSkills.forEach(
        function(skill) {

            if (
                !studentSkills.includes(skill)
            ) {

                const span =
                    document.createElement(
                        "span"
                    );


                span.className =
                    "gap-tag";


                span.textContent =
                    skill;


                skillGap.appendChild(
                    span
                );

            }

        }
    );


    if (
        skillGap.innerHTML === ""
    ) {

        skillGap.innerHTML =
            "<span class='skill-tag'>" +
            "All required skills completed! 🎉" +
            "</span>";

    }

}



/* =========================================
   INTERNSHIP BUTTON
========================================= */

function showInternship() {

    alert(

        "Internship selected! 💼\n\n" +

        "In the next version, Track4Career " +

        "will match this opportunity with " +

        "your skill profile."

    );

}



/* =========================================
   LOAD SAVED STUDENT
========================================= */

window.addEventListener(
    "load",
    function() {

        const savedStudent =
            localStorage.getItem(
                "track4careerStudent"
            );


        if (savedStudent) {

            const student =
                JSON.parse(savedStudent);


            displayDashboard(
                student
            );

        }

    }
);

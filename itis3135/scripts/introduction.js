document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("form");
  const formSection = document.getElementById("form-section");
  const resultSection = document.getElementById("result-section");
  const coursesContainer = document.getElementById("courses-container");
  const addCourseButton = document.getElementById("add-course");
  const clearButton = document.getElementById("clear-form");
  const pictureInput = document.getElementById("picture");
  const picturePreview = document.getElementById("picture-preview");
  const defaultPicture = document.getElementById("default-picture").value;

  let courseCount = 1;

  function getValue(id) {
    return document.getElementById(id).value.trim();
  }

  function addCourse() {
    courseCount += 1;

    const courseEntry = document.createElement("div");
    courseEntry.classList.add("course-entry");

    courseEntry.innerHTML = `
      <label for="course-department-${courseCount}">Department:</label>
      <input 
        type="text" 
        id="course-department-${courseCount}"
        name="courseDepartment[]" 
        placeholder="Example: ITIS" 
        required
      >

      <label for="course-number-${courseCount}">Course Number:</label>
      <input 
        type="text" 
        id="course-number-${courseCount}"
        name="courseNumber[]" 
        placeholder="Example: 3135" 
        required
      >

      <label for="course-name-${courseCount}">Course Name:</label>
      <input 
        type="text" 
        id="course-name-${courseCount}"
        name="courseName[]" 
        placeholder="Example: Web-Based Application Design and Development" 
        required
      >

      <label for="course-reason-${courseCount}">Reason for Taking:</label>
      <input 
        type="text" 
        id="course-reason-${courseCount}"
        name="courseReason[]" 
        placeholder="Explain why you are taking this course" 
        required
      >

      <button type="button" class="delete-course">Delete Course</button>
    `;

    coursesContainer.appendChild(courseEntry);

    courseEntry.querySelector(".delete-course").addEventListener("click", function () {
      courseEntry.remove();
    });
  }

  function resetFormProgress() {
    const courseEntries = coursesContainer.querySelectorAll(".course-entry");

    courseEntries.forEach(function (course, index) {
      if (index > 0) {
        course.remove();
      }
    });

    courseCount = 1;
    picturePreview.src = defaultPicture;
    resultSection.innerHTML = "";
    formSection.style.display = "block";
  }

  function clearForm() {
    const fields = formElement.querySelectorAll("input:not([type='hidden']), textarea");

    fields.forEach(function (field) {
      field.value = "";
    });

    picturePreview.src = defaultPicture;
    resultSection.innerHTML = "";
  }

  function displayIntroduction() {
    const firstName = getValue("first-name");
    const middleName = getValue("middle-name");
    const nickname = getValue("nickname");
    const lastName = getValue("last-name");
    const acknowledgment = getValue("acknowledgment");
    const acknowledgmentDate = getValue("acknowledgment-date");
    const mascotAdjective = getValue("mascot-adjective");
    const mascotAnimal = getValue("mascot-animal");
    const divider = getValue("divider");
    const pictureCaption = getValue("picture-caption");
    const personalStatement = getValue("personal-statement");
    const personalBackground = getValue("personal-background");
    const professionalBackground = getValue("professional-background");
    const academicBackground = getValue("academic-background");
    const subjectBackground = getValue("subject-background");
    const platform = getValue("platform");
    const learningGoals = getValue("learning-goals");
    const designStyle = getValue("design-style");
    const quote = getValue("quote");
    const quoteAuthor = getValue("quote-author");
    const funnyThing = getValue("funny-thing");
    const share = getValue("share");

    let pictureSource = defaultPicture;

    if (pictureInput.files.length > 0) {
      pictureSource = URL.createObjectURL(pictureInput.files[0]);
    }

    const courseDepartments = Array.from(document.getElementsByName("courseDepartment[]"));
    const courseNumbers = Array.from(document.getElementsByName("courseNumber[]"));
    const courseNames = Array.from(document.getElementsByName("courseName[]"));
    const courseReasons = Array.from(document.getElementsByName("courseReason[]"));

    let coursesHTML = "";

    courseDepartments.forEach(function (department, index) {
      coursesHTML += `
        <li>
          <strong>${department.value.trim()} ${courseNumbers[index].value.trim()} - ${courseNames[index].value.trim()}:</strong>
          ${courseReasons[index].value.trim()}
        </li>
      `;
    });

    const linkNames = Array.from(document.getElementsByName("linkName[]"));
    const linkUrls = Array.from(document.getElementsByName("linkUrl[]"));

    let linksHTML = "";

    linkNames.forEach(function (linkName, index) {
      const name = linkName.value.trim();
      const url = linkUrls[index].value.trim();

      if (name !== "" && url !== "") {
        linksHTML += `
          <li>
            <a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>
          </li>
        `;
      }
    });

    const middleDisplay = middleName ? ` ${middleName}` : "";
    const nicknameDisplay = nickname ? ` "${nickname}"` : "";

    formSection.style.display = "none";

    resultSection.innerHTML = `
      <article class="generated-introduction">
        <h3>${firstName}${middleDisplay}${nicknameDisplay} ${lastName} ${divider} ${mascotAdjective} ${mascotAnimal}</h3>

        <figure>
          <img src="${pictureSource}" alt="${pictureCaption}" width="300">
          <figcaption>${pictureCaption}</figcaption>
        </figure>

        <p>${personalStatement}</p>

        <ul>
          <li><strong>Personal Background:</strong> ${personalBackground}</li>
          <li><strong>Professional Background:</strong> ${professionalBackground}</li>
          <li><strong>Academic Background:</strong> ${academicBackground}</li>
          <li><strong>Background in This Subject:</strong> ${subjectBackground}</li>
          <li><strong>Primary Computer Platform:</strong> ${platform}</li>
          <li><strong>Learning Goals:</strong> ${learningGoals}</li>
          <li><strong>Design Style or Personal Interest:</strong> ${designStyle}</li>
        </ul>

        <h4>Courses I Am Taking and Why</h4>
        <ul>
          ${coursesHTML}
        </ul>

        <blockquote>
          “${quote}”
          <br>
          <cite>- ${quoteAuthor}</cite>
        </blockquote>

        ${funnyThing ? `<p><strong>Funny Thing:</strong> ${funnyThing}</p>` : ""}
        ${share ? `<p><strong>Something I Would Like to Share:</strong> ${share}</p>` : ""}

        <h4>Links</h4>
        <ul>
          ${linksHTML}
        </ul>

        <p><strong>Acknowledgment:</strong> ${acknowledgment}</p>
        <p><strong>Date:</strong> ${acknowledgmentDate}</p>

        <p>
          <a href="#" id="reset-progress">Reset and Fill Out the Form Again</a>
        </p>
      </article>
    `;

    document.getElementById("reset-progress").addEventListener("click", function (event) {
      event.preventDefault();
      formElement.reset();
      resetFormProgress();
    });
  }

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    displayIntroduction();
  });

  formElement.addEventListener("reset", function () {
    setTimeout(resetFormProgress, 0);
  });

  clearButton.addEventListener("click", clearForm);

  addCourseButton.addEventListener("click", addCourse);

  pictureInput.addEventListener("change", function () {
    if (pictureInput.files.length > 0) {
      picturePreview.src = URL.createObjectURL(pictureInput.files[0]);
    } else {
      picturePreview.src = defaultPicture;
    }
  });
});
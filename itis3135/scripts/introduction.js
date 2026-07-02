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
  const generateHTMLButton = document.getElementById("generate-html");
  const generateJSONButton = document.getElementById("generate-json");
  const generateXMLButton = document.getElementById("generate-xml");
  const codeOutput = document.getElementById("code-output");

  let courseCount = 1;

  function getValue(id) {
    return document.getElementById(id).value.trim();
  }

  function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeXML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getIntroductionData() {
  const courseDepartments = Array.from(document.getElementsByName("courseDepartment[]"));
  const courseNumbers = Array.from(document.getElementsByName("courseNumber[]"));
  const courseNames = Array.from(document.getElementsByName("courseName[]"));
  const courseReasons = Array.from(document.getElementsByName("courseReason[]"));

  const courses = courseDepartments.map(function (department, index) {
    return {
      department: department.value.trim(),
      number: courseNumbers[index].value.trim(),
      name: courseNames[index].value.trim(),
      reason: courseReasons[index].value.trim()
    };
  });

  const linkNames = Array.from(document.getElementsByName("linkName[]"));
  const linkUrls = Array.from(document.getElementsByName("linkUrl[]"));

  const links = [];

  linkNames.forEach(function (linkName, index) {
    const name = linkName.value.trim();
    const url = linkUrls[index].value.trim();

    if (name !== "" && url !== "") {
      links.push({
        name: name,
        url: url
      });
    }
  });

  return {
    firstName: getValue("first-name"),
    middleName: getValue("middle-name"),
    nickname: getValue("nickname"),
    lastName: getValue("last-name"),
    acknowledgment: getValue("acknowledgment"),
    acknowledgmentDate: getValue("acknowledgment-date"),
    mascotAdjective: getValue("mascot-adjective"),
    mascotAnimal: getValue("mascot-animal"),
    divider: getValue("divider"),
    picture: defaultPicture,
    pictureCaption: getValue("picture-caption"),
    personalStatement: getValue("personal-statement"),
    personalBackground: getValue("personal-background"),
    professionalBackground: getValue("professional-background"),
    academicBackground: getValue("academic-background"),
    subjectBackground: getValue("subject-background"),
    platform: getValue("platform"),
    learningGoals: getValue("learning-goals"),
    designStyle: getValue("design-style"),
    courses: courses,
    quote: getValue("quote"),
    quoteAuthor: getValue("quote-author"),
    funnyThing: getValue("funny-thing"),
    share: getValue("share"),
    links: links
  };
}

function buildHTMLCode(data) {
  const middleDisplay = data.middleName ? ` ${escapeHTML(data.middleName)}` : "";
  const nicknameDisplay = data.nickname ? ` "${escapeHTML(data.nickname)}"` : "";

  const coursesHTML = data.courses.map(function (course) {
    return `    <li>
      <strong>${escapeHTML(course.department)} ${escapeHTML(course.number)} - ${escapeHTML(course.name)}:</strong>
      ${escapeHTML(course.reason)}
    </li>`;
  }).join("\n");

  const linksHTML = data.links.map(function (link) {
    return `    <li>
      <a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.name)}</a>
    </li>`;
  }).join("\n");

  return `<article class="generated-introduction">
  <h3>${escapeHTML(data.firstName)}${middleDisplay}${nicknameDisplay} ${escapeHTML(data.lastName)} ${escapeHTML(data.divider)} ${escapeHTML(data.mascotAdjective)} ${escapeHTML(data.mascotAnimal)}</h3>

  <figure>
    <img src="${escapeHTML(data.picture)}" alt="${escapeHTML(data.pictureCaption)}" width="300">
    <figcaption>${escapeHTML(data.pictureCaption)}</figcaption>
  </figure>

  <p>${escapeHTML(data.personalStatement)}</p>

  <ul>
    <li><strong>Personal Background:</strong> ${escapeHTML(data.personalBackground)}</li>
    <li><strong>Professional Background:</strong> ${escapeHTML(data.professionalBackground)}</li>
    <li><strong>Academic Background:</strong> ${escapeHTML(data.academicBackground)}</li>
    <li><strong>Background in This Subject:</strong> ${escapeHTML(data.subjectBackground)}</li>
    <li><strong>Primary Computer Platform:</strong> ${escapeHTML(data.platform)}</li>
    <li><strong>Learning Goals:</strong> ${escapeHTML(data.learningGoals)}</li>
    <li><strong>Design Style or Personal Interest:</strong> ${escapeHTML(data.designStyle)}</li>
  </ul>

  <h4>Courses I Am Taking and Why</h4>
  <ul>
${coursesHTML}
  </ul>

  <blockquote>
    “${escapeHTML(data.quote)}”
    <br>
    <cite>- ${escapeHTML(data.quoteAuthor)}</cite>
  </blockquote>

  ${data.funnyThing ? `<p><strong>Funny Thing:</strong> ${escapeHTML(data.funnyThing)}</p>` : ""}
  ${data.share ? `<p><strong>Something I Would Like to Share:</strong> ${escapeHTML(data.share)}</p>` : ""}

  <h4>Links</h4>
  <ul>
${linksHTML}
  </ul>

  <p><strong>Acknowledgment:</strong> ${escapeHTML(data.acknowledgment)}</p>
  <p><strong>Date:</strong> ${escapeHTML(data.acknowledgmentDate)}</p>
</article>`;
}

function buildXMLCode(data) {
  const coursesXML = data.courses.map(function (course) {
    return `    <course>
      <department>${escapeXML(course.department)}</department>
      <number>${escapeXML(course.number)}</number>
      <name>${escapeXML(course.name)}</name>
      <reason>${escapeXML(course.reason)}</reason>
    </course>`;
  }).join("\n");

  const linksXML = data.links.map(function (link) {
    return `    <link>
      <name>${escapeXML(link.name)}</name>
      <url>${escapeXML(link.url)}</url>
    </link>`;
  }).join("\n");

  return `<introduction>
  <name>
    <firstName>${escapeXML(data.firstName)}</firstName>
    <middleName>${escapeXML(data.middleName)}</middleName>
    <nickname>${escapeXML(data.nickname)}</nickname>
    <lastName>${escapeXML(data.lastName)}</lastName>
  </name>

  <mascot>
    <adjective>${escapeXML(data.mascotAdjective)}</adjective>
    <animal>${escapeXML(data.mascotAnimal)}</animal>
    <divider>${escapeXML(data.divider)}</divider>
  </mascot>

  <picture>
    <source>${escapeXML(data.picture)}</source>
    <caption>${escapeXML(data.pictureCaption)}</caption>
  </picture>

  <background>
    <personalStatement>${escapeXML(data.personalStatement)}</personalStatement>
    <personalBackground>${escapeXML(data.personalBackground)}</personalBackground>
    <professionalBackground>${escapeXML(data.professionalBackground)}</professionalBackground>
    <academicBackground>${escapeXML(data.academicBackground)}</academicBackground>
    <subjectBackground>${escapeXML(data.subjectBackground)}</subjectBackground>
    <platform>${escapeXML(data.platform)}</platform>
    <learningGoals>${escapeXML(data.learningGoals)}</learningGoals>
    <designStyle>${escapeXML(data.designStyle)}</designStyle>
  </background>

  <courses>
${coursesXML}
  </courses>

  <quote>
    <text>${escapeXML(data.quote)}</text>
    <author>${escapeXML(data.quoteAuthor)}</author>
  </quote>

  <extras>
    <funnyThing>${escapeXML(data.funnyThing)}</funnyThing>
    <share>${escapeXML(data.share)}</share>
  </extras>

  <links>
${linksXML}
  </links>

  <acknowledgment>
    <statement>${escapeXML(data.acknowledgment)}</statement>
    <date>${escapeXML(data.acknowledgmentDate)}</date>
  </acknowledgment>
</introduction>`;
}

function showCodeOutput(title, codeText) {
  codeOutput.innerHTML = "";

  const heading = document.createElement("h4");
  heading.textContent = title;

  const textArea = document.createElement("textarea");
  textArea.readOnly = true;
  textArea.rows = 20;
  textArea.value = codeText;

  codeOutput.appendChild(heading);
  codeOutput.appendChild(textArea);
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
    codeOutput.innerHTML = "";
    formSection.style.display = "block";
  }

  function clearForm() {
    const fields = formElement.querySelectorAll("input:not([type='hidden']), textarea");

    fields.forEach(function (field) {
      field.value = "";
    });

    picturePreview.src = defaultPicture;
    resultSection.innerHTML = "";
    codeOutput.innerHTML = "";
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

  generateHTMLButton.addEventListener("click", function () {
  if (!formElement.checkValidity()) {
    formElement.reportValidity();
    return;
  }

  const data = getIntroductionData();
  showCodeOutput("Generated HTML", buildHTMLCode(data));
});

generateJSONButton.addEventListener("click", function () {
  if (!formElement.checkValidity()) {
    formElement.reportValidity();
    return;
  }

  const data = getIntroductionData();
  showCodeOutput("Generated JSON", JSON.stringify(data, null, 2));
});

generateXMLButton.addEventListener("click", function () {
  if (!formElement.checkValidity()) {
    formElement.reportValidity();
    return;
  }

  const data = getIntroductionData();
  showCodeOutput("Generated XML", buildXMLCode(data));
});

  pictureInput.addEventListener("change", function () {
    if (pictureInput.files.length > 0) {
      picturePreview.src = URL.createObjectURL(pictureInput.files[0]);
    } else {
      picturePreview.src = defaultPicture;
    }
  });
});
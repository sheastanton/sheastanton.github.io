document.addEventListener("DOMContentLoaded", function () {
  const buildImage = document.getElementById("build-image");
  const buildCaption = document.getElementById("build-caption");
  const beforeButton = document.getElementById("show-before");
  const afterButton = document.getElementById("show-after");

  if (buildImage && buildCaption && beforeButton && afterButton) {
    beforeButton.addEventListener("click", function () {
      buildImage.src = "images/before.jpg";
      buildImage.alt = "Stock car before Swift Shark modifications";
      buildCaption.textContent = "Before: a clean but basic stock vehicle.";
    });

    afterButton.addEventListener("click", function () {
      buildImage.src = "images/after.jpg";
      buildImage.alt = "Modified car after Swift Shark upgrades";
      buildCaption.textContent = "After: a sharper custom build with Swift Shark upgrades.";
    });
  }

  const packageSelect = document.getElementById("package-select");
  const packageOutput = document.getElementById("package-output");

  if (packageSelect && packageOutput) {
    packageSelect.addEventListener("change", function () {
      let message = "";

      if (packageSelect.value === "style") {
        message = "Style Package Estimate: $450 - $900. Includes tint, lighting accents, and small exterior upgrades.";
      } else if (packageSelect.value === "street") {
        message = "Street Package Estimate: $1,200 - $2,500. Includes wheels, fitment planning, tint, and detail work.";
      } else if (packageSelect.value === "full") {
        message = "Full Build Estimate: $3,000 - $6,000+. Includes wrap accents, wheels, lighting, suspension appearance, and final detail.";
      } else {
        message = "Choose a package to see an estimated price range.";
      }

      packageOutput.textContent = message;
    });
  }

  const appointmentForm = document.getElementById("appointment-form");
  const appointmentOutput = document.getElementById("appointment-output");

  if (appointmentForm && appointmentOutput) {
    appointmentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const customerName = document.getElementById("customer-name").value.trim();
      const carModel = document.getElementById("car-model").value.trim();
      const serviceType = document.getElementById("service-type").value.trim();

      appointmentOutput.textContent =
        "Thanks, " + customerName + ". Swift Shark received your request for " +
        serviceType + " on your " + carModel + ". We would review the build plan before scheduling.";
    });
  }
});
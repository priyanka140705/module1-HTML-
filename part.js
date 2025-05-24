
  function showConfirmation(event) {
    event.preventDefault(); // Prevent page refresh
    document.getElementById("formOutput").textContent = "✅ Thank you for registering!";
  }
  function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      alert("❌ Please enter a valid 10-digit phone number.");
      document.getElementById("phone").focus();
    }
  }

  // Warn user if trying to leave page with incomplete feedback
  window.onbeforeunload = function () {
    const feedback = document.getElementById("feedbackText").value;
    const formNotSubmitted = feedback.trim() !== "";
    if (formNotSubmitted) {
      return "You have unsaved feedback. Are you sure you want to leave?";
    }
  };
  // Save selected event type
  function savePreference() {
    const eventType = document.getElementById("preferredEvent").value;
    localStorage.setItem("preferredEvent", eventType);
  }

  // Retrieve and pre-select saved event type on load
  window.onload = function () {
    const savedType = localStorage.getItem("preferredEvent");
    if (savedType) {
      document.getElementById("preferredEvent").value = savedType;
    }
  };

  // Clear all preferences
  function clearPreferences() {
    localStorage.removeItem("preferredEvent");
    sessionStorage.clear();
    alert("✅ Preferences cleared!");
    document.getElementById("preferredEvent").value = "";
  }
  function findNearbyEvents() {
    const output = document.getElementById("locationOutput");

    if (!navigator.geolocation) {
      output.textContent = "Geolocation is not supported by your browser.";
      return;
    }

    output.textContent = "Locating…";

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,  // 10 seconds
      maximumAge: 0
    });

    function success(position) {
      const latitude = position.coords.latitude.toFixed(5);
      const longitude = position.coords.longitude.toFixed(5);
      output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
      // You can extend here to show nearest event based on coords
    }

    function error(err) {
      switch(err.code) {
        case err.PERMISSION_DENIED:
          output.textContent = "Permission denied. Please allow location access.";
          break;
        case err.POSITION_UNAVAILABLE:
          output.textContent = "Location information is unavailable.";
          break;
        case err.TIMEOUT:
          output.textContent = "Location request timed out.";
          break;
        default:
          output.textContent = "An unknown error occurred.";
      }
    }
  }

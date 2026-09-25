/* =========================================================
   THE FADE ROOM
   Main JavaScript
========================================================= */

"use strict";

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initializeMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");

    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");

      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   PROMOTIONAL MODAL
========================================================= */

function initializeModal() {
  const modal = document.querySelector("[data-promo-modal]");

  if (!modal) {
    return;
  }

  const openButtons = document.querySelectorAll("[data-open-promo]");
  const closeButtons = document.querySelectorAll("[data-close-promo]");

  function openModal() {
    modal.classList.remove("hidden");

    modal.classList.add("flex");

    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.classList.add("hidden");

    modal.classList.remove("flex");

    document.body.classList.remove("no-scroll");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

/* =========================================================
   BOOKING SYSTEM
========================================================= */

function initializeBookingSystem() {
  const bookingForm = document.getElementById("booking-form");

  if (!bookingForm) {
    return;
  }

  const dateInput = document.getElementById("booking-date");
  const timeInput = document.getElementById("booking-time");
  const errorBox = document.getElementById("booking-error");

  const successPanel = document.getElementById("booking-success");
  const confirmationSummary = document.getElementById("confirmation-summary");

  const googleCalendarButton = document.getElementById(
    "google-calendar-button",
  );

  const appleCalendarButton = document.getElementById("apple-calendar-button");

  const newBookingButton = document.getElementById("new-booking-button");

  const dateHelp = document.getElementById("date-help");

  let completedBooking = null;

  /* =====================================================
       MINIMUM DATE
    ====================================================== */

  function getTodayISO() {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  dateInput.min = getTodayISO();

  /* =====================================================
       SERVICE FROM URL
    ====================================================== */

  function initializeServiceFromURL() {
    const params = new URLSearchParams(window.location.search);

    const requestedService = params.get("service");

    if (!requestedService) {
      return;
    }

    const serviceInputs = document.querySelectorAll('input[name="service"]');

    serviceInputs.forEach((input) => {
      if (input.value.toLowerCase() === requestedService.toLowerCase()) {
        input.checked = true;
      }
    });
  }

  initializeServiceFromURL();

  /* =====================================================
       DATE VALIDATION
    ====================================================== */

  function isSunday(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.getDay() === 0;
  }

  function validateDate() {
    const selectedDate = dateInput.value;

    if (!selectedDate) {
      dateHelp.classList.add("hidden");
      return true;
    }

    if (isSunday(selectedDate)) {
      dateHelp.textContent =
        "The Fade Room is closed on Sundays. Please choose another date.";

      dateHelp.classList.remove("hidden");

      dateInput.setCustomValidity("The Fade Room is closed on Sundays.");

      return false;
    }

    dateHelp.classList.add("hidden");

    dateInput.setCustomValidity("");

    return true;
  }

  dateInput.addEventListener("change", validateDate);

  /* =====================================================
       FORM ERROR
    ====================================================== */

  function showError(message) {
    errorBox.textContent = message;

    errorBox.classList.remove("hidden");

    errorBox.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function clearError() {
    errorBox.textContent = "";

    errorBox.classList.add("hidden");
  }

  /* =====================================================
       SERVICE DETAILS
    ====================================================== */

  function getSelectedService() {
    const selected = document.querySelector('input[name="service"]:checked');

    if (!selected) {
      return null;
    }

    return {
      name: selected.value,
      duration: Number(selected.dataset.duration),
      price: Number(selected.dataset.price),
    };
  }

  /* =====================================================
       END TIME
    ====================================================== */

  function calculateEndTime(startTime, durationMinutes) {
    const [hours, minutes] = startTime.split(":").map(Number);

    const totalMinutes = hours * 60 + minutes + durationMinutes;

    const endHours = Math.floor(totalMinutes / 60);

    const endMinutes = totalMinutes % 60;

    return (
      String(endHours).padStart(2, "0") +
      ":" +
      String(endMinutes).padStart(2, "0")
    );
  }

  /* =====================================================
       DISPLAY DATE
    ====================================================== */

  function formatDisplayDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return new Intl.DateTimeFormat("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  /* =====================================================
       GOOGLE CALENDAR DATE
    ====================================================== */

  function createCalendarDate(dateString, timeString) {
    const date = new Date(`${dateString}T${timeString}:00`);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    const seconds = "00";

    return `${year}${month}${day}` + `T${hours}${minutes}${seconds}`;
  }

  /* =====================================================
       GOOGLE CALENDAR URL
    ====================================================== */

  function buildGoogleCalendarURL(booking) {
    const start = createCalendarDate(booking.date, booking.time);

    const end = createCalendarDate(booking.date, booking.endTime);

    const title = `${booking.service} at The Fade Room`;

    const details =
      `Barber: ${booking.barber}\n` +
      `Customer: ${booking.customerName}\n` +
      `Service: ${booking.service}\n` +
      `Duration: ${booking.duration} minutes\n` +
      `Price: R${booking.price}\n\n` +
      `Please arrive a few minutes before your appointment.`;

    const location = "24 Main Street, Rosebank, Johannesburg, South Africa";

    const params = new URLSearchParams({
      action: "TEMPLATE",

      text: title,

      dates: `${start}/${end}`,

      details: details,

      location: location,
    });

    return "https://calendar.google.com/calendar/render?" + params.toString();
  }

  /* =====================================================
       ICS ESCAPING
    ====================================================== */

  function escapeICS(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  /* =====================================================
       ICS DATE
    ====================================================== */

  function createICSDate(dateString, timeString) {
    const date = new Date(`${dateString}T${timeString}:00`);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}${month}${day}` + `T${hours}${minutes}00`;
  }

  /* =====================================================
       CREATE APPLE-COMPATIBLE ICS FILE
    ====================================================== */

  function downloadICS(booking) {
    const startDate = createICSDate(booking.date, booking.time);

    const endDate = createICSDate(booking.date, booking.endTime);

    const summary = `${booking.service} - The Fade Room`;

    const description =
      `Barber: ${booking.barber}\\n` +
      `Customer: ${booking.customerName}\\n` +
      `Service: ${booking.service}\\n` +
      `Duration: ${booking.duration} minutes\\n` +
      `Price: R${booking.price}\\n\\n` +
      `Please arrive a few minutes before your appointment.`;

    const location = "24 Main Street, Rosebank, Johannesburg, South Africa";

    const uid = `booking-${Date.now()}@thefaderoom.example`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Fade Room//Booking//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${createICSDate(getTodayISO(), "00:00")}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${escapeICS(summary)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      `LOCATION:${escapeICS(location)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `the-fade-room-${booking.date}.ics`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }

  /* =====================================================
       BUILD CONFIRMATION
    ====================================================== */

  function renderConfirmation(booking) {
    confirmationSummary.innerHTML = `

            <div class="space-y-5">

                <div>
                    <p class="text-xs uppercase tracking-wider text-brand-muted">
                        Service
                    </p>

                    <p class="mt-1 font-display text-xl">
                        ${escapeHTML(booking.service)}
                    </p>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">

                    <div>

                        <p class="text-xs uppercase tracking-wider text-brand-muted">
                            Barber
                        </p>

                        <p class="mt-1">
                            ${escapeHTML(booking.barber)}
                        </p>

                    </div>

                    <div>

                        <p class="text-xs uppercase tracking-wider text-brand-muted">
                            Price
                        </p>

                        <p class="mt-1 text-brand-gold">
                            R${booking.price}
                        </p>

                    </div>

                    <div>

                        <p class="text-xs uppercase tracking-wider text-brand-muted">
                            Date
                        </p>

                        <p class="mt-1">
                            ${escapeHTML(formatDisplayDate(booking.date))}
                        </p>

                    </div>

                    <div>

                        <p class="text-xs uppercase tracking-wider text-brand-muted">
                            Time
                        </p>

                        <p class="mt-1">
                            ${escapeHTML(booking.time)}
                            –
                            ${escapeHTML(booking.endTime)}
                        </p>

                    </div>

                    <div class="sm:col-span-2">

                        <p class="text-xs uppercase tracking-wider text-brand-muted">
                            Customer
                        </p>

                        <p class="mt-1">
                            ${escapeHTML(booking.customerName)}
                        </p>

                    </div>

                </div>

            </div>

        `;
  }

  /* =====================================================
       HTML ESCAPING
    ====================================================== */

  function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
  }

  /* =====================================================
       SUBMIT BOOKING
    ====================================================== */

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearError();

    if (!validateDate()) {
      showError("Please select a valid appointment date.");

      return;
    }

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();

      showError("Please complete all required booking details.");

      return;
    }

    const service = getSelectedService();

    const barber = document.querySelector(
      'input[name="barber"]:checked',
    )?.value;

    const date = dateInput.value;

    const time = timeInput.value;

    const customerName = document.getElementById("customer-name").value.trim();

    const customerEmail = document
      .getElementById("customer-email")
      .value.trim();

    const customerPhone = document
      .getElementById("customer-phone")
      .value.trim();

    if (!service || !barber || !date || !time) {
      showError(
        "Please complete the service, barber, date and time selections.",
      );

      return;
    }

    const endTime = calculateEndTime(time, service.duration);

    const booking = {
      service: service.name,

      duration: service.duration,

      price: service.price,

      barber: barber,

      date: date,

      time: time,

      endTime: endTime,

      customerName: customerName,

      customerEmail: customerEmail,

      customerPhone: customerPhone,
    };

    completedBooking = booking;

    renderConfirmation(booking);

    googleCalendarButton.href = buildGoogleCalendarURL(booking);

    bookingForm.classList.add("hidden");

    successPanel.classList.remove("hidden");

    successPanel.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  /* =====================================================
       APPLE CALENDAR
    ====================================================== */

  appleCalendarButton.addEventListener("click", () => {
    if (!completedBooking) {
      return;
    }

    downloadICS(completedBooking);
  });

  /* =====================================================
       NEW BOOKING
    ====================================================== */

  newBookingButton.addEventListener("click", () => {
    bookingForm.reset();

    bookingForm.classList.remove("hidden");

    successPanel.classList.add("hidden");

    clearError();

    dateHelp.classList.add("hidden");

    dateInput.min = getTodayISO();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu();

  initializeModal();

  initializeCurrentYear();

  initializeBookingSystem();
});

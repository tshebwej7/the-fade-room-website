# The Fade Room

**The Fade Room** is a professional, responsive barber shop website created as part of the **Talent Forge Junior Full-Stack Developer Practical Assessment**.

The project presents a fictional premium barber shop, with a focus on professional UI design, responsive user experience, appointment booking, dynamic appointment details, and calendar integration.

## Live Website

The live website is deployed publicly and can be accessed without installation or authentication.

> **Live URL:** https://tshebwej7.github.io/the-fade-room-website/

## Project Overview

The Fade Room was designed to provide customers with a complete digital journey from discovering the barber shop to selecting a service, choosing a barber, scheduling an appointment, and adding the appointment to their personal calendar.

The website was built with a strong focus on:

- Professional visual design
- Responsive layouts
- Clear navigation
- Accessible forms and interactive elements
- Functional appointment booking
- Dynamic appointment information
- Google Calendar integration
- Apple Calendar-compatible calendar events
- Mobile usability

## Features

### Homepage

- Premium barber shop hero section
- Clear call-to-action buttons
- Featured services
- Why choose The Fade Room section
- Booking call-to-actions
- Contact information
- Promotional first-visit offer
- Responsive navigation

### Services

The services page presents the available grooming services, prices, and estimated appointment durations.

Services include:

- Signature Fade — R250
- Classic Haircut — R220
- Beard Sculpt — R150
- Haircut + Beard — R350
- Kids Cut — R180
- Full Grooming Experience — R450

Customers can select a service and continue directly to the booking process.

### About

The About page introduces The Fade Room and its approach to modern grooming.

It also presents the barber team:

- Marcus — Senior Barber
- Daniel — Master Barber
- Leo — Barber & Grooming Specialist

### Booking System

The booking page provides a functional appointment workflow where customers can select:

- Service
- Barber
- Appointment date
- Appointment time
- Full name
- Email address
- Phone number

The selected service determines the appointment duration used when generating the calendar event.

### Calendar Integration

After completing a booking, customers can add their appointment to their calendar.

The website dynamically generates:

- **Google Calendar events**
- **Apple Calendar-compatible `.ics` events**

The generated appointment includes relevant booking information such as:

- Shop name
- Selected service
- Barber
- Customer information
- Appointment date
- Start time
- End time
- Location
- Appointment details

The calendar information is generated from the customer's selected appointment rather than relying on a hard-coded booking.

### Promotional Popup

The website includes a first-visit promotional offer with the code:

`FIRSTCUT15`

The popup can be opened and closed by the user and is designed to promote the first-visit discount without interrupting the normal browsing experience.

### Terms & Conditions

A dedicated Terms & Conditions page provides accessible information covering:

- Appointments
- Arrival times
- Cancellations and rescheduling
- Services and pricing
- Appointment information
- Customer information
- Promotional offers
- Website availability
- Contact information

## Responsive Design

The website is designed to work across:

- Desktop
- Tablet
- Mobile

The navigation, content sections, cards, forms, images, and booking interface adapt to different screen sizes.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Tailwind CSS utility styling
- Google Fonts
- Google Calendar event integration
- Apple Calendar-compatible `.ics` generation

## Project Structure

```text
the-fade-room/
│
├── index.html
├── services.html
├── about.html
├── booking.html
├── terms.html
│
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── tailwind-generated.css
│   │
│   └── js/
│       └── main.js
│
└── README.md
```

## Testing

The website was tested for the main user journey:

```text
Homepage
   ↓
Services
   ↓
Booking
   ↓
Select Service
   ↓
Select Barber
   ↓
Select Date & Time
   ↓
Enter Customer Details
   ↓
Complete Booking
   ↓
Add Appointment to Calendar
```

Testing focused on:

- Page navigation
- Responsive layout
- Mobile navigation
- Booking form interaction
- Service selection
- Barber selection
- Date and time selection
- Dynamic appointment duration
- Calendar event generation
- Promotional popup
- Terms & Conditions access
- Links and buttons
- Browser console errors
- Broken local references

## Deployment

The website is intended to be deployed as a publicly accessible static website so that users can access it directly through a web browser without installing software or logging into the application.

## Assessment

This project was developed for the **Talent Forge Junior Full-Stack Developer Practical Assessment** and demonstrates practical skills in:

- Frontend development
- Responsive web design
- JavaScript functionality
- Form handling
- Dynamic data processing
- Calendar integration
- User experience design
- Website testing
- Git and GitHub workflow
- Web deployment

## Author

**Jires Tshebwe**

Aspiring Full-Stack Web Developer

GitHub: `https://github.com/tshebwej7`

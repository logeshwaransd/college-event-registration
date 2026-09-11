const form = document.getElementById("registrationForm");
const message = document.getElementById("formMessage");
const eventSelect = document.getElementById("event");
const confirmation = document.getElementById("confirmation");
const confirmationText = document.getElementById("confirmationText");

document.querySelectorAll(".event-register").forEach(button => {
  button.addEventListener("click", () => {
    eventSelect.value = button.dataset.event;
    document.getElementById("register").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("name").focus(), 500);
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const hasAcceptedTerms = document.getElementById("terms").checked;
  if (!data.name.trim() || !data.studentId.trim() || !data.email.trim() || !data.department.trim() || !data.event || !hasAcceptedTerms) {
    message.textContent = "Please complete every field and confirm your details.";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    message.textContent = "Enter a valid email address.";
    return;
  }
  const registration = { ...data, registeredAt: new Date().toISOString() };
  const saved = JSON.parse(localStorage.getItem("campus-connect-registrations") || "[]");
  localStorage.setItem("campus-connect-registrations", JSON.stringify([...saved, registration]));
  message.textContent = "";
  confirmationText.textContent = `${data.name}, your place in ${data.event} is reserved. Keep your student ID ready for check-in.`;
  confirmation.hidden = false;
  form.reset();
  confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("newRegistration").addEventListener("click", () => {
  confirmation.hidden = true;
  document.getElementById("register").scrollIntoView({ behavior: "smooth", block: "start" });
});

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

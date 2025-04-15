// let usersDiv = document.querySelector("#users");

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((user) => {
//       let card = document.createElement("div");
//       let name = document.createElement("h3");
//       let email = document.createElement("p");
//       let phone = document.createElement("p");

//        name.textContent = user.name;
//       email.textContent = user.email;
//       phone.textContent = user.phone;

//       card.appendChild(name);
//       card.appendChild(email);
//       card.appendChild(phone);

//       usersDiv.appendChild(card);
//     });
//   })

const usersDiv = document.querySelector("#users");
const searchInput = document.querySelector("#search");
const themeToggle = document.querySelector("#toggle-theme");
let allUsers = [];

// Tema holatini o‘qish
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
} else {
  themeToggle.textContent = "🌙 Dark Mode";
}

// Tema almashtirish
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Foydalanuvchilarni olish
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    allUsers = data;
    renderUsers(data);
  })
  .catch((error) => {
    usersDiv.innerHTML = "<p>Xatolik yuz berdi</p>";
    console.error(error);
  });

// Qidiruv
searchInput.addEventListener("input", () => {
  const qidiruv = searchInput.value.toLowerCase();
  const filtered = allUsers.filter((user) =>
    user.name.toLowerCase().includes(qidiruv)
  );
  renderUsers(filtered);
});

// Ekranga chiqarish
function renderUsers(users) {
  usersDiv.innerHTML = "";
  users.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h3");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    const phone = document.createElement("p");
    phone.textContent = "Telefon: " + user.phone;

    card.appendChild(name);
    card.appendChild(email);
    card.appendChild(phone);
    usersDiv.appendChild(card);
  });
}

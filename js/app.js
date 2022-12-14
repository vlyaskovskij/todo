let howmany = localStorage.getItem("howm");

for (let i = 0; i < howmany; i++) {
  renderStart();
  let inputHabit = document.querySelectorAll(".habit__input");
  let Habit = document.querySelectorAll(".habit-item-wrapper");

  for (i = 0; i < inputHabit.length; i++) {
    inputHabit[i].value = localStorage.getItem(`habit${i}`);
    if (inputHabit[i].value === "") {
      Habit[i].remove();
      howmany--;
    }
  }
}

const btnTask = document.querySelectorAll(".tasks-item__btn");
const btnHabit = document.querySelectorAll(".habit-item__btn");
const inputTask = document.querySelectorAll(".tasks__input");
const addHabit = document.querySelector(".addhabit");

document.body.addEventListener("click", function (event) {
  const elem = event.target.closest(".habit-item__btn");
  if (elem) {
    elem.classList.toggle("task-done");
    for (let i = 0; i < btnHabit.length; i++) {
      if (btnHabit[i].classList.contains("task-done")) {
        localStorage.setItem(`btnh${i}`, "done");
      } else {
        localStorage.setItem(`btnh${i}`, "notdone");
      }
    }
  }
});

function getinput() {
  for (i = 0; i < inputTask.length; i++) {
    inputTask[i].value = localStorage.getItem(`task${i}`);
  }

  for (i = 0; i < btnTask.length; i++) {
    if (localStorage.getItem(`btnt${i}`) == "done") {
      btnTask[i].classList.add("task-done");
    } else {
      btnTask[i].classList.remove("task-done");
    }
  }

  for (i = 0; i < btnHabit.length; i++) {
    if (localStorage.getItem(`btnh${i}`) == "done") {
      btnHabit[i].classList.add("task-done");
    } else {
      btnHabit[i].classList.remove("task-done");
    }
  }
}

let dateCheck = localStorage.getItem("datecheck");

let dateNow = new Date().toLocaleDateString();

if (dateNow !== dateCheck) {
  for (i = 0; i < inputTask.length; i++) {
    inputTask[i].value = "";
    localStorage.setItem(`btnt${i}`, "notdone");
  }
  for (i = 0; i < btnHabit.length; i++) {
    if (btnHabit[i].classList.contains("task-done")) {
      btnHabit[i].classList.remove("task-done");
      localStorage.setItem(`btnh${i}`, "notdone");
    }
  }
  saveTask();
  dateCheck = dateNow;
  localStorage.setItem("datecheck", dateCheck);
} else {
  getinput();
  dateCheck = dateNow;
  localStorage.setItem("datecheck", dateCheck);
}

function saveTask() {
  for (i = 0; i < inputTask.length; i++) {
    localStorage.setItem(`task${i}`, inputTask[i].value);
  }
}

for (let i = 0; i < btnTask.length; i++) {
  btnTask[i].addEventListener("click", function () {
    btnTask[i].classList.toggle("task-done");
    // ???????????????? ???????????? ???? ????????????
    if (btnTask[i].classList.contains("task-done")) {
      localStorage.setItem(`btnt${i}`, "done");
    } else {
      localStorage.setItem(`btnt${i}`, "notdone");
    }
  });
}

function renderStart() {
  const element = document.createElement("div");
  element.innerHTML = `
            <div class="habit-item-wrapper">
              <buttton class="habit-item__btn"></buttton>
              <input
                type="text"
                size="40"
                class="habit__input"
                oninput="saveHabit()"
                placeholder="Write a habit"
              />
            </div>
`;
  document.querySelector(".habits-items").prepend(element);
}

addHabit.addEventListener("click", render);

function render() {
  const element = document.createElement("div");

  element.innerHTML = `
            <div class="habit-item-wrapper">
              <buttton class="habit-item__btn"></buttton>
              <input
                type="text"
                size="40"
                class="habit__input"
                oninput="saveHabit()"
                placeholder="Write a habit"
              />
            </div>
`;
  document.querySelector(".habits-items").append(element);
  howmany++;
  localStorage.setItem(`howm`, howmany);
  return howmany;
}

function saveHabit() {
  const inputHabit = document.querySelectorAll(".habit__input");
  for (i = 0; i < inputHabit.length; i++) {
    localStorage.setItem(`habit${i}`, inputHabit[i].value);
  }
}

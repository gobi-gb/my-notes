const date = document.getElementById("date");
setInterval(() => {
  var d = new Date();
  var da = d.toDateString();
  var time = d.toLocaleTimeString();
  var datime = da + " | " + time;
  date.innerHTML = datime;
}, 500);
function getTimeDate() {
  var d = new Date();
  var da = d.toLocaleDateString();
  var time = d.toLocaleTimeString();
  var timeDate = da + " - " + time;
  return timeDate;
}
const container = document.getElementById("app");
const addBtn = container.querySelector("button");
addBtn.addEventListener("click", () => newNote());

getNotes().forEach((note) => {
  const element = createNoteHTML(note.id, note.content, note.timeStamp);
  container.insertBefore(element, addBtn);
});

function getNotes() {
  return JSON.parse(localStorage.getItem("my-notes") || "[]");
}
function saveNotes(notes) {
  localStorage.setItem("my-notes", JSON.stringify(notes));
}
function createNoteHTML(id, content, timeStamp) {
  const element = document.createElement("div");
  element.classList.add("notes-div");
  let noteCard = document.createElement("textarea");
  noteCard.className = "notes";
  noteCard.value = content;
  noteCard.placeholder = "Empty Note...";
  let timeCard = document.createElement("div");
  timeCard.className = "timeStamp";
  timeCard.innerHTML = timeStamp;
  element.appendChild(noteCard);
  element.appendChild(timeCard);
  noteCard.addEventListener("change", () => {
    updateNote(id, noteCard.value, timeCard);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure that you want to delete this Note?");
    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}
function newNote() {
  const noteObject = {
    id: Date(),
    content: "",
    timeStamp: getTimeDate(),
  };
  const noteElement = createNoteHTML(
    noteObject.id,
    noteObject.content,
    noteObject.timeStamp
  );
  container.insertBefore(noteElement, addBtn);
  const notes = getNotes();
  notes.push(noteObject);
  saveNotes(notes);
}
function updateNote(id, newContent, timeUpdate) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  timeUpdate.innerHTML = getTimeDate();
  saveNotes(notes);
}
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  container.removeChild(element);
}
function help() {
  var help = document.getElementById("helpFun");
  help.classList.toggle("show");
}

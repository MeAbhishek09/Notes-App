document.addEventListener("DOMContentLoaded", loadNotes);

function saveNote() {
    let title = document.getElementById("note-title").value.trim();
    let content = document.getElementById("note-content").value.trim();

    if (!title || !content) {
        alert("Please fill in both title and content!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let date = new Date().toLocaleString();
    notes.push({ title, content , date});
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";

    loadNotes();
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
             <p>Created on: ${note.date}</p>
            <div>${marked.parse(note.content)}</div>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function exportNote() {
    let content = document.getElementById("note-content").value.trim();
    if (!content) {
        alert("Write something before exporting!");
        return;
    }

    let blob = new Blob([content], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("color-picker-back").addEventListener("input", function() {
    let selectedColor = this.value;
    document.getElementById("contant").style.backgroundColor = selectedColor;
});

document.getElementById("color-picker-input").addEventListener("input", function() {
    let selectedColor = this.value;
    document.querySelectorAll("input , textarea, note").forEach(input => {
        input.style.backgroundColor = selectedColor;
    });
});



// Add event listener to setting icon
document.getElementById("setting-icon").addEventListener("click", function() {
    // Toggle display of color div
    document.getElementById("color-div").style.display = document.getElementById("color-div").style.display === "block" ? "none" : "block";
});




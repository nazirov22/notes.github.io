import { saveToLocalStorage, getFromLocalStorage, redirectTo } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('noteForm');
    const noteTitle = document.getElementById('noteTitle');
    const noteText = document.getElementById('noteText');
    const noteCategory = document.getElementById('noteCategory');
    const deleteBtn = document.getElementById('deleteBtn');

    const noteId = new URLSearchParams(window.location.search).get('id');
    let note = noteId ? getFromLocalStorage(noteId) : null;

    if (note) {
        noteTitle.value = note.title;
        noteText.value = note.text;
        noteCategory.value = note.category;
    }

    form.onsubmit = function (e) {
        e.preventDefault();

        const newNote = {
            id: note ? note.id : Date.now(),
            title: noteTitle.value,
            text: noteText.value,
            category: noteCategory.value,
        };

        saveToLocalStorage(newNote.id, newNote);
        redirectTo('notes.html');
    };

    deleteBtn.onclick = function () {
        if (note) {
            localStorage.removeItem(note.id);
            redirectTo('notes.html');
        }
    };
});
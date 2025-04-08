import { getFromLocalStorage, redirectTo } from './utils.js';

export function displayNotes(filter = '', category = null) {
    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) {
        console.error('Контейнер для заметок не найден');
        return;
    }
    notesContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'user') continue;

        const note = getFromLocalStorage(key);
        if (!note) continue;

        if (filter && !note.title.toLowerCase().includes(filter.toLowerCase())) {
            continue;
        }

        if (category !== null && note.category !== category) {
            continue;
        }

        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <span class="date">${new Date(note.id).toLocaleDateString()}</span>
            <div class="actions">
                <button onclick="editNote(${note.id})">Редактировать</button>
                <button onclick="deleteNote(${note.id})">Удалить</button>
            </div>
        `;

        notesContainer.appendChild(noteElement);
    }
}
export function editNote(id) {
    redirectTo(`edit-note.html?id=${id}`);
}

export function deleteNote(id) {
    if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
        localStorage.removeItem(id);
        displayNotes();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const categories = document.getElementById('categories').querySelectorAll('li');

    let currentCategory = null;

    searchInput.addEventListener('input', function () {
        displayNotes(this.value, currentCategory);
    });

    categories.forEach(category => {
        category.addEventListener('click', function () {
            const selectedCategory = this.getAttribute('data-category');

            if (currentCategory === selectedCategory) {
                currentCategory = null;
                this.classList.remove('active');
            } else {
                categories.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                currentCategory = selectedCategory;
            }

            displayNotes(searchInput.value, currentCategory);
        });
    });

    displayNotes();
});
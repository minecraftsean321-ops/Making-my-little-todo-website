const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const semuaList = document.getElementById("semuaList");
const belumList = document.getElementById("belumList");
const selesaiList = document.getElementById("selesaiList");

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function updateLocalStorage () {
    localStorage.setItem('todos', JSON.stringify(todos));

}

semuaList.addEventListener("click", () => {
    currentFilter = 'all';
    renderTodos();
});

selesaiList.addEventListener("click", () => {

    currentFilter = 'completed';
    renderTodos();

});

belumList.addEventListener("click", () => {
    currentFilter='active';
    renderTodos();          

}); 

// 2. Fungsi untuk merender seluruh todo dari array `todos` ke HTML
function renderTodos() {
    taskList.innerHTML = ""; // Bersihkan list sebelum render ulang

    // Filter array todos berdasarkan status currentFilter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'completed') {
            return todo.completed === true;
        } else if (currentFilter === 'active') {
            return todo.completed === false;
        }
        return true; // jika 'all', tampilkan semua
    });

    // Iterasi menggunakan filteredTodos (bukan todos langsung)
    filteredTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("kegiatan");

        // <span> untuk menyimpan text
        const span = document.createElement("span");
        span.textContent = todo.text;

        // Status selesai (line-through) jika diklik
        if (todo.completed) {
            span.style.textDecoration = "line-through";
        }

        // Toggle status selesai
        span.addEventListener("click", () => {
            todo.completed = !todo.completed;
            updateLocalStorage();
            renderTodos();
        });

        // Tombol Delete
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
    


// 3. Fungsi Tambah Todo
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Input tidak boleh kosong!");
        return;
    }

    // Buat objek todo baru
    const newTodo = {
        id: Date.now(), // ID unik menggunakan timestamp
        text: text,
        completed: false
    };

    todos.push(newTodo);      // Masukkan ke array
    updateLocalStorage();      // Simpan ke localStorage
    renderTodos();             // Render ulang UI

    taskInput.value = "";      // Kosongkan input
});

// 4. Fungsi Hapus Todo berdasarkan ID
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id); // Filter array
    updateLocalStorage();                         // Sync ke localStorage
    renderTodos();                                // Render ulang UI
}

// 5. Render pertama kali saat halaman selesai di-load / refresh
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});
 
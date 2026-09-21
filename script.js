const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

//Menambahkan event listener
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    //Mengecek apakah input di text kosong atau tidak
    if (text == "") {
        alert("Input tidak boleh kosong!");
        return;

    }

    //Buat elemen <li> baru
    const li = document.createElement("li");
    li.classList.add("kegiatan");

    //<span> untuk menyimpan text
    const span = document.createElement("span");
    span.textContent = text;

    // Fitur Bonus (opsional): Klik teks task untuk mencoret (line-through)
    span.addEventListener("click", () => {
    span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    //Ketika delete diklik hapus item dari list
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    //Masukkan <li> ke dalam <ul>
    taskList.appendChild(li);

    //Kosongkan kembali input field setelah berhasil menambah task
    taskInput.value = "";

});
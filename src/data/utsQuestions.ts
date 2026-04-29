export interface Question {
    id: number;
    type: "multiple-choice" | "tracing" | "essay";
    category: string;
    question: string;
    options?: string[];
    correctAnswer?: string | number;
    explanation: string;
    points: number;
}

export const utsQuestions: Question[] = [
    {
        id: 1,
        category: "Big O Notation",
        type: "multiple-choice",
        question: "Manakah dari kompleksitas waktu berikut yang paling efisien untuk input data yang sangat besar?",
        options: ["O(n^2)", "O(n log n)", "O(2^n)", "O(n)"],
        correctAnswer: 3, // O(n)
        explanation: "O(n) adalah linear complexity, jauh lebih efisien daripada O(n log n), O(n^2), atau O(2^n) untuk data skala besar.",
        points: 5
    },
    {
        id: 2,
        category: "Basic Concepts",
        type: "multiple-choice",
        question: "Struktur data manakah yang paling cocok untuk mengimplementasikan fitur 'Undo' pada sebuah aplikasi text editor?",
        options: ["Queue", "Linked List", "Stack", "Array"],
        correctAnswer: 2, // Stack
        explanation: "Fitur 'Undo' mengikuti prinsip LIFO (Last-In-First-Out), di mana aksi terakhir yang dilakukan adalah yang pertama dibatalkan. Ini adalah karakteristik utama Stack.",
        points: 5
    },
    {
        id: 3,
        category: "Linked List",
        type: "multiple-choice",
        question: "Apa keunggulan utama Linked List dibandingkan Array statis?",
        options: [
            "Akses elemen secara acak (Random Access) lebih cepat",
            "Penggunaan memori lebih sedikit karena tidak ada pointer",
            "Alokasi memori bersifat dinamis dan fleksibel",
            "Proses sorting selalu lebih cepat"
        ],
        correctAnswer: 2,
        explanation: "Linked List mengalokasikan memori secara dinamis saat runtime, sehingga tidak perlu menentukan ukuran di awal seperti array statis.",
        points: 5
    },
    {
        id: 4,
        category: "Stack & Queue",
        type: "multiple-choice",
        question: "Jika kita melakukan operasi: enqueue(5), enqueue(3), dequeue(), enqueue(7), dequeue(). Elemen apa yang tersisa di dalam Queue?",
        options: ["5", "3", "7", "Tidak ada"],
        correctAnswer: 2, // 7
        explanation: "Urutan: [5] -> [5, 3] -> [3] (5 keluar) -> [3, 7] -> [7] (3 keluar). Sisa: 7.",
        points: 10
    },
    {
        id: 5,
        category: "Recursion",
        type: "multiple-choice",
        question: "Apa yang akan terjadi jika sebuah fungsi rekursif tidak memiliki 'Base Case'?",
        options: [
            "Program akan berjalan lebih cepat",
            "Akan terjadi Stack Overflow",
            "Hasil perhitungan akan selalu nol",
            "Program akan berhenti secara otomatis setelah 10 kali iterasi"
        ],
        correctAnswer: 1,
        explanation: "Tanpa Base Case, fungsi rekursif akan memanggil dirinya sendiri tanpa henti hingga memori stack penuh, menyebabkan Stack Overflow.",
        points: 5
    },
    {
        id: 6,
        category: "Sorting",
        type: "multiple-choice",
        question: "Algoritma sorting manakah yang bekerja dengan cara mencari elemen terkecil dan menukarnya ke posisi paling depan secara berulang?",
        options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Quick Sort"],
        correctAnswer: 2,
        explanation: "Selection Sort bekerja dengan cara 'memilih' (selecting) elemen terkecil dari bagian yang belum terurut dan memindahkannya ke depan.",
        points: 5
    },
    {
        id: 7,
        category: "Big O Notation",
        type: "multiple-choice",
        question: "Berapa kompleksitas waktu dari potongan kode Python berikut?\n\nfor i in range(n):\n    for j in range(n):\n        print(i, j)",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: 2,
        explanation: "Karena terdapat loop di dalam loop (nested loop) yang keduanya berjalan sebanyak n kali, maka kompleksitasnya adalah n * n = n^2.",
        points: 10
    },
    {
        id: 8,
        category: "Linked List",
        type: "multiple-choice",
        question: "Dalam Singly Linked List, setiap node memiliki dua bagian utama, yaitu...",
        options: [
            "Data dan Alamat Memori sendiri",
            "Data dan Pointer ke node berikutnya",
            "Pointer ke depan dan Pointer ke belakang",
            "Index dan Value"
        ],
        correctAnswer: 1,
        explanation: "Singly Linked List menyimpan data (value) dan pointer (next) yang menunjuk ke alamat node berikutnya.",
        points: 5
    },
    {
        id: 9,
        category: "Stack",
        type: "multiple-choice",
        question: "Jika stack berisi [A, B, C] (C di atas). Setelah operasi pop(), push(D), pop(), elemen teratas stack adalah...",
        options: ["A", "B", "C", "D"],
        correctAnswer: 1, // B
        explanation: "[A, B, C] -> pop() -> [A, B] -> push(D) -> [A, B, D] -> pop() -> [A, B]. Teratas: B.",
        points: 10
    },
    {
        id: 10,
        category: "Sorting",
        type: "multiple-choice",
        question: "Pada Bubble Sort, dalam satu fase (pass) lengkap, elemen manakah yang dipastikan sudah berada di posisi yang benar?",
        options: [
            "Elemen terkecil berada di paling depan",
            "Elemen terbesar berada di paling belakang",
            "Semua elemen langsung terurut",
            "Elemen tengah berada di posisi yang benar"
        ],
        correctAnswer: 1,
        explanation: "Sesuai namanya, elemen terbesar akan 'mengapung' ke posisi paling belakang pada setiap fase Bubble Sort.",
        points: 5
    },
    {
        id: 11,
        category: "Recursion",
        type: "multiple-choice",
        question: "Berapakah hasil dari pemanggilan faktorial(3) jika fungsi didefinisikan secara rekursif?",
        options: ["3", "9", "6", "1"],
        correctAnswer: 2, // 6
        explanation: "3! = 3 * 2 * 1 = 6.",
        points: 5
    },
    {
        id: 12,
        category: "Queue",
        type: "multiple-choice",
        question: "Karakteristik utama dari struktur data Queue adalah...",
        options: ["LIFO", "FILO", "FIFO", "Random Access"],
        correctAnswer: 2, // FIFO
        explanation: "Queue mengikuti prinsip First-In-First-Out (FIFO).",
        points: 5
    },
    {
        id: 13,
        category: "Big O Notation",
        type: "multiple-choice",
        question: "Analisis kompleksitas yang mengukur penggunaan memori oleh sebuah algoritma disebut...",
        options: ["Time Complexity", "Space Complexity", "Memory Leak", "Runtime Analysis"],
        correctAnswer: 1,
        explanation: "Space Complexity adalah ukuran seberapa banyak memori yang dibutuhkan algoritma seiring bertambahnya ukuran input.",
        points: 5
    },
    {
        id: 14,
        category: "Sorting",
        type: "multiple-choice",
        question: "Mana yang merupakan Best Case complexity dari Bubble Sort yang sudah dioptimasi?",
        options: ["O(n^2)", "O(n)", "O(log n)", "O(1)"],
        correctAnswer: 1,
        explanation: "Jika array sudah terurut, Bubble Sort yang dioptimasi hanya perlu satu kali pass (O(n)) untuk mendeteksi tidak ada penukaran.",
        points: 10
    },
    {
        id: 15,
        category: "Recursion",
        type: "multiple-choice",
        question: "Dalam rekursi, apa fungsi utama dari Stack Memory?",
        options: [
            "Menyimpan nilai variabel global",
            "Menyimpan alamat kembalian (return address) dan variabel lokal setiap pemanggilan fungsi",
            "Mempercepat proses eksekusi loop",
            "Menghapus data yang sudah tidak digunakan secara otomatis"
        ],
        correctAnswer: 1,
        explanation: "Stack memory digunakan untuk menyimpan 'context' atau state dari setiap pemanggilan fungsi rekursif yang masih aktif (menunggu hasil dari pemanggilan berikutnya).",
        points: 10
    },
    {
        id: 16,
        category: "Conceptual",
        type: "essay",
        question: "Berikan sebuah analogi dunia nyata (selain yang sudah dibahas di materi) untuk menjelaskan perbedaan mendasar antara struktur data Stack dan Queue. Jelaskan mengapa analogi tersebut relevan!",
        explanation: "Analogi bebas mahasiswa untuk menguji pemahaman mendalam tentang LIFO vs FIFO.",
        points: 15
    },
    {
        id: 17,
        category: "Case Study",
        type: "essay",
        question: "Jika Anda diminta membangun fitur 'History Browser' (daftar halaman yang baru dikunjungi) dan fitur 'Print Queue' (antrean dokumen pada printer), struktur data mana yang akan Anda pilih untuk masing-masing fitur tersebut? Jelaskan alasan teknis pemilihan Anda!",
        explanation: "Mahasiswa diharapkan memilih Stack untuk History dan Queue untuk Print Queue dengan alasan teknis yang tepat.",
        points: 15
    }
];

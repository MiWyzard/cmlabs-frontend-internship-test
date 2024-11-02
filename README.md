# MealApp - Dokumentasi Proyek

MealApp adalah sebuah aplikasi web yang menampilkan berbagai kategori makanan dari seluruh dunia. Pengguna dapat menavigasi ke berbagai halaman untuk menemukan kategori makanan, mencari makanan berdasarkan negara, dan melihat detail dari setiap hidangan.

## Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Struktur Halaman](#struktur-halaman)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Instalasi dan Konfigurasi](#instalasi-dan-konfigurasi)
5. [Struktur File](#struktur-file)
6. [Penjelasan Kode Utama](#penjelasan-kode-utama)
7. [API yang Digunakan](#api-yang-digunakan)
8. [Pengembangan Lebih Lanjut](#pengembangan-lebih-lanjut)

## Fitur Utama

- **Halaman Utama (Foods/Ingredients)**: Menampilkan kategori makanan, di mana pengguna dapat memilih kategori dan melihat daftar makanan di dalamnya.
- **Halaman Category Detail**: Menampilkan makanan berdasarkan kategori pilihan.
- **Halaman Local Culinary**: Menampilkan makanan berdasarkan negara, dengan filter negara yang dinamis.
- **Halaman Meal Detail**: Menampilkan detail makanan, termasuk bahan, resep, dan video tutorial.

## Struktur Halaman

1. **Foods/Ingredients Page**: Menampilkan semua kategori makanan dalam bentuk grid. Setiap kategori dapat diklik untuk membuka halaman `category_detail.html` yang menampilkan daftar makanan dari kategori tersebut.
2. **Category Detail Page**: Menampilkan daftar makanan berdasarkan kategori yang dipilih dari halaman **Foods** atau **Ingredients**.
3. **Local Culinary Page**: Menyediakan filter negara untuk menampilkan makanan berdasarkan negara asal.
4. **Meal Detail Page**: Menampilkan detail lengkap dari setiap makanan termasuk bahan, resep, dan video tutorial YouTube jika tersedia.

## Teknologi yang Digunakan

- **HTML**: Struktur markup dasar untuk semua halaman.
- **CSS**: Menyediakan styling untuk tampilan responsif.
- **JavaScript/jQuery**: Mengelola logika interaktif, pengambilan data dari API, dan navigasi halaman.
- **API**: Mengambil data makanan dan kategori dari [TheMealDB](https://www.themealdb.com/).

## Instalasi dan Konfigurasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/username/mealapp.git
   cd mealapp
   ```

2. **Struktur Direktori**:
   Pastikan semua file HTML, CSS, dan JavaScript ditempatkan sesuai struktur direktori di bawah ini.

3. **Dependencies**:
   - Pastikan Anda memiliki koneksi internet karena proyek ini menggunakan jQuery melalui CDN.
   - Tidak ada instalasi tambahan yang diperlukan selain jQuery.

## Struktur File

```
mealapp/
├── index.html                  # Halaman utama (foods/ingredients)
├── category_detail.html        # Halaman detail kategori
├── local_culinary.html         # Halaman filter berdasarkan negara
├── meal_detail.html            # Halaman detail makanan
├── style.css                   # Styling utama
└── app.js                      # Logika utama JavaScript dan jQuery
```

## Penjelasan Kode Utama

### 1. `index.html` (Foods/Ingredients Page)
   - Menampilkan daftar kategori makanan dengan setiap kategori dalam bentuk card.
   - Setiap card dapat diklik dan akan mengarahkan pengguna ke `category_detail.html`.

### 2. `category_detail.html`
   - Mengambil parameter `category` dari URL dan menampilkan makanan yang sesuai.
   - Jika `category` tidak ada, halaman akan menampilkan semua kategori sebagai tampilan default.

### 3. `local_culinary.html`
   - Dropdown negara untuk memilih makanan dari negara tertentu.
   - Mengambil daftar makanan berdasarkan negara yang dipilih dan menampilkan hasilnya.

### 4. `meal_detail.html`
   - Mengambil parameter `mealId` dari URL dan menampilkan detail makanan.
   - Menampilkan nama, area asal, bahan, resep, dan video tutorial.

### 5. `app.js` (JavaScript Utama)

#### a. Mengambil dan Menampilkan Daftar Kategori
   - Kode menggunakan AJAX untuk mengambil data kategori dan menampilkannya di `index.html` atau `category_detail.html` tanpa parameter kategori.

#### b. Menampilkan Makanan Berdasarkan Kategori
   - Di halaman `category_detail.html`, mengambil parameter kategori dari URL dan menampilkan makanan yang sesuai.

#### c. Filter Negara di `local_culinary.html`
   - Dropdown negara memungkinkan pengguna untuk memilih negara, kemudian menampilkan makanan dari negara tersebut.

#### d. Menampilkan Detail Makanan
   - Mengambil detail makanan berdasarkan parameter `mealId` di `meal_detail.html`, menampilkan informasi lengkap, bahan, dan tautan video tutorial.

## API yang Digunakan

Proyek ini menggunakan API dari **TheMealDB** untuk mengakses data makanan dan kategori:

1. **Endpoint Kategori**: Mengambil daftar semua kategori makanan
   ```
   https://www.themealdb.com/api/json/v1/1/categories.php
   ```

2. **Endpoint Makanan Berdasarkan Kategori**: Mengambil daftar makanan dalam kategori tertentu
   ```
   https://www.themealdb.com/api/json/v1/1/filter.php?c={categoryName}
   ```

3. **Endpoint Makanan Berdasarkan Negara**: Mengambil daftar makanan dari negara tertentu
   ```
   https://www.themealdb.com/api/json/v1/1/filter.php?a={countryName}
   ```

4. **Endpoint Detail Makanan**: Mengambil detail makanan berdasarkan ID
   ```
   https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}
   ```

## Pengembangan Lebih Lanjut

Beberapa fitur yang dapat ditambahkan atau dikembangkan lebih lanjut:

1. **Pencarian Makanan**: Menambahkan fitur pencarian untuk mempermudah pengguna menemukan makanan berdasarkan kata kunci.
2. **Favorit Makanan**: Menyediakan opsi bagi pengguna untuk menandai makanan favorit mereka dan menyimpannya dalam local storage.
3. **Filter Tambahan**: Memperluas filter untuk mencari berdasarkan bahan, tingkat kesulitan, atau waktu memasak.
4. **Navigasi Halaman yang Lebih Responsif**: Memastikan semua halaman tetap responsif dan ramah mobile.

## Lisensi

Proyek ini adalah proyek terbuka dan dapat digunakan serta dimodifikasi sesuai kebutuhan.
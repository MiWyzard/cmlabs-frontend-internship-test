$(document).ready(function() {
    // Halaman Foods atau Ingredients: Menampilkan semua kategori dan makanan dari setiap kategori
    if (window.location.pathname.includes("foods.html") || window.location.pathname.includes("ingredients.html")) {
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/categories.php",
            method: "GET",
            success: function(data) {
                const categories = data.categories;
                
                // Loop untuk mengambil makanan dari setiap kategori
                categories.forEach(category => {
                    $.ajax({
                        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`,
                        method: "GET",
                        success: function(data) {
                            displayMeals(data.meals);
                        },
                        error: function(error) {
                            console.log("Error fetching meals for category:", category.strCategory, error);
                        }
                    });
                });
            },
            error: function(error) {
                console.log("Error fetching categories:", error);
            }
        });

        // Fungsi untuk menampilkan makanan dalam bentuk product card
        function displayMeals(meals) {
            const mealCards = meals.map(meal => `
                <div class="product-card" data-meal-id="${meal.idMeal}">
                    <div class="product-card-content">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="product-image">
                        <div class="product-overlay">
                            <h3 class="product-title">${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `).join('');
            $('#meal-container').append(mealCards);

            // Navigasi ke halaman detail makanan ketika product card diklik
            $('.product-card').off('click').on('click', function() {
                const mealId = $(this).data('meal-id');
                window.location.href = `meal_detail.html?mealId=${mealId}`;
            });
        }
    }

    // Halaman Category: Menampilkan semua kategori
    if ($('#category-container').length) {
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/categories.php",
            method: "GET",
            success: function(data) {
                const categories = data.categories.map(category => `
                    <div class="product-card" data-category="${category.strCategory}">
                        <div class="product-card-content">
                            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="product-image">
                            <div class="product-overlay">
                                <h3 class="product-title">${category.strCategory}</h3>
                            </div>
                        </div>
                    </div>
                `).join('');
                $('#category-container').html(categories);

                // Navigasi ke halaman detail kategori ketika product card diklik
                $('.product-card').on('click', function() {
                    const categoryName = $(this).data('category');
                    window.location.href = `category_detail.html?category=${categoryName}`;
                });
            },
            error: function(error) {
                console.log("Error fetching categories:", error);
            }
        });
    }

    // Halaman Category Detail: Menampilkan semua makanan dari kategori tertentu
    if ($('#meal-container').length && window.location.search.includes('category')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');

        $('#category-title').text(`${categoryName} Meals`);
        $('#breadcrumb-category').text(categoryName);

        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
            method: "GET",
            success: function(data) {
                const mealCards = data.meals.map(meal => `
                    <div class="product-card" data-meal-id="${meal.idMeal}">
                        <div class="product-card-content">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="product-image">
                            <div class="product-overlay">
                                <h3 class="product-title">${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `).join('');
                $('#meal-container').html(mealCards);

                // Navigasi ke halaman detail makanan ketika product card diklik
                $('.product-card').on('click', function() {
                    const mealId = $(this).data('meal-id');
                    window.location.href = `meal_detail.html?mealId=${mealId}`;
                });
            },
            error: function(error) {
                console.log("Error fetching meals:", error);
                $('#meal-container').html("<p>Error loading meals. Please try again later.</p>");
            }
        });
    }

    // Halaman Meal Detail: Menampilkan detail makanan berdasarkan mealId
    if ($('#meal-title').length && window.location.search.includes('mealId')) {
        const urlParams = new URLSearchParams(window.location.search);
        const mealId = urlParams.get('mealId');

        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
            method: "GET",
            success: function(data) {
                const meal = data.meals[0];
                
                // Update elemen-elemen detail makanan
                $('#meal-title').text(meal.strMeal);
                $('#breadcrumb-category').text(meal.strCategory);
                $('#breadcrumb-category').attr('href', `category_detail.html?category=${meal.strCategory}`);
                $('#breadcrumb-meal').text(meal.strMeal);
                $('#meal-culinary').text(meal.strArea ? `${meal.strArea} Culinary` : '');
                $('#meal-image').attr('src', meal.strMealThumb);
                $('#meal-instructions-text').text(meal.strInstructions);

                // Menampilkan daftar bahan dan takaran
                const recipeList = Array.from({ length: 20 }, (_, i) => {
                    const ingredient = meal[`strIngredient${i + 1}`];
                    const measure = meal[`strMeasure${i + 1}`];
                    return ingredient ? `<li>${measure} ${ingredient}</li>` : '';
                }).join('');
                $('#meal-recipe-list').html(recipeList);

                // Embed video YouTube
                const youtubeLink = meal.strYoutube ? meal.strYoutube.replace("watch?v=", "embed/") : '';
                $('#meal-video').attr('src', youtubeLink);
            },
            error: function(error) {
                console.log("Error fetching meal details:", error);
            }
        });
    }

    // Halaman Local Culinary: Menampilkan makanan berdasarkan negara yang dipilih
    if ($('#country-select').length) {
        const countries = ["American", "British", "Canadian", "Chinese", "Dutch", "Egyptian", "French", "Greek", "Indian", "Irish", "Italian", "Jamaican", "Japanese", "Kenyan", "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai", "Tunisian", "Turkish", "Vietnamese"];
        
        // Menambahkan negara ke dropdown
        countries.forEach(country => {
            $('#country-select').append(`<option value="${country}">${country}</option>`);
        });

        // Event ketika negara dipilih
        $('#country-select').on('change', function() {
            const country = $(this).val();
            if (country) {
                $.ajax({
                    url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
                    method: "GET",
                    success: function(data) {
                        const meals = data.meals.map(meal => `
                            <div class="product-card" data-meal-id="${meal.idMeal}">
                                <div class="product-card-content">
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="product-image">
                                    <div class="product-overlay">
                                        <h3 class="product-title">${meal.strMeal}</h3>
                                    </div>
                                </div>
                            </div>
                        `).join('');
                        $('#meal-container').html(meals);

                        // Navigasi ke halaman detail makanan ketika product card diklik
                        $('.product-card').on('click', function() {
                            const mealId = $(this).data('meal-id');
                            window.location.href = `meal_detail.html?mealId=${mealId}`;
                        });
                    },
                    error: function(error) {
                        console.log("Error fetching meals by country:", error);
                        $('#meal-container').html("<p>Error loading meals. Please try again later.</p>");
                    }
                });
            } else {
                $('#meal-container').empty();
            }
        });
    }
    
    // Halaman Category Detail tanpa kategori spesifik: Tampilkan semua kategori sebagai tampilan default
    if ($('#meal-container').length && window.location.pathname.includes("category_detail.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');

        if (!categoryName) {
            $('#category-title').text("All Categories");
            $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/categories.php",
                method: "GET",
                success: function(data) {
                    const categories = data.categories.map(category => `
                        <div class="product-card" data-category="${category.strCategory}">
                            <div class="product-card-content">
                                <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="product-image">
                                <div class="product-overlay">
                                    <h3 class="product-title">${category.strCategory}</h3>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    $('#meal-container').html(categories);

                    $('.product-card').on('click', function() {
                        const categoryName = $(this).data('category');
                        window.location.href = `category_detail.html?category=${categoryName}`;
                    });
                },
                error: function(error) {
                    console.log("Error fetching categories:", error);
                    $('#meal-container').html("<p>Error loading categories. Please try again later.</p>");
                }
            });
        }
    }
});

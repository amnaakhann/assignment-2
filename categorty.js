   // Assuming you have an array of categories fetched from the JSON file
   let categories = [];

   // Function to dynamically generate book categories in the navbar
   function generateBookCategories() {
     const dropdownMenu = document.querySelector(".navbar .dropdown-menu");
   
     // Clear existing categories
     dropdownMenu.innerHTML = "";
   
     // Create and append category links
     categories.forEach(category => {
       const categoryLink = document.createElement("a");
       categoryLink.classList.add("dropdown-item");
       categoryLink.href = `./categories.html?category=${category.toLowerCase()}`;
       categoryLink.textContent = category;
       dropdownMenu.appendChild(categoryLink);
     });
   }
   
   // Function to set the active category based on the URL parameter
   function setActiveCategory() {
       const urlParams = new URLSearchParams(window.location.search);
       const selectedCategory = urlParams.get("category");
     
       // Highlight the selected category in the navbar
       const categoryLinks = document.querySelectorAll(".navbar .dropdown-menu .dropdown-item");
       categoryLinks.forEach(link => {
         if (link.textContent.toLowerCase() === selectedCategory) {
           link.classList.add("active");
         } else {
           link.classList.remove("active");
         }
       });
     }
     
     // Call the functions to generate book categories and set the active category
     generateBookCategories();
     setActiveCategory();
     
     // Fetch data from Book.json using the Fetch API
   fetch('./books.json')
   .then(response => response.json())
   .then(data => {
     // Extract unique categories from the array of books
     categories = [...new Set(data.map(book => book.category))];
     
     // Call the function to generate book categories
     generateBookCategories();
   
     // Loop through the array of books and add each book card to the HTML
     data.forEach(book => {
       addBookCard(book);
     });
   })
   .catch(error => console.error('Error fetching data:', error));
   
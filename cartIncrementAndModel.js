// Function to get the cart count from localStorage
function getCartCount() {
    return localStorage.getItem('cartCount') || 0;
  }
  
  // Function to update the cart count element in the HTML
  function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    cartCountElement.textContent = getCartCount().toString();
  }
  
  // Function to set the cart count in localStorage
  function setCartCount(count) {
    localStorage.setItem('cartCount', count);
  }
  
  // Function to handle the "Add to Cart" button click
  function addToCart(bookId) {
    // Assuming you have a way to fetch the book data from book.json
    // For example, using fetch API
    fetch('./books.json')
      .then(response => response.json())
      .then(books => {
        // Find the book with the matching ID
        const book = books.find(book => book.id === bookId);
  
        if (book) {
          // Console log the book ID
          console.log(`Book added to cart: ${bookId}`);
  
          // Get the current cart count from localStorage
          cartCount = parseInt(getCartCount());
  
          // Increment the cart count
          cartCount++;
  
          // Update the cart count in localStorage
          setCartCount(cartCount);
  
          // Update the cart count in the HTML
          updateCartCount();
  
        

          // Get the current cart items from localStorage
          const cartItems = getCartItems();

          // Check if the book is already in the cart
          const existingItem = cartItems.find(item => item.id === book.id);

          if (existingItem) {
            // If the item is already in the cart, increment its quantity
            existingItem.quantity++;
          } else {
            // If the item is not in the cart, add it with a quantity of 1
            cartItems.push({
              id: book.id,
              title: book.title,
              price: book.price,
              author: book.author,
              image: book.image,
              quantity: 1
            });
          }

          // Update the cart items in localStorage
          setCartItems(cartItems);

          // Display the updated cart items in the HTML
          displayCartItems();

          // ... (rest of your existing code for showing the modal)
       

        } else {
          console.error(`Book with ID ${bookId} not found.`);
        }
      })
      .catch(error => console.error('Error fetching book data:', error));
  }
  
  // Initial setup: Update cart count when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
  });

 // Function to get the cart items from localStorage
 function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Function to update the cart items in localStorage
function setCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

   // Function to display the cart items in the HTML
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = ""; // Clear the container before updating

  const cartItems = getCartItems();

  // Loop through each item in the cart and display its details
  cartItems.forEach(item => {
    // Find the book with the matching ID to retrieve author information
    const book = books.find(book => book.id === item.id);

    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
      <td>${item.title}</td>
      <td>${book ? book.author : 'Unknown Author'}</td>
      <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;"></td>
      <td>${+'$' + item.price}</td>
      <td>${item.quantity}</td>
      <td>${'$' + (item.price * item.quantity)}</td>
      <td>
        <button onclick="deleteCartItem(${item.id})">Delete</button>
      </td>
    `;
    cartItemsContainer.appendChild(itemRow);
  });
}
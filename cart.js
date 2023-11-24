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
      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `
        <td>${item.title}</td>
        <td>${book ? book.author : 'Unknown Author'}</td>
        <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;"></td>
        <td>${'$' + item.price}</td>
        <td>${item.quantity}</td>
        <td>${'$' + (item.price * item.quantity)}</td>
        <td>
          <button onclick="deleteCartItem(${item.id})">Remove</button>
        </td>
      `;
      console.log(item.title);
      cartItemsContainer.appendChild(itemRow);
    });
  }

  // Function to add an item to the cart
  function addToCart(bookId) {
    // Assuming you have a way to fetch the book data from book.json
    // For example, using fetch API
    fetch('./books.json')
      .then(response => response.json())
      .then(books => {
        // Find the book with the matching ID
        const book = books.find(book => book.id === bookId);

        if (book) {
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

  // Function to delete an item from the cart
  function deleteCartItem(bookId) {
    const cartItems = getCartItems();

    // Find the index of the item with the specified bookId
    const index = cartItems.findIndex(item => item.id === bookId);

    if (index !== -1) {
      // Remove the item from the array
      cartItems.splice(index, 1);

      // Update the cart items in localStorage
      setCartItems(cartItems);

      // Display the updated cart items in the HTML
      displayCartItems();
    }
  }

  
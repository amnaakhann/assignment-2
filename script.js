
fetch('./books.json')
.then(response => response.json())
.then(data => {
  // Loop through the array of books and add each book card to the HTML
  data.forEach(book => {
    addBookCard(book);
    addToCart(book.id, book.title, book.description, book.author, book.cover_image);
  });
})
.catch(error => console.error('Error fetching data:', error));


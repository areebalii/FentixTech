// 1️⃣ Dynamic Product Data Storage
const products = [
  { id: 1, name: "Minimalist Black Chair", category: "chair", price: 154.00, img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" },
  { id: 2, name: "Wireframe Pendant Light", category: "light", price: 64.99, img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80" },
  { id: 3, name: "Modern White Desk", category: "table", price: 224.00, img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80" },
  { id: 4, name: "Grey Desk Lamp", category: "light", price: 47.00, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { id: 5, name: "Classic Wall Clock", category: "accessories", price: 87.00, img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80" },
  { id: 6, name: "Luxury Velvet Sofa", category: "sofa", price: 450.00, img: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&q=80" }
];

// 3️⃣ Persistent Shopping Cart Setup
let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
document.getElementById('cartCount').textContent = cartCount;

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Function to Render Products dynamically
function renderProducts(productsToRender) {
  productGrid.innerHTML = ""; // Clear current products

  if (productsToRender.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
        `;
    productGrid.appendChild(productCard);
  });
}

// Initial Render
renderProducts(products);

// Add to Cart Logic
function addToCart() {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  localStorage.setItem('cartCount', cartCount); // Save to local storage
}

// 2️⃣ Category Filtering Logic
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    e.target.classList.add('active');

    const category = e.target.getAttribute('data-category');

    if (category === 'all') {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(product => product.category === category);
      renderProducts(filteredProducts);
    }
  });
});

// 4️⃣ Product Search Logic
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const searchedProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  // reset filters visually to "All" when searching
  filterBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('[data-category="all"]').classList.add('active');

  renderProducts(searchedProducts);
});
// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');
const accountLink = document.getElementById('account-link');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// State
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// In your script.js, update the initialization
let orders = JSON.parse(localStorage.getItem('orders')) || [];
// Initialize the app
function init() {
    loadProducts();
    updateCartCount();
    setupLogoutButton();
    checkAuthState();
    setupEventListeners();
    
    // If on products page, render all products
    if (window.location.pathname.includes('products.html')) {
        renderProducts(products);
        setupProductFilters();
    }
    
    // If on home page, render featured products
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        renderFeaturedProducts();
    }
    
    // If on account page, setup login form
    if (window.location.pathname.includes('account.html')) {
        setupLoginForm();
    }
    
    // If on register page, setup register form
    if (window.location.pathname.includes('register.html')) {
        setupRegisterForm();
    }
}

// Load products from the "database"
function loadProducts() {
    products = [
        // Home (12 products)
        {
            id: 1,
            name: 'Bamboo Toothbrush',
            price: 4.99,
            category: 'home',
            description: 'Eco-friendly bamboo toothbrush with biodegradable bristles.',
            image:'https://media.istockphoto.com/id/1311568537/photo/toiletries-still-life.webp?a=1&b=1&s=612x612&w=0&k=20&c=8ESG3jH9wUlLWibt2TrYOSWSXaQBmrcEl1UWIogLDkg=' ,
            featured: true
        },
        {
            id: 2,
            name: 'Reusable Shopping Bag',
            price: 12.99,
            category: 'home',
            description: 'Sturdy reusable shopping bag made from recycled materials.',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            featured: true
        },
        {
            id: 3,
            name: 'Organic Cotton T-shirt',
            price: 24.99,
            category: 'home',
            description: '100% organic cotton t-shirt, fair trade certified.',
            image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            featured: true
        },
        {
            id: 4,
            name: 'Stainless Steel Water Bottle',
            price: 19.99,
            category: 'home',
            description: 'Double-walled stainless steel water bottle, keeps drinks cold for 24 hours.',
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            featured: true
        },
        {
            id: 5,
            name: 'Beeswax Food Wraps',
            price: 14.99,
            category: 'kitchen',
            description: 'Set of 3 reusable beeswax food wraps, perfect alternative to plastic wrap.',
            image:' https://media.istockphoto.com/id/134672151/photo/isolated-shot-of-closed-brown-paper-bag-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=WNa84UaTACIZCZVDgV6pbfsP43RTqac26-OOCG-IyJs=',
            featured: true
        },
        {
            id: 6,
            name: 'Bamboo Cutting Board',
            price: 29.99,
            category: 'kitchen',
            description: 'Sustainable bamboo cutting board, durable and knife-friendly.',
            image: 'https://media.istockphoto.com/id/499781725/photo/variety-is-the-spice-of-life.webp?a=1&b=1&s=612x612&w=0&k=20&c=4akAoh7o_Rft8gvsIMqxBJ8ZrIDQ1cFA9EGXhJIVozw=',
            featured: true
        },
        {
            id: 7,
            name: 'Recycled Notebook',
            price: 8.99,
            category: 'office',
            description: 'Notebook made from 100% recycled paper, perfect for eco-conscious writers.',
            image: 'https://plus.unsplash.com/premium_photo-1667251760532-85310936c89a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVjeWNsZWQlMjBub3RlYm9va3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            id: 8,
            name: 'Solar Powered Charger',
            price: 49.99,
            category: 'outdoor',
            description: 'Portable solar charger for phones and small devices, perfect for camping.',
            image: 'https://media.istockphoto.com/id/949299902/photo/portable-solar-panel-is-on-the-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=kEWKRIZpGuVNj4EnJsswIyopwDTTHWBP1dbDD39dbpo='
        },
        {
            id: 9,
            name: 'Bamboo Straw Set',
            price: 9.99,
            category: 'kitchen',
            description: 'Set of 4 reusable bamboo straws with cleaning brush.',
            image: 'https://plus.unsplash.com/premium_photo-1689247409618-aadab030a18d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RyYXclMjBzZXR8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 10,
            name: 'Organic Cotton Tote Bag',
            price: 15.99,
            category: 'fashion',
            description: 'Spacious tote bag made from organic cotton, perfect for everyday use.',
            image: 'https://media.istockphoto.com/id/1185049680/photo/eco-friendly-beige-colour-fashion-canvas-tote-bag.webp?a=1&b=1&s=612x612&w=0&k=20&c=kS2gOaR96U7MdN6ijNila1UGhSj_qcUsKUjQqUZ8WcU='
        },
        {
            id: 11,
            name: 'Hemp Yoga Mat',
            price: 59.99,
            category: 'fitness',
            description: 'Eco-friendly yoga mat made from natural hemp fibers.',
            image: 'https://media.istockphoto.com/id/1288409428/photo/woman-rolling-up-exercise-mat-and-preparing-doing-yoga-or-fitness.webp?a=1&b=1&s=612x612&w=0&k=20&c=jey2C4jOz8DRasUnv5lv_a2c-Z7F3Q9HpvqHHzb06c0='
        },
        {
            id: 12,
            name: 'Wooden Hairbrush',
            price: 18.99,
            category: 'personal-care',
            description: 'Natural wooden hairbrush with boar bristles, reduces static and breakage.',
            image: 'https://media.istockphoto.com/id/1172559581/photo/top-view-of-wooden-comb.webp?a=1&b=1&s=612x612&w=0&k=20&c=QyfYYWhXuguDwZVyDL6qMD3lJBnWqOgvbfCJXAD78Co='
        },
        // Fashion (12 products)
        {
            id: 13,
            name: 'Organic Cotton Socks',
            price: 12.99,
            category: 'fashion',
            description: 'Pack of 3 organic cotton socks in various colors.',
            image: 'https://plus.unsplash.com/premium_photo-1664297793769-b1f4ceb6d823?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y290dG9uJTIwc29ja3N8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 14,
            name: 'Recycled Polyester Jacket',
            price: 89.99,
            category: 'fashion',
            description: 'Water-resistant jacket made from recycled polyester.',
            image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 15,
            name: 'Hemp Backpack',
            price: 45.99,
            category: 'fashion',
            description: 'Durable backpack made from hemp fabric with laptop compartment.',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 16,
            name: 'Organic Linen Shirt',
            price: 39.99,
            category: 'fashion',
            description: 'Breathable linen shirt made from organic flax.',
            image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 17,
            name: 'Recycled Rubber Shoes',
            price: 59.99,
            category: 'fashion',
            description: 'Comfortable shoes made from recycled rubber and organic cotton.',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 18,
            name: 'Bamboo Sunglasses',
            price: 34.99,
            category: 'fashion',
            description: 'Stylish sunglasses with frames made from sustainable bamboo.',
            image: 'https://media.istockphoto.com/id/1413265947/photo/wooden-sunglasses.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z11AnHOOTJQ8l6zxUgaqRgAXoBatgrnNDMa83QwfxeY='
        },
        {
            id: 19,
            name: 'Organic Cotton Mask',
            price: 14.99,
            category: 'fashion',
            description: 'Pack of 2 Masks  made from 100% organic cotton.',
            image: 'https://images.unsplash.com/photo-1587583911594-a7c8abaadfce?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 20,
            name: 'Cork Wallet',
            price: 24.99,
            category: 'fashion',
            description: 'Slim wallet made from sustainable cork material.',
            image: 'https://images.unsplash.com/photo-1620109176813-e91290f6c795?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29yayUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            id: 21,
            name: 'Hemp Hat',
            price: 22.99,
            category: 'fashion',
            description: 'Stylish sun hat made from durable hemp fabric.',
            image: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 22,
            name: 'Organic Wool Scarf',
            price: 29.99,
            category: 'fashion',
            description: 'Warm winter scarf made from organic merino wool.',
            image: 'https://media.istockphoto.com/id/154046595/photo/blue-winter-scarf.webp?a=1&b=1&s=612x612&w=0&k=20&c=fgQl-AOkn_73Tb0ZHvCsDUwiL5n896oINp0vqtQRT6E='
        },
        {
            id: 23,
            name: 'Recycled Denim Jeans',
            price: 49.99,
            category: 'fashion',
            description: 'Classic jeans made from recycled denim material.',
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 24,
            name: 'Bamboo Fiber Socks',
            price: 11.99,
            category: 'fashion',
            description: 'Pack of 3 socks made from soft bamboo fiber.',
            image: 'https://media.istockphoto.com/id/2189053921/photo/wool-socks-market.webp?a=1&b=1&s=612x612&w=0&k=20&c=wKcfhkdyv2_FD-8r3e0E_XjdAyz7g6IrHnZSNwfwjec='
        },
        // Personal Care (12 products)
        {
            id: 25,
            name: 'Natural Deodorant',
            price: 8.99,
            category: 'personal-care',
            description: 'Aluminum-free deodorant with natural ingredients.',
            image: 'https://media.istockphoto.com/id/1049296594/photo/perfume-deodorant-body-spray.webp?a=1&b=1&s=612x612&w=0&k=20&c=fuLAUIgs0fs9pDmsHQbQmDTjMoYwD2KMolj715OdARg='
        },
        {
            id: 26,
            name: 'Cotton Towel',
            price: 7.99,
            category: 'personal-care',
            description: 'Cotton towel with plastic-free packaging.',
            image: 'https://images.unsplash.com/photo-1523471826770-c437b4636fe6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG93ZWx8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 27,
            name: 'Bamboo Toothpaste Tablets',
            price: 9.99,
            category: 'personal-care',
            description: 'Zero-waste toothpaste tablets in a reusable bamboo container.',
            image: 'https://media.istockphoto.com/id/1150490014/photo/zero-waste-sustainability-and-minimalism-concept-wooden-ecological-bathroom-accessories-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=qZwjYiPbaAC-yNfREQ33rug1biw11MBuJZJgzIqni2U='
        },
        {
            id: 28,
            name: 'Organic Lip Balm',
            price: 4.99,
            category: 'personal-care',
            description: 'Moisturizing lip balm made with organic beeswax and oils.',
            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlwJTIwYmFsbXxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            id: 29,
            name: 'Safety Razor',
            price: 24.99,
            category: 'personal-care',
            description: 'Stainless steel safety razor with replaceable blades.',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 30,
            name: 'Bamboo Cotton Swabs',
            price: 5.99,
            category: 'personal-care',
            description: 'Biodegradable cotton swabs with bamboo sticks.',
            image: 'https://plus.unsplash.com/premium_photo-1664007603175-b339ab65a80f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y290dG9uJTIwc3dhYnN8ZW58MHx8MHx8fDA%3D'
        },
        {
            id: 31,
            name: 'Organic Face Cream',
            price: 19.99,
            category: 'personal-care',
            description: 'Nourishing face cream with organic shea butter and oils.',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 33,
            name: 'Natural Soap Bar',
            price: 7.99,
            category: 'personal-care',
            description: 'Handmade soap with organic oils and essential oils.',
            image: 'https://media.istockphoto.com/id/1319517143/photo/natural-bar-soap.webp?a=1&b=1&s=612x612&w=0&k=20&c=u3hAXiv5d_n-Ewm6XfNOG0i4ipN1akJySBlUstDokjA='
        },
        {
            id: 34,
            name: 'Bamboo Hair Comb',
            price: 8.99,
            category: 'personal-care',
            description: 'Wide-tooth comb made from sustainable bamboo.',
            image: 'https://images.unsplash.com/photo-1607602132700-0681204ef11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 35,
            name: 'Organic Sunscreen',
            price: 14.99,
            category: 'personal-care',
            description: 'Mineral-based sunscreen with organic ingredients.',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 36,
            name: 'Reusable Makeup Pads',
            price: 12.99,
            category: 'personal-care',
            description: 'Set of 10 reusable cotton rounds for makeup removal.',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        // Kitchen (12 products)
        {
            id: 37,
            name: 'Glass Food Storage Set',
            price: 39.99,
            category: 'kitchen',
            description: 'Set of 5 glass food storage containers with bamboo lids.',
            image: 'https://images.unsplash.com/photo-1583947581924-a8b1cf315997?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 38,
            name: 'Bamboo Utensil Set',
            price: 19.99,
            category: 'kitchen',
            description: 'Set of 5 cooking utensils made from sustainable bamboo.',
            image: 'https://images.unsplash.com/photo-1583947581924-c9c8afb1c3e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 39,
            name: 'Silicone Food Covers',
            price: 14.99,
            category: 'kitchen',
            description: 'Set of 6 stretchable silicone lids to replace plastic wrap.',
            image: 'https://images.unsplash.com/photo-1583947581924-a8b1cf315997?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 40,
            name: 'Compost Bin',
            price: 29.99,
            category: 'kitchen',
            description: 'Countertop compost bin with charcoal filter.',
            image: 'https://images.unsplash.com/photo-1583947581924-c9c8afb1c3e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 41,
            name: 'Bamboo Cutting Board',
            price: 24.99,
            category: 'kitchen',
            description: 'Durable bamboo cutting board with juice groove.',
            image: 'https://images.unsplash.com/photo-1583947581924-c9c8afb1c3e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 42,
            name: 'Reusable Produce Bags',
            price: 9.99,
            category: 'kitchen',
            description: 'Set of 5 mesh produce bags for grocery shopping.',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 43,
            name: 'Stainless Steel Straws',
            price: 7.99,
            category: 'kitchen',
            description: 'Set of 4 stainless steel straws with cleaning brush.',
            image: 'https://images.unsplash.com/photo-1565693411106-7a5d2a4e8b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 44,
            name: 'Beeswax Food Wraps',
            price: 14.99,
            category: 'kitchen',
            description: 'Set of 3 reusable beeswax wraps for food storage.',
            image: 'https://images.unsplash.com/photo-1583947581924-a8b1cf315997?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 45,
            name: 'Glass Straws',
            price: 12.99,
            category: 'kitchen',
            description: 'Set of 2 durable glass straws with cleaning brush.',
            image: 'https://images.unsplash.com/photo-1565693411106-7a5d2a4e8b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 46,
            name: 'Bamboo Dinnerware Set',
            price: 49.99,
            category: 'kitchen',
            description: 'Set of 4 plates and bowls made from sustainable bamboo.',
            image: 'https://images.unsplash.com/photo-1583947581924-c9c8afb1c3e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 47,
            name: 'Silicone Baking Mats',
            price: 19.99,
            category: 'kitchen',
            description: 'Set of 2 non-stick silicone baking mats.',
            image: 'https://images.unsplash.com/photo-1583947581924-a8b1cf315997?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 48,
            name: 'Reusable Coffee Filter',
            price: 9.99,
            category: 'kitchen',
            description: 'Stainless steel reusable coffee filter for drip machines.',
            image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        // Office (12 products)
        {
            id: 49,
            name: 'Recycled Pen Set',
            price: 14.99,
            category: 'office',
            description: 'Set of 3 pens made from recycled materials.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 50,
            name: 'Bamboo Notebook',
            price: 12.99,
            category: 'office',
            description: 'Notebook with bamboo cover and recycled paper.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 51,
            name: 'Plantable Pencil',
            price: 9.99,
            category: 'office',
            description: 'Pencils with seeds in the end that grow into herbs when planted.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 52,
            name: 'Recycled Paper Sticky Notes',
            price: 5.99,
            category: 'office',
            description: 'Pack of 5 sticky note pads made from recycled paper.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 53,
            name: 'Bamboo Desk Organizer',
            price: 29.99,
            category: 'office',
            description: 'Minimalist desk organizer made from sustainable bamboo.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 54,
            name: 'Solar Powered Calculator',
            price: 12.99,
            category: 'office',
            description: 'Basic calculator powered by solar energy.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 55,
            name: 'Recycled Binder',
            price: 14.99,
            category: 'office',
            description: '3-ring binder made from 100% recycled materials.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 56,
            name: 'Hemp Backpack',
            price: 59.99,
            category: 'office',
            description: 'Durable backpack made from hemp fabric with laptop compartment.',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 57,
            name: 'Bamboo Mouse Pad',
            price: 9.99,
            category: 'office',
            description: 'Eco-friendly mouse pad made from bamboo fiber.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 58,
            name: 'Recycled Paper Notebook',
            price: 8.99,
            category: 'office',
            description: 'Notebook made from 100% recycled paper.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 59,
            name: 'Bamboo USB Drive',
            price: 14.99,
            category: 'office',
            description: '32GB USB flash drive with bamboo casing.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 60,
            name: 'Plant-Based Highlighters',
            price: 7.99,
            category: 'office',
            description: 'Set of 4 highlighters made from plant-based materials.',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        // Outdoor (12 products)
        {
            id: 61,
            name: 'Camping Utensil Set',
            price: 19.99,
            category: 'outdoor',
            description: 'Compact utensil set for camping made from stainless steel.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 62,
            name: 'Solar Powered Lantern',
            price: 29.99,
            category: 'outdoor',
            description: 'Portable lantern that charges via solar power.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 63,
            name: 'Recycled Picnic Blanket',
            price: 34.99,
            category: 'outdoor',
            description: 'Water-resistant picnic blanket made from recycled materials.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 64,
            name: 'Bamboo Sunglasses',
            price: 39.99,
            category: 'outdoor',
            description: 'UV-protective sunglasses with bamboo frames.',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 65,
            name: 'Reusable Water Balloons',
            price: 14.99,
            category: 'outdoor',
            description: 'Set of 6 reusable silicone water balloons.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 66,
            name: 'Hammock',
            price: 49.99,
            category: 'outdoor',
            description: 'Durable hammock made from recycled materials.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 67,
            name: 'Bamboo Travel Cutlery Set',
            price: 12.99,
            category: 'outdoor',
            description: 'Portable cutlery set with bamboo case.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 68,
            name: 'Solar Charger',
            price: 39.99,
            category: 'outdoor',
            description: 'Portable solar charger for phones and small devices.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 69,
            name: 'Recycled Yoga Mat',
            price: 44.99,
            category: 'outdoor',
            description: 'Eco-friendly yoga mat made from recycled materials.',
            image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 70,
            name: 'Bamboo Water Bottle',
            price: 24.99,
            category: 'outdoor',
            description: 'Insulated water bottle with bamboo lid.',
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 71,
            name: 'Recycled Beach Towel',
            price: 29.99,
            category: 'outdoor',
            description: 'Large beach towel made from recycled cotton.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 72,
            name: 'Bamboo Picnic Set',
            price: 59.99,
            category: 'outdoor',
            description: 'Complete picnic set with bamboo plates, cups, and utensils.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ];
}

// Render featured products on home page
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Only show first 4 featured products
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    
    featuredContainer.innerHTML = ''; // Clear existing content
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        featuredContainer.appendChild(productCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Render products to the page
function renderProducts(productsToRender) {
    const container = document.getElementById('product-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p class="no-products">No products match your filters.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Setup product filters
function setupProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchFilter = document.getElementById('search-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (searchFilter) {
        searchFilter.addEventListener('input', filterProducts);
    }
}

// Filter products based on user selection
function filterProducts() {
    const category = document.getElementById('category-filter')?.value || 'all';
    const priceRange = document.getElementById('price-filter')?.value || 'all';
    const searchTerm = document.getElementById('search-filter')?.value.toLowerCase() || '';
    
    let filteredProducts = products;
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Cart functions
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showAddedToCartMessage(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function renderCartItems() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (document.querySelector('.cart-total')) {
            document.querySelector('.cart-total').style.display = 'none';
        }
        return;
    }
    
    if (document.querySelector('.cart-total')) {
        document.querySelector('.cart-total').style.display = 'block';
    }
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <span class="cart-item-remove" data-id="${item.id}">&times;</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Add event listeners to quantity controls
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

function updateQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const newQuantity = parseInt(e.target.value);
    
    if (newQuantity > 0) {
        item.quantity = newQuantity;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    removeFromCart(productId);
}

function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'added-to-cart-message';
    message.textContent = `${productName} added to cart!`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 2000);
}

// Modal functions
function openCartModal() {
    if (cartModal) {
        cartModal.style.display = 'block';
        renderCartItems();
    }
}

function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    if (cartModal) cartModal.style.display = 'none';
    
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.style.display = 'block';
        
        // Pre-fill form if user is logged in
        if (currentUser) {
            document.getElementById('checkout-name').value = currentUser.name;
            document.getElementById('checkout-email').value = currentUser.email;
        }
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.style.display = 'none';
}

function openConfirmationModal(orderId, email) {
    closeCheckoutModal();
    
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) {
        confirmationModal.style.display = 'block';
        document.getElementById('order-id').textContent = orderId;
        document.getElementById('confirmation-email').textContent = email;
        
        // Setup continue shopping button
        const continueBtn = document.getElementById('continue-shopping');
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeConfirmationModal();
                window.location.href = 'products.html';
            });
        }
    }
}

function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) confirmationModal.style.display = 'none';
}

// User authentication functions
    
function checkAuthState() {
    if (!accountLink) return;
    
    if (currentUser) {
        // User is logged in
        accountLink.textContent = 'My Account';
        accountLink.href = 'account.html';
        
        // If on account page, show account info
        const loginSection = document.getElementById('login-section');
        const accountInfo = document.getElementById('account-info');
        
        if (loginSection && accountInfo) {
            loginSection.style.display = 'none';
            accountInfo.style.display = 'block';
            
            // Display user info
            document.getElementById('user-name').textContent = currentUser.name;
            document.getElementById('user-email').textContent = currentUser.email;
            
            // Load user's orders immediately
            loadUserOrders();
        }
    } else {
        // User is not logged in
        accountLink.textContent = 'Login';
        accountLink.href = 'account.html';
        
        // If on account page, show login form
        const loginSection = document.getElementById('login-section');
        const accountInfo = document.getElementById('account-info');
        
        if (loginSection && accountInfo) {
            loginSection.style.display = 'block';
            accountInfo.style.display = 'none';
        }
    }
}  

function login(email, password) {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            name: user.name,
            email: user.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMessage('Login successful!', 'success');
        
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
        
        return true;
    } else {
        showMessage('Invalid email or password', 'error');
        return false;
    }
}

function register(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return false;
    }
    
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        showMessage('Email already registered', 'error');
        return false;
    }
    
    // Add new user
    users.push({
        name,
        email,
        password // In a real app, you would hash the password
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('Registration successful! Redirecting to login...', 'success');
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'account.html';
    }, 2000);
    
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showMessage('Logged out successfully', 'success');
    
    // Redirect to login page after showing message
    setTimeout(() => {
        window.location.href = 'account.html';
    }, 1500);
}



// Helper function for showing messages
function showMessage(text, type) {
    // Remove any existing messages first
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    
    // Try to find the best place to put the message
    const forms = document.querySelector('.account-forms') || document.querySelector('form') || document.body;
    
    if (forms) {
        if (forms.tagName === 'FORM') {
            forms.parentNode.insertBefore(messageDiv, forms);
        } else {
            forms.insertBefore(messageDiv, forms.firstChild);
        }
    } else {
        // Fallback if no suitable container found
        document.body.prepend(messageDiv);
    }
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Order functions
function placeOrder(name, email, address, paymentMethod) {
    const orderId = 'ECO-' + Date.now().toString().slice(-6);
    
    const order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: {
            name,
            email
        },
        shippingAddress: address,
        paymentMethod,
        status: 'completed',
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    existingOrders.push(order);
    
    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Update global orders variable
    orders = existingOrders;
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Show confirmation
    openConfirmationModal(orderId, email);
    
    // Force reload orders if on account page
    if (window.location.pathname.includes('account.html')) {
        loadUserOrders();
    }
}
function loadUserOrders() {
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;

    // Refresh from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (!currentUser) {
        ordersContainer.innerHTML = '<p class="no-orders">Please login to view order history</p>';
        return;
    }
    
    // Filter orders for current user
    const userOrders = allOrders.filter(order => 
        order.customer && 
        order.customer.email === currentUser.email
    );
    
    // Clear container
    ordersContainer.innerHTML = '';
    
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = '<p class="no-orders">You haven\'t placed any orders yet.</p>';
        return;
    }
    
    // Sort by date (newest first)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
             .forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">Qty: ${item.quantity}</div>
                <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
        
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-id">Order #${order.id}</div>
                <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                <div class="order-status ${order.status}">${order.status}</div>
            </div>
            <div class="order-items">
                ${itemsHtml}
            </div>
            <div class="order-total">
                Total: $${order.total.toFixed(2)}
            </div>
        `;
        
        ordersContainer.appendChild(orderCard);
    });
}


// Setup register form
function setupRegisterForm() {
    const registerForm = document.getElementById('register');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        register(name, email, password, confirm);
    });
}

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('login');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        login(email, password);
    });
}

// Setup logout button
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', logout);
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            if (nav) nav.classList.toggle('active');
        });
    }
    
    // Cart button
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }
    
    // Close cart modal
    if (closeCart) {
        closeCart.addEventListener('click', closeCartModal);
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Check if user is logged in
            if (!currentUser) {
                showMessage('Please login to proceed to checkout', 'error');
                // Redirect to login after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'account.html';
                }, 1500);
                return;
            }
            openCheckoutModal();
        });
    }
    
    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('checkout-name').value;
            const email = document.getElementById('checkout-email').value;
            const address = document.getElementById('checkout-address').value;
            const paymentMethod = document.getElementById('checkout-payment').value;
            
            placeOrder(name, email, address, paymentMethod);
        });
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeConfirmationModal);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
        
        const checkoutModal = document.getElementById('checkout-modal');
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
        
        const confirmationModal = document.getElementById('confirmation-modal');
        if (e.target === confirmationModal) {
            closeConfirmationModal();
        }
    });
    
    // Close checkout modal
    const closeCheckout = document.querySelector('.close-checkout');
    if (closeCheckout) {
        closeCheckout.addEventListener('click', closeCheckoutModal);
    }
    
    // Close confirmation modal
    const closeConfirmation = document.querySelector('.close-confirmation');
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', closeConfirmationModal);
    }
    
    // Setup login form if on account page
    if (window.location.pathname.includes('account.html')) {
        setupLoginForm();
        setupLogoutButton();
    }
    
    // Setup register form if on register page
    if (window.location.pathname.includes('register.html')) {
        setupRegisterForm();
    }
}
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}
// Initialize the app
document.addEventListener('DOMContentLoaded', init);
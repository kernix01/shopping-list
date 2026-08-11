let shopList = JSON.parse(localStorage.getItem('shopList')) || [];

const themeToggle = document.querySelector('#theme-toggle');
const shopInput = document.querySelector('#shop-input');
const shopForm = document.querySelector('#shop-form');
const listContainer = document.querySelector('#list-container');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

shopForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (shopInput.value.trim() === "") {
        console.log("Поле пустое");
        renderList();
    } else {
        const newShopList = {
            id: Date.now(),
            name: shopInput.value,
            isBought: false
        };

        shopList.push(newShopList);

        console.log(shopList);

        shopInput.value = "";
        renderList();
        localStorage.setItem('shopList', JSON.stringify(shopList));
    }
});

const renderList = () => {
    listContainer.innerHTML = '';

    shopList.forEach((product) => {
        const isCompleted = product.isBought ? 'completed' : '';
        const isChecked = product.isBought ? 'checked' : '';
        
        const shopCard = document.createElement('div');
        shopCard.classList.add('product-item');
        shopCard.classList.toggle('completed', product.isBought);

        shopCard.innerHTML = `
        <div class="product-info">
        <input type="checkbox" class="product-checkbox" data-id="${product.id}" ${isChecked}>
        <span class="product-name">${product.name}</span>
        </div>
        <button class="delete-btn" data-id="${product.id}">УДАЛИТЬ</button>
        `;

        // Выкладываем карточку на страницу
        listContainer.appendChild(shopCard);
    });
};

listContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-checkbox')) {
        const productId = Number(e.target.dataset.id);

        const foundList = shopList.find(s => s.id === productId);

        if (foundList) {
            foundList.isBought = !foundList.isBought;
        }

        renderList();
        localStorage.setItem('shopList', JSON.stringify(shopList));
    }

    if (e.target.classList.contains('delete-btn')) {
    const productId = Number(e.target.dataset.id);

    const card = e.target.closest('.product-item');

    card.classList.add('removing');

    setTimeout(() => {
        shopList = shopList.filter(product => product.id !==productId);
        renderList();
        localStorage.setItem('shopList', JSON.stringify(shopList));
    }, 250);
}
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if(currentTheme === "dark") {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }


});

renderList();
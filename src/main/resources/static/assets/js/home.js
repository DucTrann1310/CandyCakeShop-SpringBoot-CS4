const home = {
    url: {
        getAllProduct: 'http://localhost:8080/api/home',
        getAllCategories: 'http://localhost:8080/api/categories',
        createProduct: 'http://localhost:8080/api/home',
        updateProduct: 'http://localhost:8080/api/home/',
        getProductById: 'http://localhost:8080/api/home/'
    },
    elements: {},
    loadData: {},
    commands: {}
}

let productId = 0;

home.elements.renderProd = $("#renderProd");
async function getAllProductsAtHome() {
    return await $.ajax({
        url: home.url.getAllProduct
    })
}

home.loadData.getAllProductsAtHome = async () => {
    const products = await getAllProductsAtHome();

    products.forEach(item => {
        const str = home.commands.renderProductAtHome(item)

        home.elements.renderProd.append(str);

        // home.commands.handleClickRow();
    })
    // console.log(home.elements.renderProd)
}

home.loadData.getProductByIdAtHome = async () => {
    return await $.ajax({
        url: home.url.getProductById + productId
    })
}
home.commands.renderProductAtHome = (obj) => {
    return `
    <div class="food-item" id="no_${obj.id}">
        <div class="item-wrap bottom-up play-on-scroll">
            <div class="item-img">
                <div class="img-holder bg-img"
                     style="background-image: url(/static/assets/img/phoenixmeomeo.jpg);">
                </div>
            </div>
            <div class="item-info">
                <div>
                    <h3>
                        ${obj.productName}
                    </h3>
                    <span>
                        Price: ${obj.price}
                    </span>
                </div>
                <div class="cart-btn">
                    <button class="cart-btn btn" data-id="${obj.id}">
                        <i class="bx bx-cart-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
}

home.commands.getAllCategories = async () => {

    // home.elements.categoryCre.empty();
    // home.elements.categoryUp.empty();

    await $.ajax({
        url: home.url.getAllCategories
    })
        .done((categories) => {
            $.each(categories, (index, item) => {
                const str = `<option value="${item.id}">${item.categoryName}</option>`

                // home.elements.categoryCre.append(str)
                // home.elements.categoryUp.append(str)

            })
        })
};


$(async () => {

    await home.loadData.getAllProductsAtHome();

    await home.commands.getAllCategories();



})
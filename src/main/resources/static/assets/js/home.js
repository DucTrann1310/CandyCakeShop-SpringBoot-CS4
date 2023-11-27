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
home.elements.modalDetail = $("#modalProductDetailBody");
home.elements.modalProductDetail = $("#modalProductDetail")
async function getAllProductsAtHome() {
    return await $.ajax({
        url: home.url.getAllProduct
    })
}

home.loadData.getAllProductsAtHome = async () => {
    const products = await getAllProductsAtHome();

    products.forEach(item => {
        const str = home.commands.renderProductsAtHome(item)

        home.elements.renderProd.append(str);

        home.commands.handleClickButton();
    })
    // console.log(home.elements.renderProd)
    console.log(home.commands.renderProductDetail(getProductDetail()))
}

async function getProductDetail() {
    return await $.ajax({
        url: home.url.getProductById + productId
    })
}

home.loadData.getProductDetail = async () => {
    const detail = await getProductDetail();
    const str = home.commands.renderProductDetail(detail);
    home.elements.modalDetail.append(str);
    home.commands.handleClickButton()
}

home.loadData.getProductByIdAtHome = async () => {
    return await $.ajax({
        url: home.url.getProductById + productId
    })
}

home.commands.renderProductsAtHome = (obj) => {
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
                        <button data-id="${obj.id}" class="btn cart-btn" data-bs-toggle="modal" data-bs-target="#modalProductDetail">
                          <i class="bx bx-cart-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

home.commands.renderProductDetail = (obj) => {
    return `
        <div class="row">
                        <div class="col-8" id="img-product">
                            <img src="/static/assets/img/${obj.img}" alt="loi~ anh?">
                        </div>
                        <div class="col-4">
                            <div class="" id="detail-product">
                                <h3 id="idProduct" style="display: none">
                                    ${obj.id}
                                </h3>
                                <h4 class="mtext-105 cl2 js-name-detail p-b-14" id="nameProduct">
                                    ${obj.productName}
                                </h4>
                                <p class="stext-106 cl2 product-price" id="priceProduct">Price: ${obj.price}</p>
                                <p class="stext-102 cl3 p-t-23" id="describeProduct">
                                    Description: ${obj.description}
                                </p>
                            </div>
                            <form action="" method="post" id="formDetail" class="">
                                <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                                    <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                        <input type="text" hidden="hidden" name="idProduct" value="id product">
                                        <input type="text" hidden="hidden" value="name user" name="idUser">
                                        <i class="fs-16 zmdi zmdi-minus"></i>
                                    </div>
                                    <label>
                                        <input min="1" max="${obj.quantity}" name="quantity"
                                               id="productQuantity" type="number" value="1"
                                               style="text-align: center">
                                        <p id="totalCheckOut">Total: 0</p>
                                    </label>
                                    <div class="btn-num-product-up cl8 hov-b tn3 trans-04 flex-c-m"
                                         id="btn-num-product-up">
                                        <i class="fs-16 zmdi zmdi-plus"></i>
                                    </div>
                                </div>
                                <button type="submit"
                                        class="btn btn-outline-success"
                                        data-product-id="${obj.id}">
                                    Add to cart
                                </button>
                            </form>
                        </div>
                    </div>
    `
}

home.commands.handleClickButton = () => {

    home.elements.btn = $(".cart-btn")

    home.elements.btn.off("click");

    home.elements.btn.each((index, item) => {

        $(item).on("click", async () => {

            productId = item.getAttribute("data-id")

            const product = await home.loadData.getProductDetail(productId)

            // home.elements.productNameUp.val(product.productName);
            // await home.commands.getAllCategories();
            // await home.elements.categoryUp.val(product.category.id);
            // home.elements.priceUp.val(product.price);
            // home.elements.productDescriptionUp.val(product.description)
        })
    })
}

home.elements.modalProductDetail.on('hidden.bs.modal',  () => {
    $('#modalProductDetail .area-error').empty().addClass('hide');
    $('#modalProductDetail').trigger('reset')

    home.elements.modalDetail.empty()


})

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

    await home.loadData.getProductDetail();



})
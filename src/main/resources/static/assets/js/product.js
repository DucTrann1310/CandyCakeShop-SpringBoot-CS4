const page = {
    url: {
        getAllProduct: 'http://localhost:8080/api/products',
        getAllCategories: 'http://localhost:8080/api/categories'
    },
    elements: {},
    loadData: {},
    commands: {}
}
page.elements.bodyProduct = $("#tbProduct tbody")
page.elements.categoryCre = $("#categoryCre")

async function getAllProducts() {
    return await $.ajax({
        url: page.url.getAllProduct
    })
}

async function getAllCategories() {
    return await $.ajax({
        url: page.url.getAllCategories
    })
}

page.loadData.getAllProducts = async () => {
    const products = await getAllProducts();

    products.each(item => {
        const str = page.commands.renderProduct(item)

        page.elements.bodyProduct.append(str);
    })
}

page.commands.getAllCategories = async () => {
    page.elements.categoryCre.empty();
    await $.ajax({
        url: page.url.getAllCategories
    })
        .done((data) => {
            const categories = data;
            console.log(categories)
            $.each(categories, (index, item) => {
                const str = `<option value="${item.id}">${item.name}</option>`
                console.log(str)
                page.elements.categoryCre.append(str)

            })
        })
};

page.commands.renderProduct = (obj) => {
    return `
        <tr id="tr_${obj.id}">
            <td>${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.category.name}</td>
            <td>${obj.description}</td>
            <td>${obj.price}</td>
<!--            <td>${obj.img}</td>-->
            <td> <a class="btn btn-info" href="/product?action=edit&id=${product.id}">Edit</a>
                 <a class="btn btn-danger"
                   onclick="return confirm('Do you want remove ${product.name} ?')"
                   href="/product?action=delete&id=${product.id}">Delete</a>
           </td>
        </tr>
    `
}

$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {
    await page.commands.getAllCategories();

})

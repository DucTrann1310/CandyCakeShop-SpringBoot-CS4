const page = {
    url: {
        getAllProductImports: 'http://localhost:8080/api/product-imports',
        getAllProduct: 'http://localhost:8080/api/products'
    },
    elements: {},
    loadData: {},
    commands: {}
}

page.elements.bodyProductImport = $("#tbProductImport tbody");

page.elements.product = $(".product")

page.elements.leftSideBarProductImport = $("#left-side-bar-product-import")

page.elements.leftSideBarActive = $(".active")

page.elements.leftSideBarActive.removeClass("active")

page.elements.leftSideBarProductImport.addClass("active")

page.elements.modalCreate = $("#modalCreate");
page.elements.frmCreate = $("#frmCreate");
page.elements.code = $("#code");
page.elements.importDate = $("#importDate");

page.elements.priceCre = $("#priceCre");
page.elements.productDescriptionCre = $("#productDescriptionCre");
page.elements.btnCreate = $("#btnCreate")
page.elements.productImportDetail = $("#product-import-detail")
page.elements.addMoreButton = $("#addMore")
page.elements.eSelect = $('[name="productIds"]');


let rowProductImport = 1;
let rowCount = rowProductImport;

async function getAllProductImports() {
    return await $.ajax({
        url: page.url.getAllProductImports
    })
}

async function getAllProducts() {
    return await $.ajax({
        url: page.url.getAllProduct
    })
}


page.loadData.getAllProductImports = async () => {
    const productImports = await getAllProductImports();

    productImports.forEach(item => {
        const str = page.commands.renderProductImport(item)

        page.elements.bodyProductImport.prepend(str);

        // page.commands.handleClickRow();
    })
}


page.commands.getAllProduct = async (elem) => {
    $(elem).empty();

    $.ajax({
        url: page.url.getAllProduct
    })
        .done((data) => {

            const str = `<option value="">---Please Choose---</option>`

            page.elements.product.append(str)

            $.each(data, (index, item) => {
                const str = `<option value="${item.id}">${item.productName}</option>`

                page.elements.product.append(str)
            })
        })
}

page.commands.renderProductImport = (obj) => {
    return `
        <tr id="tr_${obj.id}">
            <td>${obj.code}</td>
            <td>${obj.createAt}</td>
            <td>${obj.products}</td>
            <td>${obj.total}</td>
            <td>
            ${obj.confirm ? `<button class="btn btn-outline-info edit" id="data_${obj.id}" data-id="${obj.id}">
                    <i class="far fa-edit"></i>
                    Edit
                </button>` : ''}
             <button class="btn btn-outline-info detail" data-id="${obj.id}">
                    <i class="fa-solid fa-circle-info"></i>
                    Detail
                </button>
            </td>
        </tr>
    `
}

page.commands.handleClickRow = () => {

    page.commands.handleClickEditButton()
}

page.commands.handleClickEditButton = () => {

    page.elements.btnEditElems = $(".edit")

    page.elements.btnEditElems.off("click");

    page.elements.btnEditElems.each((index, item) => {

        $(item).on("click", async () => {

            productId = item.getAttribute("data-id")

            const product = await page.loadData.getProductById(productId)

            page.elements.productNameUp.val(product.productName);
            await page.commands.getAllCategories();
            await page.elements.categoryUp.val(product.category.id);
            page.elements.priceUp.val(product.price);
            page.elements.productDescriptionUp.val(product.description)

            page.elements.modalUpdate.modal("show")
        })
    })
}

page.commands.addMore = () => {

    page.elements.addMoreButton.on("click", () => {

        $.ajax({
            url: page.url.getAllProduct
        })
            .done((data) => {
                if (rowCount === data.length) {

                    AppUtils.showError("Số loại sản phẩm nhập vào tối đa")
                    return
                }

                rowCount++;

                let selectStr = '<select class="form-control product" name="productIds" id="product" >';

                selectStr += '</select>';


                const strRow = `<div class="row mb-3" id="product-import-${++rowProductImport}">
            <div class="col-4">
                ${selectStr}
            </div>
            <div class="col-3">
                <input type="number" class="form-control" id="quantities-${rowProductImport}" name="quantities">
            </div>
            <div class="col-3">
                <input type="number" class="form-control" id="amounts" name="amounts">
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-danger delete" id="data_${rowProductImport}" data-id="${rowProductImport}">Delete</button>
            </div>
        </div>`

                page.elements.productImportDetail.append(strRow)

                page.elements.product = $(".product")

                page.commands.getAllProduct(page.elements.product)

                page.commands.deleteRow()
            })

    })
}

page.commands.deleteRow = () => {

    page.elements.btnDelete = $(".delete")

    page.elements.btnDelete.off("click")

    page.elements.btnDelete.each((index, item) => {

        $(item).on("click", () => {

            if (rowCount === 1) {
                AppUtils.showError("Phải có ít nhất 1 sản phẩm")
                return
            }

            rowCount--;

            const rowNumber = item.getAttribute("data-id")

            const divNumber = $('#product-import-' + rowNumber);

            divNumber.remove()

            page.elements.btnDelete = $(".delete")
        })
    })

}


page.elements.modalCreate.on('hidden.bs.modal', async () => {
    $('#modalCreate .area-error').empty().addClass('hide');
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()


    const str = `
                            <div class="row mb-3" id="product-import-1">
                                <div class="col-4">
                                    <select class="form-control product" name="productIds" id="product">
                                        <option value="">---Please Choose---</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control" id="quantities-1" name="quantities">
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control" id="amounts-1" name="amounts">
                                </div>
                                <div class="col-2 d-flex justify-content-end">
                                    <button type="button" class="btn btn-danger delete" id="data_1" data-id="1">Delete
                                    </button>
                                </div>
                            </div>
                        `
    page.elements.productImportDetail.html(str)

    rowProductImport = 1

    rowCount = rowProductImport

    await page.commands.getAllProduct()

})


$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {


    await page.loadData.getAllProductImports()

    await page.commands.getAllProduct(page.elements.product)

    page.commands.addMore();

    page.commands.deleteRow()
})
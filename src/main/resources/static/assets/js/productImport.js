const pageProductImport = {
    url: {
        getAllProductImports: 'http://localhost:8080/api/product-imports',
        getAllProduct: 'http://localhost:8080/api/products',
        createProductImport: 'http://localhost:8080/api/product-imports'
    },
    elements: {},
    loadData: {},
    commands: {}
}

pageProductImport.elements.loading = $("#loading")

pageProductImport.elements.bodyProductImport = $("#tbProductImport tbody");

pageProductImport.elements.product = $(".product")

pageProductImport.elements.leftSideBarProductImport = $("#left-side-bar-product-import")

pageProductImport.elements.leftSideBarActive = $(".active")

pageProductImport.elements.leftSideBarActive.removeClass("active")

pageProductImport.elements.leftSideBarProductImport.addClass("active")

pageProductImport.elements.modalCreate = $("#modalCreate");
pageProductImport.elements.frmCreate = $("#frmCreate");
pageProductImport.elements.code = $("#code");
pageProductImport.elements.importDate = $("#importDate");

pageProductImport.elements.priceCre = $("#priceCre");
pageProductImport.elements.productDescriptionCre = $("#productDescriptionCre");
pageProductImport.elements.btnCreate = $("#btnCreate")
pageProductImport.elements.productImportDetail = $("#product-import-detail")
pageProductImport.elements.addMoreButton = $("#addMore")

pageProductImport.elements.productSelect = $('[name="productIds"]')

let productSelectedArray = pageProductImport.elements.productSelect.map(function() {
    return $(this).val();
}).get();


let rowProductImport = 1;
let rowCount = rowProductImport;
let productsArr = []

async function getAllProductImports() {
    return await $.ajax({
        url: pageProductImport.url.getAllProductImports
    })
}

async function getAllProducts() {
    return await $.ajax({
        url: pageProductImport.url.getAllProduct
    })
}


pageProductImport.loadData.getAllProductImports = async () => {
    const productImports = await getAllProductImports();

    productImports.forEach(item => {
        const str = pageProductImport.commands.renderProductImport(item)

        pageProductImport.elements.bodyProductImport.prepend(str);

        // pageProductImport.commands.handleClickRow();
    })
}


pageProductImport.commands.getAllProduct =  async () => {

     await $.ajax({
        url: pageProductImport.url.getAllProduct
    })
        .done((data) => {
            productsArr = data;

            pageProductImport.commands.InitProductOption()

        })
}

pageProductImport.commands.renderProductImport = (obj) => {
    return `
        <tr id="tr_${obj.id}">
            <td>${obj.code}</td>
            <td>${obj.createdAt}</td>
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

pageProductImport.commands.handleClickRow = () => {

    pageProductImport.commands.handleClickEditButton()
}

pageProductImport.commands.handleClickEditButton = () => {

    pageProductImport.elements.btnEditElems = $(".edit")

    pageProductImport.elements.btnEditElems.off("click");

    pageProductImport.elements.btnEditElems.each((index, item) => {

        $(item).on("click", async () => {

            productId = item.getAttribute("data-id")

            const product = await pageProductImport.loadData.getProductById(productId)

            pageProductImport.elements.productNameUp.val(product.productName);
            await pageProductImport.commands.getAllCategories();
            await pageProductImport.elements.categoryUp.val(product.category.id);
            pageProductImport.elements.priceUp.val(product.price);
            pageProductImport.elements.productDescriptionUp.val(product.description)

            pageProductImport.elements.modalUpdate.modal("show")
        })
    })
}

pageProductImport.commands.InitProductOption = () => {
    const str = `<option value="">---Please Choose---</option>`

    $('#product-import-detail .row .product').append(str)

    $.each(productsArr, (index, item) => {
        const str = `<option value="${item.id}">${item.productName}</option>`

        $('#product-import-detail .row .product').append(str)
    })
}

pageProductImport.commands.addMore = () => {


    pageProductImport.elements.addMoreButton.on("click", () => {

        if($('#product-import-detail .row .product').length > productsArr.length){
            AppUtils.showError("Đã chọn tối ta sản phẩm hiện có")
            return
        }

        let selectStr = '<select class="form-control product" name="productIds" >';

        selectStr += '</select>';

        const strRow = `
            <div class="row mb-3" id="product-import-${++rowProductImport}">
                <div class="col-6">
                    ${selectStr}
                </div>
                <div class="col-4">
                    <input type="number" class="form-control" id="quantities-${rowProductImport}" name="quantities">
                </div>
                <div class="col-2 d-flex justify-content-end delete">
                </div>
            </div>
        `


        pageProductImport.elements.productImportDetail.append(strRow)

        const countElem = $('#product-import-detail .row .product').length - 1;
        console.log(countElem)

        const str = `<option value="">---Please Choose---</option>`
        $($('#product-import-detail .row .product')[countElem]).append(str)

        $.each(productsArr, (index, item) => {
            const str = `<option value="${item.id}">${item.productName}</option>`
            $($('#product-import-detail .row .product')[countElem]).append(str)
        })

        pageProductImport.commands.handleOnHoverProductImport();

        pageProductImport.commands.handleProductSelected()


    })
}

// pageProductImport.commands.deleteRow = () => {
//
//     pageProductImport.elements.btnDelete = $(".delete")
//
//     pageProductImport.elements.btnDelete.off("click")
//
//     pageProductImport.elements.btnDelete.each((index, item) => {
//
//         $(item).on("click", () => {
//
//             if (rowCount === 1) {
//                 AppUtils.showError("Phải có ít nhất 1 sản phẩm")
//                 return
//             }
//
//             rowCount--;
//
//             const rowNumber = item.getAttribute("data-id")
//
//             const divNumber = $('#product-import-' + rowNumber);
//
//             divNumber.remove()
//
//             // pageProductImport.elements.btnDelete = $(".delete")
//         })
//     })
//
// }

pageProductImport.commands.handleProductSelected = () => {

    pageProductImport.elements.productSelect = $('[name="productIds"]')

    let productSelectedArray = pageProductImport.elements.productSelect.map(function() {
        return $(this).val();
    }).get();

    pageProductImport.elements.productSelect.on("change", function (){
        if(productSelectedArray.find(id => +id === +$(this).val())){
            $(this).val("");

            AppUtils.showError("Vui lòng không chọn trùng sản phẩm")
        }

        productSelectedArray = pageProductImport.elements.productSelect.map(function() {
            return $(this).val();
        }).get();

    })
}


pageProductImport.commands.handleOnHoverProductImport = () => {
    $('#product-import-detail .row div.delete').empty();

    let elem;
    $('#product-import-detail .row').hover(function()  {
        const str = `
            <button type="button" class="btn btn-danger delete" data-id="1">
                Delete
            </button>`

        elem = $(this).find('div.delete');

        if ($('#product-import-detail .row').length > 1) {
            $(elem).empty().append(str)
        }
    })

    $('#product-import-detail .row').on( "mouseleave", function () {
        $('#product-import-detail .row div.delete').empty();
    });
}

pageProductImport.commands.handleAddEventDeleteButton = () => {
    pageProductImport.elements.productImportDetail.on('click', 'button.delete', function () {
        $(this).parent().parent().remove()
    })
}

pageProductImport.elements.btnCreate.on('click', async () => {
    pageProductImport.elements.frmCreate.trigger('submit')
})

pageProductImport.elements.frmCreate.validate({
    onkeyup: function (element) {
        $(element).valid()
    },
    onclick: false,
    onfocusout: false,
    rules: {
        importDate: {
            required: true,
            date: true,
            customMaxDate: true
        },
        productIds: {
            required: true
        }
    },
    messages: {
        importDate: {
            required: "Vui chọn ngày nhập hàng",
            date: "Ngày nhập hàng không hợp lệ",
        },
        productIds: {
            required: "Vui lòng chọn ít nhất một sản phẩm"
        }
    },
    errorLabelContainer: "#modalCreate .area-error",
    errorPlacement: function (error, element) {
        error.appendTo("#modalCreate .area-error");
    },
    showErrors: function (errorMap, errorList) {
        if (this.numberOfInvalids() > 0) {
            $("#modalCreate .area-error").removeClass("hide").addClass("show");
        } else {
            $("#modalCreate .area-error").removeClass("show").addClass("hide").empty();
            $("#frmCreate input.error").removeClass("error");
        }
        this.defaultShowErrors();
    },
    submitHandler: () => {
        pageProductImport.commands.createProductImport()
    }
})

pageProductImport.commands.createProductImport = () => {
    const products = []

    for (let i = 0; i < $('[name="productIds"]').length; i++) {

        const id = $('[name="productIds"]').eq(i).find('option:selected').val();

        const quantity = $('[name="productIds"]').eq(i).val();

        const product = {
            id,
            quantity
        };
        products.push(product);
    }


    const createdAt = pageProductImport.elements.importDate

    const importProduct = {
        createdAt,
        products
    }

    pageProductImport.elements.btnCreate.prop("disabled", true);

    pageProductImport.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'POST',
                url: pageProductImport.url.createProductImport,
                data: JSON.stringify(importProduct)
            }
        )
            .done((data) => {
                const str = pageProductImport.commands.renderProductImport(data)

                pageProductImport.elements.bodyProduct.prepend(str);

                pageProductImport.elements.modalCreate.modal('hide');

                AppUtils.showSuccess('Thêm mới thành công');

            })
            .fail((err) => {
                const responseJSON = err.responseJSON

                if (responseJSON) {
                    let str = '<ul>'
                    $.each(responseJSON, (k, v) => {
                        if (k.includes('.')) {
                            str += `<li><label for="${k.split('.')[1] + 'Cre'}">${v}</label></li>`
                        } else {
                            str += `<li><label for="${k + 'Cre'}">${v}</label></li>`
                        }

                    })

                    str += '</ul>'

                    // $('.area-error').append(str).removeClass('hide').css('display', '')
                    $('#modalCreate .area-error').append(str).removeClass('hide').css('display', '')

                    AppUtils.showError("Thêm mới thất bại")
                }
            })
            .always(() => {
                pageProductImport.elements.btnCreate.prop("disabled", false);
                pageProductImport.elements.loading.addClass('hide')
            });
    }, 1000);
}
$.validator.addMethod(
    "customMaxDate",
    function (value, element) {
        var currentDate = new Date();
        var inputDate = new Date(value);

        return inputDate <= currentDate;
    },
    "Ngày không được lớn hơn ngày hiện tại"
);

pageProductImport.elements.modalCreate.on('hidden.bs.modal', async () => {
    $('#modalCreate .area-error').empty().addClass('hide');
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()


    const str = `
        <div class="row mb-3" id="product-import-1">
            <div class="col-6">
                <select class="form-control product" name="productIds" id="product">
                </select>
            </div>
            <div class="col-4">
                <input type="number" class="form-control" id="quantities-1" name="quantities">
            </div>
            <div class="col-2 d-flex justify-content-end delete">
            </div>
        </div>
    `
    pageProductImport.elements.productImportDetail.html(str)

    pageProductImport.commands.handleOnHoverProductImport();

    pageProductImport.commands.handleAddEventDeleteButton()

    rowProductImport = 1

    rowCount = rowProductImport

    await pageProductImport.commands.getAllProduct()

})

$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {


    pageProductImport.loadData.getAllProductImports()

    pageProductImport.commands.getAllProduct()

    pageProductImport.commands.addMore();

    pageProductImport.commands.handleOnHoverProductImport();

    pageProductImport.commands.handleAddEventDeleteButton()


})
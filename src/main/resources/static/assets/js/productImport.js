const pageProductImport = {
    url: {
        getAllProductImports: 'http://localhost:8080/api/product-imports',
        getAllProduct: 'http://localhost:8080/api/products',
        createProductImport: 'http://localhost:8080/api/product-imports',
        getProductImportDetailByProductImportId: 'http://localhost:8080/api/product-imports/',
        confirmProductImport: 'http://localhost:8080/api/product-imports/'
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
pageProductImport.elements.importDateCre = $("#importDateCre");

pageProductImport.elements.btnCreate = $("#btnCreate")
pageProductImport.elements.productImportDetailCre = $("#product-import-detail-Cre")
pageProductImport.elements.addMoreButton = $("#addMore")
pageProductImport.elements.productSelectCre = $('[name="productIdsCre"]')

pageProductImport.elements.modalConfirm = $("#modalConfirm")
pageProductImport.elements.productImportDetailConf = $("#product-import-detail-Conf")
pageProductImport.elements.importDateConf = $("#importDateConf")
pageProductImport.elements.btnConfirm = $("#btnConfirm")
pageProductImport.elements.btnCancel = $("#btnCancel")

let productSelectedArrayCre = pageProductImport.elements.productSelectCre.map(function() {
    return $(this).val();
}).get();

let productImportId = 0;

let productImport
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

        pageProductImport.commands.handleClickRow();
    })
}

pageProductImport.commands.getAllProductImportDetailById =  async (productImportId) => {
     return await  $.ajax({
        url: pageProductImport.url.getProductImportDetailByProductImportId + productImportId
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
            <td>${obj.importDate}</td>
            <td>${obj.products}</td>
            <td>
            ${!obj.confirm ? 
                `<button class="btn btn-outline-info confirm" data-id="${obj.id}">
                    <i class="far fa-edit"></i>
                    Confirm
                </button>` :    
                `<button class="btn btn-outline-secondary detail" data-id="${obj.id}">
                    <i class="fa-solid fa-circle-info"></i>
                    Detail
                </button>`}
            </td>
        </tr>
    `
}

pageProductImport.commands.handleClickRow = async () => {

   await pageProductImport.commands.handleClickConfirmButton()

    // pageProductImport.commands.handleClickDetailButton()
}

pageProductImport.commands.handleClickConfirmButton = async () => {

    pageProductImport.elements.btnConfirmElems = $(".confirm")

    pageProductImport.elements.btnConfirmElems.off("click");

    pageProductImport.elements.btnConfirmElems.each( (index, item) => {

        $(item).on("click", async () => {

            productImportId = item.getAttribute("data-id")

            productImport = await pageProductImport.commands.getAllProductImportDetailById(productImportId)

            console.log(productImport)
            rowProductImport = 0;


            $.each(productImport.productImportDetailResDTOS, (index, item) => {
                let selectStr = `<select class="form-control product" name="productIdsConf">` +
                    `<option value="${item.product.id}">${item.product.productName}</option>` +
                    `</select>`;

                const strRow = `
                    <div class="row mb-3" id="product-import-${++rowProductImport}">
                      <div class="col-7">
                        ${selectStr}
                      </div>
                      <div class="col-5">
                        <input type="number" class="form-control" id="quantities-${rowProductImport}" name="quantitiesConf"
                          value="${item.quantity}" readonly>
                      </div>
                    </div>
                  `;

                pageProductImport.elements.productImportDetailConf.append(strRow);
            });

            pageProductImport.elements.importDateConf.val(productImport.importDate)


            pageProductImport.elements.modalConfirm.modal("show")
        })
    })

    await pageProductImport.commands.confirmProductImport()
}

pageProductImport.commands.InitProductOption = () => {
    const str = `<option value="">---Please Choose---</option>`

    $('#product-import-detail-Cre .row .product').append(str)

    $.each(productsArr, (index, item) => {
        const str = `<option value="${item.id}">${item.productName}</option>`

        $('#product-import-detail-Cre .row .product').append(str)
    })
}

pageProductImport.commands.addMore = () => {


    pageProductImport.elements.addMoreButton.on("click", () => {

        if($('#product-import-detail-Cre .row .product').length > productsArr.length){
            AppUtils.showError("Đã chọn tối ta sản phẩm hiện có")
            return
        }

        let selectStr = '<select class="form-control product" name="productIdsCre" >';

        selectStr += '</select>';

        const strRow = `
            <div class="row mb-3" id="product-import-${++rowProductImport}">
                <div class="col-6">
                    ${selectStr}
                </div>
                <div class="col-4">
                    <input type="number" class="form-control" id="quantities-${rowProductImport}" name="quantitiesCre">
                </div>
                <div class="col-2 d-flex justify-content-end delete">
                </div>
            </div>
        `


        pageProductImport.elements.productImportDetailCre.append(strRow)

        const countElem = $('#product-import-detail-Cre .row .product').length - 1;
        console.log(countElem)

        const str = `<option value="">---Please Choose---</option>`
        $($('#product-import-detail-Cre .row .product')[countElem]).append(str)

        $.each(productsArr, (index, item) => {
            const str = `<option value="${item.id}">${item.productName}</option>`
            $($('#product-import-detail-Cre .row .product')[countElem]).append(str)
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

    pageProductImport.elements.productSelectCre = $('[name="productIdsCre"]')

    productSelectedArrayCre = pageProductImport.elements.productSelectCre.map(function() {
        return $(this).val();
    }).get();

    pageProductImport.elements.productSelectCre.on("change", function (){
        if(productSelectedArrayCre.find(id => +id === +$(this).val())){
            $(this).val("");

            AppUtils.showError("Vui lòng không chọn trùng sản phẩm")
        }

        productSelectedArrayCre = pageProductImport.elements.productSelectCre.map(function() {
            return $(this).val();
        }).get();

    })
}


pageProductImport.commands.handleOnHoverProductImport = () => {
    $('#product-import-detail-Cre .row div.delete').empty();

    let elem;
    $('#product-import-detail-Cre .row').hover(function()  {
        const str = `
            <button type="button" class="btn btn-danger delete" data-id="1">
                Delete
            </button>`

        elem = $(this).find('div.delete');

        if ($('#product-import-detail-Cre .row').length > 1) {
            $(elem).empty().append(str)
        }
    })

    $('#product-import-detail-Cre .row').on( "mouseleave", function () {
        $('#product-import-detail-Cre .row div.delete').empty();
    });
}

pageProductImport.commands.handleAddEventDeleteButton = () => {
    pageProductImport.elements.productImportDetailCre.on('click', 'button.delete', function () {
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
        importDateCre: {
            required: true,
            date: true,
            customMaxDate: true
        },
        productIdsCre: {
            required: true
        }
    },
    messages: {
        importDateCre: {
            required: "Vui chọn ngày nhập hàng",
            date: "Ngày nhập hàng không hợp lệ",
        },
        productIdsCre: {
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

    for (let i = 0; i < $('[name="productIdsCre"]').length; i++) {

        const productId = $('[name="productIdsCre"]').eq(i).find('option:selected').val();

        const quantity = $('[name="productIdsCre"]').eq(i).parent().parent().find('[name="quantitiesCre"]').val()

        const product = {
            productId,
            quantity
        };
        products.push(product);
    }


    const importDate = pageProductImport.elements.importDateCre.val()

    const importProduct = {
        importDate,
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
            .done(async (data) => {
                const str = pageProductImport.commands.renderProductImport(data)

                pageProductImport.elements.bodyProductImport.prepend(str);

                await pageProductImport.commands.handleClickRow()

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

pageProductImport.commands.confirmProductImport =   () => {

    pageProductImport.elements.btnConfirm.on("click", async () => {

        const products = []

        for (let i = 0; i < $('[name="productIdsConf"]').length; i++) {

            const productId = $('[name="productIdsConf"]').eq(i).find('option:selected').val();

            const quantity = $('[name="productIdsConf"]').eq(i).parent().parent().find('[name="quantitiesConf"]').val()

            const product = {
                productId,
                quantity
            };
            products.push(product);
        }


        const importDate = await pageProductImport.elements.importDateConf.val()

        const importProduct = {
            importDate,
            products
        }

        pageProductImport.elements.btnConfirm.prop("disabled", true);
        pageProductImport.elements.btnCancel.prop("disabled", true);

        pageProductImport.elements.loading.removeClass('hide');


        setTimeout(() => {
            $.ajax(
                {
                    method: 'POST',
                    url: pageProductImport.url.confirmProductImport + productImportId,
                    data: JSON.stringify(importProduct)
                }
            )
                .done(async (data) => {
                    const str = pageProductImport.commands.renderProductImport(data)

                    $("#tr_" + productImportId).replaceWith(str);

                    await pageProductImport.commands.handleClickRow()

                    pageProductImport.elements.modalConfirm.modal('hide');

                    AppUtils.showSuccess('Xác minh thành công');

                })
                .fail((err) => {
                    const responseJSON = err.responseJSON

                    if (responseJSON) {
                        let str = '<ul>'
                        $.each(responseJSON, (k, v) => {
                            if (k.includes('.')) {
                                str += `<li><label for="${k.split('.')[1] + 'Conf'}">${v}</label></li>`
                            } else {
                                str += `<li><label for="${k + 'Conf'}">${v}</label></li>`
                            }

                        })

                        str += '</ul>'

                        // $('.area-error').append(str).removeClass('hide').css('display', '')
                        $('#modalConfirm .area-error').append(str).removeClass('hide').css('display', '')

                        AppUtils.showError("Xác minh thất bại")
                    }
                })
                .always(() => {
                    pageProductImport.elements.btnConfirm.prop("disabled", false);
                    pageProductImport.elements.btnCancel.prop("disabled", false);
                    pageProductImport.elements.loading.addClass('hide')
                });
        }, 1000);
    })
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
                <select class="form-control product" name="productIdsCre">
                </select>
            </div>
            <div class="col-4">
                <input type="number" class="form-control" id="quantities-1" name="quantitiesCre">
            </div>
            <div class="col-2 d-flex justify-content-end delete">
            </div>
        </div>
    `
    pageProductImport.elements.productImportDetailCre.html(str)

    pageProductImport.commands.handleOnHoverProductImport();

    pageProductImport.commands.handleAddEventDeleteButton()

    rowProductImport = 1

    rowCount = rowProductImport

    await pageProductImport.commands.getAllProduct()

})

pageProductImport.elements.modalConfirm.on('hidden.bs.modal', async () => {
    $('#modalConfirm .area-error').empty().addClass('hide');
    $('#frmConfirm').trigger('reset')
    $('#frmConfirm input').removeClass('error')
    $('#frmConfirm label.error').remove()

    await pageProductImport.elements.productImportDetailConf.empty()
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
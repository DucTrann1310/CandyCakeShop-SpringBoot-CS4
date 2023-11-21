const page = {
    url: {
        getAllProduct: 'http://localhost:8080/api/products',
        getAllCategories: 'http://localhost:8080/api/categories',
        createProduct: 'http://localhost:8080/api/products',
        updateProduct: 'http://localhost:8080/api/products/',
        getProductById: 'http://localhost:8080/api/products/'
    },
    elements: {},
    loadData: {},
    commands: {}
}

let productId = 0;

page.elements.bodyProduct = $("#tbProduct tbody");

page.elements.loading = $('#loading');

page.elements.leftSideBarActive = $(".active")

page.elements.leftSideBarProduct = $("#left-side-bar-product")

page.elements.leftSideBarActive.removeClass("active")

page.elements.leftSideBarProduct.addClass("active")



page.elements.modalCreate = $("#modalCreate");
page.elements.frmCreate = $("#frmCreate");
page.elements.productNameCre = $("#productNameCre");
page.elements.categoryCre = $("#categoryCre");
page.elements.priceCre = $("#priceCre");
page.elements.productDescriptionCre = $("#productDescriptionCre");
page.elements.btnCreate = $("#btnCreate")

page.elements.modalUpdate = $("#modalUpdate");
page.elements.frmUpdate = $("#frmUpdate");
page.elements.productNameUp = $("#productNameUp");
page.elements.categoryUp = $("#categoryUp");
page.elements.priceUp = $("#priceUp");
page.elements.productDescriptionUp = $("#productDescriptionUp");
page.elements.btnUpdate = $("#btnUpdate")



async function getAllProducts() {
    return await $.ajax({
        url: page.url.getAllProduct
    })
}

page.loadData.getAllProducts = async () => {
    const products = await getAllProducts();

      products.forEach(item => {
        const str = page.commands.renderProduct(item)

        page.elements.bodyProduct.prepend(str);

        page.commands.handleClickRow();
    })
}

page.loadData.getProductById = async () => {
    return await $.ajax({
        url: page.url.getProductById + productId
    })
}

page.commands.renderProduct = (obj) => {
    return `
        <tr id="tr_${obj.id}">
            <td>${obj.id}</td>
            <td>${obj.productName}</td>
            <td>${obj.category.categoryName}</td>
            <td>${obj.description}</td>
            <td>${obj.price}</td>
<!--            <td>${obj.img}</td>-->
            <td>
                <button class="btn btn-outline-secondary edit" id="data_${obj.id}" data-id="${obj.id}">
                    <i class="far fa-edit"></i>
                    Edit
                </button>
            </td>
        </tr>
    `
}

page.commands.getAllCategories = async () => {

    page.elements.categoryCre.empty();
    page.elements.categoryUp.empty();

    await $.ajax({
        url: page.url.getAllCategories
    })
        .done((categories) => {

            $.each(categories, (index, item) => {
                const str = `<option value="${item.id}">${item.categoryName}</option>`

                page.elements.categoryCre.append(str)
                page.elements.categoryUp.append(str)

            })
        })
};

page.commands.createProduct = () => {
    const productName = page.elements.productNameCre.val();
    const price = page.elements.priceCre.val();
    const description = page.elements.productDescriptionCre.val();
    const id = page.elements.categoryCre.val();
    const categoryName = page.elements.categoryCre.find('option:selected').text();

    const categoryCreReqDTO = {
        id,
        categoryName
    }

    const product = {
        productName,
        categoryCreReqDTO,
        price,
        description
    }

    page.elements.btnCreate.prop("disabled", true);

    page.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'POST',
                url: page.url.createProduct,
                data: JSON.stringify(product)
            }
        )
            .done((data) => {
                const str = page.commands.renderProduct(data)
                page.elements.bodyProduct.prepend(str);

                page.elements.modalCreate.modal('hide');

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
                page.elements.btnCreate.prop("disabled", false);
                page.elements.loading.addClass('hide')
            });
    }, 1000);
}

page.commands.updateProduct = () => {
    const productName = page.elements.productNameUp.val();
    const price = page.elements.priceUp.val();
    const description = page.elements.productDescriptionUp.val();
    const id = page.elements.categoryUp.val();
    const categoryName = page.elements.categoryUp.find('option:selected').text();

    const categoryUpReqDTO = {
        id,
        categoryName
    }

    const product = {
        productName,
        categoryUpReqDTO,
        price,
        description
    }

    page.elements.btnUpdate.prop("disabled", true);

    page.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'PATCH',
                url: page.url.updateProduct + productId,
                data: JSON.stringify(product)
            }
        )
            .done((data) => {
                const str = page.commands.renderProduct(data)
                $("#tr_" + productId).replaceWith(str);
                // page.elements.bodyProduct.replaceWith(str);

                page.elements.modalUpdate.modal('hide');

                AppUtils.showSuccess('Sửa thành công');

            })
            .fail((err) => {
                const responseJSON = err.responseJSON

                if (responseJSON) {
                    let str = '<ul>'
                    $.each(responseJSON, (k, v) => {
                        if (k.includes('.')) {
                            str += `<li><label for="${k.split('.')[1] + 'Up'}">${v}</label></li>`
                        } else {
                            str += `<li><label for="${k + 'Up'}">${v}</label></li>`
                        }

                    })

                    str += '</ul>'

                    // $('.area-error').append(str).removeClass('hide').css('display', '')
                    $('#modalUpdate .area-error').append(str).removeClass('hide').css('display', '')

                    AppUtils.showError("Sửa thất bại")
                }
            })
            .always(() => {
                page.elements.btnUpdate.prop("disabled", false);
                page.elements.loading.addClass('hide')
            });
    }, 1000);
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

page.elements.btnCreate.on('click', async () => {
    page.elements.frmCreate.trigger('submit')
})

page.elements.btnUpdate.on('click', async () => {
    page.elements.frmUpdate.trigger('submit')
})

page.elements.frmCreate.validate({
    onkeyup: function (element) {
        $(element).valid()
    },
    onclick: false,
    onfocusout: false,
    rules: {
        // productNameCre: {
        //     required: true,
        //     minlength: 5
        // },
        // productPriceCre: {
        //     required: true,
        //     digits: true,
        //     min: 1000
        // }
    },
    messages: {
        // productNameCre: {
        //     required: 'Vui lòng nhập tên sản phẩm',
        //     minlength: 'Tên sản phẩm phải chứa ít nhất 5 kí tự'
        // },
        // productPriceCre: {
        //     required: "Vui lòng nhập giá sản phẩm",
        //     digits: "Giá sản phẩm phải là một số",
        //     min: "Giá sản phẩm phải tối thiểu là 1000"
        // }
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
        page.commands.createProduct()
    }
})

page.elements.frmUpdate.validate({
    onkeyup: function (element) {
        $(element).valid()
    },
    onclick: false,
    onfocusout: false,
    rules: {
        // productNameUp: {
        //     required: true,
        //     minlength: 5
        // },
        // productPriceUp: {
        //     required: true,
        //     digits: true,
        //     min: 1000
        // }
    },
    messages: {
        // productNameUp: {
        //     required: 'Vui lòng nhập tên sản phẩm',
        //     minlength: 'Tên sản phẩm phải chứa ít nhất 5 kí tự'
        // },
        // productPriceUp: {
        //     required: "Vui lòng nhập giá sản phẩm",
        //     digits: "Giá sản phẩm phải là một số",
        //     min: "Giá sản phẩm phải tối thiểu là 1000"
        // }
    },
    errorLabelContainer: "#modalUpdate .area-error",
    errorPlacement: function (error, element) {
        error.appendTo("#modalUpdate .area-error");
    },
    showErrors: function (errorMap, errorList) {
        if (this.numberOfInvalids() > 0) {
            $("#modalUpdate .area-error").removeClass("hide").addClass("show");
        } else {
            $("#modalUpdate .area-error").removeClass("show").addClass("hide").empty();
            $("#frmUpdate input.error").removeClass("error");
        }
        this.defaultShowErrors();
    },
    submitHandler: () => {
        page.commands.updateProduct()
    }
})

page.elements.modalCreate.on('hidden.bs.modal', async () => {
    $('#modalCreate .area-error').empty().addClass('hide');
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()

    await page.commands.getAllCategories()

})

page.elements.modalUpdate.on('hidden.bs.modal', async () => {
    $('#modalUpdate .area-error').empty().addClass('hide');
    $('#frmUpdate').trigger('reset')
    $('#frmUpdate input').removeClass('error')
    $('#frmUpdate label.error').remove()

    await page.commands.getAllCategories()

})


$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {



    await page.loadData.getAllProducts();

    await page.commands.getAllCategories();

})

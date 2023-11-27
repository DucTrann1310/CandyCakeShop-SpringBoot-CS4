const pageProduct = {
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

let check = true;

pageProduct.elements.bodyProduct = $("#tbProduct tbody");

pageProduct.elements.loading = $('#loading');

pageProduct.elements.leftSideBarActive = $(".active")

pageProduct.elements.leftSideBarProduct = $("#left-side-bar-product")

pageProduct.elements.leftSideBarActive.removeClass("active")

pageProduct.elements.leftSideBarProduct.addClass("active")



pageProduct.elements.modalCreate = $("#modalCreate");
pageProduct.elements.frmCreate = $("#frmCreate");
pageProduct.elements.productNameCre = $("#productNameCre");
pageProduct.elements.categoryCre = $("#categoryCre");
pageProduct.elements.priceCre = $("#priceCre");
pageProduct.elements.productDescriptionCre = $("#productDescriptionCre");
pageProduct.elements.btnCreate = $("#btnCreate")
pageProduct.elements.avatarCre = $("#avatarCreated")
pageProduct.elements.avatarRoomCre = $("#avatar-room")

pageProduct.elements.modalUpdate = $("#modalUpdate");
pageProduct.elements.frmUpdate = $("#frmUpdate");
pageProduct.elements.productNameUp = $("#productNameUp");
pageProduct.elements.categoryUp = $("#categoryUp");
pageProduct.elements.priceUp = $("#priceUp");
pageProduct.elements.productDescriptionUp = $("#productDescriptionUp");
pageProduct.elements.btnUpdate = $("#btnUpdate")




async function getAllProducts() {
    return await $.ajax({
        url: pageProduct.url.getAllProduct
    })
}

async function previewImage(evt) {
    if (evt.target.files.length === 0){
        return;
    }

    if(check) {
        idImages = [];
    }

    const files = evt.target.files;
    for (let i = 0; i < files.length; i++){
        webToast.Success({
            status: `Uploading image ${i + 1} / ${files.length} . . .`,
            message: '',
            delay: 1000,
            align: 'topright'
        });
        const file = files[i];
        await previewImageFile(file);

        if (file){
            disableSaveChangesButton();
            //tao formData va them file duoc chon
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("fileType", "image");

            try{
                const response = await fetch("api/bookImages", {
                    method: "POST",
                    body: formData
                });

                if (response.ok){
                    const result = await response.json();
                    check = false;

                    if (result && result.id) {
                        const id = result.id;
                        const imgEle = document.getElementById("images");
                        const imageContainer = imgEle.lastChild;

                        idImages.push(id);

                        const deleteButton = imageContainer.querySelector(".delete-button");
                        deleteButton.addEventListener("click", () => {
                            const input = document.getElementById("file");
                            input.disabled = true;
                            deleteImage(id);
                            imageContainer.remove();
                        });
                    } else {
                        console.error("Image ID not found in the response");
                    }
                } else {
                    console.error("Failed to upload image:", response.statusText);
                }

            }catch (error){
                console.error("An error occurred:", error);
            }
            webToast.Success({
                status: `Upload completed !`,
                message: '',
                delay: 1000,
                align: 'topright'
            });
            enableSaveChangesButton();
        }
    }
}

pageProduct.loadData.getAllProducts = async () => {
    const products = await getAllProducts();

      products.forEach(item => {
        const str = pageProduct.commands.renderProduct(item)

        pageProduct.elements.bodyProduct.prepend(str);

        pageProduct.commands.handleClickRow();
    })
}

async function previewImageFile(file){
    const reader = new FileReader();
    reader.onload = function (){
        const imgEle = document.getElementById("images");

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('imageContainer');

        const img = document.createElement("img");

        img.src = reader.result;
        img.classList.add("avatar-preview");
        imageContainer.append(img);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-close');
        deleteButton.classList.add('delete-button');
        imageContainer.append(deleteButton);
        imgEle.append(imageContainer);

    };
    reader.readAsDataURL(file);
}

async function deleteImage(id) {
    try {
        const response = await fetch(`api/bookImages/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const input = document.getElementById("file");
            input.disabled = false;
            console.log("Image deleted from the database.");
        } else {
            console.error("Failed to delete image from the database:", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
function showImgInForm(images) {
    const imgEle = document.getElementById("images");
    const input = document.getElementById("file");
    const imgOld = imgEle.querySelectorAll("img");
    for (let i = 0; i < imgOld.length; i++) {
        imgEle.removeChild(imgOld[i])
    }

    const avatarDefault = document.createElement('img');
    avatarDefault.src = '/assets/img/img.png';
    avatarDefault.classList.add('avatar-preview');
    imgEle.append(avatarDefault)

    images.forEach((img, index) => {
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('imageContainer');
        let image = document.createElement('img');

        image.src = img;
        image.classList.add('avatar-preview');
        imageContainer.append(image);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.classList.add('btn-close');
        imageContainer.append(deleteButton);

        deleteButton.addEventListener('click', () => {

            input.disabled = true;
            removeImage(index); // Gọi hàm xóa ảnh khi click vào dấu X
            imageContainer.remove(); // Xóa container chứa ảnh và nút X
        });

        imgEle.append(imageContainer);
    });
}
async function removeImage(index) {
    try {
        const imgToDelete = bookSelected.images[index];

        const formData = new FormData;
        formData.append("url", imgToDelete);

        const response = await fetch("api/bookImages", {
            method: 'DELETE',
            body:formData,
        });

        if (response.ok) {
            // Xóa ảnh khỏi mảng images
            bookSelected.images.splice(index, 1);

            input.disabled = false;
            console.log('Image deleted successfully');
        } else {
            console.error('Error deleting image:', response.status);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}
function disableSaveChangesButton() {
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.disabled = true;
}
function enableSaveChangesButton() {
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.disabled = false;
}


pageProduct.loadData.getProductById = async () => {
    return await $.ajax({
        url: pageProduct.url.getProductById + productId
    })
}

pageProduct.commands.renderProduct = (obj) => {
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

pageProduct.commands.getAllCategories = async () => {

    pageProduct.elements.categoryCre.empty();
    pageProduct.elements.categoryUp.empty();

    await $.ajax({
        url: pageProduct.url.getAllCategories
    })
        .done((categories) => {

            $.each(categories, (index, item) => {
                const str = `<option value="${item.id}">${item.categoryName}</option>`

                pageProduct.elements.categoryCre.append(str)
                pageProduct.elements.categoryUp.append(str)

            })
        })
};

pageProduct.commands.createProduct = () => {
    const productName = pageProduct.elements.productNameCre.val();
    const price = pageProduct.elements.priceCre.val();
    const description = pageProduct.elements.productDescriptionCre.val();
    const id = pageProduct.elements.categoryCre.val();
    const categoryName = pageProduct.elements.categoryCre.find('option:selected').text();
    // const avatar = pageProduct.elements.avatarCre.value()
    let avatar = document.getElementById("avatarCreated").value;


    const categoryCreReqDTO = {
        id,
        categoryName
    }

    const product = {
        productName,
        categoryCreReqDTO,
        price,
        description,
        avatar
    }

    pageProduct.elements.btnCreate.prop("disabled", true);

    pageProduct.elements.loading.removeClass('hide');

    setTimeout(() => {q
        $.ajax(
            {
                method: 'POST',
                url: pageProduct.url.createProduct,
                data: JSON.stringify(product)
            }
        )
            .done((data) => {
                const str = pageProduct.commands.renderProduct(data)
                pageProduct.elements.bodyProduct.prepend(str);

                pageProduct.elements.modalCreate.modal('hide');

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
                pageProduct.elements.btnCreate.prop("disabled", false);
                pageProduct.elements.loading.addClass('hide')
            });
    }, 1000);
}

pageProduct.commands.updateProduct = () => {
    const productName = pageProduct.elements.productNameUp.val();
    const price = pageProduct.elements.priceUp.val();
    const description = pageProduct.elements.productDescriptionUp.val();
    const id = pageProduct.elements.categoryUp.val();
    const categoryName = pageProduct.elements.categoryUp.find('option:selected').text();

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

    pageProduct.elements.btnUpdate.prop("disabled", true);

    pageProduct.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'PATCH',
                url: pageProduct.url.updateProduct + productId,
                data: JSON.stringify(product)
            }
        )
            .done((data) => {
                const str = pageProduct.commands.renderProduct(data)
                $("#tr_" + productId).replaceWith(str);
                // pageProduct.elements.bodyProduct.replaceWith(str);

                pageProduct.elements.modalUpdate.modal('hide');

                AppUtils.showSuccess('Sửa thành công');

                pageProduct.commands.handleClickRow()

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
                pageProduct.elements.btnUpdate.prop("disabled", false);
                pageProduct.elements.loading.addClass('hide')
            });
    }, 1000);
}


pageProduct.commands.handleClickRow = () => {

    pageProduct.commands.handleClickEditButton()
}

pageProduct.commands.handleClickEditButton = () => {

    pageProduct.elements.btnEditElems = $(".edit")

    pageProduct.elements.btnEditElems.off("click");

    pageProduct.elements.btnEditElems.each((index, item) => {

        $(item).on("click", async () => {

            productId = item.getAttribute("data-id")

            const product = await pageProduct.loadData.getProductById(productId)

            pageProduct.elements.productNameUp.val(product.productName);
            await pageProduct.commands.getAllCategories();
            await pageProduct.elements.categoryUp.val(product.category.id);
            pageProduct.elements.priceUp.val(product.price);
            pageProduct.elements.productDescriptionUp.val(product.description)

            pageProduct.elements.modalUpdate.modal("show")
        })
    })
}

pageProduct.elements.btnCreate.on('click', async () => {
    pageProduct.elements.frmCreate.trigger('submit')
})

pageProduct.elements.btnUpdate.on('click', async () => {
    pageProduct.elements.frmUpdate.trigger('submit')
})

pageProduct.elements.frmCreate.validate({
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
        pageProduct.commands.createProduct()
    }
})

pageProduct.elements.frmUpdate.validate({
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
        pageProduct.commands.updateProduct()
    }
})

pageProduct.elements.modalCreate.on('hidden.bs.modal', async () => {
    $('#modalCreate .area-error').empty().addClass('hide');
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()

    await pageProduct.commands.getAllCategories()

})

pageProduct.elements.modalUpdate.on('hidden.bs.modal', async () => {
    $('#modalUpdate .area-error').empty().addClass('hide');
    $('#frmUpdate').trigger('reset')
    $('#frmUpdate input').removeClass('error')
    $('#frmUpdate label.error').remove()

    await pageProduct.commands.getAllCategories()

})


$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {



    await pageProduct.loadData.getAllProducts();

    await pageProduct.commands.getAllCategories();

})

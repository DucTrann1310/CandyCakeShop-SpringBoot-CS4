const page = {
    url: {
        getAllUser: 'http://localhost:8080/api/users',
        getAllRoles: 'http://localhost:8080/api/roles',
        createUser: 'http://localhost:8080/api/users',
        updateUser: 'http://localhost:8080/api/users/',
        getUserById: 'http://localhost:8080/api/users/'
    },
    elements: {},
    loadData: {},
    commands: {}
}

let userId = 0;

page.elements.bodyUser = $("#tbUser tbody");

page.elements.loading = $('#loading');




page.elements.modalCreate = $("#modalCreate");
page.elements.usrCreate = $("#usrCreate");
page.elements.userNameCre = $("#userNameCre");
page.elements.roleCre = $("#roleCre");
page.elements.userPhone = $("#userPhone");
page.elements.username = $("#username");
page.elements.password = $("#password");
page.elements.address = $("#address");
page.elements.dob = $("#dob");
page.elements.gender = $("#gender");


page.elements.btnCreate = $("#btnCreate")

page.elements.modalUpdate = $("#modalUpdate");
page.elements.usrUpdate = $("#usrUpdate");
page.elements.userNameUp = $("#userNameUp");
page.elements.roleUp = $("#roleUp");
page.elements.btnUpdate = $("#btnUpdate")


async function getAllUsers() {
    return await $.ajax({
        url: page.url.getAllUser
    })
}

page.loadData.getAllUsers = async () => {
    const users = await getAllUsers();

    users.forEach(item => {
        const str = page.commands.renderUser(item)

        page.elements.bodyUser.append(str);

        page.commands.handleClickRow();
    })
}

page.loadData.getUserById = async () => {
    return await $.ajax({
        url: page.url.getUserById + userId
    })
}

page.commands.renderUser = (obj) => {
    return `
        <tr id="tr_${obj.id}">
            <td>${obj.id}</td>
            <td>${obj.userName}</td>
            <td>${obj.role.roleName}</td>
            <td>${obj.phone}</td>
            <td>${obj.address}</td>
            <td>${obj.dob}</td>
            <td>
                <button class="btn btn-outline-info edit" id="data_${obj.id}" data-id="${obj.id}">
                    <i class="far fa-edit"></i>
                    Edit
                </button>
            </td>
        </tr>
    `
}

page.commands.getAllRoles = async () => {

    page.elements.roleCre.empty();
    page.elements.roleUp.empty();

    await $.ajax({
        url: page.url.getAllRoles
    })
        .done((roles) => {
            $.each(roles, (index, item) => {
                const str = `<option value="${item.id}">${item.roleName}</option>`

                page.elements.roleCre.append(str)
                page.elements.roleUp.append(str)

            })
        })
};

page.elements.btnCreate.on('click', async () => {
    page.elements.usrCreate.trigger('submit')
})

page.elements.btnUpdate.on('click', async () => {
    page.elements.usrUpdate.trigger('submit')
})


page.elements.usrCreate.validate({
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
            $("#usrCreate input.error").removeClass("error");
        }
        this.defaultShowErrors();
    },
    submitHandler: () => {
        page.commands.createUser()
    }
})

page.elements.usrUpdate.validate({
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
            $("#usrUpdate input.error").removeClass("error");
        }
        this.defaultShowErrors();
    },
    submitHandler: () => {
        page.commands.updateUser()
    }
})

page.elements.modalCreate.on('hidden.bs.modal', async () => {
    $('#modalCreate .area-error').empty().addClass('hide');
    $('#usrCreate').trigger('reset')
    $('#usrCreate input').removeClass('error')
    $('#usrCreate label.error').remove()

    await page.commands.getAllRoles()

})

page.elements.modalUpdate.on('hidden.bs.modal', async () => {
    $('#modalUpdate .area-error').empty().addClass('hide');
    $('#usrUpdate').trigger('reset')
    $('#usrUpdate input').removeClass('error')
    $('#usrUpdate label.error').remove()

    await page.commands.getAllRoles()

})



page.commands.createUser = () => {
    const fullName = page.elements.userNameCre.val();
    const userName = page.elements.username.val();
    const password = page.elements.password.val();
    const phone = page.elements.userPhone.val();
    const address = page.elements.address.val();
    const dob = page.elements.dob.val();
    const gender = page.elements.gender.val();
    const id = page.elements.roleCre.val();
    const roleName = page.elements.roleCre.find('option:selected').text();

    const roleCreReqDTO = {
        id,
        roleName
    }

    const user = {
        fullName,
        userName,
        roleCreReqDTO,
        password,
        phone,
        address,
        dob,
        gender
    }

    page.elements.btnCreate.prop("disabled", true);

    page.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'POST',
                url: page.url.createUser,
                data: JSON.stringify(user)
            }
        )
            .done((data) => {
                const str = page.commands.renderUser(data)
                page.elements.bodyUser.prepend(str);

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

page.commands.updateUser = () => {
    const fullName = page.elements.userNameUp.val();
    const userName = page.elements.username.val();
    const password = page.elements.password.val();
    const phone = page.elements.userPhone.val();
    const address = page.elements.address.val();
    const dob = page.elements.dob.val();
    const gender = page.elements.gender.val();
    const id = page.elements.roleCre.val();
    const roleName = page.elements.roleCre.find('option:selected').text();

    const roleUpReqDTO = {
        id,
        roleName
    }

    const user = {
        fullName,
        userName,
        roleUpReqDTO,
        password,
        phone,
        address,
        dob,
        gender
    }

    page.elements.btnUpdate.prop("disabled", true);

    page.elements.loading.removeClass('hide');

    setTimeout(() => {
        $.ajax(
            {
                method: 'PATCH',
                url: page.url.updateUser + userId,
                data: JSON.stringify(user)
            }
        )
            .done((data) => {
                const str = page.commands.renderUser(data)
                $("#tr_" + userId).replaceWith(str);

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

page.commands.handleClickEditButton = () => {

    page.elements.btnEditElems = $(".edit")

    page.elements.btnEditElems.off("click");

    page.elements.btnEditElems.each((index, item) => {

        $(item).on("click", async () => {

            userId = item.getAttribute("data-id")

            const user = await page.loadData.getUserById(userId)

            page.elements.userNameUp.val(user.fullName);
            page.elements.username.val(user.userName);
            await page.commands.getAllRoles();
            await page.elements.roleUp.val(user.role.id);
            page.elements.userPhone.val(user.phone);
            page.elements.password.val(user.password);
            page.elements.address.val(user.address);
            page.elements.dob.val(user.dob);
            page.elements.gender.val(user.gender);

            page.elements.modalUpdate.modal("show")
        })
    })
}

page.commands.handleClickRow = () => {

    page.commands.handleClickEditButton()
}


$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

$(async () => {

    await page.loadData.getAllUsers();

    await page.commands.getAllRoles();



})

const signupForm = document.getElementById('signupForm');
let userSelected = {};
const formBody = document.getElementById('formBody');
let roles;
let genders;
let users = [];



signupForm.onsubmit = async (e) => {
    e.preventDefault();
    let data = getDataFromForm(signupForm);
    data = {
        ...data,
        role: {
            id: data.role
        },
        gender: {
            id: data.gender
        },
        id: userSelected.id
    }

    let message = "Created"
    if (userSelected.id) {
        await editUser(data);
        webToast.Success({
            status: 'Sửa thành công',
            message: '',
            delay: 2000,
            align: 'topright'
        });
    } else {
        await createUser(data)
        webToast.Success({
            status: 'Thêm thành công',
            message: '',
            delay: 2000,
            align: 'topright'
        });
    }
    $('#staticBackdrop').modal('hide');

}

function getDataFromForm(form) {
    const data = new FormData(form);
    const password = document.getElementById('password').value;

    data.append('password', password);
    if (userSelected.id) {
        data.append('id', userSelected.id);
    }
    return Object.fromEntries(data.entries())
}

async function getRolesSelectOption() {
    const res = await fetch('api/roles');
    return await res.json();
}

async function getGendersSelectOption() {
    const res = await fetch('api/genders');
    return await res.json();
}

window.onload = async () => {
    roles = await getRolesSelectOption();
    genders = await getGendersSelectOption();

    renderForm(formBody, getDataInput());
}


function getDataInput() {
    return [
        {
            label: 'Full Name',
            name: 'name',
            value: userSelected.name,
            required: true,
            pattern: "^[A-Za-z ]{6,20}",
            message: "Fullname must have minimum is 6 characters and maximum is 20 characters",
        },
        {
            label: 'User Name',
            name: 'username',
            value: userSelected.username,
            required: true,
            pattern: "^[A-Za-z ]{6,20}",
            message: "Username must have minimum is 6 characters and maximum is 20 characters",
        },
        {
            label: 'Password',
            name: 'password',
            value: userSelected.password,
            pattern: "^[A-Za-z0-9 ]{6,20}",
            message: "Password must have minimum is 6 characters and maximum is 20 characters",
            required: true
        },
        {
            label: 'Phone',
            name: 'phone',
            value: userSelected.phone,
            pattern: "[0-9]{10}",
            message: 'Phone errors.Phone input 10 characters',
            required: true
        },
        {
            label: 'Address',
            name: 'address',
            value: userSelected.address,
            pattern: "^[A-Za-z0-9 ]{6,50}",
            message: "address must have minimum is 6 characters and maximum is 50 characters",
            required: true
        },
        {
            label: 'Date Of birth',
            name: 'dob',
            value: userSelected.dob,
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
            message: "dob errors",
            required: true
        },
        // {
        //     label: 'Role',
        //     name: 'role',
        //     value: userSelected.roleId,
        //     type: 'select',
        //     required: true,
        //     options: roles,
        //     message: 'Please choose role',
        //
        // },
        {
            label: 'Gender',
            name: 'gender',
            value: userSelected.genderId,
            type: 'select',
            required: true,
            options: genders,
            message: 'Please choose gender'
        },
    ];
}


async function getUsers() {
    const res = await fetch('/api/users');
    return await res.json();
}

function clearForm() {
    signupForm.reset();
    userSelected = {};
}

function showCreate() {
    $('#staticBackdropLabel').text('Create User');
    clearForm();
    renderForm(formBody, getDataInput())
}

async function createUser(data) {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

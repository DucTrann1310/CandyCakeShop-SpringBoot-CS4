const userForm = document.getElementById('userForm');
let userSelected = {};
const formBody = document.getElementById('formBody');
const tBody = document.getElementById('tBody');
const ePagination = document.getElementById('pagination')
const eSearch = document.getElementById('search')
let roles;
let genders;
let users = [];

let pageable = {
    page: 1,
    sort: 'id,desc',
    search: ''
}

userForm.onsubmit = async (e) => {
    e.preventDefault();
    let data = getDataFromForm(userForm);
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
    await renderTable();
    $('#staticBackdrop').modal('hide');

}

function getDataFromForm(form) {
    // event.preventDefault()
    const data = new FormData(form);

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
    await renderTable();
    // onLoadSort();

    renderForm(formBody, getDataInput());
}
//
// $(async () => {
//     roles = await getRolesSelectOption();
//     genders = await getGendersSelectOption();
//     await renderTable();
//     // onLoadSort();
//
//     // renderForm(formBody, getDataInput());
// })


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


async function findUserById(id) {
    const res = await fetch('/api/users/' + id);
    return await res.json();
}


async function showEdit(id) {
    $('#staticBackdropLabel').text('Edit User');
    clearForm();
    userSelected = await findUserById(id);
    renderForm(formBody, getDataInput());
}


async function getUsers() {
    const res = await fetch('/api/users');
    return await res.json();
}

function renderItemStr(item) {
    return `<tr>
                    <td>
                        ${item.id}
                    </td>
                    <td>
                        ${item.name}
                    </td>  
                    <td>
                        ${item.username}
                    </td>
                    <td>
                        ${item.phone}
                    </td>
                    <td>
                        ${item.address}
                    </td>
                    <td>
                        ${item.dob}
                    </td>
                    <td>
                        ${item.gender}
                    </td>     
                    <td>
                        <a class="btn btn-primary text-white  edit " data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</a>                    

                    </td>
                </tr>`
}

function renderTBody(items) {
    let str = '';
    items.forEach((e, i) => {
        str += renderItemStr(e, i);
    })
    tBody.innerHTML = str;
}

async function renderTable() {
    const response = await fetch(`/api/users?page=${pageable.page - 1 || 0}&sort=${pageable.sortCustom || 'id,desc'}&search=${pageable.search || ''}`);
    // const pageable = await getRooms();
    // rooms = pageable.content;
    // renderTBody(rooms);

    const result = await response.json();
    pageable = {
        ...pageable,
        ...result
    };
    genderPagination();
    renderTBody(result.content);
    addEventEditAndDelete();
}

const genderPagination = () => {
    ePagination.innerHTML = '';
    let str = '';
    //generate preview truoc
    str += `<li class="page-item ${pageable.first ? 'disabled' : ''}">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>`
    //generate 1234

    for (let i = 1; i <= pageable.totalPages; i++) {
        str += ` <li class="page-item ${(pageable.page) === i ? 'active' : ''}" aria-current="page">
      <a class="page-link" href="#">${i}</a>
    </li>`
    }
    //
    //generate next truoc
    str += `<li class="page-item ${pageable.last ? 'disabled' : ''}">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Next</a>
            </li>`
    //generate 1234
    ePagination.innerHTML = str;

    const ePages = ePagination.querySelectorAll('li'); // lấy hết li mà con của ePagination
    const ePrevious = ePages[0];
    const eNext = ePages[ePages.length-1]

    ePrevious.onclick = () => {
        if(pageable.page === 1){
            return;
        }
        pageable.page -= 1;
        renderTable();
    }
    eNext.onclick = () => {
        if(pageable.page === pageable.totalPages){
            return;
        }
        pageable.page += 1;
        renderTable();
    }
    for (let i = 1; i < ePages.length - 1; i++) {
        if(i === pageable.page){
            continue;
        }
        ePages[i].onclick = () => {
            pageable.page = i;
            renderTable();
        }
    }
}
const onSearch = (e) => {
    e.preventDefault()
    pageable.search = eSearch.value;
    pageable.page = 1;
    renderTable();
}

// <a class="btn btn-warning text-white delete" onclick="deleteUser(${item.id})" >Delete</a>
// const onLoadSort = () => {
//     eHeaderName.onclick = () => {
//         let sort = 'name,desc'
//         if(pageable.sortCustom?.includes('name') &&  pageable.sortCustom?.includes('desc')){
//             sort = 'name,asc';
//             eHeaderName.innerHTML = 'Price <i class="bx bxs-up-arrow"></i>';
//         }else {
//             eHeaderName.innerHTML = 'Price <i class="bx bxs-down-arrow"></i>';
//         }
//         pageable.sortCustom = sort;
//         renderTable();
//     }
// }

const searchInput = document.querySelector('#search');

searchInput.addEventListener('search', () => {
    onSearch(event)

});
function search(event){
    onSearch(event)
}

const addEventEditAndDelete = () => {
    const eEdits = tBody.querySelectorAll('.edit');
    const eDeletes = tBody.querySelectorAll('.delete');
    for (let i = 0; i < eEdits.length; i++) {
        console.log(eEdits[i].id)
        eEdits[i].addEventListener('click', () => {
            showEdit(eEdits[i].dataset.id);
        })
    }
}

function clearForm() {
    userForm.reset();
    userSelected = {};
}

function showCreate() {
    $('#staticBackdropLabel').text('Create User');
    clearForm();
    renderForm(formBody, getDataInput())
}

async function editUser(data) {
    const res = await fetch('/api/users/' + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
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

// async function deleteUser(id) {
//     const confirmBox = webToast.confirm("Are you sure to delete User " + id + "?");
//     confirmBox.click(async function () {
//         const res = await fetch('/api/users/' + id, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(id)
//         });
//         if (res.ok) {
//             // alert("Deleted");
//             webToast.Success({
//                 status: 'Xóa thành công',
//                 message: '',
//                 delay: 2000,
//                 align: 'topright'
//             });
//             await renderTable();
//         } else {
//             alert("Something went wrong!")
//         }
//     });
// }


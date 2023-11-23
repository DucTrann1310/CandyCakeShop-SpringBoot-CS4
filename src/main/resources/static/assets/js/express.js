const expressForm = document.getElementById('expressForm');
let expressSelected = {};
const formBody = document.getElementById('formBody');
const tBody = document.getElementById('tBody');
const ePagination = document.getElementById('pagination')
const eSearch = document.getElementById('search')

let expresss = [];

let pageable = {
    page: 1,
    sort: 'id,desc',
    search: ''
}

expressForm.onsubmit = async (e) => {
    e.preventDefault();
    let data = getDataFromForm(expressForm);
    console.log(data)
    data = {
        ...data,

        id: expressSelected.id
    }
    console.log(data)

    let message = "Created"
    if (expressSelected.id) {
        await editExpress(data);
        webToast.Success({
            status: 'Sửa thành công',
            message: '',
            delay: 2000,
            align: 'topright'
        });
    } else {
        await createExpress(data)
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

window.onload = async () => {
    await renderTable();
    // onLoadSort();

    renderForm(formBody, getDataInput());
}


function getDataInput() {
    return [
        {
            label: 'Full Name',
            name: 'name',
            value: expressSelected.name,
            required: true,
            pattern: "^[A-Za-z ]{6,20}",
            message: "Fullname must have minimum is 6 characters and maximum is 20 characters",
        },
        {
            label: 'Phone',
            name: 'phone',
            value: expressSelected.phone,
            pattern: "[0-9]{10}",
            message: 'Phone errors.Phone input 10 characters',
            required: true
        },
    ];
}


async function findExpressById(id) {
    const res = await fetch('/api/expresss/' + id);
    return await res.json();
}

async function showEdit(id) {
    $('#staticBackdropLabel').text('Edit Express');
    clearForm();
    expressSelected = await findExpressById(id);
    renderForm(formBody, getDataInput());
}


async function getExpresss() {
    const res = await fetch('/api/expresss');
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
                        ${item.phone}
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
    const response = await fetch(`/api/expresss?page=${pageable.page - 1 || 0}&sort=${pageable.sortCustom || 'id,desc'}&search=${pageable.search || ''}`);
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
    expressForm.reset();
    expressSelected = {};
}

function showCreate() {
    $('#staticBackdropLabel').text('Create Express');
    clearForm();
    renderForm(formBody, getDataInput())
}

async function editExpress(data) {
    const res = await fetch('/api/expresss/' + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function createExpress(data) {
    const res = await fetch('/api/expresss', {
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


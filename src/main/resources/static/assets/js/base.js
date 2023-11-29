



function createInput(props) {
    console.log(props.id)
    return `<div class="form-group ${props.classContainer || ''}">
                <label class="${props.classLabel || ''}form-label">${props.label}</label>
                <input class="input-custom form-control ${props.classInput || ''}"
                    type="${props.type || 'text'}" 
                    name="${props.name}"
                    ${props.pattern ? `pattern="${props.pattern}"` : ""} 
                    value="${props.value || ''}"
                    ${props.required ? 'required' : ''}
                    id="${props.id || ''}"
                />
                <span class="error form-text ${props.classError}">${props.message}</span> 
            </div>`;
}

function createSelect(props) {
    let optionsStr = "";
    props.options.forEach(e => {
        if(e.value == props.value){
            optionsStr += `<option value="${e.value}" selected>${e.name}</option>`;
        }else{
            optionsStr += `<option value="${e.value}">${e.name}</option>`;
        }

    })

    return `<div class="form-group ${props.classContainer || ''}">
                <label class="${props.classLabel || ''} form-label">${props.label}</label>
                <select class="input-custom form-control ${props.classSelect || ''}" 
                type="${props.type || 'text'}" name="${props.name}" 
                ${props.pattern ? `pattern=${props.pattern}` : ""} 
                value="${props.value}"
                ${props.required ? 'required' : ''}>
                    <option value>---Choose---</option>
                    ${optionsStr}
                </select>
                <span class="error ${props.classError || ''} form-text">${props.message}</span>
            </div>`
}

function createFieldForm(props) {
    if (props.type === 'select') {
        return createSelect(props);
    }
    return createInput(props);
}






const onFocus = (formBody, index) => {
    const inputsForm = formBody.querySelectorAll('.input-custom')
    inputsForm[index].setAttribute("focused", "true"); // add 1 attribute focused=true.
}


function renderForm(formBody, inputs) {

    formBody.innerHTML = ""; //clear ô input cũ
    inputs.forEach((input) => {
        formBody.innerHTML += createFieldForm(input); //gen từng ô input mới
    })

    const inputElemments = formBody.querySelectorAll('.input-custom');

    // add sự kiện onFocus
    for (let i = 0; i < inputElemments.length; i++) {
        inputElemments[i].onblur = function () {
            onFocus(formBody, i)
            validateInput(inputs.at(i), inputElemments[i], i)
        }
        inputElemments[i].oninput = function () {
            validateInput(inputs.at(i), inputElemments[i], i)

        }
    }

}
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault(); // chặn popup của html5
        e.target.onblur(); // call onblur của tất cả các ô input
    };
})(), true);

function validateInput(inputProp, inputElement, index) {

    const { validate, messageRequired, message, messageCustom } = inputProp;
    const error = document.getElementsByClassName('error')[index];
    const value = inputElement.value.trim();

    if (inputElement.required && value === '') {
        error.innerHTML = messageRequired || 'This field is required!';
        return;
    }
    let errormessage = message;
    if (validate && !validate(value)){
        errormessage = messageCustom;
    }
    error.innerHTML = errormessage;
}
function getDataFromForm(event, form) {
    event.preventDefault()
    const data = new FormData(form);
    return Object.fromEntries(data.entries())
}


const inputs = [
    {
        label: "Username",
        name: "username",
        pattern: "^[A-Za-z ]{6,20}",
        message: "Username must have minimun is 6 charaters and maximun is 20 charaters",
        require: false,
        value: ""
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        message: "Email invalid",
        require: true,
        value: "",
        validate: (value) => {
            if (value.length < 3) {
                return false;
            }
            return true;
        },
        messageCustom: "Trên 3 ký tự",
        messageRequire: "Nhập đê"
    },
    {
        label: "Gender",
        name: "gender",
        type: "select",
        require: true,
        message: "Gender invalid",
        options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }]
    }
];

function getDataFromForm(form) {
    // event.preventDefault()
    const data = new FormData(form);
    return Object.fromEntries(data.entries())
}

function onChangeSelect2(selector, value){
    const element = $(selector);
    element.val(value);
    element.change();
}


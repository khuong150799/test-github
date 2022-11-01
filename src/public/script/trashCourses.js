var formforever = document.forms['form-forever'];
var formrestore = document.forms['form-restore'];
const btnsRestore = document.querySelectorAll('.btn-restore');
const btnforeverCourse = document.getElementById('btn-forever-course');
const modalforever = document.getElementById('modal-confirm-forever');
//select checkbox
const containerForm = document.forms['container-form'];
const btnCheckAll = document.getElementById('check-all');
const btnCheckItems = document.querySelectorAll('input[name="coursesIds"]');
const btnSubmit = document.querySelector('.btn-submit');
const select = document.querySelector('[name="action"]');

let courseId;
/*get id từ button*/
const getIdButton = (e) => {
    if (select.value === 'delete_forever') {
        Array.from(btnCheckItems).forEach((btnCheckItem) => {
            courseId = btnCheckItem.value;
        });
    } else {
        const button = e.relatedTarget;
        courseId = button.getAttribute('data-id');
    }
};
modalforever.addEventListener('show.bs.modal', getIdButton); //form forever
btnforeverCourse.onclick = function (e) {
    e.preventDefault();
    if (select.value === 'delete_forever') {
        containerForm.submit();
    } else {
        formforever.action = '/course/' + courseId + '/force?_method=DELETE';
        formforever.submit();
    }
}; //onclick btnRestore
for (const btnRestore of btnsRestore) {
    btnRestore.onclick = (e) => {
        e.preventDefault();
        courseId = e.target.getAttribute('data-id');
        formrestore.action = '/course/' + courseId + '/restore?_method=PATCH';
        formrestore.submit();
    };
}

//btn check all is checked
btnCheckAll.onchange = () => {
    const isCheckAll = btnCheckAll.checked;
    Array.from(btnCheckItems).forEach((btnCheckItem) => {
        btnCheckItem.checked = isCheckAll;
    });
    handleToggelDisabled();
};

//check condition checkall
Array.from(btnCheckItems).forEach((btnCheckItem) => {
    btnCheckItem.onchange = () => {
        const isCheckAll =
            btnCheckItems.length === document.querySelectorAll('input[name="coursesIds"]:checked').length;
        btnCheckAll.checked = isCheckAll;
        handleToggelDisabled();
    };
});

//check disabled
function handleToggelDisabled() {
    const inpChecked = document.querySelectorAll('input[name="coursesIds"]:checked').length;

    if (inpChecked > 0) {
        btnSubmit.classList.remove('disabled');
    } else {
        btnSubmit.classList.add('disabled');
    }
}

select.onchange = () => {
    if (select.value === 'delete_forever') {
        btnSubmit.setAttribute('data-bs-toggle', 'modal');
        btnSubmit.setAttribute('data-bs-target', '#modal-confirm-forever');
    }
};

containerForm.onsubmit = (e) => {
    const isDisable = btnSubmit.classList.contains('disabled');

    if (isDisable || select.value === 'delete_forever') {
        e.preventDefault();
    }
};

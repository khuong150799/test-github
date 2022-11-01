var formDelete = document.forms['form-delete'];
const containerForm = document.forms['container-form'];
const btnDeleteCourse = document.getElementById('btn-delete-course');
const modalDelete = document.getElementById('modal-confirm-delete');
const btnCheckAll = document.getElementById('check-all');
const btnCheckItems = document.querySelectorAll('input[name="coursesIds"]');
const btnSubmit = document.querySelector('.btn-submit');
let courseId;
/*get id từ button*/
const getIdButton = (e) => {
    const button = e.relatedTarget;
    courseId = button.getAttribute('data-id');
};
modalDelete.addEventListener('show.bs.modal', getIdButton); //form delete
btnDeleteCourse.onclick = function () {
    formDelete.action = '/course/' + courseId + '?_method=DELETE';
    formDelete.submit();
};

btnCheckAll.onchange = (e) => {
    const isCheckAll = btnCheckAll.checked;

    Array.from(btnCheckItems).forEach((btnCheckItem, index) => {
        btnCheckItem.checked = isCheckAll;
    });
    handleToggelDisabledButton();
};
Array.from(btnCheckItems).forEach((btnCheckItem, index) => {
    btnCheckItem.onchange = () => {
        const isCheckAll =
            btnCheckItems.length === document.querySelectorAll('input[name="coursesIds"]:checked').length;
        btnCheckAll.checked = isCheckAll;
        handleToggelDisabledButton();
    };
});

function handleToggelDisabledButton() {
    const inpChecked = document.querySelectorAll('input[name="coursesIds"]:checked').length;
    if (inpChecked > 0) {
        btnSubmit.classList.remove('disabled');
    } else {
        btnSubmit.classList.add('disabled');
    }
}

containerForm.onsubmit = (e) => {
    const isDisabled = btnSubmit.classList.contains('disabled');
    if (isDisabled) {
        e.preventDefault();
    }
};

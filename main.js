


function openModal(ID){
    const modal = document.querySelector("#modalSection");
    modal.classList.add('mostrar');
};

function closeModal(ID){
    const modal = document.querySelector("#modalSection");
    modal.classList.remove('mostrar');
};

document.getElementById('registerButton')
    .addEventListener('click', openModal)

document.getElementById('closeModal')
    .addEventListener('click', closeModal)

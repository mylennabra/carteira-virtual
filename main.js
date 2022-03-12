'use strict'

function openModal(ID){
    const modal = document.querySelector("#modalSection");
    modal.classList.add('mostrar');
}

function closeModal(ID){
    const modal = document.querySelector("#modalSection");
    modal.classList.remove('mostrar');
}

document.getElementById('registerButton')
    .addEventListener('click', openModal)

document.getElementById('closeModal')
    .addEventListener('click', closeModal)

document.getElementById('exitButton')
    .addEventListener('click', closeModal)


const tempTransactions = {
    nome: "Supermercado",
    valor: "25,00",
    data: "02/03/2022"
}

// CRUD - create



const createTransaction = (transaction) => {
    const db_transaction = getLocalStorage()
    db_transaction.push (transaction)
    setLocalStorage(db_transaction) 
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_transaction')) ?? []

const setLocalStorage = (db_transaction) => localStorage.setItem("db_transaction", JSON.stringify(db_transaction))
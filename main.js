'use strict'

// Modal
function openModal(ID){
    const modal = document.querySelector("#modalSection");
    modal.classList.add('mostrar');
}

function closeModal(ID){
    const modal = document.querySelector("#modalSection");
    clearFields()
    modal.classList.remove('mostrar');
}

// Creating e getting the local storage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_transaction')) ?? [] //Read database, transform JSON and put on db_transaction
const setLocalStorage = (db_transaction) => localStorage.setItem("db_transaction", JSON.stringify(db_transaction)) // Taking to database after turning into string with JSON

// Crete
const createTransaction = (transaction) => {
    const db_transaction = getLocalStorage() 
    db_transaction.push(transaction) // Adding one more to database
    setLocalStorage(db_transaction)
}

// Read
const readTransaction = () => getLocalStorage()

// Update
const updateTransaction = (index, transaction) => {
    const db_transaction = readTransaction()
    db_transaction[index] = transaction
    setLocalStorage(db_transaction)
}

// Delete
const deleteTransaction = (index) => {
    const db_transaction = readTransaction()
    db_transaction.splice (index, 1)
    setLocalStorage(db_transaction)
}

// Saving transaction on local storage
const saveTransactions = () => {
    if (isValidTransaction()){
        const transaction = {
            name: document.getElementById('inputName').value,
            price: document.getElementById('inputPrice').value,
            date: document.getElementById('inputDate').value
        }
        const index = document.getElementById('inputName').dataset.index // Pulling the data-index from the HTML
        if (index == "new"){
            createTransaction(transaction)
            updateTable()
            closeModal()
        } else {
            updateTransaction(index, transaction)
            updateTable()
            closeModal()
        }
    }
}

// Validating fields
const isValidTransaction = () => {
    return document.getElementById('newTransaction').reportValidity()
}

// Clearing the fields
const clearFields = () => {
    const fields = document.querySelectorAll('.main-content__modalSection--content--form--fillField')
    fields.forEach(field => field.value = "")
    //document.getElementById('inputName').dataset.index = 'new'
}

// Insert content on table
const updateTable = (transaction) => {
    const db_transaction = readTransaction()
    clearTable()
    db_transaction.forEach(createRow)
}

// Creating row
const createRow = (transaction, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td class="tbody--cell">${transaction.name}</td>
        <td class="tbody--cell">${transaction.price}</td>
        <td class="tbody--cell">${transaction.date}</td>
        <td>
            <button type="button" class="button main-content__table--content--tbody--button" id="editButton-${index}">Editar</button>
            <button type="button" class="button main-content__table--content--tbody--button" id="deletButton-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#table>tbody').appendChild(newRow) //newRow sends automatically two infos: element and index from array
}

// Clear table before update it
const clearTable = () => {
    const rows = document.querySelectorAll('#table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-') // Transforming into array, setting the nº 0 to action and nº 1 to index
        
        if (action == 'editButton') {
            editTransaction(index)
        } else {
            const confirmation = confirm('Você quer mesmo apagar esta transação?') // Opens a "alert" window with a yes or no confirmation
            if (confirmation) {
                deleteTransaction(index)
                updateTable()
            }
        }
    }
}

const editTransaction = (index) => {
    const transaction = readTransaction()[index]
    transaction.index = index // Defining index in transaction
    fillFields(transaction)
    openModal()
}

const fillFields = (transaction) => {
    document.getElementById('inputName').value = transaction.name
    document.getElementById('inputPrice').value = transaction.price
    document.getElementById('inputDate').value = transaction.date
    document.getElementById('inputName').dataset.index = transaction.index // Not making index="new" affection
}

updateTable()

function changeTheme(){
    const doc = document.getElementById("body");
    doc.classList.add('changeThemeMixin');
}

// Events
document.getElementById('registerButton')
    .addEventListener('click', openModal)

document.getElementById('closeModal')
    .addEventListener('click', closeModal)

document.getElementById('exitButton')
    .addEventListener('click', closeModal)

document.getElementById('saveButton')
    .addEventListener('click', saveTransactions)

document.querySelector('#table>tbody')
    .addEventListener('click', editDelete)

document.getElementById('themeButton')
    .addEventListener('click', changeTheme)
const button = document.querySelector("#button");
const logTable = document.querySelector('.table-element');
const buttonCleanAll = document.querySelector("#cleanAll");
const tBody = document.querySelector("#tableContent");
const selection = document.querySelector("#selectInput");

const INCOME = "income";
const EXPENSES = "expenses";

let logsDeleteButtons;
let arrayData = JSON.parse(localStorage.getItem("logs"));

if (arrayData !== null) {
  appendData();
}

button.addEventListener('click', function(){
  let totalBudget = parseInt(document.querySelector('#budget').innerHTML);
  let totalSavings = parseInt(document.querySelector('#savings').innerHTML);
  let currentAmount = parseInt(document.querySelector("#amount").value);
  let description = document.querySelector('#description');
  let actionType = document.querySelector('#type');

  switch(actionType.value) {
    case INCOME:
      totalBudget += currentAmount;
      document.querySelector('#budget').innerHTML = totalBudget;
      caseName = "Income";
      createLogData(caseName, description, currentAmount);
      description.value = '';
      document.querySelector("#amount").value = '';
      break;
    case EXPENSES:
      totalBudget -= currentAmount;
      document.querySelector('#budget').innerHTML = totalBudget;
      caseName = "Expenses";
      createLogData(caseName, description, currentAmount);
      description.value = '';
      document.querySelector("#amount").value = '';
      break;
    default:
      totalSavings += currentAmount;
      document.querySelector('#savings').innerHTML = totalSavings;
      caseName = "Savings";
      createLogData(caseName, description, currentAmount);
      description.value = '';
      document.querySelector("#amount").value = '';
  }
})

function createLogData (caseName, description, currentAmount){
  let logData = {
    caseName: caseName,
    description: description.value,
    amount: currentAmount
  }
  arrayData.push(logData);
  appendData();
}

function appendData() {
  let logs = Array.from(document.querySelectorAll('.logItem'));
  if(logs.length > 0) {
    logs.forEach(log => {
      log.remove();
    })
  }

  arrayData.map(log => {
    let tr = document.createElement('tr');
    tr.classList = 'logItem';
    let tdCase = document.createElement('td');
    tdCase.innerText = log.caseName;
    tdCase.classList = 'amount-type';
    let tdDescription = document.createElement('td');
    tdDescription.innerText = log.description;
    let tdAmount = document.createElement('td');
    tdAmount.innerText = log.amount;
    let tdDelete = document.createElement('td');
    tdDelete.innerHTML = '&times';
    tdDelete.classList.add('delete-item');

    if (tdCase.innerText === "Income") {
      tr.setAttribute("data-status","income");
    } else if (tdCase.innerText === "Expenses") {
      tr.setAttribute("data-status","expenses");
    } else {
      tr.setAttribute("data-status","savings");
    }

    tBody.appendChild(tr);
    tr.appendChild(tdCase);
    tr.appendChild(tdDescription);
    tr.appendChild(tdAmount);
    tr.appendChild(tdDelete);

    logTable.appendChild(tBody);
    getDeleteButtons();
    localStorage.setItem("logs", JSON.stringify(arrayData));

    setColorType(tdCase.innerText);
  })
}

function setColorType(type) {
  const amountType = document.getElementsByClassName('amount-type');
  for(let i = 0; i < amountType.length; i++) {
    if (type === "Income") {
      amountType[amountType.length - 1].style.backgroundColor = 'DarkSeaGreen';
    } else if (type === "Expenses") {
      amountType[amountType.length - 1].style.backgroundColor = 'Salmon';
    } else {
      amountType[amountType.length - 1].style.backgroundColor = 'Violet';
    }
  }  
}

function sortData(selectedResult){
  let logs = tBody.rows;

  for (log of logs) {
    log.style.display = "none";
    if (log.dataset.status === "income" && selectedResult === "Income") {
      log.style.display = "table-row"; 
    } else if (log.dataset.status === "expenses" && selectedResult === "Expenses") {
      log.style.display = "table-row"; 
    } else if (log.dataset.status === "savings" && selectedResult === "Savings") {
      log.style.display = "table-row";
    } else if (selectedResult === "All") {
      log.style.display = "table-row";
    }
  }
}

selection.addEventListener('change', () => {
  selectedResult = selection.options[selection.selectedIndex].text;
  sortData(selectedResult);
})

function getDeleteButtons(){
  logsDeleteButtons = Array.from(document.querySelectorAll('.delete-item'));
  logsDeleteButtons.forEach(button =>{
    let logTitle = button.previousSibling.previousSibling.previousSibling.innerText;
    button.addEventListener('click', () => {
      deleteLog(logTitle);
    })
  })
}

function deleteLog(logTitle){
  for(let i = 0; i < arrayData.length; i++) {
    if(arrayData[i].caseName == logTitle){
      arrayData.splice(i, 1);
    }
  }
  localStorage.setItem('logs', JSON.stringify(arrayData));
  appendData();
}
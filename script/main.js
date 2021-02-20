const button = document.querySelector("#button");
const logTable = document.querySelector('.table-element');
const buttonCleanAll = document.querySelector("#cleanAll");
const tBody = document.querySelector("#tableContent");
const selection = document.querySelector("#selectInput");

const INCOME = "income";
const EXPENSES = "expenses";

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
  console.log(arrayData);
  arrayData.push(logData);
  appendData();
  console.log(arrayData);
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

    logTable.appendChild(tBody);
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
  let logs = logTable.rows;
  let logsHeader = logTable.rows[0]
  
  for (log of logs) {
    logsHeader.style.display = "table-row";
    log.style.display = "none";
    if (log.innerHTML.includes("Income") && selectedResult === "Income") {
      log.style.display = "table-row"; 
    } else if (log.innerHTML.includes("Expenses") && selectedResult === "Expenses") {
      log.style.display = "table-row"; 
    } else if (log.innerHTML.includes("Savings") && selectedResult === "Savings") {
      log.style.display = "table-row";
    } else if (selectedResult === "All") {
      log.style.display = "table-row";
    }
  }
}

selection.addEventListener('change', () => {
  selectedResult = selection.options[selection.selectedIndex].text;
  console.log(selectedResult);
  sortData(selectedResult);
})


buttonCleanAll.addEventListener('click', function(){
  arrayData = [];
  tBody.innerHTML = "";
})



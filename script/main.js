const actionType = document.querySelector('#type');
const button = document.querySelector("#button");


button.addEventListener('click', function(){
  if (actionType.value === "income") {
    addAmount()
  } else if (actionType.value === "expenses") {
    subtractAmount();
  } else {
    addSavings();
  }
})
 

function addAmount() {
  let totalBudget = parseInt(document.querySelector('#budget').innerHTML);
  let currentAmount = parseInt(document.querySelector("#amount").value);
  totalBudget += currentAmount;
  document.querySelector('#budget').innerHTML = totalBudget;
}


function subtractAmount() {
  let totalBudget = parseInt(document.querySelector('#budget').innerHTML);
  let currentAmount = parseInt(document.querySelector("#amount").value);
  totalBudget -= currentAmount;
  document.querySelector('#budget').innerHTML = totalBudget;
}


function addSavings() {
  let totalSavings = parseInt(document.querySelector('#savings').innerHTML);
  let currentAmount = parseInt(document.querySelector("#amount").value);
  totalSavings += currentAmount;
  document.querySelector('#savings').innerHTML = totalSavings;
}
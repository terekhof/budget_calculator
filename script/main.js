const button = document.querySelector("#button");

button.addEventListener('click', function(){
  let totalBudget = parseInt(document.querySelector('#budget').innerHTML);
  let totalSavings = parseInt(document.querySelector('#savings').innerHTML);
  let currentAmount = parseInt(document.querySelector("#amount").value);
  let actionType = document.querySelector('#type');
  switch(actionType.value) {
    case "income":
      totalBudget += currentAmount;
      document.querySelector('#budget').innerHTML = totalBudget;
      break;
    case "expenses":
      totalBudget -= currentAmount;
      document.querySelector('#budget').innerHTML = totalBudget;
      break;
    default:
      totalSavings += currentAmount;
      document.querySelector('#savings').innerHTML = totalSavings;
  }
})

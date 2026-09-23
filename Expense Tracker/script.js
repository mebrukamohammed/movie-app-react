const balanceElement=document.getElementById("balance");
const incomeElement=document.getElementById("income-amount");
const expenseElement=document.getElementById("expense-amount");
const transactionListElement=document.getElementById("transaction-list");
const transactionAddingForm=document.getElementById("transaction-form");
const descElement=document.getElementById("description");
const amountElement=document.getElementById("amount");
let transactions=JSON.parse(localStorage.getItem("transactions")) ||[];
transactionAddingForm.addEventListener("submit" ,addTransaction);
function addTransaction(e){
    e.preventDefault();
    const description=descElement.value.trim();
    const amount=parseFloat(amountElement.value);
    transactions.push({
        id:Date.now(),
        description,
        amount
    })
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    transactionAddingForm.reset();
    
}
 function updateTransactionList(){
    transactionListElement.innerHTML="";
    const sortedTransactions=[...transactions].reverse();
    const transactionEl=sortedTransactions.forEach(transaction=>{
         const transactionLiElement=createTransactionElement(transaction);
         transactionListElement.appendChild(transactionLiElement);
    })}
    function createTransactionElement(transaction){
    const li=document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount>0? "income":"expenses");
    li.innerHTML=`
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)} <button class="delete-btn" onclick="removeList(${transaction.id})">x</button></span>`;
    return li;

    }
    function removeList(transactionId){
      transactions=transactions.filter(transaction=> transaction.id!==transactionId);
      localStorage.setItem("transactions",JSON.stringify(transactions));
      updateTransactionList();
      updateSummary();
    }
    function updateSummary(){
        const balance=transactions.reduce((acc,transaction) => acc+transaction.amount,0);
       const  income=transactions.filter(transaction => 
           transaction.amount>0)
           .reduce((acc,transaction) => acc+transaction.amount,0);
        const  expense=transactions.filter(transaction => 
           transaction.amount<0)
           .reduce((acc,transaction) => acc+transaction.amount,0);
           
     
        balanceElement.textContent=formatCurrency(balance);
        incomeElement.textContent=formatCurrency(income);
        expenseElement.textContent=formatCurrency(expense);
    }
    
  

function formatCurrency(number){
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
    }).format(number);}
        updateTransactionList();
        updateSummary();

 
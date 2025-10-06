const transactionhistory = document.getElementById('transaction-history');
const totalincome = document.getElementById('total-income');
const totalexpense = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

function addIncome()
{
    const description = document.getElementById("income-description").value.trim();
    const amount = parseFloat(document.getElementById("income-amount").value.trim());

    if(description === " " || isNaN(amount) || amount<=0)
    {
        alert('Please enter a valid description and amount. ');
        return;
    }

    addTransaction(description, "Income", amount, "Income");
    updateSummary();
    clearInputs();

}

function addExpense()
{
     const description = document.getElementById("expense-description").value.trim();
     const category = document.getElementById("expense-category").value;
     const amount = parseFloat(document.getElementById("expense-amount").value.trim());

     if(description === " " || isNaN(amount) || amount<=0)
     {
          alert('please provide valid description and amount.');
          return;
     }

    addTransaction(description,category,amount,"Expense");
    updateSummary();
     clearInputs();

}

function addTransaction(description,category,amount,type)
{
      const row = document.createElement("tr");

      row.innerHTML =`
      <td>${description}</td>
      <td>${category}</td>
      <td>${amount.toFixed(2)}</td>
      <td>${type}</td>
      <td><button type="button" class="delete-btn">Delete</button></td>
      `;

      transactionhistory.appendChild(row);

      row.querySelector(".delete-btn").addEventListener("click",() =>{
        row.remove();
        updateSummary();


      });
}

function updateSummary()
{
    let incometotal =0;
    let expensetotal = 0;

    document.querySelectorAll("#transaction-history tr").forEach(row=>{

      const amount = parseFloat(row.children[2].textContent);
      const type = row.children[3].textContent;

      if(type === "Income")
      {
        incometotal += amount;
      }
      else{
          expensetotal += amount;
      }

    });

    totalincome.textContent = incometotal.toFixed(2);
    totalexpense.textContent = expensetotal.toFixed(2);
    balance.textContent = (incometotal-expensetotal).toFixed(2);
}

function clearInputs()
{
    document.getElementById("income-description").value="";
    document.getElementById("income-amount").value = "";
     document.getElementById("expense-description").value = "";
      document.getElementById("expense-amount").value = "";
       document.getElementById("expense-category").SelectedIndex = 0;
}


function clearAll()
{
  transactionhistory.innerHTML =' ';
  updateSummary();
}
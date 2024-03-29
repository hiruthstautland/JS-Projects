class UI {
  constructor() {
    //decleare uptop
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    let budgetError = this.budgetFeedback.classList;
    if (value === "" || value < 0) {
      budgetError.add("showItem");
      this.budgetFeedback.innerHTML = `<p>Enter a valid value!</p>`;
      setTimeout(function() {
        budgetError.remove("showItem");
      }, 1000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
      // }
    }
  }
  //Show Balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;

    // if (total < 0) {
    //   this.balance.classList.remove("showGreen", "showBlack");
    //   this.balance.classList.add("showRed");
    // } else if (total > 0) {
    //   this.balance.classList.remove("showGreen", "showRed");
    //   this.balance.classList.add("showGreen");
    // } else if (total === 0) {
    //   this.balance.classList.remove("showRed", "showBlack");
    //   this.balance.classList.add("showBlack");
    // }

    // switch (total) {
    //   case total > 0:
    //     this.balance.classList.add("showGreen");
    //     break;
    //   case total < 0:
    //     this.balance.classList.add("showRed");
    //     break;
    //   default:
    //     this.balance.classList.add("showBlack");
    // }
    total < 0
      ? this.balance.classList.add("showRed")
      : total > 0
      ? this.balance.classList.add("showGreen")
      : this.balance.classList.add("showBlack");
  }
  //submit expense form
  submitExpenseForm() {
    const expenseName = this.expenseInput.value;
    const expenseAmount = this.amountInput.value;
    let expenseError = this.expenseFeedback.classList;
    // || = or
    if (expenseName === "" || expenseAmount === "" || expenseAmount < 0) {
      expenseError.add("showItem");
      this.expenseFeedback.innerHTML = `<p>Please enter the expense and an amount!</p>`;
      setTimeout(function() {
        expenseError.remove("showItem");
      }, 1000);
    } else {
      let amount = parseInt(expenseAmount);
      this.expenseInput = "";
      this.amountInput = "";

      let expense = {
        id: this.itemID,
        title: expenseName,
        amount: amount
      };
      this.itemID++;
      this.itemList.submitExpenseForm(expense);
      this.addExpense(expense);
      //Add show current balance
    }
  }
  //Add Expense method w/object
  addExpense(expense) {}
  //total expense
  totalExpense() {
    let total = 400;
    return total;
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //New instance of UI class
  const ui = new UI();
  //budget form submit
  budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });
  //expense form submit
  expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });
  //expense click
  expenseList.addEventListener("click", function(event) {});
}

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});

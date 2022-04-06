"use strict";

var input = document.getElementById('input'), // botão de entrada/saída
  number = document.querySelectorAll('.numbers div'), // botões numéricos
  operator = document.querySelectorAll('.operators div'), // botão do operador
  result = document.getElementById('result'), // botão igual
  clear = document.getElementById('clear'), // botão limpar
  resultDisplayed = false; // sinalizador para ficar de olho em qual saída é exibida

// adicionando manipuladores de clique ao botão de números
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // armazenando a string de entrada atual e seu último caractere em variáveis ​​- usado posteriormente
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // se o resultado não for exibido, continue adicionando
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
    // se o resultado for exibido no momento e o usuário pressionou um operador
    // precisamos continuar adicionando a string para a próxima operação
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
    // se o resultado for exibido no momento e o usuário pressionou um número
    // precisamos limpar a string de entrada e adicionar a nova entrada para iniciar a nova operação
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adicionando manipuladores de cliques aos botões numéricos
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      
      console.log("enter a number first");
    } else {
      
      input.innerHTML += e.target.innerHTML;
    }

  });
}


result.addEventListener("click", function() {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0];

  resultDisplayed = true;
});

clear.addEventListener("click", function() {
  input.innerHTML = "";
})
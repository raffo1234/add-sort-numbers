var array = [];

var addNumber = function (number, array) {
  return array.push(number);
}

var cleanNumbersContainer = function () {
  document.getElementById('numbers').innerHTML = '';
}

var renderNumbers = function (array) {
  cleanNumbersContainer();
  for (x = 0; x < array.length; x++) {
    document.getElementById('numbers').innerHTML += '<li>' + array[x] + '</li>';
  }
}

var cleanInput = function () {
  document.getElementsByTagName('input')[0].value = '';
  document.getElementsByTagName('input')[0].focus();
}

var showForm = function () {
  cleanInput();
  var addNumberFormClasses = document.getElementById('flip-container').classList;
  addNumberFormClasses.add('active');
}

var hideForm = function () {
  var addNumberFormClasses = document.getElementById('flip-container').classList;
  addNumberFormClasses.remove('active');
}

var getInputValue = function () {
  return document.getElementsByTagName('input')[0].value;
}

var handleAddNumber = function () {
  if (!getInputValue()) return false;
  if (isNaN(getInputValue())) return false;
  if (isInArray(parseInt(getInputValue(), 10), array)) return false;
  addNumber(parseInt(getInputValue(), 10), array);
  renderNumbers(mergeSort(array));
  hideForm();
  return false;
}

var isNumberKey = function (evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

var hasClass = function (idElement, className) {
  return isInString(className, document.getElementById(idElement).classList.value);;
}

var isInArray = function (value, array) {
  return array.indexOf(value) > -1;
}

var isInString = function (value, str) {
  return str.search(value) > -1;
}

var onKeyDown = function () {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key === 'Enter' && !hasClass('flip-container', 'active')) {
      showForm();
    }
    if (evt.key == 'Escape') {
      hideForm();
    }
  }
}

function mergeSort (arr) {
  if (arr.length < 2)
      return arr;

  var middle = parseInt(arr.length / 2);
  var left   = arr.slice(0, middle);
  var right  = arr.slice(middle, arr.length);

  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
        result.push(left.shift());
    } else {
        result.push(right.shift());
    }
  }

  while (left.length)
      result.push(left.shift());

  while (right.length)
      result.push(right.shift());

  return result;
}

onKeyDown();

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var boardGenerator = function(array) {

  array = array || [];
  var solution = [];
  var emptyRow = [];

  for (var i = 0; i < array.length; i++) {
    emptyRow.push(0);
  }

  for (var j = 0; j < array.length; j++) {
    emptyRow[array[j]] = 1;
    solution.push(emptyRow.slice());
    emptyRow[array[j]] = 0;
  }

  return solution;

};

var findSolution = function(n, type, callback) {

  var solutions = [];

  if (n <= 1) {
    return callback(solutions);
  }

  var findOutcome = function(roundsLeft, activeSolution) {

    if (roundsLeft === 0) {
      return solutions.push(activeSolution);
    }

    for (var i = 0; i < n; i++) {

      var valid = true;

      if (activeSolution.length !== 0) {
        for (var j = 0; j < activeSolution.length; j++) {
          if (type === 'queen') {
            var slope = Math.abs((activeSolution.length - j)/(i - activeSolution[j]));
            if (slope === 1 || activeSolution[j] === i) {
              valid = false;
              break;
            }
          }
          else if (type === 'rook') {
            if (activeSolution[j] === i) {
              valid = false;
              break;
            }
          }
        }
      }

      if (valid) {
        findOutcome(roundsLeft -1, activeSolution.concat(i));
      }

    }
  }

  findOutcome(n, []);
  return callback(solutions);

};

window.findNRooksSolution = function(n) {

  var solution = [];
  var emptyRow = [];
  var count = 0;

  for (var i = 0; i < n; i++) {
    emptyRow.push(0);
  }

  for (var i = 0; i < n; i++) {
    var tempArr = emptyRow.slice();
    tempArr[count] = 1;
    solution.push(tempArr);
    count++;
  }

  return solution;

};

window.countNRooksSolutions = function(n) {

  return findSolution(n,'rook', function(solutions) {
    return (n<=1) ? 1 : solutions.length;
  });

};

window.findNQueensSolution = function(n) {

  return findSolution(n, 'queen', function(solutions) {
    if (n === 0) {
      return 1;
    }
    else if (n === 0) {
      return boardGenerator(solutions[0]);
    }
    else {
      return (n <= 1) ? 0 : boardGenerator(solutions[0]);
    }
  });

};


window.countNQueensSolutions = function(n) {

  return findSolution(n, 'queen', function(solutions) {
   return (n <= 1) ? 1 : solutions.length;
  });

};

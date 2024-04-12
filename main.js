const a = [
  [60, 42, 38, 24],
  [99, 83, 77, 65, 77, 55],
];

const l = [
  [6, 14, 28, 32],
  [48, 53, 68, 73, 88],
];

winflag = false;

function init() {
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < a[i].length; j++) {
      

      btn = document.getElementById("btn" + a[i][j]);
      btn.style.backgroundColor = "red";
    }
    
  }

  for (i = 0; i < l.length; i++) {
    for (j = 0; j < l[i].length; j++) {
      btn = document.getElementById("btn" + l[i][j]);
      btn.style.backgroundColor = "pink";
    }
  }
}

function takeChance() {
  p = parseInt(localStorage.getItem("player"));
  ply="";
  chance = Math.ceil(Math.random() * 6);

  if (chance == 0) {
    chance++;
  }

  

  if (p % 2 == 0 && !winflag) {
    ply = "2";
    x = parseInt(localStorage.getItem("player2_count"));
    y = parseInt(localStorage.getItem("player1_count"));

    if (x + chance > 100) {
      alert("Hard luck, Better luck next time!");
      if (chance == 6) {
        p--;
      }
      return;
    }

    if (x != 0) {
      if (x == y) {
        // we are checking if both players were at same place
        b1 = document.getElementById("btn" + x);
        b1.style.backgroundColor = "yellow";
      } else {
        b1 = document.getElementById("btn" + x);

        if (snakeTail(x)) {
          b1.style.backgroundColor = "red";
        } else if (ladderTop(x)) {
          b1.style.backgroundColor = "pink";
        } else {
          b1.style.backgroundColor = "";
        }
      }
    }
    x += chance;

    cur_pos = snakeBite(x);
    if (cur_pos == x) {
      cur_pos = climbLadder(x);
    }

    localStorage.setItem("player2_count", cur_pos);

    if (cur_pos == y) {
      b1 = document.getElementById("btn" + cur_pos);
      b1.style.backgroundColor = "blue";
    } else {
      b1 = document.getElementById("btn" + cur_pos);
      b1.style.backgroundColor = "green"; // green for player 2
    }

    if (chance == 6) {
      p--;
    }

    if (cur_pos == 100) {
      winflag = true;
      alert("Player 2 wins!");
      if (confirm("Do you want to play again?")) {
        window.location = "index.html";
      }
    }
  
    
  } else if (!winflag) {
    ply = "1";
    x = parseInt(localStorage.getItem("player1_count"));
    y = parseInt(localStorage.getItem("player2_count"));

    if (x + chance > 100) {
      alert("Hard luck, Better luck next time!");
      if (chance == 6) {
        p--;
      }
      return;
    }

    if (x != 0) {
      if (x == y) {
        // we are checking if both players were at same place
        b1 = document.getElementById("btn" + y);
        b1.style.backgroundColor = "green";
      } else {
        b1 = document.getElementById("btn" + x);

        if (snakeTail(x)) {
          b1.style.backgroundColor = "red";
        } else if (ladderTop(x)) {
          b1.style.backgroundColor = "pink";
        } else {
          b1.style.backgroundColor = "";
        }
      }
        
    }

    x += chance;

    cur_pos = snakeBite(x);
    if (cur_pos == x) {
      cur_pos = climbLadder(x);
    }

    localStorage.setItem("player1_count", cur_pos);

    b1 = document.getElementById("btn" + cur_pos);
    b1.style.backgroundColor = "yellow";

    if (cur_pos == y) {
      b1 = document.getElementById("btn" + cur_pos);
      b1.style.backgroundColor = "blue";
    } else {
      b1 = document.getElementById("btn" + cur_pos);
      b1.style.backgroundColor = "yellow"; // yellow for player 1
    }

    if (chance == 6) {
      p--;
    }

    if (cur_pos == 100) {
      winflag = true;
      alert("Player 1 wins!");
      if (confirm("Do you want to play again?")) {
        window.location = "index.html";
      }
    }
  } else {
    alert("Plz start a new game!");
    if (confirm("Do you want to play again?")) {
      window.location = "index.html";
    }
    return;
  }

  document.getElementById("d1").innerHTML = "Player-" + ply + ":" + chance;
  p++;
  localStorage.setItem("player", p);
  // alert(chance);
}

function snakeBite(pos) {
  for (i = 0; i < a.length; i++) {
    if (a[i][0] == pos) {
      alert("Snake bite!");
      return a[i][a[i].length - 1];
    }
  }

  return pos;
}
function climbLadder(pos) {
  for (i = 0; i < l.length; i++) {
    if (l[i][0] == pos) {
      alert("Ladder");
      return l[i][l[i].length - 1];
    }
  }

  return pos;
}
function snakeTail(pos) {
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < a[i].length; j++) {
      if (pos == a[i][j]) {
        return true;
      }
    }
  }

  return false;
}
function ladderTop(pos) {
  for (i = 0; i < l.length; i++) {
    for (j = 0; j < l[i].length; j++) {
      if (pos == l[i][j]) {
        return true;
      }
    }
  }

  return false;
}

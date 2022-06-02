class Field {
  board = null;
  masu_array = [];
  turn = false;
  constructor (size_x, size_y) {
    this.board = document.createElement("form");
    for (let i=0; i<size_y; i++) {
      this.masu_array.push([]);
      for (let j=0; j<size_x; j++) {
        let masu = new Masu(j, i, this);
        this.addMasu(masu);
        this.masu_array[i].push(masu);
      }
      this.board.appendChild(document.createElement("br"));
    }
    document.getElementById("main").appendChild(this.board);
  }

  addMasu (masu) {
    this.board.appendChild(masu.getMasuObj());
  }

  put (x, y) {
    let flag = false;
    if (this.masu_array[y][x].getColor() == "green") {
      let can_put = this.turnOver(x, y, this.turn, true);
      if (can_put) {
        this.setColor(x, y, this.turn);
        this.turn = !this.turn;
        if (!this.judgePutAll(this.turn)) {
          if (!this.judgePutAll(!this.turn)) {
            alert("終了。\n黒:" + this.countColor(false) + "個, 白" + this.countColor(true) + "個");
          } else {
            let cl = "白";
            if (this.turn) {
              cl = "黒";
            }
            alert("置ける場所がないため、" + cl + "は" + "パスします。");
            this.turn = !this.turn;
          }
        }
      }
      flag = can_put;
    }
    return flag;
  }

  judgePutAll (num_color) {
    for (let i=0; i<8; i++) {
      for (let j=0; j<8; j++) {
        if (this.judgePut(j, i, num_color)) {
          return true;
        }
      }
    }
    return false;
  }

  judgePut (x, y, num_color) {
    if (this.masu_array[y][x].getColor() == "green") {
      let can_put = this.turnOver(x, y, num_color, false);
      return can_put;
    }
    return false;
  }

  setColor (x, y, num_color) {
    this.masu_array[y][x].setColor(num_color);
  }

  turnOver (x, y, num_color, is_real) {
    let flag = false;
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if ( !(i == 0 && j == 0) ) {
          let tmp = this.turnOverOnDir(x, y, j, i, num_color, 0, is_real);
          if (tmp) {
            flag = tmp;
          }
        }
      }
    }
    return flag;
  }

  turnOverOnDir (x, y, dx, dy, num_color, count, is_real) {
    let tmp_turn = num_color;
    x += dx;
    y += dy;
    if (0 <= x && x < this.masu_array[0].length
       && 0 <= y && y < this.masu_array.length) {
      if (this.masu_array[y][x].getColor() == "green") {
        return false;
      } else if (this.masu_array[y][x].getNumColor() == tmp_turn) {
        if (0 < count) {
          return true;
        } else {
          return false;
        }
      } else if (this.masu_array[y][x].getNumColor() == !tmp_turn) {
        count++;
        let tmp_flag = this.turnOverOnDir(x, y, dx, dy, num_color, count, is_real);
        if (tmp_flag && is_real) {
          this.setColor(x, y, num_color);
        }
        return tmp_flag;
      }
    }
    return false;
  }

  countColor (num_color) {
    let sum = 0;
    for (let i=0; i<8; i++) {
      for (let j=0; j<8; j++) {
        if (this.masu_array[i][j].getColor() == "green") {
          continue;
        } else if (this.masu_array[i][j].getNumColor() == num_color) {
          sum++;
        }
      }
    }
    return sum;
  }
}

class Masu {
  x = -1;
  y = -1;
  koma = null;
  field = null;
  obj = null;
  num_color;
  constructor (x, y, field) {
    this.x = x;
    this.y = y;
    this.field = field;
    this.createKoma();
  }

  createKoma () {
    this.koma = new Koma("green");
  }

  getMasuObj () {
    this.obj = document.createElement("input");
    let obj = this.obj;
    obj.setAttribute("type", "button");
    obj.value = "●";
    obj.style.background = "green";
    obj.style.color = "green";
    obj.style.fontSize = "50px";
    obj.style.width = "1em";
    obj.style.height = "1em";
    obj.style.border = "1px solid black";
    let x = this.x;
    let y = this.y;
    let field = this.field;
    obj.addEventListener("click", function () {
      field.put(x, y);
    });
    return obj;
  }

  setColor (num_color) {
    let color = "black";
    if (num_color) {
      color = "white";
    }
    this.num_color = num_color;
    this.obj.style.color = color;
    this.koma.setColor(color);
  }

  getNumColor () {
    return this.num_color;
  }

  getColor () {
    return this.koma.getColor();
  }
}

class Koma {
  color = "";
  constructor (color) {
    this.color = color;
  }

  setColor (color) {
    this.color = color;
  }

  getColor () {
    return this.color;
  }
}

window.addEventListener("load", function () {
  let field = new Field(8, 8);
  field.setColor(3, 3,  true);
  field.setColor(4, 3, false);
  field.setColor(3, 4, false);
  field.setColor(4, 4,  true);
});

let name ="a"
let obj={a:1}

obj[name]  // 

function demo(...value){
  // 
}

class a{

  test = function () {
    var l = new Vec3()
    var n = '';
    return function (val) {
      l.x++;
      console.log(n)
      n = val;
      console.log(val, l, n)
    }
  }()

  test2 = (() => {
    var l = new Vec3()
    var n = '';
    return function (val) {
      l.x++;
      console.log(n)
      n = val;
      console.log(val, l, n)
    }
  })()
}
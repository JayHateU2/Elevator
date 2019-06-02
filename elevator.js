window.onload = function() {
  //ชั้นสูงสุด
  const maxF = 7;
  
  //ชั้นทั้งหมด
  const allFloor = [...Array(maxF).keys()]
    .map(x => x + 1);
  console.log(allFloor);

  //ชั้นปัจจุบัน
  let nowF = Math.floor(Math.random() * allFloor.length);
  document.getElementById("nowFloor").textContent = allFloor[nowF];
  console.log("CurrentF: " + allFloor[nowF]);

  const ele = {
    0: (ele1 = document.getElementById("ele1")),
    1: (ele2 = document.getElementById("ele2")),
    2: (ele3 = document.getElementById("ele2")),
    3: (ele4 = document.getElementById("ele4"))

  };
  let eleF = {};

  eleF = {
    0: (eleF1 = document.getElementById("eleF1")),
    1: (eleF2 = document.getElementById("eleF2")),
    2: (eleF3 = document.getElementById("eleF3")),
    3: (eleF4 = document.getElementById("eleF4"))
  };

  let eleFV = [];

  let btnAct = true;

  //ตัวละคร
  const people = {
    "รปภ ": "...",
    "พนง": ":)",
    "เลขา": "สวัสดี",
    "ผู้อำนวยการ": "...",
    ลูกค้า: "...",
    ฝ่ายเทคนิค: "ขอเข้าไปหน่อยนะครับ",
  };

  //สุ่มชั้น
  eleFV = [...Object.keys(eleF)].map(
    x => (x = Math.floor(Math.random() * allFloor.length))
  );
  console.log(eleFV);
  eleFV.map((x, y) => (eleF[y].textContent = allFloor[x]));

  //เรียก
  function eleClick(id) {
    document.getElementById(id).classList.add("on");
    if (btnAct) {
      let floorDis1 = Math.abs(nowF - eleFV[0]);
      let floorDis2 = Math.abs(nowF - eleFV[1]);
      let floorDis3 = Math.abs(nowF - eleFV[2]);
      let floorDis4 = Math.abs(nowF - eleFV[3]);
      let actEle = start(Math.min(floorDis1,floorDis2,floorDis3,floorDis4)) ;
      btnAct = false;
    }
  }

  //Start
  function start(id) {
    Object.values(ele).map(x => x.classList.remove("act"));
    ele[id].classList.add("act");
    let targetF = eleFV[id];
    const gotoNowF = setInterval(function() {
      if (targetF > nowF) {
        targetF--;
        eleF[id].textContent = allFloor[targetF];
        console.log(targetF);
      } else if (targetF < nowF) {
        targetF++;
        eleF[id].textContent = allFloor[targetF];
        console.log(targetF);
      } else {
        clearInterval(gotoNowF);
        ele[id].classList.remove("act");
        eleOpen(id);
      }
    }, 500);
  }

  //Open
  function eleOpen(id) {
    let who = Math.floor(Math.random() * Object.keys(people).length);
    let allP = [...Object.keys(people)];
    document.getElementById("person" + (id + 1)).textContent = allP[who];
    document.getElementById("person" + (id + 1) + "Say").textContent =
      people[allP[who]];
    console.log(who);
    if (who === 1 || who === 2) {
      document.getElementById("person" + (id + 1)).classList.add("girl");
    }
    document.getElementById("door" + (id + 1)).classList.add("act");
    document
      .getElementById("door" + (id + 1))
      .addEventListener("click", function() {
        restart();
      });
    document.getElementById("conUp").classList.remove("on");
    document.getElementById("conDown").classList.remove("on");
  }

  //Reset
  function restart() {
    document.getElementById("door1").classList.remove("act");
    document.getElementById("door2").classList.remove("act");
    document.getElementById("door3").classList.remove("act");
    document.getElementById("door4").classList.remove("act");
    document.getElementById("person1").classList.remove("girl");
    document.getElementById("person2").classList.remove("girl");
    document.getElementById("person3").classList.remove("girl");
    document.getElementById("person4").classList.remove("girl");

    nowF = Math.floor(Math.random() * allFloor.length);
    document.getElementById("nowFloor").textContent = allFloor[nowF];
    console.log("CurrentF: " + allFloor[nowF]);
    eleFV = [...Object.keys(eleF)].map(
      x => (x = Math.floor(Math.random() * allFloor.length))
    );
    console.log(eleFV);
    eleFV.map((x, y) => (eleF[y].textContent = allFloor[x]));
    btnAct = true;
    document.getElementById("conUp").classList.remove("on");
    document.getElementById("conDown").classList.remove("on");
  }

  //ปุ่มกด
  document.getElementById("conUp").addEventListener("click", function() {
    eleClick(this.id);
  });

  document.getElementById("conDown").addEventListener("click", function() {
    eleClick(this.id);
  });
};
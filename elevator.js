window.onload = function() {
  //最高樓層
  const maxF = 7;
  //地下樓層
  const maxB = 3;
  //所有樓層
  const allFloor = [...Array(maxB).keys()]
    .reverse()
    .map(x => "B" + (x + 1))
    .concat([...Array(maxF).keys()].map(x => x + 1));
  console.log(allFloor);
  //當前所在樓層
  let nowF = Math.floor(Math.random() * allFloor.length);
  document.getElementById("nowFloor").textContent = allFloor[nowF];
  console.log("當前所在樓層: " + allFloor[nowF]);

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

  //人物
  const people = {
    "1樓的警衛": "...",
    "6樓的老闆娘": ":)",
    "6樓的正妹": "呵呵",
    "7樓的同事": "早安阿",
    動物園園長: "早!",
    "10樓的宅宅": "安安",
    巔峰戰士: "快快!10點0分30秒了",
    小房間守備員: "來來來~ 坐坐坐",
    資深假裝上班CTO: "你騎車嗎?穿這樣會冷嗎?住哪裡?騎過來多久?",
    外送員: "便當來了",
    "1樓的警衛": "早!!!(對後面的6樓正妹)",
    大學長: "公司考量"
  };

  //電梯隨機樓層
  eleFV = [...Object.keys(eleF)].map(
    x => (x = Math.floor(Math.random() * allFloor.length))
  );
  console.log(eleFV);
  eleFV.map((x, y) => (eleF[y].textContent = allFloor[x]));

  //判斷呼叫電梯
  function eleClick(id) {
    document.getElementById(id).classList.add("on");
    if (btnAct) {
      let floorDis1 = Math.abs(nowF - eleFV[0]);
      let floorDis2 = Math.abs(nowF - eleFV[1]);
      let floorDis3 = Math.abs(nowF - eleFV[2]);
      let floorDis4 = Math.abs(nowF - eleFV[3]);
      if (true) {let actEle = floorDis1 > floorDis2 ? start(1) : start(0);} 

      btnAct = false;
    }
  }

  //電梯移動
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
    }, 1000);
  }

  //電梯開門
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

  //重新開始
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
    console.log("當前所在樓層: " + allFloor[nowF]);
    eleFV = [...Object.keys(eleF)].map(
      x => (x = Math.floor(Math.random() * allFloor.length))
    );
    console.log(eleFV);
    eleFV.map((x, y) => (eleF[y].textContent = allFloor[x]));
    btnAct = true;
    document.getElementById("conUp").classList.remove("on");
    document.getElementById("conDown").classList.remove("on");
  }

  //電梯按鈕
  document.getElementById("conUp").addEventListener("click", function() {
    eleClick(this.id);
  });

  document.getElementById("conDown").addEventListener("click", function() {
    eleClick(this.id);
  });
};
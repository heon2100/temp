let userID = document.getElementById("userID").innerHTML;

let eqName = document.getElementById("eqName");
let eqWeight = document.getElementById("eqWeight");
let eqWidth = document.getElementById("eqWidth");
let impact1 = document.getElementById("impact1");
let impact2 = document.getElementById("impact2");
let resultArea = document.getElementsByClassName("box2");
let resultValue = document.getElementsByClassName("outPut");
let cal =document.getElementsByClassName("calculate");

var modalContent = document.querySelector(".modal-content");
var modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];




const excavator =[
  {eqName: 'excavator(B/H08)'  , eqWeight: 240, axDis: 3650, eqWidth: 2990, eqLength: 3260, eqContact: 600},
  {eqName: 'HX65A(B/H02)' , eqWeight: 65, axDis: 2100, eqWidth: 1925, eqLength: 2910, eqContact: 315},
  {eqName: 'HX85A(B/H03)', eqWeight: 85, axDis: 2280, eqWidth: 2300, eqLength: 2560, eqContact: 450},
  {eqName: 'HX150A(B/H06)', eqWeight: 150, axDis: 3000, eqWidth: 2490, eqLength: 3110, eqContact: 500},
  {eqName: 'HX235ACR(B/H08)', eqWeight: 250, axDis: 3640, eqWidth: 2990, eqLength: 3130, eqContact: 600},
  {eqName: 'HX220A(B/H10)', eqWeight: 220, axDis: 3640, eqWidth: 2990, eqLength: 3200, eqContact: 600},
  {eqName: 'HX350A(B/H10)', eqWeight: 350, axDis: 4030, eqWidth: 3200, eqLength: 3680, eqContact: 600}
];


// select 요소 참조 자동입력 기능
function handleChange() {
  // value 값 가져오기
  const a = document.getElementById('eQ').value;

  // Input 값 자동입력
  document.getElementById('eqName').value = excavator[a].eqName;
  document.getElementById('eqWeight').value = excavator[a].eqWeight;
  document.getElementById('axDis').value = excavator[a].axDis;
  document.getElementById('eqWidth').value = excavator[a].eqWidth;
  document.getElementById('eqLength').value = excavator[a].eqLength;
  document.getElementById('eqContact').value = excavator[a].eqContact;

  // 장비선택 상태를 콘솔에 표시
  if (a==0) {
    console.log(`선택된 장비는 직접 입력하셔야 합니다`);
  } else {
    console.log(`선택된 장비는 ${excavator[a].eqName} 입니다.`);
  }
}





// input value check ------------------
function inputCheck(){
 
  if (eqName.value=='' || eqWeight.value=='' || eqWidth.value=='' || (impact1.checked==false && impact2.checked==false)){
    modal.style.display = "block";
    modalText.innerHTML = `All fields are required!`;

  }else{
    calCulate();

  }

}
//--------------------------------------------------------------

// When the user clicks on <span> (x), close the modal-----------
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//--------------------------------------------------------------



// This is MAIN calculating function  ----------------------
function calCulate(){
  let input =  [eqName.value, eqWeight.value, axDis.value, eqWidth.value, eqLength.value, eqContact.value, db_Height.value, db_Density.value, db_Porosity.value, thk1.value, thk2.value, thk3.value, thk4.value, mortar.value];
  let result_input = ['out_eqName','out_eqWeight', 'out_axDis', 'out_eqWidth', 'out_eqLength', 'out_eqContact', 'impact', 'out_db_Height','out_db_Density','out_db_Porosity','out_thk1','out_thk2','out_thk3','out_thk4','out_mortar'];
 
  if(impact1.checked){
    input.splice(6,0, 1.3);  //충격계수 1.3
  }else if(impact2.checked){
    input.splice(6,0, 1.4);  //충격계수 1.4 
  }



  // 여기가 테이블에 입력값 넣는 거임.
  for (let i=0; i<input.length; i++) {
    document.getElementById(result_input[i]).textContent = input[i];
  }

  // 식 값 넣기.. 같은 숫자는 계속 넣는 방법 없나.. 
  document.getElementById('eqWeight_1').textContent = input[1];
  document.getElementById('impact_1').textContent = input[6];
  document.getElementById('axDis_1').textContent = input[2];
  document.getElementById('eqWidth_1').textContent = input[3];
  wEW = ((input[1]*input[6])/(input[2]*input[3])*1000000).toFixed(1);
  document.getElementById('wEW').textContent = wEW;

  document.getElementById('eqWeight_2').textContent = input[1];
  document.getElementById('impact_2').textContent = input[6];
  document.getElementById('eqContact_2').textContent = input[5];
  document.getElementById('axDis_2').textContent = input[2];
  wEI = ((input[1]*input[6])/(2*input[2]*input[5])*1000000).toFixed(1);
  document.getElementById('wEI').textContent = wEI;

  document.getElementById('eqContact_3').textContent = input[5];
  document.getElementById('axDis_3').textContent = input[2];
  document.getElementById('eqWidth_3').textContent = input[3];
  document.getElementById('axDis_4').textContent = input[2];
  conTact = ((2*input[5]*input[2])/(input[3]*input[2])).toFixed(2);
  document.getElementById('eq_C_3').textContent = conTact;

  document.getElementById('dis1').textContent = input[3];
  document.getElementById('dis2').textContent = input[2];
  document.getElementById('dis3').textContent = input[5];
  document.getElementById('dis4').textContent = input[5];



  // 계산한 값들 넣기

  let wS = (input[7]*input[8]*input[9]).toFixed(2);
  document.getElementById('wS').textContent = wS;

  let wD1 = (input[10+0]*24/1000).toFixed(2);
  document.getElementById(`wD${0+1}`).textContent = wD1;
  let wD2 = (input[10+1]*24/1000).toFixed(2);
  document.getElementById(`wD${1+1}`).textContent = wD2;
  let wD3 = (input[10+2]*24/1000).toFixed(2);
  document.getElementById(`wD${2+1}`).textContent = wD3;
  let wD4 = (input[10+3]*24/1000).toFixed(2);
  document.getElementById(`wD${3+1}`).textContent = wD4;

  // for (let i=0; i<4; i++) {
  // document.getElementById(`wD${i+1}`).textContent = (input[10+i]*24/1000).toFixed(2);;
  // }

  let wF = (input[10+4]*20/1000).toFixed(1);
  document.getElementById(`wF`).textContent = wF;


  // data 모으기
  let laBel = ['Equipment_Name','Weight', 'Axis_Distance', 'Width', 'Length', 'Contact', 'Impact', 'Debris_Height','Debris_Density','Debris_Porosity','Slab_Thk1','Slab_Thk2','Slab_Thk3','Slab_Thk4','Mortar_Thk', 
                'wEW', 'wEI', 'conTact', 'wS', 'wD1', 'wD2', 'wD3', 'wD4', 'wF', 'userID'];
  let dataValue = input.concat(wEW, wEI, conTact, wS, wD1, wD2, wD3, wD4, wF, userID);

  collectdata(laBel, dataValue);


  // 결과값 보이기
  for (let i = 0; i < resultArea.length; i++) {
    const div = resultArea[i];
    div.style.opacity="1";
  }


}





// 드랍다운 목록선택 효과 ----------------------------------------------------------------
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
    // 여기에 추가로 내가 이벤트 발생하게 만들었음 -----------------------------------------------------//
    c.addEventListener("click", handleChange);
    c.addEventListener("click", inputWindow);
    //----------------------------------------------------------------------------------------------//

  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");

    });


}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }

}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


//-------------------------------------------------------------------------


//-------- Equipment Info ---------------------------------------






function inputWindow() {
  const a = document.getElementById('eQ').value;
  const b = document.querySelector('div.container-hide');
    if (a == 0) {
      b.classList.add('expand');
    } else {
      b.classList.remove('expand');
    }
}




//===================테이블 이미지 저장하기 ============================
function downloadImage() {
  // Get the target div
  var divToCapture = document.getElementById('table1');

  // Use html2canvas to capture the div as an image
  html2canvas(divToCapture).then(function (canvas) {
    // Convert the canvas to a data URL
    var imageData = canvas.toDataURL('png');

    // Create a link element and trigger a download
    var link = document.createElement('a');
    link.href = imageData;
    link.download = '설계하중표(장비탑재 공법).png';
    link.click();
  });
}





// 엑셀로 저장하는 파일 ================================================


const scriptURL = 'https://script.google.com/macros/s/AKfycbx_SrCzUn5i7-JwvdOFJBE20_B2leQu4_UXK0uppSSPLHRIFax6l72jBrXANBYf8Cd0/exec'

// Collect the form data

function collectdata(laBel, dataValue) {
  let keyValuePairs = [];
  for (let i=0; i<laBel.length; i++) {
    keyValuePairs.push(laBel[i] + "=" + dataValue[i]);
  }

  let DataString = keyValuePairs.join("&");

  fetch(scriptURL, { method: 'POST', body: DataString})
  .then(response => {modal.style.display = "block";
                      modalText.innerHTML = `DATA have been Collected!`;})
  //.then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
}

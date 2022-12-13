window.onload = function() {
  //alert('Страница загружена');

  /**$.ajax({
    url: 'http://localhost:3000/script.php',
    method: 'POST',
    data: $(this).serialize(),
    dataType: "json",
    beforeSend: function() {
      $('.button').attr('disabled', 'disabled');
    },
    success: function(data) {
      $('.button').attr('disabled', false);
      //if (data.validate) {
        alert(data);
        data.array.forEach(({ x, y, r, validate, nowTime, executeTime, inArea}) => {
          
          //let y = data.y.replace(",", ".");
          const table = document.getElementById("status-table");
          const newRow = document.createElement("tr");
          const x2 = document.createElement("td");
          x2.innerText = x;
          const y2 = document.createElement("td");
          y2.innerText = y;
          const r2 = document.createElement("td");
          r2.innerText = r;
          const executeTime2 = document.createElement("td");
          executeTime2.innerText = executeTime;
          const nowTime2 = document.createElement("td");
          nowTime2.innerText = nowTime;
          const inArea2 = document.createElement("td");
          inArea2.innerText = inArea;
          newRow.appendChild(x2);
          newRow.appendChild(y2);
          newRow.appendChild(r);
          newRow.appendChild(executeTime);
          newRow.appendChild(nowTime);
          newRow.appendChild(inArea);
          table.appendChild(newRow);
        });
        
    
        /*currentCase = '<tr>';
        currentCase += '<td>' + data.x + '</td>';
        currentCase += '<td>' + y + '</td>';
        currentCase += '<td>' + data.r + '</td>';
        currentCase += '<td>' + data.executeTime + '</td>';
        currentCase += '<td>' + data.nowTime + '</td>';
        currentCase += '<td>' + data.inArea + '</td>';
        $('#status-table').append(currentCase);
      //}
    }
  });*/
  
};
$(function(){

function checkR(){
    if ($(".r-button").is(":checked")){
        return true;
    }
    return false;
}

function checkX(){
    if ($(".x-button").is(":checked")){
        return true;
      }
    return false;
}

function checkY(){
    let input = $("#text-y");
    let y = input.val();
    y = y.replace(",", ".");
    if (isNumber(y) && y <= 3 && y >= -3){
        return true;
    }
    return false;
}

function validate(){
    return checkR() && checkX() && checkY();
}

function isNumber(a){
    return isFinite(a) && !isNaN(parseFloat(a));
}

$('#dataform').on('submit', function(event) {
    event.preventDefault();
    if (!validate()){
      alt = "Проверьте правильность следующих переменных: ";
      if (!checkX()){
        alt += "x, ";
      }
      if (!checkY()){
        alt += "y, ";
      }
      if (!checkR()){
        alt += "R, ";
      }
      alert(alt.substring(0, alt.length - 2));
         return;
    }
    $.ajax({
      url: 'http://localhost:3000/script.php',
      method: 'POST',
      data: $(this).serialize(),
      dataType: "json",
      beforeSend: function() {
        $('.button').attr('disabled', 'disabled');
      },
      success: function(data) {
        $('.button').attr('disabled', false);
        /*data.forEach(({ x, y, r, validate, nowTime, executeTime, inArea }) => {
          alert(x + y + r + validate + nowTime + executeTime + inArea + data.length);
        });*/
        if (data.validate){
          let y = data.y.replace(",", ".");
          const table = document.getElementById("status-table");
          const newRow = document.createElement("tr");
          const x = document.createElement("td");
          x.innerText = data.x;
          const y2 = document.createElement("td");
          y2.innerText = data.y;
          const r = document.createElement("td");
          r.innerText = data.r;
          const executeTime = document.createElement("td");
          executeTime.innerText = data.executeTime;
          const nowTime = document.createElement("td");
          nowTime.innerText = data.nowTime;
          const inArea = document.createElement("td");
          inArea.innerText = data.inArea;
          newRow.appendChild(x);
          newRow.appendChild(y2);
          newRow.appendChild(r);
          newRow.appendChild(executeTime);
          newRow.appendChild(nowTime);
          newRow.appendChild(inArea);
          table.appendChild(newRow);
        }
      }
    });
  });
});

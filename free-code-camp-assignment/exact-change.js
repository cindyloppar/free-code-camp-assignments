function checkCashRegister(price, cash, cid) {
 var worth = [0.01, 0.05, 0.10, 0.25, 1.00, 5.00, 10.00, 20.00, 100.00];
  var changeArr = [];
  var change = cash - price;
  var cashDrawer = 0;
  var changeAvail = 0;

  for(i = 0; i < cid.length; i++) {
    cashDrawer += cid[i][1];
  }
  cashDrawer = cashDrawer.toFixed(2);
  if(cashDrawer < cash - price) { 
    return "Insufficient Funds";
  } else if(cashDrawer == cash - price) { 
    return "Closed";
  } else {
    for(i = 8; i > -1; i--) {

var cidCopy = [];
      for (var k = 0; k < cid.length; k++) {
        cidCopy[k] = cid[i].slice();
      }
      var x = worth[i];
      var y = cidCopy[i];
      var z = cidCopy[i][0];

if(change >= x && cidCopy[i][1] > 0) {
        change -= x;
        change = Number(change.toFixed(2)); 
        cid[i][1] -= x;
        if(!changeArr.length) {
          changeArr.unshift(y);
          changeArr[0][1] = x;
        } else if(changeArr[0][0] == z) {
          changeArr[0][1] += x;
        } else {
          changeArr.unshift(y);
          changeArr[0][1] = x;
        }
        i++;
      }
    }

  }  
 
  for(j = 0; j < changeArr.length; j++) {
    changeAvail += changeArr[j][1];
  }
  if(changeAvail < cash - price) {
    return "Insufficient Funds";
  } else {
    return changeArr.reverse();
  }

}

console.log(checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
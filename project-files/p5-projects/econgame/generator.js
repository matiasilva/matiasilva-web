var rows = 8;

var QVC = [];
var TP = [];
var MP = [];
var TVC = [];
var TFC = [];
var TC = [];
var AVC = [];
var AFC = [];
var ATC = [];
var MC = [];
var TR = [];
var MR = [];
var Profit = [];
let values = [];
let num1;

function setup(){
    let table = select('#tb');
    for (let i = 0; i < rows; i++) {
        let row = createElement('tr');
        row.id('row' + i)
        for (let j = 0; j < 13; j++) {
            let cell = createElement('td');
            let field = createInput('', 'number');
            field.id('col' + j + 'row' + i);
            field.parent(cell);
            cell.parent(row);
            if (j == 0 || j == 2) {
                field.attribute('readonly', true);
            }
        }
        row.parent(table);
    }
    num1 = random(3, 6);

    populateRows();
    populateFields();

    let button = select('#checkanswer');
    button.mousePressed(checkAllAnswers);
    noLoop();
}

function populateFields(){
    for(let i = 0; i < rows; i++){
        select('#col' + 0 + 'row' + i).value(QVC[i]);
        select('#col' + 2 + 'row' + i).value(MP[i]);
    }
    let first = select('#col4row0');
    first.value(TFC[0]);
    first.attribute('readonly', true);
    let second = select('#col6row0');
    second.value(AVC[0]);
    second.attribute('readonly', true);
    let third = select('#col11row0');
    third.value(MR[0]);
    third.attribute('readonly', true);

    // for(let i = 0; i < rows; i++){
    //     for(let j = 0; j < 13; j++){
    //         let cell = select("#col" + j + "row" + i);
    //         cell.value(values[j][i]);
    //     }
    // }
}

function populateRows() {
    let wageperoutput = floor(random(10, 15)) + floor(random(0, 5)) * 0.25;
    let totalfixedcost = floor(random(50, 150));
    //   let price = floor(random(10, 20));
    let price = wageperoutput*2 + floor(random(2, 7));

    console.log("price " + price);
    console.log("TFC " + totalfixedcost);
    console.log("wage " + wageperoutput);

    for (let i = 0; i < rows; i++) {

        // populate QVC
        QVC.push(i + 1);
        // populate MP
        let product = GetMP((rows * 0.3) * i + rows * 0.3);
        product = product == 0 ? 1: product;
        MP.push(product);
        // populate TP
        product = MP[0];
        for (let j = 1; j <= i; j++) {
            product += MP[j];
        }
        TP.push(product);
        // populate TVC
        let wage = wageperoutput * MP[0];
        let cost = wage * QVC[i];
        TVC.push(cost);
        // populate TFC
        TFC.push(totalfixedcost);
        // populate TC
        TC.push(TVC[i] + TFC[i]);
        // populate AVC
        AVC.push((TVC[i] / TP[i]));
        // populate AFC
        AFC.push((totalfixedcost / TP[i]));
        // populate ATC
        ATC.push((AVC[i] + AFC[i]).toFixed(2));
        // populate MC
        if (i == 0) {
            MC.push(TC[0]);
        } else {
            deltacost = TC[i] - TC[i - 1];
            deltaproduct = TP[i] - TP[i - 1];
            cost = (deltacost / deltaproduct).toFixed(2);
            cost = cost == Infinity ? "" : cost;
            MC.push(cost);
        }
        // populate TR
        TR.push(TP[i] * price);
        // populate MR
        MR.push(price);
        // populate Profit
        Profit.push(TR[i] - TC[i]);
        AVC[i] = AVC[i].toFixed(2);
        AFC[i] = AFC[i].toFixed(2);
    }
    values.push(QVC);
    values.push(TP);
    values.push(MP);
    values.push(TVC);
    values.push(TFC);
    values.push(TC);
    values.push(AVC);
    values.push(AFC);
    values.push(ATC);
    values.push(MC);
    values.push(TR);
    values.push(MR);
    values.push(Profit);
}


function GetMP(x) {
    return floor(num1 * Math.log(x) - x + num1);
}

function checkAllAnswers(){
 for(let i = 0; i < rows; i++){
     for(let j = 0; j < 13; j++){
        let cell = select("#col" + j + "row" + i);
        let ans = values[j][i];
        if(cell.value() == ans){
            setAnswer('correct', cell.id());
        }
        else {
            setAnswer('incorrect', cell.id());
        }
     }
 }
}

function setAnswer(status, id) {
    let cell = select('#' + id);
    if (status == 'correct') {
        cell.style('background-color', 'green');
    } else {
        cell.style('background-color', 'red');
    }
}


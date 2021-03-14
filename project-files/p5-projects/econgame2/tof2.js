let rows = 8;
let num1;
let num2;
let totalproduct = [];
let totalvariablecost = [];
let wagerate;
let averagevariablecost1;
let totalfixedcost;
let averagevariablecost = [];
let averagefixedcost = [];
let totalcost = [];
let totalrevenue = [];
let marginalproduct1;
let price;

function setup() {
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

    let button = select('#checkanswer');
    button.mousePressed(checkAllAnswers);
    averagefixedcost = floor(random(2, 15)) + floor(random(0, 5))*0.25;
    populateMP();
    wagerate = averagefixedcost*marginalproduct1;
    //  num2 = random(3,6);
    populateQVC();
    populateAVC();
    populateTFC();
    populateMR();
    noLoop();
}

function populateAVC() {
    let field = select('#col6row0');
    field.value((wagerate/marginalproduct1).toFixed(2));
    field.attribute('readonly', true);
}

function populateTFC() {
    let field = select('#col4row0');
    totalfixedcost = floor(random(50, 250));
    field.value(totalfixedcost);
    field.attribute('readonly', true);
}

function populateQVC() {
    for (let i = 0; i < rows; i++) {
        let field = select('#col0' + 'row' + i);
        field.value(i + 1);
    }
}

function populateMR() {
    let field = select('#col11row0');
    price = floor(random(5, 10));
    field.value(price);
    field.attribute('readonly', true);
}

function populateMP() {
    for (let i = 0; i < rows; i++) {
        let field = select('#col2' + 'row' + i);
        let product =  MP(floor(rows*0.25) * i + 1);

        if(i == 0){
            marginalproduct1 = product
        }
        field.value(product);
    }
}

function MP(x) {
    return floor(num1 * Math.log(x) - x + num1);
}

function checkAllAnswers() {
    checkTP();
    checkTVC();
    checkTFC();
    checkTC();
    checkAVC();
    checkAFC();
    checkATC();
    checkMC();
    checkTR();
    checkMR();
    checkProfit();
}

function showAllAnswers(){
    
}

function checkTP() {
    let total = 0;
    for (let i = 0; i < rows; i++) {
        let cell = select('#col2row' + i).value();
        if (cell != '') {
            total += parseInt(cell);
            totalproduct.push(total);
            let current = select('#col1row' + i);
            if (total == current.value()) {
                setAnswer('correct', current.id());
            } else{
                setAnswer('wrong', current.id());
            }
        }
    }
}

function checkTVC() {
    for (let i = 0; i < rows; i++) {
        let current = select('#col3row' + i);
        totalvariablecost.push(wagerate * (i + 1));
        if (wagerate * (i + 1) == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkTFC() {
    for (let i = 0; i < rows; i++) {
        let current = select('#col4row' + i);
        if (totalfixedcost == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkTC() {
    for (let i = 0; i < rows; i++) {
        let current = select('#col5row' + i);
        let totalc = (totalvariablecost[i] + totalfixedcost);
        totalcost.push(totalc);
        if (totalc == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkAVC() {
    for (let i = 0; i < rows; i++) {
        let current = select('#col6row' + i);
        let cost = (wagerate * (i + 1)) / totalproduct[i];
        let rounded = cost.toFixed(2);
        averagevariablecost.push(rounded);
        if (rounded == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkAFC(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col7row' + i);
        let cost = (totalfixedcost/totalproduct[i]);
        let rounded = cost.toFixed(2);
        averagefixedcost.push(rounded);
        if (rounded == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkATC(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col8row' + i);
        let cost = parseFloat(averagefixedcost[i]) + parseFloat(averagevariablecost[i]);
        let rounded = cost.toFixed(2);
        if (rounded == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkMC(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col9row' + i);
        let marginalcost;
        if(i == 0){
            marginalcost = parseInt(select('#col5row0').value())/totalproduct[i];
        }
        else{
            let previous = parseInt(select('#col9row' + (i-1)).value());
            let deltaproduct = parseInt(select('#col1row' + i).value()) - parseInt(select('#col1row' + (i-1)).value())
            marginalcost = (parseInt(current.value()) - previous) / deltaproduct;
        }

        let final = marginalcost.toFixed(2);
        if (final == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkTR(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col10row' + i);
        let revenue = totalproduct[i] * price;
        totalrevenue.push(revenue);
        if (revenue == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkMR(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col11row' + i);
        if (price == current.value()) {
            setAnswer('correct', current.id());
        } else{
            setAnswer('wrong', current.id());
        }
    }
}

function checkProfit(){
    for (let i = 0; i < rows; i++) {
        let current = select('#col12row' + i);
        let profit = totalrevenue[i] - totalcost[i];
        if (profit == current.value()) {
            setAnswer('correct', current.id());
        }
        else{
            setAnswer('wrong', current.id());
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

function draw() {

}
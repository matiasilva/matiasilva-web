var rows;

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
let num1;

function setup() {
    let download = select('#download');
    download.mousePressed(makePDF);
    noLoop();
}

function populateRows() {

    rows = parseInt(select('#numrows').value()) || 10;

    let wage = floor(random(10, 15)) + floor(random(0, 5)) * 0.25;
    let totalfixedcost = floor(random(50, 250));
    //   let price = floor(random(10, 20));
    let price = wage + floor(random(2, 7));

    console.log("price " + price);
    console.log("TFC " + totalfixedcost);
    console.log("wage " + wage);

    for (let i = 0; i < rows; i++) {

        // populate QVC
        QVC.push(i + 1);
        // populate MP
        let product = GetMP((rows * 0.3) * i + rows * 0.3);
        MP.push(product);
        // populate TP
        product = MP[0];
        for (let j = 0; j < i; j++) {
            product += MP[j];
        }
        TP.push(product);
        // populate TVC
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
        ATC.push((AVC[i] + AFC[i]));
        // populate MC
        if (i == 0) {
            MC.push(TC[0]);
        } else {
            deltacost = TC[i] - TC[i - 1];
            deltaproduct = TP[i] - TP[i - 1];
            cost = (deltacost / deltaproduct).toFixed(2);
            cost = cost == Infinity ? "-" : cost;
            MC.push(cost);
        }
        // populate TR
        TR.push(TP[i] * price);
        // populate MR
        MR.push(price);
        // populate Profit
        Profit.push(TR[i] - TC[i]);
    }
}

function draw() {

}

function GetMP(x) {
    return floor(num1 * Math.log(x) - x + num1);
}

function makePDF() {

    num1 = random(4, 8);
    populateRows();

    var columns = [{
            title: "QVC",
            dataKey: "QVC"
        },
        {
            title: "TP",
            dataKey: "TP"
        },
        {
            title: "MP",
            dataKey: "MP"
        },
        {
            title: "TVC",
            dataKey: "TVC"
        },
        {
            title: "TFC",
            dataKey: "TFC"
        },
        {
            title: "TC",
            dataKey: "TC"
        },
        {
            title: "AVC",
            dataKey: "AVC"
        },
        {
            title: "AFC",
            dataKey: "AFC"
        },
        {
            title: "ATC",
            dataKey: "ATC"
        },
        {
            title: "MC",
            dataKey: "MC"
        },
        {
            title: "TR",
            dataKey: "TR"
        },
        {
            title: "MR",
            dataKey: "MR"
        },
        {
            title: "Profit",
            dataKey: "Profit"
        }
    ];

    var verses = [];

    for (let i = 0; i < rows; i++) {
        verses.push({
            "QVC": QVC[i],
            "TP": TP[i],
            "MP": MP[i],
            "TVC": TVC[i],
            "TFC": TFC[i],
            "TC": TC[i],
            "AVC": AVC[i].toFixed(2),
            "AFC": AFC[i].toFixed(2),
            "ATC": ATC[i].toFixed(2),
            "MC": MC[i],
            "TR": TR[i],
            "MR": MR[i],
            "Profit": Profit[i].toFixed(2)
        })
    }


    //console.log(verses);

    // Only pt supported (not mm or in)
    var doc = new jsPDF('l', 'pt');
    doc.autoTable(columns, verses, {
        theme: "striped",
        styles: {
            halign: 'center',
            valign: 'middle'
        },
        columnStyles: {
            id: {
                fillColor: 255
            }
        },
        margin: {
            top: 120
        },
        addPageContent: function (data) {
            doc.setFontSize(30);
            doc.text("Theory of the Firm: Costs, Revenues, Products", 40, 70);
            doc.setFontSize(15);
            let subject = select('#subject').value() || "Economics";
            let author = select('#author').value() || "John Doe";
            doc.text("Made for " + subject + " by " + author, 40, 95);
        }
    });
    doc.save('table.pdf');
}
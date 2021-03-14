var columns = [
    {title: "QVC", dataKey: "QVC"},
    {title: "TP", dataKey: "TP"}, 
    {title: "MP", dataKey: "MP"},
    {title: "TVC", dataKey: "TVC"},
    {title: "TFC", dataKey: "TFC"}, 
    {title: "TC", dataKey: "TC"},
    {title: "AVC", dataKey: "AVC"}, 
    {title: "AFC", dataKey: "AFC"},
    {title: "ATC", dataKey: "ATC"}, 
    {title: "MC", dataKey: "MC"}, 
    {title: "TR", dataKey: "TR"}, 
    {title: "MR", dataKey: "MR"}, 
    {title: "Profit", dataKey: "Profit"}
];



var verses = [];

console.log(QVC);

for(let i = 0; i < rows; i++){
    verses.push({
        "QVC": QVC[i].toFixed(2),
        "TP": TP[i].toFixed(2),
        "MP": MP[i].toFixed(2),
        "TVC": TVC[i].toFixed(2),
        "TFC": TFC[i].toFixed(2),
        "TC": TC[i].toFixed(2),
        "AVC": AVC[i].toFixed(2),
        "AFC": AFC[i].toFixed(2),
        "ATC": ATC[i].toFixed(2),
        "MC": MC[i].toFixed(2),
        "TR": TR[i].toFixed(2),
        "MR": MR[i].toFixed(2),
        "Profit": Profit[i].toFixed(2)
    })
}


console.log(verses);

// Only pt supported (not mm or in)
var doc = new jsPDF('p', 'pt');
doc.autoTable(columns, verses, {
    styles: {fillColor: [100, 255, 255], textColor:0},
    columnStyles: {
    	id: {fillColor: 255}
    },
    margin: {top: 60},
    addPageContent: function(data) {
    	doc.text("Header", 40, 30);
    }
});
doc.save('table.pdf');
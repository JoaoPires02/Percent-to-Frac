class Fraction {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    toString() {
        return String(this.numerator + '/' + this.denominator);
    }
}

var percList = [];
var fracList = [];
var fracListStr = [];
var sameDenList = [];
var sameDenListStr = [];


const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

function addToPercList(n) {
    percList.push(n);
}

function getFracList() {
    fracList = [];
    fracListStr = [];
    for (n of percList) {
        let div = [n, 100].reduce(gcd);
        fracList.push(new Fraction(n/div, 100/div));
        fracListStr.push((new Fraction(n/div, 100/div)).toString());
    }
}

function getSameDenList() {
    sameDenList = [];
    sameDenListStr = [];
    let denList = [];
    for (f of fracList) {
        denList.push(f.denominator)
    }

    let mult = denList.reduce(lcm);
    for (e of fracList) {
        sameDenList.push(new Fraction(e.numerator*(mult/e.denominator),  mult));
        sameDenListStr.push((new Fraction(e.numerator*(mult/e.denominator),  mult)).toString());
    }
}

document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let n = document.getElementById("percent").value;

    if (n == "") return;

    console.log(n);
    addToPercList(n);
    getFracList();
    getSameDenList();

    let sum = percList.reduce((a, b) => Number(a) + Number(b), 0);
    console.log(sum);
    if (Number(sum) != 100) {
        document.getElementById("alert").innerHTML = 'ALERT: Sum doesn\'t add up to 100!';
    }
    else {
        document.getElementById("alert").innerHTML = '';
    }

    const string = JSON.stringify(percList, null, 4);
    document.querySelector(".output").innerHTML = string;
    const string2 = JSON.stringify(sameDenListStr, null, 4);
    document.querySelector(".output2").innerHTML = string2;
    const string3 = JSON.stringify(fracListStr, null, 4);
    document.querySelector(".output3").innerHTML = string3;

    document.getElementById('percent').value = '';
    
});

function test() {
    console.log(percList);
    getFracList();
    console.log(fracList);
    console.log(fracListStr);
    getSameDenList();
    console.log(sameDenList);
    console.log(sameDenListStr);
}
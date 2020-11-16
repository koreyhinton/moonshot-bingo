dabbedEls=[]

function bingoCheck() {
    tdEls=document.getElementsByTagName('TD')
    for (var i=0; i<tdEls.length; i++){
        if (tdEls[i].style.borderCollapse !== "collapse") {
            return;
        }
    }
    clearInterval(intervalId);
    alert("BINGO!!! Round="+roundno)
}

function paint(e) {
    c="c"+color
    while (dabbedEls.length>0) {
        el=dabbedEls.pop()
        if (el.classList.contains(c)) {
            el.style.borderCollapse = 'collapse';
            el.style.border = '0';
        }
    }
    bingoCheck()
}

document.body.onmousedown=paint;

function action(e) {
    e.target.onmouseover = undefined;
    dabbedEls.push(e.target)
}
els=document.getElementsByTagName("td")
for (var i=0; i<els.length; i++) {
    els[i].onmouseover = action;
}

roundno=0
color=0
function round() {
    color += 1
    roundno += 1
    var els = document.getElementsByClassName('c'+color);
    if (els.length == 0) {
        color=1
        els=document.getElementsByClassName('c'+color);
    }
    alert("Color: " + window.getComputedStyle(els[0]).backgroundColor);
    document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;
}
alert("Shake the can and then click to paint.");
alert("Wait for other players to open the "+document.title+" on their own device and then click OK to play");
round()
intervalId=setInterval(round, 15000);

bingo=false

function bingoCheck() {
    tdEls=document.getElementsByTagName('TD')
    for (var i=0; i<tdEls.length; i++){
        if (!tdEls[i].classList.contains("dabbed")) {
            return;
        }
    }
    bingo=true
    clearInterval(intervalId);
    alert("BINGO!!! Round="+roundno)
}

function paint(e) {
    c="c"+color
    el=e.target
    if (el.classList.contains(c)) {
       el=e.target;
       el.style.borderColor = window.getComputedStyle(el).backgroundColor;
       if (!el.classList.contains("dabbed")) {
           el.classList.add("dabbed")
           if (!bingo) {
               bingoCheck()
           }
       }
    }
}

els=document.getElementsByTagName("td")
for (var i=0; i<els.length; i++) {
    els[i].onmouseover = paint;
}

roundno=0
color=-1
function round() {
    color += 1
    roundno += 1
    var els = document.getElementsByClassName('c'+color);
    if (els.length == 0) {
        color=0
        els=document.getElementsByClassName('c'+color);
    }
    document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;
}
alert("Wait for other players to open the "+document.title+" on their own device and then click OK to play");
round()
intervalId=setInterval(round, 13000);

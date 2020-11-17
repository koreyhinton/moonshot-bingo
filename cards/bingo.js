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
    set_iframe(null);
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

function set_iframe(c) {
    urlParms="?thumbnail=t"
    if (c!=null) urlParms+="&color="+c
    ifrEl=document.getElementsByTagName('iframe')[0]
    ifrEl.src=location.href+urlParms
}

roundno=0
color=-1
function round() {
    color += 1
    roundno += 1
    var els = document.getElementsByClassName('c'+color);
    if (els.length == 0) {
        color=0
        //els=document.getElementsByClassName('c'+color);
    }
    set_iframe('c'+color);
    //document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;
}

if (new URL(location.href).searchParams.get("thumbnail") == null) {
    // events
    els=document.getElementsByTagName("td")
    for (var i=0; i<els.length; i++) {
        els[i].onmouseover = paint;
    }
    // iframe
    iframe = document.createElement('iframe')
    //iframe.src=location.href+"?thumbnail=t"
    document.body.appendChild(iframe)

    // start round
    alert("Wait for other players to open the "+document.title+" on their own device and then click OK to play");
    round()
    intervalId=setInterval(round, 13000);
} else {
    linkEl=document.createElement("link")
    linkEl.type="text/css"
    linkEl.rel="stylesheet"
    linkEl.href="thumbnail.css"
    document.head.appendChild(linkEl)
    color=new URL(location.href).searchParams.get("color")
    if (color != null) {
        var els = document.getElementsByClassName(color);
        document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;

        tdEls=document.getElementsByTagName("td")
        for (var i=0; i<tdEls.length; i++) {
            tdEl=tdEls[i];
            if (!tdEl.classList.contains(color)) {
                tdEl.style.backgroundColor = "lightgrey"
            }
        }
    }
}

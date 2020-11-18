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
    document.getElementsByTagName("div")[0].innerHTML=caption("<button onclick='click_bingo(this)'>Bingo</button>")
    //alert("BINGO!!! Round="+roundno)
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

function click_bingo(btn) {
    set_iframe(null);
    btn.parentNode.removeChild(btn)
}

function debug_bingo() {
    tdEls=document.getElementsByTagName("td")
    var c=0;
    while (c<numcolors){
    for (var i=0; i<tdEls.length; i++) {
        td=tdEls[i]
        obj={}
        obj.target=td
        paint(obj)
    }
    c+=1;
    if (c<numcolors)    next_color()
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
numcolors=-1

function play() {
    playbtn=document.getElementById('playbtn')
    playbtn.parentElement.removeChild(playbtn)

    // events
    els=document.getElementsByTagName("td")
    for (var i=0; i<els.length; i++) {
        els[i].onmouseover = paint;
    }

    intervalId=setInterval(next_color, 13000)
}

function caption(actionBtnHtml) {
    if (numcolors < 0) {
        els=document.getElementsByTagName("td")
        var maxcolor=-1
        for (var i=0; i<els.length; i++) {
            var classes=els[i].classList
            for (var j=0;j<classes.length; j++) {
                if (classes[0].startsWith("c")) {
                    test=parseInt(classes[0].replace("c",""))
                    if (test > maxcolor) {
                        maxcolor=test
                    }
                }
            }
        }
        numcolors=maxcolor+1
    }
    return "Round " +roundno + " (Color "+(color+1) + " of "+(numcolors)+") "+actionBtnHtml
}

function round() {
        // start of round:
        roundno += 1
        if (roundno==1) {
            divEl=document.createElement("div")
            divEl.innerHTML=caption("<button onclick='play()' id='playbtn'>Play</button>")
            divEl.style.padding = "10px"
            document.body.insertBefore(divEl, document.getElementsByTagName('iframe')[0])
        } else {
            divEl=document.getElementsByTagName("div")[0]
            divEl.innerHTML=caption("")
        }
}

function next_color() {
    color += 1
    var els = document.getElementsByClassName('c'+color);
    if (els.length == 0) {
        color=0
    }
    if (color==0) {
        round()
    } else {
        document.getElementsByTagName("div")[0].innerHTML = caption("")
    }
    set_iframe('c'+color);
    //document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;
}

if (new URL(location.href).searchParams.get("thumbnail") == null) {
    // iframe
    iframe = document.createElement('iframe')
    //iframe.src=location.href+"?thumbnail=t"
    document.body.appendChild(iframe)

    next_color()
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

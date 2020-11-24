bingo=false

speedReQ=[1,2,3]
phaseReQ=["Paint","Bonus"]
function requeue(q) {
    q.push(q.shift())
}

function lightgrey(r,g,b) {
    r=parseInt(r);g=parseInt(g);b=parseInt(b);
    threshold=8;
    return (Math.abs(211-r)<threshold && Math.abs(211-g)<threshold && Math.abs(211-b)<threshold)
}

function gambit_clear() {
    var els=document.getElementsByTagName('TD')
    for (var i=0; i<els.length; i++) {
        if (els[i].classList.contains('c'+color) && els[i].classList.contains("dabbed")) {
            els[i].classList.remove('dabbed')
            els[i].style.borderColor='lightgrey'
        }
    }
}

function gambit() {
    gambit_clear();
    var w=document.getElementsByTagName('TR')[0].children.length
    var h=document.getElementsByTagName('TR').length
    dim=Math.floor(Math.min(w,h)-4)///2)
    //var x = Math.floor(w/2) - Math.floor(alien.length/2)
    //var y = Math.floor(h/2) - Math.floor(alien.length/2)
    var els=document.getElementsByTagName('TD')
    var j=-1;
    checker=0
    for (var i=0;i<els.length;i++) {
        if (i % w == 0) { j++ }
        //if ((i%w)>=x && (i%w)<=(x+dim) && j>=y && j<=(y+dim)){
        //if (i % w == x && j==y) {
        if (checker%2==0 || j %2==0) {
            if (/*"+"==alien[y][x] &&*/els[i].classList.contains("c"+color) && !els[i].classList.contains("dabbed")) {
                paint(els[i], 'el')
                /*els[i].classList.add("dabbed")
                els[i].style.borderColor = window.getComputedStyle(els[i]).backgroundColor;
                bingoCheck()*/
            }
        }
        checker++;
    }
}

function gambit2() {
    gambit_clear()
    var w=document.getElementsByTagName('TR')[0].children.length
    var h=document.getElementsByTagName('TR').length
    dim=Math.floor(Math.min(w,h)-4)///2)
    //var x = Math.floor(w/2) - Math.floor(alien.length/2)
    //var y = Math.floor(h/2) - Math.floor(alien.length/2)

    var els=document.getElementsByTagName('TD')
    var j=-1;
    checker=0
    for (var i=0;i<els.length;i++) {
        if (i % w == 0) { j++ }
        //if ((i%w)>=x && (i%w)<=(x+dim) && j>=y && j<=(y+dim)){
        //if (i % w == x && j==y) {
        if (checker%3<2 /*|| j %3<2*/) {
            if (els[i].classList.contains("c"+color) && !els[i].classList.contains("dabbed")) {
                paint(els[i], 'el')
                /*els[i].classList.add("dabbed")
                els[i].style.borderColor = window.getComputedStyle(els[i]).backgroundColor;
                bingoCheck()*/
            }
        }
        checker++;
    }
}

function buildGrid() {
    var grid=[]
    var trs=document.getElementsByTagName('tr')
    var tds=document.getElementsByTagName('td')
    var w=trs[0].children.length
    var y=-1;
    for (var i=0;i<tds.length;i++) {
        if (i % w == 0) {
            grid.push([])
            y+=1
        }
        grid[y].push(tds[i])
    }
    return grid
}

function deadBonus() {
    var grid=buildGrid()
    var w=grid[0].length
    var h=grid.length
    for (var y=0;y<grid.length;y++) {
        for (var x=0;x<grid[y].length;x++) {
            if (grid[y][x].classList.contains("c"+color) && !grid[y][x].classList.contains("dabbed")) {
                if (x-1>-1 && !grid[y][x-1].classList.contains("dabbed")){continue;}
                if (x+1<grid[0].length && !grid[y][x+1].classList.contains("dabbed")){continue;}
                if (y-1>-1 && !grid[y-1][x].classList.contains("dabbed")){continue;}
                if (y+1<grid[0].length && !grid[y+1][x].classList.contains("dabbed")){continue;}
                paint(grid[y][x],'el')
                /*grid[y][x].classList.add("dabbed")
                grid[y][x].style.borderColor=window.getComputedStyle(grid[y][x]).backgroundColor;
                bingoCheck()*/
                return;
            }
        }
    }
}


function rogueBonus() {
    var grid=buildGrid()
    var w=grid[0].length
    var h=grid.length
    for (var y=0;y<grid.length;y++) {
        for (var x=0;x<grid[y].length;x++) {
            if (grid[y][x].classList.contains("c"+color) && !grid[y][x].classList.contains("dabbed")) {
                if (x-1>-1 && grid[y][x-1].classList.contains("c"+color)){continue;}
                if (x+1<grid[0].length && grid[y][x+1].classList.contains("c"+color)){continue;}
                if (y-1>-1 && grid[y-1][x].classList.contains("c"+color)){continue;}
                if (y+1<grid[0].length && grid[y+1][x].classList.contains("c"+color)){continue;}
                paint(grid[y][x], 'el')
                /*grid[y][x].classList.add("dabbed")
                grid[y][x].style.borderColor=window.getComputedStyle(grid[y][x]).backgroundColor;
                bingoCheck()*/
                return;
            }
        }
    }
}

function allDabbed(color) {
    tdEls=document.getElementsByTagName('TD')
    for (var i=0; i<tdEls.length; i++){
        if (tdEls[i].classList.contains(color) && !tdEls[i].classList.contains("dabbed")) {
            return false;
        }
    }
    return true;
}

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
    document.getElementById("skip").disabled=true
    //alert("BINGO!!! Round="+roundno)
}

function count(el) {
    cnt=0
    clr='c'+color
    els=document.getElementsByTagName('td')
    for (var i=0;i<els.length;i++) {
        if (els[i].classList.contains(clr) && !els[i].classList.contains('dabbed')) {
            cnt+=1
        }
    }
    el.innerHTML="Count: "+cnt
}

// references: deadBonus, gambit, gambit2, play, rogueBonus
function paint(e, eType='ev') {
    c="c"+color;
    el=(eType==='el')?e:e.target//(e instanceof Event)?e.target:e;
    if (el.classList.contains(c)) {
       //el=e.target;
       el.style.borderColor = window.getComputedStyle(el).backgroundColor;
       if (!el.classList.contains("dabbed")) {
           el.classList.add("dabbed")
           if (hiddenColors.includes(c)) {
               el.innerHTML=" "
           }
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
    //ifrEl.src=location.href+urlParms
    ifrEl.contentWindow.location.replace(location.href+urlParms)
}

roundno=0
color=-1
numcolors=-1

function spanStyle(el){
    el.style.fontSize="12px"
    el.style.fontFamily = "Georgia,serif"
    el.style.border = "3px solid lightgrey"
    el.style.padding ="8px"
    el.style.textAlign = "center"
}

function play() {
    playbtn=document.getElementById('playbtn')
    ff=document.createElement("button")
    ff.innerHTML='<img src="icons/ff.png">'
    ff.onclick=skip  //"skip()"
    ff.id="skip"
    ff.style.border="none"
    ff.style.background="none"
    ff.style.cursor="pointer"
/*<button id="skip" onclick="skip()" style="border:none;background:none;cursor:pointer"></button>-->*/
    playbtn.parentNode.replaceChild(ff, playbtn)

    // events
    els=document.getElementsByTagName("td")
    for (var i=0; i<els.length; i++) {
        els[i].onmouseover = paint;
    }

    winspan=document.createElement("span")
    winspan.innerHTML="<B>Winner's Bonus</B><BR/><!--<I>&check; 2+ color streak</I>--><P><B>&ndash;&ndash;</B></P><BR/><P><button id='win0' class='win' onclick='count(this)' disabled>Count: ?</button></P><BR/><P><button id='win1' class='win' onclick='rogueBonus()' disabled>Rogue Pixel</button></P><BR/><P><button id='win2' class='win' onclick='deadBonus()' disabled>Dead Pixel</button></P></BR>"
    winspan.style.position = "fixed"
    winspan.style.top = "0px"
    winspan.style.right = "0px"
    winspan.style.backgroundColor="lightblue"
    winspan.style.color="black"
    winspan.style.width="100px"
    winspan.style.height="200px"
    spanStyle(winspan)
    document.body.appendChild(winspan)

    var imgurl="'icons/grid.png'"
    losespan=document.createElement("span")
    losespan.innerHTML="<B>Loser's Gambit</B><BR/><!--&#x274E; <I>color before</I>--><P><B>&ndash;&ndash;</B></P><BR/><P><button id='lose1' class='lose' onclick='gambit()' disabled><img src='icons/grid.png'></button></P>" //style=\"background:url("+imgurl+")\"
    losespan.innerHTML+="<BR/><P><button onclick='gambit2()' class='lose' disabled><img src='icons/ruler.png'></button></P>"
    losespan.style.position = "fixed"
    losespan.style.top = "200px"
    losespan.style.right = "0px"
    losespan.style.backgroundColor="pink"
    losespan.style.color="white"
    losespan.style.width="100px"
    losespan.style.height="200px"
    spanStyle(losespan)
    document.body.appendChild(losespan)
    
/*
    progress=document.createElement("span")
    progress.innerHTML=
    progress.style.position = "fixed"
    progress.style.bottom = "0px"
    progress.style.left = "0px"
    progress.style.width="200px"
    progress.style.height="50px"
    document.body.appendChild(progress)
*/
    intervalId=setInterval(tick, 1000)
    //intervalId=setInterval(next_color, 13000)
    var audioEl=document.getElementsByTagName("audio")[0]
    audioEl.addEventListener('timeupdate', function() {
        var buffer = .44
        if (this.currentTime > this.duration - buffer) {
            this.currentTime = 0
            this.play()
        }
    });
    audioEl.play();
}

function tick() {
    var progress=document.getElementById("paintprog")
    var bp=document.getElementById("bonusprog")
    if (bp.value>=100){
        bp.value=0
        progress.value=0
        var loseBtns=document.getElementsByClassName("lose")
        var winBtns=document.getElementsByClassName("win")
        for (var i=0;i<loseBtns.length;i++){loseBtns[i].disabled=true}
        for (var i=0;i<winBtns.length;i++){winBtns[i].disabled=true}
        next_color()
    }
    else if (progress.value>=100){
        //requeue(phaseReQ)
        //phase=phaseReQ[0]
        //document.getElementsByTagName("label")[0].innerHTML=phase
        //progress.value=0
        //if (phase=="Paint") { next_color()  }
        var loseBtns=document.getElementsByClassName("lose")
        var winBtns=document.getElementsByClassName("win")
        for (var i=0;i<loseBtns.length;i++){loseBtns[i].disabled=false}
        for (var i=0;i<winBtns.length;i++){winBtns[i].disabled=false}
        bp.value+=(speedReQ[0] * Math.ceil(0.13*60.0))
    } else {
        progress.value+=(speedReQ[0] * Math.ceil(0.13*60.0))//(Math.floor(100/13))
    }
}

function skip() {
    pp=document.getElementById('paintprog')
    if (pp.value<100) {
        pp.value=100
    } else {
        document.getElementById('bonusprog').value=100
    }
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
    return "<h1>MOONSHOT BINGO</h1><h2>Round " +roundno + "</h2>" + /*" (Color "+(color+1) + " of "+(numcolors)+") "+*/actionBtnHtml
}

winstreak=0
losestreak=0
winbonus=0
losebonus=0
hiddenColors=[]

function round() {
        // start of round:
        roundno += 1
        if (roundno==1) {
            divEl=document.createElement("div")
            divEl.innerHTML=caption("<button onclick='play()' id='playbtn' style='border:none;background:none;cursor:pointer'><img src='icons/play.png'></button>")
            divEl.style.padding = "10px"
            divEl.style.textAlign="center"
            //document.body.insertBefore(divEl, document.getElementsByTagName('iframe')[0].nextSibling)
            document.body.prepend(divEl)
            //if (!bingo) {
                var span=document.createElement("span")
                span.style.textAlign="center"
                span.innerHTML='<p><label for="paintprog">Paint: </label><progress id="paintprog" value="0" max="100"> 0% </progress>'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;<label for="bonusprog">Bonus: </label><progress id="bonusprog" value="0" max="100"> 0% </progress>'+
                    '&nbsp;<br/></p>'  //onclick="document.getElementById(\'paintprog\').value=100">&gt;&gt;</button><br/></p>'//requeue(speedReQ);this.innerHTML=speedReQ[0]+\'x\'
                document.body.insertBefore(span, divEl.nextSibling)

            //}
        } else {
            //divEl=document.getElementsByTagName("div")[0]
            //divEl.innerHTML=caption("")
            document.getElementsByTagName("h2")[0].innerHTML='Round '+roundno
        }
}

function next_color() {
    transOffColor=color
    transOffRound=roundno
    color += 1
    var els = document.getElementsByClassName('c'+color);
    if (els.length == 0) {
        color=0
    }
    if (color==0) {
        round()
    } else {
        document.getElementsByTagName("h2")[0].innerHTML='Round '+roundno  //document.getElementsByTagName("div")[0].innerHTML = caption("")
    }
    set_iframe('c'+color);
    //document.body.style.backgroundColor = window.getComputedStyle(els[0]).backgroundColor;

/*    if (transOffRound>0){
        if (allDabbed('c'+transOffColor)) {
            losestreak=0
            winstreak+=1
        } else {
            losestreak+=1
            winstreak=0
        }
        if (winstreak>=2){
            document.getElementById("win1").disabled=false
        }
        if (losestreak>=2){
            document.getElementById("lose1").disabled=false
        }
    }
*/
    cntBtn=document.getElementById("win0")
    if (cntBtn!=null){cntBtn.innerHTML="Count: ?"}
}

if (new URL(location.href).searchParams.get("thumbnail") == null) {
    // iframe
    iframe = document.createElement('iframe')
    iframe.style.display='block'
    iframe.style.margin='0 auto'
    //iframe.src=location.href+"?thumbnail=t"
    document.body.prepend(iframe)//.appendChild(iframe)

    tbl=document.getElementsByTagName("table")[0]
    //tbl.style.display='block'
    tbl.style.margin='auto'

    next_color()

    var audioctl=document.createElement("span")
    var tracks={
        "ufo": "Ufo Speeding.mp3",
	"rocket": "blast_off.mp3",
        "spaceship":"ufo Slowing.mp3",
        "astronaut":"Super Game Music - Badass Space Explorer (Demo).mp3"
    }
    cardnm=window.location.href.substr(window.location.href.lastIndexOf('/') +1).replace(".html","")
    var audio_fn="audio/"+tracks[cardnm]
    var audiohtml=''+
    '<audio controls preload="auto">'+
    '    <source src="'+audio_fn+'" type="audio/mpeg">'+
    '    Your browser does not support the audio element.'+
	'</audio>'
    audioctl.innerHTML=audiohtml
    document.body.appendChild(audioctl)

    // edge case: pixel background color is light grey
    for (var i=0; i<numcolors;i++){
        var rgb=window.getComputedStyle(document.getElementsByClassName("c"+i)[0]).backgroundColor
        var rgb=rgb.match(/\d+/g)
        if (lightgrey(rgb[0],rgb[1],rgb[2])) {
            var els=document.getElementsByClassName("c"+i)
            for (var j=0;j<els.length;j++){
                els[j].style.color="black"
                els[j].style.textAlign="center"
                els[j].style.fontSize="10px"
                els[j].style.verticalAlign="middle"
                els[j].style.display="table-cell"
                els[j].innerHTML="?"
                hiddenColors.push("c"+i)
            }
        }
    }

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
    caption("")//hack for now to assign numcolors
    tdhd=""
    tdbd=""
    var els=document.getElementsByTagName("td")
    for (var i=0;i<numcolors;i++) {
        var text=""
        if (color=='c'+i){
            //tdbd+="<td>^</td>"
            text="sel"
        } else { tdbd+="<td></td>" }
        tdhd+="<td class='c"+(i)+" "+text+"'>"+"</td>"
    }
    chart=document.createElement("table")
    chart.id="chart"
    chart.innerHTML="<tr>"+tdhd+"</tr>"//<tr>"+tdbd+"</tr>"
    document.body.appendChild(chart)

    if (color!=null) {
        var rgb=window.getComputedStyle(document.getElementsByClassName(color)[0]).backgroundColor
        var rgb=rgb.match(/\d+/g)
        if (lightgrey(rgb[0],rgb[1],rgb[2])) {
            var a=document.createElement("a")
            a.innerHTML="?"
            a.style.padding="10px"
            a.style.fontSize="58px"
            a.style.color="black"
            a.style.position="absolute"
            a.style.top="0px"
            a.style.left="0px"
            document.body.appendChild(a)
        }
    }
}

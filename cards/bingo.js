bingo=false

var polyfill=document.createElement('script');
polyfill.src="url-polyfill.min.js"
document.head.appendChild(polyfill)

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
           if (arr_includes(hiddenColors, 'c'+color)) {//hiddenColors.includes('c'+color)) {
               els[i].innerHTML="?"
           }

        }
    }
}

//Spots
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

//Pillars
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
        if (i % w == 0) { j++; checker=0 }
        //if ((i%w)>=x && (i%w)<=(x+dim) && j>=y && j<=(y+dim)){
        //if (i % w == x && j==y) {
        if (checker%2==0){//checker%3<2 /*|| j %3<2*/) {
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
    document.getElementById("skip").disabled=true
    document.getElementsByTagName("div")[0].innerHTML=caption("<button class='bingo' onclick='click_bingo(this)'><a class='bigb'>B</a><a class='bigi'>i</a><a class='bign'>n</a><a class='bigg'>g</a><a class='bigo'>o</a></button>")
    var loseBtns=document.getElementsByClassName("lose")
    var winBtns=document.getElementsByClassName("win")
    for (var i=0;i<loseBtns.length;i++){loseBtns[i].disabled=true}
    for (var i=0;i<winBtns.length;i++){winBtns[i].disabled=true}

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
function paint(e, eType) {//, eType='ev') {
    c="c"+color;
    if (typeof eType === undefined) eType='ev';
    el=(eType==='el')?e:e.target//(e instanceof Event)?e.target:e;
    if (el.classList.contains(c)) {
       //el=e.target;
       el.style.borderColor = window.getComputedStyle(el).backgroundColor;
       if (!el.classList.contains("dabbed")) {
           el.classList.add("dabbed")
           if (arr_includes(hiddenColors, c)) {//hiddenColors.includes(c)) {
               el.innerHTML=" "
           }
           if (!bingo) {
               bingoCheck()
           }
       }
    }
}

function click_bingo(btn) {
    aud=document.getElementsByTagName("audio")[0]
    aud.removeEventListener('timeupdate', audio_loop)
    aud.pause()
    aud.src="audio/win.wav"
    aud.currentTime=0
    aud.play()
    set_iframe(null);
    var img=document.createElement("img")
    img.src="checkmark.png"
    btn.parentNode.appendChild(img)
    btn.parentNode.removeChild(btn)
    //var audioEl=document.getElementsByTagName("audio")[0]
    //audioEl.pause()
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
    el.style.border = "none"//"3px solid lightgrey"
    el.style.padding ="8px"
    el.style.textAlign = "center"
}

function audio_loop() {
    var buffer = .44
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0
        this.play()
    }
}

function play() {
    playbtn=document.getElementById('playbtn')
    ff=document.createElement("button")
    ff.innerHTML='<img src="icons/ff.png" alt="fast-forward">'
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
    var winspan=document.createElement("div")
    var imgurl="'icons/grid.png'"
    var loseHtml="<span class='deactivated'><B>Loser's Gambit</B>: <button id='lose1' class='lose' onclick='gambit()' disabled>Trade for Spots</button>"+
        "<button onclick='gambit2()' class='lose' disabled>Trade for Pillars</button></span>"
    winspan.innerHTML="<br/><br/><div style='display:inline-block;width:400px;background-color:white'>"+"<span class='deactivated'><B>Winner's Bonus: </B><!--<I>&check; 2+ color streak</I>--><button id='win0' class='win' onclick='count(this)' disabled>Count: ?</button><button id='win1' class='win' onclick='rogueBonus()' disabled>Rogue Pixel</button><button id='win2' class='win' onclick='deadBonus()' disabled>Dead Pixel</button></span><br/><br/>"+loseHtml+"</div>"
    //winspan.style.position = "fixed"
    //winspan.style.float="right"
    //winspan.style.top = "0px"
    //winspan.style.right = "0px"
    winspan.style.textAlign="center"
    //winspan.style.backgroundColor="lightblue"
    winspan.style.color="black"
    winspan.style.width="100%"//"100px"
    winspan.style.height="200px"
    spanStyle(winspan)
    var tbl=document.getElementsByTagName("table")[0]
    tbl.parentNode.insertBefore(winspan,tbl.nextSibling)
    //document.body.appendChild(winspan)
    
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
    audioEl.addEventListener('timeupdate', audio_loop/*function() {
        var buffer = .44
        if (this.currentTime > this.duration - buffer) {
            this.currentTime = 0
            this.play()
        }
    }*/);
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
        var activatedText=document.getElementsByClassName("activated")  //https://stackoverflow.com/a/33452345
        for (var i=0;i<loseBtns.length;i++){loseBtns[i].disabled=true}
        for (var i=0;i<winBtns.length;i++){winBtns[i].disabled=true}
        while (activatedText.length){
            node_class_replace(activatedText[0], "activated", "deactivated")//activatedText[0].classList.replace("activated", "deactivated")
            //winLoseText[i].classList.remove("activated")
            //winLoseText[i].classList.add("deactivated")
        }
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
        var deactivatedText=document.getElementsByClassName("deactivated")  //https://stackoverflow.com/a/33452345
        for (var i=0;i<loseBtns.length;i++){loseBtns[i].disabled=false}
        for (var i=0;i<winBtns.length;i++){winBtns[i].disabled=false}
        while (deactivatedText.length) {
            node_class_replace(deactivatedText[0], "deactivated", "activated")//deactivatedText[0].classList.replace("deactivated", "activated")//.remove("deactivated")
            //winLoseText[i].classList.add("activated")
        }
        //bp.value+=(speedReQ[0] * Math.ceil(0.13*60.0))
        bp.value+=(speedReQ[0] * Math.ceil(100.0/22.0))
    } else {
        //progress.value+=(speedReQ[0] * Math.ceil(0.13*60.0))//(Math.floor(100/13))
        progress.value+=(speedReQ[0] * Math.ceil(100.0/22.0))//0.13*60.0))//(Math.floor(100/13))
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

function round_caption() {
    return "<a class='bigletter2'>R</a>ound <a class='bigletter2'>#" +roundno + "</a>"
}
function caption(actionBtnHtml) {
    if (numcolors < 0) {
        els=document.getElementsByTagName("td")
        var maxcolor=-1
        for (var i=0; i<els.length; i++) {
            var classes=els[i].classList
            for (var j=0;j<classes.length; j++) {
                if (classes[0][0]=="c") {//(classes[0].startsWith("c")) {
                    test=parseInt(classes[0].replace("c",""))
                    if (test > maxcolor) {
                        maxcolor=test
                    }
                }
            }
        }
        numcolors=maxcolor+1
    }
    return "<h1><a class='bigletter'>M</a>oonshot <a class='bigb'>B<a class='bigi'>i</a><a class='bign'>n</a><a class='bigg'>g</a><a class='bigo'>o</a></a></h1><h2>"+round_caption()+"</h2>" + /*" (Color "+(color+1) + " of "+(numcolors)+") "+*/actionBtnHtml
}

winstreak=0
losestreak=0
winbonus=0
losebonus=0
hiddenColors=[]

/////Function replacements for cross-browser compatibility:
///////document.body.prepend(node)
function body_prepend(el) {
    document.body.insertBefore(el, document.body.childNodes[0])
}
///////arr.includes(str)
function arr_includes(arr, incl){
    for (var i=0;i<arr.length;i++) {
        if (arr[i]==incl) return true;
    }
    return false;
}
///////node.classList.replace(old, new)
function node_class_replace(node, oldC, newC){
    node.classList.remove(oldC)
    node.classList.add(newC)
}
/////End Function replacements

function round() {
        // start of round:
        roundno += 1
        if (roundno==1) {
            divEl=document.createElement("div")
            divEl.innerHTML=caption("<button onclick='play()' id='playbtn' style='border:none;background:none;cursor:pointer'><img src='icons/play.png' alt='play'></button>")
            divEl.style.padding = "10px"
            divEl.style.textAlign="center"
            //document.body.insertBefore(divEl, document.getElementsByTagName('iframe')[0].nextSibling)
            /*document.body.*/body_prepend(divEl)
            //if (!bingo) {
                var span=document.createElement("div")
                span.style.textAlign="center"
                span.innerHTML='<p><label for="paintprog">Paint: </label><progress id="paintprog" value="0" max="100"> 0% </progress>'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;<label for="bonusprog">Bonus: </label><progress id="bonusprog" value="0" max="100"> 0% </progress>'+
                    '&nbsp;<br/></p>'  //onclick="document.getElementById(\'paintprog\').value=100">&gt;&gt;</button><br/></p>'//requeue(speedReQ);this.innerHTML=speedReQ[0]+\'x\'
                document.body.insertBefore(span, divEl.nextSibling)

            //}
        } else {
            //divEl=document.getElementsByTagName("div")[0]
            //divEl.innerHTML=caption("")
            document.getElementsByTagName("h2")[0].innerHTML=round_caption()//'Round '+roundno
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
        document.getElementsByTagName("h2")[0].innerHTML=round_caption()//'Round '+roundno  //document.getElementsByTagName("div")[0].innerHTML = caption("")
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

document.addEventListener('DOMContentLoaded', function() {
if (new URL(location.href)/*URLSearchParams(location.href)*/.searchParams.get("thumbnail") == null) {
    // iframe
    iframe = document.createElement('iframe')
    iframe.style.display='block'
    iframe.style.margin='0 auto'
    //iframe.src=location.href+"?thumbnail=t"
    /*document.body.*/body_prepend(iframe)//.appendChild(iframe)

    tbl=document.getElementsByTagName("table")[0]
    //tbl.style.display='block'
    tbl.style.margin='auto'

    next_color()

    var audioctl=document.createElement("span")
    var tracks={
        "ufo": "Ufo%20Speeding.mp3",
	"rocket": "blast_off.mp3",
        "spaceship":"ufo%20Slowing.mp3",
        "astronaut":"Super%20Game%20Music%20-%20Badass%20Space%20Explorer%20(Demo).mp3"
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
    var hm=document.createElement("a")
    hm.href="../index.html"
    hm.style.borderRadius="48px"
    hm.style.border="3px solid #64626B"
    hm.style.backgroundColor="#bdab9d"//"#e5e5e5"//"#71C6F4"
    hm.innerHTML="<img src='icons/home.png' alt='home'>"
    hm.style.position="absolute"
    hm.style.top="8px"
    hm.style.left="8px"
    document.body.appendChild(hm)
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
});

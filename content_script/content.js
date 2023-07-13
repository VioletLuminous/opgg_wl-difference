// 在tab視窗執行
console.log("content.js has been strated")

document.addEventListener('DOMContentLoaded', async function() { 
    var e1t1quh80 = document.querySelector("#content-container > div > div > div.css-0.e1t1quh80")
    if(document.getElementById("opggwl0") === null && e1t1quh80 !== null){
        var div = document.createElement('div');
        div.id = "opggwl0"
        div.className = "css-lox99k"
        e1t1quh80.append(div)

        document.querySelector("#content-container > div > div > div.css-1f3noih.e1g0z3cq0 > button.css-kidynx.e1g0z3cq3").addEventListener('click', () => {
            get_win_lose()
        })
        document.querySelector("#content-container > div > div > div.css-1f3noih.e1g0z3cq0 > button:nth-child(2)").addEventListener('click', () => {
            get_win_lose()
        })
    }
})


document.querySelector("#content-header > div.css-19oge0q.e10wh5kk2 > ul > li:nth-child(2) > a").addEventListener('click', () => {
    document.addEventListener("DOMContentLoaded", (event) => {
        var div = document.createElement('div');
        div.id = "opggwl0"
        div.className = "css-lox99k"
        document.querySelector("#content-container > div > div > div.css-0.e1t1quh80").append(div)
    });
    
})

// const greeting = "早上好, ";
// const button = document.getElementById("helloBtn");
// button.addEventListener("click", () =>
//   alert(greeting + "維尼.")
// , false);

// document.addEventListener('DOMContentLoaded', async function() { 
//     let htmlString = `<div id="opggwl0" class="css-lox99k"></div>`;
//     document.querySelector("#content-container > div > div > div.css-0.e1t1quh80").append(createElementFromHTML(htmlString))
// })

//*[@id="helloBtn"]

const rotateEvent = () => {
    // document.body.style.transform = 'rotate(180deg)';
    console.log("aa")
};
var i = 0

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if (request.type === 'run_js') {
        // 执行需要执行的代码
        // ...
        sendResponse({message: 'success'});
    }
    switch (request.action) {
        case 'tabs send':
            console.log('tabs send' + request.tabId)
            sendResponse({content: 'request.tabId'});
            break;
        case 'tabs send2':
            let title = document.title;
            console.log('get title')
            sendResponse({content: title});
            break;
        case 'opggwl':
            sendResponse({content: get_win_lose()});
            break;
        default:
            break;
    }
});








function get_win_lose(){
    console.log(777)
    tbody = document.querySelector("#content-container > div > table > tbody")
    season = document.querySelector("#content-container > div > div > div.css-0.e1t1quh80 > div.css-5lti0n.e5qh6tw1 > div > button > span").textContent
    var w0 = 0, l0 = 0;
    tbody.childNodes.forEach(element =>
        {
            var w = element.querySelector("td:nth-child(3) > div > div > div.winratio-graph__text.left")
            if(w == null){
                w = 0
            }else{
                w = parseInt(w.innerText)
            }
            var l = element.querySelector("td:nth-child(3) > div > div > div.winratio-graph__text.right")
            if(l == null){
                l = 0
            }else{
                l = parseInt(l.innerText)
            }
            w0 += w
            l0 += l
        })

    let htmlString = `
    <div>
        <p>勝場 |</p>
        <p>${w0}</p>
    </div>
    <div>

        <p>敗場 |</p>
        <p>${l0}</p>
    </div>
    <div>
        <p>勝差 |</p>
        <p>${w0-l0}</p>
    </div>
    <div>
        <p>勝率</p>
        <p>${(w0/(w0+l0)*100).toFixed(1)}%</p>
    </div>
    `
    document.getElementById("opggwl0").innerHTML = htmlString
    // document.querySelector("#content-container > div > div > div.css-0.e1t1quh80").append(createElementFromHTML(htmlString))
    return {season:season, w:w0, l:l0}
    // console.log(`勝場:${w0}\n敗場:${l0}\n勝差:${w0-l0}`)
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
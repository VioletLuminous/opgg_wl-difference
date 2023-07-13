document.addEventListener('DOMContentLoaded', async function() { 
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    // document.getElementById('take').addEventListener('click', () => {
    //     chrome.tabs.sendMessage(tab.id, { action: 'opggwl'}, function(response){
    //         let w = response.content.w
    //         let l = response.content.l
    //         let season = response.content.season

    //         document.getElementById('tb').innerHTML = `
    //         <td>${season}</td>
    //         <td>${w}</td>
    //         <td>${l}</td>
    //         <td>${w-l}</td>
    //         <td>${(w/(w+l)*100).toFixed(1)}</td>
    //         `
    //     });
    // })
      

    document.getElementById('test').addEventListener('click', async () => {
        // get current tab id
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);

        chrome.scripting.executeScript({ //在tabs執行
            target: {tabId:tab.id},
            function: testFunc
        }, () =>{
            console.log("t")
        })
    })
});

function testFunc(){
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
    if(document.getElementById('wl_show') == null){
        let htmlString = `
        <div id="wl_show" class="css-lox99k">
           
        </div>
        `
        document.querySelector("#content-container > div > div > div.css-0.e1t1quh80").append(createElementFromHTML(htmlString))
    }
    let wl_show = document.getElementById('wl_show')
    let wl_html=`
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
        <p>勝率 |</p>
        <p>${(w0/(w0+l0)*100).toFixed(1)}%</p>
    </div>
    `
    wl_show.innerHTML = wl_html
    
    
}

// let div = document.createElement("div");
// div.classList.add("css-lox99k", "e1g0z3cq3");

// let p = document.createElement("p");
// p.textContent = "contex"
// div.append(p)

// ad = document.querySelector("#content-container > div > div > div.css-0.e1t1quh80")
// ad.append(div)




function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
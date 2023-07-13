
const div1 = document.getElementById('div1')



document.addEventListener('DOMContentLoaded', async function() { 
    console.log("The popup has been loaded")

    chrome.storage.local.get(["id_text"]).then((result) => {
        document.getElementById('id_text_show').innerText = result.id_text
    });
    
    // const sendMessage = (messageObj) => chrome.tabs.sendMessage(tab.id, messageObj);
    
    document.getElementById('a').addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'tabs send', content: "你好，此訊息來自彈出視窗腳本" });
    });

    document.getElementById('b').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'runtime send'}, function(response){
            div1.innerText = response.content
        });
    })

    document.getElementById('c').addEventListener('click', async () => {
        
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);

        chrome.scripting.executeScript({ //在tabs執行
            target: {tabId:tab.id},
            function: getDocumentInfo
        }, (res) =>{
            if (chrome.runtime.lasrError){
                document.getElementById("div1").innerText = "Error:" + chrome.runtime.lasrError.message
            } else {
                document.getElementById('id_text').value = res[0]
            }
        })
    })

    document.getElementById('d').addEventListener('click', () => {
        var id_text = document.getElementById('id_text').value
        document.getElementById('id_text_show').innerText = id_text

        chrome.storage.local.set({ "id_text": id_text }).then(() => {
            console.log(id_text);
        });
        // chrome.tabs.sendMessage(tab.id, { action: 'opggwl'}, function(response){
        //     // document.getElementById('div1').innerText = response.content
        //     // document.getElementById('id_text').value = response.content
        // });
    })
      
});


function getDocumentInfo(){
    let title = document.title;
    console.log(title)
    return {title: title}
}

// async function sendMessageToActiveTab(message) {
//     const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//     const response = await chrome.tabs.sendMessage(tab.id, message);
//     // TODO: Do something with the response.
// }






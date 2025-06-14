const SearchBtn = document.getElementById('SearchBtn');
const SearchInput = document.getElementById('SearchInput');
const SearchStore = document.getElementById('SearchContainer');
const DontShowInt = document.getElementById("DoNotShowAgain")
const Auto_SecureInt = document.getElementById("Auto-Secure")
const LocalSave = localStorage.getItem("URLS")
const NumsSave = localStorage.getItem("Nums")
const StoreUrl = LocalSave ? JSON.parse(LocalSave) : {'a1':['google']};
let Nums = NumsSave ? JSON.parse(NumsSave) : 1;
const SettingBtn = document.getElementById("ntv99Btn")
const SettingDiv = document.getElementById("ntv99")
const SEO = { SEC: null,DSI:null,last:null }
SearchSeCurity()
SettingBtn.addEventListener("click", function () {
    let Nox = SettingBtn.getAttribute('cli')
    if (Nox == '0') {
        SettingBtn.setAttribute("cli", '1')
        SettingDiv.style.display = ''
    }
    else {
        SettingDiv.style.display = 'none'
        SettingBtn.setAttribute("cli",'0')   
    }
})
Auto_SecureInt.addEventListener("change", function () {
    if (Auto_SecureInt.checked) {
        SEO.SEC = true
        document.location.hash = '//SCT'
    }
    else {
        SEO.SEC = false
        document.location.hash = ''

    }
})
DontShowInt.addEventListener("change", function () {
    if (DontShowInt.checked) {
        SEO.DSI = true
    }
    else {
        SEO.DSI = false
    }
})
document.addEventListener("click", function (e) {
    if (!SettingDiv.contains(e.target) && e.target !== SettingBtn) {
                SettingDiv.style.display = 'none'
        SettingBtn.setAttribute("cli",'0')   
    }
})
function SearchSeCurity() {
    console.log('1')
    const GetLocuts = localStorage.getItem("CEO")
    if (GetLocuts == null) {
        console.log("New User")
    }
    else {
        let a = JSON.parse(GetLocuts)
        try {
            SEO.SEC = a.SEC
            SEO.DSI = a.DSI
            SEO.last = a.last
            if (a.SEC == true) {
                Auto_SecureInt.checked = true
        document.location.hash = '//SCT'
            }
        } catch (error) {
            localStorage.removeItem("CEO")
            document.location.reload()
        }
    }
}
const MainsDomas = [ '.ai', '.com', '.net', '.edt', '.got' ]
function Load() {
        SearchStore.innerHTML = ''
        Object.entries(StoreUrl).forEach(([element,text]) => {
            let TXT = text[0]
            let ORig = SearchInput.value.toLowerCase()
            const SingleUrl = document.createElement("div")
            SingleUrl.classList.add("tit")
            SingleUrl.setAttribute("IDS",element)
            const TextUrl = document.createElement("text")
            TextUrl.textContent = TXT.length > 40? `${TXT.slice(0,30)}...`:TXT
            const RemoveUrl = document.createElement("span")
            RemoveUrl.textContent = '✕'
            RemoveUrl.classList.add("RmoveUrl")
            RemoveUrl.setAttribute("IDS",element)
            if (SearchInput.value.trim() == '') {
            ap(SearchStore,SingleUrl)
            ap(SingleUrl,TextUrl)
            ap(SingleUrl,RemoveUrl)
            }
            //pass
            // console.log(ORig.slice(0, ORig.length) , TXT.slice(0, ORig.length))
             if ((ORig.slice(0, ORig.length) == TXT.slice(0, ORig.length)) || TXT.includes(ORig)) {
            ap(SearchStore,SingleUrl)
            ap(SingleUrl,TextUrl)
            ap(SingleUrl,RemoveUrl)
            }
             else {
            }
            SingleUrl.addEventListener("click", function () {
                const v = SingleUrl.getAttribute("IDS")
                SearchInput.value = StoreUrl[v][0]
                SearchBtn.click()
            })
            RemoveUrl.addEventListener("click", function () {
                const v = RemoveUrl.getAttribute("IDS")
                delete StoreUrl[ v ]
                const elt = RemoveUrl.parentElement
                elt.remove()
        })
        });
}
        function ap(a,b) {
        a.appendChild(b)
    }
    function re(a,b) {
        a.removeChild(b)
}
 function RememberUser(b) {//Display ask user to secure his url
  return new Promise((resolve) => {
    const MessageContainer = document.getElementById("MSG")
    const MessageText = document.getElementById("MainPoint")
    const CancelBtn = document.getElementById("CancelMesseg")
    const SecureBtn = document.getElementById("SecureMesseg")
    MessageContainer.style.display = "";
    MessageText.innerHTML = `<h2>${b.split('\n')[0]}</h2><p>${b.split('\n')[1]}</p>`;
      const handleYes = () => {
        SEO.last = '1'
      cleanup();
      resolve(true);
    };

      const handleNo = () => {
        SEO.last = '0'
      cleanup();
      resolve(false);
    };

      function cleanup() {
        
      MessageContainer.style.display = "none";
      SecureBtn.removeEventListener("click", handleYes);
      CancelBtn.removeEventListener("click", handleNo);
    }

    SecureBtn.addEventListener("click", handleYes);
    CancelBtn.addEventListener("click", handleNo);
  });
}
function ChckifItisWork(v) {
    let text = v.split('.')
    let ForBid = /[!@#$%^&*()_=+{}[\]\\:;"'<>,?/]/
    // text =  == true? false:true
    return ForBid.test(text)
}
SearchBtn.addEventListener("click", async  function() {
    const Vols = SearchInput.value.toLowerCase()
    if(Vols.trim() === "") {
        return
    }
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(Vols.trim())}`
    switch (true) {
        case Vols.startsWith("https://"):
            searchUrl = Vols
            break;
        case Vols.startsWith("http://"):
            if (SEO.DSI == true) {
                let v = SEO.last
                let s = v == 0 ? false : true
            if (s) {
                searchUrl = Vols
                searchUrl.replace('http://','https://')
            }
            else {
             searchUrl = `https://www.google.com/search?q=${encodeURIComponent(Vols.trim())}`
            }
            }
            else {
                let Ask;
                if (document.location.hash == '//SCT') {
                    Ask = true
                }
                else {
                  Ask = await RememberUser(`The URL is not secure Sr! \n Do you want to Secure it?`)
                }
            if (Ask) {
                searchUrl = Vols

                searchUrl.toLowerCase().replace('http://','https://')
            }
            else {
             searchUrl = `https://www.google.com/search?q=${encodeURIComponent(Vols.trim())}`
            }
            }
            break;
        case Vols.includes('.') && ChckifItisWork(Vols):
            searchUrl = `https://${Vols}`
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(Vols.trim())}`
            break;
    }
    try {
        open(searchUrl, '_blank');
    } catch (error) {
        open(`https://www.google.com/search?q=${encodeURIComponent(Vols.trim())}`, '_blank');
    }
    let wasser = false
    Object.entries(StoreUrl).forEach(([element, text]) => {
        if (text[0].toLowerCase() == Vols.toLowerCase()) {
            wasser = true
        }

    });
    if (wasser == false) {
            Nums += 1
            StoreUrl[ `a${Nums}` ] = [ Vols.toLowerCase() ]
    }
    SearchInput.value = ''
})
SearchInput.addEventListener("focus", function () {
    Load()
})
SearchInput.addEventListener("input", function (event) {
    Load()
})
SearchInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        SearchBtn.click()
    }
})
window.onbeforeunload = function () {
    localStorage.setItem("URLS",JSON.stringify(StoreUrl))
    localStorage.setItem("Nums",JSON.stringify(Nums))
    localStorage.setItem("CEO",JSON.stringify(SEO))
}
export default class System{
    constructor(app,list){
        this.app = app;
        this.fundList = list;
    }

    investor_list_popup_more=e=>{
        let idx = e.target.dataset.idx;
        let data = this.fundList[idx].investorList;
        let title = "투자자 목록";
        let content = `<div id="investorPopupMoreList">`
        if(data.length){
            data.forEach(x=>{
                content += `<div class="investorPopupMoreBox">
                                <h5 class="investorPopupMoreTitle navLink" data-link="user" data-id="${x.user_id}"><span class="mr-5">Email</span>${x.email}</h5>
                                <p class="investorPopupMoreSubTitle"><span class="mr-5">투자 날짜</span>${x.datetime}</p>
                                <p class="investorPopupMoreText"> <span class="mr-5">투자 금액</span> <i class="fa fa-krw green mr-5"></i>${parseInt(x.pay).toLocaleString()}</p>
                            </div>`;
            });
        }else content += `<div class="userFundListBoxNone"></div>`;

        content+=`</div>`;

        this.make_popup(title,content);

        document.querySelector("#investorPopupMoreList").querySelectorAll(".navLink").forEach(x=>{
            x.addEventListener("click",e=>{
                this.popup_close_process();
                this.app.loadPage(e);
            });
        });
    }

    form_success_msg(box){
        box.querySelector(".formWarnningMsg").innerHTML = "";
        box.querySelector(".formWarnningMsg").classList.remove("open");

        box.querySelector(".formInput").classList.remove("warnning");
        box.querySelector(".formInputIcon").classList.remove("warnning");

        box.querySelector(".formInput").classList.add("success");
        box.querySelector(".formInputIcon").classList.add("success");

        if(box.querySelector(".formInputIcon").classList.contains("fa-remove")) box.querySelector(".formInputIcon").classList.replace("fa-remove","fa-check");

        if(!document.querySelector(".formBtn")) return false;
        if(!document.querySelector("form .warnning")) document.querySelector(".formBtn").classList.add("success");
        else document.querySelector(".formBtn").classList.remove("success");
    }

    form_warnning_msg(box,msg){
        box.querySelector(".formWarnningMsg").innerHTML = msg;
        box.querySelector(".formWarnningMsg").classList.add("open");

        box.querySelector(".formInput").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.replace("fa-check","fa-remove");

        if(!document.querySelector(".formBtn")) return false;
        if(!document.querySelector("form .warnning")) document.querySelector(".formBtn").classList.add("success");
        else document.querySelector(".formBtn").classList.remove("success");
    }

    make_popup(title,content){
        let dom = document.createElement("div");
        dom.innerHTML = `<div id="popupBc">
                            <div id="popup">
                                <div id="popupHeader">
                                    <h5 id="popupTitle">${title}</h5>
                                    <button id="popupClose"><i class="fa fa-remove"></i></button>
                                </div>
                                <div id="popupContent">
                                    ${content}
                                </div>
                            </div>
                        </div>`;
        document.querySelector("#wrap").appendChild(dom.firstChild);
        $("#popupBc").fadeIn(600);
        document.querySelector("#popupClose").addEventListener("click",this.popup_close_process);
    }

    popup_close_process(){
        $("#popupBc").fadeOut(600,()=>{
            document.querySelector("#wrap").removeChild(document.querySelector("#popupBc"));
        });
    }

    make_toast(msg){
        let dom = document.createElement("div");
        dom.innerHTML = `<div id="toast"><button id="toastClose"><i class="fa fa-remove"></i></button>${msg}</div>`;

        dom.querySelector("#toastClose").addEventListener("click",()=>{
            document.querySelector("#wrap").removeChild(document.querySelector("#toast"));
        });

        document.querySelector("#wrap").appendChild(dom.firstChild);

        $("#toast").css("left",((($("#wrap").width()/2) - ($("#toast").width())/2))+"px");
        document.querySelector("#toast").classList.add("open");
        setTimeout(()=>{
            if(document.querySelector("#toast"))document.querySelector("#toast").classList.remove("open");
        },3000,()=>{if(document.querySelector("#toast"))document.querySelector("#wrap").removeChild(document.querySelector("#toast"))});
    }
}
export default class System{
    constructor(){

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
        dom.innerHTML = `<div id="toast">${msg}</div>`;

        document.querySelector("#wrap").appendChild(dom.firstChild);

        let wrap_width = document.querySelector("#wrap").getBoundingClientRect().width;

        $("#toast").css("left",((($("#wrap").width()/2) - ($("#toast").width())/2))+"px");
        document.querySelector("#toast").classList.add("open");
        setTimeout(()=>{
            document.querySelector("#toast").classList.remove("open");
        },1500,()=>{document.querySelector("#wrap").removeChild(document.querySelector("#toast"))});
    }
}
export default class View{
    constructor(list,system){
        this.fundList = list;
        this.system = system;

        this.sign_drow=[];
        this.sign_drow_flag = 1;
    }

    view_page_loading(){
        if(!document.querySelector("#FundViewBox")) return false;
        let FundViewBox = document.querySelector("#FundViewBox");
        FundViewBox.innerHTML = "";
        
        this.fundList.forEach(x=>{
            let fund = this.view_templet_make(x);
            FundViewBox.appendChild(fund);
            fund.querySelector(".fundMoreBtn").addEventListener("click",this.system.investor_list_popup_more);
            if(fund.querySelector(".fundBtn"))fund.querySelector(".fundBtn").addEventListener("click",this.view_fund_popup);
            this.fund_prograss_bar(fund.querySelector(".fundPrograssBar"));
        });
    }
    
    fund_prograss_bar(item){
        let achieve = parseFloat(item.dataset.achieve);
        let time = 0;
        let prograssing = setInterval(()=>{
            time++;
            if(time > achieve){
                item.querySelector(".fundPrograssBaring").style.width = achieve+"%";
                return clearInterval(prograssing)
            } else item.querySelector(".fundPrograssBaring").style.width = time+"%";
        },50);
    }
    
    view_fund_popup=e=>{
        let idx = e.target.dataset.idx;
        let {number,name,total} = this.fundList[idx];
        let title = "투자 펀딩 계약서";
        let content = `<form id="viewForm">
                            <div class="formGroup">
                                <label for="viewNumber" class="formLabel">펀드번호</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="email" class="formInput success" name="viewNumber" id="viewNumber" value="${number}" disabled>
                                    <i class="fa fa-check formInputIcon success"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewName" class="formLabel">창업펀드명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" class="formInput success" name="viewName" id="viewName" value="${name}" disabled>
                                    <i class="fa fa-check formInputIcon success"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewUser" class="formLabel">투자자명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" class="formInput" name="viewUser" id="viewUser" placeholder="투자자명">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewMoney" class="formLabel">투자금액</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="number" class="formInput" name="viewMoney" id="viewMoney" placeholder="투자금액" max="${total}" min="1">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewSign" class="formLabel">서명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <div id="viewSign">
                                        <canvas id="viewFormSign" class="warnning"></canvas>
                                        <div id="viewSignWeightBox">
                                            <label for="viewSignWeight" id="viewSignWeightLabel">서명굵기</label>
                                            <div id="viewSignWeightInput">
                                                <select class="viewSignWeight" id="viewSignWeight" name="viewSignWeight">
                                                    <option value="1">1</option>
                                                    <option value="3" selected>3</option>
                                                    <option value="5">5</option>
                                                    <option value="7">7</option>
                                                    <option value="9">9</option>
                                                </select>
                                                <span>px</span>
                                            </div>
                                        </div>
                                    </div>
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div id="viewPopupButtonBox">
                                <button id="viewFundBtn" class="viewPopupBtn">투자</button>
                                <button id="viewCloseBtn" class="viewPopupBtn">취소</button>
                            </div>
                        </form>`;

        this.system.make_popup(title,content);

        document.querySelector("#viewCloseBtn").addEventListener("click",e=>{e.preventDefault();this.system.popup_close_process();})
        $("#viewUser").on("propertychange change keyup paste",e=>{
            if(e.keyCode === 13)e.preventDefault();
            this.view_popup_input_check(e.target);
        });

        $("#viewMoney").on("propertychange change keyup paste",e=>{
            if(e.keyCode === 13) e.preventDefault();
            this.view_popup_input_check(e.target);
        });

        this.sign_drow_flag = 1;

        document.querySelector("#viewFormSign").addEventListener("mousedown",this.view_popup_sign_start);
        document.querySelector("#viewFormSign").addEventListener("mousemove",this.view_popup_sign_drow);
        document.querySelector("#viewFormSign").addEventListener("mouseup",this.view_popup_sign_end);

        document.querySelector("#viewFundBtn").addEventListener("click",this.view_send_check);
    }

    view_send_check=e=>{
        e.preventDefault();

        this.view_popup_input_check(document.querySelector("#viewFormSign"));
        this.view_popup_input_check(document.querySelector("#viewUser"));
        this.view_popup_input_check(document.querySelector("#viewMoney"));
        if(document.querySelector("#viewForm .warnning")){
            document.querySelectorAll("#viewForm .warnning").forEach(x=>{
                x.classList.remove("warnning");
                setTimeout(()=>{x.classList.add("warnning")},200);
            });

            return this.system.make_toast("모든 올바른 값을 입력해주세요!");
        }
    }

    view_popup_sign_start=e=>{
        if(this.sign_drow_flag !== 1) return false;
        let x = e.offsetX, y = e.offsetY;

        const canvas = document.querySelector("#viewFormSign");
        const ctx = canvas.getContext("2d");
        const weight = document.querySelector("#viewSignWeight").value+"px";

        canvas.width = 300;
        canvas.height = 150;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = weight;

        // drow canvas
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x,y);
        ctx.stroke();

        this.sign_drow.push({x,y});
        this.sign_drow_flag = 2;
    }

    view_popup_sign_drow=e=>{
        if(this.sign_drow_flag !== 2) return false;
        let x = e.offsetX, y = e.offsetY;
        let idx = this.sign_drow.length-1;
        let sx = this.sign_drow[idx].x,sy = this.sign_drow[idx].y;

        const canvas = document.querySelector("#viewFormSign");
        const ctx = canvas.getContext("2d");
        const weight = document.querySelector("#viewSignWeight").value;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = weight;

        // drow canvas
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(x,y);
        ctx.stroke();

        this.sign_drow.push({x,y});
    }

    view_popup_sign_end=e=>{
        if(this.sign_drow_flag !== 2) return false;
        let x = e.offsetX, y = e.offsetY;
        let idx = this.sign_drow.length-1;
        let sx = this.sign_drow[idx].x,sy = this.sign_drow[idx].y;

        const canvas = document.querySelector("#viewFormSign");
        const ctx = canvas.getContext("2d");
        const weight = document.querySelector("#viewSignWeight").value+"px";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = weight;

        // drow canvas
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(x,y);
        ctx.stroke();

        this.sign_drow.push({x,y});
        this.sign_drow_flag = 0;

        canvas.parentNode.parentNode.querySelector(".formInputIcon").classList.add("success");
        canvas.classList.remove("warnning");
        this.view_popup_input_check(canvas);
    }

    view_popup_input_check(target){
        let box = target.parentNode.parentNode;
        if(target.id === "viewFormSign"){
            box = box.parentNode;
            if(target.classList.contains("warnning")){
                box.querySelector(".formWarnningMsg").innerHTML = "서명을 입력해주세요!";
                box.querySelector(".formWarnningMsg").classList.add("open");

                box.querySelector(".formInputIcon").classList.add("warnning");
                box.querySelector(".formInputIcon").classList.replace("fa-check","fa-remove");
            }else{
                box.querySelector(".formWarnningMsg").innerHTML = "";
                box.querySelector(".formWarnningMsg").classList.remove("open");

                box.querySelector(".formInputIcon").classList.remove("warnning");
                box.querySelector(".formInputIcon").classList.add("success");
                if(box.querySelector(".formInputIcon").classList.contains("fa-remove")) box.querySelector(".formInputIcon").classList.replace("fa-remove","fa-check");
            }
        }else{
            let val = target.value;
    
            if(val.trim().length < 1) return this.system.form_warnning_msg(box,"값을 입력해주세요!");
            else if(target.id === "viewUser" && val.match(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+$/g) === null) return this.system.form_warnning_msg(box,"투자자명은 한글, 영문, 띄어쓰기만 입력가능합니다!");
            else if(target.id === "viewMoney" && val.match(/^\d+$/g) === null) return this.system.form_warnning_msg(box,"자연수만 입력할 수 있습니다!");
            else if(target.id === "viewMoney" && Number(val) > 1000000) return target.value = parseInt(target.getAttribute("max"));
            else this.system.form_success_msg(box);
        }
    }

    view_templet_make({name,current,total,number,endDate,achieve,photo,idx}){
        let now = new Date();
        let date = new Date(endDate);
        let dom = document.createElement("div");
        let content = '';
        content = `<div class="fundBox">
                            <div class="fundImgBox">
                                <img src="${photo}" alt="fundImg">
                            </div>
                            <div class="fundInfo">
                                <p class="fundNumber text-right gray">#${number}</p>
                                <h4 class="fundTitle">${name}</h4>
                                <div class="fundDate">
                                    <span>${endDate}</span>
                                    <p class="fundCate">모집마감일</p>
                                </div>
                                <div class="fundMoney">
                                    <span class="fundNowMoney green"><i class="fa fa-krw mr-5 green"></i>${current.toLocaleString()}</span>
                                    <span class="green">/</span>
                                    <span class="fundAllMoney green">${total.toLocaleString()}</span>
                                    <p class="fundCate">금액</p>
                                </div>
                                <div class="fundPrograssBox">
                                    <div>
                                        <span class="fundPrograssNumber">${achieve}%</span>
                                        <div class="fundPrograssBar" data-achieve="${achieve}"><div class="fundPrograssBaring"></div></div>
                                    </div>
                                    <p class="fundCate">달성률</p>
                                </div>
                            </div>

                            <div class="fundBoxBorder">
                                <div class="Top Left"></div>
                                <div class="Top Right"></div>
                                <div class="Bottom Left"></div>
                                <div class="Bottom Right"></div>
                            </div>

                            <div class="fundButtonBox">`;
            if(now < date) content +=`<button data-idx="${idx}" class="fundButton fundBtn">투자하기</button>`;
            else content += `<p class="fundEnd">모집완료</p>`;
            content += `<button data-idx="${idx}" class="fundButton fundMoreBtn">상세보기</button>
                            </div>
                        </div>`;

        dom.innerHTML = content;
        return dom.firstChild;
    }
}
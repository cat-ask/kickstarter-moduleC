export default class View{
    constructor(list,system,login){
        this.fundList = list;
        this.system = system;
        this.login = login;
        this.loginId = document.querySelector("#user_id") === null ? null : document.querySelector("#user_id").dataset.id;

        this.sign_drow=[];
        this.sign_drow_flag = 1;

        this.view_pageArea = null

        this.page_length = 0;
        this.page_max = 10;
        
        this.page = 0;
        this.page_block = 5;
        this.page_maxblock = 0;

        this.page_left = false;
        this.page_right = false;
    }

    view_page_loading(){
        this.page_length = this.fundList.length;
        this.page_maxblock = Math.ceil(this.page_length / this.page_max);

        this.view_pageArea = document.querySelector(".fundViewPageBox");
        let list_start = this.page * this.page_max;
        let list_end = list_start + this.page_max;
        let list = this.fundList.slice(list_start,list_end);

        this.page_left = this.page === 0 ? false : true;
        this.page_right = this.page === this.page_maxblock-1 ? false : true;
        this.view_page_setting();

        if(!document.querySelector("#FundViewBox")) return false;
        let FundViewBox = document.querySelector("#FundViewBoxList");
        FundViewBox.innerHTML = "";
        
        if(list.length){
            list.forEach(x=>{
                let fund = this.view_templet_make(x);
                FundViewBox.appendChild(fund);
                fund.querySelector(".fundMoreBtn").addEventListener("click",this.system.investor_list_popup_more);
                if(fund.querySelector(".fundEndBtn"))fund.querySelector(".fundEndBtn").addEventListener("click",this.viewFundEnd);
                if(fund.querySelector(".fundBusinessBtn")) fund.querySelector(".fundBusinessBtn").addEventListener("click",this.viewBusiness);
                if(fund.querySelector(".fundBtn"))fund.querySelector(".fundBtn").addEventListener("click",this.view_fund_popup);
                this.fund_prograss_bar(fund.querySelector(".fundPrograssBar"));
            });
        }else document.querySelector("#FundViewBox").innerHTML = `<div class="userFundListBoxNone"></div>`;
    }

    viewBusiness=e=>{
        let id = e.target.dataset.idx;
        $.ajax({
            url:"/viewBusiness",
            method:"post",
            data:{id},
            success(data){
                if(JSON.parse(data)){
                    alert("펀드가 완료되었습니다.");
                    location.href = "/view";
                }
            }
        })
    }

    view_page_setting(){
        let leftBtn = this.view_pageArea.querySelector(".fundViewPagePrevBtn");
        let rightBtn = this.view_pageArea.querySelector(".fundViewPageNextBtn");
        let numberBox = this.view_pageArea.querySelector(".fundViewPageNumberBox");

        if(this.page_left) leftBtn.classList.remove("none");
        else leftBtn.classList.add("none");

        if(this.page_right) rightBtn.classList.remove("none");
        else rightBtn.classList.add("none");

        numberBox.innerHTML = '';

        let page_start = Math.floor(this.page / this.page_block) * this.page_block;
        let page_end = (page_start + this.page_block) > this.page_maxblock ? this.page_maxblock : (page_start + this.page_block);

        for(let i = page_start; i < page_end; i++){
            let box = document.createElement("div");
            let now = this.page === i ? "now" : "";
            box.innerHTML = `<button class="fundViewPageNumber ${now}" data-idx="${i}">${i+1}</button>`;

            box.querySelector(".fundViewPageNumber").addEventListener("click",e=>{
                this.page = parseInt(e.target.dataset.idx);
                this.view_page_loading();
            });

            numberBox.appendChild(box.firstChild);
        }

        leftBtn.addEventListener("click",()=>{
            this.page = this.page - 1 > 0 ? this.page - 1 : 0;
            this.view_page_loading();
        });

        rightBtn.addEventListener("click",()=>{
            this.page = this.page + 1 < this.page_maxblock ? this.page + 1 : this.page_maxblock-1;
            this.view_page_loading();
        });

    }

    viewFundEnd=e=>{
        let id = e.target.dataset.idx;
        let FundViewBox = document.querySelector("#FundViewBoxList");
        $.ajax({
            url:"/fundEnd",
            method:"post",
            data:{id:id},
            success(data){
                if(JSON.parse(data)){
                    alert("펀드가 해제되었습니다.");
                    return FundViewBox.removeChild(e.target.parentNode.parentNode);
                }
            }
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
        let {number,name,total,id,user_id} = this.fundList[idx];
        let title = "투자 펀딩 계약서";
        let content = `<form id="viewForm" action="/viewFund" method="post">
                            <input id="viewFundOwnerId" value="${user_id}" name="viewFundOwnerId" hidden>
                            <input id="viewFundId" value="${id}" name="viewFundId" hidden>
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
                            <input type="text" name="viewSign" id="viewSign" style="visibility:hidden">
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
        }else document.querySelector("#viewForm").submit();
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

        let dataUrl = canvas.toDataURL('image/png');
        document.querySelector("#viewSign").value = dataUrl;
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

    view_templet_make({name,current,total,number,endDate,achieve,photo,idx,status,user_id,id}){
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

            if(this.login && status === "prograssing") content +=`<button data-idx="${idx}" class="fundButton fundBtn">투자하기</button>`;
            else if(this.login && this.loginId == user_id && status === "end" ) content += `<button data-idx="${id}" class="fundButton fundBusinessBtn">완료</button>`;
            else if(this.login && this.loginId == user_id && status === "failed") content += `<button data-idx="${id}" class="fundButton fundEndBtn">모집해제</button>`;
            else content += `<p class="fundEnd">모집완료</p>`;
            content += `<button data-idx="${idx}" class="fundButton fundMoreBtn">상세보기</button>
                            </div>
                        </div>`;

        dom.innerHTML = content;
        return dom.firstChild;
    }
}
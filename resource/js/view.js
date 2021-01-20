export default class View{
    constructor(list,system){
        this.fundList = list;
        this.system = system;
    }

    view_page_loading(){
        if(!document.querySelector("#FundViewBox")) return false;
        let FundViewBox = document.querySelector("#FundViewBox");
        FundViewBox.innerHTML = "";
        
        this.fundList.forEach(x=>{
            let fund = this.view_templet_make(x);
            FundViewBox.appendChild(fund);
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
                                    <input type="email" class="formInput" name="viewNumber" id="viewNumber" value="${number}" disabled>
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewName" class="formLabel">창업펀드명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" class="formInput" name="viewName" id="viewName" value="${name}" disabled>
                                    <i class="fa fa-check formInputIcon"></i>
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
                                    <input type="number" class="formInput" name="viewMoney" id="viewMoney" placeholder="투자금액">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="viewSign" class="formLabel">서명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <div id="viewSign">
                                        <canvas id="viewFormSign"></canvas>
                                        <div id="viewSignWeightBox">
                                            <label for="viewSignWeight" id="viewSignWeightLabel">서명굵기</label>
                                            <div id="viewSignWeightInput">
                                                <input type="number" name="viewSignWeight" id="viewSignWeight" value="3" min="1" max="${total}">
                                                <span>px</span>
                                            </div>
                                        </div>
                                    </div>
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                            </div>
                            <div id="viewPopupButtonBox">
                                <button id="viewFundBtn" class="viewPopupBtn">투자</button>
                                <button id="viewCloseBtn" class="viewPopupBtn">취소</button>
                            </div>
                        </form>`;

        this.system.make_popup(title,content);

        document.querySelector("#viewCloseBtn").addEventListener("click",e=>{e.preventDefault();this.system.popup_close_process();})
        document.querySelector("#viewUser").addEventListener("keydown",this.view_popup_input_check);
        document.querySelector("#viewMoney").addEventListener("keydown",this.view_popup_input_check);
    }

    view_popup_input_check=e=>{
        let target = e.target;
        let val = target.value;
        let box = target.parentNode.parentNode;

        
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
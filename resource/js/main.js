export default class Main{
    constructor(list,system){
        this.fundList = list;
        this.system = system;
    }

    main_page_loading(){
        if(!document.querySelector("#highFundList")) return false;
        let highFundList = JSON.parse(JSON.stringify(this.fundList)),highFundListArea = document.querySelector("#highFundList");

        highFundListArea.innerHTML = '';
        highFundList.sort((a,b)=>{if(a.achieve < b.achieve) return 1; else return -1;});

        for(let i = 0; i < 4; i++){
            let fund = this.high_fund_make_templete(highFundList[i])
            highFundListArea.appendChild(fund);
            this.high_fund_prograss_bar(fund.querySelector(".highFundPrograssBox"));
            fund.querySelector(".highFundMoreBtn").addEventListener("click",this.high_more);
        }
    }

    high_more=e=>{
        let idx = e.target.dataset.idx;
        let data = this.fundList[idx].investorList;
        let title = "투자자 목록";
        let content = `<div id="highFundMoreList">`
        data.forEach(x=>{
            content += `<div class="highFundMoreBox">
                            <h5 class="highFundMoreTitle"><span class="mr-5">Email</span>${x.email}</h5>
                            <p class="highFundMoreSubTitle"><span class="mr-5">투자 날짜</span>${x.datetime}</p>
                            <p class="highFundMoreText"> <span class="mr-5">투자 금액</span> <i class="fa fa-krw green mr-5"></i>${x.pay.toLocaleString()}</p>
                        </div>`;
        })             
        content+=`</div>`;
        console.log(idx,data);
        this.system.make_popup(title,content);
    }

    high_fund_prograss_bar(item){
        let achieve = parseFloat(item.dataset.achieve);
        let time = 0;
        let prograssing = setInterval(()=>{
            time++;
            if(time > achieve){
                item.querySelector(".highFundPrograssBar").style.width = achieve+"%";
                return clearInterval(prograssing)
            } else item.querySelector(".highFundPrograssBar").style.width = time+"%";
        },50);
    }

    high_fund_make_templete({name,current,endDate,achieve,photo,idx}){
        let dom = document.createElement("div");
        dom.innerHTML = `<div class="highFundBox">
                                <div class="highFundImgBox">
                                    <img src="${photo}" alt="FundImg" title="FundImg" class="highFundImg">
                                </div>
                                <div class="highFundInfo">
                                    <h5 class="highFundInfoTitle">${name}</h5>
                                    <div class="highFundPrograssBox" data-achieve="${achieve}"><div class="highFundPrograssBar"></div></div>
                                    <p class="highFundInfoText"><span class="green"><i class="fa fa-krw green mr-5"></i>${current.toLocaleString()}</span> <span class="highFundInfoCate">현재금액</span></p>
                                    <p class="highFundInfoSubTitle">${achieve.toLocaleString()}%<span class="highFundInfoCate">달성율</span></p>                            
                                    <p class="highFundInfoText">${endDate}<span class="highFundInfoCate">모집마감일</span></p>
                                    <button class="highFundMoreBtn" data-idx="${idx}">상세보기</button>
                                </div>
                            </div>`;
        return dom.firstChild;
    }
}
export default class Investor{
    constructor(list,system,app){
        this.app = app;
        this.fundList = list;
        this.investorList = [];
        this.system = system;
        this.investor_area = null;
        this.investor_pageArea = null

        this.page_length = 0;
        this.page_max = 10;
        
        this.page = 0;
        this.page_block = 5;
        this.page_maxblock = 0;

        this.page_left = false;
        this.page_right = false;
    }

    investor_page_loading(){
        let sort = document.querySelector("#investorSort").value;
        this.investor_list_loading(sort);

        this.investor_area = document.querySelector("#investorArea");
        this.investor_pageArea = document.querySelector(".fundViewPageBox.investor");
        this.investor_area.innerHTML = '';

        let list_start = this.page * this.page_max;
        let list_end = list_start + this.page_max;
        let list = this.investorList.slice(list_start,list_end);

        this.page_left = this.page === 0 ? false : true;
        this.page_right = this.page === this.page_maxblock-1 ? false : true;

        this.investor_page_setting();

        if(list.length) list.forEach(x=>this.investor_make_templet(x));
        else document.querySelector("#investorList").innerHTML = `<div class="userFundListBoxNone"></div>`;
        document.querySelector("#investorSort").addEventListener("change",()=>{this.investor_page_loading()});
    }

    investor_page_setting(){
        let leftBtn = this.investor_pageArea.querySelector(".fundViewPagePrevBtn");
        let rightBtn = this.investor_pageArea.querySelector(".fundViewPageNextBtn");
        let numberBox = this.investor_pageArea.querySelector(".fundViewPageNumberBox");

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
                this.investor_page_loading();
            });

            numberBox.appendChild(box.firstChild);
        }

        leftBtn.addEventListener("click",()=>{
            this.page = this.page - 1 > 0 ? this.page - 1 : 0;
            this.investor_page_loading();
        });

        rightBtn.addEventListener("click",()=>{
            this.page = this.page + 1 < this.page_maxblock ? this.page + 1 : this.page_maxblock-1;
            this.investor_page_loading();
        });

    }

    investor_make_templet({id,investor_name,pay,fundIdx,achieve,user_id,idx}){
        let {name,photo} = this.fundList[fundIdx];
        let dom = document.createElement("div");
        dom.innerHTML = `<div class="fundBox investorBox">
                            <div class="fundImgBox">
                                <img src="${photo}" alt="fundImg">
                            </div>
                            <div class="fundInfo">
                                <p class="fundNumber text-right gray">#A0003</p>
                                <h4 class="fundTitle">${name}</h4>
                                <div class="fundPersonName" style="z-index:10">
                                    <span class="navLink" data-link="user" data-id="${user_id}">${investor_name}</span>
                                    <p class="fundCate">투자자명</p>
                                </div>
                                <div class="fundMoney">
                                    <span class="green"><i class="fa fa-krw green mr-5"></i>${pay.toLocaleString()}</span>
                                    <p class="fundCate">투자금액</p>
                                </div>
                                <div class="fundShare">
                                    <span>${achieve}%</span>
                                    <p class="fundCate">펀드지분</p>
                                </div>

                                <div class="fundBoxBorder" style="z-index:1">
                                    <div class="Top Left"></div>
                                    <div class="Top Right"></div>
                                    <div class="Bottom Left"></div>
                                    <div class="Bottom Right"></div>
                                </div>

                                <div class="fundButtonBox">
                                    <button class="investorContractBtn fundButton" data-id="${idx}">투자펀드계약서</button>
                                </div>
                            </div>
                        </div>`;
        dom.querySelector(".navLink").addEventListener("click",this.app.loadPage);
        dom.querySelector(".investorContractBtn").addEventListener("click",this.investor_make_contract);
        return this.investor_area.appendChild(dom.firstChild);
    }

    investor_make_contract=e=>{
        let {investor_name,fundIdx,pay,sign} = this.investorList[e.target.dataset.id];
        let {number,name} = this.fundList[fundIdx];
        
        let dom = document.createElement("canvas");
        dom.id = "investorCanvas";
        document.querySelector("#wrap").appendChild(dom);

        const canvas = document.querySelector("#investorCanvas");
        const ctx = canvas.getContext("2d");
            
        canvas.width = 793;
        canvas.height = 495;
        ctx.font = "25px Arial";
        ctx.fillStyle = "#fff"

        let bc = new Image();
        bc.src = "./resource/images/funding.png";
        bc.onload = ()=>{
            ctx.drawImage(bc,0,0);

            let img = new Image();
            img.src = sign;

            img.onload=()=>{
                ctx.fillText(number,330,185);
                ctx.fillText(name,330,230);
                ctx.fillText(investor_name,330,270);
                ctx.fillText(pay.toLocaleString()+"원",330,318);
                ctx.drawImage(img,480,390,150,75);

                let canvasUrl = canvas.toDataURL("image/png");
                let aTag = document.createElement("a");
                aTag.download = "투자펀드계약서.png";
                aTag.href = canvasUrl;
                aTag.click();

                document.querySelector("#wrap").removeChild(document.querySelector("#investorCanvas"));
            }
        }
    }

    investor_list_loading(sort="date"){
        this.investorList = [];
        let fundList = JSON.parse(JSON.stringify(this.fundList));
        fundList.forEach((x,idx)=>{
            if(x.investorList.length > 0){
                x.investorList.forEach(y=>{
                    y.pay = parseInt(y.pay);
                    y.fundIdx = idx;
                    y.achieve = Math.round(y.pay / (x.current / 100));
                    let flag = -1;
                    this.investorList.forEach((el,idx)=>{if(el.fundIdx === y.fundIdx && y.email === el.email) flag = idx;});

                    if(flag > -1){
                        let fund = this.fundList[y.fundIdx];
                        this.investorList[flag].sign = y.sign;
                        this.investorList[flag].pay += y.pay;
                        this.investorList[flag].achieve = Math.round(this.investorList[flag].pay / (fund.current / 100));
                        this.investorList[flag].datetime = y.datetime;
                    }else this.investorList.push(y);
                });
            }
        });

        this.investorList.sort((a,b)=>{
            switch(sort){
                case "date":
                    if(new Date(a.datetime) < new Date(b.datetime)) return 1;
                    else return -1;
                    break;
                
                case "fund":
                    if(a.name > b.name) return 1;
                    else return -1;
                    break;
                
                case "name":
                    if(a.investor_name > b.investor_name) return 1;
                    else return -1;
                    break;
            }
        });

        this.investorList.forEach((x,idx)=>{x.idx = idx;});

        this.page_length = this.investorList.length;
        this.page_maxblock = Math.ceil(this.page_length / this.page_max);

    }
}
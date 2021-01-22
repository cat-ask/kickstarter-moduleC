export default class User{
    constructor(system){
        this.system = system;
        this.user_register_fundList = [];
        this.user_fundList = [];
        this.user_end_fundList = [];

        this.user_register_area = null;
        this.user_fund_area = null;
        this.user_end_area = null;
    }

    user_page_loading(id){
        let user_register_area = document.querySelector("#userRegisterFundList");
        let user_fund_area = document.querySelector("#userFundList");
        let user_end_area = document.querySelector("#userFundEndList");
        if(id === null) return false;

        user_register_area.innerHTML='';
        user_fund_area.innerHTML='';
        user_end_area.innerHTML='';

        $.ajax({
            url:"/user",
            method:"post",
            data:{id},
            success(data){
                let {user_register_fundList,user_fundList,user_end_fundList} = JSON.parse(data);

                if(user_register_fundList.length){
                    user_register_fundList.forEach(x=>{
                        let dom = document.createElement("div");
                        dom.innerHTML = `<div class="userFundListBox">
                                            <h6 class="userFundListBoxTitle">${x.name}</h6>
                                            <div class="userFundListBoxAcheive">
                                                <span class="userFundCate">모집률</span>
                                                <div class="userFundPrograssBox"><div class="userFundPrograssBar" style="width:${x.achieve}%;"></div></div>
                                                <span>${x.achieve}%</span>
                                            </div>
                                        </div>`;
                        user_register_area.appendChild(dom.firstChild);
                    });
                }else user_register_area.innerHTML = "<div class='userFundListBoxNone'></div>";
                
                
                if(user_fundList.length){
                    user_fundList.forEach(x=>{
                        let dom = document.createElement("div");
                        dom.innerHTML = `<div class="userFundListBox">
                                            <h6 class="userFundListBoxTitle">${x.name}</h6>
                                            <div class="userFundListBoxAcheive">
                                                <span class="userFundCate">모집률</span>
                                                <div class="userFundPrograssBox"><div class="userFundPrograssBar" style="width:${x.achieve}%;"></div></div>
                                                <span>${x.achieve}%</span>
                                            </div>
                                        </div>`;
                        user_fund_area.appendChild(dom.firstChild);
                    });
                }else user_fund_area.innerHTML = "<div class='userFundListBoxNone'></div>";

                if(user_end_fundList.length){
                    user_end_fundList.forEach(x=>{
                        let dom = document.createElement("div");
                        dom.innerHTML = `<div class="userFundListBox">
                                            <h6 class="userFundListBoxTitle">${x.name}</h6>
                                            <div class="userFundListBoxComment">
                                                <span class="userFundCate">상세설명</span>
                                                <p>${x.content}</p>
                                            </div>
                                        </div>`;
                        user_end_area.appendChild(dom.firstChild);
                    });
                }else user_end_area.innerHTML = `<div class="userFundListBoxNone"></div>`;
            }
        });
    }
}
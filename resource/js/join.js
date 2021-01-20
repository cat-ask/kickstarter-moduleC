export default class Join{
    constructor(list,system){
        this.fundList = list;
        this.system = system;
    }

    join_page_loading(){
        document.querySelectorAll("#joinForm input").forEach(x=>{
            x.addEventListener("keydown",e=>{
                if(e.keyCode === 13)e.preventDefault();
                this.join_input_change(e.target)
            });
        });

        document.querySelector("#joinBtn").addEventListener("click",this.join_send_check);
    }

    join_input_change(target){
        let box = target.parentNode.parentNode;
        let val = target.value;
        

        if(val.trim().length < 1) return this.join_warnning_msg(box,"값을 입력해주세요!");
        else if(target.id == "joinEmail" && (val.match(/^[0-9a-zA-Z_]+@[a-zA-Z]+\.[a-z]{2,3}$/g) === null)) return this.join_warnning_msg(box,"올바른 이메일 형식이 아닙니다.");
        else if(target.id == "joinPassword" && (val.match(/\d+/g) === null || val.match(/[a-zA-Z]+/g) === null || val.match(/[!@#$%^&*()]+/g) === null)) return this.join_warnning_msg(box,"비밀번호는 영문, 특수문자[!@#$%^&*()], 숫자를 모두 포함해야합니다.");
        else if(target.id == "joinPasswordCh" && document.querySelector("#joinPassword").value !== val) return this.join_warnning_msg(box,"비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        else return this.join_success_msg(box);
    }

    join_success_msg(box){
        box.querySelector(".formWarnningMsg").innerHTML = "";
        box.querySelector(".formWarnningMsg").classList.remove("open");

        box.querySelector("input").classList.remove("warnning");
        box.querySelector(".formInputIcon").classList.remove("warnning");

        box.querySelector("input").classList.add("success");
        box.querySelector(".formInputIcon").classList.add("success");

        if(box.querySelector(".formInputIcon").classList.contains("fa-remove")) box.querySelector(".formInputIcon").classList.replace("fa-remove","fa-check");
        if(!document.querySelector("#joinForm .warnning")) document.querySelector("#joinBtn").classList.add("success");
    }

    join_send_check=e=>{
        e.preventDefault();

        document.querySelectorAll("#joinForm input").forEach(x=>{this.join_input_change(x)});
        if(document.querySelector("#joinForm input.warnning")) return this.system.make_toast("모든 올바른 값을 입력해주세요!");
    }

    join_warnning_msg(box,msg){
        box.querySelector(".formWarnningMsg").innerHTML = msg;
        box.querySelector(".formWarnningMsg").classList.add("open");

        box.querySelector("input").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.replace("fa-check","fa-remove");
    }
}
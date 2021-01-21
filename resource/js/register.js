export default class Register{
    constructor(list,system){
        this.fundList = list;
        this.system = system;
        this.form = null;
    }

    register_page_loading(){
        this.form = document.querySelector("#registerForm");
        this.register_number_create();

        document.querySelectorAll("#registerForm .formInput").forEach(x=>{
            if(x.type === "text" || x.type === "textarea" || x.type === "number"){
                $(x).on("propertychange change keyup input",e=>{
                    if(e.keyCode === 13) e.preventDefault();
                    this.register_form_check(e.target);
                });
            }else $(x).on("change",e=>{this.register_form_check(e.target)});
        });

        document.querySelector("#registerBtn").addEventListener("click",this.register_send_check);
    }

    register_send_check=e=>{
        e.preventDefault();
        document.querySelectorAll("#registerForm .formInput").forEach(x=>this.register_form_check(x));
        if(document.querySelector("#registerForm .warnning")){
            this.system.make_toast("모든 올바른 값을 입력해주세요!")
            document.querySelectorAll("#registerForm .warnning").forEach(x=>{
                x.classList.remove("warnning");
                setTimeout(()=>{x.classList.add("warnning")},200);
            });
        }else location.href="index.html";
    }

    register_form_check(target){
        let id = target.id;
        let val = target.value;
        let box = target.parentNode.parentNode;

        if(id === "registerComment") box.querySelector("#nowWords").innerHTML = val.length;

        // 전체
        if(val.trim().length < 1) return this.system.form_warnning_msg(box,"값을 입력해주세요!");

        // 창업펀드명
        else if(id === "registerName" && val.match(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+$/g) === null) return this.system.form_warnning_msg(box,"투자자명은 한글, 영문, 띄어쓰기만 입력가능합니다!");

        // 모집금액
        else if(id === "registerMoney" && val.match(/^\d+$/g) === null) return this.system.form_warnning_msg(box,"자연수만 입력할 수 있습니다!");

        // 상세설명
        else if(id === "registerComment" && val.length > 500) return this.system.form_warnning_msg(box,"상세설명은 500자 이내여야 합니다!");

        // 모집기간
        else if(id === "registerDate" && new Date(val) < new Date()) return this.system.form_warnning_msg(box,"현재보다 이전시간은 등록할 수 없습니다!");

        // 이미지
        else if(id === "registerImg" && (target.files[0].size / 1024 / 1024) > 5) return this.system.form_warnning_msg(box,"이미지는 5Mbyte 이하의 파일만 업로드 가능합니다.")
        else if(id === "registerImg" && !(target.files[0].name.match(/\.[a-zA-Z]+/g)[0] === ".png" || target.files[0].name.match(/\.[a-zA-Z]+/g)[0] === ".jpg")) return this.system.form_warnning_msg(box,"이미지는 jpg, png 파일만 업로드 할 수 있습니다.");

        // clear!
        else return this.system.form_success_msg(box);
    }

    register_number_create(){
        let number = "";
        let string = "QWERTYUIOPASDFGHJKLZXCVBNM";
        while(true){
            let flag = true;
            number = string.substr(Math.floor(Math.random()*string.length),1)+Math.random().toString(36).substr(2,3).toUpperCase()+Math.random().toString(10).substr(2,1);
            this.fundList.forEach(x=>{flag = !(x.number == number);});
            if(flag) break;
        }

        let input = this.form.registerNumber;
        input.value = number;
    }
    
}
export default class Login{
    constructor(system){
        this.system = system;
    }

    login_page_loading(){
        document.querySelectorAll("#loginForm .formInput").forEach(x=>{
            $(x).on("propertychange change keyup input",e=>{
                if(e.keyCode && e.keyCode == 13) e.preventDefault();
                this.login_input_check(e.target);
            });
        });

        document.querySelector("#loginBtn").addEventListener("click",this.login_send);
    }
    
    login_send=e=>{
        e.preventDefault();

        document.querySelectorAll("#loginForm .formInput").forEach(x=>{this.login_input_check(x)});
        if(document.querySelector("#loginForm .warnning")) return this.system.make_toast("모든 올바른 값을 입력해주세요.");

        document.querySelector("#loginForm").submit();
    }
    
    login_input_check(target){
        let val = target.value;
        let box = target.parentNode.parentNode;

        if(val.trim().length < 1) return this.system.form_warnning_msg(box,"값을 입력해주세요!");
        else this.system.form_success_msg(box);
    }
}
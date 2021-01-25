import view from './view.js';
import main from './main.js';
import join from './join.js';
import register from './register.js';
import user from './user.js';
import login from './login.js';
import investor from './investor.js';
import system from './system.js';

class App{
    constructor(path){
        this.view = null;
        this.main = null;
        this.join = null;
        this.register = null;
        this.investor = null;
        this.user = null;
        this.login = null;

        this.user_number = null;

        this.system = null;
        this.loginAccess = document.querySelector("#userArea").dataset.status !== "guest";
        
        this.path = path;
        this.fundList = [];

        this.setting();
    }

    router(){
        switch(this.path){
            case "index":
                this.main.main_page_loading();
                break;
            
            case "view":
                this.view.view_page_loading();
                break;
            
            case "join":
                this.join.join_page_loading();
                break;
            
            case "register":
                this.register.register_page_loading();
                break;

            case "investor":
                this.investor.investor_page_loading();
                break;

            case "login":
                this.login.login_page_loading();
                break;

            case "user":
                this.user.user_page_loading(this.user_number);
                break;
            
            case "admin":
                this.admin_page_loading();
                break;
        }
    }

    async setting(){

        let list = [];

        await $.ajax({
            url:"/fundListLoad",
            method:"post",
            success(data){
                list = JSON.parse(data);
            }
        });

        this.fundList = list;

        this.system = new system(this,this.fundList);
        this.investor = new investor(this.fundList, this.system,this);
        this.view = new view(this.fundList,this.system,this.loginAccess);
        this.main = new main(this.fundList,this.system);
        this.join = new join(this.fundList,this.system);
        this.user = new user(this.system);
        this.login = new login(this.system);
        this.register = new register(this.fundList,this.system);

        this.router();
        document.querySelectorAll(".navLink").forEach(x=>{
            x.addEventListener("click",this.loadPage);
        });
    }

    loadPage=e=>{
        this.path = e.target.dataset.link;

        if(this.path === "user") this.user_number = e.target.dataset.id;
        else this.user_number = null;

        if(!this.loginAccess && this.path === "register") return alert("로그인 후 이용가능합니다!");
        $("#visualAddContent").css("opacity",0);
        setTimeout(()=>{
            $("#visualAddContentBc").load(this.path+" #visualAddContent",()=>{
                $("#visualAddContent").css("opacity",0);
                setTimeout(()=>{$("#visualAddContent").css("opacity",1)},100);
                this.router();
            });
        },600);
    }

    admin_page_loading(){
        document.querySelectorAll(".adminFundClose").forEach(x=>{
            x.addEventListener("click",e=>{
                let target = e.target;
                let box = e.target.parentNode;
                $.ajax({
                    url:"/adminFundClose",
                    method:"post",
                    data:{id:target.dataset.id},
                    success(){
                        document.querySelector("#adminFundList").removeChild(box);
                    }
                });
            });
        });
    }
    
}

window.onload = () =>{
    let now_page = document.location.href.split("/");
    now_page = now_page[now_page.length-1] === "" ? "index" : now_page[now_page.length-1];
    let app = new App(now_page);
}
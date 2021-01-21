import view from './view.js';
import main from './main.js';
import join from './join.js';
import register from './register.js';
import investor from './investor.js';
import system from './system.js';

class App{
    constructor(path){
        this.view = null;
        this.main = null;
        this.join = null;
        this.register = null;
        this.investor = null;
        this.system = null;
        
        this.path = path;
        this.fundList = [];

        fetch("resource/js/fund.json")
        .then(res => res.json())
        .then(data => this.setting(data))
    }

    router(){
        switch(this.path){
            case "index.html":
                this.main.main_page_loading();
                break;
            
            case "view.html":
                this.view.view_page_loading();
                break;
            
            case "join.html":
                this.join.join_page_loading();
                break;
            
            case "register.html":
                this.register.register_page_loading();
                break;

            case "investor.html":
                this.investor.investor_page_loding();
                break;
        }
    }

    setting(data){
        data.forEach((x,idx)=>{
            x.achieve = x.current / (x.total/100);
            x.idx = idx;
            x.photo = `resource/images/fundViewImg${idx+1}.jpg`;
        });

        this.fundList = data;

        this.system = new system(this.fundList);
        this.investor = new investor(this.fundList, this.system);
        this.view = new view(this.fundList,this.system);
        this.main = new main(this.fundList,this.system);
        this.join = new join(this.fundList,this.system);
        this.register = new register(this.fundList,this.system);

        this.router();
        document.querySelectorAll(".navLink").forEach(x=>{
            x.addEventListener("click",this.loadPage);
        });
    }

    loadPage=e=>{
        this.path = e.target.dataset.link;
        $("#visualAddContent").css("opacity",0);
        setTimeout(()=>{
            $("#visualAddContentBc").load(this.path+" #visualAddContent",()=>{
                $("#visualAddContent").css("opacity",0);
                setTimeout(()=>{$("#visualAddContent").css("opacity",1)},100);
                this.router();
            });
        },600);
    }
    
}

window.onload = () =>{
    let now_page = document.location.href.match(/[a-zA-Z]+.html/g) === null ? "index.html" : document.location.href.match(/[a-zA-Z]+.html/g)[0];
    let app = new App(now_page);
}
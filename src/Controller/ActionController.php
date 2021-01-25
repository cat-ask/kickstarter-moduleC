<?php

namespace Controller;

use App\DB;

class ActionController{
    function DBReset(){
        extract($_POST);
        $pass = hash("sha256",$loginPassword);
        $sql = "INSERT INTO user(`user_email`,`user_name`,`password`,`type`) VALUES(?,?,?,?)";
        DB::query($sql,[$joinEmail,$joinName,$pass]);
    }

    function viewBusiness(){
        extract($_POST);

        $fund = DB::find("funds",$id);

        $sql = "UPDATE funds SET `status`=? WHERE id = ?";
        DB::query($sql,["business",$id]);

        $owner = DB::find("user",$fund->owner);
        $owner_money = (int)$owner->money + (int)$fund->current;
        DB::query("UPDATE user SET `money` = ? WHERE id = ?",[$owner_money,$fund->owner]);

        echo json_encode(true);
    }

    function adminFundClose(){
        extract($_POST);

        $fund = DB::find("funds",$id);
        $owner = DB::find("user",$fund->owner);
        $money = (int)$owner->money - (int)$fund->current;

        $sql = "UPDATE user SET `money` = ? WHERE id = ?";
        DB::query($sql,[$money,$owner->id]);

        $sql = "SELECT * FROM investors WHERE fund_id = ?";
        $investorList = DB::fetchAll($sql,[$id]);

        foreach($investorList as $in){
            $investor = DB::who($in->email);
            $investor_money = (int)$investor->money + (int)$in->pay; 
            $sql = "UPDATE user SET `money` = ? WHERE id = ?";
            DB::query($sql,[$investor_money,$investor->id]);
            $sql = "DELETE FROM investors WHERE id = ?";
            DB::query($sql,[$in->id]);
        }

        $sql = "DELETE FROM funds WHERE id = ?";
        DB::query($sql,[$id]);
    }

    function investorsAdd(){
        extract($_POST);
        if((int)user()->money < $viewMoney) go("/view","잔액이 부족합니다.");

        $sql = "INSERT INTO investors(`email`,`investor_name`,`pay`,`datetime`,`fund_id`,`user_id`,`sign`) VALUES(?,?,?,?,?,?,?)";
        DB::query($sql,[user()->user_email,$viewUser,$viewMoney,date('Y-m-d H:i:s'),$viewFundId,user()->id,$viewSign]);

        $fund = DB::find("funds",$viewFundId);
        $current = (int)$fund->current + (int)$viewMoney;
        $achieve = $current / ((int)$fund->total / 100);
        DB::query("UPDATE funds SET `current` = ?, `achieve` = ? WHERE id = ?",[$current,$achieve,$viewFundId]);

        $money = (int)user()->money - (int)$viewMoney;
        DB::query("UPDATE user SET `money` = ? WHERE id = ?",[$money,user()->id]);

        go("/view","투자가 정상적으로 완료되었습니다.");
    }

    function userPageList(){
        extract($_POST);
        $user = DB::find("user",$id);

        $sql = "SELECT DISTINCT F.name, F.achieve FROM funds AS F WHERE F.owner = ?";
        $user_register_fundList = DB::fetchAll($sql,[$id]);
    
        $sql = "SELECT DISTINCT F.name, F.achieve FROM funds AS F, investors AS I WHERE I.fund_id = F.id AND I.email = ?";
        $user_fundList = DB::fetchAll($sql,[$user->user_email]);
    
        $sql = "SELECT DISTINCT F.name, F.content FROM funds AS F, investors AS I WHERE (I.fund_id = F.id AND I.email = ? AND F.status = ?) OR (F.owner = ? AND F.status = ?)";
        $user_end_fundList = DB::fetchAll($sql,[$user->user_email,"business",$user->id,"business"]);
    
        echo json_encode(compact("user","user_register_fundList","user_fundList","user_end_fundList"));
    }

    function fundDelete(){
        extract($_POST);
        
        $result = false;
        $fund = DB::find("funds",$id);
        $owner = DB::find("user",$fund->owner);

        $sql = "SELECT * FROM investors WHERE fund_id = ?";
        $investorList = DB::fetchAll($sql,[$id]);

        foreach($investorList as $in){
            $investor = DB::who($in->email);
            $investor_money = (int)$investor->money + (int)$in->pay; 
            $sql = "UPDATE user SET `money` = ? WHERE id = ?";
            DB::query($sql,[$investor_money,$investor->id]);
            $sql = "DELETE FROM investors WHERE id = ?";
            DB::query($sql,[$in->id]);
        }

        $sql = "DELETE FROM funds WHERE id = ?";
        DB::query($sql,[$id]);
        $result = true;
        
        echo json_encode($result);
    }

    function fundListLoad(){
        $sql = "SELECT F.*, U.user_email, U.id AS `user_id` FROM funds AS F, user AS U WHERE F.owner = U.id";
        $result = DB::fetchAll($sql);

        $sql = "SELECT * FROM investors WHERE fund_id = ?";
        $now = strtotime(date("Y-m-d H:i:s"));

        $idx = 0;
        foreach($result as $fund){
            $fundDate = strtotime($fund->endDate);
            
            if($fundDate < $now && $fund->status === "prograssing" && $fund->status !== "business"){
                if((int)$fund->total > (int)$fund->current && $fund->status !== "failed") $status = "failed";
                if((int)$fund->total <= (int)$fund->current) $status = "end";

                $fund->status = $status;
                DB::query("UPDATE funds SET `status` = ? WHERE id = ?",[$status,$fund->id]);
            }

            $fund->idx = $idx;
            $fund->total = (int)$fund->total;
            $fund->current = (float)$fund->current;
            $fund->achieve = (float)$fund->achieve;
            $fund->photo = "uploads/".(preg_replace('/\"/','',$fund->photo));
            $fund->owner = $fund->user_email;
            $list = DB::fetchAll($sql,[$fund->id]);
            $fund->investorList = $list;

            $idx++;
        }

        echo json_encode($result);
    }

    function register(){
        extract($_POST);
        
        $files = $_FILES['registerImg'];
        $name = $files['name'];
        $tmp_name = $files['tmp_name'];
        $fileName = time().extname($name);

        move_uploaded_file($tmp_name,UPLOAD."/$fileName");
        $fileName = json_encode($fileName);

        $sql = "INSERT INTO funds(`number`,`name`,`endDate`,`owner`,`total`,`content`,`photo`) VALUES(?,?,?,?,?,?,?)";

        DB::query($sql,[$registerNumber,$registerName,$registerDate,user()->id,$registerMoney,$registerComment,$fileName]);

        go("/","펀드가 등록되었습니다.");
    }
    
    function join(){
        extract($_POST);

        $pass = hash("sha256",$joinPassword);
        
        if(DB::who($joinEmail)) back("이미 있는 사용자입니다.");

        $sql = "INSERT INTO user(`user_email`,`user_name`,`password`) VALUES(?,?,?)";
        DB::query($sql,[$joinEmail,$joinName,$pass]);
        go("/login","회원가입이 완료되었습니다.");
    }

    function login(){
        extract($_POST);

        $pass = hash("sha256",$loginPassword);

        $sql = "SELECT * FROM user WHERE `user_email` = ? AND `password` = ?";
        $user = DB::fetch($sql,[$loginEmail,$pass]);

        if(!$user) go("/login","아이디또는 비밀번호가 틀렸습니다.");

        $_SESSION['user'] = $user;
        go("/","로그인에 성공했습니다.");
    }

    function logout(){
        session_destroy();
        go("/","로그아웃 되었습니다.");
    }
}
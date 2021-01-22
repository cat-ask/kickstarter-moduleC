<?php

use App\DB;

function user_page_list($id){
    $sql = "SELECT F.name, F.achieve FROM funds AS F WHERE F.owner = ?";
    $user_register_fundList = DB::fetchAll($sql,[$id]);
    
    $sql = "SELECT F.name, F.achieve FROM funds AS F, investors AS I WHERE I.fund_id = F.id AND I.email = ?";
    $user = DB::find("user",$id);
    $user_fundList = DB::fetchAll($sql,[$user->user_email]);
    
    $sql = "SELECT F.name, F.content FROM funds AS F, investors AS I WHERE I.fund_id = F.id AND I.id = ? AND F.status = ?";
    $user_end_fundList = DB::fetchAll($sql,[$id,"business"]);

    return compact("user_register_fundList","user_fundList","user_end_fundList");
}

function user(){
    if(isset($_SESSION['user'])){
        $user = DB::find("user",$_SESSION['user']->id);

        if(!$user) go("/logout","회원 정보를 찾을 수 없어 로그아웃 되었습니다.");

        $_SESSION['user'] = $user;
        return $_SESSION['user'];
    }else return false;
    exit;
}

function admin(){
    user() && user()->type == "company";
}

function go($url,$msg=""){
    echo "<script>";
    echo "alert('$msg');";
    echo "location.href = '$url';";
    echo "</script>";
    exit;
}

function back($msg=""){
    echo "<script>";
    echo "alert('$msg');";
    echo "history.back();";
    echo "</script>";
    exit;
}

function view($viewName,$data=[]){
    extract($data);
    include_once VIEW."/header.php";
    include_once VIEW."/$viewName.php";
    include_once VIEW."/footer.php";
    exit;
}

function locale_string($money){
    $result = "";
    $str = strlen($money);

    while($str > 3){
        $result = ",".substr($money,$str-3,3).$result;
        $money = substr($money,0,$str-3);
        $str = strlen($money);
    }

    $result = $money.$result;
    
    return $result;
}

function checkEmpty(){
    foreach($_POST as $input) if(!is_array($input)&&trim($input)==="") back("모든 정보를 입력해 주세요!");
}

function extname($filename){
    return strtolower(substr($filename,strrpos($filename,".")));
}

function isImg($filename){
    return in_array(extname($filename),[".jpg",".png"]);
}

function enc($output){
    return nl2br(str_replace(" ","&nbsp;",htmlentities($out)));
}

function json_response($data){
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
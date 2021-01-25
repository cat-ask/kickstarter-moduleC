<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>킥스타터</title>
    
    <link rel="stylesheet" href="resource/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="resource/css/style.css">

    <script src="resource/js/jquery-3.4.1.js"></script>
</head>
<body>
    <div id="wrap">
        <!-- header -->
        <header>
            <input type="checkbox" name="menuOpen" id="menuOpenInput">
            <div id="logo">
                <a href="/">
                    <img src="resource/images/Logo.png" alt="Logo" title="Logo">
                </a>
            </div>
            
            <nav>
                <ul>
                    <li><a class="navLink" data-link="index">메인 페이지</a></li>
                    <li><a class="navLink" data-link="register">펀드등록</a></li>
                    <li><a class="navLink" data-link="view">펀드보기</a></li>
                    <li><a class="navLink" data-link="investor">투자자목록</a></li>
                </ul>
            </nav>

            <?php if(user()):?>
            <div id="userArea" data-status="user">
                <span id="userMoney" data-money="<?=user()->money?>">잔액 : <?=number_format(user()->money)?></span>
                <a class="navLink" id="user_id" data-link="<?=user()->type?>" data-id="<?=user()->id?>"><?=user()->user_name?></a>
                <a class="navLink" data-link="logout" href="/logout">로그아웃</a>
            </div>
            <?php else:?>
            <div id="userArea" data-status="guest">
                <a class="navLink" data-link="login">로그인</a>
                <a class="navLink" data-link="join">회원가입</a>
            </div>
            <?php endif;?>

            <label for="menuOpenInput" id="menuOpen">
                <i class="fa fa-navicon"></i>
            </label>
        </header>
        <!-- /header -->

        <div id="visualAddContentBc">
            <div id="visualAddContent">
                <!-- visual -->
            <div id="visual">
                <img src="resource/images/visual.jpg" alt="visual" title="visual">
                <div id="visualMsg">
                    <h4>세계가 당신의 제품을 기다립니다!</h4>
                    <h6>킥스타터와 함께 미래를 만들어보세요</h6>
                    <button id="visualBtn">킥스타터 서비스 자세히 보기</button>
                </div>
            </div>
            <!-- /visual -->
    
            <!-- content -->
            <div id="contentBc">
                <div id="content">
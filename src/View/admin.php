<?php
    $info = admin_page_list();
    $user_num = $info["user_num"];
    $user_money = $info["user_money"];
    $fundAchieve = $info["fundAchieve"];
    $fundPrograssing = $info["fundPrograssing"];
    $fundFailed = $info["fundFailed"];
    $fundBusiness = $info["fundBusiness"];
    $fund_list = $info["fund_list"];
    $fund_business_list = $info["fund_business_list"];
?>
<!-- admin -->
<div class="contentTitleBox">
    <i class="fa fa-user gold contentTitleIcon"></i>
    <h4 class="contentTitle">관리자 메뉴</h4>
    <p class="contentSubTitle">오신것을 환영합니다, 관리자님</p>
</div>

<div class="contentBox" id="userPage">
    <div id="userInfoBox">
        <h5>현재 회원수 : <?=number_format($user_num)?>명</h5>
        <p>회원별 평균 소지금액 : <?=number_format($user_money)?>원</p>
        <p>펀드별 평균 달성율 : <?=number_format($fundAchieve)?>%</p>
        <p>모집완료된 펀드 수 : <?=number_format($fundBusiness)?>개</p>
        <p>기한이 만료된 펀드 수 : <?=number_format($fundFailed)?>개</p>
        <p>모집중인 펀드 수 : <?=number_format($fundPrograssing)?>개</p>
    </div>

    <div id="userFunds">
        <div class="userFundBox">
            <h5 class="userFundBoxTitle">모집된 펀드</h5>
            <div class="userFundList" id="adminFundList">
                <?php if(count($fund_list)):?>
                <?php foreach($fund_list as $fund):?>
                <div class="userFundListBox">
                    <h6 class="userFundListBoxTitle"><?=$fund->name?></h6>
                    <div class="userFundListBoxAcheive">
                        <span class="userFundCate">모집률</span>
                        <div class="userFundPrograssBox"><div class="userFundPrograssBar" style="width:<?=$fund->achieve?>%;"></div></div>
                        <span><?=$fund->achieve?>%</span>
                    </div>
                    <button class="adminFundClose" data-id="<?=$fund->id?>">해제</button>
                </div>
                <?php endforeach;?>
                <?php else:?>
                <div class="userFundListBoxNone"></div>
                <?php endif;?>
            </div>

            <div class="fundBoxBorder" style="z-index:1">
                <div class="Top Left"></div>
                <div class="Top Right"></div>
                <div class="Bottom Left"></div>
                <div class="Bottom Right"></div>
            </div>
        </div>

        <div class="userFundBox">
            <h5 class="userFundBoxTitle">진행중인 사업리스트</h5>
            <div class="userFundList" id="userFundEndList">
                <?php if(count($fund_business_list)):?>
                <?php foreach($fund_business_list as $fund):?>
                <div class="userFundListBox">
                    <h6 class="userFundListBoxTitle"><?=$fund->name?></h6>
                    <div class="userFundListBoxComment">
                        <span class="userFundCate">상세설명</span>
                        <p><?=$fund->content?></p>
                    </div>
                </div>
                <?php endforeach;?>
                <?php else:?>
                <div class="userFundListBoxNone"></div>
                <?php endif;?>
            </div>
            <div class="fundBoxBorder">
                <div class="Top Left"></div>
                <div class="Top Right"></div>
                <div class="Bottom Left"></div>
                <div class="Bottom Right"></div>
            </div>
        </div>
    </div>
</div>
<!-- /admin -->

<?php
    if(user()->type === "user"){
        $list = user_page_list(user()->id);
        $user_register_list = $list["user_register_fundList"];
        $user_fund_list = $list["user_fundList"];
        $user_end_list = $list["user_end_fundList"];
    }
?>

<!-- user -->
<div class="contentTitleBox">
    <i class="fa fa-user gold contentTitleIcon"></i>
    <h4 class="contentTitle">프로필 페이지</h4>
    <p class="contentSubTitle"><?=user()->user_name?>님의 프로필입니다!</p>
</div>

<div class="contentBox" id="userPage">
    <div id="userInfoBox">
        <h5 id="userInfoEmail">Email : <?=user()->user_email?></h5>
        <p id="userInfoName">이름 : <?=user()->user_name?></p>
        <p id="userInfoMoney">보유금액 : <?=locale_string(user()->money)?>원</p>
    </div>

    <div id="userFunds">
        <div class="userFundBox">
            <h5 class="userFundBoxTitle">현재 등록한 펀드</h5>
            <div class="userFundList" id="userRegisterFundList">
                <?php if(count($user_register_list)):?>
                <?php foreach($user_register_list as $fund):?>
                <div class="userFundListBox">
                    <h6 class="userFundListBoxTitle"><?=$fund->name?></h6>
                    <div class="userFundListBoxAcheive">
                        <span class="userFundCate">모집률</span>
                        <div class="userFundPrograssBox"><div class="userFundPrograssBar" style="width:<?=$fund->achieve?>%;"></div></div>
                        <span><?=$fund->achieve?>%</span>
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

        <div class="userFundBox">
            <h5 class="userFundBoxTitle">현재 투자한 펀드</h5>
            <div class="userFundList" id="userFundList">
                <?php if(count($user_fund_list)):?>
                <?php foreach($user_fund_list as $fund):?>
                <div class="userFundListBox">
                    <h6 class="userFundListBoxTitle"><?=$fund->name?></h6>
                    <div class="userFundListBoxAcheive">
                        <span class="userFundCate">모집률</span>
                        <div class="userFundPrograssBox"><div class="userFundPrograssBar" style="width:<?=$fund->achieve?>%;"></div></div>
                        <span><?=$fund->achieve?>%</span>
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

        <div class="userFundBox">
            <h5 class="userFundBoxTitle">현재 모집 완료된 펀드</h5>
            <div class="userFundList" id="userFundEndList">
                <?php if(count($user_end_list)):?>
                <?php foreach($user_end_list as $fund):?>
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
<!-- /user -->
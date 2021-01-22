<!-- join -->
<div class="contentTitleBox">
                        <i class="fa fa-sign-in gold contentTitleIcon"></i>
                        <h4 class="contentTitle">로그인</h4>
                        <p class="contentSubTitle">어서오세요! 로그인 후 다양한 서비스를 즐길 수 있습니다!</p>
                    </div>
     
                    <div class="contentBox" id="loginBox">
                        <form id="loginForm" action="/login" method="post">
                            <div class="formGroup">
                                <label for="loginEmail" class="formLabel">이메일</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="email" class="formInput" name="loginEmail" id="loginEmail" placeholder="이메일">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="loginPassword" class="formLabel">비밀번호</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="password" class="formInput" name="loginPassword" id="loginPassword" placeholder="비밀번호">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <button id="loginBtn" class="formBtn">로그인</button>
                        </form>
                    </div>
                    <!-- /join -->
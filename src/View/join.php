<!-- join -->
<div class="contentTitleBox">
                        <i class="fa fa-user blue contentTitleIcon"></i>
                        <h4 class="contentTitle">회원가입</h4>
                        <p class="contentSubTitle">환영합니다! 킥스타터에 가입하고 다양한 서비스를 만나보세요.</p>
                    </div>
     
                    <div class="contentBox" id="joinBox">
                        <form id="joinForm" method="post" action="\join">
                            <p class="formWarnningMsg" id="TopformWarnningMsg"></p>
                            <div class="formGroup">
                                <label for="joinEmail" class="formLabel">이메일</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="email" class="formInput" name="joinEmail" id="joinEmail" placeholder="이메일">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="joinName" class="formLabel">이름</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" class="formInput" name="joinName" id="joinName" placeholder="이름">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="joinPassword" class="formLabel">비밀번호</label>
                                <p class="formCondition">비밀번호는 영문, 특수문자, 숫자를 모두 포함해야 합니다.</p>
                                <div class="formInputBox">
                                    <input type="password" class="formInput" name="joinPassword" id="joinPassword" placeholder="비밀번호">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="joinPasswordCheck" class="formLabel">비밀번호 확인</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="password" class="formInput" name="joinPasswordCh" id="joinPasswordCh" placeholder="비밀번호 확인">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <button id="joinBtn" class="formBtn">회원가입</button>
                        </form>
                    </div>
                    <!-- /join -->
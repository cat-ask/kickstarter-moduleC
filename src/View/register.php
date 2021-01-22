                    <!-- Register -->
                    <div class="contentTitleBox">
                        <i class="fa fa-plus green contentTitleIcon"></i>
                        <h4 class="contentTitle">펀드 등록</h4>
                        <p class="contentSubTitle">누구나 펀드를 등록할 수 있습니다!</p>
                    </div>
    
                    <div class="contentBox" id="fundRegister">
                        <form id="registerForm" method="post" action="/register" enctype="multipart/form-data">
                            <div class="formGroup">
                                <label for="registerNumber" class="formLabel">펀드번호</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" id="registerNumber" name="registerNumber" class="formInput success" readonly>
                                    <i class="fa fa-check formInputIcon success"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="registerName" class="formLabel">창업펀드명</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="text" id="registerName" name="registerName" class="formInput">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="registerDate" class="formLabel">모집마감일</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="datetime-local" id="registerDate" name="registerDate" class="formInput" step="1">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="registerMoney" class="formLabel">모집금액</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="number" id="registerMoney" name="registerMoney" class="formInput">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="registerComment" class="formLabel">상세설명</label>
                                <p class="formCondition"><span id="nowWords">0</span> / 500</p>
                                <div class="formInputBox">
                                    <textarea name="registerComment" id="registerComment" class="formInput" cols="30" rows="10"></textarea>
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
                            <div class="formGroup">
                                <label for="registerImg" class="formLabel">펀드이미지</label>
                                <p class="formCondition"></p>
                                <div class="formInputBox">
                                    <input type="file" id="registerImg" name="registerImg" class="formInput">
                                    <i class="fa fa-check formInputIcon"></i>
                                </div>
                                <p class="formWarnningMsg"></p>
                            </div>
    
                            <button id="registerBtn" class="formBtn">등록</button>
                        </form>
                    </div>
                    <!-- /Register -->
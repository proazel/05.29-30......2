const init = ()=>{
    let userid = document.querySelector('.userid');
    let userpw = document.querySelector('.userpw');
    let userpw_check = document.querySelector('.userpw_check');
    let username = document.querySelector('.username');

    let userid_msg = document.querySelector('.userid_msg');
    let userpw_msg = document.querySelector('.userpw_msg');
    let error_msg = document.querySelector('.error_msg');

    let join_form = document.querySelector('#join_form');
    let join_submit = document.querySelector('.join_submit');

    // 아이디 중복 여부 확인
    async function userid_check(){
        let ag = await axios.get(`http://localhost:3000/board/userid_check?userid=${userid.value}`);
        login_flag = ag.data.login;
        if (login_flag){
            userid_msg.innerHTML = '아이디 사용 가능';
            userid_msg.style.color = '#f7b10a';
        } else{
            userid_msg.innerHTML = '아이디 사용 불가';
            userid_msg.style.color = 'red';
        }
    }
    userid.addEventListener('focusout',userid_check);

    // 비밀번호 사용 가능 여부 확인 
    function password_check(){
        return userpw.value == userpw_check.value;
    }
    userpw_check.addEventListener('focusout',()=>{
        let result = password_check();
        if (result){
            userpw_msg.innerHTML = '비밀번호 사용 가능';
            userpw_msg.style.color = '#f7b10a';
        } else{
            userpw_msg.innerHTML = '비밀번호 사용 불가';
            userpw_msg.style.color = 'red';
            userpw.value = '';
            userpw_check.value = '';
            userpw.focus();
        }
    });

    // 회원가입 정보 submit
    join_submit.addEventListener('click',()=>{
        if (userid.value=='' || userpw.value=='' || userpw_check.value=='' || username.value==''){
            error_msg.innerHTML = '아이디, 비밀번호, 이름은 필수 입력 사항입니다!';
            return;
        } else{
            error_msg.innerHTML = '';
        }
        join_form.submit();
    })
}
window.addEventListener('DOMContentLoaded',init);
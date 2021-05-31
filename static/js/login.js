const init = ()=>{
    let login_form = document.querySelector('#login_form')
    let login_submit = document.querySelector('.login_submit')

    login_submit.addEventListener('click',()=>{
        login_form.submit()
    })
}
window.addEventListener('DOMContentLoaded',init);
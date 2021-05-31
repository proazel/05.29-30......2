const{sequelize, User, Schedule} = require('../../models');

let join = (req,res)=>{
    res.render('./board/join');
}

let join_success = async (req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;

    console.log(userid, userpw, username);

    await User.create({
        userid:userid,
        userpw:userpw,
        username:username
    })
    res.render('./board/join_success',{ userid, username });
}

let userid_check = async (req,res)=>{
    let userid = req.query.userid;
    let check = false;
    let result = await User.findOne({
        where:{ userid }
    })
    if (result == undefined){
        check = true;
    } else{
        check = false;
    }
    res.json({
        login: check,
        userid,
    })
}

let login = (req, res)=>{
    flag = req.query.flag;
    res.render('./board/login',{flag});
}

let login_check = async(req,res)=>{ 
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    let result = await User.findOne({
        where: { userid, userpw }
    });
    
    if (result == null) {
        res.redirect('/board/login?flag=0');
    } else {
        req.session.uid = userid;
        req.session.isLogin = true;
        req.session.save(() => {
            res.redirect('./login_success');
        })
    }
}

let login_success = (req, res)=>{
    userid = req.session.uid;
    isLogin = req.session.isLogin;

    res.render('./board/login_success',{
        userid: userid,
        isLogin: isLogin
    })
}

let logout = (req,res)=>{
    delete req.session.uid;
    delete req.session.isLogin;

    req.session.save(()=>{
        res.redirect('/');
    })
}

let info_delete = async(req,res)=>{ 

    console.log('aaa');

    uid = req.session.uid;

    let result = await User.findOne({
        where:{ userid : uid }
    })

    userid = result.dataValues.userid;
    userpw = result.dataValues.userpw;
    username = result.dataValues.username;

    await User.destroy({
        where: { userid, userpw, username}
    })
    
    res.redirect('/');
}

module.exports = {
    join,
    join_success,
    userid_check,
    login,
    login_check,
    login_success,
    logout,
    info_delete
}
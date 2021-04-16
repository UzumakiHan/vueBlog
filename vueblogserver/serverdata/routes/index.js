var express = require('express');
var router = express.Router();
const connection = require('.././db/db')

const md5 = require('md5')
const multiparty = require('multiparty');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//查询数据
router.post("/findid", (req, res) => {
  let id = req.body.id;
  console.log(id)
  const sqlStr = "SELECT * FROM blog WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      // results = JSON.parse(JSON.stringify(results));
      console.log(results);
      //  for(var i = 0;i < results.length;i++){
      //    console.log(results[i])
      //  }
      res.json({ success_code: 200, message: results });

    }
  })
})


//注册
router.post('/register', (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  // console.log(username,password);
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, fields) => {
    if (results[0]) {//用户已经存在
      res.json({ err_code: 0, message: "用户名已经存在" })
    } else {
      const addSql = "INSERT INTO user (username, password) VALUES (?, ?)";
      const addSqlParams = [username, password];
      connection.query(addSql, addSqlParams, (error, results, fields) => {
        if (error) {
          res.json({ err_code: 0, message: "注册失败" })
        } else {
          res.json({ success_code: 200, message: "注册成功", userinfo: results[0] })
        }
      })
    }
  })
})
//登录
router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  //console.log(username)
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, fields) => {
    results = JSON.parse(JSON.stringify(results));
    console.log(results);
    // if(results === []){
    //   res.json({err_code: 404, message: '用户名不正确!'});
    // }else{
    //   results = JSON.parse(JSON.stringify(results));
    //   //console.log(results);
    //   if(results[0]){//用户存在
    //     if(results[0].password !== password){
    //       res.json({err_code: 0, message: '密码不正确!'});
    //     }else{
    //       res.json({success_code:200,message:{username:results[0].username,password:results[0].password},tip:"登录成功"})
    //     }
    //   }
    // }
    results = JSON.parse(JSON.stringify(results));
    if (results[0]) {
      if (results[0].password !== password) {
        res.json({ err_code: 0, message: '密码不正确!' });
      } else {
        res.json({ success_code: 200, message: { username: results[0].username, password: results[0].password }, tip: "登录成功" })
      }
    } else {
      res.json({ err_code: 404, message: '用户名不正确!' });
    }

  })
})


//文章发布
router.post('/release', (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let label = req.body.label;
  let mold = req.body.mold;
  let currentime = req.body.currentime;
  let author = req.body.author;
  let image = req.body.image;
  console.log(title, content, label, mold, currentime, author,image);
  const sqlStr = "INSERT INTO blog(content,title,mold,label,currentime,author,image) VALUES (?,?,?,?,?,?,?)";
  const addSqlParams = [content, title, mold, label, currentime, author,image];
  connection.query(sqlStr, addSqlParams, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "发布文章失败" });
    } else {
      console.log(results);
      res.json({ success_code: 200, message: "发布文章成功" });
    }
  })

})


//获取所有文章信息

router.get('/getallcontent', (req, res) => {
  const array = [];
  const sqlStr = 'SELECT * FROM blog ';
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {

      results = JSON.parse(JSON.stringify(results));
      // console.log(results);
      for (var i = 0; i < results.length; i++) {
        array.push(new Buffer(results[i].content.data).toString());
      }
      // console.log(array);
      res.json({ success_code: 200, message: results, array });

    }
  })
})


//获取个人文章信息
router.post('/getowncontent', (req, res) => {
  let author = req.body.author;
  console.log(author);
  const array = [];
  const sqlStr = "SELECT * FROM blog WHERE author = '" + author + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {

      results = JSON.parse(JSON.stringify(results));
      // console.log(results);
      for (var i = 0; i < results.length; i++) {
        array.push(new Buffer(results[i].content.data).toString());
      }
      // console.log(array);
      res.json({ success_code: 200, message: results, array });

    }
  })
})

//修改个人资料
router.post('/modifyingdata', (req, res) => {
  let username = req.body.username;
  let birthday = req.body.birthday;
  let location = req.body.location;
  let information = req.body.information;
  let realname = req.body.realname;
  let job = req.body.job;
  let sex = req.body.sex;
  console.log(username, birthday, location, information, realname, job, sex);


  const sqlStr = "UPDATE user SET birthday = '" + birthday + "', location = '" + location + "',information = '" + information + "', realname = '" + realname + "',job = '" + job + "',sex = '" + sex + "' WHERE username = '" + username + "' ";
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:"修改资料失败"});
    }else{
      console.log(results);
      res.json({success_code:200,tip:"修改成功",message:results});
    }
  })
})

//获取个人信息；
router.post('/getinfo',(req,res)=>{
 const username = req.body.username;
  console.log(username);
  const sqlStr =  "SELECT * FROM user WHERE username = '" + username + "' ";
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:"获取数据失败"})
    }else{
      res.json({success_code:200,message:results})
      //console.log(results);
    }
  })
})
//图片上传

router.post('/submitImage',(req,res)=>{
  var form = new multiparty.Form();
  form.uploadDir='upload';
  form.parse(req,function(err,fields,files){
    console.log(fields);
    console.log(files);
    var username = fields.username[0];
    console.log(username);
    var pic=files.pic[0].path;
    var picture = pic.replace(/\\/g,"/");
    // pic=pic.replaceAll("\\\\", "\\\\\\\\");
    console.log(pic);
    console.log(picture)

    const sqlStr = "UPDATE user SET image = '" + 'http://localhost:4000/'+picture + "'  WHERE username = '" + username + "'";
    const otherSqlStr = "UPDATE blog SET image = '" + 'http://localhost:4000/'+picture + "'  WHERE author = '" + username + "'";
    connection.query(sqlStr,(error,results,fields)=>{
      if(error){
        console.log(error);
        res.json({err_code:0,message:"上传失败"})
      }else{
        results = JSON.parse(JSON.stringify(results));
      //  console.log(results);
        //res.json({success_code:200,message:'上传成功',image:results})
       res.redirect('http://localhost:4000/setting');
      }
    });
    connection.query(otherSqlStr,(error,results,fields)=>{
      if(error){
        console.log(error);
        // res.json({err_code:0,message:"上传失败"})
      }else{
        results = JSON.parse(JSON.stringify(results));
        console.log(results);
        // res.json({success_code:200,message:'上传成功',image:results})
      }
    })


  })
  

})

//获取图片
router.post('/getimage',(req,res)=>{
  const username = req.body.username;
  console.log(username);
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr,(error,results,files)=>{
    if(error){
      console.log(error);
      res.json({success_code:0,message:'获取失败'})
    }else{
      results = JSON.parse(JSON.stringify(results[0]));
      // console.log(results);
      res.json({success_code:200,message:results})
    }
  })
})


//删除文章
router.post('/delarticle',(req,res)=>{
  const id = req.body.id;
  console.log(id);
  const sqlStr = "DELETE FROM blog WHERE id = '" + id + "'";
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:"删除失败"});
    }else{
      res.json({success_code:200,message:"删除文章成功"})
    }
  })
})
//编辑文章
router.post('/editarticle',(req,res)=>{
  let id = req.body.id;
  let title = req.body.title;
  let content = req.body.content;
  let label = req.body.label;
  let mold = req.body.mold;
  let currentime = req.body.currentime;
  console.log(id,title, content, label, mold, currentime);
  const sqlStr = "UPDATE blog SET title =  '" + title + "',content =  '" + content + "',label =  '" + label + "',mold =  '" + mold + "',currentime =  '" + currentime + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:"修改失败"});
    }else{
      res.json({success_code:200,message:"修改成功"})
    }
  })
})


//修改密码接口
router.post('/changepassword',(req,res)=>{
  const id = req.body.id;
  const changepassword = md5(req.body.changepassword);
  console.log(id,changepassword);
  const sqlStr = "UPDATE user SET password = '" + changepassword + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:"修改密码失败"});
    }else{
      console.log(results);
      res.json({success_code:200,message:"修改密码成功"});
    }
  })
})




module.exports = router;


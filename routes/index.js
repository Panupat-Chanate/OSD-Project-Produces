const express = require('express');
const { isEmpty } = require('lodash');
const tb_db = require('../models/user');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
var session = require('express-session')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'project_produce'
  });
con.connect(function(err) {
    if (err) return console.log(err);
    console.log("MySQL Connected");
});

const storage = multer.diskStorage({
    destination: "D:/OSD/demo/client/public/image",
    filename: function(req, file, cb){
       cb(null,"PRODUCE-" + Date.now() + path.extname(file.originalname));
    }
 });
const upload = multer({
    storage: storage,
// limits:{fileSize: 1000000},
})

router.post('/check', async (req, res) => {
    console.log(req.body)
    sql = "SELECT username FROM user WHERE username = '"+ req.body.UserName +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        var strResult = JSON.stringify(result)
        console.log(typeof(strResult),strResult)
        if (strResult == "[]") {
            console.log("ไม่มี");
            sql = "INSERT INTO user (username, password) VALUES('"+ req.body.UserName +"', '"+ req.body.Password +"')"
            con.query(sql, function (err, result) {
                if (err) throw err;
                var checked ={
                    checkedState: false
                };
                console.log(checked);
                res.json(checked);
            })
        } else {
            console.log('มีแล้ว');
            var checked ={
                checkedState: true
            };
            console.log(checked);
            res.json(checked);
        }
    })
});

router.post('/upload', upload.array('imgCollection', 6), (req, res, next) => {
    const jsonImg = [];
    // const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        jsonImg.push('"jsonIMG'+i+'":"'+req.files[i].filename+'"')
    }

    console.log(jsonImg)
    const objData = JSON.parse(JSON.stringify(req.body));
    console.log(objData);

    if (req.body) {
        sql = "INSERT INTO tb_produce (produce_id, produce_name, produce_type, produce_data, produce_img) VALUES('"+ objData.produceId +"', '"+ objData.produceName +"','"+ objData.produceType +"','"+ objData.produceData +"', '"+ jsonImg +"')"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(true);
        })
    }
});

router.post('/checksignin', async (req, res) => {
    console.log(req.body.checkUser)
    console.log(req.body.checkPass)
    sql = "SELECT username FROM user WHERE username = '"+ req.body.checkUser +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        var strUser = JSON.stringify(result)
        if (strUser != "[]") {
            sql = "SELECT level FROM user WHERE username = '"+ req.body.checkUser +"' AND password = '"+ req.body.checkPass +"'"
            con.query(sql, function (err, result) {
                if (err) return console.log(err);
                var strResult = JSON.stringify(result)
                var strResult2 = JSON.parse(JSON.stringify(result))
                // console.log(result)
                // console.log(typeof(strResult),strResult)
                if (strResult == "[]") {
                    console.log("รหัสผ่านผิด");
                    var checked ={
                        checkedUser: true,
                        checkedPass: false
                    };
                    console.log(checked);
                    res.json(checked);
                } else {
                    console.log('รหัสผ่านถูก');
                    console.log(strResult2)
                    var checked ={
                        checkedUser: true,
                        checkedPass: true,
                        checkedLevel: strResult2
                    };
                    req.session.logedin = true;
                    req.session.username = req.body.checkUser;
                    req.session.level = strResult2;
                    console.log(req.session.logedin , req.session.username);
                    console.log(checked);
                    res.json(checked);
                    // res.redirect('/search')
                }
            })
        } else {
            var checked = {
                checkedUser: false
            };
            console.log('ชื่อผู้ใช้ผิด');
            res.json(checked);
        }
    })
});

router.post('/addProduce', async (req, res) => {
    const storage = multer.diskStorage({
        destination: "D:/OSD/demo/client/public/image",
        filename: function(req, file, cb){
           cb(null,"PRODUCE-" + Date.now() + path.extname(file.originalname));
        }
     });

     const upload = multer({
        storage: storage,
        // limits:{fileSize: 1000000},
     }).single("Image");

    upload(req, res, (err) => {
        const objData = JSON.parse(JSON.stringify(req.body));
        console.log(objData);
        console.log("Request file --->", req.file);
        if (req.body) {
            // const jsonImg = '{ "image1":"'++'","image2":"'++'" }'
            console.log(req.file.filename)
            sql = "INSERT INTO tb_produce (produce_id, produce_name, produce_type, produce_data, produce_img) VALUES('"+ objData.ProduceId +"', '"+ objData.ProduceName +"','"+ objData.ProduceType +"','"+ objData.ProduceData +"', '"+ req.file.filename +"')"
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.json(true);
            })
        }
    })   
});

router.get('/showProduce/:Id', async (req, res) => {
    sql = "SELECT produce_img FROM tb_produce WHERE produce_id = '"+req.params.Id+"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err)
        console.log(result);
        res.contentType('image/jpeg');
        res.send(result.produce_img)
    })
});

router.get("/icon/:id", (req, res) => {
    const id = req.params.id
    fs.readFile(`./public/upload/${id}.jpg`, function (err, data) {
        if (err) throw err
        else {
            res.writeHead(200, { "Content-Type": "image/jpeg" })
            res.end(data)
        }
    })
})

router.post('/search', async (req, res) => {
    console.log(req.body)
    let sql = "SELECT * FROM tb_produce "
    if (req.body.searchId != null && req.body.searchName != null && req.body.searchType != null && req.body.searchData != null) {
        console.log("1")
       sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_name LIKE '%"+ req.body.searchName +"%' AND produce_type LIKE '%"+ req.body.searchType +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName != null && req.body.searchType != null && req.body.searchData != null) {
        console.log("2")
        sql+="WHERE produce_name LIKE '%"+ req.body.searchName +"%' AND produce_type LIKE '%"+ req.body.searchType +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName == null && req.body.searchType != null && req.body.searchData != null) {
        console.log("3")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_type LIKE '%"+ req.body.searchType +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName != null && req.body.searchType == null && req.body.searchData != null) {
        console.log("4")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_name LIKE '%"+ req.body.searchName +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName != null && req.body.searchType != null && req.body.searchData == null) {
        console.log("5")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_name LIKE '%"+ req.body.searchName +"%' AND produce_type LIKE '%"+ req.body.searchType +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName == null && req.body.searchType != null && req.body.searchData != null) {
        console.log("6")
        sql+="WHERE produce_type LIKE '%"+ req.body.searchType +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName != null && req.body.searchType == null && req.body.searchData == null) {
        console.log("7")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_name LIKE '%"+ req.body.searchName +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName != null && req.body.searchType == null && req.body.searchData != null) {
        console.log("8")
        sql+="WHERE produce_name LIKE '%"+ req.body.searchName +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName == null && req.body.searchType != null && req.body.searchData == null) {
        console.log("9")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_type LIKE '%"+ req.body.searchType +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName != null && req.body.searchType != null && req.body.searchData == null) {
        console.log("10")
        sql+="WHERE produce_name LIKE '%"+ req.body.searchName +"%' AND produce_type LIKE '%"+ req.body.searchType +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName == null && req.body.searchType == null && req.body.searchData != null) {
        console.log("11")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%' AND produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    else if (req.body.searchId != null && req.body.searchName == null && req.body.searchType == null && req.body.searchData == null) {
        console.log("12")
        sql+="WHERE produce_id LIKE '%"+ req.body.searchId +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName != null && req.body.searchType == null && req.body.searchData == null) {
        console.log("13")
        sql+="WHERE produce_name LIKE '%"+ req.body.searchName +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName == null && req.body.searchType != null && req.body.searchData == null) {
        console.log("14")
        sql+="WHERE produce_type LIKE '%"+ req.body.searchType +"%'"
    }
    else if (req.body.searchId == null && req.body.searchName == null && req.body.searchType == null && req.body.searchData != null) {
        console.log("15")
        sql+="WHERE produce_data LIKE '%"+ req.body.searchData +"%'"
    }
    con.query(sql, function (err, result) {
        // console.log(result)
        if (err) return console.log(err);
        const resJson= [];

        var strResult = JSON.parse(JSON.stringify(result))
        if (strResult != "[]") {
            for (var i = 0; i < strResult.length; i++) {
                resJson.push({
                    _id: strResult[i]._id,
                    produce_id: strResult[i].produce_id,
                    produce_name: strResult[i].produce_name,
                    produce_type: strResult[i].produce_type,
                    produce_data: strResult[i].produce_data,
                    produce_img: JSON.parse('{'+strResult[i].produce_img+'}')
                })
            }
            console.log(resJson)
            res.json(resJson);
        } else {
            console.log(strResult)
            var queryData ={
                dataStatus: false
            };
            res.json(queryData);
        }
    })
});

router.post('/deleteproduce', async (req, res) => {
    console.log(req.body.delId)
    sql = "DELETE FROM tb_produce WHERE _id = '"+ req.body.delId +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        res.json(result);
    })
})

router.post('/editproduce', async (req, res) => {
    console.log(req.body)
    sql = "UPDATE tb_produce SET produce_id = '"+ req.body.editId +"', produce_name = '"+ req.body.editName +"', produce_type = '"+ req.body.editType +"', produce_data = '"+ req.body.editData +"' WHERE _id = '"+ req.body.edit_id +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        res.json(result);
    })
})

router.get('/checkSession', async (req, res) => {
    if (req.session.logedin) {
        console.log(req.session.logedin)
        res.json(req.session.logedin);
    } else {
        console.log(false)
        res.json(false);
    }
})

router.get('/logout', async (req, res) => {
    if (req.session.logedin) {
        req.session.logedin = false;
        req.session.username = '';
        res.json(req.session.logedin);
    } else {}
})

router.get('/getUser', async (req, res) => {
    if (req.session.level) {
        console.log(req.session.level)
        res.json(req.session.level);
    } else {}
})

module.exports = router;
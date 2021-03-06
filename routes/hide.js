const express = require('express');
const { isEmpty } = require('lodash');
const tb_db = require('../models/user');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'project_produce'
  });
con.connect(function(err) {
    if (err) console.log(err);
    console.log("MySQL Connected");
});

router.post('/check', async (req, res) => {
    console.log(req.body.checkUser)
    sql = "SELECT username FROM user WHERE username = '"+ req.body.checkUser +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        var strResult = JSON.stringify(result)
        console.log(typeof(strResult),strResult)
        if (strResult == "[]") {
            console.log("ไม่มี");
            var checked ={
                checkedState: false
            };
            console.log(checked);
            res.json(checked);
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

router.post('/upload', async (req, res) => {
    // const storage = multer.diskStorage({
    //     destination: "./public/upload/",
    //     filename: function(req, file, cb){
    //        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    //     }
    //  });
       
    //  const upload = multer({
    //     storage: storage,
    //     // limits:{fileSize: 1000000},
    //  }).single("Image");

    // upload(req, res, (err) => {
        // const objData = JSON.parse(JSON.stringify(req.body));
        // console.log(objData);
        console.log("Request file --->", req.file);
        if (req.body) {
            res.redirect('/')
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            
            var saveImg = {img: {
                contentType: req.file.mimetype,
                image: Buffer.from(encode_image, 'base64')
            }}
            console.log(saveImg)
            sql = "INSERT INTO user (username, password, img_profile) VALUES('"+ objData.username +"', '"+ objData.password +"', '"+ saveImg +"')"
            con.query(sql, function (err, result) {
                if (err) throw err;
                // res.json(result);
            })
        }
    // })   
});

router.post('/checksignin', async (req, res) => {
    console.log(req.body.checkUser)
    console.log(req.body.checkPass)
    sql = "SELECT username FROM user WHERE username = '"+ req.body.checkUser +"'"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        var strUser = JSON.stringify(result)
        if (strUser != "[]") {
            sql = "SELECT username, password FROM user WHERE username = '"+ req.body.checkUser +"' AND password = '"+ req.body.checkPass +"'"
            con.query(sql, function (err, result) {
                if (err) return console.log(err);
                var strResult = JSON.stringify(result)
                console.log(result)
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
                    var checked ={
                        checkedUser: true,
                        checkedPass: true
                    };
                    console.log(checked);
                    res.json(checked);
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
        destination: "./public/upload/",
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
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
            res.redirect('/')
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            
            var saveImg = {img: {
                contentType: req.file.mimetype,
                image: Buffer.from(encode_image, 'base64')
            }}
            console.log(saveImg)
            sql = "INSERT INTO tb_produce (produce_id, produce_name, produce_type, produce_data, produce_img) VALUES('"+ objData.ProduceId +"', '"+ objData.ProduceName +"','"+ objData.ProduceType +"','"+ objData.ProduceData +"', '"+ saveImg +"')"
            con.query(sql, function (err, result) {
                if (err) throw err;
                // res.json(result);
            })
        }
    })   
});

router.get('/showProduce', async (req, res) => {
    sql = "SELECT produce_id, produce_name, produce_type, produce_data FROM tb_produce"
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        var strResult = JSON.parse(JSON.stringify(result))
        // var strResult = JSON.stringify(result)
        console.log(result)
        console.log(strResult)
        res.json(strResult);
    })
});

module.exports = router;
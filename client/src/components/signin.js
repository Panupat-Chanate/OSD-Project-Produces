import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { browserHistory } from 'react-router';

export default function Signin() {
  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = data => {
    console.log(data)
    var value = {
      checkUser: data.UserName,
      checkPass: data.Password
    }
    axios.post('/checksignin', value)
    .then((response) => {
      var checkedUser = response.data.checkedUser
      var checkedPass = response.data.checkedPass

      if (checkedUser === true) {
        if (checkedPass === true) {
          var checkedLevel = response.data.checkedLevel[0].level
          if (checkedLevel === 1) {
            browserHistory.push("/homepop");
          } else {
            browserHistory.push("/userhome");
          }
        } else {
          alert("รหัสผ่านไม่ถูกต้อง");
          setValue("Password", null)
        }
      }
      if (checkedUser === false) {
        alert("ชื่อผู้ใช้ไม่ถูกต้อง");
        setValue("UserName", null)
        setValue("Password", null)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  // const getSession = () => {
  //   axios.get('/checkSession', {withCredentials: true})
  //   .then(response => {
  //     console.log(response.data)
  //     if (response.data) {
  //       browserHistory.push("/home");
  //     } else {
  //       browserHistory.push("/");
  //     }
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }
  // componentDidMount() {
    // this.getSession();
  // }
  // {getSession()}
  return (
    <div align = "center">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="UserName" ref={register
        ({
          required: "กรุณากรอกชื่อผู้ใช้"
        })
      } placeholder="Username" />
      <p></p>
      <span >{errors.UserName?.message}</span>
      <p></p>
      <input type="password" name="Password" 
        ref={register
          ({
            required: "กรุณากรอกพาสเวิร์ด"
          })
        } placeholder="Password" />
      <p></p>
      <span >{errors.Password?.message}</span>
      <p></p>
      <input type="submit" className="btn btn-primary" value="เข้าสู่ระบบ"/>
      <span><a  href="/signup">สมัครสมาชิก</a></span>
    </form>
    </div>
  );
}
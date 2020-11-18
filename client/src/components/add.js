import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Home from './home';

export default function AddProduces() {
    const { register, handleSubmit, setValue, errors } = useForm();
    const [file, setFile] = useState('');
    const [Picture, setPicture] = useState('');

    const onSubmit = data => {
      console.log(Picture)
      const fd = new FormData();
      fd.append("Image", file);
      fd.append("ProduceId", data.ProduceId);
      fd.append("ProduceName", data.ProduceName);
      fd.append("ProduceType", data.ProduceType);
      fd.append("ProduceData", data.ProduceData);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post("/addProduce",fd,config)
        .then((response) => {
          alert("อัพโหลดข้อมูลเสร็จสิ้น");
        }).catch((error) => {
      });
      setValue("ProduceId", null)
      setValue("ProduceName", null)
      setValue("ProduceType", null)
      setValue("ProduceData", null)
      setValue("picture", null)
    };

    const handlePicture = (e) => {
      setPicture(e.target.files[0]);
    }
    const handleFile = (e) => {
      setFile(e.target.files[0]);
    }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} align = "center">
      <input type="file" name="picture" id="picture" ref={register({required: "อัพโหลดรูปโปรไฟล์"})} onChange={handlePicture} />
      <p></p>
      <span >{errors.picture?.message}</span>
      <p></p>
      <input type="text" name="ProduceName" ref={register
        ({
        required: "กรุณากรอกชื่อผลิตภัณฑ์"
        })
      } placeholder="ชื่อผลิตภัณฑ์" />
      <p></p>
      <span >{errors.ProduceName?.message}</span>
      <p></p>
      <input type="text" name="ProduceId" ref={register
        ({
        required: "กรุณากรอกรหัสผลิตภัณฑ์"
        })
      } placeholder="รหัสผลิตภัณฑ์" />
      <p></p>
      <span >{errors.ProduceId?.message}</span>
      <p></p>
      <input type="text" name="ProduceType" 
        ref={register
        ({
          required: "กรุณากรอกประเภทผลิตภัณฑ์"
        })
        } placeholder="ประเภทผลิตภัณฑ์" />
      <p></p>
      <span >{errors.ProduceType?.message}</span>
      <p></p>
      <input type="text" name="ProduceData" ref={register
        ({
          required: "กรุณากรอกข้อมูลผลิตภัณฑ์"
        })
      } placeholder="ข้อมูลผลิตภัณฑ์" />
      <p></p>
      <span >{errors.ProduceData?.message}</span>
      <p></p>
      <input type="file" name="file" id="file" ref={register} onChange={handleFile} />
      <p></p>
      {/* <input type="file" name="file" id="file" ref={register} onChange={handleSelect} />
      <p></p> */}
      <input type="submit" className="btn btn-primary" value="เพิ่มข้อมูลผลิตภัณฑ์"/>
    </form>
    <p></p>
    {/* <Home></Home> */}
    </div>
  );
}
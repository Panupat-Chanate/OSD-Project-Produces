// import React from 'react';
// //bootstrap
// //for image saving request call
// import axios from 'axios';
// //image upload reactjs npm module
// import ImageUploading from "react-images-uploading";
// // { ImageUploadingPropsType, ImageListType, ImageType } is type for typescript
// //image uploading limit
// const maxNumber = 3;
// class App extends React.Component {
//   onChange = (imageList) => {
//     // data for submit
//     //Getting total number of images
//     var images = imageList.length
//     // Create an object of formData 
//     const formData = new FormData(); 
 
//      //Saving multiple images in formadta varibale
//      for(var a = 0; a<images; a++)
//      {
//       formData.append( 
//         "myFile"+a, 
//         imageList[a].file, 
//         imageList[a].file.name
//       ); 
      
//      }
//     // Update the formData object 
    
   
//     // Details of the uploaded file 
   
   
//     // Request made to the backend api 
//     // Send formData object 
//     axios.post("http://localhost/reactimageupload.php", formData); 
//   }; 
   
  
  
//   render() {
   
//     return (
      
//       <div className="maincontainer">
       
//         <h1 className="mr-5 ml-5 mt-5">Therichpost.com</h1>
//         <div className="container mb-5 mt-5">
        
//         <ImageUploading
//         onChange={this.onChange}
//         maxNumber={maxNumber}
//         multiple
//       >
//         {({ imageList, onImageUpload }) => (
//           // write your building UI
//           <div className="imageuploader">
//             <div className="mainBtns">
//             <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
            
//             </div>
//             {imageList.map((image) => (
//               <div className="imagecontainer" key={image.key}>
//                 <img src={image.dataURL} />
                
//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
        
            
//       </div>
     
//       </div>
// )
// };
// }
// export default App;
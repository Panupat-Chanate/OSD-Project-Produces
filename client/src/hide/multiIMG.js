import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
 
function App() {
  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };
 
  const [images, setImages] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images)
    // axios.post("/search",this.state)
    // .then((response) => {
    //   this.setState({
    //     arrayData: []
    //   })
    //   var concatData = this.state.arrayData.concat(response.data);
    //   this.setState({ 
    //     arrayData: concatData
    //   })
    //   // console.log(this.state.arrayData[20].produce_img)
    // }).catch((error) => {
    //   console.log(error)
    // });
  }
  return (
    <div>
      <MultiImageInput
        images={images}
        setImages={setImages}
        cropConfig={{ crop, ruleOfThirds: true }}
      />
      <button type="submit" className={"btn btn-primary"} onClick={handleSubmit}>submit</button>
      </div>
  );
}
 
export default App;
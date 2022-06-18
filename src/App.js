import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      box: [],
    }
  }

  calculateFaceLocation = (data) => {
    const faces = [];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    for (let i = 0; i < JSON.parse(data).outputs[0].data.regions.length; i++) {
    const clarifaiFace = JSON.parse(data).outputs[0].data.regions[i].region_info.bounding_box;
    faces.push({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    });
  }
  return faces;
}

  displayFaceBox = (box) => {
    this.setState({box: box}); 
  }

  //input property of the app
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "binray",
        "app_id": "iProfiler"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: 'Key a13ffff405e243a99bde0d98a85e6170'
          },
          body:raw,
        };
    fetch("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", requestOptions)
      .then(response => response.text())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log("error", error));

  }

  // onRouteChange = (route) => {
  //   if (route === 'logout') {
  //     this.setState({isSignedIn: false})
  //   } else if(route ==='home'){
  //     this.setState({isSignedIn: true})
  //   }
  //   this.setState({route});
  // }

  render() {
    const { box } = this.state;
    return (
      <div className="App">
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange = {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition 
        box= {box} 
        imageUrl = {this.state.input} 
        />
      </div>
    );
  }
}

export default App;

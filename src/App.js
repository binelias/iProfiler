import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
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
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data,null,2).outputs[0].data.regions[0].region_info.bounding_box;
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
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
      user_app_id: {
        user_id: "binelias",
        app_id: "dc294004d3844cb5a11a8d0ab6fb252c"
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input
            },
          },
        },
      ],
    });

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
    {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: 'Key eff5029af1d94eb6aa9e19d10ca7a690'
          },
        }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((err) => console.log("error", err));
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
    const { imageUrl, box } = this.state;
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
        imageUrl = {imageUrl} 
        />
      </div>
    );
  }
}

export default App;

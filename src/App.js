import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


const initialState = {
  input: '',
  box: [],
  route: 'login',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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

    fetch("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", {
        method: "POST",
        headers: {
                Accept: "application/json",
                Authorization: 'Key a13ffff405e243a99bde0d98a85e6170'
            },
            body:raw,
    })
    .then(response => response.text())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => { return response.json() })
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        });
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(error => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === 'logout') {
      this.setState(initialState)
    } else {
      this.setState({route: route});
    }
  }

  render() {
    const { name, entries } = this.state.user;
    const { box, input, route } = this.state;
    return (
      <div className="App">
        
        { route === 'home' 
          ? <div>
              <Navigation onRouteChange={this.onRouteChange}/>
              <Logo />
              <Rank 
              name={name} 
              entries={entries} />
              <ImageLinkForm 
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition 
              box= {box} 
              imageUrl = {input}/>
            </div>
          : (
            route === 'login'
            ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;

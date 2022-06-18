import React from "react";


const Login = ({ onRouteChange }) => {
    return (
        <article class="mw6 center bg-white br3 pa3 pa4-ns mv4 ba b--black-10 shadow-5">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="register" className="ba b--transparent ph0 mh0">
                <h1 className="f1">Login</h1>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                    type="email" 
                    name="email-address" 
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={() => onRouteChange('home')}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Login"
                />
                </div>
                <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')}>Don't have an account?<a href="#0" className="f6 link dim black db">Register</a></p>
                </div>
            </div>
        </main>  
    </article>
    );
}

export default Login;
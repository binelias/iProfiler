import React from "react";


const Register = ({ onRouteChange }) => {
    return (
        <article className="mw6 center bg-white br3 pa3 pa4-ns mv4 ba b--black-10 shadow-5">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="register" className="ba b--transparent ph0 mh0">
                <h1 className="f1">Register</h1>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent  hover-white w-100" type="text"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent  hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent  hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={() => onRouteChange('home')}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register"
                />
                </div>
                <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('login')}>Already have an account?<a href="#0" className="f6 link dim black db">Login</a></p>
                </div>
            </div>
        </main>  
    </article>
    );
}

export default Register;
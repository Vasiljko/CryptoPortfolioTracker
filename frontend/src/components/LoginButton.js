import {GoogleLogin} from 'react-google-login'

const clientId = "179439514600-011uh459lu4jlh6pt63bd3rbh6ns2d7s.apps.googleusercontent.com"

function LoginButton(){
    const onSuccess = (res) => {
        console.log("Log in successful. Current user: ", res.profileObj)
    }

    const onFailure = (res) => {
        console.log("Log in failed. Response: ", res)
    }
    
    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText={"Login"}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )

}


export default LoginButton
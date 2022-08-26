import {GoogleLogout} from 'react-google-login'

const clientId = "179439514600-011uh459lu4jlh6pt63bd3rbh6ns2d7s.apps.googleusercontent.com"

function LogoutButton(){
    const onSuccess = () => {
        console.log("Log out successful")
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )

}


export default LogoutButton
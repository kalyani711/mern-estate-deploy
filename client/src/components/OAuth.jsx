// instance of the Google authentication provider, which is used to sign in with Google. It then uses the signInWithPopup method from the Firebase Auth SDK to open a popup window that allows the user to sign in with their Google account. After the user successfully signs in, it fetches the user’s details from Google and sends these details to your backend server via a POST request (/api/auth/google). The backend server then creates a new user in the database and returns the user’s data. Finally, it updates the Redux store with the user’s data and navigates the user to the home page.
//getAuth retrieves the Firebase authentication instance to perform the sign-in , signUp operations.
//when we click on signIn with google , Signin popup window appears only when we have more than one gmail.com , 
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'; //Firebase app instance initialized with your Firebase configuration.
import { useDispatch } from 'react-redux'; //useDispatch hook from react-redux to dispatch actions to the Redux store(updating the user state)
import { signInSuccess } from '../redux/user/userSlice';//action creator from your Redux slice ,creates an action that signifies a successful sign-in
import { useNavigate } from 'react-router-dom'; //useNavigate hook from react-router-dom to navigate the user to a different route after a successful sign-in

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', { //After successful sign-in, it fetches user details from Google and sends these details to your backend server via a POST request (/api/auth/google).
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data)); //updates the Redux store with the user’s data , if Successfully sogned in
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error); //pending
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}

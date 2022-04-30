import { StyledFirebaseAuth } from 'react-firebaseui';
import { auth } from '../firebase';
import { uiConfig } from '../firebaseConfig';

const Login = () => {
  return (
    <div>
      <h1>Fake Discord</h1>
      <p>Please sign in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Login;

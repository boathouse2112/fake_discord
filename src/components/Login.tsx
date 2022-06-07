import { useAuthUser } from "@react-query-firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { uiConfig } from "../firebase/firebaseConfig";

const Login = () => {
  const authUser = useAuthUser("auth-user", auth);

  if (authUser.isSuccess) {
    return <Navigate to="/@me" />;
  }

  return (
    <div className="w-screen h-screen bg-neutral-700">
      {authUser.isLoading ? undefined : (
        <>
          <h1>Fake Discord</h1>
          <p>Please sign in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </>
      )}
    </div>
  );
};

export default Login;

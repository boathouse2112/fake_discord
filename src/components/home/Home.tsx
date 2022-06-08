import { useAuthUser } from "@react-query-firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
import ConversationView from "./ConversationView";
import ServerList from "../server_list/ServerList";
import { auth } from "../../firebase/firebase";

const Home = () => {
  const authUser = useAuthUser("auth-user", auth);
  const location = useLocation();

  // Redirect logged-out users to the login page
  if (authUser.isError) {
    return (
      <Navigate
        replace
        to="/"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return (
    <div className="w-screen h-screen flex">
      <ServerList />
      <ConversationView />
    </div>
  );
};

export default Home;

import { useAuthUser } from "@react-query-firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChannelView from "./server/ChannelView";
import { auth } from "../firebase/firebase";
import Home from "./home/Home";
import Login from "./Login";
import ServerView from "./server/ServerView";
import UserSettings from "./settings/UserSettings";

dayjs.extend(relativeTime);

function App() {
  const { isSuccess: loggedIn } = useAuthUser(["user"], auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route path="/@me" element={loggedIn ? <Home /> : <Login />} />
        <Route
          path="user-settings"
          element={loggedIn ? <UserSettings /> : <Login />}
        />
        <Route
          path="/:serverId"
          element={loggedIn ? <ServerView /> : <Login />}
        >
          <Route path=":channelId" element={<ChannelView />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

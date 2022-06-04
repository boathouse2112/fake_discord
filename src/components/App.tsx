import { useAuthUser } from "@react-query-firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChannelView from "./server/ChannelView";
import { auth } from "../firebase";
import Home from "./home/Home";
import Login from "./Login";
import ServerView from "./server/ServerView";
dayjs.extend(relativeTime);

const USER_ID = "HHpwr6hXRpEg5loOSmWP";

function App() {
  const { isSuccess: loggedIn } = useAuthUser(["user"], auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route path="/@me" element={loggedIn ? <Home /> : <Login />} />
        <Route
          path="/:serverId"
          element={loggedIn ? <ServerView userId={USER_ID} /> : <Login />}
        >
          <Route path=":channelId" element={<ChannelView />} />
        </Route>
        <Route path="*" element={<Navigate to="/@me" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

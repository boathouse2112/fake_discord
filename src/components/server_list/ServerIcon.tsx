import { Link } from "react-router-dom";
import avatar from "./../../resources/discord_avatar.png";

const ServerIcon = (props: { serverId: string; serverName: string }) => {
  return (
    <div>
      <Link to={`/${props.serverId}`}>
        <img
          src={avatar}
          alt={"Server " + props.serverName}
          className="rounded-full"
        ></img>
      </Link>
    </div>
  );
};

export default ServerIcon;

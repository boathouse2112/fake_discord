import { Link } from "react-router-dom";
import avatar from "./../../resources/discord_avatar.png";
import ServerIcon from "./ServerIcon";
import { useServerDescriptions } from "../../firebase/hooks";

const ServerList = () => {
  const serverNames = useServerDescriptions();

  const homeIcon = (
    <Link to={"/@me"}>
      <img src={avatar} alt={"Home"} className="rounded-full"></img>
    </Link>
  );

  const drawServerIcons = () => {
    if (serverNames === undefined) return <></>;

    return serverNames.map(({ id, name }) => (
      <ServerIcon key={id} serverId={id} serverName={name} />
    ));
  };

  return (
    <nav
      className={[
        "w-20 h-full px-3 py-2",
        "flex flex-col gap-2",
        "bg-neutral-800 overflow-y-scroll scrollbar-hide",
      ].join(" ")}
    >
      <>
        {homeIcon}
        {drawServerIcons()}
      </>
    </nav>
  );
};

export default ServerList;

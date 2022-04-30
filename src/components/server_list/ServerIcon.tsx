import avatar from './../resources/discord_avatar.png';

const ServerIcon = (props: { name: string }) => {
  return (
    <img
      src={avatar}
      alt={'Server ' + props.name}
      className="rounded-full"
    ></img>
  );
};

export default ServerIcon;

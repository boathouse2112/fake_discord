import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Server: NextPage = () => {
  const router = useRouter();
  const { serverId } = router.query;

  return (
    <div>
      <h1>Hello</h1>
      <style jsx>{`
        div {
          width: 100;
          height: 100;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Server;

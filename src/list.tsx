import React from "react";
import { Link } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

const useUserCollection = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const loadUsers = (filter: string) => {
    fetch(`https://api.github.com/orgs/${filter}/members`)
      .then((response) => response.json())
      .then(setMembers);
  };
  return { members, loadUsers };
};

export const ListPage: React.FC = () => {
  const [filter, setFilter] = React.useState("lemoncode");
  const { members, loadUsers } = useUserCollection();

  React.useEffect(() => {
    loadUsers(filter);
  }, []);

  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <input
        value={filter}
        defaultValue="lemoncode"
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={() => loadUsers(filter)}>Get users</button>
      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};

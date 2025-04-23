import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <nav className="w-full p-4 flex justify-between items-center z-10 bg-cyan-950 bg-opacity-20 backdrop-blur-md">
      <Link to="/main" className="hover:underline">
        <h1 className="text-black text-2xl font-bold tracking-widest">DOKYDOKY</h1>
      </Link>
      <ul className="flex space-x-6 text-black font-medium">
        <li>
          <Link to="/main" className="hover:underline">메인</Link>
        </li>
        <li>
          <Link to="/board" className="hover:underline">게시판</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">로그인</Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}

export default TopNav;
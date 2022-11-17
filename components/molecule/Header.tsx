import { FC, useContext } from "react";
import Link from "next/link";
import Btn from "../atom/Btn";
import firebase from "../../firebase/firebaseConfig";
import { AuthContext } from "../../firebase/Auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user";
import Image from "next/image";

const Header: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const user = useSelector(selectUser);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <header>
      <h1>
        <Link href="/" passHref>
          <div>
            <Image
              src={"/header_logo.png"}
              alt="ロゴ"
              height={50}
              width={220}
            ></Image>
          </div>
        </Link>
      </h1>
      <nav className="bg-white shadow dark:bg-gray-800">
        <ul>
          {user.name && <li>ようこそ&nbsp;{user.name}&nbsp;さん</li>}
          <li>
            <Link href="/" passHref>
              <div className="home">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/cart" passHref>
              <div className="cart">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/history" passHref className="link">
              History
            </Link>
          </li>
          {user.name ? (
            <li>
              <Btn
                onClick={logout}
                text="Logout"
                classname="logoutbutton"
              ></Btn>
            </li>
          ) : (
            <li>
              <Btn onClick={login} text="Login" classname="loginbutton"></Btn>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

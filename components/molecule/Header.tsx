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
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
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
        </div>

        <div className="items-center md:flex">
          <div className="flex flex-col md:flex-row md:mx-6">
            {user.name && (
              <span className="my-1 text-lg font-medium text-gray-700 dark:text-gray-200 md:mx-4 md:my-0">
                ようこそ&nbsp;{user.name}&nbsp;さん
              </span>
            )}
            <Link href="/" passHref>
              <span className="my-1 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                Home
              </span>
            </Link>
            <Link href="/cart" passHref>
              <div className="flex justify-center md:block">
                <span className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg
                    className="w-6 h-6 my-1 md:mx-4 md:my-0 hover:text-red-400"
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
                </span>
              </div>
            </Link>
            <Link href="/history" passHref>
              <span className="my-1 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                History
              </span>
            </Link>
            {user.name ? (
              <Btn
                onClick={logout}
                text="Logout"
                classname="my-1 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-indigo-400 md:mx-4 md:my-0"
              ></Btn>
            ) : (
              <Btn
                onClick={login}
                text="Login"
                classname="my-1 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-indigo-400 md:mx-4 md:my-0"
              ></Btn>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

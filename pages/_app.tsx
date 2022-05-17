// import '../styles/globals.css'
import { AppProps } from "next/app";
import "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../features/store";
import Header from "../components/molecule/Header";
import { AuthProvider } from "../firebase/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />
        <div>
          <div>
            <Component {...pageProps} />
          </div>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
<<<<<<< HEAD
import { wrapper } from "../redux/store";
=======
const { wrapper } = require("../redux/store");
>>>>>>> e77864a6779f1f7038622fd7b7e1330a47fe294a
import Script from "next/script";

export default function App({ Component, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-J4XHY45C5E', {page_path: window.location.pathname,});`,
        }}
      />
      <Provider store={store}>
        <Component {...rest.pageProps} />
      </Provider>
    </>
  );
}

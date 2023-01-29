import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
const { wrapper } = require("../redux/store");

export default function App({ Component, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...rest.pageProps} />
    </Provider>
  );
}

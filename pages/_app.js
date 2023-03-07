import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Footer, Navbar } from '../components';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen relative">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/0dac110977.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </Provider>
  );
}

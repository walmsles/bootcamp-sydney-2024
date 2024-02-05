import { ThemeProvider } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from '@/aws-exports'
import "@/styles/globals.css";
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(config)

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

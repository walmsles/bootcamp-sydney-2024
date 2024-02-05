import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Heading, Flex, Image, withAuthenticator, Button } from "@aws-amplify/ui-react";

const inter = Inter({ subsets: ["latin"] });

function AppPage({signOut}) {
  return (
      <Flex direction={'column'} alignItems={'center'}>
        <Heading level={2}>My Private App Page</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
  );
}

export default withAuthenticator(AppPage)
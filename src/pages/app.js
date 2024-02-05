import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Heading, Flex, Image, withAuthenticator, Button, TextField, TextAreaField } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { createTodo } from "@/graphql/mutations";

const client = generateClient()

const inter = Inter({ subsets: ["latin"] });

function AppPage({signOut}) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.todoName.value
        const description = e.target.todoDescription.value

        console.log({name})
        console.log({description})
        const {data} = await client.graphql( {
            query: createTodo,
            variables: {
                input: {
                    name,
                    description
                }
            }
        })

        console.log({data})

    }
  return (
      <Flex direction={'column'} alignItems={'center'}>
        <Heading level={2}>My Private App Page</Heading>
        <Button onClick={signOut}>Sign Out</Button>
        <Heading level={3}>Create Your Todo</Heading>
        <form onSubmit={handleSubmit}>
            <TextField
                label='Name'
                name='todoName'
                placeholder="Enter the todo item name"
            />
            <TextAreaField
                label='Description'
                name='todoDescription'
                placeholder="Describe your todo"
            />
            <Button variation="primary" type='submit'>Submit</Button>
        </form>
      </Flex>
  );
}

export default withAuthenticator(AppPage)
import { Inter } from "next/font/google";
import { Heading, Flex, Image, withAuthenticator, Button, TextField, TextAreaField } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'next/router';
import { createTodo } from "@/graphql/mutations";

const client = generateClient()

const inter = Inter({ subsets: ["latin"] });

function AppPage({signOut}) {
    const { push } = useRouter();
    const handleSignOut = () => {
        signOut();
        push("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.todoName.value
        const description = e.target.todoDescription.value

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
        <Button onClick={handleSignOut}>Sign Out</Button>
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
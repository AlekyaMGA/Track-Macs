import { Stack } from "expo-router";
import React from "react";
import { apiKey } from "@/constants/IBMStepZen";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://khosuyeh.us-east-a.ibm.stepzen.net/api/bumptious-hummingbird/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `apikey ${apiKey}`
  }
});




export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ApolloProvider>
  );
}

"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { apiUrl } from "@/utils/URL";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: apiUrl,
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ClerkProvider>
  );
}

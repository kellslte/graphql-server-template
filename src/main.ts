import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql';

config();
const app = express();
const port = process.env.PORT || 41002;

async function bootstrap(){
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        // context: ({ req, res }) => ({ req, res })
    });

    await apolloServer.start();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/graphql", expressMiddleware(apolloServer));

    app.get('/', (req, res) => {
        res.send("Hello, world!");
    })

    app.listen(port, () => {
        console.info(`Express server running at http://localhost:${port}`);
        console.info(`GraphQL server running at http://localhost:${port}/graphql`);
    });
}


bootstrap();

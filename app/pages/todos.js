import React from 'react';
import Head from 'next/head';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import apollo from "next-with-apollo/lib/apollo"
const TODO_QUERY = gql`
  query {
  
   allTodos {
      name
      
  }
  }
`;

const Home = (props) => {
    // Create a query hook
    const {data} = props
    const todos = data?.data?.allTodos


    return (
        <div>

        <p>some paragraph stext</p>
    <div>And something in a div</div>
    <ul>
    {todos?.map((todo,i) => {
        return <li key={`article__${i}${todo.name}`}>{todo.name}</li>;
    })}
</ul>
    </div>
);
};


Home.getInitialProps = async ctx => {

    const apolloClient = ctx.apolloClient;
    // console.log('client', apolloClient)
    try {
        const data = await apolloClient.query({query:TODO_QUERY})
        console.log('data')
        console.log(data)
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Home;
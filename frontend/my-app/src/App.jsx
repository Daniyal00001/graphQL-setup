import './App.css'
import { gql, useQuery } from '@apollo/client'

const GET_TODOS = gql`
  query {
    todos {
      user {
        id
      }
      title
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery(GET_TODOS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {data.todos.map((todo, index) => (
          <li key={index}>
            <strong>{todo.title}</strong> (User ID: {todo.user.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

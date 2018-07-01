import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

class App extends Component {
  render() {
    const { data: {loading, todos }} = this.props;
    if (loading) return null;
    return (
      <div>
        {todos.map(todo => <div key={`${todo.id}-todo-item`}>{todo.text}</div>)}
      </div>
    );
  }
}

export default graphql(TodosQuery)(App);

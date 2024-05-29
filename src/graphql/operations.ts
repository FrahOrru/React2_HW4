import { gql } from 'graphql-request';

// Types
export interface Todo {
  id: number;
  desc: string;
  finished: boolean;
}

export interface TodoList {
  id: number;
  created_at: string;
  name: string;
  email: string;
  todos: Todo[];
}

export const GET_TODO_LISTS_QUERY = gql`
  query GetTODOLists($email: String!) {
    getTODOLists(email: $email) {
      id
      name
    }
  }
`;

export const GET_TODO_LIST_QUERY = gql`
  query GetTODOList($listId: ID!) {
    getTODOList(id: $listId) {
      id
      name
      todos {
        id
        desc
        finished
      }
    }
  }
`;


export const CREATE_TODO_LIST_MUTATION = gql`
  mutation CreateList($input: CreateTODOListInput!) {
    createTODOList(input: $input) {
      id
      created_at
      name
      email
    }
  }
`;

export const DELETE_TODO_LIST_MUTATION = gql`
  mutation DeleteTODOList($listId: ID!) {
    deleteTODOList(id: $listId) {
      id
    }
  }
`;

export const ADD_TODO_MUTATION = gql`
  mutation AddTODO($listId: ID!, $desc: String!) {
    addTODO(listId: $listId, desc: $desc) {
      id
      desc
      finished
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTODO($todoId: ID!) {
    deleteTODO(id: $todoId) {
      id
    }
  }
`;

export const FINISH_TODO_MUTATION = gql`
  mutation FinishTODO($todoId: ID!) {
    finishTODO(id: $todoId) {
      id
      finished
    }
  }
`;


// Mutations
export const DELETE_LIST_MUTATION = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($id: String!, $finished: Boolean!) {
    updateTodo(id: $id, finished: $finished) {
      id
      desc
      finished
    }
  }
`;

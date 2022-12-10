import { useEffect, useState, useRef } from 'react'
import './App.css'
import request from './assets/request'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(null)
  const [myTodos, setMyTodos] = useState([])
  const [limit, setLimit] = useState(5)
  const input = useRef(null)

  const PageQueryOptions = {
    options: {
      paginate: {
        page: 1,
        limit: limit,
      },
    },
  }

  const CreateTodoInput = {
    input: {
      title: '',
      completed: false,
    },
  }

  useEffect(() => {
    request({
      query: `query getTodos($options: PageQueryOptions) {
      todos(options: $options) {
        data {
          id
          title
          completed
        }
      }
    }`,
      variables: PageQueryOptions,
    })
      .then((res) => res.json())
      .then((res) => setTodos(res.data.todos.data))
  }, [limit])

  const onSubmit = (e) => {
    e.preventDefault()
    if (input.current.value) {
      CreateTodoInput.input.title = input.current.value

      request({
        query: `mutation createTodoHandler($input: CreateTodoInput!) {
          createTodo(input: $input) {
            title
            id
            completed
          }
        }`,
        variables: CreateTodoInput,
      })
        .then((res) => res.json())
        .then((res) => setMyTodos((prev) => [...prev, res.data.createTodo]))

      input.current.value = ''
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <h1>todos</h1>
        <form id="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            id="input"
            ref={input}
            className="input"
            placeholder="Enter your todo"
            autoComplete="off"
          />
          <ul className="todos" id="todos">
            {myTodos?.map((todo) => (
              <TodoItem
                key={todo.id + todo.title}
                todo={todo}
                onDelete={() =>
                  setTodos((prevState) =>
                    prevState.filter((item) => item.id !== todo.id)
                  )
                }
              />
            ))}
            {todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() =>
                  setTodos((prevState) =>
                    prevState.filter((item) => item.id !== todo.id)
                  )
                }
              />
            ))}
          </ul>
        </form>
        <small>
          Left click to toggle completed. Right click to delete todo
        </small>
        <div>
         Select Limit: <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value={5} defaultValue>
              5
            </option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App

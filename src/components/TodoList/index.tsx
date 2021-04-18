import React, { FC, ReactElement, useCallback, useEffect, useReducer } from 'react';
import TdInput from './Input';
import TdList from './List';
import { todoReducer } from './reducer';
import { ACTION_TYPE, IState, ITodo } from './typings';

// const initialState: IState = {
//   todoList: []
// }
//惰性初始化
function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList
  }
}

const TodoList: FC = (): ReactElement => {
  // const [todoList, setTodoList] = useState<ITodo[]>([])
  // 尝试usereducer替代useState
  const [state, dispatch] = useReducer(todoReducer, [], init)

  useEffect(() => {
    console.log(state.todoList);
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
    dispatch({
      type: ACTION_TYPE.INIT_TODOLIST,
      payload: todoList
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state.todoList))
  }, [state.todoList])


  const addTodo = useCallback((todo: ITodo): void => {
    // setTodoList(todoList => [...todoList, todo])
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo
    })
  }, [])

  const removeTodo = useCallback(
    (id: number) => {
      dispatch({
        type: ACTION_TYPE.REMOVE_TODO,
        payload: id
      })
    },
    [],
  );
  const toggleTodo = useCallback(
    (id: number) => {
      dispatch({
        type: ACTION_TYPE.TOGGLE_TODO,
        payload: id
      })

    },
    [],
  )
  return (
    <div>
      <TdInput
        addTodo={addTodo}
        todoList={state.todoList}
      />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )
}
export default TodoList;

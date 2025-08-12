import React, { useState, useReducer } from 'react'
import './TotoList.css'
const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [
                ...state, {
                    id: Date.now(),
                    text: action.text,
                    completed: false
                }
            ]
        case "toggle":
            return state.map((todo) =>
                todo.id == action.id ? {
                    ...todo,
                    completed: !todo.completed
                } : todo
            )
        case "delete":
            return state.filter((todo) => todo.id !== action.id)
        default:
            return state
    }
}


const TodoList = () => {
    const [todos, dispatch] = useReducer(reducer, [])
    const [text, setText] = useState('')

    const handleAdd = () => {
        if (!text.trim()) return
        dispatch({ type: "add", text })
        setText('')
    }

    return (
        <div>
            <h2>todolist</h2>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') handleAdd()
                }}

                type="text" placeholder='할일을 추가하세요' />
            <button onClick={handleAdd}>추가</button>
            <ul className='list'>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            onClick={() => dispatch({
                                type: "toggle",
                                id: todo.id
                            })}
                            className={todo.completed ? 'completed' : ''}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: 'delete', id: todo.id })}
                        >삭제</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default TodoList
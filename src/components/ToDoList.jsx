import { useState } from 'react';
import './reset.css'
import './todolist.css'

let globalId = 3;
const today = new Date();
const month = today.getMonth()+1;
const date = today.getDate();

const ToDoList = (props) => {
    const [todos, setTodos] = useState([
        {id:1, date: "4월5일", todo: "첫번째 할일", checked: false},
        {id:2, date: "4월5일", todo: "두번째 할일", checked: false},
    ]);
    const [allTodos, setAllTodos] = useState([]);
    
    const [inputTodo,setInputTodo] = useState("");

    const inputChange = (e)=>{
        setInputTodo(e.target.value);
        console.log(inputTodo);
    }

    const addTodo = ()=>{
        const newTodos = todos.concat({
            id: globalId++,
            date: month+"월"+date+"일",
            todo: inputTodo
        })
        setTodos(newTodos);
        setAllTodos(newTodos);
        setInputTodo("");
    }

    const deleteTodo = (id)=>{
        const newTodos = todos.filter(
            todo => id !== todo.id
            )
        setTodos(newTodos);
        setAllTodos(newTodos);
    }
    const checkTodo = (id)=>{
        const newTodos= todos.map((n)=>{
            if(id !== n.id) {
                return n;
            } else {
                return {...n, checked: !n.checked}
            }
        })
        setTodos(newTodos);
        setAllTodos(newTodos);
    }
    const todayTodo = ()=>{
        const todayTodos = todos.filter( 
            allTodo => allTodo.date === month+"월"+date+"일"
        );
        setAllTodos(todos);
        setTodos(todayTodos);
    }
    const allTodo = ()=>{
        setTodos(allTodos);
    }

    return(
        <div>
            <h1>Todo-list</h1>
            <input type="text" 
            onChange={inputChange}
            value={inputTodo}
            placeholder='할일을 입력하세요!'
            />
            <button
            onClick={addTodo}
            >
                +
            </button>
            
            <hr />
            <button
            onClick={allTodo}
            >
                모든 할일
            </button>
            <button
            onClick={todayTodo}
            >
                오늘 할일
            </button>

            <ul>
                {todos.map((td)=>(
                    <li key={td.id}
                    className={td.checked ? "on" : ""}
                    >
                        <h3>{td.date}</h3>
                        <input type="checkbox" 
                        checked={td.checked}
                        readOnly    
                        onClick={()=>{checkTodo(td.id)}}
                        />
                        {td.todo}
                        <button
                        onClick={()=>{deleteTodo(td.id)}}>
                            X
                        </button>
                    </li>        
                ))}
            </ul>
        </div>
    )
}
export default ToDoList;
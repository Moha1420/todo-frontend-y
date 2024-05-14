import React, { useEffect, useState } from 'react';
import { updateToDo, addToDo, getAllToDo, deleteToDo } from './components/utils/HandleApi';
import ToDo from './components/ToDo';

function App() {
    const [toDo, setToDo] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [toDoId, setToDoId] = useState();

    useEffect(() => {
        getAllToDo(setToDo);
    }, []);

    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setToDoId(_id);
    };

    return (
        <div className="App">
            <div className="container">
                <h1>ToDo App</h1>
                <div className='top'>
                    <input
                        type='text'
                        placeholder='add to do ... '
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className='add'
                        onClick={isUpdating ?
                            () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                            : () => addToDo(text, setText, setToDo)}
                    >
                        {isUpdating ? "update" : "Add"}
                    </div>
                </div>
                <div className='list'> list </div>

                {toDo.map((item) =>
                    <ToDo key={item._id}
                        text={item.text}
                        updateMode={() => updateMode(item._id, item.text)} // Pass both _id and text
                        deleteToDo={() => deleteToDo(item._id, setToDo)}
                    />
                )}
            </div>
        </div>
    );
}

export default App;

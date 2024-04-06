import React, { useState } from 'react'

const AddUser = (props) => {
    const { handleOnSubmit } = props;
    const [data, setData] = useState({
        name: "Tuan",
        address: "District 4",
        age: 22
    })
    const handleInputChange = (event) => {
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleOnSubmit({
            id: Math.floor((Math.random() * 100) + 1) + ' - random',
            name: data.name,
            age: data.age
        });
    }
    return (
        <>
            My name is {data.name}<br />
            I'm from {data.address}<br />
            I'm {data.age} years old<br />
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Your name: </label>
                <input
                    value={data.name}
                    name='name'
                    type='text'
                    onChange={(e) => handleInputChange(e)} /><br />
                <label>Your age: </label>
                <input
                    value={data.age}
                    name='age'
                    type='number'
                    onChange={(e) => handleInputChange(e)} />
                <button type='submit'>Click</button>
            </form>
        </>

    )
}

export default AddUser
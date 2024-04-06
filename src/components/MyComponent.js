import React from 'react'
import AddUser from './AddUser'
import DisplayInfo from './DisplayInfo'

class MyComponent extends React.Component {

    constructor(props) {
        console.log("Call constructor: 1");
        super(props);
        this.state = {
            listUsers: [
                { id: 1, name: "Tuan", age: 16 },
                { id: 2, name: "Tun", age: 26 },
                { id: 3, name: "Khue", age: 66 }
            ]
        }
    }


    handleOnSubmit = (obj) => {
        this.setState({
            listUsers: [obj, ...this.state.listUsers]
        })
    }
    handleDeleteUser = (userId) => {
        let listUser = [...this.state.listUsers];
        listUser = listUser.filter(i => i.id !== userId);
        this.setState({
            listUsers: listUser
        })
    }
    render() {
        console.log("Call me render");
        return (
            <>
                <AddUser handleOnSubmit={this.handleOnSubmit} />
                <DisplayInfo listUsers={this.state.listUsers} handleDeleteUser={this.handleDeleteUser} />
            </>
        )
    }
}

export default MyComponent
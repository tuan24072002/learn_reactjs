import React from 'react'

class MyComponent extends React.Component {

    state = {
        name: "Tuan",
        address: "Q4",
        age: 22
    };
    render() {
        return (
            <div
            >My name is {this.state.name}<br />
                I'm from {this.state.address}<br />
                I'm {this.state.age} years old
            </div>
        )
    }
}

export default MyComponent
import React from 'react'

class MyComponent extends React.Component {
    render() {
        return (
            <div
            >My first component<br />
                {Math.random()}
            </div>
        )
    }
}

export default MyComponent
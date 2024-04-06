import React from 'react';
import '../styles/DisplayInfo.scss';
class DisplayInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: true
        }
    }

    componentDidMount() {
        console.log("Call me component did mount");
        setTimeout(() => {
            document.title = "hihi"
        }, 5000);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Call me component did update", this.props, prevProps);
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert("Max user");
            }
        }
    }
    render() {
        return (
            <div className='display-info-container' >
                <div>
                    <button onClick={() => this.setState({
                        list: !this.state.list
                    })}>{this.state.list === true ? "Hide list user" : "Show list user"}</button>
                </div>
                {this.props.listUsers.length > 0 && this.state.list ? this.props.listUsers.map((user, index) => {
                    return (
                        <div key={index} className={user.age > 18 && user.age < 30 ? "green" : user.age > 30 ? "blue" : "red"}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                            <hr />
                        </div>
                    )
                }) : <></>}
            </div >
        )
    }
}

export default DisplayInfo
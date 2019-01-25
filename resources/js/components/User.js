import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class User extends React.Component {

    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        let $this = this;

        axios.get('/api/users').then(response => {
            $this.setState({
                data: response.data
            })            
        }).catch(error => {
            console.log(error);
        })
    }

    

    render() {
        return (
            <div>
                <h2>Users Listing</h2>
                <a href="/users/create" className="btn btn-primary">Add New User</a>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((user, i) => (
                            
                            <UserRow key={i} user={user} object={this}/>

                            )
                        )}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

class UserRow extends React.Component {

    deleteUser(user, object){
        console.log(user);

        var $this = object;
        axios.delete('/api/users/'+user.id).then(response => {
            console.log(response);

            const newState = $this.state.data.slice();
            newState.splice(newState.indexOf(user), 1);
            $this.setState({
                data: newState
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <tr key={this.props.i}>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td><a href={"/users/"+this.props.user.id+"/edit"} className="btn btn-primary">Edit</a> || 
                <a href="javascript:;" className="btn btn-danger" onClick={this.deleteUser.bind(this, this.props.user, this.props.object)}>Delete</a></td>
            </tr>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<User />, document.getElementById('app'));
}
import React, {Component} from 'react';
import NavBar from './NavBar';
import logo from './logo.svg';
import Commodity from "./Commodity"
import './App.css';
import ShopCart from "./ShopCart";

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>Success!</button>
                </div>
            </div>
        );
    }
}

class App extends Component {
    totalCost = 0;
    constructor(props) {
        super(props);
        this.state = {
            mobilesList: [],
            shopCart: []
        }
    }

    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "http://localhost:8080/phone", true);
        xhr.responseType = "json";
        xhr.onload = () => {
            const status = xhr.status;
            if (status === 200) {
                this.setState({
                    shopCart: [],
                    mobilesList: xhr.response
                });
            } else {
                console.log(status);
                alert("Server is offline");
            }
        };
        xhr.send();
    }

    handleAdd(phone) {
        this.state.shopCart.push(phone);
        this.setState(this.state);
    }
    handleRemove(phone){
        for(var i = 0; i<this.state.shopCart.length; i++) {
            let phoneToDel = this.state.shopCart[i];
            if (phoneToDel == phone) this.state.shopCart.splice(i,1);
        }
        this.setState(this.state);
    }
    handleCountTotalCost(shopCart){
        for(var i = 0; i<shopCart.length; i++) {
            this.totalCost += shopCart[i].cost;
        }
    }

    render() {
        const commodities = this.state.mobilesList.map((phone) => {
            return (
                <div className="panel panel-primary col-sm-3">
                    <Commodity value={phone}/>
                    <button type="button" className="btn btn-primary success" onClick={() => this.handleAdd(phone)}>
                        {phone.cost} Buy!
                    </button>
                    <button type="button" className="btn btn-danger success" onClick={()=> this.handleRemove(phone)}>
                        Remove from cart
                    </button>
                </div>
            )
        });
        return (
            <div className="App">
                {/*<NavBar/>*/}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to our mobile shop</h1>
                </header>

                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#Modal">Open
                    Cart
                </button>
                <div className="container">
                    <br/>
                    <div className="modal fade" id="Modal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Shopping Cart</h4>
                                </div>
                                <div className="modal-body">
                                    <ShopCart items={this.state.shopCart}/>
                                </div>
                                <div className="modal-footer">
                                    {this.handleCountTotalCost(this.state.shopCart)}
                                    <button type="button" className="btn btn-default"
                                            onClick={() => {alert('Order placed successfully');}}>{this.totalCost.toFixed(2)} Create Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {commodities}
            </div>
        );
    }
}

export default App;

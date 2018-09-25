import React, {Component} from 'react';
import './ShopCart.css'

class ShopElement extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.element.companyName}</td>
                <td>{this.props.element.model}</td>
                <td>{this.props.element.cost}</td>
            </tr>
        );
    }
}

class ShopCart extends Component {
    render() {
        return (
            <div className="container">

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Model</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map((shopElement) => <ShopElement element={shopElement}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ShopCart;
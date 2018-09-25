import React, {Component} from 'react';
import './Commodity.css'

class Commodity extends Component {
    render() {
        return (
            <div>
                <div className="panel-heading">{this.props.value.companyName}</div>
                <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE"
                                                 className="img-responsive phone-img" alt ="" /></div>
                <div className="panel-footer">{this.props.value.model}</div>
            </div>
        );
    }
}

export default Commodity;
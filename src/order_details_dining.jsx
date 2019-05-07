import React from 'react'
import style from './index.module.scss'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';


export default class OrderDetailsService extends React.Component {
    state = {
        anchorEl: null,
    };

    totalPrice = () => {return (Object.values(this.props.order.items).reduce(function(currentTotal, item) {
        return currentTotal + item.price
      } , 0 ))
    }

    handlePopoverOpen = event => {
        if (this.state.anchorEl === null) {
        this.setState({ anchorEl: event.currentTarget });
        } else {this.setState({ anchorEl: null })}
      };
    
    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
    
        return(
            <div>
            <Button 
            onClick={this.handlePopoverOpen}>
              Details
            </Button>

            <Popover 
                id="mouse-over-popover" open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={this.handlePopoverClose}>
                <Button 
                onClick={this.handlePopoverClose}>
                <Card className={style.details_box}>
                <CardContent className={style.details_title} align="left">Details</CardContent>
                <div className={style.details_content}>
                <table width="100%">
                    <thead>
                        <tr>
                            <th width="50%" align="left" >Name</th>
                            <th width="50%" align="right">Room Number</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td width="50%" align="left" className={style.nobold}>{this.props.order.name}</td>
                            <td width="50%" align="right" className={style.nobold}>{this.props.order.room}</td>
                            </tr>
                        <tr>
                            <th width="50%" align="left" >Order ID</th>
                            <th width="50%" align="right">Time of Order</th>
                        </tr>
                        <tr>
                            <th width="50%" align="left" className={style.nobold}>{this.props.order.orderid}</th>
                            <th width="50%" align="right" className={style.nobold}>5pm @ 11/11/2019</th></tr>
                    </tbody>
                </table>
                <hr/>
                  
                <table width="100%">
                    <thead>
                        <tr>
                            <th width="50%" align="left">Items</th>
                            <th width="30%" align="right">Quantity</th>
                            <th width="20%" align="right">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {Object.entries(this.props.order.items).map(([item, itemdetails]) => { return (
                        <tr key={this.props.order.orderid + item}>
                            <th width="50%" align="left">{itemdetails.name}</th>
                            <th width="30%" align="right">{itemdetails.amount}</th>
                            <th width="20%" align="right">{itemdetails.price}</th>
                        </tr>
                        )})}
                    </tbody>
                </table>
                
                <hr/>
                <table width="100%">
                    <thead>
                        <tr>
                            <th width="50%" align="left" >Order ID</th>
                            <th width="50%" align="right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="50%" align="left" className={style.nobold}>
                                {this.props.order.orderid}</td>
                                <td width="50%" align="right" className={style.nobold}>
                                {this.totalPrice()}</td>
                            </tr>
                            <tr>
                                <th width="100%" align="left">Expected Delivery Time</th>
                                <th/>
                            </tr>
                            <tr>
                                <th width="100%" align="left" className={style.nobold}>
                                {this.props.convertToTime(this.props.order.expected_delivery_time)}</th>
                                <th/>
                            </tr>
                        </tbody>    
                  </table>
                  <hr/>
                  <p>Comments</p>
                  <p>{this.props.order.comments}</p>
                </div>
            </Card>
            </Button>
        </Popover>
        </div>
        );
    }
}
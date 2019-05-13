import React from 'react'
import style from './index.module.scss'
import propTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';


export default class OrderDetailsDining extends React.Component {
    state = {
        anchorEl: null,
    };

    totalPrice = () => {
        return (Object.values(this.props.order_items).reduce(function (currentTotal, item) {
            
            if (item.item === undefined) {
                return currentTotal
            } else {
                return currentTotal + item.item.price
            }
        }, 0))
    }

    handlePopoverOpen = event => {
        if (this.state.anchorEl === null) {
            this.setState({ anchorEl: event.currentTarget });
        } else { this.setState({ anchorEl: null }) }
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div>
                <Button
                    onClick={this.handlePopoverOpen}
                    color='primary'>
                    <u>Details</u>
                </Button>

                <Popover id="mouse-over-popover" open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={this.handlePopoverClose}>
                    <Button onClick={this.handlePopoverClose}>
                        <Card className={style.details_box}>
                            <CardContent className={style.details_title} align="left">Details</CardContent>
                            <div className={style.details_content}>
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <th width="50%" align="left">Name</th>
                                            <th width="50%" align="right">Room Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="50%" align="left" className={style.nobold}>{this.props.order_name}</td>
                                            <td width="50%" align="right" className={style.nobold}>{this.props.order_room}</td>
                                        </tr>
                                        <tr>
                                            <th width="50%" align="left">Order ID</th>
                                            <th width="50%" align="right">Time of Order</th>
                                        </tr>
                                        <tr>
                                            <th width="50%" align="left" className={style.nobold}>{this.props.order_id}</th>
                                            <th width="50%" align="right" className={style.nobold}>{this.props.convertToTime(this.props.order_ordertime)}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />

                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <th width="70%" align="left">Items</th>
                                            <th width="15%" align="right">Quantity</th>
                                            <th width="15%" align="right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(this.props.order_items).map(([item, itemdetails]) => {
                                            if (itemdetails.item === undefined) {
                                                return (<tr key={this.props.order_index} />)
                                            }
                                            return (
                                                <tr key={this.props.order_orderid + item}>
                                                    <th width="70%" align="left" className={style.orderitems}>{itemdetails.item.name}</th>
                                                    <th width="15%" align="right" className={style.orderitems}>{itemdetails.qty}</th>
                                                    <th width="15%" align="right" className={style.orderitems}>MOP {itemdetails.item.price}</th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                <hr />
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <th width="50%" align="left">Order ID</th>
                                            <th width="50%" align="right">Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="50%" align="left" className={style.nobold}>
                                                {this.props.order_id}</td>
                                            <td width="50%" align="right" className={style.nobold}>
                                                {this.totalPrice()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <thead>
                                        <tr>
                                            <th align="left">Expected Delivery Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th align="left" className={style.nobold}>
                                                {this.props.convertToTime(this.props.order_expected_delivery_time)}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                <p>Comments</p>
                                <p>{this.props.order_comments}</p>
                            </div>
                        </Card>
                    </Button>
                </Popover>
            </div>
        );
    }
}

OrderDetailsDining.propTypes = {
    order_index: propTypes.number, 
    order_name: propTypes.string, 
    order_room: propTypes.string,
    order_id: propTypes.number,  
    order_ordertime : propTypes.instanceOf(Date),
    order_items: propTypes.array,
    // order_comments : propTypes.string,
    order_expected_delivery_time: propTypes.instanceOf(Date),
    convertToTime: propTypes.func,
}
import React from 'react'
import style from './index.module.scss'
import propTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';


export default class OrderDetailsService extends React.Component {

    state = {
        anchorEl: null,
    };

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
                    color='primary'
                    onClick={this.handlePopoverOpen}>
                    <u>Details</u>
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
                                            <td width="50%" align="left" className={style.nobold}>{this.props.order_name}</td>
                                            <td width="50%" align="right" className={style.nobold}>{this.props.order_room}</td>
                                        </tr>
                                        <tr>
                                            <th width="50%" align="left" >Order ID</th>
                                            <th width="50%" align="right">Time of Order</th>
                                        </tr>
                                        <tr>
                                            <th width="50%" align="left" className={style.nobold}>{this.props.order_id}</th>
                                            <th width="50%" align="right" className={style.nobold}>{this.props.convertToTime(this.props.order_ordertime)}</th></tr>
                                    </tbody>
                                </table>
                                <hr />

                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <th width="70%" align="left">Items</th>
                                            <th width="30%" align="right">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {Object.entries(this.props.order_items).map(([item, itemdetails]) => {
                                            return (
                                                <tr key={this.props.order_id + itemdetails.name} >
                                                    <th width="70%" align="left" className={style.orderitems}>{itemdetails.name}</th>
                                                    <th width="30%" align="right" className={style.orderitems}>{itemdetails.amount}</th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                <hr />
                                <table width="100%">

                                    <thead>
                                        <tr>
                                            <th width="100%" align="left">Expected Delivery Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th width="100%" align="left" className={style.nobold}>{this.props.convertToTime(this.props.order_expected_delivery_time)}</th>
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

OrderDetailsService.propTypes = {
    order_comments: propTypes.string,
    order_expected_delivery_time: propTypes.number,
    order_items: propTypes.array,
    order_name: propTypes.string,
    order_id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    order_ordertime: propTypes.number,
    order_room: propTypes.string,
    convertToTime: propTypes.func
}
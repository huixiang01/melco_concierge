import React from 'react';
import propTypes from 'prop-types';
import Order from './orders';
import { Droppable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import style from "./index.module.scss";
import CardContent from '@material-ui/core/CardContent';

export default class ColumnComponent extends React.Component {

  handleOrder = () => {

    return (this.props.orders.filter(order => order && (this.props.searchTab === order.type || this.props.searchTab === 0)).filter(
      order => Date.parse(new Date(order.deliveryDay)) >= this.props.expected_delivery_start_time && Date.parse(new Date(order.deliveryDay)) <= this.props.expected_delivery_end_time).filter(
        order => (order.timestamp >= this.props.timestamp_start_time && order.timestamp <= this.props.timestamp_end_time) || order.timestamp === null).map(
          (order, index) => {

            return (
              <Order
                handleStatus={this.props.handleStatus}
                key={order.id}
                // order_comments={order.comments}
                order_expected_delivery_time={new Date(order.deliveryDay)}
                order_items={order.orderItems}
                order_name={order.guestName}
                order_id={order.id}
                order_index={order.order_index}
                order_room={order.roomNumber}
                order_status={order.status}
                order_timestamp={order.timestamp}
                order_type={order.type}
                index={index + 1}
                column_id={this.props.column_id}
                convertToTime={this.props.convertToTime}
              />
            )
          }
        )
    )
  }

  handleHeading = () => {
    if (this.props.column_id === 1) {
      return (
        <table className={this.props.orders.length < 10 ? style.columntable_heading : style.columntable_heading1}>
          <thead>
            <tr>
              <th width="40%" align="left" className={style.heading}>
                Items
                  </th>
              <th width="10%" align="left" className={style.heading}>
                OrderID
                  </th>
              <th width="10%" align="left" className={style.heading}>
                Room
                  </th>
              <th width="10%" align="left" className={style.heading}>
                Name
                  </th>
              <th width="15%" align="left" className={style.heading}>
                Expected Delivery Time
                  </th>
              <th width="10%" align="left" className={style.heading}>
                <span className={style.padding_required}>Details</span>
              </th>
            </tr>
          </thead>
        </table>
      )
    } else if (this.props.column_id === 2) {
      return (
        <table className={this.props.orders.length < 10 ? style.columntable_heading : style.columntable_heading1}>
          <thead>
            <tr>
              <th width="33.3%" align="left" className={style.heading}>
                Room
                  </th>
              <th width="33.3%" align="left" className={style.heading}>
                Time Processed
                  </th>
              <th width="33.3%" align="left" className={style.heading}>
                <span className={style.padding_required}>Details</span>
              </th>
            </tr>
          </thead>
        </table>
      )
    } else if (this.props.column_id === 3) {
      return (
        <table className={this.props.orders.length < 10 ? style.columntable_heading : style.columntable_heading1}>
          <thead>
            <tr>
              <th width="20%" align="left" className={style.heading}>
                Room
                  </th>
              <th width="35%" align="left" className={style.heading}>
                Time Delivered
                  </th>
              <th width="20%" align="left" className={style.heading}>
                <span className={style.padding_required}>Details</span>
              </th>
              <th width="25%" align="left" className={style.heading}>
                <span className={style.padding_required}>Status</span>
              </th>
            </tr>
          </thead>
        </table>
      )
    }
  }

  render() {


     return (
      <Card className={style.carddroppable}>
        <CardContent className={this.props.column_title === "Pending" ? style.cardtitle1 :
          (this.props.column_title === "Processing" ? style.cardtitle2 : style.cardtitle3)}>
          {this.props.column_title}
        </CardContent>
        {this.handleHeading()}
        <Droppable droppableId={this.props.column_id} type="order"
          key={this.props.column_id} >
          {(provided, snapshot) => (
            <div className={style.column}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isdraggingover}
            >
              {this.handleOrder()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    )
  }
}


ColumnComponent.propTypes = {
  column_id: propTypes.number,
  column_fields: propTypes.array,
  column_title: propTypes.string,
  orders: propTypes.array,
  searchTab: propTypes.number,
  handleStatus: propTypes.func,
  convertToTime: propTypes.func,
  expected_delivery_start_time: propTypes.instanceOf(Date),
  expected_delivery_end_time: propTypes.instanceOf(Date),
  timestamp_start_time: propTypes.instanceOf(Date),
  timestamp_end_time: propTypes.instanceOf(Date)
}

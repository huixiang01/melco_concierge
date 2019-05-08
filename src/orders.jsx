import React from 'react'
import propTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd'
import style from './index.module.scss'
import OrderDetailsService from './order_details_service';
import OrderDetailsDining from './order_details_dining';
import Switch from '@material-ui/core/Switch';

export default class Order extends React.Component {

  handleTableOrder = () => {
    if (this.props.column_id === "column-1") {
      var Objectlength = Object.entries(this.props.order_items).length - 1
      return (
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
              <td width="40%" align="left">
                {Object.entries(this.props.order_items).map(([item, itemdetails]) => {
                  Objectlength -= 1;
                  return (
                    <span key={itemdetails.name + itemdetails.amount}>{itemdetails.name} X {itemdetails.amount}{Objectlength === -1 ? undefined : ","} </span>)
                })}
              </td>
              <td width="10%" align="left">
                {this.props.order_id}
              </td>
              <td width="10%" align="left">
                {this.props.order_room}
              </td>
              <td width="10%" align="left">
                {this.props.order_name}
              </td>
              <td width="15%" align="left">
                {this.props.convertToTime(this.props.order_expected_delivery_time)}
              </td>
              <td width="10%" align="left">
                {this.props.order_type === 1 ?
                  <OrderDetailsDining 
                  order_name={this.props.order_name} 
                  order_room={this.props.order_room} 
                  order_id={this.props.order_id} 
                  order_ordertime={this.props.order_ordertime} 
                  order_items={this.props.order_items} 
                  order_comments={this.props.order_comments} 
                  order_expected_delivery_time={this.props.order_expected_delivery_time} 
                  convertToTime={this.props.convertToTime} /> 
                  :
                  <OrderDetailsService order_name={this.props.order_name} order_room={this.props.order_room} order_id={this.props.order_id} order_ordertime={this.props.order_ordertime} order_items={this.props.order_items} order_comments={this.props.order_comments} order_expected_delivery_time={this.props.order_expected_delivery_time} convertToTime={this.props.convertToTime} order={this.props.order} />}
              </td>
            </tr>
          </tbody>
        </table>
      )
    } else if (this.props.column_id === "column-2") {
      return (
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
              <td width="33.3%" align="left">
                {this.props.order_room}
              </td>
              <td width="33.3%" align="left">
                {this.props.convertToTime(this.props.order_timestamp)}
              </td>
              <td width="33.3%" align="left" >
                {this.props.order_type === 1 ?
                  <OrderDetailsDining order_name={this.props.order_name} order_room={this.props.order_room} order_id={this.props.order_id} order_ordertime={this.props.order_ordertime} order_items={this.props.order_items} order_comments={this.props.order_comments} order_expected_delivery_time={this.props.order_expected_delivery_time} convertToTime={this.props.convertToTime} /> :
                  <OrderDetailsService order_name={this.props.order_name} order_room={this.props.order_room} order_id={this.props.order_id} order_ordertime={this.props.order_ordertime} order_items={this.props.order_items} order_comments={this.props.order_comments} order_expected_delivery_time={this.props.order_expected_delivery_time} convertToTime={this.props.convertToTime} order={this.props.order} />}
              </td>
            </tr>
          </tbody>
        </table>
      )
    } else if (this.props.column_id === "column-3") {
      return (
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
              <td width="20%" align="left">
                {this.props.order_room}
              </td>
              <td width="35%" align="left">
                {this.props.convertToTime(this.props.order_timestamp)}
              </td>
              <td width="20%" align="left">
                {this.props.order_type === 1 ?
                  <OrderDetailsDining order_name={this.props.order_name} order_room={this.props.order_room} order_id={this.props.order_id} order_ordertime={this.props.order_ordertime} order_items={this.props.order_items} order_comments={this.props.order_comments} order_expected_delivery_time={this.props.order_expected_delivery_time} convertToTime={this.props.convertToTime} /> :
                  <OrderDetailsService order_name={this.props.order_name} order_room={this.props.order_room} order_id={this.props.order_id} order_ordertime={this.props.order_ordertime} order_items={this.props.order_items} order_comments={this.props.order_comments} order_expected_delivery_time={this.props.order_expected_delivery_time} convertToTime={this.props.convertToTime} order={this.props.order} />}
              </td>
              <td width="25%" align="left" >
                <Switch 
                className={style.padding_required}
                checked={this.props.order_status} 
                onChange={this.props.handleStatus(this.props.order_id)} 
                value={this.props.order_status} 
                color="primary">
                </Switch>
                <span className={style.padding_required}>{this.props.order_status === false ? "Delivering" : "Delivered"}</span>
                
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  }


  render() {

    return (
      <Draggable
        draggableId={this.props.order_id}
        index={this.props.index}
        key={this.props.index}

      >
        {(provided, snapshot) => (
          <div className={this.props.order_type === 1 ? style.order : style.order1}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={snapshot.isdragging}

          >
            {this.handleTableOrder()}
          </div>
        )}
      </Draggable>
    )
  }
}

Order.propTypes = {
  order_comments : propTypes.string,
  order_expected_delivery_time : propTypes.number,
  order_items : propTypes.array,
  order_name : propTypes.string,
  order_id : propTypes.oneOfType([propTypes.string, propTypes.number]),
  order_ordertime : propTypes.number,
  order_room : propTypes.string,
  order_status : propTypes.bool,
  order_timestamp : propTypes.instanceOf(Date),
  order_type : propTypes.number,
  column_id: propTypes.string,
  convertToTime: propTypes.func
}

import React from 'react'
import propTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd'
import style from './index.module.scss'
import OrderDetailsService from './order_details_service';
import OrderDetailsDining from './order_details_dining';
import Switch from '@material-ui/core/Switch';

export default class Order extends React.Component {

  handleTableOrder = () => {

    if (this.props.column_id === "column1") {
      var Objectlength = Object.entries(this.props.order_items).length - 1
      return (
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
              <td width="40%" align="left">
                {Object.entries(this.props.order_items).map(([item, itemdetails]) => {
                  Objectlength -= 1;
                  if (itemdetails.item === undefined) {
                    return <span key={this.props.order_index} />
                  }
                  return (
                    <span key={itemdetails.item.name}>{itemdetails.item.name} X {itemdetails.qty}{Objectlength === -1 ? undefined : ","} </span>
                  )
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
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime} />
                  :
                  <OrderDetailsService
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime}
                     />}
              </td>
            </tr>
          </tbody>
        </table>
      )
    } else if (this.props.column_id === "column2") {
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
              <td width="33.3%" align="left">
              
                {this.props.order_type === 1 ?
                  <OrderDetailsDining
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime} />
                  :
                  <OrderDetailsService
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime}
                     />}
              </td>
            </tr>
          </tbody>
        </table>
      )
    } else if (this.props.column_id === "column3") {
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
                {this.props.order_type === 1?
                  <OrderDetailsDining
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    // this.props.order_items[0] !== undefined ? 
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime} />
                  :
                  <OrderDetailsService
                    order_index={this.props.order_index}
                    order_name={this.props.order_name}
                    order_room={this.props.order_room}
                    order_id={this.props.order_id}
                    order_ordertime={this.props.order_items[0] !== undefined ? new Date(this.props.order_items[0].createdDate) : null}
                    order_items={this.props.order_items}
                    order_comments={this.props.order_comments}
                    order_expected_delivery_time={this.props.order_expected_delivery_time}
                    convertToTime={this.props.convertToTime}
                     />}
              </td>
              <td width="25%" align="left" >
                <Switch
                  className={style.padding_required}
                  checked={Boolean(this.props.order_status)}
                  onChange={this.props.handleStatus(this.props.order_index)}
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
  console.log(this.props.order_items)
    return (
      <Draggable
        draggableId={this.props.order_index}
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
  handleStatus: propTypes.func,
  // order_comments : propTypes.string,
  order_expected_delivery_time: propTypes.instanceOf(Date),
  order_items: propTypes.array,
  order_name: propTypes.string,
  order_id: propTypes.number,
  order_index: propTypes.number,
  order_room: propTypes.string,
  order_status: propTypes.oneOfType([propTypes.bool, propTypes.number]),
  order_timestamp: propTypes.instanceOf(Date),
  order_type: propTypes.number,
  index: propTypes.number,
  column_id: propTypes.string,
  convertToTime: propTypes.func,
}

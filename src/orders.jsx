import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import style from './index.module.scss'
import OrderDetailsService from './order_details_service';
import OrderDetailsDining from './order_details_dining';
import Switch from '@material-ui/core/Switch';

export default class Order extends React.Component {

  handleTableOrder = () => {
    if (this.props.column_id === "column-1") {
      var Objectlength = Object.entries(this.props.order.items).length - 1
      return(
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
            <td width="40%" align="left">
              {Object.entries(this.props.order.items).map(([item, itemdetails]) => {
                Objectlength -= 1
                return (
                  <span key={itemdetails.name + itemdetails.amount}>{itemdetails.name} X {itemdetails.amount}{Objectlength === -1 ? undefined : ","} </span>
                )})}
              </td>
            <td width="10%" align="center">
            {this.props.order.orderid}
              </td>
            <td width="10%" align="center">
            {this.props.order.room}
              </td>
            <td width="10%" align="center">
            {this.props.order.name}
              </td>
            <td width="15%" align="center">              
            {this.props.convertToTime(this.props.order.expected_delivery_time)}
              </td>
            <td width="10%" align="center">
            {this.props.order.type === 1
            ?
            <OrderDetailsDining order={this.props.order} position="topLeft" convertToTime={this.props.convertToTime}/>
            :
            <OrderDetailsService order={this.props.order} position="topLeft" convertToTime={this.props.convertToTime}/>
            }
              </td>
              </tr>
            </tbody>
          </table>
        )
      } else if (this.props.column_id === "column-2") {
        return(
          <table width="100%" className={style.field}>
            <tbody>
            <tr>
                <td width="33.3%" align="center">
                {this.props.order.room}
                </td>
                <td width="33.3%" align="center">
                {this.props.convertToTime(this.props.order.timestamp)}
                </td>
                <td width="33.3%" align="center" padding="0px">
                {this.props.order.type === 1
                ?
                <OrderDetailsDining order={this.props.order} position="topLeft" convertToTime={this.props.convertToTime}/>
                :
                <OrderDetailsService order={this.props.order} position="topLeft" convertToTime={this.props.convertToTime}/>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        )
      } else if (this.props.column_id === "column-3") {
        return(
          <table width="100%" className={style.field}>
            <tbody>
            <tr>
                <td width="20%" align="center">
                {this.props.order.room}
                </td>
                <td width="35%" align="center">
                {this.props.convertToTime(this.props.order.timestamp)}
                </td>
                <td width="20%" align="center">
                {this.props.order.type === 1
                ?
                <OrderDetailsDining order={this.props.order} position="topRight" convertToTime={this.props.convertToTime}/>
                :
                <OrderDetailsService order={this.props.order} position="topRight" convertToTime={this.props.convertToTime}/>
                }
                </td>
                <td width="25%" align="center">
                <Switch 
                checked={this.props.order.status} 
                onChange={this.props.handleStatus(this.props.order.orderid)} 
                value={this.props.order.status}
                color="primary">
                </Switch><br />
                {this.props.order.status === false ? "Delivering" : "Delivered"}
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
        draggableId={this.props.order.orderid}
        index={this.props.index}
        key={this.props.index}
        
      >
        {(provided, snapshot) => (
          <div className={style.order}
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

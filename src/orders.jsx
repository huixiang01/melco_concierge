import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import style from './index.module.scss'
import OrderDetailsService from './order_details_service';
import OrderDetailsDining from './order_details_dining';
import Switch from '@material-ui/core/Switch';

export default class Order extends React.Component {



  handleTableOrder = () => {
    if (this.props.column_id === "column-1") {
      return(
        <table width="100%" className={style.field}>
          <tbody>
            <tr>
            <td width="25%" align="left">
              {Object.entries(this.props.order.items).map(([item, itemdetails]) => {               
                return (
                <div key={this.props.order.orderid + item}>{item} X {itemdetails.amount}</div>
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
            {this.props.order.expected_delivery_time}
              </td>
            <td width="10%" align="center">
            {this.props.order.type === 1
            ?
            <OrderDetailsDining order={this.props.order} position="topLeft"/>
            :
            <OrderDetailsService order={this.props.order} position="topLeft"/>
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
                {this.props.order.timestamp}
                </td>
                <td width="33.3%" align="center" padding="0px">
                {this.props.order.type === 1
                ?
                <OrderDetailsDining order={this.props.order} position="topLeft"/>
                :
                <OrderDetailsService order={this.props.order} position="topLeft"/>
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
                  {this.props.order.timestamp}
                </td>
                <td width="20%" align="center">
                {this.props.order.type === 1
                ?
                <OrderDetailsDining order={this.props.order} position="topRight"/>
                :
                <OrderDetailsService order={this.props.order} position="topRight"/>
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
    console.log(this.props.order)
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

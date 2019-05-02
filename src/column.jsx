import React from 'react'

import Order from './orders'
import { Droppable } from 'react-beautiful-dnd'
import Card from '@material-ui/core/Card';
import style from "./index.module.scss";
import CardContent from '@material-ui/core/CardContent';


export default class Column extends React.Component {

  handleOrder = () => {
    return this.props.orders.filter(order => this.props.searchTab === order.type || this.props.searchTab === 0
    ).map((order, index) => { 
      return (
                    
      <Order 
      handleStatus={this.props.handleStatus}
      key={order.orderid}
      order={order} 
      index={index} 
      column_id={this.props.column.id} 
      />
    )
    })
    
  }

  handleHeading = () => {
    if (this.props.column.id === "column-1") {
      return(
        <table className={style.columntable_heading}>
          <thead>
            <tr>
            <th width="25%" align="center" className={style.heading}>
            Items
              </th>
            <th width="10%" align="center" className={style.heading}>
            OrderID
              </th>
            <th width="10%" align="center" className={style.heading}>
            Room
              </th>
            <th width="10%" align="center" className={style.heading}>
            Name
              </th>
            <th width="15%" align="center" className={style.heading}>
            Expected Delivery Time
              </th>
            <th width="10%" align="center" className={style.heading}>
            Details
              </th>
              </tr>
            </thead>
          </table>
        )
    } else if (this.props.column.id === "column-2") {
      return(
        <table className={style.columntable_heading}>
          <thead>
            <tr>
            {this.props.column.fields.map((field, index) => (
              <th width="33.3%" align="center" key={index} className={style.heading}>
              {field}
              </th>
              ))}
              </tr>
            </thead>
          </table>
        )
      } else if (this.props.column.id === "column-3") {
        return(
          <table className={style.columntable_heading}>
            <thead>
              <tr>
                <th width="20%" align="center" className={style.heading}>
                Room
                </th>
                <th width="35%" align="center" className={style.heading}>
                Time Delivered
                </th>
                <th width="20%" align="center" className={style.heading}>
                Details
                </th>
                <th width="25%" align="center" className={style.heading}>
                Status
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
          <CardContent className={style.cardtitle}>{this.props.column.title}</CardContent>
          {this.handleHeading()}
            <Droppable droppableId={this.props.column.id} type="order" key={this.props.column.id}>
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

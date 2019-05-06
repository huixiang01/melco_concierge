import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initialdata.json';
import Column from './column';
import style from './index.module.scss';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class App extends React.Component {

  constructor (p) {
    super(p)
    this.state = {
      accordion : initialData,
      tab_index : 0
    }
    document.querySelectorAll('body')[0].style = 'background-color: rgb(244, 247, 250);'
  }

  handleFixedTabChange = (event, value) => {
    this.setState({tab_index: value});
  };


  handleStatus = orderid => () => {
    
    this.setState({
        accordion :{
          ...this.state.accordion,
          orders: {
            ...this.state.accordion.orders,
            [orderid]: {
              ...this.state.accordion.orders[orderid],
              status: !this.state.accordion.orders[orderid].status}
            }
          }
        }
      );
    };


  onDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    
    const start = this.state.accordion.columns[source.droppableId]
    const finish = this.state.accordion.columns[destination.droppableId]
    
    if (start === finish) {

      const newState = {
        ...this.state.accordion,
        columns: {
          ...this.state.accordion.columns,

        }
      }
      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startOrderIds = Array.from(start.orderIds)
    const removedorder = startOrderIds[source.index]
    startOrderIds.splice(source.index, 1)
    
    const newStart = {
      ...start,
      orderIds: startOrderIds
    }

    const finishOrderIds = Array.from(finish.orderIds)
    finishOrderIds.push(draggableId)
    
    finishOrderIds.sort(function(a, b){return a-b})
    const newFinish = {
      ...finish,
      orderIds: finishOrderIds
    }

    var minutes = new Date().getMinutes()
    var hours = new Date().getHours()
    var timestamp = 
    (hours > 9 ? hours : '0' + hours) + '' + (minutes > 9 ? minutes : '0' + minutes) + ' hrs @ ' 
    + (new Date().getDate()) + ' ' + (months[new Date().getMonth()])
    
    const newState = {
      ...this.state,
        accordion : {
        ...this.state.accordion,
        orders : {
          ...this.state.accordion.orders,
          [removedorder] : {
            ...this.state.accordion.orders[removedorder],
            timestamp : [timestamp]
          },
        },
        columns: {
          ...this.state.accordion.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
    }
    this.setState(newState)
    
  }

  render() {
    
    return (

        <Grid>
          <Card className ={style.mainCard}>
          <Tabs value={this.state.tab_index} onChange={this.handleFixedTabChange} >
            <Tab label='All'></Tab>
            <Tab label='In-Room Dining'></Tab>
            <Tab label='Sevice Request'></Tab>
          </Tabs>
        </Card>
        <Card>

        </Card>
        <br/>
          <Grid container spacing={24} className={style.grid}>
              <DragDropContext onDragEnd={this.onDragEnd} className={style.mainaccordiontable} >             
                {this.state.accordion.columnOrder.map(columnId => {
                      const column = this.state.accordion.columns[columnId]
                      const orders = column.orderIds.map(
                        orderIds => this.state.accordion.orders[orderIds]
                      )
                      return(      
                      <Grid item xs={(column.id === "column-1") ? 6 : 3} key={column.id} >   
                          <Column key={column.id} column={column} 
                          orders={orders} searchTab={this.state.tab_index} 
                          handleStatus={this.handleStatus}/>   
                          </Grid> 
                          
                        )
                      })
                  }
              </DragDropContext>    
            </Grid>    
        </Grid>
    )
  }
}


export default App;

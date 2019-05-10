import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// import initialData from './initialdata.json';
import Column from './ColumnComponent';
import style from './index.module.scss';
import { startOfQuarter, endOfDay } from 'date-fns'
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import DatePicker from 'react-datepicker';
import { CardContent } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import Column_Data from './column.json'

var months_words = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class App extends React.Component {

  constructor(p) {
    super(p);
    this.state = {
      orders: [],
      tab_index: 0,
      expected_delivery_start_time: startOfQuarter(new Date()),
      expected_delivery_end_time: endOfDay(new Date()),
      timestamp_start_time: startOfQuarter(new Date()),
      timestamp_end_time: endOfDay(new Date()),
      column_data: Column_Data,
      order_generated : 1
    };
    document.querySelectorAll('body')[0].style = 'background-color: rgb(244, 247, 250);'
  }

  
  componentDidMount() {
    setInterval(() => {
      var api_update_orders = 'https://melco-service.azurewebsites.net/api/order?page=' + this.state.order_generated + '&pagesize=99999999999'
      fetch(api_update_orders)
      .then(response => response.json())
      .then(data => {
        var i, newOrders;;
        for (i = 0; i < data.length; i++) { 

          var generator, newOrderIds;
          generator = this.state.order_generated + 1
          newOrderIds = this.state.column_data.columns["1"].orderIds.push(generator - 2)
          data[i].timestamp = null
          data[i].order_index = generator - 1
          newOrders = this.state.orders
          newOrders.push(data[i])       
          this.setState({
            ...this.state,
            column_data : {
              ...this.state.column_data,
              columns : {
                ...this.state.column_data.columns,
                "1" : {
                  ...this.state.column_data.columns["1"],
                  newOrderIds
                }
              }
            },
            order_generated : generator
        }) 
        
        this.setState({
          ...this.state,
          orders : newOrders
        })  
        
      }
      })
      .catch(error => {error = 500 ? console.log("") : console.error(error)}
      )
      // post('https://melco-service.azurewebsites.net/api/order?page=1&pagesize=99999999999', {
      
//})
    }, 5000)
  }

  handleFixedTabChange = (event, value) => {
    this.setState({ tab_index: value });
  };

  deleteOrder = (order_index) => {

    if (this.state.orders[order_index -1].status === true) {
      this.state.column_data.columns["3"].orderIds.splice(this.state.column_data.columns["3"].orderIds.indexOf(order_index), 1)
      this.setState({
        ...this.state
      })
    };
  }

  handleStatus = order_index => () => {

    this.setState({
      orders: {
        ...this.state.orders,
        [order_index - 1]: {
          ...this.state.orders[order_index - 1],
          status: !this.state.orders[order_index - 1].status
          }
        }
      }
    );

    setTimeout(this.deleteOrder, 600000, order_index);
  }

  convertToTime = (input_time) => {
    var time = new Date(input_time)
    var minutes = time.getMinutes()
    var hours = time.getHours()
    return (hours > 9 ? hours : '0' + hours) + '' + (minutes > 9 ? minutes : '0' + minutes) + ' hrs @ '
      + (time.getDate()) + ' ' + (months_words[time.getMonth()])
  }

  handleStartDeliveryDateChange = (date) => {

    this.setState({
      ...this.state,
      expected_delivery_start_time: Date.parse(date)
    })
  }

  handleEndDeliveryDateChange = (date) => {
    this.setState({
      ...this.state,
      expected_delivery_end_time: Date.parse(date)
    })
  }

  handleStartTimestampDateChange = (date) => {

    this.setState({
      ...this.state,
      timestamp_start_time: Date.parse(date)
    })
  }

  handleEndTimestampDateChange = (date) => {

    this.setState({
      ...this.state,
      timestamp_end_time: Date.parse(date)
    })
  }

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
    
    const start = this.state.column_data.columns[source.droppableId]
    const finish = this.state.column_data.columns[destination.droppableId] 
    console.log(start.id, finish.id, 'id')

    if ((start.id >= finish.id) || (start.id === 1 && finish.id === 3)) {

      const newState = {
        ...this.state.column_data,
        columns: {
          ...this.state.column_data.columns,

        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startOrderIds = Array.from(start.orderIds)
    
    const removedorder = startOrderIds[source.index - 1]
   
    startOrderIds.splice(source.index -1, 1)
    
    const newStart = {
      ...start,
      orderIds: startOrderIds
    }

    const finishOrderIds = Array.from(finish.orderIds)
    
    finishOrderIds.push(draggableId - 1)
    
    finishOrderIds.sort(function (a, b) { return a - b })
    const newFinish = {
      ...finish,
      orderIds: finishOrderIds
    }
    

    var newtimestamp = new Date()

    const newState = {
      ...this.state,
      orders: {
        ...this.state.orders,
        [removedorder]: {
          ...this.state.orders[removedorder],
          timestamp: newtimestamp,
          status: false
        },
      },
      
      column_data: {
        ...this.state.column_data,
        columns: {
          ...this.state.column_data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
    }

    this.setState(newState)
  }

  render() {
    console.log(this.state)
    return (

      <Grid>

        <Card className={style.mainCard}>
          <CardContent className={style.cardtitle}>Search</CardContent>

          <Tabs
            className={style.searchCard}
            value={this.state.tab_index}
            onChange={this.handleFixedTabChange}
            variant="fullWidth"
            indicatorColor="primary">
            <Tab label='All'></Tab>
            <Tab label='In-Room Dining'></Tab>
            <Tab label='Sevice Request'></Tab>
          </Tabs>
          <div className={style.DateSearchBox}>
            <h4 className={style.DateSearchHeading}>Expected Delivery Time</h4>
            <span>From</span>
            <DatePicker
              className={style.DateSearch}
              selected={this.state.expected_delivery_start_time}
              startDate={this.state.expected_delivery_start_time}
              endDate={this.state.expected_delivery_end_time}
              showTimeSelect
              selectsStart
              onChange={this.handleStartDeliveryDateChange}
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <span>To</span>
            <DatePicker
              className={style.DateSearch}
              selected={this.state.expected_delivery_end_time}
              startDate={this.state.expected_delivery_start_time}
              endDate={this.state.expected_delivery_end_time}
              showTimeSelect
              selectsEnd
              onChange={this.handleEndDeliveryDateChange}
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className={style.DateSearchBox}>
            <h4 className={style.DateSearchHeading}>Timestamp</h4>
            <span>From</span>
            <DatePicker
              className={style.DateSearch}
              selected={this.state.timestamp_start_time}
              startDate={this.state.timestamp_start_time}
              endDate={this.state.timestamp_end_time}
              showTimeSelect
              selectsStart
              onChange={this.handleStartTimestampDateChange}
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <span>To</span>
            <DatePicker
              className={style.DateSearch}
              selected={this.state.timestamp_end_time}
              startDate={this.state.timestamp_start_time}
              endDate={this.state.timestamp_end_time}
              showTimeSelect
              selectsEnd
              onChange={this.handleEndTimestampDateChange}
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>

        </Card>

        <br />

        <Grid container spacing={24} className={style.grid}>
          <DragDropContext onDragEnd={this.onDragEnd} className={style.mainaccordiontable} >
            {this.state.column_data.columnOrder.map(columnId => {
              const column = this.state.column_data.columns[columnId]
              const orders = column.orderIds.map(
                orderId => this.state.orders[orderId]
              )
              
              return (
                <Grid item xs={(column.id === 1) ? 6 : 3} key={column.id}>
                  <Column
                    column_id={column.id}
                    column_fields={column.fields}
                    column_title={column.title}
                    orders={orders}
                    searchTab={this.state.tab_index}
                    handleStatus={this.handleStatus}
                    convertToTime={this.convertToTime}
                    expected_delivery_start_time={this.state.expected_delivery_start_time}
                    expected_delivery_end_time={this.state.expected_delivery_end_time}
                    timestamp_start_time={this.state.timestamp_start_time}
                    timestamp_end_time={this.state.timestamp_end_time}
                  />
                </Grid>)
            })
            }
          </DragDropContext>
        </Grid>
      </Grid>
    )
  }
}


export default App;

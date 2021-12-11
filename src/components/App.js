import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import TasksList from './TasksList';

class App extends Component {

  state = {
    tasksToDo: [],
    doneTasks: [],
  }

  handleAddingTask = (title, timeleft, priority = false) => {
    const tasks = [...this.state.tasksToDo]
    tasks.push({
      title: title,
      timeleft: timeleft,
      priority: priority,
      isDone: false,
      confirmationDate: ''
    })
    this.setState({ tasksToDo: tasks });
  }

  filterTask = (task, arr) => {
    const tasks = arr.filter(item => {
      if (item === task) {
        return false
      } else {
        return true
      }
    })
    return tasks
  }

  handleDeletingTask = (task, isDone) => {
    if (isDone) {
      const newTaskArr = this.filterTask(task, this.state.doneTasks)
      this.setState({ doneTasks: newTaskArr });
    } else {
      const newTaskArr = this.filterTask(task, this.state.tasksToDo)
      this.setState({ tasksToDo: newTaskArr });
    }
  }

  handleDoneTask = (task, isDone) => {
    let firstTasksArr = [];
    let secondTasksArr = []
    let newTask = {}
    if (isDone) {
      firstTasksArr = this.filterTask(task, this.state.doneTasks)
      secondTasksArr = [...this.state.tasksToDo]
      newTask = task
      newTask.isDone = false
      newTask.confirmationDate = ''
      secondTasksArr.push(newTask)
    } else {
      firstTasksArr = [...this.state.doneTasks]
      secondTasksArr = this.filterTask(task, this.state.tasksToDo)
      newTask = task
      newTask.isDone = true
      newTask.confirmationDate = Date.now()
      firstTasksArr.push(newTask)
    }
    this.setState({ 
      tasksToDo: secondTasksArr,
      doneTasks: firstTasksArr,  
    });
  }

  render() { 
    return (
      <div>
        <Form handleAddingTask={this.handleAddingTask}/>
        {this.state.tasksToDo.length > 0 ? 
        <>
        <hr />
        <h2>Do zrobienia: ({this.state.tasksToDo.length})</h2>
        <TasksList 
          tasks={this.state.tasksToDo} 
          handleDeletingTask={this.handleDeletingTask} 
          handleDoneTask={this.handleDoneTask}
        />
        </> : null}
        {this.state.doneTasks.length > 0 ? 
        <>
        <hr/>
        <h2>Wykonane zadania: ({this.state.doneTasks.length})</h2>
        <TasksList 
          tasks={this.state.doneTasks} 
          handleDeletingTask={this.handleDeletingTask} 
          handleDoneTask={this.handleDoneTask}
        />
        </> : null}
      </div>
    );
  }
}
 
export default App;
import TaskItem from "./TaskItem";

const TasksList = (props) => {
  let sortedTasks = props.tasks
  if (props.tasks[0].confirmationDate !== '' && props.tasks.length >= 2) {
    sortedTasks.sort((a, b) => {
      if (a.confirmationDate < b.confirmationDate) {
        return 1
      } 
      if (a.confirmationDate > b.confirmationDate) {
        return -1
      }
      return 0
    })
  }
  return (
    <div>
      {props.tasks.map(task => (
        <TaskItem 
        key={task.title} 
        task={task} 
        handleDeletingTask={props.handleDeletingTask}
        handleDoneTask={props.handleDoneTask}
        />
      ))}
    </div>
  );
}
 
export default TasksList;
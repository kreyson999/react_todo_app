import './TaskItem.css'

const TaskItem = (props) => {
  const {title, timeleft, priority, isDone, confirmationDate} = props.task
  return (
    <div className={isDone ? "task-item taskIsDone" : "task-item"}>
      <h3 style={{
        color: priority ? 'red' : 'black'
      }}>{title}</h3>
      <p>Do wykonania: {timeleft}</p>
      {confirmationDate !== '' ? <p>Wykonano: {new Date(confirmationDate).toISOString().slice(0,10)}</p> : null}
      <div className="buttons">
        <button onClick={props.handleDoneTask.bind(this, props.task, isDone)}>{isDone ? 'Cofnij do zrobienia' : 'Oznacz jako zrobione'}</button>
        <button onClick={props.handleDeletingTask.bind(this, props.task, isDone)}>Usuń zadanie</button>
      </div>
    </div>
  );
}
 
export default TaskItem;
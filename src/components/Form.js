import React, { Component } from 'react';
import './Form.css'

class Form extends Component {
  state = {
    title: '',
    priority: false,
    timeleft: '',

    errors: {
      title: false,
      timeleft: false,
    }
  }

  errorMessages = {
    incorrectTitle: 'Wprowadz poprawny tytuł zadania!',
    incorrectTimeleft: 'Wprowadz poprwana date!',
  }
  componentDidMount() {
    const timeleft = new Date().toISOString().slice(0, 10)
    this.setState({ timeleft: timeleft  });
  }

  handleInputChange = (e) => {
    const type = e.target.type
    const name = e.target.name
    if (type === 'text' || type === 'date') {
      this.setState({ [name]: e.target.value  });
    } 
    else if (type === 'checkbox') {
      this.setState({ [name]: e.target.checked  });
    }
  }

  validateFields = () => {
    let isTitleValidate = true;
    let isTimeleftValidate = true;
    let correct = false;

    function checkTimeleft(timeleft) {
      const formDate = Date.parse(timeleft)
      const today = Date.parse(new Date().toISOString().slice(0, 10))
      if (timeleft.length === 0 || (formDate - today) < 0) {
        return true
      } else {
        return false
      }
    }

    if (this.state.title.length <= 2) {
      isTitleValidate = false;
    }
    if (checkTimeleft(this.state.timeleft)) {
      isTimeleftValidate = false;
    }
    if (isTimeleftValidate && isTitleValidate)  {
      correct = true 
    }
    return {
      correct: correct,
      title: isTitleValidate,
      timeleft: isTimeleftValidate
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValidate = this.validateFields()
    if(isValidate.correct) {
      this.props.handleAddingTask(this.state.title, this.state.timeleft, this.state.priority)
      this.setState({
        title: '',
        priority: false,
        timeleft: new Date().toISOString().slice(0, 10),
        errors: {
          title: false,
          timeleft: false,
        }
      });
    } else {
      this.setState({
        errors: {
          title: !isValidate.title,
          timeleft: !isValidate.timeleft,
        }
      });
    }
  }

  render() { 
    const { title, priority, timeleft, errors } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className='label'>
                Tytuł:
              </td>
              <td className='input'>
                <input placeholder='Wprowadz tytuł zadania' type="text" name="title" value={title} onChange={this.handleInputChange} />
                {errors.title ? <span>{this.errorMessages.incorrectTitle}</span> : null}
              </td>
            </tr>
            <tr>
              <td className='label'>
                Data do zrobienia:
              </td>
              <td className='input'>
                <input type="date" min={new Date().toISOString().slice(0, 10)} name="timeleft" value={timeleft} onChange={this.handleInputChange} />
                {errors.timeleft ? <span>{this.errorMessages.incorrectTimeleft}</span> : null}
              </td>
            </tr>
            <tr>
              <td className='label'>
                Ważne:
              </td>
              <td className='input'>
                <input type="checkbox" name="priority" checked={priority} onChange={this.handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <button>Dodaj zadanie</button>
              </td>
              <td>
                <button>Wyczyść</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
 
export default Form;
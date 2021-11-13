import React from 'react';
import classnames from 'classnames';
import styles from './InputItem.module.css';

type InputItemPropsType = {
  onClickAdd: (value: string) => void;
  isEmpty: boolean;
  isExist: boolean;
}

type StateType = {
  inputValue: string;
}


class InputItem extends React.Component<InputItemPropsType, StateType> {
  state = {
    inputValue: ''
  };

  onButtonClick = () => {
    this.setState({
      inputValue: ''
    });
    this.props.onClickAdd(this.state.inputValue);
  };

  render() {
    const { isEmpty, isExist } = this.props;

    return(
      <div className={styles.input}>
        <div className={classnames({
          [styles.input_wrap]: true,
          [styles.empty_field]: isEmpty,
          [styles.exist_field]: isExist
        })
        }>
          <input
            type='text'
            placeholder='Просто введите сюда название дела...'
            className={styles.input_field}
            value={this.state.inputValue}
            onChange={event => this.setState({inputValue: event.target.value})}
          />
        </div>
        <div className={styles.button} onClick={this.onButtonClick}></div>
      </div>
    );
  };
}

export default InputItem;

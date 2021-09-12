import React from 'react';
import styles from './Item.module.css';
import classnames from 'classnames';

type ItemPropsType = {
  value: string;
  isDone: boolean;
  id: number;
  onClickDone: (id: number) => void;
  onClickDelete: (id: number) => void;
  onClickRedact: (id: number, isDone: boolean) => void;
  onChangeItem: (elemText: string, id: number) => void;
}

class Item extends React.Component<ItemPropsType> {
  onClickDefocus = () => {
    const element = document.getElementById(`${this.props.id}`);

    this.props.onChangeItem(element && element.textContent || '', this.props.id);
  };

  render() {
    const {value, isDone, id, onClickDone, onClickDelete, onClickRedact} = this.props;

    return (
      <div className={styles.item_wrap}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isDone}
          onChange={() => {
          }}
        />
        <label
          htmlFor="checkbox"
          className={styles.checkbox_label}
          onClick={() => onClickDone(id)}
        >
          <div
            id={id.toString()}
            className={classnames({
              [styles.item_text]: true,
              [styles.item_done]: isDone
            })}
            contentEditable={false}
            onBlur={this.onClickDefocus}
          >
            {value}
          </div>
        </label>
        <div
          className={classnames({
            [styles.pencil_icon]: true,
            [styles.pencil_icon_done]: isDone
          })}
          onClick={() => onClickRedact(id, isDone)}
        ></div>
        <div className={styles.delete_icon} onClick={() => onClickDelete(id)}></div>
      </div>
    );
  };
}

export default Item;

import React, {FC} from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css'

type ItemListPropsType = {
  sorting: {
    value: string;
    id: number;
    isDone: boolean;
  }[];
  sortingValue: string;
  onClickDone: (id: number) => void;
  onClickDelete: (id: number) => void;
  onClickRedact: (id: number, isDone: boolean) => void;
  onChangeItem: (elemText: string, id: number) => void;
}

const ItemList: FC<ItemListPropsType> = ({ sorting, sortingValue, onClickDone, onClickDelete, onClickRedact, onChangeItem }) => (
  <div>
    { sorting.length === 0 && sortingValue !== 'Завершенные' ?
      <div className={styles.empty_list}>
        <div className={styles.no_deals_picture}></div>
        <p className={styles.no_deals_message}>Вы ещё не добавили ни одной задачи</p>
        <p className={styles.do_it_message}>Сделайте это прямо сейчас!</p>
      </div> :
      <ul className={styles.item_list}>
        {sorting.map(item => <li key={item.id}>
          <Item 
            value={item.value}
            isDone={item.isDone}
            id={item.id}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
            onClickRedact={onClickRedact}
            onChangeItem={onChangeItem}
          />
        </li>)}
      </ul>
    }
  </div>
);

export default ItemList;

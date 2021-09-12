import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import TodoFilter from '../TodoFilter/TodoFilter';
import Card from '@material-ui/core/Card';
import styles from './Todo.module.css';

type TodoPropsType = {}

type ItemType = {
  value: string;
  isDone: boolean;
  id: number;
}

type TodoStateType = {
  items: ItemType[];
  count: number;
  isEmpty: boolean;
  isExist: boolean;
  isEditing: boolean;
  sorting: string;
}

class Todo extends React.Component<TodoPropsType, TodoStateType> {
  state = {
    items:
      JSON.parse(localStorage.getItem('editedDealList') ||
        '[{"value":"Задача 1","isDone":false,"id":1},{"value":"Задача 2","isDone":false,"id":2}]'
      ),
    count: 2,
    isEmpty: false,
    isExist: false,
    isEditing: false,
    sorting: 'Все'
  };

  onClickDone = (id: number): void => {
    if (!this.state.isEditing) {
      const newItemList = this.state.items.map((item: ItemType): ItemType => {
        const newItem = {...item};

        if (item.id === id) {
          newItem.isDone = !item.isDone;
        }

        return newItem;
      });

      this.setState({items: newItemList});
    }
  };

  onClickDelete = (id: number): void => {
    const newItemList = this.state.items.filter((item: ItemType): boolean => item.id !== id);
    this.setState({items: newItemList});
  };

  onClickAdd = (value: string): void => {
    if (value !== '' && !this.state.items.some((item: ItemType): boolean => item.value.toLowerCase() === value.toLowerCase())) {
      this.setState(state => ({
        items: [
          ...state.items,
          {
            value,
            isDone: false,
            id: state.count + 1
          }
        ],
        count: state.count + 1,
        isEmpty: false,
        isExist: false
      }));
    } else {
      this.setState(() => (
        {
          isEmpty: value === '',
          isExist: value !== ''
        }
      ));
    }
  };

  onClickRedact = (id: number, isDone: boolean): void => {
    const element = document.getElementById(`${id}`);

    if (!isDone && element) {
      element.contentEditable = 'true';
      element.focus();
      this.setState({isEditing: true});
    }
  };

  onChangeItem = (newValue: string, id: number): void => {
    const element = document.getElementById(`${id}`);

    const newItemList = this.state.items.map((item: ItemType): ItemType => {
      const newItem = {...item};

      if (item.id === id) {
        newItem.value = newValue;
      }
      return newItem;
    });

    setTimeout(() => {
      this.setState(() => ({items: newItemList, isEditing: false}));
    }, 200);

    if (element) {
      element.contentEditable = 'false';
    }
  };

  onClickSort = (sorting: string): void => {
    this.setState({sorting: sorting})
  };

  render() {
    let stringArray = JSON.stringify(this.state.items);
    localStorage.setItem('editedDealList', stringArray);

    let sortingItems;
    switch (this.state.sorting) {
      case 'Завершенные':
        sortingItems = this.state.items.filter((item: ItemType): boolean => item.isDone);
        break;
      case 'Незавершенные':
        sortingItems = this.state.items.filter((item: ItemType): boolean => !item.isDone);
        break;
      case 'Все':
        sortingItems = this.state.items;
        break;
    }

    return (
      <Card className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>Список моих дел</h1>
          <TodoFilter
            items={this.state.items}
            onClickSort={this.onClickSort}
            sorting={this.state.sorting}
          />
        </div>
        <div className={styles.items_section}>
          <ItemList
            sorting={sortingItems}
            sortingValue={this.state.sorting}
            onClickDone={this.onClickDone}
            onClickDelete={this.onClickDelete}
            onClickRedact={this.onClickRedact}
            onChangeItem={this.onChangeItem}
          />
          <InputItem
            onClickAdd={this.onClickAdd}
            isEmpty={this.state.isEmpty}
            isExist={this.state.isExist}
          />
        </div>
      </Card>
    );
  };
}

export default Todo;

import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type ListBoxProps<T> = {
  prefix: string;
  items: T[];
  setState: React.Dispatch<React.SetStateAction<T>>;
};

function ListBox<T>({ prefix, items, setState }: ListBoxProps<T>) {
  const [listBox, _] = useState(items);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeActiveIndex = (index: number): void => {
    setActiveIndex(index);
    setState(items[index]);
  };

  return (
    <ListGroup>
      {listBox.map((item, index) => (
        <ListGroup.Item
          key={`${prefix}${index}`}
          className={`user-select-none list-group-item ${index === activeIndex && "active"}`}
          onClick={() => changeActiveIndex(index)}
        >
          {`${item}`}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListBox;

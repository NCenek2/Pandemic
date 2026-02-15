import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type ListBoxProps<T> = {
  prefix: string;
  displayItems: T[];
  items?: T[];
  onChange: (item: T) => void;
};

function ListBox<T>({
  prefix,
  displayItems,
  items,
  onChange,
}: ListBoxProps<T>) {
  const [listBox, _] = useState(displayItems);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeActiveIndex = (index: number): void => {
    setActiveIndex(index);

    if (items != undefined) {
      onChange(items[index]);
    } else {
      onChange(displayItems[index]);
    }
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

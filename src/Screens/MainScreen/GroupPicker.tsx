import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Group} from '../../Interfaces';

interface GroupPickerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  groups: Group[];
  index: number;
  changeGroupHandler?: (value: number) => void;
  editGroupHandler: (props: any) => any;
  addGroupHandler: () => void;
}

const GroupPicker = ({
  visible,
  setVisible,
  groups,
  index,
  changeGroupHandler,
  editGroupHandler,
  addGroupHandler,
}: GroupPickerProps) => {
  const [idx, setIdx] = useState(index);
  let ref = useRef<Menu>(null);
  useEffect(() => {
    if (changeGroupHandler) {
      changeGroupHandler(idx);
    }
  }, [idx]);
  return (
    <View style={styles.wrapper}>
      <Menu
        visible={visible}
        ref={ref}
        anchor={
          <Pressable style={styles.anchor} onPress={() => setVisible(true)}>
            <Icon name="bookmark" size={20} style={styles.icon} />
            {groups.length !== 0 && <Text>{groups[idx].name}</Text>}
          </Pressable>
        }
        onRequestClose={() => setVisible(false)}>
        {groups.map((group, idx) => {
          return (
            <MenuItem
              key={`group-picker-${idx}`}
              onPress={() => {
                setIdx(idx);
                setVisible(false);
              }}
              onLongPress={() => editGroupHandler(idx)}>
              {group.name}
            </MenuItem>
          );
        })}
        <MenuItem onPress={() => addGroupHandler()}>그룹 추가</MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 100,
    position: 'absolute',
  },
  anchor: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default GroupPicker;

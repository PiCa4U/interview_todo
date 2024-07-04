import React, { useCallback, useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../../api/services';
import { Item } from '../item/item';
import { styles } from './style';
import { PlusIcon } from '../../icons/plusIcon';
import { AddModal } from '../addModal/addModal';

export const Home = () => {
  const [text, setText] = useState<string>('');
  const [addModal, setAddModal] = useState<boolean>(false);
  const [add ] = useAddTodoMutation()
  const {data} =useGetTodosQuery()


  const onSubmit = useCallback(async ()=>{
    await add({title:text})
    setAddModal(!addModal)
    setText('')
  },[text])

  const clean =()=>{
    setAddModal(!addModal)
    setText('')
    return
  }

  return(
    <View style={styles.root}>
      <Modal visible={addModal} animationType="slide">
        <AddModal text={text} onSubmit={onSubmit} clean={clean} setText={setText}/>
      </Modal>
      <FlatList
        style={styles.root}
        contentContainerStyle={styles.content}
        data={data}
        renderItem={item => <Item title={item.item.title} id={item.item.id} completed={item.item.completed}/>}
      />
      <TouchableOpacity style={styles.plus} onPress={() => setAddModal(!addModal)}>
        <PlusIcon/>
      </TouchableOpacity>
    </View>
  )
}

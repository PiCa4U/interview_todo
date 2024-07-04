import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { FC, useCallback, useState } from 'react';
import { styles } from './style';
import { DeleteIcon } from '../../icons/delete';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../../api/services';
import { ChangeModal } from '../changeModal/changeModal';

type props={
  title: string;
  id:string;
}

export const Item:FC<props> =({title,id})=>{
  const [changeModal, setChangeModal] = useState<boolean>(false)
  const [titleText, setTitleText] = useState<string>('')
  const [remove] = useDeleteTodoMutation()
  const [change] = useUpdateTodoMutation()

  const onDelete = useCallback(async ()=>{
    await remove(id)
    console.log(id)
  },[])

  const onChange= useCallback( async ()=>{
    await change({id:id,title:titleText})
    setChangeModal(!changeModal)
  },[titleText])

  const clean =()=>{
    setChangeModal(!changeModal)
    setTitleText('')
    return
  }

  return(
    <View style={styles.root}>
      <Modal  visible={changeModal}>
        <ChangeModal text={titleText} onChange={onChange} clean={clean} setText={setTitleText} title={title}/>
      </Modal>
      <TouchableOpacity onPress={()=>setChangeModal(!changeModal)}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <DeleteIcon/>
      </TouchableOpacity>
    </View>
  )
}

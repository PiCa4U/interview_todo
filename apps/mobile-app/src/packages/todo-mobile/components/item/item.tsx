import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { FC, useCallback, useState } from 'react';
import { styles } from './style';
import { DeleteIcon } from '../../icons/delete';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../../api/services';
import { ChangeModal } from '../changeModal/changeModal';

type props={
  title: string;
  id:string;
  completed: boolean;
}

export const Item:FC<props> =({title,id, completed})=>{
  const [changeModal, setChangeModal] = useState<boolean>(false)
  const [titleText, setTitleText] = useState<string>('')
  const [remove] = useDeleteTodoMutation()
  const [change] = useUpdateTodoMutation()

  const onDelete = useCallback(async ()=>{
    await remove(id)
    console.log(id)
  },[])

  const onChange= useCallback( async ()=>{
    await change({id:id,title:titleText, completed:completed})
    setChangeModal(!changeModal)
  },[titleText,completed])

  const onComplete = useCallback( async ()=>{
    await change({id:id,title, completed:!completed})
  },[titleText,completed])

  const clean =()=>{
    setChangeModal(!changeModal)
    setTitleText('')
    return
  }

  console.log(completed)

  return(
    <View style={styles.root}>
      <Modal visible={changeModal}>
        <ChangeModal text={titleText} onChange={onChange} clean={clean} setText={setTitleText} title={title}/>
      </Modal>
      <TouchableOpacity onPress={onComplete} style={!completed?{width:32, height:32, borderRadius:32,borderWidth:3}:{width:32, height:32, borderRadius:32,borderWidth:3, backgroundColor:'black'}}>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setChangeModal(!changeModal)}>
        <Text style={[styles.text, completed && {textDecorationStyle: 'solid'}]}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <DeleteIcon/>
      </TouchableOpacity>
    </View>
  )
}

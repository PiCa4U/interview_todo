import { FC, useCallback, useEffect, useState } from 'react';
import classes from './todo.module.css'
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../../../../../mobile-app/src/packages/api/services';
import { Button, Input, Modal } from 'antd';
import { Pressable } from 'react-native';

type props={
  title:string;
  id:string
  completed:boolean
}

export const TodoItem:FC<props>=({title,id,completed})=>{
  const [changeModal, setChangeModal] = useState<boolean>(false)
  const [titleText, setTitleText] = useState<string>('')
  const [remove] = useDeleteTodoMutation()
  const [change] = useUpdateTodoMutation()


  useEffect(() => {
    setTitleText(title)
  }, []);

  const onDelete = useCallback(async ()=>{
    await remove(id)
    console.log(id)
  },[])

  const onCancel =()=>{
    setChangeModal(!changeModal)
    setTitleText('')
    return
  }

  const onChange= useCallback( async ()=>{
    await change({id:id,title:titleText, completed:completed})
    setChangeModal(!changeModal)
  },[titleText,completed])

  const onComplete = useCallback( async ()=>{
    await change({id:id,title, completed:!completed})
  },[titleText,completed])


  return(
    <main className={classes.item} >
      <div onClick={onComplete} style={!completed?{width:32, height:32, borderRadius:32,borderWidth:3, borderStyle:'solid', borderColor:'black'}:{width:32, height:32, borderRadius:32,borderWidth:3,borderStyle:'solid',borderColor:'black', backgroundColor:'black'}}></div>
      <div onClick={()=>setChangeModal(!changeModal)}>
        {title}
      </div>
      <DeleteOutlined onClick={onDelete}/>
      <Modal
        title={'Add some'}
        open={changeModal}
        footer={[
          <Button key='cancel' onClick={onCancel}>
            Cancel
          </Button>,
          <Button key='change' onClick={onChange} >
            Change
          </Button>
        ]}
      >
        <Input placeholder={'Write here...'} value={titleText} onChange={(e)=>setTitleText(e.target.value)}/>
      </Modal>
    </main>
  )
}

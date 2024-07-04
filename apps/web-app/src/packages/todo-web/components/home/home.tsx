import classes from './home.module.css'
import { Button, Input, List, Modal } from 'antd';
import { TodoItem } from '../todoItem/todoItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAddTodoMutation, useGetTodosQuery } from '@interview-todo/frontend_rtk_query';

export const Home = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [text, setText] = useState('');
  const {data} = useGetTodosQuery()
  const [add ] = useAddTodoMutation()

  const onCancel= useCallback(()=>{
    setModalVisible(false);
    return;
  },[])



  const onSubmit = useCallback(async ()=>{
    await add({title:text})
    setModalVisible(false)
    setText('')
  },[text, add])

  const openModal = useCallback(()=>setModalVisible(true),[])

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>)=>setText(e.target.value),[])

  return(
    <main className={classes.container}>
      <List style={{ width:'100%'}}>
        {data?.map(item=> <TodoItem title={item.title} id={item.id} completed={item.completed} key={item.id}/>)}
      </List>
      <PlusCircleOutlined style={{fontSize:80}} onClick={openModal}/>
      <Modal
        title={'Add some'}
        open={modalVisible}
        footer={[
          <Button key='cancel' onClick={onCancel}>
            Cancel
          </Button>,
          <Button key='add' onClick={onSubmit} >
            Add
          </Button>
        ]}
      >
        <Input placeholder={'Write here...'} value={text} onChange={onChangeText}/>
      </Modal>
    </main>
  )
}

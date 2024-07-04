import { useGetTodosQuery } from '../../../api/services';
import classes from './home.module.css'
import { Button, Input, List, Modal } from 'antd';
import { TodoItem } from '../todoItem/todoItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { useAddTodoMutation } from '../../../../../../mobile-app/src/packages/api/services';

export const Home = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [text, setText] = useState('');
  const {data} = useGetTodosQuery()
  const [add ] = useAddTodoMutation()

  const onCancel=()=>{
    setModalVisible(!modalVisible);
    return
  }

  const onSubmit = useCallback(async ()=>{
    await add({title:text})
    setModalVisible(!modalVisible)
    setText('')
  },[text])

  return(
    <main className={classes.container}>
      <List style={{ width:'100%'}}>
        {data?.map(item=> <TodoItem title={item.title} id={item.id} completed={item.completed}/>)}
      </List>
      <PlusCircleOutlined style={{fontSize:80}} onClick={()=>setModalVisible(!modalVisible)}/>
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
        <Input placeholder={'Write here...'} value={text} onChange={(e)=>setText(e.target.value)}/>
      </Modal>
    </main>
  )
}

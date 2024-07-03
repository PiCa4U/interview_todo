import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useGetTodosQuery } from '../../services';
import { Item } from '../item/item';
import { styles } from './style';
import { PlusIcon } from '../../../todo-mobile/icons/plusIcon';

export const Home = () => {
  const {data, refetch} =useGetTodosQuery()

  console.log(data)

  return(
    <View style={styles.root}>
      <FlatList
        style={styles.root}
        contentContainerStyle={styles.content}
        data={data}
        renderItem={item => <Item title={item.item.title}/>}
      />
      <TouchableOpacity style={styles.plus}>
        <PlusIcon/>
      </TouchableOpacity>
    </View>
  )
}

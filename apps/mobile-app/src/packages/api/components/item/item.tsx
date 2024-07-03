import { Text, TouchableOpacity, View } from 'react-native';
import { FC } from 'react';
import { styles } from './style';
import { DeleteIcon } from '../../../todo-mobile/icons/delete';

type props={
  title: string
}

export const Item:FC<props> =({title})=>{
  return(
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity>
        <DeleteIcon/>
      </TouchableOpacity>
    </View>
  )
}

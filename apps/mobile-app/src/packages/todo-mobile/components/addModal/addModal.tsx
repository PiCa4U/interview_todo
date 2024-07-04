import { styles } from '../home/style';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';

type props = {
  text: string;
  onSubmit:()=>void;
  clean:()=>void;
  setText:(text:string)=>void;
}


export const AddModal:FC<props>=({text, onSubmit, clean, setText})=>{
  return(
    <View style={styles.modal}>
      <TextInput style={styles.input} placeholder={'Write some...'} onChangeText={setText} value={text} />
      <View style={styles.buttonsStyle}>
        <TouchableOpacity disabled={text.length === 0} onPress={onSubmit} style={[styles.button, text.length === 0 && styles.disabled]}>
          <Text style={styles.text}> Add </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clean} style={styles.button}>
          <Text style={styles.text}> Go Back </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

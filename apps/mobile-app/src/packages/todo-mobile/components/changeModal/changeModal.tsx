import { styles } from '../home/style';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';

type props = {
  text: string;
  onChange:()=>void;
  clean:()=>void;
  setText:(text:string)=>void;
  title: string;
}


export const ChangeModal:FC<props>=({text, onChange, clean, setText, title})=>{
  useEffect(() => {
    setText(title)
  }, []);
  return(
    <View style={styles.modal}>
      <TextInput style={styles.input} placeholder={'Write some...'} onChangeText={setText} value={text} />
      <View style={styles.buttonsStyle}>
        <TouchableOpacity disabled={text.length === 0} onPress={onChange} style={[styles.button, text.length === 0 && styles.disabled]}>
          <Text style={styles.text}> Change </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clean} style={styles.button}>
          <Text style={styles.text}> Go Back </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

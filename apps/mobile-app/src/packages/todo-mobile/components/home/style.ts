import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
  },
  modal:{
    flex:1,
    padding:20,
    justifyContent: 'space-between'
  },
  input:{
    padding:8,
    borderWidth:3,
    borderRadius:8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button:{
    borderRadius:8,
    borderWidth:3,
    padding:16,
  },
  buttonsStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:30,
  },
  disabled: {
    opacity:0.2,
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  content:{
    padding:10,
    gap:10,
  },
  plus:{
    flex:0.3,
    justifyContent:'center',
    alignItems: 'center',
  }
})

import React from 'react';
import { View } from 'react-native';
import { useGetTodosQuery } from '../../services';

export const Home = () => {
  const {data, refetch} =useGetTodosQuery({})
  return(
    <View>

    </View>
  )
}

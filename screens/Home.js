import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { useDB } from '../context';
import { FlatList } from 'react-native';

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
  font-weight: 500;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
  elevation: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 26px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 20px;
`;

const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);
  useEffect(() => {
    if (realm) {
      const feelingObject = realm.objects('Feeling');
      setFeelings(feelingObject);
      feelingObject.addListener(() => {
        const feelingObject = realm.objects('Feeling');
        setFeelings(feelingObject);
      });
      return () => {
        feelingObject.removeAllListeners();
      };
    }
  }, []);

  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyExtractor={(feeling) => feeling._id + ''}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name='add' color={colors.textColor} size={40} />
      </Btn>
    </View>
  );
};

export default Home;

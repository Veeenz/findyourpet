import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Body, Container, Content} from 'native-base';
const ErrorCard = (props) => {
  return(
        <Content>
            <Card >
                <CardItem>
                  <Body>
                    <Text>
                        {props.children}
                    </Text>
                  </Body>
                </CardItem>
            </Card>
        </Content>
  );
}

export default ErrorCard;

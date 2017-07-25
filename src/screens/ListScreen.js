import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right, Button } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => {

    return {
        pet: state.pet
    }
}
class ListScreen extends Component {
  static navigationOptions = {
      title: 'List'
  }
    renderPetList = () => {

        return this.props.pet.list.map((pet, i) => {
            const { title, descr, images } = pet
            return (
                <Card
                    key={i}
                    onPress={() => this.props.navigation.navigate( "Pet",{ pet: pet })}
                >
                    <CardItem button={true} onPress={() => this.props.navigation.navigate( "Pet",{ pet: pet, idUser: pet['idUser'] })}>
                        <Image
                            source={{ uri: images[images.length-1] }}V
                            resizeMode="cover"
                            style={{ height :80, width: 80}}
                        >
                        </Image>
                        <Text style={{marginLeft:10}}>{title}</Text>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </CardItem>
                </Card>
            )
        })
    }
    render() {
        return (
            <Container>
                <Content>
                    {this.renderPetList()}
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, null)(ListScreen)

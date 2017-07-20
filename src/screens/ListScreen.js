import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right, Button } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    const petList = Object.keys(state.pet.petList).map(id => {
        return { ...state.pet.petList[id] }
    });
    return {
        pet: petList
    }
}
class ListScreen extends Component {
    renderPetList = () => {

        return Object.keys(this.props.pet).map((key) => {
            console.log(key)
            const { title, descr, images } = this.props.pet[key]
            return (
                <Card
                    key={key}
                    onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })}
                >
                    <CardItem button={true} onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })}>
                        <Image
                            source={{ uri: images[images.length-1] }}
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
        console.log('list screen props')
        console.log(this.props.pet)
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

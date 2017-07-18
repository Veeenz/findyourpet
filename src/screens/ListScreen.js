import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { connect } from 'react-redux'

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
            const { title, descr } = this.props.pet[key]
            return (
                <Card
                    key={key}
                    onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })}
                >
                    <CardItem>
                        <Icon active name="logo-googleplus" />
                        <Text onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })} >{'title' + title}</Text>
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

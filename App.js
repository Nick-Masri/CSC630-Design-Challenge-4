import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      swapiList: [],
      page: 1,
      loading: true,
    }
  }

  async componentDidMount(){
    try {
      this.makeRemoteRequest();
    } catch(err) {
      console.log(err)
    }
  }

  async makeRemoteRequest(){
    const page = this.state.page;
    const starWarsApiCall = await fetch('https://swapi.co/api/people/?page='+page);
    const starWarsPeople = await starWarsApiCall.json();
    if (page <= 9){
      this.setState({
        swapiList: this.state.swapiList.concat(starWarsPeople.results),
        loading: false
      })
    }
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.makeRemoteRequest();
    }
  )}

  renderItem(data) {
    return <View style={styles.listItem}>
            <Text style={styles.listItemTextMain}>{data.item.name}</Text>
            <Text style={styles.listItemText}>Height: {data.item.height }</Text>
            <Text style={styles.listItemText}>Mass: {data.item.mass}</Text>
            <Text style={styles.listItemText}>Hair Color: {data.item.hair_color}</Text>
            <Text style={styles.listItemText}>Skin Color: {data.item.skin_color}</Text>
            <Text style={styles.listItemText}>Eye Color: {data.item.eye_color}</Text>
            <Text style={styles.listItemText}>Birth Year: {data.item.birth_year}</Text>
            <Text style={styles.listItemText}>Gender: {data.item.gender}</Text>
          </View>
  }

  render() {
    const { swapiList, loading } = this.state;
    if(loading){
      return <ActivityIndicator/>
    }
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Star Wars Characters List</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={swapiList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.name}
            onEndReached={this.handleLoadMore}
            onEndThreshold={10000}
            />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 40,
    justifyContent: 'center',
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e5b13a',
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'stretch',
  },
  listItemText: {
    flex: 0,
  },
  listItemTextMain: {
    flex: 0,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  list:{
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  }
});

import React, { useState } from 'react';
import { AppRegistry, Image, StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }
  
  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ], currentPlayer: 1
    });
  }

  // Returns 1 if player 1 won, -1 if player 2 won or 0 if no one has won
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    // Check rows
    for(var i = 0; i < NUM_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    // Check columns
    for(var i = 0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    // Check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    // There are no winners
    return 0;
  }

  // Draw tiles
  onTilePress = (row, col) => {
    // Don't allow tiles to change
    var value = this.state.gameState[row][col];
    if(value !== 0) {return;};

    // Grab current player
    var currentPlayer = this.state.currentPlayer;

    // Set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    // Switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    // Check for winners
    var winner = this.getWinner();
    if(winner == 1){ 
      Alert.alert("TOM HA GANADO :D");
      this.initializeGame();
    }else if(winner == -1){
      Alert.alert("ISABELLE HA GANADO :D");
      this.initializeGame();
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];

    switch(value)
    {
      case 1: return <Image style={styles.tinyLogo} source={require('./assets/Tom.png')} />;
      case -1: return <Image style={styles.tinyLogo} source={require('./assets/Isabelle.png')} />;
      default: return <View />;
    }
  }

  renderGamerCurrent = () => {
    let currentPlayer = this.state.currentPlayer;
    switch (currentPlayer) {
      case 1: return <Image style={styles.tinyLogo} source={require('./assets/Tom.png')} />;
      case -1: return <Image style={styles.tinyLogo} source={require('./assets/Isabelle.png')}/>;
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  render() {
    return (
      <ImageBackground source={require('./assets/ac.jpeg')} style={styles.image}>

        <View style={styles.containerLogo}>
          <Image style={styles.logo}source={require('./assets/ac_title.png')} />
        </View> 

        <View style={styles.containerGameCurrent}>
          <Text style={styles.CurrentPlayerText}>Es el turno de: </Text>
          {this.renderGamerCurrent()}
        </View>

        <View style={styles.container_padre}>
          <View style={styles.container_hijo}>
            <View style={{flexDirection: 'row', marginTop: 6}}>
              <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
                {this.renderIcon(0, 0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
                {this.renderIcon(0, 1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
                {this.renderIcon(0, 2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
                {this.renderIcon(1, 0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
                {this.renderIcon(1, 1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0}]}>
                {this.renderIcon(1, 2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 6}}>
              <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
                {this.renderIcon(2, 0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
                {this.renderIcon(2, 1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
                {this.renderIcon(2, 2)}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{paddingTop: 10}}/>

        <TouchableHighlight
            style={styles.submit}
            onPress={() => this.onNewGamePress()}
            underlayColor='#fff'>
            <Text style={styles.submitText}>New Game</Text>
        </TouchableHighlight>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container_padre: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 20,
    padding: 15
  },
  container_hijo: {
    padding: 15, 
    backgroundColor: "white", 
    borderRadius: 20, 
    borderStyle: "dashed", 
    borderColor: "black", 
    borderWidth: 2
  },
  tile: {
    borderWidth: 4,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  image: {
    flex:1,
    justifyContent: "center",
    alignItems: 'center',
  },
  submit:{
    padding: 12,
    backgroundColor:'#836122',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
  submitText:{
      color:'#F0DF1B',
      textAlign:'center',
      fontSize: 20
  },
  containerGameCurrent: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#836122",
    opacity: 0.85,
    width: '80%',
    borderRadius: 5
    
  },
  CurrentPlayerText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'lucida grande',
    color: 'white'
  },
  containerLogo:{
    display: 'flex',
    justifyContent: 'flex-start',
    width: '80%',
  },
  logo:{
    width: 175,
    height: 110
  },
});

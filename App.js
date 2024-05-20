import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './player';


export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(0);

  const [audio, setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([ //tudo dentro dos colchetes será lido como musicas

    {
        nome: 'wake up',
        artista: 'KOTONOHOUSE',
        playing: false,
        file: require('./audio.mp3')
    },
    {
      nome: 'wake up',
      artista: 'KOTONOHOUSE',
      playing: false,
      file: require('./audio.mp3')
  },
    {
      nome: 'Nicknames',
      artista: 'Dayglow',
      playing: false,
      file: require('./audio.mp3')
    },
    {
    nome: 'had2do',
    artista: 'MICO',
    playing: false,
    file: require('./audio.mp3')
    },


  ]); 

  const changeMusic = async (id) =>{ //função sendo criada com const, onde o 'k', indica um id 
    
      let curFile = null;
    
    let newMusics = musicas.filter((val,k)=>{
          if(id ==k){  //se o id for k, a musica tocará
              musicas[k].playing = true;

              curFile = musicas[k].file;
              setPlaying(true);
              setarAudioIndex(id);
          }else{
              musicas[k].playing = false;
          }

          return musicas[k]
    })

    if(audio != null){ //para que as músicas nao toquem juntas
        audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{ //como tudo precisa ser feito de forma assincrona, esperamos até que a função seja chamada
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
    }catch(error){}

    setarAudio(curAudio);
    setarMusicas(newMusics); //para que uma função funcione, ela precisa ser chamada por algo

  }





  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.fundo}>
        <StatusBar hidden></StatusBar>
          <View style={styles.header}>
            <Text style={{textAlign:'center', color:'white', fontSize:25}}>Song Player</Text>
          </View>

          <View style={styles.table}>
            <Text style={{width:'50%',color:'rgb(200,200,200'}}>Músicas</Text>
            <Text style={{width:'50%',color:'rgb(200,200,200'}}>Artistas</Text>
          </View>

          {
            musicas.map((val,k)=>{ //k servira para verificar o array

                if(val.playing){
                  //renderizar aqui
                  return(
                  <View style={styles.table}>
                    <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                      <Text style={styles.tableTextSelected}><AntDesign name="play" size={15}
                       color="#1DB954"/> {val.nome}</Text>
                      <Text style={styles.tableTextSelected}>{val.artista}</Text>
                    </TouchableOpacity>
                  </View>
                  );
                }else{
                  //senao aqui
                  return(
                  <View style={styles.table}>
                    <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                      <Text style={styles.tableText}><AntDesign name="play" size={15}
                       color="white"/> {val.nome}</Text>
                      <Text style={styles.tableText}>{val.artista}</Text>
                    </TouchableOpacity>
                  </View>
                  );
                }
              })
            }
            
        <View style={{paddingBottom:200}}></View>
    </ScrollView>
    <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex} musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}
    setarAudioIndex={setarAudioIndex}></Player>
  </View>
  );
}


const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor:'#1DB9554',
    width:'100%',
    padding:20
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:1
  },
  tableText:{width:'50%',color:'white'},
  tableTextSelected:{width:'50%',color:'#1DB954'}
});

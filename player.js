import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import { Audio } from 'expo-av';



export default function Player(props) { //podemos adicionar props para usar propriedades de outros arquivos

    const handlePlay = async()=>{
        let curFile = props.musicas[props.audioIndex].file;

        let newMusics = props.musicas.filter((val,k)=>{
            if(props.audioIndex == k){  //se o id for k, a musica tocará
                props.musicas[k].playing = true;
                curFile = props.musicas[k].file;
            }else{
                props.musicas[k].playing = false;
            }
            return props.musicas[k];
      })
      try{
        if(props.audio != null){
            props.setPlaying(true);
            props.setarMusicas(newMusics);
            await props.audio.playAsync();
        }else{
            let curAudio = new Audio.Sound();
            try{
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error){}

            props.setarAudio(curAudio);
            props.setarMusicas(newMusics);
            props.setPlaying(true);
        }
      }catch(error){}



    }
    const handlePause = async()=>{
        if(props.audio!= null){
            props.audio.pauseAsync();
        }
        props.setPlaying(false)
    }



    const handleBack = async ()=>{
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0){
            newIndex = props.musicas.length - 1;
        }
        props.setarAudioIndex(newIndex);

        let curFile = props.musicas[newIndex].file;
        //atualizar interface do app
        let newMusics = props.musicas.filter((val,k)=>{
            if(props.audioIndex == k){  //se o id for k, a musica tocará
                props.musicas[k].playing = true;
                curFile = props.musicas[k].file;
            }else{
                props.musicas[k].playing = false;
            }
            return props.musicas[k];
      })
      //reproduzir audio em questao
      if(props.audio != null){
            props.audio.unloadAsync();
    }
        let curAudio = new Audio.Sound();
        try{
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
    }



    const handleNext = async()=>{
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.musicas.length){
            newIndex = 0;
        }
        props.setarAudioIndex(newIndex);

        let curFile = props.musicas[newIndex].file;
        //atualizar interface do app
        let newMusics = props.musicas.filter((val,k)=>{
            if(props.audioIndex == k){  //se o id for k, a musica tocará
                props.musicas[k].playing = true;
                curFile = props.musicas[k].file;
            }else{
                props.musicas[k].playing = false;
            }
            return props.musicas[k];
      })
      //reproduzir audio em questao
      if(props.audio != null){
            props.audio.unloadAsync();
    }
        let curAudio = new Audio.Sound();
        try{
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
    
    }




    return(
        <View style={styles.Player}>
            <TouchableOpacity  onPress={()=> handleBack()}style={{marginRight:20, marginLeft:20}}>
                <AntDesign name='banckward' size={35} color="white"/>
            </TouchableOpacity>
            {
            (!props.playing)? //se props for diferente de playing
            <TouchableOpacity onPress={()=> handlePlay()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name='playcircleo' size={35} color="white"/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>handlePause()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name='pausecircleo' size={35} color="white"/>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=> handleNext()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name='forward' size={35} color="white"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    Player:{
        width:'100%',
        height:100,
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:999, //prioridade na renderização
        backgroundColor:'#111',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }

});
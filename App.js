

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,FlatList ,View, Text,TouchableOpacity} from 'react-native';
import axios from 'axios' //npm i axios

//componentes personalizados
import ItemLibro from './component/ItemLibro'
import Input from './component/Input'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
export default function App() {

 const [listaLibros, setListaLibros] = useState([])
 const [nome, setNome] = useState('')
 const [email, setEmail] = useState('')
 const [id, setId] = useState('')
 const [bandera, setBandera] = useState(false) 
 useEffect(() => {
    getLibros()
  }, [])

 const getLibros = async() => {
   const resposta = await axios.get('http://localhost/apilibro/')
   setListaLibros(resposta.data)
}

 const addLibro = async() => {
  const obj = {nome, email}
  const resposta = await axios.post('http://localhost/apilibro/', obj)
  alert(resposta.data.msg)
  getLibros()
  setNome('')
  setEmail('')
}

const deleteLibro = async (props) => {
  const id = props.id
  const resposta = await axios.delete('http://localhost/apilibro/?id='+id)
  alert(resposta.data.msg)
  getLibros()
}

const getLibro = async(props) => {
  const id = props.id
  const resposta = await axios.get('http://localhost/apilibro/?id='+id)
  setId(resposta.data.id)
  setNome(resposta.data.nome)
  setEmail(resposta.data.email)
  setBandera(!bandera)
} 

const updateLibro = async() => {
  const obj = {id, nome, email} 
  const resposta = await axios.put('http://localhost/apilibro/',obj)
  alert(resposta.data.msg)
  setId('') 
  setNome('')
  setEmail('')
  setBandera(false)
  getLibros()
} 

const addOrUpdate = () => {
 {bandera? updateLibro() : addLibro() }
}

 const renderItem = ({ item }) => (
    <ItemLibro id={item.id} getlibro={getLibro}
       nome={item.nome} email={item.email} mypress={deleteLibro}
    /> )

return (
   <View style={styles.container}>
      <View style={{flex:0.1, marginTop:20,marginBottom:25 }} >
         <Text style={{fontWeight:'bold',color:'#0E69E5', fontSize:20}}>
            Criar usuário 
          </Text>
      </View> 
      <Input texto={"Nome"} valor={nome} campo={e=>setNome(e)}/>
      <Input texto={"E-mail"} valor={email} campo={e=>setEmail(e)}/>
      <TouchableOpacity 
            style={{backgroundColor:'#345456', padding:15,borderRadius:12}}
            onPress={addOrUpdate}  >
          <Text style={{color:'#fff'}}>{bandera? "Edit":"Adicionar"}</Text>
      </TouchableOpacity>

     <FlatList
        style={{marginTop:15}}
        data={listaLibros}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
      />
      <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





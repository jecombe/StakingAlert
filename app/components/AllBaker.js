
import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { Modal, Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Emoj1, Emoj2, Emoj4 } from './Emoji';
import { Details } from './Details';
import Header from './Header'

function AllBaker() {
  const [bakers, setBakers] = useState([]);

  const [modalVisible, setModal] = useState(false)
  const [selected, setSelected] = useState([])

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const URL = `https://api.baking-bad.org/v2/bakers`;

  const goBack = (data) => {
    setModal(true)
    setSelected(data)
  }

  const onPressDetails = () => {
    setModal(false)
    setSelected([])

  }

  const Item = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => goBack(data)}
      >
        <View style={styles.row}>
          <Emoj4 data={data} />
          <Image
            style={styles.img}
            source={{ uri: `${data.logo}` }}
          />
          <View>
            <Text style={styles.primaryText}>
              {data.name}
            </Text>
            <Text style={styles.secondaryText}>
              {data.address}
            </Text>
          </View>
          <Emoj1 data={data} />
          <Emoj2 data={data} />
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .then(responseJson => {
        setBakers(responseJson);
        setSearchResults(responseJson)
      })
      .catch(error => {
        console.error(error);
      });

  }, [])

  const _renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: 'grey', marginLeft: 1 }} />
  )

  const handleChange = event => {
    setSearchTerm(event.nativeEvent.text);
  };

  useEffect(() => {
    const results = bakers.filter(baker =>
      baker.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm]);

  console.log("rednder")
  return (
    <>
     <Header titleText='All bakers' />
      <SearchBar
        placeholder="Type Here..."

        value={searchTerm}
        onChange={handleChange}
      />
    <View style={{ marginTop: 22 }}>
   
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModal(false)
        }}>
        <Details data={selected} />
        <TouchableOpacity
          onPress={() => onPressDetails()}
          style={styles.button2}
        >
          <Text >GO BACK</Text>
        </TouchableOpacity>
      </Modal>

      <FlatList
        data={searchResults}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={_renderSeparator}
      />
    </View>
    </>
  );

}

const styles = StyleSheet.create({

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  row: { flexDirection: 'row', alignItems: 'center', padding: 20 },

  img: { width: 40, height: 40, borderRadius: 20, marginRight: 18 },

  primaryText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 4,
  },
  secondaryText: { color: 'grey', fontSize: 10 },

  button: {
    height: 50,
    borderColor: '#F0F4F5',
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10
  },

  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },

})



export default AllBaker;
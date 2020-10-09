/**
 * Sample React Native App demos react-native-alphabet-flat-list-flexible SWAlphabetFlatList component.
 * React Native - https://github.com/facebook/react-native
 * SWAlphabetFlatList - thank you to https://github.com/UseAllFive/react-native-alphabet-flat-list
 * and https://github.com/yoonzm/react-native-alphabet-flat-list
 * Helpful post:
 * https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
 * 
 * @format
 * @flow strict-local
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SWAlphabetFlatList from 'react-native-alphabet-flat-list-flexible';
import { CustomSectionHeader } from './CustomSectionHeader';

// Demo list of items.
let CONTACTS = {
	A: [{name:'Edith Abbott'}, {name:'Kenneth Arrow',desc:"a major figure in post-World War II neo-classical economic theory"}],
	B: [{name:'Robert Barro'}, {name:'Walter Block'} ],
	C: [{name:'John Elliot Cairnes', desc: "often described as the \"last of the classical economists\""}, {name:'Gustav Cassel'}, {name:'Jean-Baptiste Colbert'}],
	D: [{name:'Stephen J. Dubner'}, {name:'J. Bradford DeLong', desc: "Deputy Assistant Secretary of the U.S. Department of the Treasury in the Clinton Administration under Lawrence Summers"}],
	E: [{name:'Shlomo Eckstein'}, {name:'Francis Ysidro Edgeworth'}, {name:'Sebastian Edwards'}, {name:'Martin Eichenbaum'}, {name:'Ernst Engel'}, {name:'Vanessa Erogbogbo'}],
	H: [{name:'Trygve Haavelmo'}],
	M: [{name:'Mark J. Machina'}, {name:'Karl Marx'}, {name:'Alva Myrdal'}],
	T: [{name:'Alex Tabarrok'}, {name:'Nassim Taleb', desc: "essayist, scholar, mathematical statistician, and former option trader and risk analyst"}, {name:'Richard Thaler', desc : "theorist in behavioral economics"}, {name:'Frank William Taussig', desc : "creating the foundations of modern trade theory."}, {name:'Fred M. Taylor', desc : "contributed to the theory of market socialism."}, {name:'William Thompson'},
	{name:'Catherine Tucker', desc : "known for research into the consequences of digital data for privacy, algorithmic bias, digital health and online advertising"},
	{name:'Gordon Tullock', desc : "worked on public choice theory"}]
};

/* short for testing!
const CONTACTS = {
	A: [{name:'AAA', id:1}, {name:'AAAAA',id:2}],
	B: [{name:'B', id:3}, {name:'BBBB', id:4} ]
};
*/

class App extends React.Component {
	constructor(props) {
		super(props);
		this.renderEach = this.renderEach.bind(this);
		this.state = {
			dataSourceCoordinates : {}
		}
		this.addIds();
		console.warn(JSON.stringify(CONTACTS));
	}

	addIds() {
		let counter = 0;
		Object.keys(CONTACTS).forEach(function(letter) {
			CONTACTS[letter].forEach(function(obj) {
				obj['id'] = counter++;
			});
		});
	}

	handleChildLayout = (data) => {
		var obj = {};
		obj[data.id] = data;
		var newKey = "" + data.id;
		this.setState(prevState => {
			let z = { ...prevState.dataSourceCoordinates };
			z[newKey] = data;
			return {dataSourceCoordinates : z};
		});
	}
	
	/**
	 * Returns a View with the item text.
	 * @param {Object} is for example {"item":"Test1","index":0,"sectionId":"T","last":false}
	 */
	renderEach(obj) {
		// Expected Object input to look something like this:
		// {"item":{"name":"Richard Thaler","id":22},"index":2,"sectionId":"T","last":false}
		return <KeyedView key={obj.item.id}
			id={obj.item.id}
			name={obj.item.name}
			handleChildLayout={this.handleChildLayout}
			desc={obj.item.desc}/>
	}

	render() { return (
		<SWAlphabetFlatList
			data={CONTACTS}
			renderItem={this.renderEach}
			sectionHeaderComponent={CustomSectionHeader}
			dataSourceCoordinates={this.state.dataSourceCoordinates}
		/>);
	}
};

/**
 * KeyedView is a View that has a unique id.
 */
class KeyedView extends React.Component {
	constructor(props) {
		super(props);
	}
	handleOnLayout = (e) => {
		this.props.handleChildLayout({
			id: this.props.id,
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
			x: e.nativeEvent.layout.x,
			y: e.nativeEvent.layout.y
		});
	}

	render () { return (<View key={this.props.key} onLayout={this.handleOnLayout} style={this.props.style}>
	<Text style={styles.item}>{this.props.name}</Text>
	{this.props.desc &&
	<Text style={styles.item}>{this.props.desc}</Text>
	}
	</View>);
	}

};

/**
 * These styles are used to style each header and item in the list.
 * You can change section header height and item height here.
 */
const styles = StyleSheet.create({
	item: {
	  paddingHorizontal: 15,
	  paddingVertical: 15,
	  height:200
	},
	header: {
	  fontSize: 12,
	  fontFamily: 'Cochin',
	  paddingHorizontal: 15,
	  paddingVertical: 15,
	  height:40,
	  borderWidth:10,
	  borderColor:'green'
	}
  });
  
export default App;

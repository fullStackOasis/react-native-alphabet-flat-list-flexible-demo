import { Text, View } from 'react-native';
import React from 'react';

/**
 * Each SectionHeader must know its y position and its index.
 * These are passed down as props.
 */
export class CustomSectionHeader extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
		let h = this.props.h;
		let title = this.props.title;
		return (
    <View
      style={{
        height: 50,
        justifyContent: 'center',
				backgroundColor: '#e9f5f0',//'#F4F4F4',
				borderColor: 'black',
				borderHeight:1,
        paddingLeft: 20
			}}
    >
			<Text
				style={{
					color: '#888',
					fontSize: 20
				}}
			>
        {title}
      </Text>
    </View>
  );
	};
}

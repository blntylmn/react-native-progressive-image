import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { Animated, View, Image, StyleSheet } from 'react-native'

// https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSourcePropType.js
const ImageURISourcePropType = PropTypes.shape({
	uri: PropTypes.string
})

const ImageSourcePropType = PropTypes.oneOfType([
	ImageURISourcePropType,
	// Opaque type returned by require('./image.jpg')
	PropTypes.number,
	// Multiple sources
	PropTypes.arrayOf(ImageURISourcePropType)
])

const FastImageAnimated = Animated.createAnimatedComponent(FastImage)

export default class ProgressiveImage extends Component {
	static propTypes = {
		placeHolderColor: PropTypes.string,
		placeHolderSource: ImageSourcePropType,
		// imageSource: ImageSourcePropType.isRequired,
		imageFadeDuration: PropTypes.number.isRequired,
		onLoadThumbnail: PropTypes.func.isRequired,
		onLoadImage: PropTypes.func.isRequired,
		thumbnailSource: ImageSourcePropType.isRequired,
		thumbnailFadeDuration: PropTypes.number.isRequired,
		thumbnailBlurRadius: PropTypes.number,
		urlImage: PropTypes.string
	}

	static defaultProps = {
		thumbnailFadeDuration: 250,
		imageFadeDuration: 250,
		thumbnailBlurRadius: 5,
		onLoadThumbnail: Function.prototype,
		onLoadImage: Function.prototype
	}

	constructor(props) {
		super(props)
		this.state = {
			imageOpacity: new Animated.Value(0),
			thumbnailOpacity: new Animated.Value(0),
			errorImage: false,
			imageDefault: 'https://facebook.github.io/react/img/logo_og.png'
		}
	}

	onLoadThumbnail() {
		Animated.timing(this.state.thumbnailOpacity, {
			toValue: 1,
			duration: this.props.thumbnailFadeDuration
		}).start()
		this.props.onLoadThumbnail()
	}

	onLoadImage() {
		Animated.timing(this.state.imageOpacity, {
			toValue: 1,
			duration: this.props.imageFadeDuration
		}).start()
		this.props.onLoadImage()
	}
	onError(e) {
		this.setState({ errorImage: true })
	}

	render() {
		// console.log(this.props.imageSource)
		return (
			<View style={this.props.style}>
				<Image
					resizeMode="cover"
					style={[styles.image, this.props.style]}
					source={this.props.placeHolderSource}
				/>
				<FastImageAnimated
					resizeMode="cover"
					style={[
						styles.image,
						{ opacity: this.state.thumbnailOpacity },
						this.props.style
					]}
					//	source={this.props.thumbnailSource}
					source={{
						uri: this.props.urlImage,
						headers: { Authorization: 'someAuthToken' },
						priority: FastImage.priority.normal
					}}
					onLoad={() => this.onLoadThumbnail()}
					blurRadius={this.props.thumbnailBlurRadius}
				/>
				<FastImageAnimated
					resizeMode="cover"
					style={[
						styles.image,
						{ opacity: this.state.imageOpacity },
						this.props.style
					]}
					source={
						this.state.errorImage
							? {
									uri:
										'http://geekycentral.com/wp-content/uploads/2017/09/react-native.png'
								}
							: {
									uri: this.props.urlImage
								}
					}
					onLoad={() => this.onLoadImage()}
					onError={e => this.onError(e)}
				/>
			</View>
		)
	}
}

// source={this.props.imageSource}

const styles = StyleSheet.create({
	image: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
})

# ProgressiveImage

🌁 ProgressiveImage, progressively load images with React Native.

[![npm](https://img.shields.io/npm/v/react-native-progressive-image.svg?style=flat-square)](https://www.npmjs.com/package/react-native-progressive-image)
[![license](https://img.shields.io/github/license/DylanVann/react-native-progressive-image.svg?style=flat-square)](https://github.com/DylanVann/react-native-progressive-image/blob/master/LICENSE)

<p align="center" >
  <img src="http://i.imgur.com/Ww5qqKz.gif" title="ProgressiveImage Demo">
  <br>
  <em>Demo of ProgressiveImage.</em>
</p>

Progressively load images. Loads a small thumbnail first. Includes fade and blur effects.

## Installation

```bash
yarn add react-native-progressive-image
```
### and
```bash
yarn add react-native-fast-image
react-native link
```


## Usage

```javascript
import ProgressiveImage from 'react-native-progressive-image'

const TheProgressiveImage = () =>
  <ProgressiveImage
    thumbnailSource={{ uri: 'http://i.imgur.com/O249H4P.png?bust' + Math.random() }}
    urlImage={'https://www.wallpaperup.com/uploads/wallpapers/2013/03/23/58680/bb4dead81d6348db89062e77ea0c287e.jpg'}
    style={{ flex: 1, alignItems: 'stretch' }}
  />
```

## Properties

| Prop | Description | Default |
|---|---|---|
| **`imageSource`** |  Image source (e.g. { uri: 'https://facebook.github.io/react/img/logo_og.png' }). | None |
| **`thumbnailSource`** | Should be a low resolution version of the image used in `imageSource`. | None |
| **`thumbnailBlurRadius`** | Blur radius for the low resolution thumbnail (iOS only). | `5` |
| **`style`** | Make sure to include width and height, or use flex. | None |
| **`imageFadeDuration`** | Fade-in duration for the image in ms. | `250` |
| **`thumbnailFadeDuration`** | Fade-in duration for the thumbnail in ms. | `250` |
| **`onLoadThumbnail`** | Callback function that gets called when the thumbnail is loaded. | `noop` |
| **`onLoadImage`** | Callback function that gets called when the main image is loaded. | `noop` |
| **`urlImage`** | url image Strign. Image source (e.g. {'https://facebook.github.io/react/img/logo_og.png' }).| None |

### imageSource fue reemplazado por urlImage y ahora es un string, ejemplo 
```javascript
urlImage={'https://www.wallpaperup.com/uploads/wallpapers/2013/03/23/58680/bb4dead81d6348db89062e77ea0c287e.jpg'}
```

## Credits

Based on [Sharath Prabhal's blog post](https://medium.com/the-react-native-log/progressive-image-loading-in-react-native-ecc88e724343#.e5pm41efa).

import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#f8f9fa', 
    },
    homeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333', 
    },
    homeSubtitle: {
      fontSize: 18,
      marginBottom: 20,
      color: '#666', 
    },
    input: {
      width: '80%',
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 10,
      fontSize: 16,
  },
  buttonLogin: {
      width: '80%',
      height: 50,
      backgroundColor: '#1E90FF',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  buttonRegister: {
    width: '80%',
    height: 50,
    backgroundColor: '#3bc91c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
  buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },


  //image style:
  image: {
    flex: 1,        
    width: '100%',  
    height: '100%', 
  },

singleImage: {
    width: "100%",
    aspectRatio: 16/9,
},
//for two images layout
twoimageHorizontal0: {
    width: "100%",
    aspectRatio: 16/9,
},
twoimageHorizontal: {
    width: "100%",
    aspectRatio: 16/9,
    marginTop:2
},
twoimageVertical0: {
    width: '49.6%',
    borderRadius: 10,
    aspectRatio: 9/16,
},
twoimageVertical: {
    width: '49.6%',
    aspectRatio: 9/16,
},
twoimageSquare0: {
    width: '49.6%',
    aspectRatio: 1/1,
},
twoimageSquare: {
    width: '49.6%',
    aspectRatio: 1/1,
},
// For three images layout
threeimageHorizontal0: {
    width: "100%",
    aspectRatio: 3/2,
    marginBottom:3
},
threeimageHorizontal: {
    width: '49.5%',
    aspectRatio: 3/2,
},
threeimageVertical0: {
    width: '62%',
    aspectRatio: 9/16,
    margin:3
},
threeimageVertical: {
    width: '60.4%',
    aspectRatio: 2/3,
    borderRadius: 10,
    marginTop:3
},
threeimageSquare0: {
    width: '33%',
    aspectRatio: 1/1,
    borderRadius: 10,
},
threeimageSquare: {
    width: '33%',
    aspectRatio: 1/1,
    borderRadius: 10,
},
// For four images layout (same logic applies)
fourimageHorizontal0: {
    width: '100%',
    aspectRatio: 3/2,
    marginBottom:1.5
},
fourimageHorizontal: {
    width: '33%',
    aspectRatio: 1/1,
    marginTop:2
},
fourimageVertical0: {
    width: '66.5%',
    aspectRatio: 2/3,
    margin:1.5,
    marginRight:3
},
fourimageVertical: {
    width: '57%',
    aspectRatio: 1/1,
},
fourimageSquare0: {
    width: '49%',
    aspectRatio: 1/1,
    margin:1.5
},
fourimageSquare: {
    width: '49%',
    aspectRatio: 1/1,
    margin:1.5
},
// Overlay for + images count
overlay: {
    position: 'absolute', // Absolute positioning to cover the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
},
remainingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
},
// modal full screen image
modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
},
fullScreenImageContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
},
fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
},
navButtonNext: {
    position: 'absolute',
    top: '48%',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)',
},
navButtonPrevious: {
    position: 'absolute',
    top: '48%',
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)',
},
navButtonText: {
    fontSize: 30,
    color:'rgba(255, 255, 255, 255)'
},

fullScreenVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',  
   
},
fullScreenVideo: {
    width: '100%',  
    height: '100%',
},
renderVideo: {
    width:Dimensions.get('window').width,  
    aspectRatio: 16/9,
    margin:3,
    justifyContent:"center",
    alignItems:"center",
},
video: {
    flex: 1,        
    width: '100%',  
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    resizeMode:'contain',

  },


//loading container
actionsContainer: {
    marginBottom: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
},
hiddenImage: {
    width: 0,
    height: 0, 
  },

  });

  export default styles
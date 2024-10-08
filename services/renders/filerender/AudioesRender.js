import { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

export default AudioesRender = ({ item }) => {
  const [isAudioVisible, setAudioVisible] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Open and prepare the audio file to play
  const handlePress = (filePath) => {
    loadAudio(filePath); 
    setAudioVisible(true); 
  };

  const loadAudio = (filePath) => {
    setIsPlaying(true);
    const sound = new Sound(filePath, null, (error) => {
      if (error) {
        Alert.alert('Error', 'Failed to load the audio file.');
        return;
      }
      sound.play(() => {
        setIsPlaying(false); 
      });
      setIsPlaying(true); 
      setAudioPlayer(sound);
    });
  };

  // Play or Pause audio
  const togglePlayPause = () => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play(() => {
            setIsPlaying(false); 
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const closeAudio = () => {
    if (audioPlayer) {
      audioPlayer.stop(() => {
        console.log('Audio stopped');
      });
      audioPlayer.release(); 
      setIsPlaying(false);
    }
    setAudioVisible(false);
  };

  return (
    <View style={styles.container}>
      {item.map((file, index) => (
        <TouchableOpacity
          style={styles.attachmentContainer}
          key={index}
          onPress={() => handlePress(file.info.original.url)}
        >
          <Icon name="file-sound-o" size={30} style={{ color: 'black' }} />
          <Text style={styles.fileName}>{file.original_name}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for audio control */}
      <Modal visible={isAudioVisible} onRequestClose={closeAudio} animationType="slide">
        <View style={styles.modalContainer}>
          <Icon
            name={isPlaying ? 'pause-circle' : 'play-circle'} 
            size={60}
            onPress={togglePlayPause}
            style={styles.playPauseButton}
          />
          <Icon
            name="arrow-left"
            size={24}
            onPress={closeAudio}
            style={styles.closeButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingBottom: 5,
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomColor: '#ccc',
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
    color:'black'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 5,
    padding: 10,
    borderRadius: 5,
  },
  playPauseButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

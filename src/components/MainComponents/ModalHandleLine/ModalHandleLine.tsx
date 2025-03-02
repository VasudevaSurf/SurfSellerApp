import {styles} from './ModalHandleLine.styles';

const View =
  require('react-native/Libraries/Components/View/ViewNativeComponent').default;

export function ModalHandleLine() {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line}></View>
    </View>
  );
}

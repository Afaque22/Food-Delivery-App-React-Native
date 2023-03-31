import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e17055'
  },
  view2: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40
  },
  textBox: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#fab1a0',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderStyle: 'solid',
    backgroundColor: 'white',
    flexDirection: 'row'

  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    backgroundColor: 'lightgrey',
  },
  buttonStyle: {
    borderRadius: 10,
    borderStyle: 'solid',
    backgroundColor: "#e17055",
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  gettxt: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 8,
    color: 'black',
    textAlign: 'center'
  },
  welcomeTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
    flex: 0.25,
    textAlignVertical: 'center',
    marginStart: 40
  },
  loginTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fab1a0',
    margin: 20
  },
  inputImg: {
    width: 20,
    height: 20,
    marginTop: 14,
    marginStart: 5,
    marginRight: 5,
    tintColor:'#fab1a0'
  }
}
);
export default Styles;
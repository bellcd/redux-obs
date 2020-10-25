import './App.css';
import { connect } from 'react-redux';
import Beers from './components/Beers';

function App(props) {
  console.log('props: ', props);
  return (
    <>
      <Beers />
    </>
  );
}

export default connect(state => state.app)(App);

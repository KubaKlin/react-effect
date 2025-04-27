import './global.css';
import { GlobalTime } from './components/GlobalTime/GlobalTime';
import { DisplayCurrentCursorPosition } from './components/DisplayCurrentCursorPosition/DisplayCurrectCursorPosition';
import { CurrentTemperature } from './components/CurrentTemperature/CurrentTemperature';

function App() {
  return (
    <div>
      <GlobalTime />
      <DisplayCurrentCursorPosition />
      <CurrentTemperature />
    </div>
  );
}

export default App;

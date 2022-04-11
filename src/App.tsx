import { FC } from "react";

import { FormList } from "components/FormList";
import { Map } from "components/Map";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <FormList />
    <Map />
  </div>
);

export default App;

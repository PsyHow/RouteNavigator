import { FC } from "react";

import "./app.css";

import { FormListContainer } from "components/FormList";
import { Map } from "components/Map";

const App: FC = () => (
  <div className="container">
    <FormListContainer />
    <Map />
  </div>
);

export default App;

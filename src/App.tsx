import { FC } from "react";

import style from "./app.module.scss";

import { FormList } from "components/FormList";
import { Map } from "components/Map";

const App: FC = () => (
  <div className={style.container}>
    <FormList />
    <Map />
  </div>
);

export default App;

import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Handler from "./Page/Handler.tsx";


let data : any= [
  {id:1,name:"Theme",value: 1}, //1:light 2:dark
  {id:2,name:"Textsize",value: 18},
  {id:3,name:"Notification",value: 1}, // 1:enable 2:disable
  {id:4,name:"Frequency",value: 1}] //1:everyday 2: every two day 3: every three day 4: once aweek
const [Info,SetInfo] = useState(data);

const Setting = () => {
  return (
  <GestureHandlerRootView>
    <Handler />
  </GestureHandlerRootView>
  );
};
export default Setting;





import {Row,Col} from "antd";
import "./App.less";

function App() {
  return (
    <div className="App">
     <Row>
       <Col span={7} className="left-bg">
         左边 
       </Col>
       <Col span={17} className="right-bg">
         右边
       </Col>
     </Row>
    </div>
  );
}

export default App;

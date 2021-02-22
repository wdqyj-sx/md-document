import FilesSearch from "./component/filesSearch";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "./App.css"

function App() {
  return (
    <div className="App row">
      <div className="col-4 bg-secondary">
        <FilesSearch title = "我的云文档" startSearch = {(value)=>{ console.log(value)}} ></FilesSearch>
      </div>
      <div className="col-8 bg-success">right</div>
    </div>
  );
}

export default App;

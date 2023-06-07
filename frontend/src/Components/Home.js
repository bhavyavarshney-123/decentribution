import React from "react";
import { useState } from "react";
import axios from "axios";

function Block(prop) {
  return (
    <div className="Block">
      <div>
        <p>Timestamp: {prop.Timestamp}</p>
      </div>
      <div>
        <p>PrevHash: {prop.PrevHash}</p>
      </div>
      <div>
        <p>Hash: {prop.Hash}</p>
      </div>
      <div>
        <p>Difficulty: {prop.Difficulty}</p>
      </div>
      <div>
        <p>Nonce: {prop.Nonce}</p>
      </div>
      <div>
        <p>MerkleRoot: {prop.MerkleRoot}</p>
      </div>
      <div>
        <p>TxCount: {prop.TxCount}</p>
      </div>
    </div>
  );
}

function Home() {
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const [food, setFood] = useState("");
  const foodChange = (event) => {
    setFood(event.target.value);
  };

  const [blocks, setBlocks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/send", {
        sendTo: "1Q1m64uVGKQPAf8N5PkT1MV6fnNKqY4sYC",
        sendFrom: "1LanG4Nq4CigH5vah8xufdpnzKL4deLaJq",
        amount: 10,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  async function getBlocks() {
    const response = await axios.get("http://localhost:3000/getblockchain");
    const blocksArray = response.data.result;
    return blocksArray;
  }

  const showHandler = async (e) => {
    // setToggleShow((bool) => !bool);
    const blocksArray = await getBlocks();
    setBlocks(blocksArray);
    // setBlockchains(blocksArray);
  };

  if (localStorage.getItem("sanskarProf").replace(/"/g, "") === "Central") {
    return (
      <>
        <h1>Login {localStorage.getItem("sanskarProf").replace(/"/g, "")}</h1>
        <h2>Transaction to state govt</h2>
        <br></br>
        <div className="food-item">
          <label>Choose your Food item&nbsp;</label>
          <br></br>
          <select onChange={foodChange}>
            <option>Select</option>
            <option value="Wheat">Wheat(Rs. 6/kg)</option>
            <option value="Rice">Rice(Rs. 7/kg)</option>
            <option value="Barley">Barley(Rs. 8/kg)</option>
            <option value="Sugar">Sugar(Rs. 6/kg)</option>
            <option value="oats">oats(Rs. 7/kg)</option>
            <option value="sesame seeds">sesame seeds(Rs. 9/kg)</option>
            <option value="Flaxseeds">Flaxseeds(Rs. 9/kg)</option>
            <option value="Rye">Rye(Rs. 9/kg)</option>
            <option value="millet">millet(Rs. 8/kg)</option> 
          </select>
        </div>
        <br></br>
        <div className="quantity">
          <label>Enter Quantity in kg&nbsp;</label>
          <br></br>
          <input
            type="text"
            className="quantity"
            placeholder="Enter Qty"
            onChange={handleChange}
            value={message}
          />
        </div>
        <br></br>
        <div className="price">
          <label>Price is:&nbsp;</label>
          <br></br>
          {food === "Rice"
            ? `Rs. ${message * 7}`
            : food === "Wheat"
            ? `Rs. ${message * 6}`
            : food === "Barley"
            ? `Rs. ${message * 8}`
            : food === "Sugar"
            ? `Rs. ${message * 6}`
            : food === "oats"
            ? `Rs. ${message * 7}`
            : food === "Sesam Seeds"
            ? `Rs. ${message * 9}`
            : food === "flaxSeeds"
            ? `Rs. ${message * 9}`
            : food === "Rye"
            ? `Rs. ${message * 9}`
            : food === "millet"
            ? `Rs. ${message * 8}`
            : ""}
        </div>
        <button className={"submit-button"} onClick={handleSubmit}>Submit</button>
        <button onClick={showHandler}>Show blockchain</button>
        <div>
          {blocks.map((block, index) => (
            <Block key={index} {...block} />
          ))}
        </div>
      </>
    );
  } else if (
    localStorage.getItem("sanskarProf").replace(/"/g, "") === "State"
  ) {
    return (
      <>
        <h1>Login {localStorage.getItem("sanskarProf").replace(/"/g, "")}</h1>
        <h2>Transaction to district</h2>
        <br></br>
        <div className="food-item">
          <label>Choose your Food item&nbsp;</label>
          <br></br>
          <select onChange={foodChange}>
            <option>Select</option>
            <option value="Wheat">Wheat(Rs. 6/kg)</option>
            <option value="Rice">Rice(Rs. 7/kg)</option>
          </select>
        </div>
        <br></br>
        <div className="quantity">
          <label>Enter Quantity in kg&nbsp;</label>
          <br></br>
          <input
            type="text"
            className="quantity"
            placeholder="Enter Qty"
            onChange={handleChange}
            value={message}
          />
        </div>
        <br></br>
        <div className="price">
          <label>Price is:&nbsp;</label>
          <br></br>
          {food === "Rice"
            ? `Rs. ${message * 7}`
            : food === "Wheat"
            ? `Rs. ${message * 6}`
            : ""}
        </div>
      </>
    );
  } else if (
    localStorage.getItem("sanskarProf").replace(/"/g, "") === "District"
  ) {
    return (
      <>
        <h1>Login {localStorage.getItem("sanskarProf").replace(/"/g, "")}</h1>
        <h2>Transaction to ration shops</h2>
        <br></br>
        <div className="food-item">
          <label>Choose your Food item&nbsp;</label>
          <br></br>
          <select onChange={foodChange}>
            <option>Select</option>
            <option value="Wheat">Wheat(Rs. 6/kg)</option>
            <option value="Rice">Rice(Rs. 7/kg)</option>
          </select>
        </div>
        <br></br>
        <div className="quantity">
          <label>Enter Quantity in kg&nbsp;</label>
          <br></br>
          <input
            type="text"
            className="quantity"
            placeholder="Enter Qty"
            onChange={handleChange}
            value={message}
          />
        </div>
        <br></br>
        <div className="price">
          <label>Price is:&nbsp;</label>
          <br></br>
          {food === "Rice"
            ? `Rs. ${message * 7}`
            : food === "Wheat"
            ? `Rs. ${message * 6}`
            : ""}
        </div>
      </>
    );
  } else if (
    localStorage.getItem("sanskarProf").replace(/"/g, "") === "RationShop"
  ) {
    return (
      <>
        <h1>Login {localStorage.getItem("sanskarProf").replace(/"/g, "")}</h1>
        <h2>Transaction to customer</h2>
        <br></br>
        <div className="food-item">
          <label>Choose your Food item&nbsp;</label>
          <br></br>
          <select onChange={foodChange}>
            <option>Select</option>
            <option value="Wheat">Wheat(Rs. 6/kg)</option>
            <option value="Rice">Rice(Rs. 7/kg)</option>
          </select>
        </div>
        <br></br>
        <div className="quantity">
          <label>Enter Quantity in kg&nbsp;</label>
          <br></br>
          <input
            type="text"
            className="quantity"
            placeholder="Enter Qty"
            onChange={handleChange}
            value={message}
          />
        </div>
        <br></br>
        <div className="price">
          <label>Price is:&nbsp;</label>
          <br></br>
          {food === "Rice"
            ? `Rs. ${message * 7}`
            : food === "Wheat"
            ? `Rs. ${message * 6}`
            : ""}
        </div>
      </>
    );
  } else if (
    localStorage.getItem("sanskarProf").replace(/"/g, "") === "Customer"
  ) {
    return (
      <>
        <h1>Login {localStorage.getItem("sanskarProf").replace(/"/g, "")}</h1>
        <h2>End of Transaction</h2>
      </>
    );
  }
}

export default Home;

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ManageProduct.scoped.css";
import NavBar from "../components/NavBar";
import { PopChat } from "../components/PopChat";
import { AuthContext } from "../App";
import axios from "axios";
import DeleteConfirmPopup from "../components/DeleteConfirmPopup";
import { REACT_APP_BASE_API_URL } from "../config";
import { FiEdit, FiTrash } from "react-icons/fi";

const Manage = () => {
  const { user } = useContext(AuthContext);
  const [Change, setChange] = useState(false);
  const handleDelete = async (event) => {
    setShowPopup(false);
    event.preventDefault();
    axios
      .post(`${REACT_APP_BASE_API_URL}/delete`, {
        food: idfood,
      })
      .then((res) => {
        setChange(!Change);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [showPopup, setShowPopup] = useState(false); // State เพื่อแสดง/ซ่อน Popup
  const [idfood, setIdfood] = useState("");
  const openPopup = (event, itemId) => {
    // console.log(event, itemId);
    setIdfood(itemId);
    event.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const Edit_Item = () => {
    const [Food, setFood] = useState([]);
    const [columns, setColumns] = useState(3); // Initially set to 3 columns

    useEffect(() => {
      if (user != undefined) {
        axios
          .post(`${REACT_APP_BASE_API_URL}/yourfood`, {
            user: user?.id,
          })
          .then((res) => {
            setFood(res.data);
          })
          .catch((err) => {
            alert(err);
          });
      }
    }, [Change]);

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 768) {
          setColumns(1);
        } else if (width <= 1024) {
          setColumns(2);
        } else {
          setColumns(3);
        }
      };

      handleResize(); // Call once initially
      window.addEventListener("resize", handleResize); // Add event listener for resize

      return () => {
        window.removeEventListener("resize", handleResize); // Clean up event listener
      };
    }, []); // Empty dependency array to run only once on mount

    if (!Food) return null;

    return (
      <div className="edit-container">
        <table className="edit-table">
          <tbody>
            {Array.from({ length: Math.ceil(Food.length / columns) }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    const foodItem = Food[index];
                    return (
                      <td key={colIndex}>
                        {foodItem && (
                          <form
                            onSubmit={(e) => openPopup(e, foodItem.id)}
                            className="edit-box"
                          >
                            <div className="edit-box-left">
                              <img src={foodItem.URL} alt="" />
                            </div>
                            <div className="edit-box-right">
                              <h2>{foodItem.Food_Name}</h2>
                              <Link
                                className="edit-product"
                                key={foodItem.id}
                                to={"/addproduct/" + foodItem.id}
                              >
                                <FiEdit />
                                <span>Edit</span>
                              </Link>
                              <button type="submit" className="delete-product">
                                <FiTrash />
                                <span>Delete</span>
                              </button>
                            </div>
                          </form>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <NavBar />
      <h1>Manage your product</h1>
      <div className="add-box">
        <Link to="/addproduct" className="add-product">
          Add Product
        </Link>
      </div>
      <Edit_Item />
      {showPopup && (
        <DeleteConfirmPopup onCancel={closePopup} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Manage;

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import food from "../assets/food.jpg";
import axios from "axios";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBFile,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea,
} from "mdb-react-ui-kit";

interface FormData {
  name: string;
  price: string;
  description: string;
  variation: string;
  addons: string;
  image: File | null;
}

function EditMenu() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    variation: "",
    addons: "",
    image: null,
  });

  const handleSubmit = async () => {
    if (
      formData.name.trim() === "" ||
      formData.price.trim() === "" ||
      formData.description.trim() === "" ||
      formData.variation.trim() === "" ||
      formData.addons.trim() === ""
    ) {
      // Show an alert message to the user for empty required fields
      alert("Please fill in all required fields");
      return; // Prevent further execution of the function
    }

    // Check if a file is selected for upload
    if (!formData.image) {
      // Show an alert message to the user for empty file upload
      alert("Please select a file for upload");
      return; // Prevent further execution of the function
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("price", formData.price || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("variation", formData.variation || "");
      formDataToSend.append("addons", formData.addons || "");
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/menuupdate",
        formDataToSend
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFormData({ ...formData, image: files[0] }); // Store the file object itself
    }
  };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormData({ ...formData, image: e.target.files[0] });
  //   }
  // };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="container-fluid"
      style={{
        borderRadius: "20px",
        width: "100vh",
        height: "100%",
        marginTop: "5%",
        marginLeft: "25%",
        marginRight: "20%",
        backgroundColor: "white",
      }}
    >
      <div className="HomeBanner">
        <img className="banner" src={food} alt="Loading.." />
      </div>
      <div className="menuform">
        <form className="editmenu" onSubmit={handleFormSubmit}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                name="name"
                onChange={handleInputChange}
                id="form6Example1"
                label="Product name"
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                name="price"
                onChange={handleInputChange}
                id="form6Example2"
                label="Product Price"
              />
            </MDBCol>
          </MDBRow>
          <MDBInput
            wrapperClass="mb-4"
            type="email"
            name="email"
            onChange={handleInputChange}
            id="form6Example5"
            label="Email"
          />
          <MDBInput
            wrapperClass="mb-4"
            type="tel"
            name="phone"
            onChange={handleInputChange}
            id="form6Example6"
            label="Phone"
          />
          <div className="category">
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              onChange={handleCategoryChange}
            >
              <option selected>Select food category</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Cuisines">Cuisines</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <MDBTextArea
            wrapperClass="mb-4"
            name="description"
            onChange={handleDescriptionChange}
            id="form6Example7"
            rows={4}
            label="Product Description"
          />
          <div className="productpic">
            <input type="file" onChange={handleImageChange} id="customFile" />
          </div>
          <MDBRow className="mb-4">
            <MDBCol>
              <h5>Size Variation</h5>
              <>
                <MDBCheckbox
                  name="variation"
                  value="small"
                  onChange={handleInputChange}
                  id="flexCheckDefault"
                  label="Small"
                />
                <MDBCheckbox
                  name="variation"
                  value="medium"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="Medium"
                />
                <MDBCheckbox
                  name="variation"
                  value="large"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="Large"
                />
                <MDBCheckbox
                  name="variation"
                  value="No Variation"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="No Variation"
                />
              </>
            </MDBCol>
            <MDBCol>
              <h5>Add On's</h5>
              <>
                <MDBCheckbox
                  name="addons"
                  value="olives"
                  onChange={handleInputChange}
                  id="flexCheckDefault"
                  label="Olives"
                />
                <MDBCheckbox
                  name="addons"
                  value="onions"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="Onions"
                />
                <MDBCheckbox
                  name="addons"
                  value="mushrooms"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="Mushrooms"
                />
                <MDBCheckbox
                  name="addons"
                  value="No Add Ons"
                  onChange={handleInputChange}
                  id="flexCheckChecked"
                  label="No Add Ons"
                />
              </>
            </MDBCol>
          </MDBRow>
          <MDBBtn type="submit" block>
            Add to menu
          </MDBBtn>
        </form>
      </div>
    </div>
  );
}

export default EditMenu;

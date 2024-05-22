import React,{ useState,useEffect } from "react";
import styled from "styled-components";


const UploadProduct = () => {

 
const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [articleNo, setArticleNo] = useState("");
const [price, setPrice] = useState("");
const [company, setCompany] = useState("");
const [featured, setFeatured] = useState("");
const [description, setDescription] = useState("");
const [colors, setColors] = useState(["#ff0000", "#00ff00"]); // Initial colors
const [productImages, setProductImages] = useState([]);

const handleColorChange = (index, newColor) => {
  const updatedColors = [...colors];
  updatedColors[index] = newColor;
  setColors(updatedColors);
};

const handleRemoveColor = (index) => {
  const updatedColors = [...colors];
  updatedColors.splice(index, 1);
  setColors(updatedColors);
};

const handleAddColor = () => {
  const newColor = "#fff";
  const updatedColors = [...colors, newColor];
  setColors(updatedColors);
};

const handleImagesChange = (e) => {
  const files = e.target.files;
  const filesArray = Array.from(files);

  // Create an array of valid File objects
  const validFiles = filesArray.filter((file) => file instanceof File);

  setProductImages([...productImages, ...validFiles]);
};

const handleUpload = async (e) => {
  e.preventDefault();

  const productFormData = new FormData();
  productFormData.append("title", title);
  productFormData.append("category", category);
  productFormData.append("articleNo", articleNo);
  productFormData.append("price", price);
  productFormData.append("company", company);
  productFormData.append("featured", featured);
  productFormData.append("description", description);

  colors.forEach((color, index) => {
    productFormData.append(`colors[${index}]`, color);
  });

  productImages.forEach((image, index) => {
    productFormData.append(`productImages`, image);
  });

  try {
    const res = await fetch("http://localhost:5000/api/productUpload", {
      method: "POST",
      body: productFormData,
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("Invalid");
    } else {
      console.log("Success");
      window.location.reload()
    }
  } catch (error) {
    console.log(error);
  }

};
  return (
    <>
      <Wrapper>
        <div className="content">
          <div className="upload-form">
            <h2>Upload Products here:</h2>

            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  placeholder="Enter your title here..."
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">articleNo:</label>
                <input
                  type="text"
                  placeholder="Enter your articleNo here..."
                  id="title"
                  name="title"
                  onChange={(e) => setArticleNo(e.target.value)}
                  value={articleNo}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">price:</label>
                <input
                  type="text"
                  placeholder="Enter your price here..."
                  id="title"
                  name="title"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">category:</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">company:</label>
                <input
                  type="text"
                  placeholder="Enter your company here..."
                  id="title"
                  name="title"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Product Description:</label>
                <textarea
                  required
                  id="content"
                  placeholder="Enter your Product description here..."
                  name="content"
                  rows="5"
                  cols={20}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="coursetype">featured:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      required
                      type="radio"
                      name="courseType"
                      value="true"
                      checked={featured === "true"}
                      onChange={(e) => setFeatured(e.target.value)}
                    />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input
                      required
                      type="radio"
                      name="courseType"
                      value="false"
                      checked={featured === "false"}
                      onChange={(e) => setFeatured(e.target.value)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                {colors.map((color, index) => (
                  <div key={index}>
                    <input
                      style={{
                        backgroundColor: color,
                      }}
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                    />

                    <button
                      onClick={() => handleRemoveColor(index)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={handleAddColor} type="button">
                  Add Color
                </button>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <div>
                <label htmlFor="imagesUpload">Product Images:</label>
                {/* <input
                  type="file"
                  id="imagesUpload"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                /> */}
                <input
                  type="file"
                  id="imagesUpload"
                  name="productImages"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </div>
              <button
                type="submit"
                className="upload-button"
                // onClick={handleUpload}
              >
                Upload
              </button>
            </form>
            {/* <div>
              <h2>Product List</h2>
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    <h3>{product.title}</h3>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Company: {product.company}</p>
                    <p style={{color:`${product.colors[1]}`}}>Colors: {product.colors[0]}</p>
                    <p>Featured: {product.featured}</p>
                    <img
                      src={`http://localhost:5000/uploads/${product.images[0].filename}`}
                    />
                    <div>
                      <h4>Images:</h4>
                      <ul>
                        {product.images.map((image, index) => (
                          <li key={index}>
                            <img
                              src={`http://localhost:5000/uploads/${image.filename}`}
                              alt={image.originalname}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .upload-form {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    background-color: #e8e8e8;
  }

  .upload-form h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bolder;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
  }

  .form-group input[type="text"],
  .form-group textarea {
    /* width: 100%; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .upload-icon-label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #007bff;
  }

  .upload-icon {
    margin-right: 10px;
  }

  .form-group input[type="file"] {
    display: none;
  }

  .upload-button {
    background-color: #279bef;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .upload-button:hover {
    background-color: #479cd9;
  }

  .delete-button {
    margin-left: 10px;
  }

  .preview-image {
    margin-left: 10px;
  }

  .file-info {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .file-info p {
    margin: 0;
  }

  .file-info button {
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .file-info button:hover {
    background-color: #e60000;
  }

  .file-preview {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-height: 300px;
    overflow-y: auto;
  }

  .file-info {
    flex: 0 1 calc(25% - 20px);
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  /* -----file type and file format---- */

  .file-info {
    margin-top: 10px;
    padding: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
  }

  .file-info p {
    margin: 5px 0;
  }

  .file-info strong {
    font-weight: 600;
  }
`

export default UploadProduct;



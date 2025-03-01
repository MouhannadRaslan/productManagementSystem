import { useState, useEffect } from "react";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productNum, setProductNum] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

 
  const addProduct = () => {
    if (productName.trim() !== "" && productDescription.trim() !== "") {
      const updatedProducts = [
        ...products,
        {
          name: productName,
          description: productDescription,
          price: productNum,
          img: productImg,
        },
      ];
      setProducts(updatedProducts);
      setProductName("");
      setProductDescription("");
      setProductNum("");
      setProductImg("");
    }
  };

  const saveProducts = () => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const editProduct = (index) => {
    setEditingIndex(index);
    setEditedProduct({
      name: products[index].name,
      description: products[index].description,
      price: products[index].price,
      img: products[index].img,
    });
  };

  const saveEditedProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = editedProduct;
    setProducts(updatedProducts);
    setEditingIndex(null);
    setEditedProduct({
      name: "",
      description: "",
      price: "",
      img: "",
    });
  };


  return (
    <>
      <div className="container">
        <h2 className="fw-semibold mt-5 text-center mb-5">
          Product Management System
        </h2>
        <div className="row justify-content-center mb-5">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Product Name"
              className="form-control border-0 border-bottom rounded-0 "
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Product Price"
              className="form-control border-0 border-bottom rounded-0 mt-4"
              value={productNum}
              onChange={(e) => setProductNum(e.target.value)}
            />
            <input
              type="file"
              className="form-control border-0 border-bottom rounded-0 mt-4"
              onChange={(e) =>
                setProductImg(URL.createObjectURL(e.target.files[0]))
              }
            />
            <textarea
              name=""
              placeholder="Product Description"
              className="form-control border-0 border-bottom rounded-0 mt-4"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              id=""
            ></textarea>
            <button
              className="btn btn-success mt-3 rounded-1"
              onClick={addProduct}
            >
              ADD PRODUCT <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
        <button className="save btn btn-primary rounded-1 btn-sm" onClick={saveProducts}>
        SAVE CHANGES
        </button>

        {products.length === 0 ? (
          <p className="text-center text-danger">
            <i class="fa-solid fa-triangle-exclamation"></i> No products
            currently
          </p>
        ) : (
          <div className="row mt-5 justify-content-center">
            {products.map((product, index) => (
              <div className="col-md-4">
                <div className="card w-75 m-2 mt-5 mb-5 border-0 shadow pb-1 ps-3 pe-3">
                  <div key={index} className="card-body">
                    <img src={product.img} alt="" className="img-fluid" />
                    <h3 className="card-title mt-3">{product.name}</h3>
                    <p className="card-text mt-4">{product.description}</p>
                    <p className="text-success mt-4">${product.price}</p>
                  </div>
                  <button
                    className="btn remove"
                    onClick={() => removeProduct(index)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                  <button
                    className="btn edit"
                    onClick={() => editProduct(index)}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {editingIndex !== null && (
          <div className="row">
            <div className="col-md-4">
            <div className="mt-5">
            <h3>Edit Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              className="form-control mb-3"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Product Price"
              className="form-control mb-3"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
            />
            <textarea
              placeholder="Product Description"
              className="form-control mb-3"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            ></textarea>
            <button
              className="btn btn-success"
              onClick={saveEditedProduct}
            >
              Save Changes
            </button>
          </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;

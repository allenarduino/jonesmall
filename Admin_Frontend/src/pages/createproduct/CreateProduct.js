import React from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  FormContainer,
  CategoryBackground,
  NameInput,
  Button,
  CenterInput,
  HeaderText,
  Form,
  FileInput,
  ChooseImgBox,
  ImagePreview,
  LoadingButton,
  SelectInput,
  DescriptionInput
} from "./styles";
import { Fade } from "react-reveal";
const CreateProduct = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [productImg, setProductImg] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_product_change = e => {
    setName(e.target.value);
  };

  const handle_product_img_change = e => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setProductImg(e.target.files[0]);
  };

  const categoryhandler = e => {
    setCategory(e.target.value);
  };

  const handle_description = e => {
    setDescription(e.target.value);
  };

  const handle_price = e => {
    setPrice(e.target.value);
  };

  const fetch_categories = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/categories`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => console.log(err));
  };

  const create_product = e => {
    e.preventDefault();
    controlLoading(true);
    const data = new FormData();
    data.append("name", name);
    data.append("product_img", productImg);
    data.append("price", price);
    data.append("category", category);
    data.append("description", description);

    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    fetch(`${url}/create_product`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        alert(data.message);
        history.push("/my_products");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };

  React.useEffect(() => {
    fetch_categories();
  }, []);
  return (
    <CategoryBackground>
      <Fade bottom duration={900} distance="40px">
        <CenterInput>
          <HeaderText>Create Product</HeaderText>
        </CenterInput>
        <Form onSubmit={create_product}>
          <CenterInput>
            <NameInput
              onChange={handle_product_change}
              required
              type="text"
              placeholder="Name of Product"
              value={name}
              name="name"
            />
          </CenterInput>
          <CenterInput>
            <NameInput
              onChange={handle_price}
              required
              type="number"
              placeholder="Price in GHC"
              value={price}
              name="price"
            />
          </CenterInput>
          <CenterInput>
            <SelectInput
              value={category}
              name="category"
              onChange={categoryhandler}
              required
            >
              <option></option>
              {categories.map(c => (
                <option value={c.name}>{c.name}</option>
              ))}
            </SelectInput>
          </CenterInput>
          <CenterInput>
            <DescriptionInput
              placeholder="Description"
              required
              value={description}
              name="description"
              onChange={handle_description}
            ></DescriptionInput>
          </CenterInput>
          <CenterInput>
            <label>
              <FileInput
                type="file"
                required
                onChange={handle_product_img_change}
              />
              {productImg == null ? (
                <ChooseImgBox>
                  <b>Select Image</b>
                </ChooseImgBox>
              ) : (
                <ImagePreview src={imgPreview} />
              )}
            </label>
          </CenterInput>

          <CenterInput>
            {loading ? (
              <LoadingButton>Loading...</LoadingButton>
            ) : (
              <Button value="Submit" type="submit" />
            )}
          </CenterInput>
          <CenterInput></CenterInput>
        </Form>
      </Fade>
    </CategoryBackground>
  );
};
export default CreateProduct;

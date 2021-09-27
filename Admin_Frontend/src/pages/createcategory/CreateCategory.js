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
  LoadingButton
} from "./styles";
import { Fade } from "react-reveal";
const CreateCategory = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [category, setCategory] = React.useState("");
  const [categoryImg, setCategoryImg] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_category_change = e => {
    setCategory(e.target.value);
  };

  const handle_category_img_change = e => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setCategoryImg(e.target.files[0]);
  };

  const create_category = e => {
    e.preventDefault();
    controlLoading(true);
    const data = new FormData();
    data.append("name", category);
    data.append("category_img", categoryImg);
    console.log(categoryImg);

    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    fetch(`${url}/create_category`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        alert(data.message);
        history.push("/categories");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };
  return (
    <CategoryBackground>
      <Fade bottom duration={900} distance="40px">
        <HeaderText>Create Category</HeaderText>
        <FormContainer>
          <Form onSubmit={create_category}>
            <CenterInput>
              <NameInput
                onChange={handle_category_change}
                required
                type="text"
                placeholder="Name of Category"
                value={category}
                name="email"
              />
            </CenterInput>

            <label>
              <FileInput
                type="file"
                required
                onChange={handle_category_img_change}
              />
              {categoryImg == null ? (
                <ChooseImgBox>
                  <b>Select Image</b>
                </ChooseImgBox>
              ) : (
                <ImagePreview src={imgPreview} />
              )}
            </label>

            <CenterInput>
              {loading ? (
                <LoadingButton>Loading...</LoadingButton>
              ) : (
                <Button value="Submit" type="submit" />
              )}
            </CenterInput>
            <CenterInput></CenterInput>
          </Form>
        </FormContainer>
      </Fade>
    </CategoryBackground>
  );
};
export default CreateCategory;

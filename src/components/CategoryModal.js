import React, { useState } from 'react';
import * as Yup from 'yup';

import { Grid, Stack, TextField, Link } from '@mui/material';

import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import '../style.css';
import { apiInstance } from './../httpClient/index';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function CategoryModal({ onClose, getCategory, data, type }) {
  const [modalStyle] = useState(getModalStyle);
  const [file, setFile] = useState([]);
  const [images, setImages] = useState([]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 550,
      backgroundColor: '#fff',
      //   boxShadow: theme.shadows[5],
      borderRadius: 5,
      padding: '15px',
      overflow: 'auto',
      maxHeight: '700px',
    },
    dropzoneStyle: {
      width: '100%',
      height: 'auto',
      borderWidth: 2,
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: 5,
    },
  }));
  const classes = useStyles();

  const uploadMultipleFiles = (e) => {
    let fileObj = [];
    let fileArray = [];
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFile([...file, ...fileArray]);
    setImages([...images, ...fileObj[0]]);
  };

  const LoginSchema = Yup.object().shape({
    catname: Yup.string().required('Category is required'),
    // password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      catname: data?.category || '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => handleCreateCategory(values),
  });

  const handleCreateCategory = async (values) => {
    var formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('categoryImage', images[i]);
    }

    formData.append('category', values.catname);

    if (data) {
      try {
        const res = await apiInstance.put(`admin/category/${data?._id}`, formData);
        if (res.status === 200) {
          onClose();
          getCategory();
        }
      } catch (error) {
        console.log('error: ', error);
      }
    } else {
      try {
        const res = await apiInstance.post(`admin/category/create`, formData);
        if (res.status === 200) {
          onClose();
          getCategory();
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
        //   className={classes.addusertitle}
      >
        <h2 id="simple-modal-title">{data ? 'Edit Category' : 'Add Category'}</h2>

        <CloseIcon onClick={onClose} />
      </Grid>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              autoComplete="username"
              type="catname"
              label="Category Name"
              {...getFieldProps('catname')}
              error={Boolean(touched.catname && errors.catname)}
              helperText={touched.catname && errors.catname}
            />
          </Stack>
          <Stack spacing={3}>
            <div className="form-group file-input">
              <input
                id="file"
                name="file"
                type="file"
                className="form-control"
                onChange={uploadMultipleFiles}
                // disabled={!isEdit && !isClone ? true : false}
                // {...getFieldProps('file')}
                // error={Boolean(touched.file && errors.file)}
                // helperText={touched.file && errors.file}
                multiple
              />
              <label for="file">upload image</label>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {file && file.length > 0 ? (
                <div
                  className="form-group preview"
                  style={{
                    width: 'auto',
                    // height: '200px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: '20px',
                  }}
                >
                  {(file || []).map((url, index) => {
                    return (
                      <div
                        key={url}
                        style={{
                          width: '200px',
                          height: '170px',
                          position: 'relative',
                          marginRight: '10px',
                          marginBottom: '20px',
                        }}
                      >
                        <img src={url} alt="" style={{ height: '100%', width: '100%' }} />
                        {/* <button
                              type="button"
                              style={{position: 'absolute'}}
                              onClick={() => deleteFile(index)}>
                              delete
                            </button> */}
                        <i className="far fa-times-circle closeicon" onClick={() => deleteFile(index)}></i>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {data?.categoryImage && data?.categoryImage.length > 0
                ? data.categoryImage.map((url) => {
                    return (
                      <div
                        key={url}
                        style={{
                          width: '200px',
                          height: '170px',
                          position: 'relative',
                          marginRight: '10px',
                          marginBottom: '10px',
                        }}
                      >
                        <img src={url} alt="img" style={{ height: '100%', width: '100%' }} />
                      </div>
                    );
                  })
                : null}
            </div>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {data ? 'Update' : 'Add'}
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
}

import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { apiInstance } from './../../../httpClient/index';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ data, openModal, type, isgetData }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    // setIsOpen();
  };

  const hanleDelete = () => {
    setOpen(true);
    setIsOpen(false);
  };

  const hendleBan = async () => {
    switch (type) {
      case 'category':
        try {
          const res = await apiInstance.delete(`admin/category/${data._id}`);
          console.log('data._id: ', data._id);
          console.log('res: ', res);
          setOpen(false);
          isgetData();
        } catch (e) {
          console.log('e: ', e.response);
          console.log('Something went wrong while banning user. Please try again later.');
        }

        break;
      case 'sub-category':
        try {
          const response = await apiInstance.delete(`admin/subcategory/${data?._id}`);
          console.log('response-----', response);
          setOpen(false);
          isgetData();
        } catch (error) {
          console.log('Error------', error.response);
          if (error.response.status === 404) {
            setError(error.response.data.message);
          } else if (error.response.status === 400) {
            setError(error.response.data.message);
          } else {
            setError('profile not updated');
          }
        }
        setOpen(false);

        break;
      case 'contact':
        if (isdelete) {
          console.log('contact-------------isdelete: ', isdelete);

          try {
            console.log('isdelete: =============');

            const response = await apiInstance.delete(`contact/admin/remove/${data?._id}`, {
              headers: {
                Authorization: getToken(),
              },
            });
            console.log('response-----', response);

            setIsOpen();
            isgetData();
          } catch (error) {
            console.log('Error------', error.response);
            if (error.response.status === 404) {
              setError(error.response.data.message);
            } else if (error.response.status === 400) {
              setError(error.response.data.message);
            } else {
              setError('Something went wrong.please try again..');
            }
          }
          setOpen(false);
        }
        break;

      default:
        break;
    }
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" onClick={hendleBan} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={hanleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            openModal(data);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

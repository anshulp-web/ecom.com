import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import CategoryForm from '../../components/Category/CategoryForm';
import { Button, Modal } from 'antd';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';
const CreateCategory = () => {
  const [category, SetCategory] = useState([]);
  const [name, SetName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visible, setVisible] = useState(null);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  //HANDLE CATEGORY FORM SUBMIT
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (name !== '') {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/category/create-category`,
          { name }
        );
        if (data.success) {
          toast.success(`${name} category is created`);
          fetchCategory();
        } else {
          toast.error(`${data?.message}`);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong in category submit');
      }
    } else {
      toast.error('Category name is required');
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/get-category`
    );
    if (data.success) {
      SetCategory(data.allCategory);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updatedName !== '') {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
          { name: updatedName }
        );
        if (data.success) {
          toast.success(data.message);
          setSelected(null);
          setUpdatedName('');
          setVisible(false);
          fetchCategory();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    } else {
      toast.error('Category name is required');
    }
  };
  //DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success('Category deleted successfully');
        fetchCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -Create Category'}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>Manage Category</h2>
              <div>
                <CategoryForm
                  handleSumbit={handleSumbit}
                  value={name}
                  setValue={SetName}
                />
              </div>
              <div className="w-80">
                <TextField
                  label="Search Category"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ width: '100%', height: '20%' }}
                  margin="normal"
                  variant="outlined"
                />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bolder' }}>
                          Category Name
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bolder' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {category
                        .filter((ct) =>
                          ct.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((ct) => (
                          <TableRow key={ct._id}>
                            <TableCell>{ct.name}</TableCell>
                            <TableCell>
                              <NavLink
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(ct.name);
                                  setSelected(ct);
                                }}
                                className="ms-2 btn btn-primary"
                              >
                                <FaEdit />
                              </NavLink>
                              <NavLink
                                onClick={() => {
                                  handleDelete(ct._id);
                                }}
                                className="ms-2 btn btn-danger"
                              >
                                <MdDelete />
                              </NavLink>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={category.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
            <Modal
              title="Category Edit"
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSumbit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;

import React, { useState } from 'react';
import styles from './profilecss';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { updateUserDetail } from '../../features/userSlice'; 

const Profile = () => {
  const userDetail = useSelector(state => state.user.userDetail);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: userDetail ? userDetail.first_name : '',
      last_name: userDetail ? userDetail.last_name : '',
      email: userDetail ? userDetail.email : '',
      phone: userDetail ? userDetail.phone : '',
      Address1: userDetail ? userDetail.Address1 : '',
      Address2: userDetail ? userDetail.Address2 : '',
      pincode: userDetail ? userDetail.pincode : ''
    },
    onSubmit: values => {
      dispatch(updateUserDetail(values)); 
      setEditMode(false);
    },
  });

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileDetails}>
        <h2 style={styles.title}>Profile Details</h2>
        <div style={styles.profileInfo}>
          {editMode ? (
            <form onSubmit={formik.handleSubmit}>
              <div style={styles.inputField}>
                <span style={styles.label}>First Name:</span> 
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Last Name:</span> 
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Email:</span> 
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Phone:</span> 
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Address Line 1:</span> 
                <input
                  id="Address1"
                  name="Address1"
                  type="text"
                  value={formik.values.Address1}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Address Line 2:</span> 
                <input
                  id="Address2"
                  name="Address2"
                  type="text"
                  value={formik.values.Address2}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Pincode:</span> 
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.button}>Save</button>
              <button type="button" onClick={toggleEditMode} style={styles.button}>Cancel</button>
            </form>
          ) : (
            <>
              <div style={styles.inputField}>
                <span style={styles.label}>First Name:</span> 
                <span style={styles.value}>{userDetail.first_name}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Last Name:</span> 
                <span style={styles.value}>{userDetail.last_name}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Email:</span> 
                <span style={styles.value}>{userDetail.email}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Phone:</span> 
                <span style={styles.value}>{userDetail.phone}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Address Line 1:</span> 
                <span style={styles.value}>{userDetail.Address1}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Address Line 2:</span> 
                <span style={styles.value}>{userDetail.Address2}</span>
              </div>
              <div style={styles.inputField}>
                <span style={styles.label}>Pincode:</span> 
                <span style={styles.value}>{userDetail.pincode}</span>
              </div>
            </>
          )}
          <div style={styles.inputField}>
            <button onClick={toggleEditMode} style={styles.toggleButton}>{editMode ? 'Cancel' : 'Edit'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

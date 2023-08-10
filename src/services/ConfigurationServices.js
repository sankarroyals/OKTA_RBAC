/* eslint-disable no-unused-vars */
import axiosInstance from '../apis/axiosInstance';


const ConfigurationServices = {
  getCategoryData: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.get(`/category/getCategory`)
          .then((res) => {
            if (res) {
              const CategoryData = res?.data;
              resolve(CategoryData);
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },

  getMasterSectorData: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.get(`/mastersector/getMasterSector`)
          .then((res) => {
            if (res) {
              const CategoryData = res?.data;
              resolve(CategoryData);
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },
  getSectordata: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.get(`/sector/getSector`)
          .then((res) => {
            if (res) {
              const CategoryData = res?.data;
              resolve({
                'commodityGroups': CategoryData,
              });
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },

  getRolesData: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.get(`/users/getUserRoles`)
          .then((res) => {
            if (res) {
              const RoleAccess = res?.data;
              resolve(RoleAccess);
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },

  getUserAccessData: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.get(`/users/getUserAccess`)
          .then((res) => {
            if (res) {
              const UserAccess = res?.data;
              // console.log(UserAccess);
              resolve(UserAccess);
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },



  postRolesandAccessData: (data) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      axiosInstance.post(`/users/saveUserAccess`, data)
          .then((res) => {
            if (res) {
              resolve(res);
            }
          }).catch((err) => {
            resolve(err?.response?.data);
          });
    });
  },

};


export default ConfigurationServices;



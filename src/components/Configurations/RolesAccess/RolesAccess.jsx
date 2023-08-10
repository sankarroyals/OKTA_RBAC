/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {Box, CircularProgress} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ConfigurationServices from '../../../services/ConfigurationServices';
import theme from '../../../theme';
import {AppErrorDialog} from '../../common/App-Dialog/AppDialog';
import ErrorMessage from '../CommonConfFiles/ErrorMessage/ErrorMessage';
import _ from 'lodash'
import RolesAccessList from './RolesAccessDisplay';
import CommonConfTable from './RolesAccessTable';
import config from '../../../Utils/Config';
const RolesAccess = (props) => {
  const [row, setRow] = useState([]);
  const [tableFilterData, setTableFilterData] = useState([]);

  const dispatch = useDispatch();

  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [idKey, setIdKey] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [filterResetClicked, setFiltersResetClicked] = useState(false);
  const heads = [
    'Person Name',
    'Person Email',
    'Role',
    'Sector',
    'Category',
    'Active',
    'Active Start Date',
    'Active End Date',
    'Last Edited By',
    'Last Edited On',
  ];

  const values = [
    'user_name',
    'email',
    'user_role',
    'sector',
    'category',
    'is_active',
    // 'user_role_id',
    // 'user_role',
    // 'user_description',
    // 'user_id',
    // 'sector_id',
    // 'category_id',
    'is_buyplan_associated',
    'active_start_date',
    'active_end_date',
    'last_updated_by',
    'last_updated_on',
    'is_editable',
  ];


  const sortValues = [true, true, false, true, true, false, false, false, true, true];


  const SortValue = useSelector((state)=>state
      .configurations.selectedSortName);

  const sorttype = useSelector((state)=>state.configurations.selectedSortType);

  const selectedDropDownData = useSelector((state)=>state?.configurations?.selectedRoleAccessValue);


  const updateSingleUnitMaster = ConfigurationServices.
      postRolesandAccessData;
  const newRowUpdate = ConfigurationServices.postRolesandAccessData;


  const [pagination, setPagination] = useState(10);


  // const [loading, setLoading] = useState(false);
  const [addingTrigger, setAddingTrigger] = useState(false);


  useEffect(()=>{
    ConfigurationServices.getUserAccessData()
        .then((res)=>{
          if (res !=undefined && typeof res !== 'string') {
            const keys = [];
            res.length>0 && Object.keys(res[0]).map((obj) => {
              if (obj.split('_').includes('id')) {
                keys.push(obj);
              }
            });

            setIdKey([...keys]);
            if (res['userMessage']) {
              setRow([]);
              setErrMsg(res['userMessage']);
            } else {
              setRow(res);
            }
          } else {
            setRow([]);
            setErrMsg('Error Occured due to backend connection.');
          };
        });
  }, [addingTrigger]);


  // useEffect(() => {
  //   dispatch(getBuyPlanData_API());
  // }, [dispatch]);

  useEffect(()=>{
    let temp = [...row];
    // console.log(selectedDropDownData);
    if (Object.keys(selectedDropDownData).length!==0) {
      Object.entries(selectedDropDownData).map((obj, index)=>{
        if (obj[1].length!==0) {
          temp = temp.filter((r)=>{
            return obj[1].includes(r[obj[0]]);
          });
        }
      });
      setTableFilterData([...temp]);
      setPage(0);
    } else {
      setTableFilterData([...row]);
    }
  }, [selectedDropDownData, row]);


  const [ActiveMasterSectors, setActiveMasterSectors] = useState([]);
  useEffect(()=>{
    ConfigurationServices.getMasterSectorData()
        .then((res)=>{
          const activeMasterSectors = [];
          res.map((r)=>{
            r.is_active === true && activeMasterSectors.push(r);
          });
          setActiveMasterSectors([...activeMasterSectors]);
        });
  }, []);

  const [Roles, setRoles] = useState([]);
  useEffect(()=>{
    ConfigurationServices.getRolesData()
        .then((res)=>{
          let activeRoles = [];
          res.map((r)=>{
            !activeRoles.includes(r) && activeRoles.push(r);
          });
          activeRoles=activeRoles.sort();
          setRoles([...activeRoles]);
        });
  }, []);

  const [ActiveSectors, setActiveSectors] = useState([]);
  useEffect(()=>{
    ConfigurationServices.getSectordata()
        .then((res)=>{
          let activeSectors = [];
          res['commodityGroups'].map((r)=>{
            r.sectors.map((rs)=>{
              rs.active === true && !activeSectors.includes(r) && activeSectors.push(r);
            });
          });
          activeSectors=activeSectors.sort();
          setActiveSectors([...activeSectors]);
        });
  }, []);

  const [ActiveCategories, setActiveCategories] = useState([]);
  useEffect(()=>{
    ConfigurationServices.getCategoryData()
        .then((res)=>{
          let activeCategories = [];
          res.map((r)=>{
            r.is_active === true && activeCategories.push(r);
          });
          activeCategories=activeCategories.sort();
          setActiveCategories([...activeCategories]);
        });
  }, []);


  useEffect(()=>{
    if (SortValue!=='' && SortValue!=='last_updated_on') {
      if (sorttype === 'asc') {
        tableFilterData.sort((a, b) =>
          // a[SortValue]?.localeCompare(b[SortValue]));
          a[SortValue]?.toLowerCase()?.trim()?.localeCompare(b[SortValue]?.toLowerCase()?.trim()));
      } if (sorttype === 'desc') {
        tableFilterData.sort((a, b) =>
          // b[SortValue]?.localeCompare(a[SortValue]));
          b[SortValue]?.toLowerCase()?.trim()?.localeCompare(a[SortValue]?.toLowerCase()?.trim()));
      }
      setTableFilterData([...tableFilterData]);
    } else {
      if (sorttype === 'asc') {
        const sortedData = _.sortBy(tableFilterData, (item) => new Date(item.last_updated_on));
        setTableFilterData([...sortedData]);
      } if (sorttype === 'desc') {
        const sortedDataDescending = _.reverse(tableFilterData, (item) => new Date(item.last_updated_on));
        setTableFilterData([...sortedDataDescending]);
      }
    }
  }, [SortValue, sorttype]);

  const [accessControl, setAccessControl]=useState('');
  const functionalityAccess=useSelector((state)=>state?.roleBasedAccess?.functionalityAccess);

  useEffect(()=>{
    if (functionalityAccess && Object.keys(functionalityAccess).length>0) {
      if (functionalityAccess['Configuration:Roles_&Access']) {
        setAccessControl(functionalityAccess['Configuration:Roles_&Access']);
      } else {
        props.history.push('/home');
      }
    }
  }, [functionalityAccess]);

  const Edit = config.AccessLevel.Edit;
  const Read = config.AccessLevel.Read;

  const [page, setPage] = React.useState(0);

  const [ActiveCategoriesList, setActiveCategoriesList] = useState([]);
  const [ActiveSectorsList, setActiveSectorsList] = useState([]);
  const [ActiveRolesList, setActiveRolesList]= useState([]);

  const getValuesBasedOnTableData = (filterDropdown, tableKey, filterKey) => {
    return filterDropdown?.filter((a) => row?.find((d) => d[tableKey] == a[filterKey]) != null);
  };


  useEffect(() => {
    if (!row || row.length === 0) {
      return;
    }

    // making list of unique sectors that are present in the table
    const uniqueSector = new Set(row.filter((obj) => obj.sector !== null && obj.sector !== '').map((obj) => obj.sector));
    const sectors = ActiveSectors.flatMap((activeSector) => {
      return activeSector.sectors.map((sector) => ({
        ...sector,
      }));
    });
    const matchingObjects = sectors.filter((obj) => uniqueSector.has(obj.name));
    setActiveSectorsList(matchingObjects);
  }, [row]);

  useEffect(() => {
    if (!row || row.length === 0) {
      return;
    }

    // making list of unique roles that are present in the table
    const uniqueRoles = new Set(row.filter((obj) => obj.user_role !== null && obj.user_role !== '').map((obj) => obj.user_role));
    const rols = Roles?.map((user_role) => ({
      ...user_role,
    }));

    const matchingObjects = rols?.filter((obj) => uniqueRoles.has(obj?.description));
    setActiveRolesList(matchingObjects);
  }, [row]);

  useEffect(() => {
    setActiveCategoriesList(getValuesBasedOnTableData(ActiveCategories, 'category', 'category'));
  }, [tableFilterData]);

  return (
    <Box
      sx={{
        bgcolor: '#eff6fc',
        // height: '78vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0px',
      }}
    >
      {(accessControl === Edit || accessControl === Read) && <Box
        sx={theme.palette.whitebgbox}
      >
        <RolesAccessList row={row} setPage={setPage}
          ActiveMasterSectors={ActiveMasterSectors}
          // ActiveSectors={ActiveSectors}
          // ActiveCategories={ActiveCategories}
          Roles={ActiveRolesList}
          ActiveSectors={ActiveSectorsList}
          ActiveCategories={ActiveCategoriesList}
          setSubmitClicked={setSubmitClicked}
          setFiltersResetClicked={setFiltersResetClicked}
        />

        <Box sx={{}}>

          <CommonConfTable
            data={tableFilterData}
            accessControl={accessControl}
            setAddingTrigger={setAddingTrigger}
            heads={heads}
            values={values}
            addingTrigger={addingTrigger}
            idKey={idKey}
            singleUpdate={updateSingleUnitMaster}
            newRowUpdate={newRowUpdate}
            setIsErrorPopupVisible={setIsErrorPopupVisible}
            setErrMsg={setErrMsg}
            pagination={pagination}
            setPagination={setPagination}
            ActiveCategories={ActiveCategories}
            setPage={setPage}
            page={page}
            submitClicked={submitClicked}
            filterResetClicked={filterResetClicked}
            // ActiveMasterSectors={ActiveMasterSectors}
            ActiveSectors={ActiveSectors}
            sortValues={sortValues}
            Roles={Roles}
          />

          {(errMsg !=='' || tableFilterData.length == 0) &&
        <ErrorMessage message='Roles and Access' errmsg={errMsg}/>
          }
        </Box>
        <AppErrorDialog open={isErrorPopupVisible} handleClose={() => {
          setIsErrorPopupVisible(false);
          setErrMsg('');
        }} text={errMsg}/>
      </Box>}
    </Box>
  );
};

export default RolesAccess;

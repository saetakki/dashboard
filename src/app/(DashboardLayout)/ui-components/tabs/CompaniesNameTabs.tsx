import { useState } from 'react';
import { addCompany } from '@/store/companySlice'
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import FormDialog from '@/app/(DashboardLayout)/ui-components/dialog/FormDialog';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';

interface CompaniesNameTabsProps {
  setCurrentCompany: (companyName: string) => void;
  value: string;
  setValue: (newValue: string) => void;
  isAddable : boolean;
}


const CompaniesNameTabs = ({ setCurrentCompany, value, setValue, isAddable}: CompaniesNameTabsProps) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies || []);
  
  const onValueChangeHandler = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue); 
  };

  const onCompanyChangeHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    setCurrentCompany(target.innerText);
  };

  const onAddNewCompanyHandler = (name: string) => {
    const newValue = (companies.length + 1).toString();
    const newTab = { value: newValue, label: name.trim() };
    dispatch(addCompany(newTab));
  }

  return (
    <TabList onChange={onValueChangeHandler}>
      {companies.map((tab, index) => (
        <Tab key={tab.value} label={tab.label} value={tab.value.toString()} onClick={onCompanyChangeHandler}/> 
      ))}
      {isAddable && <FormDialog onAdd={onAddNewCompanyHandler} />}
  </TabList>
  );
};

export default CompaniesNameTabs;
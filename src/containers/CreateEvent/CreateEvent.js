import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import isAfter from 'date-fns/is_after';

import classes from './CreateEvent.module.css';
import NewEvent from '../../pages/NewEvent/NewEvent';
import useInput from '../../hooks/useInput';
import checkInitialValues from '../../lib/checkInitialValues';
import checkFormValues from '../../lib/checkFormValues';
import { saveEvent } from '../../store/actions/events';
import {
  getCategories,
  getTypes,
  getRestrictions,
  getModalities,
  getCountries,
} from '../../store/actions/poputateData';
import setInputErrors from '../../lib/setinputErrors';

const CreateEvent = ({
  saveEvent,
  loading,
  getCategories,
  getTypes,
  getRestrictions,
  getModalities,
  selectData,
  getCountries,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bbar, setBbar] = useState(false);
  const [errors, setErrors] = useState({});
  const { values, onChangeHandler } = useInput({
    name: '',
    type: '',
    category: '',
    restriction: '',
    modality: '',
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
  });

  useEffect(() => {
    getCategories();
    getTypes();
    getRestrictions();
    getCountries();
    getModalities();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checkInitialValues(values)) {
      setBbar(true);
    }
  }, [values]);

  const handleDateChange = ({ sd, ed }) => {
    sd = sd || startDate;
    ed = ed || endDate;

    if (isAfter(sd, ed)) {
      ed = sd;
    }

    setStartDate(sd);
    setEndDate(ed);
  };

  const handleChangeStart = sd => handleDateChange({ sd });
  const handleChangeEnd = ed => handleDateChange({ ed });

  const onSubmit = e => {
    e.preventDefault();
    const formValues = {
      ...values,
      start_date: startDate,
      finish_date: endDate,
      host: localStorage.getItem('user'),
    };
    if (checkFormValues(formValues)) {
      setErrors(setInputErrors(formValues));
    } else {
      saveEvent(formValues);
    }
  };
  return (
    <div className={classes.CreateEvent}>
      <NewEvent
        startDate={startDate}
        endDate={endDate}
        setDateS={handleChangeStart}
        setDateE={handleChangeEnd}
        values={values}
        change={onChangeHandler}
        submit={onSubmit}
        bbar={bbar}
        errors={errors}
        loading={loading}
        selectsData={selectData}
      />
    </div>
  );
};

const mapStateToProps = ({ events, populateData }) => ({
  loading: events.isLoading,
  selectData: populateData,
});

export default connect(
  mapStateToProps,
  {
    saveEvent,
    getCategories,
    getTypes,
    getRestrictions,
    getModalities,
    getCountries,
  }
)(CreateEvent);

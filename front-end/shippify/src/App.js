/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Select from 'react-select'

const columns= [
  { title: 'PLACA', field: 'plate' },
  { title: 'MODELO', field: 'model' },
  { title: 'TIPO', field: 'type' },
  { title: 'CAPACIDAD', field: 'capacity'}
];
const baseUrl="http://localhost:3000";
const handleClose = () => setShow(false);

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [drivers, setDataDrivers]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado]=useState({
    plate: "",
    model: "",
    type: "",
    capacity: "",
    driverId: 0
  })

  const [driverSeleccionado, setDriverSeleccionado]=useState({
    id: 0
  })

  const handleChange=e=>{
    console.log(e)
    const {name, value}=e.target;
    setVehiculoSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const changeDriverModal=e=>{
    console.log(e)
    setVehiculoSeleccionado(prevState=>({
      ...prevState,
      driverId: e.value
    }));
  }

  const handleChangeDrivers=e=>{
    setDriverSeleccionado(prevState=>({
      ...prevState,
      id: e.value
    }));
    peticionGet();
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl+"/"+driverSeleccionado.id)
    .then(response=>{
      console.log(response.data);
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionGetDrivers=async()=>{
    await axios.get(baseUrl+"/")
    .then(response=>{
      console.log(response.data);
      response.data.map(driver=>{
        return setDataDrivers(prevState=>([...prevState, {value: driver.id, label: driver.firstName + " " + driver.lastName}]));
      })
      console.log(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticion = async(tipo) => {
    if (tipo == "Insertar") {
      await axios.post(baseUrl, vehiculoSeleccionado)
        .then(response => {
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error => {
          console.log(error);
        })
    } else if (tipo == "Editar") {
      const id = vehiculoSeleccionado.id;
      delete vehiculoSeleccionado.id;
      delete vehiculoSeleccionado.tableData;
      await axios.put(baseUrl + "/" + id, vehiculoSeleccionado)
        .then(response => {          
          var dataNueva = response;
          dataNueva.map(vehiculo => {
            if (vehiculo.id == vehiculoSeleccionado.id) {
              vehiculo.plate = vehiculoSeleccionado.plate;
              vehiculo.model = vehiculoSeleccionado.model;
              vehiculo.type = vehiculoSeleccionado.type;
              vehiculo.capacity = vehiculoSeleccionado.capacity;
            }
          });
          setData(dataNueva);
          abrirCerrarModalInsertar();
        }).catch(error => {
          console.log(error);
        })
    }
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+vehiculoSeleccionado.id)
    .then(response=>{
      setData(data.filter(vehiculo=>vehiculo.id!==vehiculoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarVehiculo=(vehiculo, caso)=>{
    setVehiculoSeleccionado(vehiculo);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  useEffect(()=>{
    //peticionGet();
    peticionGetDrivers();
  }, [])

  function alerta (props) {
   return ( 
   <div className={styles.modal}>
      <h3>{props} vehículo</h3> 
      <TextField className={styles.inputMaterial} label="Placa" name="plate" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Modelo" name="model" onChange={handleChange}/>          
    <br />
    <TextField className={styles.inputMaterial} label="Tipo" name="type" onChange={handleChange}/>
          <br />           <br />
    <Select options={drivers} label="Conductor" name="driverId"  onChange={changeDriverModal} />
          <br />
    <TextField className={styles.inputMaterial} label="Capacidad" name="capacity" onChange={handleChange}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticion(props)}>{props}</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
        </div>
    )
  }

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el vehículo <b>{vehiculoSeleccionado && vehiculoSeleccionado.vehiculo}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Crear Vehículo</Button>
      <Select options={drivers}  onChange={handleChangeDrivers} />
      <br /><br />
     <MaterialTable
          columns={columns}
          data={data}
          title=""  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar vehiculo',
              onClick: (event, rowData) => seleccionarVehiculo(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar vehiculo',
              onClick: (event, rowData) => seleccionarVehiculo(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "ACCIONES"
            }
          }}
        />


        <Modal
        open={modalInsertar}
        onClose={handleClose}>
          {alerta("Insertar")}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={handleClose}>
          {alerta("Editar")}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={handleClose}>
          {bodyEliminar}
        </Modal>
    </div>
  );
}

export default App;

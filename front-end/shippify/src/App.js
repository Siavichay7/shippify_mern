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
    driverId: 2
  })

  const [driverSeleccionado, setDriverSeleccionado]=useState({
    id: 0
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setVehiculoSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeDrivers=e=>{
    console.log(e.value, e.target);
    setDriverSeleccionado(prevState=>({
      ...prevState,
      id: e.value
    }));
    console.log(driverSeleccionado);
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

  const peticionPost=async()=>{
    await axios.post(baseUrl, vehiculoSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+vehiculoSeleccionado.id, vehiculoSeleccionado)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(vehiculo=>{
        if(vehiculo.id===vehiculoSeleccionado.id){
          vehiculo.vehiculo=vehiculoSeleccionado.vehiculo;
          vehiculo.genero=vehiculoSeleccionado.genero;
          vehiculo.ventas=vehiculoSeleccionado.ventas;
          vehiculo.pais=vehiculoSeleccionado.pais;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
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

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar nuevo vehículo</h3>
      <TextField className={styles.inputMaterial} label="Placa" name="plate" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Modelo" name="model" onChange={handleChange}/>          
<br />
<TextField className={styles.inputMaterial} label="Tipo" name="type" onChange={handleChange}/>
      <br />
<TextField className={styles.inputMaterial} label="Capacidad" name="capacity" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Vehículo</h3>
      <TextField className={styles.inputMaterial} label="Placa" name="plate" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.vehiculo}/>
      <br />
      <TextField className={styles.inputMaterial} label="Modelo" name="model" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.pais}/>          
<br />
<TextField className={styles.inputMaterial} label="Tipo" name="type" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.ventas}/>
      <br />
<TextField className={styles.inputMaterial} label="Capacidad" name="capacity" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.genero}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

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
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
    </div>
  );
}

export default App;

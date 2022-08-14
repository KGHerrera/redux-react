import CrudForm from "./CrudForm";
import { useSelector, useDispatch } from "react-redux";
import CrudTable from "./CrudTable";
import { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader.js";
import Message from "./Message.js";
import { createAction, deleteAction, noAction, readAllAction, updateAction } from "../actions/crudActions";

export default function CrudApi() {
  //const [db, setDb] = useState(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { db } = state.crud;

  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/waifus";

  useEffect(() => {
    setLoading(true);

    api.get(url).then((res) => {
      if (!res.err) {
        //setDb(res);
        dispatch(readAllAction(res));
        setError(null);
      } else {
        dispatch(noAction());
        setError(res);
      }
      setLoading(false);
    });
  }, [url, dispatch]);

  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        //setDb([...db, res]);
        dispatch(createAction(res));
      } else {
        setError(res);
      }
    });
    //setDb([...db, data]);
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        //let newData = db.map((item) => (item.id === data.id ? data : item));
        //setDb(newData);
        dispatch(updateAction(res));
      } else {
        setError(res);
      }
    });
    //let newData = db.map((item) => (item.id === data.id ? data : item));
    //setDb(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm("esta seguro?");

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          //let newData = db.filter((item) => item.id !== id);
          //setDb(newData);
          dispatch(deleteAction(id));
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status} : ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
      {db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </div>
  );
}

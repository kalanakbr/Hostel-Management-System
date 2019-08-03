import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    // const  onRegister = () => {
    //   this.props.history.push('/login');
    //  }
    try {
      const res = await axios.post('/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          // setTimeout(() => setUploadPercentage(0), 10000);
        }
      })
        

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded,Please Click Register');

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
<div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fas fa-user-circle' /> Profile Picture
    </h4>
    
  </div>
      { message ? <Message msg= {message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
          <small className="form-text text-muted">Please, Upload your photo</small>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'> 
            <img style={{ width: '100%'}}  className="rounded img-thumbnail" src={uploadedFile.filePath} alt='' />
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
          </div>
        </div>
      ) : null}
        <button color="primary" className="btn btn-primary btn-block mt-4 px-4"
                // onClick={this.onRegister}
                  >Register</button>
    </Fragment>
  );
};

export default withRouter(Upload);
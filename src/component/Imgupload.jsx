import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./Style.css"
import { v4 as uuidv4 } from 'uuid';

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxSize = 2 * 1024 * 1024; // 2MB

function Imgupload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const db = getFirestore();
  const storage = getStorage();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setMessage('');
      setError(null);
    } else {
      setFile(null);
      setFileName('');
      setMessage('Please choose a valid image file (JPG, PNG, GIF) under 2MB.');
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose an image file to upload.');
      setMessage('');
      return;
    }

    const imageRef = ref(storage, `images/${fileName}`);
    uploadBytes(imageRef, file)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            addDoc(collection(db, 'images'), { name: fileName, url: url, imageUrl: imageUrl })
           

              .then(() => {
                setFile(null);
                setFileName('');
                setImageUrl(url);
                setMessage('Image uploaded successfully.');
                setError(null);
              })
              .catch((err) => {
                setError('Failed to add image URL to Firestore.');
                console.error(err);
              });
          })
          .catch((err) => {
            setError('Failed to get image download URL.');
            console.error(err);
          });
      })
      .catch((err) => {
        setError('Failed to upload image to Firebase Storage.');
        console.error(err);
      });
  };

 



  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      {message && <p>{message}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      {error && <p>{error}</p>}
      <button type="submit">Upload</button>
    </form>
  );
}

export default Imgupload;

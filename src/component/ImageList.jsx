import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

function ImageList({ setIsListLoading }) {
  const [imageUrls, setImageUrls] = useState([]);
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const imagesCollection = collection(db, 'images');

    // Get a list of all images in Firebase Storage
    const storageRef = ref(storage, 'images');
    listAll(storageRef)
      .then((res) => {
        const promises = [];
        res.items.forEach((item) => {
          const promise = getDownloadURL(item).catch((error) => {
            console.error(error);
            return null;
          });
          promises.push(promise);
        });
        return Promise.allSettled(promises);
      })
      .then((results) => {
        const urls = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setImageUrls(urls);
        setIsListLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    // Listen for new images added to the images collection
    const unsubscribe = onSnapshot(imagesCollection, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const fileName = change.doc.data().name;
          const fileRef = ref(storage, `images/${fileName}`);
          getDownloadURL(fileRef)
            .then((url) => {
              setImageUrls((prevUrls) => [...prevUrls, url]);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [db, storage, setIsListLoading]);

  return (
    <div className="image-list">
      {imageUrls.length > 0 ? (
        imageUrls.map((url) => (
          <img src={url} key={url} alt="Uploaded" />
        ))
      ) : (
        <div className="loading">Loading images...</div>
      )}
    </div>
  );
}

export default ImageList;

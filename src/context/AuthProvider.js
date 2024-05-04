import app from "../firebase/config";
import { storage } from "../firebase/config";

import { getAuth } from "firebase/auth";
import { createContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";

import {
  useAdduserMutation,
  useFetchusersQuery,
} from "../redux/features/usersApi";

import { toast } from "react-toastify";
import { useFetchhotelsQuery } from "../redux/features/hotelsApi";

const AuthContext = createContext();

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const providerFaceBook = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userStorage, setUserStoge] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [facebookUser, setFacebookUser] = useState(null);

  const [checkBoxStatus, setCheckbox] = useState(
    JSON.parse(localStorage.getItem("checkBox")) || false
  );
  const [errorMessage, setErrorMessage] = useState("");

  const randomID = uuid();

  const { data: users } = useFetchusersQuery();


  const [addUser] = useAdduserMutation();

  const existUser = users?.filter(
    (item) => item.email === "quangtu.vu@gmail.com"
  );

  useEffect(() => {
    if (currentUser && users) {
      // Kiểm tra cả currentUser và users
      const userStorage = users.find((item) => item.uid === currentUser.uid);
      setUserStoge(userStorage);
      if (userStorage) {
        setPhoto(userStorage.imgUrl);
      }
    }
  }, [currentUser, users]);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const signUpWithGmail = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userExists = users.find((item) => item.email === user.email);
        if (!userExists) {
          // Nếu người dùng không tồn tại, thêm họ vào cơ sở dữ liệu
          addUser({ email: user.email, uid: user.uid });
        }
      })
      .catch((err) => {
        const message = err.message;
        console.log(message);
        setErrorMessage(message);
      });
  };

  const login = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("dang nhap thanh cong", user);
      })
      .catch((err) => {
        const message = err.message;
        alert(message);
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
        setLoading(false);
      } else {
        console.log("user signOut");
      }
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  const logOut = () => {
    // localStorage.removeItem("genius-token");
    signOut(auth)
      .then(() => console.log("sign out successfull"))
      .catch(() => console.log("signout loi "));
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please Check Email To Reset Password");
      })
      .catch((err) => alert("Email does not exist, Please re-enter"));
  };

  const signUpWithFacebook = () => {
    setLoading(true);

    return signInWithPopup(auth, providerFaceBook)
      .then((result) => {
        setFacebookUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadToFireBase = (file, setItem) => {
    const storageRef = ref(storage, randomID + ".png");
    // console.log(file);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.info("Image Upload Successfully");
          setItem((prev) => ({ ...prev, imgUrl: downloadURL }));
        });
      }
    );
  };

  const authInfor = {
    currentUser,
    loading,
    setLoading,
    signUpWithGmail,
    login,
    logOut,
    photoURL,
    resetPassword,
    signUpWithFacebook,
    auth,
    userStorage,
    photo,
    users,

    randomID,
    uploadToFireBase,

    checkBoxStatus,
    facebookUser,
    setFacebookUser,
  };

  return (
    <AuthContext.Provider value={authInfor}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
